import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, X, Video, BookOpen, Sparkles, Award } from 'lucide-react';
import toast from 'react-hot-toast';

const ClipboardList = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

const MOCK_NOTIFICATIONS = [
  { id: '1', type: 'assignment_reminder', title: 'React Hooks Assignment', body: 'Due in 2 hours', icon: ClipboardList, color: 'amber', time: '2m ago', read: false },
  { id: '2', type: 'live_class_alert', title: 'Live class starts soon', body: 'Join now - React Advanced', icon: Video, color: 'indigo', time: '15m ago', read: false },
  { id: '3', type: 'certificate_earned', title: 'Certificate Earned!', body: 'Tailwind CSS Complete', icon: Award, color: 'gold', time: '1h ago', read: true },
  { id: '4', type: 'course_update', title: 'New Lecture Added', body: 'React Complete Guide', icon: BookOpen, color: 'teal', time: '2h ago', read: true },
  { id: '5', type: 'ai_recommendation', title: 'AI Recommendation', body: 'Try Advanced TypeScript', icon: Sparkles, color: 'purple', time: '1d ago', read: true },
];

export default function NotificationDropdown({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState('all');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read!');
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read) 
    : notifications;

  const getIconComponent = (IconComponent) => {
    if (!IconComponent) return <Bell className="w-5 h-5" />;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-full mt-2 w-[380px] bg-[#0F1420] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-indigo-400" />
              <h3 className="text-white font-semibold">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 bg-indigo-500 text-white text-xs font-bold rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  <Check className="w-3 h-3" />
                  Mark all read
                </button>
              )}
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-2 p-3 border-b border-white/5">
            {['all', 'unread'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors
                  ${filter === f 
                    ? 'bg-indigo-500/20 text-indigo-400' 
                    : 'text-gray-400 hover:bg-white/5'
                  }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {filteredNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => markAsRead(notif.id)}
                    className={`p-4 hover:bg-white/5 cursor-pointer transition-colors ${
                      !notif.read ? 'bg-indigo-500/5' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                        ${notif.color === 'amber' ? 'bg-amber-500/20 text-amber-400' :
                          notif.color === 'indigo' ? 'bg-indigo-500/20 text-indigo-400' :
                          notif.color === 'gold' ? 'bg-yellow-500/20 text-yellow-400' :
                          notif.color === 'teal' ? 'bg-teal-500/20 text-teal-400' :
                          notif.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {getIconComponent(notif.icon)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`font-semibold text-sm ${!notif.read ? 'text-white' : 'text-gray-300'}`}>
                            {notif.title}
                          </p>
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {notif.body}
                        </p>
                      </div>
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0 mt-2" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/10">
            <button className="w-full py-2 text-center text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              View all notifications →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
