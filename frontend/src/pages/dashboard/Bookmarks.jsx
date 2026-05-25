import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaBookmark,
  FaPlay,
  FaEye,
  FaShare,
  FaDownload,
  FaTrash,
  FaClock,
  FaBook,
  FaVideo,
  FaFileAlt,
  FaCode,
  FaQuestionCircle,
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaSort,
  FaGrid3X3,
  FaList,
  FaTags,
  FaFolder,
  FaPlus,
  FaEdit,
  FaStar,
  FaHeart,
  FaCheckCircle,
  FaTimesCircle,
  FaExternalLinkAlt,
  FaRocket,
  FaLightbulb,
  FaGraduationCap,
  FaUsers,
  FaChartLine,
  FaAward,
  FaFire,
  FaGem,
  FaFlag
} from 'react-icons/fa';
import { Card, Button, Badge } from '../../components/ui';
import { toast } from 'react-hot-toast';

const Bookmarks = () => {
  const { user } = useSelector((state) => state.profile);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // Mock bookmarks data
  const bookmarks = [
    {
      id: 1,
      title: "Introduction to React Hooks",
      type: "video",
      course: "Complete Full-Stack Web Development",
      instructor: "John Smith",
      duration: "25 minutes",
      thumbnail: "⚛️",
      category: "Web Development",
      addedDate: "2024-01-21",
      lastAccessed: "2024-01-21",
      progress: 75,
      completed: false,
      folder: "React Fundamentals",
      tags: ['React', 'Hooks', 'JavaScript'],
      notes: "Important concepts about useState and useEffect",
      rating: 4.8,
      difficulty: "Intermediate",
      priority: "high",
      url: "/course/fullstack/lesson/react-hooks"
    },
    {
      id: 2,
      title: "Machine Learning Algorithms Overview",
      type: "article",
      course: "Data Science & AI Masterclass",
      instructor: "Dr. Sarah Johnson",
      duration: "15 minutes read",
      thumbnail: "🤖",
      category: "Data Science",
      addedDate: "2024-01-20",
      lastAccessed: "2024-01-20",
      progress: 100,
      completed: true,
      folder: "ML Concepts",
      tags: ['Machine Learning', 'Algorithms', 'AI'],
      notes: "Comprehensive overview of supervised and unsupervised learning",
      rating: 4.9,
      difficulty: "Advanced",
      priority: "high",
      url: "/course/datascience/article/ml-algorithms"
    },
    {
      id: 3,
      title: "CSS Grid Layout Exercise",
      type: "assignment",
      course: "Complete Full-Stack Web Development",
      instructor: "John Smith",
      duration: "45 minutes",
      thumbnail: "🎨",
      category: "Web Development",
      addedDate: "2024-01-19",
      lastAccessed: "2024-01-19",
      progress: 50,
      completed: false,
      folder: "CSS Mastery",
      tags: ['CSS', 'Grid', 'Layout'],
      notes: "Practice creating responsive layouts with CSS Grid",
      rating: 4.6,
      difficulty: "Intermediate",
      priority: "medium",
      url: "/course/fullstack/assignment/css-grid"
    },
    {
      id: 4,
      title: "Python Data Structures Quiz",
      type: "quiz",
      course: "Python for Beginners",
      instructor: "Alex Kumar",
      duration: "20 minutes",
      thumbnail: "🐍",
      category: "Programming",
      addedDate: "2024-01-18",
      lastAccessed: "2024-01-18",
      progress: 0,
      completed: false,
      folder: "Python Basics",
      tags: ['Python', 'Data Structures', 'Quiz'],
      notes: "Test knowledge of lists, dictionaries, and tuples",
      rating: 4.4,
      difficulty: "Beginner",
      priority: "medium",
      url: "/course/python/quiz/data-structures"
    },
    {
      id: 5,
      title: "Mobile App Navigation Patterns",
      type: "video",
      course: "Mobile App Development with React Native",
      instructor: "Mike Davis",
      duration: "30 minutes",
      thumbnail: "📱",
      category: "Mobile Development",
      addedDate: "2024-01-17",
      lastAccessed: "2024-01-17",
      progress: 25,
      completed: false,
      folder: "Mobile UI/UX",
      tags: ['React Native', 'Navigation', 'Mobile'],
      notes: "Different navigation patterns for mobile apps",
      rating: 4.7,
      difficulty: "Intermediate",
      priority: "low",
      url: "/course/mobile/lesson/navigation"
    },
    {
      id: 6,
      title: "Database Design Best Practices",
      type: "document",
      course: "Complete Full-Stack Web Development",
      instructor: "John Smith",
      duration: "10 minutes read",
      thumbnail: "🗄️",
      category: "Backend Development",
      addedDate: "2024-01-16",
      lastAccessed: "2024-01-16",
      progress: 100,
      completed: true,
      folder: "Backend Concepts",
      tags: ['Database', 'Design', 'Best Practices'],
      notes: "Key principles for designing efficient databases",
      rating: 4.8,
      difficulty: "Advanced",
      priority: "high",
      url: "/course/fullstack/document/database-design"
    }
  ];

  // Get unique folders
  const folders = [...new Set(bookmarks.map(bookmark => bookmark.folder))];

  // Filter and sort bookmarks
  const filteredBookmarks = bookmarks
    .filter(bookmark => {
      const matchesSearch = bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bookmark.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bookmark.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = filterType === 'all' || bookmark.type === filterType;
      const matchesCategory = filterCategory === 'all' || bookmark.category.toLowerCase().includes(filterCategory.toLowerCase());
      
      return matchesSearch && matchesType && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'course':
          return a.course.localeCompare(b.course);
        case 'type':
          return a.type.localeCompare(b.type);
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'recent':
        default:
          return new Date(b.addedDate) - new Date(a.addedDate);
      }
    });

  // Calculate statistics
  const stats = {
    total: bookmarks.length,
    videos: bookmarks.filter(b => b.type === 'video').length,
    articles: bookmarks.filter(b => b.type === 'article').length,
    assignments: bookmarks.filter(b => b.type === 'assignment').length,
    completed: bookmarks.filter(b => b.completed).length,
    folders: folders.length
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return FaVideo;
      case 'article': return FaFileAlt;
      case 'assignment': return FaCode;
      case 'quiz': return FaQuestionCircle;
      case 'document': return FaBook;
      default: return FaBookmark;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return 'text-blue-400';
      case 'article': return 'text-green-400';
      case 'assignment': return 'text-purple-400';
      case 'quiz': return 'text-yellow-400';
      case 'document': return 'text-orange-400';
      default: return 'text-richblack-400';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-richblack-400';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400';
      case 'Intermediate': return 'text-yellow-400';
      case 'Advanced': return 'text-red-400';
      default: return 'text-richblack-400';
    }
  };

  const handleRemoveBookmark = (bookmarkId) => {
    toast.success('Bookmark removed!');
    // Remove logic
  };

  const handleOpenBookmark = (bookmark) => {
    toast.success('Opening bookmark...');
    // Navigate to bookmark URL
  };

  const handleShare = (bookmark) => {
    navigator.clipboard.writeText(`Check out this lesson: ${bookmark.title}`);
    toast.success('Bookmark link copied to clipboard!');
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      toast.success(`Folder "${newFolderName}" created!`);
      setNewFolderName('');
      setShowCreateFolder(false);
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleBulkRemove = () => {
    if (selectedItems.length > 0) {
      toast.success(`${selectedItems.length} bookmarks removed!`);
      setSelectedItems([]);
    }
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
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                My Bookmarks
              </h1>
              <p className="text-richblack-300 text-lg">
                Save and organize your favorite lessons, articles, and resources
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              {selectedItems.length > 0 && (
                <Button 
                  variant="outline" 
                  className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                  onClick={handleBulkRemove}
                >
                  <FaTrash className="mr-2" />
                  Remove Selected ({selectedItems.length})
                </Button>
              )}
              <Button 
                variant="outline" 
                className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white"
                onClick={() => setShowCreateFolder(true)}
              >
                <FaPlus className="mr-2" />
                New Folder
              </Button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            {[
              { label: "Total Bookmarks", value: stats.total, icon: FaBookmark, color: "text-orange-400", bg: "bg-orange-600" },
              { label: "Videos", value: stats.videos, icon: FaVideo, color: "text-blue-400", bg: "bg-blue-600" },
              { label: "Articles", value: stats.articles, icon: FaFileAlt, color: "text-green-400", bg: "bg-green-600" },
              { label: "Assignments", value: stats.assignments, icon: FaCode, color: "text-purple-400", bg: "bg-purple-600" },
              { label: "Completed", value: stats.completed, icon: FaCheckCircle, color: "text-emerald-400", bg: "bg-emerald-600" },
              { label: "Folders", value: stats.folders, icon: FaFolder, color: "text-yellow-400", bg: "bg-yellow-600" }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-richblack-800 rounded-xl p-4 border border-richblack-700 hover:border-orange-500 transition-all duration-300 group hover:scale-105"
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

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-richblack-800 rounded-xl p-6 border border-richblack-700 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-richblack-400" />
              <input
                type="text"
                placeholder="Search bookmarks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-richblack-700 border border-richblack-600 rounded-lg text-white placeholder-richblack-400 focus:outline-none focus:border-orange-500 transition-colors duration-300"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Filter by Type */}
              <div className="flex items-center gap-2">
                <FaFilter className="text-richblack-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-richblack-700 border border-richblack-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors duration-300"
                >
                  <option value="all">All Types</option>
                  <option value="video">Videos</option>
                  <option value="article">Articles</option>
                  <option value="assignment">Assignments</option>
                  <option value="quiz">Quizzes</option>
                  <option value="document">Documents</option>
                </select>
              </div>

              {/* Filter by Category */}
              <div className="flex items-center gap-2">
                <FaTags className="text-richblack-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-richblack-700 border border-richblack-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors duration-300"
                >
                  <option value="all">All Categories</option>
                  <option value="web">Web Development</option>
                  <option value="data">Data Science</option>
                  <option value="mobile">Mobile Development</option>
                  <option value="programming">Programming</option>
                </select>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <FaSort className="text-richblack-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-richblack-700 border border-richblack-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors duration-300"
                >
                  <option value="recent">Recently Added</option>
                  <option value="name">Name</option>
                  <option value="course">Course</option>
                  <option value="type">Type</option>
                  <option value="priority">Priority</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="flex items-center bg-richblack-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors duration-300 ${
                    viewMode === 'grid' ? 'bg-orange-600 text-white' : 'text-richblack-400 hover:text-white'
                  }`}
                >
                  <FaGrid3X3 />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors duration-300 ${
                    viewMode === 'list' ? 'bg-orange-600 text-white' : 'text-richblack-400 hover:text-white'
                  }`}
                >
                  <FaList />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bookmarks Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredBookmarks.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔖</div>
              <h3 className="text-2xl font-bold text-white mb-2">No bookmarks found</h3>
              <p className="text-richblack-300 mb-6">
                {searchTerm ? 'Try adjusting your search terms' : 'Start bookmarking your favorite lessons and resources'}
              </p>
              <Link to="/dashboard/my-courses">
                <Button variant="primary" className="bg-orange-600 hover:bg-orange-700">
                  <FaRocket className="mr-2" />
                  Browse Courses
                </Button>
              </Link>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredBookmarks.map((bookmark, index) => {
                const TypeIcon = getTypeIcon(bookmark.type);
                return (
                  <motion.div
                    key={bookmark.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`bg-richblack-800 rounded-xl border border-richblack-700 hover:border-orange-500 transition-all duration-300 group hover:scale-105 overflow-hidden ${
                      viewMode === 'list' ? 'flex items-center p-4' : 'p-6'
                    }`}
                  >
                    {viewMode === 'grid' ? (
                      // Grid View
                      <>
                        {/* Bookmark Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(bookmark.id)}
                              onChange={() => handleSelectItem(bookmark.id)}
                              className="w-4 h-4 text-orange-600 bg-richblack-700 border-richblack-600 rounded focus:ring-orange-500"
                            />
                            <div className="text-3xl">{bookmark.thumbnail}</div>
                          </div>
                          <div className="flex gap-2">
                            <Badge className={`${getTypeColor(bookmark.type)} bg-richblack-700`}>
                              <TypeIcon className="mr-1" />
                              {bookmark.type}
                            </Badge>
                            <Badge className={`${getPriorityColor(bookmark.priority)} bg-richblack-700`}>
                              <FaFlag className="mr-1" />
                              {bookmark.priority}
                            </Badge>
                          </div>
                        </div>

                        {/* Bookmark Info */}
                        <div className="mb-4">
                          <h3 className="text-lg font-bold mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">
                            {bookmark.title}
                          </h3>
                          <p className="text-richblack-300 text-sm mb-2">{bookmark.course}</p>
                          <p className="text-richblack-400 text-xs mb-3">by {bookmark.instructor}</p>
                          
                          {/* Folder */}
                          <div className="flex items-center gap-2 mb-3">
                            <FaFolder className="text-yellow-400 text-sm" />
                            <span className="text-richblack-300 text-sm">{bookmark.folder}</span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        {bookmark.progress > 0 && (
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-richblack-300">Progress</span>
                              <span className="text-orange-400 font-semibold">{bookmark.progress}%</span>
                            </div>
                            <div className="w-full bg-richblack-700 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${bookmark.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {/* Bookmark Details */}
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-1">
                            <FaClock className="text-richblack-400" />
                            <span className="text-richblack-300">{bookmark.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-400" />
                            <span className="text-white">{bookmark.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaGraduationCap className="text-richblack-400" />
                            <span className={getDifficultyColor(bookmark.difficulty)}>{bookmark.difficulty}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaCalendarAlt className="text-richblack-400" />
                            <span className="text-richblack-300 text-xs">{new Date(bookmark.addedDate).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {bookmark.tags.slice(0, 3).map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {bookmark.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{bookmark.tags.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Notes */}
                        {bookmark.notes && (
                          <div className="mb-4 p-3 bg-richblack-700 rounded-lg">
                            <div className="text-xs text-richblack-400 mb-1">Notes:</div>
                            <div className="text-sm text-richblack-300 line-clamp-2">{bookmark.notes}</div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button 
                            variant="primary" 
                            size="small" 
                            className="flex-1 bg-orange-600 hover:bg-orange-700"
                            onClick={() => handleOpenBookmark(bookmark)}
                          >
                            <FaPlay className="mr-2" />
                            Open
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="small" 
                            className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                            onClick={() => handleShare(bookmark)}
                          >
                            <FaShare />
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="small" 
                            className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                            onClick={() => handleRemoveBookmark(bookmark.id)}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </>
                    ) : (
                      // List View
                      <>
                        <div className="flex items-center gap-4 flex-1">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(bookmark.id)}
                            onChange={() => handleSelectItem(bookmark.id)}
                            className="w-4 h-4 text-orange-600 bg-richblack-700 border-richblack-600 rounded focus:ring-orange-500"
                          />
                          
                          <div className="text-3xl">{bookmark.thumbnail}</div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-bold group-hover:text-orange-400 transition-colors">
                                {bookmark.title}
                              </h3>
                              <Badge className={`${getTypeColor(bookmark.type)} bg-richblack-700 text-xs`}>
                                <TypeIcon className="mr-1" />
                                {bookmark.type}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-richblack-300 mb-2">
                              <span>{bookmark.course}</span>
                              <span>by {bookmark.instructor}</span>
                              <span>{bookmark.duration}</span>
                              <div className="flex items-center gap-1">
                                <FaStar className="text-yellow-400" />
                                <span>{bookmark.rating}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              {bookmark.progress > 0 && (
                                <div className="flex-1 max-w-xs">
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>Progress</span>
                                    <span className="text-orange-400">{bookmark.progress}%</span>
                                  </div>
                                  <div className="w-full bg-richblack-700 rounded-full h-1.5">
                                    <div 
                                      className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 rounded-full"
                                      style={{ width: `${bookmark.progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex gap-2">
                                <Button 
                                  variant="primary" 
                                  size="small" 
                                  className="bg-orange-600 hover:bg-orange-700"
                                  onClick={() => handleOpenBookmark(bookmark)}
                                >
                                  <FaPlay className="mr-2" />
                                  Open
                                </Button>
                                
                                <Button 
                                  variant="outline" 
                                  size="small" 
                                  className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                                  onClick={() => handleRemoveBookmark(bookmark.id)}
                                >
                                  <FaTrash />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Organization Tips */}
        {filteredBookmarks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-xl p-8 text-center"
          >
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-white mb-2">Stay Organized!</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              You have {stats.total} bookmarks across {stats.folders} folders. 
              Keep your learning resources organized for better productivity!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                className="bg-white text-red-600 hover:bg-gray-100"
                onClick={() => setShowCreateFolder(true)}
              >
                <FaPlus className="mr-2" />
                Create New Folder
              </Button>
              <Link to="/dashboard/my-courses">
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-red-600"
                >
                  <FaRocket className="mr-2" />
                  Continue Learning
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {/* Create Folder Modal */}
      {showCreateFolder && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-richblack-800 rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-white mb-4">Create New Folder</h3>
            <input
              type="text"
              placeholder="Enter folder name..."
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="w-full p-3 bg-richblack-700 border border-richblack-600 rounded-lg text-white placeholder-richblack-400 focus:outline-none focus:border-orange-500 mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <Button 
                variant="primary" 
                className="flex-1 bg-orange-600 hover:bg-orange-700"
                onClick={handleCreateFolder}
              >
                Create Folder
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-richblack-500 text-richblack-400 hover:bg-richblack-500 hover:text-white"
                onClick={() => {
                  setShowCreateFolder(false);
                  setNewFolderName('');
                }}
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;