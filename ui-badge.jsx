/**
 * College LMS - Badge Component
 * Reusable badge with status variants
 */

import React from 'react';
import { cn } from '../../utils/cn';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}) => {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border border-slate-700',
    draft: 'bg-gray-900/50 text-gray-300 border border-gray-700',
    pending: 'bg-yellow-900/50 text-yellow-300 border border-yellow-700',
    published: 'bg-green-900/50 text-green-300 border border-green-700',
    rejected: 'bg-red-900/50 text-red-300 border border-red-700',
    archived: 'bg-purple-900/50 text-purple-300 border border-purple-700',
    active: 'bg-blue-900/50 text-blue-300 border border-blue-700',
    completed: 'bg-green-900/50 text-green-300 border border-green-700',
    failed: 'bg-red-900/50 text-red-300 border border-red-700',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
