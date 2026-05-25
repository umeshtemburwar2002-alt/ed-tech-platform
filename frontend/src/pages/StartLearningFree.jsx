import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaPlay,
  FaGraduationCap,
  FaUsers,
  FaChartLine,
  FaTrophy,
  FaRocket,
  FaBook,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaFire,
  FaClock,
  FaLightbulb,
  FaCode,
  FaDesktop,
  FaMobile,
  FaDatabase,
  FaRobot,
  FaShieldAlt,
  FaGlobe,
  FaHeart,
  FaUserGraduate,
  FaAward,
  FaInfinity,
  FaBell,
  FaBookmark,
  FaCertificate,
  FaSearch,
  FaQuoteLeft,
  FaHandshake,
  FaBullseye,
  FaChartBar,
  FaProjectDiagram,
  FaTools,
  FaMagic,
  FaEye,
  FaDownload,
  FaShare,
  FaCalendarAlt,
  FaVideo,
  FaHeadphones,
  FaLanguage,
  FaCloudUploadAlt,
  FaBolt,
  FaGem,
  FaCrown,
  FaSparkles,
  FaAtom,
  FaBrain,
  FaNetworkWired,
  FaCloud,
  FaLock,
  FaGamepad,
  FaPaintBrush,
  FaCamera,
  FaMusic,
  FaFilm,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import Footer from '../components/common/Footer';

const StartLearningFree = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [activeTab, setActiveTab] = useState('courses');
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Free courses data
  const freeCourses = [
    {
      id: 1,
      title: 'HTML & CSS Fundamentals',
      description: 'Learn the building blocks of web development with HTML and CSS',
      duration: '4 weeks',
      lessons: 24,
      level: 'Beginner',
      rating: 4.8,
      students: 15420,
      image: '🌐',
      category: 'Web Development',
      skills: ['HTML5', 'CSS3', 'Responsive Design', 'Flexbox'],
      instructor: 'Rahul Sharma',
      progress: 0
    },
    {
      id: 2,
      title: 'JavaScript Basics',
      description: 'Master JavaScript fundamentals and DOM manipulation',
      duration: '6 weeks',
      lessons: 36,
      level: 'Beginner',
      rating: 4.9,
      students: 12850,
      image: '⚡',
      category: 'Programming',
      skills: ['JavaScript', 'DOM', 'Events', 'Functions'],
      instructor: 'Priya Patel',
      progress: 0
    },
    {
      id: 3,
      title: 'Python for Beginners',
      description: 'Start your programming journey with Python',
      duration: '8 weeks',
      lessons: 48,
      level: 'Beginner',
      rating: 4.7,
      students: 18900,
      image: '🐍',
      category: 'Programming',
      skills: ['Python', 'Variables', 'Loops', 'Functions'],
      instructor: 'Amit Kumar',
      progress: 0
    },
    {
      id: 4,
      title: 'Git & GitHub Essentials',
      description: 'Version control and collaboration with Git and GitHub',
      duration: '3 weeks',
      lessons: 18,
      level: 'Beginner',
      rating: 4.6,
      students: 9750,
      image: '📚',
      category: 'Tools',
      skills: ['Git', 'GitHub', 'Version Control', 'Collaboration'],
      instructor: 'Sneha Singh',
      progress: 0
    },
    {
      id: 5,
      title: 'UI/UX Design Basics',
      description: 'Learn design principles and user experience fundamentals',
      duration: '5 weeks',
      lessons: 30,
      level: 'Beginner',
      rating: 4.8,
      students: 11200,
      image: '🎨',
      category: 'Design',
      skills: ['Figma', 'Design Principles', 'User Research', 'Prototyping'],
      instructor: 'Kavya Reddy',
      progress: 0
    },
    {
      id: 6,
      title: 'Digital Marketing Fundamentals',
      description: 'Introduction to digital marketing strategies and tools',
      duration: '4 weeks',
      lessons: 24,
      level: 'Beginner',
      rating: 4.5,
      students: 8650,
      image: '📈',
      category: 'Marketing',
      skills: ['SEO', 'Social Media', 'Content Marketing', 'Analytics'],
      instructor: 'Rohit Agarwal',
      progress: 0
    }
  ];

  // Learning paths
  const learningPaths = [
    {
      id: 1,
      title: 'Web Development Path',
      description: 'Complete journey from beginner to full-stack developer',
      duration: '6 months',
      courses: 8,
      level: 'Beginner to Advanced',
      image: '💻',
      color: 'from-blue-500 to-purple-500',
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'Data Science Path',
      description: 'Learn data analysis, machine learning, and AI',
      duration: '8 months',
      courses: 10,
      level: 'Beginner to Advanced',
      image: '📊',
      color: 'from-green-500 to-teal-500',
      skills: ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'TensorFlow']
    },
    {
      id: 3,
      title: 'Mobile Development Path',
      description: 'Build mobile apps for iOS and Android',
      duration: '7 months',
      courses: 9,
      level: 'Beginner to Advanced',
      image: '📱',
      color: 'from-pink-500 to-red-500',
      skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase']
    }
  ];

  // Features of free learning
  const freeFeatures = [
    {
      icon: FaVideo,
      title: 'HD Video Lectures',
      description: 'High-quality video content with clear explanations'
    },
    {
      icon: FaCode,
      title: 'Hands-on Projects',
      description: 'Build real projects to strengthen your portfolio'
    },
    {
      icon: FaCertificate,
      title: 'Free Certificates',
      description: 'Earn certificates upon course completion'
    },
    {
      icon: FaUsers,
      title: 'Community Support',
      description: 'Connect with fellow learners and get help'
    },
    {
      icon: FaChartLine,
      title: 'Progress Tracking',
      description: 'Monitor your learning progress and achievements'
    },
    {
      icon: FaMobile,
      title: 'Mobile Learning',
      description: 'Learn on-the-go with our mobile-friendly platform'
    }
  ];

  // Success stories
  const successStories = [
    {
      name: 'Arjun Verma',
      role: 'Frontend Developer at Flipkart',
      image: '👨‍💻',
      story: 'Started with free courses and now working at Flipkart. The structured learning path helped me transition from non-tech to tech!',
      course: 'Web Development Path'
    },
    {
      name: 'Pooja Sharma',
      role: 'Data Analyst at Zomato',
      image: '👩‍💼',
      story: 'Free Python and data science courses gave me the foundation. Now I\'m analyzing data for millions of users at Zomato.',
      course: 'Data Science Path'
    },
    {
      name: 'Vikash Singh',
      role: 'Mobile App Developer',
      image: '👨‍🔬',
      story: 'Built my first app using free courses. Now I have 3 apps on Play Store with 100K+ downloads!',
      course: 'Mobile Development Path'
    }
  ];

  // Handle course enrollment
  const handleEnrollCourse = (courseId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    setEnrolledCourses(prev => [...prev, courseId]);
    toast.success('Successfully enrolled in the course!');
  };

  // Handle learning path selection
  const handleSelectPath = (pathId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    setSelectedTrack(pathId);
    toast.success('Learning path selected! Start your journey now.');
  };

  return (
    <div className="min-h-screen bg-richblack-900 text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-richblack-900 via-blue-900 to-purple-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-full border border-green-500/30 mb-8">
                <FaRocket className="text-green-400 mr-3" />
                <span className="text-green-300 font-semibold">🎉 100% Free Learning - No Hidden Costs</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Start Learning
                </span>
                <br />
                <span className="text-white">Absolutely Free!</span>
              </h1>
              
              <p className="text-2xl text-richblack-300 mb-10 leading-relaxed max-w-4xl mx-auto">
                Access <span className="text-green-400 font-bold">premium quality courses</span> without spending a penny. 
                Learn from <span className="text-blue-400 font-bold">industry experts</span> and 
                <span className="text-purple-400 font-bold"> build your dream career</span> today!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <Link to="#courses">
                  <button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/25 px-8 py-4 text-lg font-bold rounded-xl flex items-center gap-3">
                    <FaPlay />
                    Browse Free Courses
                  </button>
                </Link>
                <Link to="#paths">
                  <button className="border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition-all duration-300 px-8 py-4 text-lg font-bold rounded-xl flex items-center gap-3">
                    <FaRocket />
                    Explore Learning Paths
                  </button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-3">
                  <FaUsers className="text-green-400 text-2xl" />
                  <div className="text-left">
                    <div className="text-white font-semibold text-lg">50,000+</div>
                    <div className="text-richblack-400">Active Learners</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <FaTrophy className="text-yellow-400 text-2xl" />
                  <div className="text-left">
                    <div className="text-white font-semibold text-lg">95% Success Rate</div>
                    <div className="text-richblack-400">Course Completion</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <FaCertificate className="text-blue-400 text-2xl" />
                  <div className="text-left">
                    <div className="text-white font-semibold text-lg">25,000+</div>
                    <div className="text-richblack-400">Certificates Issued</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Free Features Section */}
      <section className="py-20 bg-richblack-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">What You Get For Free</h2>
            <p className="text-richblack-400 text-lg">Premium features without any cost - forever!</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {freeFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-richblack-700 rounded-xl p-6 hover:bg-richblack-600 transition-all duration-300 group hover:scale-105"
                >
                  <IconComponent className="text-4xl text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-richblack-300 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-20 bg-richblack-900">
        <div className="max-w-7xl mx-auto px-6">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-richblack-800 rounded-xl p-2 flex gap-2">
              <button
                onClick={() => setActiveTab('courses')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'courses'
                    ? 'bg-green-600 text-white'
                    : 'text-richblack-300 hover:text-white'
                }`}
              >
                Free Courses
              </button>
              <button
                onClick={() => setActiveTab('paths')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'paths'
                    ? 'bg-green-600 text-white'
                    : 'text-richblack-300 hover:text-white'
                }`}
              >
                Learning Paths
              </button>
            </div>
          </div>

          {/* Free Courses Tab */}
          {activeTab === 'courses' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              id="courses"
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 text-white">Free Courses</h2>
                <p className="text-richblack-400 text-lg">Start your learning journey with these carefully curated free courses</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {freeCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-richblack-800 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 group border border-richblack-700 hover:border-green-500"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl">{course.image}</div>
                        <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                          FREE
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                      <p className="text-richblack-300 text-sm mb-4 leading-relaxed">{course.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <div className="text-richblack-400">Duration</div>
                          <div className="text-white font-semibold">{course.duration}</div>
                        </div>
                        <div>
                          <div className="text-richblack-400">Lessons</div>
                          <div className="text-white font-semibold">{course.lessons}</div>
                        </div>
                        <div>
                          <div className="text-richblack-400">Level</div>
                          <div className="text-white font-semibold">{course.level}</div>
                        </div>
                        <div>
                          <div className="text-richblack-400">Students</div>
                          <div className="text-white font-semibold">{course.students.toLocaleString()}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-600'} />
                          ))}
                        </div>
                        <span className="text-white font-semibold">{course.rating}</span>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm text-richblack-400 mb-2">Skills you'll learn:</div>
                        <div className="flex flex-wrap gap-2">
                          {course.skills.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="bg-richblack-700 text-richblack-300 px-2 py-1 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                          {course.skills.length > 3 && (
                            <span className="bg-richblack-700 text-richblack-300 px-2 py-1 rounded text-xs">
                              +{course.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-sm text-richblack-400 mb-4">
                        Instructor: <span className="text-white">{course.instructor}</span>
                      </div>
                      
                      <Link to={`/free-courses/${course.id === 1 ? 'html-css-fundamentals' : course.id === 2 ? 'javascript-basics' : course.id === 3 ? 'python-for-beginners' : course.id === 4 ? 'git-github-essentials' : course.id === 5 ? 'ui-ux-design-basics' : 'digital-marketing-fundamentals'}`}>
                        <button
                          className="w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                        >
                          <FaPlay />
                          View Course Details
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Learning Paths Tab */}
          {activeTab === 'paths' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              id="paths"
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 text-white">Learning Paths</h2>
                <p className="text-richblack-400 text-lg">Structured learning journeys to master specific skills</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {learningPaths.map((path, index) => (
                  <motion.div
                    key={path.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className={`bg-gradient-to-br ${path.color} rounded-2xl p-8 text-white hover:scale-105 transition-all duration-300 h-full relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="text-4xl">{path.image}</div>
                          <div className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-bold">
                            FREE PATH
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-2">{path.title}</h3>
                        <p className="text-lg mb-6 opacity-90">{path.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                          <div>
                            <div className="opacity-80">Duration</div>
                            <div className="font-semibold">{path.duration}</div>
                          </div>
                          <div>
                            <div className="opacity-80">Courses</div>
                            <div className="font-semibold">{path.courses}</div>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <div className="text-sm opacity-80 mb-2">Skills you'll master:</div>
                          <div className="flex flex-wrap gap-2">
                            {path.skills.slice(0, 4).map((skill, idx) => (
                              <span key={idx} className="bg-white/20 text-white px-2 py-1 rounded text-xs">
                                {skill}
                              </span>
                            ))}
                            {path.skills.length > 4 && (
                              <span className="bg-white/20 text-white px-2 py-1 rounded text-xs">
                                +{path.skills.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleSelectPath(path.id)}
                          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                            selectedTrack === path.id
                              ? 'bg-white/30 text-white cursor-not-allowed'
                              : 'bg-white/20 hover:bg-white/30 text-white'
                          }`}
                        >
                          {selectedTrack === path.id ? (
                            <>
                              <FaCheckCircle />
                              Selected
                            </>
                          ) : (
                            <>
                              <FaRocket />
                              Start Path
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-richblack-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Success Stories</h2>
            <p className="text-richblack-400 text-lg">Real people, real transformations with our free courses</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-richblack-700 rounded-xl p-6 border border-richblack-600 hover:border-green-500 transition-all duration-300 group hover:scale-105"
              >
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">{story.image}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{story.name}</h3>
                  <p className="text-green-400 font-semibold">{story.role}</p>
                </div>
                
                <FaQuoteLeft className="text-2xl text-green-400 mb-4" />
                <p className="text-richblack-300 leading-relaxed mb-4">{story.story}</p>
                <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold inline-block">
                  {story.course}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 text-white">
              Ready to Start Your Free Learning Journey? 🚀
            </h2>
            <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
              Join thousands of learners who are already building their dream careers. 
              Start today - it's completely free!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              {user ? (
                <Link to="#courses">
                  <button className="bg-white text-green-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl px-12 py-4 text-xl font-bold rounded-xl flex items-center gap-3">
                    <FaPlay />
                    Start Learning Now
                  </button>
                </Link>
              ) : (
                <Link to="/signup">
                  <button className="bg-white text-green-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl px-12 py-4 text-xl font-bold rounded-xl flex items-center gap-3">
                    <FaRocket />
                    Sign Up Free
                  </button>
                </Link>
              )}
              <Link to="/all-courses">
                <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 transition-all duration-300 px-12 py-4 text-xl font-bold rounded-xl flex items-center gap-3">
                  <FaBook />
                  Explore All Courses
                </button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white/90">
              <div className="flex items-center justify-center gap-3">
                <FaCheckCircle className="text-green-300 text-xl" />
                <span className="text-lg">No Credit Card Required</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <FaCheckCircle className="text-green-300 text-xl" />
                <span className="text-lg">Lifetime Access</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <FaCheckCircle className="text-green-300 text-xl" />
                <span className="text-lg">Community Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StartLearningFree;