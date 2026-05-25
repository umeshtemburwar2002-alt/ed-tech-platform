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
  FaDatabase,
  FaTable,
  FaSearch,
  FaChartBar
} from 'react-icons/fa';
import Footer from '../../components/common/Footer';

const SQLDatabaseCourse = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Course data
  const courseData = {
    id: 8,
    title: "SQL & Database Management - Complete Guide",
    subtitle: "Master SQL queries, database design, and data management",
    description: "Learn SQL from basics to advanced concepts. Master database design, complex queries, stored procedures, and database administration. Work with MySQL, PostgreSQL, and MongoDB to become a database expert.",
    instructor: {
      name: "Prof. Rajesh Kumar",
      title: "Database Architect & SQL Expert",
      experience: "15+ years",
      students: "38,000+",
      rating: 4.8,
      bio: "Prof. Rajesh Kumar is a database architect with over 15 years of experience in database design and management. He has worked with enterprise databases and has been teaching SQL and database concepts for over 10 years.",
      image: null
    },
    stats: {
      rating: 4.8,
      reviews: 2543,
      students: 9850,
      duration: "12 weeks",
      lectures: 88,
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
      "88 hours of comprehensive SQL content",
      "120+ hands-on SQL exercises",
      "10 real-world database projects",
      "MySQL, PostgreSQL, and MongoDB",
      "Database design and normalization",
      "Advanced query optimization",
      "Stored procedures and functions",
      "Database administration basics",
      "Data warehousing concepts",
      "Lifetime access to course materials",
      "Industry-recognized certificate",
      "30-day money-back guarantee",
      "Direct instructor support"
    ],
    curriculum: [
      {
        id: 1,
        title: "SQL Fundamentals",
        duration: "4 hours",
        lectures: 10,
        description: "Get started with SQL basics and database concepts",
        lessons: [
          { title: "Introduction to Databases", duration: "25 min", type: "video", free: true },
          { title: "What is SQL?", duration: "20 min", type: "video", free: true },
          { title: "Database Management Systems", duration: "25 min", type: "video", free: true },
          { title: "Installing MySQL and Setup", duration: "20 min", type: "video", free: false },
          { title: "SQL Syntax and Structure", duration: "25 min", type: "video", free: false },
          { title: "Data Types in SQL", duration: "20 min", type: "video", free: false },
          { title: "Creating Your First Database", duration: "25 min", type: "video", free: false },
          { title: "SQL Comments and Best Practices", duration: "15 min", type: "video", free: false },
          { title: "SQL Fundamentals Exercises", duration: "40 min", type: "exercise", free: false },
          { title: "Module 1 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 2,
        title: "Basic SQL Queries",
        duration: "5 hours",
        lectures: 12,
        description: "Learn to write basic SQL queries for data retrieval",
        lessons: [
          { title: "SELECT Statement Basics", duration: "25 min", type: "video", free: false },
          { title: "WHERE Clause and Filtering", duration: "30 min", type: "video", free: false },
          { title: "ORDER BY and Sorting Data", duration: "20 min", type: "video", free: false },
          { title: "LIMIT and OFFSET", duration: "15 min", type: "video", free: false },
          { title: "DISTINCT and Unique Values", duration: "20 min", type: "video", free: false },
          { title: "Comparison Operators", duration: "25 min", type: "video", free: false },
          { title: "Logical Operators (AND, OR, NOT)", duration: "25 min", type: "video", free: false },
          { title: "IN, BETWEEN, and LIKE Operators", duration: "30 min", type: "video", free: false },
          { title: "NULL Values and IS NULL", duration: "20 min", type: "video", free: false },
          { title: "Pattern Matching with Wildcards", duration: "25 min", type: "video", free: false },
          { title: "Basic Queries Practice", duration: "45 min", type: "exercise", free: false },
          { title: "Module 2 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 3,
        title: "Data Manipulation (DML)",
        duration: "4 hours",
        lectures: 10,
        description: "Learn to insert, update, and delete data",
        lessons: [
          { title: "INSERT Statement", duration: "25 min", type: "video", free: false },
          { title: "INSERT Multiple Rows", duration: "20 min", type: "video", free: false },
          { title: "UPDATE Statement", duration: "25 min", type: "video", free: false },
          { title: "UPDATE with Conditions", duration: "20 min", type: "video", free: false },
          { title: "DELETE Statement", duration: "20 min", type: "video", free: false },
          { title: "DELETE with Conditions", duration: "20 min", type: "video", free: false },
          { title: "TRUNCATE vs DELETE", duration: "15 min", type: "video", free: false },
          { title: "Data Integrity and Constraints", duration: "25 min", type: "video", free: false },
          { title: "DML Practice Exercises", duration: "50 min", type: "exercise", free: false },
          { title: "Module 3 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 4,
        title: "Database Design & DDL",
        duration: "5 hours",
        lectures: 12,
        description: "Learn database design principles and DDL commands",
        lessons: [
          { title: "Database Design Principles", duration: "30 min", type: "video", free: false },
          { title: "Entity-Relationship (ER) Diagrams", duration: "25 min", type: "video", free: false },
          { title: "Normalization (1NF, 2NF, 3NF)", duration: "35 min", type: "video", free: false },
          { title: "CREATE DATABASE and USE", duration: "20 min", type: "video", free: false },
          { title: "CREATE TABLE Statement", duration: "30 min", type: "video", free: false },
          { title: "Data Types and Constraints", duration: "25 min", type: "video", free: false },
          { title: "Primary Keys and Foreign Keys", duration: "30 min", type: "video", free: false },
          { title: "ALTER TABLE Statement", duration: "25 min", type: "video", free: false },
          { title: "DROP and TRUNCATE", duration: "20 min", type: "video", free: false },
          { title: "Indexes and Performance", duration: "25 min", type: "video", free: false },
          { title: "Database Design Project", duration: "60 min", type: "project", free: false },
          { title: "Module 4 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 5,
        title: "Advanced SQL Queries",
        duration: "6 hours",
        lectures: 14,
        description: "Master complex queries and advanced SQL features",
        lessons: [
          { title: "Aggregate Functions (COUNT, SUM, AVG)", duration: "30 min", type: "video", free: false },
          { title: "GROUP BY and HAVING", duration: "30 min", type: "video", free: false },
          { title: "Subqueries and Nested Queries", duration: "35 min", type: "video", free: false },
          { title: "Correlated Subqueries", duration: "25 min", type: "video", free: false },
          { title: "EXISTS and NOT EXISTS", duration: "20 min", type: "video", free: false },
          { title: "CASE Statements", duration: "25 min", type: "video", free: false },
          { title: "Common Table Expressions (CTEs)", duration: "30 min", type: "video", free: false },
          { title: "Window Functions", duration: "35 min", type: "video", free: false },
          { title: "RANK, ROW_NUMBER, DENSE_RANK", duration: "25 min", type: "video", free: false },
          { title: "Date and Time Functions", duration: "25 min", type: "video", free: false },
          { title: "String Functions", duration: "20 min", type: "video", free: false },
          { title: "Advanced Queries Practice", duration: "60 min", type: "exercise", free: false },
          { title: "Complex Query Project", duration: "80 min", type: "project", free: false },
          { title: "Module 5 Assessment", duration: "25 min", type: "quiz", free: false }
        ]
      },
      {
        id: 6,
        title: "Joins and Relationships",
        duration: "4 hours",
        lectures: 10,
        description: "Master different types of joins and table relationships",
        lessons: [
          { title: "Understanding Table Relationships", duration: "25 min", type: "video", free: false },
          { title: "INNER JOIN", duration: "25 min", type: "video", free: false },
          { title: "LEFT JOIN (LEFT OUTER JOIN)", duration: "25 min", type: "video", free: false },
          { title: "RIGHT JOIN (RIGHT OUTER JOIN)", duration: "20 min", type: "video", free: false },
          { title: "FULL OUTER JOIN", duration: "20 min", type: "video", free: false },
          { title: "CROSS JOIN", duration: "15 min", type: "video", free: false },
          { title: "SELF JOIN", duration: "25 min", type: "video", free: false },
          { title: "Multiple Table Joins", duration: "30 min", type: "video", free: false },
          { title: "Joins Practice Exercises", duration: "50 min", type: "exercise", free: false },
          { title: "Module 6 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 7,
        title: "Stored Procedures & Functions",
        duration: "4 hours",
        lectures: 10,
        description: "Learn to create stored procedures and user-defined functions",
        lessons: [
          { title: "Introduction to Stored Procedures", duration: "25 min", type: "video", free: false },
          { title: "Creating Stored Procedures", duration: "30 min", type: "video", free: false },
          { title: "Parameters in Stored Procedures", duration: "25 min", type: "video", free: false },
          { title: "Control Flow (IF, WHILE, LOOP)", duration: "30 min", type: "video", free: false },
          { title: "Exception Handling", duration: "20 min", type: "video", free: false },
          { title: "User-Defined Functions", duration: "25 min", type: "video", free: false },
          { title: "Triggers", duration: "25 min", type: "video", free: false },
          { title: "Views and Virtual Tables", duration: "20 min", type: "video", free: false },
          { title: "Stored Procedures Project", duration: "60 min", type: "project", free: false },
          { title: "Module 7 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 8,
        title: "Database Administration & Optimization",
        duration: "5 hours",
        lectures: 12,
        description: "Learn database administration and performance optimization",
        lessons: [
          { title: "Database Security and User Management", duration: "30 min", type: "video", free: false },
          { title: "Backup and Recovery", duration: "25 min", type: "video", free: false },
          { title: "Query Optimization Techniques", duration: "30 min", type: "video", free: false },
          { title: "Index Optimization", duration: "25 min", type: "video", free: false },
          { title: "Execution Plans", duration: "25 min", type: "video", free: false },
          { title: "Database Monitoring", duration: "20 min", type: "video", free: false },
          { title: "Partitioning and Sharding", duration: "25 min", type: "video", free: false },
          { title: "Replication Basics", duration: "20 min", type: "video", free: false },
          { title: "NoSQL Introduction (MongoDB)", duration: "30 min", type: "video", free: false },
          { title: "SQL vs NoSQL", duration: "20 min", type: "video", free: false },
          { title: "Database Administration Project", duration: "70 min", type: "project", free: false },
          { title: "Module 8 Assessment", duration: "25 min", type: "quiz", free: false }
        ]
      },
      {
        id: 9,
        title: "Real-World Projects & Portfolio",
        duration: "6 hours",
        lectures: 8,
        description: "Build comprehensive database projects for your portfolio",
        lessons: [
          { title: "Project Planning and Requirements", duration: "30 min", type: "video", free: false },
          { title: "Project 1: E-commerce Database", duration: "90 min", type: "project", free: false },
          { title: "Project 2: Library Management System", duration: "80 min", type: "project", free: false },
          { title: "Project 3: Hospital Management Database", duration: "85 min", type: "project", free: false },
          { title: "Project 4: Financial Analytics Database", duration: "75 min", type: "project", free: false },
          { title: "Portfolio Development", duration: "30 min", type: "video", free: false },
          { title: "SQL Interview Preparation", duration: "25 min", type: "video", free: false },
          { title: "Final Assessment", duration: "25 min", type: "quiz", free: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        name: "Suresh Patel",
        rating: 5,
        date: "1 week ago",
        comment: "Excellent SQL course! Prof. Rajesh explains database concepts very clearly. The hands-on projects were practical and helped me understand real-world database design. Highly recommend!",
        helpful: 87
      },
      {
        id: 2,
        name: "Pooja Sharma",
        rating: 5,
        date: "2 weeks ago",
        comment: "Best SQL course for beginners. Great progression from basic queries to advanced database administration. The optimization section was particularly valuable for my job.",
        helpful: 74
      },
      {
        id: 3,
        name: "Vikash Kumar",
        rating: 4,
        date: "3 weeks ago",
        comment: "Very comprehensive course with practical examples. Would have liked more NoSQL content, but excellent for learning SQL and relational databases.",
        helpful: 61
      },
      {
        id: 4,
        name: "Ananya Singh",
        rating: 5,
        date: "1 month ago",
        comment: "Outstanding instructor and course structure. The database design section was exactly what I needed for my data analyst role. Great value for money!",
        helpful: 69
      }
    ],
    prerequisites: [
      "Basic computer literacy",
      "Understanding of basic mathematics",
      "Familiarity with data and tables (Excel knowledge helpful)",
      "No prior programming experience required",
      "Willingness to practice and work with databases"
    ],
    tools: [
      "MySQL",
      "PostgreSQL",
      "MongoDB (basics)",
      "MySQL Workbench",
      "phpMyAdmin",
      "SQL Server Management Studio",
      "Command Line Interface",
      "Database Design Tools"
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
    console.log('Enrolling in SQL Database course...');
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
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 py-16">
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
                    Database Focus
                  </span>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Industry Standard
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
                  <FaDatabase className="text-blue-400" />
                  <span>SQL {courseData.stats.projects} projects</span>
                </div>
              </div>

              {/* Tech Stack Icons */}
              <div className="flex items-center space-x-4 mb-6">
                <FaDatabase className="text-blue-400 text-2xl" title="SQL Database" />
                <FaTable className="text-green-400 text-2xl" title="Data Tables" />
                <FaSearch className="text-yellow-400 text-2xl" title="Query" />
                <FaChartBar className="text-purple-400 text-2xl" title="Analytics" />
              </div>

              {/* Instructor Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <FaDatabase className="text-white" />
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
                    "Master SQL fundamentals and syntax",
                    "Design and normalize relational databases",
                    "Write complex queries and joins",
                    "Create stored procedures and functions",
                    "Implement database security and user management",
                    "Optimize query performance and indexing",
                    "Work with MySQL, PostgreSQL, and MongoDB",
                    "Understand database administration basics",
                    "Build real-world database applications",
                    "Prepare for database developer interviews",
                    "Learn data warehousing concepts",
                    "Master backup and recovery procedures"
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
                    This comprehensive SQL and database management course is designed to take you from a complete 
                    beginner to a proficient database developer. You'll learn SQL fundamentals, database design 
                    principles, and advanced query techniques used in real-world applications.
                  </p>
                  <p>
                    The course covers everything from basic SELECT statements to complex stored procedures and 
                    database administration. Each module includes hands-on exercises with real datasets and 
                    practical projects that simulate enterprise database scenarios.
                  </p>
                  <p>
                    By the end of this course, you'll have built several database applications including an 
                    e-commerce system, library management database, and financial analytics platform. These 
                    projects will demonstrate your ability to design, implement, and manage production databases.
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
                <h3 className="text-lg font-semibold text-richblack-5">SQL Database Course Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-richblack-400 hover:text-richblack-300 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video bg-richblack-700 flex items-center justify-center">
                <div className="text-center text-richblack-400">
                  <FaDatabase className="text-6xl mb-4 mx-auto text-blue-400" />
                  <p>SQL Database course preview video would play here</p>
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

export default SQLDatabaseCourse;