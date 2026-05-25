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
  FaShieldAlt,
  FaNetworkWired,
  FaEye,
  FaBug
} from 'react-icons/fa';
import Footer from '../../components/common/Footer';

const NetworkSecurityCourse = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Course data
  const courseData = {
    id: 17,
    title: "Network Security - Secure Networks & Protect Against Cyber Threats",
    subtitle: "Secure networks and protect against cyber threats",
    description: "Master network security fundamentals, threat detection, and defense strategies. Learn to secure network infrastructure, implement firewalls, detect intrusions, and protect against cyber attacks.",
    instructor: {
      name: "Dr. Rajesh Gupta",
      title: "Cybersecurity Expert & Network Security Specialist",
      experience: "12+ years",
      students: "28,000+",
      rating: 4.9,
      bio: "Dr. Rajesh Gupta is a cybersecurity expert with over 12 years of experience in network security and threat analysis. He has worked with government agencies and Fortune 500 companies to secure critical infrastructure.",
      image: null
    },
    stats: {
      rating: 4.9,
      reviews: 1654,
      students: 4890,
      duration: "12 weeks",
      lectures: 78,
      projects: 10,
      level: "Intermediate",
      language: "English",
      lastUpdated: "December 2024"
    },
    pricing: {
      current: 3499,
      original: 6999,
      discount: 50
    },
    features: [
      "78 hours of network security content",
      "110+ hands-on security exercises",
      "10 real-world security projects",
      "Network vulnerability assessment",
      "Firewall configuration and management",
      "Intrusion detection and prevention",
      "Security monitoring and analysis",
      "Incident response procedures",
      "Compliance and risk management",
      "Lifetime access to course materials",
      "Industry-recognized certificate",
      "30-day money-back guarantee",
      "Direct instructor support"
    ],
    curriculum: [
      {
        id: 1,
        title: "Network Security Fundamentals",
        duration: "4 hours",
        lectures: 10,
        description: "Introduction to network security concepts and principles",
        lessons: [
          { title: "Introduction to Network Security", duration: "25 min", type: "video", free: true },
          { title: "Security Threats and Vulnerabilities", duration: "30 min", type: "video", free: true },
          { title: "CIA Triad: Confidentiality, Integrity, Availability", duration: "20 min", type: "video", free: true },
          { title: "Network Security Architecture", duration: "35 min", type: "video", free: false },
          { title: "Security Policies and Procedures", duration: "25 min", type: "video", free: false },
          { title: "Risk Assessment and Management", duration: "30 min", type: "video", free: false },
          { title: "Compliance and Regulations", duration: "25 min", type: "video", free: false },
          { title: "Security Frameworks (NIST, ISO 27001)", duration: "30 min", type: "video", free: false },
          { title: "Network Security Fundamentals Lab", duration: "40 min", type: "exercise", free: false },
          { title: "Module 1 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 2,
        title: "Network Infrastructure Security",
        duration: "5 hours",
        lectures: 12,
        description: "Secure network devices and infrastructure components",
        lessons: [
          { title: "Router and Switch Security", duration: "30 min", type: "video", free: false },
          { title: "VLAN Security and Segmentation", duration: "35 min", type: "video", free: false },
          { title: "Wireless Network Security", duration: "30 min", type: "video", free: false },
          { title: "Network Access Control (NAC)", duration: "25 min", type: "video", free: false },
          { title: "VPN Technologies and Implementation", duration: "35 min", type: "video", free: false },
          { title: "Network Protocols Security", duration: "25 min", type: "video", free: false },
          { title: "DNS Security and DNSSEC", duration: "25 min", type: "video", free: false },
          { title: "Network Time Protocol (NTP) Security", duration: "20 min", type: "video", free: false },
          { title: "SNMP Security", duration: "20 min", type: "video", free: false },
          { title: "Network Device Hardening", duration: "25 min", type: "video", free: false },
          { title: "Infrastructure Security Lab", duration: "50 min", type: "exercise", free: false },
          { title: "Module 2 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 3,
        title: "Firewalls and Network Defense",
        duration: "6 hours",
        lectures: 14,
        description: "Implement and manage firewall systems for network protection",
        lessons: [
          { title: "Firewall Types and Technologies", duration: "30 min", type: "video", free: false },
          { title: "Packet Filtering Firewalls", duration: "25 min", type: "video", free: false },
          { title: "Stateful Inspection Firewalls", duration: "30 min", type: "video", free: false },
          { title: "Application Layer Firewalls", duration: "25 min", type: "video", free: false },
          { title: "Next-Generation Firewalls (NGFW)", duration: "30 min", type: "video", free: false },
          { title: "Firewall Rule Configuration", duration: "35 min", type: "video", free: false },
          { title: "DMZ Design and Implementation", duration: "30 min", type: "video", free: false },
          { title: "Proxy Servers and Web Filtering", duration: "25 min", type: "video", free: false },
          { title: "Load Balancers and Security", duration: "25 min", type: "video", free: false },
          { title: "Firewall Monitoring and Logging", duration: "25 min", type: "video", free: false },
          { title: "Firewall Performance Optimization", duration: "20 min", type: "video", free: false },
          { title: "Firewall Configuration Lab", duration: "60 min", type: "exercise", free: false },
          { title: "Network Defense Project", duration: "80 min", type: "project", free: false },
          { title: "Module 3 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 4,
        title: "Intrusion Detection and Prevention",
        duration: "5 hours",
        lectures: 12,
        description: "Detect and prevent network intrusions and attacks",
        lessons: [
          { title: "IDS vs IPS: Concepts and Differences", duration: "25 min", type: "video", free: false },
          { title: "Network-based IDS/IPS (NIDS/NIPS)", duration: "30 min", type: "video", free: false },
          { title: "Host-based IDS/IPS (HIDS/HIPS)", duration: "25 min", type: "video", free: false },
          { title: "Signature-based Detection", duration: "25 min", type: "video", free: false },
          { title: "Anomaly-based Detection", duration: "30 min", type: "video", free: false },
          { title: "Behavioral Analysis", duration: "25 min", type: "video", free: false },
          { title: "SIEM Integration", duration: "30 min", type: "video", free: false },
          { title: "Alert Management and Tuning", duration: "25 min", type: "video", free: false },
          { title: "False Positive Reduction", duration: "20 min", type: "video", free: false },
          { title: "IDS/IPS Deployment Strategies", duration: "25 min", type: "video", free: false },
          { title: "Intrusion Detection Lab", duration: "55 min", type: "exercise", free: false },
          { title: "Module 4 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      },
      {
        id: 5,
        title: "Network Monitoring and Analysis",
        duration: "4 hours",
        lectures: 10,
        description: "Monitor network traffic and analyze security events",
        lessons: [
          { title: "Network Traffic Analysis", duration: "30 min", type: "video", free: false },
          { title: "Packet Capture and Analysis", duration: "35 min", type: "video", free: false },
          { title: "Wireshark for Security Analysis", duration: "30 min", type: "video", free: false },
          { title: "Flow-based Monitoring (NetFlow, sFlow)", duration: "25 min", type: "video", free: false },
          { title: "Security Information and Event Management (SIEM)", duration: "30 min", type: "video", free: false },
          { title: "Log Analysis and Correlation", duration: "25 min", type: "video", free: false },
          { title: "Threat Intelligence Integration", duration: "25 min", type: "video", free: false },
          { title: "Security Metrics and KPIs", duration: "20 min", type: "video", free: false },
          { title: "Network Monitoring Lab", duration: "50 min", type: "exercise", free: false },
          { title: "Module 5 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 6,
        title: "Vulnerability Assessment and Penetration Testing",
        duration: "6 hours",
        lectures: 14,
        description: "Assess network vulnerabilities and conduct security testing",
        lessons: [
          { title: "Vulnerability Assessment Methodology", duration: "25 min", type: "video", free: false },
          { title: "Network Scanning Techniques", duration: "30 min", type: "video", free: false },
          { title: "Port Scanning with Nmap", duration: "35 min", type: "video", free: false },
          { title: "Vulnerability Scanners (Nessus, OpenVAS)", duration: "30 min", type: "video", free: false },
          { title: "Web Application Security Testing", duration: "30 min", type: "video", free: false },
          { title: "Wireless Security Assessment", duration: "25 min", type: "video", free: false },
          { title: "Social Engineering Testing", duration: "25 min", type: "video", free: false },
          { title: "Penetration Testing Frameworks", duration: "25 min", type: "video", free: false },
          { title: "Metasploit for Network Testing", duration: "30 min", type: "video", free: false },
          { title: "Report Writing and Documentation", duration: "25 min", type: "video", free: false },
          { title: "Remediation Planning", duration: "20 min", type: "video", free: false },
          { title: "Vulnerability Assessment Lab", duration: "60 min", type: "exercise", free: false },
          { title: "Penetration Testing Project", duration: "90 min", type: "project", free: false },
          { title: "Module 6 Assessment", duration: "25 min", type: "quiz", free: false }
        ]
      },
      {
        id: 7,
        title: "Incident Response and Forensics",
        duration: "4 hours",
        lectures: 10,
        description: "Respond to security incidents and conduct digital forensics",
        lessons: [
          { title: "Incident Response Planning", duration: "25 min", type: "video", free: false },
          { title: "Incident Detection and Classification", duration: "25 min", type: "video", free: false },
          { title: "Containment and Eradication", duration: "30 min", type: "video", free: false },
          { title: "Recovery and Lessons Learned", duration: "25 min", type: "video", free: false },
          { title: "Digital Forensics Fundamentals", duration: "30 min", type: "video", free: false },
          { title: "Network Forensics Techniques", duration: "25 min", type: "video", free: false },
          { title: "Evidence Collection and Preservation", duration: "25 min", type: "video", free: false },
          { title: "Forensic Tools and Analysis", duration: "25 min", type: "video", free: false },
          { title: "Incident Response Simulation", duration: "60 min", type: "exercise", free: false },
          { title: "Module 7 Assessment", duration: "15 min", type: "quiz", free: false }
        ]
      },
      {
        id: 8,
        title: "Advanced Security Topics",
        duration: "5 hours",
        lectures: 12,
        description: "Explore advanced network security concepts and emerging threats",
        lessons: [
          { title: "Zero Trust Network Architecture", duration: "30 min", type: "video", free: false },
          { title: "Software-Defined Perimeter (SDP)", duration: "25 min", type: "video", free: false },
          { title: "Cloud Network Security", duration: "30 min", type: "video", free: false },
          { title: "IoT Security Challenges", duration: "25 min", type: "video", free: false },
          { title: "AI and Machine Learning in Security", duration: "30 min", type: "video", free: false },
          { title: "Blockchain and Network Security", duration: "25 min", type: "video", free: false },
          { title: "Advanced Persistent Threats (APTs)", duration: "25 min", type: "video", free: false },
          { title: "Threat Hunting Techniques", duration: "30 min", type: "video", free: false },
          { title: "Security Automation and Orchestration", duration: "25 min", type: "video", free: false },
          { title: "Future of Network Security", duration: "20 min", type: "video", free: false },
          { title: "Advanced Security Project", duration: "80 min", type: "project", free: false },
          { title: "Module 8 Assessment", duration: "20 min", type: "quiz", free: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        name: "Suresh Kumar",
        rating: 5,
        date: "1 week ago",
        comment: "Excellent network security course! Dr. Rajesh explains complex security concepts very clearly. The hands-on labs were practical and helped me understand real-world security implementations. Highly recommend!",
        helpful: 94
      },
      {
        id: 2,
        name: "Anita Sharma",
        rating: 5,
        date: "2 weeks ago",
        comment: "Best cybersecurity course I've taken. Great progression from fundamentals to advanced topics. The incident response section was particularly valuable for my security analyst role.",
        helpful: 81
      },
      {
        id: 3,
        name: "Vikram Singh",
        rating: 4,
        date: "3 weeks ago",
        comment: "Very comprehensive course with practical examples. Would have liked more hands-on penetration testing, but excellent for learning network security fundamentals.",
        helpful: 67
      },
      {
        id: 4,
        name: "Priya Patel",
        rating: 5,
        date: "1 month ago",
        comment: "Outstanding instructor and course structure. The vulnerability assessment section was exactly what I needed for my cybersecurity career transition. Great value for money!",
        helpful: 73
      }
    ],
    prerequisites: [
      "Basic understanding of computer networks",
      "Familiarity with TCP/IP protocols",
      "Basic knowledge of operating systems (Windows/Linux)",
      "Understanding of basic security concepts",
      "Command line experience (helpful but not required)"
    ],
    tools: [
      "Wireshark",
      "Nmap",
      "Nessus",
      "Metasploit",
      "pfSense",
      "Snort",
      "OSSEC",
      "Kali Linux",
      "VMware/VirtualBox",
      "SIEM Tools"
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
    console.log('Enrolling in Network Security course...');
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
      <div className="bg-gradient-to-r from-red-900 to-orange-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {courseData.stats.level}
                  </span>
                  <span className="bg-yellow-50 text-richblack-900 px-3 py-1 rounded-full text-sm font-semibold">
                    Cybersecurity
                  </span>
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    High Demand
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
                  <FaShieldAlt className="text-red-400" />
                  <span>Security {courseData.stats.projects} projects</span>
                </div>
              </div>

              {/* Tech Stack Icons */}
              <div className="flex items-center space-x-4 mb-6">
                <FaShieldAlt className="text-red-400 text-2xl" title="Network Security" />
                <FaNetworkWired className="text-blue-400 text-2xl" title="Network Infrastructure" />
                <FaEye className="text-green-400 text-2xl" title="Monitoring" />
                <FaBug className="text-orange-400 text-2xl" title="Threat Detection" />
              </div>

              {/* Instructor Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <FaShieldAlt className="text-white" />
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
                  className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center space-x-2"
                >
                  <FaPlay className="text-sm" />
                  <span>{isEnrolled ? 'Continue Learning' : 'Enroll Now'}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-richblack-600 text-richblack-300 px-8 py-3 rounded-lg font-semibold hover:border-red-500 hover:text-red-400 transition-colors flex items-center space-x-2"
                >
                  <FaBookmark className="text-sm" />
                  <span>Save for Later</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-richblack-600 text-richblack-300 px-8 py-3 rounded-lg font-semibold hover:border-red-500 hover:text-red-400 transition-colors flex items-center space-x-2"
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
                    className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
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
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors mb-4"
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
                  ? 'text-red-400 border-b-2 border-red-400'
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
                    "Master network security fundamentals and principles",
                    "Secure network infrastructure and devices",
                    "Configure and manage firewall systems",
                    "Implement intrusion detection and prevention",
                    "Monitor and analyze network traffic",
                    "Conduct vulnerability assessments",
                    "Respond to security incidents effectively",
                    "Understand compliance and risk management",
                    "Apply advanced security technologies",
                    "Build secure network architectures",
                    "Prepare for cybersecurity certifications",
                    "Develop incident response procedures"
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
                    This comprehensive network security course is designed to take you from basic networking knowledge 
                    to becoming a proficient cybersecurity professional. You'll learn to secure network infrastructure, 
                    detect threats, and implement robust defense strategies against cyber attacks.
                  </p>
                  <p>
                    The course covers everything from network security fundamentals to advanced topics like threat 
                    hunting and security automation. Each module includes hands-on labs with real security tools 
                    and practical projects that simulate enterprise security scenarios.
                  </p>
                  <p>
                    By the end of this course, you'll have built several security implementations including 
                    firewall configurations, intrusion detection systems, and incident response procedures. 
                    These projects will demonstrate your ability to secure networks in production environments.
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
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
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
                        className="bg-red-900 text-red-300 px-3 py-1 rounded-full text-sm"
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
                <h3 className="text-lg font-semibold text-richblack-5">Network Security Course Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-richblack-400 hover:text-richblack-300 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video bg-richblack-700 flex items-center justify-center">
                <div className="text-center text-richblack-400">
                  <FaShieldAlt className="text-6xl mb-4 mx-auto text-red-400" />
                  <p>Network Security course preview video would play here</p>
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

export default NetworkSecurityCourse;