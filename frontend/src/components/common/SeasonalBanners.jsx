import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaGift,
  FaHeart,
  FaStar,
  FaFire,
  FaSnowflake,
  FaSun,
  FaLeaf,
  FaGraduationCap,
  FaArrowRight,
  FaTimes,
  FaCalendarAlt,
  FaPercent,
  FaClock,
  FaUsers,
  FaTrophy,
  FaRocket,
  FaMagic,
  FaCandy
} from 'react-icons/fa';

const SeasonalBanners = () => {
  const [currentSeason, setCurrentSeason] = useState('');
  const [closedBanners, setClosedBanners] = useState([]);

  // Determine current season/occasion
  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    // Determine season/occasion based on date
    if ((month === 12 && day >= 20) || (month === 1 && day <= 19)) {
      setCurrentSeason('winter');
    } else if ((month === 3 && day >= 20) || (month === 4) || (month === 5) || (month === 6 && day <= 20)) {
      setCurrentSeason('spring');
    } else if ((month === 6 && day >= 21) || (month === 7) || (month === 8) || (month === 9 && day <= 22)) {
      setCurrentSeason('summer');
    } else {
      setCurrentSeason('autumn');
    }

    // Special occasions
    if (month === 1 && day <= 15) {
      setCurrentSeason('new-year');
    } else if (month === 2 && day >= 10 && day <= 16) {
      setCurrentSeason('valentine');
    } else if (month === 10 && day >= 25) {
      setCurrentSeason('diwali');
    } else if (month === 12 && day >= 20) {
      setCurrentSeason('christmas');
    }
  }, []);

  const seasonalBanners = {
    'new-year': {
      id: 'new-year-2024',
      title: '🎊 New Year, New Skills!',
      subtitle: 'Start 2024 with Learning Goals',
      description: 'Transform your career with our New Year special courses',
      bgGradient: 'from-yellow-400 via-orange-500 to-red-600',
      icon: FaFire,
      offer: '75% OFF',
      ctaText: 'Start Learning Journey',
      ctaLink: '/all-courses',
      features: ['All Courses Access', 'New Year Resolution Tracker', 'Career Guidance'],
      urgency: 'Offer ends January 31st!',
      decorativeEmoji: '🎆'
    },
    'valentine': {
      id: 'valentine-2024',
      title: '💝 Fall in Love with Learning',
      subtitle: 'Valentine\'s Special Learning Offer',
      description: 'Share the gift of knowledge with your loved ones',
      bgGradient: 'from-pink-500 via-red-500 to-purple-600',
      icon: FaHeart,
      offer: 'Buy 1 Get 1',
      ctaText: 'Gift Learning',
      ctaLink: '/gift-courses',
      features: ['Couple Courses', 'Gift Certificates', 'Shared Progress'],
      urgency: 'Valentine\'s week special!',
      decorativeEmoji: '💕'
    },
    'spring': {
      id: 'spring-2024',
      title: '🌸 Spring into Learning',
      subtitle: 'Bloom Your Skills This Season',
      description: 'Fresh start with our spring collection of courses',
      bgGradient: 'from-green-400 via-blue-500 to-purple-600',
      icon: FaLeaf,
      offer: '60% OFF',
      ctaText: 'Explore Spring Courses',
      ctaLink: '/seasonal/spring',
      features: ['Nature-Inspired Learning', 'Outdoor Projects', 'Growth Mindset'],
      urgency: 'Spring season special!',
      decorativeEmoji: '🌺'
    },
    'summer': {
      id: 'summer-2024',
      title: '☀️ Summer Learning Festival',
      subtitle: 'Hot Deals on Cool Courses',
      description: 'Beat the heat with our intensive summer programs',
      bgGradient: 'from-yellow-400 via-orange-500 to-red-500',
      icon: FaSun,
      offer: '50% OFF',
      ctaText: 'Join Summer Program',
      ctaLink: '/summer-intensive',
      features: ['Intensive Bootcamps', 'Summer Projects', 'Vacation Learning'],
      urgency: 'Summer vacation special!',
      decorativeEmoji: '🏖️'
    },
    'autumn': {
      id: 'autumn-2024',
      title: '🍂 Autumn Learning Harvest',
      subtitle: 'Reap the Benefits of Knowledge',
      description: 'Harvest new skills this autumn season',
      bgGradient: 'from-orange-500 via-red-500 to-yellow-600',
      icon: FaLeaf,
      offer: '65% OFF',
      ctaText: 'Harvest Knowledge',
      ctaLink: '/autumn-special',
      features: ['Skill Harvesting', 'Career Preparation', 'Knowledge Growth'],
      urgency: 'Autumn season limited time!',
      decorativeEmoji: '🍁'
    },
    'diwali': {
      id: 'diwali-2024',
      title: '🪔 Diwali Learning Festival',
      subtitle: 'Illuminate Your Future with Knowledge',
      description: 'Celebrate Diwali with the gift of learning',
      bgGradient: 'from-yellow-500 via-orange-500 to-red-600',
      icon: FaMagic,
      offer: '80% OFF',
      ctaText: 'Celebrate with Learning',
      ctaLink: '/diwali-special',
      features: ['Festival Courses', 'Cultural Learning', 'Family Packages'],
      urgency: 'Diwali week special!',
      decorativeEmoji: '✨'
    },
    'christmas': {
      id: 'christmas-2024',
      title: '🎄 Christmas Learning Magic',
      subtitle: 'Gift Yourself Knowledge This Christmas',
      description: 'Unwrap the joy of learning this holiday season',
      bgGradient: 'from-green-600 via-red-500 to-gold-500',
      icon: FaGift,
      offer: '70% OFF',
      ctaText: 'Unwrap Learning',
      ctaLink: '/christmas-special',
      features: ['Holiday Courses', 'Gift Wrapping', 'Year-End Goals'],
      urgency: 'Christmas week only!',
      decorativeEmoji: '🎅'
    },
    'winter': {
      id: 'winter-2024',
      title: '❄️ Winter Learning Wonderland',
      subtitle: 'Cozy Up with Knowledge',
      description: 'Warm up your skills during the cold winter months',
      bgGradient: 'from-blue-400 via-purple-500 to-indigo-600',
      icon: FaSnowflake,
      offer: '55% OFF',
      ctaText: 'Start Winter Learning',
      ctaLink: '/winter-courses',
      features: ['Indoor Learning', 'Cozy Sessions', 'Winter Projects'],
      urgency: 'Winter season special!',
      decorativeEmoji: '⛄'
    }
  };

  const currentBanner = seasonalBanners[currentSeason];

  const closeBanner = () => {
    setClosedBanners(prev => [...prev, currentBanner.id]);
  };

  if (!currentBanner || closedBanners.includes(currentBanner.id)) {
    return null;
  }

  const IconComponent = currentBanner.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative bg-gradient-to-r ${currentBanner.bgGradient} text-white rounded-3xl overflow-hidden shadow-2xl`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: 'reverse',
            ease: 'linear'
          }}
          className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M30%2030c0-8.3-6.7-15-15-15s-15%206.7-15%2015%206.7%2015%2015%2015%2015-6.7%2015-15zm15%200c0-8.3-6.7-15-15-15s-15%206.7-15%2015%206.7%2015%2015%2015%2015-6.7%2015-15z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"
        />
      </div>

      {/* Close Button */}
      <button
        onClick={closeBanner}
        className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
      >
        <FaTimes className="text-white text-sm" />
      </button>

      {/* Decorative Elements */}
      <div className="absolute top-8 left-8 text-6xl opacity-30">
        {currentBanner.decorativeEmoji}
      </div>
      <div className="absolute bottom-8 right-8 text-4xl opacity-20">
        {currentBanner.decorativeEmoji}
      </div>

      <div className="relative z-10 p-8 lg:p-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content Section */}
          <div className="space-y-6">
            {/* Seasonal Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30"
            >
              <FaCalendarAlt className="text-yellow-300" />
              <span className="font-bold text-sm">Seasonal Special</span>
            </motion.div>

            {/* Main Content */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl lg:text-5xl font-bold leading-tight"
              >
                {currentBanner.title}
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl lg:text-2xl font-medium text-white/90"
              >
                {currentBanner.subtitle}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-white/80"
              >
                {currentBanner.description}
              </motion.p>
            </div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <h4 className="font-bold text-lg">Special Features:</h4>
              <div className="grid gap-2">
                {currentBanner.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <FaStar className="text-yellow-300 text-sm" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Urgency */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center space-x-2 text-yellow-300"
            >
              <FaClock className="text-sm animate-pulse" />
              <span className="font-bold text-sm">{currentBanner.urgency}</span>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link
                to={currentBanner.ctaLink}
                className="group inline-flex items-center justify-center space-x-2 bg-white text-gray-900 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <IconComponent className="text-lg" />
                <span>{currentBanner.ctaText}</span>
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Visual Section */}
          <div className="text-center space-y-6">
            {/* Offer Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full border-4 border-white/30 mx-auto"
            >
              <div className="text-center">
                <FaPercent className="text-2xl text-yellow-300 mx-auto mb-1" />
                <div className="font-bold text-xl">{currentBanner.offer}</div>
              </div>
            </motion.div>

            {/* Animated Icon */}
            <motion.div
              animate={{ 
                y: [-10, 10, -10],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="text-8xl"
            >
              <IconComponent />
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <FaUsers className="text-2xl mx-auto mb-2 text-blue-300" />
                <div className="font-bold">50K+</div>
                <div className="text-xs text-white/70">Happy Students</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                <FaTrophy className="text-2xl mx-auto mb-2 text-yellow-300" />
                <div className="font-bold">4.9★</div>
                <div className="text-xs text-white/70">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
};

export default SeasonalBanners;