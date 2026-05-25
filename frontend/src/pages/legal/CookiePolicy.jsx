import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  FaCookie,
  FaCog,
  FaChartLine,
  FaBullhorn,
  FaShieldAlt,
  FaToggleOn,
  FaToggleOff,
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaGlobe,
  FaTrash
} from 'react-icons/fa';
import { Card, Button, Badge } from '../../components/ui';
import Footer from '../../components/common/Footer';

const CookiePolicy = () => {
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(true);
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always enabled
    analytics: true,
    marketing: false,
    preferences: true
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const cookieTypes = [
    {
      id: 'essential',
      title: 'Essential Cookies',
      icon: FaShieldAlt,
      description: 'These cookies are necessary for the website to function and cannot be switched off.',
      color: 'green',
      required: true,
      examples: [
        'Authentication tokens to keep you logged in',
        'Security tokens to prevent CSRF attacks',
        'Session identifiers for maintaining your session',
        'Load balancing cookies for optimal performance',
        'Cookie consent preferences'
      ],
      duration: 'Session or up to 1 year'
    },
    {
      id: 'analytics',
      title: 'Analytics Cookies',
      icon: FaChartLine,
      description: 'These cookies help us understand how visitors interact with our website.',
      color: 'blue',
      required: false,
      examples: [
        'Google Analytics for website usage statistics',
        'Page view tracking and user journey analysis',
        'Performance monitoring and error tracking',
        'A/B testing for feature improvements',
        'Heatmap data for user experience optimization'
      ],
      duration: 'Up to 2 years'
    },
    {
      id: 'marketing',
      title: 'Marketing Cookies',
      icon: FaBullhorn,
      description: 'These cookies are used to deliver personalized advertisements and track campaign effectiveness.',
      color: 'purple',
      required: false,
      examples: [
        'Facebook Pixel for social media advertising',
        'Google Ads conversion tracking',
        'Retargeting pixels for personalized ads',
        'Email campaign tracking and attribution',
        'Affiliate marketing tracking'
      ],
      duration: 'Up to 1 year'
    },
    {
      id: 'preferences',
      title: 'Preference Cookies',
      icon: FaCog,
      description: 'These cookies remember your preferences and settings to enhance your experience.',
      color: 'orange',
      required: false,
      examples: [
        'Language and region preferences',
        'Theme and display settings (dark/light mode)',
        'Course progress and bookmarks',
        'Notification preferences',
        'Accessibility settings'
      ],
      duration: 'Up to 1 year'
    }
  ];

  const browserInstructions = [
    {
      browser: 'Google Chrome',
      steps: [
        'Click the three dots menu in the top right corner',
        'Select "Settings" from the dropdown menu',
        'Click "Privacy and security" in the left sidebar',
        'Click "Cookies and other site data"',
        'Choose your preferred cookie settings'
      ]
    },
    {
      browser: 'Mozilla Firefox',
      steps: [
        'Click the menu button (three lines) in the top right',
        'Select "Settings" from the menu',
        'Click "Privacy & Security" in the left panel',
        'Scroll down to "Cookies and Site Data"',
        'Adjust your cookie preferences'
      ]
    },
    {
      browser: 'Safari',
      steps: [
        'Click "Safari" in the top menu bar',
        'Select "Preferences" from the dropdown',
        'Click the "Privacy" tab',
        'Choose your cookie blocking preferences',
        'Close the preferences window'
      ]
    },
    {
      browser: 'Microsoft Edge',
      steps: [
        'Click the three dots menu in the top right',
        'Select "Settings" from the menu',
        'Click "Cookies and site permissions"',
        'Click "Cookies and site data"',
        'Configure your cookie settings'
      ]
    }
  ];

  const handleCookieToggle = (cookieType) => {
    if (cookieType === 'essential') return; // Cannot disable essential cookies
    
    setCookiePreferences(prev => ({
      ...prev,
      [cookieType]: !prev[cookieType]
    }));
  };

  const savePreferences = () => {
    // In a real application, this would save to localStorage or send to server
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    alert('Cookie preferences saved successfully!');
  };

  const getColorClasses = (color) => {
    const colors = {
      green: 'bg-green-500 text-green-100',
      blue: 'bg-blue-500 text-blue-100',
      purple: 'bg-purple-500 text-purple-100',
      orange: 'bg-orange-500 text-orange-100'
    };
    return colors[color] || colors.blue;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-richblack-900 flex items-center justify-center">
        <div className="text-richblack-5 text-xl">Loading cookie policy...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-orange-900 to-red-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <FaCookie className="text-6xl text-orange-400 mr-4" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Cookie Policy
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-8">
              Learn about how we use cookies and similar technologies to enhance your experience on EdTech .
            </p>
            <div className="flex items-center justify-center space-x-4 text-orange-200">
              <FaInfoCircle className="text-lg" />
              <span>Last updated: January 15, 2024</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Are Cookies */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mr-4">
                  <FaInfoCircle className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-richblack-5">What Are Cookies?</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-richblack-300 leading-relaxed">
                  Cookies are small text files that are stored on your device when you visit a website. They help websites remember information about your visit, such as your preferred language, login status, and other settings that can make your next visit easier and the site more useful to you.
                </p>
                <p className="text-richblack-300 leading-relaxed">
                  We use cookies and similar technologies (such as web beacons, pixels, and local storage) to provide, protect, and improve our services. This policy explains how and why we use these technologies and the choices you have.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="py-16 px-4 bg-richblack-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-richblack-5 mb-4">Types of Cookies We Use</h2>
            <p className="text-richblack-300 text-lg max-w-2xl mx-auto">
              We use different types of cookies for various purposes to enhance your experience
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {cookieTypes.map((cookie, index) => {
              const IconComponent = cookie.icon;
              const isEnabled = cookiePreferences[cookie.id];
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${getColorClasses(cookie.color)}`}>
                          <IconComponent className="text-xl" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-richblack-5">{cookie.title}</h3>
                          {cookie.required && (
                            <Badge variant="success" size="small">Required</Badge>
                          )}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleCookieToggle(cookie.id)}
                        disabled={cookie.required}
                        className={`text-2xl transition-colors ${
                          cookie.required 
                            ? 'text-richblack-500 cursor-not-allowed' 
                            : 'hover:scale-110 cursor-pointer'
                        }`}
                      >
                        {isEnabled ? (
                          <FaToggleOn className="text-green-500" />
                        ) : (
                          <FaToggleOff className="text-richblack-400" />
                        )}
                      </button>
                    </div>
                    
                    <p className="text-richblack-400 mb-4">{cookie.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-richblack-5 mb-2">Examples:</h4>
                      <ul className="space-y-1">
                        {cookie.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="flex items-start space-x-2">
                            <FaCheckCircle className="text-green-400 text-xs mt-1 flex-shrink-0" />
                            <span className="text-richblack-400 text-sm">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="text-sm text-richblack-500">
                      <strong>Duration:</strong> {cookie.duration}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="primary" size="large" onClick={savePreferences}>
              Save Cookie Preferences
            </Button>
          </div>
        </div>
      </section>

      {/* Browser Settings */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-richblack-5 mb-4">Managing Cookies in Your Browser</h2>
            <p className="text-richblack-300 text-lg max-w-2xl mx-auto">
              You can control and manage cookies through your browser settings
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {browserInstructions.map((browser, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                      <FaGlobe className="text-white text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-richblack-5">{browser.browser}</h3>
                  </div>
                  
                  <ol className="space-y-2">
                    {browser.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start space-x-3">
                        <span className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          {stepIndex + 1}
                        </span>
                        <span className="text-richblack-300 text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Third-Party Cookies */}
      <section className="py-16 px-4 bg-richblack-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <FaShieldAlt className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-richblack-5">Third-Party Cookies</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-richblack-300 leading-relaxed">
                  Some cookies on our site are set by third-party services that appear on our pages. We use these services to enhance functionality and provide better user experiences:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-richblack-5 mb-3">Analytics Services</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <FaCheckCircle className="text-green-400 text-xs mt-1 flex-shrink-0" />
                        <span className="text-richblack-300 text-sm">Google Analytics</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <FaCheckCircle className="text-green-400 text-xs mt-1 flex-shrink-0" />
                        <span className="text-richblack-300 text-sm">Hotjar (Heatmaps)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <FaCheckCircle className="text-green-400 text-xs mt-1 flex-shrink-0" />
                        <span className="text-richblack-300 text-sm">Mixpanel (User Analytics)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-richblack-5 mb-3">Marketing Services</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <FaCheckCircle className="text-green-400 text-xs mt-1 flex-shrink-0" />
                        <span className="text-richblack-300 text-sm">Facebook Pixel</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <FaCheckCircle className="text-green-400 text-xs mt-1 flex-shrink-0" />
                        <span className="text-richblack-300 text-sm">Google Ads</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <FaCheckCircle className="text-green-400 text-xs mt-1 flex-shrink-0" />
                        <span className="text-richblack-300 text-sm">LinkedIn Insight Tag</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact and Updates */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-900 to-red-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Questions About Cookies?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              If you have any questions about our use of cookies or this policy, please contact us.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button variant="primary" size="large">
                Contact Support
              </Button>
              <Button variant="outline" size="large" className="border-white text-white hover:bg-white hover:text-richblack-900">
                <FaTrash className="mr-2" />
                Clear All Cookies
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-8 px-4 bg-yellow-900 bg-opacity-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start space-x-4">
            <FaExclamationTriangle className="text-yellow-400 text-2xl mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-100 mb-2">Policy Updates</h3>
              <p className="text-yellow-200 text-sm leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. 
                We will notify you of any material changes by posting the updated policy on our website. Please review this policy periodically for any updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CookiePolicy;