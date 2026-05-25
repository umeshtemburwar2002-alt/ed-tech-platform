import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaGift,
  FaFire,
  FaClock,
  FaStar,
  FaArrowRight,
  FaTimes,
  FaPercent,
  FaUsers,
  FaGraduationCap,
  FaTrophy,
  FaRocket,
  FaHeart,
  FaThumbsUp,
  FaBookOpen,
  FaCertificate
} from 'react-icons/fa';

const PromotionalBanners = () => {
  const [closedBanners, setClosedBanners] = useState([]);

  const promotionalBanners = [
    {
      id: 'flash-sale',
      type: 'flash-sale',
      title: '⚡ Flash Sale Alert!',
      subtitle: 'Limited Time Offer - Ends in 24 Hours',
      description: 'Get up to 80% OFF on all premium courses',
      discount: '80% OFF',
      originalPrice: '₹9,999',
      salePrice: '₹1,999',
      ctaText: 'Grab Deal Now',
      ctaLink: '/all-courses',
      bgColor: 'bg-gradient-to-r from-red-500 via-pink-500 to-purple-600',
      urgency: 'Only 2 hours left!',
      icon: FaFire,
      features: ['All Courses', 'Lifetime Access', 'Certificates']
    },
    {
      id: 'new-user',
      type: 'welcome',
      title: '🎉 Welcome Bonus!',
      subtitle: 'Special Offer for New Students',
      description: 'Start your learning journey with exclusive benefits',
      discount: 'FREE',
      originalPrice: '₹2,999',
      salePrice: 'FREE',
      ctaText: 'Claim Welcome Bonus',
      ctaLink: '/signup',
      bgColor: 'bg-gradient-to-r from-green-500 via-blue-500 to-purple-600',
      urgency: 'New users only!',
      icon: FaGift,
      features: ['Free Course', 'Study Materials', 'Community Access']
    },
    {
      id: 'premium-upgrade',
      type: 'upgrade',
      title: '⭐ Premium Upgrade',
      subtitle: 'Unlock Advanced Features',
      description: 'Get access to premium content and personalized mentoring',
      discount: '50% OFF',
      originalPrice: '₹4,999',
      salePrice: '₹2,499',
      ctaText: 'Upgrade to Premium',
      ctaLink: '/dashboard/cart',
      bgColor: 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500',
      urgency: 'Limited seats available!',
      icon: FaStar,
      features: ['1-on-1 Mentoring', 'Priority Support', 'Advanced Projects']
    },
    {
      id: 'referral-bonus',
      type: 'referral',
      title: '🤝 Refer & Earn',
      subtitle: 'Invite Friends and Get Rewards',
      description: 'Earn ₹500 for every successful referral',
      discount: '₹500',
      originalPrice: 'Per Referral',
      salePrice: 'Cash Reward',
      ctaText: 'Start Referring',
      ctaLink: '/dashboard/referral',
      bgColor: 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500',
      urgency: 'Unlimited referrals!',
      icon: FaUsers,
      features: ['Cash Rewards', 'Friend Benefits', 'Bonus Courses']
    }
  ];

  const closeBanner = (bannerId) => {
    setClosedBanners(prev => [...prev, bannerId]);
  };

  const visibleBanners = promotionalBanners.filter(
    banner => !closedBanners.includes(banner.id)
  );

  if (visibleBanners.length === 0) return null;

  return (
    <div className="space-y-4">
      {visibleBanners.map((banner, index) => {
        const IconComponent = banner.icon;
        
        return (
          <motion.div
            key={banner.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative ${banner.bgColor} text-white rounded-2xl overflow-hidden shadow-2xl`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M20%2020c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10zm10%200c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10z%22/%3E%3C/g%3E%3C/svg%3E')]" />
            </div>

            {/* Close Button */}
            <button
              onClick={() => closeBanner(banner.id)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
            >
              <FaTimes className="text-white text-sm" />
            </button>

            <div className="relative z-10 p-6 lg:p-8">
              <div className="grid lg:grid-cols-3 gap-6 items-center">
                {/* Content Section */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Header with Icon */}
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-white/20 rounded-full">
                      <IconComponent className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold">
                        {banner.title}
                      </h3>
                      <p className="text-white/90 font-medium">
                        {banner.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-white/80">
                    {banner.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {banner.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center space-x-1 bg-white/20 rounded-full px-3 py-1 text-sm font-medium"
                      >
                        <FaThumbsUp className="text-xs" />
                        <span>{feature}</span>
                      </span>
                    ))}
                  </div>

                  {/* Urgency */}
                  <div className="flex items-center space-x-2 text-yellow-300">
                    <FaClock className="text-sm animate-pulse" />
                    <span className="font-bold text-sm">{banner.urgency}</span>
                  </div>
                </div>

                {/* Pricing & CTA Section */}
                <div className="text-center lg:text-right space-y-4">
                  {/* Discount Badge */}
                  <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border-2 border-white/30">
                    <FaPercent className="text-yellow-300" />
                    <span className="font-bold text-xl">{banner.discount}</span>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-1">
                    <div className="text-white/60 line-through text-lg">
                      {banner.originalPrice}
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {banner.salePrice}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={banner.ctaLink}
                    className="group inline-flex items-center justify-center space-x-2 bg-white text-gray-900 font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg w-full lg:w-auto"
                  >
                    <span>{banner.ctaText}</span>
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>

                  {/* Social Proof */}
                  <div className="flex items-center justify-center lg:justify-end space-x-4 text-white/70 text-sm">
                    <div className="flex items-center space-x-1">
                      <FaUsers className="text-xs" />
                      <span>10K+ Students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaStar className="text-yellow-300 text-xs" />
                      <span>4.9 Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Elements */}
            <div className="absolute top-4 left-4 opacity-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <FaRocket className="text-4xl" />
              </motion.div>
            </div>

            <div className="absolute bottom-4 right-20 opacity-20">
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaHeart className="text-3xl" />
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PromotionalBanners;