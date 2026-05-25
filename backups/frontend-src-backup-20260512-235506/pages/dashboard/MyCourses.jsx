import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaBook,
  FaPlay,
  FaClock,
  FaCheckCircle,
  FaStar,
  FaUsers,
  FaCalendarAlt,
  FaDownload,
  FaShare,
  FaHeart,
  FaBookmark,
  FaGraduationCap,
  FaTrophy,
  FaFire,
  FaRocket,
  FaChartLine,
  FaEye,
  FaArrowRight,
  FaFilter,
  FaSearch,
  FaSort,
  FaGrid3X3,
  FaList,
  FaPercent,
  FaAward,
  FaCertificate,
  FaLock,
  FaUnlock
} from 'react-icons/fa';
import { Card, Button, Badge } from '../../components/ui';
import { toast } from 'react-hot-toast';

const MyCourses = () => {
  const { user } = useSelector((state) => state.profile);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'in-progress', 'completed'
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'name', 'progress'
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock enrolled courses data
  const enrolledCourses = [
    {
      id: 1,
      title: "Complete Full-Stack Web Development",
      instructor: "John Smith",
      instructorImage: "👨‍💻",
      thumbnail: "💻",
      category: "Web Development",
      level: "Beginner to Advanced",
      duration: "50 hours",
      totalLessons: 120,
      completedLessons: 45,
      progress: 37,
      rating: 4.9,
      students: 25420,
      enrolledDate: "2024-01-15",
      lastAccessed: "2024-01-20",
      status: "in-progress",
      nextLesson: "React Hooks Deep Dive",
      estimatedCompletion: "6 weeks",
      certificate: true,
      downloadable: true,
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js']
    },
    {
      id: 2,
      title: "Data Science & AI Masterclass",
      instructor: "Dr. Sarah Johnson",
      instructorImage: "👩‍🔬",
      thumbnail: "📊",
      category: "Data Science",
      level: "Intermediate",
      duration: "65 hours",
      totalLessons: 150,
      completedLessons: 150,
      progress: 100,
      rating: 4.8,
      students: 18350,
      enrolledDate: "2023-12-01",
      lastAccessed: "2024-01-18",
      status: "completed",
      nextLesson: null,
      estimatedCompletion: "Completed",
      certificate: true,
      downloadable: true,
      skills: ['Python', 'Pandas', 'TensorFlow', 'Machine Learning']
    },
    {
      id: 3,
      title: "Mobile App Development with React Native",
      instructor: "Mike Davis",
      instructorImage: "👨‍💼",
      thumbnail: "📱",
      category: "Mobile Development",
      level: "Intermediate",
      duration: "40 hours",
      totalLessons: 80,
      completedLessons: 20,
      progress: 25,
      rating: 4.7,
      students: 12900,
      enrolledDate: "2024-01-10",
      lastAccessed: "2024-01-19",
      status: "in-progress",
      nextLesson: "Navigation in React Native",
      estimatedCompletion: "8 weeks",
      certificate: true,
      downloadable: false,
      skills: ['React Native', 'JavaScript', 'Mobile UI']
    },
    {
      id: 4,
      title: "UI/UX Design Fundamentals",
      instructor: "Lisa Chen",
      instructorImage: "👩‍🎨",
      thumbnail: "🎨",
      category: "Design",
      level: "Beginner",
      duration: "30 hours",
      totalLessons: 60,
      completedLessons: 60,
      progress: 100,
      rating: 4.6,
      students: 9800,
      enrolledDate: "2023-11-15",
      lastAccessed: "2024-01-10",
      status: "completed",
      nextLesson: null,
      estimatedCompletion: "Completed",
      certificate: true,
      downloadable: true,
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping']
    },
    {
      id: 5,
      title: "Python for Beginners",
      instructor: "Alex Kumar",
      instructorImage: "👨‍🏫",
      thumbnail: "🐍",
      category: "Programming",
      level: "Beginner",
      duration: "25 hours",
      totalLessons: 50,
      completedLessons: 10,
      progress: 20,
      rating: 4.5,
      students: 15600,
      enrolledDate: "2024-01-20",
      lastAccessed: "2024-01-21",
      status: "in-progress",
      nextLesson: "Python Data Types",
      estimatedCompletion: "4 weeks",
      certificate: true,
      downloadable: true,
      skills: ['Python', 'Programming Basics', 'Problem Solving']
    }
  ];

  // Filter and sort courses
  const filteredCourses = enrolledCourses
    .filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterStatus === 'all' || course.status === filterStatus;
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'progress':
          return b.progress - a.progress;
        case 'recent':
        default:
          return new Date(b.lastAccessed) - new Date(a.lastAccessed);
      }
    });

  // Calculate statistics
  const stats = {
    total: enrolledCourses.length,
    inProgress: enrolledCourses.filter(c => c.status === 'in-progress').length,
    completed: enrolledCourses.filter(c => c.status === 'completed').length,
    totalHours: enrolledCourses.reduce((sum, course) => sum + parseInt(course.duration), 0),
    avgProgress: Math.round(enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length)
  };

  const handleContinueLearning = (courseId) => {
    toast.success('Redirecting to course...');
    // Navigate to course player
  };

  const handleDownloadCertificate = (courseId) => {
    toast.success('Certificate downloaded!');
    // Download certificate logic
  };

  const handleShareCourse = (courseId) => {
    toast.success('Course link copied to clipboard!');
    // Share course logic
  };

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                My Courses
              </h1>
              <p className="text-richblack-300 text-lg">
                Continue your learning journey and track your progress
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <Link to="/all-courses">
                <Button 
                  variant="outline" 
                  className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                >
                  <FaRocket className="mr-2" />
                  Explore More Courses
                </Button>
              </Link>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: "Total Courses", value: stats.total, icon: FaBook, color: "text-blue-400", bg: "bg-blue-600" },
              { label: "In Progress", value: stats.inProgress, icon: FaClock, color: "text-yellow-400", bg: "bg-yellow-600" },
              { label: "Completed", value: stats.completed, icon: FaCheckCircle, color: "text-green-400", bg: "bg-green-600" },
              { label: "Total Hours", value: `${stats.totalHours}h`, icon: FaGraduationCap, color: "text-purple-400", bg: "bg-purple-600" },
              { label: "Avg Progress", value: `${stats.avgProgress}%`, icon: FaChartLine, color: "text-pink-400", bg: "bg-pink-600" }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-richblack-800 rounded-xl p-4 border border-richblack-700 hover:border-purple-500 transition-all duration-300 group hover:scale-105"
                >
                  <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="text-lg text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-richblack-300 text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-richblack-800 rounded-xl p-6 border border-richblack-700 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-richblack-400" />
              <input
                type="text"
                placeholder="Search courses, instructors, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-richblack-700 border border-richblack-600 rounded-lg text-white placeholder-richblack-400 focus:outline-none focus:border-purple-500 transition-colors duration-300"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Filter by Status */}
              <div className="flex items-center gap-2">
                <FaFilter className="text-richblack-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-richblack-700 border border-richblack-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors duration-300"
                >
                  <option value="all">All Courses</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <FaSort className="text-richblack-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-richblack-700 border border-richblack-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors duration-300"
                >
                  <option value="recent">Recently Accessed</option>
                  <option value="name">Course Name</option>
                  <option value="progress">Progress</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="flex items-center bg-richblack-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors duration-300 ${
                    viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-richblack-400 hover:text-white'
                  }`}
                >
                  <FaGrid3X3 />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors duration-300 ${
                    viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-richblack-400 hover:text-white'
                  }`}
                >
                  <FaList />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Courses Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-white mb-2">No courses found</h3>
              <p className="text-richblack-300 mb-6">
                {searchTerm ? 'Try adjusting your search terms' : 'Start your learning journey by enrolling in courses'}
              </p>
              <Link to="/all-courses">
                <Button variant="primary" className="bg-purple-600 hover:bg-purple-700">
                  <FaRocket className="mr-2" />
                  Explore Courses
                </Button>
              </Link>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-richblack-800 rounded-xl border border-richblack-700 hover:border-purple-500 transition-all duration-300 group hover:scale-105 overflow-hidden ${
                    viewMode === 'list' ? 'flex items-center p-4' : 'p-6'
                  }`}
                >
                  {viewMode === 'grid' ? (
                    // Grid View
                    <>
                      {/* Course Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-4xl">{course.thumbnail}</div>
                        <div className="flex gap-2">
                          {course.status === 'completed' && (
                            <Badge className="bg-green-600 text-white">
                              <FaCheckCircle className="mr-1" /> Completed
                            </Badge>
                          )}
                          {course.status === 'in-progress' && (
                            <Badge className="bg-yellow-600 text-white">
                              <FaClock className="mr-1" /> In Progress
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Course Info */}
                      <div className="mb-4">
                        <Badge variant="outline" className="text-xs mb-2">{course.category}</Badge>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">{course.instructorImage}</span>
                          <span className="text-richblack-300 text-sm">by {course.instructor}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-richblack-300">Progress</span>
                          <span className="text-purple-400 font-semibold">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-richblack-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-richblack-400 mt-1">
                          <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      {/* Course Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          <span className="font-semibold">{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-richblack-300">
                          <FaUsers className="text-sm" />
                          <span className="text-sm">{course.students.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Next Lesson */}
                      {course.nextLesson && (
                        <div className="mb-4 p-3 bg-richblack-700 rounded-lg">
                          <div className="text-xs text-richblack-400 mb-1">Next Lesson:</div>
                          <div className="text-sm font-medium text-white">{course.nextLesson}</div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {course.status === 'in-progress' ? (
                          <Button 
                            variant="primary" 
                            size="small" 
                            className="flex-1 bg-purple-600 hover:bg-purple-700"
                            onClick={() => handleContinueLearning(course.id)}
                          >
                            <FaPlay className="mr-2" />
                            Continue
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="small" 
                            className="flex-1 border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                            onClick={() => handleContinueLearning(course.id)}
                          >
                            <FaEye className="mr-2" />
                            Review
                          </Button>
                        )}
                        
                        {course.certificate && course.status === 'completed' && (
                          <Button 
                            variant="outline" 
                            size="small" 
                            className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-white"
                            onClick={() => handleDownloadCertificate(course.id)}
                          >
                            <FaCertificate />
                          </Button>
                        )}
                        
                        <Button 
                          variant="outline" 
                          size="small" 
                          className="border-richblack-500 text-richblack-400 hover:bg-richblack-500 hover:text-white"
                          onClick={() => handleShareCourse(course.id)}
                        >
                          <FaShare />
                        </Button>
                      </div>
                    </>
                  ) : (
                    // List View
                    <>
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-3xl">{course.thumbnail}</div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold group-hover:text-purple-400 transition-colors">
                              {course.title}
                            </h3>
                            {course.status === 'completed' && (
                              <Badge className="bg-green-600 text-white text-xs">
                                <FaCheckCircle className="mr-1" /> Completed
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-richblack-300 mb-2">
                            <span>by {course.instructor}</span>
                            <span>{course.category}</span>
                            <span>{course.duration}</span>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="flex-1 max-w-xs">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span className="text-purple-400">{course.progress}%</span>
                              </div>
                              <div className="w-full bg-richblack-700 rounded-full h-1.5">
                                <div 
                                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full"
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              {course.status === 'in-progress' ? (
                                <Button 
                                  variant="primary" 
                                  size="small" 
                                  className="bg-purple-600 hover:bg-purple-700"
                                  onClick={() => handleContinueLearning(course.id)}
                                >
                                  <FaPlay className="mr-2" />
                                  Continue
                                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="small" 
                                  className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                                  onClick={() => handleContinueLearning(course.id)}
                                >
                                  <FaEye className="mr-2" />
                                  Review
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Continue Learning CTA */}
        {filteredCourses.some(course => course.status === 'in-progress') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-xl p-8 text-center"
          >
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-white mb-2">Keep Learning!</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              You have {stats.inProgress} courses in progress. Continue your learning journey and achieve your goals!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => {
                  const inProgressCourse = enrolledCourses.find(c => c.status === 'in-progress');
                  if (inProgressCourse) handleContinueLearning(inProgressCourse.id);
                }}
              >
                <FaPlay className="mr-2" />
                Continue Last Course
              </Button>
              <Link to="/all-courses">
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                >
                  <FaRocket className="mr-2" />
                  Explore More Courses
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
