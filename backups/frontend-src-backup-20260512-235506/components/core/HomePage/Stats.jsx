import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { count: "5K+", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" }
];

const Stats = () => {
  return (
    <div className="bg-richblack-800 py-16">
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-10">
        <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-2"
            >
              <h2 className="text-3xl md:text-4xl font-black text-white">
                {stat.count}
              </h2>
              <p className="text-richblack-400 font-semibold text-sm uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
