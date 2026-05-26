/**
 * College LMS - Video Upload Component
 * Drag-and-drop video upload with progress tracking and preview
 */

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, X, Film, AlertCircle, CheckCircle } from 'lucide-react';
import ProgressBar from './ProgressBar';
import VideoPlayer from './VideoPlayer';
import { useUpload } from '../hooks/useUpload';
import toast from 'react-hot-toast';

const VideoUpload = ({ courseId, lessonId, videoUrl, onUpload }) => {
  const { uploadVideo, uploading, progress, uploadedUrl, cancelUpload, reset } = useUpload();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const videoFile = acceptedFiles[0];
      if (!videoFile) return;

      // Validate file type
      const validTypes = ['video/mp4', 'video/webm', 'video/mov'];
      if (!validTypes.includes(videoFile.type)) {
        setError('Invalid file type. Please upload MP4, WebM, or MOV.');
        return;
      }

      // Validate file size (max 2GB)
      const maxSize = 2 * 1024 * 1024 * 1024;
      if (videoFile.size > maxSize) {
        setError('File size exceeds 2GB limit.');
        return;
      }

      setFile(videoFile);
      setError(null);

      // Upload to Supabase
      await uploadVideo(videoFile, courseId, lessonId);
    },
    [uploadVideo, courseId, lessonId]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.webm', '.mov'],
    },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024 * 1024, // 2GB
  });

  const handleCancel = () => {
    cancelUpload();
    setFile(null);
    setError(null);
    reset();
  };

  const handleRemove = () => {
    setFile(null);
    setError(null);
    reset();
    if (onUpload) onUpload(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Update parent when upload completes
  React.useEffect(() => {
    if (uploadedUrl && onUpload) {
      onUpload(uploadedUrl);
    }
  }, [uploadedUrl, onUpload]);

  // Initialize with existing video URL
  React.useEffect(() => {
    if (videoUrl && !file) {
      setFile({ name: 'Existing video', size: 0 });
    }
  }, [videoUrl]);

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      {!file && (
        <motion.div
          {...getRootProps()}
          whileHover={{ scale: 1.01 }}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-blue-500 bg-blue-500/10'
              : isDragReject
              ? 'border-red-500 bg-red-500/10'
              : 'border-slate-600 hover:border-slate-500 bg-slate-900/50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-300 mb-2">
            {isDragActive ? 'Drop the video here' : 'Drag & drop a video, or click to select'}
          </p>
          <p className="text-sm text-slate-500">
            MP4, WebM, MOV (max 2GB)
          </p>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
        >
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-400 flex-1">{error}</p>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* File Selected / Uploading / Uploaded */}
      {file && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 rounded-xl p-4 border border-slate-700"
        >
          {/* File Info */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center">
              <Film className="w-6 h-6 text-slate-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">{file.name}</p>
              <p className="text-sm text-slate-400">{formatFileSize(file.size)}</p>
            </div>
            {!uploading && !uploadedUrl && (
              <button
                onClick={handleRemove}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="mb-4">
              <ProgressBar value={progress} label="Uploading" />
              <div className="flex justify-between mt-2">
                <p className="text-sm text-slate-400">Uploading video...</p>
                <button
                  onClick={handleCancel}
                  className="text-sm text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Upload Complete */}
          {uploadedUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg mb-4"
            >
              <CheckCircle className="w-5 h-5 text-green-500" />
              <p className="text-green-400">Video uploaded successfully</p>
            </motion.div>
          )}

          {/* Video Preview */}
          {(uploadedUrl || videoUrl) && (
            <div className="mt-4">
              <p className="text-sm text-slate-400 mb-2">Preview</p>
              <VideoPlayer url={uploadedUrl || videoUrl} />
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default VideoUpload;
