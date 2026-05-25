import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaChartLine,
  FaUsers,
  FaUserTie,
  FaBook,
  FaEye,
  FaFilter,
  FaCalendarAlt,
  FaDownload,
  FaRefresh,
  FaClock,
  FaPlay,
  FaCheckCircle,
  FaGraduationCap,
  FaQuestionCircle,
  FaSearch,
  FaUser,
  FaLaptop,
  FaMobile,
  FaTablet,
  FaDesktop,
  FaGlobe,
  FaArrowUp,
  FaArrowDown,
  FaEquals,
  FaFire,
  FaTrophy,
  FaBell
} from 'react-icons/fa';
import { Card, Button, Badge } from '../../components/ui';
import { toast } from 'react-hot-toast';
import { apiConnector } from '../../services/apiconnector';

const ActivityMonitoring = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('realtime');
  const [realtimeActivities, setRealtimeActivities] = useState([]);
  const [platformStats, setPlatformStats] = useState([]);
  const [instructorActivities, setInstructorActivities] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: '',
    activityTypes: [],
    userType: '',
    searchTerm: ''
  });
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (user && token) {
      loadInitialData();
    }
  }, [user, token]);

  useEffect(() => {
    let interval;
    if (autoRefresh && activeTab === 'realtime') {
      interval = setInterval(() => {
        loadRealtimeActivities();
      }, 30000); // Refresh every 30 seconds
    }
    return () => clearInterval(interval);
  }, [autoRefresh, activeTab]);

  useEffect(() => {
    if (activeTab === 'realtime') {
      loadRealtimeActivities();
    } else if (activeTab === 'platform') {
      loadPlatformActivity();
    } else if (activeTab === 'instructors') {
      loadInstructors();
    }
  }, [activeTab, filters]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      await loadRealtimeActivities();
    } catch (error) {
      console.error('Failed to load initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRealtimeActivities = async () => {
    try {
      const response = await apiConnector(
        'GET',
        '/api/v1/activity/realtime-feed?limit=50',
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      
      if (response.data.success) {
        setRealtimeActivities(response.data.data.activities || []);
      }
      
    } catch (error) {
      console.error('Failed to load realtime activities:', error);
      if (activeTab === 'realtime') {
        toast.error('Failed to load real-time activities');
      }
    }
  };

  const loadPlatformActivity = async () => {
    try {
      setLoading(true);
      
      const queryParams = new URLSearchParams();
      if (filters.dateRange) queryParams.append('dateRange', filters.dateRange);
      if (filters.activityTypes.length > 0) queryParams.append('activityTypes', filters.activityTypes.join(','));
      
      const response = await apiConnector(
        'GET',
        `/api/v1/activity/platform?${queryParams.toString()}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      
      if (response.data.success) {
        setPlatformStats(response.data.data.stats || []);
        setRealtimeActivities(response.data.data.activities || []);
      }
      
    } catch (error) {
      console.error('Failed to load platform activity:', error);
      toast.error('Failed to load platform activity');
    } finally {
      setLoading(false);
    }
  };

  const loadInstructors = async () => {
    try {
      setLoading(true);
      
      // Get all instructors
      const response = await apiConnector(
        'GET',
        '/api/v1/profile/getAllInstructors',
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      
      if (response.data.success) {
        setInstructors(response.data.data || []);
      }
      
    } catch (error) {
      console.error('Failed to load instructors:', error);
      toast.error('Failed to load instructors');
    } finally {
      setLoading(false);
    }
  };

  const loadInstructorActivity = async (instructorId) => {
    try {
      setLoading(true);
      
      const queryParams = new URLSearchParams();
      if (filters.dateRange) queryParams.append('dateRange', filters.dateRange);
      
      const response = await apiConnector(
        'GET',
        `/api/v1/activity/instructor/${instructorId}?${queryParams.toString()}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      
      if (response.data.success) {
        setInstructorActivities(response.data.data.instructorActivities || []);
        setSelectedInstructor({
          ...response.data.data.instructor,
          summary: response.data.data.summary
        });
      }
      
    } catch (error) {
      console.error('Failed to load instructor activity:', error);
      toast.error('Failed to load instructor activity');
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (activityType) => {
    const iconMap = {
      'login': FaUser,
      'course_enrollment': FaBook,
      'lesson_completed': FaCheckCircle,
      'quiz_completed': FaQuestionCircle,
      'course_completed': FaGraduationCap,
      'course_created': FaBook,
      'course_published': FaBook,
      'dashboard_viewed': FaEye,
      'analytics_viewed': FaChartLine,
      'student_enrolled_in_course': FaUsers
    };
    return iconMap[activityType] || FaUser;
  };

  const getActivityColor = (activityType) => {
    const colorMap = {
      'login': 'text-green-400',
      'course_enrollment': 'text-blue-400',
      'lesson_completed': 'text-green-400',
      'quiz_completed': 'text-purple-400',
      'course_completed': 'text-yellow-400',
      'course_created': 'text-blue-400',
      'course_published': 'text-green-400',
      'dashboard_viewed': 'text-blue-400'
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

  const exportActivityData = async () => {
    try {
      toast.loading('Preparing activity export...');
      
      let dataToExport = [];
      let filename = '';
      
      if (activeTab === 'realtime') {
        dataToExport = realtimeActivities;
        filename = 'realtime-activities';
      } else if (activeTab === 'platform') {
        dataToExport = realtimeActivities;
        filename = 'platform-activities';
      } else if (activeTab === 'instructors' && selectedInstructor) {
        dataToExport = instructorActivities;
        filename = `instructor-${selectedInstructor.firstName}-${selectedInstructor.lastName}-activities`;
      }
      
      if (dataToExport.length === 0) {
        toast.error('No data to export');
        return;
      }
      
      const csvHeaders = ['Date', 'User', 'User Type', 'Activity', 'Course', 'Time Spent', 'Platform'];
      const csvRows = dataToExport.map(activity => [
        new Date(activity.timestamp).toLocaleString(),
        activity.userId?.firstName ? `${activity.userId.firstName} ${activity.userId.lastName}` : 'Unknown',
        activity.userId?.accountType || 'Unknown',
        formatActivityTitle(activity.activityType),
        activity.metadata?.courseName || 'N/A',
        activity.metadata?.timeSpent ? `${activity.metadata.timeSpent} min` : 'N/A',
        activity.metadata?.platform || 'N/A'
      ]);
      
      const csvContent = [csvHeaders, ...csvRows]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast.success('Activity data exported successfully!');
      
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export activity data');
    }
  };

  const filteredInstructors = instructors.filter(instructor => 
    instructor.firstName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
    instructor.lastName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
    instructor.email.toLowerCase().includes(filters.searchTerm.toLowerCase())
  );

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
                <FaChartLine className="text-blue-400" />
                <span>Activity Monitoring</span>
              </h1>
              <p className="text-richblack-300">
                Monitor all platform activities in real-time and analyze user behavior.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {activeTab === 'realtime' && (
                <Button
                  variant={autoRefresh ? 'primary' : 'outline'}
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className="flex items-center space-x-2"
                >
                  <FaRefresh className={autoRefresh ? 'animate-spin' : ''} />
                  <span>{autoRefresh ? 'Auto Refresh On' : 'Auto Refresh Off'}</span>
                </Button>
              )}
              <Button
                variant="outline"
                onClick={exportActivityData}
                className="flex items-center space-x-2"
              >
                <FaDownload />
                <span>Export Data</span>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-richblack-800 p-1 rounded-lg">
            {[
              { id: 'realtime', label: 'Real-time Feed', icon: FaBell },
              { id: 'platform', label: 'Platform Analytics', icon: FaChartLine },
              { id: 'instructors', label: 'Instructor Monitoring', icon: FaUserTie }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'text-richblack-300 hover:text-richblack-5 hover:bg-richblack-700'
                  }`}
                >
                  <IconComponent />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'realtime' && (
            <motion.div
              key="realtime"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Real-time Activity Feed */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-richblack-5 flex items-center space-x-2">
                    <FaBell className="text-blue-400" />
                    <span>Live Activity Feed</span>
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-richblack-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Live</span>
                  </div>
                </div>
                
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                      <div className="text-richblack-5 text-xl">Loading real-time activities...</div>
                    </div>
                  ) : realtimeActivities.length > 0 ? (
                    realtimeActivities.map((activity, index) => {
                      const IconComponent = getActivityIcon(activity.activityType);
                      const PlatformIcon = getPlatformIcon(activity.metadata?.platform);
                      
                      return (
                        <motion.div
                          key={activity._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.02 }}
                          className="flex items-center space-x-4 p-4 bg-richblack-700 rounded-lg"
                        >
                          <div className={`p-2 rounded-lg ${getActivityColor(activity.activityType)} bg-richblack-800`}>
                            <IconComponent className="text-lg" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-richblack-5 font-medium">
                                  {activity.userId?.firstName ? 
                                    `${activity.userId.firstName} ${activity.userId.lastName}` : 
                                    'Unknown User'
                                  }
                                </p>
                                <p className="text-richblack-300 text-sm">
                                  {formatActivityTitle(activity.activityType)}
                                  {activity.metadata?.courseName && ` - ${activity.metadata.courseName}`}
                                </p>
                              </div>
                              
                              <div className="flex items-center space-x-2 text-sm text-richblack-400">
                                <Badge variant="secondary" size="small">
                                  {activity.userId?.accountType || 'Unknown'}
                                </Badge>
                                <PlatformIcon />
                                <span>{formatTimeAgo(activity.timestamp)}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-richblack-400">
                      No real-time activities available
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'platform' && (
            <motion.div
              key="platform"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Platform Analytics */}
              <div className="space-y-6">
                {/* Filters */}
                <Card className="p-6">
                  <div className="flex flex-wrap gap-4">
                    <select
                      value={filters.dateRange}
                      onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                      className="px-4 py-2 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">All Time</option>
                      <option value={JSON.stringify({ start: new Date(Date.now() - 24*60*60*1000), end: new Date() })}>Last 24 Hours</option>
                      <option value={JSON.stringify({ start: new Date(Date.now() - 7*24*60*60*1000), end: new Date() })}>Last 7 Days</option>
                      <option value={JSON.stringify({ start: new Date(Date.now() - 30*24*60*60*1000), end: new Date() })}>Last 30 Days</option>
                    </select>
                  </div>
                </Card>

                {/* Activity Statistics */}
                {platformStats.length > 0 && (
                  <Card className="p-6">
                    <h2 className="text-2xl font-bold text-richblack-5 mb-6">Activity Statistics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {platformStats.slice(0, 6).map((stat, index) => {
                        const IconComponent = getActivityIcon(stat._id);
                        return (
                          <div key={stat._id} className="p-4 bg-richblack-700 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <IconComponent className={`text-2xl ${getActivityColor(stat._id)}`} />
                              <Badge variant="info" size="small">{stat.count}</Badge>
                            </div>
                            <h3 className="text-lg font-semibold text-richblack-5 mb-1">
                              {formatActivityTitle(stat._id)}
                            </h3>
                            <p className="text-richblack-400 text-sm">
                              Last: {formatTimeAgo(stat.lastActivity)}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                )}

                {/* Recent Activities */}
                <Card className="p-6">
                  <h2 className="text-2xl font-bold text-richblack-5 mb-6">Recent Platform Activities</h2>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {realtimeActivities.map((activity, index) => {
                      const IconComponent = getActivityIcon(activity.activityType);
                      
                      return (
                        <div key={activity._id} className="flex items-center space-x-4 p-4 bg-richblack-700 rounded-lg">
                          <div className={`p-2 rounded-lg ${getActivityColor(activity.activityType)} bg-richblack-800`}>
                            <IconComponent className="text-lg" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-richblack-5 font-medium">
                                  {activity.userId?.firstName ? 
                                    `${activity.userId.firstName} ${activity.userId.lastName}` : 
                                    'Unknown User'
                                  }
                                </p>
                                <p className="text-richblack-300 text-sm">
                                  {formatActivityTitle(activity.activityType)}
                                  {activity.metadata?.courseName && ` - ${activity.metadata.courseName}`}
                                </p>
                              </div>
                              
                              <div className="flex items-center space-x-2 text-sm text-richblack-400">
                                <Badge variant="secondary" size="small">
                                  {activity.userId?.accountType || 'Unknown'}
                                </Badge>
                                <span>{formatTimeAgo(activity.timestamp)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === 'instructors' && (
            <motion.div
              key="instructors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Instructor List */}
              <div className="lg:col-span-1">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-richblack-5 mb-4">Instructors</h3>
                  
                  {/* Search */}
                  <div className="relative mb-4">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-richblack-400" />
                    <input
                      type="text"
                      placeholder="Search instructors..."
                      value={filters.searchTerm}
                      onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {loading ? (
                      <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
                      </div>
                    ) : filteredInstructors.length > 0 ? (
                      filteredInstructors.map(instructor => (
                        <div
                          key={instructor._id}
                          onClick={() => loadInstructorActivity(instructor._id)}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedInstructor?._id === instructor._id
                              ? 'bg-blue-500/20 border border-blue-500/40'
                              : 'bg-richblack-700 hover:bg-richblack-600'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                              {instructor.firstName.charAt(0)}{instructor.lastName.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-richblack-5 font-medium truncate">
                                {instructor.firstName} {instructor.lastName}
                              </p>
                              <p className="text-richblack-400 text-sm truncate">
                                {instructor.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-richblack-400">
                        No instructors found
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {/* Instructor Activity */}
              <div className="lg:col-span-2">
                {selectedInstructor ? (
                  <div className="space-y-6">
                    {/* Instructor Info */}
                    <Card className="p-6">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
                          {selectedInstructor.firstName.charAt(0)}{selectedInstructor.lastName.charAt(0)}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-richblack-5">
                            {selectedInstructor.firstName} {selectedInstructor.lastName}
                          </h2>
                          <p className="text-richblack-400">{selectedInstructor.email}</p>
                        </div>
                      </div>

                      {/* Activity Summary */}
                      {selectedInstructor.summary && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-4 bg-richblack-700 rounded-lg">
                            <FaBook className="text-blue-400 text-2xl mx-auto mb-2" />
                            <div className="text-2xl font-bold text-richblack-5">
                              {selectedInstructor.summary.coursesCreated || 0}
                            </div>
                            <div className="text-sm text-richblack-400">Courses Created</div>
                          </div>
                          <div className="text-center p-4 bg-richblack-700 rounded-lg">
                            <FaCheckCircle className="text-green-400 text-2xl mx-auto mb-2" />
                            <div className="text-2xl font-bold text-richblack-5">
                              {selectedInstructor.summary.coursesPublished || 0}
                            </div>
                            <div className="text-sm text-richblack-400">Published</div>
                          </div>
                          <div className="text-center p-4 bg-richblack-700 rounded-lg">
                            <FaUsers className="text-purple-400 text-2xl mx-auto mb-2" />
                            <div className="text-2xl font-bold text-richblack-5">
                              {selectedInstructor.summary.studentsEnrolled || 0}
                            </div>
                            <div className="text-sm text-richblack-400">Students</div>
                          </div>
                          <div className="text-center p-4 bg-richblack-700 rounded-lg">
                            <FaChartLine className="text-orange-400 text-2xl mx-auto mb-2" />
                            <div className="text-2xl font-bold text-richblack-5">
                              {selectedInstructor.summary.analyticsViewed || 0}
                            </div>
                            <div className="text-sm text-richblack-400">Analytics Views</div>
                          </div>
                        </div>
                      )}
                    </Card>

                    {/* Activity Timeline */}
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-richblack-5 mb-4">Recent Activities</h3>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {instructorActivities.length > 0 ? (
                          instructorActivities.map((activity, index) => {
                            const IconComponent = getActivityIcon(activity.activityType);
                            
                            return (
                              <div key={activity._id} className="flex items-start space-x-4 p-4 bg-richblack-700 rounded-lg">
                                <div className={`p-3 rounded-lg ${getActivityColor(activity.activityType)} bg-richblack-800`}>
                                  <IconComponent className="text-xl" />
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between mb-2">
                                    <div>
                                      <h4 className="text-lg font-semibold text-richblack-5 mb-1">
                                        {formatActivityTitle(activity.activityType)}
                                      </h4>
                                      {activity.metadata?.courseName && (
                                        <p className="text-richblack-300 text-sm mb-1">
                                          Course: {activity.metadata.courseName}
                                        </p>
                                      )}
                                    </div>
                                    
                                    <div className="text-sm text-richblack-400">
                                      {formatTimeAgo(activity.timestamp)}
                                    </div>
                                  </div>
                                  
                                  <div className="flex flex-wrap gap-2">
                                    {activity.metadata?.timeSpent && (
                                      <Badge variant="secondary" size="small">
                                        <FaClock className="mr-1" />
                                        {activity.metadata.timeSpent} min
                                      </Badge>
                                    )}
                                    {activity.metadata?.platform && (
                                      <Badge variant="neutral" size="small">
                                        {activity.metadata.platform}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-center py-8 text-richblack-400">
                            No activities found for this instructor
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                ) : (
                  <Card className="p-12 text-center">
                    <FaUserTie className="text-6xl text-richblack-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-richblack-5 mb-2">
                      Select an Instructor
                    </h3>
                    <p className="text-richblack-400">
                      Choose an instructor to view their activity history and analytics.
                    </p>
                  </Card>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActivityMonitoring;