import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaClock, 
  FaCheckCircle, 
  FaArrowRight, 
  FaArrowLeft, 
  FaRedo,
  FaAward,
  FaQuestionCircle
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { supabase } from "../../../../config/supabaseClient";
import { useSelector } from "react-redux";

export default function QuizInterface() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizData();
  }, [quizId]);

  const fetchQuizData = async () => {
    try {
      setLoading(true);
      // Fetch quiz details
      const { data: quiz, error: quizError } = await supabase
        .from("quizzes")
        .select(`
          *,
          courses (title)
        `)
        .eq("id", quizId)
        .single();

      if (quizError) throw quizError;
      setCurrentQuiz(quiz);

      // Fetch questions
      const { data: questionsData, error: qError } = await supabase
        .from("questions")
        .select("*")
        .eq("quiz_id", quizId);

      if (qError) throw qError;
      setQuestions(questionsData);
      
      // Set time limit (default to 15 mins if not specified, though our schema doesn't have it yet)
      setTimeLeft(15 * 60);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      toast.error("Failed to load quiz");
      navigate("/dashboard/quiz");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted && !loading) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted && !loading) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted, loading]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleOptionSelect = (optionIndex) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex
    });
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    
    setIsSubmitted(true);
    let calculatedScore = 0;
    
    questions.forEach((q, index) => {
      // Map index (0,1,2,3) to database columns (option1, option2, etc.)
      const selectedOptionText = q[`option${selectedAnswers[index] + 1}`];
      if (selectedOptionText === q.correct_answer) {
        calculatedScore++;
      }
    });
    
    setScore(calculatedScore);

    try {
      // Save attempt to database
      const { error: attemptError } = await supabase
        .from("quiz_attempts")
        .insert([{
          user_id: user.id,
          quiz_id: quizId,
          score: calculatedScore
        }]);

      if (attemptError) throw attemptError;
      toast.success("Quiz submitted successfully!");
    } catch (error) {
      console.error("Error saving quiz attempt:", error);
      toast.error("Failed to save your result, but you can see it here.");
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setTimeLeft(15 * 60);
    setScore(0);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white bg-[#000814]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
  </div>;

  if (!currentQuiz || questions.length === 0) return <div className="min-h-screen flex items-center justify-center text-white bg-[#000814]">No questions found for this quiz.</div>;

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Prepare options array from separate columns
  const options = [
    currentQuestion.option1,
    currentQuestion.option2,
    currentQuestion.option3,
    currentQuestion.option4
  ];

  return (
    <div className="min-h-screen bg-[#000814] text-white p-4 md:p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gradient glow-accent">
              {currentQuiz.title}
            </h1>
            <p className="text-slate-400 mt-1">{currentQuiz.courses?.title}</p>
          </div>
          {!isSubmitted && (
            <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/10 shadow-lg">
              <FaClock className={timeLeft < 60 ? "text-red-500 animate-pulse" : "text-cyan-400"} />
              <span className={`text-xl font-mono font-bold ${timeLeft < 60 ? "text-red-500" : "text-white"}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          )}
        </div>

        {!isSubmitted ? (
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-8"
            >
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-bold text-slate-400">
                  <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_rgba(0,180,216,0.5)]"
                  />
                </div>
              </div>

              <div className="theme-card p-8 md:p-10 min-h-[400px] flex flex-col">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-10 h-10 bg-cyan-500/10 text-cyan-400 rounded-xl flex items-center justify-center shrink-0 border border-cyan-500/20">
                    <FaQuestionCircle />
                  </div>
                  <h2 className="text-2xl font-bold leading-tight">
                    {currentQuestion.question_text}
                  </h2>
                </div>

                <div className="grid gap-4 flex-1">
                  {options.map((option, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleOptionSelect(index)}
                      className={`p-5 rounded-2xl border-2 text-left transition-all duration-300 flex items-center justify-between group ${
                        selectedAnswers[currentQuestionIndex] === index
                          ? "bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_20px_rgba(0,180,216,0.2)]"
                          : "bg-white/5 border-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
                      }`}
                    >
                      <span className="font-medium">{option}</span>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedAnswers[currentQuestionIndex] === index
                          ? "border-cyan-500 bg-cyan-500"
                          : "border-slate-600 group-hover:border-slate-400"
                      }`}>
                        <AnimatePresence>
                          {selectedAnswers[currentQuestionIndex] === index && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <FaCheckCircle className="text-white text-sm" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/5">
                  <button
                    onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-slate-400 font-bold hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <FaArrowLeft className="text-xs" /> Previous
                  </button>
                  
                  {currentQuestionIndex === questions.length - 1 ? (
                    <button
                      onClick={handleSubmit}
                      disabled={Object.keys(selectedAnswers).length < questions.length}
                      className="btn-primary px-10 py-3 shadow-lg shadow-cyan-500/20"
                    >
                      Submit Quiz
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                      className="flex items-center gap-2 px-8 py-3 rounded-xl bg-cyan-500 text-white font-bold hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
                    >
                      Next <FaArrowRight className="text-xs" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="theme-card p-10 md:p-16 text-center max-w-2xl mx-auto"
          >
            <div className="w-24 h-24 bg-cyan-500/10 text-cyan-400 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-8 shadow-xl border border-cyan-500/20">
              <FaAward />
            </div>
            
            <h2 className="text-4xl font-bold mb-2">Quiz Completed!</h2>
            <p className="text-slate-400 mb-10">Here's how you performed in this assessment</p>

            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Score</p>
                <p className="text-4xl font-bold text-cyan-400">{score}/{questions.length}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Percentage</p>
                <p className="text-4xl font-bold text-green-400">
                  {Math.round((score / questions.length) * 100)}%
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={handleRetry}
                className="btn-primary w-full py-4 flex items-center justify-center gap-3 text-lg"
              >
                <FaRedo /> Retry Quiz
              </button>
              <button 
                onClick={() => navigate("/dashboard")}
                className="w-full py-4 rounded-2xl bg-white/5 text-slate-300 font-bold hover:bg-white/10 transition-all border border-white/5"
              >
                Back to Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
