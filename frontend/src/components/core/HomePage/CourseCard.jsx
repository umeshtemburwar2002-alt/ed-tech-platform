import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaSignal, FaStar } from 'react-icons/fa';
import RatingStars from '../../common/RatingStars';

export default function CourseCard({ course }) {
  const {
    thumbnail,
    title,
    description,
    rating,
    duration,
    level,
    price,
    isFree
  } = course;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-richblack-50 group"
    >
      {/* Top Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {isFree && (
          <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            Free Demo
          </div>
        )}
      </div>

      {/* Course Info */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-richblack-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="text-richblack-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <RatingStars Review_Count={rating} Star_Size={16} />
          <span className="text-sm font-semibold text-richblack-700">({rating})</span>
        </div>

        {/* Meta Details */}
        <div className="flex items-center justify-between py-4 border-t border-richblack-50 mb-4">
          <div className="flex items-center gap-2 text-richblack-600 text-xs font-medium">
            <FaClock className="text-blue-500" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-richblack-600 text-xs font-medium">
            <FaSignal className="text-blue-500" />
            <span>{level}</span>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-richblack-400 tracking-wider">Course Fee</span>
            <span className={`text-xl font-extrabold ${isFree ? 'text-emerald-600' : 'text-blue-600'}`}>
              {isFree ? 'FREE' : `₹${price}`}
            </span>
          </div>
          <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all active:scale-95">
            Enroll Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
