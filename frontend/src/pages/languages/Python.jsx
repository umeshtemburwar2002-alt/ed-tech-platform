import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  FaPython,
  FaCode,
  FaDatabase,
  FaChartLine,
  FaRobot,
  FaGlobe,
  FaServer,
  FaGamepad,
  FaDesktop,
  FaCloud,
  FaGraduationCap,
  FaClock,
  FaStar,
  FaUsers,
  FaPlay,
  FaBookmark,
  FaShare,
  FaDownload,
  FaCheckCircle,
  FaLightbulb,
  FaTools,
  FaProjectDiagram,
  FaRocket
} from 'react-icons/fa';
import { Card, Button, Badge } from '../../components/ui';
import Footer from '../../components/common/Footer';

const Python = () => {
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(true);
  const [selectedTrack, setSelectedTrack] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const pythonTracks = [
    {
      icon: FaChartLine,
      title: 'Data Science',
      description: 'Analyze data, create visualizations, and build predictive models',
      courses: 18,
      color: 'blue',
      skills: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn']
    },
    {
      icon: FaGlobe,
      title: 'Web Development',
      description: 'Build web applications with Django, Flask, and FastAPI',
      courses: 15,
      color: 'green',
      skills: ['Django', 'Flask', 'FastAPI', 'REST APIs']
    },
    {
      icon: FaRobot,
      title: 'Machine Learning',
      description: 'Create intelligent systems and AI applications',
      courses: 22,
      color: 'purple',
      skills: ['TensorFlow', 'PyTorch', 'Keras', 'OpenCV']
    },
    {
      icon: FaServer,
      title: 'Backend Development',
      description: 'Build scalable server-side applications and APIs',
      courses: 12,
      color: 'orange',
      skills: ['Django REST', 'PostgreSQL', 'Redis', 'Celery']
    },
    {
      icon: FaTools,
      title: 'Automation & Scripting',
      description: 'Automate tasks and build powerful scripts',
      courses: 10,
      color: 'red',
      skills: ['Selenium', 'BeautifulSoup', 'Requests', 'Schedule']
    },
    {
      icon: FaGamepad,
      title: 'Game Development',
      description: 'Create games using Pygame and other frameworks',
      courses: 8,
      color: 'yellow',
      skills: ['Pygame', 'Arcade', 'Panda3D', 'Game Logic']
    }
  ];

  const featuredCourses = [
    {
      id: 1,
      title: 'Complete Python Developer Bootcamp 2024',
      instructor: 'Dr. Rajesh Kumar',
      rating: 4.9,
      students: 25420,
      duration: '50 hours',
      level: 'beginner',
      track: 'fundamentals',
      price: '₹2,499',
      originalPrice: '₹4,999',
      image: '🐍',
      description: 'Master Python from basics to advanced concepts with hands-on projects and real-world applications.',
      topics: ['Python Basics', 'OOP', 'File Handling', 'APIs', 'Database'],
      features: ['50+ hours of content', '20 hands-on projects', 'Certificate included', 'Lifetime access']
    },
    {
      id: 2,
      title: 'Data Science with Python Masterclass',
      instructor: 'Dr. Priya Sharma',
      rating: 4.8,
      students: 18350,
      duration: '45 hours',
      level: 'intermediate',
      track: 'data-science',
      price: '₹3,999',
      originalPrice: '₹6,999',
      image: '📊',
      description: 'Complete data science workflow from data collection to machine learning deployment.',
      topics: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn'],
      features: ['45+ hours of content', '15 data projects', 'Real datasets', 'Industry mentorship']
    },
    {
      id: 3,
      title: 'Django Web Development Complete Course',
      instructor: 'Mike Chen',
      rating: 4.7,
      students: 12760,
      duration: '40 hours',
      level: 'intermediate',
      track: 'web-development',
      price: '₹3,499',
      originalPrice: '₹5,999',
      image: '🌐',
      description: 'Build full-stack web applications using Django framework with modern best practices.',
      topics: ['Django', 'Models', 'Views', 'Templates', 'REST Framework'],
      features: ['40+ hours of content', '12 web projects', 'Deployment guide', 'Code reviews']
    },
    {
      id: 4,
      title: 'Python for Machine Learning & AI',
      instructor: 'Prof. Amit Patel',
      rating: 4.9,
      students: 15890,
      duration: '55 hours',
      level: 'advanced',
      track: 'machine-learning',
      price: '₹4,999',
      originalPrice: '₹8,999',
      image: '🤖',
      description: 'Advanced machine learning and AI concepts with TensorFlow, PyTorch, and real projects.',
      topics: ['TensorFlow', 'PyTorch', 'Deep Learning', 'NLP', 'Computer Vision'],
      features: ['55+ hours of content', '18 ML projects', 'GPU training', 'Research papers']
    },
    {
      id: 5,
      title: 'Python Automation & Web Scraping',
      instructor: 'Sarah Wilson',
      rating: 4.6,
      students: 9430,
      duration: '25 hours',
      level: 'beginner',
      track: 'automation',
      price: '₹1,999',
      originalPrice: '₹3,499',
      image: '⚙️',
      description: 'Automate repetitive tasks and scrape web data using Python libraries.',
      topics: ['Selenium', 'BeautifulSoup', 'Requests', 'Pandas', 'Schedule'],
      features: ['25+ hours of content', '10 automation projects', 'Browser automation', 'Data extraction']
    },
    {
      id: 6,
      title: 'Flask API Development & Microservices',
      instructor: 'David Kumar',
      rating: 4.8,
      students: 8540,
      duration: '35 hours',
      level: 'advanced',
      track: 'backend',
      price: '₹3,799',
      originalPrice: '₹6,499',
      image: '🔧',
      description: 'Build scalable APIs and microservices using Flask with modern architecture patterns.',
      topics: ['Flask', 'SQLAlchemy', 'JWT', 'Docker', 'Microservices'],
      features: ['35+ hours of content', '8 API projects', 'Microservices', 'Cloud deployment']
    }
  ];

  const pythonFeatures = [
    {
      icon: FaCode,
      title: 'Easy to Learn',
      description: 'Simple, readable syntax that\'s perfect for beginners'
    },
    {
      icon: FaProjectDiagram,
      title: 'Versatile',
      description: 'Use for web dev, data science, AI, automation, and more'
    },
    {
      icon: FaUsers,
      title: 'Large Community',
      description: 'Massive community support and extensive libraries'
    },
    {
      icon: FaRocket,
      title: 'High Demand',
      description: 'One of the most in-demand programming languages'
    }
  ];

  const learningPath = [
    {
      step: 1,
      title: 'Python Fundamentals',
      description: 'Variables, data types, control structures, functions',
      duration: '2-3 weeks',
      topics: ['Syntax', 'Variables', 'Loops', 'Functions', 'Data Structures']
    },
    {
      step: 2,
      title: 'Object-Oriented Programming',
      description: 'Classes, objects, inheritance, polymorphism',
      duration: '2-3 weeks',
      topics: ['Classes', 'Objects', 'Inheritance', 'Encapsulation', 'Polymorphism']
    },
    {
      step: 3,
      title: 'Libraries & Frameworks',
      description: 'Popular Python libraries and frameworks',
      duration: '3-4 weeks',
      topics: ['NumPy', 'Pandas', 'Requests', 'Flask/Django', 'APIs']
    },
    {
      step: 4,
      title: 'Specialization',
      description: 'Choose your focus area and build expertise',
      duration: '4-8 weeks',
      topics: ['Data Science', 'Web Development', 'Machine Learning', 'Automation']
    },
    {
      step: 5,
      title: 'Advanced Projects',
      description: 'Build portfolio projects and real applications',
      duration: '4-6 weeks',
      topics: ['Portfolio Projects', 'Deployment', 'Testing', 'Best Practices']
    }
  ];

  const filteredCourses = featuredCourses.filter(course => {
    const matchesTrack = selectedTrack === 'all' || course.track === selectedTrack;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesTrack && matchesLevel;
  });

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-100',
      green: 'bg-green-500 text-green-100',
      purple: 'bg-purple-500 text-purple-100',
      orange: 'bg-orange-500 text-orange-100',
      red: 'bg-red-500 text-red-100',
      yellow: 'bg-yellow-500 text-yellow-100'
    };
    return colors[color] || colors.blue;
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
        <div className="text-richblack-5 text-xl">Loading Python courses...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-900 via-green-900 to-yellow-900">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-8xl mb-6">🐍</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Master Python Programming
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Learn the world's most popular programming language. From basics to advanced applications in data science, web development, and AI.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center space-x-2 bg-white bg-opacity-10 px-4 py-2 rounded-lg backdrop-blur">
                <FaGraduationCap className="text-yellow-400" />
                <span className="text-white">85 Courses</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-10 px-4 py-2 rounded-lg backdrop-blur">
                <FaUsers className="text-green-400" />
                <span className="text-white">78,000+ Students</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-10 px-4 py-2 rounded-lg backdrop-blur">
                <FaStar className="text-yellow-400" />
                <span className="text-white">4.8 Average Rating</span>
              </div>
            </div>
            
            {user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="large">
                  Continue Learning
                </Button>
                <Button variant="outline" size="large" className="border-white text-white hover:bg-white hover:text-richblack-900">
                  View My Progress
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="large">
                  Start Learning Python
                </Button>
                <Button variant="outline" size="large" className="border-white text-white hover:bg-white hover:text-richblack-900">
                  Download Python Guide
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Why Python */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-richblack-5 mb-4">Why Learn Python?</h2>
            <p className="text-richblack-300 text-lg max-w-2xl mx-auto">
              Python is the perfect language for beginners and professionals alike
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pythonFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center h-full hover:scale-105 transition-transform duration-300">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="text-white text-2xl" />
                    </div>
                    <h3 className="text-lg font-bold text-richblack-5 mb-3">{feature.title}</h3>
                    <p className="text-richblack-400 text-sm leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Python Tracks */}
      <section className="py-16 px-4 bg-richblack-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-richblack-5 mb-4">Python Career Tracks</h2>
            <p className="text-richblack-300 text-lg max-w-2xl mx-auto">
              Choose your specialization and build expertise in your area of interest
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pythonTracks.map((track, index) => {
              const IconComponent = track.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:scale-105 transition-transform duration-300">
                    <div className={`w-16 h-16 mb-4 rounded-lg flex items-center justify-center ${getColorClasses(track.color)}`}>
                      <IconComponent className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-richblack-5 mb-3">{track.title}</h3>
                    <p className="text-richblack-400 mb-4 leading-relaxed">{track.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {track.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="neutral" size="small">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-richblack-500">{track.courses} courses</span>
                      <Button variant="outline" size="small">
                        Explore Track
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-richblack-5 mb-4">Python Learning Path</h2>
            <p className="text-richblack-300 text-lg max-w-2xl mx-auto">
              Follow our structured path from Python beginner to expert developer
            </p>
          </motion.div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-richblack-700 hidden lg:block"></div>
            {learningPath.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-8 lg:text-right' : 'lg:pl-8 lg:text-left'}`}>
                  <Card className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                        {step.step}
                      </div>
                      <h3 className="text-xl font-bold text-richblack-5">{step.title}</h3>
                    </div>
                    <p className="text-richblack-400 mb-3">{step.description}</p>
                    <div className="flex items-center space-x-2 mb-3">
                      <FaClock className="text-richblack-500" />
                      <span className="text-sm text-richblack-500">{step.duration}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {step.topics.map((topic, topicIndex) => (
                        <Badge key={topicIndex} variant="neutral" size="small">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-4 border-richblack-900 hidden lg:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Filters */}
      <section className="py-8 px-4 bg-richblack-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <select
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value)}
              className="px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Tracks</option>
              <option value="fundamentals">Fundamentals</option>
              <option value="data-science">Data Science</option>
              <option value="web-development">Web Development</option>
              <option value="machine-learning">Machine Learning</option>
              <option value="automation">Automation</option>
              <option value="backend">Backend Development</option>
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

      {/* Featured Courses */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-richblack-5 mb-4">Featured Python Courses</h2>
            <p className="text-richblack-300 text-lg">
              Hand-picked courses to master Python programming
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:scale-105 transition-transform duration-300 h-full">
                  <div className="aspect-video bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center relative">
                    <div className="text-6xl">{course.image}</div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <Button variant="ghost" size="small" className="bg-black bg-opacity-50">
                        <FaBookmark className="text-white" />
                      </Button>
                      <Button variant="ghost" size="small" className="bg-black bg-opacity-50">
                        <FaShare className="text-white" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant={getLevelColor(course.level)} size="small">
                        {course.level}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <FaStar className="text-yellow-400 text-sm" />
                        <span className="text-sm font-medium text-richblack-300">{course.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-richblack-5 mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    
                    <p className="text-richblack-400 text-sm mb-3 line-clamp-2">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-richblack-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <FaUsers className="text-xs" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaClock className="text-xs" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.topics.slice(0, 3).map((topic, topicIndex) => (
                        <Badge key={topicIndex} variant="neutral" size="small">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-richblack-5">{course.price}</span>
                        <span className="text-sm text-richblack-500 line-through ml-2">{course.originalPrice}</span>
                      </div>
                      <div className="text-sm text-richblack-500">
                        by {course.instructor}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="primary" size="small" className="flex-1">
                        Enroll Now
                      </Button>
                      <Button variant="outline" size="small">
                        <FaPlay className="text-xs" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <FaPython className="text-6xl text-richblack-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-richblack-5 mb-2">No courses found</h3>
              <p className="text-richblack-400">Try adjusting your filters to see more courses.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-900 to-green-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Start Your Python Journey Today
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join millions of developers who chose Python as their programming language. Build amazing applications and advance your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="large">
                Start Learning Python
              </Button>
              <Button variant="outline" size="large" className="border-white text-white hover:bg-white hover:text-richblack-900">
                <FaDownload className="mr-2" />
                Download Python Cheatsheet
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Python;