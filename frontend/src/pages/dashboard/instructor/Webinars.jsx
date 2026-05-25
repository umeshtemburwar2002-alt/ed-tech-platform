import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Plus, Video, Users, Calendar, Link2, Upload, Clock, X } from "lucide-react";
import toast from "react-hot-toast";

const WEBINARS = [
  { id: 1, title: "Live React Masterclass Q&A",        date: "May 20, 2026", time: "7:00 PM IST", type: "Live Session", registrants: 148, recorded: false, zoomLink: "https://zoom.us/j/123456" },
  { id: 2, title: "Python Data Science Workshop",      date: "May 25, 2026", time: "6:00 PM IST", type: "Workshop",     registrants: 92,  recorded: false, zoomLink: "https://zoom.us/j/234567" },
  { id: 3, title: "Career in Tech — Panel Discussion", date: "Jun 5, 2026",  time: "5:00 PM IST", type: "Masterclass",  registrants: 215, recorded: false, zoomLink: "https://zoom.us/j/345678" },
  { id: 4, title: "Advanced React Patterns Deep-Dive", date: "Apr 15, 2026", time: "7:00 PM IST", type: "Live Session", registrants: 176, recorded: true,  zoomLink: "" },
];

const TYPE_META = {
  "Live Session": { color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20" },
  "Workshop":     { color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/20" },
  "Masterclass":  { color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
};

export default function Webinars() {
  const [webinars, setWebinars] = useState(WEBINARS);
  const now = new Date("2026-05-15");
  const upcoming = webinars.filter((w) => new Date(w.date) >= now);
  const past     = webinars.filter((w) => new Date(w.date) < now);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Webinars & Live Events</h1>
          <p className="text-sm text-slate-500 mt-0.5">Schedule workshops, masterclasses and live sessions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-sm font-bold hover:opacity-90 transition-all">
          <Plus className="w-4 h-4" /> Schedule Webinar
        </button>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Upcoming",    value: upcoming.length,                                     color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
          { label: "Registrants", value: webinars.reduce((a, w) => a + w.registrants, 0),    color: "text-cyan-400",   bg: "bg-cyan-500/10 border-cyan-500/20" },
          { label: "Recordings",  value: past.filter((w) => w.recorded).length,               color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/20" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`p-5 rounded-2xl border ${s.bg} text-center`}>
            <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Upcoming */}
      <div>
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-3">Upcoming</h2>
        <div className="space-y-3">
          {upcoming.length === 0 ? (
            <div className="py-10 text-center bg-white/[0.03] border border-white/[0.08] rounded-2xl">
              <Globe className="w-10 h-10 text-slate-700 mx-auto mb-2" />
              <p className="text-slate-500 text-sm">No upcoming webinars. Schedule one!</p>
            </div>
          ) : upcoming.map((w, i) => {
            const meta = TYPE_META[w.type];
            return (
              <motion.div key={w.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                className="flex flex-wrap items-center gap-4 p-5 bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:border-white/20 transition-all">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${meta.bg} ${meta.color}`}>{w.type}</span>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                    <span className="text-[10px] text-emerald-400 font-bold">LIVE SOON</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{w.title}</h3>
                  <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {w.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {w.time}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {w.registrants} registered</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => { navigator.clipboard.writeText(w.zoomLink); toast.success("Zoom link copied!"); }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all">
                    <Link2 className="w-3 h-3" /> Copy Link
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-violet-600/20 border border-violet-500/30 text-xs font-bold text-violet-300 hover:bg-violet-600/30 transition-all">
                    <Video className="w-3 h-3" /> Start
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Past */}
      {past.length > 0 && (
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-3">Past</h2>
          <div className="space-y-3">
            {past.map((w, i) => (
              <motion.div key={w.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}
                className="flex flex-wrap items-center gap-4 p-5 bg-white/[0.02] border border-white/[0.05] rounded-2xl opacity-70">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white">{w.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                    <span>{w.date} · {w.time}</span>
                    <span>{w.registrants} attended</span>
                  </div>
                </div>
                {w.recorded ? (
                  <span className="flex items-center gap-1.5 text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-full font-bold">
                    <Video className="w-3 h-3" /> Recording Available
                  </span>
                ) : (
                  <button className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full font-bold hover:text-white transition-all">
                    <Upload className="w-3 h-3" /> Upload Recording
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
