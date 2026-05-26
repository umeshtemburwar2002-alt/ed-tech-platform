/**
 * College LMS - Upload Service
 * File upload operations with progress tracking
 */

import { supabase } from '../lib/supabase';

/**
 * Upload file to Supabase Storage with progress tracking
 */
export const uploadFile = async (file, bucket, path, options = {}) => {
  const {
    onProgress = null,
    signal = null,
    contentType = file.type,
    upsert = false,
  } = options;

  return new Promise((resolve, reject) => {
    const abortController = signal || new AbortController();

    // Upload to Supabase Storage
    supabase.storage
      .from(bucket)
      .upload(path, file, {
        contentType,
        upsert,
        cacheControl: '3600',
        duplex: 'half',
      })
      .then(({ data, error }) => {
        if (error) {
          reject(error);
          return;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(path);

        resolve({
          data,
          publicUrl,
        });
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          reject(error);
        } else {
          reject(error);
        }
      });
  });
};

/**
 * Upload video with progress tracking
 */
export const uploadVideo = async (file, courseId, lessonId, onProgress) => {
  const path = `${courseId}/${lessonId}/${file.name}`;
  
  return uploadFile(file, 'lesson-videos', path, {
    contentType: file.type,
    upsert: true,
    onProgress,
  });
};

/**
 * Upload PDF with progress tracking
 */
export const uploadPDF = async (file, courseId, lessonId, onProgress) => {
  const path = `${courseId}/${lessonId}/${file.name}`;
  
  return uploadFile(file, 'lesson-pdfs', path, {
    contentType: file.type,
    upsert: true,
    onProgress,
  });
};

/**
 * Upload resource file
 */
export const uploadResource = async (file, courseId, lessonId, onProgress) => {
  const path = `${courseId}/${lessonId}/${file.name}`;
  
  return uploadFile(file, 'lesson-resources', path, {
    contentType: file.type,
    upsert: true,
    onProgress,
  });
};

/**
 * Upload course thumbnail
 */
export const uploadThumbnail = async (file, courseId, onProgress) => {
  const path = `${courseId}/thumbnail.${file.name.split('.').pop()}`;
  
  return uploadFile(file, 'course-thumbnails', path, {
    contentType: file.type,
    upsert: true,
    onProgress,
  });
};

/**
 * Upload user avatar
 */
export const uploadAvatar = async (file, userId, onProgress) => {
  const path = `${userId}/avatar.${file.name.split('.').pop()}`;
  
  return uploadFile(file, 'user-avatars', path, {
    contentType: file.type,
    upsert: true,
    onProgress,
  });
};

/**
 * Get signed URL for private file
 */
export const getSignedUrl = async (bucket, path, expiresIn = 3600) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);

    if (error) throw error;
    return data.signedUrl;
  } catch (error) {
    console.error('Failed to get signed URL:', error);
    throw error;
  }
};

/**
 * Delete file from storage
 */
export const deleteFile = async (bucket, paths) => {
  try {
    const { error } = await supabase.storage.from(bucket).remove(paths);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Failed to delete file:', error);
    throw error;
  }
};

/**
 * Get public URL for file
 */
export const getPublicUrl = (bucket, path) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

const uploadService = {
  uploadFile,
  uploadVideo,
  uploadPDF,
  uploadResource,
  uploadThumbnail,
  uploadAvatar,
  getSignedUrl,
  deleteFile,
  getPublicUrl,
};

export default uploadService;
