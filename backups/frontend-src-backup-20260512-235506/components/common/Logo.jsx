import React from "react";
import { FaGraduationCap, FaRocket, FaBrain } from "react-icons/fa";
import { motion } from "framer-motion";

/**
 * Modern SVG-based Logo component
 * Props:
 *  - variant: 'full' | 'small' (default 'full')
 *  - instructor: boolean (if true shows small + Instructor label)
 *  - className: extra classes
 */
export default function Logo({ variant = "full", instructor = false, className = "" }) {
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      filter: "brightness(1.5) drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))",
      transition: {
        duration: 0.1
      }
    }
  };

  const iconVariants = {
    hidden: { rotate: 0 },
    visible: { 
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut"
      }
    }
  };

  if (instructor) {
    return (
      <motion.span 
        className={`flex items-center gap-4 ${className}`}
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
      >
        {/* Advanced Instructor Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur-lg opacity-60 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-3 rounded-xl shadow-xl border border-white/30">
            <motion.div 
              variants={iconVariants}
              className="relative"
            >
              <FaBrain className="text-white text-xl drop-shadow-lg" />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse border border-white"></div>
            </motion.div>
          </div>
        </div>
        
        {/* Premium Instructor Branding */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-white drop-shadow-lg tracking-tight">
              Aslam Education
            </span>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 rounded-md shadow-lg">
              <span className="text-xs font-black text-richblack-900 tracking-wide">MASTER</span>
            </div>
          </div>
          <span className="text-xs font-semibold text-richblack-300 tracking-wide uppercase">
            Teaching Excellence
          </span>
        </div>
        
        {/* Advanced Status Indicators */}
        <div className="hidden md:flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            <motion.div 
              className="w-2.5 h-2.5 bg-green-400 rounded-full shadow-lg"
              animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            ></motion.div>
            <motion.div 
              className="w-2.5 h-2.5 bg-blue-400 rounded-full shadow-lg"
              animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            ></motion.div>
            <motion.div 
              className="w-2.5 h-2.5 bg-purple-400 rounded-full shadow-lg"
              animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            ></motion.div>
          </div>
          <span className="text-xs font-semibold text-green-400 tracking-wider">ONLINE</span>
        </div>
      </motion.span>
    );
  }

  const isFull = variant === "full";
  
  if (isFull) {
    return (
      <motion.span 
        className={`inline-flex items-center gap-3 ${className}`}
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
      >
        {/* Logo Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur-lg opacity-40 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-2xl shadow-xl">
            <motion.div variants={iconVariants}>
              <FaGraduationCap className="text-richblack-900 text-2xl" />
            </motion.div>
          </div>
        </div>
        
        {/* Brand Text */}
        <div className="flex flex-col">
          <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent tracking-tight">
            Aslam Education
          </span>
          <span className="text-xs font-medium text-richblack-400 tracking-widest uppercase">
            Learning Platform
          </span>
        </div>
        
        {/* Decorative Elements */}
        <div className="hidden md:flex items-center gap-1 ml-2">
          <motion.div 
            className="w-1 h-1 bg-yellow-400 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          ></motion.div>
          <motion.div 
            className="w-1 h-1 bg-orange-400 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          ></motion.div>
          <motion.div 
            className="w-1 h-1 bg-yellow-500 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          ></motion.div>
        </div>
      </motion.span>
    );
  }

  // Small variant
  return (
    <motion.span 
      className={`inline-flex items-center ${className}`}
      variants={logoVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl blur-md opacity-40"></div>
        <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-xl shadow-lg">
          <motion.div variants={iconVariants}>
            <FaGraduationCap className="text-richblack-900 text-lg" />
          </motion.div>
        </div>
      </div>
    </motion.span>
  );
}
