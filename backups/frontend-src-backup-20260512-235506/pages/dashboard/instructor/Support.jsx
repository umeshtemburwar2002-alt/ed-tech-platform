import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHeadset, FaTicketAlt, FaQuestionCircle, FaEnvelope,
  FaPhoneAlt, FaChevronDown, FaChevronUp, FaPaperPlane,
  FaHistory, FaCheckCircle, FaClock, FaImage, FaTimesCircle,
  FaSearch, FaSpinner, FaInbox, FaShieldAlt, FaBolt,
  FaChartLine, FaUsers, FaVideo, FaMoneyBillWave
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { createTicket, getMyTickets, uploadSupportAttachment } from '../../../services/operations/supportAPI';

// ─── Constants ────────────────────────────────────────────────────────────────

const INSTRUCTOR_CATEGORIES = [
  "Course Publishing Issue", "Video Upload Problem", "Payment Settlement",
  "Live Class Issue", "Analytics & Reports", "Student Management",
  "Course Review Issue", "Account Verification", "Technical Problem", "Other",
];

const STATUS_CONFIG = {
  open:        { label: "Open",        cls: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  pending:     { label: "Pending",     cls: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
  in_progress: { label: "In Progress", cls: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  resolved:    { label: "Resolved",    cls: "text-green-400 bg-green-500/10 border-green-500/20" },
  closed:      { label: "Closed",      cls: "text-richblack-400 bg-richblack-700/50 border-richblack-600" },
};

const PRIORITY_CONFIG = {
  low:    { label: "Low",    cls: "text-richblack-400 bg-richblack-700/50" },
  medium: { label: "Medium", cls: "text-blue-400 bg-blue-500/10" },
  high:   { label: "High",   cls: "text-orange-400 bg-orange-500/10" },
  urgent: { label: "Urgent", cls: "text-red-400 bg-red-500/10" },
};

const INSTRUCTOR_FAQS = [
  { q: "How long does course publishing take?", a: "After submission our team reviews courses within 24–48 hours. You'll get an email notification once it's live." },
  { q: "Why is my video upload failing?", a: "Videos must be MP4 format, under 2 GB. Check your internet connection and retry. If the issue persists, submit a ticket with your video file details." },
  { q: "When do payouts happen?", a: "Payouts are processed on the 1st and 15th of each month. Minimum payout threshold is ₹500. Check Payment Settings for your bank details." },
  { q: "How do I get more students enrolled?", a: "Use your unique promo link, offer limited-time discounts via Course Settings, and promote on your social media for maximum reach." },
  { q: "Can I edit a published course?", a: "Yes! Go to My Courses → Edit. Note that structural changes (adding/removing sections) require a brief re-review, but content edits go live immediately." },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.open;
  const icons = { open: <FaInbox className="text-[10px]" />, pending: <FaClock className="text-[10px]" />, in_progress: <FaSpinner className="text-[10px] animate-spin" />, resolved: <FaCheckCircle className="text-[10px]" />, closed: <FaTimesCircle className="text-[10px]" /> };
  return (
    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${cfg.cls}`}>
      {icons[status]} {cfg.label}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const cfg = PRIORITY_CONFIG[priority] ?? PRIORITY_CONFIG.medium;
  return <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${cfg.cls}`}>{cfg.label}</span>;
}

function TicketCard({ ticket, onClick }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className="bg-richblack-900/50 rounded-2xl p-5 border border-richblack-700 hover:border-yellow-500/30 transition-all group cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-mono text-yellow-400 mb-1">#{ticket.id.slice(0,8).toUpperCase()}</p>
          <h3 className="font-bold text-richblack-5 truncate group-hover:text-yellow-400 transition-colors">{ticket.subject}</h3>
        </div>
        <StatusBadge status={ticket.status} />
      </div>
      <div className="flex justify-between items-center text-xs text-richblack-500 border-t border-richblack-700/50 pt-3 mt-2">
        <span className="flex items-center gap-1.5"><FaTicketAlt className="text-[10px]" /> {ticket.category} <PriorityBadge priority={ticket.priority} /></span>
        <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
      </div>
    </motion.div>
  );
}

function TicketModal({ ticket, onClose }) {
  if (!ticket) return null;
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        onClick={e => e.stopPropagation()}
        className="bg-richblack-800 rounded-3xl p-6 md:p-8 border border-richblack-700 shadow-2xl w-full max-w-lg">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-xs font-mono text-yellow-400 mb-1">#{ticket.id.slice(0,8).toUpperCase()}</p>
            <h2 className="text-xl font-bold text-richblack-5">{ticket.subject}</h2>
          </div>
          <button onClick={onClose} className="text-richblack-400 hover:text-white transition-colors"><FaTimesCircle className="text-xl" /></button>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <StatusBadge status={ticket.status} /><PriorityBadge priority={ticket.priority} />
          <span className="text-[10px] font-bold text-richblack-400 bg-richblack-700/50 px-2 py-1 rounded uppercase">{ticket.category}</span>
        </div>
        <div className="bg-richblack-900/50 rounded-2xl p-4 mb-4 border border-richblack-700">
          <p className="text-sm text-richblack-200 leading-relaxed">{ticket.message}</p>
        </div>
        {ticket.attachment_url && <img src={ticket.attachment_url} alt="attachment" className="rounded-xl border border-richblack-700 max-h-48 object-contain w-full bg-richblack-900 mb-4" />}
        {ticket.admin_note && (
          <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-4">
            <p className="text-xs font-bold text-yellow-400 mb-1 uppercase tracking-wider">Support Team Reply</p>
            <p className="text-sm text-richblack-200">{ticket.admin_note}</p>
          </div>
        )}
        <p className="text-xs text-richblack-500 mt-4">Submitted {new Date(ticket.created_at).toLocaleString()}</p>
      </motion.div>
    </div>
  );
}

// ─── Quick Help Cards ─────────────────────────────────────────────────────────

const QUICK_HELP = [
  { icon: <FaVideo className="text-yellow-400" />, label: "Video Upload", bg: "bg-yellow-500/10" },
  { icon: <FaMoneyBillWave className="text-green-400" />, label: "Payouts", bg: "bg-green-500/10" },
  { icon: <FaChartLine className="text-blue-400" />, label: "Analytics", bg: "bg-blue-500/10" },
  { icon: <FaUsers className="text-pink-400" />, label: "Students", bg: "bg-pink-500/10" },
];

// ─── Main Component ───────────────────────────────────────────────────────────

const InstructorSupport = () => {
  const { user } = useSelector(s => s.profile);

  const [formData, setFormData] = useState({ category: '', priority: 'medium', message: '' });
  const [attachment, setAttachment] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const [attachmentUrl, setAttachmentUrl] = useState(null);
  const fileInputRef = useRef(null);

  const [tickets, setTickets] = useState([]);
  const [ticketsLoading, setTicketsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const fetchTickets = useCallback(async () => {
    setTicketsLoading(true);
    const data = await getMyTickets({ status: filterStatus, search });
    setTickets(data);
    setTicketsLoading(false);
  }, [filterStatus, search]);

  useEffect(() => { fetchTickets(); }, [fetchTickets]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("File must be under 5 MB"); return; }
    setAttachment(file);
    const reader = new FileReader();
    reader.onloadend = () => setAttachmentPreview(reader.result);
    reader.readAsDataURL(file);
    setUploading(true);
    const url = await uploadSupportAttachment(file, user?.id ?? "guest");
    setAttachmentUrl(url);
    setUploading(false);
  };

  const removeAttachment = () => {
    setAttachment(null); setAttachmentPreview(null); setAttachmentUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category || !formData.message.trim()) { toast.error("Please select a category and describe your issue."); return; }
    if (uploading) { toast.error("Please wait for upload to finish."); return; }
    setSubmitting(true);
    const result = await createTicket({
      subject: formData.category, category: formData.category,
      message: formData.message, priority: formData.priority, attachment_url: attachmentUrl,
    });
    setSubmitting(false);
    if (result.success) {
      setFormData({ category: '', priority: 'medium', message: '' });
      removeAttachment();
      fetchTickets();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-12 text-richblack-5">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3"><FaHeadset className="text-yellow-400" /> Instructor Support</h1>
          <p className="mt-2 text-richblack-300 font-medium">Dedicated support for content creators and educators.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="bg-richblack-800 p-4 rounded-2xl border border-richblack-700 flex items-center gap-3">
            <div className="w-9 h-9 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-400"><FaEnvelope /></div>
            <div><p className="text-[10px] uppercase tracking-wider text-richblack-400">Priority Email</p><p className="text-sm font-bold">instructors@edtech.com</p></div>
          </div>
          <div className="bg-richblack-800 p-4 rounded-2xl border border-richblack-700 flex items-center gap-3">
            <div className="w-9 h-9 bg-green-500/10 rounded-full flex items-center justify-center text-green-400"><FaBolt /></div>
            <div><p className="text-[10px] uppercase tracking-wider text-richblack-400">Response SLA</p><p className="text-sm font-bold">Under 4 hours</p></div>
          </div>
        </div>
      </div>

      {/* Quick help shortcuts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {QUICK_HELP.map(({ icon, label, bg }) => (
          <div key={label} onClick={() => setFormData(p => ({ ...p, category: `${label} Issue` }))}
            className="bg-richblack-800 border border-richblack-700 rounded-2xl p-5 flex flex-col items-center gap-3 cursor-pointer hover:border-yellow-500/30 transition-all group">
            <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>{icon}</div>
            <span className="text-sm font-bold text-richblack-300 group-hover:text-yellow-400 transition-colors">{label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* LEFT — Form */}
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-richblack-800 rounded-3xl p-6 md:p-8 border border-richblack-700 shadow-xl">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6"><FaTicketAlt className="text-yellow-400" /> Raise a Support Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="space-y-2">
                <label className="text-sm text-richblack-300 ml-1 font-medium">Issue Category <span className="text-pink-400">*</span></label>
                <select value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                  className="w-full bg-richblack-900 border border-richblack-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-richblack-5">
                  <option value="" disabled>Select category</option>
                  {INSTRUCTOR_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-richblack-300 ml-1 font-medium">Priority</label>
                <div className="flex gap-3">
                  {["low","medium","high","urgent"].map(p => (
                    <button key={p} type="button"
                      onClick={() => setFormData(prev => ({ ...prev, priority: p }))}
                      className={`flex-1 py-2 rounded-xl border text-xs font-bold uppercase tracking-wide transition-all ${formData.priority === p ? "bg-yellow-500 border-yellow-500 text-richblack-900 shadow-lg shadow-yellow-500/20" : "border-richblack-700 text-richblack-400 hover:border-yellow-500/40"}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-richblack-300 ml-1 font-medium">Describe the Issue <span className="text-pink-400">*</span></label>
                <textarea value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  placeholder="Provide as much detail as possible — error messages, course IDs, timestamps…" rows={5}
                  className="w-full bg-richblack-900 border border-richblack-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all text-richblack-5 resize-none" />
              </div>

              {/* Attachment */}
              <div className="space-y-2">
                <label className="text-sm text-richblack-300 ml-1 font-medium flex items-center gap-2">
                  <FaImage className="text-xs text-yellow-400" /> Screenshot / Evidence
                  {uploading && <FaSpinner className="text-yellow-400 animate-spin text-xs" />}
                </label>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*,.pdf" className="hidden" />
                {!attachmentPreview ? (
                  <button type="button" onClick={() => fileInputRef.current.click()}
                    className="w-full py-6 border-2 border-dashed border-richblack-700 rounded-2xl flex flex-col items-center justify-center gap-2 text-richblack-500 hover:text-yellow-400 hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all group">
                    <FaImage className="text-2xl group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest">Click to upload</span>
                    <span className="text-[10px] text-richblack-600">JPG, PNG, PDF — max 5 MB</span>
                  </button>
                ) : (
                  <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-richblack-900">
                    <img src={attachmentPreview} alt="preview" className="w-full max-h-40 object-contain" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button type="button" onClick={() => fileInputRef.current.click()} className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"><FaImage /></button>
                      <button type="button" onClick={removeAttachment} className="p-3 bg-red-500/20 hover:bg-red-500/40 rounded-full text-red-400 transition-all"><FaTimesCircle /></button>
                    </div>
                  </div>
                )}
              </div>

              <button type="submit" disabled={submitting || uploading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-richblack-700 disabled:cursor-not-allowed text-richblack-900 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20">
                {submitting ? <><FaSpinner className="animate-spin" /> Submitting…</> : <><FaPaperPlane /> Submit Ticket</>}
              </button>
            </form>
          </motion.div>

          {/* FAQ */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
            className="bg-richblack-800 rounded-3xl p-6 md:p-8 border border-richblack-700 shadow-xl">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6"><FaQuestionCircle className="text-yellow-400" /> Instructor FAQs</h2>
            <div className="space-y-3">
              {INSTRUCTOR_FAQS.map((faq, i) => (
                <div key={i} className="border border-richblack-700 rounded-2xl overflow-hidden">
                  <button onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 bg-richblack-900/50 hover:bg-richblack-900 transition-colors text-left">
                    <span className="font-medium text-richblack-5 text-sm">{faq.q}</span>
                    {expandedFAQ === i ? <FaChevronUp className="text-yellow-400 shrink-0" /> : <FaChevronDown className="text-richblack-500 shrink-0" />}
                  </button>
                  <AnimatePresence>
                    {expandedFAQ === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <p className="p-4 text-richblack-300 text-sm leading-relaxed border-t border-richblack-700 bg-richblack-900/20">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT — Tickets */}
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="bg-richblack-800 rounded-3xl p-6 md:p-8 border border-richblack-700 shadow-xl">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold flex items-center gap-2"><FaHistory className="text-pink-500" /> My Tickets</h2>
              <span className="text-xs bg-richblack-900 px-3 py-1 rounded-full text-richblack-400 border border-richblack-700">{tickets.length} found</span>
            </div>

            <div className="flex gap-2 mb-5">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-richblack-500 text-xs" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tickets…"
                  className="w-full bg-richblack-900 border border-richblack-700 rounded-xl pl-8 pr-3 py-2 text-sm text-richblack-5 focus:outline-none focus:ring-1 focus:ring-yellow-500" />
              </div>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                className="bg-richblack-900 border border-richblack-700 rounded-xl px-3 py-2 text-sm text-richblack-5 focus:outline-none">
                <option value="">All Status</option>
                {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>

            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
              {ticketsLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-richblack-900/50 rounded-2xl p-5 border border-richblack-700/50 animate-pulse">
                    <div className="h-3 bg-richblack-700 rounded w-24 mb-3" /><div className="h-4 bg-richblack-700 rounded w-3/4 mb-4" /><div className="h-2 bg-richblack-700 rounded w-1/2" />
                  </div>
                ))
              ) : tickets.length === 0 ? (
                <div className="text-center py-14">
                  <div className="w-16 h-16 bg-richblack-900 rounded-full flex items-center justify-center mx-auto mb-4 text-richblack-600 text-2xl"><FaTicketAlt /></div>
                  <p className="text-richblack-400 font-medium">No tickets yet</p>
                  <p className="text-richblack-600 text-sm mt-1">Submit a ticket if you need help.</p>
                </div>
              ) : tickets.map(t => <TicketCard key={t.id} ticket={t} onClick={() => setSelectedTicket(t)} />)}
            </div>
          </motion.div>

          {/* SLA Card */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-yellow-900/15 to-orange-900/15 rounded-3xl p-8 border border-white/5 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                <span className="text-sm font-bold text-yellow-400 uppercase tracking-widest">Instructor Priority SLA</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Priority Support Active</h3>
              <p className="text-richblack-300 text-sm mb-5">Instructors receive priority responses within 4 hours on business days.</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <FaShieldAlt className="text-yellow-400" />, label: "Dedicated team" },
                  { icon: <FaClock className="text-green-400" />, label: "4h SLA" },
                  { icon: <FaPhoneAlt className="text-blue-400" />, label: "Phone priority" },
                  { icon: <FaBolt className="text-pink-400" />, label: "Fast resolution" },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-xs text-richblack-300 bg-white/5 px-3 py-2.5 rounded-xl border border-white/10">
                    {icon} {label}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <FaHeadset className="text-9xl rotate-12" />
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedTicket && <TicketModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default InstructorSupport;
