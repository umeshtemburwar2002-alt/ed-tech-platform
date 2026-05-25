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
  FaChartBar
} from 'react-icons/fa';
import Footer from '../../components/common/Footer';

const DataScienceCourse = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const courseData = {
    id: 4,
    title: 'Data Science with Python',
    subtitle: 'Complete Data Science & Analytics Masterclass',
    instructor: 'Dr. Priya Singh',
    instructorTitle: 'Senior Data Scientist & ML Engineer',
    rating: 4.8,
    totalRatings: 14890,
    students: 14890,
    originalPrice: '₹4,199',
    salePrice: '₹1,259',
    discount: '70%',
    duration: '60 hours',
    lectures: 180,
    level: 'Intermediate',
    language: 'Hindi + English',
    certificate: true,
    lastUpdated: 'December 2024',
    category: 'Data & AI',
    image: '📊',
    description: 'Master Data Science with Python, learn data analysis, visualization, machine learning, and build real-world data projects. Perfect for aspiring data scientists.',
    fullDescription: 'This comprehensive Data Science course will take you from beginner to advanced level in data analysis and machine learning. Data Science is one of the most in-demand fields with high-paying career opportunities. You will learn Python for data science, statistics, data visualization, machine learning algorithms, and how to work with real-world datasets. The course includes hands-on projects that will help you build a strong data science portfolio and prepare you for data scientist roles in top companies.',
    whatYouWillLearn: [
      'Python programming for data science',
      'NumPy and Pandas for data manipulation',
      'Data visualization with Matplotlib & Seaborn',
      'Statistical analysis and hypothesis testing',
      'Machine learning algorithms and implementation',
      'Scikit-learn for ML model building',
      'Data cleaning and preprocessing techniques',
      'Exploratory Data Analysis (EDA)',
      'Feature engineering and selection',
      'Model evaluation and validation',
      'Working with real-world datasets',
      'Building end-to-end data science projects'
    ],
    curriculum: [
      {
        title: 'Python for Data Science',
        lectures: 25,
        duration: '8 hours',
        topics: ['Python basics review', 'NumPy fundamentals', 'Pandas data structures', 'Data import/export']
      },
      {
        title: 'Data Manipulation & Cleaning',
        lectures: 30,
        duration: '10 hours',
        topics: ['Data cleaning techniques', 'Handling missing values', 'Data transformation', 'Merging datasets']
      },
      {
        title: 'Data Visualization',
        lectures: 25,
        duration: '8 hours',
        topics: ['Matplotlib basics', 'Seaborn advanced plots', 'Interactive visualizations', 'Dashboard creation']
      },
      {
        title: 'Statistics for Data Science',
        lectures: 20,
        duration: '7 hours',
        topics: ['Descriptive statistics', 'Probability distributions', 'Hypothesis testing', 'Correlation analysis']
      },
      {
        title: 'Machine Learning Fundamentals',
        lectures: 35,
        duration: '12 hours',
        topics: ['Supervised learning', 'Unsupervised learning', 'Regression algorithms', 'Classification algorithms']
      },
      {
        title: 'Advanced ML Techniques',
        lectures: 25,
        duration: '8 hours',
        topics: ['Ensemble methods', 'Feature engineering', 'Model selection', 'Hyperparameter tuning']
      },
      {
        title: 'Model Deployment',
        lectures: 15,
        duration: '5 hours',
        topics: ['Model serialization', 'Flask API creation', 'Cloud deployment', 'Model monitoring']
      },
      {
        title: 'Capstone Projects',
        lectures: 5,
        duration: '2 hours',
        topics: ['Sales prediction', 'Customer segmentation', 'Recommendation system', 'Portfolio project']
      }
    ],
    projects: [
      {
        title: 'Sales Forecasting System',
        description: 'Build a complete sales prediction model using time series analysis',
        skills: ['Time series', 'Regression', 'Feature engineering', 'Model deployment']
      },
      {
        title: 'Customer Segmentation Analysis',
        description: 'Segment customers using clustering algorithms for targeted marketing',
        skills: ['K-means clustering', 'Data visualization', 'Business insights', 'Reporting']
      },
      {
        title: 'Movie Recommendation Engine',
        description: 'Create a recommendation system using collaborative filtering',
        skills: ['Recommendation algorithms', 'Matrix factorization', 'Evaluation metrics', 'API development']
      },
      {
        title: 'Stock Market Analysis Dashboard',
        description: 'Develop an interactive dashboard for stock market analysis',
        skills: ['Financial data analysis', 'Interactive dashboards', 'Real-time data', 'Visualization']
      }
    ],
    requirements: [
      'Basic Python programming knowledge',
      'High school level mathematics',
      'Computer with Python installed',
      'Interest in data and analytics',
      'Willingness to work with datasets'
    ],
    features: [
      'Lifetime access to course content',
      'Real-world datasets and projects',
      'Industry-recognized certificate',
      'Direct instructor support',
      'Jupyter notebooks included',
      'Career guidance and job assistance',
      '30-day money-back guarantee',
      'Access to data science community'
    ]
  };

  const testimonials = [
    {
      name: 'Sneha Reddy',
      role: 'Data Analyst at Wipro',
      rating: 5,
      text: 'This Data Science course content is excellent. The projects helped me build a strong portfolio and land my dream job!',
      image: '👩‍💼'
    },
    {
      name: 'Amit Kumar',
      role: 'Data Scientist at TCS',
      rating: 5,
      text: 'Dr. Priya explains complex ML concepts in a very simple way. The hands-on approach made learning enjoyable.',
      image: '👨‍💻'
    },
    {
      name: 'Kavya Sharma',
      role: 'ML Engineer at Infosys',
      rating: 5,
      text: 'Best Data Science course available. The real-world projects gave me confidence to work with actual datasets.',
      image: '👩‍💻'
    }
  ];

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-richblack-900 text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-richblack-900 via-purple-900 to-richblack-900 py-20">
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
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {courseData.discount} OFF
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
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
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                  <FaShoppingCart />
                  Enroll Now
                </button>
                
                <button className="border border-purple-500 text-purple-400 font-bold py-4 px-8 rounded-xl hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center gap-2">
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
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-8 text-center mb-6">
                <FaPlay className="text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Course Preview</h3>
                <p className="text-purple-100">Watch sample lessons</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-purple-400" />
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
                    <FaGraduationCap className="text-blue-400" />
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
                    className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-2"
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
                  <FaChartBar className="text-purple-400" />
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
                  <FaProjectDiagram className="text-purple-400" />
                  Hands-on Projects
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courseData.projects.map((project, index) => (
                    <div key={index} className="bg-richblack-800 rounded-xl p-6 border border-richblack-700">
                      <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                      <p className="text-richblack-300 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
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
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl">
                    👩‍🏫
                  </div>
                  <div>
                    <h4 className="font-bold">{courseData.instructor}</h4>
                    <p className="text-richblack-400 text-sm">{courseData.instructorTitle}</p>
                  </div>
                </div>
                <p className="text-richblack-300 text-sm">
                  Expert Data Scientist with 10+ years of experience in machine learning and analytics.
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
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
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
            <p className="text-richblack-400 text-lg">Real success stories from our Data Science course graduates</p>
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
                  <FaQuoteLeft className="text-purple-400 text-xl mb-2" />
                  <p className="text-richblack-300 italic">{testimonial.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-pink-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Data Science Career?</h2>
            <p className="text-xl text-purple-200 mb-8">
              Join thousands of data scientists who have transformed their careers
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-4xl font-bold text-green-400">{courseData.salePrice}</span>
              <span className="text-2xl text-purple-200 line-through">{courseData.originalPrice}</span>
              <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                {courseData.discount} OFF
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-4 px-8 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                <FaRocket />
                Enroll Now - Limited Time
              </button>
              
              <Link to="/all-courses" className="border border-purple-300 text-purple-200 font-bold py-4 px-8 rounded-xl hover:bg-purple-500 hover:text-white transition-all duration-300">
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

export default DataScienceCourse;