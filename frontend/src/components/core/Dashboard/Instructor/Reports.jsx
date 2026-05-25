import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChartBar, FaDownload, FaFilter, FaUsers, FaDollarSign,
  FaCheckCircle, FaStar, FaArrowUp, FaArrowDown, FaBook,
  FaCalendarAlt, FaChartLine, FaFire, FaTrophy
} from "react-icons/fa";
import { toast } from "react-hot-toast";

const REPORTS = [
  { id: 1, course: "Modern JavaScript Masterclass", students: 142, completions: 89, revenue: 84900, rating: 4.8, completion: 63, trend: "+12%" },
  { id: 2, course: "React Development Bootcamp", students: 98, completions: 42, revenue: 58800, rating: 4.6, completion: 43, trend: "+8%" },
  { id: 3, course: "Node.js Backend Mastery", students: 76, completions: 31, revenue: 45600, rating: 4.4, completion: 41, trend: "+5%" },
  { id: 4, course: "UI/UX Design Essentials", students: 61, completions: 55, revenue: 36600, rating: 4.9, completion: 90, trend: "+18%" },
  { id: 5, course: "Full Stack MERN 2026", students: 34, completions: 10, revenue: 30600, rating: 4.7, completion: 29, trend: "+3%" },
];

const MONTHLY = [
  { month: "Nov", revenue: 28000, students: 38 },
  { month: "Dec", revenue: 42000, students: 61 },
  { month: "Jan", revenue: 65000, students: 95 },
  { month: "Feb", revenue: 58000, students: 84 },
  { month: "Mar", revenue: 78000, students: 121 },
  { month: "Apr", revenue: 92000, students: 149 },
];

const MAXREV = Math.max(...MONTHLY.map((m) => m.revenue));
const MAXSTU = Math.max(...MONTHLY.map((m) => m.students));

const statCards = [
  { label: "Total Students", value: "411", sub: "+23% this month", icon: FaUsers, color: "text-blue-400", bg: "from-blue-500/10 to-blue-600/10", border: "border-blue-500/20", positive: true },
  { label: "Total Revenue", value: "₹2.56L", sub: "+18% this month", icon: FaDollarSign, color: "text-green-400", bg: "from-green-500/10 to-green-600/10", border: "border-green-500/20", positive: true },
  { label: "Completions", value: "227", sub: "55% completion rate", icon: FaCheckCircle, color: "text-purple-400", bg: "from-purple-500/10 to-purple-600/10", border: "border-purple-500/20", positive: true },
  { label: "Avg Rating", value: "4.68", sub: "Across all courses", icon: FaStar, color: "text-yellow-400", bg: "from-yellow-500/10 to-yellow-600/10", border: "border-yellow-500/20", positive: true },
];

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [sortBy, setSortBy] = useState("revenue");

  useEffect(() => {
    setTimeout(() => setLoading(false), 700);
  }, []);

  const sorted = [...REPORTS].sort((a, b) => b[sortBy] - a[sortBy]);

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
            <span className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <FaChartBar className="text-white" />
            </span>
            Reports Center
          </h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 ml-14">
            Insights to grow your teaching impact
          </p>
        </div>
        <button
          onClick={() => toast.success("Report exported as CSV!")}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-xl text-sm font-bold transition-all"
        >
          <FaDownload className="text-indigo-400" /> Export Report
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`bg-gradient-to-br ${s.bg} border ${s.border} rounded-2xl p-5`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <s.icon className={`${s.color} text-lg mt-1`} />
            </div>
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{s.label}</div>
            <div className={`text-[10px] font-black flex items-center gap-1 ${s.positive ? "text-green-400" : "text-red-400"}`}>
              {s.positive ? <FaArrowUp /> : <FaArrowDown />} {s.sub}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-richblack-800 border border-richblack-700 rounded-2xl p-1 w-fit">
        {["overview", "courses", "revenue"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === tab ? "bg-white text-richblack-900" : "text-slate-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Bar Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <div className="bg-richblack-800 border border-richblack-700 rounded-2xl p-6">
                <h3 className="text-white font-black mb-6 flex items-center gap-2">
                  <FaDollarSign className="text-green-400" /> Monthly Revenue
                </h3>
                <div className="flex items-end gap-3 h-40">
                  {MONTHLY.map((m, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(m.revenue / MAXREV) * 100}%` }}
                        transition={{ duration: 0.8, delay: i * 0.08 }}
                        className="w-full bg-gradient-to-t from-green-600 to-emerald-400 rounded-t-lg min-h-[4px] relative group cursor-pointer"
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-richblack-900 border border-richblack-700 text-white text-[10px] font-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          ₹{(m.revenue / 1000).toFixed(0)}K
                        </div>
                      </motion.div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase">{m.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Students Chart */}
              <div className="bg-richblack-800 border border-richblack-700 rounded-2xl p-6">
                <h3 className="text-white font-black mb-6 flex items-center gap-2">
                  <FaUsers className="text-blue-400" /> Monthly Enrollments
                </h3>
                <div className="flex items-end gap-3 h-40">
                  {MONTHLY.map((m, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(m.students / MAXSTU) * 100}%` }}
                        transition={{ duration: 0.8, delay: i * 0.08 }}
                        className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-lg min-h-[4px] relative group cursor-pointer"
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-richblack-900 border border-richblack-700 text-white text-[10px] font-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {m.students}
                        </div>
                      </motion.div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase">{m.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-richblack-800 border border-richblack-700 rounded-2xl p-6">
              <h3 className="text-white font-black mb-4 flex items-center gap-2">
                <FaTrophy className="text-yellow-400" /> Top Performing Courses
              </h3>
              <div className="space-y-4">
                {REPORTS.slice(0, 3).map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm ${
                      i === 0 ? "bg-yellow-400/20 text-yellow-400" :
                      i === 1 ? "bg-slate-400/20 text-slate-400" :
                      "bg-amber-700/20 text-amber-700"
                    }`}>
                      #{i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-bold text-sm mb-1 truncate">{c.course}</div>
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${c.completion}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        />
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-white font-black text-sm">₹{(c.revenue / 1000).toFixed(0)}K</div>
                      <div className="text-green-400 text-[10px] font-bold">{c.trend}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* COURSES */}
        {activeTab === "courses" && (
          <motion.div
            key="courses"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs text-slate-500 font-black uppercase tracking-widest">Sort by:</span>
              {["revenue", "students", "completion", "rating"].map((key) => (
                <button
                  key={key}
                  onClick={() => setSortBy(key)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide border transition-all ${
                    sortBy === key
                      ? "bg-white text-richblack-900 border-white"
                      : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
            <div className="bg-richblack-800 border border-richblack-700 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-richblack-700">
                      {["Course", "Students", "Completions", "Completion %", "Revenue", "Rating", "Trend"].map((h) => (
                        <th key={h} className="text-left p-4 text-[10px] text-slate-500 font-black uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map((c, i) => (
                      <motion.tr
                        key={c.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.06 }}
                        className="border-b border-richblack-700/50 hover:bg-white/5 transition-all"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                              <FaBook className="text-indigo-400 text-xs" />
                            </div>
                            <span className="text-white font-bold text-sm">{c.course}</span>
                          </div>
                        </td>
                        <td className="p-4 text-slate-300 font-bold text-sm">{c.students}</td>
                        <td className="p-4 text-slate-300 font-bold text-sm">{c.completions}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-indigo-500 rounded-full"
                                style={{ width: `${c.completion}%` }}
                              />
                            </div>
                            <span className="text-white text-xs font-black">{c.completion}%</span>
                          </div>
                        </td>
                        <td className="p-4 text-green-400 font-black text-sm">₹{(c.revenue / 1000).toFixed(1)}K</td>
                        <td className="p-4">
                          <span className="text-yellow-400 font-black text-sm flex items-center gap-1">
                            <FaStar className="text-[10px]" /> {c.rating}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-green-400 font-black text-xs flex items-center gap-1">
                            <FaArrowUp className="text-[8px]" /> {c.trend}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* REVENUE */}
        {activeTab === "revenue" && (
          <motion.div
            key="revenue"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Revenue Breakdown */}
              <div className="bg-richblack-800 border border-richblack-700 rounded-2xl p-6">
                <h3 className="text-white font-black mb-6">Revenue by Course</h3>
                <div className="space-y-4">
                  {REPORTS.map((c, i) => {
                    const totalRev = REPORTS.reduce((a, b) => a + b.revenue, 0);
                    const pct = Math.round((c.revenue / totalRev) * 100);
                    return (
                      <div key={i}>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-slate-400 truncate max-w-[200px]">{c.course}</span>
                          <span className="text-white shrink-0">₹{(c.revenue / 1000).toFixed(0)}K ({pct}%)</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className={`h-full rounded-full ${
                              ["bg-indigo-500", "bg-blue-500", "bg-cyan-500", "bg-teal-500", "bg-green-500"][i]
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Revenue Stats */}
              <div className="space-y-4">
                {[
                  { label: "Total Earnings (All Time)", value: "₹2,56,500", icon: FaDollarSign, color: "text-green-400" },
                  { label: "This Month", value: "₹92,000", icon: FaCalendarAlt, color: "text-blue-400" },
                  { label: "Avg Per Course", value: "₹51,300", icon: FaChartLine, color: "text-purple-400" },
                  { label: "Pending Payout", value: "₹18,200", icon: FaFire, color: "text-orange-400" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-richblack-800 border border-richblack-700 rounded-2xl p-5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`text-xl ${item.color}`} />
                      <span className="text-slate-400 text-sm font-bold">{item.label}</span>
                    </div>
                    <span className={`text-xl font-black ${item.color}`}>{item.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
