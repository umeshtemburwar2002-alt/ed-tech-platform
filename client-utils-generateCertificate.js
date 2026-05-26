/**
 * College LMS - Generate Certificate Utility (Client)
 * Triggers API call to generate certificate and opens PDF in new tab
 */

import api from '../services/api';

/**
 * Generate certificate for course completion
 * @param {string} courseId - Course ID
 * @param {string} studentId - Student ID
 * @returns {Promise<Object>} - Certificate data
 */
export const generateCertificate = async (courseId, studentId) => {
  try {
    const response = await api.post('/certificates/generate', {
      courseId,
      studentId,
    });

    return response;
  } catch (error) {
    console.error('Generate certificate error:', error);
    throw error;
  }
};

/**
 * Verify certificate by UUID
 * @param {string} certificateId - Certificate UUID
 * @returns {Promise<Object>} - Verification data
 */
export const verifyCertificate = async (certificateId) => {
  try {
    const response = await api.get(`/certificates/verify/${certificateId}`);
    return response;
  } catch (error) {
    console.error('Verify certificate error:', error);
    throw error;
  }
};

/**
 * Download certificate PDF
 * @param {string} certificateId - Certificate UUID
 */
export const downloadCertificate = (certificateId) => {
  const url = `${import.meta.env.VITE_API_URL}/certificates/download/${certificateId}`;
  window.open(url, '_blank');
};

/**
 * Open certificate in new tab
 * @param {string} certificateId - Certificate UUID
 */
export const openCertificate = (certificateId) => {
  const url = `${window.location.origin}/certificate/${certificateId}`;
  window.open(url, '_blank');
};

export default {
  generateCertificate,
  verifyCertificate,
  downloadCertificate,
  openCertificate,
};
