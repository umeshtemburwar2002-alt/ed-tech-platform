import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

// Sample data (replace with real data from backend/Supabase)
const enrollmentData = [
  { month: "Jan", enrollments: 45 },
  { month: "Feb", enrollments: 78 },
  { month: "Mar", enrollments: 102 },
  { month: "Apr", enrollments: 89 },
  { month: "May", enrollments: 134 },
  { month: "Jun", enrollments: 165 },
];

const completionData = [
  { course: "Web Dev", completion: 78 },
  { course: "Data Science", completion: 65 },
  { course: "Mobile Dev", completion: 82 },
  { course: "Design", completion: 71 },
];

const quizData = [
  { name: "Passed", value: 85, color: "#10B981" },
  { name: "Failed", value: 15, color: "#EF4444" },
];

const students = [
  { id: 1, rollNumber: "2023CS001", name: "Rahul Sharma", progress: 85, score: 92 },
  { id: 2, rollNumber: "2023CS002", name: "Priya Patel", progress: 72, score: 88 },
  { id: 3, rollNumber: "2023CS003", name: "Amit Singh", progress: 95, score: 98 },
  { id: 4, rollNumber: "2023CS004", name: "Neha Gupta", progress: 60, score: 75 },
];

export default function Analytics() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-xl">
        <h1 className="text-3xl font-bold text-richblack-5">Course Analytics</h1>
        <p className="text-sm text-richblack-300 mt-1">
          Track your course performance, student progress, and engagement
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-xl">
          <div className="text-yellow-50 text-4xl mb-2">📚</div>
          <p className="text-3xl font-black text-richblack-5">12</p>
          <p className="text-xs text-richblack-400 font-medium uppercase">Total Courses</p>
        </div>
        <div className="bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-xl">
          <div className="text-emerald-400 text-4xl mb-2">👥</div>
          <p className="text-3xl font-black text-richblack-5">248</p>
          <p className="text-xs text-richblack-400 font-medium uppercase">Total Students</p>
        </div>
        <div className="bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-xl">
          <div className="text-blue-400 text-4xl mb-2">📈</div>
          <p className="text-3xl font-black text-richblack-5">78%</p>
          <p className="text-xs text-richblack-400 font-medium uppercase">Avg. Completion</p>
        </div>
        <div className="bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-xl">
          <div className="text-pink-400 text-4xl mb-2">⭐</div>
          <p className="text-3xl font-black text-richblack-5">4.8</p>
          <p className="text-xs text-richblack-400 font-medium uppercase">Avg. Rating</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Enrollment Over Time */}
        <div className="bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-xl">
          <h3 className="text-xl font-bold text-richblack-5 mb-6">Enrollment Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2C333F" />
              <XAxis dataKey="month" stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#171923",
                  border: "1px solid #2D3748",
                  borderRadius: "8px"
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="enrollments"
                stroke="#EAB308"
                strokeWidth={3}
                dot={{ fill: "#EAB308", r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Completion Rate by Course */}
        <div className="bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-xl">
          <h3 className="text-xl font-bold text-richblack-5 mb-6">Completion Rate by Course</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={completionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2C333F" />
              <XAxis dataKey="course" stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#171923",
                  border: "1px solid #2D3748",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="completion" fill="#6366F1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Charts Row */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Quiz Pass Rate */}
        <div className="bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-xl">
          <h3 className="text-xl font-bold text-richblack-5 mb-6">Quiz Pass Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={quizData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {quizData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#171923",
                  border: "1px solid #2D3748",
                  borderRadius: "8px"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Student Progress Table */}
        <div className="lg:col-span-2 bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-xl">
          <h3 className="text-xl font-bold text-richblack-5 mb-6">Student Progress</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-richblack-700">
                  <th className="text-left text-xs font-bold text-richblack-400 uppercase tracking-wider pb-4">
                    Roll Number
                  </th>
                  <th className="text-left text-xs font-bold text-richblack-400 uppercase tracking-wider pb-4">
                    Name
                  </th>
                  <th className="text-left text-xs font-bold text-richblack-400 uppercase tracking-wider pb-4">
                    Progress
                  </th>
                  <th className="text-left text-xs font-bold text-richblack-400 uppercase tracking-wider pb-4">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-richblack-700">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-richblack-900/30 transition-colors">
                    <td className="py-4 text-sm font-medium text-richblack-25">
                      {student.rollNumber}
                    </td>
                    <td className="py-4 text-sm font-medium text-richblack-25">
                      {student.name}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-richblack-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-yellow-50 to-yellow-200 rounded-full"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-yellow-50">
                          {student.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        student.score >= 90 ? "bg-emerald-500/20 text-emerald-400" :
                        student.score >= 75 ? "bg-yellow-50/20 text-yellow-50" :
                        "bg-rose-500/20 text-rose-400"
                      }`}>
                        {student.score}/100
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
