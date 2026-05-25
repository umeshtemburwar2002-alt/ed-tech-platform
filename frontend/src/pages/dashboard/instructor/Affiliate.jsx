import React, { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Copy, CheckCheck, Mail, TrendingUp, DollarSign, Users, Link2 } from "lucide-react";
import toast from "react-hot-toast";

const REFERRALS = [
  { id: 1, name: "Vikram Reddy",   email: "vikram@example.com",   date: "May 10, 2026", status: "converted", earning: 840  },
  { id: 2, name: "Nisha Agarwal",  email: "nisha@example.com",    date: "May 8, 2026",  status: "pending",   earning: 0    },
  { id: 3, name: "Suresh Kumar",   email: "suresh@example.com",   date: "May 5, 2026",  status: "converted", earning: 1200 },
  { id: 4, name: "Pooja Mehta",    email: "pooja@example.com",    date: "May 2, 2026",  status: "converted", earning: 600  },
  { id: 5, name: "Arun Sharma",    email: "arun@example.com",     date: "Apr 28, 2026", status: "pending",   earning: 0    },
  { id: 6, name: "Deepa Nair",     email: "deepa@example.com",    date: "Apr 25, 2026", status: "converted", earning: 960  },
];

export default function Affiliate() {
  const [copied, setCopied]   = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const refLink = "https://aslamedu.com/ref/instructor-xyz-2026";

  const totalEarnings = REFERRALS.reduce((a, r) => a + r.earning, 0);
  const converted     = REFERRALS.filter((r) => r.status === "converted").length;

  const copy = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true); toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const invite = () => {
    if (!inviteEmail) { toast.error("Enter an email"); return; }
    toast.success(`Invite sent to ${inviteEmail}`);
    setInviteEmail("");
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black text-white">Affiliate & Referrals</h1>
        <p className="text-sm text-slate-500 mt-0.5">Earn commissions by referring new students and instructors</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: DollarSign, label: "Total Earnings",  value: `₹${totalEarnings.toLocaleString()}`, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
          { icon: Users,      label: "Total Referrals", value: REFERRALS.length,                      color: "text-violet-400",  bg: "bg-violet-500/10 border-violet-500/20" },
          { icon: TrendingUp, label: "Converted",       value: `${converted}/${REFERRALS.length}`,    color: "text-cyan-400",    bg: "bg-cyan-500/10 border-cyan-500/20" },
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

      {/* Referral link */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="bg-gradient-to-br from-violet-600/10 to-cyan-600/5 border border-violet-500/20 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <Link2 className="w-5 h-5 text-violet-400" />
          <h2 className="text-sm font-black text-white">Your Unique Referral Link</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-slate-300 truncate">{refLink}</div>
          <button onClick={copy} className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all shrink-0 ${copied ? "bg-emerald-600 text-white" : "bg-violet-600 text-white hover:bg-violet-500"}`}>
            {copied ? <><CheckCheck className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Link</>}
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-3">Earn 5% commission for every student who signs up using your link</p>
      </motion.div>

      {/* Invite */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
        <h2 className="text-sm font-black text-white mb-4">Invite by Email</h2>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="friend@example.com"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-all" />
          </div>
          <button onClick={invite} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-sm hover:opacity-90 transition-all">Send Invite</button>
        </div>
      </motion.div>

      {/* Referral table */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
        <h2 className="text-sm font-black text-white mb-4">Referral History</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {["Name","Email","Date","Earning","Status"].map((h) => (
                <th key={h} className="pb-3 pr-4 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {REFERRALS.map((r, i) => (
              <tr key={r.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 pr-4 font-semibold text-white">{r.name}</td>
                <td className="py-3.5 pr-4 text-slate-400 text-xs">{r.email}</td>
                <td className="py-3.5 pr-4 text-slate-400 text-xs">{r.date}</td>
                <td className="py-3.5 pr-4 font-bold text-white">{r.earning > 0 ? `₹${r.earning}` : "—"}</td>
                <td className="py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${r.status === "converted" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25" : "bg-amber-500/15 text-amber-400 border-amber-500/25"}`}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
