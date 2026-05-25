import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, Plus, CheckCircle, Clock, AlertCircle, X, Star, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

const ASSIGNMENTS = [
  { id: 1, title: "Build a REST API with Express",     course: "Node.js & Express", type: "coding",  due: "May 20, 2026", submissions: 28, graded: 22, pending: 6 },
  { id: 2, title: "UI/UX Case Study Analysis",         course: "UI/UX Design",      type: "file",    due: "May 22, 2026", submissions: 15, graded: 10, pending: 5 },
  { id: 3, title: "React Component Architecture",      course: "React.js",          type: "text",    due: "May 25, 2026", submissions: 40, graded: 40, pending: 0 },
  { id: 4, title: "ML Model Evaluation Report",        course: "Machine Learning",  type: "file",    due: "May 28, 2026", submissions: 12, graded: 5,  pending: 7 },
];

const SUBMISSIONS = [
  { id: 1, student: "Priya Sharma",   avatar: "PS", assignment: "Build a REST API", submitted: "May 19, 1:30 PM", status: "pending", score: null },
  { id: 2, student: "Rahul Verma",    avatar: "RV", assignment: "Build a REST API", submitted: "May 18, 9:00 AM", status: "graded",  score: 88 },
  { id: 3, student: "Ananya Singh",   avatar: "AS", assignment: "UI/UX Case Study", submitted: "May 21, 3:45 PM", status: "late",    score: null },
  { id: 4, student: "Kunal Mehta",    avatar: "KM", assignment: "React Architecture",submitted:"May 24, 10:00 AM",status: "graded",  score: 95 },
  { id: 5, student: "Sneha Patel",    avatar: "SP", assignment: "ML Evaluation",    submitted: "May 27, 2:15 PM", status: "pending", score: null },
];

const TYPE_BADGE = { coding: "bg-violet-500/15 text-violet-400", file: "bg-cyan-500/15 text-cyan-400", text: "bg-emerald-500/15 text-emerald-400" };
const STATUS_BADGE = { pending: "bg-amber-500/15 text-amber-400", graded: "bg-emerald-500/15 text-emerald-400", late: "bg-red-500/15 text-red-400" };

function GradeModal({ sub, onClose }) {
  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");
  const submit = () => { toast.success(`Graded ${sub.student}: ${score}/100`); onClose(); };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
        className="bg-[#0d1117] border border-white/10 rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-white">Grade Submission</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-slate-400" /></button>
        </div>
        <p className="text-sm text-slate-400 mb-4">Student: <span className="text-white font-semibold">{sub.student}</span></p>
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Score (out of 100)</label>
          <input type="number" min={0} max={100} value={score} onChange={(e) => setScore(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500/50 transition-all" placeholder="e.g. 85" />
        </div>
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Feedback</label>
          <textarea rows={4} value={feedback} onChange={(e) => setFeedback(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white resize-none focus:outline-none focus:border-violet-500/50 transition-all" placeholder="Write feedback for the student…" />
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-slate-400 hover:text-white">Cancel</button>
          <button onClick={submit} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-sm">Submit Grade</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Assignments() {
  const [tab, setTab] = useState("overview");
  const [grading, setGrading] = useState(null);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Assignments</h1>
          <p className="text-sm text-slate-500 mt-0.5">Create, manage, and grade student assignments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-sm font-bold hover:opacity-90 transition-all">
          <Plus className="w-4 h-4" /> New Assignment
        </button>
      </motion.div>

      <div className="flex gap-2">
        {[["overview","Overview"],["submissions","Submissions"]].map(([v,l]) => (
          <button key={v} onClick={() => setTab(v)} className={`px-5 py-2 rounded-xl text-sm font-bold border transition-all ${tab===v ? "bg-violet-600/30 border-violet-500/50 text-white" : "bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white"}`}>{l}</button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {ASSIGNMENTS.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 hover:border-white/20 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${TYPE_BADGE[a.type]}`}>{a.type}</span>
                  <h3 className="text-sm font-bold text-white mt-2">{a.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{a.course}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 shrink-0">
                  <Clock className="w-3 h-3" /> Due {a.due}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[
                  { label: "Submissions", value: a.submissions, color: "text-white" },
                  { label: "Graded",      value: a.graded,      color: "text-emerald-400" },
                  { label: "Pending",     value: a.pending,     color: a.pending > 0 ? "text-amber-400" : "text-slate-500" },
                ].map((s) => (
                  <div key={s.label} className="text-center p-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                    <p className="text-[10px] text-slate-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "submissions" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Student","Assignment","Submitted","Status","Score","Action"].map((h) => (
                  <th key={h} className="pb-3 pr-4 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SUBMISSIONS.map((s, i) => (
                <tr key={s.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-black text-white">{s.avatar}</div>
                      <span className="font-semibold text-white">{s.student}</span>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 text-xs text-slate-400">{s.assignment}</td>
                  <td className="py-3.5 pr-4 text-xs text-slate-400">{s.submitted}</td>
                  <td className="py-3.5 pr-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${STATUS_BADGE[s.status]} border-current/25`}>{s.status}</span>
                  </td>
                  <td className="py-3.5 pr-4">
                    {s.score !== null ? <span className="font-bold text-white">{s.score}/100</span> : <span className="text-slate-600">—</span>}
                  </td>
                  <td className="py-3.5">
                    {s.status !== "graded" && (
                      <button onClick={() => setGrading(s)} className="text-xs text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3" /> Grade
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      <AnimatePresence>
        {grading && <GradeModal sub={grading} onClose={() => setGrading(null)} />}
      </AnimatePresence>
    </div>
  );
}
