import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Plus, Copy, Trash2, Clock, Percent, DollarSign, Zap, X } from "lucide-react";
import toast from "react-hot-toast";

const COUPONS = [
  { id: 1, code: "LAUNCH50",   type: "percent", value: 50, course: "All Courses",          expiry: "May 31, 2026", uses: 48,  limit: 100, active: true  },
  { id: 2, code: "REACT200",   type: "fixed",   value: 200, course: "React.js Masterclass",expiry: "Jun 15, 2026", uses: 22,  limit: 50,  active: true  },
  { id: 3, code: "FLASH24",    type: "flash",   value: 70, course: "All Courses",           expiry: "May 16, 2026", uses: 134, limit: 200, active: true  },
  { id: 4, code: "WELCOME10",  type: "percent", value: 10, course: "All Courses",           expiry: "Dec 31, 2026", uses: 312, limit: 500, active: true  },
  { id: 5, code: "PYTHON30",   type: "percent", value: 30, course: "Python for Data Science",expiry:"Apr 30, 2026", uses: 77,  limit: 100, active: false },
];

const TYPE_META = {
  percent: { icon: Percent,    color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20", label: "% Off" },
  fixed:   { icon: DollarSign, color: "text-cyan-400",   bg: "bg-cyan-500/10 border-cyan-500/20",     label: "₹ Off" },
  flash:   { icon: Zap,        color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/20",   label: "Flash Sale" },
};

function CreateModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ code: "", type: "percent", value: "", course: "All Courses", expiry: "", limit: "" });
  const submit = () => {
    if (!form.code || !form.value || !form.expiry || !form.limit) { toast.error("Fill all fields"); return; }
    onAdd({ ...form, id: Date.now(), uses: 0, active: true, value: Number(form.value), limit: Number(form.limit) });
    toast.success("Coupon created!"); onClose();
  };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
        className="bg-[#0d1117] border border-white/10 rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-black text-white">Create Coupon</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-slate-400" /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Coupon Code</label>
            <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="e.g. SAVE30" className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono focus:outline-none focus:border-violet-500/50 transition-all uppercase" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500/50 transition-all">
                {["percent","fixed","flash"].map((t) => <option key={t} value={t} className="bg-[#0d1117]">{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Value ({form.type === "fixed" ? "₹" : "%"})</label>
              <input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} placeholder={form.type === "fixed" ? "200" : "30"} className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500/50 transition-all" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Expiry Date</label>
              <input type="date" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500/50 transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Usage Limit</label>
              <input type="number" value={form.limit} onChange={(e) => setForm({ ...form, limit: e.target.value })} placeholder="100" className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500/50 transition-all" />
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-slate-400 hover:text-white">Cancel</button>
          <button onClick={submit} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-sm">Create</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Coupons() {
  const [coupons, setCoupons]   = useState(COUPONS);
  const [showCreate, setShowCreate] = useState(false);

  const copy = (code) => { navigator.clipboard.writeText(code); toast.success(`Copied: ${code}`); };
  const del  = (id)   => { setCoupons((p) => p.filter((c) => c.id !== id)); toast.success("Coupon deleted"); };
  const toggle = (id) => setCoupons((p) => p.map((c) => c.id === id ? { ...c, active: !c.active } : c));
  const add = (c) => setCoupons((p) => [c, ...p]);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Coupons & Discounts</h1>
          <p className="text-sm text-slate-500 mt-0.5">Create and manage discount codes for your courses</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-sm font-bold hover:opacity-90 transition-all">
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {coupons.map((c, i) => {
          const meta = TYPE_META[c.type];
          const usePct = Math.round((c.uses / c.limit) * 100);
          return (
            <motion.div key={c.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className={`bg-white/[0.03] border rounded-2xl p-5 transition-all ${c.active ? "border-white/[0.08] hover:border-white/20" : "border-white/[0.04] opacity-60"}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${meta.bg} ${meta.color}`}>{meta.label}</span>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="font-mono text-lg font-black text-white">{c.code}</p>
                    <button onClick={() => copy(c.code)} className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-slate-500 hover:text-violet-400 transition-colors">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-black ${meta.color}`}>{c.type === "fixed" ? `₹${c.value}` : `${c.value}%`}</p>
                  <p className="text-[10px] text-slate-500">{c.course === "All Courses" ? "All courses" : c.course}</p>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-[10px] text-slate-500 mb-1.5">
                  <span>{c.uses} used</span>
                  <span>{c.limit} limit</span>
                </div>
                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full`} style={{ width: `${usePct}%` }} />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Clock className="w-3 h-3" /> Expires {c.expiry}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggle(c.id)} className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${c.active ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" : "bg-white/5 text-slate-500 border-white/10"}`}>
                    {c.active ? "Active" : "Paused"}
                  </button>
                  <button onClick={() => del(c.id)} className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {showCreate && <CreateModal onClose={() => setShowCreate(false)} onAdd={add} />}
      </AnimatePresence>
    </div>
  );
}
