import React from 'react';
import { 
  BookOpen, Brain, Award, Clock
} from 'lucide-react';

export const StatCard = ({ icon: Icon, label, value, trend, color = "indigo" }) => {
  const colors = {
    indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 transition-all duration-200 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl ${colors[color]} border`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-tighter ${trend?.startsWith('+') ? 'text-emerald-400' : 'text-gray-500'}`}>{trend}</span>
      </div>
      <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{label}</h3>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </div>
  );
};

export const ProgressBar = ({ pct, color = "from-indigo-600 to-purple-700", size = "h-1.5" }) => (
  <div className={`w-full ${size} bg-white/5 rounded-full overflow-hidden`}>
    <div className={`h-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`} style={{ width: `${pct}%` }} />
  </div>
);

export const Avatar = ({ initials, color = "bg-indigo-500", size = "w-10 h-10" }) => (
  <div className={`${size} rounded-2xl ${color} flex items-center justify-center font-bold text-white shadow-lg shadow-black/20 shrink-0`}>
    {initials}
  </div>
);

export const Badge = ({ text, color = "indigo" }) => {
  const colors = {
    indigo: "text-indigo-400 bg-indigo-500/15 border-indigo-500/30",
    emerald: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30",
    amber: "text-amber-400 bg-amber-500/15 border-amber-500/30",
    red: "text-red-400 bg-red-500/15 border-red-500/30",
    blue: "text-blue-400 bg-blue-500/15 border-blue-500/30",
    gray: "text-gray-400 bg-gray-500/15 border-gray-500/30",
  };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${colors[color]}`}>
      {text}
    </span>
  );
};

export const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 transition-all duration-200 hover:bg-white/10 hover:border-white/20 ${className}`}>
    {children}
  </div>
);

export const EmptyState = ({ icon: Icon, title, subtitle, ctaText, onCta }) => (
  <div className="py-20 flex flex-col items-center text-center animate-in fade-in duration-500">
    <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-6">
      <Icon className="w-10 h-10 text-gray-600" />
    </div>
    <h3 className="text-xl font-bold text-white">{title}</h3>
    <p className="text-gray-500 mt-2 max-w-xs">{subtitle}</p>
    {ctaText && (
      <button onClick={onCta} className="mt-8 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2 rounded-xl text-sm font-bold transition-all">
        {ctaText}
      </button>
    )}
  </div>
);

export const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl bg-gray-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        {children}
      </div>
    </div>
  );
};

export const TabBar = ({ tabs, active, onChange }) => (
  <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl overflow-x-auto w-fit">
    {tabs.map((tab) => (
      <button
        key={tab}
        onClick={() => onChange(tab)}
        className={`px-6 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
          active === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'text-gray-500 hover:text-white'
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
);
