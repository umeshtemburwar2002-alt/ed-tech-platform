/**
 * College LMS - useUpload Hook
 * Supabase Storage upload with progress tracking, cancel, and signed URL fetch
 */

import { useState, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import uploadService from '../services/uploadService';
import toast from 'react-hot-toast';

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const abortControllerRef = useRef(null);

  /**
   * Upload file to Supabase Storage with progress tracking
   * @param {File} file - File to upload
   * @param {string} bucket - Bucket name
   * @param {string} path - File path in bucket
   * @param {Object} options - Upload options
   * @returns {Promise<Object>} - Upload result
   */
  const uploadFile = useCallback(
    async (file, bucket, path, options = {}) => {
      setUploading(true);
      setProgress(0);
      setError(null);
      setUploadedUrl(null);

      // Create new AbortController for this upload
      abortControllerRef.current = new AbortController();

      try {
        const result = await uploadService.uploadFile(
          file,
          bucket,
          path,
          {
            ...options,
            onProgress: (percent) => {
              setProgress(percent);
            },
            signal: abortControllerRef.current.signal,
          }
        );

        setUploadedUrl(result.publicUrl);
        toast.success('File uploaded successfully');
        return result;
      } catch (err) {
        if (err.name === 'AbortError') {
          toast.error('Upload cancelled');
        } else {
          setError(err.message);
          toast.error('Failed to upload file');
        }
        return null;
      } finally {
        setUploading(false);
        abortControllerRef.current = null;
      }
    },
    []
  );

  /**
   * Upload video with progress tracking
   * @param {File} file - Video file
   * @param {string} courseId - Course ID for path
   * @param {string} lessonId - Lesson ID for path
   * @returns {Promise<Object>} - Upload result
   */
  const uploadVideo = useCallback(async (file, courseId, lessonId) => {
    const path = `${courseId}/${lessonId}/${file.name}`;
    return uploadFile(file, 'lesson-videos', path, {
      contentType: file.type,
      upsert: true,
    });
  }, [uploadFile]);

  /**
   * Upload PDF with progress tracking
   * @param {File} file - PDF file
   * @param {string} courseId - Course ID for path
   * @param {string} lessonId - Lesson ID for path
   * @returns {Promise<Object>} - Upload result
   */
  const uploadPDF = useCallback(async (file, courseId, lessonId) => {
    const path = `${courseId}/${lessonId}/${file.name}`;
    return uploadFile(file, 'lesson-pdfs', path, {
      contentType: file.type,
      upsert: true,
    });
  }, [uploadFile]);

  /**
   * Upload resource file
   * @param {File} file - Resource file
   * @param {string} courseId - Course ID for path
   * @param {string} lessonId - Lesson ID for path
   * @returns {Promise<Object>} - Upload result
   */
  const uploadResource = useCallback(async (file, courseId, lessonId) => {
    const path = `${courseId}/${lessonId}/${file.name}`;
    return uploadFile(file, 'lesson-resources', path, {
      contentType: file.type,
      upsert: true,
    });
  }, [uploadFile]);

  /**
   * Upload course thumbnail
   * @param {File} file - Image file
   * @param {string} courseId - Course ID for path
   * @returns {Promise<Object>} - Upload result
   */
  const uploadThumbnail = useCallback(async (file, courseId) => {
    const path = `${courseId}/thumbnail.${file.name.split('.').pop()}`;
    return uploadFile(file, 'course-thumbnails', path, {
      contentType: file.type,
      upsert: true,
    });
  }, [uploadFile]);

  /**
   * Cancel current upload
   */
  const cancelUpload = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  /**
   * Get signed URL for private file
   * @param {string} bucket - Bucket name
   * @param {string} path - File path
   * @param {number} expiresIn - URL expiration in seconds (default: 3600)
   * @returns {Promise<string>} - Signed URL
   */
  const getSignedUrl = useCallback(async (bucket, path, expiresIn = 3600) => {
    try {
      const { data, error } = await supabase
        .storage
        .from(bucket)
        .createSignedUrl(path, expiresIn);

      if (error) throw error;

      return data.signedUrl;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to get signed URL');
      return null;
    }
  }, []);

  /**
   * Delete file from storage
   * @param {string} bucket - Bucket name
   * @param {string[]} paths - Array of file paths
   * @returns {Promise<boolean>} - Success status
   */
  const deleteFile = useCallback(async (bucket, paths) => {
    try {
      const { error } = await supabase.storage.from(bucket).remove(paths);

      if (error) throw error;

      toast.success('File deleted successfully');
      return true;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to delete file');
      return false;
    }
  }, []);

  /**
   * Reset upload state
   */
  const reset = useCallback(() => {
    setUploading(false);
    setProgress(0);
    setError(null);
    setUploadedUrl(null);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  return {
    uploading,
    progress,
    error,
    uploadedUrl,
    uploadFile,
    uploadVideo,
    uploadPDF,
    uploadResource,
    uploadThumbnail,
    cancelUpload,
    getSignedUrl,
    deleteFile,
    reset,
  };
};

export default useUpload;
