import React from 'react';
import { FaCode, FaRocket, FaCertificate, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <FaCode className="text-blue-400" />,
    title: "Hands-on Learning",
    desc: "Learn by doing with real-world projects and interactive coding exercises."
  },
  {
    icon: <FaRocket className="text-cyan-400" />,
    title: "Career Growth",
    desc: "Gain the skills you need to land your dream job in tech and beyond."
  },
  {
    icon: <FaCertificate className="text-yellow-400" />,
    title: "Certified Courses",
    desc: "Earn certificates recognized by top industry leaders and companies."
  },
  {
    icon: <FaUsers className="text-green-400" />,
    title: "Expert Mentors",
    desc: "Get guidance from industry experts who are passionate about teaching."
  }
];

const Features = () => {
  return (
    <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-12 bg-richblack-900 text-white py-24">
      <div className="text-center max-w-3xl">
        <h2 className="text-4xl font-semibold">
          Our <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">Key Features</span>
        </h2>
        <p className="mt-4 text-richblack-300 text-lg">
          We provide a holistic learning experience that goes beyond just watching videos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center text-center p-8 rounded-2xl bg-richblack-800 border border-richblack-700 hover:border-cyan-500/50 transition-all group"
          >
            <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-richblack-400 text-sm leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
