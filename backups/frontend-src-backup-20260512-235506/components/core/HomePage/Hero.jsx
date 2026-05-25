import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Hero = () => {
  return (
    <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between gap-8 py-20">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none"
      >
        <Link to="/signup">
          <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
            <p>Become an Instructor</p>
            <FaArrowRight />
          </div>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center text-4xl font-semibold md:text-6xl"
      >
        Empower Your Future with <br />
        <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
          Coding Skills
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-300 md:text-xl"
      >
        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-row gap-7 mt-8"
      >
        <Link to="/signup">
          <div className="text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]">
            Learn More
          </div>
        </Link>
        <Link to="/login">
          <div className="text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold bg-richblack-800 text-white hover:scale-95 transition-all duration-200 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]">
            Book a Demo
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

export default Hero;
