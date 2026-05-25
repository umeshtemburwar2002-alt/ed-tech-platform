import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaHeart,
  FaHeartBroken,
  FaShoppingCart,
  FaEye,
  FaShare,
  FaStar,
  FaUsers,
  FaClock,
  FaPlay,
  FaBookmark,
  FaGraduationCap,
  FaFilter,
  FaSort,
  FaSearch,
  FaGrid3X3,
  FaList,
  FaTrash,
  FaRocket,
  FaFire,
  FaTags,
  FaCalendarAlt,
  FaDownload,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaLightbulb,
  FaGift,
  FaPercent,
  FaTrophy
} from 'react-icons/fa';
import { Card, Button, Badge } from '../../components/ui';
import { toast } from 'react-hot-toast';

const Wishlist = () => {
  const { user } = useSelector((state) => state.profile);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock wishlist data
  const wishlistItems = [
    {
      id: 1,
      title: "Advanced React Development",
      instructor: "Sarah Wilson",
      instructorImage: "👩‍💻",
      thumbnail: "⚛️",
      category: "Web Development",
      level: "Advanced",
      duration: "45 hours",
      rating: 4.9,
      reviews: 3420,
      students: 28500,
      price: "₹3,999",
      originalPrice: "₹12,999",
      discount: 69,
      addedDate: "2024-01-20",
      skills: ['React', 'Redux', 'Context API', 'Hooks', 'Testing'],
      bestseller: true,
      trending: false,
      newCourse: false,
      certificate: true,
      lifetimeAccess: true,
      mobileAccess: true
    },
    {
      id: 2,
      title: "Machine Learning with Python",
      instructor: "Dr. Alex Kumar",
      instructorImage: "👨‍🔬",
      thumbnail: "🤖",
      category: "Data Science",
      level: "Intermediate",
      duration: "60 hours",
      rating: 4.8,
      reviews: 2890,
      students: 19200,
      price: "₹4,999",
      originalPrice: "₹15,999",
      discount: 69,
      addedDate: "2024-01-18",
      skills: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
      bestseller: false,
      trending: true,
      newCourse: false,
      certificate: true,
      lifetimeAccess: true,
      mobileAccess: true
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      instructor: "Emma Chen",
      instructorImage: "👩‍🎨",
      thumbnail: "🎨",
      category: "Design",
      level: "Beginner",
      duration: "35 hours",
      rating: 4.7,
      reviews: 1560,
      students: 12800,
      price: "₹2,999",
      originalPrice: "₹9,999",
      discount: 70,
      addedDate: "2024-01-15",
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
      bestseller: false,
      trending: false,
      newCourse: true,
      certificate: true,
      lifetimeAccess: true,
      mobileAccess: true
    }
  ];

  // Filter and sort wishlist items
  const filteredItems = wishlistItems
    .filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterCategory === 'all' || item.category.toLowerCase().includes(filterCategory.toLowerCase());
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'price':
          return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
        case 'rating':
          return b.rating - a.rating;
        case 'recent':
        default:
          return new Date(b.addedDate) - new Date(a.addedDate);
      }
    });

  // Calculate statistics
  const stats = {
    total: wishlistItems.length,
    totalValue: wishlistItems.reduce((sum, item) => sum + parseInt(item.originalPrice.replace(/[^0-9]/g, '')), 0),
    totalSavings: wishlistItems.reduce((sum, item) => {
      const original = parseInt(item.originalPrice.replace(/[^0-9]/g, ''));
      const current = parseInt(item.price.replace(/[^0-9]/g, ''));
      return sum + (original - current);
    }, 0),
    avgRating: (wishlistItems.reduce((sum, item) => sum + item.rating, 0) / wishlistItems.length).toFixed(1),
    categories: [...new Set(wishlistItems.map(item => item.category))].length
  };

  const handleRemoveFromWishlist = (itemId) => {
    toast.success('Course removed from wishlist!');
    // Remove logic
  };

  const handleAddToCart = (itemId) => {
    toast.success('Course added to cart!');
    // Add to cart logic
  };

  const handleBuyNow = (itemId) => {
    toast.success('Redirecting to checkout...');
    // Buy now logic
  };

  const handleShare = (item) => {
    navigator.clipboard.writeText(`Check out this course: ${item.title}`);
    toast.success('Course link copied to clipboard!');
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
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                My Wishlist
              </h1>
              <p className="text-richblack-300 text-lg">
                Keep track of courses you want to take and get notified of price drops
              </p>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: "Total Items", value: stats.total, icon: FaHeart, color: "text-pink-400", bg: "bg-pink-600" },
              { label: "Total Value", value: `₹${(stats.totalValue / 1000).toFixed(0)}K`, icon: FaTags, color: "text-green-400", bg: "bg-green-600" },
              { label: "Total Savings", value: `₹${(stats.totalSavings / 1000).toFixed(0)}K`, icon: FaPercent, color: "text-blue-400", bg: "bg-blue-600" },
              { label: "Avg Rating", value: stats.avgRating, icon: FaStar, color: "text-yellow-400", bg: "bg-yellow-600" },
              { label: "Categories", value: stats.categories, icon: FaGraduationCap, color: "text-purple-400", bg: "bg-purple-600" }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-richblack-800 rounded-xl p-4 border border-richblack-700 hover:border-pink-500 transition-all duration-300 group hover:scale-105"
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

        {/* Wishlist Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">💔</div>
              <h3 className="text-2xl font-bold text-white mb-2">Your wishlist is empty</h3>
              <p className="text-richblack-300 mb-6">
                Start adding courses you want to take later
              </p>
              <Link to="/all-courses">
                <Button variant="primary" className="bg-pink-600 hover:bg-pink-700">
                  <FaRocket className="mr-2" />
                  Explore Courses
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-richblack-800 rounded-xl border border-richblack-700 hover:border-pink-500 transition-all duration-300 group hover:scale-105 overflow-hidden p-6"
                >
                  {/* Course Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{item.thumbnail}</div>
                    <div className="flex gap-2">
                      {item.bestseller && (
                        <Badge className="bg-orange-600 text-white">
                          <FaTrophy className="mr-1" /> Bestseller
                        </Badge>
                      )}
                      {item.trending && (
                        <Badge className="bg-red-600 text-white">
                          <FaFire className="mr-1" /> Trending
                        </Badge>
                      )}
                      {item.newCourse && (
                        <Badge className="bg-green-600 text-white">
                          <FaRocket className="mr-1" /> New
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="mb-4">
                    <Badge variant="outline" className="text-xs mb-2">{item.category}</Badge>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-pink-400 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{item.instructorImage}</span>
                      <span className="text-richblack-300 text-sm">by {item.instructor}</span>
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span className="font-semibold">{item.rating}</span>
                      <span className="text-richblack-400">({item.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-richblack-300">
                      <FaUsers className="text-sm" />
                      <span className="text-sm">{item.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-richblack-300">
                      <FaClock className="text-sm" />
                      <span className="text-sm">{item.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-richblack-300">
                      <FaGraduationCap className="text-sm" />
                      <span className="text-sm">{item.level}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-green-400">{item.price}</span>
                      <span className="text-richblack-400 line-through text-sm">{item.originalPrice}</span>
                      <Badge className="bg-red-500 text-white text-xs">{item.discount}% OFF</Badge>
                    </div>
                    <div className="text-xs text-richblack-400">
                      Added on {new Date(item.addedDate).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 text-xs">
                      {item.certificate && (
                        <div className="flex items-center gap-1 text-green-400">
                          <FaCheckCircle />
                          <span>Certificate</span>
                        </div>
                      )}
                      {item.lifetimeAccess && (
                        <div className="flex items-center gap-1 text-blue-400">
                          <FaCheckCircle />
                          <span>Lifetime Access</span>
                        </div>
                      )}
                      {item.mobileAccess && (
                        <div className="flex items-center gap-1 text-purple-400">
                          <FaCheckCircle />
                          <span>Mobile Access</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      variant="primary" 
                      size="small" 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleAddToCart(item.id)}
                    >
                      <FaShoppingCart className="mr-2" />
                      Add to Cart
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="small" 
                      className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                      onClick={() => handleBuyNow(item.id)}
                    >
                      <FaRocket />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="small" 
                      className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      <FaHeartBroken />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Savings Summary */}
        {filteredItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 rounded-xl p-8 text-center"
          >
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-2xl font-bold text-white mb-2">Amazing Savings Await!</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              You're saving ₹{(stats.totalSavings / 1000).toFixed(0)}K on your wishlist! 
              Add these courses to cart and start learning today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                className="bg-white text-red-600 hover:bg-gray-100"
                onClick={() => {
                  filteredItems.forEach(item => handleAddToCart(item.id));
                }}
              >
                <FaShoppingCart className="mr-2" />
                Add All to Cart
              </Button>
              <Link to="/all-courses">
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-red-600"
                >
                  <FaRocket className="mr-2" />
                  Explore More Courses
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;