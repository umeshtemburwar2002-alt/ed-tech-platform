import React from 'react';

const Loading = ({
  variant = 'spinner',
  size = 'medium',
  text = '',
  fullScreen = false,
  className = '',
  ...props
}) => {
  // Size variants
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xl: 'w-16 h-16',
  };
  
  const sizeClass = sizeClasses[size] || sizeClasses.medium;
  
  // Spinner Component
  const Spinner = () => (
    <div className={`animate-spin rounded-full border-2 border-richblack-600 border-t-yellow-50 ${sizeClass}`} />
  );
  
  // Dots Component
  const Dots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`bg-yellow-50 rounded-full animate-pulse ${size === 'small' ? 'w-2 h-2' : size === 'large' ? 'w-4 h-4' : 'w-3 h-3'}`}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
  
  // Pulse Component
  const Pulse = () => (
    <div className={`bg-yellow-50 rounded-full animate-pulse ${sizeClass}`} />
  );
  
  // Bars Component
  const Bars = () => (
    <div className="flex items-end space-x-1">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`bg-yellow-50 animate-pulse ${
            size === 'small' ? 'w-1' : size === 'large' ? 'w-2' : 'w-1.5'
          } ${
            size === 'small' ? 'h-4' : size === 'large' ? 'h-8' : 'h-6'
          }`}
          style={{ 
            animationDelay: `${i * 0.1}s`,
            animationDuration: '1s',
          }}
        />
      ))}
    </div>
  );
  
  // Get loading component based on variant
  const getLoadingComponent = () => {
    switch (variant) {
      case 'dots':
        return <Dots />;
      case 'pulse':
        return <Pulse />;
      case 'bars':
        return <Bars />;
      case 'spinner':
      default:
        return <Spinner />;
    }
  };
  
  const loadingContent = (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`} {...props}>
      {getLoadingComponent()}
      {text && (
        <p className="text-richblack-300 text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-richblack-900 bg-opacity-75 flex items-center justify-center z-50">
        {loadingContent}
      </div>
    );
  }
  
  return loadingContent;
};

// Skeleton Loading Component
const Skeleton = ({
  width = '100%',
  height = '1rem',
  className = '',
  variant = 'rectangular',
  ...props
}) => {
  const baseClasses = 'bg-richblack-700 animate-pulse';
  
  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded h-4',
  };
  
  const classes = [
    baseClasses,
    variantClasses[variant] || variantClasses.rectangular,
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <div
      className={classes}
      style={{ width, height: variant === 'text' ? undefined : height }}
      {...props}
    />
  );
};

// Loading Container for wrapping content
const LoadingContainer = ({
  loading = false,
  children,
  fallback,
  className = '',
  ...props
}) => {
  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`} {...props}>
        {fallback || <Loading />}
      </div>
    );
  }
  
  return children;
};

// Export components
Loading.Skeleton = Skeleton;
Loading.Container = LoadingContainer;

export default Loading;
export { Skeleton, LoadingContainer };