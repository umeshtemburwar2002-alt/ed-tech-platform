import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ChevronDown, CheckCircle, Mail, Zap, BookOpen, Paperclip } from 'lucide-react';
import { GlassCard, Badge } from '../../components/dashboard/Common';
import { FAQ_DATA } from '../../data/student-dashboard-data';

const SupportPage = () => {
  // ── Real user data from Redux ─────────────────────────────────────────────
  const { user } = useSelector((s) => s.profile);
  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
    user?.email?.split('@')[0] ||
    '';
  const userEmail = user?.email || '';

  const [openIdx, setOpenIdx] = useState(null);
  const [formSent, setFormSent] = useState(false);

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="text-center space-y-4"><h2 className="text-4xl font-bold text-white">How can we help?</h2><p className="text-gray-500 text-lg">Browse FAQ or contact our support experts</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h3>
          {FAQ_DATA.map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all">
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full p-5 flex justify-between items-center text-left hover:bg-white/5 transition-colors">
                <span className="text-sm font-bold text-gray-200">{item.q}</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${openIdx === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="p-5 pt-0 text-sm text-gray-400 leading-relaxed border-t border-white/5">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
        <GlassCard className="h-fit">
          {formSent ? (
            <div className="py-20 flex flex-col items-center text-center animate-in zoom-in">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6"><CheckCircle className="w-10 h-10 text-emerald-500" /></div>
              <h3 className="text-2xl font-bold text-white">Message Sent!</h3><p className="text-gray-500 mt-2">We'll get back to you within 2 hours.</p>
              <button onClick={() => setFormSent(false)} className="mt-8 text-indigo-400 font-bold hover:underline">Send another message</button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setFormSent(true); }}>
              <div className="flex justify-between items-center mb-2"><h3 className="text-xl font-bold text-white">Get in Touch</h3><Badge text="Replies within 2 hours" color="emerald" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><label className="text-[10px] font-bold text-gray-500 uppercase">Name</label><input required type="text" defaultValue={displayName} className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50" placeholder="Your name" /></div>
                <div className="space-y-2"><label className="text-[10px] font-bold text-gray-500 uppercase">Email</label><input required type="email" defaultValue={userEmail} className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50" placeholder="your@email.com" /></div>
              </div>
              <div className="space-y-2"><label className="text-[10px] font-bold text-gray-500 uppercase">Subject</label><select className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"><option>Course Content Issue</option><option>Technical Support</option><option>Billing & Refund</option><option>General Inquiry</option></select></div>
              <div className="space-y-2"><label className="text-[10px] font-bold text-gray-500 uppercase">Message</label><textarea required rows={5} className="w-full bg-gray-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none" placeholder="Describe your issue..." /></div>
              <div className="flex items-center gap-2 text-gray-500"><button type="button" className="p-2 hover:text-white transition-colors"><Paperclip className="w-5 h-5" /></button><span className="text-xs">Attach screenshot (max 5MB)</span></div>
              <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all">Send Message →</button>
            </form>
          )}
        </GlassCard>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center group cursor-pointer hover:bg-white/10 transition-all"><div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-4"><Mail className="w-6 h-6 text-indigo-400" /></div><h4 className="font-bold text-white">Email Support</h4><p className="text-xs text-gray-500 mt-1">support@eduspace.io</p></div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center group cursor-pointer hover:bg-white/10 transition-all"><div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4"><Zap className="w-6 h-6 text-emerald-400" /></div><h4 className="font-bold text-white">Live Chat</h4><p className="text-xs text-gray-500 mt-1">Average wait: 2m</p></div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center group cursor-pointer hover:bg-white/10 transition-all"><div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4"><BookOpen className="w-6 h-6 text-blue-400" /></div><h4 className="font-bold text-white">Documentation</h4><p className="text-xs text-gray-500 mt-1">Self-serve guides</p></div>
      </div>
    </div>
  );
};

export default SupportPage;
