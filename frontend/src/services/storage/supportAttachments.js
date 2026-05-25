import { supabase } from '../../config/supabaseClient';
import { toast } from 'react-hot-toast';

export const ALLOWED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'application/pdf'
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const validateFile = (file) => {
  if (!file) {
    return { valid: false, error: 'No file selected' };
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Please upload PNG, JPG, WEBP, or PDF.' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File size must be less than 5MB' };
  }

  return { valid: true, error: null };
};

export const uploadFile = async (file, user, role) => {
  const validation = validateFile(file);
  
  if (!validation.valid) {
    toast.error(validation.error);
    return null;
  }

  try {
    const folder = role === 'instructor' ? 'instructor' : 'student';
    const fileName = `${folder}/${user.id}/${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from('support-attachments')
      .upload(fileName, file);

    if (error) {
      console.error('Upload error:', error);
      toast.error('File upload failed');
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('support-attachments')
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    toast.error('File upload failed');
    return null;
  }
};

export const deleteFile = async (filePath) => {
  try {
    const { error } = await supabase.storage
      .from('support-attachments')
      .remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Delete error:', error);
    return false;
  }
};
