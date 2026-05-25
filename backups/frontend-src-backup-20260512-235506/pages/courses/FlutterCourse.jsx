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
  FaApple,
  FaAndroid,
  FaRocket,
  FaHeart
} from 'react-icons/fa';
import Footer from '../../components/common/Footer';

const FlutterCourse = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Course data
  const courseData = {
    id: 14,
    title: "Flutter for Beginners - Build Beautiful Mobile Apps",
    subtitle: "Create cross-platform mobile apps with Flutter and Dart",
    description: "Learn Flutter from scratch and build stunning cross-platform mobile applications. Master Dart programming, Flutter widgets, state management, and deploy apps to both iOS and Android stores.",
    instructor: {
      name: "Rohit Sharma",
      title: "Senior Flutter Developer & Mobile App Expert",
      experience: "7+ years",
      students: "18,000+",
      rating: 4.7,
      bio: "Rohit Sharma is a senior Flutter developer with over 7 years of experience in mobile app development. He has built numerous Flutter applications and has been teaching mobile development for over 4 years.",
      image: null
    },
    stats: {
      rating: 4.7,
      reviews: 1298,
      students: 4560,
      duration: "12 weeks",
      lectures: 82,
      projects: 10,
      level: "Beginner",
      language: "English",
      lastUpdated: "December 2024"
    },
    pricing: {
      current: 2799,
      original: 5599,
      discount: 50
    },
    features: [
      "82 hours of comprehensive Flutter content",
      "120+ hands-on Flutter exercises",
      "10 complete mobile app projects",
      "Dart programming mastery",
      "Flutter widget development",
      "State management techniques",
      "API integration and networking",
      "Firebase integration",
      "App store deployment guide",
      "Lifetime access to course materials",
      "Industry-recognized certificate",
      "30-day money-back guarantee",
      "Direct instructor support"
    ],
    curriculum: [
      {
        id: 1,
        title: "Flutter & Dart Fundamentals",
        duration: "4 hours",
        lectures: 10,
        description: "Introduction to Flutter framework and Dart programming language",
        lessons: [
          { title: "What is Flutter?", duration: "25 min", type: "video", free: true },
          { title: "Flutter vs Other Frameworks", duration: "20 min", type: "video", free: true },
          { title: "Development Environment Setup", duration: "30 min", type: "video", free: true },
          { title: "Dart Programming Basics", duration: "35 min", type: "video", free: false },
          { title: "Variables and Data Types", duration: "25 min", type: "video", free: false },
          { title: "Functions and Classes", duration: "30 min", type: "video", free: false },
          { title: "Object-Oriented Programming in Dart", duration: "25 min", type: "video", free: false },
          { title: "Dart Collections and Generics", duration: "20 min", type: "video", free: false },
          { title: "Dart Fundamentals Practice", duration: "40 min", type: "exercise", free: false },
          { title: "Module 1 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 2,
        title: "Flutter Widgets & UI Development",
        duration: "6 hours",
        lectures: 14,
        description: "Master Flutter widgets and create beautiful user interfaces",
        lessons: [
          { title: "Flutter Widget Tree", duration: "25 min", type: "video", free: false },
          { title: "Stateless vs Stateful Widgets", duration: "30 min", type: "video", free: false },
          { title: "Basic Widgets (Text, Container, Row, Column)", duration: "35 min", type: "video", free: false },
          { title: "Layout Widgets and Positioning", duration: "30 min", type: "video", free: false },
          { title: "Material Design Widgets", duration: "25 min", type: "video", free: false },
          { title: "Cupertino (iOS) Widgets", duration: "20 min", type: "video", free: false },
          { title: "Images and Assets", duration: "25 min", type: "video", free: false },
          { title: "Forms and Input Widgets", duration: "30 min", type: "video", free: false },
          { title: "Lists and Grid Views", duration: "25 min", type: "video", free: false },
          { title: "Custom Widgets Creation", duration: "30 min", type: "video", free: false },
          { title: "Styling and Theming", duration: "25 min", type: "video", free: false },
          { title: "Responsive Design", duration: "20 min", type: "video", free: false },
          { title: "UI Development Project", duration: "70 min", type: "project", free: false },
          { title: "Module 2 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 3,
        title: "Navigation & Routing",
        duration: "4 hours",
        lectures: 10,
        description: "Implement navigation patterns in Flutter applications",
        lessons: [
          { title: "Navigator and Routes", duration: "25 min", type: "video", free: false },
          { title: "Named Routes", duration: "20 min", type: "video", free: false },
          { title: "Passing Data Between Screens", duration: "25 min", type: "video", free: false },
          { title: "Bottom Navigation Bar", duration: "25 min", type: "video", free: false },
          { title: "Tab Navigation", duration: "20 min", type: "video", free: false },
          { title: "Drawer Navigation", duration: "25 min", type: "video", free: false },
          { title: "Custom Page Transitions", duration: "20 min", type: "video", free: false },
          { title: "Deep Linking", duration: "25 min", type: "video", free: false },
          { title: "Navigation Practice Project", duration: "60 min", type: "project", free: false },
          { title: "Module 3 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 4,
        title: "State Management",
        duration: "5 hours",
        lectures: 12,
        description: "Manage application state effectively in Flutter",
        lessons: [
          { title: "Understanding State in Flutter", duration: "25 min", type: "video", free: false },
          { title: "setState and Local State", duration: "25 min", type: "video", free: false },
          { title: "InheritedWidget", duration: "20 min", type: "video", free: false },
          { title: "Provider Pattern", duration: "30 min", type: "video", free: false },
          { title: "Riverpod State Management", duration: "30 min", type: "video", free: false },
          { title: "BLoC Pattern", duration: "35 min", type: "video", free: false },
          { title: "GetX State Management", duration: "25 min", type: "video", free: false },
          { title: "State Persistence", duration: "20 min", type: "video", free: false },
          { title: "Performance Optimization", duration: "25 min", type: "video", free: false },
          { title: "State Management Best Practices", duration: "20 min", type: "video", free: false },
          { title: "State Management Project", duration: "65 min", type: "project", free: false },
          { title: "Module 4 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 5,
        title: "API Integration & Networking",
        duration: "4 hours",
        lectures: 10,
        description: "Connect Flutter apps with backend services and APIs",
        lessons: [
          { title: "HTTP Requests in Flutter", duration: "25 min", type: "video", free: false },
          { title: "Dio Package for Networking", duration: "25 min", type: "video", free: false },
          { title: "JSON Parsing and Serialization", duration: "30 min", type: "video", free: false },
          { title: "Error Handling", duration: "20 min", type: "video", free: false },
          { title: "Loading States and UI Feedback", duration: "20 min", type: "video", free: false },
          { title: "Authentication with APIs", duration: "25 min", type: "video", free: false },
          { title: "Caching and Offline Support", duration: "25 min", type: "video", free: false },
          { title: "Real-time Data with WebSockets", duration: "20 min", type: "video", free: false },
          { title: "API Integration Project", duration: "55 min", type: "project", free: false },
          { title: "Module 5 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 6,
        title: "Firebase Integration",
        duration: "5 hours",
        lectures: 12,
        description: "Integrate Firebase services for backend functionality",
        lessons: [
          { title: "Firebase Setup in Flutter", duration: "25 min", type: "video", free: false },
          { title: "Firebase Authentication", duration: "30 min", type: "video", free: false },
          { title: "Cloud Firestore Database", duration: "30 min", type: "video", free: false },
          { title: "Realtime Database", duration: "25 min", type: "video", free: false },
          { title: "Firebase Storage", duration: "25 min", type: "video", free: false },
          { title: "Push Notifications (FCM)", duration: "30 min", type: "video", free: false },
          { title: "Firebase Analytics", duration: "20 min", type: "video", free: false },
          { title: "Crashlytics", duration: "15 min", type: "video", free: false },
          { title: "Cloud Functions", duration: "25 min", type: "video", free: false },
          { title: "Firebase Security Rules", duration: "20 min", type: "video", free: false },
          { title: "Firebase Integration Project", duration: "70 min", type: "project", free: false },
          { title: "Module 6 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 7,
        title: "Advanced Flutter Features",
        duration: "4 hours",
        lectures: 10,
        description: "Explore advanced Flutter capabilities and native features",
        lessons: [
          { title: "Animations in Flutter", duration: "30 min", type: "video", free: false },
          { title: "Custom Painters and Canvas", duration: "25 min", type: "video", free: false },
          { title: "Platform Channels", duration: "25 min", type: "video", free: false },
          { title: "Native Device Features", duration: "25 min", type: "video", free: false },
          { title: "Camera and Image Picker", duration: "20 min", type: "video", free: false },
          { title: "Location Services", duration: "20 min", type: "video", free: false },
          { title: "Local Storage (SQLite)", duration: "25 min", type: "video", free: false },
          { title: "Background Tasks", duration: "20 min", type: "video", free: false },
          { title: "Advanced Features Project", duration: "60 min", type: "project", free: false },
          { title: "Module 7 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 8,
        title: "Testing & Deployment",
        duration: "4 hours",
        lectures: 10,
        description: "Test Flutter apps and deploy to app stores",
        lessons: [
          { title: "Unit Testing in Flutter", duration: "25 min", type: "video", free: false },
          { title: "Widget Testing", duration: "25 min", type: "video", free: false },
          { title: "Integration Testing", duration: "20 min", type: "video", free: false },
          { title: "Debugging Techniques", duration: "20 min", type: "video", free: false },
          { title: "Performance Optimization", duration: "25 min", type: "video", free: false },
          { title: "Building for Release", duration: "25 min", type: "video", free: false },
          { title: "Android App Bundle", duration: "20 min", type: "video", free: false },
          { title: "iOS App Store Deployment", duration: "25 min", type: "video", free: false },
          { title: "Google Play Store Deployment", duration: "25 min", type: "video", free: false },
          { title: "Final Capstone Project", duration: "90 min", type: "project", free: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        name: "Ankit Kumar",
        rating: 5,
        date: "1 week ago",
        comment: "Excellent Flutter course! Rohit explains concepts very clearly. The hands-on projects were practical and helped me build my first mobile app. Highly recommend for beginners!",
        helpful: 84
      },
      {
        id: 2,
        name: "Priya Patel",
        rating: 5,
        date: "2 weeks ago",
        comment: "Best mobile development course for beginners. Great progression from Dart basics to advanced Flutter topics. The Firebase integration section was particularly valuable.",
        helpful: 71
      },
      {
        id: 3,
        name: "Vikram Singh",
        rating: 4,
        date: "3 weeks ago",
        comment: "Very comprehensive course with practical examples. Would have liked more advanced animation topics, but excellent for learning Flutter fundamentals and building real apps.",
        helpful: 58
      },
      {
        id: 4,
        name: "Kavya Reddy",
        rating: 5,
        date: "1 month ago",
        comment: "Outstanding instructor and course structure. The state management section was exactly what I needed for my mobile development career. Great value for money!",
        helpful: 66
      }
    ],
    prerequisites: [
      "Basic programming knowledge (any language)",
      "Understanding of object-oriented programming",
      "Familiarity with mobile app concepts",
      "No prior Flutter or Dart experience required",
      "Computer with Android Studio or VS Code"
    ],
    tools: [
      "Flutter SDK",
      "Dart Language",
      "Android Studio",
      "VS Code",
      "Firebase",
      "Git & GitHub",
      "Android Emulator",
      "iOS Simulator",
      "Flutter Inspector"
    ]
  };

  // Check enrollment status
  useEffect(() => {
    setIsEnrolled(false);
  }, [user]);

  // Handle enrollment
  const handleEnrollment = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user || !token) {
      navigate('/login');
      return;
    }
    
    // Show enrollment success message
    alert('🎉 Successfully enrolled in Flutter for Beginners course! Welcome to your mobile development journey.');
    setIsEnrolled(true);
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
      <div className="bg-gradient-to-r from-blue-900 to-cyan-900 py-16">
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
                  <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
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
                  <span>Flutter {courseData.stats.projects} projects</span>
                </div>
              </div>

              {/* Tech Stack Icons */}
              <div className="flex items-center space-x-4 mb-6">
                <FaHeart className="text-blue-400 text-2xl" title="Flutter" />
                <FaApple className="text-gray-400 text-2xl" title="iOS" />
                <FaAndroid className="text-green-400 text-2xl" title="Android" />
                <FaRocket className="text-cyan-400 text-2xl" title="Performance" />
              </div>

              {/* Instructor Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <FaHeart className="text-white" />
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
                    "Master Flutter framework and Dart programming",
                    "Build cross-platform mobile applications",
                    "Create beautiful and responsive user interfaces",
                    "Implement navigation and routing patterns",
                    "Manage application state effectively",
                    "Integrate APIs and handle networking",
                    "Use Firebase for backend services",
                    "Access native device features",
                    "Test and debug Flutter applications",
                    "Deploy apps to iOS and Android stores",
                    "Understand mobile development best practices",
                    "Build a portfolio of mobile applications"
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
                    This comprehensive Flutter course is designed to take you from a complete beginner 
                    to a proficient mobile app developer. You'll learn Flutter framework, Dart programming, 
                    and build beautiful cross-platform applications that run natively on both iOS and Android.
                  </p>
                  <p>
                    The course covers everything from Flutter fundamentals to advanced topics like state 
                    management, Firebase integration, and app store deployment. Each module includes hands-on 
                    projects that simulate real-world mobile development scenarios.
                  </p>
                  <p>
                    By the end of this course, you'll have built several complete mobile applications including 
                    a todo app, weather app, and social media platform. These projects will demonstrate your 
                    ability to create production-ready Flutter applications.
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
                <h3 className="text-lg font-semibold text-richblack-5">Flutter Course Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-richblack-400 hover:text-richblack-300 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video bg-richblack-700 flex items-center justify-center">
                <div className="text-center text-richblack-400">
                  <FaHeart className="text-6xl mb-4 mx-auto text-blue-400" />
                  <p>Flutter course preview video would play here</p>
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

export default FlutterCourse;