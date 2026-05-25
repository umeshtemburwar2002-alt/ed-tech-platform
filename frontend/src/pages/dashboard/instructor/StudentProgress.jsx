import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Search, AlertTriangle, Mail, CheckCircle, Clock, TrendingUp, Download, MessageSquare, Send } from "lucide-react";
import toast from "react-hot-toast";

const STUDENTS = [
  { id: 1, name: "Priya Sharma",    avatar: "PS", course: "React.js Masterclass",      pct: 92, lastActive: "2 hours ago",  daysInactive: 0,  status: "active",   lessons: 46, total: 50 },
  { id: 2, name: "Rahul Verma",     avatar: "RV", course: "Python for Data Science",   pct: 67, lastActive: "1 day ago",    daysInactive: 1,  status: "active",   lessons: 34, total: 51 },
  { id: 3, name: "Ananya Singh",    avatar: "AS", course: "React.js Masterclass",      pct: 38, lastActive: "18 days ago",  daysInactive: 18, status: "inactive", lessons: 19, total: 50 },
  { id: 4, name: "Kunal Mehta",     avatar: "KM", course: "Node.js & Express API",     pct: 100, lastActive: "3 hours ago", daysInactive: 0,  status: "completed",lessons: 38, total: 38 },
  { id: 5, name: "Sneha Patel",     avatar: "SP", course: "UI/UX Design Fundamentals", pct: 55, lastActive: "5 days ago",   daysInactive: 5,  status: "active",   lessons: 22, total: 40 },
  { id: 6, name: "Arjun Nair",      avatar: "AN", course: "Machine Learning A-Z",      pct: 22, lastActive: "21 days ago",  daysInactive: 21, status: "inactive", lessons: 11, total: 50 },
  { id: 7, name: "Meera Iyer",      avatar: "MI", course: "Python for Data Science",   pct: 78, lastActive: "6 hours ago",  daysInactive: 0,  status: "active",   lessons: 40, total: 51 },
  { id: 8, name: "Vikram Reddy",    avatar: "VR", course: "React.js Masterclass",      pct: 15, lastActive: "30 days ago",  daysInactive: 30, status: "inactive", lessons: 7,  total: 50 },
  { id: 9, name: "Divya Krishnan",  avatar: "DK", course: "Node.js & Express API",     pct: 84, lastActive: "12 hours ago", daysInactive: 0,  status: "active",   lessons: 32, total: 38 },
  { id: 10, name: "Rohan Gupta",    avatar: "RG", course: "Machine Learning A-Z",      pct: 45, lastActive: "9 days ago",   daysInactive: 9,  status: "at-risk",  lessons: 22, total: 50 },
];

const STATUS_META = {
  active:    { label: "Active",    bg: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" },
  completed: { label: "Completed", bg: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25" },
  inactive:  { label: "Inactive",  bg: "bg-red-500/15 text-red-400 border-red-500/25" },
  "at-risk": { label: "At Risk",   bg: "bg-amber-500/15 text-amber-400 border-amber-500/25" },
};

function ProgressBar({ pct }) {
  const color = pct === 100 ? "from-emerald-500 to-emerald-400" : pct >= 70 ? "from-violet-500 to-cyan-500" : pct >= 40 ? "from-amber-500 to-orange-400" : "from-red-500 to-rose-400";
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }} animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${color} rounded-full`}
        />
      </div>
      <span className="text-xs font-bold text-white w-8 shrink-0 text-right">{pct}%</span>
    </div>
  );
}

export default function StudentProgress() {
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState("all");
  const [selected, setSelected] = useState([]);
  const [msgModal, setMsgModal] = useState(false);
  const [msgText,  setMsgText]  = useState("");

  const filtered = STUDENTS.filter((s) => {
    const matchQ = s.name.toLowerCase().includes(search.toLowerCase()) || s.course.toLowerCase().includes(search.toLowerCase());
    if (filter === "all") return matchQ;
    if (filter === "inactive") return matchQ && s.daysInactive >= 14;
    if (filter === "completed") return matchQ && s.pct === 100;
    if (filter === "at-risk") return matchQ && (s.daysInactive >= 7 && s.pct < 50);
    return matchQ;
  });

  const toggleSelect = (id) => setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const selectAll    = () => setSelected(filtered.map((s) => s.id));
  const clearSelect  = () => setSelected([]);

  const sendBulkMessage = () => {
    if (!msgText.trim()) { toast.error("Message cannot be empty"); return; }
    toast.success(`Message sent to ${selected.length} student${selected.length > 1 ? "s" : ""}!`);
    setMsgModal(false);
    setMsgText("");
    setSelected([]);
  };

  const exportCSV = () => {
    const rows = [["Name","Course","Progress %","Last Active","Status"], ...STUDENTS.map((s) => [s.name, s.course, s.pct, s.lastActive, s.status])];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "student-progress.csv"; a.click();
    toast.success("CSV exported!");
  };

  const inactive = STUDENTS.filter((s) => s.daysInactive >= 14).length;
  const completed = STUDENTS.filter((s) => s.pct === 100).length;
  const avgPct = Math.round(STUDENTS.reduce((a, s) => a + s.pct, 0) / STUDENTS.length);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Student Progress</h1>
          <p className="text-sm text-slate-500 mt-0.5">Track completion, last activity, and engagement across all students</p>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-sm font-semibold text-slate-300 hover:bg-white/10 transition-all">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Students",   value: STUDENTS.length, icon: Users,          color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
          { label: "Avg Completion",   value: `${avgPct}%`,    icon: TrendingUp,     color: "text-cyan-400",   bg: "bg-cyan-500/10 border-cyan-500/20" },
          { label: "Completed Course", value: completed,       icon: CheckCircle,    color: "text-emerald-400",bg: "bg-emerald-500/10 border-emerald-500/20" },
          { label: "Inactive >14 days",value: inactive,        icon: AlertTriangle,  color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg} shrink-0`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-xl font-black text-white">{s.value}</p>
              <p className="text-[11px] text-slate-500">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Inactive Alert */}
      {inactive > 0 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-4 rounded-2xl bg-red-500/[0.08] border border-red-500/20">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">{inactive} students inactive for 14+ days</p>
              <p className="text-xs text-slate-400">Consider sending a re-engagement message to bring them back</p>
            </div>
          </div>
          <button onClick={() => { setFilter("inactive"); const ids = STUDENTS.filter((s) => s.daysInactive >= 14).map((s) => s.id); setSelected(ids); setMsgModal(true); }}
            className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-sm font-bold text-red-300 hover:bg-red-500/30 transition-all shrink-0">
            Message Them
          </button>
        </motion.div>
      )}

      {/* Filters + Search */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students or courses…"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-all" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[["all","All"],["inactive","Inactive"],["completed","Completed"],["at-risk","At Risk"]].map(([v, l]) => (
              <button key={v} onClick={() => setFilter(v)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${filter === v ? "bg-violet-600/30 border-violet-500/50 text-violet-300" : "bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white"}`}>{l}</button>
            ))}
          </div>
          {selected.length > 0 && (
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-slate-400">{selected.length} selected</span>
              <button onClick={() => setMsgModal(true)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-violet-600/20 border border-violet-500/30 text-xs font-bold text-violet-300 hover:bg-violet-600/30 transition-all">
                <MessageSquare className="w-3 h-3" /> Message
              </button>
              <button onClick={clearSelect} className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-400 hover:text-white transition-all">Clear</button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="pb-3 pr-3 text-left">
                  <input type="checkbox" onChange={(e) => e.target.checked ? selectAll() : clearSelect()}
                    checked={selected.length === filtered.length && filtered.length > 0}
                    className="accent-violet-500" />
                </th>
                {["Student","Course","Progress","Last Active","Status","Action"].map((h) => (
                  <th key={h} className="pb-3 pr-4 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="py-16 text-center text-slate-500">No students match your filters</td></tr>
              ) : filtered.map((s, i) => {
                const meta = STATUS_META[s.status];
                return (
                  <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className={`border-b border-white/[0.04] transition-colors ${selected.includes(s.id) ? "bg-violet-500/[0.04]" : "hover:bg-white/[0.02]"}`}>
                    <td className="py-3.5 pr-3">
                      <input type="checkbox" checked={selected.includes(s.id)} onChange={() => toggleSelect(s.id)} className="accent-violet-500" />
                    </td>
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-black text-white shrink-0">{s.avatar}</div>
                        <span className="font-semibold text-white">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4 max-w-[180px]">
                      <p className="text-xs text-slate-400 truncate">{s.course}</p>
                      <p className="text-[10px] text-slate-600">{s.lessons}/{s.total} lessons</p>
                    </td>
                    <td className="py-3.5 pr-4 w-40">
                      <ProgressBar pct={s.pct} />
                    </td>
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className="w-3 h-3 shrink-0" />
                        <span className={s.daysInactive >= 14 ? "text-red-400" : s.daysInactive >= 7 ? "text-amber-400" : ""}>{s.lastActive}</span>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${meta.bg}`}>{meta.label}</span>
                    </td>
                    <td className="py-3.5">
                      <button onClick={() => { setSelected([s.id]); setMsgModal(true); }}
                        className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 font-semibold transition-colors">
                        <Mail className="w-3 h-3" /> Message
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Bulk Message Modal */}
      <AnimatePresence>
        {msgModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setMsgModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0d1117] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}>
              <h2 className="text-lg font-black text-white mb-1">Send Message</h2>
              <p className="text-xs text-slate-500 mb-4">To {selected.length} student{selected.length > 1 ? "s" : ""}</p>
              <textarea value={msgText} onChange={(e) => setMsgText(e.target.value)} rows={5}
                placeholder="Write your message here…"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-all resize-none mb-4" />
              <div className="flex gap-3">
                <button onClick={() => setMsgModal(false)} className="flex-1 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-sm font-semibold text-slate-400 hover:text-white transition-all">Cancel</button>
                <button onClick={sendBulkMessage} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Send
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
