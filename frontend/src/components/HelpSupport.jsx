import React, { useState } from 'react';
import { Mail, MessageCircle, BookOpen, ChevronDown, ChevronUp, Send, CheckCircle, AlertCircle } from 'lucide-react';

const HelpSupport = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // FAQ Data
  const faqItems = [
    {
      question: "How to create a course?",
      answer: "Navigate to the Dashboard and click 'Create Course'. Fill in course details including title, description, and upload video content. You can add modules, set pricing, and publish when ready."
    },
    {
      question: "How to manage students?",
      answer: "Go to the Students tab to view enrolled students. You can track progress, send messages, manage assignments, and view individual performance metrics. Use filters to sort by course or completion status."
    },
    {
      question: "How to upload content?",
      answer: "In the course editor, use the 'Upload Content' section. You can upload videos (MP4, WebM), documents (PDF, DOC), images, and create quizzes. Organize content in modules and lessons for better structure."
    },
    {
      question: "How to conduct live classes?",
      answer: "Schedule live classes from the 'Live Classes' section. Set date, time, and duration. Students will receive notifications. Use the integrated video conferencing tool to conduct interactive sessions with screen sharing."
    },
    {
      question: "How to track revenue?",
      answer: "Visit the Analytics tab to view revenue reports. Track monthly earnings, course-wise revenue, student payments, and withdrawal history. Export reports for accounting purposes."
    },
    {
      question: "How to contact support?",
      answer: "Use the contact form below or email support@example.com. For urgent issues, use live chat (9AM-9PM). Browse documentation for self-help guides and tutorials."
    }
  ];

  // Toggle FAQ accordion
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Help & Support
          </h1>
          <p className="text-gray-400 text-lg">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-violet-400" />
              </div>
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <h3 className="text-white font-semibold text-lg">{faq.question}</h3>
                    <div className="flex-shrink-0">
                      {openIndex === index ? (
                        <ChevronUp className="w-5 h-5 text-violet-400 transition-transform duration-200" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200" />
                      )}
                    </div>
                  </button>
                  
                  {openIndex === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center">
                <Send className="w-5 h-5 text-violet-400" />
              </div>
              Contact Support
            </h2>

            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center">
                <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                <p className="text-emerald-400">
                  Message sent successfully! We'll get back to you within 24 hours.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 bg-white/5 backdrop-blur-md border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all ${
                    errors.name 
                      ? 'border-red-500/50 bg-red-500/5' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 bg-white/5 backdrop-blur-md border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all ${
                    errors.email 
                      ? 'border-red-500/50 bg-red-500/5' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className={`w-full px-4 py-3 bg-white/5 backdrop-blur-md border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all ${
                    errors.subject 
                      ? 'border-red-500/50 bg-red-500/5' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <option value="" className="bg-gray-900">Select a subject</option>
                  <option value="technical" className="bg-gray-900">Technical Issue</option>
                  <option value="course" className="bg-gray-900">Course Related</option>
                  <option value="billing" className="bg-gray-900">Billing & Payment</option>
                  <option value="account" className="bg-gray-900">Account Issue</option>
                  <option value="feature" className="bg-gray-900">Feature Request</option>
                  <option value="other" className="bg-gray-900">Other</option>
                </select>
                {errors.subject && (
                  <p className="mt-2 text-sm text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={6}
                  className={`w-full px-4 py-3 bg-white/5 backdrop-blur-md border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all resize-none ${
                    errors.message 
                      ? 'border-red-500/50 bg-red-500/5' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                  placeholder="Describe your issue or question in detail..."
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Sending Message...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Support Channels */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Other Ways to Get Help
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Email Support */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="w-16 h-16 bg-violet-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-violet-500/30 transition-colors">
                <Mail className="w-8 h-8 text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Email Support</h3>
              <p className="text-gray-400 mb-4">Get help via email</p>
              <a 
                href="mailto:support@example.com"
                className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
              >
                support@example.com
              </a>
              <p className="text-gray-500 text-sm mt-2">Response within 24 hours</p>
            </div>

            {/* Live Chat */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/30 transition-colors">
                <MessageCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Live Chat</h3>
              <p className="text-gray-400 mb-4">Chat with our team</p>
              <p className="text-emerald-400 font-medium">Available 9AM–9PM</p>
              <p className="text-gray-500 text-sm mt-2">Instant responses</p>
            </div>

            {/* Documentation */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/30 transition-colors">
                <BookOpen className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Documentation</h3>
              <p className="text-gray-400 mb-4">Browse guides</p>
              <p className="text-cyan-400 font-medium cursor-pointer hover:text-cyan-300 transition-colors">
                View Guides →
              </p>
              <p className="text-gray-500 text-sm mt-2">Self-help resources</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
