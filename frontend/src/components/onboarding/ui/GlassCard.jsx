import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { 
        boxShadow: '0 12px 48px rgba(99, 102, 241, 0.15)',
        y: -4,
      } : {}}
      transition={{ duration: 0.3 }}
      className={`relative w-full rounded-3xl p-8 overflow-hidden
        bg-white/[0.03] border border-white/[0.08]
        backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
