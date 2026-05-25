import React, { useState } from 'react';
import { GlassCard, TabBar } from '../../components/dashboard/Common';
import { NOTIFICATIONS_DATA } from '../../data/student-dashboard-data';

const NotificationsPage = () => {
  const [filter, setFilter] = useState('All');
  const [readIds, setReadIds] = useState(new Set([6, 7, 8]));

  const filtered = NOTIFICATIONS_DATA.filter(n => filter === 'All' || n.type === filter || (filter === 'Unread' && !readIds.has(n.id)));

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div><h2 className="text-2xl font-bold text-white">Notifications</h2><p className="text-gray-500 text-sm">Stay updated with activities</p></div>
        <button onClick={() => setReadIds(new Set(NOTIFICATIONS_DATA.map(n=>n.id)))} className="text-xs text-indigo-400 font-bold hover:underline">Mark all as read</button>
      </div>
      <TabBar tabs={['All', 'Unread', 'Courses', 'Quizzes', 'System']} active={filter} onChange={setFilter} />
      <div className="space-y-4">
        {filtered.map(n => (
          <GlassCard key={n.id} className={`flex items-center gap-6 group cursor-pointer transition-all ${!readIds.has(n.id) ? 'bg-indigo-600/5 border-indigo-500/20' : 'opacity-60'}`} onClick={() => { const nxt = new Set(readIds); nxt.add(n.id); setReadIds(nxt); }}>
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"><n.icon className="w-6 h-6 text-gray-400 group-hover:text-indigo-400 transition-colors" /></div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1"><h4 className={`text-sm font-bold truncate ${!readIds.has(n.id) ? 'text-white' : 'text-gray-400'}`}>{n.title}</h4><span className="text-[10px] text-gray-600 font-bold uppercase ml-4">{n.time}</span></div>
              <p className="text-xs text-gray-500 truncate">{n.desc}</p>
            </div>
            {!readIds.has(n.id) && <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50 shrink-0" />}
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
