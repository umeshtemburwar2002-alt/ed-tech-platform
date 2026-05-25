import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  FaRobot,
  FaBrain,
  FaChartLine,
  FaEye,
  FaLanguage,
  FaCog,
  FaDatabase,
  FaCode,
  FaGraduationCap,
  FaClock,
  FaStar,
  FaUsers,
  FaPlay,
  FaBookmark,
  FaShare,
  FaDownload,
  FaCertificate,
  FaInfinity,
  FaLaptop,
  FaMobile
} from 'react-icons/fa';
import { Card, Button, Badge } from '../../components/ui';
import Footer from '../../components/common/Footer';

const AI = () => {
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const aiTopics = [
    {
      icon: FaBrain,
      title: 'Machine Learning',
      description: 'Learn algorithms, supervised/unsupervised learning, and model evaluation',
      courses: 15,
      color: 'blue'
    },
    {
      icon: FaEye,
      title: 'Computer Vision',
      description: 'Image processing, object detection, and neural networks for visual data',
      courses: 8,
      color: 'green'
    },
    {
      icon: FaLanguage,
      title: 'Natural Language Processing',
      description: 'Text analysis, sentiment analysis, and language models',
      courses: 12,
      color: 'purple'
    },
    {
      icon: FaChartLine,
      title: 'Deep Learning',
      description: 'Neural networks, CNNs, RNNs, and advanced architectures',
      courses: 10,
      color: 'orange'
    },
    {
      icon: FaRobot,
      title: 'AI Ethics & Safety',
      description: 'Responsible AI development and ethical considerations',
      courses: 6,
      color: 'red'
    },
    {
      icon: FaCog,
      title: 'MLOps',
      description: 'Model deployment, monitoring, and production workflows',
      courses: 7,
      color: 'yellow'
    }
  ];

  const featuredCourses = [
    {
      id: 1,
      title: 'Complete Machine Learning Bootcamp 2024',
      instructor: 'Dr. Priya Sharma',
      rating: 4.8,
      students: 15420,
      duration: '40 hours',
      level: 'beginner',
      price: '₹2,999',
      originalPrice: '₹4,999',
      image: '🤖',
      description: 'Master machine learning from scratch with Python, scikit-learn, and real-world projects.',
      topics: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
      features: ['40+ hours of content', '15 hands-on projects', 'Certificate of completion', 'Lifetime access']
    },
    {
      id: 2,
      title: 'Deep Learning with TensorFlow & Keras',
      instructor: 'Prof. Amit Patel',
      rating: 4.9,
      students: 12350,
      duration: '35 hours',
      level: 'intermediate',
      price: '₹3,499',
      originalPrice: '₹5,999',
      image: '🧠',
      description: 'Build neural networks and deep learning models using TensorFlow and Keras.',
      topics: ['TensorFlow', 'Keras', 'Neural Networks', 'CNNs', 'RNNs'],
      features: ['35+ hours of content', '12 deep learning projects', 'GPU training included', 'Industry mentorship']
    },
    {
      id: 3,
      title: 'Computer Vision Masterclass',
      instructor: 'Dr. Sarah Wilson',
      rating: 4.7,
      students: 8760,
      duration: '30 hours',
      level: 'advanced',
      price: '₹4,999',
      originalPrice: '₹7,999',
      image: '👁️',
      description: 'Advanced computer vision techniques including object detection and image segmentation.',
      topics: ['OpenCV', 'YOLO', 'Image Processing', 'Object Detection', 'Segmentation'],
      features: ['30+ hours of content', '10 CV projects', 'Real-world datasets', 'Research papers included']
    },
    {
      id: 4,
      title: 'Natural Language Processing with Python',
      instructor: 'Mike Chen',
      rating: 4.6,
      students: 9870,
      duration: '25 hours',
      level: 'intermediate',
      price: '₹2,799',
      originalPrice: '₹4,499',
      image: '💬',
      description: 'Learn NLP techniques, sentiment analysis, and build chatbots with Python.',
      topics: ['NLTK', 'spaCy', 'Transformers', 'BERT', 'Sentiment Analysis'],
      features: ['25+ hours of content', '8 NLP projects', 'Chatbot development', 'Modern transformers']
    },
    {
      id: 5,
      title: 'AI for Business Leaders',
      instructor: 'Emma Rodriguez',
      rating: 4.5,
      students: 5430,
      duration: '15 hours',
      level: 'beginner',
      price: '₹1,999',
      originalPrice: '₹3,499',
      image: '📊',
      description: 'Understand AI applications in business without technical complexity.',
      topics: ['AI Strategy', 'Business Applications', 'ROI Analysis', 'Implementation'],
      features: ['15+ hours of content', '5 case studies', 'Business templates', 'Executive summary']
    },
    {
      id: 6,
      title: 'MLOps: Production Machine Learning',
      instructor: 'David Kumar',
      rating: 4.8,
      students: 6540,
      duration: '28 hours',
      level: 'advanced',
      price: '₹3,999',
      originalPrice: '₹6,499',
      image: '⚙️',
      description: 'Deploy, monitor, and maintain ML models in production environments.',
      topics: ['Docker', 'Kubernetes', 'MLflow', 'Model Monitoring', 'CI/CD'],
      features: ['28+ hours of content', '6 deployment projects', 'Cloud platforms', 'Best practices']
    }
  ];

  const learningPath = [
    {
      step: 1,
      title: 'Foundations',
      description: 'Python programming, statistics, and linear algebra basics',
      duration: '4-6 weeks',
      courses: ['Python for Data Science', 'Statistics Fundamentals', 'Linear Algebra']
    },
    {
      step: 2,
      title: 'Machine Learning',
      description: 'Core ML algorithms, supervised and unsupervised learning',
      duration: '6-8 weeks',
      courses: ['Machine Learning Bootcamp', 'Data Preprocessing', 'Model Evaluation']
    },
    {
      step: 3,
      title: 'Deep Learning',
      description: 'Neural networks, CNNs, RNNs, and advanced architectures',
      duration: '8-10 weeks',
      courses: ['Deep Learning with TensorFlow', 'Computer Vision', 'NLP Fundamentals']
    },
    {
      step: 4,
      title: 'Specialization',
      description: 'Choose your focus area and build expertise',
      duration: '6-12 weeks',
      courses: ['Advanced Computer Vision', 'Advanced NLP', 'Reinforcement Learning']
    },
    {
      step: 5,
      title: 'Production',
      description: 'Deploy models and build production-ready AI systems',
      duration: '4-6 weeks',
      courses: ['MLOps', 'Model Deployment', 'AI System Design']
    }
  ];

  const filteredCourses = featuredCourses.filter(course => {
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesDuration = selectedDuration === 'all' || 
      (selectedDuration === 'short' && parseInt(course.duration) <= 20) ||
      (selectedDuration === 'medium' && parseInt(course.duration) > 20 && parseInt(course.duration) <= 35) ||
      (selectedDuration === 'long' && parseInt(course.duration) > 35);
    
    return matchesLevel && matchesDuration;
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
        <div className="text-richblack-5 text-xl">Loading AI courses...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-8xl mb-6">🤖</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Artificial Intelligence
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Master the future of technology with comprehensive AI and Machine Learning courses. From fundamentals to advanced applications.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center space-x-2 bg-white bg-opacity-10 px-4 py-2 rounded-lg backdrop-blur">
                <FaGraduationCap className="text-yellow-400" />
                <span className="text-white">58 Courses</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-10 px-4 py-2 rounded-lg backdrop-blur">
                <FaUsers className="text-green-400" />
                <span className="text-white">45,000+ Students</span>
              </div>
              <div className="flex items-center space-x-2 bg-white bg-opacity-10 px-4 py-2 rounded-lg backdrop-blur">
                <FaStar className="text-yellow-400" />
                <span className="text-white">4.7 Average Rating</span>
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
                  Start Learning AI
                </Button>
                <Button variant="outline" size="large" className="border-white text-white hover:bg-white hover:text-richblack-900">
                  View Learning Path
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* AI Topics */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-richblack-5 mb-4">AI Specializations</h2>
            <p className="text-richblack-300 text-lg max-w-2xl mx-auto">
              Explore different areas of artificial intelligence and find your passion
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiTopics.map((topic, index) => {
              const IconComponent = topic.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:scale-105 transition-transform duration-300">
                    <div className={`w-16 h-16 mb-4 rounded-lg flex items-center justify-center ${getColorClasses(topic.color)}`}>
                      <IconComponent className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-richblack-5 mb-3">{topic.title}</h3>
                    <p className="text-richblack-400 mb-4 leading-relaxed">{topic.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-richblack-500">{topic.courses} courses</span>
                      <Button variant="outline" size="small">
                        Explore
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
      <section className="py-16 px-4 bg-richblack-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-richblack-5 mb-4">AI Learning Path</h2>
            <p className="text-richblack-300 text-lg max-w-2xl mx-auto">
              Follow our structured path from beginner to AI expert
            </p>
          </motion.div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-richblack-600 hidden lg:block"></div>
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
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
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
                      {step.courses.map((course, courseIndex) => (
                        <Badge key={courseIndex} variant="neutral" size="small">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-richblack-800 hidden lg:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Filters */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
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
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Durations</option>
              <option value="short">Short (≤20 hours)</option>
              <option value="medium">Medium (21-35 hours)</option>
              <option value="long">Long (35+ hours)</option>
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
            <h2 className="text-4xl font-bold text-richblack-5 mb-4">Featured AI Courses</h2>
            <p className="text-richblack-300 text-lg">
              Hand-picked courses to accelerate your AI journey
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
                  <div className="aspect-video bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center relative">
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
              <FaRobot className="text-6xl text-richblack-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-richblack-5 mb-2">No courses found</h3>
              <p className="text-richblack-400">Try adjusting your filters to see more courses.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Shape the Future with AI?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already building AI solutions and advancing their careers in the most exciting field of technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="large">
                Start Your AI Journey
              </Button>
              <Button variant="outline" size="large" className="border-white text-white hover:bg-white hover:text-richblack-900">
                Download Curriculum
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AI;