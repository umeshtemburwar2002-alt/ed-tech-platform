import React from 'react';
import { componentVariants } from '../../theme';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  ...props
}) => {
  // Defensive coding: Ensure children exists
  const content = children || 'Button';
  
  // Size variants
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };
  
  // Get variant classes with fallback
  const variantClasses = componentVariants?.button?.[variant]?.base || componentVariants.button.primary.base;
  const disabledClasses = componentVariants?.button?.[variant]?.disabled || componentVariants.button.primary.disabled;
  
  // Base classes
  const baseClasses = [
    'inline-flex items-center justify-center',
    'font-medium rounded-lg',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-richblack-900',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    fullWidth ? 'w-full' : '',
    sizeClasses[size] || sizeClasses.medium,
    disabled ? disabledClasses : variantClasses,
    className,
  ].filter(Boolean).join(' ');
  
  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };
  
  return (
    <button
      type={type}
      className={baseClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      
      {Icon && iconPosition === 'left' && !loading && (
        <Icon className={`w-4 h-4 ${content ? 'mr-2' : ''}`} />
      )}
      
      {content && <span>{content}</span>}
      
      {Icon && iconPosition === 'right' && !loading && (
        <Icon className={`w-4 h-4 ${content ? 'ml-2' : ''}`} />
      )}
    </button>
  );
};

export default Button;