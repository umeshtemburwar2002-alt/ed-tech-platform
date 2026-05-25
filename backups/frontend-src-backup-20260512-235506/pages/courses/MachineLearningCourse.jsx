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
  FaGift,
  FaBrain
} from 'react-icons/fa';
import Footer from '../../components/common/Footer';

const MachineLearningCourse = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const courseData = {
    id: 6,
    title: 'Machine Learning A-Z',
    subtitle: 'Complete Machine Learning & AI Masterclass',
    instructor: 'Dr. Rajesh Kumar',
    instructorTitle: 'Senior ML Engineer & AI Research Scientist',
    rating: 4.9,
    totalRatings: 8950,
    students: 8950,
    originalPrice: '₹5,999',
    salePrice: '₹1,799',
    discount: '70%',
    duration: '70 hours',
    lectures: 200,
    level: 'Advanced',
    language: 'Hindi + English',
    certificate: true,
    lastUpdated: 'December 2024',
    category: 'Data & AI',
    image: '🧠',
    description: 'Master Machine Learning algorithms, deep learning, and AI. Build intelligent systems and deploy ML models in production. Perfect for aspiring AI engineers.',
    fullDescription: 'This comprehensive Machine Learning course will take you from beginner to advanced level in artificial intelligence and machine learning. Machine Learning is revolutionizing every industry with high-paying career opportunities. You will learn supervised and unsupervised learning, deep learning, neural networks, computer vision, natural language processing, and how to deploy ML models in production. The course includes hands-on projects that will help you build a strong AI portfolio and prepare you for machine learning engineer roles in top tech companies.',
    whatYouWillLearn: [
      'Machine Learning fundamentals and algorithms',
      'Supervised learning (Regression, Classification)',
      'Unsupervised learning (Clustering, Dimensionality Reduction)',
      'Deep Learning and Neural Networks',
      'Computer Vision and Image Processing',
      'Natural Language Processing (NLP)',
      'Reinforcement Learning basics',
      'Feature engineering and selection',
      'Model evaluation and hyperparameter tuning',
      'TensorFlow and Keras for deep learning',
      'Scikit-learn for traditional ML',
      'Deploying ML models in production'
    ],
    curriculum: [
      {
        title: 'ML Fundamentals & Python',
        lectures: 25,
        duration: '8 hours',
        topics: ['ML introduction', 'Python for ML', 'NumPy & Pandas', 'Data preprocessing']
      },
      {
        title: 'Supervised Learning',
        lectures: 35,
        duration: '12 hours',
        topics: ['Linear regression', 'Logistic regression', 'Decision trees', 'Random forest', 'SVM']
      },
      {
        title: 'Unsupervised Learning',
        lectures: 25,
        duration: '8 hours',
        topics: ['K-means clustering', 'Hierarchical clustering', 'PCA', 'DBSCAN']
      },
      {
        title: 'Deep Learning Fundamentals',
        lectures: 30,
        duration: '10 hours',
        topics: ['Neural networks', 'Backpropagation', 'Activation functions', 'Optimization']
      },
      {
        title: 'Advanced Deep Learning',
        lectures: 25,
        duration: '8 hours',
        topics: ['CNNs', 'RNNs', 'LSTMs', 'Transfer learning']
      },
      {
        title: 'Computer Vision',
        lectures: 20,
        duration: '7 hours',
        topics: ['Image processing', 'Object detection', 'Face recognition', 'OpenCV']
      },
      {
        title: 'Natural Language Processing',
        lectures: 20,
        duration: '7 hours',
        topics: ['Text preprocessing', 'Sentiment analysis', 'Word embeddings', 'Transformers']
      },
      {
        title: 'Model Deployment & MLOps',
        lectures: 20,
        duration: '10 hours',
        topics: ['Model deployment', 'Flask APIs', 'Docker', 'Cloud deployment', 'MLOps']
      }
    ],
    projects: [
      {
        title: 'House Price Prediction System',
        description: 'Build an end-to-end regression model for real estate pricing',
        skills: ['Regression', 'Feature engineering', 'Model evaluation', 'Deployment']
      },
      {
        title: 'Image Classification with CNN',
        description: 'Create a deep learning model for image recognition',
        skills: ['CNNs', 'Computer vision', 'Transfer learning', 'TensorFlow']
      },
      {
        title: 'Sentiment Analysis Engine',
        description: 'Develop an NLP model for social media sentiment analysis',
        skills: ['NLP', 'Text processing', 'LSTM', 'Model deployment']
      },
      {
        title: 'Recommendation System',
        description: 'Build a collaborative filtering recommendation engine',
        skills: ['Collaborative filtering', 'Matrix factorization', 'Deep learning', 'Production deployment']
      }
    ],
    requirements: [
      'Strong Python programming knowledge',
      'Basic understanding of mathematics and statistics',
      'Familiarity with data analysis concepts',
      'Computer with GPU recommended (not mandatory)',
      'Willingness to work with complex algorithms'
    ],
    features: [
      'Lifetime access to course content',
      'Real-world ML projects and datasets',
      'Industry-recognized certificate',
      'Direct instructor support',
      'Jupyter notebooks and code files',
      'Career guidance for ML engineers',
      '30-day money-back guarantee',
      'Access to AI/ML community'
    ]
  };

  const testimonials = [
    {
      name: 'Ankit Sharma',
      role: 'ML Engineer at Google',
      rating: 5,
      text: 'This ML course is exceptional! Dr. Rajesh explains complex algorithms very clearly. Got my dream job at Google after completing this course.',
      image: '👨‍💻'
    },
    {
      name: 'Priya Patel',
      role: 'Data Scientist at Microsoft',
      rating: 5,
      text: 'Best Machine Learning course available. The deep learning section and projects helped me transition to AI field successfully.',
      image: '👩‍💻'
    },
    {
      name: 'Rahul Singh',
      role: 'AI Research Scientist at Amazon',
      rating: 5,
      text: 'Comprehensive course covering everything from basics to advanced topics. The NLP and computer vision projects were outstanding.',
      image: '👨‍💼'
    }
  ];

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-richblack-900 text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-richblack-900 via-indigo-900 to-richblack-900 py-20">
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
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {courseData.discount} OFF
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
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
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                  <FaShoppingCart />
                  Enroll Now
                </button>
                
                <button className="border border-indigo-500 text-indigo-400 font-bold py-4 px-8 rounded-xl hover:bg-indigo-500 hover:text-white transition-all duration-300 flex items-center gap-2">
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
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-8 text-center mb-6">
                <FaPlay className="text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Course Preview</h3>
                <p className="text-indigo-100">Watch sample lessons</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-indigo-400" />
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
                    className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-2"
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
                  <FaBrain className="text-indigo-400" />
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
                  <FaProjectDiagram className="text-indigo-400" />
                  Hands-on Projects
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courseData.projects.map((project, index) => (
                    <div key={index} className="bg-richblack-800 rounded-xl p-6 border border-richblack-700">
                      <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                      <p className="text-richblack-300 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
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
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                    👨‍🏫
                  </div>
                  <div>
                    <h4 className="font-bold">{courseData.instructor}</h4>
                    <p className="text-richblack-400 text-sm">{courseData.instructorTitle}</p>
                  </div>
                </div>
                <p className="text-richblack-300 text-sm">
                  Expert ML engineer with 15+ years of experience in AI research and production ML systems.
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
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
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
            <p className="text-richblack-400 text-lg">Real success stories from our Machine Learning course graduates</p>
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
                  <FaQuoteLeft className="text-indigo-400 text-xl mb-2" />
                  <p className="text-richblack-300 italic">{testimonial.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 to-purple-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Master Machine Learning?</h2>
            <p className="text-xl text-indigo-200 mb-8">
              Join thousands of AI engineers who have transformed their careers
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-4xl font-bold text-green-400">{courseData.salePrice}</span>
              <span className="text-2xl text-indigo-200 line-through">{courseData.originalPrice}</span>
              <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                {courseData.discount} OFF
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-4 px-8 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                <FaRocket />
                Enroll Now - Limited Time
              </button>
              
              <Link to="/all-courses" className="border border-indigo-300 text-indigo-200 font-bold py-4 px-8 rounded-xl hover:bg-indigo-500 hover:text-white transition-all duration-300">
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

export default MachineLearningCourse;