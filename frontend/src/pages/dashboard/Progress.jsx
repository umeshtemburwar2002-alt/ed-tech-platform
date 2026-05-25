import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRocket, FaCheckCircle, FaLock, FaClock, 
  FaPlayCircle, FaChevronRight, FaChevronDown,
  FaAward, FaProjectDiagram, FaBookOpen, FaLightbulb,
  FaHistory, FaChartLine
} from 'react-icons/fa';

const Progress = () => {
  const { user } = useSelector((state) => state.profile);
  
  // Dummy Data for Learning Path
  const pathOverview = {
    title: "Full Stack Web Development",
    description: "Become a professional developer by mastering frontend, backend, and database technologies.",
    duration: "6 Months",
    difficulty: "Beginner → Advanced",
    totalModules: 8,
    progress: 65
  };

  const modules = [
    {
      id: 1,
      title: "HTML & CSS Foundation",
      description: "Master the building blocks of the web and modern responsive design.",
      status: "completed",
      duration: "2 Weeks",
      content: ["12 Video Lessons", "5 Assignments", "1 Quiz"]
    },
    {
      id: 2,
      title: "JavaScript Essentials",
      description: "Learn core logic, DOM manipulation, and modern ES6+ features.",
      status: "completed",
      duration: "3 Weeks",
      content: ["18 Video Lessons", "8 Assignments", "2 Quizzes"]
    },
    {
      id: 3,
      title: "React.js Mastery",
      description: "Build dynamic, high-performance user interfaces with React.",
      status: "in-progress",
      duration: "4 Weeks",
      content: ["24 Video Lessons", "10 Assignments", "Project: Dashboard"]
    },
    {
      id: 4,
      title: "Node.js & Express",
      description: "Create robust backend APIs and handle server-side logic.",
      status: "locked",
      duration: "3 Weeks",
      content: ["15 Video Lessons", "6 Assignments", "1 Quiz"]
    },
    {
      id: 5,
      title: "Database Management (MongoDB)",
      description: "Understand NoSQL databases and data modeling.",
      status: "locked",
      duration: "2 Weeks",
      content: ["10 Video Lessons", "4 Assignments", "1 Quiz"]
    }
  ];

  const projects = [
    { id: 1, title: "Portfolio Website", status: "completed", module: "HTML & CSS" },
    { id: 2, title: "Interactive Quiz App", status: "completed", module: "JavaScript" },
    { id: 3, title: "E-commerce Dashboard", status: "in-progress", module: "React.js" },
    { id: 4, title: "Social Media API", status: "locked", module: "Node.js" },
  ];

  const badges = [
    { id: 1, title: "Frontend Beginner", icon: "🎨", earned: true },
    { id: 2, title: "JavaScript Master", icon: "⚡", earned: true },
    { id: 3, title: "React Ninja", icon: "⚛️", earned: false },
    { id: 4, title: "FullStack Wizard", icon: "🧙‍♂️", earned: false },
  ];

  const activeModule = modules.find(m => m.status === 'in-progress');

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <FaCheckCircle className="text-green-400" />;
      case 'in-progress': return <FaPlayCircle className="text-cyan-400 animate-pulse" />;
      case 'locked': return <FaLock className="text-slate-600" />;
      default: return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
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
      className="max-w-6xl mx-auto p-4 md:p-8 space-y-10 text-white"
    >
      {/* 1. PATH OVERVIEW & PROGRESS */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-richblack-800 rounded-3xl p-8 border border-richblack-700 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <FaRocket className="text-9xl rotate-12" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-cyan-500/20 text-cyan-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-cyan-500/30">
                Active Path
              </span>
              <span className="text-slate-500 text-sm font-bold">• {pathOverview.totalModules} Modules</span>
            </div>
            <h1 className="text-4xl font-black mb-4 tracking-tight">{pathOverview.title}</h1>
            <p className="text-slate-400 font-medium mb-8 max-w-xl leading-relaxed">
              {pathOverview.description}
            </p>
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-cyan-400 border border-white/10">
                  <FaClock />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Duration</p>
                  <p className="font-bold">{pathOverview.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-cyan-400 border border-white/10">
                  <FaChartLine />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Difficulty</p>
                  <p className="font-bold">{pathOverview.difficulty}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-richblack-800 rounded-3xl p-8 border border-richblack-700 shadow-xl flex flex-col justify-center items-center text-center">
          <div className="relative w-40 h-40 mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-white/5"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={440}
                strokeDashoffset={440 - (440 * pathOverview.progress) / 100}
                className="text-cyan-500 transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black">{pathOverview.progress}%</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Completed</span>
            </div>
          </div>
          <div className="w-full space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
              <span className="text-slate-500">Progress</span>
              <span className="text-cyan-400">{modules.filter(m => m.status === 'completed').length} / {pathOverview.totalModules} Modules</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${pathOverview.progress}%` }}
                className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(0,180,216,0.5)]"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. NEXT STEP SUGGESTION */}
      {activeModule && (
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl p-6 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-cyan-500/30">
              <FaPlayCircle />
            </div>
            <div>
              <p className="text-[10px] text-cyan-400 font-black uppercase tracking-[0.2em] mb-1">Continue Learning</p>
              <h3 className="text-xl font-bold">{activeModule.title}</h3>
            </div>
          </div>
          <button className="btn-primary py-3 px-8 shadow-lg shadow-cyan-500/20 flex items-center gap-2">
            Resume Module <FaChevronRight className="text-xs" />
          </button>
        </motion.div>
      )}

      {/* 3. STEP-BY-STEP MODULES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-10">
        <div className="lg:col-span-2 space-y-12 relative">
          {/* Vertical Line for Timeline */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-slate-800 to-transparent"></div>

          {modules.map((module, index) => (
            <motion.div 
              key={module.id}
              variants={itemVariants}
              className={`relative pl-16 group ${module.status === 'locked' ? 'opacity-50' : ''}`}
            >
              {/* Timeline Node */}
              <div className={`absolute left-0 w-12 h-12 rounded-2xl flex items-center justify-center z-10 transition-all duration-500 shadow-xl ${
                module.status === 'completed' ? 'bg-green-500 text-white' : 
                module.status === 'in-progress' ? 'bg-cyan-500 text-white shadow-cyan-500/50 scale-110' : 
                'bg-richblack-800 text-slate-600 border border-richblack-700'
              }`}>
                {getStatusIcon(module.status)}
              </div>

              <div className={`bg-richblack-800 rounded-3xl p-6 md:p-8 border transition-all duration-500 ${
                module.status === 'in-progress' ? 'border-cyan-500/50 shadow-2xl shadow-cyan-500/10' : 'border-richblack-700 group-hover:border-white/10'
              }`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">{module.title}</h3>
                    <p className="text-slate-400 text-sm mt-1">{module.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                    <FaClock className="text-cyan-500" /> {module.duration}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {module.content.map((item, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-3 flex items-center gap-3 border border-white/5">
                      <div className="w-2 h-2 rounded-full bg-cyan-500/50"></div>
                      <span className="text-xs text-slate-300 font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                {module.status !== 'locked' && (
                  <button className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                    module.status === 'completed' ? 'bg-white/5 text-slate-300 hover:bg-white/10' : 'bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg shadow-cyan-500/20'
                  }`}>
                    {module.status === 'completed' ? 'Review Module' : 'Start Module'}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4. PROJECTS & ACHIEVEMENTS */}
        <div className="space-y-12">
          {/* Projects Section */}
          <motion.div variants={itemVariants} className="bg-richblack-800 rounded-3xl p-8 border border-richblack-700 shadow-xl">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
              <FaProjectDiagram className="text-pink-500" /> Milestone Projects
            </h2>
            <div className="space-y-4">
              {projects.map(project => (
                <div key={project.id} className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{project.module}</span>
                    {getStatusIcon(project.status)}
                  </div>
                  <h4 className="font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{project.title}</h4>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements Section */}
          <motion.div variants={itemVariants} className="bg-richblack-800 rounded-3xl p-8 border border-richblack-700 shadow-xl">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
              <FaAward className="text-yellow-400" /> Achievements
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {badges.map(badge => (
                <div 
                  key={badge.id} 
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
                    badge.earned ? 'bg-yellow-500/10 border-yellow-500/20 grayscale-0' : 'bg-white/5 border-white/5 grayscale opacity-40'
                  }`}
                >
                  <span className="text-3xl mb-3">{badge.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-tight text-center">{badge.title}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-6 rounded-2xl border border-indigo-500/30 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <FaLock className="mx-auto mb-4 text-slate-500 text-2xl" />
                <h4 className="font-bold text-sm mb-1">Path Certificate</h4>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Unlock at 100%</p>
              </div>
            </div>
          </motion.div>

          {/* Tips Section */}
          <motion.div variants={itemVariants} className="bg-cyan-500/10 rounded-3xl p-8 border border-cyan-500/20">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
              <FaLightbulb className="text-yellow-400" /> Pro Tip
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed italic">
              "Consistency is key. Spend at least 30 minutes every day coding to keep your streak alive and your skills sharp!"
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Progress;
