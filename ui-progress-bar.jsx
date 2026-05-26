/**
 * College LMS - ProgressBar Component
 * Animated progress bar with percentage label and color variants
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const ProgressBar = ({
  value = 0,
  max = 100,
  variant = 'primary',
  size = 'md',
  showLabel = true,
  label,
  className,
  animated = true,
}) => {
  const percentage = Math.round((value / max) * 100);

  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-600',
    success: 'bg-gradient-to-r from-green-500 to-green-600',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
    danger: 'bg-gradient-to-r from-red-500 to-red-600',
  };

  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full', className)}>
      {(label || showLabel) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm font-medium text-slate-300">{label}</span>
          )}
          {showLabel && (
            <span className="text-sm font-medium text-slate-400">{percentage}%</span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-slate-800 rounded-full overflow-hidden', sizes[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animated ? 0.5 : 0 }}
          className={cn('h-full rounded-full', variants[variant])}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
