import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaFire,
  FaTags,
  FaClock,
  FaGift,
  FaStar,
  FaPercent,
  FaRocket,
  FaBolt,
  FaCalendarAlt,
  FaArrowRight,
  FaCheckCircle,
  FaUsers,
  FaTrophy,
  FaHeart,
  FaBookmark,
  FaShare,
  FaMagic,
  FaCrown,
  FaGem,
  FaPlay,
  FaDownload,
  FaCertificate,
  FaInfinity,
  FaShieldAlt,
  FaLightbulb,
  FaCode,
  FaGraduationCap,
  FaChartLine,
  FaQuoteLeft,
  FaEye,
  FaThumbsUp
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { Card, Button, Badge } from '../components/ui';
import Footer from '../components/common/Footer';

const bgPattern = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
};

const Offers = () => {
  const [activeOffer, setActiveOffer] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 30,
    seconds: 45
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-rotate hero offers every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOffer((prev) => (prev + 1) % heroOffers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Hero offers data - Based on actual platform courses
  const heroOffers = [
    {
      id: 1,
      title: "🔥 PROGRAMMING BUNDLE",
      subtitle: "Master Programming Languages - Limited Time!",
      discount: "70% OFF",
      originalPrice: "₹24,999",
      salePrice: "₹7,499",
      description: "Complete programming bundle with Python, Java, JavaScript & React",
      gradient: "from-red-600 via-pink-600 to-purple-600",
      badge: "BESTSELLER",
      features: ["Python + Java + JavaScript + React", "Lifetime Access", "Industry Certificates", "Project Portfolio"]
    },
    {
      id: 2,
      title: "🎓 DATA SCIENCE COMBO",
      subtitle: "Become a Data Scientist - Student Special",
      discount: "65% OFF",
      originalPrice: "₹19,999",
      salePrice: "₹6,999",
      description: "Complete Data Science & Machine Learning bundle",
      gradient: "from-blue-600 via-cyan-600 to-teal-600",
      badge: "TRENDING",
      features: ["Data Science + ML + SQL + Python", "Real Projects", "Industry Mentorship", "Job Assistance"]
    },
    {
      id: 3,
      title: "💼 FULL STACK DEVELOPER",
      subtitle: "Complete Web Development Mastery",
      discount: "75% OFF",
      originalPrice: "₹29,999",
      salePrice: "₹7,499",
      description: "Frontend + Backend + Database + Cloud deployment",
      gradient: "from-green-600 via-emerald-600 to-blue-600",
      badge: "MOST POPULAR",
      features: ["React + Node.js + MongoDB + AWS", "Live Projects", "1-on-1 Mentoring", "Placement Support"]
    }
  ];

  // Pricing plans - Based on actual course categories
  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter Pack',
      price: '₹2,999',
      originalPrice: '₹8,999',
      discount: '67%',
      duration: '6 Months Access',
      popular: false,
      features: [
        '15+ Beginner Courses',
        'Python + JavaScript Basics',
        'Email Support',
        'Mobile App Access',
        'Downloadable Resources',
        'Community Forum Access'
      ],
      color: 'from-gray-600 to-gray-800'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '₹7,999',
      originalPrice: '₹24,999',
      discount: '68%',
      duration: 'Lifetime Access',
      popular: true,
      features: [
        '50+ Professional Courses',
        'Full Stack + Data Science',
        'Priority Support',
        'All Device Access',
        'Industry Certificates',
        'Live Doubt Sessions',
        '1-on-1 Mentoring (2 hours)',
        'Job Placement Assistance'
      ],
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'mastery',
      name: 'Complete Mastery',
      price: '₹12,999',
      originalPrice: '₹49,999',
      discount: '74%',
      duration: 'Lifetime Access',
      popular: false,
      features: [
        'All 80+ Premium Courses',
        'Programming + AI + Cloud + Security',
        'Dedicated Success Manager',
        'Unlimited 1-on-1 Mentoring',
        'Live Project Collaboration',
        'Advanced Analytics Dashboard',
        'Direct Industry Connections',
        'Guaranteed Job Placement'
      ],
      color: 'from-yellow-600 to-orange-600'
    }
  ];

  // Flash deals - Based on actual platform courses
  const flashDeals = [
    {
      id: 1,
      title: 'Python for Beginners',
      instructor: 'Dr. Rajesh Kumar',
      rating: 4.8,
      students: 15420,
      originalPrice: '₹2,999',
      salePrice: '₹899',
      discount: '70%',
      image: '🐍',
      timeLeft: '2h 30m',
      sold: 89,
      total: 100,
      category: 'Programming & Development'
    },
    {
      id: 2,
      title: 'Java Programming',
      instructor: 'Prof. Anita Sharma',
      rating: 4.9,
      students: 12750,
      originalPrice: '₹3,999',
      salePrice: '₹1,199',
      discount: '70%',
      image: '☕',
      timeLeft: '1h 45m',
      sold: 67,
      total: 80,
      category: 'Programming & Development'
    },
    {
      id: 3,
      title: 'React.js Development',
      instructor: 'Arjun Patel',
      rating: 4.7,
      students: 18100,
      originalPrice: '₹4,999',
      salePrice: '₹1,499',
      discount: '70%',
      image: '⚛️',
      timeLeft: '3h 15m',
      sold: 45,
      total: 60,
      category: 'Programming & Development'
    },
    {
      id: 4,
      title: 'Data Science with Python',
      instructor: 'Dr. Priya Singh',
      rating: 4.8,
      students: 14890,
      originalPrice: '₹4,199',
      salePrice: '₹1,259',
      discount: '70%',
      image: '📊',
      timeLeft: '4h 20m',
      sold: 78,
      total: 90,
      category: 'Data & AI'
    },
    {
      id: 5,
      title: 'JavaScript & ES6+',
      instructor: 'Rohit Verma',
      rating: 4.6,
      students: 22890,
      originalPrice: '₹2,499',
      salePrice: '₹749',
      discount: '70%',
      image: '🟨',
      timeLeft: '5h 10m',
      sold: 92,
      total: 100,
      category: 'Programming & Development'
    },
    {
      id: 6,
      title: 'Machine Learning Basics',
      instructor: 'Dr. Vikram Joshi',
      rating: 4.7,
      students: 11200,
      originalPrice: '₹3,799',
      salePrice: '₹1,139',
      discount: '70%',
      image: '🤖',
      timeLeft: '6h 45m',
      sold: 56,
      total: 75,
      category: 'Data & AI'
    },
    {
      id: 7,
      title: 'AWS Cloud Practitioner',
      instructor: 'Suresh Reddy',
      rating: 4.5,
      students: 9800,
      originalPrice: '₹3,299',
      salePrice: '₹989',
      discount: '70%',
      image: '☁️',
      timeLeft: '7h 30m',
      sold: 34,
      total: 50,
      category: 'Cloud & DevOps'
    },
    {
      id: 8,
      title: 'Ethical Hacking Fundamentals',
      instructor: 'Cyber Expert Rahul',
      rating: 4.6,
      students: 8500,
      originalPrice: '₹3,999',
      salePrice: '₹1,199',
      discount: '70%',
      image: '🔒',
      timeLeft: '8h 15m',
      sold: 23,
      total: 40,
      category: 'Cybersecurity'
    }
  ];

  // Testimonials - Real student success stories
  const testimonials = [
    {
      id: 1,
      name: 'Arjun Patel',
      role: 'Software Developer at TCS',
      image: '👨‍💻',
      rating: 5,
      text: 'Python course helped me switch from mechanical to software engineering. Got 60% salary increase!',
      course: 'Python for Beginners'
    },
    {
      id: 2,
      name: 'Sneha Reddy',
      role: 'Data Analyst at Wipro',
      image: '👩‍💼',
      rating: 5,
      text: 'Data Science course content is excellent. Projects helped me build strong portfolio.',
      course: 'Data Science with Python'
    },
    {
      id: 3,
      name: 'Vikash Kumar',
      role: 'Frontend Developer at Infosys',
      image: '👨‍💼',
      rating: 5,
      text: 'React.js course made me job-ready. Instructor support was outstanding throughout.',
      course: 'React.js Development'
    },
    {
      id: 4,
      name: 'Anita Sharma',
      role: 'Java Developer at HCL',
      image: '👩‍💻',
      rating: 5,
      text: 'Java programming course helped me get my first tech job. Practical projects were amazing!',
      course: 'Java Programming'
    },
    {
      id: 5,
      name: 'Rohit Verma',
      role: 'Full Stack Developer at Accenture',
      image: '👨‍💻',
      rating: 5,
      text: 'JavaScript course foundation was solid. Now working as full stack developer!',
      course: 'JavaScript & ES6+'
    },
    {
      id: 6,
      name: 'Kavya Nair',
      role: 'ML Engineer at Cognizant',
      image: '👩‍🔬',
      rating: 5,
      text: 'Machine Learning course opened new career opportunities. Mentorship was excellent.',
      course: 'Machine Learning Basics'
    }
  ];

  // Features
  const features = [
    {
      icon: FaInfinity,
      title: 'Lifetime Access',
      description: 'Learn at your own pace with unlimited access'
    },
    {
      icon: FaCertificate,
      title: 'Industry Certificates',
      description: 'Get recognized certificates from top companies'
    },
    {
      icon: FaUsers,
      title: 'Expert Mentors',
      description: '1-on-1 guidance from industry professionals'
    },
    {
      icon: FaShieldAlt,
      title: 'Job Guarantee',
      description: '100% job assistance or money back guarantee'
    },
    {
      icon: FaRocket,
      title: 'Fast Track Learning',
      description: 'Accelerated learning with practical projects'
    },
    {
      icon: FaTrophy,
      title: 'Success Stories',
      description: '50,000+ students placed in top companies'
    }
  ];

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5">
      {/* Hero Section with Rotating Offers */}
      <section className="relative overflow-hidden bg-gradient-to-br from-richblack-900 via-purple-900 to-pink-900 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeOffer}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className={`relative rounded-3xl p-12 bg-gradient-to-r ${heroOffers[activeOffer].gradient} overflow-hidden`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10" style={bgPattern}></div>

              <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Content */}
                <div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6"
                  >
                    <FaFire className="text-orange-300 mr-2" />
                    <span className="font-bold text-sm">{heroOffers[activeOffer].badge}</span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
                  >
                    {heroOffers[activeOffer].title}
                  </motion.h1>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl lg:text-2xl font-medium text-white/90 mb-6"
                  >
                    {heroOffers[activeOffer].subtitle}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg text-white/80 mb-8"
                  >
                    {heroOffers[activeOffer].description}
                  </motion.p>

                  {/* Pricing */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-4 mb-8"
                  >
                    <span className="text-4xl font-bold text-white">{heroOffers[activeOffer].salePrice}</span>
                    <span className="text-2xl text-white/60 line-through">{heroOffers[activeOffer].originalPrice}</span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {heroOffers[activeOffer].discount}
                    </span>
                  </motion.div>

                  {/* Features */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="grid grid-cols-2 gap-3 mb-8"
                  >
                    {heroOffers[activeOffer].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <FaCheckCircle className="text-green-400 text-sm" />
                        <span className="text-white/90 text-sm">{feature}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Link
                      to="/signup-offer"
                      className="group inline-flex items-center justify-center space-x-2 bg-white text-gray-900 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                    >
                      <FaRocket className="text-lg" />
                      <span>Claim This Offer</span>
                      <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </motion.div>
                </div>

                {/* Right Content - Countdown Timer */}
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
                  >
                    <h3 className="text-2xl font-bold mb-6 text-white">⏰ Offer Ends In:</h3>
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      {Object.entries(timeLeft).map(([unit, value]) => (
                        <motion.div
                          key={unit}
                          className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="text-3xl font-bold text-white">{value.toString().padStart(2, '0')}</div>
                          <div className="text-sm text-white/80 capitalize">{unit}</div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="text-red-300 font-semibold">⚡ Limited Time Only!</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Offer Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {heroOffers.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveOffer(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeOffer
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Flash Deals Section */}
      <section className="py-20 bg-richblack-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white flex items-center justify-center gap-3">
                <FaBolt className="text-yellow-400" />
                Flash Deals
                <FaBolt className="text-yellow-400" />
              </h2>
              <p className="text-richblack-400 text-lg">Limited time offers - Grab them before they're gone!</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {flashDeals.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-richblack-700 rounded-xl p-6 border border-richblack-600 hover:border-purple-500 transition-all duration-300 group"
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{deal.image}</div>
                  <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold mb-2">
                    {deal.discount} OFF
                  </div>
                  <div className="text-red-400 text-sm font-semibold">⏰ {deal.timeLeft} left</div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                  {deal.title}
                </h3>
                
                <div className="text-sm text-richblack-300 mb-3">
                  by {deal.instructor}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-3 h-3" />
                    ))}
                  </div>
                  <span className="text-sm text-richblack-300">({deal.rating})</span>
                  <span className="text-sm text-richblack-400">• {deal.students.toLocaleString()} students</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-white">{deal.salePrice}</span>
                  <span className="text-sm text-richblack-400 line-through">{deal.originalPrice}</span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-richblack-400 mb-1">
                    <span>Sold: {deal.sold}/{deal.total}</span>
                    <span>{Math.round((deal.sold / deal.total) * 100)}%</span>
                  </div>
                  <div className="w-full bg-richblack-600 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(deal.sold / deal.total) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <Link to="/all-courses-offer" className="block w-full">
                   <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform group-hover:scale-105">
                     Grab Deal Now
                   </button>
                 </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-20 bg-richblack-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white flex items-center justify-center gap-3">
              <FaCrown className="text-yellow-400" />
              Choose Your Plan
              <FaCrown className="text-yellow-400" />
            </h2>
            <p className="text-richblack-400 text-lg">Select the perfect plan for your learning journey</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`relative bg-richblack-800 rounded-2xl p-8 border-2 transition-all duration-300 ${
                  plan.popular 
                    ? 'border-purple-500 bg-gradient-to-b from-purple-900/20 to-richblack-800' 
                    : 'border-richblack-700 hover:border-purple-500'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                      🔥 MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <div>
                      <div className="text-lg text-richblack-400 line-through">{plan.originalPrice}</div>
                      <div className="text-sm text-green-400 font-semibold">{plan.discount} OFF</div>
                    </div>
                  </div>
                  <div className="text-richblack-400">{plan.duration}</div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-400 flex-shrink-0" />
                      <span className="text-richblack-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/signup-offer" className="block w-full">
                   <button 
                     className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                       plan.popular
                         ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                         : 'bg-richblack-700 text-white hover:bg-richblack-600 border border-richblack-600 hover:border-purple-500'
                     }`}
                   >
                     Choose {plan.name}
                   </button>
                 </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-richblack-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white flex items-center justify-center gap-3">
              <HiSparkles className="text-yellow-400" />
              Why Choose Us?
              <HiSparkles className="text-yellow-400" />
            </h2>
            <p className="text-richblack-400 text-lg">Discover what makes us the best choice for your learning journey</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-richblack-700 rounded-xl p-6 border border-richblack-600 hover:border-purple-500 transition-all duration-300 group text-center"
              >
                <div className="text-4xl text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-richblack-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-richblack-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white flex items-center justify-center gap-3">
              <FaQuoteLeft className="text-blue-400" />
              Success Stories
              <FaQuoteLeft className="text-blue-400" />
            </h2>
            <p className="text-richblack-400 text-lg">Hear from our successful students</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-richblack-800 rounded-xl p-6 border border-richblack-700 hover:border-purple-500 transition-all duration-300 group"
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">{testimonial.image}</div>
                  <h3 className="text-lg font-bold text-white mb-1">{testimonial.name}</h3>
                  <p className="text-purple-400 text-sm mb-2">{testimonial.role}</p>
                  <div className="flex justify-center text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4" />
                    ))}
                  </div>
                </div>
                
                <FaQuoteLeft className="text-2xl text-purple-400 mb-4" />
                <p className="text-richblack-300 leading-relaxed mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="text-sm text-richblack-400">
                  Course: {testimonial.course}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-white">
              Ready to Transform Your Future? 🚀
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
              Join 100,000+ learners who have already started their journey to success. 
              Don't let this opportunity slip away!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
               <Link to="/signup-offer">
                    <button className="bg-white text-purple-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl px-12 py-4 text-xl font-semibold rounded-xl flex items-center justify-center gap-3 min-w-[250px]">
                      <FaRocket className="text-lg" />
                      Start Learning Now
                    </button>
                  </Link>
                  <Link to="/all-courses-offer">
                    <button className="border-2 border-white text-white hover:bg-white hover:text-purple-600 transition-all duration-300 px-12 py-4 text-xl font-semibold rounded-xl flex items-center justify-center gap-3 min-w-[250px]">
                      <FaEye className="text-lg" />
                      Browse Courses
                    </button>
                  </Link>
             </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white/90">
              <div className="flex items-center justify-center gap-3">
                <FaCheckCircle className="text-green-400 text-xl" />
                <span className="text-lg">30-Day Money Back Guarantee</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <FaCheckCircle className="text-green-400 text-xl" />
                <span className="text-lg">Lifetime Access to Content</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <FaCheckCircle className="text-green-400 text-xl" />
                <span className="text-lg">24/7 Expert Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Auto-rotate offers every 3 seconds
setInterval(() => {
  // This will be handled by useEffect in component
}, 3000);

export default Offers;