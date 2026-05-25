import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, ThumbsDown, MessageSquare, Flag, TrendingUp } from "lucide-react";

const REVIEWS = [
  { id: 1, student: "Priya Sharma",  avatar: "PS", course: "React.js Masterclass",    rating: 5, date: "May 14, 2026", review: "Absolutely phenomenal course! The instructor explains every concept with such clarity. Best React course I've found anywhere.", reply: null, flagged: false },
  { id: 2, student: "Rahul Verma",   avatar: "RV", course: "Python for Data Science", rating: 4, date: "May 12, 2026", review: "Great content and well-structured. Would love more practice exercises but overall very solid.", reply: "Thanks Rahul! More exercises coming in the next update.", flagged: false },
  { id: 3, student: "Ananya Singh",  avatar: "AS", course: "React.js Masterclass",    rating: 3, date: "May 10, 2026", review: "Good course but some sections feel rushed. Audio quality could be improved in the later modules.", reply: null, flagged: false },
  { id: 4, student: "Kunal Mehta",   avatar: "KM", course: "Node.js & Express API",   rating: 5, date: "May 8, 2026",  review: "This course changed how I think about backend development. Kunal's teaching style is top notch!", reply: "Thank you so much! Really appreciate your kind words.", flagged: false },
  { id: 5, student: "Sneha Patel",   avatar: "SP", course: "UI/UX Design",            rating: 2, date: "May 5, 2026",  review: "Expected more from this course. The projects feel outdated and some links are broken.", reply: null, flagged: false },
];

const STAR_DATA = [
  { stars: 5, count: 142, pct: 65 },
  { stars: 4, count: 51,  pct: 23 },
  { stars: 3, count: 18,  pct: 8  },
  { stars: 2, count: 6,   pct: 3  },
  { stars: 1, count: 2,   pct: 1  },
];

function StarDisplay({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <Star key={s} className={`w-3.5 h-3.5 ${s <= rating ? "text-amber-400 fill-amber-400" : "text-slate-700"}`} />
      ))}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews]   = useState(REVIEWS);
  const [replyId, setReplyId]   = useState(null);
  const [replyText, setReplyText] = useState("");
  const totalAvg = (REVIEWS.reduce((a, r) => a + r.rating, 0) / REVIEWS.length).toFixed(1);
  const totalCount = STAR_DATA.reduce((a, d) => a + d.count, 0);

  const submitReply = (id) => {
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, reply: replyText } : r));
    setReplyId(null); setReplyText("");
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black text-white">Reviews & Ratings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage student feedback and your instructor reputation</p>
      </motion.div>

      {/* Rating Overview */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <p className="text-6xl font-black text-white mb-2">{totalAvg}</p>
          <StarDisplay rating={Math.round(parseFloat(totalAvg))} />
          <p className="text-xs text-slate-500 mt-2">{totalCount} total reviews</p>
          <div className="mt-3 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
            <p className="text-xs font-bold text-amber-400 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Top-rated Instructor</p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
          <h3 className="text-sm font-black text-white mb-4">Rating Breakdown</h3>
          <div className="space-y-2.5">
            {STAR_DATA.map((d) => (
              <div key={d.stars} className="flex items-center gap-3">
                <span className="text-xs text-slate-400 w-4 text-right">{d.stars}</span>
                <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${d.pct}%` }} transition={{ delay: 0.3, duration: 0.7 }}
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full" />
                </div>
                <span className="text-xs text-slate-500 w-8 text-right">{d.count}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Review List */}
      <div className="space-y-4">
        {reviews.map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.07 }}
            className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-black text-white">{r.avatar}</div>
                <div>
                  <p className="text-sm font-bold text-white">{r.student}</p>
                  <p className="text-[10px] text-slate-500">{r.course} · {r.date}</p>
                </div>
              </div>
              <StarDisplay rating={r.rating} />
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-3">{r.review}</p>

            {r.reply && (
              <div className="bg-violet-500/[0.08] border border-violet-500/20 rounded-xl p-4 mb-3">
                <p className="text-[10px] font-bold text-violet-400 mb-1">YOUR REPLY</p>
                <p className="text-sm text-slate-300">{r.reply}</p>
              </div>
            )}

            {replyId === r.id && (
              <div className="mb-3">
                <textarea rows={3} value={replyText} onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply to this review…"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white resize-none focus:outline-none focus:border-violet-500/50 mb-2" />
                <div className="flex gap-2">
                  <button onClick={() => submitReply(r.id)} className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-500 transition-all">Post Reply</button>
                  <button onClick={() => setReplyId(null)} className="px-4 py-2 rounded-xl bg-white/5 text-slate-400 text-xs font-bold hover:text-white transition-all">Cancel</button>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2 border-t border-white/[0.05]">
              {!r.reply && replyId !== r.id && (
                <button onClick={() => setReplyId(r.id)} className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 font-semibold transition-colors">
                  <MessageSquare className="w-3 h-3" /> Reply
                </button>
              )}
              <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-400 font-semibold transition-colors">
                <Flag className="w-3 h-3" /> Flag
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
