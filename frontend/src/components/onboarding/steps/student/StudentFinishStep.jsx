import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../../ui/GlassCard';

export default function StudentFinishStep({ onComplete, name }) {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  const handleComplete = () => {
    onComplete();
    navigate('/dashboard/my-profile');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const recommendedCourses = [
    { id: 1, title: 'Full Stack Web Development', category: 'Web Dev', image: 'https://picsum.photos/seed/course1/400/225' },
    { id: 2, title: 'Python for Machine Learning', category: 'AI/ML', image: 'https://picsum.photos/seed/course2/400/225' },
    { id: 3, title: 'UI/UX Design Fundamentals', category: 'Design', image: 'https://picsum.photos/seed/course3/400/225' },
  ];

  return (
    <GlassCard className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="mx-auto w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center"
        >
          <CheckCircle className="w-14 h-14 text-emerald-400" />
        </motion.div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-white">
            Welcome, {name || 'Learner'}! 🎉
          </h2>
          <p className="text-gray-400 text-lg">Your learning journey starts now</p>
          <p className="text-sm text-gray-500">Redirecting to dashboard in {countdown}s...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendedCourses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + course.id * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10"
            >
              <img src={course.image} alt={course.title} className="w-full h-36 object-cover" />
              <div className="p-4 text-left">
                <span className="text-xs font-medium text-indigo-400">{course.category}</span>
                <h3 className="text-sm font-bold text-white mt-1 line-clamp-2">{course.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleComplete}
          className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-2xl text-white font-bold text-lg shadow-xl"
        >
          Go to Dashboard
          <ArrowRight />
        </motion.button>
      </motion.div>
    </GlassCard>
  );
}
