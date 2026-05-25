import React, { useState, useRef, useEffect } from 'react';
import { Brain, Send, FileText, HelpCircle, MessageSquare, Sparkles } from 'lucide-react';
import { GlassCard, TabBar } from '../../components/dashboard/Common';

const AIAssistantPage = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi there! I'm your AI Study Assistant. How can I help you learn today? You can ask me questions about your lessons, request summaries, or generate practice quizzes!" }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: inputText }]);
    const userText = inputText;
    setInputText('');

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: `Great question! Based on your lesson on "${userText}", here's a summary: ${userText.includes('React') ? 'React hooks let you use state and other React features without writing a class. The most common hooks are useState and useEffect.' : 'This is a comprehensive summary of the topic. For more details, you can review the lesson materials or ask follow-up questions.'}`
      }]);
    }, 1000);
  };

  const generateQuiz = () => {
    setMessages(prev => [...prev, {
      role: 'assistant',
      text: `Here are 3 practice questions for you:\n\n1. What is React?\n2. Explain useState hook\n3. What is the purpose of useEffect?\n\nTry to answer them and I'll give you feedback!`
    }]);
  };

  const summarizeLesson = () => {
    setMessages(prev => [...prev, {
      role: 'assistant',
      text: `Lesson Summary: React Fundamentals\n\n- React is a JavaScript library for building user interfaces\n- Components are the building blocks of React apps\n- State and props are used to manage data in components\n- Hooks let you use state and other features in functional components`
    }]);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-indigo-400" />
            AI Study Assistant
          </h2>
          <p className="text-gray-400">Get help with lessons, generate quizzes, and summarize topics</p>
        </div>
        <TabBar tabs={['Chat', 'Summarize', 'Quiz Generator']} active={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} onChange={t => setActiveTab(t.toLowerCase())} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        <div className="lg:col-span-1 space-y-4">
          <GlassCard className="p-4">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Quick Actions</h3>
            <div className="space-y-2">
              <button onClick={summarizeLesson} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all">
                <FileText className="w-4 h-4" /> Summarize Lesson
              </button>
              <button onClick={generateQuiz} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all">
                <HelpCircle className="w-4 h-4" /> Generate Quiz
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all">
                <MessageSquare className="w-4 h-4" /> Ask Doubt
              </button>
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Recent Topics</h3>
            <div className="space-y-2">
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-400">React Hooks</div>
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-400">UI/UX Design</div>
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-400">Python Basics</div>
            </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-3 flex flex-col">
          <GlassCard className="flex-1 flex flex-col overflow-hidden p-0">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Study Assistant</h3>
                  <p className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Online
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-gradient-to-r from-indigo-600 to-purple-700' : 'bg-white/5 border border-white/10'}`}>
                      <p className="text-sm text-white whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-6 border-t border-white/10">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question about your lessons..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50"
                />
                <button
                  onClick={handleSend}
                  className="px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold hover:opacity-90 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
