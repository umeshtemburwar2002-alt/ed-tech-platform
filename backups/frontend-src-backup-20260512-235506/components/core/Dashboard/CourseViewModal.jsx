import React, { useState } from "react";
import { FaStar, FaUsers, FaTimes, FaPlay, FaBook, FaGraduationCap, FaClock } from "react-icons/fa";

export default function CourseViewModal({ course, onClose }) {
  if (!course) return null;
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-richblack-800 border border-richblack-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header Image */}
        <div className="relative h-48 rounded-t-2xl overflow-hidden">
          <img src={course.thumbnail} alt={course.courseName} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-richblack-900 via-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-all">
            <FaTimes />
          </button>
          <div className="absolute bottom-4 left-5">
            <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${course.status === "Published" ? "bg-emerald-500/80 text-white" : "bg-richblack-700 text-richblack-200"}`}>{course.status}</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Title & Meta */}
          <div>
            <h2 className="text-2xl font-black text-white mb-2">{course.courseName}</h2>
            <p className="text-slate-400 text-sm leading-relaxed">{course.courseDescription}</p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: FaUsers, label: "Students", value: course.studentsEnrolled?.length ?? 0, color: "text-blue-400" },
              { icon: FaStar, label: "Rating", value: course.rating ?? "4.8", color: "text-yellow-400" },
              { icon: FaBook, label: "Sections", value: course.sections?.length ?? 0, color: "text-purple-400" },
              { icon: FaClock, label: "Duration", value: course.duration ?? "—", color: "text-green-400" },
            ].map((s, i) => (
              <div key={i} className="bg-richblack-900 rounded-xl p-3 text-center border border-richblack-700">
                <s.icon className={`${s.color} mx-auto mb-1`} />
                <p className={`text-lg font-black ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 bg-richblack-900 rounded-xl p-4 border border-richblack-700">
            {[
              { label: "Category", value: course.category?.name ?? course.category ?? "—" },
              { label: "Level", value: course.level ?? "Beginner" },
              { label: "Price", value: course.price > 0 ? `₹${course.price}` : "FREE" },
              { label: "Language", value: course.language ?? "English" },
            ].map((d, i) => (
              <div key={i}>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{d.label}</p>
                <p className="text-white font-bold text-sm mt-0.5">{d.value}</p>
              </div>
            ))}
          </div>

          {/* Sections/Lectures */}
          {course.sections?.length > 0 && (
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                <FaBook className="text-indigo-400" /> Curriculum
              </h3>
              <div className="space-y-2">
                {course.sections.map((sec, i) => (
                  <div key={i} className="bg-richblack-900 border border-richblack-700 rounded-xl p-4">
                    <p className="text-white font-bold text-sm mb-2">
                      Section {i + 1}: {sec.sectionName}
                    </p>
                    {sec.subSection?.map((sub, j) => (
                      <div key={j} className="flex items-center gap-2 pl-3 py-1.5 border-l-2 border-indigo-500/30 text-slate-400 text-xs">
                        <FaPlay className="text-[8px] text-indigo-400 shrink-0" />
                        {sub.title}
                        {sub.timeDuration && <span className="ml-auto text-slate-600">{sub.timeDuration}m</span>}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {course.tag?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {course.tag.map((t, i) => (
                <span key={i} className="px-3 py-1 bg-indigo-500/10 text-indigo-300 text-[10px] font-black uppercase rounded-full border border-indigo-500/20">{t}</span>
              ))}
            </div>
          )}

          <button onClick={onClose} className="w-full py-3 bg-richblack-700 hover:bg-richblack-600 text-white rounded-xl font-bold transition-all">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
