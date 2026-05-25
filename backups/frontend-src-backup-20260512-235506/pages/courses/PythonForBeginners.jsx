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
  FaMapMarkerAlt,
  FaList,
  FaFileCode,
  FaLaptopCode
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import Footer from '../../components/common/Footer';

const PythonForBeginners = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  // Course data
  const courseData = {
    id: 3,
    title: 'Python for Beginners',
    subtitle: 'Start your programming journey with Python',
    description: 'Learn Python programming from scratch with this comprehensive beginner-friendly course. Python is one of the most popular and versatile programming languages, perfect for beginners and used in web development, data science, AI, and automation.',
    instructor: {
      name: 'Amit Kumar',
      title: 'Senior Python Developer & Data Scientist',
      experience: '12+ years',
      image: '👨‍💻',
      bio: 'Amit is a senior Python developer and data scientist with extensive experience in building scalable applications and machine learning models. He has mentored hundreds of students in their Python journey.'
    },
    stats: {
      duration: '8 weeks',
      lessons: 48,
      level: 'Beginner',
      rating: 4.7,
      students: 18900,
      language: 'Hindi/English',
      certificate: true
    },
    price: {
      original: 4999,
      current: 0,
      discount: 100
    },
    skills: ['Python Basics', 'Data Structures', 'Object-Oriented Programming', 'File Handling', 'Error Handling', 'Libraries & Modules'],
    requirements: [
      'No prior programming experience needed',
      'Computer with internet connection',
      'Python 3.x installed (we\'ll guide you)',
      'Enthusiasm to learn programming'
    ],
    outcomes: [
      'Write clean and efficient Python code',
      'Understand programming fundamentals',
      'Work with data structures and algorithms',
      'Build real-world Python applications',
      'Handle files and data processing',
      'Create object-oriented programs'
    ]
  };

  // Course curriculum
  const curriculum = [
    {
      id: 1,
      title: 'Getting Started with Python',
      duration: '1.5 hours',
      lessons: 5,
      topics: [
        'What is Python and why use it?',
        'Installing Python and setting up IDE',
        'Python interactive shell',
        'Writing your first Python program',
        'Understanding Python syntax'
      ]
    },
    {
      id: 2,
      title: 'Variables and Data Types',
      duration: '2 hours',
      lessons: 6,
      topics: [
        'Variables and naming conventions',
        'Numbers: integers and floats',
        'Strings and string operations',
        'Booleans and None type',
        'Type conversion and checking',
        'Project: Personal Information System'
      ]
    },
    {
      id: 3,
      title: 'Operators and Expressions',
      duration: '2 hours',
      lessons: 6,
      topics: [
        'Arithmetic operators',
        'Comparison operators',
        'Logical operators',
        'Assignment operators',
        'Operator precedence',
        'Project: Simple Calculator'
      ]
    },
    {
      id: 4,
      title: 'Control Flow',
      duration: '3 hours',
      lessons: 8,
      topics: [
        'Conditional statements (if, elif, else)',
        'Nested conditions',
        'For loops and range function',
        'While loops',
        'Break and continue statements',
        'Nested loops',
        'Loop else clause',
        'Project: Number Guessing Game'
      ]
    },
    {
      id: 5,
      title: 'Data Structures',
      duration: '4 hours',
      lessons: 10,
      topics: [
        'Lists: creation and manipulation',
        'List methods and operations',
        'Tuples and their uses',
        'Dictionaries: keys and values',
        'Dictionary methods',
        'Sets and set operations',
        'Choosing the right data structure',
        'List comprehensions',
        'Nested data structures',
        'Project: Student Grade Management'
      ]
    },
    {
      id: 6,
      title: 'Functions',
      duration: '3 hours',
      lessons: 8,
      topics: [
        'Defining and calling functions',
        'Parameters and arguments',
        'Return statements',
        'Local and global scope',
        'Default parameters',
        'Variable-length arguments',
        'Lambda functions',
        'Project: Function Library'
      ]
    },
    {
      id: 7,
      title: 'File Handling',
      duration: '2 hours',
      lessons: 6,
      topics: [
        'Opening and closing files',
        'Reading from files',
        'Writing to files',
        'File modes and methods',
        'Working with CSV files',
        'Project: File-based Contact Manager'
      ]
    },
    {
      id: 8,
      title: 'Error Handling',
      duration: '1.5 hours',
      lessons: 4,
      topics: [
        'Understanding exceptions',
        'Try, except, else, finally',
        'Handling specific exceptions',
        'Project: Robust Calculator'
      ]
    },
    {
      id: 9,
      title: 'Object-Oriented Programming',
      duration: '3 hours',
      lessons: 7,
      topics: [
        'Classes and objects',
        'Attributes and methods',
        'Constructor and destructor',
        'Inheritance',
        'Encapsulation',
        'Polymorphism',
        'Project: Library Management System'
      ]
    },
    {
      id: 10,
      title: 'Modules and Packages',
      duration: '2 hours',
      lessons: 5,
      topics: [
        'Importing modules',
        'Creating custom modules',
        'Python standard library',
        'Installing external packages with pip',
        'Project: Weather App using APIs'
      ]
    }
  ];

  // Projects
  const projects = [
    {
      id: 1,
      title: 'Personal Finance Tracker',
      description: 'Build a complete personal finance tracking application with income, expense, and budget management',
      skills: ['Python Basics', 'File Handling', 'Data Structures'],
      duration: '4-5 hours',
      difficulty: 'Beginner'
    },
    {
      id: 2,
      title: 'Quiz Game Application',
      description: 'Create an interactive quiz game with multiple categories, scoring, and leaderboard functionality',
      skills: ['Functions', 'OOP', 'File Handling'],
      duration: '5-6 hours',
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      title: 'Library Management System',
      description: 'Develop a complete library management system with book inventory, member management, and borrowing system',
      skills: ['OOP', 'File Handling', 'Error Handling'],
      duration: '6-8 hours',
      difficulty: 'Intermediate'
    },
    {
      id: 4,
      title: 'Web Scraper & Data Analyzer',
      description: 'Build a web scraper to collect data and analyze it with Python libraries',
      skills: ['Modules', 'Libraries', 'Data Processing'],
      duration: '5-7 hours',
      difficulty: 'Advanced'
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Kavya Reddy',
      role: 'Data Analyst at Wipro',
      image: '👩‍💻',
      rating: 5,
      text: 'Perfect course for beginners! Amit sir explains Python concepts very clearly. I went from zero programming knowledge to building my own applications.'
    },
    {
      name: 'Rajesh Gupta',
      role: 'Software Developer',
      image: '👨‍💼',
      rating: 5,
      text: 'Excellent course structure and practical projects. The step-by-step approach made learning Python enjoyable and effective.'
    },
    {
      name: 'Meera Sharma',
      role: 'Automation Engineer',
      image: '👩‍🔬',
      rating: 5,
      text: 'This course gave me the confidence to pursue a career in programming. Now I use Python daily for automation tasks at work.'
    }
  ];

  // Handle enrollment
  const handleEnrollment = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsEnrolled(true);
    toast.success('Successfully enrolled in Python for Beginners!');
  };

  // Handle start learning
  const handleStartLearning = () => {
    if (!isEnrolled) {
      handleEnrollment();
      return;
    }
    // Navigate to course player
    navigate('/course-player/python-for-beginners');
  };

  return (
    <div className="min-h-screen bg-richblack-900 text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-richblack-900 via-green-900 to-blue-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl">🐍</div>
                <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  FREE COURSE
                </div>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  {courseData.title}
                </span>
              </h1>
              
              <p className="text-2xl text-richblack-300 mb-8">
                {courseData.subtitle}
              </p>
              
              <p className="text-lg text-richblack-400 mb-8 leading-relaxed">
                {courseData.description}
              </p>
              
              {/* Course Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{courseData.stats.duration}</div>
                  <div className="text-richblack-400 text-sm">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{courseData.stats.lessons}</div>
                  <div className="text-richblack-400 text-sm">Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{courseData.stats.level}</div>
                  <div className="text-richblack-400 text-sm">Level</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span className="text-2xl font-bold text-white">{courseData.stats.rating}</span>
                  </div>
                  <div className="text-richblack-400 text-sm">Rating</div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleStartLearning}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl px-8 py-4 text-lg font-bold rounded-xl flex items-center justify-center gap-3"
                >
                  <FaPlay />
                  {isEnrolled ? 'Continue Learning' : 'Start Learning Free'}
                </button>
                <button className="border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition-all duration-300 px-8 py-4 text-lg font-bold rounded-xl flex items-center justify-center gap-3">
                  <FaBookmark />
                  Save for Later
                </button>
              </div>
            </motion.div>

            {/* Right Content - Course Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-richblack-800 rounded-2xl p-8 border border-richblack-700">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{courseData.instructor.image}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{courseData.instructor.name}</h3>
                  <p className="text-green-400 font-semibold">{courseData.instructor.title}</p>
                  <p className="text-richblack-400 text-sm">{courseData.instructor.experience} experience</p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-richblack-400">Students Enrolled</span>
                    <span className="text-white font-semibold">{courseData.stats.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-richblack-400">Language</span>
                    <span className="text-white font-semibold">{courseData.stats.language}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-richblack-400">Certificate</span>
                    <span className="text-green-400 font-semibold flex items-center gap-1">
                      <FaCertificate />
                      Included
                    </span>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">FREE</div>
                  <div className="text-richblack-400 line-through">₹{courseData.price.original}</div>
                  <div className="text-green-400 font-semibold">{courseData.price.discount}% OFF</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-richblack-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8 overflow-x-auto py-4">
            {[
              { id: 'overview', label: 'Overview', icon: FaEye },
              { id: 'curriculum', label: 'Curriculum', icon: FaList },
              { id: 'projects', label: 'Projects', icon: FaFileCode },
              { id: 'instructor', label: 'Instructor', icon: FaUserGraduate },
              { id: 'reviews', label: 'Reviews', icon: FaStar }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white'
                      : 'text-richblack-300 hover:text-white hover:bg-richblack-700'
                  }`}
                >
                  <IconComponent />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">What You'll Learn</h2>
                <div className="space-y-3 mb-8">
                  {courseData.outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-richblack-300">{outcome}</span>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white">Skills You'll Gain</h3>
                <div className="flex flex-wrap gap-3">
                  {courseData.skills.map((skill, index) => (
                    <span key={index} className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">Requirements</h2>
                <div className="space-y-3">
                  {courseData.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <FaArrowRight className="text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-richblack-300">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Curriculum Tab */}
          {activeTab === 'curriculum' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-white">Course Curriculum</h2>
              <div className="space-y-4">
                {curriculum.map((module, index) => (
                  <div key={module.id} className="bg-richblack-800 rounded-xl border border-richblack-700">
                    <button
                      onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-richblack-700 transition-all duration-300"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          Module {index + 1}: {module.title}
                        </h3>
                        <div className="flex items-center gap-6 text-richblack-400">
                          <span className="flex items-center gap-2">
                            <FaClock />
                            {module.duration}
                          </span>
                          <span className="flex items-center gap-2">
                            <FaVideo />
                            {module.lessons} lessons
                          </span>
                        </div>
                      </div>
                      <FaArrowRight className={`text-green-400 transition-transform duration-300 ${
                        expandedModule === module.id ? 'rotate-90' : ''
                      }`} />
                    </button>
                    
                    {expandedModule === module.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <div className="space-y-3">
                          {module.topics.map((topic, topicIndex) => (
                            <div key={topicIndex} className="flex items-center gap-3 text-richblack-300">
                              <FaPlay className="text-green-400 text-sm" />
                              <span>{topic}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-white">Hands-on Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <div key={project.id} className="bg-richblack-800 rounded-xl p-6 border border-richblack-700 hover:border-green-500 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <FaLaptopCode className="text-green-400 text-2xl" />
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        project.difficulty === 'Beginner' ? 'bg-green-600 text-white' :
                        project.difficulty === 'Intermediate' ? 'bg-yellow-600 text-white' :
                        'bg-red-600 text-white'
                      }`}>
                        {project.difficulty}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-richblack-300 mb-4 leading-relaxed">{project.description}</p>
                    
                    <div className="mb-4">
                      <div className="text-sm text-richblack-400 mb-2">Skills Used:</div>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="bg-richblack-700 text-richblack-300 px-2 py-1 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-richblack-400">
                      <span className="flex items-center gap-1">
                        <FaClock />
                        {project.duration}
                      </span>
                      <span>Project {index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Instructor Tab */}
          {activeTab === 'instructor' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-richblack-800 rounded-2xl p-8 border border-richblack-700">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="text-center">
                    <div className="text-8xl mb-4">{courseData.instructor.image}</div>
                    <h2 className="text-3xl font-bold text-white mb-2">{courseData.instructor.name}</h2>
                    <p className="text-green-400 font-semibold text-lg">{courseData.instructor.title}</p>
                    <p className="text-richblack-400">{courseData.instructor.experience} experience</p>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-4">About the Instructor</h3>
                    <p className="text-richblack-300 leading-relaxed mb-6">{courseData.instructor.bio}</p>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{courseData.stats.students.toLocaleString()}+</div>
                        <div className="text-richblack-400">Students Taught</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{courseData.stats.rating}</div>
                        <div className="text-richblack-400">Average Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-white">Student Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-richblack-800 rounded-xl p-6 border border-richblack-700">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl">{testimonial.image}</div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                        <p className="text-green-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex text-yellow-400 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    
                    <p className="text-richblack-300 leading-relaxed">{testimonial.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-richblack-800 border-t border-richblack-700 p-4 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-green-400">FREE</div>
            <div className="text-richblack-400 text-sm">Limited time offer</div>
          </div>
          
          <button
            onClick={handleStartLearning}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl px-8 py-3 text-lg font-bold rounded-xl flex items-center gap-3"
          >
            <FaPlay />
            {isEnrolled ? 'Continue Learning' : 'Enroll Now - Free'}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PythonForBeginners;