/**
 * College LMS - FileUpload Component
 * Drag and drop file upload with preview and progress
 */

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, X, File, Image as ImageIcon, FileText } from 'lucide-react';
import { cn } from '../../utils/cn';
import ProgressBar from './ProgressBar';

const FileUpload = ({
  onUpload,
  accept,
  maxSize = 10485760, // 10MB default
  maxFiles = 1,
  multiple = false,
  className,
}) => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
      }));

      setFiles((prev) => [...prev, ...newFiles].slice(0, maxFiles));

      // Simulate upload progress
      newFiles.forEach((fileObj) => {
        simulateUpload(fileObj);
      });
    },
    [maxFiles]
  );

  const simulateUpload = (fileObj) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress((prev) => ({
        ...prev,
        [fileObj.file.name]: progress,
      }));

      if (progress >= 100) {
        clearInterval(interval);
        if (onUpload) {
          onUpload(fileObj.file);
        }
      }
    }, 200);
  };

  const removeFile = (fileName) => {
    setFiles((prev) => prev.filter((f) => f.file.name !== fileName));
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles,
    multiple,
  });

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="w-5 h-5" />;
    }
    if (file.type === 'application/pdf') {
      return <FileText className="w-5 h-5" />;
    }
    return <File className="w-5 h-5" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all',
          isDragActive
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
        )}
      >
        <input {...getInputProps()} />
        <motion.div
          animate={isDragActive ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-slate-500" />
          <p className="text-slate-300 mb-2">
            {isDragActive
              ? 'Drop the files here'
              : 'Drag & drop files here, or click to select'}
          </p>
          <p className="text-sm text-slate-500">
            Max file size: {formatFileSize(maxSize)}
          </p>
        </motion.div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((fileObj) => (
            <motion.div
              key={fileObj.file.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 rounded-lg p-3 border border-slate-700"
            >
              <div className="flex items-center gap-3">
                {/* Preview or Icon */}
                {fileObj.file.type.startsWith('image/') ? (
                  <img
                    src={fileObj.preview}
                    alt={fileObj.file.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center text-slate-400">
                    {getFileIcon(fileObj.file)}
                  </div>
                )}

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {fileObj.file.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatFileSize(fileObj.file.size)}
                  </p>
                  {uploadProgress[fileObj.file.name] !== undefined && (
                    <ProgressBar
                      value={uploadProgress[fileObj.file.name]}
                      max={100}
                      size="sm"
                      showLabel={false}
                    />
                  )}
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFile(fileObj.file.name)}
                  className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
