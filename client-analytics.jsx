/**
 * College LMS - Analytics Page (Instructor)
 * Course analytics dashboard with enrollment stats, revenue, and student engagement
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import { Users, DollarSign, TrendingUp, Clock, BookOpen, Star, Download, Calendar } from 'lucide-react';

const Analytics = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [stats, setStats] = useState({
    totalEnrollments: 0,
    activeStudents: 0,
    completedStudents: 0,
    totalRevenue: 0,
    averageRating: 0,
    averageCompletion: 0,
    totalWatchTime: 0,
  });
  const [enrollments, setEnrollments] = useState([]);
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [courseId, timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      // Fetch course
      const { data: courseData } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      setCourse(courseData);

      // Fetch enrollments with progress
      const { data: enrollmentsData } = await supabase
        .from('enrollments')
        .select(`
          *,
          profiles:student_id (full_name, email, avatar_url, roll_number),
          lesson_progress (completed, watch_time)
        `)
        .eq('course_id', courseId)
        .order('enrolled_at', { ascending: false });

      setEnrollments(enrollmentsData || []);

      // Calculate stats
      const totalEnrollments = enrollmentsData?.length || 0;
      const activeStudents = enrollmentsData?.filter((e) => e.status === 'active').length || 0;
      
      // Calculate completion
      const studentProgress = enrollmentsData?.map((e) => {
        const totalLessons = 10; // This should be fetched from course_sections
        const completedLessons = e.lesson_progress?.filter((lp) => lp.completed).length || 0;
        return completedLessons / totalLessons;
      }) || [];
      const averageCompletion = studentProgress.length > 0
        ? (studentProgress.reduce((a, b) => a + b, 0) / studentProgress.length) * 100
        : 0;
      const completedStudents = studentProgress.filter((p) => p >= 1).length;

      // Calculate revenue
      const totalRevenue = enrollmentsData?.reduce((sum, e) => {
        if (courseData.is_free) return sum;
        const price = courseData.price || 0;
        const discount = courseData.discount || 0;
        return sum + (price - (price * discount / 100));
      }, 0) || 0;

      // Calculate total watch time (in hours)
      const totalWatchTime = enrollmentsData?.reduce((sum, e) => {
        const watchTime = e.lesson_progress?.reduce((ltSum, lp) => ltSum + (lp.watch_time || 0), 0) || 0;
        return sum + watchTime;
      }, 0) / 3600 || 0;

      // Fetch ratings
      const { data: reviews } = await supabase
        .from('reviews')
        .select('rating')
        .eq('course_id', courseId);

      const averageRating = reviews?.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

      setStats({
        totalEnrollments,
        activeStudents,
        completedStudents,
        totalRevenue,
        averageRating: averageRating.toFixed(1),
        averageCompletion: averageCompletion.toFixed(1),
        totalWatchTime: totalWatchTime.toFixed(1),
      });
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Student Name', 'Email', 'Roll Number', 'Enrolled Date', 'Status', 'Completion %', 'Watch Time (hrs)'];
    const rows = enrollments.map((e) => {
      const totalLessons = 10;
      const completedLessons = e.lesson_progress?.filter((lp) => lp.completed).length || 0;
      const completion = ((completedLessons / totalLessons) * 100).toFixed(1);
      const watchTime = (e.lesson_progress?.reduce((sum, lp) => sum + (lp.watch_time || 0), 0) / 3600).toFixed(1);

      return [
        e.profiles?.full_name || '',
        e.profiles?.email || '',
        e.profiles?.roll_number || '',
        new Date(e.enrolled_at).toLocaleDateString(),
        e.status,
        completion,
        watchTime,
      ].join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `course-${courseId}-analytics.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton variant="card" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="card" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Course Analytics</h1>
            <p className="text-slate-400">{course?.title}</p>
          </div>
          <div className="flex gap-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="all">All time</option>
            </select>
            <Button onClick={handleExportCSV} variant="secondary" icon={Download}>
              Export CSV
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-500" />
              <span className="text-slate-400 text-sm">Total</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.totalEnrollments}</p>
            <p className="text-slate-400 text-sm">Enrollments</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <span className="text-slate-400 text-sm">Active</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.activeStudents}</p>
            <p className="text-slate-400 text-sm">Students</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-yellow-500" />
              <span className="text-slate-400 text-sm">Total</span>
            </div>
            <p className="text-3xl font-bold text-white">₹{stats.totalRevenue.toLocaleString()}</p>
            <p className="text-slate-400 text-sm">Revenue</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <Star className="w-8 h-8 text-purple-500" />
              <span className="text-slate-400 text-sm">Average</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.averageRating}</p>
            <p className="text-slate-400 text-sm">Rating</p>
          </motion.div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700"
          >
            <div className="flex items-center gap-4">
              <BookOpen className="w-10 h-10 text-cyan-500" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.completedStudents}</p>
                <p className="text-slate-400 text-sm">Completed</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700"
          >
            <div className="flex items-center gap-4">
              <TrendingUp className="w-10 h-10 text-orange-500" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.averageCompletion}%</p>
                <p className="text-slate-400 text-sm">Avg Completion</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700"
          >
            <div className="flex items-center gap-4">
              <Clock className="w-10 h-10 text-pink-500" />
              <div>
                <p className="text-2xl font-bold text-white">{stats.totalWatchTime}h</p>
                <p className="text-slate-400 text-sm">Total Watch Time</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Student List */}
        <div className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">Enrolled Students</h2>
          
          {enrollments.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No students enrolled yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-slate-400 text-sm border-b border-slate-700">
                    <th className="pb-3">Student</th>
                    <th className="pb-3">Roll Number</th>
                    <th className="pb-3">Enrolled</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Completion</th>
                    <th className="pb-3">Watch Time</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((enrollment, index) => {
                    const totalLessons = 10;
                    const completedLessons = enrollment.lesson_progress?.filter((lp) => lp.completed).length || 0;
                    const completion = ((completedLessons / totalLessons) * 100).toFixed(1);
                    const watchTime = (enrollment.lesson_progress?.reduce((sum, lp) => sum + (lp.watch_time || 0), 0) / 3600).toFixed(1);

                    return (
                      <tr key={enrollment.id} className="border-b border-slate-800">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={enrollment.profiles?.avatar_url}
                              alt={enrollment.profiles?.full_name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-white font-medium">{enrollment.profiles?.full_name}</p>
                              <p className="text-slate-400 text-sm">{enrollment.profiles?.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-slate-400">{enrollment.profiles?.roll_number || '-'}</td>
                        <td className="py-4 text-slate-400">
                          {new Date(enrollment.enrolled_at).toLocaleDateString()}
                        </td>
                        <td className="py-4">
                          <Badge variant={enrollment.status === 'active' ? 'published' : 'draft'}>
                            {enrollment.status}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500"
                                style={{ width: `${completion}%` }}
                              />
                            </div>
                            <span className="text-white text-sm">{completion}%</span>
                          </div>
                        </td>
                        <td className="py-4 text-slate-400">{watchTime}h</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
