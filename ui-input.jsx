/**
 * College LMS - Input Component
 * Reusable input with label, error message, helper text, and icon
 */

import React from 'react';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(
  (
    {
      label,
      type = 'text',
      placeholder,
      icon: Icon,
      error,
      helperText,
      className,
      maxLength,
      showCharCount = false,
      disabled = false,
      required = false,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = React.useState('');
    const charCount = value.length;
    const charRemaining = maxLength ? maxLength - charCount : null;

    const handleChange = (e) => {
      setValue(e.target.value);
      if (props.onChange) {
        props.onChange(e);
      }
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-slate-500" />
            </div>
          )}
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            value={value}
            onChange={handleChange}
            className={cn(
              'w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-slate-500',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              Icon ? 'pl-10' : 'pl-4',
              error
                ? 'border-red-500 focus:ring-red-500'
                : 'border-slate-700 focus:border-blue-500',
              className
            )}
            {...props}
          />
          {showCharCount && maxLength && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <span
                className={cn(
                  'text-xs',
                  charRemaining < 0 ? 'text-red-400' : 'text-slate-500'
                )}
              >
                {charRemaining}
              </span>
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-400 flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-slate-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
