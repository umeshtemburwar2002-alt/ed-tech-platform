import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  FaBookOpen,
  FaSearch,
  FaFilter,
  FaClock,
  FaUser,
  FaEye,
  FaHeart,
  FaShare,
  FaCode,
  FaLaptop,
  FaMobile,
  FaDatabase,
  FaCloud,
  FaShieldAlt,
  FaChartLine,
  FaPalette,
  FaRocket
} from 'react-icons/fa';
import { Card, Button, Badge } from '../../components/ui';
import Footer from '../../components/common/Footer';

const Articles = () => {
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 'web-dev', name: 'Web Development', icon: FaLaptop, count: 45 },
    { id: 'mobile-dev', name: 'Mobile Development', icon: FaMobile, count: 32 },
    { id: 'data-science', name: 'Data Science', icon: FaChartLine, count: 28 },
    { id: 'cloud', name: 'Cloud Computing', icon: FaCloud, count: 24 },
    { id: 'security', name: 'Cybersecurity', icon: FaShieldAlt, count: 19 },
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: FaRocket, count: 35 },
    { id: 'database', name: 'Database', icon: FaDatabase, count: 16 },
    { id: 'design', name: 'UI/UX Design', icon: FaPalette, count: 22 }
  ];

  const articles = [
    {
      id: 1,
      title: 'Complete Guide to React Hooks in 2024',
      excerpt: 'Master React Hooks with practical examples and best practices. Learn useState, useEffect, useContext, and custom hooks.',
      category: 'web-dev',
      level: 'intermediate',
      author: 'Sarah Johnson',
      readTime: '12 min read',
      publishDate: '2024-01-15',
      views: 15420,
      likes: 892,
      image: '🚀',
      tags: ['React', 'JavaScript', 'Frontend', 'Hooks']
    },
    {
      id: 2,
      title: 'Building Scalable APIs with Node.js and Express',
      excerpt: 'Learn how to build robust, scalable APIs using Node.js, Express, and MongoDB. Includes authentication, validation, and deployment.',
      category: 'web-dev',
      level: 'advanced',
      author: 'Mike Chen',
      readTime: '18 min read',
      publishDate: '2024-01-12',
      views: 12350,
      likes: 654,
      image: '⚡',
      tags: ['Node.js', 'Express', 'API', 'Backend']
    },
    {
      id: 3,
      title: 'Machine Learning Fundamentals for Beginners',
      excerpt: 'Start your ML journey with this comprehensive guide covering algorithms, data preprocessing, and model evaluation.',
      category: 'ai-ml',
      level: 'beginner',
      author: 'Dr. Priya Sharma',
      readTime: '15 min read',
      publishDate: '2024-01-10',
      views: 18750,
      likes: 1205,
      image: '🤖',
      tags: ['Machine Learning', 'Python', 'AI', 'Data Science']
    },
    {
      id: 4,
      title: 'Flutter vs React Native: Complete Comparison 2024',
      excerpt: 'Detailed comparison of Flutter and React Native for mobile app development. Performance, features, and use cases.',
      category: 'mobile-dev',
      level: 'intermediate',
      author: 'Alex Rodriguez',
      readTime: '20 min read',
      publishDate: '2024-01-08',
      views: 9876,
      likes: 543,
      image: '📱',
      tags: ['Flutter', 'React Native', 'Mobile', 'Cross-platform']
    },
    {
      id: 5,
      title: 'AWS Cloud Architecture Best Practices',
      excerpt: 'Design scalable and secure cloud architectures on AWS. Learn about VPC, EC2, RDS, and serverless technologies.',
      category: 'cloud',
      level: 'advanced',
      author: 'David Kumar',
      readTime: '25 min read',
      publishDate: '2024-01-05',
      views: 7432,
      likes: 398,
      image: '☁️',
      tags: ['AWS', 'Cloud', 'Architecture', 'DevOps']
    },
    {
      id: 6,
      title: 'Cybersecurity Essentials for Developers',
      excerpt: 'Essential security practices every developer should know. OWASP Top 10, secure coding, and vulnerability assessment.',
      category: 'security',
      level: 'intermediate',
      author: 'Emma Wilson',
      readTime: '16 min read',
      publishDate: '2024-01-03',
      views: 11250,
      likes: 687,
      image: '🔒',
      tags: ['Security', 'OWASP', 'Web Security', 'Best Practices']
    },
    {
      id: 7,
      title: 'Data Visualization with Python and Matplotlib',
      excerpt: 'Create stunning data visualizations using Python, Matplotlib, and Seaborn. From basic plots to interactive dashboards.',
      category: 'data-science',
      level: 'beginner',
      author: 'Raj Patel',
      readTime: '14 min read',
      publishDate: '2024-01-01',
      views: 13890,
      likes: 756,
      image: '📊',
      tags: ['Python', 'Data Visualization', 'Matplotlib', 'Analytics']
    },
    {
      id: 8,
      title: 'Modern UI/UX Design Principles',
      excerpt: 'Master modern design principles, color theory, typography, and user experience best practices for digital products.',
      category: 'design',
      level: 'beginner',
      author: 'Lisa Zhang',
      readTime: '11 min read',
      publishDate: '2023-12-28',
      views: 16540,
      likes: 923,
      image: '🎨',
      tags: ['UI/UX', 'Design', 'User Experience', 'Figma']
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || article.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : FaBookOpen;
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'neutral';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-richblack-900 flex items-center justify-center">
        <div className="text-richblack-5 text-xl">Loading articles...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Tech Articles & Tutorials
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Stay updated with the latest in technology. In-depth articles, tutorials, and insights from industry experts.
            </p>
            {user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="large">
                  Bookmark Articles
                </Button>
                <Button variant="outline" size="large" className="border-white text-white hover:bg-white hover:text-richblack-900">
                  My Reading List
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="large">
                  Start Reading
                </Button>
                <Button variant="outline" size="large" className="border-white text-white hover:bg-white hover:text-richblack-900">
                  Join Community
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-richblack-5 mb-4">Browse by Category</h2>
            <p className="text-richblack-300 text-lg">
              Find articles in your area of interest
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className="p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="text-white text-2xl" />
                    </div>
                    <h3 className="text-lg font-bold text-richblack-5 mb-2">{category.name}</h3>
                    <p className="text-richblack-400">{category.count} articles</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4 bg-richblack-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-richblack-400" />
              <input
                type="text"
                placeholder="Search articles, topics, or technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => {
              const CategoryIcon = getCategoryIcon(article.category);
              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:scale-105 transition-transform duration-300 h-full">
                    <div className="aspect-video bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                      <div className="text-6xl">{article.image}</div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant={getLevelColor(article.level)} size="small">
                          {article.level}
                        </Badge>
                        <div className="flex items-center space-x-1 text-richblack-400">
                          <CategoryIcon className="text-sm" />
                          <span className="text-xs">{categories.find(c => c.id === article.category)?.name}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-richblack-5 mb-3 line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-richblack-400 text-sm mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {article.tags.slice(0, 3).map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="neutral" size="small">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-richblack-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <FaUser className="text-xs" />
                            <span>{article.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaClock className="text-xs" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-richblack-500">
                          <div className="flex items-center space-x-1">
                            <FaEye className="text-xs" />
                            <span>{article.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaHeart className="text-xs" />
                            <span>{article.likes}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="small">
                            <FaShare className="text-xs" />
                          </Button>
                          <Button variant="primary" size="small">
                            Read
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          
          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <FaBookOpen className="text-6xl text-richblack-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-richblack-5 mb-2">No articles found</h3>
              <p className="text-richblack-400">Try adjusting your search criteria or browse different categories.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Stay Updated with Latest Articles
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get weekly digest of the best tech articles, tutorials, and industry insights delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white text-richblack-900 placeholder-richblack-600 focus:outline-none"
              />
              <Button variant="primary" size="large">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Articles;