/**
 * College LMS - Course Player Page
 * Student course viewing with video player, lesson navigation, and progress tracking
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import useAuthStore from '../store/authStore';
import useProgress from '../hooks/useProgress';
import VideoPlayer from './VideoPlayer';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import { ChevronLeft, ChevronRight, Play, CheckCircle, BookOpen, FileText, HelpCircle, Clipboard, Calendar, Menu, X } from 'lucide-react';

const CoursePlayer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [nextLesson, setNextLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  const { markComplete, markIncomplete, saveWatchTime, getCourseProgress } = useProgress();

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  useEffect(() => {
    if (course && user) {
      fetchProgress();
    }
  }, [course, user]);

  const fetchCourseData = async () => {
    setLoading(true);
    try {
      // Fetch course
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (courseError) throw courseError;
      setCourse(courseData);

      // Fetch sections
      const { data: sectionsData, error: sectionsError } = await supabase
        .from('course_sections')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index', { ascending: true });

      if (sectionsError) throw sectionsError;
      setSections(sectionsData || []);

      // Fetch lessons
      const { data: lessonsData, error: lessonsError } = await supabase
        .from('course_lessons')
        .select('*')
        .in('section_id', sectionsData?.map((s) => s.id) || [])
        .order('order_index', { ascending: true });

      if (lessonsError) throw lessonsError;
      setLessons(lessonsData || []);

      // Set first lesson as current
      if (lessonsData && lessonsData.length > 0) {
        setCurrentLesson(lessonsData[0]);
      }
    } catch (error) {
      console.error('Failed to fetch course data:', error);
      toast.error('Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    try {
      // Fetch completed lessons
      const { data: progressData } = await supabase
        .from('lesson_progress')
        .select('lesson_id')
        .eq('student_id', user.id)
        .eq('completed', true)
        .in('lesson_id', lessons.map((l) => l.id));

      setCompletedLessons(progressData?.map((p) => p.lesson_id) || []);

      // Fetch overall progress
      const progress = await getCourseProgress(courseId, user.id);
      setOverallProgress(progress.percentage);
    } catch (error) {
      console.error('Failed to fetch progress:', error);
    }
  };

  const handleLessonChange = (lesson) => {
    setCurrentLesson(lesson);
  };

  const handleNextLesson = () => {
    const currentIndex = lessons.findIndex((l) => l.id === currentLesson.id);
    if (currentIndex < lessons.length - 1) {
      setCurrentLesson(lessons[currentIndex + 1]);
    }
  };

  const handlePreviousLesson = () => {
    const currentIndex = lessons.findIndex((l) => l.id === currentLesson.id);
    if (currentIndex > 0) {
      setCurrentLesson(lessons[currentIndex - 1]);
    }
  };

  const handleMarkComplete = async () => {
    try {
      await markComplete(currentLesson.id, user.id);
      setCompletedLessons([...completedLessons, currentLesson.id]);
      
      // Update overall progress
      const progress = await getCourseProgress(courseId, user.id);
      setOverallProgress(progress.percentage);
      
      toast.success('Lesson marked as complete');
    } catch (error) {
      console.error('Failed to mark complete:', error);
      toast.error('Failed to mark lesson complete');
    }
  };

  const handleMarkIncomplete = async () => {
    try {
      await markIncomplete(currentLesson.id, user.id);
      setCompletedLessons(completedLessons.filter((id) => id !== currentLesson.id));
      
      const progress = await getCourseProgress(courseId, user.id);
      setOverallProgress(progress.percentage);
      
      toast.success('Lesson marked as incomplete');
    } catch (error) {
      console.error('Failed to mark incomplete:', error);
      toast.error('Failed to mark lesson incomplete');
    }
  };

  const handleVideoProgress = (seconds) => {
    saveWatchTime(currentLesson.id, user.id, seconds);
  };

  const getLessonIcon = (type) => {
    const icons = {
      video: VideoPlayer,
      pdf: FileText,
      article: BookOpen,
      quiz: HelpCircle,
      assignment: Clipboard,
      live: Calendar,
    };
    return icons[type] || BookOpen;
  };

  const renderLessonContent = () => {
    if (!currentLesson) return null;

    switch (currentLesson.type) {
      case 'video':
        return (
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <VideoPlayer
              url={currentLesson.content?.video_url}
              onProgress={handleVideoProgress}
            />
          </div>
        );

      case 'pdf':
        return (
          <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-white mb-4">PDF Lesson</p>
              <Button
                onClick={() => window.open(currentLesson.content?.pdf_url, '_blank')}
                variant="primary"
              >
                Open PDF
              </Button>
            </div>
          </div>
        );

      case 'article':
        return (
          <div className="bg-slate-800 rounded-lg p-6 max-h-[600px] overflow-y-auto">
            <div
              className="prose prose-invert max-w-none text-white"
              dangerouslySetInnerHTML={{ __html: currentLesson.content?.article_content }}
            />
          </div>
        );

      case 'quiz':
        return (
          <div className="bg-slate-800 rounded-lg p-6">
            <p className="text-white mb-4">Quiz Lesson</p>
            <Button
              onClick={() => navigate(`/quiz/${currentLesson.content?.quiz_id}`)}
              variant="primary"
            >
              Start Quiz
            </Button>
          </div>
        );

      case 'assignment':
        return (
          <div className="bg-slate-800 rounded-lg p-6">
            <p className="text-white mb-4">Assignment</p>
            <div
              className="prose prose-invert max-w-none text-white mb-4"
              dangerouslySetInnerHTML={{ __html: currentLesson.content?.assignment_description }}
            />
            <Button variant="primary">Submit Assignment</Button>
          </div>
        );

      case 'live':
        return (
          <div className="bg-slate-800 rounded-lg p-6">
            <p className="text-white mb-4">Live Class</p>
            <p className="text-slate-400 mb-2">
              Scheduled: {new Date(currentLesson.content?.scheduled_at).toLocaleString()}
            </p>
            <Button
              onClick={() => window.open(currentLesson.content?.meeting_link, '_blank')}
              variant="primary"
            >
              Join Meeting
            </Button>
          </div>
        );

      default:
        return <div className="text-slate-400">No content available</div>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading course...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar - Course Content */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-slate-900/95 backdrop-blur-lg border-r border-slate-700 transform transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-slate-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Course Content</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-slate-400 hover:text-white lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress */}
          <div className="p-4 border-b border-slate-700">
            <ProgressBar value={overallProgress} label="Course Progress" />
          </div>

          {/* Sections and Lessons */}
          <div className="flex-1 overflow-y-auto p-4">
            {sections.map((section) => (
              <div key={section.id} className="mb-6">
                <h3 className="text-white font-medium mb-3">{section.title}</h3>
                <div className="space-y-2">
                  {lessons
                    .filter((l) => l.section_id === section.id)
                    .map((lesson) => {
                      const LessonIcon = getLessonIcon(lesson.type);
                      const isCompleted = completedLessons.includes(lesson.id);
                      const isCurrent = currentLesson?.id === lesson.id;

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => handleLessonChange(lesson)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                            isCurrent
                              ? 'bg-blue-500/20 border border-blue-500'
                              : 'bg-slate-800/50 hover:bg-slate-800'
                          }`}
                        >
                          <LessonIcon className="w-4 h-4 text-slate-400" />
                          <span className="flex-1 text-white text-sm truncate">{lesson.title}</span>
                          {isCompleted && <CheckCircle className="w-4 h-4 text-green-500" />}
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-slate-900/50 border-b border-slate-700 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-400 hover:text-white lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-white">{course?.title}</h1>
          </div>
          <Button onClick={() => navigate('/courses')} variant="secondary" size="sm">
            Exit Course
          </Button>
        </div>

        {/* Lesson Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Lesson Title */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">{currentLesson?.title}</h2>
              <Badge variant={currentLesson?.status === 'published' ? 'published' : 'draft'}>
                {currentLesson?.type}
              </Badge>
            </div>

            {/* Content */}
            {renderLessonContent()}

            {/* Lesson Description */}
            {currentLesson?.description && (
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">About this lesson</h3>
                <p className="text-slate-400">{currentLesson.description}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                onClick={handlePreviousLesson}
                variant="secondary"
                icon={ChevronLeft}
                disabled={lessons.findIndex((l) => l.id === currentLesson?.id) === 0}
              >
                Previous
              </Button>

              <div className="flex items-center gap-4">
                {completedLessons.includes(currentLesson?.id) ? (
                  <Button
                    onClick={handleMarkIncomplete}
                    variant="secondary"
                    icon={CheckCircle}
                  >
                    Mark Incomplete
                  </Button>
                ) : (
                  <Button
                    onClick={handleMarkComplete}
                    variant="primary"
                    icon={CheckCircle}
                  >
                    Mark Complete
                  </Button>
                )}
                <Button
                  onClick={handleNextLesson}
                  variant="primary"
                  icon={ChevronRight}
                  disabled={lessons.findIndex((l) => l.id === currentLesson?.id) === lessons.length - 1}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
