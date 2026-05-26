/**
 * College LMS - Slugify Utility
 * Converts title to URL-safe slug, handles Hindi/special characters
 */

/**
 * Convert string to URL-friendly slug
 * @param {string} text - Text to slugify
 * @returns {string} - URL-safe slug
 */
export const slugify = (text) => {
  if (!text) return '';

  return text
    .toString()
    .toLowerCase()
    .trim()
    // Replace Hindi and special characters with closest ASCII
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Replace spaces and special chars with hyphens
    .replace(/[\s\W_]+/g, '-')
    // Remove multiple hyphens
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
};

/**
 * Generate unique slug by appending number if exists
 * @param {string} text - Base text
 * @param {string[]} existingSlugs - Array of existing slugs to avoid
 * @returns {string} - Unique slug
 */
export const generateUniqueSlug = (text, existingSlugs = []) => {
  let baseSlug = slugify(text);
  let uniqueSlug = baseSlug;
  let counter = 1;

  while (existingSlugs.includes(uniqueSlug)) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
};

export default slugify;
