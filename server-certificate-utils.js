/**
 * College LMS - Certificate Generation Utility
 * PDFKit-based certificate generation with college branding
 */

import PDFDocument from 'pdfkit';
import { supabase, uploadFile, getPublicUrl } from '../config/supabase.js';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import config from './env.config.js';

/**
 * Generate a certificate PDF for course completion
 * @param {Object} data - Certificate data
 * @returns {Promise<Buffer>} - PDF buffer
 */
export const generateCertificatePDF = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        layout: 'landscape',
        margin: 0,
      });

      const chunks = [];
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Certificate dimensions
      const width = 841.89; // A4 landscape width in points
      const height = 595.28; // A4 landscape height in points

      // Background gradient (simulated with rectangles)
      doc.rect(0, 0, width, height).fill('#f8f9fa');

      // Decorative border
      doc
        .rect(20, 20, width - 40, height - 40)
        .lineWidth(3)
        .stroke('#667eea');

      // Inner border
      doc
        .rect(30, 30, width - 60, height - 60)
        .lineWidth(1)
        .stroke('#764ba2');

      // College logo placeholder (would be actual image in production)
      doc
        .roundedRect(width / 2 - 50, 60, 100, 100, 10)
        .fill('#667eea');
      
      doc.fillColor('white');
      doc.fontSize(40);
      doc.text('🎓', width / 2 - 20, 100, { align: 'center' });

      // College name
      doc.fillColor('#1a1a2e');
      doc.fontSize(32);
      doc.font('Helvetica-Bold');
      doc.text(config.collegeName, width / 2, 180, { align: 'center' });

      // Certificate title
      doc.fillColor('#667eea');
      doc.fontSize(24);
      doc.font('Helvetica-Bold');
      doc.text('CERTIFICATE OF COMPLETION', width / 2, 220, { align: 'center' });

      // Decorative line
      doc
        .moveTo(width / 2 - 150, 240)
        .lineTo(width / 2 + 150, 240)
        .lineWidth(2)
        .stroke('#764ba2');

      // "This is to certify that"
      doc.fillColor('#4a4a4a');
      doc.fontSize(14);
      doc.font('Helvetica');
      doc.text('This is to certify that', width / 2, 270, { align: 'center' });

      // Student name
      doc.fillColor('#1a1a2e');
      doc.fontSize(36);
      doc.font('Helvetica-Bold');
      doc.text(data.studentName, width / 2, 300, { align: 'center' });

      // "has successfully completed"
      doc.fillColor('#4a4a4a');
      doc.fontSize(14);
      doc.font('Helvetica');
      doc.text('has successfully completed the course', width / 2, 340, { align: 'center' });

      // Course title
      doc.fillColor('#667eea');
      doc.fontSize(28);
      doc.font('Helvetica-Bold');
      doc.text(data.courseTitle, width / 2, 380, { align: 'center' });

      // Course details
      doc.fillColor('#4a4a4a');
      doc.fontSize(12);
      doc.font('Helvetica');
      
      const detailsY = 420;
      const leftColumn = 150;
      const rightColumn = width - 150;

      doc.text(`Subject Code: ${data.subjectCode}`, leftColumn, detailsY);
      doc.text(`Department: ${data.department}`, rightColumn, detailsY, { align: 'right' });

      doc.text(`Instructor: ${data.instructorName}`, leftColumn, detailsY + 25);
      doc.text(`Semester: ${data.semester}`, rightColumn, detailsY + 25, { align: 'right' });

      // Completion date
      doc.text(`Completion Date: ${format(new Date(data.completionDate), 'MMMM dd, yyyy')}`, leftColumn, detailsY + 50);

      // Certificate ID
      doc.text(`Certificate ID: ${data.certificateId}`, rightColumn, detailsY + 50, { align: 'right' });

      // Signature section
      const signatureY = 500;
      doc.fontSize(10);
      doc.font('Helvetica');

      // Left signature - Instructor
      doc.text('_____________________', leftColumn, signatureY);
      doc.text(data.instructorName, leftColumn, signatureY + 15);
      doc.text('Course Instructor', leftColumn, signatureY + 30);

      // Right signature - HOD/Admin
      doc.text('_____________________', rightColumn, signatureY, { align: 'right' });
      doc.text('Head of Department', rightColumn, signatureY + 15, { align: 'right' });
      doc.text(config.collegeName, rightColumn, signatureY + 30, { align: 'right' });

      // Verification text
      doc.fillColor('#666');
      doc.fontSize(9);
      doc.text(
        'This certificate can be verified at ' + config.collegeWebsite + '/verify/' + data.certificateId,
        width / 2,
        height - 40,
        { align: 'center' }
      );

      // Footer
      doc.fillColor('#999');
      doc.fontSize(8);
      doc.text(
        `Issued on ${format(new Date(), 'MMMM dd, yyyy HH:mm:ss')} | Valid Certificate`,
        width / 2,
        height - 20,
        { align: 'center' }
      );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Generate and upload certificate to Supabase Storage
 * @param {Object} data - Certificate data
 * @returns {Promise<Object>} - Certificate URL and metadata
 */
export const generateAndUploadCertificate = async (data) => {
  try {
    // Generate PDF
    const pdfBuffer = await generateCertificatePDF(data);

    // Generate unique certificate ID
    const certificateId = uuidv4();

    // Upload to Supabase Storage
    const fileName = `${certificateId}.pdf`;
    const filePath = `${certificateId}/${fileName}`;

    const { data: uploadData, error: uploadError } = await uploadFile(
      'certificates',
      filePath,
      pdfBuffer,
      {
        contentType: 'application/pdf',
        upsert: false,
      }
    );

    if (uploadError) {
      throw new Error(`Failed to upload certificate: ${uploadError.message}`);
    }

    // Get public URL
    const certificateUrl = getPublicUrl('certificates', filePath);

    // Save certificate record to database
    const { data: certificateRecord, error: dbError } = await supabase
      .from('certificates')
      .insert({
        course_id: data.courseId,
        student_id: data.studentId,
        issued_at: new Date().toISOString(),
        certificate_url: certificateUrl,
        uuid_token: certificateId,
      })
      .select()
      .single();

    if (dbError) {
      throw new Error(`Failed to save certificate record: ${dbError.message}`);
    }

    return {
      certificateId,
      certificateUrl,
      certificateRecord,
    };
  } catch (error) {
    console.error('Certificate generation error:', error);
    throw error;
  }
};

/**
 * Verify certificate by UUID
 * @param {string} certificateId - Certificate UUID
 * @returns {Promise<Object>} - Certificate verification data
 */
export const verifyCertificate = async (certificateId) => {
  try {
    const { data: certificate, error } = await supabase
      .from('certificates')
      .select(`
        *,
        courses (
          title,
          subject_code,
          instructor_id,
          department_id
        ),
        profiles (
          full_name,
          email
        )
      `)
      .eq('uuid_token', certificateId)
      .single();

    if (error) {
      throw new Error(`Certificate verification failed: ${error.message}`);
    }

    if (!certificate) {
      return {
        valid: false,
        message: 'Certificate not found',
      };
    }

    return {
      valid: true,
      certificate,
    };
  } catch (error) {
    console.error('Certificate verification error:', error);
    return {
      valid: false,
      message: error.message,
    };
  }
};

/**
 * Check if student is eligible for certificate
 * @param {string} courseId - Course ID
 * @param {string} studentId - Student ID
 * @returns {Promise<Object>} - Eligibility status
 */
export const checkCertificateEligibility = async (courseId, studentId) => {
  try {
    // Check if student is enrolled
    const { data: enrollment, error: enrollmentError } = await supabase
      .from('enrollments')
      .select('*')
      .eq('course_id', courseId)
      .eq('student_id', studentId)
      .single();

    if (enrollmentError || !enrollment) {
      return {
        eligible: false,
        reason: 'Student not enrolled in this course',
      };
    }

    // Check if certificate already issued
    const { data: existingCertificate, error: certError } = await supabase
      .from('certificates')
      .select('*')
      .eq('course_id', courseId)
      .eq('student_id', studentId)
      .single();

    if (existingCertificate) {
      return {
        eligible: false,
        reason: 'Certificate already issued',
        existingCertificate,
      };
    }

    // Check course completion (all lessons completed)
    const { data: lessons, error: lessonsError } = await supabase
      .from('course_lessons')
      .select('id')
      .eq('course_id', courseId);

    if (lessonsError) {
      throw new Error(`Failed to fetch lessons: ${lessonsError.message}`);
    }

    const lessonIds = lessons.map((l) => l.id);

    const { data: progress, error: progressError } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('student_id', studentId)
      .in('lesson_id', lessonIds);

    if (progressError) {
      throw new Error(`Failed to fetch progress: ${progressError.message}`);
    }

    const completedLessons = progress.filter((p) => p.completed).length;
    const totalLessons = lessons.length;
    const completionPercentage = (completedLessons / totalLessons) * 100;

    if (completionPercentage < 100) {
      return {
        eligible: false,
        reason: 'Course not completed',
        completionPercentage,
        completedLessons,
        totalLessons,
      };
    }

    return {
      eligible: true,
      completionPercentage: 100,
      completedLessons,
      totalLessons,
    };
  } catch (error) {
    console.error('Certificate eligibility check error:', error);
    return {
      eligible: false,
      reason: 'Error checking eligibility',
    };
  }
};

export default {
  generateCertificatePDF,
  generateAndUploadCertificate,
  verifyCertificate,
  checkCertificateEligibility,
};
