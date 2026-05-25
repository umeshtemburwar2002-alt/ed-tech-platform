/**
 * Extract YouTube video ID from various URL formats
 * @param {string} url - YouTube video URL
 * @returns {string|null} - Video ID or null if invalid
 */
export const extractYouTubeVideoId = (url) => {
  if (!url || typeof url !== 'string') return null;

  // Clean and normalize URL
  const cleanUrl = url.trim().toLowerCase();
  
  // More specific patterns in order of priority
  const patterns = [
    // YouTube Shorts: youtube.com/shorts/VIDEO_ID
    {
      pattern: /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
      extractor: (match) => match[1]
    },
    // Standard YouTube watch: youtube.com/watch?v=VIDEO_ID
    {
      pattern: /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
      extractor: (match) => match[1]
    },
    // YouTube embed: youtube.com/embed/VIDEO_ID
    {
      pattern: /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      extractor: (match) => match[1]
    },
    // YouTube v parameter in any order: ?v=VIDEO_ID or &v=VIDEO_ID
    {
      pattern: /[?&]v=([a-zA-Z0-9_-]{11})/,
      extractor: (match) => match[1]
    },
    // Shortened youtu.be: youtu.be/VIDEO_ID
    {
      pattern: /youtu\.be\/([a-zA-Z0-9_-]{11})/,
      extractor: (match) => match[1]
    },
    // YouTube live: youtube.com/live/VIDEO_ID
    {
      pattern: /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/,
      extractor: (match) => match[1]
    },
    // YouTube v videos: youtube.com/v/VIDEO_ID
    {
      pattern: /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
      extractor: (match) => match[1]
    }
  ];

  for (const { pattern, extractor } of patterns) {
    const match = cleanUrl.match(pattern);
    if (match && extractor(match)) {
      const videoId = extractor(match);
      // Validate video ID format (11 characters)
      if (/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
        return videoId;
      }
    }
  }

  return null;
};

/**
 * Validate YouTube URL
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid YouTube URL
 */
export const isValidYouTubeUrl = (url) => {
  return extractYouTubeVideoId(url) !== null;
};

/**
 * Generate YouTube thumbnail URL with fallback
 * @param {string} videoId - YouTube video ID
 * @param {string} quality - Thumbnail quality (default, medium, high, maxres)
 * @returns {string} - Thumbnail URL
 */
export const generateYouTubeThumbnailUrl = (videoId, quality = 'high') => {
  if (!videoId) return null;

  const qualityMap = {
    default: 'default',
    medium: 'mqdefault',
    high: 'hqdefault',
    maxres: 'maxresdefault',
  };

  const selectedQuality = qualityMap[quality] || qualityMap.high;
  return `https://img.youtube.com/vi/${videoId}/${selectedQuality}.jpg`;
};

/**
 * Get thumbnail URLs with fallback logic
 * @param {string} videoId - YouTube video ID
 * @returns {Array} - Array of thumbnail URLs in order of preference
 */
export const getThumbnailUrlsWithFallback = (videoId) => {
  if (!videoId) return [];

  return [
    generateYouTubeThumbnailUrl(videoId, 'maxres'),
    generateYouTubeThumbnailUrl(videoId, 'high'),
    generateYouTubeThumbnailUrl(videoId, 'medium'),
    generateYouTubeThumbnailUrl(videoId, 'default'),
  ].filter(Boolean);
};

/**
 * Get multiple thumbnail options for a YouTube video
 * @param {string} videoId - YouTube video ID
 * @returns {Array} - Array of thumbnail objects
 */
export const getYouTubeThumbnailOptions = (videoId) => {
  if (!videoId) return [];

  const qualities = [
    { name: 'maxres', label: 'Maximum Resolution', url: generateYouTubeThumbnailUrl(videoId, 'maxres') },
    { name: 'high', label: 'High Quality', url: generateYouTubeThumbnailUrl(videoId, 'high') },
    { name: 'medium', label: 'Medium Quality', url: generateYouTubeThumbnailUrl(videoId, 'medium') },
    { name: 'default', label: 'Default', url: generateYouTubeThumbnailUrl(videoId, 'default') },
  ];

  return qualities;
};

/**
 * Check if thumbnail URL is accessible
 * @param {string} url - Thumbnail URL to check
 * @returns {Promise<boolean>} - True if URL is accessible
 */
export const checkThumbnailAccessibility = async (url) => {
  if (!url) return false;
  
  return new Promise((resolve) => {
    const img = new Image();
    const timeout = setTimeout(() => {
      resolve(false);
    }, 3000); // 3 second timeout

    img.onload = () => {
      clearTimeout(timeout);
      resolve(true);
    };

    img.onerror = () => {
      clearTimeout(timeout);
      resolve(false);
    };

    img.src = url;
  });
};

/**
 * Get best available thumbnail URL with automatic fallback
 * @param {string} videoId - YouTube video ID
 * @returns {Promise<string|null>} - Best available thumbnail URL
 */
export const getBestThumbnailUrl = async (videoId) => {
  if (!videoId) return null;

  const thumbnailUrls = getThumbnailUrlsWithFallback(videoId);
  
  for (const url of thumbnailUrls) {
    const isAccessible = await checkThumbnailAccessibility(url);
    if (isAccessible) {
      return url;
    }
  }

  return null;
};
