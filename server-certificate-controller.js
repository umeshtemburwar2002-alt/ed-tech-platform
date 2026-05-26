/**
 * College LMS - Certificate Controller
 * Handles certificate generation, verification, and retrieval
 */

import {
  generateAndUploadCertificate,
  verifyCertificate,
  checkCertificateEligibility,
} from '../utils/generateCertificate.js';
import { supabase } from '../config/supabase.js';
import { sendCertificateEmail } from '../utils/emailService.js';

/**
 * Generate certificate for course completion
 * @route POST /api/certificates/generate
 */
export const generateCertificate = async (req, res) => {
  try {
    const { courseId, studentId } = req.body;

    if (!courseId || !studentId) {
      return res.status(400).json({
        success: false,
        message: 'Course ID and Student ID are required',
      });
    }

    // Check eligibility
    const eligibility = await checkCertificateEligibility(courseId, studentId);

    if (!eligibility.eligible) {
      return res.status(400).json({
        success: false,
        message: eligibility.reason,
        eligibility,
      });
    }

    // Fetch course and student details
    const { data: course, error: courseError } = await supabase
      .from('courses')
      .select(`
        *,
        profiles:instructor_id (full_name),
        departments (name)
      `)
      .eq('id', courseId)
      .single();

    if (courseError || !course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    const { data: student, error: studentError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', studentId)
      .single();

    if (studentError || !student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    // Generate certificate data
    const certificateData = {
      courseId,
      studentId,
      studentName: student.full_name,
      courseTitle: course.title,
      subjectCode: course.subject_code,
      instructorName: course.profiles?.full_name || 'Instructor',
      department: course.departments?.name || 'General',
      semester: course.semester || 'N/A',
      completionDate: new Date().toISOString(),
    };

    // Generate and upload certificate
    const { certificateId, certificateUrl, certificateRecord } =
      await generateAndUploadCertificate(certificateData);

    // Send email notification
    try {
      await sendCertificateEmail(student.email, {
        studentName: student.full_name,
        courseTitle: course.title,
        subjectCode: course.subject_code,
        completionDate: format(new Date(), 'MMMM dd, yyyy'),
        certificateId,
        certificateUrl,
      });
    } catch (emailError) {
      console.error('Failed to send certificate email:', emailError);
      // Continue even if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Certificate generated successfully',
      data: {
        certificateId,
        certificateUrl,
        certificateRecord,
      },
    });
  } catch (error) {
    console.error('Generate certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate certificate',
    });
  }
};

/**
 * Verify certificate by UUID
 * @route GET /api/certificates/verify/:certificateId
 */
export const verifyCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const verification = await verifyCertificate(certificateId);

    res.status(200).json({
      success: true,
      data: verification,
    });
  } catch (error) {
    console.error('Verify certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify certificate',
    });
  }
};

/**
 * Get student certificates
 * @route GET /api/certificates/student/:studentId
 */
export const getStudentCertificates = async (req, res) => {
  try {
    const { studentId } = req.params;

    const { data: certificates, error } = await supabase
      .from('certificates')
      .select(`
        *,
        courses (
          title,
          subject_code,
          thumbnail_url
        )
      `)
      .eq('student_id', studentId)
      .order('issued_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      data: { certificates },
    });
  } catch (error) {
    console.error('Get student certificates error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch certificates',
    });
  }
};

/**
 * Get course certificates
 * @route GET /api/certificates/course/:courseId
 */
export const getCourseCertificates = async (req, res) => {
  try {
    const { courseId } = req.params;

    const { data: certificates, error } = await supabase
      .from('certificates')
      .select(`
        *,
        profiles:student_id (
          full_name,
          email,
          roll_number
        )
      `)
      .eq('course_id', courseId)
      .order('issued_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.status(200).json({
      success: true,
      data: { certificates },
    });
  } catch (error) {
    console.error('Get course certificates error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch certificates',
    });
  }
};

/**
 * Download certificate
 * @route GET /api/certificates/download/:certificateId
 */
export const downloadCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const { data: certificate, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('uuid_token', certificateId)
      .single();

    if (error || !certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found',
      });
    }

    // Redirect to the certificate URL
    res.redirect(certificate.certificate_url);
  } catch (error) {
    console.error('Download certificate error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to download certificate',
    });
  }
};

/**
 * Check certificate eligibility
 * @route GET /api/certificates/check-eligibility/:courseId/:studentId
 */
export const checkEligibility = async (req, res) => {
  try {
    const { courseId, studentId } = req.params;

    const eligibility = await checkCertificateEligibility(courseId, studentId);

    res.status(200).json({
      success: true,
      data: eligibility,
    });
  } catch (error) {
    console.error('Check eligibility error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check eligibility',
    });
  }
};

export default {
  generateCertificate,
  verifyCertificate,
  getStudentCertificates,
  getCourseCertificates,
  downloadCertificate,
  checkEligibility,
};
