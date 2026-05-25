import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  FaBlog,
  FaSearch,
  FaCalendar,
  FaUser,
  FaComment,
  FaHeart,
  FaShare,
  FaBookmark,
  FaChartLine,
  FaFire,
  FaClock,
  FaTag,
  FaArrowRight
} from 'react-icons/fa';
import { Card, Button, Badge } from '../../components/ui';
import Footer from '../../components/common/Footer';

const Blog = () => {
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const tags = [
    'Company News', 'Product Updates', 'Industry Insights', 'Student Success',
    'Instructor Spotlight', 'Technology Trends', 'Career Advice', 'Learning Tips'
  ];

  const featuredPost = {
    id: 1,
    title: 'The Future of Online Education: AI-Powered Learning Experiences',
    excerpt: 'Discover how artificial intelligence is revolutionizing online education and creating personalized learning experiences for millions of students worldwide.',
    content: 'In this comprehensive analysis, we explore the transformative impact of AI on education...',
    author: 'Dr. Rajesh Kumar',
    authorRole: 'CEO & Founder',
    publishDate: '2024-01-20',
    readTime: '8 min read',
    category: 'Industry Insights',
    image: '🚀',
    views: 25430,
    likes: 1847,
    comments: 156,
    tags: ['AI', 'Education', 'Technology', 'Future']
  };

  const blogPosts = [
    {
      id: 2,
      title: 'Student Success Story: From Zero to Full Stack Developer in 6 Months',
      excerpt: 'Meet Priya Sharma, who transformed her career from marketing to software development through our comprehensive full-stack program.',
      author: 'Sarah Johnson',
      authorRole: 'Content Manager',
      publishDate: '2024-01-18',
      readTime: '5 min read',
      category: 'Student Success',
      image: '👩‍💻',
      views: 12350,
      likes: 892,
      comments: 67,
      tags: ['Success Story', 'Career Change', 'Full Stack']
    },
    {
      id: 3,
      title: 'New Course Launch: Advanced Machine Learning with TensorFlow',
      excerpt: 'We\'re excited to announce our latest course on advanced machine learning techniques using TensorFlow and Keras.',
      author: 'Mike Chen',
      authorRole: 'Product Manager',
      publishDate: '2024-01-15',
      readTime: '3 min read',
      category: 'Product Updates',
      image: '🤖',
      views: 8760,
      likes: 543,
      comments: 34,
      tags: ['Course Launch', 'Machine Learning', 'TensorFlow']
    },
    {
      id: 4,
      title: 'Industry Report: Top Programming Languages in 2024',
      excerpt: 'Our comprehensive analysis of the most in-demand programming languages based on job market trends and industry surveys.',
      author: 'Emma Wilson',
      authorRole: 'Research Analyst',
      publishDate: '2024-01-12',
      readTime: '12 min read',
      category: 'Industry Insights',
      image: '📊',
      views: 18920,
      likes: 1205,
      comments: 89,
      tags: ['Programming', 'Industry Report', 'Career']
    },
    {
      id: 5,
      title: 'Instructor Spotlight: Meet Dr. Amit Patel, AI Research Expert',
      excerpt: 'Get to know our lead AI instructor, his journey from academia to industry, and his passion for teaching complex concepts.',
      author: 'Lisa Zhang',
      authorRole: 'HR Manager',
      publishDate: '2024-01-10',
      readTime: '6 min read',
      category: 'Instructor Spotlight',
      image: '👨‍🏫',
      views: 9430,
      likes: 678,
      comments: 45,
      tags: ['Instructor', 'AI', 'Teaching']
    },
    {
      id: 6,
      title: 'Platform Update: Enhanced Video Player and Mobile Experience',
      excerpt: 'We\'ve rolled out major improvements to our video player, mobile app, and overall user experience based on your feedback.',
      author: 'David Kumar',
      authorRole: 'CTO',
      publishDate: '2024-01-08',
      readTime: '4 min read',
      category: 'Product Updates',
      image: '📱',
      views: 15670,
      likes: 934,
      comments: 78,
      tags: ['Platform Update', 'Mobile', 'UX']
    },
    {
      id: 7,
      title: '5 Essential Tips for Effective Online Learning',
      excerpt: 'Maximize your online learning experience with these proven strategies for staying motivated, organized, and successful.',
      author: 'Alex Rodriguez',
      authorRole: 'Learning Specialist',
      publishDate: '2024-01-05',
      readTime: '7 min read',
      category: 'Learning Tips',
      image: '💡',
      views: 22180,
      likes: 1456,
      comments: 123,
      tags: ['Learning Tips', 'Study Skills', 'Motivation']
    },
    {
      id: 8,
      title: 'Career Transition Guide: Breaking into Tech Without a CS Degree',
      excerpt: 'Practical advice for career changers looking to enter the tech industry through alternative education paths and skill development.',
      author: 'Raj Patel',
      authorRole: 'Career Counselor',
      publishDate: '2024-01-03',
      readTime: '10 min read',
      category: 'Career Advice',
      image: '🎯',
      views: 31250,
      likes: 2103,
      comments: 187,
      tags: ['Career Change', 'Tech Jobs', 'Skills']
    },
    {
      id: 9,
      title: 'Company Milestone: Celebrating 50,000 Students Worldwide',
      excerpt: 'A heartfelt thank you to our amazing community as we reach this incredible milestone in our mission to democratize education.',
      author: 'Dr. Rajesh Kumar',
      authorRole: 'CEO & Founder',
      publishDate: '2024-01-01',
      readTime: '5 min read',
      category: 'Company News',
      image: '🎉',
      views: 28940,
      likes: 3247,
      comments: 298,
      tags: ['Milestone', 'Community', 'Gratitude']
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTag = selectedTag === 'all' || post.category === selectedTag;
    
    return matchesSearch && matchesTag;
  });

  const getCategoryColor = (category) => {
    const colors = {
      'Company News': 'blue',
      'Product Updates': 'green',
      'Industry Insights': 'purple',
      'Student Success': 'yellow',
      'Instructor Spotlight': 'orange',
      'Technology Trends': 'red',
      'Career Advice': 'indigo',
      'Learning Tips': 'pink'
    };
    return colors[category] || 'neutral';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-richblack-900 flex items-center justify-center">
        <div className="text-richblack-5 text-xl">Loading blog...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-indigo-900 to-purple-900">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              EdTech  Blog
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
              Insights, updates, and stories from the world of online education. Stay connected with our community and industry trends.
            </p>
            {user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="large">
                  My Bookmarks
                </Button>
                <Button variant="outline" size="large" className="border-white text-white hover:bg-white hover:text-richblack-900">
                  Subscribe to Newsletter
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="large">
                  Start Reading
                </Button>
                <Button variant="outline" size="large" className="border-white text-white hover:bg-white hover:text-richblack-900">
                  Subscribe to Updates
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-2 mb-4">
              <FaFire className="text-orange-500 text-xl" />
              <h2 className="text-2xl font-bold text-richblack-5">Featured Post</h2>
            </div>
            
            <Card className="overflow-hidden hover:scale-[1.02] transition-transform duration-300">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="aspect-video lg:aspect-auto bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                  <div className="text-8xl">{featuredPost.image}</div>
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge variant={getCategoryColor(featuredPost.category)}>
                      {featuredPost.category}
                    </Badge>
                    <div className="flex items-center space-x-1 text-richblack-400">
                      <FaChartLine className="text-sm" />
                      <span className="text-sm">Trending</span>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-richblack-5 mb-4">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-richblack-300 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-richblack-400">
                      <div className="flex items-center space-x-1">
                        <FaUser className="text-xs" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaCalendar className="text-xs" />
                        <span>{featuredPost.publishDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaClock className="text-xs" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-richblack-500">
                      <div className="flex items-center space-x-1">
                        <FaHeart className="text-xs" />
                        <span>{featuredPost.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaComment className="text-xs" />
                        <span>{featuredPost.comments}</span>
                      </div>
                    </div>
                    <Button variant="primary">
                      Read More <FaArrowRight className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Search and Tags */}
      <section className="py-8 px-4 bg-richblack-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-richblack-400" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTag === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-richblack-700 text-richblack-300 hover:bg-richblack-600'
                }`}
              >
                All Posts
              </button>
              {tags.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? 'bg-blue-600 text-white'
                      : 'bg-richblack-700 text-richblack-300 hover:bg-richblack-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:scale-105 transition-transform duration-300 h-full">
                  <div className="aspect-video bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <div className="text-6xl">{post.image}</div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant={getCategoryColor(post.category)} size="small">
                        {post.category}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="small">
                          <FaBookmark className="text-xs" />
                        </Button>
                        <Button variant="ghost" size="small">
                          <FaShare className="text-xs" />
                        </Button>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-richblack-5 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-richblack-400 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-richblack-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <FaUser className="text-xs" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaClock className="text-xs" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-richblack-500">
                        <div className="flex items-center space-x-1">
                          <FaHeart className="text-xs" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaComment className="text-xs" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                      <Button variant="primary" size="small">
                        Read More
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <FaBlog className="text-6xl text-richblack-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-richblack-5 mb-2">No posts found</h3>
              <p className="text-richblack-400">Try adjusting your search or browse different categories.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Never Miss an Update
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our blog newsletter and get the latest posts, company updates, and exclusive content delivered to your inbox.
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

export default Blog;