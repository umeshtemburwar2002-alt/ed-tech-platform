import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaPlay, 
  FaChartLine,
  FaClipboardList,
  FaTrophy,
  FaBookOpen
} from 'react-icons/fa';

const StudentQuiz = ({ userType = 'new' }) => {
  const [activeTab, setActiveTab] = useState('scheduled');
  const [quizzes, setQuizzes] = useState({
    scheduled: [],
    completed: []
  });

  // Dummy data based on user type
  useEffect(() => {
    if (userType === 'new') {
      // New user - no completed quizzes, some scheduled
      setQuizzes({
        scheduled: [
          {
            id: 1,
            title: 'JavaScript Fundamentals',
            course: 'Full Stack Development',
            date: '2024-05-15',
            time: '10:00 AM',
            duration: '30 minutes',
            questions: 20,
            description: 'Test your basic JavaScript knowledge'
          },
          {
            id: 2,
            title: 'React Components',
            course: 'React Masterclass',
            date: '2024-05-18',
            time: '2:00 PM',
            duration: '45 minutes',
            questions: 25,
            description: 'Understanding React components and props'
          }
        ],
        completed: []
      });
    } else if (userType === 'active') {
      // Active user - some completed, some scheduled
      setQuizzes({
        scheduled: [
          {
            id: 3,
            title: 'Node.js Basics',
            course: 'Backend Development',
            date: '2024-05-20',
            time: '11:00 AM',
            duration: '40 minutes',
            questions: 30,
            description: 'Test your Node.js fundamentals'
          }
        ],
        completed: [
          {
            id: 4,
            title: 'HTML & CSS',
            course: 'Web Development Basics',
            date: '2024-05-10',
            score: 85,
            totalQuestions: 15,
            status: 'passed',
            timeTaken: '25 minutes'
          },
          {
            id: 5,
            title: 'Python Basics',
            course: 'Python Programming',
            date: '2024-05-08',
            score: 92,
            totalQuestions: 20,
            status: 'passed',
            timeTaken: '28 minutes'
          }
        ]
      });
    } else if (userType === 'completed') {
      // All quizzes completed
      setQuizzes({
        scheduled: [],
        completed: [
          {
            id: 6,
            title: 'JavaScript Fundamentals',
            course: 'Full Stack Development',
            date: '2024-05-10',
            score: 88,
            totalQuestions: 20,
            status: 'passed',
            timeTaken: '30 minutes'
          },
          {
            id: 7,
            title: 'React Components',
            course: 'React Masterclass',
            date: '2024-05-08',
            score: 91,
            totalQuestions: 25,
            status: 'passed',
            timeTaken: '35 minutes'
          },
          {
            id: 8,
            title: 'Node.js Basics',
            course: 'Backend Development',
            date: '2024-05-05',
            score: 79,
            totalQuestions: 30,
            status: 'passed',
            timeTaken: '40 minutes'
          }
        ]
      });
    }
  }, [userType]);

  const EmptyState = ({ type, tab }) => {
    const emptyStates = {
      scheduled: {
        icon: FaCalendarAlt,
        title: type === 'completed' ? 'All Quizzes Completed!' : 'No Scheduled Quizzes',
        description: type === 'completed' 
          ? 'Great job! You have completed all available quizzes.'
          : 'No quizzes are currently scheduled. Check back later.',
        cta: type === 'completed' ? null : 'Browse Courses'
      },
      completed: {
        icon: FaClipboardList,
        title: 'No Quizzes Attempted Yet',
        description: 'Start taking quizzes to see your results and track your progress.',
        cta: 'Take First Quiz'
      }
    };

    const state = emptyStates[tab];
    const Icon = state.icon;

    return (
      <motion.div 
        className="text-center py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-24 h-24 bg-richblack-700 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon className="text-4xl text-richblack-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{state.title}</h3>
        <p className="text-richblack-300 text-lg mb-8 max-w-md mx-auto">{state.description}</p>
        {state.cta && (
          <button className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-medium">
            {state.cta}
          </button>
        )}
      </motion.div>
    );
  };

  const ScheduledQuizCard = ({ quiz }) => (
    <motion.div 
      className="bg-richblack-800 rounded-xl p-6 border border-richblack-700 hover:border-violet-500/50 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{quiz.title}</h3>
          <p className="text-richblack-300 mb-3">{quiz.course}</p>
          <p className="text-richblack-400 text-sm">{quiz.description}</p>
        </div>
        <div className="bg-violet-500/20 p-3 rounded-lg">
          <FaClipboardList className="text-violet-400 text-xl" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-richblack-300">
          <FaCalendarAlt className="text-violet-400" />
          <span className="text-sm">{quiz.date}</span>
        </div>
        <div className="flex items-center gap-2 text-richblack-300">
          <FaClock className="text-violet-400" />
          <span className="text-sm">{quiz.time}</span>
        </div>
        <div className="flex items-center gap-2 text-richblack-300">
          <FaClock className="text-violet-400" />
          <span className="text-sm">{quiz.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-richblack-300">
          <FaBookOpen className="text-violet-400" />
          <span className="text-sm">{quiz.questions} questions</span>
        </div>
      </div>
      
      <button className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all font-medium flex items-center justify-center gap-2">
        <FaPlay />
        Start Quiz
      </button>
    </motion.div>
  );

  const CompletedQuizCard = ({ quiz }) => (
    <motion.div 
      className="bg-richblack-800 rounded-xl p-6 border border-richblack-700 hover:border-green-500/50 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{quiz.title}</h3>
          <p className="text-richblack-300 mb-3">{quiz.course}</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-richblack-400">{quiz.date}</span>
            <span className="text-richblack-400">{quiz.timeTaken}</span>
          </div>
        </div>
        <div className={`${quiz.status === 'passed' ? 'bg-green-500/20' : 'bg-red-500/20'} p-3 rounded-lg`}>
          {quiz.status === 'passed' ? (
            <FaCheckCircle className="text-green-400 text-xl" />
          ) : (
            <FaTimesCircle className="text-red-400 text-xl" />
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold text-white">{quiz.score}%</div>
          <div>
            <div className="text-sm text-richblack-300">Score</div>
            <div className="text-xs text-richblack-400">{quiz.score}/{quiz.totalQuestions * 5}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-richblack-300">Questions</div>
          <div className="text-lg font-semibold text-white">{quiz.totalQuestions}</div>
        </div>
      </div>
      
      <button className="w-full py-3 bg-richblack-700 text-white rounded-lg hover:bg-richblack-600 transition-colors font-medium flex items-center justify-center gap-2">
        <FaChartLine />
        View Results
      </button>
    </motion.div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-richblack-800 rounded-xl p-6 border border-richblack-700">
        <h1 className="text-3xl font-bold text-white mb-2">Quiz Center</h1>
        <p className="text-richblack-300">Test your knowledge and track your progress</p>
      </div>

      {/* Tabs */}
      <div className="bg-richblack-800 rounded-xl border border-richblack-700">
        <div className="flex border-b border-richblack-700">
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`flex-1 py-4 px-6 font-medium transition-colors ${
              activeTab === 'scheduled'
                ? 'text-violet-400 border-b-2 border-violet-400 bg-violet-400/10'
                : 'text-richblack-300 hover:text-white hover:bg-richblack-700'
            }`}
          >
            Scheduled ({quizzes.scheduled.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-4 px-6 font-medium transition-colors ${
              activeTab === 'completed'
                ? 'text-violet-400 border-b-2 border-violet-400 bg-violet-400/10'
                : 'text-richblack-300 hover:text-white hover:bg-richblack-700'
            }`}
          >
            Completed ({quizzes.completed.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'scheduled' && (
            <div className="space-y-4">
              {quizzes.scheduled.length > 0 ? (
                quizzes.scheduled.map((quiz) => (
                  <ScheduledQuizCard key={quiz.id} quiz={quiz} />
                ))
              ) : (
                <EmptyState type={userType} tab="scheduled" />
              )}
            </div>
          )}

          {activeTab === 'completed' && (
            <div className="space-y-4">
              {quizzes.completed.length > 0 ? (
                quizzes.completed.map((quiz) => (
                  <CompletedQuizCard key={quiz.id} quiz={quiz} />
                ))
              ) : (
                <EmptyState type={userType} tab="completed" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentQuiz;
