// Comprehensive Theme Configuration for Ed Tech Platform
// This file contains all design tokens, colors, typography, spacing, and component styles

export const theme = {
  // Color Palette - Professional Educational Theme
  colors: {
    // Primary Brand Colors
    primary: {
      50: '#fef7ee',
      100: '#fdecd3',
      200: '#fbd5a5',
      300: '#f8b76d',
      400: '#f59e0b', // Main primary
      500: '#d97706',
      600: '#b45309',
      700: '#92400e',
      800: '#78350f',
      900: '#451a03',
    },
    
    // Secondary Colors
    secondary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Main secondary
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    
    // Accent Colors
    accent: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e', // Main accent
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    
    // Neutral Colors (Dark Theme)
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    
    // Rich Black Theme (Current)
    richblack: {
      5: '#F1F2FF',
      25: '#DBDDEA',
      50: '#C5C7D4',
      100: '#AFB2BF',
      200: '#999DAA',
      300: '#838894',
      400: '#6E727F',
      500: '#585D69',
      600: '#424854',
      700: '#2C333F',
      800: '#161D29',
      900: '#000814',
    },
    
    // Status Colors
    success: {
      50: '#f0fdf4',
      500: '#22c55e',
      600: '#16a34a',
    },
    warning: {
      50: '#fffbeb',
      500: '#f59e0b',
      600: '#d97706',
    },
    error: {
      50: '#fef2f2',
      500: '#ef4444',
      600: '#dc2626',
    },
    info: {
      50: '#eff6ff',
      500: '#3b82f6',
      600: '#2563eb',
    },
    
    // Special Colors
    yellow: {
      25: '#FFE83D',
      50: '#FFD60A',
      100: '#E7C009',
    },
  },
  
  // Typography System
  typography: {
    fontFamily: {
      primary: ['Inter', 'system-ui', 'sans-serif'],
      secondary: ['Roboto Mono', 'monospace'],
      heading: ['Inter', 'system-ui', 'sans-serif'],
    },
    
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
    },
    
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },
  
  // Spacing System
  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },
  
  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  
  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
  },
  
  // Animation Durations
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
  },
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Z-Index Scale
  zIndex: {
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    auto: 'auto',
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    modal: '1040',
    popover: '1050',
    tooltip: '1060',
  },
};

// Component Variants
export const componentVariants = {
  // Button Variants
  button: {
    primary: {
      base: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 focus:ring-purple-400 shadow-lg hover:shadow-xl transform hover:scale-105',
      disabled: 'bg-richblack-600 text-richblack-400 cursor-not-allowed',
    },
    secondary: {
      base: 'bg-richblack-700 text-richblack-100 hover:bg-richblack-600 focus:ring-richblack-500',
      disabled: 'bg-richblack-800 text-richblack-500 cursor-not-allowed',
    },
    outline: {
      base: 'border border-yellow-50 text-yellow-50 hover:bg-yellow-50 hover:text-richblack-900 focus:ring-yellow-500',
      disabled: 'border-richblack-600 text-richblack-600 cursor-not-allowed',
    },
    ghost: {
      base: 'text-richblack-100 hover:bg-richblack-700 focus:ring-richblack-500',
      disabled: 'text-richblack-600 cursor-not-allowed',
    },
  },
  
  // Card Variants
  card: {
    default: 'bg-richblack-800 border border-richblack-700 rounded-xl shadow-lg',
    elevated: 'bg-richblack-800 border border-richblack-700 rounded-xl shadow-xl',
    flat: 'bg-richblack-800 border border-richblack-700 rounded-lg',
    gradient: 'bg-gradient-to-br from-richblack-800 to-richblack-900 border border-richblack-700 rounded-xl shadow-lg',
  },
  
  // Input Variants
  input: {
    default: 'bg-richblack-700 border border-richblack-600 text-richblack-100 rounded-lg focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50',
    error: 'bg-richblack-700 border border-red-500 text-richblack-100 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500',
    success: 'bg-richblack-700 border border-green-500 text-richblack-100 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500',
  },
  
  // Badge Variants
  badge: {
    primary: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    secondary: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    success: 'bg-green-500/10 text-green-400 border border-green-500/20',
    warning: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
    error: 'bg-red-500/10 text-red-400 border border-red-500/20',
    neutral: 'bg-richblack-700 text-richblack-300 border border-richblack-600',
  },
};

// Layout Constants
export const layout = {
  maxWidth: {
    content: '1260px',
    contentTab: '650px',
  },
  sidebar: {
    width: '280px',
    collapsedWidth: '80px',
  },
  header: {
    height: '64px',
  },
  footer: {
    height: '120px',
  },
};

// Export default theme object
const themeConfig = {
  theme,
  componentVariants,
  layout,
};

export default themeConfig;