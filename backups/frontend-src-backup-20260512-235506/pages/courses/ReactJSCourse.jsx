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
  FaJs,
  FaHtml5,
  FaCss3Alt
} from 'react-icons/fa';
import Footer from '../../components/common/Footer';

const ReactJSCourse = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Course data
  const courseData = {
    id: 3,
    title: "React.js Development - Build Modern Web Applications",
    subtitle: "Build modern web applications with React.js and component-based architecture",
    description: "Master React.js from fundamentals to advanced concepts. Learn to build scalable, maintainable web applications using modern React patterns, hooks, state management, and best practices used by top tech companies.",
    instructor: {
      name: "Alex Rodriguez",
      title: "Senior Frontend Developer & React Specialist",
      experience: "7+ years",
      students: "45,000+",
      rating: 4.8,
      bio: "Alex Rodriguez is a senior frontend developer specializing in React.js with over 7 years of experience building production applications. He has worked with startups and enterprise companies, contributing to open-source React projects.",
      image: null
    },
    stats: {
      rating: 4.8,
      reviews: 1876,
      students: 10250,
      duration: "10 weeks",
      lectures: 78,
      projects: 8,
      level: "Intermediate",
      language: "English",
      lastUpdated: "December 2024"
    },
    pricing: {
      current: 4999,
      original: 9999,
      discount: 50
    },
    features: [
      "78 hours of hands-on React development",
      "120+ practical coding exercises",
      "8 real-world React projects",
      "Modern React Hooks & Context API",
      "State management with Redux Toolkit",
      "Testing with Jest & React Testing Library",
      "Deployment to production",
      "Lifetime access to course materials",
      "Mobile and desktop access",
      "Certificate of completion",
      "30-day money-back guarantee",
      "Direct instructor support"
    ],
    curriculum: [
      {
        id: 1,
        title: "React Fundamentals & JSX",
        duration: "3.5 hours",
        lectures: 9,
        description: "Get started with React basics and JSX syntax",
        lessons: [
          { title: "What is React & Why Use It?", duration: "20 min", type: "video", free: true },
          { title: "Setting up React Development Environment", duration: "25 min", type: "video", free: true },
          { title: "Create React App & Project Structure", duration: "30 min", type: "video", free: true },
          { title: "Understanding JSX", duration: "35 min", type: "video", free: false },
          { title: "Components and Props", duration: "40 min", type: "video", free: false },
          { title: "Rendering Lists and Conditional Rendering", duration: "30 min", type: "video", free: false },
          { title: "Handling Events", duration: "25 min", type: "video", free: false },
          { title: "React Developer Tools", duration: "15 min", type: "video", free: false },
          { title: "Module 1 Practice Exercises", duration: "40 min", type: "exercise", free: false }
        ]
      },
      {
        id: 2,
        title: "State Management & Component Lifecycle",
        duration: "5 hours",
        lectures: 12,
        description: "Master state management and component lifecycle methods",
        lessons: [
          { title: "Understanding State in React", duration: "30 min", type: "video", free: false },
          { title: "useState Hook Deep Dive", duration: "40 min", type: "video", free: false },
          { title: "useEffect Hook & Side Effects", duration: "45 min", type: "video", free: false },
          { title: "Component Lifecycle Methods", duration: "35 min", type: "video", free: false },
          { title: "Controlled vs Uncontrolled Components", duration: "30 min", type: "video", free: false },
          { title: "Forms and Form Validation", duration: "40 min", type: "video", free: false },
          { title: "Lifting State Up", duration: "25 min", type: "video", free: false },
          { title: "useReducer Hook", duration: "35 min", type: "video", free: false },
          { title: "Custom Hooks", duration: "30 min", type: "video", free: false },
          { title: "State Management Best Practices", duration: "20 min", type: "video", free: false },
          { title: "Practice Exercises", duration: "50 min", type: "exercise", free: false },
          { title: "Mini Project: Todo App", duration: "60 min", type: "project", free: false }
        ]
      },
      {
        id: 3,
        title: "React Router & Navigation",
        duration: "4 hours",
        lectures: 10,
        description: "Build single-page applications with React Router",
        lessons: [
          { title: "Introduction to React Router", duration: "25 min", type: "video", free: false },
          { title: "Setting up Routes", duration: "30 min", type: "video", free: false },
          { title: "Route Parameters and Query Strings", duration: "35 min", type: "video", free: false },
          { title: "Nested Routes", duration: "30 min", type: "video", free: false },
          { title: "Programmatic Navigation", duration: "25 min", type: "video", free: false },
          { title: "Route Guards and Protected Routes", duration: "35 min", type: "video", free: false },
          { title: "Lazy Loading and Code Splitting", duration: "30 min", type: "video", free: false },
          { title: "Navigation Components", duration: "20 min", type: "video", free: false },
          { title: "Router Practice Exercises", duration: "40 min", type: "exercise", free: false },
          { title: "Multi-page App Project", duration: "70 min", type: "project", free: false }
        ]
      },
      {
        id: 4,
        title: "Context API & Global State",
        duration: "3.5 hours",
        lectures: 8,
        description: "Manage global state with Context API and useContext",
        lessons: [
          { title: "Understanding Context API", duration: "30 min", type: "video", free: false },
          { title: "Creating and Using Context", duration: "35 min", type: "video", free: false },
          { title: "useContext Hook", duration: "25 min", type: "video", free: false },
          { title: "Context with useReducer", duration: "40 min", type: "video", free: false },
          { title: "Multiple Contexts", duration: "20 min", type: "video", free: false },
          { title: "Context Best Practices", duration: "25 min", type: "video", free: false },
          { title: "Context Practice Exercises", duration: "35 min", type: "exercise", free: false },
          { title: "Global State Management Project", duration: "50 min", type: "project", free: false }
        ]
      },
      {
        id: 5,
        title: "Redux & Redux Toolkit",
        duration: "6 hours",
        lectures: 14,
        description: "Advanced state management with Redux and Redux Toolkit",
        lessons: [
          { title: "Introduction to Redux", duration: "30 min", type: "video", free: false },
          { title: "Redux Core Concepts", duration: "35 min", type: "video", free: false },
          { title: "Actions and Action Creators", duration: "25 min", type: "video", free: false },
          { title: "Reducers and Store", duration: "40 min", type: "video", free: false },
          { title: "Connecting React with Redux", duration: "35 min", type: "video", free: false },
          { title: "useSelector and useDispatch", duration: "30 min", type: "video", free: false },
          { title: "Redux Toolkit Introduction", duration: "25 min", type: "video", free: false },
          { title: "createSlice and configureStore", duration: "40 min", type: "video", free: false },
          { title: "Async Actions with createAsyncThunk", duration: "45 min", type: "video", free: false },
          { title: "RTK Query for API Calls", duration: "35 min", type: "video", free: false },
          { title: "Redux DevTools", duration: "20 min", type: "video", free: false },
          { title: "Redux Best Practices", duration: "25 min", type: "video", free: false },
          { title: "Redux Practice Exercises", duration: "50 min", type: "exercise", free: false },
          { title: "E-commerce App with Redux", duration: "90 min", type: "project", free: false }
        ]
      },
      {
        id: 6,
        title: "API Integration & HTTP Requests",
        duration: "4.5 hours",
        lectures: 11,
        description: "Connect React apps with APIs and handle HTTP requests",
        lessons: [
          { title: "Making HTTP Requests in React", duration: "30 min", type: "video", free: false },
          { title: "Fetch API vs Axios", duration: "25 min", type: "video", free: false },
          { title: "useEffect for API Calls", duration: "35 min", type: "video", free: false },
          { title: "Loading States and Error Handling", duration: "40 min", type: "video", free: false },
          { title: "Custom Hooks for API Calls", duration: "35 min", type: "video", free: false },
          { title: "Caching and Data Persistence", duration: "30 min", type: "video", free: false },
          { title: "Authentication with APIs", duration: "40 min", type: "video", free: false },
          { title: "Handling Different Response Types", duration: "25 min", type: "video", free: false },
          { title: "API Integration Best Practices", duration: "20 min", type: "video", free: false },
          { title: "API Integration Exercises", duration: "45 min", type: "exercise", free: false },
          { title: "Weather App with API Integration", duration: "75 min", type: "project", free: false }
        ]
      },
      {
        id: 7,
        title: "Testing React Applications",
        duration: "5 hours",
        lectures: 12,
        description: "Write comprehensive tests for React components and applications",
        lessons: [
          { title: "Introduction to Testing in React", duration: "25 min", type: "video", free: false },
          { title: "Jest Testing Framework", duration: "30 min", type: "video", free: false },
          { title: "React Testing Library", duration: "35 min", type: "video", free: false },
          { title: "Testing Components", duration: "40 min", type: "video", free: false },
          { title: "Testing User Interactions", duration: "35 min", type: "video", free: false },
          { title: "Testing Hooks", duration: "30 min", type: "video", free: false },
          { title: "Mocking API Calls", duration: "40 min", type: "video", free: false },
          { title: "Integration Testing", duration: "35 min", type: "video", free: false },
          { title: "Test Coverage and Reports", duration: "25 min", type: "video", free: false },
          { title: "Testing Best Practices", duration: "20 min", type: "video", free: false },
          { title: "Testing Exercises", duration: "50 min", type: "exercise", free: false },
          { title: "TDD Project: Calculator App", duration: "85 min", type: "project", free: false }
        ]
      },
      {
        id: 8,
        title: "Performance Optimization",
        duration: "4 hours",
        lectures: 10,
        description: "Optimize React applications for better performance",
        lessons: [
          { title: "React Performance Fundamentals", duration: "30 min", type: "video", free: false },
          { title: "React.memo and useMemo", duration: "35 min", type: "video", free: false },
          { title: "useCallback Hook", duration: "25 min", type: "video", free: false },
          { title: "Code Splitting and Lazy Loading", duration: "40 min", type: "video", free: false },
          { title: "Virtual DOM Optimization", duration: "30 min", type: "video", free: false },
          { title: "Bundle Analysis and Optimization", duration: "35 min", type: "video", free: false },
          { title: "Image Optimization", duration: "25 min", type: "video", free: false },
          { title: "Performance Monitoring", duration: "20 min", type: "video", free: false },
          { title: "Performance Exercises", duration: "40 min", type: "exercise", free: false },
          { title: "Performance Optimization Project", duration: "60 min", type: "project", free: false }
        ]
      },
      {
        id: 9,
        title: "Deployment & Production",
        duration: "3 hours",
        lectures: 8,
        description: "Deploy React applications to production environments",
        lessons: [
          { title: "Building for Production", duration: "25 min", type: "video", free: false },
          { title: "Environment Variables", duration: "20 min", type: "video", free: false },
          { title: "Deploying to Netlify", duration: "30 min", type: "video", free: false },
          { title: "Deploying to Vercel", duration: "25 min", type: "video", free: false },
          { title: "Deploying to AWS S3", duration: "35 min", type: "video", free: false },
          { title: "CI/CD with GitHub Actions", duration: "40 min", type: "video", free: false },
          { title: "Monitoring and Analytics", duration: "20 min", type: "video", free: false },
          { title: "Final Deployment Project", duration: "45 min", type: "project", free: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        name: "Vikram Singh",
        rating: 5,
        date: "1 week ago",
        comment: "Excellent React course! Alex explains complex concepts very clearly. The projects are practical and helped me land a frontend developer job. The Redux section was particularly valuable.",
        helpful: 89
      },
      {
        id: 2,
        name: "Anita Sharma",
        rating: 5,
        date: "2 weeks ago",
        comment: "Best React course I've taken. Great balance of theory and practice. The testing section was comprehensive and the deployment tutorials were very helpful.",
        helpful: 76
      },
      {
        id: 3,
        name: "Rohit Kumar",
        rating: 4,
        date: "3 weeks ago",
        comment: "Very good course with practical examples. Would have liked more advanced patterns, but perfect for intermediate developers looking to master React.",
        helpful: 52
      },
      {
        id: 4,
        name: "Meera Patel",
        rating: 5,
        date: "1 month ago",
        comment: "Outstanding instructor and course content. The step-by-step approach made learning React enjoyable. The projects are industry-relevant and well-designed.",
        helpful: 64
      }
    ],
    prerequisites: [
      "Solid understanding of JavaScript ES6+",
      "Basic knowledge of HTML and CSS",
      "Familiarity with modern web development",
      "Understanding of asynchronous JavaScript",
      "Basic command line knowledge"
    ],
    tools: [
      "React 18+",
      "Node.js & npm",
      "Visual Studio Code",
      "React Developer Tools",
      "Redux DevTools",
      "Git & GitHub",
      "Webpack",
      "Babel",
      "Jest & React Testing Library"
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
    console.log('Enrolling in React course...');
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

  const moduleVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3 }
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
      <div className="bg-gradient-to-r from-cyan-900 to-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {courseData.stats.level}
                  </span>
                  <span className="bg-yellow-50 text-richblack-900 px-3 py-1 rounded-full text-sm font-semibold">
                    Trending
                  </span>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Modern React
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
                  <FaReact className="text-cyan-400" />
                  <span>React {courseData.stats.projects} projects</span>
                </div>
              </div>

              {/* Tech Stack Icons */}
              <div className="flex items-center space-x-4 mb-6">
                <FaReact className="text-cyan-400 text-2xl" title="React" />
                <FaJs className="text-yellow-400 text-2xl" title="JavaScript" />
                <FaHtml5 className="text-orange-500 text-2xl" title="HTML5" />
                <FaCss3Alt className="text-blue-500 text-2xl" title="CSS3" />
              </div>

              {/* Instructor Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center">
                  <FaReact className="text-white" />
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
                  className="bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors flex items-center space-x-2"
                >
                  <FaPlay className="text-sm" />
                  <span>{isEnrolled ? 'Continue Learning' : 'Enroll Now'}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-richblack-600 text-richblack-300 px-8 py-3 rounded-lg font-semibold hover:border-cyan-500 hover:text-cyan-400 transition-colors flex items-center space-x-2"
                >
                  <FaBookmark className="text-sm" />
                  <span>Save for Later</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-richblack-600 text-richblack-300 px-8 py-3 rounded-lg font-semibold hover:border-cyan-500 hover:text-cyan-400 transition-colors flex items-center space-x-2"
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
                    className="w-16 h-16 bg-cyan-600 text-white rounded-full flex items-center justify-center hover:bg-cyan-700 transition-colors"
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
                    className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors mb-4"
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
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
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
                    "Master React.js fundamentals and advanced concepts",
                    "Build scalable component-based applications",
                    "Implement state management with hooks and Redux",
                    "Create single-page applications with React Router",
                    "Integrate APIs and handle asynchronous operations",
                    "Write comprehensive tests for React components",
                    "Optimize React applications for performance",
                    "Deploy React applications to production",
                    "Use modern React patterns and best practices",
                    "Build real-world projects for your portfolio",
                    "Understand React ecosystem and tooling",
                    "Prepare for React developer interviews"
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
                    This comprehensive React.js course is designed to take you from intermediate JavaScript knowledge 
                    to becoming a proficient React developer. You'll learn modern React patterns, hooks, state management, 
                    and best practices used by top tech companies.
                  </p>
                  <p>
                    The course covers everything from React fundamentals to advanced topics like performance optimization, 
                    testing, and deployment. Each module includes hands-on projects that simulate real-world development 
                    scenarios and help you build a strong portfolio.
                  </p>
                  <p>
                    By the end of this course, you'll have built several production-ready applications including a todo app, 
                    weather application, e-commerce platform, and more. These projects will demonstrate your ability to 
                    work with modern React development practices and tools.
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
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
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
                        className="bg-cyan-900 text-cyan-300 px-3 py-1 rounded-full text-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other tabs would follow similar pattern with React-specific content */}
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
                <h3 className="text-lg font-semibold text-richblack-5">React.js Course Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-richblack-400 hover:text-richblack-300 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video bg-richblack-700 flex items-center justify-center">
                <div className="text-center text-richblack-400">
                  <FaReact className="text-6xl mb-4 mx-auto text-cyan-400" />
                  <p>React.js course preview video would play here</p>
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

export default ReactJSCourse;