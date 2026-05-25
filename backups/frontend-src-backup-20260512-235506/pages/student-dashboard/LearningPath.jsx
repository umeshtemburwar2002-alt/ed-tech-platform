import React from 'react';
import { PlayCircle, CheckCircle, Lock } from 'lucide-react';
import { GlassCard, Badge, ProgressBar } from '../../components/dashboard/Common';
import { LEARNING_MODULES } from '../../data/student-dashboard-data';

const LearningPathPage = () => (
  <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <Badge text="Full Stack Developer" color="emerald" />
        <h2 className="text-3xl font-bold text-white mt-3">Your Learning Path</h2>
        <p className="text-gray-500 mt-1">5 of 8 modules complete • 62% overall</p>
      </div>
      <div className="w-full md:w-64 space-y-2">
        <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase"><span>Overall Progress</span><span>62%</span></div>
        <ProgressBar pct={62} color="from-emerald-500 to-teal-600" />
      </div>
    </div>

    <div className="relative space-y-8">
      <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-white/10" />
      {LEARNING_MODULES.map((mod, i) => (
        <div key={mod.id} className={`relative pl-16 group ${mod.status === 'LOCKED' ? 'opacity-60' : ''}`}>
          <div className={`absolute left-0 top-6 w-12 h-12 rounded-full border-4 border-gray-950 z-10 flex items-center justify-center transition-all duration-300 ${
            mod.status === 'DONE' ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white' :
            mod.status === 'CURRENT' ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white ring-4 ring-indigo-500/20' :
            'bg-gray-800 text-gray-500'
          }`}>
            {mod.status === 'DONE' ? <CheckCircle className="w-6 h-6" /> : mod.status === 'CURRENT' ? <PlayCircle className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
            {mod.status === 'CURRENT' && <div className="absolute inset-0 rounded-full border-4 border-indigo-500 animate-ping opacity-30" />}
          </div>
          <GlassCard className={`!p-6 ${mod.status === 'CURRENT' ? 'border-l-4 border-l-indigo-500 bg-white/10' : ''}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Module {mod.num}</span>
                <h3 className="text-xl font-bold text-white mt-1">{mod.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{mod.desc}</p>
              </div>
              <div className="shrink-0">
                {mod.status === 'DONE' ? (
                  <button className="text-xs font-bold text-gray-400 hover:text-white px-4 py-2 rounded-xl bg-white/5 border border-white/10 transition-all">Revisit</button>
                ) : mod.status === 'CURRENT' ? (
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-xs font-bold px-6 py-2 rounded-xl transition-all active:scale-95">Continue Learning</button>
                ) : (
                  <span className="text-xs font-bold text-gray-600 italic">Complete Module {i} to unlock</span>
                )}
              </div>
            </div>
          </GlassCard>
        </div>
      ))}
    </div>
  </div>
);

export default LearningPathPage;
