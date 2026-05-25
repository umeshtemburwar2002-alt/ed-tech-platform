import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaRocket,
  FaGraduationCap,
  FaArrowLeft
} from 'react-icons/fa';
import Footer from '../components/common/Footer';

const SignupOffer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - redirect to dashboard or success page
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    'Access to 80+ Premium Courses',
    'Lifetime Learning Access',
    'Industry-Recognized Certificates',
    '1-on-1 Expert Mentorship',
    'Live Project Collaboration',
    'Job Placement Assistance',
    '24/7 Community Support',
    'Mobile & Desktop Access'
  ];

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5">
      {/* Header */}
      <div className="bg-richblack-800 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link 
            to="/offers" 
            className="flex items-center gap-2 text-richblack-300 hover:text-white transition-colors duration-300"
          >
            <FaArrowLeft />
            <span>Back to Offers</span>
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">🔥 Special Offer Signup</h1>
            <p className="text-richblack-300 text-sm">Join thousands of successful learners</p>
          </div>
          <div className="w-24"></div> {/* Spacer for center alignment */}
        </div>
      </div>

      <div className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
                  🚀 Transform Your Career Today!
                </h2>
                <p className="text-lg text-richblack-300 mb-6">
                  Join our exclusive learning platform and get access to premium courses at unbeatable prices.
                </p>
              </div>

              {/* Special Offer Banner */}
              <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 rounded-2xl p-6 text-white">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">🔥 LIMITED TIME OFFER</h3>
                  <p className="text-lg mb-4">Get 70% OFF on All Courses</p>
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-3xl font-bold">₹7,499</span>
                    <span className="text-xl line-through opacity-70">₹24,999</span>
                    <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                      70% OFF
                    </span>
                  </div>
                </div>
              </div>

              {/* Benefits List */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                  <FaGraduationCap className="text-purple-400" />
                  What You'll Get:
                </h3>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <FaCheckCircle className="text-green-400 flex-shrink-0" />
                      <span className="text-richblack-300">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-richblack-800 rounded-xl p-6">
                <h4 className="text-lg font-bold mb-4 text-white">🏆 Trusted by 50,000+ Students</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-purple-400">50K+</div>
                    <div className="text-sm text-richblack-400">Students</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">95%</div>
                    <div className="text-sm text-richblack-400">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">4.8⭐</div>
                    <div className="text-sm text-richblack-400">Rating</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Signup Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-richblack-800 rounded-2xl p-8 border border-richblack-700"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Create Your Account</h3>
                <p className="text-richblack-300">Start your learning journey today</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-richblack-300 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-richblack-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 bg-richblack-700 border rounded-lg text-white placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                          errors.firstName ? 'border-red-500' : 'border-richblack-600'
                        }`}
                        placeholder="Enter first name"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-richblack-300 mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-richblack-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 bg-richblack-700 border rounded-lg text-white placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                          errors.lastName ? 'border-red-500' : 'border-richblack-600'
                        }`}
                        placeholder="Enter last name"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-richblack-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-richblack-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-richblack-700 border rounded-lg text-white placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                        errors.email ? 'border-red-500' : 'border-richblack-600'
                      }`}
                      placeholder="Enter email address"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-richblack-300 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-richblack-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-richblack-700 border rounded-lg text-white placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                        errors.phone ? 'border-red-500' : 'border-richblack-600'
                      }`}
                      placeholder="Enter 10-digit phone number"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-richblack-300 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-richblack-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 bg-richblack-700 border rounded-lg text-white placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                        errors.password ? 'border-red-500' : 'border-richblack-600'
                      }`}
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-richblack-400 hover:text-white transition-colors duration-300"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-richblack-300 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-richblack-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 bg-richblack-700 border rounded-lg text-white placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ${
                        errors.confirmPassword ? 'border-red-500' : 'border-richblack-600'
                      }`}
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-richblack-400 hover:text-white transition-colors duration-300"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="bg-red-500/10 border border-red-500 rounded-lg p-3">
                    <p className="text-red-400 text-sm">{errors.submit}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <FaRocket />
                      <span>Claim Special Offer & Sign Up</span>
                    </>
                  )}
                </button>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-richblack-400">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignupOffer;