import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import {
  FaPalette,
  FaSun,
  FaMoon,
  FaDesktop,
  FaEye,
  FaCheck,
  FaAdjust,
  FaFont,
  FaExpand,
  FaCompress
} from 'react-icons/fa';
import { Card, Button, Badge } from '../../components/ui';

const Theme = () => {
  const { user } = useSelector((state) => state.profile);
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [accentColor, setAccentColor] = useState('yellow');
  const [fontSize, setFontSize] = useState('medium');
  const [compactMode, setCompactMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load saved theme preferences
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedAccent = localStorage.getItem('accentColor') || 'yellow';
    const savedFontSize = localStorage.getItem('fontSize') || 'medium';
    const savedCompact = localStorage.getItem('compactMode') === 'true';
    
    setCurrentTheme(savedTheme);
    setAccentColor(savedAccent);
    setFontSize(savedFontSize);
    setCompactMode(savedCompact);
    setLoading(false);
  }, []);

  const themes = [
    {
      id: 'light',
      name: 'Light Mode',
      icon: FaSun,
      description: 'Clean and bright interface for daytime use',
      preview: 'bg-white text-gray-900',
      primary: 'bg-blue-500',
      secondary: 'bg-gray-100'
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      icon: FaMoon,
      description: 'Easy on the eyes for extended learning sessions',
      preview: 'bg-richblack-900 text-richblack-5',
      primary: 'bg-yellow-50',
      secondary: 'bg-richblack-800'
    },
    {
      id: 'auto',
      name: 'System',
      icon: FaDesktop,
      description: 'Automatically match your device settings',
      preview: 'bg-gradient-to-r from-white to-richblack-900 text-richblack-5',
      primary: 'bg-blue-500',
      secondary: 'bg-gray-500'
    }
  ];

  const accentColors = [
    { id: 'yellow', name: 'Yellow', color: 'bg-yellow-400', hex: '#FBBF24' },
    { id: 'blue', name: 'Blue', color: 'bg-blue-500', hex: '#3B82F6' },
    { id: 'green', name: 'Green', color: 'bg-green-500', hex: '#10B981' },
    { id: 'purple', name: 'Purple', color: 'bg-purple-500', hex: '#8B5CF6' },
    { id: 'pink', name: 'Pink', color: 'bg-pink-500', hex: '#EC4899' },
    { id: 'orange', name: 'Orange', color: 'bg-orange-500', hex: '#F97316' }
  ];

  const fontSizes = [
    { id: 'small', name: 'Small', size: 'text-sm', description: 'Compact text for more content' },
    { id: 'medium', name: 'Medium', size: 'text-base', description: 'Standard readable size' },
    { id: 'large', name: 'Large', size: 'text-lg', description: 'Larger text for better readability' }
  ];

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    localStorage.setItem('theme', themeId);
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', themeId);
    
    // Apply actual CSS classes for theme switching
    const root = document.documentElement;
    
    if (themeId === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      // Update CSS variables for light theme
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f8fafc');
      root.style.setProperty('--text-primary', '#1f2937');
      root.style.setProperty('--text-secondary', '#6b7280');
      root.style.setProperty('--border-color', '#e5e7eb');
    } else if (themeId === 'dark') {
      root.classList.remove('light');
      root.classList.add('dark');
      // Update CSS variables for dark theme
      root.style.setProperty('--bg-primary', '#0f172a');
      root.style.setProperty('--bg-secondary', '#1e293b');
      root.style.setProperty('--text-primary', '#f1f5f9');
      root.style.setProperty('--text-secondary', '#94a3b8');
      root.style.setProperty('--border-color', '#334155');
    } else if (themeId === 'auto') {
      // Auto theme based on system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.remove('light');
        root.classList.add('dark');
        root.style.setProperty('--bg-primary', '#0f172a');
        root.style.setProperty('--bg-secondary', '#1e293b');
        root.style.setProperty('--text-primary', '#f1f5f9');
        root.style.setProperty('--text-secondary', '#94a3b8');
        root.style.setProperty('--border-color', '#334155');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        root.style.setProperty('--bg-primary', '#ffffff');
        root.style.setProperty('--bg-secondary', '#f8fafc');
        root.style.setProperty('--text-primary', '#1f2937');
        root.style.setProperty('--text-secondary', '#6b7280');
        root.style.setProperty('--border-color', '#e5e7eb');
      }
    }
    
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: themeId } }));
  };

  const handleAccentChange = (colorId) => {
    setAccentColor(colorId);
    localStorage.setItem('accentColor', colorId);
    // Apply accent color to CSS variables
    const color = accentColors.find(c => c.id === colorId);
    document.documentElement.style.setProperty('--accent-color', color.hex);
  };

  const handleFontSizeChange = (sizeId) => {
    setFontSize(sizeId);
    localStorage.setItem('fontSize', sizeId);
    // Apply font size to document
    document.documentElement.setAttribute('data-font-size', sizeId);
  };

  const handleCompactModeToggle = () => {
    const newCompactMode = !compactMode;
    setCompactMode(newCompactMode);
    localStorage.setItem('compactMode', newCompactMode.toString());
    // Apply compact mode
    document.documentElement.setAttribute('data-compact', newCompactMode.toString());
  };

  const resetToDefaults = () => {
    setCurrentTheme('dark');
    setAccentColor('yellow');
    setFontSize('medium');
    setCompactMode(false);
    
    localStorage.setItem('theme', 'dark');
    localStorage.setItem('accentColor', 'yellow');
    localStorage.setItem('fontSize', 'medium');
    localStorage.setItem('compactMode', 'false');
    
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.style.setProperty('--accent-color', '#FBBF24');
    document.documentElement.setAttribute('data-font-size', 'medium');
    document.documentElement.setAttribute('data-compact', 'false');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-richblack-900 flex items-center justify-center">
        <div className="text-richblack-5 text-xl">Loading theme settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-richblack-5 mb-2">
                Theme Settings
              </h1>
              <p className="text-richblack-300">
                Customize your learning environment to match your preferences.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={resetToDefaults}>
                Reset to Defaults
              </Button>
              <div className="flex items-center space-x-2">
                <FaPalette className="text-yellow-400" />
                <span className="text-richblack-300">Current: {themes.find(t => t.id === currentTheme)?.name}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Theme Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-richblack-5 mb-4">Appearance Mode</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {themes.map((theme, index) => {
                const IconComponent = theme.icon;
                const isSelected = currentTheme === theme.id;
                
                return (
                  <motion.div
                    key={theme.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative cursor-pointer transition-all duration-300 ${
                      isSelected ? 'ring-2 ring-yellow-400' : 'hover:ring-1 hover:ring-richblack-600'
                    }`}
                    onClick={() => handleThemeChange(theme.id)}
                  >
                    <Card className="p-6 h-full">
                      {isSelected && (
                        <div className="absolute top-4 right-4">
                          <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                            <FaCheck className="text-richblack-900 text-sm" />
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
                          <IconComponent className="text-richblack-900 text-xl" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-richblack-5">{theme.name}</h3>
                          {isSelected && <Badge variant="success" size="small">Active</Badge>}
                        </div>
                      </div>
                      
                      <p className="text-richblack-400 text-sm mb-4">{theme.description}</p>
                      
                      {/* Theme Preview */}
                      <div className={`w-full h-20 rounded-lg ${theme.preview} p-3 border border-richblack-600`}>
                        <div className={`w-full h-3 ${theme.primary} rounded mb-2`}></div>
                        <div className={`w-3/4 h-2 ${theme.secondary} rounded mb-1`}></div>
                        <div className={`w-1/2 h-2 ${theme.secondary} rounded`}></div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Accent Color Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-richblack-5 mb-4">Accent Color</h2>
            <p className="text-richblack-400 mb-6">Choose your preferred accent color for buttons and highlights.</p>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {accentColors.map((color) => {
                const isSelected = accentColor === color.id;
                
                return (
                  <motion.div
                    key={color.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 ${
                      isSelected ? 'border-yellow-400 bg-richblack-700' : 'border-richblack-600 hover:border-richblack-500'
                    }`}
                    onClick={() => handleAccentChange(color.id)}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className={`w-8 h-8 ${color.color} rounded-full relative`}>
                        {isSelected && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <FaCheck className="text-white text-sm" />
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-richblack-300">{color.name}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Typography & Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-richblack-5 mb-6">Typography & Layout</h2>
            
            {/* Font Size */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-richblack-5 mb-4">Font Size</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {fontSizes.map((size) => {
                  const isSelected = fontSize === size.id;
                  
                  return (
                    <motion.div
                      key={size.id}
                      whileHover={{ scale: 1.02 }}
                      className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 ${
                        isSelected ? 'border-yellow-400 bg-richblack-700' : 'border-richblack-600 hover:border-richblack-500'
                      }`}
                      onClick={() => handleFontSizeChange(size.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-richblack-5">{size.name}</span>
                        {isSelected && <FaCheck className="text-yellow-400" />}
                      </div>
                      <p className={`text-richblack-400 ${size.size} mb-2`}>
                        Sample text in {size.name.toLowerCase()} size
                      </p>
                      <p className="text-xs text-richblack-500">{size.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            {/* Compact Mode */}
            <div>
              <h3 className="text-lg font-semibold text-richblack-5 mb-4">Layout Density</h3>
              <div 
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 ${
                  compactMode ? 'border-yellow-400 bg-richblack-700' : 'border-richblack-600 hover:border-richblack-500'
                }`}
                onClick={handleCompactModeToggle}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {compactMode ? (
                      <FaCompress className="text-yellow-400 text-xl" />
                    ) : (
                      <FaExpand className="text-richblack-400 text-xl" />
                    )}
                    <div>
                      <h4 className="font-semibold text-richblack-5">Compact Mode</h4>
                      <p className="text-sm text-richblack-400">
                        {compactMode ? 'Enabled - More content in less space' : 'Disabled - Standard spacing'}
                      </p>
                    </div>
                  </div>
                  <div className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                    compactMode ? 'bg-yellow-400' : 'bg-richblack-600'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform duration-300 ${
                      compactMode ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-richblack-5 mb-4">Preview</h2>
            <p className="text-richblack-400 mb-6">See how your theme settings will look across the platform.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Dashboard Preview */}
              <div className="border border-richblack-600 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-richblack-5 mb-3">Dashboard</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${accentColors.find(c => c.id === accentColor)?.color} rounded`}></div>
                    <div className="flex-1">
                      <div className="w-full h-3 bg-richblack-700 rounded mb-1"></div>
                      <div className="w-3/4 h-2 bg-richblack-800 rounded"></div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className={`flex-1 h-8 ${accentColors.find(c => c.id === accentColor)?.color} rounded`}></div>
                    <div className="flex-1 h-8 bg-richblack-700 rounded"></div>
                  </div>
                </div>
              </div>
              
              {/* Course Preview */}
              <div className="border border-richblack-600 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-richblack-5 mb-3">Course Content</h3>
                <div className="space-y-3">
                  <div className="w-full h-4 bg-richblack-700 rounded"></div>
                  <div className="w-5/6 h-3 bg-richblack-800 rounded"></div>
                  <div className="w-4/6 h-3 bg-richblack-800 rounded"></div>
                  <div className={`w-1/3 h-6 ${accentColors.find(c => c.id === accentColor)?.color} rounded`}></div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Theme;