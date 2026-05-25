import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdvertisementBanners from './AdvertisementBanners';
import PromotionalBanners from './PromotionalBanners';
import CourseBanners from './CourseBanners';
import SeasonalBanners from './SeasonalBanners';
import {
  FaChevronLeft,
  FaChevronRight,
  FaPause,
  FaPlay,
  FaCog,
  FaTimes,
  FaExpand,
  FaCompress
} from 'react-icons/fa';

const BannerContainer = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.profile);
  const [currentBannerType, setCurrentBannerType] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [bannerSettings, setBannerSettings] = useState({
    showAdvertisement: true,
    showPromotional: true,
    showCourse: true,
    showSeasonal: true
  });

  // Banner types configuration
  const bannerTypes = [
    {
      id: 'advertisement',
      name: 'Advertisement',
      component: AdvertisementBanners,
      enabled: bannerSettings.showAdvertisement,
      priority: 1
    },
    {
      id: 'seasonal',
      name: 'Seasonal',
      component: SeasonalBanners,
      enabled: bannerSettings.showSeasonal,
      priority: 2
    },
    {
      id: 'promotional',
      name: 'Promotional',
      component: PromotionalBanners,
      enabled: bannerSettings.showPromotional,
      priority: 3
    },
    {
      id: 'course',
      name: 'Course',
      component: CourseBanners,
      enabled: bannerSettings.showCourse,
      priority: 4
    }
  ];

  // Filter enabled banners
  const enabledBanners = bannerTypes.filter(banner => banner.enabled);

  // Auto-rotate banners
  useEffect(() => {
    if (!isAutoPlay || enabledBanners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentBannerType((prev) => (prev + 1) % enabledBanners.length);
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, enabledBanners.length]);

  // Determine if banners should be shown on current page
  const shouldShowBanners = () => {
    const hiddenPaths = ['/login', '/signup', '/dashboard', '/admin'];
    return !hiddenPaths.some(path => location.pathname.startsWith(path));
  };

  // Handle banner navigation
  const nextBanner = () => {
    setCurrentBannerType((prev) => (prev + 1) % enabledBanners.length);
  };

  const prevBanner = () => {
    setCurrentBannerType((prev) => (prev - 1 + enabledBanners.length) % enabledBanners.length);
  };

  // Toggle banner settings
  const toggleBannerSetting = (settingKey) => {
    setBannerSettings(prev => ({
      ...prev,
      [settingKey]: !prev[settingKey]
    }));
  };

  if (!shouldShowBanners() || enabledBanners.length === 0) {
    return null;
  }

  const CurrentBannerComponent = enabledBanners[currentBannerType]?.component;

  return (
    <div className="relative w-full">
      {/* Banner Container */}
      <motion.div
        className={`relative transition-all duration-300 ${
          isExpanded ? 'fixed inset-0 z-50 bg-black/80' : 'w-full'
        }`}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Expanded Background */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsExpanded(false)}
          />
        )}

        {/* Banner Content */}
        <div className={`relative ${
          isExpanded 
            ? 'flex items-center justify-center h-full p-8' 
            : 'w-full'
        }`}>
          <div className={`${
            isExpanded 
              ? 'max-w-6xl w-full max-h-[90vh] overflow-y-auto' 
              : 'w-full'
          }`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBannerType}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {CurrentBannerComponent && <CurrentBannerComponent />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Banner Controls */}
        <AnimatePresence>
          {showControls && enabledBanners.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              {/* Navigation Arrows */}
              <button
                onClick={prevBanner}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 p-4 bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-md transition-all duration-200 pointer-events-auto z-20 border border-white/20 hover:scale-110"
              >
                <FaChevronLeft className="text-white text-lg" />
              </button>
              
              <button
                onClick={nextBanner}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 p-4 bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-md transition-all duration-200 pointer-events-auto z-20 border border-white/20 hover:scale-110"
              >
                <FaChevronRight className="text-white text-lg" />
              </button>

              {/* Control Panel */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 pointer-events-auto z-30">
                {/* Banner Indicators */}
                <div className="flex space-x-3 bg-black/30 backdrop-blur-md rounded-full px-4 py-3 border border-white/20">
                  {enabledBanners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentBannerType(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                        index === currentBannerType
                          ? 'bg-white shadow-lg scale-125'
                          : 'bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>

                {/* Play/Pause Button */}
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className="p-3 bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-md transition-all duration-200 border border-white/20 hover:scale-110"
                >
                  {isAutoPlay ? (
                    <FaPause className="text-white text-sm" />
                  ) : (
                    <FaPlay className="text-white text-sm" />
                  )}
                </button>

                {/* Expand/Compress Button */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-3 bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-md transition-all duration-200 border border-white/20 hover:scale-110"
                >
                  {isExpanded ? (
                    <FaCompress className="text-white text-sm" />
                  ) : (
                    <FaExpand className="text-white text-sm" />
                  )}
                </button>
              </div>

              {/* Banner Type Indicator */}
              <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 pointer-events-auto z-20">
                <span className="text-white text-sm font-medium">
                  {enabledBanners[currentBannerType]?.name}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Settings Panel (for admin/development) */}
        {user?.accountType === 'Admin' && (
          <div className="absolute top-4 right-4 z-30">
            <div className="relative">
              <button
                onClick={() => setShowControls(!showControls)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors duration-200"
              >
                <FaCog className="text-white text-sm" />
              </button>
              
              {showControls && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-12 right-0 bg-white rounded-lg shadow-lg p-4 min-w-48"
                >
                  <h4 className="font-bold text-gray-900 mb-3">Banner Settings</h4>
                  <div className="space-y-2">
                    {Object.entries(bannerSettings).map(([key, value]) => (
                      <label key={key} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => toggleBannerSetting(key)}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-700 capitalize">
                          {key.replace('show', '').replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </motion.div>

      {/* Banner Information */}
      <div className="text-center py-2 bg-gray-100 dark:bg-richblack-800">
        <p className="text-xs text-gray-600 dark:text-richblack-300">
          {enabledBanners.length > 1 && (
            <>
              Banner {currentBannerType + 1} of {enabledBanners.length} • 
              {isAutoPlay ? 'Auto-rotating' : 'Manual control'} • 
            </>
          )}
          <button
            onClick={() => setShowControls(!showControls)}
            className="hover:text-purple-600 transition-colors duration-200"
          >
            {showControls ? 'Hide' : 'Show'} controls
          </button>
        </p>
      </div>
    </div>
  );
};

export default BannerContainer;