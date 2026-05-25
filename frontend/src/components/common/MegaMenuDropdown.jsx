import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  FaSearch, 
  FaCode, 
  FaDatabase, 
  FaShieldAlt, 
  FaCloud, 
  FaMobile, 
  FaPalette,
  FaFire,
  FaClock,
  FaHeart,
  FaBookOpen,
  FaChevronRight,
  FaStar,
  FaUsers,
  FaPlay
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { courseCategories } from '../../routes/courseRoutes';
import { 
  getCategories, 
  getTrendingCourses, 
  getRecentCourses, 
  getFavoriteCourses, 
  getMyCourses 
} from '../../services/operations/megaMenuAPI';

const MegaMenuDropdown = ({ isOpen, onClose }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [trendingCourses, setTrendingCourses] = useState([]);
  const [recentCourses, setRecentCourses] = useState([]);
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef(null);

  // Category icons mapping
  const categoryIcons = {
    'Programming & Development': FaCode,
    'Data & AI': FaDatabase,
    'Cybersecurity': FaShieldAlt,
    'Cloud & DevOps': FaCloud,
    'Mobile App Development': FaMobile,
    'High Demand Skills': FaPalette
  };

  // Mock trending courses data
  const mockTrendingCourses = [
    {
      id: 1,
      title: 'Complete Python Bootcamp',
      instructor: 'Dr. Sarah Johnson',
      rating: 4.8,
      students: 15420,
      price: '₹2,999',
      thumbnail: null,
      category: 'Programming & Development'
    },
    {
      id: 2,
      title: 'React.js Masterclass',
      instructor: 'Prof. Mike Chen',
      rating: 4.9,
      students: 12350,
      price: '₹3,499',
      thumbnail: null,
      category: 'Programming & Development'
    },
    {
      id: 3,
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Emily Rodriguez',
      rating: 4.7,
      students: 8900,
      price: '₹4,199',
      thumbnail: null,
      category: 'Data & AI'
    },
    {
      id: 4,
      title: 'Ethical Hacking Basics',
      instructor: 'Alex Thompson',
      rating: 4.6,
      students: 6750,
      price: '₹3,999',
      thumbnail: null,
      category: 'Cybersecurity'
    }
  ];

  // Mock user-specific data
  const mockRecentCourses = user ? [
    {
      id: 1,
      title: 'JavaScript ES6+',
      progress: 75,
      lastAccessed: '2 hours ago'
    },
    {
      id: 2,
      title: 'Node.js Backend',
      progress: 45,
      lastAccessed: '1 day ago'
    }
  ] : [];

  const mockFavoriteCourses = user ? [
    {
      id: 1,
      title: 'Full Stack MERN',
      instructor: 'John Doe',
      price: '₹4,999'
    },
    {
      id: 2,
      title: 'AWS Cloud Practitioner',
      instructor: 'Jane Smith',
      price: '₹3,499'
    }
  ] : [];

  const mockMyCourses = user ? [
    {
      id: 1,
      title: 'Python for Beginners',
      progress: 85,
      nextLesson: 'Functions and Modules'
    },
    {
      id: 2,
      title: 'React Development',
      progress: 60,
      nextLesson: 'State Management'
    }
  ] : [];

  // Load data on component mount
  useEffect(() => {
    if (isOpen) {
      // Immediately show mock data for instant loading
      setTrendingCourses(mockTrendingCourses);
      setRecentCourses(user ? mockRecentCourses : []);
      setFavoriteCourses(user ? mockFavoriteCourses : []);
      setMyCourses(user ? mockMyCourses : []);
      setLoading(false);
      
      // Fetch real data in background and update if available
      const fetchData = async () => {
        try {
          // Fetch trending courses (public data)
          const trending = await getTrendingCourses();
          if (trending.length > 0) {
            setTrendingCourses(trending);
          }
          
          // Fetch user-specific data if authenticated
          if (user && token) {
            const [recent, favorites, myCourses] = await Promise.all([
              getRecentCourses(user._id, token),
              getFavoriteCourses(user._id, token),
              getMyCourses(user._id, token)
            ]);
            
            if (recent.length > 0) setRecentCourses(recent);
            if (favorites.length > 0) setFavoriteCourses(favorites);
            if (myCourses.length > 0) setMyCourses(myCourses);
          }
        } catch (error) {
          console.error('Error fetching mega menu data:', error);
          // Keep using mock data on error - no need to update state
        }
      };
      
      // Start background fetch
      fetchData();
      
      // Focus search input when dropdown opens
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen, user, token]);

  // Handle course click
  const handleCourseClick = (courseId, coursePath = null) => {
    if (!user || !token) {
      navigate('/login');
      return;
    }
    
    if (coursePath) {
      navigate(coursePath);
    } else {
      navigate(`/courses/${courseId}`);
    }
    onClose();
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    navigate(`/course-catalog?category=${encodeURIComponent(category)}`);
    onClose();
  };

  // Filter courses based on search
  const filteredCourses = searchTerm ? 
    trendingCourses.filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: 'easeIn'
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute left-1/2 top-full z-[1000] w-[95vw] max-w-[1200px] -translate-x-1/2 mt-2 rounded-xl border border-richblack-700 bg-richblack-800 shadow-2xl backdrop-blur-sm"
        >
          <div className="p-6">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-richblack-400 text-sm" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search courses, categories, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 transition-colors"
                />
              </div>
              
              {/* Search Results */}
              {searchTerm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 bg-richblack-700 rounded-lg border border-richblack-600 max-h-60 overflow-y-auto"
                >
                  {filteredCourses.length > 0 ? (
                    <div className="p-3">
                      <h4 className="text-sm font-semibold text-richblack-300 mb-2">Search Results</h4>
                      {filteredCourses.map((course) => (
                        <div
                          key={course.id}
                          onClick={() => handleCourseClick(course.id)}
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-richblack-600 cursor-pointer transition-colors"
                        >
                          <div className="w-10 h-10 bg-richblack-600 rounded-lg flex items-center justify-center">
                            <FaPlay className="text-richblack-400 text-sm" />
                          </div>
                          <div className="flex-1">
                            <h5 className="text-sm font-medium text-richblack-5">{course.title}</h5>
                            <p className="text-xs text-richblack-400">{course.category}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-yellow-50">{course.price}</p>
                            <div className="flex items-center space-x-1">
                              <FaStar className="text-yellow-400 text-xs" />
                              <span className="text-xs text-richblack-400">{course.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-richblack-400 text-sm">
                      No courses found for "{searchTerm}"
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Course Categories */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-richblack-5 mb-4 flex items-center">
                  <FaBookOpen className="mr-2 text-yellow-50" />
                  Course Categories
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(courseCategories).map(([category, courses]) => {
                    const IconComponent = categoryIcons[category] || FaCode;
                    return (
                      <motion.div
                        key={category}
                        variants={itemVariants}
                        className="group p-4 bg-richblack-700 rounded-lg border border-richblack-600 hover:border-yellow-50 transition-all duration-300 cursor-pointer"
                        onClick={() => handleCategoryClick(category)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <IconComponent className="text-yellow-50 text-lg" />
                            <h4 className="font-semibold text-richblack-5 group-hover:text-yellow-50 transition-colors">
                              {category}
                            </h4>
                          </div>
                          <FaChevronRight className="text-richblack-400 group-hover:text-yellow-50 transition-colors" />
                        </div>
                        <p className="text-sm text-richblack-400 mb-2">
                          {courses.length} courses available
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {courses.slice(0, 3).map((course, index) => (
                            <span
                              key={index}
                              className="text-xs bg-richblack-600 text-richblack-300 px-2 py-1 rounded"
                            >
                              {course.title.split(' ').slice(0, 2).join(' ')}
                            </span>
                          ))}
                          {courses.length > 3 && (
                            <span className="text-xs text-richblack-400">+{courses.length - 3} more</span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="lg:col-span-2 space-y-6">
                {/* Trending Courses */}
                <div>
                  <h3 className="text-lg font-semibold text-richblack-5 mb-4 flex items-center">
                    <FaFire className="mr-2 text-orange-500" />
                    Trending Courses
                  </h3>
                  <div className="space-y-3">
                    {trendingCourses.slice(0, 3).map((course) => (
                      <motion.div
                        key={course.id}
                        variants={itemVariants}
                        onClick={() => handleCourseClick(course.id)}
                        className="flex items-center space-x-3 p-3 bg-richblack-700 rounded-lg border border-richblack-600 hover:border-yellow-50 cursor-pointer transition-all duration-300 group"
                      >
                        <div className="w-12 h-12 bg-richblack-600 rounded-lg flex items-center justify-center">
                          <FaPlay className="text-richblack-400 group-hover:text-yellow-50 transition-colors" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-richblack-5 group-hover:text-yellow-50 transition-colors text-sm">
                            {course.title}
                          </h4>
                          <p className="text-xs text-richblack-400">{course.instructor}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center space-x-1">
                              <FaStar className="text-yellow-400 text-xs" />
                              <span className="text-xs text-richblack-400">{course.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <FaUsers className="text-richblack-400 text-xs" />
                              <span className="text-xs text-richblack-400">{course.students.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-yellow-50 text-sm">{course.price}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* User-specific sections */}
                {user && token ? (
                  <>
                    {/* My Courses */}
                    {myCourses.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-richblack-5 mb-4 flex items-center">
                          <FaBookOpen className="mr-2 text-green-500" />
                          My Courses
                        </h3>
                        <div className="space-y-2">
                          {myCourses.slice(0, 2).map((course) => (
                            <motion.div
                              key={course.id}
                              variants={itemVariants}
                              onClick={() => handleCourseClick(course.id)}
                              className="flex items-center justify-between p-3 bg-richblack-700 rounded-lg border border-richblack-600 hover:border-green-500 cursor-pointer transition-all duration-300"
                            >
                              <div>
                                <h4 className="font-medium text-richblack-5 text-sm">{course.title}</h4>
                                <p className="text-xs text-richblack-400">Next: {course.nextLesson}</p>
                              </div>
                              <div className="text-right">
                                <div className="w-16 h-2 bg-richblack-600 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-green-500 transition-all duration-300"
                                    style={{ width: `${course.progress}%` }}
                                  ></div>
                                </div>
                                <p className="text-xs text-richblack-400 mt-1">{course.progress}%</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recently Viewed */}
                    {recentCourses.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-richblack-5 mb-4 flex items-center">
                          <FaClock className="mr-2 text-blue-500" />
                          Recently Viewed
                        </h3>
                        <div className="space-y-2">
                          {recentCourses.map((course) => (
                            <motion.div
                              key={course.id}
                              variants={itemVariants}
                              onClick={() => handleCourseClick(course.id)}
                              className="flex items-center justify-between p-3 bg-richblack-700 rounded-lg border border-richblack-600 hover:border-blue-500 cursor-pointer transition-all duration-300"
                            >
                              <div>
                                <h4 className="font-medium text-richblack-5 text-sm">{course.title}</h4>
                                <p className="text-xs text-richblack-400">{course.lastAccessed}</p>
                              </div>
                              <div className="w-12 h-2 bg-richblack-600 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 transition-all duration-300"
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Favorites */}
                    {favoriteCourses.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-richblack-5 mb-4 flex items-center">
                          <FaHeart className="mr-2 text-red-500" />
                          Favorites
                        </h3>
                        <div className="space-y-2">
                          {favoriteCourses.map((course) => (
                            <motion.div
                              key={course.id}
                              variants={itemVariants}
                              onClick={() => handleCourseClick(course.id)}
                              className="flex items-center justify-between p-3 bg-richblack-700 rounded-lg border border-richblack-600 hover:border-red-500 cursor-pointer transition-all duration-300"
                            >
                              <div>
                                <h4 className="font-medium text-richblack-5 text-sm">{course.title}</h4>
                                <p className="text-xs text-richblack-400">{course.instructor}</p>
                              </div>
                              <p className="font-semibold text-yellow-50 text-sm">{course.price}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* Login prompt for non-authenticated users */
                  <div className="text-center p-6 bg-richblack-700 rounded-lg border border-richblack-600">
                    <h3 className="text-lg font-semibold text-richblack-5 mb-2">Login to Access</h3>
                    <p className="text-sm text-richblack-400 mb-4">
                      Sign in to view your courses, favorites, and personalized recommendations
                    </p>
                    <button
                      onClick={() => {
                        navigate('/login');
                        onClose();
                      }}
                      className="px-4 py-2 bg-yellow-50 text-richblack-900 rounded-lg font-semibold hover:bg-yellow-100 transition-colors"
                    >
                      Login Now
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-6 pt-4 border-t border-richblack-700 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    navigate('/course-catalog');
                    onClose();
                  }}
                  className="text-sm text-yellow-50 hover:text-yellow-100 transition-colors flex items-center"
                >
                  View All Courses
                  <FaChevronRight className="ml-1 text-xs" />
                </button>
                <button
                  onClick={() => {
                    navigate('/all-courses');
                    onClose();
                  }}
                  className="text-sm text-richblack-400 hover:text-richblack-300 transition-colors"
                >
                  Browse by Category
                </button>
              </div>
              <div className="text-xs text-richblack-400">
                {Object.values(courseCategories).reduce((acc, courses) => acc + courses.length, 0)} courses available
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenuDropdown;