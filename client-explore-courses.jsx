/**
 * College LMS - Explore Courses Page
 * Student course discovery with filters, search, and wishlist
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
import { Search, Filter, Heart, BookOpen, Users, Star, Clock, DollarSign } from 'lucide-react';

const ExploreCourses = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    category: '',
    level: '',
    price: 'all',
    rating: 0,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchDepartments();
    if (user) {
      fetchWishlist();
    }
  }, []);

  useEffect(() => {
    if (filters.department) {
      fetchCategories(filters.department);
    }
  }, [filters.department]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('courses')
        .select(`
          *,
          profiles:instructor_id (full_name, avatar_url),
          departments (name),
          enrollments (count),
          reviews (rating)
        `)
        .eq('status', 'published');

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .order('name');

      if (error) throw error;
      setDepartments(data || []);
    } catch (error) {
      console.error('Failed to fetch departments:', error);
    }
  };

  const fetchCategories = async (departmentId) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('department_id', departmentId)
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const { data, error } = await supabase
        .from('wishlists')
        .select('course_id')
        .eq('student_id', user.id);

      if (error) throw error;
      setWishlist(data?.map((w) => w.course_id) || []);
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
    }
  };

  const handleToggleWishlist = async (courseId) => {
    if (!user) {
      toast.error('Please login to add courses to wishlist');
      navigate('/login');
      return;
    }

    try {
      if (wishlist.includes(courseId)) {
        await supabase
          .from('wishlists')
          .delete()
          .eq('course_id', courseId)
          .eq('student_id', user.id);
        setWishlist(wishlist.filter((id) => id !== courseId));
        toast.success('Removed from wishlist');
      } else {
        await supabase
          .from('wishlists')
          .insert({ course_id: courseId, student_id: user.id });
        setWishlist([...wishlist, courseId]);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      console.error('Failed to toggle wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };

  const handleEnroll = async (courseId) => {
    if (!user) {
      toast.error('Please login to enroll in courses');
      navigate('/login');
      return;
    }

    try {
      const { error } = await supabase
        .from('enrollments')
        .insert({
          course_id: courseId,
          student_id: user.id,
          status: 'active',
          enrolled_at: new Date().toISOString(),
        });

      if (error) throw error;
      toast.success('Enrolled successfully');
      navigate(`/course/${courseId}/player`);
    } catch (error) {
      console.error('Failed to enroll:', error);
      toast.error('Failed to enroll in course');
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment = !filters.department || course.department_id === filters.department;
    const matchesCategory = !filters.category || course.category_id === filters.category;
    const matchesLevel = !filters.level || course.level === filters.level;
    const matchesPrice =
      filters.price === 'all' ||
      (filters.price === 'free' && course.is_free) ||
      (filters.price === 'paid' && !course.is_free);
    const matchesRating = course.reviews?.length > 0
      ? (course.reviews.reduce((sum, r) => sum + r.rating, 0) / course.reviews.length) >= filters.rating
      : true;

    return matchesSearch && matchesDepartment && matchesCategory && matchesLevel && matchesPrice && matchesRating;
  });

  const averageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    return (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Explore Courses</h1>
          <p className="text-slate-400">Discover and enroll in courses from top instructors</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses by title, description, or instructor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filters Toggle */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="secondary"
            icon={Filter}
          >
            Filters
          </Button>
          <p className="text-slate-400">
            {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-slate-900/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700 mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Department
                </label>
                <select
                  value={filters.department}
                  onChange={(e) => setFilters({ ...filters, department: e.target.value, category: '' })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!filters.department}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Level
                </label>
                <select
                  value={filters.level}
                  onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Price
                </label>
                <select
                  value={filters.price}
                  onChange={(e) => setFilters({ ...filters, price: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Prices</option>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>

              {/* Rating */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Minimum Rating
                </label>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFilters({ ...filters, rating })}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        filters.rating === rating
                          ? 'bg-yellow-500 text-white'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {rating}+ Stars
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <div className="md:col-span-2 flex items-end">
                <Button
                  onClick={() => setFilters({ department: '', category: '', level: '', price: 'all', rating: 0 })}
                  variant="secondary"
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </motion.div>
        )}

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
              Try adjusting your filters or search terms
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setFilters({ department: '', category: '', level: '', price: 'all', rating: 0 });
              }}
              variant="secondary"
            >
              Clear All Filters
            </Button>
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
                  <button
                    onClick={() => handleToggleWishlist(course.id)}
                    className="absolute top-3 right-3 p-2 bg-slate-900/80 rounded-full hover:bg-slate-800 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        wishlist.includes(course.id) ? 'fill-red-500 text-red-500' : 'text-white'
                      }`}
                    />
                  </button>
                  {course.is_free && (
                    <Badge variant="published" className="absolute top-3 left-3">
                      Free
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={course.profiles?.avatar_url}
                      alt={course.profiles?.full_name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-slate-400">{course.profiles?.full_name}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-3 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {averageRating(course.reviews)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.enrollments?.[0]?.count || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.level}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    {course.is_free ? (
                      <span className="text-green-400 font-semibold">Free</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        {course.discount > 0 && (
                          <span className="text-slate-400 line-through text-sm">
                            ₹{course.price}
                          </span>
                        )}
                        <span className="text-white font-semibold">
                          ₹{course.price - (course.price * course.discount / 100)}
                        </span>
                      </div>
                    )}
                    <Button
                      onClick={() => navigate(`/course/${course.id}`)}
                      variant="primary"
                      size="sm"
                    >
                      View
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

export default ExploreCourses;
