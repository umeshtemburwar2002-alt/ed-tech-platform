import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary, Button, Card, Badge, Loading } from '../components/ui';
import Footer from '../components/common/Footer';
import { courseCategories, getAllCourses } from '../routes/courseRoutes';
import { FaSearch, FaFilter, FaPlay, FaClock, FaUsers, FaStar, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const CourseCatalog = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    setLoading(false);
  }, []);

  // Get all courses
  const allCourses = getAllCourses();

  // Filter courses based on search and filters
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Group courses by category
  const coursesByCategory = Object.entries(courseCategories).reduce((acc, [category, courses]) => {
    const filteredCategoryCourses = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
      const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });
    
    if (filteredCategoryCourses.length > 0) {
      acc[category] = filteredCategoryCourses;
    }
    return acc;
  }, {});

  const handleCourseClick = (coursePath) => {
    if (!user || !token) {
      navigate('/login');
      return;
    }
    navigate(coursePath);
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-richblack-900 flex items-center justify-center">
        <Loading size="large" text="Loading course catalog..." />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-richblack-900 text-richblack-5">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-richblack-800 to-richblack-700 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-richblack-5 mb-4">
                Complete Course Catalog
              </h1>
              <p className="text-lg text-richblack-300 mb-8 max-w-3xl mx-auto">
                Master in-demand skills with our comprehensive collection of courses across programming, data science, cybersecurity, cloud computing, and more.
              </p>
              
              {/* Search and Filters */}
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                  {/* Search Bar */}
                  <div className="relative flex-1 max-w-md">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-richblack-400" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-richblack-800 border border-richblack-600 rounded-lg text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-yellow-50"
                    />
                  </div>
                  
                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 bg-richblack-800 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:border-yellow-50"
                  >
                    <option value="All">All Categories</option>
                    {Object.keys(courseCategories).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  
                  {/* Level Filter */}
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-4 py-3 bg-richblack-800 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:border-yellow-50"
                  >
                    <option value="All">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                
                <div className="mt-4 text-sm text-richblack-400">
                  {filteredCourses.length} courses found
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Categories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {Object.entries(coursesByCategory).map(([category, courses]) => (
            <div key={category} className="mb-12">
              {/* Category Header */}
              <div 
                className="flex items-center justify-between mb-6 cursor-pointer"
                onClick={() => toggleCategory(category)}
              >
                <h2 className="text-2xl font-bold text-richblack-5">{category}</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-richblack-400">{courses.length} courses</span>
                  {expandedCategories[category] ? 
                    <FaChevronUp className="text-richblack-400" /> : 
                    <FaChevronDown className="text-richblack-400" />
                  }
                </div>
              </div>
              
              {/* Course Grid */}
              <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-all duration-300 ${
                expandedCategories[category] === false ? 'hidden' : ''
              }`}>
                {courses.map((course, index) => (
                  <Card 
                    key={index} 
                    className="overflow-hidden hover-lift cursor-pointer group" 
                    hover
                    onClick={() => handleCourseClick(course.path)}
                  >
                    {/* Course Thumbnail */}
                    <div className="aspect-video bg-richblack-700 flex items-center justify-center relative overflow-hidden">
                      <FaPlay className="text-4xl text-richblack-400 group-hover:text-yellow-50 transition-colors" />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="primary" size="small" icon={FaPlay}>
                          Preview
                        </Button>
                      </div>
                    </div>
                    
                    <Card.Body className="p-4">
                      {/* Course Level Badge */}
                      <div className="flex items-center justify-between mb-2">
                        <Badge 
                          variant={
                            course.level === 'Beginner' ? 'success' :
                            course.level === 'Intermediate' ? 'warning' : 'error'
                          }
                          size="small"
                        >
                          {course.level}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <FaStar className="text-yellow-400 w-3 h-3" />
                          <span className="text-xs text-richblack-400">4.8</span>
                        </div>
                      </div>
                      
                      {/* Course Title */}
                      <h3 className="font-semibold text-richblack-5 mb-2 line-clamp-2 group-hover:text-yellow-50 transition-colors">
                        {course.title}
                      </h3>
                      
                      {/* Course Stats */}
                      <div className="flex items-center justify-between text-xs text-richblack-400 mb-3">
                        <div className="flex items-center space-x-1">
                          <FaClock className="w-3 h-3" />
                          <span>12 weeks</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaUsers className="w-3 h-3" />
                          <span>15k+ students</span>
                        </div>
                      </div>
                      
                      {/* Course Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-yellow-50">₹2,999</span>
                          <span className="text-sm text-richblack-400 line-through">₹5,999</span>
                        </div>
                        <Button 
                          variant="primary" 
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCourseClick(course.path);
                          }}
                        >
                          {user && token ? 'View Course' : 'Login to View'}
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          ))}
          
          {/* No Results */}
          {Object.keys(coursesByCategory).length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl text-richblack-600 mb-4">📚</div>
              <h3 className="text-xl font-semibold text-richblack-5 mb-2">No courses found</h3>
              <p className="text-richblack-400 mb-6">Try adjusting your search criteria or filters</p>
              <Button 
                variant="primary" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedLevel('All');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-richblack-800 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-richblack-5 mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-lg text-richblack-300 mb-8">
              Join thousands of students already learning with our comprehensive courses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                size="large"
                onClick={() => user && token ? navigate('/dashboard') : navigate('/signup')}
              >
                {user && token ? 'Go to Dashboard' : 'Sign Up Now'}
              </Button>
              <Button 
                variant="outline" 
                size="large"
                onClick={() => navigate('/about')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default CourseCatalog;
