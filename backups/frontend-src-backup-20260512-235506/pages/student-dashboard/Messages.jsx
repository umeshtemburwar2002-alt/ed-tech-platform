import React, { useState } from 'react';
import { Search, History, MoreHorizontal, Smile, Paperclip, Send } from 'lucide-react';
import { GlassCard, Avatar } from '../../components/dashboard/Common';
import { MESSAGES_DATA } from '../../data/student-dashboard-data';

const MessagesPage = () => {
  const [selectedId, setSelectedId] = useState(1);
  const selected = MESSAGES_DATA.find(m => m.id === selectedId);
  const [msgInput, setMsgInput] = useState('');

  const handleSend = () => { if (msgInput.trim()) { setMsgInput(''); } };

  return (
    <div className="h-[calc(100vh-160px)] flex gap-6 animate-in fade-in duration-500">
      <GlassCard className="w-80 flex flex-col !p-0 overflow-hidden shrink-0">
        <div className="p-6 border-b border-white/10 flex justify-between items-center"><h3 className="text-lg font-bold text-white">Messages</h3><button className="p-2 text-indigo-400"><History className="w-5 h-5" /></button></div>
        <div className="p-4"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" /><input type="text" placeholder="Search..." className="w-full bg-gray-900 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none" /></div></div>
        <div className="flex-1 overflow-y-auto">
          {MESSAGES_DATA.map(chat => (
            <button key={chat.id} onClick={() => setSelectedId(chat.id)} className={`w-full p-4 flex gap-4 border-b border-white/5 relative transition-all ${selectedId === chat.id ? 'bg-indigo-600/10 border-l-4 border-l-indigo-500' : 'hover:bg-white/5'}`}>
              <Avatar initials={chat.avatar} size="w-12 h-12" />
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-start mb-1"><h4 className="text-sm font-bold text-white truncate">{chat.teacher}</h4><span className="text-[10px] text-gray-500">10:45 AM</span></div>
                <p className="text-xs text-gray-400 truncate">{chat.subject}</p>
                {chat.unread > 0 && <span className="absolute bottom-4 right-4 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-lg">{chat.unread}</span>}
              </div>
            </button>
          ))}
        </div>
      </GlassCard>
      <GlassCard className="flex-1 flex flex-col !p-0 overflow-hidden">
        <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-4">
            <Avatar initials={selected.avatar} size="w-11 h-11" />
            <div><h4 className="text-sm font-bold text-white flex items-center gap-2">{selected.teacher}{selected.online && <span className="w-2 h-2 bg-emerald-500 rounded-full" />}</h4><p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{selected.subject}</p></div>
          </div>
          <button className="p-2 text-gray-500 hover:text-white"><MoreHorizontal className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="flex items-center gap-4"><div className="h-[1px] flex-1 bg-white/5" /><span className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">Today</span><div className="h-[1px] flex-1 bg-white/5" /></div>
          {selected.messages.map((m, i) => (
            <div key={i} className={`flex flex-col gap-2 max-w-[70%] ${m.type === 'sent' ? 'ml-auto items-end' : ''}`}>
              <div className={`p-5 rounded-2xl ${m.type === 'sent' ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-tr-sm' : 'bg-gray-800 text-gray-100 rounded-tl-sm'} text-sm leading-relaxed shadow-xl`}>{m.text}</div>
              <span className="text-[10px] text-gray-600 font-bold uppercase">{m.time}</span>
            </div>
          ))}
        </div>
        <div className="p-6 bg-gray-950/50 backdrop-blur-xl">
          <div className="flex items-center gap-4 bg-gray-900 border border-white/10 rounded-2xl p-2.5 pl-6">
            <button className="text-gray-500 hover:text-indigo-400"><Smile className="w-5 h-5" /></button>
            <button className="text-gray-500 hover:text-indigo-400 border-r border-white/10 pr-4"><Paperclip className="w-5 h-5" /></button>
            <input type="text" placeholder="Type message..." value={msgInput} onChange={(e) => setMsgInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()} className="flex-1 bg-transparent border-none outline-none text-sm text-white py-2" />
            <button onClick={handleSend} className="bg-indigo-600 p-3 rounded-xl text-white hover:bg-indigo-500 transition-all active:scale-95"><Send className="w-5 h-5" /></button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default MessagesPage;
