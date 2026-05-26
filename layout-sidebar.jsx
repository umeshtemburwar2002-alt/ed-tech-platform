/**
 * College LMS - Sidebar Component
 * Role-based navigation sidebar with collapse toggle
 */

import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  FileText,
  Award,
  Calendar,
  MessageSquare,
  TrendingUp,
  Shield,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import useAuth from '../../hooks/useAuth';

const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const { profile, logout, isStudent, isInstructor, isHOD, isAdmin } = useAuth();

  const studentLinks = [
    { path: '/dashboard/student', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/dashboard/student/courses', icon: BookOpen, label: 'My Courses' },
    { path: '/dashboard/student/progress', icon: TrendingUp, label: 'Progress' },
    { path: '/dashboard/student/quizzes', icon: FileText, label: 'Quizzes' },
    { path: '/dashboard/student/certificates', icon: Award, label: 'Certificates' },
    { path: '/dashboard/student/schedule', icon: Calendar, label: 'Schedule' },
    { path: '/dashboard/student/messages', icon: MessageSquare, label: 'Messages' },
  ];

  const instructorLinks = [
    { path: '/dashboard/instructor', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/dashboard/instructor/courses', icon: BookOpen, label: 'My Courses' },
    { path: '/dashboard/instructor/students', icon: Users, label: 'Students' },
    { path: '/dashboard/instructor/analytics', icon: TrendingUp, label: 'Analytics' },
    { path: '/dashboard/instructor/quizzes', icon: FileText, label: 'Quizzes' },
    { path: '/dashboard/instructor/messages', icon: MessageSquare, label: 'Messages' },
  ];

  const hodLinks = [
    { path: '/dashboard/hod', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/dashboard/hod/faculty', icon: Users, label: 'Faculty' },
    { path: '/dashboard/hod/courses', icon: BookOpen, label: 'Courses' },
    { path: '/dashboard/hod/analytics', icon: TrendingUp, label: 'Analytics' },
  ];

  const adminLinks = [
    { path: '/admin/dashboard', icon: Shield, label: 'Admin Panel' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/departments', icon: GraduationCap, label: 'Departments' },
    { path: '/admin/courses', icon: BookOpen, label: 'Courses' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const getLinks = () => {
    if (isAdmin()) return adminLinks;
    if (isHOD()) return hodLinks;
    if (isInstructor()) return instructorLinks;
    if (isStudent()) return studentLinks;
    return [];
  };

  const links = getLinks();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? '80px' : '280px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-slate-900 border-r border-slate-800 z-50"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">LMS</span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-8rem)]">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                )
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="font-medium"
                  >
                    {link.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="mb-4"
            >
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {profile?.full_name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {profile?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-slate-500 capitalize">
                    {profile?.role || 'Student'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={logout}
          className={cn(
            'flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200',
            collapsed ? 'justify-center' : '',
            'text-red-400 hover:bg-red-500/10 hover:text-red-300'
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="font-medium"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
