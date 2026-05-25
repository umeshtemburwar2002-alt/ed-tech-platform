import React, { useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Download, Clock, Users, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";

const CLASSES = [
  { id: 1, title: "React Hooks Deep Dive",       date: "May 14, 2026", duration: "90 min", enrolled: 45, joined: 38, avgMinutes: 76 },
  { id: 2, title: "Advanced State Management",   date: "May 12, 2026", duration: "75 min", enrolled: 45, joined: 41, avgMinutes: 68 },
  { id: 3, title: "API Integration Workshop",    date: "May 10, 2026", duration: "60 min", enrolled: 45, joined: 33, avgMinutes: 52 },
  { id: 4, title: "React Performance Tuning",    date: "May 8, 2026",  duration: "90 min", enrolled: 45, joined: 44, avgMinutes: 88 },
  { id: 5, title: "Testing with React Testing",  date: "May 6, 2026",  duration: "75 min", enrolled: 45, joined: 29, avgMinutes: 60 },
];

export default function Attendance() {
  const [selected, setSelected] = useState(CLASSES[0]);

  const attendees = [
    { name: "Priya Sharma",  joined: "7:03 PM", left: "8:30 PM", duration: 87,  score: "A" },
    { name: "Rahul Verma",   joined: "7:01 PM", left: "8:10 PM", duration: 69,  score: "B" },
    { name: "Kunal Mehta",   joined: "7:00 PM", left: "8:30 PM", duration: 90,  score: "A" },
    { name: "Sneha Patel",   joined: "7:15 PM", left: "8:20 PM", duration: 65,  score: "B" },
    { name: "Divya Krishnan",joined: "7:02 PM", left: "8:30 PM", duration: 88,  score: "A" },
    { name: "Arjun Nair",    joined: "7:30 PM", left: "8:30 PM", duration: 60,  score: "C" },
    { name: "Meera Iyer",    joined: "7:05 PM", left: "8:00 PM", duration: 55,  score: "C" },
  ];

  const exportCSV = () => toast.success("Attendance CSV exported!");

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Attendance Tracking</h1>
          <p className="text-sm text-slate-500 mt-0.5">Monitor join/leave times, session duration and participation scores</p>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-sm font-semibold text-slate-300 hover:bg-white/10 transition-all">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Class selector */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 space-y-2">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Sessions</h2>
          {CLASSES.map((c) => (
            <button key={c.id} onClick={() => setSelected(c)}
              className={`w-full text-left p-3 rounded-xl border transition-all ${selected.id === c.id ? "bg-violet-500/15 border-violet-500/30 text-white" : "bg-white/[0.02] border-white/[0.05] text-slate-400 hover:bg-white/[0.04] hover:text-white"}`}>
              <p className="text-xs font-bold">{c.title}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{c.date} · {c.duration}</p>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="xl:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Users,    label: "Enrolled",       value: selected.enrolled,                       color: "text-violet-400" },
              { icon: CalendarCheck, label: "Joined",    value: selected.joined,                         color: "text-emerald-400" },
              { icon: TrendingUp,   label: "Avg Duration", value: `${selected.avgMinutes}m`,             color: "text-cyan-400" },
            ].map((s) => (
              <div key={s.label} className={`p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center`}>
                <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-1`} />
                <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4">
            <h3 className="text-sm font-black text-white mb-4">{selected.title} — Attendance</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Student","Joined","Left","Duration","Score"].map((h) => (
                    <th key={h} className="pb-3 pr-4 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {attendees.map((a, i) => (
                  <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                    <td className="py-3 pr-4 font-semibold text-white">{a.name}</td>
                    <td className="py-3 pr-4 text-slate-400 text-xs">{a.joined}</td>
                    <td className="py-3 pr-4 text-slate-400 text-xs">{a.left}</td>
                    <td className="py-3 pr-4 text-slate-300 text-xs">{a.duration} min</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${
                        a.score === "A" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                        : a.score === "B" ? "bg-cyan-500/15 text-cyan-400 border-cyan-500/25"
                        : "bg-amber-500/15 text-amber-400 border-amber-500/25"
                      }`}>{a.score}</span>
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
