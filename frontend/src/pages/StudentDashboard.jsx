import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBook,
  FaTrophy,
  FaClock,
  FaFire,
  FaChartLine,
  FaPlayCircle,
  FaCheckCircle,
  FaArrowRight,
  FaGraduationCap,
  FaHistory,
  FaMedal,
  FaAward,
  FaBullseye,
  FaBell,
  FaStar,
  FaChevronRight,
  FaChevronLeft,
  FaPlusCircle
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(true);

  // Mock data for the dashboard
  const stats = {
    enrolledCourses: 12,
    completedCourses: 4,
    overallProgress: 68,
    activeStreak: 7,
    studyHours: 124,
    lessonsCompleted: 86
  };

  const lastActivity = {
    courseName: "Full-Stack Web Development",
    lessonName: "Introduction to React Hooks",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    progress: 45
  };

  const myCourses = [
    { id: 1, title: "Modern JavaScript Masterclass", progress: 85, thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "Python for Data Science", progress: 32, thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "UI/UX Design Essentials", progress: 64, thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  ];

  const recommendedCourses = [
    { id: 101, title: "Advanced React Patterns", rating: 4.9, students: "2.4k", thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 102, title: "Node.js Backend Mastery", rating: 4.8, students: "1.8k", thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { id: 103, title: "AWS Cloud Practitioner", rating: 4.7, students: "3.2k", thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  ];

  const notifications = [
    { id: 1, title: "New Assignment", desc: "React hooks quiz is live", time: "2h ago" },
    { id: 2, title: "Course Updated", desc: "3 new lessons in Node.js", time: "5h ago" },
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8 pb-10"
    >
      {/* 1. TOP SECTION (WELCOME + QUICK STATS) */}
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              Welcome back, <span className="text-cyan-400">{user?.firstName || "Student"}!</span>
            </h1>
            <p className="mt-2 text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
              Ready to continue your learning journey today?
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Enrolled Courses", value: stats.enrolledCourses, icon: FaGraduationCap, color: "text-cyan-400", bg: "bg-cyan-500/10" },
            { label: "Completed", value: stats.completedCourses, icon: FaCheckCircle, color: "text-green-400", bg: "bg-green-500/10" },
            { label: "Learning Streak", value: `${stats.activeStreak} Days`, icon: FaFire, color: "text-orange-400", bg: "bg-orange-500/10" },
            { label: "Study Hours", value: `${stats.studyHours}h`, icon: FaClock, color: "text-purple-400", bg: "bg-purple-500/10" }
          ].map((stat, i) => (
            <div key={i} className="bg-richblack-800 rounded-3xl p-6 border border-richblack-700 flex items-center gap-4 group hover:border-white/20 transition-all shadow-xl">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center text-xl shadow-lg border border-white/5 group-hover:scale-110 transition-transform`}>
                <stat.icon />
              </div>
              <div>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-xl font-black mt-1 text-white">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 2. MAIN GRID (MIDDLE + RIGHT PANEL) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* MIDDLE SECTION (LEFT SIDE - 8/12 cols) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* A. CONTINUE LEARNING (PRIORITY) */}
          <section className="space-y-6">
            <h2 className="text-xl font-black text-white flex items-center gap-3">
              <span className="w-1.5 h-6 bg-cyan-500 rounded-full"></span>
              Continue Learning
            </h2>
            <div className="bg-richblack-800 rounded-3xl p-6 md:p-8 border border-richblack-700 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <FaPlayCircle className="text-9xl rotate-12" />
              </div>
              <div className="flex flex-col md:flex-row gap-8 relative z-10">
                <div className="w-full md:w-64 h-40 rounded-2xl overflow-hidden shadow-2xl shrink-0 border border-white/10">
                  <img src={lastActivity.thumbnail} alt="course" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-cyan-500/30">
                        In Progress
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-tight">{lastActivity.courseName}</h3>
                    <p className="text-slate-400 text-sm font-bold">Next: {lastActivity.lessonName}</p>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                      <span>Overall Progress</span>
                      <span className="text-cyan-400">{lastActivity.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${lastActivity.progress}%` }}
                        className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(0,180,216,0.5)]"
                      />
                    </div>
                    <button className="btn-primary w-full py-4 flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/20 text-xs font-black uppercase tracking-widest">
                      Continue <FaArrowRight className="text-[10px]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* B. MY COURSES PREVIEW */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-white flex items-center gap-3">
                <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
                My Courses
              </h2>
              <button className="text-[10px] font-black text-cyan-500 hover:text-cyan-400 tracking-widest uppercase">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {myCourses.map((course) => (
                <div key={course.id} className="bg-richblack-800 rounded-3xl p-5 border border-richblack-700 shadow-xl group hover:border-white/10 transition-all">
                  <div className="h-32 rounded-2xl overflow-hidden mb-4 border border-white/5">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h4 className="font-bold text-white text-sm mb-4 leading-tight h-10 line-clamp-2">{course.title}</h4>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-[8px] font-black text-slate-500 uppercase tracking-widest">
                      <span>Progress</span>
                      <span className="text-cyan-400">{course.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                  <button className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-center text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-slate-300">
                    Continue
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* C. RECOMMENDED COURSES (Horizontal Scroll) */}
          <section className="space-y-6">
            <h2 className="text-xl font-black text-white flex items-center gap-3">
              <span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
              Recommended for You 🔥
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar">
              {recommendedCourses.map((course) => (
                <div key={course.id} className="min-w-[280px] bg-richblack-800 rounded-3xl p-5 border border-richblack-700 shadow-xl group">
                  <div className="h-36 rounded-2xl overflow-hidden mb-4 relative">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-yellow-400 text-[10px] font-black flex items-center gap-1">
                      <FaStar /> {course.rating}
                    </div>
                  </div>
                  <h4 className="font-bold text-white text-sm mb-2">{course.title}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{course.students} students</span>
                    <button className="w-8 h-8 rounded-lg bg-cyan-500 text-white flex items-center justify-center shadow-lg shadow-cyan-500/20 hover:scale-110 transition-transform">
                      <FaPlusCircle className="text-xs" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT PANEL (3/12 cols) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* A. PROGRESS TRACKER */}
          <div className="bg-richblack-800 rounded-3xl p-8 border border-richblack-700 shadow-xl">
            <h3 className="text-lg font-black text-white mb-8 flex items-center gap-3">
              <FaChartLine className="text-cyan-400" /> Progress Tracker
            </h3>
            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-white/5" />
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" 
                  strokeDasharray={440} 
                  strokeDashoffset={440 - (440 * stats.overallProgress) / 100} 
                  strokeLinecap="round"
                  className="text-cyan-500 shadow-[0_0_10px_rgba(0,180,216,0.6)]" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-white">{stats.overallProgress}%</span>
                <span className="text-[8px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Overall</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Finished</p>
                <p className="text-xl font-black text-green-400">{stats.lessonsCompleted}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Pending</p>
                <p className="text-xl font-black text-orange-400">24</p>
              </div>
            </div>
          </div>

          {/* B. DAILY GOAL */}
          <div className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-3xl p-8 border border-indigo-500/20 shadow-xl">
            <h3 className="text-lg font-black text-white mb-6 flex items-center gap-3">
              <FaBullseye className="text-indigo-400" /> Daily Goal
            </h3>
            <p className="text-sm font-bold text-slate-300 mb-4">Complete 2 lessons today</p>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-3">
              <div className="h-full w-1/2 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
            </div>
            <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <span>Progress</span>
              <span>1 / 2 Lessons</span>
            </div>
          </div>

          {/* C. ACHIEVEMENTS */}
          <div className="bg-richblack-800 rounded-3xl p-8 border border-richblack-700 shadow-xl">
            <h3 className="text-lg font-black text-white mb-8 flex items-center gap-3">
              <FaMedal className="text-yellow-400" /> Achievements
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: FaFire, color: "text-orange-400", bg: "bg-orange-500/10" },
                { icon: FaAward, color: "text-purple-400", bg: "bg-purple-500/10" },
                { icon: FaMedal, color: "text-yellow-400", bg: "bg-yellow-500/10" }
              ].map((badge, i) => (
                <div key={i} className={`w-full aspect-square ${badge.bg} ${badge.color} rounded-2xl flex items-center justify-center text-2xl border border-white/5 shadow-lg`}>
                  <badge.icon />
                </div>
              ))}
            </div>
            <div className="p-5 bg-white/5 rounded-2xl border border-white/5 text-center group cursor-pointer hover:bg-white/10 transition-all">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Next Badge</p>
              <h4 className="text-sm font-bold text-white mb-2">Centurion</h4>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[80%] bg-cyan-500" />
              </div>
            </div>
          </div>

          {/* D. NOTIFICATIONS PREVIEW */}
          <div className="bg-richblack-800 rounded-3xl p-8 border border-richblack-700 shadow-xl">
            <h3 className="text-lg font-black text-white mb-6 flex items-center gap-3">
              <FaBell className="text-cyan-400" /> Recent Updates
            </h3>
            <div className="space-y-4">
              {notifications.map((n) => (
                <div key={n.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{n.title}</h4>
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-tight">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{n.desc}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-slate-400">
              View All Notifications
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
