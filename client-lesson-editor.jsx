/**
 * College LMS - Lesson Editor Component
 * Edit lesson content based on type (Video, PDF, Article, Quiz, Assignment, Live Class)
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { useUpload } from '../hooks/useUpload';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import VideoUpload from './VideoUpload';
import { Video, FileText, BookOpen, HelpCircle, Clipboard, Calendar, X } from 'lucide-react';

const LessonEditor = ({ lesson, courseId, onClose, onSave }) => {
  const { uploadVideo, uploadPDF, uploading, progress } = useUpload();
  const [formData, setFormData] = useState({
    title: lesson?.title || '',
    description: lesson?.description || '',
    type: lesson?.type || 'video',
    status: lesson?.status || 'draft',
    content: lesson?.content || {},
  });
  const [resources, setResources] = useState(lesson?.lesson_resources || []);
  const [activeTab, setActiveTab] = useState('content');
  const [showPreview, setShowPreview] = useState(false);

  const lessonTypes = [
    { id: 'video', label: 'Video', icon: Video },
    { id: 'pdf', label: 'PDF', icon: FileText },
    { id: 'article', label: 'Article', icon: BookOpen },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
    { id: 'assignment', label: 'Assignment', icon: Clipboard },
    { id: 'live', label: 'Live Class', icon: Calendar },
  ];

  const handleSave = async () => {
    try {
      const { data, error } = await supabase
        .from('course_lessons')
        .update({
          title: formData.title,
          description: formData.description,
          type: formData.type,
          status: formData.status,
          content: formData.content,
        })
        .eq('id', lesson.id)
        .select()
        .single();

      if (error) throw error;

      onSave(data);
      toast.success('Lesson saved successfully');
    } catch (error) {
      console.error('Failed to save lesson:', error);
      toast.error('Failed to save lesson');
    }
  };

  const handleTypeChange = (type) => {
    setFormData({ ...formData, type });
  };

  const renderContentArea = () => {
    switch (formData.type) {
      case 'video':
        return (
          <div className="space-y-4">
            <VideoUpload
              courseId={courseId}
              lessonId={lesson.id}
              videoUrl={formData.content.video_url}
              onUpload={(url) => {
                setFormData({
                  ...formData,
                  content: { ...formData.content, video_url: url },
                });
              }}
            />
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Transcript
              </label>
              <textarea
                value={formData.content.transcript || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: { ...formData.content, transcript: e.target.value },
                  })
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={6}
                placeholder="Lesson transcript..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Captions Upload
              </label>
              <input
                type="file"
                accept=".vtt,.srt"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const { uploadedUrl } = await uploadPDF(file, courseId, lesson.id);
                    setFormData({
                      ...formData,
                      content: { ...formData.content, captions_url: uploadedUrl },
                    });
                  }
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
              />
            </div>
          </div>
        );

      case 'pdf':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Upload PDF
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const { uploadedUrl } = await uploadPDF(file, courseId, lesson.id);
                    setFormData({
                      ...formData,
                      content: { ...formData.content, pdf_url: uploadedUrl },
                    });
                  }
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
              />
              {formData.content.pdf_url && (
                <a
                  href={formData.content.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 text-sm mt-2 block"
                >
                  View uploaded PDF
                </a>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Notes
              </label>
              <textarea
                value={formData.content.notes || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: { ...formData.content, notes: e.target.value },
                  })
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={6}
                placeholder="Additional notes for students..."
              />
            </div>
          </div>
        );

      case 'article':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Article Content
              </label>
              <ReactQuill
                theme="snow"
                value={formData.content.article_content || ''}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    content: { ...formData.content, article_content: value },
                  })
                }
                placeholder="Write your article content..."
                className="bg-slate-800 text-white min-h-[400px]"
              />
            </div>
            <div className="p-3 bg-slate-800 rounded-lg">
              <p className="text-sm text-slate-400">
                Estimated read time:{' '}
                <span className="text-white font-semibold">
                  {Math.ceil((formData.content.article_content?.length || 0) / 200)} min
                </span>
              </p>
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-slate-800 rounded-lg">
              <p className="text-slate-400 mb-2">
                Quiz Builder
              </p>
              <p className="text-sm text-slate-500">
                Use the Quiz Builder component to create questions for this lesson.
              </p>
              <Button
                onClick={() => {
                  // Navigate to quiz builder
                  window.location.href = `/instructor/quiz/new?lessonId=${lesson.id}`;
                }}
                variant="primary"
                className="mt-4"
              >
                Open Quiz Builder
              </Button>
            </div>
            {formData.content.quiz_id && (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-400">Quiz created successfully</p>
              </div>
            )}
          </div>
        );

      case 'assignment':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Assignment Description
              </label>
              <ReactQuill
                theme="snow"
                value={formData.content.assignment_description || ''}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    content: { ...formData.content, assignment_description: value },
                  })
                }
                placeholder="Assignment instructions..."
                className="bg-slate-800 text-white min-h-[300px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Due Date
                </label>
                <input
                  type="datetime-local"
                  value={formData.content.due_date || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      content: { ...formData.content, due_date: e.target.value },
                    })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Max Marks
                </label>
                <input
                  type="number"
                  value={formData.content.max_marks || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      content: { ...formData.content, max_marks: e.target.value },
                    })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Allowed File Types
              </label>
              <input
                type="text"
                value={formData.content.allowed_file_types || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: { ...formData.content, allowed_file_types: e.target.value },
                  })
                }
                placeholder="e.g., .pdf,.docx,.zip"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'live':
        return (
          <div className="space-y-4">
            <Input
              label="Meeting Link"
              placeholder="https://meet.google.com/..."
              value={formData.content.meeting_link || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  content: { ...formData.content, meeting_link: e.target.value },
                })
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={formData.content.scheduled_at || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      content: { ...formData.content, scheduled_at: e.target.value },
                    })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={formData.content.duration || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      content: { ...formData.content, duration: e.target.value },
                    })
                  }
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <Input
              label="Meeting Password (optional)"
              placeholder="Meeting password"
              value={formData.content.password || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  content: { ...formData.content, password: e.target.value },
                })
              }
            />
          </div>
        );

      default:
        return <div className="text-slate-400">Select a lesson type to begin</div>;
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-950">
      {/* Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <div>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="text-xl font-semibold"
              placeholder="Lesson title"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={formData.status === 'published' ? 'published' : 'draft'}>
            {formData.status}
          </Badge>
          <button
            onClick={() => setFormData({ ...formData, status: formData.status === 'published' ? 'draft' : 'published' })}
            className="text-sm text-slate-400 hover:text-white"
          >
            Toggle Status
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 border-b border-slate-800">
        <div className="flex gap-4">
          {['content', 'resources', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-white'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'content' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Type Selector */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Lesson Type
              </label>
              <div className="flex flex-wrap gap-2">
                {lessonTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => handleTypeChange(type.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                        formData.type === type.id
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
                placeholder="Brief description of this lesson..."
              />
            </div>

            {/* Content Area */}
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">Lesson Content</h3>
              {renderContentArea()}
            </div>
          </motion.div>
        )}

        {activeTab === 'resources' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="p-4 bg-slate-800 rounded-lg">
              <p className="text-slate-400 mb-2">Upload additional resources for students</p>
              <input
                type="file"
                multiple
                onChange={async (e) => {
                  const files = Array.from(e.target.files);
                  for (const file of files) {
                    const { uploadedUrl } = await uploadPDF(file, courseId, lesson.id);
                    setResources([...resources, { name: file.name, url: uploadedUrl }]);
                  }
                }}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white"
              />
            </div>
            <div className="space-y-2">
              {resources.map((resource, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-800 rounded-lg"
                >
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {resource.name}
                  </a>
                  <button
                    onClick={() => setResources(resources.filter((_, i) => i !== index))}
                    className="text-slate-500 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="p-4 bg-slate-800 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Lesson Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Estimated Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.content.duration || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        content: { ...formData.content, duration: e.target.value },
                      })
                    }
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="free-preview"
                    checked={formData.content.is_free_preview || false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        content: { ...formData.content, is_free_preview: e.target.checked },
                      })
                    }
                    className="w-4 h-4 rounded"
                  />
                  <label htmlFor="free-preview" className="text-slate-300">
                    Free Preview (available without enrollment)
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-slate-800 flex items-center justify-between">
        <Button onClick={() => setShowPreview(true)} variant="secondary">
          Preview
        </Button>
        <div className="flex gap-4">
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="primary">
            Save Lesson
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonEditor;
