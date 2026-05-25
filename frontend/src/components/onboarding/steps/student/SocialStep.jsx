import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Globe } from 'lucide-react';
import GlassCard from '../../ui/GlassCard';

export default function SocialStep({ formData, onChange, onNext, onPrev }) {
  const socialLinks = [
    { key: 'github_url', label: 'GitHub', icon: <Github size={18} />, placeholder: 'https://github.com/username' },
    { key: 'linkedin_url', label: 'LinkedIn', icon: <Linkedin size={18} />, placeholder: 'https://linkedin.com/in/username' },
    { key: 'portfolio_url', label: 'Portfolio', icon: <Globe size={18} />, placeholder: 'https://yourportfolio.com' },
    { key: 'twitter_url', label: 'Twitter', icon: <Twitter size={18} />, placeholder: 'https://twitter.com/username' },
    { key: 'instagram_url', label: 'Instagram', icon: <Instagram size={18} />, placeholder: 'https://instagram.com/username' },
  ];

  return (
    <GlassCard className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-white">Social & Community</h2>
          <p className="text-gray-400 text-sm">Connect your social profiles</p>
        </div>

        {/* Bio */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-indigo-400">About You</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Short Bio</label>
            <textarea
              value={formData.short_bio || ''}
              onChange={(e) => onChange({ short_bio: e.target.value })}
              rows={3}
              maxLength={160}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
              placeholder="Tell us a little about yourself (max 160 characters)"
            />
            <div className="text-right text-xs text-gray-500">
              {(formData.short_bio || '').length} / 160
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-cyan-400">Social Links</h3>
          <div className="space-y-3">
            {socialLinks.map((link) => (
              <div key={link.key} className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {link.icon}
                </div>
                <input
                  type="url"
                  value={formData[link.key] || ''}
                  onChange={(e) => onChange({ [link.key]: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                  placeholder={link.placeholder}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Community Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-amber-400">Community Preferences</h3>
          <div className="space-y-3">
            {[
              { key: 'join_community', label: 'Join Community' },
              { key: 'public_profile', label: 'Public Profile' },
              { key: 'show_skills_publicly', label: 'Show Skills Publicly' },
            ].map((pref) => (
              <div key={pref.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="text-sm font-medium text-white">{pref.label}</span>
                <button
                  onClick={() => onChange({ [pref.key]: !formData[pref.key] })}
                  className={`w-12 h-6 rounded-full transition-colors relative
                    ${formData[pref.key] ? 'bg-gradient-to-r from-indigo-500 to-cyan-500' : 'bg-gray-700'}`}
                >
                  <motion.div
                    animate={{ x: formData[pref.key] ? 26 : 2 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                  />
                </button>
              </div>
            ))}
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
            onClick={onNext}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-xl text-white font-bold hover:opacity-90 transition-all shadow-lg"
          >
            Continue
          </button>
        </div>
      </motion.div>
    </GlassCard>
  );
}
