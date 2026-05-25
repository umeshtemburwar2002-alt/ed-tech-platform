import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({
  isOpen = false,
  onClose,
  children,
  title,
  size = 'medium',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = '',
  overlayClassName = '',
  ...props
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  
  // Size variants
  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };
  
  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);
  
  // Handle focus management
  useEffect(() => {
    if (!isOpen) return;
    
    // Store the previously focused element
    previousFocusRef.current = document.activeElement;
    
    // Focus the modal
    if (modalRef.current) {
      modalRef.current.focus();
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Restore body scroll
      document.body.style.overflow = 'unset';
      
      // Restore focus to previously focused element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen]);
  
  // Handle overlay click
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose?.();
    }
  };
  
  // Handle close button click
  const handleCloseClick = () => {
    onClose?.();
  };
  
  if (!isOpen) return null;
  
  const modalContent = (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${overlayClassName}`}
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-75 transition-opacity" />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className={`
          relative w-full ${sizeClasses[size] || sizeClasses.medium}
          bg-richblack-800 border border-richblack-700 rounded-xl shadow-2xl
          transform transition-all duration-300 scale-100
          max-h-[90vh] overflow-hidden flex flex-col
          ${className}
        `}
        tabIndex={-1}
        {...props}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-richblack-700">
            {title && (
              <h2 className="text-xl font-semibold text-richblack-5">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={handleCloseClick}
                className="p-2 text-richblack-400 hover:text-richblack-200 hover:bg-richblack-700 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
  
  // Render modal in portal
  return createPortal(modalContent, document.body);
};

// Modal Header Component
const ModalHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 border-b border-richblack-700 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Modal Body Component
const ModalBody = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Modal Footer Component
const ModalFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 border-t border-richblack-700 flex items-center justify-end space-x-3 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Export all components
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
export { ModalHeader, ModalBody, ModalFooter };