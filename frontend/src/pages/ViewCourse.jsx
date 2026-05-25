import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaPlay, FaCheckCircle, FaArrowLeft, FaGraduationCap, FaChevronRight, FaExclamationTriangle, FaExternalLinkAlt } from 'react-icons/fa';
import { courses } from '../data/courses';
import { getEmbedUrl, isValidYouTubeID } from '../utils/videoUtils';
import { supabase } from '../config/supabaseClient';

const ViewCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [videoError, setVideoError] = useState(false);

  const course = courses.find(c => String(c.id) === String(courseId));

  useEffect(() => {
    if (!course) {
      navigate('/all-courses');
    }
    // Reset error state when switching lessons
    setVideoError(false);
  }, [course, navigate, currentLessonIdx]);

  if (!course) return null;

  const lessons = course.modules || [];
  const activeLesson = lessons[currentLessonIdx];
  const embedUrl = activeLesson ? getEmbedUrl(activeLesson.videoId) : '';
  const isIdValid = activeLesson ? isValidYouTubeID(activeLesson.videoId) : false;

  const toggleLessonCompletion = (idx) => {
    if (completedLessons.includes(idx)) {
      setCompletedLessons(completedLessons.filter(id => id !== idx));
    } else {
      setCompletedLessons([...completedLessons, idx]);
    }
  };

  const progress = Math.round((completedLessons.length / lessons.length) * 100);

  const goToNextLesson = () => {
    if (currentLessonIdx < lessons.length - 1) {
      setCurrentLessonIdx(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevLesson = () => {
    if (currentLessonIdx > 0) {
      setCurrentLessonIdx(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#000814] text-white flex flex-col lg:flex-row pt-20">
      {/* Sidebar - Course Content List */}
      <div className="w-full lg:w-96 bg-[#000d1a] border-r border-white/10 flex flex-col h-[calc(100vh-80px)] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-white/10">
          <button 
            onClick={() => navigate(`/courses/${courseId}`)}
            className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors text-xs font-black uppercase tracking-widest"
          >
            <FaArrowLeft /> Back to Details
          </button>
          <h2 className="text-xl font-black mb-6 leading-tight">{course.title}</h2>
          
          {/* Progress Bar */}
          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="text-cyan-400">Course Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="px-6 py-4 bg-white/5 font-black text-[10px] uppercase tracking-[0.3em] text-slate-500 border-b border-white/5">
            Modules ({lessons.length})
          </div>
          <div className="flex flex-col">
            {lessons.map((lesson, idx) => {
              const isActive = currentLessonIdx === idx;
              const isCompleted = completedLessons.includes(idx);
              
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentLessonIdx(idx)}
                  className={`flex items-center gap-4 px-6 py-5 text-left transition-all hover:bg-white/5 border-l-4 group ${
                    isActive ? 'bg-cyan-500/10 border-cyan-400 text-white' : 'border-transparent text-slate-400'
                  }`}
                >
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLessonCompletion(idx);
                    }}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 ${
                      isCompleted ? 'bg-green-500 border-green-500 shadow-lg shadow-green-500/20' : 'border-slate-700 group-hover:border-slate-500'
                    }`}
                  >
                    {isCompleted && <FaCheckCircle className="text-white text-[10px]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold truncate ${isActive ? 'text-white' : 'group-hover:text-slate-200'}`}>
                      {lesson.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{lesson.duration}</span>
                      {isActive && <span className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse"></span>}
                    </div>
                  </div>
                  {isActive && <FaChevronRight className="text-cyan-400 text-[10px]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content - Video Player */}
      <div className="flex-1 bg-[#000814] overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6 lg:p-12">
          {/* Video Container */}
          <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden bg-black shadow-2xl shadow-cyan-500/10 mb-10 border border-white/10 relative group">
            {!isIdValid || videoError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/50 backdrop-blur-xl p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-4xl mb-6 border border-red-500/20">
                  <FaExclamationTriangle />
                </div>
                <h2 className="text-2xl font-black mb-4">Video Unavailable</h2>
                <p className="text-slate-400 max-w-md mb-8 font-medium">
                  We're having trouble playing this video. It might have been removed, made private, or has an invalid ID.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button 
                    onClick={() => setVideoError(false)}
                    className="btn-secondary py-3 px-8 text-xs uppercase tracking-widest font-black"
                  >
                    Try Again
                  </button>
                  <a 
                    href={`https://www.youtube.com/watch?v=${activeLesson?.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary py-3 px-8 text-xs uppercase tracking-widest font-black flex items-center gap-2"
                  >
                    Watch on YouTube <FaExternalLinkAlt className="text-[10px]" />
                  </a>
                </div>
              </div>
            ) : (
              activeLesson && (
                <iframe
                  width="100%"
                  height="100%"
                  src={embedUrl}
                  title={activeLesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  onError={() => setVideoError(true)}
                ></iframe>
              )
            )}
          </div>

          {/* Lesson Navigation & Header */}
          {activeLesson && (
            <div className="flex flex-col gap-8 mb-12">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <button 
                    disabled={currentLessonIdx === 0}
                    onClick={goToPrevLesson}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <FaArrowLeft className="text-sm" />
                  </button>
                  <button 
                    disabled={currentLessonIdx === lessons.length - 1}
                    onClick={goToNextLesson}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all rotate-180"
                  >
                    <FaArrowLeft className="text-sm" />
                  </button>
                </div>
                
                <button 
                  onClick={() => toggleLessonCompletion(currentLessonIdx)}
                  className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-3 shadow-xl ${
                    completedLessons.includes(currentLessonIdx)
                      ? 'bg-green-500 text-white shadow-green-500/20'
                      : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-cyan-500/20'
                  }`}
                >
                  {completedLessons.includes(currentLessonIdx) ? (
                    <><FaCheckCircle /> Completed</>
                  ) : (
                    'Mark as Complete'
                  )}
                </button>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase tracking-widest border border-cyan-500/20">
                    Module {currentLessonIdx + 1} of {lessons.length}
                  </span>
                  <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                  <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{activeLesson.duration}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tight">{activeLesson.title}</h1>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 w-fit">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-lg">
                    <FaGraduationCap />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Instructor</span>
                    <span className="text-sm font-black text-white">{course.instructor}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Description Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -z-10"></div>
                <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-cyan-500 rounded-full"></span>
                  About this Module
                </h3>
                <p className="text-slate-400 leading-relaxed font-medium">
                  In this session of {course.title}, we explore the fundamental concepts of {activeLesson?.title}. 
                  You'll gain practical experience through guided examples and learn industry best practices 
                  to build professional-grade solutions.
                </p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10">
                <h3 className="text-lg font-black mb-6 uppercase tracking-widest text-slate-300">Resources</h3>
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer group flex flex-col gap-1">
                    <p className="text-sm font-black text-white group-hover:text-cyan-400 transition-colors">Study Material.pdf</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">4.2 MB • Download</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer group flex flex-col gap-1">
                    <p className="text-sm font-black text-white group-hover:text-cyan-400 transition-colors">Code Exercises.zip</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">12.5 MB • Download</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
