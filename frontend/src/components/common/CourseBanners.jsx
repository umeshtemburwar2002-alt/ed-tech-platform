import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaCode,
  FaPython,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaMobile,
  FaPalette,
  FaChartLine,
  FaRobot,
  FaShieldAlt,
  FaArrowRight,
  FaStar,
  FaUsers,
  FaClock,
  FaPlay,
  FaBookOpen,
  FaCertificate,
  FaTrophy,
  FaFire,
  FaHeart,
  FaTimes
} from 'react-icons/fa';

const CourseBanners = () => {
  const [closedBanners, setClosedBanners] = useState([]);

  const courseBanners = [
    {
      id: 'python-mastery',
      title: '🐍 Master Python Programming',
      subtitle: 'From Beginner to Expert in 12 Weeks',
      description: 'Learn Python with real-world projects, data science, and web development',
      instructor: 'Dr. Rajesh Kumar',
      rating: 4.9,
      students: 15420,
      duration: '42 hours',
      price: '₹2,999',
      originalPrice: '₹5,999',
      ctaText: 'Start Python Journey',
      ctaLink: '/courses/python-beginners',
      bgGradient: 'from-blue-600 via-green-600 to-yellow-500',
      icon: FaPython,
      level: 'Beginner to Advanced',
      features: ['Live Projects', 'Data Science', 'Web Development', 'AI/ML Basics'],
      image: '🐍',
      trending: true
    },
    {
      id: 'react-development',
      title: '⚛️ React.js Complete Course',
      subtitle: 'Build Modern Web Applications',
      description: 'Master React.js, Redux, and modern frontend development',
      instructor: 'Sarah Johnson',
      rating: 4.8,
      students: 12350,
      duration: '35 hours',
      price: '₹2,499',
      originalPrice: '₹4,999',
      ctaText: 'Learn React Now',
      ctaLink: '/courses/react-development',
      bgGradient: 'from-cyan-500 via-blue-500 to-purple-600',
      icon: FaReact,
      level: 'Intermediate',
      features: ['Modern React', 'Redux Toolkit', 'Next.js', 'TypeScript'],
      image: '⚛️',
      trending: false
    },
    {
      id: 'fullstack-development',
      title: '🚀 Full Stack Development',
      subtitle: 'MERN Stack Complete Bootcamp',
      description: 'Become a full-stack developer with MongoDB, Express, React, and Node.js',
      instructor: 'Mike Chen',
      rating: 4.9,
      students: 8760,
      duration: '60 hours',
      price: '₹4,999',
      originalPrice: '₹9,999',
      ctaText: 'Join Bootcamp',
      ctaLink: '/courses/fullstack-mern',
      bgGradient: 'from-purple-600 via-pink-600 to-red-600',
      icon: FaCode,
      level: 'Advanced',
      features: ['MERN Stack', 'Real Projects', 'Deployment', 'Job Ready'],
      image: '💻',
      trending: true
    },
    {
      id: 'data-science',
      title: '📊 Data Science Mastery',
      subtitle: 'Analytics, ML & AI Complete Course',
      description: 'Master data science with Python, machine learning, and AI',
      instructor: 'Dr. Lisa Zhang',
      rating: 4.9,
      students: 6540,
      duration: '50 hours',
      price: '₹3,999',
      originalPrice: '₹7,999',
      ctaText: 'Explore Data Science',
      ctaLink: '/courses/data-science',
      bgGradient: 'from-green-500 via-teal-500 to-blue-600',
      icon: FaChartLine,
      level: 'Intermediate to Advanced',
      features: ['Python for Data', 'Machine Learning', 'Deep Learning', 'Real Datasets'],
      image: '📈',
      trending: true
    },
    {
      id: 'mobile-development',
      title: '📱 Mobile App Development',
      subtitle: 'React Native & Flutter Course',
      description: 'Build cross-platform mobile apps for iOS and Android',
      instructor: 'Emma Rodriguez',
      rating: 4.7,
      students: 5230,
      duration: '45 hours',
      price: '₹3,499',
      originalPrice: '₹6,999',
      ctaText: 'Build Mobile Apps',
      ctaLink: '/courses/mobile-development',
      bgGradient: 'from-pink-500 via-purple-500 to-indigo-600',
      icon: FaMobile,
      level: 'Intermediate',
      features: ['React Native', 'Flutter', 'App Store Deploy', 'Native Features'],
      image: '📱',
      trending: false
    },
    {
      id: 'ui-ux-design',
      title: '🎨 UI/UX Design Mastery',
      subtitle: 'Design Beautiful User Experiences',
      description: 'Learn modern UI/UX design principles and tools',
      instructor: 'Alex Thompson',
      rating: 4.8,
      students: 7890,
      duration: '38 hours',
      price: '₹2,799',
      originalPrice: '₹5,599',
      ctaText: 'Start Designing',
      ctaLink: '/courses/ui-ux-design',
      bgGradient: 'from-orange-500 via-pink-500 to-purple-600',
      icon: FaPalette,
      level: 'Beginner to Intermediate',
      features: ['Figma Mastery', 'Design Systems', 'Prototyping', 'User Research'],
      image: '🎨',
      trending: false
    }
  ];

  const closeBanner = (bannerId) => {
    setClosedBanners(prev => [...prev, bannerId]);
  };

  const visibleBanners = courseBanners.filter(
    banner => !closedBanners.includes(banner.id)
  );

  if (visibleBanners.length === 0) return null;

  return (
    <div className="space-y-6">
      {visibleBanners.map((banner, index) => {
        const IconComponent = banner.icon;
        
        return (
          <motion.div
            key={banner.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative bg-gradient-to-r ${banner.bgGradient} text-white rounded-3xl overflow-hidden shadow-2xl`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M40%2040c0-11-9-20-20-20s-20%209-20%2020%209%2020%2020%2020%2020-9%2020-20zm20%200c0-11-9-20-20-20s-20%209-20%2020%209%2020%2020%2020%2020-9%2020-20z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
            </div>

            {/* Trending Badge */}
            {banner.trending && (
              <div className="absolute top-4 left-4 z-20">
                <div className="flex items-center space-x-1 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  <FaFire className="text-xs" />
                  <span>Trending</span>
                </div>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={() => closeBanner(banner.id)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
            >
              <FaTimes className="text-white text-sm" />
            </button>

            <div className="relative z-10 p-6 lg:p-10">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                {/* Content Section */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Header */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-white/20 rounded-xl">
                        <IconComponent className="text-3xl" />
                      </div>
                      <div>
                        <h2 className="text-3xl lg:text-4xl font-bold">
                          {banner.title}
                        </h2>
                        <p className="text-xl text-white/90 font-medium">
                          {banner.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-lg text-white/80 max-w-2xl">
                      {banner.description}
                    </p>
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <FaStar className="text-yellow-300 text-xl mx-auto mb-1" />
                      <div className="font-bold">{banner.rating}</div>
                      <div className="text-xs text-white/70">Rating</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <FaUsers className="text-blue-300 text-xl mx-auto mb-1" />
                      <div className="font-bold">{banner.students.toLocaleString()}</div>
                      <div className="text-xs text-white/70">Students</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <FaClock className="text-green-300 text-xl mx-auto mb-1" />
                      <div className="font-bold">{banner.duration}</div>
                      <div className="text-xs text-white/70">Duration</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                      <FaCertificate className="text-purple-300 text-xl mx-auto mb-1" />
                      <div className="font-bold">{banner.level}</div>
                      <div className="text-xs text-white/70">Level</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-lg">What You'll Learn:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {banner.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <FaBookOpen className="text-green-300 text-sm" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <FaTrophy className="text-yellow-300 text-xl" />
                    </div>
                    <div>
                      <div className="font-bold">Instructor: {banner.instructor}</div>
                      <div className="text-sm text-white/70">Industry Expert & Mentor</div>
                    </div>
                  </div>
                </div>

                {/* Visual & CTA Section */}
                <div className="text-center space-y-6">
                  {/* Course Visual */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="relative"
                  >
                    <div className="text-8xl lg:text-9xl mb-4">
                      {banner.image}
                    </div>
                    
                    {/* Floating Elements */}
                    <motion.div
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-4 -left-4 bg-white/20 backdrop-blur-sm rounded-full p-2"
                    >
                      <FaPlay className="text-lg" />
                    </motion.div>
                    
                    <motion.div
                      animate={{ y: [10, -10, 10] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                      className="absolute -bottom-2 -right-4 bg-white/20 backdrop-blur-sm rounded-full p-2"
                    >
                      <FaHeart className="text-lg text-pink-300" />
                    </motion.div>
                  </motion.div>

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="text-white/60 line-through text-lg">
                      {banner.originalPrice}
                    </div>
                    <div className="text-4xl font-bold">
                      {banner.price}
                    </div>
                    <div className="text-green-300 font-bold">
                      Save {Math.round((1 - parseInt(banner.price.replace(/[^0-9]/g, '')) / parseInt(banner.originalPrice.replace(/[^0-9]/g, ''))) * 100)}%
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={banner.ctaLink}
                    className="group inline-flex items-center justify-center space-x-2 bg-white text-gray-900 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg w-full"
                  >
                    <span>{banner.ctaText}</span>
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>

                  {/* Additional Info */}
                  <div className="text-sm text-white/70 space-y-1">
                    <div>✅ Lifetime Access</div>
                    <div>✅ Certificate of Completion</div>
                    <div>✅ 30-Day Money Back Guarantee</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CourseBanners;