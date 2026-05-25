import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaGraduationCap,
  FaRocket,
  FaStar,
  FaUsers,
  FaCertificate,
  FaChartLine,
  FaCode,
  FaLaptopCode,
  FaBriefcase,
  FaArrowRight,
  FaTimes,
  FaPlay,
  FaBookOpen,
  FaTrophy,
  FaFire,
  FaGift,
  FaClock,
  FaHeart,
  FaCheckCircle,
  FaQuoteLeft,
  FaEye
} from 'react-icons/fa';

const AdvertisementBanners = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Banner data with different promotional content
  const banners = [
    {
      id: 1,
      type: 'course-promotion',
      title: '🚀 Master Programming in 2024',
      subtitle: 'Join 50,000+ Students Learning with Industry Experts',
      description: 'Get access to premium courses, live sessions, and career guidance',
      ctaText: 'Start Learning Today',
      ctaLink: '/all-courses',
      bgGradient: 'from-purple-600 via-pink-600 to-red-600',
      icon: FaCode,
      offer: '70% OFF',
      features: ['Live Projects', 'Industry Mentors', 'Job Assistance'],
      image: '💻'
    },
    {
      id: 2,
      type: 'certification',
      title: '🏆 Get Industry Certified',
      subtitle: 'Earn Certificates Recognized by Top Companies',
      description: 'Boost your career with our industry-recognized certifications',
      ctaText: 'View Certificates',
      ctaLink: '/dashboard/badges',
      bgGradient: 'from-blue-600 via-purple-600 to-pink-600',
      icon: FaCertificate,
      offer: 'FREE',
      features: ['Verified Certificates', 'LinkedIn Integration', 'Career Boost'],
      image: '🎓'
    },
    {
      id: 5,
      type: 'special-offer',
      title: '🎁 New Year Special Offer',
      subtitle: 'Unlock All Premium Courses at Unbeatable Price',
      description: 'Limited time offer - Get lifetime access to all courses',
      ctaText: 'Claim Offer Now',
      ctaLink: '/all-courses',
      bgGradient: 'from-yellow-500 via-orange-500 to-red-500',
      icon: FaGift,
      offer: '90% OFF',
      features: ['Lifetime Access', 'All Courses', 'Premium Support'],
      image: '🎉'
    }
  ];

  // Auto-rotate banners every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const currentBannerData = banners[currentBanner];
  const IconComponent = currentBannerData.icon;

  // Handle banner click for detailed offers (3rd and 4th banners removed)
  const handleBannerClick = () => {
    // No clickable banners available
  };

  if (!isVisible) return null;

  return (
    <div className="relative w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBanner}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`relative w-full h-48 lg:h-56 bg-gradient-to-r ${currentBannerData.bgGradient} text-white overflow-hidden`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
          >
            <FaTimes className="text-white text-sm" />
          </button>

          <div className="relative z-10 container mx-auto px-4 py-4 lg:py-6 h-full flex items-center">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Content Section */}
              <div className="space-y-4">
                {/* Offer Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30"
                >
                  <FaFire className="text-orange-300" />
                  <span className="font-bold text-sm">{currentBannerData.offer}</span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl lg:text-3xl font-bold leading-tight"
                >
                  {currentBannerData.title}
                </motion.h1>

                {/* Subtitle */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg lg:text-xl font-medium text-white/90"
                >
                  {currentBannerData.subtitle}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-base text-white/80 max-w-lg"
                >
                  {currentBannerData.description}
                </motion.p>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-3"
                >
                  {currentBannerData.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20"
                    >
                      <FaStar className="text-yellow-300 text-sm" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </motion.div>

                {/* Click indicator removed - no clickable banners */}

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    to={currentBannerData.ctaLink}
                    className="group inline-flex items-center justify-center space-x-2 bg-white text-gray-900 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <IconComponent className="text-lg" />
                    <span>{currentBannerData.ctaText}</span>
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>

                  <div className="flex items-center space-x-4 text-white/80">
                    <div className="flex items-center space-x-1">
                      <FaUsers className="text-sm" />
                      <span className="text-sm">50,000+ Students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaStar className="text-yellow-300 text-sm" />
                      <span className="text-sm">4.9/5 Rating</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Visual Section */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                  className="relative"
                >
                  {/* Main Visual */}
                  <div className="text-center">
                    <div className="text-4xl lg:text-5xl mb-3">
                      {currentBannerData.image}
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="relative">
                      <motion.div
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-8 -left-8 bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30"
                      >
                        <FaCode className="text-2xl text-white" />
                      </motion.div>
                      
                      <motion.div
                        animate={{ y: [10, -10, 10] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -top-4 -right-8 bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30"
                      >
                        <FaTrophy className="text-2xl text-yellow-300" />
                      </motion.div>
                      
                      <motion.div
                        animate={{ y: [-5, 15, -5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute -bottom-4 left-4 bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30"
                      >
                        <FaHeart className="text-2xl text-pink-300" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Removed duplicate navigation dots - handled by BannerContainer */}
        </motion.div>
      </AnimatePresence>

      {/* Detailed Offer Modal */}
      {showDetailModal && selectedOffer && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowDetailModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            >
              <FaTimes className="text-gray-600" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{selectedOffer.image}</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedOffer.detailedOffer.title}
              </h2>
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-2xl font-bold text-green-600">
                  {selectedOffer.detailedOffer.discountedPrice}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  {selectedOffer.detailedOffer.originalPrice}
                </span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {selectedOffer.detailedOffer.discount}
                </span>
              </div>
              <p className="text-red-600 font-semibold">
                Valid till: {selectedOffer.detailedOffer.validTill}
              </p>
            </div>

            {/* Benefits */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What You Get:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedOffer.detailedOffer.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Companies/Instructors */}
            {selectedOffer.detailedOffer.companies && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Alumni Work At:</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedOffer.detailedOffer.companies.map((company, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedOffer.detailedOffer.instructors && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Learn From:</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedOffer.detailedOffer.instructors.map((instructor, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {instructor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial */}
            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <FaQuoteLeft className="text-gray-400 mb-2" />
              <p className="text-gray-700 italic">{selectedOffer.detailedOffer.testimonial}</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={selectedOffer.ctaLink}
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold py-4 px-6 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 text-center"
                onClick={() => setShowDetailModal(false)}
              >
                {selectedOffer.ctaText}
              </Link>
              <button
                onClick={() => setShowDetailModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 font-bold py-4 px-6 rounded-xl hover:bg-gray-300 transition-colors duration-300"
              >
                Maybe Later
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdvertisementBanners;