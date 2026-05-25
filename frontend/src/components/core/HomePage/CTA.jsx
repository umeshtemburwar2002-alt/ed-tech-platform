import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaRocket } from 'react-icons/fa';

const CTA = () => {
  return (
    <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-12 bg-richblack-900 text-white py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="w-full bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-white/10 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-cyan-500/10 rounded-full blur-[100px] -z-10"></div>

        <h2 className="text-4xl md:text-5xl font-black mb-6">
          Ready to Start Your <br />
          <span className="text-cyan-400">Tech Career?</span>
        </h2>
        
        <p className="text-richblack-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Join thousands of learners who are already building their futures with our industry-leading courses and expert mentorship.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/signup">
            <button className="flex items-center gap-2 px-8 py-4 bg-cyan-500 text-black font-black rounded-2xl hover:bg-cyan-400 transition-all hover:scale-105 shadow-lg shadow-cyan-500/20">
              Get Started Now <FaRocket />
            </button>
          </Link>
          <Link to="/contact">
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all">
              Contact Support
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default CTA;
