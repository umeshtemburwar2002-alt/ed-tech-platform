/**
 * College LMS - Email Service
 * Nodemailer configuration and email sending functions
 */

import nodemailer from 'react-native-nodemailer';
import config from './env.config.js';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: config.emailHost,
    port: config.emailPort,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
  });
};

/**
 * Send enrollment confirmation email
 * @param {string} to - Recipient email
 * @param {Object} data - Enrollment data
 */
export const sendEnrollmentConfirmation = async (to, data) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"${config.collegeName}" <${config.emailUser}>`,
      to,
      subject: `Enrollment Confirmation - ${data.courseTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 Enrollment Confirmed!</h1>
            </div>
            <div class="content">
              <p>Dear ${data.studentName},</p>
              <p>You have been successfully enrolled in <strong>${data.courseTitle}</strong>.</p>
              <p><strong>Course Details:</strong></p>
              <ul>
                <li>Subject Code: ${data.subjectCode}</li>
                <li>Instructor: ${data.instructorName}</li>
                <li>Department: ${data.department}</li>
              </ul>
              <a href="${config.collegeWebsite}/dashboard/student/courses" class="button">Access Course</a>
              <p class="footer">© ${new Date().getFullYear()} ${config.collegeName}. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Enrollment confirmation email sent to ${to}`);
  } catch (error) {
    console.error('Error sending enrollment confirmation:', error);
    throw error;
  }
};

/**
 * Send certificate email
 * @param {string} to - Recipient email
 * @param {Object} data - Certificate data
 */
export const sendCertificateEmail = async (to, data) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"${config.collegeName}" <${config.emailUser}>`,
      to,
      subject: `🏆 Certificate of Completion - ${data.courseTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 24px; background: #f5576c; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏆 Congratulations!</h1>
            </div>
            <div class="content">
              <p>Dear ${data.studentName},</p>
              <p>You have successfully completed <strong>${data.courseTitle}</strong>!</p>
              <p>Your certificate of completion is now available for download.</p>
              <p><strong>Achievement Details:</strong></p>
              <ul>
                <li>Subject Code: ${data.subjectCode}</li>
                <li>Completion Date: ${data.completionDate}</li>
                <li>Certificate ID: ${data.certificateId}</li>
              </ul>
              <a href="${data.certificateUrl}" class="button">Download Certificate</a>
              <p class="footer">© ${new Date().getFullYear()} ${config.collegeName}. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Certificate email sent to ${to}`);
  } catch (error) {
    console.error('Error sending certificate email:', error);
    throw error;
  }
};

/**
 * Send password reset email
 * @param {string} to - Recipient email
 * @param {string} resetLink - Password reset link
 */
export const sendPasswordResetEmail = async (to, resetLink) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"${config.collegeName}" <${config.emailUser}>`,
      to,
      subject: 'Password Reset Request',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 24px; background: #4facfe; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Password Reset</h1>
            </div>
            <div class="content">
              <p>You requested a password reset for your account.</p>
              <p>Click the button below to reset your password:</p>
              <a href="${resetLink}" class="button">Reset Password</a>
              <p style="margin-top: 20px; font-size: 12px; color: #666;">
                This link will expire in 1 hour. If you didn't request this, please ignore this email.
              </p>
              <p class="footer">© ${new Date().getFullYear()} ${config.collegeName}. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${to}`);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

export default {
  sendEnrollmentConfirmation,
  sendCertificateEmail,
  sendPasswordResetEmail,
};
