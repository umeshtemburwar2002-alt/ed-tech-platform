import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from "recharts";
import { BarChart2, TrendingUp, Eye, Clock, Users, Activity } from "lucide-react";

const ENROLLMENT_DATA = [
  { month: "Jan", students: 42 }, { month: "Feb", students: 68 },
  { month: "Mar", students: 55 }, { month: "Apr", students: 91 },
  { month: "May", students: 124 },{ month: "Jun", students: 87 },
  { month: "Jul", students: 110 },{ month: "Aug", students: 98 },
  { month: "Sep", students: 143 },{ month: "Oct", students: 167 },
  { month: "Nov", students: 189 },{ month: "Dec", students: 205 },
];

const COMPLETION_BY_COURSE = [
  { name: "React.js",       completion: 78 },
  { name: "Python DS",      completion: 64 },
  { name: "Node.js",        completion: 82 },
  { name: "UI/UX Design",   completion: 55 },
  { name: "ML A-Z",         completion: 43 },
];

const WATCH_TIME = [
  { day: "Mon", hours: 4.2 }, { day: "Tue", hours: 6.8 },
  { day: "Wed", hours: 5.5 }, { day: "Thu", hours: 8.1 },
  { day: "Fri", hours: 7.3 }, { day: "Sat", hours: 9.6 },
  { day: "Sun", hours: 3.9 },
];

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d1117] border border-white/10 rounded-xl px-4 py-3">
      <p className="text-xs font-bold text-slate-400 mb-1">{label}</p>
      {payload.map((p) => <p key={p.name} className="text-xs font-semibold" style={{ color: p.color }}>{p.name}: {p.value}</p>)}
    </div>
  );
};

export default function Analytics() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black text-white">Course Analytics</h1>
        <p className="text-sm text-slate-500 mt-0.5">Watch time, completion rates, enrollments and engagement</p>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { icon: Users,     label: "Total Students",   value: "1,379", sub: "+18% vs last month",  color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
          { icon: Eye,       label: "Total Views",      value: "28.4K", sub: "All lectures",         color: "text-cyan-400",   bg: "bg-cyan-500/10 border-cyan-500/20" },
          { icon: Clock,     label: "Avg Watch Time",   value: "6.2h",  sub: "Per enrolled student", color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/20" },
          { icon: Activity,  label: "Engagement Score", value: "74%",   sub: "Active learners",      color: "text-emerald-400",bg: "bg-emerald-500/10 border-emerald-500/20" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`p-4 rounded-2xl border ${s.bg} flex items-center gap-3`}>
            <s.icon className={`w-8 h-8 ${s.color}`} />
            <div>
              <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-[10px] text-slate-500 leading-tight">{s.label}<br/><span className="text-[9px]">{s.sub}</span></p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Enrollments */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
          <h2 className="text-sm font-black text-white mb-4">Monthly Enrollments</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ENROLLMENT_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="students" name="Students" radius={[4,4,0,0]}>
                {ENROLLMENT_DATA.map((_, i) => <Cell key={i} fill={`hsl(${250 + i * 5}, 80%, ${55 + i}%)`} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Watch Time */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
          <h2 className="text-sm font-black text-white mb-4">Daily Watch Time (hrs)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={WATCH_TIME} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<Tip />} />
              <Line type="monotone" dataKey="hours" name="Hours" stroke="#06b6d4" strokeWidth={2} dot={{ fill: "#06b6d4", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Completion by course */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
        <h2 className="text-sm font-black text-white mb-5">Completion Rate by Course</h2>
        <div className="space-y-4">
          {COMPLETION_BY_COURSE.map((c, i) => (
            <div key={c.name} className="flex items-center gap-4">
              <p className="text-xs font-semibold text-slate-300 w-24 shrink-0">{c.name}</p>
              <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${c.completion}%` }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.7 }}
                  className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full" />
              </div>
              <p className="text-xs font-black text-white w-10 text-right">{c.completion}%</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Drop-off funnel stub */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
        <h2 className="text-sm font-black text-white mb-5">Drop-off Funnel — React.js Masterclass</h2>
        <div className="space-y-2">
          {[
            { stage: "Enrolled",         count: 320, pct: 100, color: "bg-violet-500" },
            { stage: "Module 1 Done",    count: 290, pct: 91,  color: "bg-violet-400" },
            { stage: "Module 3 Done",    count: 240, pct: 75,  color: "bg-cyan-500" },
            { stage: "Module 5 Done",    count: 180, pct: 56,  color: "bg-cyan-400" },
            { stage: "Course Completed", count: 112, pct: 35,  color: "bg-emerald-500" },
          ].map((s, i) => (
            <div key={s.stage} className="flex items-center gap-4">
              <p className="text-xs text-slate-400 w-36 shrink-0">{s.stage}</p>
              <div className="flex-1 h-7 bg-white/[0.04] rounded-lg overflow-hidden relative">
                <motion.div initial={{ width: 0 }} animate={{ width: `${s.pct}%` }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.7 }}
                  className={`h-full ${s.color} opacity-70 rounded-lg`} />
                <span className="absolute inset-0 flex items-center px-3 text-xs font-bold text-white">{s.count} students</span>
              </div>
              <p className="text-xs font-black text-white w-10 text-right">{s.pct}%</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
