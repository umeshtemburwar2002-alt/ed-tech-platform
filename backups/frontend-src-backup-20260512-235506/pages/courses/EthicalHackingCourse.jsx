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
  FaShieldAlt
} from 'react-icons/fa';
import Footer from '../../components/common/Footer';

const EthicalHackingCourse = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const courseData = {
    id: 8,
    title: 'Ethical Hacking & Cybersecurity',
    subtitle: 'Complete Penetration Testing & Security Masterclass',
    instructor: 'Arjun Malhotra',
    instructorTitle: 'Senior Cybersecurity Expert & Ethical Hacker',
    rating: 4.8,
    totalRatings: 9850,
    students: 9850,
    originalPrice: '₹4,999',
    salePrice: '₹1,499',
    discount: '70%',
    duration: '65 hours',
    lectures: 180,
    level: 'Advanced',
    language: 'Hindi + English',
    certificate: true,
    lastUpdated: 'December 2024',
    category: 'Cybersecurity',
    image: '🛡️',
    description: 'Master ethical hacking and cybersecurity. Learn penetration testing, vulnerability assessment, and security tools. Become a certified ethical hacker.',
    fullDescription: 'This comprehensive Ethical Hacking and Cybersecurity course will take you from beginner to advanced level in cybersecurity and penetration testing. Cybersecurity is one of the most critical and high-paying fields in technology. You will learn ethical hacking techniques, penetration testing methodologies, vulnerability assessment, network security, web application security, and how to protect systems from cyber threats. The course includes hands-on labs and real-world scenarios that will help you build a strong cybersecurity portfolio and prepare you for ethical hacking certifications and cybersecurity roles.',
    whatYouWillLearn: [
      'Ethical hacking fundamentals and methodologies',
      'Network security and penetration testing',
      'Web application security testing',
      'Vulnerability assessment and management',
      'Social engineering and phishing attacks',
      'Wireless network security testing',
      'Malware analysis and reverse engineering',
      'Digital forensics and incident response',
      'Security tools (Kali Linux, Metasploit, Nmap)',
      'OWASP Top 10 vulnerabilities',
      'Cryptography and encryption techniques',
      'Compliance and security frameworks'
    ],
    curriculum: [
      {
        title: 'Cybersecurity Fundamentals',
        lectures: 25,
        duration: '8 hours',
        topics: ['Security basics', 'Threat landscape', 'Risk assessment', 'Security frameworks']
      },
      {
        title: 'Network Security & Testing',
        lectures: 30,
        duration: '10 hours',
        topics: ['Network protocols', 'Port scanning', 'Network enumeration', 'Firewall testing']
      },
      {
        title: 'Web Application Security',
        lectures: 25,
        duration: '8 hours',
        topics: ['OWASP Top 10', 'SQL injection', 'XSS attacks', 'Authentication bypass']
      },
      {
        title: 'Penetration Testing',
        lectures: 30,
        duration: '10 hours',
        topics: ['Pen testing methodology', 'Reconnaissance', 'Exploitation', 'Post-exploitation']
      },
      {
        title: 'Security Tools & Techniques',
        lectures: 25,
        duration: '9 hours',
        topics: ['Kali Linux', 'Metasploit', 'Nmap', 'Burp Suite', 'Wireshark']
      },
      {
        title: 'Wireless Security',
        lectures: 15,
        duration: '5 hours',
        topics: ['WiFi security', 'WPA/WEP cracking', 'Bluetooth security', 'Mobile security']
      },
      {
        title: 'Malware & Forensics',
        lectures: 20,
        duration: '7 hours',
        topics: ['Malware analysis', 'Reverse engineering', 'Digital forensics', 'Incident response']
      },
      {
        title: 'Advanced Security Topics',
        lectures: 10,
        duration: '8 hours',
        topics: ['Cryptography', 'Social engineering', 'Physical security', 'Compliance']
      }
    ],
    projects: [
      {
        title: 'Network Penetration Testing Lab',
        description: 'Conduct a complete penetration test on a virtual network',
        skills: ['Network scanning', 'Vulnerability assessment', 'Exploitation', 'Reporting']
      },
      {
        title: 'Web Application Security Assessment',
        description: 'Test a web application for OWASP Top 10 vulnerabilities',
        skills: ['Web security testing', 'SQL injection', 'XSS', 'Security reporting']
      },
      {
        title: 'Wireless Security Audit',
        description: 'Assess and secure wireless network infrastructure',
        skills: ['WiFi security', 'WPA cracking', 'Wireless protocols', 'Security hardening']
      },
      {
        title: 'Incident Response Simulation',
        description: 'Handle a cybersecurity incident from detection to recovery',
        skills: ['Digital forensics', 'Incident response', 'Malware analysis', 'Recovery planning']
      }
    ],
    requirements: [
      'Basic understanding of computer networks',
      'Familiarity with Linux command line',
      'Basic programming knowledge (Python preferred)',
      'Understanding of web technologies',
      'Ethical mindset and legal compliance awareness'
    ],
    features: [
      'Lifetime access to course content',
      'Hands-on labs with real security tools',
      'Industry-recognized certificate',
      'Direct instructor support',
      'Virtual lab environment included',
      'Career guidance for cybersecurity roles',
      '30-day money-back guarantee',
      'Access to cybersecurity community'
    ]
  };

  const testimonials = [
    {
      name: 'Vikash Singh',
      role: 'Cybersecurity Analyst at Wipro',
      rating: 5,
      text: 'Outstanding ethical hacking course! Arjun sir explains complex security concepts very clearly. Got certified and landed a cybersecurity role.',
      image: '👨‍💻'
    },
    {
      name: 'Priya Sharma',
      role: 'Penetration Tester at TCS',
      rating: 5,
      text: 'Best cybersecurity course available. The hands-on labs and real-world scenarios helped me understand practical security testing.',
      image: '👩‍💻'
    },
    {
      name: 'Rahul Kumar',
      role: 'Security Consultant at Infosys',
      rating: 5,
      text: 'Comprehensive course covering all aspects of ethical hacking. The malware analysis and forensics sections were particularly valuable.',
      image: '👨‍💼'
    }
  ];

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-richblack-900 text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-richblack-900 via-red-900 to-richblack-900 py-20">
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
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {courseData.discount} OFF
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
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
                <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-4 px-8 rounded-xl hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                  <FaShoppingCart />
                  Enroll Now
                </button>
                
                <button className="border border-red-500 text-red-400 font-bold py-4 px-8 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center gap-2">
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
              <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-xl p-8 text-center mb-6">
                <FaPlay className="text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Course Preview</h3>
                <p className="text-red-100">Watch sample lessons</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-red-400" />
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
                    className="text-red-400 hover:text-red-300 font-semibold flex items-center gap-2"
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
                  <FaShieldAlt className="text-red-400" />
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
                  <FaProjectDiagram className="text-red-400" />
                  Hands-on Projects
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courseData.projects.map((project, index) => (
                    <div key={index} className="bg-richblack-800 rounded-xl p-6 border border-richblack-700">
                      <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                      <p className="text-richblack-300 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
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
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-2xl">
                    👨‍🏫
                  </div>
                  <div>
                    <h4 className="font-bold">{courseData.instructor}</h4>
                    <p className="text-richblack-400 text-sm">{courseData.instructorTitle}</p>
                  </div>
                </div>
                <p className="text-richblack-300 text-sm">
                  Expert cybersecurity professional with 15+ years of experience in ethical hacking and penetration testing.
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
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
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
            <p className="text-richblack-400 text-lg">Real success stories from our Ethical Hacking course graduates</p>
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
                  <FaQuoteLeft className="text-red-400 text-xl mb-2" />
                  <p className="text-richblack-300 italic">{testimonial.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-900 to-orange-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Master Ethical Hacking?</h2>
            <p className="text-xl text-red-200 mb-8">
              Join thousands of cybersecurity professionals who have secured their careers
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-4xl font-bold text-green-400">{courseData.salePrice}</span>
              <span className="text-2xl text-red-200 line-through">{courseData.originalPrice}</span>
              <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                {courseData.discount} OFF
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-4 px-8 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                <FaRocket />
                Enroll Now - Limited Time
              </button>
              
              <Link to="/all-courses" className="border border-red-300 text-red-200 font-bold py-4 px-8 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300">
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

export default EthicalHackingCourse;