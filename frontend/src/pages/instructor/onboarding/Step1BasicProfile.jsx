import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCamera, FaX } from 'react-icons/fa';
import { useOnboarding } from '../../../context/OnboardingContext';
import { useFormValidation } from '../../../hooks/useFormValidation';
import FileUploadField from '../../../components/onboarding/FileUploadField';
import CountrySelector from '../../../components/onboarding/CountrySelector';
import LanguageSelector from '../../../components/onboarding/LanguageSelector';

const COUNTRIES = [
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'Singapore',
  'Other',
];

const LANGUAGES = [
  'English',
  'Hindi',
  'Spanish',
  'French',
  'German',
  'Mandarin',
  'Japanese',
  'Korean',
  'Portuguese',
  'Russian',
];

export default function Step1BasicProfile() {
  const { formData, updateFormData, errors, setFieldError } = useOnboarding();
  const { validateEmail, validateUrl } = useFormValidation();
  const [previewUrl, setPreviewUrl] = useState(formData.profilePhotoPreview);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file
      if (!file.type.startsWith('image/')) {
        setFieldError('profilePhoto', 'Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setFieldError('profilePhoto', 'File size must be less than 5MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        updateFormData('profilePhotoPreview', reader.result);
      };
      reader.readAsDataURL(file);

      updateFormData('profilePhoto', file);
    }
  };

  const handleRemovePhoto = () => {
    setPreviewUrl('');
    updateFormData('profilePhoto', null);
    updateFormData('profilePhotoPreview', '');
  };

  const handleLanguageChange = (selected) => {
    updateFormData('languages', selected);
  };

  const handleCountryChange = (country) => {
    updateFormData('country', country);
  };

  return (
    <div className="space-y-6">
      {/* Profile Photo */}
      <div className="space-y-3">
        <label className="block text-sm font-bold text-white">
          Profile Photo <span className="text-red-400">*</span>
        </label>
        <div className="flex items-center gap-6">
          {/* Photo preview */}
          <div className="relative">
            {previewUrl ? (
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500">
                <img src={previewUrl} alt="Profile" className="w-full h-full object-cover" />
                <button
                  onClick={handleRemovePhoto}
                  className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                >
                  <FaX className="text-xs" />
                </button>
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-slate-700 border-2 border-dashed border-slate-600 flex items-center justify-center">
                <FaCamera className="text-2xl text-slate-400" />
              </div>
            )}
          </div>

          {/* Upload input */}
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
              id="profilePhoto"
            />
            <label
              htmlFor="profilePhoto"
              className="block px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold text-sm cursor-pointer transition-all text-center"
            >
              Choose Photo
            </label>
            <p className="text-xs text-slate-400 mt-2">JPG, PNG up to 5MB</p>
          </div>
        </div>
        {errors.profilePhoto && (
          <p className="text-red-400 text-xs">{errors.profilePhoto}</p>
        )}
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-white">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => updateFormData('fullName', e.target.value)}
          placeholder="Enter your full name"
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-all"
        />
        {errors.fullName && (
          <p className="text-red-400 text-xs">{errors.fullName}</p>
        )}
      </div>

      {/* Headline */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-white">
          Headline <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={formData.headline}
          onChange={(e) => updateFormData('headline', e.target.value)}
          placeholder="e.g., Senior Software Engineer & Tech Educator"
          maxLength={100}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-all"
        />
        <p className="text-xs text-slate-400">{formData.headline.length}/100</p>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-white">
          Bio <span className="text-red-400">*</span>
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => updateFormData('bio', e.target.value)}
          placeholder="Tell us about yourself, your teaching philosophy, and what makes you unique..."
          maxLength={500}
          rows={5}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-all resize-none"
        />
        <p className="text-xs text-slate-400">{formData.bio.length}/500</p>
      </div>

      {/* Country */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-white">
          Country <span className="text-red-400">*</span>
        </label>
        <CountrySelector
          value={formData.country}
          onChange={handleCountryChange}
          countries={COUNTRIES}
        />
      </div>

      {/* City */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-white">
          City <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => updateFormData('city', e.target.value)}
          placeholder="Enter your city"
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-all"
        />
      </div>

      {/* Languages */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-white">
          Languages <span className="text-red-400">*</span>
        </label>
        <LanguageSelector
          value={formData.languages}
          onChange={handleLanguageChange}
          languages={LANGUAGES}
        />
        <p className="text-xs text-slate-400">Select at least one language</p>
      </div>

      {/* Info box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg"
      >
        <p className="text-sm text-blue-300">
          💡 <strong>Tip:</strong> A complete profile with a professional photo increases your chances of getting verified faster.
        </p>
      </motion.div>
    </div>
  );
}
