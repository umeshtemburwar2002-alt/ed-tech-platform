import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  PlusCircle, 
  BookOpen, 
  BarChart3, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut 
} from "lucide-react";
import { useAuthStore } from "../../stores/authStore";

const navItems = [
  { id: "create-course", label: "Create Course", icon: PlusCircle, path: "/instructor/create-course" },
  { id: "my-courses", label: "My Courses", icon: BookOpen, path: "/instructor/my-courses" },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/instructor" },
  { id: "analytics", label: "Analytics", icon: BarChart3, path: "/instructor/analytics" },
  { id: "students", label: "Students", icon: Users, path: "/instructor/students" },
  { id: "messages", label: "Messages", icon: MessageSquare, path: "/instructor/messages" },
  { id: "settings", label: "Settings", icon: Settings, path: "/instructor/settings" },
];

export default function InstructorSidebar() {
  const { signOut } = useAuthStore();

  return (
    <aside className="w-64 bg-[#0A0A0F]/90 backdrop-blur-xl border-r border-white/[0.06] flex flex-col">
      <div className="p-6 border-b border-white/[0.06]">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
          EdTech
        </h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-violet-600/10 to-cyan-600/10 border-l-3 border-violet-500 text-white"
                    : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>
      
      <div className="p-4 border-t border-white/[0.06]">
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
