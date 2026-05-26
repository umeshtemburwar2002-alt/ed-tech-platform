/**
 * College LMS - Upload Controller
 * Handles file uploads with multer, sharp thumbnail generation, and Supabase storage
 */

import multer from 'multer';
import sharp from 'sharp';
import { supabase, uploadFile, getPublicUrl } from '../config/supabase.js';
import path from 'path';

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm', 'application/pdf'];
  allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type'), false);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 * 1024, // 2GB
  },
});

/**
 * Upload video
 * @route POST /api/upload/video
 */
export const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const { courseId, lessonId } = req.body;
    const file = req.file;

    const filePath = `${courseId}/${lessonId}/${file.originalname}`;

    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from('lesson-videos')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) throw error;

    // Get public URL
    const publicUrl = getPublicUrl('lesson-videos', filePath);

    res.status(200).json({
      success: true,
      message: 'Video uploaded successfully',
      data: {
        path: filePath,
        url: publicUrl,
      },
    });
  } catch (error) {
    console.error('Upload video error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload video',
    });
  }
};

/**
 * Upload PDF
 * @route POST /api/upload/pdf
 */
export const uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const { courseId, lessonId } = req.body;
    const file = req.file;

    const filePath = `${courseId}/${lessonId}/${file.originalname}`;

    const { data, error } = await supabase.storage
      .from('lesson-pdfs')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) throw error;

    const publicUrl = getPublicUrl('lesson-pdfs', filePath);

    res.status(200).json({
      success: true,
      message: 'PDF uploaded successfully',
      data: {
        path: filePath,
        url: publicUrl,
      },
    });
  } catch (error) {
    console.error('Upload PDF error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload PDF',
    });
  }
};

/**
 * Upload resource
 * @route POST /api/upload/resource
 */
export const uploadResource = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const { courseId, lessonId } = req.body;
    const file = req.file;

    const filePath = `${courseId}/${lessonId}/${file.originalname}`;

    const { data, error } = await supabase.storage
      .from('lesson-resources')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) throw error;

    const publicUrl = getPublicUrl('lesson-resources', filePath);

    res.status(200).json({
      success: true,
      message: 'Resource uploaded successfully',
      data: {
        path: filePath,
        url: publicUrl,
        name: file.originalname,
        size: file.size,
        type: file.mimetype,
      },
    });
  } catch (error) {
    console.error('Upload resource error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload resource',
    });
  }
};

/**
 * Upload course thumbnail with sharp processing
 * @route POST /api/upload/thumbnail
 */
export const uploadThumbnail = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const { courseId } = req.body;
    const file = req.file;

    // Process image with sharp
    const processedImage = await sharp(file.buffer)
      .resize(1280, 720, {
        fit: 'cover',
        position: 'center',
      })
      .jpeg({ quality: 80 })
      .toBuffer();

    const filePath = `${courseId}/thumbnail.jpg`;

    const { data, error } = await supabase.storage
      .from('course-thumbnails')
      .upload(filePath, processedImage, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (error) throw error;

    const publicUrl = getPublicUrl('course-thumbnails', filePath);

    res.status(200).json({
      success: true,
      message: 'Thumbnail uploaded successfully',
      data: {
        path: filePath,
        url: publicUrl,
      },
    });
  } catch (error) {
    console.error('Upload thumbnail error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload thumbnail',
    });
  }
};

/**
 * Upload user avatar
 * @route POST /api/upload/avatar
 */
export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const { userId } = req.body;
    const file = req.file;

    // Process image with sharp
    const processedImage = await sharp(file.buffer)
      .resize(200, 200, {
        fit: 'cover',
        position: 'center',
      })
      .jpeg({ quality: 80 })
      .toBuffer();

    const filePath = `${userId}/avatar.jpg`;

    const { data, error } = await supabase.storage
      .from('user-avatars')
      .upload(filePath, processedImage, {
        contentType: 'image/jpeg',
        upsert: true,
      });

    if (error) throw error;

    const publicUrl = getPublicUrl('user-avatars', filePath);

    // Update user profile
    await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl })
      .eq('id', userId);

    res.status(200).json({
      success: true,
      message: 'Avatar uploaded successfully',
      data: {
        path: filePath,
        url: publicUrl,
      },
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload avatar',
    });
  }
};

/**
 * Delete file
 * @route DELETE /api/upload/file
 */
export const deleteFile = async (req, res) => {
  try {
    const { bucket, paths } = req.body;

    if (!bucket || !paths) {
      return res.status(400).json({
        success: false,
        message: 'Bucket and paths are required',
      });
    }

    const { error } = await supabase.storage.from(bucket).remove(paths);

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete file',
    });
  }
};

/**
 * Get signed URL for private file
 * @route GET /api/upload/signed-url
 */
export const getSignedUrl = async (req, res) => {
  try {
    const { bucket, path, expiresIn = 3600 } = req.query;

    if (!bucket || !path) {
      return res.status(400).json({
        success: false,
        message: 'Bucket and path are required',
      });
    }

    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);

    if (error) throw error;

    res.status(200).json({
      success: true,
      data: {
        signedUrl: data.signedUrl,
      },
    });
  } catch (error) {
    console.error('Get signed URL error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get signed URL',
    });
  }
};

export default {
  upload,
  uploadVideo,
  uploadPDF,
  uploadResource,
  uploadThumbnail,
  uploadAvatar,
  deleteFile,
  getSignedUrl,
};
