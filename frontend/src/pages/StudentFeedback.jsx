import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaStar, 
  FaClock, 
  FaCheckCircle, 
  FaCommentDots, 
  FaGraduationCap,
  FaBookOpen,
  FaThumbsUp,
  FaThumbsDown,
  FaEdit,
  FaHistory,
  FaExclamationCircle
} from 'react-icons/fa';

const StudentFeedback = ({ userType = 'new' }) => {
  const [activeTab, setActiveTab] = useState('pending');
  const [feedbacks, setFeedbacks] = useState({
    pending: [],
    history: []
  });

  // Dummy data based on user type
  useEffect(() => {
    if (userType === 'new') {
      // New user - no feedback history, some pending
      setFeedbacks({
        pending: [
          {
            id: 1,
            courseName: 'JavaScript Fundamentals',
            instructor: 'John Doe',
            courseImage: '/api/placeholder/60/60',
            completionDate: '2024-05-10',
            rating: 0,
            review: '',
            courseProgress: 100,
            totalLessons: 20,
            completedLessons: 20
          },
          {
            id: 2,
            courseName: 'React Masterclass',
            instructor: 'Jane Smith',
            courseImage: '/api/placeholder/60/60',
            completionDate: '2024-05-08',
            rating: 0,
            review: '',
            courseProgress: 100,
            totalLessons: 25,
            completedLessons: 25
          }
        ],
        history: []
      });
    } else if (userType === 'active') {
      // Active user - some completed feedback, some pending
      setFeedbacks({
        pending: [
          {
            id: 3,
            courseName: 'Node.js Basics',
            instructor: 'Mike Johnson',
            courseImage: '/api/placeholder/60/60',
            completionDate: '2024-05-12',
            rating: 0,
            review: '',
            courseProgress: 100,
            totalLessons: 30,
            completedLessons: 30
          }
        ],
        history: [
          {
            id: 4,
            courseName: 'HTML & CSS',
            instructor: 'Sarah Wilson',
            courseImage: '/api/placeholder/60/60',
            submissionDate: '2024-05-05',
            rating: 5,
            review: 'Excellent course! Very well structured and easy to follow. The instructor explains concepts clearly.',
            helpful: 12,
            courseProgress: 100,
            totalLessons: 15,
            completedLessons: 15
          },
          {
            id: 5,
            courseName: 'Python Programming',
            instructor: 'David Brown',
            courseImage: '/api/placeholder/60/60',
            submissionDate: '2024-05-03',
            rating: 4,
            review: 'Good content but could use more practical examples. Overall a solid introduction to Python.',
            helpful: 8,
            courseProgress: 100,
            totalLessons: 22,
            completedLessons: 22
          }
        ]
      });
    } else if (userType === 'completed') {
      // All feedback completed
      setFeedbacks({
        pending: [],
        history: [
          {
            id: 6,
            courseName: 'JavaScript Fundamentals',
            instructor: 'John Doe',
            courseImage: '/api/placeholder/60/60',
            submissionDate: '2024-05-10',
            rating: 5,
            review: 'Amazing course! John is an excellent instructor. The projects were really helpful.',
            helpful: 25,
            courseProgress: 100,
            totalLessons: 20,
            completedLessons: 20
          },
          {
            id: 7,
            courseName: 'React Masterclass',
            instructor: 'Jane Smith',
            courseImage: '/api/placeholder/60/60',
            submissionDate: '2024-05-08',
            rating: 4,
            review: 'Great content on React. Would have liked more advanced topics covered.',
            helpful: 18,
            courseProgress: 100,
            totalLessons: 25,
            completedLessons: 25
          },
          {
            id: 8,
            courseName: 'Node.js Basics',
            instructor: 'Mike Johnson',
            courseImage: '/api/placeholder/60/60',
            submissionDate: '2024-05-05',
            rating: 5,
            review: 'Perfect introduction to Node.js. Mike explains everything very clearly.',
            helpful: 30,
            courseProgress: 100,
            totalLessons: 30,
            completedLessons: 30
          }
        ]
      });
    }
  }, [userType]);

  const EmptyState = ({ type, tab }) => {
    const emptyStates = {
      pending: {
        icon: FaGraduationCap,
        title: type === 'completed' ? 'All Feedback Submitted!' : 'No Pending Feedback',
        description: type === 'completed' 
          ? 'Thank you for providing feedback on all your completed courses!'
          : 'You haven\'t completed any courses yet. Finish courses to provide feedback.',
        cta: type === 'completed' ? null : 'Browse Courses'
      },
      history: {
        icon: FaHistory,
        title: 'No Feedback Submitted Yet',
        description: 'Start providing feedback on completed courses to help improve the learning experience.',
        cta: 'View Completed Courses'
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

  const StarRating = ({ rating, onRatingChange, interactive = false }) => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRatingChange(star)}
            className={`transition-colors ${
              interactive ? 'cursor-pointer hover:text-yellow-400' : 'cursor-default'
            }`}
            disabled={!interactive}
          >
            <FaStar 
              className={`text-2xl ${
                star <= rating ? 'text-yellow-400' : 'text-richblack-600'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const PendingFeedbackCard = ({ feedback }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    return (
      <motion.div 
        className="bg-richblack-800 rounded-xl p-6 border border-richblack-700 hover:border-violet-500/50 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-richblack-700 rounded-lg flex items-center justify-center">
            <FaBookOpen className="text-2xl text-violet-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{feedback.courseName}</h3>
            <p className="text-richblack-300 mb-2">Instructor: {feedback.instructor}</p>
            <div className="flex items-center gap-4 text-sm text-richblack-400">
              <span>Completed: {feedback.completionDate}</span>
              <span>Progress: {feedback.completedLessons}/{feedback.totalLessons} lessons</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-richblack-300 mb-2">
              Rate this course
            </label>
            <StarRating 
              rating={rating} 
              onRatingChange={setRating} 
              interactive={true}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-richblack-300 mb-2">
              Your review
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-richblack-700 border border-richblack-600 rounded-lg text-white placeholder-richblack-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
              placeholder="Share your experience with this course..."
            />
          </div>

          <div className="flex gap-3">
            <button className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all font-medium flex items-center justify-center gap-2">
              <FaCheckCircle />
              Submit Feedback
            </button>
            <button className="px-6 py-3 bg-richblack-700 text-richblack-300 rounded-lg hover:bg-richblack-600 transition-colors font-medium">
              Maybe Later
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const FeedbackHistoryCard = ({ feedback }) => {
    return (
      <motion.div 
        className="bg-richblack-800 rounded-xl p-6 border border-richblack-700 hover:border-green-500/50 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-richblack-700 rounded-lg flex items-center justify-center">
            <FaBookOpen className="text-2xl text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{feedback.courseName}</h3>
            <p className="text-richblack-300 mb-2">Instructor: {feedback.instructor}</p>
            <div className="flex items-center gap-4 text-sm text-richblack-400">
              <span>Submitted: {feedback.submissionDate}</span>
              <div className="flex items-center gap-1">
                <FaThumbsUp className="text-green-400" />
                <span>{feedback.helpful} helpful</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <StarRating rating={feedback.rating} />
        </div>

        <p className="text-richblack-300 mb-4 leading-relaxed">{feedback.review}</p>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-richblack-700 text-richblack-300 rounded-lg hover:bg-richblack-600 transition-colors text-sm">
            <FaEdit />
            Edit Review
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-richblack-700 text-richblack-300 rounded-lg hover:bg-richblack-600 transition-colors text-sm">
            <FaThumbsUp />
            Helpful
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-richblack-800 rounded-xl p-6 border border-richblack-700">
        <h1 className="text-3xl font-bold text-white mb-2">Course Feedback</h1>
        <p className="text-richblack-300">Share your experience and help improve our courses</p>
      </div>

      {/* Tabs */}
      <div className="bg-richblack-800 rounded-xl border border-richblack-700">
        <div className="flex border-b border-richblack-700">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-4 px-6 font-medium transition-colors ${
              activeTab === 'pending'
                ? 'text-violet-400 border-b-2 border-violet-400 bg-violet-400/10'
                : 'text-richblack-300 hover:text-white hover:bg-richblack-700'
            }`}
          >
            Pending ({feedbacks.pending.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-4 px-6 font-medium transition-colors ${
              activeTab === 'history'
                ? 'text-violet-400 border-b-2 border-violet-400 bg-violet-400/10'
                : 'text-richblack-300 hover:text-white hover:bg-richblack-700'
            }`}
          >
            History ({feedbacks.history.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'pending' && (
            <div className="space-y-4">
              {feedbacks.pending.length > 0 ? (
                feedbacks.pending.map((feedback) => (
                  <PendingFeedbackCard key={feedback.id} feedback={feedback} />
                ))
              ) : (
                <EmptyState type={userType} tab="pending" />
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              {feedbacks.history.length > 0 ? (
                feedbacks.history.map((feedback) => (
                  <FeedbackHistoryCard key={feedback.id} feedback={feedback} />
                ))
              ) : (
                <EmptyState type={userType} tab="history" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentFeedback;
