import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const reviews = [
  {
    name: "Rahul Mehra",
    role: "Full Stack Developer",
    image: "https://api.dicebear.com/5.x/initials/svg?seed=RM",
    text: "The courses are incredibly detailed. I went from knowing nothing to landing my first job in 6 months."
  },
  {
    name: "Sneha Gupta",
    role: "UI/UX Designer",
    image: "https://api.dicebear.com/5.x/initials/svg?seed=SG",
    text: "Learning here was a game changer for my career. The mentors are always ready to help."
  },
  {
    name: "Amit Singh",
    role: "Data Scientist",
    image: "https://api.dicebear.com/5.x/initials/svg?seed=AS",
    text: "Top notch content and hands-on projects. Highly recommended for anyone serious about tech."
  }
];

const Testimonials = () => {
  return (
    <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-12 bg-richblack-900 text-white py-24">
      <div className="text-center">
        <h2 className="text-4xl font-semibold">
          What Our <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">Students Say</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col gap-6 p-8 rounded-2xl bg-richblack-800 border border-richblack-700 relative overflow-hidden"
          >
            <FaQuoteLeft className="text-4xl text-richblack-700 absolute top-4 right-4 opacity-20" />
            <p className="text-richblack-200 italic leading-relaxed z-10">
              "{review.text}"
            </p>
            <div className="flex items-center gap-4 mt-auto">
              <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full border-2 border-cyan-500" />
              <div>
                <h4 className="font-bold text-white">{review.name}</h4>
                <p className="text-richblack-400 text-xs">{review.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
