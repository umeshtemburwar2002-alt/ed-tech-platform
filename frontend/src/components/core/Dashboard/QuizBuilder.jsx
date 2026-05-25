import React, { useState } from "react";
import { FaPlus, FaTrash, FaGripVertical, FaCheckCircle, FaCircle } from "react-icons/fa";

export default function QuizBuilder({ initialQuiz = null, onSave = () => {} }) {
  const [quiz, setQuiz] = useState(
    initialQuiz || {
      title: "",
      description: "",
      timeLimit: 900, // 15 minutes in seconds
      passingScore: 60, // percentage
      questions: [
        { id: Date.now(), type: "mcq", questionText: "", options: ["", "", "", ""], correctAnswer: "", explanation: "", orderIndex: 0 }
      ]
    }
  );

  const addQuestion = (type = "mcq") => {
    const newQuestion = {
      id: Date.now(),
      type,
      questionText: "",
      options: type === "mcq" ? ["", "", "", ""] : [],
      correctAnswer: "",
      explanation: "",
      orderIndex: quiz.questions.length
    };
    setQuiz({ ...quiz, questions: [...quiz.questions, newQuestion] });
  };

  const updateQuestion = (id, patch) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map(q => q.id === id ? { ...q, ...patch } : q)
    });
  };

  const removeQuestion = (id) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.filter(q => q.id !== id)
    });
  };

  const updateOption = (questionId, index, value) => {
    const question = quiz.questions.find(q => q.id === questionId);
    const newOptions = [...question.options];
    newOptions[index] = value;
    updateQuestion(questionId, { options: newOptions });
  };

  const handleSave = () => {
    onSave(quiz);
  };

  return (
    <div className="space-y-8">
      <div className="bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-xl">
        <h2 className="text-2xl font-bold text-richblack-5 mb-6">Quiz Builder</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-richblack-5">Quiz Title</label>
            <input
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              placeholder="e.g. Final Exam - Web Development"
              className="w-full px-4 py-3 text-sm rounded-lg bg-richblack-900 border border-richblack-700 focus:border-yellow-50 outline-none text-richblack-25"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-richblack-5">Time Limit (minutes)</label>
              <input
                type="number"
                value={quiz.timeLimit / 60}
                onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) * 60 })}
                placeholder="15"
                className="w-full px-4 py-3 text-sm rounded-lg bg-richblack-900 border border-richblack-700 focus:border-yellow-50 outline-none text-richblack-25"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-richblack-5">Passing Score (%)</label>
              <input
                type="number"
                value={quiz.passingScore}
                onChange={(e) => setQuiz({ ...quiz, passingScore: parseInt(e.target.value) })}
                placeholder="60"
                className="w-full px-4 py-3 text-sm rounded-lg bg-richblack-900 border border-richblack-700 focus:border-yellow-50 outline-none text-richblack-25"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <label className="block text-sm font-semibold text-richblack-5">Description</label>
          <textarea
            rows={3}
            value={quiz.description}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            placeholder="Instructions for students taking this quiz..."
            className="w-full resize-none px-4 py-3 text-sm rounded-lg bg-richblack-900 border border-richblack-700 focus:border-yellow-50 outline-none text-richblack-25"
          />
        </div>
      </div>

      <div className="flex items-center justify-between bg-richblack-900/50 p-4 rounded-xl border border-richblack-700">
        <h3 className="text-lg font-bold text-richblack-5">Questions ({quiz.questions.length})</h3>
        <div className="flex gap-2">
          <button
            onClick={() => addQuestion("mcq")}
            className="px-3 py-2 text-xs rounded-lg bg-yellow-50 text-richblack-900 font-bold hover:scale-105 transition-all shadow-md flex items-center gap-1"
          >
            <FaPlus /> MCQ
          </button>
          <button
            onClick={() => addQuestion("tf")}
            className="px-3 py-2 text-xs rounded-lg bg-blue-500 text-white font-bold hover:scale-105 transition-all shadow-md flex items-center gap-1"
          >
            <FaPlus /> True/False
          </button>
          <button
            onClick={() => addQuestion("short")}
            className="px-3 py-2 text-xs rounded-lg bg-emerald-500 text-white font-bold hover:scale-105 transition-all shadow-md flex items-center gap-1"
          >
            <FaPlus /> Short Answer
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {quiz.questions.map((question, idx) => (
          <div
            key={question.id}
            className="bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-xl"
          >
            <div className="flex items-start gap-4">
              <div className="bg-yellow-50 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-richblack-900 shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                    question.type === "mcq" ? "bg-yellow-50/10 text-yellow-50 border border-yellow-50/20" :
                    question.type === "tf" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  }`}>
                    {question.type === "mcq" ? "MCQ" : question.type === "tf" ? "True/False" : "Short Answer"}
                  </span>
                  <button
                    onClick={() => removeQuestion(question.id)}
                    className="p-1 text-rose-500 hover:text-rose-400 transition-colors ml-auto"
                  >
                    <FaTrash />
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-richblack-5">Question</label>
                  <textarea
                    rows={2}
                    value={question.questionText}
                    onChange={(e) => updateQuestion(question.id, { questionText: e.target.value })}
                    placeholder="Enter your question here..."
                    className="w-full resize-none px-4 py-3 text-sm rounded-lg bg-richblack-900 border border-richblack-700 focus:border-yellow-50 outline-none text-richblack-25"
                  />
                </div>

                {question.type === "mcq" && (
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-richblack-5">Options</label>
                    {question.options.map((option, optIdx) => (
                      <div key={optIdx} className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuestion(question.id, { correctAnswer: String(optIdx) })}
                          className={`p-2 rounded-full transition-all ${
                            question.correctAnswer === String(optIdx)
                              ? "bg-emerald-500 text-white"
                              : "bg-richblack-700 text-richblack-400 hover:bg-richblack-600"
                          }`}
                        >
                          {question.correctAnswer === String(optIdx) ? <FaCheckCircle /> : <FaCircle />}
                        </button>
                        <input
                          value={option}
                          onChange={(e) => updateOption(question.id, optIdx, e.target.value)}
                          placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                          className="flex-1 px-4 py-2 text-sm rounded-lg bg-richblack-900 border border-richblack-700 focus:border-yellow-50 outline-none text-richblack-25"
                        />
                      </div>
                    ))}
                    <p className="text-[11px] text-yellow-500 flex items-center gap-1">
                      <FaCheckCircle /> Select the correct answer
                    </p>
                  </div>
                )}

                {question.type === "tf" && (
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-richblack-5">Correct Answer</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={question.correctAnswer === "true"}
                          onChange={() => updateQuestion(question.id, { correctAnswer: "true" })}
                          className="w-4 h-4 accent-emerald-500"
                        />
                        <span className="text-sm text-richblack-25">True</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          checked={question.correctAnswer === "false"}
                          onChange={() => updateQuestion(question.id, { correctAnswer: "false" })}
                          className="w-4 h-4 accent-rose-500"
                        />
                        <span className="text-sm text-richblack-25">False</span>
                      </label>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-richblack-5">Explanation (Optional)</label>
                  <textarea
                    rows={2}
                    value={question.explanation}
                    onChange={(e) => updateQuestion(question.id, { explanation: e.target.value })}
                    placeholder="Explain why the answer is correct..."
                    className="w-full resize-none px-4 py-3 text-sm rounded-lg bg-richblack-900 border border-richblack-700 focus:border-yellow-50 outline-none text-richblack-25"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-8 py-3 text-sm font-bold rounded-lg bg-gradient-to-r from-yellow-50 to-yellow-200 text-richblack-900 hover:scale-105 transition-all shadow-lg"
        >
          Save Quiz
        </button>
      </div>
    </div>
  );
}
