/**
 * College LMS - useAuth Hook
 * Custom hook for authentication operations and role-based access control
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const navigate = useNavigate();
  const {
    user,
    profile,
    session,
    loading,
    isAuthenticated,
    initializeAuth,
    login,
    register,
    logout,
    updateProfile,
    refreshProfile,
    isStudent,
    isInstructor,
    isHOD,
    isAdmin,
    hasRole,
    canAccessCourse,
  } = useAuthStore();

  // Initialize auth on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  /**
   * Handle login with toast notifications
   */
  const handleLogin = async (email, password) => {
    const result = await login(email, password);
    
    if (result.success) {
      toast.success('Login successful!');
      
      // Redirect based on role
      if (profile?.role === 'student') {
        navigate('/dashboard/student');
      } else if (profile?.role === 'instructor') {
        navigate('/dashboard/instructor');
      } else if (profile?.role === 'hod') {
        navigate('/dashboard/hod');
      } else if (profile?.role === 'admin') {
        navigate('/admin/dashboard');
      }
    } else {
      toast.error(result.error || 'Login failed');
    }
    
    return result;
  };

  /**
   * Handle registration with toast notifications
   */
  const handleRegister = async (userData) => {
    const result = await register(userData);
    
    if (result.success) {
      toast.success('Registration successful! Please check your email to verify your account.');
      navigate('/login');
    } else {
      toast.error(result.error || 'Registration failed');
    }
    
    return result;
  };

  /**
   * Handle logout with toast notification
   */
  const handleLogout = async () => {
    const result = await logout();
    
    if (result.success) {
      toast.success('Logged out successfully');
      navigate('/login');
    } else {
      toast.error(result.error || 'Logout failed');
    }
    
    return result;
  };

  /**
   * Handle profile update with toast notification
   */
  const handleUpdateProfile = async (profileData) => {
    const result = await updateProfile(profileData);
    
    if (result.success) {
      toast.success('Profile updated successfully');
    } else {
      toast.error(result.error || 'Profile update failed');
    }
    
    return result;
  };

  /**
   * Check if user has required role, redirect if not
   */
  const requireRole = (allowedRoles, redirectTo = '/unauthorized') => {
    if (!isAuthenticated) {
      navigate('/login');
      return false;
    }

    if (!hasRole(allowedRoles)) {
      navigate(redirectTo);
      return false;
    }

    return true;
  };

  /**
   * Check if user is authenticated, redirect if not
   */
  const requireAuth = (redirectTo = '/login') => {
    if (!isAuthenticated) {
      navigate(redirectTo);
      return false;
    }
    return true;
  };

  /**
   * Redirect authenticated users away from auth pages
   */
  const redirectIfAuthenticated = (redirectTo = '/dashboard') => {
    if (isAuthenticated) {
      navigate(redirectTo);
      return true;
    }
    return false;
  };

  /**
   * Get user's full name
   */
  const getFullName = () => {
    return profile?.full_name || user?.user_metadata?.full_name || 'User';
  };

  /**
   * Get user's avatar URL
   */
  const getAvatarUrl = () => {
    return profile?.avatar_url || user?.user_metadata?.avatar_url || null;
  };

  /**
   * Get user's department
   */
  const getDepartment = () => {
    return profile?.department_id || null;
  };

  /**
   * Get user's semester (for students)
   */
  const getSemester = () => {
    return profile?.semester || null;
  };

  /**
   * Get user's roll number (for students)
   */
  const getRollNumber = () => {
    return profile?.roll_number || null;
  };

  return {
    // State
    user,
    profile,
    session,
    loading,
    isAuthenticated,

    // Actions
    initializeAuth,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
    refreshProfile,

    // Role helpers
    isStudent,
    isInstructor,
    isHOD,
    isAdmin,
    hasRole,
    canAccessCourse,

    // Auth helpers
    requireRole,
    requireAuth,
    redirectIfAuthenticated,

    // User data helpers
    getFullName,
    getAvatarUrl,
    getDepartment,
    getSemester,
    getRollNumber,
  };
};

export default useAuth;
