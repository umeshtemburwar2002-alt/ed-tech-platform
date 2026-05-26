/**
 * College LMS - Skeleton Component
 * Loading skeleton with different variants
 */

import React from 'react';
import { cn } from '../../utils/cn';

const Skeleton = ({ variant = 'default', className, ...props }) => {
  const variants = {
    default: 'h-4 w-full rounded',
    text: 'h-4 w-3/4 rounded',
    heading: 'h-8 w-1/2 rounded',
    card: 'h-32 w-full rounded-xl',
    avatar: 'h-10 w-10 rounded-full',
    button: 'h-10 w-24 rounded-lg',
    tableRow: 'h-12 w-full rounded',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-slate-800',
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

const CardSkeleton = () => (
  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
    <Skeleton variant="avatar" className="mb-3" />
    <Skeleton variant="heading" className="mb-2" />
    <Skeleton variant="text" className="mb-2" />
    <Skeleton variant="text" />
  </div>
);

const TableSkeleton = ({ rows = 5 }) => (
  <div className="space-y-2">
    {Array.from({ length: rows }).map((_, i) => (
      <Skeleton key={i} variant="tableRow" />
    ))}
  </div>
);

export default Skeleton;
export { CardSkeleton, TableSkeleton };
