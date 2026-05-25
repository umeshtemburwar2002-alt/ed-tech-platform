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
  FaDocker,
  FaServer,
  FaCube,
  FaCloud
} from 'react-icons/fa';
import Footer from '../../components/common/Footer';

const DockerKubernetesCourse = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Course data
  const courseData = {
    id: 16,
    title: "Docker & Kubernetes - Complete DevOps Containerization",
    subtitle: "Master containerization and orchestration with Docker and Kubernetes",
    description: "Learn Docker containerization and Kubernetes orchestration from basics to advanced concepts. Master container deployment, scaling, monitoring, and DevOps best practices for modern applications.",
    instructor: {
      name: "Suresh Kumar",
      title: "Senior DevOps Engineer & Kubernetes Expert",
      experience: "11+ years",
      students: "30,000+",
      rating: 4.9,
      bio: "Suresh Kumar is a senior DevOps engineer with over 11 years of experience in containerization and orchestration. He has implemented Docker and Kubernetes solutions for numerous enterprise organizations.",
      image: null
    },
    stats: {
      rating: 4.9,
      reviews: 2156,
      students: 7890,
      duration: "15 weeks",
      lectures: 89,
      projects: 14,
      level: "Intermediate",
      language: "English",
      lastUpdated: "December 2024"
    },
    pricing: {
      current: 3599,
      original: 7199,
      discount: 50
    },
    features: [
      "89 hours of comprehensive Docker & Kubernetes content",
      "130+ hands-on containerization exercises",
      "14 real-world DevOps projects",
      "Docker fundamentals to advanced concepts",
      "Kubernetes cluster management",
      "Container orchestration mastery",
      "CI/CD pipeline integration",
      "Monitoring and logging solutions",
      "Production deployment strategies",
      "Lifetime access to course materials",
      "Industry-recognized certificate",
      "30-day money-back guarantee",
      "Direct instructor support"
    ],
    curriculum: [
      {
        id: 1,
        title: "Introduction to Containerization",
        duration: "3 hours",
        lectures: 8,
        description: "Understanding containerization concepts and benefits",
        lessons: [
          { title: "What is Containerization?", duration: "25 min", type: "video", free: true },
          { title: "Containers vs Virtual Machines", duration: "20 min", type: "video", free: true },
          { title: "Benefits of Containerization", duration: "20 min", type: "video", free: true },
          { title: "Container Ecosystem Overview", duration: "25 min", type: "video", free: false },
          { title: "Development Environment Setup", duration: "30 min", type: "video", free: false },
          { title: "Container Use Cases", duration: "20 min", type: "video", free: false },
          { title: "Containerization Best Practices", duration: "25 min", type: "video", free: false },
          { title: "Module 1 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 2,
        title: "Docker Fundamentals",
        duration: "5 hours",
        lectures: 12,
        description: "Master Docker basics and container management",
        lessons: [
          { title: "Docker Installation and Setup", duration: "25 min", type: "video", free: false },
          { title: "Docker Architecture", duration: "25 min", type: "video", free: false },
          { title: "Images and Containers", duration: "30 min", type: "video", free: false },
          { title: "Docker Commands Essentials", duration: "25 min", type: "video", free: false },
          { title: "Working with Docker Images", duration: "25 min", type: "video", free: false },
          { title: "Container Lifecycle Management", duration: "25 min", type: "video", free: false },
          { title: "Docker Hub and Registries", duration: "20 min", type: "video", free: false },
          { title: "Data Persistence with Volumes", duration: "25 min", type: "video", free: false },
          { title: "Container Networking Basics", duration: "25 min", type: "video", free: false },
          { title: "Environment Variables", duration: "15 min", type: "video", free: false },
          { title: "Docker Fundamentals Lab", duration: "60 min", type: "exercise", free: false },
          { title: "Module 2 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 3,
        title: "Dockerfile and Image Building",
        duration: "4 hours",
        lectures: 10,
        description: "Create custom Docker images and optimize builds",
        lessons: [
          { title: "Dockerfile Syntax and Instructions", duration: "30 min", type: "video", free: false },
          { title: "Building Custom Images", duration: "25 min", type: "video", free: false },
          { title: "Multi-stage Builds", duration: "25 min", type: "video", free: false },
          { title: "Image Optimization Techniques", duration: "25 min", type: "video", free: false },
          { title: "Build Context and .dockerignore", duration: "20 min", type: "video", free: false },
          { title: "Image Tagging and Versioning", duration: "20 min", type: "video", free: false },
          { title: "Security Best Practices", duration: "25 min", type: "video", free: false },
          { title: "Automated Image Builds", duration: "20 min", type: "video", free: false },
          { title: "Image Building Project", duration: "50 min", type: "project", free: false },
          { title: "Module 3 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 4,
        title: "Docker Compose",
        duration: "4 hours",
        lectures: 10,
        description: "Orchestrate multi-container applications with Docker Compose",
        lessons: [
          { title: "Introduction to Docker Compose", duration: "20 min", type: "video", free: false },
          { title: "Compose File Structure", duration: "25 min", type: "video", free: false },
          { title: "Services and Networks", duration: "25 min", type: "video", free: false },
          { title: "Volumes and Data Management", duration: "25 min", type: "video", free: false },
          { title: "Environment Configuration", duration: "20 min", type: "video", free: false },
          { title: "Scaling Services", duration: "20 min", type: "video", free: false },
          { title: "Health Checks and Dependencies", duration: "25 min", type: "video", free: false },
          { title: "Production Considerations", duration: "20 min", type: "video", free: false },
          { title: "Multi-Container Application Project", duration: "60 min", type: "project", free: false },
          { title: "Module 4 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 5,
        title: "Container Networking",
        duration: "4 hours",
        lectures: 10,
        description: "Master Docker networking and container communication",
        lessons: [
          { title: "Docker Networking Overview", duration: "25 min", type: "video", free: false },
          { title: "Bridge Networks", duration: "25 min", type: "video", free: false },
          { title: "Host and None Networks", duration: "20 min", type: "video", free: false },
          { title: "Custom Networks", duration: "25 min", type: "video", free: false },
          { title: "Container Communication", duration: "25 min", type: "video", free: false },
          { title: "Port Mapping and Exposure", duration: "20 min", type: "video", free: false },
          { title: "Network Security", duration: "25 min", type: "video", free: false },
          { title: "Troubleshooting Network Issues", duration: "20 min", type: "video", free: false },
          { title: "Networking Lab", duration: "50 min", type: "exercise", free: false },
          { title: "Module 5 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 6,
        title: "Introduction to Kubernetes",
        duration: "5 hours",
        lectures: 12,
        description: "Learn Kubernetes fundamentals and architecture",
        lessons: [
          { title: "What is Kubernetes?", duration: "25 min", type: "video", free: false },
          { title: "Kubernetes Architecture", duration: "30 min", type: "video", free: false },
          { title: "Cluster Components", duration: "25 min", type: "video", free: false },
          { title: "kubectl and API Server", duration: "25 min", type: "video", free: false },
          { title: "Pods and Containers", duration: "25 min", type: "video", free: false },
          { title: "Nodes and Scheduling", duration: "20 min", type: "video", free: false },
          { title: "Kubernetes Installation", duration: "30 min", type: "video", free: false },
          { title: "Minikube and Local Development", duration: "25 min", type: "video", free: false },
          { title: "Basic kubectl Commands", duration: "25 min", type: "video", free: false },
          { title: "YAML Manifests", duration: "25 min", type: "video", free: false },
          { title: "Kubernetes Basics Lab", duration: "60 min", type: "exercise", free: false },
          { title: "Module 6 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 7,
        title: "Kubernetes Workloads",
        duration: "6 hours",
        lectures: 14,
        description: "Deploy and manage applications with Kubernetes workloads",
        lessons: [
          { title: "Deployments and ReplicaSets", duration: "30 min", type: "video", free: false },
          { title: "Rolling Updates and Rollbacks", duration: "25 min", type: "video", free: false },
          { title: "StatefulSets", duration: "25 min", type: "video", free: false },
          { title: "DaemonSets", duration: "20 min", type: "video", free: false },
          { title: "Jobs and CronJobs", duration: "25 min", type: "video", free: false },
          { title: "Services and Load Balancing", duration: "30 min", type: "video", free: false },
          { title: "Ingress Controllers", duration: "25 min", type: "video", free: false },
          { title: "ConfigMaps and Secrets", duration: "25 min", type: "video", free: false },
          { title: "Persistent Volumes", duration: "25 min", type: "video", free: false },
          { title: "Resource Management", duration: "20 min", type: "video", free: false },
          { title: "Health Checks and Probes", duration: "25 min", type: "video", free: false },
          { title: "Horizontal Pod Autoscaling", duration: "20 min", type: "video", free: false },
          { title: "Workloads Deployment Project", duration: "70 min", type: "project", free: false },
          { title: "Module 7 Assessment", duration: "25 min", type: "quiz", free: false }
        ]
      },
      {
        id: 8,
        title: "Kubernetes Security",
        duration: "4 hours",
        lectures: 10,
        description: "Implement security best practices in Kubernetes",
        lessons: [
          { title: "Kubernetes Security Overview", duration: "25 min", type: "video", free: false },
          { title: "Authentication and Authorization", duration: "30 min", type: "video", free: false },
          { title: "Role-Based Access Control (RBAC)", duration: "25 min", type: "video", free: false },
          { title: "Service Accounts", duration: "20 min", type: "video", free: false },
          { title: "Network Policies", duration: "25 min", type: "video", free: false },
          { title: "Pod Security Standards", duration: "25 min", type: "video", free: false },
          { title: "Secrets Management", duration: "20 min", type: "video", free: false },
          { title: "Image Security Scanning", duration: "20 min", type: "video", free: false },
          { title: "Security Best Practices Lab", duration: "50 min", type: "exercise", free: false },
          { title: "Module 8 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 9,
        title: "Monitoring and Logging",
        duration: "5 hours",
        lectures: 12,
        description: "Monitor and troubleshoot containerized applications",
        lessons: [
          { title: "Monitoring Strategy", duration: "20 min", type: "video", free: false },
          { title: "Prometheus and Grafana", duration: "30 min", type: "video", free: false },
          { title: "Metrics Collection", duration: "25 min", type: "video", free: false },
          { title: "Alerting and Notifications", duration: "25 min", type: "video", free: false },
          { title: "Centralized Logging", duration: "25 min", type: "video", free: false },
          { title: "ELK Stack Integration", duration: "30 min", type: "video", free: false },
          { title: "Application Performance Monitoring", duration: "25 min", type: "video", free: false },
          { title: "Distributed Tracing", duration: "20 min", type: "video", free: false },
          { title: "Troubleshooting Techniques", duration: "25 min", type: "video", free: false },
          { title: "Debugging Containers", duration: "20 min", type: "video", free: false },
          { title: "Monitoring Setup Project", duration: "65 min", type: "project", free: false },
          { title: "Module 9 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 10,
        title: "Production Deployment & CI/CD",
        duration: "6 hours",
        lectures: 14,
        description: "Deploy containerized applications to production",
        lessons: [
          { title: "Production Readiness Checklist", duration: "25 min", type: "video", free: false },
          { title: "Cluster Setup and Management", duration: "30 min", type: "video", free: false },
          { title: "Cloud Provider Integration", duration: "25 min", type: "video", free: false },
          { title: "CI/CD Pipeline Design", duration: "25 min", type: "video", free: false },
          { title: "GitOps Workflows", duration: "25 min", type: "video", free: false },
          { title: "Automated Testing", duration: "25 min", type: "video", free: false },
          { title: "Blue-Green Deployments", duration: "25 min", type: "video", free: false },
          { title: "Canary Deployments", duration: "25 min", type: "video", free: false },
          { title: "Disaster Recovery", duration: "20 min", type: "video", free: false },
          { title: "Backup and Restore", duration: "20 min", type: "video", free: false },
          { title: "Performance Optimization", duration: "25 min", type: "video", free: false },
          { title: "Cost Optimization", duration: "20 min", type: "video", free: false },
          { title: "Production Deployment Project", duration: "90 min", type: "project", free: false },
          { title: "Final Assessment", duration: "25 min", type: "quiz", free: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        name: "Rahul Sharma",
        rating: 5,
        date: "1 week ago",
        comment: "Excellent Docker and Kubernetes course! Suresh explains containerization concepts very clearly. The hands-on projects were practical and helped me implement DevOps solutions. Highly recommend!",
        helpful: 98
      },
      {
        id: 2,
        name: "Anjali Gupta",
        rating: 5,
        date: "2 weeks ago",
        comment: "Best DevOps course for containerization. Great progression from Docker basics to advanced Kubernetes orchestration. The CI/CD integration section was particularly valuable for my DevOps career.",
        helpful: 85
      },
      {
        id: 3,
        name: "Vikash Kumar",
        rating: 5,
        date: "3 weeks ago",
        comment: "Very comprehensive course with practical examples. The monitoring and security sections were excellent for understanding production-ready deployments. Great value for money!",
        helpful: 79
      },
      {
        id: 4,
        name: "Priya Singh",
        rating: 4,
        date: "1 month ago",
        comment: "Outstanding instructor and course structure. The production deployment section was exactly what I needed for my cloud engineer role. Would have liked more advanced networking topics.",
        helpful: 72
      }
    ],
    prerequisites: [
      "Basic understanding of Linux command line",
      "Familiarity with software development concepts",
      "Basic knowledge of networking",
      "Understanding of cloud computing basics",
      "Experience with version control (Git)"
    ],
    tools: [
      "Docker",
      "Kubernetes",
      "kubectl",
      "Docker Compose",
      "Minikube",
      "Helm",
      "Prometheus",
      "Grafana",
      "Jenkins",
      "GitLab CI"
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
    console.log('Enrolling in Docker & Kubernetes course...');
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
                    DevOps
                  </span>
                  <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Containerization
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
                  <FaDocker className="text-blue-400" />
                  <span>DevOps {courseData.stats.projects} projects</span>
                </div>
              </div>

              {/* Tech Stack Icons */}
              <div className="flex items-center space-x-4 mb-6">
                <FaDocker className="text-blue-400 text-2xl" title="Docker" />
                <FaCube className="text-indigo-400 text-2xl" title="Kubernetes" />
                <FaServer className="text-green-400 text-2xl" title="Container Orchestration" />
                <FaCloud className="text-purple-400 text-2xl" title="Cloud Deployment" />
              </div>

              {/* Instructor Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <FaDocker className="text-white" />
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
                    "Master Docker containerization fundamentals",
                    "Build and optimize Docker images",
                    "Orchestrate containers with Docker Compose",
                    "Deploy and manage Kubernetes clusters",
                    "Implement container networking and storage",
                    "Configure Kubernetes workloads and services",
                    "Implement security best practices",
                    "Monitor and troubleshoot containerized applications",
                    "Build CI/CD pipelines for containers",
                    "Deploy applications to production",
                    "Understand DevOps containerization workflows",
                    "Optimize performance and costs"
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
                    This comprehensive Docker and Kubernetes course is designed to take you from containerization 
                    basics to advanced orchestration techniques. You'll learn to containerize applications, 
                    manage container lifecycles, and deploy scalable applications using industry-standard tools.
                  </p>
                  <p>
                    The course covers everything from Docker fundamentals to advanced Kubernetes concepts including 
                    security, monitoring, and production deployment strategies. Each module includes hands-on labs 
                    with real containerization scenarios and DevOps best practices.
                  </p>
                  <p>
                    By the end of this course, you'll have built several containerized applications including 
                    microservices architectures, CI/CD pipelines, and production-ready Kubernetes deployments. 
                    These projects will demonstrate your ability to implement modern DevOps containerization workflows.
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
                <h3 className="text-lg font-semibold text-richblack-5">Docker & Kubernetes Course Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-richblack-400 hover:text-richblack-300 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video bg-richblack-700 flex items-center justify-center">
                <div className="text-center text-richblack-400">
                  <FaDocker className="text-6xl mb-4 mx-auto text-blue-400" />
                  <p>Docker & Kubernetes course preview video would play here</p>
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

export default DockerKubernetesCourse;