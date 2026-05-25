import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle, Mail, Zap, BookOpen, Paperclip, Upload, X, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../config/supabaseClient';
import { uploadFile, validateFile } from '../services/storage/supportAttachments';
import { GlassCard, Badge } from '../components/dashboard/Common';
import { FAQ_DATA } from '../data/student-dashboard-data';

const StudentSupport = () => {
  const { user } = useSelector((s) => s.profile);
  const [openIdx, setOpenIdx] = useState(null);
  const [formSent, setFormSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [subject, setSubject] = useState('Course Content Issue');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
    user?.email?.split('@')[0] ||
    '';
  const userEmail = user?.email || '';

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setUserData(data);
    };

    fetchUser();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validation = validateFile(selectedFile);
      if (!validation.valid) {
        toast.error(validation.error);
        return;
      }
      setFile(selectedFile);
      if (selectedFile.type.startsWith('image/')) {
        setFilePreview(URL.createObjectURL(selectedFile));
      } else {
        setFilePreview(null);
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setFilePreview(null);
  };

  const handleFileUpload = async () => {
    if (!file || !user) return null;
    return await uploadFile(file, user, 'student');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    try {
      setLoading(true);

      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        toast.error('User not logged in');
        return;
      }

      let attachmentUrl = null;

      if (file) {
        attachmentUrl = await handleFileUpload();
      }

      const { error } = await supabase
        .from('support_tickets')
        .insert([
          {
            user_id: authUser.id,
            name: `${userData?.firstName || user?.firstName || ''} ${userData?.lastName || user?.lastName || ''}`,
            email: userData?.email || user?.email || '',
            subject,
            category: subject,
            message,
            attachment_url: attachmentUrl,
            status: 'open',
            priority: 'medium',
          },
        ]);

      if (error) {
        console.error(error);
        toast.error('Ticket creation failed');
        return;
      }

      toast.success('Support ticket submitted successfully');
      setFormSent(true);
      setSubject('Course Content Issue');
      setMessage('');
      setFile(null);
      setFilePreview(null);

    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white"
        >
          How can we help?
        </motion.h2>
        <p className="text-gray-400 text-lg">Browse FAQ or contact our support experts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h3>
          {FAQ_DATA.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full p-5 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-sm font-bold text-gray-200">{item.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openIdx === i ? 'rotate-180 text-cyan-400' : ''}`}
                />
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="p-5 pt-0 text-sm text-gray-400 leading-relaxed border-t border-white/5">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <GlassCard className="h-fit">
          {formSent ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-20 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
              <p className="text-gray-400 mt-2">We'll get back to you within 2 hours.</p>
              <button
                onClick={() => setFormSent(false)}
                className="mt-8 text-cyan-400 font-bold hover:underline transition-colors"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-white">Get in Touch</h3>
                <Badge text="Replies Within 2 Hours" color="emerald" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Name</label>
                  <input
                    type="text"
                    value={displayName}
                    readOnly
                    className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Email</label>
                  <input
                    type="email"
                    value={userEmail}
                    readOnly
                    className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option>Course Content Issue</option>
                  <option>Payment Problem</option>
                  <option>Technical Issue</option>
                  <option>Certificate Issue</option>
                  <option>Account Problem</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Message</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
                  placeholder="Describe your issue..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Attachment</label>
                {!file ? (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-xl cursor-pointer bg-gray-900 hover:border-cyan-500/50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-xs text-gray-400">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP, PDF (max 5MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".png,.jpg,.jpeg,.webp,.pdf"
                      onChange={handleFileChange}
                    />
                  </label>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-gray-900 border border-white/10 rounded-xl">
                    <div className="flex items-center space-x-3">
                      {filePreview ? (
                        <img src={filePreview} alt="Preview" className="w-12 h-12 object-cover rounded-lg" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                          <Paperclip className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-white font-medium">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-600 to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-cyan-500/20 active:scale-[0.98] transition-all flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message →'
                )}
              </button>
            </form>
          )}
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center group cursor-pointer hover:bg-white/10 transition-all hover:border-cyan-500/30"
        >
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-500/20 transition-colors">
            <Mail className="w-6 h-6 text-cyan-400" />
          </div>
          <h4 className="font-bold text-white">Email Support</h4>
          <p className="text-xs text-gray-400 mt-1">support@eduspace.io</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center group cursor-pointer hover:bg-white/10 transition-all hover:border-emerald-500/30"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500/20 transition-colors">
            <Zap className="w-6 h-6 text-emerald-400" />
          </div>
          <h4 className="font-bold text-white">Live Chat</h4>
          <p className="text-xs text-gray-400 mt-1">Average wait: 2m</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center group cursor-pointer hover:bg-white/10 transition-all hover:border-purple-500/30"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/20 transition-colors">
            <BookOpen className="w-6 h-6 text-purple-400" />
          </div>
          <h4 className="font-bold text-white">Documentation</h4>
          <p className="text-xs text-gray-400 mt-1">Self-serve guides</p>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentSupport;
