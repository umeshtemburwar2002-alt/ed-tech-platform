import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBell,
  FaCheck,
  FaCheckDouble,
  FaClock,
  FaGraduationCap,
  FaVideo,
  FaFileAlt,
  FaTrophy,
  FaExclamationCircle,
  FaInfoCircle,
  FaTrash,
  FaFilter,
  FaSearch,
  FaEllipsisV
} from 'react-icons/fa';
import { Card, Button, Badge } from '../../components/ui';

const Notifications = () => {
  const { user } = useSelector((state) => state.profile);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Sample notifications data
  const sampleNotifications = [
    {
      id: 1,
      type: 'assignment',
      title: 'New Assignment Due',
      message: 'JavaScript Fundamentals Quiz is due tomorrow',
      timestamp: '2 hours ago',
      isRead: false,
      priority: 'high',
      icon: FaFileAlt,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    },
    {
      id: 2,
      type: 'live_class',
      title: 'Live Class Starting Soon',
      message: 'React Advanced Concepts class starts in 30 minutes',
      timestamp: '30 minutes ago',
      isRead: false,
      priority: 'urgent',
      icon: FaVideo,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Course Completed!',
      message: 'Congratulations! You completed Python Fundamentals course',
      timestamp: '1 day ago',
      isRead: false,
      priority: 'medium',
      icon: FaTrophy,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20'
    },
    {
      id: 4,
      type: 'course_update',
      title: 'Course Content Updated',
      message: 'New lessons added to Web Development Bootcamp',
      timestamp: '2 days ago',
      isRead: true,
      priority: 'low',
      icon: FaGraduationCap,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      id: 5,
      type: 'reminder',
      title: 'Study Reminder',
      message: 'Don\'t forget to complete today\'s learning goals',
      timestamp: '3 days ago',
      isRead: true,
      priority: 'low',
      icon: FaClock,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      id: 6,
      type: 'system',
      title: 'System Maintenance',
      message: 'Platform will be under maintenance tonight from 2-4 AM',
      timestamp: '1 week ago',
      isRead: true,
      priority: 'medium',
      icon: FaInfoCircle,
      color: 'text-gray-400',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/20'
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setNotifications(sampleNotifications);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && !notification.isRead) ||
      (filter === 'read' && notification.isRead) ||
      notification.type === filter;
    
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      urgent: 'error',
      high: 'warning',
      medium: 'info',
      low: 'success'
    };
    return variants[priority] || 'info';
  };

  const filterOptions = [
    { value: 'all', label: 'All', count: notifications.length },
    { value: 'unread', label: 'Unread', count: unreadCount },
    { value: 'read', label: 'Read', count: notifications.length - unreadCount },
    { value: 'assignment', label: 'Assignments', count: notifications.filter(n => n.type === 'assignment').length },
    { value: 'live_class', label: 'Live Classes', count: notifications.filter(n => n.type === 'live_class').length },
    { value: 'achievement', label: 'Achievements', count: notifications.filter(n => n.type === 'achievement').length }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-richblack-900 flex items-center justify-center">
        <div className="text-richblack-5 text-xl">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5 p-6">
      <div className="max-w-6xl mx-auto">
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
                <FaBell className="text-yellow-400" />
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <Badge variant="error" size="small">
                    {unreadCount} new
                  </Badge>
                )}
              </h1>
              <p className="text-richblack-300">
                Stay updated with your learning progress and important announcements.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  onClick={markAllAsRead}
                  className="flex items-center space-x-2"
                >
                  <FaCheckDouble />
                  <span>Mark All Read</span>
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFilter(option.value)}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                      filter === option.value
                        ? 'bg-yellow-400 text-richblack-900'
                        : 'bg-richblack-700 text-richblack-300 hover:bg-richblack-600 hover:text-richblack-5'
                    }`}
                  >
                    <span>{option.label}</span>
                    <Badge 
                      variant={filter === option.value ? 'dark' : 'secondary'} 
                      size="small"
                    >
                      {option.count}
                    </Badge>
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-richblack-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-64"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Notifications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <AnimatePresence>
            {filteredNotifications.length === 0 ? (
              <Card className="p-12 text-center">
                <FaBell className="text-6xl text-richblack-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-richblack-5 mb-2">
                  No notifications found
                </h3>
                <p className="text-richblack-400">
                  {searchTerm ? 'Try adjusting your search terms.' : 'You\'re all caught up!'}
                </p>
              </Card>
            ) : (
              filteredNotifications.map((notification, index) => {
                const IconComponent = notification.icon;
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`relative ${
                      !notification.isRead ? 'ring-2 ring-yellow-400/30' : ''
                    }`}
                  >
                    <Card className={`p-6 transition-all duration-200 hover:scale-[1.02] ${
                      notification.bgColor
                    } border ${notification.borderColor}`}>
                      <div className="flex items-start space-x-4">
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          notification.bgColor
                        } border ${notification.borderColor}`}>
                          <IconComponent className={`text-xl ${notification.color}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <h3 className={`text-lg font-semibold ${
                                !notification.isRead ? 'text-richblack-5' : 'text-richblack-200'
                              }`}>
                                {notification.title}
                              </h3>
                              <Badge variant={getPriorityBadge(notification.priority)} size="small">
                                {notification.priority}
                              </Badge>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                              )}
                            </div>
                            
                            {/* Actions */}
                            <div className="flex items-center space-x-2">
                              {!notification.isRead && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="p-2 text-richblack-400 hover:text-yellow-400 transition-colors duration-200"
                                  title="Mark as read"
                                >
                                  <FaCheck />
                                </button>
                              )}
                              <button
                                onClick={() => deleteNotification(notification.id)}
                                className="p-2 text-richblack-400 hover:text-red-400 transition-colors duration-200"
                                title="Delete notification"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                          
                          <p className={`text-sm mb-3 ${
                            !notification.isRead ? 'text-richblack-300' : 'text-richblack-400'
                          }`}>
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-richblack-500 flex items-center space-x-1">
                              <FaClock />
                              <span>{notification.timestamp}</span>
                            </span>
                            
                            {notification.type === 'assignment' && (
                              <Button variant="primary" size="small">
                                View Assignment
                              </Button>
                            )}
                            
                            {notification.type === 'live_class' && (
                              <Button variant="error" size="small">
                                Join Class
                              </Button>
                            )}
                            
                            {notification.type === 'achievement' && (
                              <Button variant="success" size="small">
                                View Certificate
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </motion.div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <Button variant="outline" className="px-8">
              Load More Notifications
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default Notifications;
