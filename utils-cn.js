/**
 * College LMS - Utility function for className merging
 * Combines Tailwind classes using clsx and tailwind-merge
 */

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default cn;
