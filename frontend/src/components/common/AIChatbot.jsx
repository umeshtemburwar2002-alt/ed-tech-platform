import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaUser,
  FaBook,
  FaQuestionCircle,
  FaLightbulb,
  FaCode,
  FaGraduationCap
} from 'react-icons/fa';

const AIChatbot = () => {
  const { user } = useSelector((state) => state.profile);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize with welcome message
  useEffect(() => {
    if (user && messages.length === 0) {
      const welcomeMessage = {
        id: 1,
        type: 'bot',
        content: `नमस्ते ${user?.firstName || user?.name || 'Student'}! 👋 मैं आपका AI Learning Assistant हूँ। मैं आपकी पढ़ाई में help कर सकता हूँ। कुछ भी पूछिए!`,
        timestamp: new Date(),
        suggestions: [
          'Course recommendations',
          'Study schedule help',
          'Doubt solving',
          'Career guidance'
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [user]);

  // Auto scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Mock AI responses based on user input
  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Course-related queries
    if (message.includes('course') || message.includes('कोर्स')) {
      return {
        content: '📚 मैं आपको perfect course suggest कर सकता हूँ! आपका interest किस field में है?\n\n• Web Development\n• Data Science\n• Mobile App Development\n• AI/ML\n• Cybersecurity',
        suggestions: ['Web Development', 'Data Science', 'AI/ML', 'Show all courses']
      };
    }
    
    // Programming help
    if (message.includes('code') || message.includes('programming') || message.includes('कोडिंग')) {
      return {
        content: '💻 Coding में help चाहिए? मैं आपकी help कर सकता हूँ:\n\n• Code debugging\n• Algorithm explanation\n• Best practices\n• Project ideas\n\nकौन सी programming language में help चाहिए?',
        suggestions: ['JavaScript', 'Python', 'React', 'Debug my code']
      };
    }
    
    // Study schedule
    if (message.includes('schedule') || message.includes('study') || message.includes('पढ़ाई')) {
      return {
        content: '📅 Study schedule बनाने में help करूँ? मैं आपके लिए personalized study plan बना सकता हूँ:\n\n• Daily study routine\n• Goal-based planning\n• Time management tips\n• Progress tracking',
        suggestions: ['Create study plan', 'Time management', 'Set goals', 'Track progress']
      };
    }
    
    // Career guidance
    if (message.includes('career') || message.includes('job') || message.includes('करियर')) {
      return {
        content: '🎯 Career guidance चाहिए? मैं आपकी help कर सकता हूँ:\n\n• Career path suggestions\n• Skill development roadmap\n• Interview preparation\n• Resume building tips\n• Industry trends',
        suggestions: ['Career roadmap', 'Interview prep', 'Resume tips', 'Skill assessment']
      };
    }
    
    // Doubt solving
    if (message.includes('doubt') || message.includes('help') || message.includes('समस्या')) {
      return {
        content: '🤔 Doubt solving में मैं expert हूँ! आप अपना specific question पूछ सकते हैं:\n\n• Technical concepts\n• Assignment help\n• Project guidance\n• Exam preparation',
        suggestions: ['Ask technical question', 'Assignment help', 'Exam prep', 'Project guidance']
      };
    }
    
    // Default responses
    const defaultResponses = [
      {
        content: '🤖 मैं आपकी query समझ गया हूँ। क्या आप इसके बारे में और detail में बता सकते हैं?',
        suggestions: ['Tell me more', 'Course help', 'Study tips', 'Career advice']
      },
      {
        content: '💡 Interesting question! मैं आपकी इस problem को solve करने में help कर सकता हूँ। आप चाहें तो specific details share कर सकते हैं।',
        suggestions: ['Share details', 'Get examples', 'Step by step guide', 'Related topics']
      },
      {
        content: '📖 यह एक अच्छा question है! मैं आपको best resources और guidance provide कर सकता हूँ।',
        suggestions: ['Show resources', 'Get guidance', 'Practice exercises', 'Related courses']
      }
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!user) return null;

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: isOpen ? '0 0 0 0 rgba(59, 130, 246, 0.7)' : '0 0 0 10px rgba(59, 130, 246, 0)',
          }}
          transition={{
            boxShadow: {
              duration: 1.5,
              repeat: isOpen ? 0 : Infinity,
              repeatType: 'reverse'
            }
          }}
        >
          {isOpen ? <FaTimes className="text-xl" /> : <FaRobot className="text-xl" />}
        </motion.button>
      </div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-richblack-800 border border-richblack-700 rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <FaRobot className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Learning Assistant</h3>
                    <p className="text-xs opacity-90">Always here to help! 🤖</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-richblack-700 text-richblack-100'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                    
                    {/* Suggestions */}
                    {message.suggestions && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs bg-richblack-600 text-richblack-200 px-2 py-1 rounded-full hover:bg-richblack-500 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' ? 'order-1 ml-2 bg-blue-600' : 'order-2 mr-2 bg-purple-600'
                  }`}>
                    {message.type === 'user' ? (
                      <FaUser className="text-white text-xs" />
                    ) : (
                      <FaRobot className="text-white text-xs" />
                    )}
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <FaRobot className="text-white text-xs" />
                    </div>
                    <div className="bg-richblack-700 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-richblack-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-richblack-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-richblack-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-richblack-700">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question... (Hindi/English)"
                  className="flex-1 bg-richblack-700 border border-richblack-600 rounded-lg px-3 py-2 text-richblack-100 placeholder-richblack-400 focus:outline-none focus:border-blue-500 text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FaPaperPlane className="text-sm" />
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-2 flex flex-wrap gap-1">
                {[
                  { icon: FaBook, text: 'Courses', action: 'Show me available courses' },
                  { icon: FaQuestionCircle, text: 'Doubts', action: 'I have a doubt' },
                  { icon: FaLightbulb, text: 'Tips', action: 'Give me study tips' },
                  { icon: FaGraduationCap, text: 'Career', action: 'Career guidance' }
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(item.action)}
                    className="flex items-center space-x-1 text-xs bg-richblack-600 text-richblack-200 px-2 py-1 rounded-full hover:bg-richblack-500 transition-colors"
                  >
                    <item.icon className="text-xs" />
                    <span>{item.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;