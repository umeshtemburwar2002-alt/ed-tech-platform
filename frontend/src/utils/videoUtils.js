/**
 * Utility functions for video handling
 */

/**
 * Extracts YouTube Video ID from various URL formats or returns the ID if already provided
 * @param {string} url - The YouTube URL or Video ID
 * @returns {string|null} - The 11-character Video ID or null if invalid
 */
export const getYouTubeID = (url) => {
  if (!url) return null;
  
  // If it's already a clean 11-char ID
  if (url.length === 11 && !url.includes('/') && !url.includes('?')) {
    return url;
  }

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11) ? match[2] : null;
};

/**
 * Returns a valid YouTube embed URL
 * @param {string} videoIdOrUrl - The Video ID or YouTube URL
 * @returns {string} - The formatted embed URL
 */
export const getEmbedUrl = (videoIdOrUrl) => {
  const id = getYouTubeID(videoIdOrUrl);
  if (!id) return '';
  return `https://www.youtube.com/embed/${id}?autoplay=0&rel=0&modestbranding=1&showinfo=0&controls=1`;
};

/**
 * Checks if a string is a potentially valid YouTube ID (basic length check)
 * @param {string} id 
 * @returns {boolean}
 */
export const isValidYouTubeID = (id) => {
  return typeof id === 'string' && id.length === 11;
};
