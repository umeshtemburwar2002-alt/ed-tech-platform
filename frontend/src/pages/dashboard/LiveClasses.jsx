import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../config/supabaseClient';
import toast from 'react-hot-toast';
import {
  FaPlus,
  FaTrash,
  FaVideo,
  FaCalendarAlt,
  FaTimes,
  FaSpinner,
  FaCheckCircle
} from 'react-icons/fa';

const LiveClasses = () => {
  const { user } = useSelector((state) => state.profile);
  const role = user?.accountType?.toLowerCase();
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newClass, setNewClass] = useState({
    title: '',
    course_id: '',
    meeting_link: '',
    scheduled_at: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!newClass.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!newClass.course_id) {
      newErrors.course_id = 'Please select a course';
    }
    if (!newClass.meeting_link.trim()) {
      newErrors.meeting_link = 'Meeting link is required';
    } else {
      try {
        new URL(newClass.meeting_link);
      } catch {
        newErrors.meeting_link = 'Please enter a valid URL';
      }
    }
    if (!newClass.scheduled_at) {
      newErrors.scheduled_at = 'Please select a date and time';
    } else {
      const selectedTime = new Date(newClass.scheduled_at);
      const now = new Date();
      if (selectedTime <= now) {
        newErrors.scheduled_at = 'Please select a future date and time';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [newClass]);

  const fetchClasses = useCallback(async () => {
    console.log('[LiveClassesPage] Fetching live classes...');
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('live_classes')
        .select(`
          *,
          courses (course_name)
        `)
        .order('scheduled_at', { ascending: true });

      if (error) {
        console.error('[LiveClassesPage] Error fetching classes:', error);
        throw error;
      }
      console.log('[LiveClassesPage] Live classes loaded:', data);
      setClasses(data || []);
    } catch (error) {
      console.error('[LiveClassesPage] Error fetching classes:', error);
      toast.error('Failed to load live classes');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchInstructorCourses = useCallback(async () => {
    if (!user?.id || role !== 'instructor') return;

    console.log('[LiveClassesPage] Fetching instructor courses...');
    try {
      setLoadingCourses(true);
      const { data, error } = await supabase
        .from('courses')
        .select('id, course_name')
        .eq('instructor_id', user.id);

      if (error) {
        console.error('[LiveClassesPage] Error fetching courses:', error);
        throw error;
      }
      console.log('[LiveClassesPage] Instructor courses loaded:', data);
      setCourses(data || []);
    } catch (error) {
      console.error('[LiveClassesPage] Error fetching courses:', error);
    } finally {
      setLoadingCourses(false);
    }
  }, [user?.id, role]);

  const handleCreateClass = useCallback(async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!user?.id) {
      toast.error('You must be logged in');
      return;
    }

    try {
      setSubmitting(true);
      const { error } = await supabase
        .from('live_classes')
        .insert([{
          ...newClass,
          instructor_id: user.id,
          status: 'upcoming'
        }]);

      if (error) throw error;

      toast.success('Live class scheduled successfully!');
      setShowAddModal(false);
      setNewClass({
        title: '',
        course_id: '',
        meeting_link: '',
        scheduled_at: ''
      });
      setErrors({});
      fetchClasses();
    } catch (error) {
      console.error('Error creating class:', error);
      toast.error(error.message || 'Failed to schedule class');
    } finally {
      setSubmitting(false);
    }
  }, [newClass, user?.id, validateForm, fetchClasses]);

  const handleDeleteClass = useCallback(async (id) => {
    if (!window.confirm('Are you sure you want to delete this class?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('live_classes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Class deleted');
      fetchClasses();
    } catch (error) {
      console.error('Error deleting class:', error);
      toast.error('Failed to delete class');
    }
  }, [fetchClasses]);

  const handleModalClose = useCallback(() => {
    setShowAddModal(false);
    setNewClass({
      title: '',
      course_id: '',
      meeting_link: '',
      scheduled_at: ''
    });
    setErrors({});
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  useEffect(() => {
    if (role === 'instructor') {
      fetchInstructorCourses();
    }
  }, [role, fetchInstructorCourses]);

  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('live_classes_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'live_classes',
        },
        () => {
          fetchClasses();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, fetchClasses]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getClassStatus = (dateStr) => {
    const classDate = new Date(dateStr);
    const now = new Date();
    const diffMinutes = Math.round((classDate - now) / 60000);

    if (diffMinutes < 0) {
      return { label: 'Completed', color: 'text-gray-400', bg: 'bg-gray-500/20' };
    }
    if (diffMinutes <= 15 && diffMinutes >= 0) {
      return { label: 'Live Now', color: 'text-red-400', bg: 'bg-red-500/20' };
    }
    return { label: 'Upcoming', color: 'text-cyan-400', bg: 'bg-cyan-500/20' };
  };

  return (
    <div className="min-h-screen bg-[#020617] p-6 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Live Classes
            </h1>
            <p className="text-slate-400 mt-2">
              Join or schedule live interactive sessions
            </p>
          </div>

          {role === 'instructor' && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-cyan-500 to-violet-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/25"
            >
              <FaPlus />
              <span>Schedule Class</span>
            </motion.button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#0F172A] border border-slate-700/50 rounded-2xl p-6 space-y-4"
              >
                <div className="h-6 bg-slate-800 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-slate-800 rounded w-1/2 animate-pulse" />
                <div className="h-4 bg-slate-800 rounded w-full animate-pulse" />
                <div className="h-12 bg-slate-800 rounded-xl w-full animate-pulse" />
              </motion.div>
            ))}
          </div>
        ) : classes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-slate-800 rounded-full flex items-center justify-center">
              <FaVideo className="w-12 h-12 text-slate-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-200 mb-2">
              No live classes yet
            </h2>
            <p className="text-slate-400">
              {role === 'instructor'
                ? 'Schedule your first live class to get started'
                : 'Check back soon for upcoming sessions'}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => {
              const status = getClassStatus(cls.scheduled_at);
              return (
                <motion.div
                  key={cls.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-[#0F172A] border border-slate-700/50 backdrop-blur-xl rounded-2xl p-6 hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/10 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {cls.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${status.bg} ${status.color}`}>
                      {status.label}
                    </span>
                  </div>

                  <p className="text-slate-400 text-sm mb-4">
                    Course: {cls.courses?.course_name || 'N/A'}
                  </p>

                  <div className="flex items-center text-slate-300 text-sm mb-6 gap-2">
                    <FaCalendarAlt className="text-cyan-400" />
                    <span>{formatDate(cls.scheduled_at)}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={cls.meeting_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:from-green-600 hover:to-emerald-700 transition-all"
                    >
                      <FaVideo />
                      <span>Join Now</span>
                    </a>

                    {role === 'instructor' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteClass(cls.id)}
                        className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all"
                      >
                        <FaTrash />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleModalClose}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-[#0F172A] border border-slate-700 rounded-3xl p-8 w-full max-w-lg shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Schedule Live Class</h2>
                <button
                  onClick={handleModalClose}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleCreateClass} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Class Title
                  </label>
                  <input
                    type="text"
                    value={newClass.title}
                    onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
                    className={`w-full px-4 py-3 bg-[#020617] border rounded-xl outline-none transition-all ${
                      errors.title
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-slate-700 focus:border-cyan-500'
                    } text-white`}
                    placeholder="e.g., React Advanced Concepts"
                  />
                  {errors.title && (
                    <p className="text-red-400 text-sm mt-2">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Select Course
                  </label>
                  <select
                    value={newClass.course_id}
                    onChange={(e) => setNewClass({ ...newClass, course_id: e.target.value })}
                    className={`w-full px-4 py-3 bg-[#020617] border rounded-xl outline-none transition-all ${
                      errors.course_id
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-slate-700 focus:border-cyan-500'
                    } text-white`}
                  >
                    <option value="">Select a course</option>
                    {loadingCourses ? (
                      <option disabled>Loading courses...</option>
                    ) : (
                      courses.map((c) => (
                        <option key={c.id} value={c.id}>{c.course_name}</option>
                      ))
                    )}
                  </select>
                  {errors.course_id && (
                    <p className="text-red-400 text-sm mt-2">{errors.course_id}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Meeting Link (Zoom/Google Meet)
                  </label>
                  <input
                    type="url"
                    value={newClass.meeting_link}
                    onChange={(e) => setNewClass({ ...newClass, meeting_link: e.target.value })}
                    className={`w-full px-4 py-3 bg-[#020617] border rounded-xl outline-none transition-all ${
                      errors.meeting_link
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-slate-700 focus:border-cyan-500'
                    } text-white`}
                    placeholder="https://zoom.us/j/..."
                  />
                  {errors.meeting_link && (
                    <p className="text-red-400 text-sm mt-2">{errors.meeting_link}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Scheduled Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={newClass.scheduled_at}
                    onChange={(e) => setNewClass({ ...newClass, scheduled_at: e.target.value })}
                    className={`w-full px-4 py-3 bg-[#020617] border rounded-xl outline-none transition-all ${
                      errors.scheduled_at
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-slate-700 focus:border-cyan-500'
                    } text-white`}
                  />
                  {errors.scheduled_at && (
                    <p className="text-red-400 text-sm mt-2">{errors.scheduled_at}</p>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="flex-1 px-6 py-3 bg-slate-800 text-slate-300 rounded-xl font-bold hover:bg-slate-700 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 text-white rounded-xl font-bold hover:from-cyan-600 hover:to-violet-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Scheduling...
                      </>
                    ) : (
                      <>
                        <FaCheckCircle />
                        Schedule Class
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveClasses;
