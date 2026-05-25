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
  FaCloud
} from 'react-icons/fa';
import Footer from '../../components/common/Footer';

const AWSCloudCourse = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const courseData = {
    id: 7,
    title: 'AWS Cloud Computing',
    subtitle: 'Complete AWS Solutions Architect Masterclass',
    instructor: 'Vikram Singh',
    instructorTitle: 'Senior Cloud Architect & AWS Certified Expert',
    rating: 4.7,
    totalRatings: 12450,
    students: 12450,
    originalPrice: '₹3,999',
    salePrice: '₹1,199',
    discount: '70%',
    duration: '55 hours',
    lectures: 160,
    level: 'Intermediate',
    language: 'Hindi + English',
    certificate: true,
    lastUpdated: 'December 2024',
    category: 'Cloud & DevOps',
    image: '☁️',
    description: 'Master AWS cloud services and become a certified cloud architect. Learn EC2, S3, Lambda, RDS, and deploy scalable applications on AWS cloud platform.',
    fullDescription: 'This comprehensive AWS Cloud Computing course will take you from beginner to advanced level in cloud architecture and AWS services. Cloud computing is the future of technology with massive career opportunities. You will learn core AWS services, cloud architecture patterns, security best practices, and how to deploy scalable applications on AWS. The course includes hands-on labs and real-world projects that will help you build a strong cloud portfolio and prepare you for AWS certification exams and cloud architect roles.',
    whatYouWillLearn: [
      'AWS fundamentals and cloud computing concepts',
      'EC2 instances and virtual machine management',
      'S3 storage services and data management',
      'VPC networking and security groups',
      'Lambda serverless computing',
      'RDS database services and management',
      'CloudFormation infrastructure as code',
      'IAM security and access management',
      'Load balancing and auto scaling',
      'CloudWatch monitoring and logging',
      'DevOps practices with AWS',
      'Cost optimization and billing management'
    ],
    curriculum: [
      {
        title: 'AWS Fundamentals',
        lectures: 20,
        duration: '7 hours',
        topics: ['Cloud computing basics', 'AWS global infrastructure', 'AWS console', 'Billing and pricing']
      },
      {
        title: 'Compute Services (EC2)',
        lectures: 25,
        duration: '8 hours',
        topics: ['EC2 instances', 'AMIs', 'Security groups', 'Key pairs', 'Elastic IPs']
      },
      {
        title: 'Storage Services (S3)',
        lectures: 20,
        duration: '7 hours',
        topics: ['S3 buckets', 'Storage classes', 'Versioning', 'Lifecycle policies', 'CloudFront CDN']
      },
      {
        title: 'Database Services (RDS)',
        lectures: 18,
        duration: '6 hours',
        topics: ['RDS setup', 'Multi-AZ deployment', 'Read replicas', 'DynamoDB', 'Database migration']
      },
      {
        title: 'Networking (VPC)',
        lectures: 22,
        duration: '8 hours',
        topics: ['VPC creation', 'Subnets', 'Route tables', 'NAT gateways', 'VPN connections']
      },
      {
        title: 'Serverless Computing',
        lectures: 15,
        duration: '5 hours',
        topics: ['Lambda functions', 'API Gateway', 'Step Functions', 'Event-driven architecture']
      },
      {
        title: 'Security & IAM',
        lectures: 20,
        duration: '7 hours',
        topics: ['IAM users and roles', 'Policies', 'MFA', 'CloudTrail', 'Security best practices']
      },
      {
        title: 'DevOps & Automation',
        lectures: 20,
        duration: '7 hours',
        topics: ['CloudFormation', 'CodePipeline', 'CodeBuild', 'CodeDeploy', 'Elastic Beanstalk']
      }
    ],
    projects: [
      {
        title: 'Scalable Web Application',
        description: 'Deploy a multi-tier web application with load balancing',
        skills: ['EC2', 'Load balancer', 'Auto scaling', 'RDS', 'S3']
      },
      {
        title: 'Serverless API Backend',
        description: 'Build a serverless REST API using Lambda and API Gateway',
        skills: ['Lambda', 'API Gateway', 'DynamoDB', 'CloudWatch']
      },
      {
        title: 'Data Analytics Pipeline',
        description: 'Create a data processing pipeline with AWS services',
        skills: ['S3', 'Lambda', 'Kinesis', 'Redshift', 'QuickSight']
      },
      {
        title: 'Infrastructure as Code',
        description: 'Automate infrastructure deployment using CloudFormation',
        skills: ['CloudFormation', 'CodePipeline', 'CodeBuild', 'DevOps practices']
      }
    ],
    requirements: [
      'Basic understanding of networking concepts',
      'Familiarity with Linux command line',
      'Basic programming knowledge (any language)',
      'AWS account for hands-on practice',
      'Willingness to learn cloud technologies'
    ],
    features: [
      'Lifetime access to course content',
      'Hands-on labs and AWS projects',
      'Industry-recognized certificate',
      'Direct instructor support',
      'AWS certification exam preparation',
      'Career guidance for cloud roles',
      '30-day money-back guarantee',
      'Access to cloud community'
    ]
  };

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Cloud Engineer at Accenture',
      rating: 5,
      text: 'Excellent AWS course! Vikram sir explains cloud concepts very clearly. Got AWS certified and landed a cloud engineer role.',
      image: '👨‍💻'
    },
    {
      name: 'Sneha Patel',
      role: 'DevOps Engineer at TCS',
      rating: 5,
      text: 'Best AWS course for beginners. The hands-on labs and projects helped me understand real-world cloud implementations.',
      image: '👩‍💻'
    },
    {
      name: 'Amit Sharma',
      role: 'Solutions Architect at Infosys',
      rating: 5,
      text: 'Comprehensive course covering all AWS services. The serverless and DevOps sections were particularly valuable.',
      image: '👨‍💼'
    }
  ];

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-richblack-900 text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-richblack-900 via-blue-900 to-richblack-900 py-20">
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
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {courseData.discount} OFF
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
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
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                  <FaShoppingCart />
                  Enroll Now
                </button>
                
                <button className="border border-blue-500 text-blue-400 font-bold py-4 px-8 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center gap-2">
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
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-8 text-center mb-6">
                <FaPlay className="text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Course Preview</h3>
                <p className="text-blue-100">Watch sample lessons</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-blue-400" />
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
                    className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-2"
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
                  <FaCloud className="text-blue-400" />
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
                  <FaProjectDiagram className="text-blue-400" />
                  Hands-on Projects
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courseData.projects.map((project, index) => (
                    <div key={index} className="bg-richblack-800 rounded-xl p-6 border border-richblack-700">
                      <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                      <p className="text-richblack-300 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
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
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl">
                    👨‍🏫
                  </div>
                  <div>
                    <h4 className="font-bold">{courseData.instructor}</h4>
                    <p className="text-richblack-400 text-sm">{courseData.instructorTitle}</p>
                  </div>
                </div>
                <p className="text-richblack-300 text-sm">
                  Expert cloud architect with 12+ years of experience in AWS and cloud infrastructure.
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
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
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
            <p className="text-richblack-400 text-lg">Real success stories from our AWS course graduates</p>
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
                  <FaQuoteLeft className="text-blue-400 text-xl mb-2" />
                  <p className="text-richblack-300 italic">{testimonial.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-cyan-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Master AWS Cloud?</h2>
            <p className="text-xl text-blue-200 mb-8">
              Join thousands of cloud engineers who have transformed their careers
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-4xl font-bold text-green-400">{courseData.salePrice}</span>
              <span className="text-2xl text-blue-200 line-through">{courseData.originalPrice}</span>
              <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                {courseData.discount} OFF
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-4 px-8 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                <FaRocket />
                Enroll Now - Limited Time
              </button>
              
              <Link to="/all-courses" className="border border-blue-300 text-blue-200 font-bold py-4 px-8 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300">
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

export default AWSCloudCourse;