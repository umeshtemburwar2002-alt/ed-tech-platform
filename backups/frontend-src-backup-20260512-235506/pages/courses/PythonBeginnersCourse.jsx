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
  FaGraduationCap
} from 'react-icons/fa';
import Footer from '../../components/common/Footer';

const PythonBeginnersCourse = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Course data
  const courseData = {
    id: 1,
    title: "Python for Beginners - Complete Programming Course",
    subtitle: "Master Python programming from scratch with hands-on projects and real-world applications",
    description: "Learn Python programming from the ground up with this comprehensive course designed for absolute beginners. No prior programming experience required! This course covers everything from basic syntax to advanced concepts, with plenty of hands-on projects to reinforce your learning.",
    instructor: {
      name: "Dr. Sarah Johnson",
      title: "Senior Python Developer & Data Scientist",
      experience: "8+ years",
      students: "50,000+",
      rating: 4.9,
      bio: "Dr. Sarah Johnson is a seasoned Python developer with over 8 years of experience in software development and data science. She has worked with top tech companies and has taught programming to thousands of students worldwide.",
      image: null
    },
    stats: {
      rating: 4.8,
      reviews: 2847,
      students: 15420,
      duration: "12 weeks",
      lectures: 89,
      projects: 10,
      level: "Beginner",
      language: "English",
      lastUpdated: "December 2024"
    },
    pricing: {
      current: 2999,
      original: 5999,
      discount: 50
    },
    features: [
      "89 hours of on-demand video",
      "150+ coding exercises",
      "10 real-world projects",
      "Lifetime access",
      "Mobile and TV access",
      "Certificate of completion",
      "30-day money-back guarantee",
      "Direct instructor support"
    ],
    curriculum: [
      {
        id: 1,
        title: "Introduction to Programming & Python",
        duration: "3 hours",
        lectures: 8,
        description: "Get started with programming concepts and Python basics",
        lessons: [
          { title: "What is Programming?", duration: "15 min", type: "video", free: true },
          { title: "Installing Python & IDE Setup", duration: "20 min", type: "video", free: true },
          { title: "Your First Python Program", duration: "25 min", type: "video", free: false },
          { title: "Understanding Python Syntax", duration: "30 min", type: "video", free: false },
          { title: "Python Interactive Shell", duration: "15 min", type: "video", free: false },
          { title: "Comments and Documentation", duration: "20 min", type: "video", free: false },
          { title: "Practice Exercise 1", duration: "30 min", type: "exercise", free: false },
          { title: "Module 1 Quiz", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 2,
        title: "Variables, Data Types & Operators",
        duration: "5 hours",
        lectures: 12,
        description: "Master Python's fundamental building blocks",
        lessons: [
          { title: "Variables and Assignment", duration: "25 min", type: "video", free: false },
          { title: "Numbers and Arithmetic", duration: "30 min", type: "video", free: false },
          { title: "Strings and Text Processing", duration: "35 min", type: "video", free: false },
          { title: "Boolean Logic", duration: "20 min", type: "video", free: false },
          { title: "Lists and Collections", duration: "40 min", type: "video", free: false },
          { title: "Dictionaries and Key-Value Pairs", duration: "35 min", type: "video", free: false },
          { title: "Type Conversion", duration: "25 min", type: "video", free: false },
          { title: "Input and Output", duration: "30 min", type: "video", free: false },
          { title: "Practice Exercises", duration: "45 min", type: "exercise", free: false },
          { title: "Mini Project: Calculator", duration: "60 min", type: "project", free: false },
          { title: "Code Review Session", duration: "30 min", type: "video", free: false },
          { title: "Module 2 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 3,
        title: "Control Flow & Decision Making",
        duration: "4 hours",
        lectures: 10,
        description: "Learn to control program flow with conditions and loops",
        lessons: [
          { title: "If-Else Statements", duration: "30 min", type: "video", free: false },
          { title: "Elif and Multiple Conditions", duration: "25 min", type: "video", free: false },
          { title: "Comparison Operators", duration: "20 min", type: "video", free: false },
          { title: "Logical Operators", duration: "25 min", type: "video", free: false },
          { title: "For Loops", duration: "35 min", type: "video", free: false },
          { title: "While Loops", duration: "30 min", type: "video", free: false },
          { title: "Break and Continue", duration: "20 min", type: "video", free: false },
          { title: "Nested Loops", duration: "25 min", type: "video", free: false },
          { title: "Practice Challenges", duration: "40 min", type: "exercise", free: false },
          { title: "Module 3 Project", duration: "50 min", type: "project", free: false }
        ]
      },
      {
        id: 4,
        title: "Functions & Modular Programming",
        duration: "6 hours",
        lectures: 15,
        description: "Write reusable code with functions and modules",
        lessons: [
          { title: "Introduction to Functions", duration: "25 min", type: "video", free: false },
          { title: "Function Parameters", duration: "30 min", type: "video", free: false },
          { title: "Return Values", duration: "25 min", type: "video", free: false },
          { title: "Default Parameters", duration: "20 min", type: "video", free: false },
          { title: "Variable Scope", duration: "30 min", type: "video", free: false },
          { title: "Lambda Functions", duration: "25 min", type: "video", free: false },
          { title: "Built-in Functions", duration: "35 min", type: "video", free: false },
          { title: "Creating Modules", duration: "30 min", type: "video", free: false },
          { title: "Importing Modules", duration: "25 min", type: "video", free: false },
          { title: "Package Management", duration: "20 min", type: "video", free: false },
          { title: "Function Documentation", duration: "15 min", type: "video", free: false },
          { title: "Advanced Function Concepts", duration: "30 min", type: "video", free: false },
          { title: "Function Exercises", duration: "45 min", type: "exercise", free: false },
          { title: "Module Project: Utility Library", duration: "60 min", type: "project", free: false },
          { title: "Module 4 Assessment", duration: "25 min", type: "quiz", free: false }
        ]
      },
      {
        id: 5,
        title: "File Handling & Error Management",
        duration: "5 hours",
        lectures: 12,
        description: "Work with files and handle errors gracefully",
        lessons: [
          { title: "Reading Files", duration: "30 min", type: "video", free: false },
          { title: "Writing Files", duration: "25 min", type: "video", free: false },
          { title: "File Modes and Operations", duration: "35 min", type: "video", free: false },
          { title: "Working with CSV Files", duration: "40 min", type: "video", free: false },
          { title: "JSON Data Handling", duration: "35 min", type: "video", free: false },
          { title: "Exception Handling", duration: "30 min", type: "video", free: false },
          { title: "Try-Catch Blocks", duration: "25 min", type: "video", free: false },
          { title: "Custom Exceptions", duration: "20 min", type: "video", free: false },
          { title: "Debugging Techniques", duration: "30 min", type: "video", free: false },
          { title: "File Processing Project", duration: "60 min", type: "project", free: false },
          { title: "Error Handling Exercises", duration: "35 min", type: "exercise", free: false },
          { title: "Module 5 Quiz", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 6,
        title: "Final Projects & Portfolio Building",
        duration: "8 hours",
        lectures: 10,
        description: "Build real-world projects for your portfolio",
        lessons: [
          { title: "Project Planning & Design", duration: "30 min", type: "video", free: false },
          { title: "Project 1: Personal Finance Tracker", duration: "90 min", type: "project", free: false },
          { title: "Project 2: Weather Application", duration: "75 min", type: "project", free: false },
          { title: "Project 3: To-Do List Manager", duration: "60 min", type: "project", free: false },
          { title: "Project 4: Simple Web Scraper", duration: "80 min", type: "project", free: false },
          { title: "Code Review & Optimization", duration: "45 min", type: "video", free: false },
          { title: "Portfolio Setup", duration: "30 min", type: "video", free: false },
          { title: "GitHub Integration", duration: "25 min", type: "video", free: false },
          { title: "Career Guidance", duration: "20 min", type: "video", free: false },
          { title: "Final Assessment", duration: "30 min", type: "quiz", free: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        name: "Rahul Sharma",
        rating: 5,
        date: "2 weeks ago",
        comment: "Excellent course! Dr. Sarah explains everything so clearly. I went from knowing nothing about programming to building my own projects. Highly recommended!",
        helpful: 45
      },
      {
        id: 2,
        name: "Priya Patel",
        rating: 5,
        date: "1 month ago",
        comment: "Best Python course I've taken. The projects are practical and the explanations are easy to follow. Worth every penny!",
        helpful: 32
      },
      {
        id: 3,
        name: "Amit Kumar",
        rating: 4,
        date: "3 weeks ago",
        comment: "Great content and structure. Only wish there were more advanced topics, but perfect for beginners.",
        helpful: 28
      }
    ],
    prerequisites: [
      "No programming experience required",
      "Basic computer literacy",
      "Willingness to learn and practice",
      "Computer with internet connection"
    ],
    tools: [
      "Python 3.x",
      "Visual Studio Code",
      "Git & GitHub",
      "Command Line/Terminal"
    ]
  };

  // Check enrollment status
  useEffect(() => {
    // Simulate checking enrollment status
    setIsEnrolled(false);
  }, [user]);

  // Handle enrollment
  const handleEnrollment = () => {
    if (!user || !token) {
      navigate('/login');
      return;
    }
    // Handle enrollment logic here
    console.log('Enrolling in course...');
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
      <div className="bg-gradient-to-r from-richblack-800 to-richblack-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-green-500 text-richblack-900 px-3 py-1 rounded-full text-sm font-semibold">
                    {courseData.stats.level}
                  </span>
                  <span className="bg-yellow-50 text-richblack-900 px-3 py-1 rounded-full text-sm font-semibold">
                    Bestseller
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
              </div>

              {/* Instructor Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-richblack-600 rounded-full flex items-center justify-center">
                  <FaGraduationCap className="text-yellow-50" />
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
                  className="bg-yellow-50 text-richblack-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-100 transition-colors flex items-center space-x-2"
                >
                  <FaPlay className="text-sm" />
                  <span>{isEnrolled ? 'Continue Learning' : 'Enroll Now'}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-richblack-600 text-richblack-300 px-8 py-3 rounded-lg font-semibold hover:border-yellow-50 hover:text-yellow-50 transition-colors flex items-center space-x-2"
                >
                  <FaBookmark className="text-sm" />
                  <span>Save for Later</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-richblack-600 text-richblack-300 px-8 py-3 rounded-lg font-semibold hover:border-yellow-50 hover:text-yellow-50 transition-colors flex items-center space-x-2"
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
                    className="w-16 h-16 bg-yellow-50 text-richblack-900 rounded-full flex items-center justify-center hover:bg-yellow-100 transition-colors"
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
                    <span className="bg-green-500 text-richblack-900 px-2 py-1 rounded text-sm font-semibold">
                      {courseData.pricing.discount}% OFF
                    </span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleEnrollment}
                    className="w-full bg-yellow-50 text-richblack-900 py-3 rounded-lg font-semibold hover:bg-yellow-100 transition-colors mb-4"
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
                  ? 'text-yellow-50 border-b-2 border-yellow-50'
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
                    "Master Python programming fundamentals",
                    "Build real-world projects and applications",
                    "Understand object-oriented programming",
                    "Work with files and data processing",
                    "Handle errors and debug code effectively",
                    "Create your own Python modules",
                    "Develop problem-solving skills",
                    "Build a portfolio of Python projects"
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
                    This comprehensive Python course is designed for absolute beginners who want to learn programming 
                    from scratch. You'll start with the basics and gradually build up to more advanced concepts, 
                    all while working on practical projects that reinforce your learning.
                  </p>
                  <p>
                    Throughout the course, you'll learn not just the syntax of Python, but also how to think like 
                    a programmer. We'll cover problem-solving techniques, best practices, and real-world applications 
                    that will prepare you for a career in software development.
                  </p>
                  <p>
                    By the end of this course, you'll have built several projects including a personal finance tracker, 
                    weather application, and web scraper. These projects will form the foundation of your programming 
                    portfolio and demonstrate your skills to potential employers.
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
                      <div className="w-2 h-2 bg-yellow-50 rounded-full"></div>
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
                    <div className="flex items-center justify-between">
                      <span className="text-richblack-400">Device Access</span>
                      <div className="flex items-center space-x-2">
                        <FaDesktop className="text-richblack-400" />
                        <FaMobile className="text-richblack-400" />
                      </div>
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
                        className="bg-richblack-700 text-richblack-300 px-3 py-1 rounded-full text-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'curriculum' && (
            <motion.div
              key="curriculum"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-richblack-5 mb-2">Course Curriculum</h3>
                <p className="text-richblack-400">
                  {courseData.curriculum.length} modules • {courseData.stats.lectures} lectures • 
                  {courseData.curriculum.reduce((acc, module) => acc + parseInt(module.duration), 0)} hours total
                </p>
              </div>

              <div className="space-y-4">
                {courseData.curriculum.map((module, index) => (
                  <motion.div
                    key={module.id}
                    variants={itemVariants}
                    className="border border-richblack-700 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                      className="w-full p-4 bg-richblack-800 hover:bg-richblack-700 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="bg-richblack-600 text-richblack-300 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </span>
                        <div className="text-left">
                          <h4 className="font-semibold text-richblack-5">{module.title}</h4>
                          <p className="text-sm text-richblack-400">
                            {module.lectures} lectures • {module.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {expandedModule === module.id ? (
                          <FaChevronUp className="text-richblack-400" />
                        ) : (
                          <FaChevronDown className="text-richblack-400" />
                        )}
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {expandedModule === module.id && (
                        <motion.div
                          variants={moduleVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="bg-richblack-900 border-t border-richblack-700"
                        >
                          <div className="p-4">
                            <p className="text-richblack-300 mb-4">{module.description}</p>
                            <div className="space-y-2">
                              {module.lessons.map((lesson, lessonIndex) => (
                                <div
                                  key={lessonIndex}
                                  className="flex items-center justify-between p-2 hover:bg-richblack-800 rounded transition-colors"
                                >
                                  <div className="flex items-center space-x-3">
                                    {lesson.type === 'video' && <FaPlay className="text-richblack-400 text-sm" />}
                                    {lesson.type === 'exercise' && <FaCode className="text-richblack-400 text-sm" />}
                                    {lesson.type === 'quiz' && <FaCheckCircle className="text-richblack-400 text-sm" />}
                                    {lesson.type === 'project' && <FaGraduationCap className="text-richblack-400 text-sm" />}
                                    <span className="text-richblack-300 text-sm">{lesson.title}</span>
                                    {lesson.free && (
                                      <span className="bg-green-500 text-richblack-900 px-2 py-1 rounded text-xs font-semibold">
                                        FREE
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-richblack-400 text-sm">{lesson.duration}</span>
                                    {!lesson.free && <FaLock className="text-richblack-500 text-xs" />}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'instructor' && (
            <motion.div
              key="instructor"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2">
                <div className="flex items-start space-x-6 mb-8">
                  <div className="w-24 h-24 bg-richblack-700 rounded-full flex items-center justify-center">
                    <FaGraduationCap className="text-3xl text-yellow-50" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-richblack-5 mb-2">{courseData.instructor.name}</h3>
                    <p className="text-lg text-richblack-300 mb-4">{courseData.instructor.title}</p>
                    <div className="flex items-center space-x-6 text-sm text-richblack-400">
                      <div className="flex items-center space-x-1">
                        <FaStar className="text-yellow-400" />
                        <span>{courseData.instructor.rating} Instructor Rating</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaUsers />
                        <span>{courseData.instructor.students} Students</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaClock />
                        <span>{courseData.instructor.experience} Experience</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-richblack-300 space-y-4">
                  <p>{courseData.instructor.bio}</p>
                  <p>
                    With a passion for teaching and a deep understanding of Python programming, Dr. Johnson has 
                    helped thousands of students transition from complete beginners to confident programmers. 
                    Her teaching methodology focuses on practical application and real-world problem solving.
                  </p>
                  <p>
                    She holds a Ph.D. in Computer Science and has published numerous research papers in the field 
                    of software engineering and data science. When she's not teaching, she enjoys contributing to 
                    open-source projects and mentoring aspiring developers.
                  </p>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-richblack-800 rounded-lg border border-richblack-700 p-6">
                  <h4 className="font-semibold text-richblack-5 mb-4">Instructor Stats</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-richblack-400">Overall Rating</span>
                        <span className="text-richblack-5">{courseData.instructor.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={star <= courseData.instructor.rating ? 'text-yellow-400' : 'text-richblack-600'}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-richblack-400">Total Students</span>
                      <span className="text-richblack-5">{courseData.instructor.students}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-richblack-400">Experience</span>
                      <span className="text-richblack-5">{courseData.instructor.experience}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-richblack-400">Courses</span>
                      <span className="text-richblack-5">12</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-richblack-5 mb-4">Student Reviews</h3>
                <div className="flex items-center space-x-6 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-richblack-5 mb-1">{courseData.stats.rating}</div>
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={star <= courseData.stats.rating ? 'text-yellow-400' : 'text-richblack-600'}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-richblack-400">
                      {courseData.stats.reviews.toLocaleString()} reviews
                    </div>
                  </div>
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2 mb-1">
                        <span className="text-sm text-richblack-400 w-8">{rating}★</span>
                        <div className="flex-1 h-2 bg-richblack-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400 transition-all duration-500"
                            style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-richblack-400 w-8">
                          {rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '5%' : rating === 2 ? '3%' : '2%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {courseData.reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    variants={itemVariants}
                    className="bg-richblack-800 rounded-lg border border-richblack-700 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-richblack-700 rounded-full flex items-center justify-center">
                          <span className="text-richblack-300 font-semibold">
                            {review.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-richblack-5">{review.name}</h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                  key={star}
                                  className={star <= review.rating ? 'text-yellow-400 text-sm' : 'text-richblack-600 text-sm'}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-richblack-400">{review.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-richblack-300 mb-4">{review.comment}</p>
                    <div className="flex items-center space-x-4 text-sm text-richblack-400">
                      <button className="hover:text-richblack-300 transition-colors">
                        👍 Helpful ({review.helpful})
                      </button>
                      <button className="hover:text-richblack-300 transition-colors">
                        Report
                      </button>
                    </div>
                  </motion.div>
                ))}
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
                <h3 className="text-lg font-semibold text-richblack-5">Course Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-richblack-400 hover:text-richblack-300 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video bg-richblack-700 flex items-center justify-center">
                <div className="text-center text-richblack-400">
                  <FaPlay className="text-6xl mb-4 mx-auto" />
                  <p>Course preview video would play here</p>
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

export default PythonBeginnersCourse;