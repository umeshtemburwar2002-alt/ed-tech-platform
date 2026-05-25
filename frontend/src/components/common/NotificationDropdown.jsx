import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';

const NotificationDropdown = ({ isOpen, onClose, notifications = [] }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute top-full right-0 w-80 bg-[#000814] border border-white/10 rounded-2xl p-0 overflow-hidden shadow-2xl z-[110] backdrop-blur-xl"
        >
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <h3 className="font-bold text-white text-sm">Notifications</h3>
            <button className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest hover:underline">Mark all read</button>
          </div>
          <div className="max-h-80 overflow-y-auto custom-scrollbar">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <div key={n.id} className="p-4 border-b border-white/5 hover:bg-white/[0.03] transition-colors cursor-pointer group">
                  <h4 className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{n.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{n.message}</p>
                  <span className="text-[10px] text-slate-500 mt-2 block font-medium">{n.time}</span>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500 text-sm">
                No new notifications
              </div>
            )}
          </div>
          <Link 
            to="/dashboard/notifications" 
            onClick={onClose} 
            className="block p-3 text-center text-xs font-bold text-slate-400 hover:text-white transition-colors bg-white/[0.02]"
          >
            View All
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationDropdown;
