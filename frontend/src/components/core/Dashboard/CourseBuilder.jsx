import React, { useState } from "react";
import { FaPlus, FaTrash, FaGripVertical, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function CourseBuilder({ initialSections = [], onUpdate = () => {} }) {
  const [sections, setSections] = useState(
    initialSections.length > 0
      ? initialSections
      : [{ id: Date.now(), title: "Introduction", lessons: [{ id: Date.now() + 1, title: "Welcome", duration: 0 }] }]
  );
  const [expandedSections, setExpandedSections] = useState(
    sections.reduce((acc, sec) => ({ ...acc, [sec.id]: true }), {})
  );
  const [draggedItem, setDraggedItem] = useState(null);

  const addSection = () => {
    const newSection = {
      id: Date.now(),
      title: "New Section",
      lessons: []
    };
    const updated = [...sections, newSection];
    setSections(updated);
    setExpandedSections({ ...expandedSections, [newSection.id]: true });
    onUpdate(updated);
  };

  const updateSection = (id, patch) => {
    const updated = sections.map(s => s.id === id ? { ...s, ...patch } : s);
    setSections(updated);
    onUpdate(updated);
  };

  const removeSection = (id) => {
    const updated = sections.filter(s => s.id !== id);
    setSections(updated);
    onUpdate(updated);
  };

  const addLesson = (sectionId) => {
    const newLesson = { id: Date.now(), title: "New Lesson", duration: 0 };
    const updated = sections.map(s =>
      s.id === sectionId ? { ...s, lessons: [...s.lessons, newLesson] } : s
    );
    setSections(updated);
    onUpdate(updated);
  };

  const updateLesson = (sectionId, lessonId, patch) => {
    const updated = sections.map(s =>
      s.id === sectionId
        ? { ...s, lessons: s.lessons.map(l => l.id === lessonId ? { ...l, ...patch } : l) }
        : s
    );
    setSections(updated);
    onUpdate(updated);
  };

  const removeLesson = (sectionId, lessonId) => {
    const updated = sections.map(s =>
      s.id === sectionId
        ? { ...s, lessons: s.lessons.filter(l => l.id !== lessonId) }
        : s
    );
    setSections(updated);
    onUpdate(updated);
  };

  const toggleSection = (id) => {
    setExpandedSections({ ...expandedSections, [id]: !expandedSections[id] });
  };

  // Drag and drop handlers
  const handleDragStart = (e, type, item, sectionId = null) => {
    setDraggedItem({ type, item, sectionId });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetSectionId, targetLessonId = null) => {
    e.preventDefault();
    if (!draggedItem) return;

    const { type, item, sectionId: sourceSectionId } = draggedItem;

    if (type === "section") {
      const newSections = [...sections];
      const sourceIndex = newSections.findIndex(s => s.id === item.id);
      const targetIndex = newSections.findIndex(s => s.id === targetSectionId);
      
      if (sourceIndex !== -1 && targetIndex !== -1 && sourceIndex !== targetIndex) {
        const [moved] = newSections.splice(sourceIndex, 1);
        newSections.splice(targetIndex, 0, moved);
        setSections(newSections);
        onUpdate(newSections);
      }
    } else if (type === "lesson") {
      const newSections = [...sections];
      
      if (sourceSectionId === targetSectionId) {
        // Reorder within same section
        const section = newSections.find(s => s.id === sourceSectionId);
        const lessons = [...section.lessons];
        const sourceIdx = lessons.findIndex(l => l.id === item.id);
        const targetIdx = lessons.findIndex(l => l.id === targetLessonId);
        
        if (sourceIdx !== -1 && targetIdx !== -1 && sourceIdx !== targetIdx) {
          const [moved] = lessons.splice(sourceIdx, 1);
          lessons.splice(targetIdx, 0, moved);
          section.lessons = lessons;
          setSections(newSections);
          onUpdate(newSections);
        }
      } else {
        // Move between sections
        const sourceSection = newSections.find(s => s.id === sourceSectionId);
        const targetSection = newSections.find(s => s.id === targetSectionId);
        const lessonIndex = sourceSection.lessons.findIndex(l => l.id === item.id);
        
        if (lessonIndex !== -1) {
          const [moved] = sourceSection.lessons.splice(lessonIndex, 1);
          if (targetLessonId) {
            const insertIdx = targetSection.lessons.findIndex(l => l.id === targetLessonId);
            targetSection.lessons.splice(insertIdx, 0, moved);
          } else {
            targetSection.lessons.push(moved);
          }
          setSections(newSections);
          onUpdate(newSections);
        }
      }
    }

    setDraggedItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-richblack-900/50 p-4 rounded-xl border border-richblack-700">
        <div>
          <h2 className="text-xl font-bold text-richblack-5">Course Builder</h2>
          <p className="text-xs text-richblack-400 mt-0.5">
            Drag and drop sections and lessons to organize your course
          </p>
        </div>
        <button
          onClick={addSection}
          className="px-4 py-2 text-xs rounded-lg bg-yellow-50 text-richblack-900 font-bold hover:scale-105 transition-all shadow-md flex items-center gap-2"
        >
          <FaPlus />
          Add Section
        </button>
      </div>

      <div className="space-y-4">
        {sections.map((section, sectionIdx) => (
          <div
            key={section.id}
            className="rounded-xl border border-richblack-700 bg-richblack-900/30 overflow-hidden"
            draggable
            onDragStart={(e) => handleDragStart(e, "section", section)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, section.id)}
          >
            <div className="flex items-center gap-4 p-4 border-b border-richblack-700">
              <FaGripVertical className="text-richblack-400 cursor-grab" />
              <div className="bg-richblack-700 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-richblack-5 shrink-0">
                {sectionIdx + 1}
              </div>
              <input
                value={section.title}
                onChange={(e) => updateSection(section.id, { title: e.target.value })}
                className="flex-1 bg-transparent border-b border-transparent focus:border-yellow-50 outline-none text-richblack-5 font-semibold py-1 transition-all"
                placeholder="Section Title"
              />
              <button
                onClick={() => toggleSection(section.id)}
                className="p-2 text-richblack-400 hover:text-yellow-50 transition-colors"
              >
                {expandedSections[section.id] ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <button
                onClick={() => removeSection(section.id)}
                className="p-2 text-rose-500 hover:text-rose-400 transition-colors"
              >
                <FaTrash />
              </button>
            </div>

            {expandedSections[section.id] && (
              <div className="pl-12 pr-4 pb-4 pt-2 space-y-2">
                {section.lessons.map((lesson, lessonIdx) => (
                  <div
                    key={lesson.id}
                    className="flex items-center gap-3 rounded-lg bg-richblack-900 border border-richblack-700 px-4 py-3 group hover:border-richblack-500 transition-all"
                    draggable
                    onDragStart={(e) => handleDragStart(e, "lesson", lesson, section.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, section.id, lesson.id)}
                  >
                    <FaGripVertical className="text-richblack-400 cursor-grab" />
                    <div className="text-richblack-500 text-[10px] font-bold">{lessonIdx + 1}</div>
                    <input
                      value={lesson.title}
                      onChange={(e) => updateLesson(section.id, lesson.id, { title: e.target.value })}
                      className="flex-1 bg-transparent outline-none text-sm text-richblack-25"
                      placeholder="Lesson Title"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={lesson.duration || ""}
                        onChange={(e) => updateLesson(section.id, lesson.id, { duration: e.target.value })}
                        className="w-12 bg-richblack-800 rounded px-1 py-0.5 text-center text-[10px] text-richblack-25 outline-none"
                        placeholder="Min"
                      />
                      <span className="text-[10px] text-richblack-500 font-bold uppercase">MIN</span>
                      <button
                        onClick={() => removeLesson(section.id, lesson.id)}
                        className="p-1 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => addLesson(section.id)}
                  className="text-[11px] font-bold text-yellow-50 hover:text-yellow-100 transition-all flex items-center gap-1 mt-2"
                >
                  <span className="text-lg">+</span> Add Lesson
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
