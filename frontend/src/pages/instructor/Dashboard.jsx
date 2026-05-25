import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../stores/authStore";
import InstructorSidebar from "../../components/layout/InstructorSidebar";
import Card from "../../components/ui/Card";
import { Users, DollarSign, BookOpen, Star } from "lucide-react";

export default function InstructorDashboard() {
  const { user, getProfile } = useAuthStore();
  
  const stats = [
    { label: "Total Students", value: "1,248", icon: Users, color: "text-blue-400" },
    { label: "Total Revenue", value: "₹84,500", icon: DollarSign, color: "text-green-400" },
    { label: "Published Courses", value: "12", icon: BookOpen, color: "text-violet-400" },
    { label: "Avg Rating", value: "4.8", icon: Star, color: "text-yellow-400" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0A0A0F]">
      <InstructorSidebar />
      
      <main className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">
              Good Morning, Instructor!
            </h1>
            <p className="text-gray-400 mt-2">
              Here's what's happening with your courses today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03]">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
                    <div className="flex-1">
                      <p className="text-white font-medium">Student {i} enrolled in your course</p>
                      <p className="text-gray-500 text-sm">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold text-white mb-6">Top Courses</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05]" />
                    <div className="flex-1">
                      <p className="text-white font-medium">Course {i}</p>
                      <p className="text-gray-500 text-sm">{i * 100} students</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
