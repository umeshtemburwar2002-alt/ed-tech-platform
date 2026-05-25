import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaCertificate,
  FaDownload,
  FaShare,
  FaEye,
  FaCalendarAlt,
  FaStar,
  FaTrophy,
  FaAward,
  FaGraduationCap,
  FaCheckCircle,
  FaUsers,
  FaClock,
  FaSearch,
  FaFilter,
  FaSort,
  FaThLarge,
  FaList,
  FaExternalLinkAlt,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaPrint,
  FaEnvelope,
  FaGlobe,
  FaShieldAlt,
  FaQrcode,
  FaBarcode,
  FaIdCard,
  FaFileAlt
} from 'react-icons/fa';
import { Card, Button, Badge } from '../../components/ui';
import { toast } from 'react-hot-toast';

const Certificates = () => {
  const { user } = useSelector((state) => state.profile);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // Mock certificates data
  const certificates = [
    {
      id: 1,
      title: "Complete Full-Stack Web Development",
      courseName: "Full-Stack Web Development Masterclass",
      instructor: "John Smith",
      instructorTitle: "Senior Software Engineer at Google",
      category: "Web Development",
      issueDate: "2024-01-15",
      completionDate: "2024-01-10",
      certificateId: "CERT-WD-2024-001",
      verificationUrl: "https://verify.edtech.com/CERT-WD-2024-001",
      grade: "A+",
      score: 95,
      duration: "50 hours",
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
      credentialId: "1234567890",
      thumbnail: "💻",
      status: "verified",
      downloadCount: 5,
      shareCount: 2,
      validUntil: "2027-01-15",
      accreditation: "Industry Recognized",
      blockchain: true
    },
    {
      id: 2,
      title: "Data Science & AI Specialist",
      courseName: "Data Science & AI Masterclass",
      instructor: "Dr. Sarah Johnson",
      instructorTitle: "Lead Data Scientist at Microsoft",
      category: "Data Science",
      issueDate: "2023-12-20",
      completionDate: "2023-12-15",
      certificateId: "CERT-DS-2023-045",
      verificationUrl: "https://verify.edtech.com/CERT-DS-2023-045",
      grade: "A",
      score: 92,
      duration: "65 hours",
      skills: ['Python', 'Pandas', 'TensorFlow', 'Machine Learning', 'Deep Learning'],
      credentialId: "0987654321",
      thumbnail: "📊",
      status: "verified",
      downloadCount: 8,
      shareCount: 4,
      validUntil: "2026-12-20",
      accreditation: "University Accredited",
      blockchain: true
    },
    {
      id: 3,
      title: "UI/UX Design Professional",
      courseName: "UI/UX Design Fundamentals",
      instructor: "Lisa Chen",
      instructorTitle: "Senior UX Designer at Apple",
      category: "Design",
      issueDate: "2023-11-30",
      completionDate: "2023-11-25",
      certificateId: "CERT-UX-2023-078",
      verificationUrl: "https://verify.edtech.com/CERT-UX-2023-078",
      grade: "A-",
      score: 88,
      duration: "30 hours",
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
      credentialId: "1122334455",
      thumbnail: "🎨",
      status: "verified",
      downloadCount: 3,
      shareCount: 1,
      validUntil: "2026-11-30",
      accreditation: "Industry Recognized",
      blockchain: false
    }
  ];

  // Filter and sort certificates
  const filteredCertificates = certificates
    .filter(cert => {
      const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cert.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cert.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterCategory === 'all' || cert.category.toLowerCase().includes(filterCategory.toLowerCase());
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'score':
          return b.score - a.score;
        case 'recent':
        default:
          return new Date(b.issueDate) - new Date(a.issueDate);
      }
    });

  // Calculate statistics
  const stats = {
    total: certificates.length,
    verified: certificates.filter(c => c.status === 'verified').length,
    avgScore: Math.round(certificates.reduce((sum, cert) => sum + cert.score, 0) / certificates.length),
    totalHours: certificates.reduce((sum, cert) => sum + parseInt(cert.duration), 0),
    categories: [...new Set(certificates.map(c => c.category))].length
  };

  const handleDownload = (certificateId) => {
    toast.success('Certificate downloaded successfully!');
    // Download logic
  };

  const handleShare = (certificate, platform) => {
    const shareText = `I just earned a certificate in ${certificate.title}! 🎓`;
    const shareUrl = certificate.verificationUrl;
    
    switch (platform) {
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
        break;
      default:
        navigator.clipboard.writeText(shareUrl);
        toast.success('Certificate link copied to clipboard!');
    }
  };

  const handleVerify = (certificateId) => {
    const certificate = certificates.find(c => c.certificateId === certificateId);
    if (certificate) {
      window.open(certificate.verificationUrl, '_blank');
    }
  };

  const handlePreview = (certificate) => {
    setSelectedCertificate(certificate);
    setShowPreview(true);
  };

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                My Certificates
              </h1>
              <p className="text-richblack-300 text-lg">
                Showcase your achievements and verify your skills
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <Button 
                variant="outline" 
                className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-white"
                onClick={() => handleDownload('all')}
              >
                <FaDownload className="mr-2" />
                Download All
              </Button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: "Total Certificates", value: stats.total, icon: FaCertificate, color: "text-yellow-400", bg: "bg-yellow-600" },
              { label: "Verified", value: stats.verified, icon: FaShieldAlt, color: "text-green-400", bg: "bg-green-600" },
              { label: "Avg Score", value: `${stats.avgScore}%`, icon: FaTrophy, color: "text-purple-400", bg: "bg-purple-600" },
              { label: "Total Hours", value: `${stats.totalHours}h`, icon: FaClock, color: "text-blue-400", bg: "bg-blue-600" },
              { label: "Categories", value: stats.categories, icon: FaGraduationCap, color: "text-pink-400", bg: "bg-pink-600" }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-richblack-800 rounded-xl p-4 border border-richblack-700 hover:border-yellow-500 transition-all duration-300 group hover:scale-105"
                >
                  <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="text-lg text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-richblack-300 text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredCertificates.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-white mb-2">No certificates found</h3>
              <p className="text-richblack-300 mb-6">
                Complete courses to earn certificates and showcase your achievements
              </p>
              <Link to="/dashboard/my-courses">
                <Button variant="primary" className="bg-yellow-600 hover:bg-yellow-700">
                  <FaGraduationCap className="mr-2" />
                  View My Courses
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCertificates.map((certificate, index) => (
                <motion.div
                  key={certificate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-richblack-800 rounded-xl border border-richblack-700 hover:border-yellow-500 transition-all duration-300 group hover:scale-105 overflow-hidden p-6"
                >
                  {/* Certificate Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{certificate.thumbnail}</div>
                    <div className="flex gap-2">
                      <Badge className="bg-green-600 text-white">
                        <FaShieldAlt className="mr-1" /> Verified
                      </Badge>
                      {certificate.blockchain && (
                        <Badge className="bg-blue-600 text-white">
                          <FaQrcode className="mr-1" /> Blockchain
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Certificate Info */}
                  <div className="mb-4">
                    <Badge variant="outline" className="text-xs mb-2">{certificate.category}</Badge>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors line-clamp-2">
                      {certificate.title}
                    </h3>
                    <p className="text-richblack-300 text-sm mb-2">{certificate.courseName}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-richblack-300 text-sm">by {certificate.instructor}</span>
                    </div>
                  </div>

                  {/* Score and Grade */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-richblack-300 text-sm">Score</span>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400 font-bold text-lg">{certificate.score}%</span>
                        <Badge className={`${
                          certificate.grade === 'A+' ? 'bg-green-600' :
                          certificate.grade === 'A' ? 'bg-blue-600' :
                          certificate.grade === 'A-' ? 'bg-purple-600' : 'bg-gray-600'
                        } text-white text-xs`}>
                          {certificate.grade}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-richblack-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${certificate.score}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <div className="text-richblack-400 text-xs">Issue Date</div>
                      <div className="text-white">{new Date(certificate.issueDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-richblack-400 text-xs">Duration</div>
                      <div className="text-white">{certificate.duration}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      variant="primary" 
                      size="small" 
                      className="flex-1 bg-yellow-600 hover:bg-yellow-700"
                      onClick={() => handlePreview(certificate)}
                    >
                      <FaEye className="mr-2" />
                      Preview
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="small" 
                      className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                      onClick={() => handleDownload(certificate.id)}
                    >
                      <FaDownload />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="small" 
                      className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                      onClick={() => handleShare(certificate)}
                    >
                      <FaShare />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Certificates;
