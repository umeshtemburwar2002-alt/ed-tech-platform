/**
 * College LMS - Date Format Utility
 * Format dates in various formats
 */

import { format, formatRelative, formatDistanceToNow, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';

/**
 * Format date in full format
 * @param {Date|string} date - Date to format
 * @param {string} formatStr - Format string (default: 'MMMM dd, yyyy')
 * @returns {string} - Formatted date
 */
export const formatFull = (date, formatStr = 'MMMM dd, yyyy') => {
  if (!date) return '';
  return format(new Date(date), formatStr);
};

/**
 * Format date relative to now (e.g., "2 hours ago")
 * @param {Date|string} date - Date to format
 * @returns {string} - Relative date string
 */
export const formatRelativeDate = (date) => {
  if (!date) return '';
  return formatRelative(new Date(date), new Date());
};

/**
 * Format distance to now (e.g., "2 hours ago")
 * @param {Date|string} date - Date to format
 * @returns {string} - Distance string
 */
export const formatDistance = (date) => {
  if (!date) return '';
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

/**
 * Format duration in seconds to mm:ss
 * @param {number} seconds - Duration in seconds
 * @returns {string} - Formatted duration (mm:ss or hh:mm:ss)
 */
export const formatDuration = (seconds) => {
  if (!seconds && seconds !== 0) return '0:00';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  return `${minutes}:${String(secs).padStart(2, '0')}`;
};

/**
 * Format duration in seconds to human-readable format
 * @param {number} seconds - Duration in seconds
 * @returns {string} - Human-readable duration (e.g., "2h 30m")
 */
export const formatDurationHuman = (seconds) => {
  if (!seconds && seconds !== 0) return '0m';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
};

/**
 * Get time ago in short format
 * @param {Date|string} date - Date to format
 * @returns {string} - Short time ago (e.g., "2h", "30m")
 */
export const timeAgoShort = (date) => {
  if (!date) return '';

  const now = new Date();
  const then = new Date(date);
  const diffDays = differenceInDays(now, then);
  const diffHours = differenceInHours(now, then);
  const diffMinutes = differenceInMinutes(now, then);

  if (diffDays > 0) return `${diffDays}d`;
  if (diffHours > 0) return `${diffHours}h`;
  if (diffMinutes > 0) return `${diffMinutes}m`;
  return 'now';
};

/**
 * Format date for input (YYYY-MM-DD)
 * @param {Date|string} date - Date to format
 * @returns {string} - Formatted date for input
 */
export const formatForInput = (date) => {
  if (!date) return '';
  return format(new Date(date), 'yyyy-MM-dd');
};

/**
 * Format date for datetime-local input
 * @param {Date|string} date - Date to format
 * @returns {string} - Formatted datetime for input
 */
export const formatForDateTimeInput = (date) => {
  if (!date) return '';
  return format(new Date(date), "yyyy-MM-dd'T'HH:mm");
};

export default {
  formatFull,
  formatRelativeDate,
  formatDistance,
  formatDuration,
  formatDurationHuman,
  timeAgoShort,
  formatForInput,
  formatForDateTimeInput,
};
