import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHistory,
  FaFilter,
  FaCalendarAlt,
  FaBook,
  FaPlay,
  FaCheckCircle,
  FaQuestionCircle,
  FaGraduationCap,
  FaEye,
  FaClock,
  FaChartLine,
  FaDownload,
  FaSearch,
  FaUser,
  FaLaptop,
  FaMobile,
  FaTablet,
  FaDesktop,
  FaGlobe
} from 'react-icons/fa';
import { Card, Button, Badge } from '../../components/ui';
import { toast } from 'react-hot-toast';
import { apiConnector } from '../../services/apiconnector';

const ActivityHistory = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    activityType: '',
    dateRange: '',
    page: 1,
    limit: 20
  });
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    if (user && token) {
      loadActivityHistory();
    }
  }, [user, token, filters]);

  const loadActivityHistory = async () => {
    try {
      setLoading(true);
      
      const queryParams = new URLSearchParams();
      if (filters.activityType) queryParams.append('activityType', filters.activityType);
      if (filters.dateRange) queryParams.append('dateRange', filters.dateRange);
      queryParams.append('page', filters.page);
      queryParams.append('limit', filters.limit);
      
      const response = await apiConnector(
        'GET',
        `/api/v1/activity/my-activity?${queryParams.toString()}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      
      if (response.data.success) {
        setActivities(response.data.data.activities);
        setPagination(response.data.data.pagination);
        setStats(response.data.data.stats);
      }
      
    } catch (error) {
      console.error('Failed to load activity history:', error);
      toast.error('Failed to load activity history');
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (activityType) => {
    const iconMap = {
      'login': FaUser,
      'logout': FaUser,
      'course_enrollment': FaBook,
      'lesson_started': FaPlay,
      'lesson_completed': FaCheckCircle,
      'quiz_attempted': FaQuestionCircle,
      'quiz_completed': FaCheckCircle,
      'course_completed': FaGraduationCap,
      'dashboard_viewed': FaEye,
      'my_learning_viewed': FaBook,
      'progress_viewed': FaChartLine,
      'certificates_viewed': FaGraduationCap,
      'search_performed': FaSearch,
      'course_added_to_wishlist': FaBook,
      'course_rated': FaCheckCircle
    };
    return iconMap[activityType] || FaHistory;
  };

  const getActivityColor = (activityType) => {
    const colorMap = {
      'login': 'text-green-400',
      'logout': 'text-gray-400',
      'course_enrollment': 'text-blue-400',
      'lesson_completed': 'text-green-400',
      'quiz_completed': 'text-purple-400',
      'course_completed': 'text-yellow-400',
      'dashboard_viewed': 'text-blue-400',
      'search_performed': 'text-orange-400'
    };
    return colorMap[activityType] || 'text-richblack-400';
  };

  const getPlatformIcon = (platform) => {
    const iconMap = {
      'mobile': FaMobile,
      'tablet': FaTablet,
      'desktop': FaDesktop,
      'web': FaLaptop
    };
    return iconMap[platform] || FaGlobe;
  };

  const formatActivityTitle = (activityType) => {
    return activityType
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const exportActivityData = async () => {
    try {
      toast.loading('Preparing activity export...');
      
      // Create CSV content
      const csvHeaders = ['Date', 'Activity', 'Course', 'Time Spent', 'Platform', 'Details'];
      const csvRows = activities.map(activity => [
        new Date(activity.timestamp).toLocaleString(),
        formatActivityTitle(activity.activityType),
        activity.metadata?.courseName || 'N/A',
        activity.metadata?.timeSpent ? `${activity.metadata.timeSpent} min` : 'N/A',
        activity.metadata?.platform || 'N/A',
        JSON.stringify(activity.activityData || {})
      ]);
      
      const csvContent = [csvHeaders, ...csvRows]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');
      
      // Download CSV
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `activity-history-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast.success('Activity data exported successfully!');
      
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export activity data');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-richblack-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <div className="text-richblack-5 text-xl">Loading your activity history...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-richblack-5 mb-2 flex items-center space-x-3">
                <FaHistory className="text-blue-400" />
                <span>Activity History</span>
              </h1>
              <p className="text-richblack-300">
                Track your learning journey and see all your platform activities.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={exportActivityData}
              className="flex items-center space-x-2"
            >
              <FaDownload />
              <span>Export Data</span>
            </Button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <Card className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
              <div className="flex items-center justify-between mb-4">
                <FaHistory className="text-blue-400 text-2xl" />
                <Badge variant="info" size="small">Total</Badge>
              </div>
              <h3 className="text-2xl font-bold text-richblack-5 mb-1">
                {stats.totalActivities || 0}
              </h3>
              <p className="text-richblack-400 text-sm">Total Activities</p>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
              <div className="flex items-center justify-between mb-4">
                <FaClock className="text-green-400 text-2xl" />
                <Badge variant="success" size="small">Time</Badge>
              </div>
              <h3 className="text-2xl font-bold text-richblack-5 mb-1">
                {Math.floor((stats.totalTimeSpent || 0) / 60)}h {(stats.totalTimeSpent || 0) % 60}m
              </h3>
              <p className="text-richblack-400 text-sm">Time Spent</p>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <div className="flex items-center justify-between mb-4">
                <FaCalendarAlt className="text-purple-400 text-2xl" />
                <Badge variant="secondary" size="small">Recent</Badge>
              </div>
              <h3 className="text-lg font-bold text-richblack-5 mb-1">
                {stats.lastActivity ? formatTimeAgo(stats.lastActivity) : 'No activity'}
              </h3>
              <p className="text-richblack-400 text-sm">Last Activity</p>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
              <div className="flex items-center justify-between mb-4">
                <FaChartLine className="text-orange-400 text-2xl" />
                <Badge variant="warning" size="small">Popular</Badge>
              </div>
              <h3 className="text-lg font-bold text-richblack-5 mb-1">
                {stats.mostCommonActivity ? 
                  formatActivityTitle(Object.keys(stats.mostCommonActivity)[0] || 'None') : 
                  'None'
                }
              </h3>
              <p className="text-richblack-400 text-sm">Most Common</p>
            </Card>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-wrap gap-4">
                <select
                  value={filters.activityType}
                  onChange={(e) => handleFilterChange('activityType', e.target.value)}
                  className="px-4 py-2 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">All Activities</option>
                  <option value="course_enrollment">Course Enrollments</option>
                  <option value="lesson_completed">Lessons Completed</option>
                  <option value="quiz_completed">Quizzes Completed</option>
                  <option value="course_completed">Courses Completed</option>
                  <option value="dashboard_viewed">Dashboard Views</option>
                  <option value="search_performed">Searches</option>
                </select>

                <select
                  value={filters.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  className="px-4 py-2 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">All Time</option>
                  <option value={JSON.stringify({ start: new Date(Date.now() - 24*60*60*1000), end: new Date() })}>Last 24 Hours</option>
                  <option value={JSON.stringify({ start: new Date(Date.now() - 7*24*60*60*1000), end: new Date() })}>Last 7 Days</option>
                  <option value={JSON.stringify({ start: new Date(Date.now() - 30*24*60*60*1000), end: new Date() })}>Last 30 Days</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 text-sm text-richblack-400">
                <FaFilter />
                <span>Showing {activities.length} activities</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          <AnimatePresence>
            {activities.map((activity, index) => {
              const IconComponent = getActivityIcon(activity.activityType);
              const PlatformIcon = getPlatformIcon(activity.metadata?.platform);
              
              return (
                <motion.div
                  key={activity._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="p-6 hover:bg-richblack-800 transition-colors">
                    <div className="flex items-start space-x-4">
                      {/* Activity Icon */}
                      <div className={`p-3 rounded-lg bg-richblack-700 ${getActivityColor(activity.activityType)}`}>
                        <IconComponent className="text-xl" />
                      </div>
                      
                      {/* Activity Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-richblack-5 mb-1">
                              {formatActivityTitle(activity.activityType)}
                            </h3>
                            {activity.metadata?.courseName && (
                              <p className="text-richblack-300 text-sm mb-1">
                                Course: {activity.metadata.courseName}
                              </p>
                            )}
                            {activity.metadata?.lessonTitle && (
                              <p className="text-richblack-300 text-sm mb-1">
                                Lesson: {activity.metadata.lessonTitle}
                              </p>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm text-richblack-400">
                            <PlatformIcon />
                            <span>{formatTimeAgo(activity.timestamp)}</span>
                          </div>
                        </div>
                        
                        {/* Activity Metadata */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {activity.metadata?.timeSpent && (
                            <Badge variant="secondary" size="small">
                              <FaClock className="mr-1" />
                              {activity.metadata.timeSpent} min
                            </Badge>
                          )}
                          {activity.metadata?.score && (
                            <Badge variant="success" size="small">
                              Score: {activity.metadata.score}%
                            </Badge>
                          )}
                          {activity.metadata?.completionPercentage && (
                            <Badge variant="info" size="small">
                              Progress: {activity.metadata.completionPercentage}%
                            </Badge>
                          )}
                          {activity.metadata?.platform && (
                            <Badge variant="neutral" size="small">
                              {activity.metadata.platform}
                            </Badge>
                          )}
                        </div>
                        
                        {/* Additional Details */}
                        {Object.keys(activity.activityData || {}).length > 0 && (
                          <details className="text-sm text-richblack-400">
                            <summary className="cursor-pointer hover:text-richblack-300">View Details</summary>
                            <pre className="mt-2 p-2 bg-richblack-800 rounded text-xs overflow-x-auto">
                              {JSON.stringify(activity.activityData, null, 2)}
                            </pre>
                          </details>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {pagination && pagination.total > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex justify-center"
          >
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="small"
                onClick={() => handlePageChange(pagination.current - 1)}
                disabled={pagination.current === 1}
              >
                Previous
              </Button>
              
              <span className="px-4 py-2 text-richblack-300">
                Page {pagination.current} of {pagination.total}
              </span>
              
              <Button
                variant="outline"
                size="small"
                onClick={() => handlePageChange(pagination.current + 1)}
                disabled={pagination.current === pagination.total}
              >
                Next
              </Button>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && activities.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <Card className="p-12">
              <FaHistory className="text-6xl text-richblack-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-richblack-5 mb-2">
                No activities found
              </h3>
              <p className="text-richblack-400 mb-6">
                Start learning to see your activity history here.
              </p>
              <Button variant="primary" onClick={() => window.location.href = '/courses'}>
                Browse Courses
              </Button>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ActivityHistory;