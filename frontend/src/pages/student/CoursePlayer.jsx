import React, { useState } from "react";
import { motion } from "framer-motion";
import Card from "../../components/ui/Card";
import { Play, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

const course = {
  title: "Complete Web Development Bootcamp",
  sections: [
    {
      title: "Introduction",
      lectures: [
        { id: 1, title: "Welcome to the Course", duration: "5:00", completed: true },
        { id: 2, title: "What You'll Learn", duration: "10:00", completed: true }
      ]
    },
    {
      title: "HTML & CSS Basics",
      lectures: [
        { id: 3, title: "HTML Fundamentals", duration: "20:00", completed: false, current: true },
        { id: 4, title: "CSS Styling", duration: "25:00", completed: false },
        { id: 5, title: "Responsive Design", duration: "30:00", completed: false }
      ]
    }
  ]
};

export default function CoursePlayer() {
  const [expandedSection, setExpandedSection] = useState(1);
  const [currentLecture, setCurrentLecture] = useState(3);

  return (
    <div className="flex h-screen bg-[#0A0A0F]">
      <div className="flex-1 flex flex-col">
        <div className="bg-black aspect-video flex items-center justify-center">
          <div className="text-center">
          <div className="w-20 h-20 bg-white/[0.05] rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-400">Video Player</p>
          </div>
        </div>

        <div className="flex-1 p-8 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-bold text-white mb-2">
              HTML Fundamentals
            </h1>
            <p className="text-gray-400 mb-8">{course.title}</p>

            <Card className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">About this lecture</h2>
              <p className="text-gray-300">
                Learn the fundamentals of HTML and how to structure web pages.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>

      <aside className="w-80 bg-[#111118] border-l border-white/[0.06] flex flex-col">
        <div className="p-6 border-b border-white/[0.06]">
          <h2 className="text-xl font-bold text-white">Course Content</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {course.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-4">
              <button
                onClick={() => setExpandedSection(expandedSection === sectionIndex ? null : sectionIndex)}
                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-white/[0.03] text-left"
              >
                <div>
                  <h3 className="font-semibold text-white">{section.title}</h3>
                  <p className="text-gray-500 text-sm">{section.lectures.length} lectures</p>
                </div>
                {expandedSection === sectionIndex ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedSection === sectionIndex && (
                <div className="space-y-2 pl-4">
                  {section.lectures.map((lecture) => (
                    <button
                      key={lecture.id}
                      onClick={() => setCurrentLecture(lecture.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                        lecture.id === currentLecture
                          ? "bg-violet-500/10 border border-violet-500/30"
                          : "hover:bg-white/[0.03]"
                      }`}
                    >
                      {lecture.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                      ) : (
                        <Play className={`w-4 h-4 shrink-0 ${
                          lecture.id === currentLecture ? "text-violet-400" : "text-gray-400"
                        }`} />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${
                          lecture.id === currentLecture ? "text-violet-400" : "text-gray-300"
                        }`}>
                          {lecture.title}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">{lecture.duration}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
