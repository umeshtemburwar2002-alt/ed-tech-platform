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
  FaNodeJs,
  FaDatabase,
  FaServer,
  FaCloud
} from 'react-icons/fa';
import Footer from '../../components/common/Footer';

const NodeJSCourse = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Course data
  const courseData = {
    id: 5,
    title: "Node.js & Express.js - Backend Development Mastery",
    subtitle: "Build scalable backend applications and RESTful APIs with Node.js",
    description: "Master backend development with Node.js and Express.js. Learn to build RESTful APIs, work with databases, implement authentication, and deploy scalable server-side applications using modern JavaScript.",
    instructor: {
      name: "David Wilson",
      title: "Senior Backend Developer & Node.js Expert",
      experience: "11+ years",
      students: "42,000+",
      rating: 4.9,
      bio: "David Wilson is a senior backend developer with over 11 years of experience in server-side development. He has built scalable applications for major tech companies and specializes in Node.js, microservices, and cloud architecture.",
      image: null
    },
    stats: {
      rating: 4.9,
      reviews: 2876,
      students: 11200,
      duration: "15 weeks",
      lectures: 98,
      projects: 12,
      level: "Intermediate",
      language: "English",
      lastUpdated: "December 2024"
    },
    pricing: {
      current: 3799,
      original: 7599,
      discount: 50
    },
    features: [
      "98 hours of comprehensive Node.js content",
      "140+ hands-on exercises and challenges",
      "12 real-world backend projects",
      "RESTful API development with Express.js",
      "Database integration (MongoDB, PostgreSQL)",
      "Authentication and authorization systems",
      "Real-time applications with Socket.io",
      "Microservices architecture patterns",
      "Cloud deployment and DevOps practices",
      "Lifetime access to course materials",
      "Industry-recognized certificate",
      "30-day money-back guarantee",
      "Direct instructor support"
    ],
    curriculum: [
      {
        id: 1,
        title: "Node.js Fundamentals",
        duration: "4.5 hours",
        lectures: 12,
        description: "Get started with Node.js runtime and core concepts",
        lessons: [
          { title: "Introduction to Node.js", duration: "25 min", type: "video", free: true },
          { title: "Installing Node.js and npm", duration: "20 min", type: "video", free: true },
          { title: "Understanding the Event Loop", duration: "30 min", type: "video", free: true },
          { title: "Modules and require() System", duration: "25 min", type: "video", free: false },
          { title: "File System Operations", duration: "30 min", type: "video", free: false },
          { title: "Path and OS Modules", duration: "20 min", type: "video", free: false },
          { title: "Events and EventEmitter", duration: "25 min", type: "video", free: false },
          { title: "Streams and Buffers", duration: "35 min", type: "video", free: false },
          { title: "Process and Child Processes", duration: "25 min", type: "video", free: false },
          { title: "Error Handling in Node.js", duration: "20 min", type: "video", free: false },
          { title: "Node.js Fundamentals Exercises", duration: "45 min", type: "exercise", free: false },
          { title: "Module 1 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 2,
        title: "Express.js Framework",
        duration: "6 hours",
        lectures: 16,
        description: "Build web applications and APIs with Express.js",
        lessons: [
          { title: "Introduction to Express.js", duration: "25 min", type: "video", free: false },
          { title: "Setting up Express Application", duration: "20 min", type: "video", free: false },
          { title: "Routing and Route Parameters", duration: "30 min", type: "video", free: false },
          { title: "Middleware Functions", duration: "35 min", type: "video", free: false },
          { title: "Request and Response Objects", duration: "25 min", type: "video", free: false },
          { title: "Template Engines (EJS, Handlebars)", duration: "30 min", type: "video", free: false },
          { title: "Serving Static Files", duration: "20 min", type: "video", free: false },
          { title: "Error Handling Middleware", duration: "25 min", type: "video", free: false },
          { title: "Express Router", duration: "25 min", type: "video", free: false },
          { title: "CORS and Security Headers", duration: "20 min", type: "video", free: false },
          { title: "Environment Variables", duration: "15 min", type: "video", free: false },
          { title: "Logging with Morgan", duration: "15 min", type: "video", free: false },
          { title: "Express.js Practice Exercises", duration: "50 min", type: "exercise", free: false },
          { title: "Building a Basic Web Server", duration: "60 min", type: "project", free: false },
          { title: "Express Middleware Project", duration: "45 min", type: "project", free: false },
          { title: "Module 2 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 3,
        title: "RESTful API Development",
        duration: "7 hours",
        lectures: 18,
        description: "Design and build RESTful APIs following best practices",
        lessons: [
          { title: "REST Architecture Principles", duration: "30 min", type: "video", free: false },
          { title: "HTTP Methods and Status Codes", duration: "25 min", type: "video", free: false },
          { title: "API Design Best Practices", duration: "25 min", type: "video", free: false },
          { title: "Building CRUD Operations", duration: "40 min", type: "video", free: false },
          { title: "Request Validation", duration: "30 min", type: "video", free: false },
          { title: "API Documentation with Swagger", duration: "25 min", type: "video", free: false },
          { title: "Pagination and Filtering", duration: "30 min", type: "video", free: false },
          { title: "API Versioning Strategies", duration: "20 min", type: "video", free: false },
          { title: "Rate Limiting and Throttling", duration: "25 min", type: "video", free: false },
          { title: "API Testing with Postman", duration: "30 min", type: "video", free: false },
          { title: "Error Handling in APIs", duration: "25 min", type: "video", free: false },
          { title: "Content Negotiation", duration: "20 min", type: "video", free: false },
          { title: "API Security Basics", duration: "25 min", type: "video", free: false },
          { title: "RESTful API Exercises", duration: "60 min", type: "exercise", free: false },
          { title: "Blog API Project", duration: "90 min", type: "project", free: false },
          { title: "E-commerce API Project", duration: "100 min", type: "project", free: false },
          { title: "API Testing Project", duration: "45 min", type: "project", free: false },
          { title: "Module 3 Assessment", duration: "25 min", type: "quiz", free: false }
        ]
      },
      {
        id: 4,
        title: "Database Integration",
        duration: "6 hours",
        lectures: 15,
        description: "Work with MongoDB and PostgreSQL databases",
        lessons: [
          { title: "Introduction to Databases", duration: "25 min", type: "video", free: false },
          { title: "MongoDB Basics and Setup", duration: "30 min", type: "video", free: false },
          { title: "Mongoose ODM", duration: "35 min", type: "video", free: false },
          { title: "Schema Design and Validation", duration: "30 min", type: "video", free: false },
          { title: "CRUD Operations with Mongoose", duration: "35 min", type: "video", free: false },
          { title: "Relationships and Population", duration: "30 min", type: "video", free: false },
          { title: "Aggregation Pipeline", duration: "25 min", type: "video", free: false },
          { title: "PostgreSQL and SQL Basics", duration: "30 min", type: "video", free: false },
          { title: "Sequelize ORM", duration: "35 min", type: "video", free: false },
          { title: "Migrations and Seeders", duration: "25 min", type: "video", free: false },
          { title: "Database Transactions", duration: "20 min", type: "video", free: false },
          { title: "Database Performance Optimization", duration: "25 min", type: "video", free: false },
          { title: "Database Integration Exercises", duration: "50 min", type: "exercise", free: false },
          { title: "User Management System Project", duration: "80 min", type: "project", free: false },
          { title: "Module 4 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 5,
        title: "Authentication & Authorization",
        duration: "5 hours",
        lectures: 13,
        description: "Implement secure authentication and authorization systems",
        lessons: [
          { title: "Authentication vs Authorization", duration: "20 min", type: "video", free: false },
          { title: "Password Hashing with bcrypt", duration: "25 min", type: "video", free: false },
          { title: "JSON Web Tokens (JWT)", duration: "30 min", type: "video", free: false },
          { title: "Session-based Authentication", duration: "25 min", type: "video", free: false },
          { title: "Passport.js Integration", duration: "35 min", type: "video", free: false },
          { title: "OAuth 2.0 and Social Login", duration: "30 min", type: "video", free: false },
          { title: "Role-based Access Control", duration: "25 min", type: "video", free: false },
          { title: "API Key Authentication", duration: "20 min", type: "video", free: false },
          { title: "Security Best Practices", duration: "25 min", type: "video", free: false },
          { title: "HTTPS and SSL/TLS", duration: "20 min", type: "video", free: false },
          { title: "Authentication Exercises", duration: "45 min", type: "exercise", free: false },
          { title: "Secure API Project", duration: "75 min", type: "project", free: false },
          { title: "Module 5 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 6,
        title: "Real-time Applications",
        duration: "4 hours",
        lectures: 10,
        description: "Build real-time applications with WebSockets and Socket.io",
        lessons: [
          { title: "Introduction to WebSockets", duration: "25 min", type: "video", free: false },
          { title: "Socket.io Setup and Basics", duration: "30 min", type: "video", free: false },
          { title: "Events and Event Handling", duration: "25 min", type: "video", free: false },
          { title: "Rooms and Namespaces", duration: "30 min", type: "video", free: false },
          { title: "Broadcasting Messages", duration: "20 min", type: "video", free: false },
          { title: "Authentication with Socket.io", duration: "25 min", type: "video", free: false },
          { title: "Scaling Socket.io Applications", duration: "20 min", type: "video", free: false },
          { title: "Real-time Exercises", duration: "40 min", type: "exercise", free: false },
          { title: "Chat Application Project", duration: "80 min", type: "project", free: false },
          { title: "Module 6 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 7,
        title: "Testing & Debugging",
        duration: "4 hours",
        lectures: 11,
        description: "Test and debug Node.js applications effectively",
        lessons: [
          { title: "Testing Fundamentals", duration: "20 min", type: "video", free: false },
          { title: "Unit Testing with Jest", duration: "30 min", type: "video", free: false },
          { title: "Integration Testing", duration: "25 min", type: "video", free: false },
          { title: "API Testing with Supertest", duration: "30 min", type: "video", free: false },
          { title: "Mocking and Stubbing", duration: "25 min", type: "video", free: false },
          { title: "Test Coverage Reports", duration: "20 min", type: "video", free: false },
          { title: "Debugging with Node.js Inspector", duration: "25 min", type: "video", free: false },
          { title: "Performance Profiling", duration: "20 min", type: "video", free: false },
          { title: "Error Monitoring", duration: "15 min", type: "video", free: false },
          { title: "Testing Exercises", duration: "40 min", type: "exercise", free: false },
          { title: "Module 7 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 8,
        title: "Deployment & DevOps",
        duration: "5 hours",
        lectures: 12,
        description: "Deploy Node.js applications to production environments",
        lessons: [
          { title: "Production Environment Setup", duration: "25 min", type: "video", free: false },
          { title: "Environment Configuration", duration: "20 min", type: "video", free: false },
          { title: "Process Management with PM2", duration: "30 min", type: "video", free: false },
          { title: "Deploying to Heroku", duration: "25 min", type: "video", free: false },
          { title: "AWS Deployment (EC2, Elastic Beanstalk)", duration: "35 min", type: "video", free: false },
          { title: "Docker Containerization", duration: "30 min", type: "video", free: false },
          { title: "CI/CD with GitHub Actions", duration: "25 min", type: "video", free: false },
          { title: "Monitoring and Logging", duration: "25 min", type: "video", free: false },
          { title: "Load Balancing and Scaling", duration: "20 min", type: "video", free: false },
          { title: "Security in Production", duration: "20 min", type: "video", free: false },
          { title: "Deployment Exercises", duration: "40 min", type: "exercise", free: false },
          { title: "Module 8 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 9,
        title: "Capstone Projects",
        duration: "10 hours",
        lectures: 11,
        description: "Build comprehensive backend applications",
        lessons: [
          { title: "Project Planning and Architecture", duration: "45 min", type: "video", free: false },
          { title: "Project 1: Task Management API", duration: "120 min", type: "project", free: false },
          { title: "Project 2: Social Media Backend", duration: "150 min", type: "project", free: false },
          { title: "Project 3: E-learning Platform API", duration: "140 min", type: "project", free: false },
          { title: "Project 4: Real-time Collaboration Tool", duration: "130 min", type: "project", free: false },
          { title: "Code Review and Optimization", duration: "60 min", type: "video", free: false },
          { title: "API Documentation", duration: "30 min", type: "video", free: false },
          { title: "Portfolio Development", duration: "30 min", type: "video", free: false },
          { title: "Interview Preparation", duration: "25 min", type: "video", free: false },
          { title: "Career Guidance", duration: "20 min", type: "video", free: false },
          { title: "Final Assessment", duration: "30 min", type: "quiz", free: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        name: "Karan Mehta",
        rating: 5,
        date: "1 week ago",
        comment: "Excellent Node.js course! David's teaching style is outstanding. The real-time applications section was particularly valuable for my backend development career. Highly recommend!",
        helpful: 84
      },
      {
        id: 2,
        name: "Sanya Gupta",
        rating: 5,
        date: "2 weeks ago",
        comment: "Best backend development course I've taken. Comprehensive coverage from basics to deployment. The authentication section was exactly what I needed for my projects.",
        helpful: 72
      },
      {
        id: 3,
        name: "Rohit Sharma",
        rating: 5,
        date: "3 weeks ago",
        comment: "Outstanding course with practical projects. The API development section was thorough and the deployment tutorials were very helpful. Great value for money!",
        helpful: 68
      },
      {
        id: 4,
        name: "Anjali Patel",
        rating: 4,
        date: "1 month ago",
        comment: "Very good course with excellent content. Would have liked more advanced microservices topics, but perfect for intermediate backend developers.",
        helpful: 55
      }
    ],
    prerequisites: [
      "Solid understanding of JavaScript ES6+",
      "Basic knowledge of web development concepts",
      "Familiarity with command line/terminal",
      "Understanding of HTTP protocol basics",
      "Basic database concepts (helpful but not required)"
    ],
    tools: [
      "Node.js 18+",
      "Express.js",
      "MongoDB & Mongoose",
      "PostgreSQL & Sequelize",
      "Socket.io",
      "JWT & Passport.js",
      "Jest & Supertest",
      "Docker",
      "AWS/Heroku",
      "Postman",
      "Git & GitHub"
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
    console.log('Enrolling in Node.js course...');
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
      <div className="bg-gradient-to-r from-green-900 to-teal-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {courseData.stats.level}
                  </span>
                  <span className="bg-yellow-50 text-richblack-900 px-3 py-1 rounded-full text-sm font-semibold">
                    Backend Focus
                  </span>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    API Development
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
                  <FaNodeJs className="text-green-400" />
                  <span>Node.js {courseData.stats.projects} projects</span>
                </div>
              </div>

              {/* Tech Stack Icons */}
              <div className="flex items-center space-x-4 mb-6">
                <FaNodeJs className="text-green-400 text-2xl" title="Node.js" />
                <FaServer className="text-blue-400 text-2xl" title="Express.js" />
                <FaDatabase className="text-green-500 text-2xl" title="Database" />
                <FaCloud className="text-gray-400 text-2xl" title="Cloud Deployment" />
              </div>

              {/* Instructor Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <FaNodeJs className="text-white" />
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
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <FaPlay className="text-sm" />
                  <span>{isEnrolled ? 'Continue Learning' : 'Enroll Now'}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-richblack-600 text-richblack-300 px-8 py-3 rounded-lg font-semibold hover:border-green-500 hover:text-green-400 transition-colors flex items-center space-x-2"
                >
                  <FaBookmark className="text-sm" />
                  <span>Save for Later</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-richblack-600 text-richblack-300 px-8 py-3 rounded-lg font-semibold hover:border-green-500 hover:text-green-400 transition-colors flex items-center space-x-2"
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
                    className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
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
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors mb-4"
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
                  ? 'text-green-400 border-b-2 border-green-400'
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
                    "Master Node.js runtime and core modules",
                    "Build RESTful APIs with Express.js",
                    "Integrate MongoDB and PostgreSQL databases",
                    "Implement authentication and authorization",
                    "Create real-time applications with Socket.io",
                    "Deploy applications to cloud platforms",
                    "Write comprehensive tests for backend code",
                    "Apply security best practices",
                    "Build scalable microservices architecture",
                    "Implement CI/CD pipelines",
                    "Monitor and debug production applications",
                    "Prepare for backend developer interviews"
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
                    This comprehensive Node.js course is designed to take you from intermediate JavaScript knowledge 
                    to becoming a proficient backend developer. You'll learn to build scalable server-side applications, 
                    RESTful APIs, and real-time systems using modern Node.js practices.
                  </p>
                  <p>
                    The course covers everything from Node.js fundamentals to advanced topics like microservices, 
                    authentication, database integration, and cloud deployment. Each module includes hands-on projects 
                    that simulate real-world development scenarios.
                  </p>
                  <p>
                    By the end of this course, you'll have built several production-ready applications including 
                    task management APIs, social media backends, and real-time collaboration tools. These projects 
                    will demonstrate your ability to work with modern backend development practices.
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
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
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
                        className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm"
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
                <h3 className="text-lg font-semibold text-richblack-5">Node.js Course Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-richblack-400 hover:text-richblack-300 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video bg-richblack-700 flex items-center justify-center">
                <div className="text-center text-richblack-400">
                  <FaNodeJs className="text-6xl mb-4 mx-auto text-green-400" />
                  <p>Node.js course preview video would play here</p>
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

export default NodeJSCourse;