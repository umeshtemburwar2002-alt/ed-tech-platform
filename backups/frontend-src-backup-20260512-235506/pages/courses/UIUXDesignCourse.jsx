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
  FaPalette,
  FaPencilRuler,
  FaEye,
  FaLightbulb
} from 'react-icons/fa';
import Footer from '../../components/common/Footer';

const UIUXDesignCourse = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Course data
  const courseData = {
    id: 12,
    title: "UI/UX Design with Figma - Complete Design Mastery",
    subtitle: "Design beautiful and user-friendly interfaces with Figma",
    description: "Master UI/UX design principles and create stunning user interfaces with Figma. Learn design thinking, user research, prototyping, and build a professional design portfolio.",
    instructor: {
      name: "Priya Sharma",
      title: "Senior UI/UX Designer & Design Lead",
      experience: "8+ years",
      students: "22,000+",
      rating: 4.8,
      bio: "Priya Sharma is a senior UI/UX designer with over 8 years of experience in product design. She has worked with leading tech companies and startups to create user-centered design solutions.",
      image: null
    },
    stats: {
      rating: 4.8,
      reviews: 1432,
      students: 5670,
      duration: "10 weeks",
      lectures: 68,
      projects: 8,
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
      "68 hours of comprehensive design content",
      "90+ hands-on design exercises",
      "8 real-world design projects",
      "Figma mastery from basics to advanced",
      "Design system creation",
      "User research and testing",
      "Prototyping and wireframing",
      "Portfolio development guidance",
      "Industry design trends",
      "Lifetime access to course materials",
      "Industry-recognized certificate",
      "30-day money-back guarantee",
      "Direct instructor support"
    ],
    curriculum: [
      {
        id: 1,
        title: "Design Fundamentals",
        duration: "3 hours",
        lectures: 8,
        description: "Introduction to UI/UX design principles and concepts",
        lessons: [
          { title: "What is UI/UX Design?", duration: "25 min", type: "video", free: true },
          { title: "Design Thinking Process", duration: "30 min", type: "video", free: true },
          { title: "User-Centered Design", duration: "20 min", type: "video", free: true },
          { title: "Design Principles and Elements", duration: "25 min", type: "video", free: false },
          { title: "Color Theory for Designers", duration: "20 min", type: "video", free: false },
          { title: "Typography Fundamentals", duration: "25 min", type: "video", free: false },
          { title: "Layout and Composition", duration: "20 min", type: "video", free: false },
          { title: "Design Fundamentals Exercise", duration: "35 min", type: "exercise", free: false }
        ]
      },
      {
        id: 2,
        title: "Figma Basics",
        duration: "4 hours",
        lectures: 10,
        description: "Master Figma interface and basic design tools",
        lessons: [
          { title: "Figma Interface Overview", duration: "20 min", type: "video", free: false },
          { title: "Creating Your First Design", duration: "25 min", type: "video", free: false },
          { title: "Shapes and Vector Tools", duration: "25 min", type: "video", free: false },
          { title: "Text and Typography in Figma", duration: "20 min", type: "video", free: false },
          { title: "Colors and Gradients", duration: "20 min", type: "video", free: false },
          { title: "Images and Icons", duration: "25 min", type: "video", free: false },
          { title: "Layers and Organization", duration: "20 min", type: "video", free: false },
          { title: "Figma Shortcuts and Tips", duration: "15 min", type: "video", free: false },
          { title: "Figma Basics Practice", duration: "45 min", type: "exercise", free: false },
          { title: "Module 2 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 3,
        title: "User Research & Analysis",
        duration: "4 hours",
        lectures: 10,
        description: "Understand users and conduct effective research",
        lessons: [
          { title: "Introduction to User Research", duration: "25 min", type: "video", free: false },
          { title: "User Personas Creation", duration: "30 min", type: "video", free: false },
          { title: "User Journey Mapping", duration: "25 min", type: "video", free: false },
          { title: "Competitive Analysis", duration: "20 min", type: "video", free: false },
          { title: "Surveys and Interviews", duration: "25 min", type: "video", free: false },
          { title: "Usability Testing", duration: "30 min", type: "video", free: false },
          { title: "Analytics and Data Analysis", duration: "20 min", type: "video", free: false },
          { title: "Research Synthesis", duration: "20 min", type: "video", free: false },
          { title: "User Research Project", duration: "60 min", type: "project", free: false },
          { title: "Module 3 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 4,
        title: "Wireframing & Information Architecture",
        duration: "5 hours",
        lectures: 12,
        description: "Create wireframes and organize information effectively",
        lessons: [
          { title: "Information Architecture Basics", duration: "25 min", type: "video", free: false },
          { title: "Site Maps and User Flows", duration: "30 min", type: "video", free: false },
          { title: "Low-Fidelity Wireframes", duration: "25 min", type: "video", free: false },
          { title: "Mid-Fidelity Wireframes", duration: "25 min", type: "video", free: false },
          { title: "Wireframing in Figma", duration: "30 min", type: "video", free: false },
          { title: "Mobile Wireframing", duration: "25 min", type: "video", free: false },
          { title: "Responsive Wireframes", duration: "25 min", type: "video", free: false },
          { title: "Wireframe Testing", duration: "20 min", type: "video", free: false },
          { title: "Content Strategy", duration: "20 min", type: "video", free: false },
          { title: "Navigation Design", duration: "25 min", type: "video", free: false },
          { title: "Wireframing Project", duration: "70 min", type: "project", free: false },
          { title: "Module 4 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 5,
        title: "Visual Design & UI Creation",
        duration: "6 hours",
        lectures: 14,
        description: "Create beautiful and functional user interfaces",
        lessons: [
          { title: "Visual Design Principles", duration: "25 min", type: "video", free: false },
          { title: "Creating Style Guides", duration: "30 min", type: "video", free: false },
          { title: "Component Design", duration: "25 min", type: "video", free: false },
          { title: "Button and Form Design", duration: "25 min", type: "video", free: false },
          { title: "Icon Design and Usage", duration: "20 min", type: "video", free: false },
          { title: "Image Treatment", duration: "20 min", type: "video", free: false },
          { title: "Grid Systems", duration: "25 min", type: "video", free: false },
          { title: "Spacing and Alignment", duration: "20 min", type: "video", free: false },
          { title: "Mobile UI Design", duration: "30 min", type: "video", free: false },
          { title: "Web UI Design", duration: "30 min", type: "video", free: false },
          { title: "Dark Mode Design", duration: "20 min", type: "video", free: false },
          { title: "Accessibility in Design", duration: "25 min", type: "video", free: false },
          { title: "UI Design Project", duration: "80 min", type: "project", free: false },
          { title: "Module 5 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 6,
        title: "Prototyping & Interaction Design",
        duration: "5 hours",
        lectures: 12,
        description: "Create interactive prototypes and design animations",
        lessons: [
          { title: "Introduction to Prototyping", duration: "20 min", type: "video", free: false },
          { title: "Figma Prototyping Tools", duration: "30 min", type: "video", free: false },
          { title: "Creating Interactions", duration: "25 min", type: "video", free: false },
          { title: "Transitions and Animations", duration: "25 min", type: "video", free: false },
          { title: "Micro-interactions", duration: "25 min", type: "video", free: false },
          { title: "Mobile Prototyping", duration: "25 min", type: "video", free: false },
          { title: "Web Prototyping", duration: "25 min", type: "video", free: false },
          { title: "Advanced Prototyping", duration: "30 min", type: "video", free: false },
          { title: "Prototype Testing", duration: "25 min", type: "video", free: false },
          { title: "Sharing and Collaboration", duration: "20 min", type: "video", free: false },
          { title: "Interactive Prototype Project", duration: "75 min", type: "project", free: false },
          { title: "Module 6 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 7,
        title: "Design Systems & Advanced Figma",
        duration: "4 hours",
        lectures: 10,
        description: "Build scalable design systems and master advanced Figma features",
        lessons: [
          { title: "Introduction to Design Systems", duration: "25 min", type: "video", free: false },
          { title: "Component Libraries", duration: "30 min", type: "video", free: false },
          { title: "Design Tokens", duration: "25 min", type: "video", free: false },
          { title: "Auto Layout in Figma", duration: "25 min", type: "video", free: false },
          { title: "Variants and Properties", duration: "25 min", type: "video", free: false },
          { title: "Team Libraries", duration: "20 min", type: "video", free: false },
          { title: "Version Control", duration: "20 min", type: "video", free: false },
          { title: "Plugins and Integrations", duration: "20 min", type: "video", free: false },
          { title: "Design System Project", duration: "65 min", type: "project", free: false },
          { title: "Module 7 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 8,
        title: "Portfolio & Career Development",
        duration: "3 hours",
        lectures: 8,
        description: "Build a professional design portfolio and advance your career",
        lessons: [
          { title: "Portfolio Planning", duration: "25 min", type: "video", free: false },
          { title: "Case Study Creation", duration: "30 min", type: "video", free: false },
          { title: "Portfolio Website Design", duration: "25 min", type: "video", free: false },
          { title: "Presenting Your Work", duration: "20 min", type: "video", free: false },
          { title: "Design Interview Preparation", duration: "25 min", type: "video", free: false },
          { title: "Freelancing as a Designer", duration: "20 min", type: "video", free: false },
          { title: "Portfolio Development Project", duration: "60 min", type: "project", free: false },
          { title: "Final Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        name: "Anjali Gupta",
        rating: 5,
        date: "1 week ago",
        comment: "Excellent UI/UX course! Priya explains design concepts very clearly. The Figma tutorials were practical and helped me create my first professional portfolio. Highly recommend!",
        helpful: 87
      },
      {
        id: 2,
        name: "Rohit Kumar",
        rating: 5,
        date: "2 weeks ago",
        comment: "Best design course for beginners. Great progression from basics to advanced topics. The portfolio section was particularly valuable for my career transition into design.",
        helpful: 74
      },
      {
        id: 3,
        name: "Neha Singh",
        rating: 4,
        date: "3 weeks ago",
        comment: "Very comprehensive course with practical examples. Would have liked more advanced animation topics, but excellent for learning UI/UX fundamentals and Figma.",
        helpful: 61
      },
      {
        id: 4,
        name: "Vikash Sharma",
        rating: 5,
        date: "1 month ago",
        comment: "Outstanding instructor and course structure. The design system section was exactly what I needed for my product design role. Great value for money!",
        helpful: 69
      }
    ],
    prerequisites: [
      "Basic computer literacy",
      "Creative mindset and interest in design",
      "No prior design experience required",
      "Willingness to practice and experiment",
      "Access to Figma (free account available)"
    ],
    tools: [
      "Figma (Primary Tool)",
      "FigJam (Brainstorming)",
      "Adobe Creative Suite (Optional)",
      "Sketch (Alternative)",
      "InVision (Prototyping)",
      "Miro (User Research)",
      "Notion (Documentation)",
      "Unsplash (Stock Images)"
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
    console.log('Enrolling in UI/UX Design course...');
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
      <div className="bg-gradient-to-r from-pink-900 to-purple-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {courseData.stats.level}
                  </span>
                  <span className="bg-yellow-50 text-richblack-900 px-3 py-1 rounded-full text-sm font-semibold">
                    Design Focus
                  </span>
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Creative Skills
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
                  <FaPalette className="text-pink-400" />
                  <span>Design {courseData.stats.projects} projects</span>
                </div>
              </div>

              {/* Tech Stack Icons */}
              <div className="flex items-center space-x-4 mb-6">
                <FaPalette className="text-pink-400 text-2xl" title="UI/UX Design" />
                <FaPencilRuler className="text-purple-400 text-2xl" title="Design Tools" />
                <FaEye className="text-blue-400 text-2xl" title="User Experience" />
                <FaLightbulb className="text-yellow-400 text-2xl" title="Creative Thinking" />
              </div>

              {/* Instructor Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center">
                  <FaPalette className="text-white" />
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
                  className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors flex items-center space-x-2"
                >
                  <FaPlay className="text-sm" />
                  <span>{isEnrolled ? 'Continue Learning' : 'Enroll Now'}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-richblack-600 text-richblack-300 px-8 py-3 rounded-lg font-semibold hover:border-pink-500 hover:text-pink-400 transition-colors flex items-center space-x-2"
                >
                  <FaBookmark className="text-sm" />
                  <span>Save for Later</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-richblack-600 text-richblack-300 px-8 py-3 rounded-lg font-semibold hover:border-pink-500 hover:text-pink-400 transition-colors flex items-center space-x-2"
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
                    className="w-16 h-16 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
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
                    className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors mb-4"
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
                  ? 'text-pink-400 border-b-2 border-pink-400'
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
                    "Master UI/UX design principles and best practices",
                    "Create professional designs using Figma",
                    "Conduct user research and usability testing",
                    "Design wireframes and information architecture",
                    "Build interactive prototypes and animations",
                    "Develop comprehensive design systems",
                    "Create responsive and accessible designs",
                    "Build a professional design portfolio",
                    "Understand design thinking methodology",
                    "Apply visual design and typography skills",
                    "Prepare for design career opportunities",
                    "Collaborate effectively with development teams"
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
                    This comprehensive UI/UX design course is designed to take you from a complete beginner 
                    to a proficient designer. You'll learn design thinking, user research, and create stunning 
                    user interfaces using Figma, the industry-standard design tool.
                  </p>
                  <p>
                    The course covers everything from design fundamentals to advanced prototyping and design 
                    systems. Each module includes hands-on projects that simulate real-world design challenges 
                    and help you build a professional portfolio.
                  </p>
                  <p>
                    By the end of this course, you'll have created several design projects including 
                    mobile apps, websites, and design systems. These projects will demonstrate your 
                    ability to solve complex design problems and create user-centered solutions.
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
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
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
                        className="bg-pink-900 text-pink-300 px-3 py-1 rounded-full text-sm"
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
                <h3 className="text-lg font-semibold text-richblack-5">UI/UX Design Course Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-richblack-400 hover:text-richblack-300 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video bg-richblack-700 flex items-center justify-center">
                <div className="text-center text-richblack-400">
                  <FaPalette className="text-6xl mb-4 mx-auto text-pink-400" />
                  <p>UI/UX Design course preview video would play here</p>
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

export default UIUXDesignCourse;