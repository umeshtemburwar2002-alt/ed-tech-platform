import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPlay,
  FaDownload,
  FaClock,
  FaUsers,
  FaStar,
  FaBookmark,
  FaShare,
  FaCode,
  FaCheckCircle,
  FaLock,
  FaChevronDown,
  FaChevronUp,
  FaQuoteLeft,
  FaCertificate,
  FaInfinity,
  FaMobile,
  FaDesktop,
  FaGraduationCap,
  FaReact,
  FaApple,
  FaAndroid,
  FaRocket
} from 'react-icons/fa';
import Footer from '../../components/common/Footer';

const ReactNativeCourse = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Course data
  const courseData = {
    id: 10,
    title: "React Native Mobile Apps - Cross-Platform Development",
    subtitle: "Create native mobile applications using React Native",
    description: "Build cross-platform mobile apps with React Native. Learn to create iOS and Android applications using JavaScript and React concepts. Master navigation, state management, and native device features.",
    instructor: {
      name: "Vikash Sharma",
      title: "Senior Mobile Developer & React Native Expert",
      experience: "9+ years",
      students: "32,000+",
      rating: 4.8,
      bio: "Vikash Sharma is a senior mobile developer with over 9 years of experience in mobile app development. He has built numerous React Native applications and has been teaching mobile development for over 6 years.",
      image: null
    },
    stats: {
      rating: 4.8,
      reviews: 1876,
      students: 6420,
      duration: "14 weeks",
      lectures: 92,
      projects: 12,
      level: "Intermediate",
      language: "English",
      lastUpdated: "December 2024"
    },
    pricing: {
      current: 4499,
      original: 8999,
      discount: 50
    },
    features: [
      "92 hours of React Native development",
      "130+ hands-on exercises",
      "12 complete mobile app projects",
      "iOS and Android deployment",
      "Navigation and routing",
      "State management with Redux",
      "Native device features integration",
      "Push notifications setup",
      "App store publishing guide",
      "Lifetime access to course materials",
      "Industry-recognized certificate",
      "30-day money-back guarantee",
      "Direct instructor support"
    ],
    curriculum: [
      {
        id: 1,
        title: "React Native Fundamentals",
        duration: "4 hours",
        lectures: 10,
        description: "Get started with React Native development basics",
        lessons: [
          { title: "Introduction to React Native", duration: "25 min", type: "video", free: true },
          { title: "Development Environment Setup", duration: "30 min", type: "video", free: true },
          { title: "React Native vs React", duration: "20 min", type: "video", free: true },
          { title: "Your First React Native App", duration: "35 min", type: "video", free: false },
          { title: "Understanding JSX in Mobile", duration: "25 min", type: "video", free: false },
          { title: "Components and Props", duration: "30 min", type: "video", free: false },
          { title: "Styling with StyleSheet", duration: "25 min", type: "video", free: false },
          { title: "Flexbox Layout", duration: "30 min", type: "video", free: false },
          { title: "React Native Fundamentals Practice", duration: "40 min", type: "exercise", free: false },
          { title: "Module 1 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 2,
        title: "Core Components & APIs",
        duration: "5 hours",
        lectures: 12,
        description: "Master React Native core components and APIs",
        lessons: [
          { title: "View, Text, and Image Components", duration: "30 min", type: "video", free: false },
          { title: "ScrollView and FlatList", duration: "35 min", type: "video", free: false },
          { title: "TextInput and Forms", duration: "25 min", type: "video", free: false },
          { title: "Button and Touchable Components", duration: "25 min", type: "video", free: false },
          { title: "Modal and Alert", duration: "20 min", type: "video", free: false },
          { title: "ActivityIndicator and Loading States", duration: "20 min", type: "video", free: false },
          { title: "Platform-specific Code", duration: "25 min", type: "video", free: false },
          { title: "Dimensions and Screen Sizes", duration: "20 min", type: "video", free: false },
          { title: "Keyboard Handling", duration: "25 min", type: "video", free: false },
          { title: "StatusBar and SafeAreaView", duration: "20 min", type: "video", free: false },
          { title: "Core Components Practice", duration: "50 min", type: "exercise", free: false },
          { title: "Module 2 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 3,
        title: "Navigation & Routing",
        duration: "6 hours",
        lectures: 14,
        description: "Implement navigation patterns in React Native apps",
        lessons: [
          { title: "React Navigation Setup", duration: "25 min", type: "video", free: false },
          { title: "Stack Navigator", duration: "30 min", type: "video", free: false },
          { title: "Tab Navigator", duration: "25 min", type: "video", free: false },
          { title: "Drawer Navigator", duration: "30 min", type: "video", free: false },
          { title: "Nested Navigation", duration: "25 min", type: "video", free: false },
          { title: "Passing Parameters", duration: "20 min", type: "video", free: false },
          { title: "Navigation Lifecycle", duration: "25 min", type: "video", free: false },
          { title: "Custom Headers", duration: "25 min", type: "video", free: false },
          { title: "Deep Linking", duration: "30 min", type: "video", free: false },
          { title: "Navigation Guards", duration: "20 min", type: "video", free: false },
          { title: "Gesture Navigation", duration: "25 min", type: "video", free: false },
          { title: "Navigation Best Practices", duration: "20 min", type: "video", free: false },
          { title: "Navigation Practice Project", duration: "80 min", type: "project", free: false },
          { title: "Module 3 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 4,
        title: "State Management",
        duration: "5 hours",
        lectures: 12,
        description: "Manage application state effectively",
        lessons: [
          { title: "Local State with useState", duration: "25 min", type: "video", free: false },
          { title: "useEffect in React Native", duration: "30 min", type: "video", free: false },
          { title: "Context API for Global State", duration: "35 min", type: "video", free: false },
          { title: "Redux Setup in React Native", duration: "30 min", type: "video", free: false },
          { title: "Redux Toolkit", duration: "25 min", type: "video", free: false },
          { title: "Async Actions with Redux Thunk", duration: "30 min", type: "video", free: false },
          { title: "Redux Persist", duration: "25 min", type: "video", free: false },
          { title: "State Management Patterns", duration: "20 min", type: "video", free: false },
          { title: "Performance Optimization", duration: "25 min", type: "video", free: false },
          { title: "Debugging State Issues", duration: "20 min", type: "video", free: false },
          { title: "State Management Practice", duration: "60 min", type: "exercise", free: false },
          { title: "Module 4 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 5,
        title: "API Integration & Networking",
        duration: "4 hours",
        lectures: 10,
        description: "Connect your app with backend services",
        lessons: [
          { title: "Fetch API in React Native", duration: "25 min", type: "video", free: false },
          { title: "Axios for HTTP Requests", duration: "25 min", type: "video", free: false },
          { title: "Handling API Responses", duration: "25 min", type: "video", free: false },
          { title: "Error Handling", duration: "20 min", type: "video", free: false },
          { title: "Loading States", duration: "20 min", type: "video", free: false },
          { title: "Authentication with APIs", duration: "30 min", type: "video", free: false },
          { title: "Token Management", duration: "25 min", type: "video", free: false },
          { title: "Offline Support", duration: "25 min", type: "video", free: false },
          { title: "API Integration Practice", duration: "50 min", type: "exercise", free: false },
          { title: "Module 5 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 6,
        title: "Native Device Features",
        duration: "6 hours",
        lectures: 14,
        description: "Access device capabilities and native features",
        lessons: [
          { title: "Camera and Image Picker", duration: "30 min", type: "video", free: false },
          { title: "Location Services", duration: "25 min", type: "video", free: false },
          { title: "AsyncStorage", duration: "25 min", type: "video", free: false },
          { title: "File System Access", duration: "25 min", type: "video", free: false },
          { title: "Contacts and Calendar", duration: "25 min", type: "video", free: false },
          { title: "Device Information", duration: "20 min", type: "video", free: false },
          { title: "Biometric Authentication", duration: "25 min", type: "video", free: false },
          { title: "Push Notifications", duration: "35 min", type: "video", free: false },
          { title: "Background Tasks", duration: "25 min", type: "video", free: false },
          { title: "Deep Linking", duration: "25 min", type: "video", free: false },
          { title: "Permissions Handling", duration: "25 min", type: "video", free: false },
          { title: "Native Modules", duration: "30 min", type: "video", free: false },
          { title: "Device Features Practice", duration: "60 min", type: "exercise", free: false },
          { title: "Module 6 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 7,
        title: "Testing & Debugging",
        duration: "4 hours",
        lectures: 10,
        description: "Test and debug React Native applications",
        lessons: [
          { title: "Testing Strategies", duration: "20 min", type: "video", free: false },
          { title: "Unit Testing with Jest", duration: "30 min", type: "video", free: false },
          { title: "Component Testing", duration: "25 min", type: "video", free: false },
          { title: "Integration Testing", duration: "25 min", type: "video", free: false },
          { title: "E2E Testing with Detox", duration: "30 min", type: "video", free: false },
          { title: "Debugging Tools", duration: "25 min", type: "video", free: false },
          { title: "Performance Profiling", duration: "25 min", type: "video", free: false },
          { title: "Crash Reporting", duration: "20 min", type: "video", free: false },
          { title: "Testing Practice", duration: "40 min", type: "exercise", free: false },
          { title: "Module 7 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 8,
        title: "Deployment & Publishing",
        duration: "5 hours",
        lectures: 12,
        description: "Deploy apps to iOS App Store and Google Play Store",
        lessons: [
          { title: "Build Process Overview", duration: "25 min", type: "video", free: false },
          { title: "iOS Build Configuration", duration: "30 min", type: "video", free: false },
          { title: "Android Build Configuration", duration: "30 min", type: "video", free: false },
          { title: "Code Signing", duration: "25 min", type: "video", free: false },
          { title: "App Store Connect", duration: "25 min", type: "video", free: false },
          { title: "Google Play Console", duration: "25 min", type: "video", free: false },
          { title: "App Store Guidelines", duration: "20 min", type: "video", free: false },
          { title: "Beta Testing", duration: "25 min", type: "video", free: false },
          { title: "CI/CD for Mobile Apps", duration: "30 min", type: "video", free: false },
          { title: "App Analytics", duration: "20 min", type: "video", free: false },
          { title: "Deployment Practice", duration: "50 min", type: "exercise", free: false },
          { title: "Module 8 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 9,
        title: "Real-World Projects",
        duration: "8 hours",
        lectures: 10,
        description: "Build complete mobile applications",
        lessons: [
          { title: "Project Planning", duration: "30 min", type: "video", free: false },
          { title: "Project 1: Todo App", duration: "80 min", type: "project", free: false },
          { title: "Project 2: Weather App", duration: "90 min", type: "project", free: false },
          { title: "Project 3: Social Media App", duration: "120 min", type: "project", free: false },
          { title: "Project 4: E-commerce App", duration: "110 min", type: "project", free: false },
          { title: "Project 5: Chat Application", duration: "100 min", type: "project", free: false },
          { title: "Portfolio Development", duration: "30 min", type: "video", free: false },
          { title: "App Store Optimization", duration: "25 min", type: "video", free: false },
          { title: "Career Guidance", duration: "20 min", type: "video", free: false },
          { title: "Final Assessment", duration: "25 min", type: "quiz", free: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        name: "Ravi Kumar",
        rating: 5,
        date: "1 week ago",
        comment: "Excellent React Native course! Vikash explains mobile development concepts very clearly. The projects are practical and helped me build my first mobile app. Highly recommend!",
        helpful: 89
      },
      {
        id: 2,
        name: "Priya Sharma",
        rating: 5,
        date: "2 weeks ago",
        comment: "Best mobile development course I've taken. Great progression from basics to advanced topics. The deployment section was particularly valuable for publishing my app.",
        helpful: 76
      },
      {
        id: 3,
        name: "Amit Patel",
        rating: 4,
        date: "3 weeks ago",
        comment: "Very comprehensive course with practical examples. Would have liked more advanced animation topics, but excellent for learning React Native fundamentals.",
        helpful: 62
      },
      {
        id: 4,
        name: "Sneha Singh",
        rating: 5,
        date: "1 month ago",
        comment: "Outstanding instructor and course structure. The native features section was exactly what I needed for my mobile development career. Great value for money!",
        helpful: 71
      }
    ],
    prerequisites: [
      "Solid understanding of JavaScript ES6+",
      "Basic knowledge of React.js",
      "Familiarity with mobile app concepts",
      "Understanding of REST APIs",
      "Basic command line knowledge"
    ],
    tools: [
      "React Native CLI",
      "Expo CLI",
      "Android Studio",
      "Xcode (for iOS)",
      "Visual Studio Code",
      "Node.js & npm",
      "Git & GitHub",
      "React Developer Tools",
      "Flipper (Debugging)"
    ]
  };

  // Check enrollment status
  useEffect(() => {
    setIsEnrolled(false);
  }, [user]);

  // Handle enrollment
  const handleEnrollment = () => {
    if (!user || !token) {
      navigate('/login');
      return;
    }
    console.log('Enrolling in React Native course...');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-richblack-900 text-richblack-5"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {courseData.stats.level}
                  </span>
                  <span className="bg-yellow-50 text-richblack-900 px-3 py-1 rounded-full text-sm font-semibold">
                    Mobile Development
                  </span>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Cross-Platform
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-richblack-5 mb-4">
                  {courseData.title}
                </h1>
                <p className="text-xl text-richblack-300 mb-6">
                  {courseData.subtitle}
                </p>
                <p className="text-lg text-richblack-400 mb-6">
                  {courseData.description}
                </p>
              </div>
              
              {/* Course Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center space-x-2">
                  <FaStar className="text-yellow-400" />
                  <span className="font-semibold">{courseData.stats.rating}</span>
                  <span className="text-richblack-400">({courseData.stats.reviews.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaUsers className="text-richblack-400" />
                  <span>{courseData.stats.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaClock className="text-richblack-400" />
                  <span>{courseData.stats.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaPlay className="text-richblack-400" />
                  <span>{courseData.stats.lectures} lectures</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaMobile className="text-blue-400" />
                  <span>Mobile {courseData.stats.projects} projects</span>
                </div>
              </div>

              {/* Tech Stack Icons */}
              <div className="flex items-center space-x-4 mb-6">
                <FaReact className="text-blue-400 text-2xl" title="React Native" />
                <FaApple className="text-gray-400 text-2xl" title="iOS" />
                <FaAndroid className="text-green-400 text-2xl" title="Android" />
                <FaRocket className="text-purple-400 text-2xl" title="Performance" />
              </div>

              {/* Instructor Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <FaMobile className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-richblack-5">Created by {courseData.instructor.name}</p>
                  <p className="text-sm text-richblack-400">{courseData.instructor.title}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEnrollment}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <FaPlay className="text-sm" />
                  <span>{isEnrolled ? 'Continue Learning' : 'Enroll Now'}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-richblack-600 text-richblack-300 px-8 py-3 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-400 transition-colors flex items-center space-x-2"
                >
                  <FaBookmark className="text-sm" />
                  <span>Save for Later</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-richblack-600 text-richblack-300 px-8 py-3 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-400 transition-colors flex items-center space-x-2"
                >
                  <FaShare className="text-sm" />
                  <span>Share</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Course Preview Card */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="bg-richblack-800 rounded-xl border border-richblack-700 overflow-hidden sticky top-8">
                {/* Video Preview */}
                <div className="relative aspect-video bg-richblack-700 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowPreview(true)}
                    className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <FaPlay className="text-xl ml-1" />
                  </motion.button>
                  <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    Preview this course
                  </div>
                </div>
                
                {/* Pricing */}
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-3xl font-bold text-richblack-5">₹{courseData.pricing.current.toLocaleString()}</span>
                    <span className="text-lg text-richblack-400 line-through">₹{courseData.pricing.original.toLocaleString()}</span>
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                      {courseData.pricing.discount}% OFF
                    </span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleEnrollment}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4"
                  >
                    {isEnrolled ? 'Go to Course' : 'Buy Now'}
                  </motion.button>
                  
                  <p className="text-center text-sm text-richblack-400 mb-6">
                    30-Day Money-Back Guarantee
                  </p>
                  
                  {/* Course Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-richblack-5">This course includes:</h4>
                    {courseData.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-center space-x-2 text-sm text-richblack-300"
                      >
                        <FaCheckCircle className="text-green-500 text-xs" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Course Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tab Navigation */}
        <motion.div variants={itemVariants} className="flex flex-wrap border-b border-richblack-700 mb-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'curriculum', label: 'Curriculum' },
            { id: 'instructor', label: 'Instructor' },
            { id: 'reviews', label: 'Reviews' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-richblack-400 hover:text-richblack-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* What You'll Learn */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-richblack-5 mb-6">What you'll learn</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {[
                    "Master React Native fundamentals and components",
                    "Build cross-platform iOS and Android apps",
                    "Implement navigation and routing patterns",
                    "Manage application state with Redux",
                    "Integrate APIs and handle networking",
                    "Access native device features",
                    "Test and debug mobile applications",
                    "Deploy apps to App Store and Play Store",
                    "Optimize app performance",
                    "Build real-world mobile applications",
                    "Understand mobile development best practices",
                    "Prepare for mobile developer interviews"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start space-x-3"
                    >
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-richblack-300">{item}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Course Description */}
                <h3 className="text-2xl font-bold text-richblack-5 mb-4">Course Description</h3>
                <div className="text-richblack-300 space-y-4 mb-8">
                  <p>
                    This comprehensive React Native course is designed to take you from intermediate React knowledge 
                    to becoming a proficient mobile app developer. You'll learn to build cross-platform applications 
                    that run natively on both iOS and Android devices using JavaScript and React concepts.
                  </p>
                  <p>
                    The course covers everything from React Native fundamentals to advanced topics like performance 
                    optimization, native module integration, and app store deployment. Each module includes hands-on 
                    projects that simulate real-world mobile development scenarios.
                  </p>
                  <p>
                    By the end of this course, you'll have built several complete mobile applications including 
                    a todo app, weather app, social media app, and e-commerce platform. These projects will 
                    demonstrate your ability to create production-ready mobile applications.
                  </p>
                </div>

                {/* Prerequisites */}
                <h3 className="text-2xl font-bold text-richblack-5 mb-4">Prerequisites</h3>
                <div className="space-y-2 mb-8">
                  {courseData.prerequisites.map((prereq, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-richblack-300">{prereq}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Course Details Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-richblack-800 rounded-lg border border-richblack-700 p-6">
                  <h4 className="font-semibold text-richblack-5 mb-4">Course Details</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-richblack-400">Level</span>
                      <span className="text-richblack-5">{courseData.stats.level}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-richblack-400">Duration</span>
                      <span className="text-richblack-5">{courseData.stats.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-richblack-400">Lectures</span>
                      <span className="text-richblack-5">{courseData.stats.lectures}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-richblack-400">Projects</span>
                      <span className="text-richblack-5">{courseData.stats.projects}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-richblack-400">Language</span>
                      <span className="text-richblack-5">{courseData.stats.language}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-richblack-400">Certificate</span>
                      <span className="text-green-500 flex items-center">
                        <FaCertificate className="mr-1" /> Included
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-richblack-400">Access</span>
                      <span className="text-green-500 flex items-center">
                        <FaInfinity className="mr-1" /> Lifetime
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tools & Technologies */}
                <div className="bg-richblack-800 rounded-lg border border-richblack-700 p-6 mt-6">
                  <h4 className="font-semibold text-richblack-5 mb-4">Tools & Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {courseData.tools.map((tool, index) => (
                      <span
                        key={index}
                        className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-richblack-800 rounded-lg overflow-hidden max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-richblack-700">
                <h3 className="text-lg font-semibold text-richblack-5">React Native Course Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-richblack-400 hover:text-richblack-300 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video bg-richblack-700 flex items-center justify-center">
                <div className="text-center text-richblack-400">
                  <FaMobile className="text-6xl mb-4 mx-auto text-blue-400" />
                  <p>React Native course preview video would play here</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </motion.div>
  );
};

export default ReactNativeCourse;