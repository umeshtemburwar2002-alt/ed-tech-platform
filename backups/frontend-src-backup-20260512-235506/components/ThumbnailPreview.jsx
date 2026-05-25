import React, { useState, useEffect } from 'react';
import { X, Upload, Image, AlertTriangle, RefreshCw } from 'lucide-react';

const ThumbnailPreview = ({ 
  thumbnail, 
  onRemove, 
  onUpload, 
  isLoading = false,
  showUploadButton = false,
  className = "",
  fallbackThumbnails = [],
  onRetry = null
}) => {
  const [imageError, setImageError] = useState(false);
  const [currentThumbnailIndex, setCurrentThumbnailIndex] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  // Reset error state when thumbnail changes
  useEffect(() => {
    setImageError(false);
    setCurrentThumbnailIndex(0);
  }, [thumbnail]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  const handleImageError = () => {
    setImageError(true);
    
    // Try next fallback thumbnail if available
    if (fallbackThumbnails.length > 0 && currentThumbnailIndex < fallbackThumbnails.length - 1) {
      setCurrentThumbnailIndex(prev => prev + 1);
      setImageError(false);
    }
  };

  const handleRetry = async () => {
    if (!onRetry) return;
    
    setIsRetrying(true);
    setImageError(false);
    
    try {
      await onRetry();
    } catch (error) {
      console.error('Retry failed:', error);
      setImageError(true);
    } finally {
      setIsRetrying(false);
    }
  };

  const getCurrentThumbnail = () => {
    if (imageError && fallbackThumbnails.length > 0) {
      return fallbackThumbnails[currentThumbnailIndex];
    }
    return thumbnail;
  };

  if (isLoading || isRetrying) {
    return (
      <div className={`relative w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="absolute bottom-2 text-xs text-gray-500">
          {isRetrying ? 'Retrying...' : 'Loading thumbnail...'}
        </p>
      </div>
    );
  }

  if (!thumbnail) {
    return (
      <div className={`relative w-full h-48 bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300 ${className}`}>
        <Image className="w-12 h-12 text-gray-400 mb-2" />
        <p className="text-gray-500 text-sm">No thumbnail</p>
        {showUploadButton && (
          <div className="mt-4">
            <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Upload className="w-4 h-4 mr-2" />
              Upload Thumbnail
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      {imageError ? (
        <div className="relative w-full h-48 bg-red-50 border-2 border-red-200 rounded-lg flex flex-col items-center justify-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mb-2" />
          <p className="text-red-600 text-sm font-medium mb-2">Thumbnail unavailable</p>
          
          {fallbackThumbnails.length > currentThumbnailIndex + 1 && (
            <p className="text-red-500 text-xs mb-3">
              Trying fallback {currentThumbnailIndex + 1} of {fallbackThumbnails.length}
            </p>
          )}
          
          <div className="flex space-x-2">
            {onRetry && (
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 mr-1 ${isRetrying ? 'animate-spin' : ''}`} />
                Retry
              </button>
            )}
            
            {showUploadButton && (
              <label className="cursor-pointer inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                <Upload className="w-3 h-3 mr-1" />
                Upload
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
      ) : (
        <img
          src={getCurrentThumbnail()}
          alt="Course thumbnail"
          className="w-full h-48 object-cover rounded-lg shadow-md"
          onError={handleImageError}
        />
      )}
      
      {onRemove && !imageError && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      
      {fallbackThumbnails.length > 0 && currentThumbnailIndex > 0 && !imageError && (
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          Fallback quality {currentThumbnailIndex}
        </div>
      )}
    </div>
  );
};

export default ThumbnailPreview;
