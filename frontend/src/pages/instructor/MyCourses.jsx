import React, { useState } from "react";
import { motion } from "framer-motion";
import InstructorSidebar from "../../components/layout/InstructorSidebar";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { Edit2, Trash2, Users, DollarSign, Star } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    category: "Development",
    status: "published",
    students: 1248,
    revenue: 84500,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop"
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    category: "Development",
    status: "published",
    students: 542,
    revenue: 32500,
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop"
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    category: "Design",
    status: "draft",
    students: 0,
    revenue: 0,
    rating: null,
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop"
  }
];

export default function MyCourses() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="flex min-h-screen bg-[#0A0A0F]">
      <InstructorSidebar />
      
      <main className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">My Courses</h1>
              <p className="text-gray-400 mt-2">Manage your courses</p>
            </div>
            <div className="flex gap-3">
              <Button variant={filter === "all" ? "primary" : "ghost"} onClick={() => setFilter("all")}>
                All
              </Button>
              <Button variant={filter === "published" ? "primary" : "ghost"} onClick={() => setFilter("published")}>
                Published
              </Button>
              <Button variant={filter === "draft" ? "primary" : "ghost"} onClick={() => setFilter("draft")}>
                Draft
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                      course.status === "published"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {course.status}
                    </span>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 rounded-lg bg-violet-500/10 text-violet-400 text-xs font-medium">
                        {course.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-4 line-clamp-2">
                      {course.title}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {course.students}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          ₹{course.revenue.toLocaleString()}
                        </div>
                        {course.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            {course.rating}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button variant="ghost" className="flex-1">
                        <Edit2 className="w-4 h-4 mr-2" /> Edit
                      </Button>
                      <Button variant="danger" className="flex-1">
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
