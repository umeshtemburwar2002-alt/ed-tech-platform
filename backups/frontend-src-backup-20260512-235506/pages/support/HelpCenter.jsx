import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  FaQuestionCircle,
  FaSearch,
  FaBook,
  FaVideo,
  FaComments,
  FaEnvelope,
  FaPhone,
  FaChevronDown,
  FaChevronUp,
  FaLightbulb,
  FaCreditCard,
  FaUser,
  FaGraduationCap,
  FaCog,
  FaShieldAlt,
  FaDownload,
  FaExternalLinkAlt,
  FaThumbsUp,
  FaThumbsDown
} from 'react-icons/fa';
import { Card, Button, Badge } from '../../components/ui';
import Footer from '../../components/common/Footer';

const HelpCenter = () => {
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: FaLightbulb, count: 12 },
    { id: 'account', name: 'Account & Profile', icon: FaUser, count: 8 },
    { id: 'courses', name: 'Courses & Learning', icon: FaGraduationCap, count: 15 },
    { id: 'billing', name: 'Billing & Payments', icon: FaCreditCard, count: 10 },
    { id: 'technical', name: 'Technical Issues', icon: FaCog, count: 9 },
    { id: 'security', name: 'Security & Privacy', icon: FaShieldAlt, count: 6 }
  ];

  const quickActions = [
    {
      title: 'Contact Support',
      description: 'Get help from our support team',
      icon: FaEnvelope,
      action: 'contact',
      color: 'blue'
    },
    {
      title: 'Live Chat',
      description: 'Chat with us in real-time',
      icon: FaComments,
      action: 'chat',
      color: 'green'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      icon: FaVideo,
      action: 'tutorials',
      color: 'purple'
    },
    {
      title: 'Download App',
      description: 'Get our mobile app',
      icon: FaDownload,
      action: 'download',
      color: 'orange'
    }
  ];

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I create an account?',
      answer: 'To create an account, click the "Sign Up" button in the top right corner of our homepage. You can sign up using your email address or through Google/Facebook. After entering your details, you\'ll receive a verification email to activate your account.',
      helpful: 245,
      notHelpful: 12
    },
    {
      id: 2,
      category: 'getting-started',
      question: 'How do I enroll in a course?',
      answer: 'Browse our course catalog, select the course you want, and click "Enroll Now". If it\'s a paid course, you\'ll be directed to the payment page. Once payment is complete, you\'ll have immediate access to all course materials.',
      helpful: 189,
      notHelpful: 8
    },
    {
      id: 3,
      category: 'courses',
      question: 'Can I download course videos for offline viewing?',
      answer: 'Yes! Premium subscribers can download course videos for offline viewing through our mobile app. Simply tap the download icon next to any video lesson. Downloaded content is available for 30 days.',
      helpful: 156,
      notHelpful: 23
    },
    {
      id: 4,
      category: 'billing',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, UPI, net banking, and digital wallets. All payments are processed securely through our encrypted payment gateway.',
      helpful: 134,
      notHelpful: 5
    },
    {
      id: 5,
      category: 'billing',
      question: 'Can I get a refund?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all paid courses. If you\'re not satisfied with your purchase, contact our support team within 30 days for a full refund. Refunds are processed within 5-7 business days.',
      helpful: 298,
      notHelpful: 15
    },
    {
      id: 6,
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password. The link expires in 24 hours.',
      helpful: 167,
      notHelpful: 9
    },
    {
      id: 7,
      category: 'courses',
      question: 'Do I get a certificate after completing a course?',
      answer: 'Yes! You\'ll receive a verified certificate of completion for every course you finish. Certificates include your name, course title, completion date, and a unique verification code. You can share them on LinkedIn or download as PDF.',
      helpful: 445,
      notHelpful: 18
    },
    {
      id: 8,
      category: 'technical',
      question: 'The video player is not working. What should I do?',
      answer: 'Try these steps: 1) Refresh the page, 2) Clear your browser cache, 3) Disable browser extensions, 4) Try a different browser, 5) Check your internet connection. If the issue persists, contact our technical support team.',
      helpful: 89,
      notHelpful: 34
    },
    {
      id: 9,
      category: 'security',
      question: 'Is my personal information secure?',
      answer: 'Absolutely! We use industry-standard encryption (SSL/TLS) to protect your data. We never share your personal information with third parties without your consent. Read our Privacy Policy for detailed information about data protection.',
      helpful: 203,
      notHelpful: 7
    },
    {
      id: 10,
      category: 'account',
      question: 'How do I update my profile information?',
      answer: 'Go to your Dashboard, click on "Profile" in the sidebar, then "Edit Profile". You can update your name, email, profile picture, bio, and other details. Don\'t forget to save your changes.',
      helpful: 112,
      notHelpful: 6
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-100',
      green: 'bg-green-500 text-green-100',
      purple: 'bg-purple-500 text-purple-100',
      orange: 'bg-orange-500 text-orange-100'
    };
    return colors[color] || colors.blue;
  };

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-richblack-900 flex items-center justify-center">
        <div className="text-richblack-5 text-xl">Loading help center...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-900 to-indigo-900">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Help Center
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Find answers to your questions, get support, and learn how to make the most of your learning experience.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-richblack-400" />
              <input
                type="text"
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white text-richblack-900 placeholder-richblack-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-richblack-5 mb-4">Quick Actions</h2>
            <p className="text-richblack-300 text-lg">
              Get help instantly with these popular options
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center ${getColorClasses(action.color)}`}>
                      <IconComponent className="text-2xl" />
                    </div>
                    <h3 className="text-lg font-bold text-richblack-5 mb-2">{action.title}</h3>
                    <p className="text-richblack-400 text-sm mb-4">{action.description}</p>
                    <Button variant="outline" size="small">
                      {action.action === 'contact' && 'Contact Us'}
                      {action.action === 'chat' && 'Start Chat'}
                      {action.action === 'tutorials' && 'Watch Now'}
                      {action.action === 'download' && 'Download'}
                    </Button>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-richblack-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-richblack-5 mb-4">Browse by Category</h2>
            <p className="text-richblack-300 text-lg">
              Find help articles organized by topic
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    className="p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <IconComponent className="text-white text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-richblack-5">{category.name}</h3>
                        <p className="text-richblack-400 text-sm">{category.count} articles</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-richblack-5 mb-4">Frequently Asked Questions</h2>
            <p className="text-richblack-300 text-lg">
              Quick answers to common questions
            </p>
          </motion.div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-richblack-700 text-richblack-300 hover:bg-richblack-600'
              }`}
            >
              All FAQs
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-richblack-700 text-richblack-300 hover:bg-richblack-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-6 text-left hover:bg-richblack-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-richblack-5 pr-4">
                        {faq.question}
                      </h3>
                      {expandedFAQ === faq.id ? (
                        <FaChevronUp className="text-richblack-400 flex-shrink-0" />
                      ) : (
                        <FaChevronDown className="text-richblack-400 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                  
                  {expandedFAQ === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-richblack-300 leading-relaxed mb-4">
                        {faq.answer}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-richblack-500">Was this helpful?</span>
                          <div className="flex items-center space-x-2">
                            <button className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition-colors">
                              <FaThumbsUp className="text-sm" />
                              <span className="text-sm">{faq.helpful}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors">
                              <FaThumbsDown className="text-sm" />
                              <span className="text-sm">{faq.notHelpful}</span>
                            </button>
                          </div>
                        </div>
                        <Button variant="outline" size="small">
                          <FaExternalLinkAlt className="mr-2" />
                          View Full Article
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
          
          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <FaQuestionCircle className="text-6xl text-richblack-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-richblack-5 mb-2">No FAQs found</h3>
              <p className="text-richblack-400">Try adjusting your search or browse different categories.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-900 to-blue-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Still Need Help?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="large">
                <FaEnvelope className="mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" size="large" className="border-white text-white hover:bg-white hover:text-richblack-900">
                <FaComments className="mr-2" />
                Live Chat
              </Button>
            </div>
            
            {user && (
              <div className="mt-8 p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur">
                <h3 className="text-lg font-semibold text-white mb-2">Priority Support</h3>
                <p className="text-blue-100 text-sm">
                  As a registered user, you get priority support with faster response times.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default HelpCenter;
