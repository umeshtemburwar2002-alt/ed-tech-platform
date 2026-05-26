/**
 * College LMS - Quiz Attempt Component
 * Student quiz taking with timer, navigation, and results
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import quizService from '../services/quizService';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { Clock, ChevronLeft, ChevronRight, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const QuizAttempt = ({ quizId, studentId, onComplete }) => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (quiz && !submitted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quiz, submitted, timeLeft]);

  const fetchQuiz = async () => {
    setLoading(true);
    try {
      const data = await quizService.getQuiz(quizId);
      setQuiz(data);
      setTimeLeft(data.timer_minutes * 60);
    } catch (error) {
      console.error('Failed to fetch quiz:', error);
      toast.error('Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.quiz_questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const result = await quizService.submitAttempt({
        quiz_id: quizId,
        student_id: studentId,
        answers,
      });

      setResult(result);
      setSubmitted(true);
      toast.success('Quiz submitted successfully');

      if (onComplete) onComplete(result);
    } catch (error) {
      console.error('Failed to submit quiz:', error);
      toast.error('Failed to submit quiz');
    } finally {
      setSubmitting(false);
      setShowConfirmModal(false);
    }
  };

  const handleRetake = async () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setSubmitted(false);
    setResult(null);
    setTimeLeft(quiz.timer_minutes * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading quiz...</div>
      </div>
    );
  }

  if (submitted && result) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-slate-900/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700"
        >
          <div className="text-center mb-8">
            <div
              className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                result.passed ? 'bg-green-500/20' : 'bg-red-500/20'
              }`}
            >
              {result.passed ? (
                <CheckCircle className="w-10 h-10 text-green-500" />
              ) : (
                <XCircle className="w-10 h-10 text-red-500" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {result.passed ? 'Quiz Passed!' : 'Quiz Failed'}
            </h2>
            <p className="text-slate-400">
              You scored {result.score}% (passing: {quiz.passing_score}%)
            </p>
          </div>

          {quiz.show_answers && (
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Review Answers</h3>
              {quiz.quiz_questions.map((question, index) => {
                const userAnswer = answers[question.id];
                const isCorrect = userAnswer === question.correct_answer;

                return (
                  <div
                    key={question.id}
                    className={`p-4 rounded-lg ${
                      isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
                    }`}
                  >
                    <p className="text-white font-medium mb-2">
                      {index + 1}. {question.question}
                    </p>
                    <div className="text-sm text-slate-400 space-y-1">
                      <p>Your answer: {userAnswer}</p>
                      <p>Correct answer: {question.correct_answer}</p>
                      {question.explanation && (
                        <p className="mt-2 text-slate-300">
                          <span className="font-medium">Explanation:</span> {question.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex justify-center gap-4">
            {quiz.allow_retakes && (
              <Button onClick={handleRetake} variant="secondary" icon={RotateCcw}>
                Retake Quiz
              </Button>
            )}
            <Button onClick={() => window.history.back()} variant="primary">
              Back to Course
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = quiz.quiz_questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">{quiz.title}</h1>
            <Badge variant={timeLeft < 60 ? 'rejected' : 'published'}>
              <Clock className="w-4 h-4 mr-1" />
              {formatTime(timeLeft)}
            </Badge>
          </div>

          {/* Progress Dots */}
          <div className="flex gap-2 mb-4">
            {quiz.quiz_questions.map((_, index) => {
              const answered = answers[quiz.quiz_questions[index].id] !== undefined;
              return (
                <div
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                    index === currentQuestionIndex
                      ? 'bg-blue-500'
                      : answered
                      ? 'bg-green-500'
                      : 'bg-slate-600'
                  }`}
                />
              );
            })}
          </div>

          <div className="text-slate-400 text-sm">
            Question {currentQuestionIndex + 1} of {quiz.quiz_questions.length}
          </div>
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700 mb-6"
        >
          <h2 className="text-xl font-semibold text-white mb-6">
            {currentQuestion.question}
          </h2>

          {currentQuestion.type === 'mcq' && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-colors ${
                    answers[currentQuestion.id] === index
                      ? 'bg-blue-500/20 border border-blue-500'
                      : 'bg-slate-800 border border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    checked={answers[currentQuestion.id] === index}
                    onChange={() => handleAnswerChange(currentQuestion.id, index)}
                    className="w-5 h-5"
                  />
                  <span className="text-white">{option}</span>
                </label>
              ))}
            </div>
          )}

          {currentQuestion.type === 'true_false' && (
            <div className="space-y-3">
              {['true', 'false'].map((option) => (
                <label
                  key={option}
                  className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-colors ${
                    answers[currentQuestion.id] === option
                      ? 'bg-blue-500/20 border border-blue-500'
                      : 'bg-slate-800 border border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    checked={answers[currentQuestion.id] === option}
                    onChange={() => handleAnswerChange(currentQuestion.id, option)}
                    className="w-5 h-5"
                  />
                  <span className="text-white capitalize">{option}</span>
                </label>
              ))}
            </div>
          )}

          {currentQuestion.type === 'short' && (
            <textarea
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
              placeholder="Type your answer..."
            />
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            onClick={handlePrevious}
            variant="secondary"
            icon={ChevronLeft}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>

          {currentQuestionIndex === quiz.quiz_questions.length - 1 ? (
            <Button
              onClick={() => setShowConfirmModal(true)}
              variant="primary"
              disabled={submitting}
              loading={submitting}
            >
              Submit Quiz
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              variant="primary"
              icon={ChevronRight}
            >
              Next
            </Button>
          )}
        </div>
      </div>

      {/* Confirm Submit Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Submit Quiz?"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-slate-300">
            You have answered {Object.keys(answers).length} out of {quiz.quiz_questions.length} questions.
          </p>
          <p className="text-slate-400">
            Are you sure you want to submit? You cannot change your answers after submission.
          </p>
          <div className="flex gap-4 justify-end">
            <Button onClick={() => setShowConfirmModal(false)} variant="secondary">
              Continue
            </Button>
            <Button onClick={handleSubmit} variant="primary">
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QuizAttempt;
