import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import AvatarUpload from '../ui/AvatarUpload';

export default function BasicInfoStep({ formData, onChange, onNext, onPrev }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.full_name?.trim()) newErrors.full_name = 'Full name is required';
    if (!formData.username?.trim()) newErrors.username = 'Username is required';
    if (!formData.country?.trim()) newErrors.country = 'Country is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <GlassCard className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-white">Basic Information</h2>
          <p className="text-gray-400 text-sm">Let's get to know you better</p>
        </div>
        <AvatarUpload value={formData.avatar_url} onChange={(file) => onChange({ avatar_url: file })} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Full Name *</label>
            <input
              type="text"
              value={formData.full_name || ''}
              onChange={(e) => onChange({ full_name: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              placeholder="John Doe"
            />
            {errors.full_name && <p className="text-red-400 text-xs">{errors.full_name}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Username *</label>
            <input
              type="text"
              value={formData.username || ''}
              onChange={(e) => onChange({ username: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              placeholder="johndoe123"
            />
            {errors.username && <p className="text-red-400 text-xs">{errors.username}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Phone</label>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => onChange({ phone: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              placeholder="+91 98765 43210"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Date of Birth</label>
            <input
              type="date"
              value={formData.date_of_birth || ''}
              onChange={(e) => onChange({ date_of_birth: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Country *</label>
            <select
              value={formData.country || ''}
              onChange={(e) => onChange({ country: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            >
              <option value="">Select your country</option>
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
            {errors.country && <p className="text-red-400 text-xs">{errors.country}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">City</label>
            <input
              type="text"
              value={formData.city || ''}
              onChange={(e) => onChange({ city: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              placeholder="Mumbai"
            />
          </div>
        </div>
        <div className="flex gap-4 pt-4">
          <button
            onClick={onPrev}
            className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-white/10 transition-all"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-xl text-white font-bold hover:opacity-90 transition-all shadow-lg"
          >
            Continue
          </button>
        </div>
      </motion.div>
    </GlassCard>
  );
}
