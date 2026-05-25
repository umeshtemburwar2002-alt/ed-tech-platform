import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaHome, 
  FaBook, 
  FaPlus, 
  FaUsers, 
  FaChartLine, 
  FaComments, 
  FaTrophy, 
  FaQuestionCircle, 
  FaChevronDown, 
  FaChevronRight, 
  FaBars, 
  FaTimes, 
  FaGraduationCap,
  FaVideo,
  FaFileAlt,
  FaTasks,
  FaBullhorn
} from "react-icons/fa";

const sidebarLinks = [
  { id: "dashboard", label: "Dashboard", icon: FaHome, path: "/dashboard/instructor" },
  { id: "my-courses", label: "My Courses", icon: FaBook, path: "/dashboard/instructor/my-courses" },
  { id: "create-course", label: "Create Course", icon: FaPlus, path: "/dashboard/instructor/add-course" },
  { id: "quizzes", label: "Quizzes", icon: FaTasks, path: "/dashboard/instructor/quizzes" },
  { id: "notes", label: "Notes", icon: FaFileAlt, path: "/dashboard/instructor/notes" },
  { id: "live-classes", label: "Live Classes", icon: FaVideo, path: "/dashboard/instructor/live-classes" },
  { id: "marketing", label: "Marketing", icon: FaBullhorn, path: "/dashboard/instructor/marketing" },
  { id: "students", label: "Students", icon: FaUsers, path: "/dashboard/instructor/students" },
  { id: "messages", label: "Messages", icon: FaComments, path: "/dashboard/instructor/messages" },
  { id: "analytics", label: "Reports", icon: FaChartLine, path: "/dashboard/instructor/analytics" },
  { id: "feedback", label: "Feedback", icon: FaComments, path: "/dashboard/instructor/feedback" },
  { id: "certificates", label: "Certificates", icon: FaTrophy, path: "/dashboard/instructor/certificates" },
  { id: "support", label: "Help & Support", icon: FaQuestionCircle, path: "/dashboard/instructor/support" },
];

export default function InstructorSidebar() {
  const { user } = useSelector((state) => state.profile);
  const [isOpen, setIsOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const dropdownVariants = {
    closed: { 
      maxHeight: 0, 
      opacity: 0, 
      y: -8,
      scaleY: 0.95,
      transition: { 
        duration: 0.18, 
        ease: "easeInOut", 
        when: "afterChildren" 
      } 
    },
    open: { 
      maxHeight: "200px", 
      opacity: 1, 
      y: 0,
      scaleY: 1,
      transition: { 
        duration: 0.18, 
        ease: "easeOut", 
        staggerChildren: 0.05, 
        when: "beforeChildren" 
      } 
    }
  };

  const subItemVariants = {
    closed: { x: -8, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-[110] w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-2xl flex items-center justify-center text-xl border border-blue-400/50"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar Container */}
      <motion.aside
        initial={{ scale: 1.02, opacity: 0 }}
        animate={{ 
          width: isOpen ? "280px" : "0px",
          x: isOpen ? 0 : -280,
          scale: 1,
          opacity: 1
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed lg:relative z-[100] h-full flex flex-col overflow-hidden transition-all duration-300 lg:translate-x-0 shrink-0 border-r border-white/10`}
      >
        {/* Background Image with Overlay and Blur */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Sidebar Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80 backdrop-blur-[8px]" />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col h-full bg-black/40">
          {/* Header/Logo */}
          <div className="relative p-8 border-b border-white/10 overflow-hidden group/header">
            <div className="absolute inset-0 z-0 opacity-10 group-hover/header:opacity-30 transition-opacity duration-500">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Header BG" className="w-full h-full object-cover" />
            </div>
            <Link to="/" className="relative z-10 flex items-center gap-3 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform">
                <FaGraduationCap className="text-white text-xl" />
              </div>
              <div className="overflow-hidden whitespace-nowrap">
                <h1 className="text-xl font-bold tracking-tight text-white">Aslam <span className="text-blue-400">Education</span></h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Instructor Portal</p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
            {sidebarLinks.map((link) => (
              <div 
                key={link.id} 
                className="space-y-1"
                onMouseEnter={() => {
                  if (link.subItems) {
                    setOpenDropdown(link.id);
                  }
                }}
                onMouseLeave={() => {
                  if (link.subItems) {
                    setOpenDropdown(null);
                  }
                }}
              >
                {link.subItems ? (
                  <button
                    onClick={() => toggleDropdown(link.id)}
                    className={`w-full group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 ${
                      openDropdown === link.id
                        ? "bg-blue-600/20 text-blue-400 border border-blue-600/30"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <link.icon className="text-lg" />
                      <span className="text-sm font-bold tracking-wide whitespace-nowrap">{link.label}</span>
                    </div>
                    <FaChevronDown className={`text-[10px] transition-all duration-300 ${
                      openDropdown === link.id ? "rotate-180 text-blue-400" : "text-slate-500"
                    }`} />
                  </button>
                ) : (
                  <NavLink
                    to={link.path}
                    onClick={() => setOpenDropdown(null)}
                    className={({ isActive }) => `w-full group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-blue-600/20 text-blue-400 border border-blue-600/30 shadow-[0_0_20px_rgba(37,99,235,0.1)]"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <link.icon className="text-lg" />
                      <span className="text-sm font-bold tracking-wide whitespace-nowrap">{link.label}</span>
                    </div>
                    <FaChevronRight className={`text-[8px] transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-1`} />
                  </NavLink>
                )}

                {/* Sub-items */}
                <AnimatePresence initial={false}>
                  {link.subItems && openDropdown === link.id && (
                    <motion.div
                      key={link.id}
                      variants={dropdownVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      style={{ transformOrigin: "top", willChange: "transform, opacity", transform: "translateZ(0)" }}
                      className="overflow-hidden flex flex-col pl-11 space-y-1"
                    >
                      {link.subItems.map((sub) => (
                        <NavLink
                          key={sub.id}
                          to={sub.path}
                          className={({ isActive }) => `w-full text-left py-2 px-4 rounded-lg text-xs font-bold transition-all duration-300 border-l-2 ${
                            isActive
                              ? "text-blue-400 border-blue-500 bg-blue-600/5"
                              : "text-slate-500 border-transparent hover:text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          <motion.span variants={subItemVariants}>{sub.label}</motion.span>
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

        </div>
      </motion.aside>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </>
  );
}
