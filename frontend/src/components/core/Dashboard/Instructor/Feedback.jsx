import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar, FaFilter, FaQuoteLeft, FaChartBar, FaReply,
  FaThumbsUp, FaThumbsDown, FaCheckCircle, FaSearch,
  FaComments, FaArrowUp, FaSmile
} from "react-icons/fa";
import { toast } from "react-hot-toast";

const REVIEWS = [
  { id: 1, student: "Aarav Sharma", course: "Modern JavaScript Masterclass", rating: 5, comment: "Excellent course! The explanations are crystal clear and the projects are incredibly practical. Highly recommend!", date: "2 days ago", avatar: "AS", helpful: 24, replied: false },
  { id: 2, student: "Priya Singh", course: "React Bootcamp", rating: 4, comment: "Very good overall, but some advanced modules could be more detailed. The instructor is super responsive though.", date: "5 days ago", avatar: "PS", helpful: 11, replied: true },
  { id: 3, student: "Emma Wilson", course: "UI/UX Design Essentials", rating: 5, comment: "The best design course I've ever taken. The way concepts are built from scratch is fantastic. I got a job offer after completing this!", date: "1 week ago", avatar: "EW", helpful: 38, replied: false },
  { id: 4, student: "Rajan Mehta", course: "Node.js Backend Mastery", rating: 3, comment: "Good content but could use more real-world project examples. The pace is fine for beginners.", date: "2 weeks ago", avatar: "RM", helpful: 5, replied: false },
  { id: 5, student: "Lucas Martin", course: "Full Stack MERN 2026", rating: 5, comment: "Mind-blowing course. Went from zero to building full apps in 2 months. Worth every rupee!", date: "3 weeks ago", avatar: "LM", helpful: 52, replied: true },
  { id: 6, student: "Nadia Khan", course: "Data Science with Python", rating: 4, comment: "Comprehensive and well-structured. The hands-on notebooks are a great addition.", date: "1 month ago", avatar: "NK", helpful: 19, replied: false },
];

const RATING_DIST = { 5: 68, 4: 18, 3: 9, 2: 3, 1: 2 };

const statCards = [
  { label: "Avg Rating", value: "4.7", icon: FaStar, color: "text-yellow-400", bg: "from-yellow-500/10 to-amber-500/10", border: "border-yellow-500/20" },
  { label: "Total Reviews", value: "311", icon: FaComments, color: "text-blue-400", bg: "from-blue-500/10 to-blue-600/10", border: "border-blue-500/20" },
  { label: "5-Star Reviews", value: "68%", icon: FaSmile, color: "text-green-400", bg: "from-green-500/10 to-green-600/10", border: "border-green-500/20" },
  { label: "Helpful Votes", value: "149", icon: FaThumbsUp, color: "text-purple-400", bg: "from-purple-500/10 to-purple-600/10", border: "border-purple-500/20" },
];

export default function Feedback() {
  const [reviews, setReviews] = useState(REVIEWS);
  const [loading, setLoading] = useState(true);
  const [filterRating, setFilterRating] = useState("all");
  const [filterCourse, setFilterCourse] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    setTimeout(() => setLoading(false), 700);
  }, []);

  const courses = ["all", ...new Set(REVIEWS.map((r) => r.course))];

  const filtered = reviews.filter((r) => {
    const matchRating = filterRating === "all" || r.rating === parseInt(filterRating);
    const matchCourse = filterCourse === "all" || r.course === filterCourse;
    const matchSearch =
      r.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRating && matchCourse && matchSearch;
  });

  const handleReply = (reviewId) => {
    if (!replyText.trim()) {
      toast.error("Please write a reply.");
      return;
    }
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, replied: true } : r))
    );
    toast.success("Reply sent!");
    setReplyingTo(null);
    setReplyText("");
  };

  const handleHelpful = (reviewId) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r))
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
          <span className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20">
            <FaStar className="text-white" />
          </span>
          Student Feedback
        </h2>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 ml-14">
          Listen, respond, and improve your teaching
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`bg-gradient-to-br ${s.bg} border ${s.border} rounded-2xl p-5`}
          >
            <div className={`text-2xl font-black ${s.color} mb-1`}>{s.value}</div>
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <s.icon className={s.color} /> {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Rating Distribution */}
      <div className="bg-richblack-800 border border-richblack-700 rounded-2xl p-6">
        <h3 className="text-white font-black mb-5 flex items-center gap-2">
          <FaChartBar className="text-yellow-400" /> Rating Distribution
        </h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((stars) => (
            <button
              key={stars}
              onClick={() => setFilterRating(filterRating === String(stars) ? "all" : String(stars))}
              className={`w-full flex items-center gap-4 group transition-all rounded-xl px-3 py-2 ${
                filterRating === String(stars) ? "bg-yellow-500/10" : "hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-1 w-20 shrink-0">
                {[...Array(stars)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xs" />
                ))}
                {[...Array(5 - stars)].map((_, i) => (
                  <FaStar key={i} className="text-richblack-600 text-xs" />
                ))}
              </div>
              <div className="flex-1 h-2.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${RATING_DIST[stars]}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full"
                />
              </div>
              <span className="text-xs font-black text-slate-400 w-10 text-right">{RATING_DIST[stars]}%</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-richblack-800 border border-richblack-700 text-white rounded-xl py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:border-yellow-500/50 w-48"
          />
        </div>
        <select
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          className="bg-richblack-800 border border-richblack-700 text-slate-300 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-yellow-500/50"
        >
          {courses.map((c) => (
            <option key={c} value={c}>{c === "all" ? "All Courses" : c}</option>
          ))}
        </select>
      </div>

      {/* Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-richblack-800 rounded-2xl border border-richblack-700 overflow-hidden group hover:border-yellow-500/30 transition-all"
          >
            <div className="p-6 space-y-4 relative">
              <FaQuoteLeft className="absolute top-4 right-4 text-4xl text-white/5 group-hover:text-yellow-500/10 transition-colors" />

              {/* Stars */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={`text-sm ${i < review.rating ? "text-yellow-400" : "text-richblack-600"}`} />
                ))}
                <span className="text-xs text-slate-500 font-bold ml-1">{review.rating}.0</span>
              </div>

              {/* Comment */}
              <p className="text-slate-300 text-sm leading-relaxed italic">"{review.comment}"</p>

              {/* Student Info */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center text-xs font-black border border-blue-500/20">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white leading-tight">{review.student}</h4>
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest leading-tight">{review.course.split(" ").slice(0, 2).join(" ")}</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-bold uppercase">{review.date}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleHelpful(review.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-green-500/10 text-slate-400 hover:text-green-400 rounded-xl text-[10px] font-black uppercase tracking-wide border border-white/5 hover:border-green-500/20 transition-all"
                >
                  <FaThumbsUp /> {review.helpful}
                </button>
                {review.replied ? (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-xl text-[10px] font-black uppercase tracking-wide border border-green-500/20">
                    <FaCheckCircle /> Replied
                  </span>
                ) : (
                  <button
                    onClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-xl text-[10px] font-black uppercase tracking-wide border border-blue-500/20 transition-all"
                  >
                    <FaReply /> Reply
                  </button>
                )}
              </div>

              {/* Reply Box */}
              <AnimatePresence>
                {replyingTo === review.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <textarea
                      rows={3}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a thoughtful reply..."
                      className="w-full bg-richblack-900 border border-richblack-700 text-slate-200 text-sm rounded-xl p-3 focus:outline-none focus:border-blue-500/50 resize-none mt-2"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleReply(review.id)}
                        className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all"
                      >
                        Send Reply
                      </button>
                      <button
                        onClick={() => { setReplyingTo(null); setReplyText(""); }}
                        className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-400 rounded-xl text-xs font-black transition-all border border-white/10"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 bg-richblack-800 border border-richblack-700 rounded-2xl">
            <FaComments className="text-4xl text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 font-bold">No reviews match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
