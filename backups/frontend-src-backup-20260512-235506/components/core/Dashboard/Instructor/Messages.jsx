import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser, FaPaperPlane, FaSearch, FaCheckDouble, FaPhoneAlt,
  FaVideo, FaEllipsisV, FaPlus, FaGraduationCap, FaSmile,
  FaImages, FaTimes, FaDotCircle
} from "react-icons/fa";
import { toast } from "react-hot-toast";

const STUDENTS = [
  { id: 1, name: "Aarav Sharma", role: "Student", course: "Modern JavaScript", lastMsg: "I've finished the assignment!", time: "10:45 AM", unread: 2, online: true, avatar: "AS" },
  { id: 2, name: "Priya Singh", role: "Student", course: "React Bootcamp", lastMsg: "Can we have a doubt session?", time: "Yesterday", unread: 0, online: true, avatar: "PS" },
  { id: 3, name: "Rajan Mehta", role: "Student", course: "Node.js Mastery", lastMsg: "Thank you for the feedback!", time: "Monday", unread: 0, online: false, avatar: "RM" },
  { id: 4, name: "Emma Wilson", role: "Student", course: "UI/UX Design", lastMsg: "When is the next live class?", time: "Sunday", unread: 1, online: false, avatar: "EW" },
  { id: 5, name: "Lucas Martin", role: "Student", course: "Full Stack MERN", lastMsg: "Got it, thanks! 🙌", time: "Sat", unread: 0, online: true, avatar: "LM" },
];

const CONVERSATIONS = {
  1: [
    { id: 1, sender: "them", text: "Hello Instructor! I'm working on the portfolio wireframes.", time: "10:30 AM" },
    { id: 2, sender: "me", text: "That's great! Make sure to focus on accessibility and responsive design.", time: "10:35 AM" },
    { id: 3, sender: "them", text: "Sure, I've used high contrast colors and tested on mobile.", time: "10:38 AM" },
    { id: 4, sender: "them", text: "I've finished the assignment! Please check it when you have time.", time: "10:45 AM" },
  ],
  2: [
    { id: 1, sender: "them", text: "Hi, I'm having trouble understanding React hooks.", time: "Yesterday 3:00 PM" },
    { id: 2, sender: "me", text: "No worries! Let's schedule a 1:1 doubt session. What time works for you?", time: "Yesterday 3:05 PM" },
    { id: 3, sender: "them", text: "Can we have a doubt session?", time: "Yesterday 3:10 PM" },
  ],
  3: [
    { id: 1, sender: "them", text: "I struggled with async/await but your explanation helped a lot.", time: "Monday 9:00 AM" },
    { id: 2, sender: "me", text: "Glad it helped! Practice with more real-world examples.", time: "Monday 9:05 AM" },
    { id: 3, sender: "them", text: "Thank you for the feedback!", time: "Monday 9:10 AM" },
  ],
  4: [
    { id: 1, sender: "them", text: "When is the next live class?", time: "Sunday 2:00 PM" },
  ],
  5: [
    { id: 1, sender: "me", text: "Great job on the last assignment, Lucas!", time: "Sat 11:00 AM" },
    { id: 2, sender: "them", text: "Got it, thanks! 🙌", time: "Sat 11:05 AM" },
  ],
};

export default function Messages() {
  const { user } = useSelector((state) => state.profile);
  const [activeChat, setActiveChat] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState(CONVERSATIONS);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat, messages]);

  const filteredStudents = STUDENTS.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeChatData = STUDENTS.find((s) => s.id === activeChat);
  const currentConversation = messages[activeChat] || [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const msg = {
      id: Date.now(),
      sender: "me",
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), msg],
    }));
    setNewMessage("");
    inputRef.current?.focus();

    // Simulate typing response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "Thanks for the clarification! That really helps.",
        "Got it, I'll give it a try right away!",
        "Understood. I'll update my assignment accordingly.",
        "Thank you so much! 🙏",
      ];
      const reply = {
        id: Date.now() + 1,
        sender: "them",
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), reply],
      }));
    }, 2000);
  };

  return (
    <div className="h-[80vh] flex bg-richblack-800 rounded-3xl border border-richblack-700 shadow-2xl overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 shrink-0 border-r border-richblack-700 flex flex-col bg-richblack-900/60">
        {/* Header */}
        <div className="p-5 border-b border-richblack-700 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white">Student Inbox</h2>
            <button className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20 hover:scale-110 transition-transform">
              <FaPlus className="text-xs" />
            </button>
          </div>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-richblack-800 border border-richblack-700 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Student List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
          {filteredStudents.map((student) => (
            <button
              key={student.id}
              onClick={() => setActiveChat(student.id)}
              className={`w-full flex items-center gap-3 p-3.5 rounded-2xl transition-all text-left ${
                activeChat === student.id
                  ? "bg-blue-600/10 border border-blue-600/20"
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              <div className="relative shrink-0">
                <div className="w-11 h-11 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center text-sm font-black border border-blue-500/20">
                  {student.avatar}
                </div>
                {student.online && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-richblack-900" />
                )}
                {student.unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-richblack-800">
                    {student.unread}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <h4 className={`font-bold text-sm truncate ${activeChat === student.id ? "text-blue-400" : "text-white"}`}>
                    {student.name}
                  </h4>
                  <span className="text-[10px] text-slate-500 font-bold shrink-0 ml-1">{student.time}</span>
                </div>
                <p className="text-[10px] text-blue-400/70 font-bold uppercase tracking-wide truncate mb-0.5">{student.course}</p>
                <p className="text-xs text-slate-500 truncate">{student.lastMsg}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-richblack-700 flex items-center justify-between bg-richblack-800/80 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center text-sm font-black border border-blue-500/20">
                {activeChatData?.avatar}
              </div>
              {activeChatData?.online && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-richblack-800" />
              )}
            </div>
            <div>
              <h3 className="text-base font-black text-white">{activeChatData?.name}</h3>
              <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest flex items-center gap-1.5">
                <FaGraduationCap className="text-xs" />
                {activeChatData?.course}
                {activeChatData?.online && (
                  <span className="flex items-center gap-1 text-green-400 ml-2">
                    <FaDotCircle className="text-[6px]" /> Online
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {[{ icon: FaPhoneAlt, label: "Call" }, { icon: FaVideo, label: "Video" }, { icon: FaEllipsisV, label: "More" }].map((btn, i) => (
              <button
                key={i}
                onClick={() => toast(`${btn.label} feature coming soon!`)}
                className="w-9 h-9 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all border border-white/10"
              >
                <btn.icon className="text-sm" />
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4 bg-[#000814]/40">
          {currentConversation.map((msg, i) => (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              key={msg.id}
              className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[70%] px-5 py-3 rounded-2xl text-sm font-medium shadow-lg ${
                  msg.sender === "me"
                    ? "bg-blue-600 text-white rounded-tr-none shadow-blue-600/15"
                    : "bg-richblack-800 text-slate-200 rounded-tl-none border border-richblack-700"
                }`}
              >
                {msg.text}
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 px-1">
                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-tight">{msg.time}</span>
                {msg.sender === "me" && <FaCheckDouble className="text-blue-500 text-[10px]" />}
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start"
              >
                <div className="bg-richblack-800 border border-richblack-700 rounded-2xl rounded-tl-none px-5 py-3">
                  <div className="flex gap-1.5 items-center h-4">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        className="w-1.5 h-1.5 bg-slate-500 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-richblack-800/80 backdrop-blur-xl border-t border-richblack-700">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <div className="flex gap-2">
              <button type="button" onClick={() => toast("Emoji picker coming soon!")} className="w-9 h-9 flex items-center justify-center text-slate-500 hover:text-yellow-400 transition-colors">
                <FaSmile />
              </button>
              <button type="button" onClick={() => toast("File upload coming soon!")} className="w-9 h-9 flex items-center justify-center text-slate-500 hover:text-blue-400 transition-colors">
                <FaImages />
              </button>
            </div>
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Reply to student..."
              className="flex-1 bg-richblack-900 border border-richblack-700 rounded-2xl py-3.5 px-5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-medium"
            />
            <button
              type="submit"
              className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95 transition-transform group shrink-0"
            >
              <FaPaperPlane className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
