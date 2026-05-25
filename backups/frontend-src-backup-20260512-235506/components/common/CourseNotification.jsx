import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  FaBell,
  FaTimes,
  FaBook,
  FaStar,
  FaUsers,
  FaRupeeSign,
  FaPlay,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { ActivityTracker } from '../../services/operations/dashboardAPI';
import { 
  getUserNotifications, 
  getUnreadNotificationCount, 
  markNotificationAsRead,
  clearAllNotifications 
} from '../../services/operations/notificationAPI';

const CourseNotification = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch notifications from API
  const fetchNotifications = async () => {
    if (!user || !token || user.accountType !== 'Student') return;
    
    try {
      setLoading(true);
      
      // Fetch real notifications from API
      const [notificationsResponse, unreadCountResponse] = await Promise.all([
        getUserNotifications(token, 1, 10, 'new_course_available'),
        getUnreadNotificationCount(token)
      ]);
      
      if (notificationsResponse?.success) {
        // Transform API data to match component structure
        const transformedNotifications = notificationsResponse.data.map(notification => ({
          ...notification,
          read: notification.metadata?.read || false
        }));
        
        setNotifications(transformedNotifications);
      } else {
        // Fallback to mock data if API fails
        const mockNotifications = [
          {
            _id: '1',
            activityType: 'new_course_available',
            activityData: {
              courseId: 'course_1',
              courseName: 'Advanced React Development',
              instructor: 'Priya Sharma',
              category: 'Web Development',
              price: 3999,
              thumbnail: null
            },
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
            read: false
          }
        ];
        setNotifications(mockNotifications);
      }
      
      // Set unread count
      setUnreadCount(typeof unreadCountResponse === 'number' ? unreadCountResponse : 0);
      
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Fallback to empty state on error
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      // Update UI immediately
      setNotifications(prev => 
        prev.map(notification => 
          notification._id === notificationId 
            ? { ...notification, read: true }
            : notification
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      // Update on server
      if (token) {
        await markNotificationAsRead(token, notificationId);
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    markAsRead(notification._id);
    
    if (notification.activityType === 'new_course_available') {
      // Navigate to all courses page or specific course
      navigate('/all-courses');
      toast.success(`Check out the new course: ${notification.activityData.courseName}`);
    }
    
    setShowNotifications(false);
  };

  // Clear all notifications
  const clearAllNotificationsHandler = async () => {
    try {
      if (token) {
        await clearAllNotifications(token);
      }
      setNotifications([]);
      setUnreadCount(0);
      setShowNotifications(false);
    } catch (error) {
      console.error('Error clearing notifications:', error);
      toast.error('Failed to clear notifications');
    }
  };

  // Format time ago
  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - new Date(date)) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  // Fetch notifications on component mount and set up polling
  useEffect(() => {
    fetchNotifications();
    
    // Poll for new notifications every 2 minutes
    const pollInterval = setInterval(fetchNotifications, 2 * 60 * 1000);
    
    return () => clearInterval(pollInterval);
  }, [user, token]);

  // Don't render for non-students
  if (!user || user.accountType !== 'Student') {
    return null;
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <motion.button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-3 rounded-full bg-richblack-800 hover:bg-richblack-700 transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaBell className="text-xl text-richblack-100" />
        
        {/* Unread Count Badge */}
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
      </motion.button>

      {/* Notifications Dropdown */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-96 bg-richblack-800 rounded-xl shadow-2xl border border-richblack-700 z-50 max-h-96 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-richblack-700">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <FaBell className="text-blue-400" />
                Notifications
              </h3>
              <div className="flex items-center gap-2">
                {notifications.length > 0 && (
                  <button
                    onClick={clearAllNotificationsHandler}
                    className="text-xs text-richblack-400 hover:text-white transition-colors"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-1 rounded-full hover:bg-richblack-700 transition-colors"
                >
                  <FaTimes className="text-richblack-400" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {loading ? (
                <div className="p-4 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
                  <p className="text-richblack-400 mt-2">Loading notifications...</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <FaCheckCircle className="text-4xl text-green-400 mx-auto mb-3" />
                  <p className="text-richblack-300">No new notifications</p>
                  <p className="text-sm text-richblack-500 mt-1">You're all caught up!</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <motion.div
                    key={notification._id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`p-4 border-b border-richblack-700 cursor-pointer hover:bg-richblack-700 transition-colors ${
                      !notification.read ? 'bg-blue-900/20' : ''
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="flex-shrink-0 p-2 rounded-full bg-blue-500/20">
                        <FaBook className="text-blue-400" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-white text-sm truncate">
                            New Course Available!
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                        
                        <p className="text-richblack-300 text-sm mb-2">
                          <span className="font-medium text-blue-400">
                            {notification.activityData.courseName}
                          </span>
                          {' '}by {notification.activityData.instructor}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-richblack-400">
                          <span className="flex items-center gap-1">
                            <FaRupeeSign />
                            {notification.activityData.price}
                          </span>
                          <span>{notification.activityData.category}</span>
                          <span>{formatTimeAgo(notification.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-richblack-700 text-center">
                <button
                  onClick={() => {
                    navigate('/all-courses');
                    setShowNotifications(false);
                  }}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View All Courses
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseNotification;