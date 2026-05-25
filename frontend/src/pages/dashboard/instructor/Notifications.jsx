import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Users, MessageSquare, Star, DollarSign, BookOpen, Filter } from "lucide-react";

const NOTIFICATIONS = [
  { id: 1,  type: "enrollment", message: "Priya Sharma enrolled in React.js Masterclass",        time: "2 mins ago",  read: false },
  { id: 2,  type: "review",     message: "New 5-star review on Python for Data Science",         time: "15 mins ago", read: false },
  { id: 3,  type: "message",    message: "Rahul Verma sent you a message",                       time: "1 hour ago",  read: false },
  { id: 4,  type: "payout",     message: "Your payout of ₹11,600 was processed",                time: "3 hours ago", read: true  },
  { id: 5,  type: "enrollment", message: "Ananya Singh enrolled in Node.js & Express API",       time: "5 hours ago", read: true  },
  { id: 6,  type: "review",     message: "Kunal Mehta left a review on React.js Masterclass",   time: "1 day ago",   read: true  },
  { id: 7,  type: "message",    message: "Sneha Patel asked a question in your course",          time: "1 day ago",   read: true  },
  { id: 8,  type: "enrollment", message: "5 new students enrolled this week",                   time: "2 days ago",  read: true  },
  { id: 9,  type: "payout",     message: "April payout of ₹8,500 completed",                   time: "3 days ago",  read: true  },
  { id: 10, type: "review",     message: "New 4-star review on Machine Learning A-Z",           time: "4 days ago",  read: true  },
];

const TYPE_META = {
  enrollment: { icon: Users,          color: "text-violet-400", bg: "bg-violet-500/10" },
  review:     { icon: Star,           color: "text-amber-400",  bg: "bg-amber-500/10" },
  message:    { icon: MessageSquare,  color: "text-cyan-400",   bg: "bg-cyan-500/10" },
  payout:     { icon: DollarSign,     color: "text-emerald-400",bg: "bg-emerald-500/10" },
};

export default function Notifications() {
  const [filter, setFilter] = useState("all");
  const [items, setItems]   = useState(NOTIFICATIONS);

  const filtered = items.filter((n) => filter === "all" ? true : filter === "unread" ? !n.read : n.type === filter);
  const unreadCount = items.filter((n) => !n.read).length;

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            Notifications
            {unreadCount > 0 && <span className="px-2 py-0.5 rounded-full bg-violet-500 text-white text-xs font-black">{unreadCount}</span>}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Real-time updates on enrollments, messages, reviews & payouts</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-sm font-semibold text-slate-300 hover:bg-white/10 transition-all">
            Mark all read
          </button>
        )}
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[["all","All"],["unread","Unread"],["enrollment","Enrollments"],["review","Reviews"],["message","Messages"],["payout","Payouts"]].map(([v,l]) => (
          <button key={v} onClick={() => setFilter(v)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${filter===v ? "bg-violet-600/30 border-violet-500/50 text-white" : "bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white"}`}>{l}</button>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Bell className="w-12 h-12 text-slate-700 mx-auto mb-3" />
            <p className="text-slate-400 font-semibold">No notifications here</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.05]">
            {filtered.map((n, i) => {
              const meta = TYPE_META[n.type];
              return (
                <motion.div key={n.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  onClick={() => setItems((prev) => prev.map((x) => x.id === n.id ? { ...x, read: true } : x))}
                  className={`flex items-start gap-4 p-5 cursor-pointer transition-all hover:bg-white/[0.02] ${!n.read ? "bg-violet-500/[0.03]" : ""}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${meta.bg} shrink-0`}>
                    <meta.icon className={`w-5 h-5 ${meta.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!n.read ? "text-white font-semibold" : "text-slate-300"}`}>{n.message}</p>
                    <p className="text-xs text-slate-600 mt-1">{n.time}</p>
                  </div>
                  {!n.read && <div className="w-2 h-2 rounded-full bg-violet-500 shrink-0 mt-2 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />}
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
