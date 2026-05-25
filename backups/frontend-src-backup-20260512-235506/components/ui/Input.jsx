import React, { forwardRef } from 'react';
import { componentVariants } from '../../theme';

const Input = forwardRef(({
  label,
  error,
  success,
  helperText,
  required = false,
  disabled = false,
  className = '',
  containerClassName = '',
  type = 'text',
  placeholder = '',
  icon: Icon,
  iconPosition = 'left',
  ...props
}, ref) => {
  // Determine input state
  const hasError = Boolean(error);
  const hasSuccess = Boolean(success);
  
  // Get variant classes based on state
  let variantClasses = componentVariants?.input?.default || '';
  if (hasError) {
    variantClasses = componentVariants?.input?.error || '';
  } else if (hasSuccess) {
    variantClasses = componentVariants?.input?.success || '';
  }
  
  // Base input classes
  const inputClasses = [
    'w-full px-3 py-2 text-sm',
    'placeholder:text-richblack-400',
    'transition-colors duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    Icon && iconPosition === 'left' ? 'pl-10' : '',
    Icon && iconPosition === 'right' ? 'pr-10' : '',
    variantClasses,
    className,
  ].filter(Boolean).join(' ');
  
  // Container classes
  const containerClasses = [
    'relative',
    containerClassName,
  ].filter(Boolean).join(' ');
  
  return (
    <div className={containerClasses}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-richblack-5 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {Icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className={`h-4 w-4 ${
              hasError ? 'text-red-400' : 
              hasSuccess ? 'text-green-400' : 
              'text-richblack-400'
            }`} />
          </div>
        )}
        
        {/* Input Field */}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />
        
        {/* Right Icon */}
        {Icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Icon className={`h-4 w-4 ${
              hasError ? 'text-red-400' : 
              hasSuccess ? 'text-green-400' : 
              'text-richblack-400'
            }`} />
          </div>
        )}
        
        {/* Error Icon */}
        {hasError && !Icon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        
        {/* Success Icon */}
        {hasSuccess && !Icon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Helper Text / Error Message */}
      {(error || success || helperText) && (
        <div className="mt-2">
          {error && (
            <p className="text-sm text-red-400 flex items-center">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm text-green-400 flex items-center">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {success}
            </p>
          )}
          {helperText && !error && !success && (
            <p className="text-sm text-richblack-400">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;