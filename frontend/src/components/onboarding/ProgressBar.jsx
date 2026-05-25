import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ percentage = 0 }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Progress</p>
        <p className="text-sm font-bold text-blue-400">{percentage}%</p>
      </div>
      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
        />
      </div>
    </div>
  );
}
