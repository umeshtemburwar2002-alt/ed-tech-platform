import React from 'react';

// UI Components Export
// This file provides a centralized export for all reusable UI components

// Core Components
export { default as Button } from './Button';
export { default as Card, CardHeader, CardBody, CardFooter, CardTitle, CardDescription } from './Card';
export { default as Input } from './Input';
export { default as Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';
export { default as Badge } from './Badge';
export { default as Loading, Skeleton, LoadingContainer } from './Loading';
export { default as ErrorBoundary, withErrorBoundary, useErrorHandler } from './ErrorBoundary';

// Re-export theme for easy access
export { theme, componentVariants, layout } from '../../theme';

// Utility function for conditional classes
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Safe component wrapper that prevents crashes
export const SafeComponent = ({ children, fallback = null, onError }) => {
  try {
    return children || fallback;
  } catch (error) {
    console.error('SafeComponent caught error:', error);
    onError?.(error);
    return fallback;
  }
};

// Hook for safe data access with fallbacks
export const useSafeData = (data, fallback = {}) => {
  return React.useMemo(() => {
    if (!data || typeof data !== 'object') {
      return fallback;
    }
    return { ...fallback, ...data };
  }, [data, fallback]);
};

// Hook for safe array access
export const useSafeArray = (array, fallback = []) => {
  return React.useMemo(() => {
    if (!Array.isArray(array)) {
      return fallback;
    }
    return array;
  }, [array, fallback]);
};

// Safe property access utility
export const safeGet = (obj, path, defaultValue = undefined) => {
  if (!obj || typeof obj !== 'object') {
    return defaultValue;
  }
  
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result == null || typeof result !== 'object') {
      return defaultValue;
    }
    result = result[key];
  }
  
  return result !== undefined ? result : defaultValue;
};

// Safe component props utility
export const safeProps = (props, defaults = {}) => {
  if (!props || typeof props !== 'object') {
    return defaults;
  }
  return { ...defaults, ...props };
};