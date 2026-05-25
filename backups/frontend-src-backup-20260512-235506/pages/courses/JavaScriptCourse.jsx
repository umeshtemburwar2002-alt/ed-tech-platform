import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaStar,
  FaUsers,
  FaClock,
  FaPlay,
  FaDownload,
  FaCertificate,
  FaCheckCircle,
  FaCode,
  FaProjectDiagram,
  FaGraduationCap,
  FaHeart,
  FaShare,
  FaShoppingCart,
  FaQuoteLeft,
  FaChevronDown,
  FaChevronUp,
  FaLightbulb,
  FaRocket,
  FaGift
} from 'react-icons/fa';
import Footer from '../../components/common/Footer';

const JavaScriptCourse = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const courseData = {
    id: 5,
    title: 'JavaScript & ES6+',
    subtitle: 'Modern JavaScript Development Masterclass',
    instructor: 'Rohit Verma',
    instructorTitle: 'Senior JavaScript Developer & Frontend Expert',
    rating: 4.6,
    totalRatings: 22890,
    students: 22890,
    originalPrice: '₹2,499',
    salePrice: '₹749',
    discount: '70%',
    duration: '35 hours',
    lectures: 100,
    level: 'Beginner',
    language: 'Hindi + English',
    certificate: true,
    lastUpdated: 'December 2024',
    category: 'Programming & Development',
    image: '🟨',
    description: 'Master modern JavaScript features and build dynamic web applications. Learn ES6+, DOM manipulation, async programming, and modern development practices.',
    fullDescription: 'This comprehensive JavaScript course will take you from beginner to advanced level in modern JavaScript development. JavaScript is the most popular programming language for web development, used by every major website and application. You will learn core JavaScript concepts, ES6+ features, DOM manipulation, asynchronous programming, and modern development practices. The course includes real-world projects that will help you build interactive web applications and prepare you for frontend developer roles.',
    whatYouWillLearn: [
      'JavaScript fundamentals and syntax',
      'ES6+ modern features and syntax',
      'DOM manipulation and event handling',
      'Asynchronous JavaScript (Promises, Async/Await)',
      'Object-oriented programming in JavaScript',
      'Functional programming concepts',
      'Error handling and debugging',
      'Working with APIs and AJAX',
      'Local storage and session storage',
      'Modern JavaScript tools and workflows',
      'Building interactive web applications',
      'JavaScript best practices and patterns'
    ],
    curriculum: [
      {
        title: 'JavaScript Fundamentals',
        lectures: 15,
        duration: '5 hours',
        topics: ['Variables and data types', 'Operators and expressions', 'Control structures', 'Functions basics']
      },
      {
        title: 'Advanced JavaScript Concepts',
        lectures: 18,
        duration: '6 hours',
        topics: ['Scope and closures', 'Hoisting', 'This keyword', 'Prototypes and inheritance']
      },
      {
        title: 'ES6+ Modern Features',
        lectures: 20,
        duration: '7 hours',
        topics: ['Arrow functions', 'Template literals', 'Destructuring', 'Modules', 'Classes']
      },
      {
        title: 'DOM Manipulation',
        lectures: 15,
        duration: '5 hours',
        topics: ['Selecting elements', 'Event handling', 'Dynamic content', 'Form validation']
      },
      {
        title: 'Asynchronous JavaScript',
        lectures: 12,
        duration: '4 hours',
        topics: ['Callbacks', 'Promises', 'Async/Await', 'Fetch API']
      },
      {
        title: 'Object-Oriented Programming',
        lectures: 10,
        duration: '3 hours',
        topics: ['Constructor functions', 'Classes', 'Inheritance', 'Encapsulation']
      },
      {
        title: 'Working with APIs',
        lectures: 8,
        duration: '3 hours',
        topics: ['REST APIs', 'JSON handling', 'Error handling', 'Authentication']
      },
      {
        title: 'Real-world Projects',
        lectures: 2,
        duration: '2 hours',
        topics: ['Todo app', 'Weather app', 'Quiz application', 'Portfolio project']
      }
    ],
    projects: [
      {
        title: 'Interactive Todo Application',
        description: 'Build a feature-rich todo app with local storage',
        skills: ['DOM manipulation', 'Local storage', 'Event handling', 'ES6 features']
      },
      {
        title: 'Weather Dashboard',
        description: 'Create a weather app using external APIs',
        skills: ['Fetch API', 'Async/Await', 'JSON handling', 'Responsive design']
      },
      {
        title: 'Interactive Quiz Game',
        description: 'Develop a quiz application with scoring system',
        skills: ['Object-oriented programming', 'Timer functions', 'Score tracking', 'UI/UX']
      },
      {
        title: 'Personal Portfolio Website',
        description: 'Build a dynamic portfolio with animations',
        skills: ['Modern JavaScript', 'Animations', 'Form handling', 'Responsive design']
      }
    ],
    requirements: [
      'Basic understanding of HTML and CSS',
      'Computer with modern web browser',
      'Code editor (VS Code recommended)',
      'No prior programming experience required',
      'Willingness to practice coding regularly'
    ],
    features: [
      'Lifetime access to course content',
      'Complete source code for all projects',
      'Industry-recognized certificate',
      'Direct instructor support',
      'Mobile and desktop access',
      'Regular updates with latest JavaScript features',
      '30-day money-back guarantee',
      'Access to JavaScript developer community'
    ]
  };

  const testimonials = [
    {
      name: 'Rohit Verma',
      role: 'Full Stack Developer at Accenture',
      rating: 5,
      text: 'This JavaScript course foundation was solid. Now I am working as a full stack developer! The ES6+ section was particularly helpful.',
      image: '👨‍💻'
    },
    {
      name: 'Neha Sharma',
      role: 'Frontend Developer at TCS',
      rating: 5,
      text: 'Excellent course for JavaScript beginners. Rohit sir explains concepts very clearly with practical examples.',
      image: '👩‍💻'
    },
    {
      name: 'Amit Patel',
      role: 'Web Developer at Infosys',
      rating: 5,
      text: 'Best JavaScript course for beginners. The projects helped me understand real-world application development.',
      image: '👨‍💼'
    }
  ];

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-richblack-900 text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-richblack-900 via-yellow-900 to-richblack-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-6xl">{courseData.image}</span>
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {courseData.discount} OFF
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {courseData.title}
              </h1>
              
              <p className="text-xl text-richblack-300 mb-6">
                {courseData.subtitle}
              </p>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(courseData.rating) ? 'text-yellow-400' : 'text-gray-600'} />
                    ))}
                  </div>
                  <span className="font-bold">{courseData.rating}</span>
                  <span className="text-richblack-400">({courseData.totalRatings.toLocaleString()} ratings)</span>
                </div>
                
                <div className="flex items-center gap-2 text-richblack-300">
                  <FaUsers />
                  <span>{courseData.students.toLocaleString()} students</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-8">
                <span className="text-3xl font-bold text-green-400">{courseData.salePrice}</span>
                <span className="text-xl text-richblack-400 line-through">{courseData.originalPrice}</span>
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Limited Time Offer
                </div>
              </div>
              
              <div className="flex gap-4">
                <button className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-bold py-4 px-8 rounded-xl hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                  <FaShoppingCart />
                  Enroll Now
                </button>
                
                <button className="border border-yellow-500 text-yellow-400 font-bold py-4 px-8 rounded-xl hover:bg-yellow-500 hover:text-white transition-all duration-300 flex items-center gap-2">
                  <FaHeart />
                  Add to Wishlist
                </button>
              </div>
            </motion.div>
            
            {/* Right Content - Course Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-richblack-800 rounded-2xl p-8 border border-richblack-700"
            >
              <div className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl p-8 text-center mb-6">
                <FaPlay className="text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Course Preview</h3>
                <p className="text-yellow-100">Watch sample lessons</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-yellow-400" />
                    <span>Duration</span>
                  </div>
                  <span className="font-bold">{courseData.duration}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaPlay className="text-green-400" />
                    <span>Lectures</span>
                  </div>
                  <span className="font-bold">{courseData.lectures}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaGraduationCap className="text-purple-400" />
                    <span>Level</span>
                  </div>
                  <span className="font-bold">{courseData.level}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaCertificate className="text-yellow-400" />
                    <span>Certificate</span>
                  </div>
                  <span className="font-bold text-green-400">Included</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* What You'll Learn */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <FaLightbulb className="text-yellow-400" />
                  What You'll Learn
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courseData.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-richblack-300">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Course Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold mb-6">Course Description</h2>
                <div className="bg-richblack-800 rounded-xl p-6 border border-richblack-700">
                  <p className="text-richblack-300 leading-relaxed mb-4">
                    {showFullDescription ? courseData.fullDescription : courseData.description}
                  </p>
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-yellow-400 hover:text-yellow-300 font-semibold flex items-center gap-2"
                  >
                    {showFullDescription ? 'Show Less' : 'Read More'}
                    {showFullDescription ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
              </motion.div>

              {/* Curriculum */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <FaCode className="text-yellow-400" />
                  Course Curriculum
                </h2>
                
                <div className="space-y-4">
                  {courseData.curriculum.map((section, index) => (
                    <div key={index} className="bg-richblack-800 rounded-xl border border-richblack-700 overflow-hidden">
                      <button
                        onClick={() => toggleSection(index)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-richblack-700 transition-colors"
                      >
                        <div>
                          <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                          <div className="flex items-center gap-4 text-richblack-400">
                            <span>{section.lectures} lectures</span>
                            <span>•</span>
                            <span>{section.duration}</span>
                          </div>
                        </div>
                        {activeSection === index ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                      
                      {activeSection === index && (
                        <div className="px-6 pb-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {section.topics.map((topic, topicIndex) => (
                              <div key={topicIndex} className="flex items-center gap-2">
                                <FaPlay className="text-green-400 text-sm" />
                                <span className="text-richblack-300">{topic}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Projects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <FaProjectDiagram className="text-yellow-400" />
                  Hands-on Projects
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courseData.projects.map((project, index) => (
                    <div key={index} className="bg-richblack-800 rounded-xl p-6 border border-richblack-700">
                      <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                      <p className="text-richblack-300 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Instructor */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-richblack-800 rounded-xl p-6 border border-richblack-700 mb-8"
              >
                <h3 className="text-xl font-bold mb-4">Your Instructor</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-2xl">
                    👨‍🏫
                  </div>
                  <div>
                    <h4 className="font-bold">{courseData.instructor}</h4>
                    <p className="text-richblack-400 text-sm">{courseData.instructorTitle}</p>
                  </div>
                </div>
                <p className="text-richblack-300 text-sm">
                  Expert JavaScript developer with 8+ years of experience in modern web development.
                </p>
              </motion.div>

              {/* Course Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-richblack-800 rounded-xl p-6 border border-richblack-700 mb-8"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaGift className="text-yellow-400" />
                  Course Features
                </h3>
                <div className="space-y-3">
                  {courseData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-400 flex-shrink-0" />
                      <span className="text-richblack-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-richblack-800 rounded-xl p-6 border border-richblack-700"
              >
                <h3 className="text-xl font-bold mb-4">Requirements</h3>
                <div className="space-y-3">
                  {courseData.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-richblack-300 text-sm">{requirement}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-16 bg-richblack-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">What Students Say</h2>
            <p className="text-richblack-400 text-lg">Real success stories from our JavaScript course graduates</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-richblack-700 rounded-xl p-6 border border-richblack-600"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">{testimonial.image}</div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-richblack-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                
                <div className="relative">
                  <FaQuoteLeft className="text-yellow-400 text-xl mb-2" />
                  <p className="text-richblack-300 italic">{testimonial.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-900 to-orange-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Master JavaScript?</h2>
            <p className="text-xl text-yellow-200 mb-8">
              Join thousands of developers who have mastered modern JavaScript
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-4xl font-bold text-green-400">{courseData.salePrice}</span>
              <span className="text-2xl text-yellow-200 line-through">{courseData.originalPrice}</span>
              <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                {courseData.discount} OFF
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-4 px-8 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                <FaRocket />
                Enroll Now - Limited Time
              </button>
              
              <Link to="/all-courses" className="border border-yellow-300 text-yellow-200 font-bold py-4 px-8 rounded-xl hover:bg-yellow-500 hover:text-white transition-all duration-300">
                View All Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JavaScriptCourse;