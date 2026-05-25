import React, { useState, useEffect } from 'react';
import { Upload, Link, Film, Image as ImageIcon, Check, AlertCircle } from 'lucide-react';
import ThumbnailPreview from './ThumbnailPreview';
import { useCourses } from '../contexts/CourseContext';
import { 
  extractYouTubeVideoId, 
  generateYouTubeThumbnailUrl, 
  isValidYouTubeUrl,
  getThumbnailUrlsWithFallback,
  getBestThumbnailUrl
} from '../utils/youtubeUtils';

const CourseCreationForm = () => {
  const { addCourse, courses } = useCourses();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoType: 'youtube', // 'youtube' or 'upload'
    youtubeUrl: '',
    videoFile: null,
    thumbnail: null,
    thumbnailFile: null,
    useDefaultThumbnail: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [youtubeVideoId, setYoutubeVideoId] = useState(null);
  const [fallbackThumbnails, setFallbackThumbnails] = useState([]);
  const [isThumbnailLoading, setIsThumbnailLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Default thumbnail URL
  const defaultThumbnail = 'https://via.placeholder.com/640x360?text=Course+Thumbnail';

  // Auto-extract YouTube video ID and generate thumbnail with fallback
  useEffect(() => {
    const loadYouTubeThumbnail = async () => {
      if (formData.videoType === 'youtube' && formData.youtubeUrl) {
        const videoId = extractYouTubeVideoId(formData.youtubeUrl);
        setYoutubeVideoId(videoId);
        
        if (videoId && !formData.thumbnailFile) {
          setIsThumbnailLoading(true);
          
          try {
            // Get all fallback thumbnails
            const fallbacks = getThumbnailUrlsWithFallback(videoId);
            setFallbackThumbnails(fallbacks);
            
            // Try to get the best available thumbnail
            const bestThumbnail = await getBestThumbnailUrl(videoId);
            
            if (bestThumbnail) {
              setFormData(prev => ({
                ...prev,
                thumbnail: bestThumbnail,
                useDefaultThumbnail: false
              }));
            } else {
              // Use the first fallback (highest quality) as default
              setFormData(prev => ({
                ...prev,
                thumbnail: fallbacks[0] || null,
                useDefaultThumbnail: !fallbacks[0]
              }));
            }
          } catch (error) {
            console.error('Error loading YouTube thumbnail:', error);
            // Fallback to first thumbnail option
            const fallbacks = getThumbnailUrlsWithFallback(videoId);
            setFallbackThumbnails(fallbacks);
            setFormData(prev => ({
              ...prev,
              thumbnail: fallbacks[0] || null,
              useDefaultThumbnail: !fallbacks[0]
            }));
          } finally {
            setIsThumbnailLoading(false);
          }
        } else if (!videoId) {
          // Clear thumbnail if invalid URL
          setFormData(prev => ({
            ...prev,
            thumbnail: null
          }));
          setFallbackThumbnails([]);
        }
      }
    };

    loadYouTubeThumbnail();
  }, [formData.youtubeUrl, formData.videoType, formData.thumbnailFile]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear errors for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleVideoTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      videoType: type,
      youtubeUrl: '',
      videoFile: null,
      thumbnail: null,
      thumbnailFile: null,
      useDefaultThumbnail: false
    }));
    setYoutubeVideoId(null);
    setFallbackThumbnails([]);
  };

  const handleVideoFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setFormData(prev => ({
          ...prev,
          videoFile: file,
          thumbnail: null, // Clear YouTube thumbnail
          useDefaultThumbnail: true // Use default for manual uploads
        }));
        setErrors(prev => ({ ...prev, videoFile: '' }));
      } else {
        setErrors(prev => ({
          ...prev,
          videoFile: 'Please upload a valid video file'
        }));
      }
    }
  };

  const handleThumbnailUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          thumbnail: e.target.result,
          thumbnailFile: file,
          useDefaultThumbnail: false
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleThumbnailUpload(file);
    }
  };

  const removeThumbnail = () => {
    setFormData(prev => ({
      ...prev,
      thumbnail: null,
      thumbnailFile: null,
      useDefaultThumbnail: formData.videoType === 'upload'
    }));
    setFallbackThumbnails([]);
  };

  const handleRetryThumbnail = async () => {
    if (!youtubeVideoId) return;
    
    setIsThumbnailLoading(true);
    
    try {
      const bestThumbnail = await getBestThumbnailUrl(youtubeVideoId);
      if (bestThumbnail) {
        setFormData(prev => ({
          ...prev,
          thumbnail: bestThumbnail,
          useDefaultThumbnail: false
        }));
      }
    } catch (error) {
      console.error('Retry failed:', error);
    } finally {
      setIsThumbnailLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Course title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Course description is required';
    }

    if (formData.videoType === 'youtube') {
      if (!formData.youtubeUrl.trim()) {
        newErrors.youtubeUrl = 'YouTube URL is required';
      } else if (!isValidYouTubeUrl(formData.youtubeUrl)) {
        newErrors.youtubeUrl = 'Please enter a valid YouTube URL';
      }
    } else {
      if (!formData.videoFile) {
        newErrors.videoFile = 'Video file is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Add course using context
      const newCourse = addCourse(formData);
      
      // Show success message
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        title: '',
        description: '',
        videoType: 'youtube',
        youtubeUrl: '',
        videoFile: null,
        thumbnail: null,
        thumbnailFile: null,
        useDefaultThumbnail: false
      });
      setYoutubeVideoId(null);
      setFallbackThumbnails([]);
      setErrors({});
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Error creating course: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentThumbnail = () => {
    if (formData.thumbnail) {
      return formData.thumbnail;
    }
    if (formData.useDefaultThumbnail) {
      return defaultThumbnail;
    }
    return null;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
          <Check className="w-5 h-5 text-green-600 mr-2" />
          <p className="text-green-700">Course created successfully! Total courses: {courses.length}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Course Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter course title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.title}
            </p>
          )}
        </div>

        {/* Course Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter course description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.description}
            </p>
          )}
        </div>

        {/* Video Input Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video Source *
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => handleVideoTypeChange('youtube')}
              className={`flex items-center px-4 py-2 rounded-lg border-2 transition-colors ${
                formData.videoType === 'youtube'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <Link className="w-4 h-4 mr-2" />
              YouTube URL
            </button>
            <button
              type="button"
              onClick={() => handleVideoTypeChange('upload')}
              className={`flex items-center px-4 py-2 rounded-lg border-2 transition-colors ${
                formData.videoType === 'upload'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Video
            </button>
          </div>
        </div>

        {/* Video Input */}
        <div>
          {formData.videoType === 'youtube' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                YouTube Video URL *
              </label>
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) => handleInputChange('youtubeUrl', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.youtubeUrl ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://www.youtube.com/watch?v=..."
              />
              {errors.youtubeUrl && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.youtubeUrl}
                </p>
              )}
              {youtubeVideoId && (
                <p className="mt-2 text-sm text-green-600 flex items-center">
                  <Check className="w-4 h-4 mr-1" />
                  Valid YouTube video detected
                </p>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Video File *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Film className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <label className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-700 font-medium">
                    Choose video file
                  </span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoFileUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-gray-500 text-sm mt-2">
                  MP4, WebM, or OGG (Max 100MB)
                </p>
                {formData.videoFile && (
                  <p className="mt-2 text-sm text-green-600">
                    Selected: {formData.videoFile.name}
                  </p>
                )}
              </div>
              {errors.videoFile && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.videoFile}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Thumbnail Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Course Thumbnail
            {formData.videoType === 'youtube' && youtubeVideoId && (
              <span className="text-gray-500 font-normal ml-2">
                (Auto-generated from YouTube)
              </span>
            )}
          </label>
          
          {/* Thumbnail Preview */}
          <div className="mb-4">
            <ThumbnailPreview
              thumbnail={getCurrentThumbnail()}
              onRemove={removeThumbnail}
              onUpload={handleThumbnailUpload}
              isLoading={isThumbnailLoading}
              showUploadButton={formData.videoType === 'upload' || !youtubeVideoId}
              fallbackThumbnails={fallbackThumbnails}
              onRetry={handleRetryThumbnail}
            />
          </div>

          {/* Manual Thumbnail Upload Option */}
          {formData.videoType === 'upload' && (
            <div className="flex items-center space-x-4">
              <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <ImageIcon className="w-4 h-4 mr-2" />
                Upload Custom Thumbnail
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailFileUpload}
                  className="hidden"
                />
              </label>
              {formData.thumbnailFile && (
                <span className="text-sm text-green-600">
                  Custom thumbnail uploaded
                </span>
              )}
            </div>
          )}

          {/* YouTube Thumbnail Override Option */}
          {formData.videoType === 'youtube' && youtubeVideoId && (
            <div className="text-sm text-gray-600">
              <p>Thumbnail automatically generated from YouTube video.</p>
              <p className="mt-1">You can upload a custom thumbnail above if desired.</p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Creating Course...' : 'Create Course'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseCreationForm;
