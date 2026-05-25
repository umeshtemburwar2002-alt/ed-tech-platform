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
  FaGithub,
  FaCodeBranch,
  FaUsers as FaTeam,
  FaHistory
} from 'react-icons/fa';
import Footer from '../../components/common/Footer';

const GitGitHubCourse = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Course data
  const courseData = {
    id: 9,
    title: "Git & GitHub Version Control - Complete Guide",
    subtitle: "Master version control with Git and collaborate on GitHub",
    description: "Learn Git version control from basics to advanced workflows. Master GitHub collaboration, branching strategies, and team development practices. Essential skills for every developer.",
    instructor: {
      name: "Arjun Sharma",
      title: "Senior DevOps Engineer & Git Expert",
      experience: "8+ years",
      students: "25,000+",
      rating: 4.9,
      bio: "Arjun Sharma is a senior DevOps engineer with over 8 years of experience in version control and collaborative development. He has worked with distributed teams and has been teaching Git workflows for over 5 years.",
      image: null
    },
    stats: {
      rating: 4.9,
      reviews: 1234,
      students: 5670,
      duration: "8 weeks",
      lectures: 65,
      projects: 8,
      level: "Beginner",
      language: "English",
      lastUpdated: "December 2024"
    },
    pricing: {
      current: 1999,
      original: 3999,
      discount: 50
    },
    features: [
      "65 hours of comprehensive Git content",
      "100+ hands-on exercises",
      "8 real-world collaboration projects",
      "Git command line mastery",
      "GitHub workflow automation",
      "Branching and merging strategies",
      "Team collaboration best practices",
      "CI/CD integration with Git",
      "Open source contribution guide",
      "Lifetime access to course materials",
      "Industry-recognized certificate",
      "30-day money-back guarantee",
      "Direct instructor support"
    ],
    curriculum: [
      {
        id: 1,
        title: "Git Fundamentals",
        duration: "3 hours",
        lectures: 8,
        description: "Get started with Git version control basics",
        lessons: [
          { title: "What is Version Control?", duration: "20 min", type: "video", free: true },
          { title: "Installing Git", duration: "15 min", type: "video", free: true },
          { title: "Git Configuration", duration: "20 min", type: "video", free: true },
          { title: "Creating Your First Repository", duration: "25 min", type: "video", free: false },
          { title: "Basic Git Commands", duration: "30 min", type: "video", free: false },
          { title: "Working Directory, Staging, and Repository", duration: "25 min", type: "video", free: false },
          { title: "Git Fundamentals Practice", duration: "35 min", type: "exercise", free: false },
          { title: "Module 1 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 2,
        title: "Basic Git Operations",
        duration: "4 hours",
        lectures: 10,
        description: "Master essential Git commands and workflows",
        lessons: [
          { title: "git add and git commit", duration: "25 min", type: "video", free: false },
          { title: "git status and git log", duration: "20 min", type: "video", free: false },
          { title: "git diff and git show", duration: "25 min", type: "video", free: false },
          { title: "Undoing Changes (git reset, git revert)", duration: "30 min", type: "video", free: false },
          { title: "Working with .gitignore", duration: "20 min", type: "video", free: false },
          { title: "Git Aliases and Shortcuts", duration: "15 min", type: "video", free: false },
          { title: "File Operations (git mv, git rm)", duration: "20 min", type: "video", free: false },
          { title: "Git History and Navigation", duration: "25 min", type: "video", free: false },
          { title: "Basic Operations Practice", duration: "40 min", type: "exercise", free: false },
          { title: "Module 2 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 3,
        title: "Branching and Merging",
        duration: "5 hours",
        lectures: 12,
        description: "Master Git branching strategies and merge workflows",
        lessons: [
          { title: "Understanding Branches", duration: "25 min", type: "video", free: false },
          { title: "Creating and Switching Branches", duration: "20 min", type: "video", free: false },
          { title: "Branch Management", duration: "25 min", type: "video", free: false },
          { title: "Merging Branches", duration: "30 min", type: "video", free: false },
          { title: "Merge Conflicts Resolution", duration: "35 min", type: "video", free: false },
          { title: "Fast-forward vs Three-way Merge", duration: "25 min", type: "video", free: false },
          { title: "Git Rebase Basics", duration: "30 min", type: "video", free: false },
          { title: "Interactive Rebase", duration: "25 min", type: "video", free: false },
          { title: "Cherry-picking Commits", duration: "20 min", type: "video", free: false },
          { title: "Branching Strategies (Git Flow, GitHub Flow)", duration: "30 min", type: "video", free: false },
          { title: "Branching Practice Project", duration: "60 min", type: "project", free: false },
          { title: "Module 3 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 4,
        title: "Remote Repositories",
        duration: "4 hours",
        lectures: 10,
        description: "Work with remote repositories and collaboration",
        lessons: [
          { title: "Understanding Remote Repositories", duration: "25 min", type: "video", free: false },
          { title: "git clone and git remote", duration: "20 min", type: "video", free: false },
          { title: "git fetch vs git pull", duration: "25 min", type: "video", free: false },
          { title: "git push and Upstream Branches", duration: "25 min", type: "video", free: false },
          { title: "Multiple Remotes", duration: "20 min", type: "video", free: false },
          { title: "Tracking Branches", duration: "20 min", type: "video", free: false },
          { title: "Remote Branch Management", duration: "25 min", type: "video", free: false },
          { title: "Synchronizing with Remote", duration: "25 min", type: "video", free: false },
          { title: "Remote Collaboration Practice", duration: "50 min", type: "exercise", free: false },
          { title: "Module 4 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 5,
        title: "GitHub Essentials",
        duration: "6 hours",
        lectures: 14,
        description: "Master GitHub platform and collaboration features",
        lessons: [
          { title: "Introduction to GitHub", duration: "20 min", type: "video", free: false },
          { title: "Creating GitHub Account and Repositories", duration: "25 min", type: "video", free: false },
          { title: "GitHub Interface and Navigation", duration: "20 min", type: "video", free: false },
          { title: "README Files and Documentation", duration: "25 min", type: "video", free: false },
          { title: "Issues and Bug Tracking", duration: "30 min", type: "video", free: false },
          { title: "Pull Requests and Code Review", duration: "35 min", type: "video", free: false },
          { title: "GitHub Projects and Boards", duration: "25 min", type: "video", free: false },
          { title: "GitHub Pages and Hosting", duration: "25 min", type: "video", free: false },
          { title: "GitHub Actions Basics", duration: "30 min", type: "video", free: false },
          { title: "Forking and Contributing", duration: "25 min", type: "video", free: false },
          { title: "GitHub Security Features", duration: "20 min", type: "video", free: false },
          { title: "GitHub CLI", duration: "20 min", type: "video", free: false },
          { title: "GitHub Collaboration Project", duration: "80 min", type: "project", free: false },
          { title: "Module 5 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 6,
        title: "Advanced Git Techniques",
        duration: "4 hours",
        lectures: 10,
        description: "Master advanced Git features and workflows",
        lessons: [
          { title: "Git Stash and Temporary Storage", duration: "25 min", type: "video", free: false },
          { title: "Git Tags and Releases", duration: "20 min", type: "video", free: false },
          { title: "Git Hooks and Automation", duration: "30 min", type: "video", free: false },
          { title: "Git Submodules", duration: "25 min", type: "video", free: false },
          { title: "Git Worktrees", duration: "20 min", type: "video", free: false },
          { title: "Git Bisect for Debugging", duration: "25 min", type: "video", free: false },
          { title: "Git Reflog and Recovery", duration: "20 min", type: "video", free: false },
          { title: "Performance and Optimization", duration: "20 min", type: "video", free: false },
          { title: "Advanced Techniques Practice", duration: "45 min", type: "exercise", free: false },
          { title: "Module 6 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 7,
        title: "Team Collaboration & Workflows",
        duration: "5 hours",
        lectures: 12,
        description: "Learn professional team collaboration practices",
        lessons: [
          { title: "Team Workflow Strategies", duration: "30 min", type: "video", free: false },
          { title: "Code Review Best Practices", duration: "25 min", type: "video", free: false },
          { title: "Continuous Integration with Git", duration: "30 min", type: "video", free: false },
          { title: "Release Management", duration: "25 min", type: "video", free: false },
          { title: "Hotfix Workflows", duration: "20 min", type: "video", free: false },
          { title: "Large Team Collaboration", duration: "25 min", type: "video", free: false },
          { title: "Open Source Contribution", duration: "30 min", type: "video", free: false },
          { title: "Git in Enterprise Environments", duration: "25 min", type: "video", free: false },
          { title: "Troubleshooting Common Issues", duration: "25 min", type: "video", free: false },
          { title: "Git Security and Permissions", duration: "20 min", type: "video", free: false },
          { title: "Team Collaboration Project", duration: "90 min", type: "project", free: false },
          { title: "Module 7 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 8,
        title: "Real-World Projects & Portfolio",
        duration: "6 hours",
        lectures: 9,
        description: "Build comprehensive Git projects for your portfolio",
        lessons: [
          { title: "Project Planning with Git", duration: "30 min", type: "video", free: false },
          { title: "Project 1: Personal Portfolio Website", duration: "80 min", type: "project", free: false },
          { title: "Project 2: Open Source Contribution", duration: "90 min", type: "project", free: false },
          { title: "Project 3: Team Development Simulation", duration: "100 min", type: "project", free: false },
          { title: "Project 4: CI/CD Pipeline Setup", duration: "85 min", type: "project", free: false },
          { title: "Git Portfolio Development", duration: "30 min", type: "video", free: false },
          { title: "GitHub Profile Optimization", duration: "25 min", type: "video", free: false },
          { title: "Career Guidance for Developers", duration: "20 min", type: "video", free: false },
          { title: "Final Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        name: "Rahul Verma",
        rating: 5,
        date: "1 week ago",
        comment: "Excellent Git course! Arjun explains version control concepts very clearly. The GitHub collaboration section was particularly valuable for my team projects. Highly recommend!",
        helpful: 67
      },
      {
        id: 2,
        name: "Priya Singh",
        rating: 5,
        date: "2 weeks ago",
        comment: "Best Git course for beginners. Great progression from basic commands to advanced workflows. The branching strategies section helped me understand professional development practices.",
        helpful: 54
      },
      {
        id: 3,
        name: "Amit Kumar",
        rating: 4,
        date: "3 weeks ago",
        comment: "Very comprehensive course with practical examples. Would have liked more advanced Git hooks content, but excellent for learning Git fundamentals and GitHub collaboration.",
        helpful: 41
      },
      {
        id: 4,
        name: "Sneha Patel",
        rating: 5,
        date: "1 month ago",
        comment: "Outstanding instructor and course structure. The team collaboration section was exactly what I needed for my software development career. Great value for money!",
        helpful: 48
      }
    ],
    prerequisites: [
      "Basic computer literacy",
      "Familiarity with command line/terminal (helpful but not required)",
      "Understanding of file systems and directories",
      "No prior programming experience required",
      "Willingness to practice and work with code repositories"
    ],
    tools: [
      "Git (latest version)",
      "GitHub Account",
      "Command Line/Terminal",
      "Text Editor (VS Code recommended)",
      "Web Browser",
      "GitHub Desktop (optional)",
      "Git GUI Tools (optional)"
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
    console.log('Enrolling in Git & GitHub course...');
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
      <div className="bg-gradient-to-r from-gray-900 to-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {courseData.stats.level}
                  </span>
                  <span className="bg-yellow-50 text-richblack-900 px-3 py-1 rounded-full text-sm font-semibold">
                    Essential Skill
                  </span>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Developer Must-Have
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
                  <FaGithub className="text-gray-400" />
                  <span>Git {courseData.stats.projects} projects</span>
                </div>
              </div>

              {/* Tech Stack Icons */}
              <div className="flex items-center space-x-4 mb-6">
                <FaGithub className="text-gray-400 text-2xl" title="GitHub" />
                <FaCodeBranch className="text-green-400 text-2xl" title="Git Branching" />
                <FaTeam className="text-blue-400 text-2xl" title="Team Collaboration" />
                <FaHistory className="text-yellow-400 text-2xl" title="Version History" />
              </div>

              {/* Instructor Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                  <FaGithub className="text-white" />
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
                  className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <FaPlay className="text-sm" />
                  <span>{isEnrolled ? 'Continue Learning' : 'Enroll Now'}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-richblack-600 text-richblack-300 px-8 py-3 rounded-lg font-semibold hover:border-gray-500 hover:text-gray-400 transition-colors flex items-center space-x-2"
                >
                  <FaBookmark className="text-sm" />
                  <span>Save for Later</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-richblack-600 text-richblack-300 px-8 py-3 rounded-lg font-semibold hover:border-gray-500 hover:text-gray-400 transition-colors flex items-center space-x-2"
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
                    className="w-16 h-16 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
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
                    className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors mb-4"
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
                  ? 'text-gray-400 border-b-2 border-gray-400'
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
                    "Master Git version control fundamentals",
                    "Create and manage Git repositories",
                    "Understand branching and merging strategies",
                    "Collaborate effectively using GitHub",
                    "Resolve merge conflicts professionally",
                    "Implement team development workflows",
                    "Use advanced Git features and commands",
                    "Set up CI/CD pipelines with Git",
                    "Contribute to open source projects",
                    "Build a professional GitHub profile",
                    "Understand Git best practices",
                    "Prepare for developer collaboration"
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
                    This comprehensive Git and GitHub course is designed to take you from a complete beginner 
                    to a proficient version control user. You'll learn essential Git commands, branching strategies, 
                    and collaborative development practices used by professional development teams.
                  </p>
                  <p>
                    The course covers everything from basic Git operations to advanced workflows including 
                    rebasing, cherry-picking, and team collaboration strategies. Each module includes hands-on 
                    exercises with real repositories and practical projects that simulate professional development scenarios.
                  </p>
                  <p>
                    By the end of this course, you'll have built several collaborative projects including 
                    a personal portfolio website, contributed to open source projects, and set up automated 
                    CI/CD pipelines. These projects will demonstrate your ability to work effectively in 
                    team development environments.
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
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
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
                        className="bg-gray-900 text-gray-300 px-3 py-1 rounded-full text-sm"
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
                <h3 className="text-lg font-semibold text-richblack-5">Git & GitHub Course Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-richblack-400 hover:text-richblack-300 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video bg-richblack-700 flex items-center justify-center">
                <div className="text-center text-richblack-400">
                  <FaGithub className="text-6xl mb-4 mx-auto text-gray-400" />
                  <p>Git & GitHub course preview video would play here</p>
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

export default GitGitHubCourse;