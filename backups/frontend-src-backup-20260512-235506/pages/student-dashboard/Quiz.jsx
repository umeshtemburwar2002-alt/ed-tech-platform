import React, { useState, useEffect } from 'react';
import { Brain, Download } from 'lucide-react';
import { GlassCard, TabBar, Badge, ProgressBar, EmptyState } from '../../components/dashboard/Common';
import { QUIZ_SCHEDULED, QUIZ_COMPLETED, QUIZ_QUESTIONS } from '../../data/student-dashboard-data';

const QuizPage = () => {
  const [quizState, setQuizState] = useState('list'); // list, active, result
  const [tab, setTab] = useState('Scheduled');
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let timer;
    if (quizState === 'active' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && quizState === 'active') {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [quizState, timeLeft]);

  const handleStart = (quiz) => {
    setActiveQuiz(quiz);
    setQuizState('active');
    setTimeLeft(quiz.duration * 60);
    setCurrentQ(0);
    setAnswers({});
  };

  const handleSubmit = () => {
    let correct = 0;
    QUIZ_QUESTIONS.forEach((q, i) => { if (answers[i] === q.correct) correct++; });
    setScore(Math.round((correct / QUIZ_QUESTIONS.length) * 100));
    setQuizState('result');
  };

  if (quizState === 'active') {
    return (
      <div className="max-w-4xl mx-auto py-10 animate-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-10">
          <div><h2 className="text-2xl font-bold text-white">{activeQuiz.title}</h2><p className="text-gray-500 text-sm">Question {currentQ + 1} of 10</p></div>
          <div className={`px-6 py-3 rounded-2xl border font-mono font-bold text-xl ${timeLeft <= 30 ? 'bg-red-500/10 border-red-500/50 text-red-400 animate-pulse' : 'bg-white/5 border-white/10 text-white'}`}>
            {Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,'0')}
          </div>
        </div>
        <ProgressBar pct={((currentQ + 1) / 10) * 100} size="h-2" />
        <GlassCard className="!p-10 mt-10">
          <h3 className="text-2xl font-medium text-white mb-10">{QUIZ_QUESTIONS[currentQ].q}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {QUIZ_QUESTIONS[currentQ].options.map((opt, i) => (
              <button key={i} onClick={() => setAnswers({...answers, [currentQ]: i})} className={`p-5 rounded-2xl border text-left transition-all ${answers[currentQ] === i ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-gray-800 border-white/10 text-gray-400 hover:bg-white/5'}`}>{opt}</button>
            ))}
          </div>
        </GlassCard>
        <div className="flex flex-col items-center gap-6 mt-8">
          <div className="flex gap-2">
            {QUIZ_QUESTIONS.map((_, i) => (
              <button key={i} onClick={() => setCurrentQ(i)} className={`w-3 h-3 rounded-full transition-all ${i === currentQ ? 'ring-2 ring-white ring-offset-4 ring-offset-gray-950 bg-white' : answers[i] !== undefined ? 'bg-indigo-500' : 'bg-gray-800'}`} />
            ))}
          </div>
          <div className="flex justify-between w-full">
            <button onClick={() => setCurrentQ(Math.max(0, currentQ-1))} disabled={currentQ===0} className="px-8 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 disabled:opacity-30">Previous</button>
            {currentQ === 9 ? <button onClick={handleSubmit} className="px-10 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold">Finish Quiz</button> : <button onClick={() => setCurrentQ(Math.min(9, currentQ+1))} className="px-10 py-2 rounded-xl bg-indigo-600 text-white font-bold">Next</button>}
          </div>
        </div>
      </div>
    );
  }

  if (quizState === 'result') {
    const ringColor = score >= 80 ? "text-emerald-500" : score >= 60 ? "text-amber-500" : "text-red-400";
    return (
      <div className="max-w-4xl mx-auto py-10 text-center animate-in fade-in duration-500">
        <GlassCard className="!p-12 flex flex-col items-center">
          <div className="relative w-40 h-40 flex items-center justify-center mb-8">
            <svg width="160" height="160" className="transform -rotate-90">
              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-800" />
              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={439.6} strokeDashoffset={439.6 - (score/100)*439.6} strokeLinecap="round" className={`${ringColor} transition-all duration-1000`} />
            </svg>
            <span className={`absolute text-4xl font-bold ${ringColor}`}>{score}%</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{score >= 80 ? "Excellent!" : score >= 60 ? "Good Job!" : "Keep Practicing!"}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full mt-10 py-8 border-y border-white/5">
            <div><p className="text-gray-500 text-[10px] font-bold uppercase mb-1">Correct</p><p className="text-2xl font-bold text-emerald-400">{Math.round(score/10)}</p></div>
            <div><p className="text-gray-500 text-[10px] font-bold uppercase mb-1">Wrong</p><p className="text-2xl font-bold text-red-400">{10 - Math.round(score/10)}</p></div>
            <div><p className="text-gray-500 text-[10px] font-bold uppercase mb-1">Time taken</p><p className="text-2xl font-bold text-white">4:22</p></div>
            <div><p className="text-gray-500 text-[10px] font-bold uppercase mb-1">Accuracy</p><p className="text-2xl font-bold text-indigo-400">{score}%</p></div>
          </div>
          <div className="flex gap-4 mt-12">
            <button onClick={() => handleStart(activeQuiz)} className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold">Retake</button>
            <button onClick={() => setQuizState('list')} className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold">Back to List</button>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div><h2 className="text-2xl font-bold text-white">Quiz Center</h2><p className="text-gray-500 text-sm">Test your knowledge and earn points</p></div>
        <TabBar tabs={['Scheduled', 'Completed']} active={tab} onChange={setTab} />
      </div>
      {tab === 'Scheduled' ? (
        <div className="space-y-4">
          {QUIZ_SCHEDULED.length > 0 ? QUIZ_SCHEDULED.map(quiz => (
            <GlassCard key={quiz.id} className="flex flex-col md:flex-row items-center justify-between gap-6 group">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"><Brain className="w-8 h-8 text-indigo-400" /></div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{quiz.title}</h3>
                  <div className="flex gap-4 mt-1">
                    <Badge text={quiz.difficulty} color={quiz.difficulty === 'Hard' ? 'red' : 'indigo'} />
                    <span className="text-xs text-gray-500">{quiz.questionCount} Questions • {quiz.duration} min</span>
                  </div>
                </div>
              </div>
              <button onClick={() => handleStart(quiz)} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-10 py-3 rounded-xl transition-all active:scale-95">Start Quiz →</button>
            </GlassCard>
          )) : <EmptyState icon={Brain} title="No scheduled quizzes" subtitle="You're all caught up! Check back later for new assessments." />}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {QUIZ_COMPLETED.map(q => (
            <GlassCard key={q.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold">{q.score}%</div>
                <div><h4 className="text-sm font-bold text-white">{q.title}</h4><p className="text-[10px] text-gray-500 uppercase font-bold">{q.date}</p></div>
              </div>
              <button className="p-2 text-gray-500 hover:text-white"><Download className="w-4 h-4" /></button>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
