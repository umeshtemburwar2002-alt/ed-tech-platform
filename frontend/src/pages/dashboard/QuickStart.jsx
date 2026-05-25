import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaRocket,
  FaGraduationCap,
  FaCode,
  FaChartLine,
  FaBookOpen,
  FaPlay,
  FaCheckCircle,
  FaArrowRight,
  FaMagic,
  FaClock,
  FaUsers,
  FaLightbulb,
  FaBullseye,
  FaFire,
  FaTrophy,
  FaCalendar,
  FaBook,
  FaChartBar,
  FaShieldAlt,
  FaHeart,
  FaNewspaper,
  FaBlog,
  FaQuestionCircle,
  FaBriefcase,
  FaBell,
  FaTasks,
  FaStickyNote,
  FaUserPlus,
  FaCertificate,
  FaKey,
  FaComment,
  FaShoppingCart,
  FaHistory,
  FaCog,
  FaPalette,
  FaUser,
  FaStar,
  FaEye,
  FaTimes
} from 'react-icons/fa';
import { Card, Button, Badge } from '../../components/ui';
import { sidebarLinks } from '../../data/dashboard-links';
import { ACCOUNT_TYPE } from '../../utils/constants';

const QuickStart = () => {
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(true);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showQuickAccess, setShowQuickAccess] = useState(true);
  const [hoveredOption, setHoveredOption] = useState(null);

  // Icon mapping for dashboard links
  const iconMap = {
    VscAccount: FaUser,
    VscColorMode: FaPalette,
    VscDashboard: FaChartLine,
    VscVm: FaGraduationCap,
    VscAdd: FaPlay,
    VscRocket: FaRocket,
    VscBook: FaBook,
    VscGraph: FaChartBar,
    VscLightbulb: FaLightbulb,
    VscBell: FaBell,
    VscCalendar: FaCalendar,
    VscTasklist: FaTasks,
    VscNote: FaStickyNote,
    VscPersonAdd: FaUserPlus,
    VscVerified: FaShieldAlt,
    VscSymbolKeyword: FaKey,
    VscComment: FaComment,
    VscTrophy: FaTrophy,
    VscSettingsGear: FaCog,
    VscHistory: FaHistory
  };

  // Filter dashboard links based on user type
  const filteredLinks = sidebarLinks.filter(link => {
    if (!link.type) return true; // Common links
    return link.type === user?.accountType;
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const quickStartSteps = [
    {
      id: 1,
      title: 'Complete Your Profile',
      description: 'Add your skills, interests, and career goals',
      icon: FaGraduationCap,
      path: '/dashboard/my-profile',
      estimated: '5 min',
      completed: false
    },
    {
      id: 2,
      title: 'Take Skill Assessment',
      description: 'Evaluate your current knowledge level',
      icon: FaChartLine,
      path: '/dashboard/skill-assessment',
      estimated: '15 min',
      completed: false
    },
    {
      id: 3,
      title: 'Choose Learning Path',
      description: 'Select courses based on your goals',
      icon: FaBullseye,
      path: '/dashboard/learning-paths',
      estimated: '10 min',
      completed: false
    },
    {
      id: 4,
      title: 'Start First Course',
      description: 'Begin your learning journey',
      icon: FaPlay,
      path: '/dashboard/enrolled-courses',
      estimated: '2 min',
      completed: false
    }
  ];

  const learningGoals = [
    {
      id: 'career-change',
      title: 'Career Change',
      description: 'Switch to a new field or role',
      icon: FaRocket,
      color: 'bg-blue-500',
      courses: ['Full Stack Development', 'Data Science Fundamentals', 'Digital Marketing'],
      duration: '6-12 months',
      difficulty: 'Beginner to Advanced'
    },
    {
      id: 'skill-upgrade',
      title: 'Skill Upgrade',
      description: 'Enhance existing skills',
      icon: FaChartLine,
      color: 'bg-green-500',
      courses: ['Advanced JavaScript', 'Machine Learning', 'Cloud Computing'],
      duration: '3-6 months',
      difficulty: 'Intermediate to Advanced'
    },
    {
      id: 'certification',
      title: 'Get Certified',
      description: 'Earn industry certifications',
      icon: FaTrophy,
      color: 'bg-yellow-500',
      courses: ['AWS Certification', 'Google Analytics', 'PMP Certification'],
      duration: '2-4 months',
      difficulty: 'Intermediate'
    },
    {
      id: 'hobby-learning',
      title: 'Learn for Fun',
      description: 'Explore new interests',
      icon: FaLightbulb,
      color: 'bg-purple-500',
      courses: ['Photography', 'Creative Writing', 'Music Production'],
      duration: '1-3 months',
      difficulty: 'Beginner'
    }
  ];

  const recommendedCourses = [
    {
      id: 1,
      title: 'Complete Python Developer Bootcamp',
      instructor: 'Dr. Rajesh Kumar',
      rating: 4.8,
      students: 15420,
      duration: '42 hours',
      level: 'Beginner',
      price: 2999,
      originalPrice: 4999,
      thumbnail: '🐍',
      trending: true,
      description: 'Master Python programming from basics to advanced concepts'
    },
    {
      id: 2,
      title: 'React.js Complete Course',
      instructor: 'Sarah Johnson',
      rating: 4.7,
      students: 12350,
      duration: '35 hours',
      level: 'Intermediate',
      price: 2499,
      originalPrice: 3999,
      thumbnail: '⚛️',
      trending: false,
      description: 'Build modern web applications with React and Redux'
    },
    {
      id: 3,
      title: 'Data Science Fundamentals',
      instructor: 'Dr. Lisa Zhang',
      rating: 4.9,
      students: 8760,
      duration: '60 hours',
      level: 'Beginner',
      price: 3499,
      originalPrice: 5999,
      thumbnail: '📊',
      trending: true,
      description: 'Learn data analysis, visualization, and machine learning'
    }
  ];

  const handleStepComplete = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const handleGoalSelect = (goalId) => {
    setSelectedGoal(goalId);
  };

  const progressPercentage = (completedSteps.length / quickStartSteps.length) * 100;

  if (loading) {
    return (
      <div className="min-h-screen bg-richblack-900 flex items-center justify-center">
        <div className="text-richblack-5 text-xl">Loading quick start...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5 p-6 relative">
      <div className="max-w-7xl mx-auto pr-80">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-richblack-5 mb-2">
                Welcome, {user?.firstName || 'Student'}! 🚀
              </h1>
              <p className="text-richblack-300">
                Let's get you started on your learning journey with personalized recommendations.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-400">{Math.round(progressPercentage)}%</div>
                <div className="text-sm text-richblack-400">Setup Complete</div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-richblack-700 rounded-full h-3 mb-6">
            <motion.div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            ></motion.div>
          </div>
        </motion.div>

        {/* Quick Start Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-richblack-5 mb-6">Quick Start Checklist</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickStartSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isCompleted = completedSteps.includes(step.id);
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link to={step.path}>
                      <Card className={`p-4 h-full transition-all duration-300 hover:scale-105 cursor-pointer ${
                        isCompleted ? 'border-green-500 bg-green-900/20' : 'hover:border-yellow-400'
                      }`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isCompleted ? 'bg-green-500' : 'bg-yellow-500'
                          }`}>
                            {isCompleted ? (
                              <FaCheckCircle className="text-white text-lg" />
                            ) : (
                              <IconComponent className="text-richblack-900 text-lg" />
                            )}
                          </div>
                          <span className="text-xs text-richblack-400">{step.estimated}</span>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-richblack-5 mb-2">{step.title}</h3>
                        <p className="text-sm text-richblack-400 mb-3">{step.description}</p>
                        
                        <div className="flex items-center justify-between">
                          {isCompleted ? (
                            <Badge variant="success" size="small">Completed</Badge>
                          ) : (
                            <Badge variant="warning" size="small">Pending</Badge>
                          )}
                          <FaArrowRight className="text-richblack-500" />
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Learning Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-richblack-5 mb-4">What's Your Learning Goal?</h2>
            <p className="text-richblack-400 mb-6">Choose your primary objective to get personalized course recommendations.</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {learningGoals.map((goal, index) => {
                const IconComponent = goal.icon;
                const isSelected = selectedGoal === goal.id;
                
                return (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`cursor-pointer transition-all duration-300 ${
                      isSelected ? 'ring-2 ring-yellow-400' : 'hover:scale-105'
                    }`}
                    onClick={() => handleGoalSelect(goal.id)}
                  >
                    <Card className="p-6 h-full">
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 ${goal.color} rounded-lg flex items-center justify-center mr-4`}>
                          <IconComponent className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-richblack-5">{goal.title}</h3>
                          {isSelected && <Badge variant="success" size="small">Selected</Badge>}
                        </div>
                      </div>
                      
                      <p className="text-richblack-400 text-sm mb-4">{goal.description}</p>
                      
                      <div className="space-y-2 text-xs text-richblack-500">
                        <div><strong>Duration:</strong> {goal.duration}</div>
                        <div><strong>Level:</strong> {goal.difficulty}</div>
                        <div><strong>Popular Courses:</strong></div>
                        <ul className="list-disc list-inside space-y-1">
                          {goal.courses.slice(0, 2).map((course, idx) => (
                            <li key={idx}>{course}</li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Recommended Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-richblack-5 mb-2">Recommended for You</h2>
                <p className="text-richblack-400">Popular courses that match your interests and goals.</p>
              </div>
              <Link to="/all-courses">
                <Button variant="outline">
                  View All Courses
                  <FaArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:scale-105 transition-transform duration-300">
                    {/* Course Thumbnail */}
                    <div className="aspect-video bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center relative">
                      <div className="text-6xl">{course.thumbnail}</div>
                      {course.trending && (
                        <div className="absolute top-4 left-4">
                          <Badge variant="error" size="small">
                            <FaFire className="mr-1" />
                            Trending
                          </Badge>
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <Badge variant={course.level === 'Beginner' ? 'success' : course.level === 'Intermediate' ? 'warning' : 'error'} size="small">
                          {course.level}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-richblack-5 mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      
                      <p className="text-richblack-400 text-sm mb-3">
                        by {course.instructor}
                      </p>
                      
                      <p className="text-richblack-300 text-sm mb-4">
                        {course.description}
                      </p>
                      
                      {/* Course Stats */}
                      <div className="flex items-center justify-between text-xs text-richblack-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <FaStar className="text-yellow-400" />
                          <span>{course.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaUsers />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaClock />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                      
                      {/* Price and Action */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-richblack-5">₹{course.price.toLocaleString()}</span>
                          <span className="text-sm text-richblack-500 line-through">₹{course.originalPrice.toLocaleString()}</span>
                        </div>
                        <Button variant="primary" size="small">
                          Enroll Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-richblack-5 mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Link to="/dashboard/enrolled-courses" className="flex items-center space-x-3 p-4 bg-richblack-700 rounded-lg hover:bg-richblack-600 transition-colors">
                <FaBookOpen className="text-blue-400 text-xl" />
                <span className="text-richblack-200">My Courses</span>
              </Link>
              <Link to="/dashboard/progress" className="flex items-center space-x-3 p-4 bg-richblack-700 rounded-lg hover:bg-richblack-600 transition-colors">
                <FaChartLine className="text-green-400 text-xl" />
                <span className="text-richblack-200">View Progress</span>
              </Link>
              <Link to="/dashboard/calendar" className="flex items-center space-x-3 p-4 bg-richblack-700 rounded-lg hover:bg-richblack-600 transition-colors">
                <FaCalendar className="text-purple-400 text-xl" />
                <span className="text-richblack-200">Schedule</span>
              </Link>
              <Link to="/dashboard/doubt-forum" className="flex items-center space-x-3 p-4 bg-richblack-700 rounded-lg hover:bg-richblack-600 transition-colors">
                <FaLightbulb className="text-yellow-400 text-xl" />
                <span className="text-richblack-200">Ask Doubts</span>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
      
      {/* Right Side Quick Access Panel */}
      <AnimatePresence>
        {showQuickAccess && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed right-0 top-0 h-full w-80 bg-richblack-800 border-l border-richblack-700 z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-richblack-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <FaMagic className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="text-richblack-5 font-semibold text-lg">
                      Quick Access
                    </h3>
                    <p className="text-richblack-400 text-sm">
                      {user?.accountType === ACCOUNT_TYPE.STUDENT ? "Learning Hub" : "Teaching Hub"}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowQuickAccess(false)}
                  className="p-2 rounded-lg hover:bg-richblack-700 transition-colors duration-200"
                >
                  <FaTimes className="text-richblack-300 text-lg" />
                </button>
              </div>
              
              <div className="text-center p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                <p className="text-richblack-300 text-sm">
                  Welcome, <span className="text-purple-400 font-medium">{user?.firstName || "User"}</span>!
                </p>
                <p className="text-richblack-400 text-xs mt-1">
                  Access all your dashboard features here
                </p>
              </div>
            </div>
            
            {/* Dashboard Options */}
            <div className="p-4 space-y-2">
              {filteredLinks.map((link, index) => {
                const IconComponent = iconMap[link.icon] || FaRocket;
                
                return (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    onMouseEnter={() => setHoveredOption(link.id)}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    <Link
                      to={link.path}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-richblack-700 transition-all duration-200 group relative overflow-hidden"
                    >
                      {/* Hover Background Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: hoveredOption === link.id ? 1 : 0,
                          opacity: hoveredOption === link.id ? 1 : 0
                        }}
                        transition={{ duration: 0.2 }}
                      />
                      
                      {/* Icon */}
                      <div className="relative z-10 w-10 h-10 bg-richblack-600 rounded-lg flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-200">
                        <IconComponent className="text-richblack-300 group-hover:text-white text-lg transition-colors duration-200" />
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 flex-1">
                        <h4 className="text-richblack-5 font-medium text-sm group-hover:text-purple-300 transition-colors duration-200">
                          {link.name}
                        </h4>
                        {link.description && (
                          <p className="text-richblack-400 text-xs mt-1 line-clamp-2 group-hover:text-richblack-300 transition-colors duration-200">
                            {link.description}
                          </p>
                        )}
                      </div>
                      
                      {/* Arrow */}
                      <div className="relative z-10">
                        <motion.div
                          animate={{
                            x: hoveredOption === link.id ? 5 : 0
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <FaArrowRight className="text-richblack-400 group-hover:text-purple-400 text-sm transition-colors duration-200" />
                        </motion.div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-richblack-700 mt-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaRocket className="text-white text-2xl" />
                </div>
                <h4 className="text-richblack-5 font-semibold mb-2">
                  {user?.accountType === ACCOUNT_TYPE.STUDENT ? "Keep Learning!" : "Keep Teaching!"}
                </h4>
                <p className="text-richblack-400 text-xs mb-4">
                  {user?.accountType === ACCOUNT_TYPE.STUDENT 
                    ? "Your learning journey continues here. Explore all features to maximize your growth!"
                    : "Empower students with your knowledge. Use all tools to create amazing courses!"}
                </p>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-richblack-700 rounded text-center">
                    <div className="text-purple-400 font-semibold">
                      {user?.accountType === ACCOUNT_TYPE.STUDENT ? "12" : "8"}
                    </div>
                    <div className="text-richblack-400">
                      {user?.accountType === ACCOUNT_TYPE.STUDENT ? "Features" : "Tools"}
                    </div>
                  </div>
                  <div className="p-2 bg-richblack-700 rounded text-center">
                    <div className="text-pink-400 font-semibold">24/7</div>
                    <div className="text-richblack-400">Access</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Toggle Button */}
      {!showQuickAccess && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => setShowQuickAccess(true)}
          className="fixed right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-40 hover:scale-110"
        >
          <FaMagic className="text-white text-lg" />
        </motion.button>
      )}
    </div>
  );
};

export default QuickStart;