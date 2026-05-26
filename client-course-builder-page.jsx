/**
 * College LMS - Course Builder Page
 * Instructor course structure builder with drag-and-drop
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import useCourseStore from '../store/courseStore';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import LessonEditor from '../components/instructor/LessonEditor';
import { ChevronDown, ChevronRight, GripVertical, Plus, Edit2, Trash2, BookOpen, Video, FileText, HelpCircle, Clipboard, Calendar } from 'lucide-react';

const CourseBuilder = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const {
    currentCourse,
    sections,
    lessons,
    selectedLesson,
    setSelectedLesson,
    setSections,
    setLessons,
    addSection,
    updateSection,
    deleteSection,
    reorderSections,
    addLesson,
    updateLesson,
    deleteLesson,
    reorderLessons,
    setCurrentCourse,
    reset,
  } = useCourseStore();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [showLessonEditor, setShowLessonEditor] = useState(false);

  useEffect(() => {
    fetchCourseData();
    return () => reset();
  }, [courseId]);

  const fetchCourseData = async () => {
    setLoading(true);
    try {
      // Fetch course
      const { data: course, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (courseError) throw courseError;
      setCurrentCourse(course);

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

      // Expand all sections by default
      const expanded = {};
      sectionsData?.forEach((section) => {
        expanded[section.id] = true;
      });
      setExpandedSections(expanded);
    } catch (error) {
      console.error('Failed to fetch course data:', error);
      toast.error('Failed to load course data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSection = async () => {
    try {
      const { data: section, error } = await supabase
        .from('course_sections')
        .insert({
          course_id: courseId,
          title: 'New Section',
          order_index: sections.length,
        })
        .select()
        .single();

      if (error) throw error;
      addSection(section);
      setExpandedSections({ ...expandedSections, [section.id]: true });
      toast.success('Section added');
    } catch (error) {
      console.error('Failed to add section:', error);
      toast.error('Failed to add section');
    }
  };

  const handleAddLesson = async (sectionId) => {
    try {
      const { data: lesson, error } = await supabase
        .from('course_lessons')
        .insert({
          section_id: sectionId,
          course_id: courseId,
          title: 'New Lesson',
          type: 'video',
          order_index: lessons.filter((l) => l.section_id === sectionId).length,
          status: 'draft',
        })
        .select()
        .single();

      if (error) throw error;
      addLesson(lesson);
      setSelectedLesson(lesson);
      setShowLessonEditor(true);
      toast.success('Lesson added');
    } catch (error) {
      console.error('Failed to add lesson:', error);
      toast.error('Failed to add lesson');
    }
  };

  const handleDeleteSection = async (sectionId) => {
    try {
      const { error } = await supabase
        .from('course_sections')
        .delete()
        .eq('id', sectionId);

      if (error) throw error;
      deleteSection(sectionId);
      toast.success('Section deleted');
    } catch (error) {
      console.error('Failed to delete section:', error);
      toast.error('Failed to delete section');
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    try {
      const { error } = await supabase
        .from('course_lessons')
        .delete()
        .eq('id', lessonId);

      if (error) throw error;
      deleteLesson(lessonId);
      if (selectedLesson?.id === lessonId) {
        setSelectedLesson(null);
        setShowLessonEditor(false);
      }
      toast.success('Lesson deleted');
    } catch (error) {
      console.error('Failed to delete lesson:', error);
      toast.error('Failed to delete lesson');
    }
  };

  const toggleSectionExpand = (sectionId) => {
    setExpandedSections({
      ...expandedSections,
      [sectionId]: !expandedSections[sectionId],
    });
  };

  const onDragEnd = async (result) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === 'SECTION') {
      const sectionIds = sections.map((s) => s.id);
      const [reorderedItem] = sectionIds.splice(source.index, 1);
      sectionIds.splice(destination.index, 0, reorderedItem);

      await reorderSections(sectionIds);
    } else if (type === 'LESSON') {
      const sourceSectionId = source.droppableId;
      const destSectionId = destination.droppableId;

      const sectionLessons = lessons.filter((l) => l.section_id === sourceSectionId);
      const lessonIds = sectionLessons.map((l) => l.id);
      const [reorderedItem] = lessonIds.splice(source.index, 1);
      lessonIds.splice(destination.index, 0, reorderedItem);

      // Update lesson section if moved to different section
      if (sourceSectionId !== destSectionId) {
        const lesson = lessons.find((l) => l.id === reorderedItem);
        await updateLesson(reorderedItem, { section_id: destSectionId });
      }

      await reorderLessons(lessonIds);
    }
  };

  const getLessonIcon = (type) => {
    const icons = {
      video: Video,
      pdf: FileText,
      article: BookOpen,
      quiz: HelpCircle,
      assignment: Clipboard,
      live: Calendar,
    };
    return icons[type] || BookOpen;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left Panel - Course Structure (40%) */}
      <div className="w-2/5 border-r border-slate-800 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold text-white">{currentCourse?.title}</h1>
            <Badge variant={currentCourse?.status === 'published' ? 'published' : 'draft'}>
              {currentCourse?.status}
            </Badge>
          </div>
          {saving && (
            <p className="text-sm text-blue-400">Saving...</p>
          )}
        </div>

        {/* Sections List */}
        <div className="flex-1 overflow-y-auto p-4">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="sections" type="SECTION">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {sections.map((section, index) => (
                    <Draggable key={section.id} draggableId={section.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="bg-slate-900/50 rounded-lg border border-slate-700"
                        >
                          {/* Section Header */}
                          <div className="flex items-center gap-3 p-4">
                            <div {...provided.dragHandleProps}>
                              <GripVertical className="w-5 h-5 text-slate-500" />
                            </div>
                            <button
                              onClick={() => toggleSectionExpand(section.id)}
                              className="text-slate-400 hover:text-white"
                            >
                              {expandedSections[section.id] ? (
                                <ChevronDown className="w-5 h-5" />
                              ) : (
                                <ChevronRight className="w-5 h-5" />
                              )}
                            </button>
                            <input
                              type="text"
                              defaultValue={section.title}
                              onBlur={(e) => updateSection(section.id, { title: e.target.value })}
                              className="flex-1 bg-transparent text-white font-medium focus:outline-none"
                            />
                            <Badge variant="published">
                              {lessons.filter((l) => l.section_id === section.id).length} lessons
                            </Badge>
                            <button
                              onClick={() => handleDeleteSection(section.id)}
                              className="text-slate-500 hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Lessons List */}
                          <AnimatePresence>
                            {expandedSections[section.id] && (
                              <Droppable droppableId={section.id} type="LESSON">
                                {(provided) => (
                                  <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="px-4 pb-4 space-y-2"
                                  >
                                    {lessons
                                      .filter((l) => l.section_id === section.id)
                                      .map((lesson, lessonIndex) => {
                                        const LessonIcon = getLessonIcon(lesson.type);
                                        return (
                                          <Draggable
                                            key={lesson.id}
                                            draggableId={lesson.id}
                                            index={lessonIndex}
                                          >
                                            {(provided) => (
                                              <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                onClick={() => {
                                                  setSelectedLesson(lesson);
                                                  setShowLessonEditor(true);
                                                }}
                                                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                                                  selectedLesson?.id === lesson.id
                                                    ? 'bg-blue-500/20 border border-blue-500'
                                                    : 'bg-slate-800/50 hover:bg-slate-800'
                                                }`}
                                              >
                                                <div {...provided.dragHandleProps}>
                                                  <GripVertical className="w-4 h-4 text-slate-500" />
                                                </div>
                                                <LessonIcon className="w-4 h-4 text-slate-400" />
                                                <span className="flex-1 text-white text-sm truncate">
                                                  {lesson.title}
                                                </span>
                                                <Badge
                                                  variant={
                                                    lesson.status === 'published' ? 'published' : 'draft'
                                                  }
                                                  size="sm"
                                                >
                                                  {lesson.status}
                                                </Badge>
                                                <button
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteLesson(lesson.id);
                                                  }}
                                                  className="text-slate-500 hover:text-red-500"
                                                >
                                                  <Trash2 className="w-4 h-4" />
                                                </button>
                                              </div>
                                            )}
                                          </Draggable>
                                        );
                                      })}
                                    {provided.placeholder}
                                    <button
                                      onClick={() => handleAddLesson(section.id)}
                                      className="w-full py-2 border border-dashed border-slate-600 rounded-lg text-slate-400 hover:border-slate-500 hover:text-slate-300 transition-colors text-sm"
                                    >
                                      + Add Lesson
                                    </button>
                                  </div>
                                )}
                              </Droppable>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {/* Add Section Button */}
          <button
            onClick={handleAddSection}
            className="w-full mt-4 py-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-colors"
          >
            + Add Section
          </button>
        </div>

        {/* FAB Actions */}
        <div className="p-4 border-t border-slate-800 flex gap-2">
          <Button onClick={() => navigate(`/instructor/course/${courseId}`)} variant="secondary">
            Back
          </Button>
          <Button onClick={() => navigate(`/instructor/course/${courseId}`)} variant="primary">
            Save & Exit
          </Button>
        </div>
      </div>

      {/* Right Panel - Lesson Editor (60%) */}
      <div className="w-3/5 flex flex-col">
        {selectedLesson ? (
          <LessonEditor
            lesson={selectedLesson}
            courseId={courseId}
            onClose={() => {
              setSelectedLesson(null);
              setShowLessonEditor(false);
            }}
            onSave={(updatedLesson) => {
              updateLesson(updatedLesson.id, updatedLesson);
              setSelectedLesson(updatedLesson);
            }}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Lesson Selected</h3>
              <p className="text-slate-400 mb-4">
                Select a lesson from the left panel to edit its content
              </p>
              <p className="text-sm text-slate-500">
                Or add a new lesson to get started
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseBuilder;
