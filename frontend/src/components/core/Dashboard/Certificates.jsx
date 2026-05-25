import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../../config/supabaseClient";
import { toast } from "react-hot-toast";
import { FaDownload, FaShare, FaEye, FaCertificate, FaCopy } from "react-icons/fa";
import { copyToClipboard } from "copy-to-clipboard";

export default function Certificates() {
  const { user } = useSelector((state) => state.profile);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    if (user?.id) {
      fetchCertificates();
    }
  }, [user?.id]);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('certificates')
        .select('*, course:courses!course_id(course_name, title)')
        .eq('user_id', user.id)
        .order('issued_at', { ascending: false });

      if (!error) {
        setCertificates(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateCertificate = async (courseId, courseName) => {
    try {
      const toastId = toast.loading("Generating certificate...");
      
      const certificateId = crypto.randomUUID();
      const issuedAt = new Date().toISOString();
      const certificateUrl = `/certificate/${certificateId}`;

      const { error } = await supabase.from('certificates').insert([{
        id: certificateId,
        user_id: user.id,
        course_id: courseId,
        certificate_url: certificateUrl,
        issued_at: issuedAt
      }]);

      if (error) throw error;

      toast.success("Certificate generated!", { id: toastId });
      fetchCertificates();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const copyCertificateLink = (certificate) => {
    copyToClipboard(window.location.origin + certificate.certificate_url);
    toast.success("Link copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-yellow-50/30 border-t-yellow-50 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="text-yellow-50 text-5xl">
            <FaCertificate />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-richblack-5">My Certificates</h1>
            <p className="text-sm text-richblack-300 mt-1">
              Certificates earned from completed courses
            </p>
          </div>
        </div>
      </div>

      {selectedCertificate && (
        <div className="bg-white p-12 rounded-3xl shadow-2xl max-w-4xl mx-auto">
          <div className="text-center space-y-8 border-8 border-yellow-500 rounded-2xl p-12 bg-gradient-to-br from-yellow-50 to-white">
            <div className="text-yellow-600 text-6xl">
              <FaCertificate />
            </div>
            
            <div>
              <h1 className="text-5xl font-black text-gray-800 tracking-widest mb-2">
                CERTIFICATE OF COMPLETION
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-yellow-500 to-yellow-300 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-2">
              <p className="text-gray-600 font-medium text-lg">This is to certify that</p>
              <p className="text-4xl font-bold text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-gray-600 font-medium">has successfully completed the course</p>
              <p className="text-2xl font-bold text-yellow-700">
                {selectedCertificate.course?.course_name || selectedCertificate.course?.title}
              </p>
            </div>

            <div className="flex items-center justify-between pt-8 border-t-2 border-dashed border-gray-300">
              <div className="text-left">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Issued On</p>
                <p className="text-lg font-semibold text-gray-800">
                  {new Date(selectedCertificate.issued_at).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Certificate ID</p>
                <p className="text-lg font-mono font-semibold text-gray-800">
                  {selectedCertificate.id.substring(0, 8).toUpperCase()}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setSelectedCertificate(null)}
              className="px-6 py-3 text-sm font-bold rounded-lg bg-richblack-700 text-richblack-25 hover:bg-richblack-600 transition-all"
            >
              Close
            </button>
            <button
              onClick={() => copyCertificateLink(selectedCertificate)}
              className="px-6 py-3 text-sm font-bold rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all flex items-center gap-2"
            >
              <FaCopy /> Copy Link
            </button>
            <button
              className="px-6 py-3 text-sm font-bold rounded-lg bg-yellow-500 text-richblack-900 hover:bg-yellow-600 transition-all flex items-center gap-2"
            >
              <FaDownload /> Download PDF
            </button>
          </div>
        </div>
      )}

      {!selectedCertificate && (
        <>
          {certificates.length === 0 ? (
            <div className="bg-richblack-800 p-12 rounded-2xl border border-richblack-700 shadow-xl text-center">
              <div className="text-richblack-400 text-8xl mb-6">
                <FaCertificate />
              </div>
              <h3 className="text-xl font-bold text-richblack-5 mb-2">No Certificates Yet</h3>
              <p className="text-sm text-richblack-400 max-w-md mx-auto">
                Complete your courses to earn certificates that you can download and share!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-richblack-800 rounded-2xl border border-richblack-700 shadow-xl overflow-hidden hover:border-yellow-50/50 transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-yellow-50 text-4xl">
                        <FaCertificate />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-richblack-5 line-clamp-2">
                          {cert.course?.course_name || cert.course?.title}
                        </h3>
                        <p className="text-xs text-richblack-400 mt-1">
                          Issued on {new Date(cert.issued_at).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs text-richblack-400">
                        <span className="font-mono">
                          {cert.id.substring(0, 8).toUpperCase()}...
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedCertificate(cert)}
                          className="flex-1 px-3 py-2 text-xs font-bold rounded-lg bg-yellow-50 text-richblack-900 hover:bg-yellow-100 transition-all flex items-center justify-center gap-1"
                        >
                          <FaEye /> View
                        </button>
                        <button
                          onClick={() => copyCertificateLink(cert)}
                          className="flex-1 px-3 py-2 text-xs font-bold rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all flex items-center justify-center gap-1"
                        >
                          <FaShare /> Share
                        </button>
                        <button
                          className="flex-1 px-3 py-2 text-xs font-bold rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-all flex items-center justify-center gap-1"
                        >
                          <FaDownload /> Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
