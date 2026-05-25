import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaComments,
  FaTimes,
  FaPaperPlane,
  FaUser,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCircle,
  FaImage,
  FaFile,
  FaSmile,
  FaPhone,
  FaVideo
} from 'react-icons/fa';

const LiveChat = () => {
  const { user } = useSelector((state) => state.profile);
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({});
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef(null);

  // Mock online users and chats
  useEffect(() => {
    if (user) {
      // Simulate online users based on user role
      const mockOnlineUsers = user.accountType === 'Student' ? [
        {
          id: 'instructor1',
          name: 'Dr. Sarah Wilson',
          role: 'Instructor',
          avatar: '👩‍🏫',
          status: 'online',
          lastSeen: 'Active now',
          course: 'React Development'
        },
        {
          id: 'instructor2',
          name: 'Prof. David Chen',
          role: 'Instructor',
          avatar: '👨‍🏫',
          status: 'online',
          lastSeen: 'Active now',
          course: 'Python & AI'
        },
        {
          id: 'student1',
          name: 'Rahul Sharma',
          role: 'Student',
          avatar: '👨‍🎓',
          status: 'online',
          lastSeen: '2 min ago',
          course: 'Web Development'
        },
        {
          id: 'student2',
          name: 'Priya Patel',
          role: 'Student',
          avatar: '👩‍🎓',
          status: 'away',
          lastSeen: '5 min ago',
          course: 'Data Science'
        }
      ] : [
        {
          id: 'student1',
          name: 'Rahul Sharma',
          role: 'Student',
          avatar: '👨‍🎓',
          status: 'online',
          lastSeen: 'Active now',
          course: 'React Development'
        },
        {
          id: 'student2',
          name: 'Priya Patel',
          role: 'Student',
          avatar: '👩‍🎓',
          status: 'online',
          lastSeen: '1 min ago',
          course: 'React Development'
        },
        {
          id: 'student3',
          name: 'Amit Kumar',
          role: 'Student',
          avatar: '👨‍🎓',
          status: 'away',
          lastSeen: '10 min ago',
          course: 'Python & AI'
        },
        {
          id: 'instructor1',
          name: 'Dr. John Smith',
          role: 'Instructor',
          avatar: '👨‍🏫',
          status: 'online',
          lastSeen: 'Active now',
          course: 'Advanced JavaScript'
        }
      ];
      
      setOnlineUsers(mockOnlineUsers);
      
      // Initialize mock messages
      const mockMessages = {};
      mockOnlineUsers.forEach(chatUser => {
        mockMessages[chatUser.id] = [
          {
            id: 1,
            senderId: chatUser.id,
            senderName: chatUser.name,
            content: user.accountType === 'Student' 
              ? (chatUser.role === 'Instructor' 
                  ? `Hello ${user?.firstName || 'Student'}! How can I help you with ${chatUser.course}?`
                  : `Hey! Are you also taking ${chatUser.course}?`)
              : (chatUser.role === 'Student'
                  ? `Hi Sir! I have a doubt in ${chatUser.course}`
                  : `Hello! How are your classes going?`),
            timestamp: new Date(Date.now() - Math.random() * 3600000),
            type: 'text'
          }
        ];
      });
      setMessages(mockMessages);
    }
  }, [user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeChat]);

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;
    
    const newMessage = {
      id: Date.now(),
      senderId: user.uid || 'current-user',
      senderName: user?.firstName || user?.name || 'You',
      content: message,
      timestamp: new Date(),
      type: 'text'
    };
    
    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage]
    }));
    
    setMessage('');
    
    // Simulate response after a delay
    setTimeout(() => {
      const responses = [
        'Thanks for your message! I\'ll get back to you soon.',
        'That\'s a great question! Let me think about it.',
        'I understand your concern. Here\'s what I think...',
        'Good point! Have you tried checking the documentation?',
        'Let me help you with that. Can you share more details?'
      ];
      
      const responseMessage = {
        id: Date.now() + 1,
        senderId: activeChat,
        senderName: onlineUsers.find(u => u.id === activeChat)?.name || 'User',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), responseMessage]
      }));
    }, 1000 + Math.random() * 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Instructor': return FaChalkboardTeacher;
      case 'Student': return FaUserGraduate;
      default: return FaUser;
    }
  };

  if (!user) return null;

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <FaTimes className="text-xl" /> : <FaComments className="text-xl" />}
        </motion.button>
        
        {/* Unread messages indicator */}
        {!isOpen && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
            3
          </div>
        )}
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 left-6 w-80 h-[500px] bg-richblack-800 border border-richblack-700 rounded-lg shadow-2xl z-50 flex overflow-hidden"
          >
            {/* Sidebar - Online Users */}
            <div className="w-24 bg-richblack-900 border-r border-richblack-700 flex flex-col">
              {/* Header */}
              <div className="p-3 border-b border-richblack-700">
                <h3 className="text-xs font-semibold text-richblack-300 text-center">Online</h3>
              </div>
              
              {/* Online Users List */}
              <div className="flex-1 overflow-y-auto">
                {onlineUsers.map((chatUser) => {
                  const RoleIcon = getRoleIcon(chatUser.role);
                  return (
                    <button
                      key={chatUser.id}
                      onClick={() => setActiveChat(chatUser.id)}
                      className={`w-full p-2 hover:bg-richblack-700 transition-colors relative ${
                        activeChat === chatUser.id ? 'bg-richblack-700' : ''
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-1">
                        <div className="relative">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-lg">
                            {chatUser.avatar}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(chatUser.status)} rounded-full border-2 border-richblack-900`}></div>
                        </div>
                        <RoleIcon className="text-xs text-richblack-400" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {activeChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-3 border-b border-richblack-700 bg-richblack-750">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                            {onlineUsers.find(u => u.id === activeChat)?.avatar}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(onlineUsers.find(u => u.id === activeChat)?.status)} rounded-full border-2 border-richblack-900`}></div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-richblack-100">
                            {onlineUsers.find(u => u.id === activeChat)?.name}
                          </h4>
                          <p className="text-xs text-richblack-400">
                            {onlineUsers.find(u => u.id === activeChat)?.lastSeen}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-richblack-400 hover:text-richblack-200">
                          <FaPhone className="text-sm" />
                        </button>
                        <button className="text-richblack-400 hover:text-richblack-200">
                          <FaVideo className="text-sm" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    {(messages[activeChat] || []).map((msg) => {
                      const isCurrentUser = msg.senderId === (user.uid || 'current-user');
                      return (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] ${isCurrentUser ? 'order-2' : 'order-1'}`}>
                            <div
                              className={`p-2 rounded-lg text-sm ${
                                isCurrentUser
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-richblack-700 text-richblack-100'
                              }`}
                            >
                              <p>{msg.content}</p>
                            </div>
                            <p className="text-xs text-richblack-500 mt-1">
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-3 border-t border-richblack-700">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 bg-richblack-700 border border-richblack-600 rounded-lg px-3 py-2 text-richblack-100 placeholder-richblack-400 focus:outline-none focus:border-blue-500 text-sm"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <FaPaperPlane className="text-sm" />
                      </button>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="mt-2 flex space-x-2">
                      <button className="text-richblack-400 hover:text-richblack-200 p-1">
                        <FaImage className="text-sm" />
                      </button>
                      <button className="text-richblack-400 hover:text-richblack-200 p-1">
                        <FaFile className="text-sm" />
                      </button>
                      <button className="text-richblack-400 hover:text-richblack-200 p-1">
                        <FaSmile className="text-sm" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* No Chat Selected */
                <div className="flex-1 flex items-center justify-center text-center p-4">
                  <div>
                    <FaComments className="text-4xl text-richblack-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-richblack-300 mb-2">Live Chat</h3>
                    <p className="text-sm text-richblack-400 mb-4">
                      Connect with {user.accountType === 'Student' ? 'instructors and classmates' : 'students and colleagues'}
                    </p>
                    <p className="text-xs text-richblack-500">
                      Select a user from the sidebar to start chatting
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChat;