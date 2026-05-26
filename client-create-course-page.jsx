/**
 * College LMS - Create Course Page
 * Instructor course creation with form validation, auto-save, and live preview
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, useWatch } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { useUpload } from '../hooks/useUpload';
import { slugify } from '../utils/slugify';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import CoursePreview from '../components/instructor/CoursePreview';

const CreateCourse = () => {
  const navigate = useNavigate();
  const { uploadFile, uploading, progress, uploadedUrl } = useUpload();
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [outcomes, setOutcomes] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [courseId, setCourseId] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: {
      title: '',
      shortDescription: '',
      fullDescription: '',
      department: '',
      category: '',
      subjectCode: '',
      semester: '',
      level: 'beginner',
      language: 'english',
      isFree: true,
      price: '',
      discount: '',
    },
  });

  const watchedValues = useWatch({ control });

  // Fetch departments on mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  // Fetch categories when department changes
  useEffect(() => {
    if (watchedValues.department) {
      fetchCategories(watchedValues.department);
    }
  }, [watchedValues.department]);

  // Auto-save every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (Object.keys(dirtyFields).length > 0) {
        handleSaveDraft();
      }
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [dirtyFields]);

  const fetchDepartments = async () => {
    try {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .order('name');

      if (error) throw error;
      setDepartments(data || []);
    } catch (error) {
      console.error('Failed to fetch departments:', error);
    }
  };

  const fetchCategories = async (departmentId) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('department_id', departmentId)
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const onThumbnailDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));

    // Upload to Supabase
    const tempId = courseId || 'temp';
    await uploadFile(file, 'course-thumbnails', `${tempId}/${file.name}`);
  }, [uploadFile, courseId]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onThumbnailDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxFiles: 1,
  });

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim() && tags.length < 10) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleAddOutcome = () => {
    setOutcomes([...outcomes, '']);
  };

  const handleRemoveOutcome = (indexToRemove) => {
    setOutcomes(outcomes.filter((_, index) => index !== indexToRemove));
  };

  const handleOutcomeChange = (index, value) => {
    setOutcomes(outcomes.map((outcome, i) => (i === index ? value : outcome)));
  };

  const handleAddRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const handleRemoveRequirement = (indexToRemove) => {
    setRequirements(requirements.filter((_, index) => index !== indexToRemove));
  };

  const handleRequirementChange = (index, value) => {
    setRequirements(requirements.map((req, i) => (i === index ? value : req)));
  };

  const calculateCompletion = () => {
    const required = [
      watchedValues.title,
      watchedValues.shortDescription,
      watchedValues.department,
      thumbnail,
    ];
    const filled = required.filter((field) => field && field.length > 0).length;
    return Math.round((filled / required.length) * 100);
  };

  const canProceedToBuilder = () => {
    return (
      watchedValues.title &&
      watchedValues.shortDescription &&
      watchedValues.department &&
      thumbnail
    );
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      const courseData = {
        title: watchedValues.title,
        slug: slugify(watchedValues.title),
        description: watchedValues.shortDescription,
        full_description: watchedValues.fullDescription,
        department_id: watchedValues.department,
        category_id: watchedValues.category,
        subject_code: watchedValues.subjectCode,
        semester: watchedValues.semester,
        level: watchedValues.level,
        language: watchedValues.language,
        is_free: watchedValues.isFree,
        price: watchedValues.isFree ? null : parseFloat(watchedValues.price),
        discount: watchedValues.isFree ? null : parseFloat(watchedValues.discount),
        thumbnail_url: uploadedUrl || thumbnailPreview,
        status: 'draft',
      };

      let result;
      if (courseId) {
        result = await supabase
          .from('courses')
          .update(courseData)
          .eq('id', courseId)
          .select()
          .single();
      } else {
        result = await supabase
          .from('courses')
          .insert(courseData)
          .select()
          .single();
      }

      if (result.error) throw result.error;

      setCourseId(result.data.id);
      toast.success('Draft saved successfully');
    } catch (error) {
      console.error('Save draft error:', error);
      toast.error('Failed to save draft');
    } finally {
      setSaving(false);
    }
  };

  const onSubmit = async (data) => {
    await handleSaveDraft();
    if (courseId) {
      navigate(`/instructor/course/${courseId}/builder`);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create New Course</h1>
          <ProgressBar value={calculateCompletion()} label="Completion" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form Section - Left 60% */}
          <div className="lg:col-span-3 space-y-6">
            {/* Basic Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>

              {/* Thumbnail Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Course Thumbnail
                </label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-slate-600 hover:border-slate-500'
                  }`}
                >
                  <input {...getInputProps()} />
                  {thumbnailPreview ? (
                    <div className="relative">
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <p className="text-sm text-slate-400 mt-2">
                        {thumbnail?.name} ({(thumbnail?.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-slate-400 mb-2">
                        Drag & drop an image, or click to select
                      </p>
                      <p className="text-xs text-slate-500">
                        PNG, JPG, WEBP up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Title */}
              <Input
                label="Course Title"
                placeholder="Enter course title"
                error={errors.title}
                {...register('title', { required: 'Title is required' })}
              />
              {watchedValues.title && (
                <p className="text-xs text-slate-500 mt-1">
                  Slug: {slugify(watchedValues.title)}
                </p>
              )}

              {/* Short Description */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Short Description
                </label>
                <textarea
                  {...register('shortDescription', {
                    required: 'Short description is required',
                    maxLength: {
                      value: 150,
                      message: 'Maximum 150 characters',
                    },
                  })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                  placeholder="Brief description of your course"
                  maxLength={150}
                />
                <div className="flex justify-between mt-1">
                  {errors.shortDescription && (
                    <p className="text-xs text-red-500">{errors.shortDescription.message}</p>
                  )}
                  <p className="text-xs text-slate-500 ml-auto">
                    {watchedValues.shortDescription?.length || 0}/150
                  </p>
                </div>
              </div>

              {/* Full Description */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Description
                </label>
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  value={watchedValues.fullDescription}
                  onChange={(value) => {
                    // Update form value
                    control._fields.fullDescription._f.onChange(value);
                  }}
                  placeholder="Detailed course description..."
                  className="bg-slate-800 text-white"
                />
              </div>
            </motion.div>

            {/* Organization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Organization</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Department
                  </label>
                  <select
                    {...register('department', { required: 'Department is required' })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="text-xs text-red-500 mt-1">{errors.department.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Category
                  </label>
                  <select
                    {...register('category')}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!watchedValues.department}
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Subject Code"
                  placeholder="e.g., CS301"
                  {...register('subjectCode')}
                />

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Semester
                  </label>
                  <select
                    {...register('semester')}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <option key={sem} value={sem}>
                        Semester {sem}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Tags (max 10)
                </label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Type tag and press Enter"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="published">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(index)}
                        className="ml-2 hover:text-red-400"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Level
                  </label>
                  <select
                    {...register('level')}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Language
                  </label>
                  <select
                    {...register('language')}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="marathi">Marathi</option>
                    <option value="tamil">Tamil</option>
                    <option value="telugu">Telugu</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Pricing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Pricing</h2>

              <div className="flex items-center gap-4 mb-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('isFree')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  <span className="ml-3 text-sm font-medium text-slate-300">
                    {watchedValues.isFree ? 'Free Course' : 'Paid Course'}
                  </span>
                </label>
              </div>

              {!watchedValues.isFree && (
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Price (₹)"
                    type="number"
                    placeholder="0"
                    {...register('price', {
                      required: 'Price is required for paid courses',
                      min: { value: 0, message: 'Price must be positive' },
                    })}
                    error={errors.price}
                  />
                  <Input
                    label="Discount (%)"
                    type="number"
                    placeholder="0"
                    {...register('discount', {
                      min: { value: 0, message: 'Discount must be positive' },
                      max: { value: 100, message: 'Discount cannot exceed 100%' },
                    })}
                  />
                </div>
              )}

              {!watchedValues.isFree && watchedValues.price && (
                <div className="mt-4 p-3 bg-slate-800 rounded-lg">
                  <p className="text-sm text-slate-400">
                    Final Price:{' '}
                    <span className="text-white font-semibold">
                      ₹
                      {(
                        parseFloat(watchedValues.price) -
                        (parseFloat(watchedValues.price) *
                          (parseFloat(watchedValues.discount) || 0)) /
                          100
                      ).toFixed(2)}
                    </span>
                  </p>
                </div>
              )}
            </motion.div>

            {/* Learning Outcomes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Learning Outcomes</h2>

              {outcomes.map((outcome, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={outcome}
                    onChange={(e) => handleOutcomeChange(index, e.target.value)}
                    placeholder={`Outcome ${index + 1}`}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveOutcome(index)}
                    className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddOutcome}
                className="w-full py-3 border-2 border-dashed border-slate-600 rounded-lg text-slate-400 hover:border-slate-500 hover:text-slate-300 transition-colors"
              >
                + Add Outcome
              </button>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Requirements</h2>

              {requirements.map((req, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    placeholder={`Requirement ${index + 1}`}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveRequirement(index)}
                    className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddRequirement}
                className="w-full py-3 border-2 border-dashed border-slate-600 rounded-lg text-slate-400 hover:border-slate-500 hover:text-slate-300 transition-colors"
              >
                + Add Requirement
              </button>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleSaveDraft}
                variant="secondary"
                disabled={saving}
                loading={saving}
              >
                Save Draft
              </Button>
              <Button
                onClick={() => setShowPreview(true)}
                variant="secondary"
              >
                Preview
              </Button>
              <Button
                onClick={handleSubmit(onSubmit)}
                variant="primary"
                disabled={!canProceedToBuilder() || saving}
                loading={saving}
              >
                Proceed to Builder
              </Button>
            </div>
          </div>

          {/* Live Preview - Right 40% */}
          <div className="lg:col-span-2">
            <div className="sticky top-6">
              <CoursePreview
                course={{
                  title: watchedValues.title || 'Course Title',
                  description: watchedValues.shortDescription || 'Course description will appear here...',
                  thumbnail: thumbnailPreview,
                  department: departments.find((d) => d.id === watchedValues.department)?.name,
                  level: watchedValues.level,
                  language: watchedValues.language,
                  isFree: watchedValues.isFree,
                  price: watchedValues.price,
                  discount: watchedValues.discount,
                  tags,
                  outcomes,
                  requirements,
                }}
                completion={calculateCompletion()}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title="Course Preview"
        size="lg"
      >
        <CoursePreview
          course={{
            title: watchedValues.title || 'Course Title',
            description: watchedValues.shortDescription || 'Course description will appear here...',
            thumbnail: thumbnailPreview,
            department: departments.find((d) => d.id === watchedValues.department)?.name,
            level: watchedValues.level,
            language: watchedValues.language,
            isFree: watchedValues.isFree,
            price: watchedValues.price,
            discount: watchedValues.discount,
            tags,
            outcomes,
            requirements,
          }}
          completion={calculateCompletion()}
        />
      </Modal>
    </div>
  );
};

export default CreateCourse;
