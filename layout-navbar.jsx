/**
 * College LMS - Navbar Component
 * Top navigation with user avatar, role badge, notifications, and theme toggle
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Search,
  Moon,
  Sun,
  User,
  LogOut,
  Settings,
  ChevronDown,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import useAuth from '../../hooks/useAuth';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

const Navbar = ({ onSidebarToggle }) => {
  const { profile, logout, getFullName, getAvatarUrl, isStudent, isInstructor, isHOD, isAdmin } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const notifications = [
    { id: 1, title: 'New course available', message: 'CS401 Advanced Algorithms is now available', time: '2 hours ago' },
    { id: 2, title: 'Assignment due', message: 'CS301 Assignment 3 is due tomorrow', time: '5 hours ago' },
    { id: 3, title: 'Grade posted', message: 'Your grade for CS302 Quiz 2 has been posted', time: '1 day ago' },
  ];

  const toggleTheme = () => {
    setIsDark(!isDark);
    // Add theme toggle logic here
  };

  return (
    <nav className="h-16 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800 fixed top-0 right-0 left-0 z-40">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onSidebarToggle}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-slate-800/50 rounded-xl px-4 py-2 border border-slate-700 w-96">
            <Search className="w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search courses, lessons, assignments..."
              className="bg-transparent border-none outline-none text-white placeholder-slate-500 w-full"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <>
                  <div
                    className="fixed inset-0 z-50"
                    onClick={() => setShowNotifications(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-12 w-80 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-slate-700">
                      <h3 className="font-semibold text-white">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 hover:bg-slate-700/50 transition-colors border-b border-slate-700 last:border-b-0"
                        >
                          <p className="font-medium text-white text-sm">{notification.title}</p>
                          <p className="text-slate-400 text-sm mt-1">{notification.message}</p>
                          <p className="text-slate-500 text-xs mt-2">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                {getFullName().charAt(0)}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">{getFullName()}</p>
                <Badge variant="default" size="sm" className="capitalize">
                  {profile?.role}
                </Badge>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-50"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-12 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 text-left transition-colors text-white">
                        <User className="w-5 h-5 text-slate-400" />
                        <span>Profile</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 text-left transition-colors text-white">
                        <Settings className="w-5 h-5 text-slate-400" />
                        <span>Settings</span>
                      </button>
                      <hr className="my-2 border-slate-700" />
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-left transition-colors text-red-400 hover:text-red-300"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
