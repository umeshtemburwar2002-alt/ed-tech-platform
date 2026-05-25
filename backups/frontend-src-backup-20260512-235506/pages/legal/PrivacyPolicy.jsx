import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  FaShieldAlt,
  FaLock,
  FaUserShield,
  FaDatabase,
  FaCookie,
  FaEnvelope,
  FaGlobe,
  FaCalendar,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import { Card, Button } from '../../components/ui';
import Footer from '../../components/common/Footer';

const PrivacyPolicy = () => {
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: FaDatabase,
      content: [
        'Personal Information: Name, email address, phone number, and profile information when you create an account.',
        'Educational Data: Course progress, quiz results, certificates earned, and learning preferences.',
        'Payment Information: Billing details and transaction history (processed securely through third-party providers).',
        'Technical Data: IP address, browser type, device information, and usage analytics.',
        'Communication Data: Messages, support tickets, and feedback you provide to us.'
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: FaUserShield,
      content: [
        'Provide and improve our educational services and platform functionality.',
        'Personalize your learning experience and recommend relevant courses.',
        'Process payments and manage your account and subscriptions.',
        'Send important updates, course notifications, and promotional materials.',
        'Analyze platform usage to enhance user experience and develop new features.',
        'Ensure platform security and prevent fraudulent activities.',
        'Comply with legal obligations and resolve disputes.'
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing and Disclosure',
      icon: FaGlobe,
      content: [
        'Service Providers: We share data with trusted third-party providers who help us operate our platform.',
        'Instructors: Course enrollment and progress data may be shared with relevant instructors.',
        'Legal Requirements: We may disclose information when required by law or to protect our rights.',
        'Business Transfers: Information may be transferred in case of merger, acquisition, or sale of assets.',
        'Consent: We may share information with your explicit consent for specific purposes.'
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: FaLock,
      content: [
        'We implement industry-standard security measures to protect your personal information.',
        'All data transmission is encrypted using SSL/TLS protocols.',
        'Payment information is processed through PCI-compliant payment processors.',
        'Regular security audits and vulnerability assessments are conducted.',
        'Access to personal data is restricted to authorized personnel only.',
        'We maintain backup systems to ensure data availability and integrity.'
      ]
    },
    {
      id: 'cookies-tracking',
      title: 'Cookies and Tracking Technologies',
      icon: FaCookie,
      content: [
        'Essential Cookies: Required for basic platform functionality and security.',
        'Analytics Cookies: Help us understand how users interact with our platform.',
        'Preference Cookies: Remember your settings and personalization choices.',
        'Marketing Cookies: Used to deliver relevant advertisements and track campaign effectiveness.',
        'You can manage cookie preferences through your browser settings.'
      ]
    },
    {
      id: 'user-rights',
      title: 'Your Rights and Choices',
      icon: FaCheckCircle,
      content: [
        'Access: Request a copy of the personal information we hold about you.',
        'Correction: Update or correct inaccurate personal information.',
        'Deletion: Request deletion of your personal information (subject to legal requirements).',
        'Portability: Request transfer of your data to another service provider.',
        'Opt-out: Unsubscribe from marketing communications at any time.',
        'Account Deactivation: Delete your account and associated data.'
      ]
    }
  ];

  const contactInfo = {
    email: 'privacy@EdTech .com',
    address: 'EdTech  Privacy Office, 123 Education Street, Learning City, LC 12345',
    phone: '+1 (555) 123-4567'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-richblack-900 flex items-center justify-center">
        <div className="text-richblack-5 text-xl">Loading privacy policy...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-900 to-indigo-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <FaShieldAlt className="text-6xl text-blue-400 mr-4" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Privacy Policy
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <div className="flex items-center justify-center space-x-4 text-blue-200">
              <FaCalendar className="text-lg" />
              <span>Last updated: January 15, 2024</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 px-4 bg-richblack-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-richblack-5 mb-6 text-center">Quick Navigation</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <motion.a
                  key={index}
                  href={`#${section.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center p-4 bg-richblack-700 rounded-lg hover:bg-richblack-600 transition-colors cursor-pointer"
                >
                  <IconComponent className="text-2xl text-blue-400 mb-2" />
                  <span className="text-sm text-richblack-200 text-center">{section.title}</span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Privacy Policy Sections */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <motion.div
                key={index}
                id={section.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="mb-12"
              >
                <Card className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="text-white text-xl" />
                    </div>
                    <h2 className="text-3xl font-bold text-richblack-5">{section.title}</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start space-x-3">
                        <FaCheckCircle className="text-green-400 text-sm mt-1 flex-shrink-0" />
                        <p className="text-richblack-300 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Data Retention */}
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
                  <FaDatabase className="text-white text-xl" />
                </div>
                <h2 className="text-3xl font-bold text-richblack-5">Data Retention</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-richblack-300 leading-relaxed">
                  We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this privacy policy. Specific retention periods include:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <FaCheckCircle className="text-green-400 text-sm mt-1 flex-shrink-0" />
                    <span className="text-richblack-300"><strong>Account Information:</strong> Retained while your account is active and for 3 years after account closure.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <FaCheckCircle className="text-green-400 text-sm mt-1 flex-shrink-0" />
                    <span className="text-richblack-300"><strong>Learning Data:</strong> Retained for 7 years to maintain educational records and certificates.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <FaCheckCircle className="text-green-400 text-sm mt-1 flex-shrink-0" />
                    <span className="text-richblack-300"><strong>Payment Information:</strong> Retained for 7 years for tax and accounting purposes.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <FaCheckCircle className="text-green-400 text-sm mt-1 flex-shrink-0" />
                    <span className="text-richblack-300"><strong>Marketing Data:</strong> Retained until you opt-out or for 2 years of inactivity.</span>
                  </li>
                </ul>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* International Transfers */}
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
                <h2 className="text-3xl font-bold text-richblack-5">International Data Transfers</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-richblack-300 leading-relaxed">
                  EdTech  operates globally, and your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <FaCheckCircle className="text-green-400 text-sm mt-1 flex-shrink-0" />
                    <span className="text-richblack-300">Compliance with applicable data protection laws and regulations.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <FaCheckCircle className="text-green-400 text-sm mt-1 flex-shrink-0" />
                    <span className="text-richblack-300">Standard contractual clauses approved by relevant authorities.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <FaCheckCircle className="text-green-400 text-sm mt-1 flex-shrink-0" />
                    <span className="text-richblack-300">Adequate level of protection as determined by competent authorities.</span>
                  </li>
                </ul>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-900 to-indigo-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Questions About Privacy?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              If you have any questions about this Privacy Policy or our data practices, please contact us.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur">
                <FaEnvelope className="text-3xl text-blue-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                <p className="text-blue-100 text-sm">{contactInfo.email}</p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur">
                <FaShieldAlt className="text-3xl text-blue-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Data Protection Officer</h3>
                <p className="text-blue-100 text-sm">dpo@EdTech .com</p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur">
                <FaGlobe className="text-3xl text-blue-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Address</h3>
                <p className="text-blue-100 text-sm">{contactInfo.address}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="large">
                Contact Privacy Team
              </Button>
              <Button variant="outline" size="large" className="border-white text-white hover:bg-white hover:text-richblack-900">
                Download Privacy Policy
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
              <h3 className="text-lg font-semibold text-yellow-100 mb-2">Important Notice</h3>
              <p className="text-yellow-200 text-sm leading-relaxed">
                This Privacy Policy may be updated from time to time to reflect changes in our practices or legal requirements. 
                We will notify you of any material changes by posting the updated policy on our website and, where appropriate, 
                by sending you an email notification. Your continued use of our services after any changes indicates your acceptance of the updated policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;