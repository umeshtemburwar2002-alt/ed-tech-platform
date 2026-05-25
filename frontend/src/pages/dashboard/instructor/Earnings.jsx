import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import { DollarSign, TrendingUp, Clock, Download, Wallet, CreditCard, ArrowUpRight } from "lucide-react";

const MONTHLY = [
  { month: "Jun", revenue: 4200, payouts: 3600 },
  { month: "Jul", revenue: 5800, payouts: 4900 },
  { month: "Aug", revenue: 4700, payouts: 4100 },
  { month: "Sep", revenue: 6300, payouts: 5500 },
  { month: "Oct", revenue: 7100, payouts: 6200 },
  { month: "Nov", revenue: 8400, payouts: 7300 },
  { month: "Dec", revenue: 9200, payouts: 8000 },
  { month: "Jan", revenue: 7800, payouts: 6800 },
  { month: "Feb", revenue: 10200, payouts: 8900 },
  { month: "Mar", revenue: 11500, payouts: 10000 },
  { month: "Apr", revenue: 9800, payouts: 8500 },
  { month: "May", revenue: 13400, payouts: 11600 },
];

const COMMISSION = [
  { name: "Platform Fee", value: 30, color: "#6366f1" },
  { name: "Your Earnings", value: 70, color: "#06b6d4" },
];

const PAYOUTS = [
  { id: "PAY-8821", date: "May 01, 2026", amount: 11600, status: "completed", method: "Bank Transfer" },
  { id: "PAY-8432", date: "Apr 01, 2026", amount: 8500,  status: "completed", method: "Bank Transfer" },
  { id: "PAY-7955", date: "Mar 01, 2026", amount: 10000, status: "completed", method: "UPI" },
  { id: "PAY-7401", date: "Feb 01, 2026", amount: 8900,  status: "completed", method: "Bank Transfer" },
  { id: "PAY-6872", date: "Jan 01, 2026", amount: 6800,  status: "pending",   method: "Bank Transfer" },
];

function useCountUp(target, duration = 1200) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let s = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      s += step;
      if (s >= target) { setV(target); clearInterval(t); }
      else setV(Math.floor(s));
    }, 16);
    return () => clearInterval(t);
  }, [target, duration]);
  return v;
}

function StatCard({ icon: Icon, label, value, sub, color, delay }) {
  const n = useCountUp(value);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className="relative overflow-hidden p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.05] transition-all hover:-translate-y-0.5 cursor-default group">
      <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-20 ${color}`} />
      <div className="relative flex items-start justify-between mb-3">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{label}</p>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
      <p className="text-2xl font-black text-white mb-1">₹{n.toLocaleString()}</p>
      <p className="text-xs text-slate-500">{sub}</p>
    </motion.div>
  );
}

const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d1117] border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-xs font-bold text-slate-400 mb-2">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-xs font-semibold" style={{ color: p.color }}>
          {p.name}: ₹{p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

const StatusBadge = ({ s }) => (
  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
    s === "completed" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
    : "bg-amber-500/15 text-amber-400 border border-amber-500/25"
  }`}>{s}</span>
);

export default function Earnings() {
  const [period, setPeriod] = useState("12m");
  const total    = MONTHLY.reduce((a, m) => a + m.revenue, 0);
  const payouts  = MONTHLY.reduce((a, m) => a + m.payouts, 0);
  const pending  = total - payouts;
  const lastM    = MONTHLY[MONTHLY.length - 1].revenue;
  const data     = period === "3m" ? MONTHLY.slice(-3) : period === "6m" ? MONTHLY.slice(-6) : MONTHLY;

  return (
    <div className="space-y-7">
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Earnings</h1>
          <p className="text-sm text-slate-500 mt-0.5">Revenue, payouts & commission breakdown</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-sm font-semibold text-slate-300 hover:bg-white/10 transition-all">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </motion.div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={DollarSign} label="Total Revenue"  value={total}   sub="All-time earnings"    color="bg-violet-500" delay={0} />
        <StatCard icon={Wallet}     label="Total Payouts"  value={payouts} sub="Last 12 months"       color="bg-emerald-500" delay={0.07} />
        <StatCard icon={Clock}      label="Pending Payout" value={pending} sub="Releases Jun 1"       color="bg-amber-500" delay={0.14} />
        <StatCard icon={TrendingUp} label="This Month"     value={lastM}   sub="May 2026 earnings"    color="bg-cyan-500" delay={0.21} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="xl:col-span-2 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-black text-white">Revenue vs Payouts</h2>
              <p className="text-xs text-slate-500 mt-0.5">12-month trend</p>
            </div>
            <div className="flex gap-2">
              {["3m","6m","12m"].map((p) => (
                <button key={p} onClick={() => setPeriod(p)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${period === p ? "bg-violet-600 text-white" : "bg-white/5 text-slate-400 hover:text-white"}`}>{p}</button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gP" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<ChartTip />} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={2} fill="url(#gR)" />
              <Area type="monotone" dataKey="payouts" name="Payouts" stroke="#06b6d4" strokeWidth={2} fill="url(#gP)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.27 }}
          className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <h2 className="text-sm font-black text-white mb-1">Commission Split</h2>
          <p className="text-xs text-slate-500 mb-4">Platform vs Your Take</p>
          <ResponsiveContainer width="100%" height={170}>
            <PieChart>
              <Pie data={COMMISSION} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={4} dataKey="value">
                {COMMISSION.map((c, i) => <Cell key={i} fill={c.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          {COMMISSION.map((c) => (
            <div key={c.name} className="flex items-center justify-between text-xs mt-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                <span className="text-slate-400">{c.name}</span>
              </div>
              <span className="font-bold text-white">{c.value}%</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.33 }}
        className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-sm font-black text-white">Payout History</h2>
            <p className="text-xs text-slate-500 mt-0.5">All disbursements to your account</p>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full font-semibold">
            <Clock className="w-3 h-3" /> Next payout: Jun 1
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {["Payout ID","Date","Amount","Method","Status","Action"].map((h) => (
                  <th key={h} className="text-left pb-3 pr-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PAYOUTS.map((p, i) => (
                <tr key={p.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 pr-4 font-mono text-xs text-slate-400">{p.id}</td>
                  <td className="py-3.5 pr-4 text-slate-300">{p.date}</td>
                  <td className="py-3.5 pr-4 font-bold text-white">₹{p.amount.toLocaleString()}</td>
                  <td className="py-3.5 pr-4">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <CreditCard className="w-3 h-3" /> {p.method}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4"><StatusBadge s={p.status} /></td>
                  <td className="py-3.5">
                    <button className="text-xs text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1">
                      <Download className="w-3 h-3" /> Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
        <h2 className="text-sm font-black text-white mb-5">Revenue by Course</h2>
        <div className="space-y-4">
          {[
            { name: "React.js Masterclass",      revenue: 38400, pct: 92, students: 320 },
            { name: "Python for Data Science",   revenue: 27600, pct: 66, students: 230 },
            { name: "Node.js & Express API",     revenue: 19200, pct: 46, students: 160 },
            { name: "UI/UX Design Fundamentals", revenue: 14400, pct: 35, students: 120 },
            { name: "Machine Learning A-Z",      revenue: 9600,  pct: 23, students: 80  },
          ].map((c, i) => (
            <div key={c.name} className="flex items-center gap-4">
              <div className="w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-xs font-black text-violet-400 shrink-0">{i + 1}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs font-semibold text-white truncate">{c.name}</p>
                  <p className="text-xs font-black text-white shrink-0 ml-3">₹{c.revenue.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: `${c.pct}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full" />
                  </div>
                  <span className="text-[10px] text-slate-500 shrink-0">{c.students} students</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
