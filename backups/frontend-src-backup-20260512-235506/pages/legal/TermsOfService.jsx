import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  FaGavel,
  FaUserCheck,
  FaShieldAlt,
  FaCreditCard,
  FaExclamationTriangle,
  FaBalanceScale,
  FaHandshake,
  FaGlobe,
  FaCalendar,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaEnvelope,
  FaPhone,
  FaGraduationCap
} from 'react-icons/fa';
import { Card, Button, Badge } from '../../components/ui';
import Footer from '../../components/common/Footer';

const TermsOfService = () => {
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: FaHandshake,
      content: [
        'By accessing and using EdTech , you accept and agree to be bound by the terms and provision of this agreement.',
        'If you do not agree to abide by the above, please do not use this service.',
        'These terms apply to all visitors, users, and others who access or use the service.',
        'We reserve the right to update and change the Terms of Service without notice.',
        'Any new features that augment or enhance the current service shall be subject to the Terms of Service.'
      ]
    },
    {
      id: 'user-accounts',
      title: 'User Accounts',
      icon: FaUserCheck,
      content: [
        'You must be at least 13 years old to create an account on EdTech .',
        'You are responsible for safeguarding the password and for all activities under your account.',
        'You must not use the service for any illegal or unauthorized purpose.',
        'You must provide accurate and complete information when creating your account.',
        'You agree to notify us immediately of any unauthorized use of your account.',
        'We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion.'
      ]
    },
    {
      id: 'course-access',
      title: 'Course Access and Content',
      icon: FaGraduationCap,
      content: [
        'Course access is granted for personal, non-commercial use only.',
        'You may not share, distribute, or resell course content without explicit permission.',
        'Course materials are protected by intellectual property laws.',
        'We reserve the right to modify or discontinue courses at any time.',
        'Lifetime access means access for the life of the course on our platform.',
        'We do not guarantee that courses will be available indefinitely.'
      ]
    },
    {
      id: 'payment-terms',
      title: 'Payment and Billing',
      icon: FaCreditCard,
      content: [
        'All fees are stated in Indian Rupees (INR) unless otherwise specified.',
        'Payment is due immediately upon purchase unless otherwise arranged.',
        'We offer a 30-day money-back guarantee for most courses.',
        'Refunds will be processed within 5-7 business days.',
        'Subscription fees are billed in advance on a monthly or annual basis.',
        'You can cancel your subscription at any time through your account settings.'
      ]
    },
    {
      id: 'prohibited-uses',
      title: 'Prohibited Uses',
      icon: FaTimesCircle,
      content: [
        'You may not use our service for any illegal or unauthorized purpose.',
        'You may not violate any laws in your jurisdiction when using our service.',
        'You may not transmit any worms, viruses, or any code of a destructive nature.',
        'You may not attempt to gain unauthorized access to our systems.',
        'You may not use our service to harass, abuse, or harm other users.',
        'You may not impersonate any person or entity or misrepresent your affiliation.'
      ]
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property Rights',
      icon: FaShieldAlt,
      content: [
        'The service and its original content are and will remain the exclusive property of EdTech .',
        'The service is protected by copyright, trademark, and other laws.',
        'Our trademarks and trade dress may not be used without our prior written consent.',
        'User-generated content remains the property of the user but grants us license to use.',
        'We respect the intellectual property rights of others and expect users to do the same.',
        'We will respond to valid DMCA takedown notices in accordance with applicable law.'
      ]
    },
    {
      id: 'limitation-liability',
      title: 'Limitation of Liability',
      icon: FaBalanceScale,
      content: [
        'EdTech  shall not be liable for any indirect, incidental, special, consequential damages.',
        'Our total liability shall not exceed the amount paid by you for the service.',
        'We do not warrant that the service will be uninterrupted or error-free.',
        'We are not responsible for any damages resulting from use of our service.',
        'Some jurisdictions do not allow limitation of liability, so these limitations may not apply.',
        'You agree to indemnify and hold us harmless from any claims arising from your use.'
      ]
    },
    {
      id: 'termination',
      title: 'Termination',
      icon: FaExclamationTriangle,
      content: [
        'We may terminate or suspend your account immediately for any breach of these Terms.',
        'Upon termination, your right to use the service will cease immediately.',
        'We reserve the right to refuse service to anyone for any reason at any time.',
        'You may terminate your account at any time by contacting us.',
        'All provisions which should survive termination shall survive termination.',
        'Termination does not relieve you of any obligations incurred prior to termination.'
      ]
    }
  ];

  const keyPoints = [
    {
      title: 'User Responsibilities',
      points: [
        'Provide accurate account information',
        'Maintain account security',
        'Use service lawfully and respectfully',
        'Respect intellectual property rights'
      ],
      icon: FaUserCheck,
      color: 'blue'
    },
    {
      title: 'Our Commitments',
      points: [
        'Provide quality educational content',
        'Maintain platform security',
        'Respect user privacy',
        'Offer customer support'
      ],
      icon: FaShieldAlt,
      color: 'green'
    },
    {
      title: 'Important Policies',
      points: [
        '30-day money-back guarantee',
        'Lifetime course access*',
        'No sharing of course content',
        'Account termination for violations'
      ],
      icon: FaInfoCircle,
      color: 'orange'
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-100',
      green: 'bg-green-500 text-green-100',
      orange: 'bg-orange-500 text-orange-100',
      red: 'bg-red-500 text-red-100'
    };
    return colors[color] || colors.blue;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-richblack-900 flex items-center justify-center">
        <div className="text-richblack-5 text-xl">Loading terms of service...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-indigo-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <FaGavel className="text-6xl text-indigo-400 mr-4" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Terms of Service
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
              Please read these Terms of Service carefully before using EdTech . These terms govern your use of our platform and services.
            </p>
            <div className="flex items-center justify-center space-x-4 text-indigo-200">
              <FaCalendar className="text-lg" />
              <span>Last updated: January 15, 2024</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Points Summary */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-richblack-5 mb-4">Key Points Summary</h2>
            <p className="text-richblack-300 text-lg max-w-2xl mx-auto">
              Here are the most important points from our Terms of Service
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {keyPoints.map((point, index) => {
              const IconComponent = point.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${getColorClasses(point.color)}`}>
                        <IconComponent className="text-xl" />
                      </div>
                      <h3 className="text-xl font-bold text-richblack-5">{point.title}</h3>
                    </div>
                    
                    <ul className="space-y-2">
                      {point.points.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-2">
                          <FaCheckCircle className="text-green-400 text-sm mt-1 flex-shrink-0" />
                          <span className="text-richblack-300 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Terms Sections */}
      <section className="py-16 px-4 bg-richblack-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-richblack-5 mb-4">Detailed Terms and Conditions</h2>
            <p className="text-richblack-300 text-lg">
              Click on any section below to read the full terms
            </p>
          </motion.div>
          
          <div className="space-y-4">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              const isExpanded = expandedSection === section.id;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full p-6 text-left hover:bg-richblack-700 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mr-4">
                            <IconComponent className="text-white text-xl" />
                          </div>
                          <h3 className="text-xl font-bold text-richblack-5">{section.title}</h3>
                        </div>
                        <div className="text-richblack-400">
                          {isExpanded ? '−' : '+'}
                        </div>
                      </div>
                    </button>
                    
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <div className="space-y-3">
                          {section.content.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-start space-x-3">
                              <FaCheckCircle className="text-green-400 text-sm mt-1 flex-shrink-0" />
                              <p className="text-richblack-300 leading-relaxed">{item}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Governing Law */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <FaGlobe className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-richblack-5">Governing Law and Jurisdiction</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-richblack-300 leading-relaxed">
                  These Terms of Service and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of India.
                </p>
                <p className="text-richblack-300 leading-relaxed">
                  Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
                </p>
                <p className="text-richblack-300 leading-relaxed">
                  If any provision of these terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that the Terms of Service shall otherwise remain in full force and effect.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Changes to Terms */}
      <section className="py-16 px-4 bg-richblack-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mr-4">
                  <FaCalendar className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-richblack-5">Changes to Terms</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-richblack-300 leading-relaxed">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
                <p className="text-richblack-300 leading-relaxed">
                  What constitutes a material change will be determined at our sole discretion. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.
                </p>
                <p className="text-richblack-300 leading-relaxed">
                  If you do not agree to the new terms, please stop using the service. We will post any changes to these Terms of Service on this page and update the "Last updated" date at the top of this page.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-900 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Questions About These Terms?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              If you have any questions about these Terms of Service, please contact our legal team.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur">
                <FaEnvelope className="text-3xl text-indigo-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                <p className="text-indigo-100 text-sm">legal@EdTech .com</p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur">
                <FaGavel className="text-3xl text-indigo-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Legal Department</h3>
                <p className="text-indigo-100 text-sm">EdTech  Legal Team<br />New Delhi, India</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="large">
                Contact Legal Team
              </Button>
              <Button variant="outline" size="large" className="border-white text-white hover:bg-white hover:text-richblack-900">
                Download Terms PDF
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Acknowledgment */}
      <section className="py-8 px-4 bg-green-900 bg-opacity-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start space-x-4">
            <FaCheckCircle className="text-green-400 text-2xl mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-green-100 mb-2">Acknowledgment</h3>
              <p className="text-green-200 text-sm leading-relaxed">
                By using EdTech , you acknowledge that you have read these Terms of Service, understood them, and agree to be bound by them. 
                If you are entering into these terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService;