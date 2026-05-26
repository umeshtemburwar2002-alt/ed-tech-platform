/**
 * College LMS - Certificate Page
 * Student certificate viewing and download page
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share2, CheckCircle, XCircle, Award, Calendar, User, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';

const Certificate = () => {
  const { certificateId } = useParams();
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    if (certificateId) {
      verifyCertificate();
    }
  }, [certificateId]);

  const verifyCertificate = async () => {
    setVerifying(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/certificates/verify/${certificateId}`);
      const data = await response.json();

      if (data.success) {
        setIsValid(data.data.valid);
        setCertificate(data.data.certificate);
      } else {
        setIsValid(false);
      }
    } catch (error) {
      console.error('Verification error:', error);
      setIsValid(false);
      toast.error('Failed to verify certificate');
    } finally {
      setLoading(false);
      setVerifying(false);
    }
  };

  const handleDownload = async () => {
    if (!certificate?.certificate_url) return;

    try {
      const response = await fetch(certificate.certificate_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificate-${certificateId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('Certificate downloaded successfully');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download certificate');
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/certificate/${certificateId}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Course Certificate',
          text: 'Check out my course completion certificate!',
          url: shareUrl,
        });
        toast.success('Certificate shared successfully');
      } catch (error) {
        console.error('Share error:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareUrl);
      toast.success('Certificate link copied to clipboard');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <Skeleton variant="card" className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full"
      >
        <AnimatePresence mode="wait">
          {!isValid ? (
            <motion.div
              key="invalid"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-8 border border-red-500/20 text-center"
            >
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Certificate Not Found</h1>
              <p className="text-slate-400 mb-8">
                The certificate you're looking for doesn't exist or has been revoked.
              </p>
              <Button onClick={() => navigate('/dashboard/student/courses')}>
                Go to My Courses
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="valid"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              {/* Verification Status */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-400 font-medium">This certificate is valid and verified</span>
              </div>

              {/* Certificate Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700 shadow-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-white mb-2">Certificate of Completion</h1>
                  <p className="text-slate-400">College LMS</p>
                </div>

                {/* Certificate Content */}
                <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
                  <div className="text-center mb-6">
                    <p className="text-slate-400 mb-2">This is to certify that</p>
                    <h2 className="text-3xl font-bold text-white mb-4">
                      {certificate?.profiles?.full_name || 'Student Name'}
                    </h2>
                    <p className="text-slate-400 mb-2">has successfully completed</p>
                    <h3 className="text-2xl font-bold text-blue-400 mb-4">
                      {certificate?.courses?.title || 'Course Title'}
                    </h3>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                      <BookOpen className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="text-xs text-slate-500">Subject Code</p>
                        <p className="text-white font-medium">
                          {certificate?.courses?.subject_code || 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                      <Calendar className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="text-xs text-slate-500">Issued Date</p>
                        <p className="text-white font-medium">
                          {new Date(certificate?.issued_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                      <User className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="text-xs text-slate-500">Certificate ID</p>
                        <p className="text-white font-medium text-sm">
                          {certificate?.uuid_token || 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="text-xs text-slate-500">Status</p>
                        <Badge variant="published">Verified</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    onClick={handleDownload}
                    variant="primary"
                    size="lg"
                    icon={Download}
                    fullWidth
                  >
                    Download Certificate
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="secondary"
                    size="lg"
                    icon={Share2}
                  >
                    Share
                  </Button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">Certificate Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Verification URL</span>
                    <span className="text-slate-300 font-mono text-xs">
                      {window.location.href}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Issued By</span>
                    <span className="text-slate-300">College LMS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Blockchain Verified</span>
                    <Badge variant="published" size="sm">Yes</Badge>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <p className="text-center text-slate-500 text-sm">
                This certificate can be verified at any time using the unique certificate ID above.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Certificate;
