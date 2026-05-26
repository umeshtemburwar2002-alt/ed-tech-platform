/**
 * College LMS - Instructor Courses Page
 * Instructor dashboard showing their courses with stats and actions
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import useAuthStore from '../store/authStore';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import { Plus, BookOpen, Users, DollarSign, TrendingUp, Edit2, Trash2, Copy, Eye, MoreVertical } from 'lucide-react';

const InstructorCourses = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
    averageRating: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCourses();
  }, [user]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const { data: coursesData, error } = await supabase
        .from('courses')
        .select(`
          *,
          enrollments (count),
          reviews (rating)
        `)
        .eq('instructor_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setCourses(coursesData || []);

      // Calculate stats
      const totalStudents = coursesData.reduce((sum, course) => sum + (course.enrollments?.[0]?.count || 0), 0);
      const totalRevenue = coursesData.reduce((sum, course) => {
        if (course.is_free) return sum;
        const price = course.price || 0;
        const discount = course.discount || 0;
        const finalPrice = price - (price * discount / 100);
        return sum + (finalPrice * (course.enrollments?.[0]?.count || 0));
      }, 0);
      const ratings = coursesData.flatMap((course) => course.reviews?.map((r) => r.rating) || []);
      const averageRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;

      setStats({
        totalCourses: coursesData.length,
        totalStudents,
        totalRevenue,
        averageRating: averageRating.toFixed(1),
      });
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase.from('courses').delete().eq('id', courseId);
      if (error) throw error;

      setCourses(courses.filter((c) => c.id !== courseId));
      toast.success('Course deleted successfully');
    } catch (error) {
      console.error('Failed to delete course:', error);
      toast.error('Failed to delete course');
    }
  };

  const handleDuplicateCourse = async (course) => {
    try {
      const { data: newCourse, error } = await supabase
        .from('courses')
        .insert({
          title: `${course.title} (Copy)`,
          slug: `${course.slug}-copy-${Date.now()}`,
          description: course.description,
          thumbnail_url: course.thumbnail_url,
          price: course.price,
          discount: course.discount,
          level: course.level,
          language: course.language,
          department_id: course.department_id,
          semester: course.semester,
          subject_code: course.subject_code,
          instructor_id: user.id,
          status: 'draft',
          is_free: course.is_free,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Course duplicated successfully');
      navigate(`/instructor/course/${newCourse.id}/builder`);
    } catch (error) {
      console.error('Failed to duplicate course:', error);
      toast.error('Failed to duplicate course');
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'published' && course.status === 'published') ||
      (filter === 'draft' && course.status === 'draft') ||
      (filter === 'pending' && course.status === 'pending');

    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Courses</h1>
            <p className="text-slate-400">Manage and create your courses</p>
          </div>
          <Button onClick={() => navigate('/instructor/course/create')} variant="primary" icon={Plus}>
            Create Course
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-blue-500" />
              <span className="text-slate-400 text-sm">Total</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.totalCourses}</p>
            <p className="text-slate-400 text-sm">Courses</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-green-500" />
              <span className="text-slate-400 text-sm">Total</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.totalStudents}</p>
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
              <TrendingUp className="w-8 h-8 text-purple-500" />
              <span className="text-slate-400 text-sm">Average</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.averageRating}</p>
            <p className="text-slate-400 text-sm">Rating</p>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex gap-2">
            {['all', 'published', 'draft', 'pending'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                  filter === status
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                <Skeleton variant="card" />
              </div>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
            <p className="text-slate-400 mb-4">
              {searchQuery ? 'Try a different search term' : 'Create your first course to get started'}
            </p>
            {!searchQuery && (
              <Button onClick={() => navigate('/instructor/course/create')} variant="primary">
                Create Course
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-900/50 backdrop-blur-lg rounded-xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-colors"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-slate-800 relative">
                  {course.thumbnail_url ? (
                    <img
                      src={course.thumbnail_url}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-slate-600" />
                    </div>
                  )}
                  <Badge
                    variant={course.status === 'published' ? 'published' : course.status === 'draft' ? 'draft' : 'rejected'}
                    className="absolute top-3 right-3"
                  >
                    {course.status}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-3 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.enrollments?.[0]?.count || 0} students
                    </span>
                    {course.is_free ? (
                      <span className="text-green-400">Free</span>
                    ) : (
                      <span>
                        ₹{course.price - (course.price * course.discount / 100)}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/instructor/course/${course.id}/builder`)}
                      variant="secondary"
                      size="sm"
                      className="flex-1"
                      icon={Edit2}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => navigate(`/course/${course.slug}`)}
                      variant="secondary"
                      size="sm"
                      icon={Eye}
                    >
                      View
                    </Button>
                    <Button
                      onClick={() => handleDuplicateCourse(course)}
                      variant="secondary"
                      size="sm"
                      icon={Copy}
                    >
                      Copy
                    </Button>
                    <Button
                      onClick={() => handleDeleteCourse(course.id)}
                      variant="secondary"
                      size="sm"
                      icon={Trash2}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorCourses;
