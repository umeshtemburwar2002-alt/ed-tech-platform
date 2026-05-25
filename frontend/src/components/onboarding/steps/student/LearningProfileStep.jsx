import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../ui/GlassCard';

const CATEGORIES = [
  "Web Development", "App Development", "AI/ML", "Data Science",
  "UI/UX", "Cybersecurity", "Cloud Computing", "DevOps",
  "Blockchain", "Game Development"
];

export default function LearningProfileStep({ formData, onChange, onNext, onPrev }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.education_level) newErrors.education_level = 'Education level is required';
    if (!formData.career_goal) newErrors.career_goal = 'Career goal is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  const handleCategoryToggle = (cat) => {
    const current = formData.preferred_categories || [];
    const next = current.includes(cat)
      ? current.filter(c => c !== cat)
      : [...current, cat];
    onChange({ preferred_categories: next });
  };

  const handleSkillToggle = (skill) => {
    const current = formData.technical_skills || [];
    const next = current.includes(skill)
      ? current.filter(s => s !== skill)
      : [...current, skill];
    onChange({ technical_skills: next });
  };

  return (
    <GlassCard className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-white">Learning Profile</h2>
          <p className="text-gray-400 text-sm">Tell us about your goals and skills</p>
        </div>

        {/* Section 1: Education Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-indigo-400">Education Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Education Level *</label>
              <select
                value={formData.education_level || ''}
                onChange={(e) => onChange({ education_level: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="">Select</option>
                <option value="high_school">High School</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="phd">PhD</option>
                <option value="self_taught">Self Taught</option>
              </select>
              {errors.education_level && <p className="text-red-400 text-xs">{errors.education_level}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">College/School</label>
              <input
                type="text"
                value={formData.school_or_college || ''}
                onChange={(e) => onChange({ school_or_college: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                placeholder="College/School Name"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Skills & Categories */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-cyan-400">Skills & Interests</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Preferred Categories</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryToggle(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${(formData.preferred_categories || []).includes(cat)
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-500/30'
                      : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Technical Skills</label>
            <div className="flex flex-wrap gap-2">
              {["JavaScript", "Python", "React", "Node.js", "SQL", "Git"].map((skill) => (
                <motion.button
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSkillToggle(skill)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                    ${(formData.technical_skills || []).includes(skill)
                      ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                >
                  {skill}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Career Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-amber-400">Career Goals</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Career Goal *</label>
            <textarea
              value={formData.career_goal || ''}
              onChange={(e) => onChange({ career_goal: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
              placeholder="What do you want to achieve in your career?"
            />
            {errors.career_goal && <p className="text-red-400 text-xs">{errors.career_goal}</p>}
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
