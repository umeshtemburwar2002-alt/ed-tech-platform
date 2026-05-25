import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

export default function WelcomeStep({ onNext, role, user }) {
  return (
    <GlassCard className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
          <GraduationCap size={48} className="text-white" />
        </div>
        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-black text-white tracking-tight"
          >
            Welcome to <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Coredev Academy</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-lg text-gray-400 max-w-md mx-auto"
          >
            {role === 'instructor' ? 'Let\'s set up your instructor profile and start teaching!' : 'Let\'s personalize your learning experience!'}
          </motion.p>
        </div>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98, y: 1 }}
          onClick={onNext}
          className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-2xl text-white font-bold text-lg shadow-xl shadow-indigo-500/30"
        >
          Start Your Journey
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
    </GlassCard>
  );
}
