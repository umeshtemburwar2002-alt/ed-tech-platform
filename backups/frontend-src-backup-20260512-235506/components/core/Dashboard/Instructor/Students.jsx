import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUsers, FaSearch, FaArrowRight, FaCheckCircle, FaTrophy,
  FaEnvelope, FaFilter, FaChartLine, FaFire, FaUserGraduate, FaTimes
} from "react-icons/fa";
import { toast } from "react-hot-toast";

const mockStudents = [
  { id: 1, name: "Aarav Sharma", course: "Modern JavaScript Masterclass", progress: 85, lastActive: "2 hours ago", avatar: "AS", email: "aarav@example.com", enrolled: "Jan 15, 2026", quizScore: 91, attendance: 96, status: "active" },
  { id: 2, name: "Priya Singh", course: "React Development Bootcamp", progress: 45, lastActive: "5 hours ago", avatar: "PS", email: "priya@example.com", enrolled: "Feb 3, 2026", quizScore: 74, attendance: 82, status: "active" },
  { id: 3, name: "Rajan Mehta", course: "Node.js Backend Mastery", progress: 12, lastActive: "Yesterday", avatar: "RM", email: "rajan@example.com", enrolled: "Mar 1, 2026", quizScore: 60, attendance: 55, status: "inactive" },
  { id: 4, name: "Emma Wilson", course: "UI/UX Design Essentials", progress: 100, lastActive: "3 days ago", avatar: "EW", email: "emma@example.com", enrolled: "Dec 20, 2025", quizScore: 98, attendance: 100, status: "completed" },
  { id: 5, name: "Lucas Martin", course: "Full Stack MERN 2026", progress: 67, lastActive: "1 hour ago", avatar: "LM", email: "lucas@example.com", enrolled: "Feb 28, 2026", quizScore: 83, attendance: 89, status: "active" },
  { id: 6, name: "Nadia Khan", course: "Data Science with Python", progress: 33, lastActive: "4 days ago", avatar: "NK", email: "nadia@example.com", enrolled: "Mar 10, 2026", quizScore: 68, attendance: 70, status: "at-risk" },
];

const statusConfig = {
  active: { label: "Active", color: "bg-green-500/10 text-green-400 border-green-500/20" },
  inactive: { label: "Inactive", color: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
  completed: { label: "Completed", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  "at-risk": { label: "At Risk", color: "bg-red-500/10 text-red-400 border-red-500/20" },
};

const statCards = [
  { label: "Total Students", value: "6", icon: FaUsers, color: "text-blue-400", bg: "from-blue-500/10 to-blue-600/10", border: "border-blue-500/20" },
  { label: "Active Learners", value: "3", icon: FaFire, color: "text-orange-400", bg: "from-orange-500/10 to-orange-600/10", border: "border-orange-500/20" },
  { label: "Completed", value: "1", icon: FaTrophy, color: "text-yellow-400", bg: "from-yellow-500/10 to-yellow-600/10", border: "border-yellow-500/20" },
  { label: "Avg Progress", value: "57%", icon: FaChartLine, color: "text-purple-400", bg: "from-purple-500/10 to-purple-600/10", border: "border-purple-500/20" },
];

export default function Students() {
  const [students] = useState(mockStudents);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 700);
  }, []);

  const filtered = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === "all" || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const getProgressColor = (p) => {
    if (p >= 80) return "bg-green-500";
    if (p >= 50) return "bg-blue-500";
    if (p >= 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <span className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FaUsers className="text-white" />
            </span>
            Students
          </h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 ml-14">
            Track and manage your learners
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
              showFilters ? "bg-white/10 text-white border-white/20" : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
            }`}
          >
            <FaFilter /> Filters
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`bg-gradient-to-br ${s.bg} border ${s.border} rounded-2xl p-5`}
          >
            <div className={`text-2xl font-black ${s.color} mb-1`}>{s.value}</div>
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <s.icon className={s.color} /> {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-richblack-800 border border-richblack-700 rounded-2xl p-5 flex flex-wrap gap-3 items-center overflow-hidden"
          >
            <span className="text-xs text-slate-500 font-black uppercase tracking-widest">Status:</span>
            {["all", "active", "inactive", "completed", "at-risk"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide border transition-all ${
                  filterStatus === status
                    ? "bg-white text-richblack-900 border-white"
                    : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20"
                }`}
              >
                {status}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search */}
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search students or courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-richblack-800 border border-richblack-700 text-white rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-blue-500/50 transition-all font-medium"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Student List */}
        <div className={`${selectedStudent ? "lg:col-span-7" : "lg:col-span-12"} space-y-4 transition-all duration-500`}>
          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-richblack-800 border border-richblack-700 rounded-2xl">
              <FaUserGraduate className="text-4xl text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 font-bold">No students found</p>
            </div>
          ) : (
            filtered.map((student, i) => (
              <motion.div
                layout
                key={student.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedStudent(selectedStudent?.id === student.id ? null : student)}
                className={`bg-richblack-800 p-6 rounded-2xl border transition-all cursor-pointer group ${
                  selectedStudent?.id === student.id
                    ? "border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.08)]"
                    : "border-richblack-700 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center text-lg font-black border border-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
                    {student.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                      <h3 className="text-base font-bold text-white">{student.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border uppercase ${statusConfig[student.status].color}`}>
                          {statusConfig[student.status].label}
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{student.lastActive}</span>
                      </div>
                    </div>
                    <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">{student.course}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${student.progress}%` }}
                          transition={{ duration: 0.8, delay: i * 0.05 }}
                          className={`h-full rounded-full ${getProgressColor(student.progress)}`}
                        />
                      </div>
                      <span className="text-xs font-black text-white shrink-0">{student.progress}%</span>
                    </div>
                  </div>
                  <FaArrowRight
                    className={`text-slate-600 transition-all shrink-0 ${
                      selectedStudent?.id === student.id ? "rotate-90 text-blue-400" : "group-hover:text-white group-hover:translate-x-1"
                    }`}
                  />
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Student Detail Panel */}
        <AnimatePresence>
          {selectedStudent && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              className="lg:col-span-5"
            >
              <div className="bg-richblack-800 rounded-2xl border border-richblack-700 p-7 sticky top-8 shadow-2xl space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-blue-600/20">
                      {selectedStudent.avatar}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white">{selectedStudent.name}</h3>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Learner ID: #ST-0{selectedStudent.id}42</p>
                      <p className="text-blue-400 text-xs font-bold mt-0.5">{selectedStudent.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="text-slate-500 hover:text-white transition-colors text-lg"
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* Meta */}
                <div className="bg-richblack-900 rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">Enrolled</span>
                    <span className="text-white font-bold">{selectedStudent.enrolled}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">Course</span>
                    <span className="text-blue-400 font-bold text-right max-w-[180px] leading-tight">{selectedStudent.course}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-bold">Last Active</span>
                    <span className="text-white font-bold">{selectedStudent.lastActive}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Progress", value: `${selectedStudent.progress}%`, color: "text-blue-400" },
                    { label: "Quiz Score", value: `${selectedStudent.quizScore}%`, color: "text-green-400" },
                    { label: "Attendance", value: `${selectedStudent.attendance}%`, color: "text-orange-400" },
                  ].map((m, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-3 text-center">
                      <div className={`text-xl font-black ${m.color}`}>{m.value}</div>
                      <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                    <span>Overall Progress</span>
                    <span className="text-white">{selectedStudent.progress}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedStudent.progress}%` }}
                      transition={{ duration: 0.8 }}
                      className={`h-full rounded-full ${getProgressColor(selectedStudent.progress)}`}
                    />
                  </div>
                </div>

                {/* Completed Lessons */}
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2 mb-3">
                    <FaCheckCircle className="text-blue-400" /> Recent Activity
                  </h4>
                  <div className="space-y-2">
                    {["Introduction & Setup", "Core Concepts", "Practical Projects"].map((lesson, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl">
                        <span className="text-xs text-slate-300 font-bold">{lesson}</span>
                        <FaCheckCircle className="text-green-500 text-[10px]" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certificate */}
                {selectedStudent.progress === 100 && (
                  <div className="p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaTrophy className="text-yellow-400" />
                      <span className="text-xs text-yellow-400 font-black">Certificate Earned!</span>
                    </div>
                    <button className="text-[10px] bg-yellow-400 text-black font-black px-3 py-1.5 rounded-lg uppercase">View</button>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => toast.success(`Message sent to ${selectedStudent.name}!`)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all"
                  >
                    <FaEnvelope /> Message
                  </button>
                  <button
                    onClick={() => toast.success("Nudge sent!")}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                  >
                    <FaFire className="text-orange-400" /> Nudge
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
