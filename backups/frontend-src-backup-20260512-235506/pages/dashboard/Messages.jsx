import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaPaperPlane, FaSearch, FaHistory, FaCheckDouble, FaPhoneAlt, FaVideo, FaEllipsisV, FaPlus } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Messages = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const chats = [
    { id: 1, name: "Dr. Emily Smith", role: "Instructor", lastMsg: "Don't forget the assignment!", time: "10:45 AM", unread: 2, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" },
    { id: 2, name: "Admin Support", role: "Support", lastMsg: "Your ticket #12345 resolved.", time: "Yesterday", unread: 0, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" },
    { id: 3, name: "Prof. Michael Brown", role: "Instructor", lastMsg: "See you in class tomorrow.", time: "Monday", unread: 0, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" },
  ];

  const conversation = [
    { id: 1, sender: "them", text: "Hello! How are you doing with the React module?", time: "10:30 AM" },
    { id: 2, sender: "me", text: "I'm doing great, but I have a doubt in useEffect hook.", time: "10:35 AM" },
    { id: 3, sender: "them", text: "Sure, ask away! I'm here to help.", time: "10:38 AM" },
    { id: 4, sender: "them", text: "Don't forget to submit the assignment before tomorrow midnight!", time: "10:45 AM" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    toast.success("Message Sent!");
    setNewMessage("");
  };

  const activeChatData = chats.find(c => c.id === activeChat);

  return (
    <div className="max-w-7xl mx-auto h-[75vh] flex bg-richblack-800 rounded-3xl border border-richblack-700 shadow-2xl overflow-hidden relative">
      
      {/* Sidebar (Message List) */}
      <div className="w-1/3 border-r border-richblack-700 flex flex-col bg-richblack-900/50">
        <div className="p-6 border-b border-richblack-700 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-white">Messages</h2>
            <button className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 hover:scale-110 transition-transform">
              <FaPlus className="text-sm" />
            </button>
          </div>
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
            <input 
              type="text" 
              placeholder="Search chats..."
              className="w-full bg-richblack-900 border border-richblack-700 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeChat === chat.id ? 'bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_15px_rgba(0,180,216,0.05)]' : 'hover:bg-white/5 border border-transparent'}`}
            >
              <div className="relative shrink-0">
                <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-2xl object-cover border border-white/10" />
                {chat.unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-richblack-800 shadow-lg">
                    {chat.unread}
                  </span>
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className={`font-bold text-sm truncate ${activeChat === chat.id ? 'text-cyan-400' : 'text-white'}`}>{chat.name}</h4>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{chat.time}</span>
                </div>
                <p className="text-xs text-slate-500 truncate font-medium">{chat.lastMsg}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col relative bg-[#000814]/30">
        
        {/* Chat Header */}
        <div className="p-6 border-b border-richblack-700 flex items-center justify-between bg-richblack-800/80 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <img src={activeChatData?.avatar} alt={activeChatData?.name} className="w-12 h-12 rounded-2xl border border-white/10" />
            <div>
              <h3 className="text-lg font-black text-white">{activeChatData?.name}</h3>
              <p className="text-[10px] text-cyan-400 font-black uppercase tracking-widest">{activeChatData?.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all border border-white/10">
              <FaPhoneAlt className="text-sm" />
            </button>
            <button className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all border border-white/10">
              <FaVideo className="text-sm" />
            </button>
            <button className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all border border-white/10">
              <FaEllipsisV className="text-sm" />
            </button>
          </div>
        </div>

        {/* Conversation Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-6">
          {conversation.map((msg, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i} 
              className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
            >
              <div className={`max-w-[70%] p-4 rounded-2xl text-sm font-medium shadow-lg ${msg.sender === 'me' ? 'bg-cyan-500 text-white rounded-tr-none shadow-cyan-500/10' : 'bg-richblack-900/80 text-slate-200 rounded-tl-none border border-richblack-700'}`}>
                {msg.text}
              </div>
              <div className="flex items-center gap-2 mt-2 px-1">
                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-tight">{msg.time}</span>
                {msg.sender === 'me' && <FaCheckDouble className="text-cyan-500 text-[10px]" />}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-richblack-800/80 backdrop-blur-xl border-t border-richblack-700">
          <form onSubmit={handleSendMessage} className="flex items-center gap-4">
            <input 
              type="text" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-richblack-900 border border-richblack-700 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-medium"
            />
            <button 
              type="submit"
              className="w-14 h-14 bg-cyan-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-cyan-500/20 hover:scale-105 transition-transform group"
            >
              <FaPaperPlane className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Messages;
