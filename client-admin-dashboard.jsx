/**
 * College LMS - Admin Dashboard
 * Platform overview with stats, pending courses, and quick actions
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import { Users, BookOpen, DollarSign, AlertCircle, TrendingUp, CheckCircle, XCircle } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    totalRevenue: 0,
    pendingCourses: 0,
  });
  const [pendingCourses, setPendingCourses] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch platform stats
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const { count: totalCourses } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true });

      const { count: totalEnrollments } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true });

      const { count: pendingCourses } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      const { data: paidEnrollments } = await supabase
        .from('enrollments')
        .select('courses (price, discount)')
        .not('courses.is_free', 'is', true);

      const totalRevenue = paidEnrollments?.reduce((sum, e) => {
        const price = e.courses?.price || 0;
        const discount = e.courses?.discount || 0;
        return sum + (price - (price * discount / 100));
      }, 0) || 0;

      setStats({
        totalUsers,
        totalCourses,
        totalEnrollments,
        totalRevenue,
        pendingCourses,
      });

      // Fetch pending courses
      const { data: pendingCoursesData } = await supabase
        .from('courses')
        .select(`
          *,
          profiles:instructor_id (full_name, email)
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(5);

      setPendingCourses(pendingCoursesData || []);

      // Fetch recent activity (last 10 enrollments)
      const { data: recentEnrollments } = await supabase
        .from('enrollments')
        .select(`
          *,
          profiles:student_id (full_name),
          courses (title)
        `)
        .order('enrolled_at', { ascending: false })
        .limit(10);

      setRecentActivity(recentEnrollments || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveCourse = async (courseId) => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({ status: 'published' })
        .eq('id', courseId);

      if (error) throw error;

      setPendingCourses(pendingCourses.filter((c) => c.id !== courseId));
      setStats({ ...stats, pendingCourses: stats.pendingCourses - 1 });
      toast.success('Course approved');
    } catch (error) {
      console.error('Failed to approve course:', error);
      toast.error('Failed to approve course');
    }
  };

  const handleRejectCourse = async (courseId) => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({ status: 'rejected' })
        .eq('id', courseId);

      if (error) throw error;

      setPendingCourses(pendingCourses.filter((c) => c.id !== courseId));
      setStats({ ...stats, pendingCourses: stats.pendingCourses - 1 });
      toast.success('Course rejected');
    } catch (error) {
      console.error('Failed to reject course:', error);
      toast.error('Failed to reject course');
    }
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
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-400">Platform overview and management</p>
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
            <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
            <p className="text-slate-400 text-sm">Users</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-green-500" />
              <span className="text-slate-400 text-sm">Total</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.totalCourses}</p>
            <p className="text-slate-400 text-sm">Courses</p>
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
              <AlertCircle className="w-8 h-8 text-orange-500" />
              <span className="text-slate-400 text-sm">Pending</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.pendingCourses}</p>
            <p className="text-slate-400 text-sm">Courses</p>
          </motion.div>
        </div>

        {/* Pending Courses */}
        {stats.pendingCourses > 0 && (
          <div className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Pending Course Approvals</h2>
              <Button onClick={() => navigate('/admin/courses/pending')} variant="secondary">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {pendingCourses.map((course) => (
                <div key={course.id} className="bg-slate-800 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">{course.title}</h3>
                    <p className="text-slate-400 text-sm">by {course.profiles?.full_name}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleApproveCourse(course.id)}
                      variant="primary"
                      size="sm"
                      icon={CheckCircle}
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleRejectCourse(course.id)}
                      variant="secondary"
                      size="sm"
                      icon={XCircle}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 bg-slate-800 rounded-lg">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-white">
                    <span className="font-medium">{activity.profiles?.full_name}</span> enrolled in{' '}
                    <span className="font-medium">{activity.courses?.title}</span>
                  </p>
                  <p className="text-slate-400 text-sm">
                    {new Date(activity.enrolled_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate('/admin/users')}
            className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700 cursor-pointer hover:border-slate-600 transition-colors"
          >
            <Users className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Manage Users</h3>
            <p className="text-slate-400 text-sm">View and manage all platform users</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => navigate('/admin/departments')}
            className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700 cursor-pointer hover:border-slate-600 transition-colors"
          >
            <BookOpen className="w-10 h-10 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Departments</h3>
            <p className="text-slate-400 text-sm">Manage departments and categories</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate('/admin/courses')}
            className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700 cursor-pointer hover:border-slate-600 transition-colors"
          >
            <AlertCircle className="w-10 h-10 text-orange-500 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Course Approvals</h3>
            <p className="text-slate-400 text-sm">Review and approve pending courses</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
