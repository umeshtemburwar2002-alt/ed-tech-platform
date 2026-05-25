import React from "react";
import { motion } from "framer-motion";
import { Award, Download, Eye, Users, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const CERTS = [
  { id: 1, student: "Priya Sharma",   course: "React.js Masterclass",   issued: "May 14, 2026", id_code: "CERT-4821" },
  { id: 2, student: "Kunal Mehta",    course: "Node.js & Express API",  issued: "May 12, 2026", id_code: "CERT-4655" },
  { id: 3, student: "Divya Krishnan", course: "Node.js & Express API",  issued: "May 10, 2026", id_code: "CERT-4612" },
  { id: 4, student: "Rahul Verma",    course: "Python for Data Science",issued: "May 8, 2026",  id_code: "CERT-4498" },
  { id: 5, student: "Meera Iyer",     course: "React.js Masterclass",   issued: "May 6, 2026",  id_code: "CERT-4380" },
];

export default function Certificates() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black text-white">Certificates</h1>
        <p className="text-sm text-slate-500 mt-0.5">Track and manage completion certificates issued to your students</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Award,        label: "Issued",       value: CERTS.length, color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/20" },
          { icon: Users,        label: "Completions",  value: 38,           color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
          { icon: CheckCircle,  label: "Verified",     value: 34,           color: "text-emerald-400",bg: "bg-emerald-500/10 border-emerald-500/20" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`flex items-center gap-4 p-5 rounded-2xl border ${s.bg}`}>
            <s.icon className={`w-8 h-8 ${s.color}`} />
            <div>
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
        <h2 className="text-sm font-black text-white mb-4">Recently Issued</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {["Student","Course","Issued","Certificate ID","Actions"].map((h) => (
                <th key={h} className="pb-3 pr-4 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CERTS.map((c, i) => (
              <tr key={c.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 pr-4 font-semibold text-white">{c.student}</td>
                <td className="py-3.5 pr-4 text-slate-400 text-xs">{c.course}</td>
                <td className="py-3.5 pr-4 text-slate-400 text-xs">{c.issued}</td>
                <td className="py-3.5 pr-4 font-mono text-xs text-violet-400">{c.id_code}</td>
                <td className="py-3.5">
                  <div className="flex items-center gap-2">
                    <button onClick={() => toast.success("Preview opened")} className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors font-semibold">
                      <Eye className="w-3 h-3" /> View
                    </button>
                    <button onClick={() => toast.success("Certificate downloaded")} className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors font-semibold">
                      <Download className="w-3 h-3" /> Download
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
