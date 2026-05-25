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
  FaCoffee
} from 'react-icons/fa';
import Footer from '../../components/common/Footer';

const JavaProgrammingCourse = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Course data
  const courseData = {
    id: 2,
    title: "Java Programming Masterclass - From Zero to Hero",
    subtitle: "Master Java programming with object-oriented concepts and enterprise development",
    description: "Comprehensive Java programming course covering everything from basic syntax to advanced enterprise development. Learn object-oriented programming, data structures, algorithms, and build real-world applications using Java.",
    instructor: {
      name: "Prof. Michael Chen",
      title: "Senior Java Architect & Enterprise Developer",
      experience: "12+ years",
      students: "75,000+",
      rating: 4.9,
      bio: "Prof. Michael Chen is a seasoned Java developer and architect with over 12 years of experience in enterprise software development. He has worked with Fortune 500 companies and has been teaching Java programming for over 8 years.",
      image: null
    },
    stats: {
      rating: 4.9,
      reviews: 3245,
      students: 12350,
      duration: "16 weeks",
      lectures: 125,
      projects: 15,
      level: "Intermediate",
      language: "English",
      lastUpdated: "December 2024"
    },
    pricing: {
      current: 3999,
      original: 7999,
      discount: 50
    },
    features: [
      "125 hours of comprehensive video content",
      "200+ hands-on coding exercises",
      "15 real-world enterprise projects",
      "Lifetime access to course materials",
      "Mobile and desktop access",
      "Industry-recognized certificate",
      "30-day money-back guarantee",
      "Direct instructor and TA support",
      "Access to exclusive Java community",
      "Interview preparation materials"
    ],
    curriculum: [
      {
        id: 1,
        title: "Java Fundamentals & Environment Setup",
        duration: "4 hours",
        lectures: 10,
        description: "Get started with Java programming and development environment",
        lessons: [
          { title: "Introduction to Java & JVM", duration: "20 min", type: "video", free: true },
          { title: "Installing JDK & IDE Setup", duration: "25 min", type: "video", free: true },
          { title: "Your First Java Program", duration: "30 min", type: "video", free: true },
          { title: "Understanding Java Syntax", duration: "35 min", type: "video", free: false },
          { title: "Variables and Data Types", duration: "40 min", type: "video", free: false },
          { title: "Operators and Expressions", duration: "30 min", type: "video", free: false },
          { title: "Input/Output Operations", duration: "25 min", type: "video", free: false },
          { title: "Debugging Techniques", duration: "20 min", type: "video", free: false },
          { title: "Practice Exercises", duration: "45 min", type: "exercise", free: false },
          { title: "Module 1 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 2,
        title: "Object-Oriented Programming Concepts",
        duration: "8 hours",
        lectures: 18,
        description: "Master the core principles of object-oriented programming in Java",
        lessons: [
          { title: "Introduction to OOP", duration: "30 min", type: "video", free: false },
          { title: "Classes and Objects", duration: "45 min", type: "video", free: false },
          { title: "Constructors and Methods", duration: "40 min", type: "video", free: false },
          { title: "Encapsulation and Access Modifiers", duration: "35 min", type: "video", free: false },
          { title: "Inheritance and Super Keyword", duration: "50 min", type: "video", free: false },
          { title: "Method Overriding", duration: "30 min", type: "video", free: false },
          { title: "Polymorphism", duration: "45 min", type: "video", free: false },
          { title: "Abstract Classes", duration: "35 min", type: "video", free: false },
          { title: "Interfaces", duration: "40 min", type: "video", free: false },
          { title: "Static Members", duration: "25 min", type: "video", free: false },
          { title: "Final Keyword", duration: "20 min", type: "video", free: false },
          { title: "Inner Classes", duration: "30 min", type: "video", free: false },
          { title: "OOP Design Patterns", duration: "45 min", type: "video", free: false },
          { title: "Practice Exercises", duration: "60 min", type: "exercise", free: false },
          { title: "Mini Project: Banking System", duration: "90 min", type: "project", free: false },
          { title: "Code Review Session", duration: "30 min", type: "video", free: false },
          { title: "OOP Best Practices", duration: "25 min", type: "video", free: false },
          { title: "Module 2 Assessment", duration: "30 min", type: "quiz", free: false }
        ]
      },
      {
        id: 3,
        title: "Data Structures & Collections Framework",
        duration: "6 hours",
        lectures: 15,
        description: "Learn Java's powerful collections framework and data structures",
        lessons: [
          { title: "Arrays and Array Operations", duration: "35 min", type: "video", free: false },
          { title: "ArrayList and LinkedList", duration: "40 min", type: "video", free: false },
          { title: "HashMap and TreeMap", duration: "45 min", type: "video", free: false },
          { title: "HashSet and TreeSet", duration: "35 min", type: "video", free: false },
          { title: "Stack and Queue", duration: "30 min", type: "video", free: false },
          { title: "Iterator and ListIterator", duration: "25 min", type: "video", free: false },
          { title: "Comparable and Comparator", duration: "30 min", type: "video", free: false },
          { title: "Generics in Java", duration: "40 min", type: "video", free: false },
          { title: "Collections Utility Methods", duration: "25 min", type: "video", free: false },
          { title: "Custom Data Structures", duration: "35 min", type: "video", free: false },
          { title: "Algorithm Complexity", duration: "30 min", type: "video", free: false },
          { title: "Searching and Sorting", duration: "40 min", type: "video", free: false },
          { title: "Collections Practice", duration: "50 min", type: "exercise", free: false },
          { title: "Data Structure Project", duration: "75 min", type: "project", free: false },
          { title: "Module 3 Assessment", duration: "25 min", type: "quiz", free: false }
        ]
      },
      {
        id: 4,
        title: "Exception Handling & File I/O",
        duration: "5 hours",
        lectures: 12,
        description: "Master error handling and file operations in Java",
        lessons: [
          { title: "Understanding Exceptions", duration: "30 min", type: "video", free: false },
          { title: "Try-Catch-Finally Blocks", duration: "35 min", type: "video", free: false },
          { title: "Checked vs Unchecked Exceptions", duration: "25 min", type: "video", free: false },
          { title: "Custom Exception Classes", duration: "30 min", type: "video", free: false },
          { title: "Exception Best Practices", duration: "20 min", type: "video", free: false },
          { title: "File Input/Output Streams", duration: "40 min", type: "video", free: false },
          { title: "BufferedReader and BufferedWriter", duration: "35 min", type: "video", free: false },
          { title: "Serialization and Deserialization", duration: "45 min", type: "video", free: false },
          { title: "NIO Package", duration: "30 min", type: "video", free: false },
          { title: "File Processing Project", duration: "60 min", type: "project", free: false },
          { title: "Exception Handling Exercises", duration: "40 min", type: "exercise", free: false },
          { title: "Module 4 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 5,
        title: "Multithreading & Concurrency",
        duration: "7 hours",
        lectures: 16,
        description: "Learn advanced multithreading and concurrent programming",
        lessons: [
          { title: "Introduction to Threads", duration: "30 min", type: "video", free: false },
          { title: "Creating and Managing Threads", duration: "35 min", type: "video", free: false },
          { title: "Thread Lifecycle", duration: "25 min", type: "video", free: false },
          { title: "Synchronization", duration: "40 min", type: "video", free: false },
          { title: "Locks and Conditions", duration: "35 min", type: "video", free: false },
          { title: "Thread Pools", duration: "30 min", type: "video", free: false },
          { title: "Executor Framework", duration: "40 min", type: "video", free: false },
          { title: "Concurrent Collections", duration: "35 min", type: "video", free: false },
          { title: "Atomic Variables", duration: "25 min", type: "video", free: false },
          { title: "CompletableFuture", duration: "45 min", type: "video", free: false },
          { title: "Parallel Streams", duration: "30 min", type: "video", free: false },
          { title: "Thread Safety Best Practices", duration: "25 min", type: "video", free: false },
          { title: "Deadlock Prevention", duration: "20 min", type: "video", free: false },
          { title: "Concurrency Exercises", duration: "50 min", type: "exercise", free: false },
          { title: "Multithreading Project", duration: "80 min", type: "project", free: false },
          { title: "Module 5 Assessment", duration: "25 min", type: "quiz", free: false }
        ]
      },
      {
        id: 6,
        title: "Database Connectivity & JDBC",
        duration: "6 hours",
        lectures: 14,
        description: "Connect Java applications with databases using JDBC",
        lessons: [
          { title: "Introduction to JDBC", duration: "25 min", type: "video", free: false },
          { title: "Database Setup (MySQL)", duration: "30 min", type: "video", free: false },
          { title: "Establishing Database Connection", duration: "35 min", type: "video", free: false },
          { title: "Statement and PreparedStatement", duration: "40 min", type: "video", free: false },
          { title: "ResultSet Operations", duration: "35 min", type: "video", free: false },
          { title: "CRUD Operations", duration: "45 min", type: "video", free: false },
          { title: "Transaction Management", duration: "30 min", type: "video", free: false },
          { title: "Connection Pooling", duration: "25 min", type: "video", free: false },
          { title: "Stored Procedures", duration: "35 min", type: "video", free: false },
          { title: "Batch Processing", duration: "30 min", type: "video", free: false },
          { title: "Database Metadata", duration: "20 min", type: "video", free: false },
          { title: "JDBC Best Practices", duration: "25 min", type: "video", free: false },
          { title: "Database Project", duration: "90 min", type: "project", free: false },
          { title: "Module 6 Assessment", duration: "25 min", type: "quiz", free: false }
        ]
      },
      {
        id: 7,
        title: "Web Development with Servlets & JSP",
        duration: "8 hours",
        lectures: 18,
        description: "Build web applications using Java Servlets and JSP",
        lessons: [
          { title: "Web Application Architecture", duration: "30 min", type: "video", free: false },
          { title: "Setting up Web Server (Tomcat)", duration: "25 min", type: "video", free: false },
          { title: "Introduction to Servlets", duration: "35 min", type: "video", free: false },
          { title: "Servlet Lifecycle", duration: "30 min", type: "video", free: false },
          { title: "HTTP Request and Response", duration: "40 min", type: "video", free: false },
          { title: "Session Management", duration: "35 min", type: "video", free: false },
          { title: "Cookies and URL Rewriting", duration: "30 min", type: "video", free: false },
          { title: "Introduction to JSP", duration: "35 min", type: "video", free: false },
          { title: "JSP Directives and Scriptlets", duration: "40 min", type: "video", free: false },
          { title: "JSP Standard Tag Library (JSTL)", duration: "45 min", type: "video", free: false },
          { title: "Expression Language (EL)", duration: "25 min", type: "video", free: false },
          { title: "MVC Pattern in Web Apps", duration: "40 min", type: "video", free: false },
          { title: "Filters and Listeners", duration: "35 min", type: "video", free: false },
          { title: "File Upload/Download", duration: "30 min", type: "video", free: false },
          { title: "Security in Web Applications", duration: "25 min", type: "video", free: false },
          { title: "Web Development Exercises", duration: "60 min", type: "exercise", free: false },
          { title: "E-commerce Web Project", duration: "120 min", type: "project", free: false },
          { title: "Module 7 Assessment", duration: "30 min", type: "quiz", free: false }
        ]
      },
      {
        id: 8,
        title: "Spring Framework Fundamentals",
        duration: "10 hours",
        lectures: 22,
        description: "Introduction to Spring Framework and dependency injection",
        lessons: [
          { title: "Introduction to Spring Framework", duration: "30 min", type: "video", free: false },
          { title: "Spring Architecture", duration: "25 min", type: "video", free: false },
          { title: "Dependency Injection", duration: "40 min", type: "video", free: false },
          { title: "IoC Container", duration: "35 min", type: "video", free: false },
          { title: "Bean Configuration", duration: "45 min", type: "video", free: false },
          { title: "Annotation-based Configuration", duration: "40 min", type: "video", free: false },
          { title: "Spring Boot Introduction", duration: "35 min", type: "video", free: false },
          { title: "Auto Configuration", duration: "30 min", type: "video", free: false },
          { title: "Spring MVC", duration: "50 min", type: "video", free: false },
          { title: "Controllers and RequestMapping", duration: "45 min", type: "video", free: false },
          { title: "View Resolvers", duration: "25 min", type: "video", free: false },
          { title: "Form Handling", duration: "40 min", type: "video", free: false },
          { title: "Validation", duration: "35 min", type: "video", free: false },
          { title: "Exception Handling", duration: "30 min", type: "video", free: false },
          { title: "Spring Data JPA", duration: "45 min", type: "video", free: false },
          { title: "Repository Pattern", duration: "35 min", type: "video", free: false },
          { title: "RESTful Web Services", duration: "50 min", type: "video", free: false },
          { title: "Spring Security Basics", duration: "40 min", type: "video", free: false },
          { title: "Testing Spring Applications", duration: "35 min", type: "video", free: false },
          { title: "Spring Exercises", duration: "75 min", type: "exercise", free: false },
          { title: "Spring Boot REST API Project", duration: "150 min", type: "project", free: false },
          { title: "Module 8 Assessment", duration: "35 min", type: "quiz", free: false }
        ]
      },
      {
        id: 9,
        title: "Final Capstone Projects",
        duration: "12 hours",
        lectures: 15,
        description: "Build comprehensive enterprise applications",
        lessons: [
          { title: "Project Planning & Architecture", duration: "45 min", type: "video", free: false },
          { title: "Project 1: Library Management System", duration: "120 min", type: "project", free: false },
          { title: "Project 2: Online Banking Application", duration: "150 min", type: "project", free: false },
          { title: "Project 3: E-learning Platform", duration: "180 min", type: "project", free: false },
          { title: "Project 4: Inventory Management System", duration: "135 min", type: "project", free: false },
          { title: "Code Review & Optimization", duration: "60 min", type: "video", free: false },
          { title: "Performance Tuning", duration: "45 min", type: "video", free: false },
          { title: "Deployment Strategies", duration: "40 min", type: "video", free: false },
          { title: "DevOps Integration", duration: "35 min", type: "video", free: false },
          { title: "Portfolio Development", duration: "30 min", type: "video", free: false },
          { title: "Resume Building", duration: "25 min", type: "video", free: false },
          { title: "Interview Preparation", duration: "40 min", type: "video", free: false },
          { title: "Industry Best Practices", duration: "30 min", type: "video", free: false },
          { title: "Career Guidance", duration: "25 min", type: "video", free: false },
          { title: "Final Comprehensive Assessment", duration: "45 min", type: "quiz", free: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        name: "Arjun Patel",
        rating: 5,
        date: "1 week ago",
        comment: "Outstanding course! Prof. Chen's teaching style is exceptional. The projects are industry-relevant and the Spring Boot section was particularly valuable. Landed a Java developer job after completing this course!",
        helpful: 67
      },
      {
        id: 2,
        name: "Sneha Gupta",
        rating: 5,
        date: "2 weeks ago",
        comment: "Best Java course available online. Comprehensive coverage from basics to advanced topics. The multithreading section was challenging but well explained. Highly recommend!",
        helpful: 54
      },
      {
        id: 3,
        name: "Rajesh Kumar",
        rating: 4,
        date: "1 month ago",
        comment: "Excellent content and practical projects. Only wish there was more coverage on microservices, but overall fantastic course for Java development.",
        helpful: 42
      },
      {
        id: 4,
        name: "Priya Sharma",
        rating: 5,
        date: "3 weeks ago",
        comment: "Prof. Chen explains complex concepts in a very understandable way. The database connectivity and web development modules were particularly helpful for my current job.",
        helpful: 38
      }
    ],
    prerequisites: [
      "Basic programming knowledge (any language)",
      "Understanding of computer science fundamentals",
      "Familiarity with basic data structures",
      "Computer with 8GB+ RAM for development",
      "Willingness to practice and build projects"
    ],
    tools: [
      "Java JDK 11+",
      "IntelliJ IDEA / Eclipse",
      "MySQL Database",
      "Apache Tomcat",
      "Spring Boot",
      "Maven / Gradle",
      "Git & GitHub",
      "Postman (API Testing)"
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
    console.log('Enrolling in Java course...');
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
      <div className="bg-gradient-to-r from-blue-900 to-richblack-800 py-16">
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
                    Most Popular
                  </span>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Enterprise Ready
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
                  <FaCoffee className="text-richblack-400" />
                  <span>Java {courseData.stats.projects} projects</span>
                </div>
              </div>

              {/* Instructor Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <FaCoffee className="text-white" />
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

      {/* Course Content Tabs - Similar structure to Python course but with Java-specific content */}
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
                    "Master Java programming from basics to advanced",
                    "Build enterprise-level applications",
                    "Understand object-oriented programming deeply",
                    "Work with databases using JDBC",
                    "Develop web applications with Servlets & JSP",
                    "Learn Spring Framework and Spring Boot",
                    "Master multithreading and concurrency",
                    "Build RESTful web services",
                    "Implement design patterns",
                    "Deploy applications to production",
                    "Write clean, maintainable code",
                    "Prepare for Java developer interviews"
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
                    This comprehensive Java programming course is designed to take you from a beginner to an 
                    enterprise-ready Java developer. You'll learn not just the syntax, but also the best practices, 
                    design patterns, and real-world application development techniques used in the industry.
                  </p>
                  <p>
                    The course covers everything from basic Java concepts to advanced topics like multithreading, 
                    database connectivity, web development, and the Spring Framework. Each module includes hands-on 
                    projects that simulate real-world development scenarios.
                  </p>
                  <p>
                    By the end of this course, you'll have built several enterprise-grade applications including 
                    a library management system, online banking application, and e-learning platform. These projects 
                    will demonstrate your ability to work with complex business requirements and modern development practices.
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

          {/* Other tabs would follow similar pattern with Java-specific content */}
          {/* Curriculum, Instructor, and Reviews tabs would be implemented similarly */}
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
                <h3 className="text-lg font-semibold text-richblack-5">Java Course Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-richblack-400 hover:text-richblack-300 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video bg-richblack-700 flex items-center justify-center">
                <div className="text-center text-richblack-400">
                  <FaCoffee className="text-6xl mb-4 mx-auto" />
                  <p>Java course preview video would play here</p>
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

export default JavaProgrammingCourse;