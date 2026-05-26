/**
 * College LMS - Register Page
 * User registration with role selection and department
 */

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiUser, FiIdCard, FiBookOpen } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { supabase } from '../lib/supabase';

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser, loading } = useAuth();
  const [departments, setDepartments] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('student');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      full_name: '',
      email: '',
      roll_number: '',
      password: '',
      confirmPassword: '',
      role: 'student',
      department_id: '',
      semester: '1',
    },
  });

  const password = watch('password');

  // Fetch departments on mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { data, error } = await supabase
          .from('departments')
          .select('*')
          .order('name');

        if (error) throw error;
        setDepartments(data || []);
      } catch (error) {
        console.error('Error fetching departments:', error);
        toast.error('Failed to load departments');
      }
    };

    fetchDepartments();
  }, []);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const result = await registerUser({
      full_name: data.full_name,
      email: data.email,
      password: data.password,
      role: data.role,
      roll_number: data.roll_number || null,
      department_id: data.department_id || null,
      semester: data.semester || null,
    });

    if (result.success) {
      toast.success('Registration successful! Please check your email to verify your account.');
      navigate('/login');
    } else {
      toast.error(result.error || 'Registration failed');
    }
  };

  const roleOptions = [
    { value: 'student', label: 'Student', icon: '🎓' },
    { value: 'instructor', label: 'Instructor', icon: '👨‍🏫' },
    { value: 'hod', label: 'Head of Department', icon: '👔' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            >
              <span className="text-3xl font-bold text-white">L</span>
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-slate-400">Join College LMS to start learning</p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-3">
              I am a:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {roleOptions.map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedRole(option.value);
                    register('role').onChange({ target: { value: option.value } });
                  }}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedRole === option.value
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <div className="text-2xl mb-2">{option.icon}</div>
                  <div className="text-sm font-medium text-white">{option.label}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              icon={<FiUser />}
              error={errors.full_name?.message}
              {...register('full_name', {
                required: 'Full name is required',
                minLength: {
                  value: 2,
                  message: 'Full name must be at least 2 characters',
                },
              })}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              icon={<FiMail />}
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />

            {selectedRole === 'student' && (
              <Input
                label="Roll Number"
                type="text"
                placeholder="CS2024001"
                icon={<FiIdCard />}
                error={errors.roll_number?.message}
                {...register('roll_number', {
                  required: 'Roll number is required for students',
                  pattern: {
                    value: /^[A-Z]{2}\d{7}$/,
                    message: 'Invalid roll number format (e.g., CS2024001)',
                  },
                })}
              />
            )}

            {(selectedRole === 'student' || selectedRole === 'instructor') && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Department
                </label>
                <select
                  {...register('department_id', {
                    required: 'Department is required',
                  })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name} ({dept.code})
                    </option>
                  ))}
                </select>
                {errors.department_id && (
                  <p className="mt-1 text-sm text-red-400">{errors.department_id.message}</p>
                )}
              </div>
            )}

            {selectedRole === 'student' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Semester
                </label>
                <select
                  {...register('semester', {
                    required: 'Semester is required for students',
                  })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem}
                    </option>
                  ))}
                </select>
                {errors.semester && (
                  <p className="mt-1 text-sm text-red-400">{errors.semester.message}</p>
                )}
              </div>
            )}

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                icon={<FiLock />}
                error={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: 'Password must contain uppercase, lowercase, and number',
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-12 top-9 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              icon={<FiLock />}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
            />

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                {...register('terms', {
                  required: 'You must agree to the terms and conditions',
                })}
                className="mt-1 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500"
              />
              <label className="text-sm text-slate-400">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-400 hover:text-blue-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-400 hover:text-blue-300">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-400">{errors.terms.message}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isSubmitting || loading}
              disabled={isSubmitting || loading}
            >
              Create Account
            </Button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-slate-500 text-sm">
          © 2024 College LMS. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
