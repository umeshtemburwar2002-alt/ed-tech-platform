import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaPaperPlane, FaCheckCircle, FaBook, FaHistory, FaQuoteLeft } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    course: '',
    message: ''
  });

  const courses = [
    'Modern JavaScript Masterclass',
    'Python for Data Science',
    'UI/UX Design Essentials',
    'React Development Bootcamp',
    'Full-Stack Web Development'
  ];

  const feedbackHistory = [
    { id: 1, course: 'HTML & CSS Foundation', rating: 5, message: 'Excellent course with practical examples!', date: '2 weeks ago' },
    { id: 2, course: 'JavaScript Essentials', rating: 4, message: 'Good content, would love more exercises.', date: '1 month ago' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.course || !rating || !formData.message) {
      toast.error('Please fill in all fields and provide a rating');
      return;
    }
    setIsSubmitted(true);
    toast.success('Thank you for your feedback!');
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 border border-green-500/30"
        >
          <FaCheckCircle className="text-5xl" />
        </motion.div>
        <h2 className="text-4xl font-black text-white">Success!</h2>
        <p className="text-slate-400 max-w-md">Thank you for your valuable feedback. It helps us improve our learning platform for everyone.</p>
        <button 
          onClick={() => {
            setIsSubmitted(false);
            setRating(0);
            setFormData({ course: '', message: '' });
          }}
          className="btn-primary py-4 px-12 text-sm shadow-xl shadow-cyan-500/20"
        >
          Submit Another Feedback
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Feedback Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-richblack-800 rounded-3xl p-8 md:p-12 border border-richblack-700 shadow-2xl space-y-10"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-white">Share Your Experience</h2>
            <p className="text-slate-400 font-medium">Your feedback helps us create better content for you.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Course Select */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-300 ml-1 flex items-center gap-2">
                <FaBook className="text-xs text-cyan-400" /> Select Course
              </label>
              <select 
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full bg-richblack-900 border border-richblack-700 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium appearance-none cursor-pointer"
              >
                <option value="">Choose a course</option>
                {courses.map((course, i) => (
                  <option key={i} value={course}>{course}</option>
                ))}
              </select>
            </div>

            {/* Star Rating */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-300 ml-1">Rating</label>
              <div className="flex gap-4 p-4 bg-richblack-900 border border-richblack-700 rounded-2xl justify-center">
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      className={`text-3xl transition-all ${index <= (hover || rating) ? 'text-yellow-400 scale-110' : 'text-slate-700 hover:text-yellow-400/50'}`}
                      onClick={() => setRating(index)}
                      onMouseEnter={() => setHover(index)}
                      onMouseLeave={() => setHover(rating)}
                    >
                      <FaStar />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-300 ml-1">Your Thoughts</label>
              <textarea 
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="What did you like? What can we improve?"
                className="w-full bg-richblack-900 border border-richblack-700 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium resize-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full btn-primary py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/20 group"
            >
              <FaPaperPlane className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Submit Feedback
            </button>
          </form>
        </motion.div>

        {/* Feedback History */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <h3 className="text-2xl font-black text-white flex items-center gap-3">
            <FaHistory className="text-cyan-400" /> Previous Feedback
          </h3>
          <div className="space-y-6">
            {feedbackHistory.map((item) => (
              <div key={item.id} className="bg-white/5 rounded-3xl p-6 border border-white/5 relative overflow-hidden group">
                <FaQuoteLeft className="absolute -top-2 -right-2 text-6xl opacity-5 pointer-events-none text-white" />
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] text-cyan-400 font-black uppercase tracking-widest">{item.course}</span>
                  <div className="flex gap-1 text-yellow-400 text-xs">
                    {[...Array(item.rating)].map((_, i) => <FaStar key={i} />)}
                  </div>
                </div>
                <p className="text-slate-300 font-medium mb-4 italic leading-relaxed">"{item.message}"</p>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.date}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Feedback;
