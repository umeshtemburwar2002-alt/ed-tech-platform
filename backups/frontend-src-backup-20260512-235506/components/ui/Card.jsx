import React from 'react';
import { componentVariants } from '../../theme';

const Card = ({
  children,
  variant = 'default',
  padding = 'medium',
  hover = false,
  className = '',
  onClick,
  ...props
}) => {
  // Defensive coding: Ensure children exists
  const content = children || null;
  
  // Padding variants
  const paddingClasses = {
    none: '',
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6',
    xl: 'p-8',
  };
  
  // Get variant classes with fallback
  const variantClasses = componentVariants?.card?.[variant] || componentVariants.card.default;
  
  // Base classes
  const baseClasses = [
    variantClasses,
    paddingClasses[padding] || paddingClasses.medium,
    hover ? 'transition-all duration-300 hover:shadow-xl hover:border-yellow-50 cursor-pointer' : '',
    onClick ? 'cursor-pointer' : '',
    className,
  ].filter(Boolean).join(' ');
  
  const handleClick = (e) => {
    onClick?.(e);
  };
  
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      className={baseClasses}
      onClick={handleClick}
      {...props}
    >
      {content}
    </Component>
  );
};

// Card Header Component
const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`border-b border-richblack-700 pb-4 mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Card Body Component
const CardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
};

// Card Footer Component
const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`border-t border-richblack-700 pt-4 mt-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Card Title Component
const CardTitle = ({ children, className = '', level = 3, ...props }) => {
  const Tag = `h${level}`;
  const sizeClasses = {
    1: 'text-2xl',
    2: 'text-xl',
    3: 'text-lg',
    4: 'text-base',
    5: 'text-sm',
    6: 'text-xs',
  };
  
  return (
    <Tag className={`font-semibold text-richblack-5 ${sizeClasses[level]} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

// Card Description Component
const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p className={`text-richblack-300 ${className}`} {...props}>
      {children}
    </p>
  );
};

// Export all components
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Title = CardTitle;
Card.Description = CardDescription;

export default Card;
export { CardHeader, CardBody, CardFooter, CardTitle, CardDescription };