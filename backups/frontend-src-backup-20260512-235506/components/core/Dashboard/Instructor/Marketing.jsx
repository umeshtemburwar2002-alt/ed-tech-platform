import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  FaBullhorn, FaTicketAlt, FaEnvelope, FaStar, FaPlus, FaTrash,
  FaCopy, FaShareAlt, FaChartBar, FaFire, FaCheckCircle,
  FaInstagram, FaTwitter, FaLinkedin, FaTimes, FaTag, FaRocket,
  FaEdit
} from "react-icons/fa";

const MOCK_COUPONS = [
  { id: 1, code: "LAUNCH50", discount: 50, expiry: "2026-06-30", uses: 124, status: "active" },
  { id: 2, code: "NEWSTUDENT25", discount: 25, expiry: "2026-05-15", uses: 87, status: "active" },
  { id: 3, code: "SUMMER10", discount: 10, expiry: "2026-04-01", uses: 203, status: "expired" },
];

const MOCK_CAMPAIGNS = [
  { id: 1, title: "Spring Sale Blast", type: "Email", sent: 1240, openRate: "34%", status: "sent", date: "Apr 15" },
  { id: 2, title: "New Course Announcement", type: "Push", sent: 860, openRate: "52%", status: "sent", date: "Apr 20" },
  { id: 3, title: "Re-engagement Drive", type: "Email", sent: 0, openRate: "—", status: "draft", date: "—" },
];

const statCards = [
  { label: "Total Impressions", value: "48.2K", icon: FaFire, color: "from-orange-500/20 to-pink-500/20", border: "border-orange-500/20", text: "text-orange-400" },
  { label: "Coupon Redemptions", value: "414", icon: FaTicketAlt, color: "from-yellow-500/20 to-amber-500/20", border: "border-yellow-500/20", text: "text-yellow-400" },
  { label: "Email Open Rate", value: "43%", icon: FaEnvelope, color: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/20", text: "text-blue-400" },
  { label: "Promo Revenue", value: "₹1.8L", icon: FaChartBar, color: "from-green-500/20 to-emerald-500/20", border: "border-green-500/20", text: "text-green-400" },
];

export default function Marketing() {
  const { user } = useSelector((state) => state.profile);
  const [coupons, setCoupons] = useState(MOCK_COUPONS);
  const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS);
  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [newCoupon, setNewCoupon] = useState({ code: "", discount: "", expiry: "" });
  const [activeTab, setActiveTab] = useState("coupons");
  const [campaignForm, setCampaignForm] = useState({ title: "", type: "Email", message: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 600);
  }, []);

  const handleSaveCoupon = () => {
    if (!newCoupon.code || !newCoupon.discount || !newCoupon.expiry) {
      toast.error("Please fill all coupon details");
      return;
    }
    const coupon = {
      id: Date.now(),
      code: newCoupon.code.toUpperCase(),
      discount: parseInt(newCoupon.discount),
      expiry: newCoupon.expiry,
      uses: 0,
      status: "active",
    };
    setCoupons([coupon, ...coupons]);
    setNewCoupon({ code: "", discount: "", expiry: "" });
    setShowAddCoupon(false);
    toast.success("Coupon created!");
  };

  const handleDeleteCoupon = (id) => {
    setCoupons(coupons.filter((c) => c.id !== id));
    toast.success("Coupon deleted");
  };

  const handleCopyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Copied "${code}" to clipboard!`);
  };

  const handleSendCampaign = () => {
    if (!campaignForm.title || !campaignForm.message) {
      toast.error("Fill in campaign title and message");
      return;
    }
    const campaign = {
      id: Date.now(),
      title: campaignForm.title,
      type: campaignForm.type,
      sent: Math.floor(Math.random() * 500) + 200,
      openRate: `${Math.floor(Math.random() * 30) + 20}%`,
      status: "sent",
      date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
    };
    setCampaigns([campaign, ...campaigns]);
    setCampaignForm({ title: "", type: "Email", message: "" });
    setShowNewCampaign(false);
    toast.success("Campaign launched successfully!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  const tabs = ["coupons", "campaigns", "social"];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <span className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <FaBullhorn className="text-white text-lg" />
            </span>
            Marketing Toolkit
          </h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2 ml-14">
            Grow your audience, boost enrollments
          </p>
        </div>
        <div className="flex gap-3">
          {activeTab === "coupons" && (
            <button
              onClick={() => setShowAddCoupon(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl text-sm font-bold shadow-lg hover:opacity-90 transition-all"
            >
              <FaPlus /> New Coupon
            </button>
          )}
          {activeTab === "campaigns" && (
            <button
              onClick={() => setShowNewCampaign(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg hover:opacity-90 transition-all"
            >
              <FaRocket /> New Campaign
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className={`bg-gradient-to-br ${stat.color} border ${stat.border} rounded-2xl p-5`}
          >
            <div className={`text-2xl font-black ${stat.text} mb-1`}>{stat.value}</div>
            <div className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <stat.icon className={stat.text} />
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-richblack-800 border border-richblack-700 rounded-2xl p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === tab
                ? "bg-white text-richblack-900"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* COUPONS TAB */}
      <AnimatePresence mode="wait">
        {activeTab === "coupons" && (
          <motion.div
            key="coupons"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Add Coupon Form */}
            <AnimatePresence>
              {showAddCoupon && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-richblack-800 border border-orange-500/30 rounded-2xl p-6 overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-black flex items-center gap-2">
                      <FaTag className="text-orange-400" /> Create New Coupon
                    </h3>
                    <button onClick={() => setShowAddCoupon(false)} className="text-slate-500 hover:text-white"><FaTimes /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-slate-400 font-bold uppercase tracking-widest block mb-2">Coupon Code</label>
                      <input
                        placeholder="e.g. SAVE50"
                        value={newCoupon.code}
                        onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                        className="w-full bg-richblack-900 border border-richblack-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500/50 font-bold uppercase"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 font-bold uppercase tracking-widest block mb-2">Discount %</label>
                      <input
                        type="number"
                        placeholder="e.g. 30"
                        value={newCoupon.discount}
                        onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
                        className="w-full bg-richblack-900 border border-richblack-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 font-bold uppercase tracking-widest block mb-2">Expiry Date</label>
                      <input
                        type="date"
                        value={newCoupon.expiry}
                        onChange={(e) => setNewCoupon({ ...newCoupon, expiry: e.target.value })}
                        className="w-full bg-richblack-900 border border-richblack-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-orange-500/50"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSaveCoupon}
                    className="mt-4 px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl font-black text-sm shadow-lg hover:opacity-90 transition-all"
                  >
                    Create Coupon
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Coupon Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {coupons.map((coupon, i) => (
                <motion.div
                  key={coupon.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`relative bg-richblack-800 rounded-2xl border overflow-hidden ${
                    coupon.status === "expired" ? "border-richblack-700 opacity-60" : "border-orange-500/20"
                  }`}
                >
                  {/* Ticket perforations */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#000814] rounded-full -ml-2" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#000814] rounded-full -mr-2" />
                  <div className="absolute top-0 left-1/2 w-px h-full border-l-2 border-dashed border-richblack-700 opacity-40" />

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className={`text-2xl font-black mb-1 ${coupon.status === "expired" ? "text-slate-500" : "text-orange-400"}`}>
                          {coupon.code}
                        </div>
                        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                          {coupon.discount}% OFF • Exp: {new Date(coupon.expiry).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                        coupon.status === "active" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}>
                        {coupon.status}
                      </span>
                    </div>
                    <div className="text-slate-400 text-xs font-bold mb-4">{coupon.uses} uses</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCopyCoupon(coupon.code)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-bold transition-all border border-white/5"
                      >
                        <FaCopy /> Copy
                      </button>
                      <button
                        onClick={() => handleDeleteCoupon(coupon.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-bold transition-all border border-red-500/10"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CAMPAIGNS TAB */}
        {activeTab === "campaigns" && (
          <motion.div
            key="campaigns"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <AnimatePresence>
              {showNewCampaign && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-richblack-800 border border-blue-500/30 rounded-2xl p-6 overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-black flex items-center gap-2">
                      <FaBullhorn className="text-blue-400" /> New Campaign
                    </h3>
                    <button onClick={() => setShowNewCampaign(false)} className="text-slate-500 hover:text-white"><FaTimes /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs text-slate-400 font-bold uppercase tracking-widest block mb-2">Campaign Title</label>
                      <input
                        placeholder="e.g. Summer Sale 2026"
                        value={campaignForm.title}
                        onChange={(e) => setCampaignForm({ ...campaignForm, title: e.target.value })}
                        className="w-full bg-richblack-900 border border-richblack-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 font-bold uppercase tracking-widest block mb-2">Campaign Type</label>
                      <select
                        value={campaignForm.type}
                        onChange={(e) => setCampaignForm({ ...campaignForm, type: e.target.value })}
                        className="w-full bg-richblack-900 border border-richblack-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500/50"
                      >
                        <option>Email</option>
                        <option>Push Notification</option>
                        <option>In-App Banner</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="text-xs text-slate-400 font-bold uppercase tracking-widest block mb-2">Message</label>
                    <textarea
                      rows={3}
                      placeholder="Write your campaign message..."
                      value={campaignForm.message}
                      onChange={(e) => setCampaignForm({ ...campaignForm, message: e.target.value })}
                      className="w-full bg-richblack-900 border border-richblack-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500/50 resize-none"
                    />
                  </div>
                  <button
                    onClick={handleSendCampaign}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-black text-sm shadow-lg hover:opacity-90 transition-all flex items-center gap-2"
                  >
                    <FaRocket /> Launch Campaign
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-richblack-800 border border-richblack-700 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-richblack-700">
                    <th className="text-left p-5 text-[10px] text-slate-500 font-black uppercase tracking-widest">Campaign</th>
                    <th className="text-left p-5 text-[10px] text-slate-500 font-black uppercase tracking-widest">Type</th>
                    <th className="text-left p-5 text-[10px] text-slate-500 font-black uppercase tracking-widest">Sent To</th>
                    <th className="text-left p-5 text-[10px] text-slate-500 font-black uppercase tracking-widest">Open Rate</th>
                    <th className="text-left p-5 text-[10px] text-slate-500 font-black uppercase tracking-widest">Date</th>
                    <th className="text-left p-5 text-[10px] text-slate-500 font-black uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c, i) => (
                    <motion.tr
                      key={c.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.06 }}
                      className="border-b border-richblack-700/50 hover:bg-white/5 transition-all"
                    >
                      <td className="p-5 text-white font-bold text-sm">{c.title}</td>
                      <td className="p-5">
                        <span className="text-[10px] font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full uppercase">{c.type}</span>
                      </td>
                      <td className="p-5 text-slate-300 font-bold text-sm">{c.sent.toLocaleString()}</td>
                      <td className="p-5 text-green-400 font-black text-sm">{c.openRate}</td>
                      <td className="p-5 text-slate-500 text-xs font-bold uppercase">{c.date}</td>
                      <td className="p-5">
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase border ${
                          c.status === "sent"
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                        }`}>
                          {c.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* SOCIAL TAB */}
        {activeTab === "social" && (
          <motion.div
            key="social"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Instagram", icon: FaInstagram, color: "from-pink-500 to-rose-600", handle: "@aslamedtech", followers: "4.2K", posts: 38 },
                { name: "Twitter / X", icon: FaTwitter, color: "from-sky-400 to-blue-600", handle: "@aslamedtech", followers: "7.8K", posts: 124 },
                { name: "LinkedIn", icon: FaLinkedin, color: "from-blue-600 to-indigo-700", handle: "AslamnEducation", followers: "2.1K", posts: 21 },
              ].map((platform, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-richblack-800 border border-richblack-700 rounded-2xl overflow-hidden"
                >
                  <div className={`bg-gradient-to-br ${platform.color} p-6 flex items-center gap-4`}>
                    <platform.icon className="text-white text-3xl" />
                    <div>
                      <div className="text-white font-black text-lg">{platform.name}</div>
                      <div className="text-white/70 text-xs font-bold">{platform.handle}</div>
                    </div>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="flex justify-between text-sm">
                      <div>
                        <div className="text-white font-black">{platform.followers}</div>
                        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Followers</div>
                      </div>
                      <div>
                        <div className="text-white font-black">{platform.posts}</div>
                        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Posts</div>
                      </div>
                      <div>
                        <div className="text-green-400 font-black">+12%</div>
                        <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Growth</div>
                      </div>
                    </div>
                    <button
                      onClick={() => toast.success(`Sharing to ${platform.name}...`)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-xl text-xs font-bold transition-all"
                    >
                      <FaShareAlt /> Share Course
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Share Box */}
            <div className="bg-richblack-800 border border-richblack-700 rounded-2xl p-6">
              <h3 className="text-white font-black text-lg mb-4 flex items-center gap-2">
                <FaEdit className="text-orange-400" /> Promotional Post Generator
              </h3>
              <textarea
                rows={4}
                defaultValue="🚀 Excited to announce my new course on Full Stack Web Development! Enroll now and get 30% off with code LAUNCH30. Limited seats available! #EdTech #WebDev #OnlineLearning"
                className="w-full bg-richblack-900 border border-richblack-700 text-slate-300 rounded-xl p-4 text-sm focus:outline-none focus:border-orange-500/50 resize-none mb-4"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => { navigator.clipboard.writeText("..."); toast.success("Post copied!"); }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-xl text-xs font-bold transition-all"
                >
                  <FaCopy /> Copy Post
                </button>
                <button
                  onClick={() => toast.success("Shared to all platforms!")}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl text-xs font-bold shadow-lg hover:opacity-90 transition-all"
                >
                  <FaShareAlt /> Share to All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
