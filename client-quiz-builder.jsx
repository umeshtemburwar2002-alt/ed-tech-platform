/**
 * College LMS - Quiz Builder Component
 * Instructor quiz creation with question builder and preview
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { Plus, GripVertical, Trash2, Eye, Save } from 'lucide-react';

const QuizBuilder = ({ lessonId, courseId, existingQuiz, onSave, onCancel }) => {
  const [quizSettings, setQuizSettings] = useState({
    title: existingQuiz?.title || '',
    timer_minutes: existingQuiz?.timer_minutes || 30,
    passing_score: existingQuiz?.passing_score || 70,
    is_published: existingQuiz?.is_published || false,
    show_answers: existingQuiz?.show_answers || true,
    allow_retakes: existingQuiz?.allow_retakes || false,
    max_attempts: existingQuiz?.max_attempts || 3,
  });

  const [questions, setQuestions] = useState(
    existingQuiz?.quiz_questions?.map((q, index) => ({
      id: q.id,
      question: q.question,
      type: q.type,
      options: q.options || [],
      correct_answer: q.correct_answer,
      explanation: q.explanation,
      order_index: index,
    })) || []
  );

  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: `temp-${Date.now()}`,
        question: '',
        type: 'mcq',
        options: ['', '', '', ''],
        correct_answer: 0,
        explanation: '',
        order_index: questions.length,
      },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index, field, value) => {
    setQuestions(
      questions.map((q, i) =>
        i === index ? { ...q, [field]: value } : q
      )
    );
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setQuestions(
      questions.map((q, qi) => {
        if (qi !== questionIndex) return q;
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      })
    );
  };

  const handleSetCorrectAnswer = (questionIndex, value) => {
    setQuestions(
      questions.map((q, i) =>
        i === questionIndex ? { ...q, correct_answer: value } : q
      )
    );
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setQuestions(items.map((q, i) => ({ ...q, order_index: i })));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const quizData = {
        title: quizSettings.title,
        lesson_id: lessonId,
        course_id: courseId,
        timer_minutes: quizSettings.timer_minutes,
        passing_score: quizSettings.passing_score,
        is_published: quizSettings.is_published,
        show_answers: quizSettings.show_answers,
        allow_retakes: quizSettings.allow_retakes,
        max_attempts: quizSettings.max_attempts,
        questions: questions.map((q) => ({
          question: q.question,
          type: q.type,
          options: q.options,
          correct_answer: q.correct_answer,
          explanation: q.explanation,
        })),
      };

      let result;
      if (existingQuiz?.id) {
        result = await supabase
          .from('quizzes')
          .update({
            title: quizData.title,
            timer_minutes: quizData.timer_minutes,
            passing_score: quizData.passing_score,
            is_published: quizData.is_published,
            show_answers: quizData.show_answers,
            allow_retakes: quizData.allow_retakes,
            max_attempts: quizData.max_attempts,
          })
          .eq('id', existingQuiz.id)
          .select()
          .single();

        // Delete existing questions
        await supabase
          .from('quiz_questions')
          .delete()
          .eq('quiz_id', existingQuiz.id);

        // Insert new questions
        if (quizData.questions.length > 0) {
          const questionData = quizData.questions.map((q, index) => ({
            quiz_id: existingQuiz.id,
            ...q,
            order_index: index,
          }));
          await supabase.from('quiz_questions').insert(questionData);
        }
      } else {
        result = await supabase
          .from('quizzes')
          .insert({
            title: quizData.title,
            lesson_id: quizData.lesson_id,
            course_id: quizData.course_id,
            timer_minutes: quizData.timer_minutes,
            passing_score: quizData.passing_score,
            is_published: quizData.is_published,
            show_answers: quizData.show_answers,
            allow_retakes: quizData.allow_retakes,
            max_attempts: quizData.max_attempts,
          })
          .select()
          .single();

        if (quizData.questions.length > 0) {
          const questionData = quizData.questions.map((q, index) => ({
            quiz_id: result.data.id,
            ...q,
            order_index: index,
          }));
          await supabase.from('quiz_questions').insert(questionData);
        }
      }

      if (result.error) throw result.error;

      toast.success('Quiz saved successfully');
      if (onSave) onSave(result.data);
    } catch (error) {
      console.error('Failed to save quiz:', error);
      toast.error('Failed to save quiz');
    } finally {
      setSaving(false);
    }
  };

  const renderQuestionCard = (question, index) => (
    <Draggable key={question.id} draggableId={question.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="bg-slate-900/50 rounded-xl p-6 border border-slate-700 mb-4"
        >
          <div className="flex items-start gap-4 mb-4">
            <div {...provided.dragHandleProps}>
              <GripVertical className="w-5 h-5 text-slate-500 mt-2" />
            </div>
            <div className="flex-1 space-y-4">
              {/* Question Type */}
              <div className="flex items-center gap-4">
                <select
                  value={question.type}
                  onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="mcq">Multiple Choice</option>
                  <option value="true_false">True/False</option>
                  <option value="short">Short Answer</option>
                </select>
                <button
                  onClick={() => handleRemoveQuestion(index)}
                  className="text-slate-500 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Question Text */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Question
                </label>
                <textarea
                  value={question.question}
                  onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={2}
                  placeholder="Enter your question..."
                />
              </div>

              {/* Options for MCQ */}
              {question.type === 'mcq' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Options (select correct answer)
                  </label>
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${index}`}
                        checked={question.correct_answer === optIndex}
                        onChange={() => handleSetCorrectAnswer(index, optIndex)}
                        className="w-4 h-4"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Option ${optIndex + 1}`}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Options for True/False */}
              {question.type === 'true_false' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Correct Answer
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${index}`}
                        checked={question.correct_answer === 'true'}
                        onChange={() => handleSetCorrectAnswer(index, 'true')}
                        className="w-4 h-4"
                      />
                      <span className="text-white">True</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${index}`}
                        checked={question.correct_answer === 'false'}
                        onChange={() => handleSetCorrectAnswer(index, 'false')}
                        className="w-4 h-4"
                      />
                      <span className="text-white">False</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Explanation */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Explanation (optional)
                </label>
                <textarea
                  value={question.explanation}
                  onChange={(e) => handleQuestionChange(index, 'explanation', e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={2}
                  placeholder="Explain why this is the correct answer..."
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );

  return (
    <div className="space-y-6">
      {/* Quiz Settings */}
      <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Quiz Settings</h2>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Quiz Title"
            value={quizSettings.title}
            onChange={(e) => setQuizSettings({ ...quizSettings, title: e.target.value })}
            placeholder="Enter quiz title"
          />
          <Input
            label="Timer (minutes)"
            type="number"
            value={quizSettings.timer_minutes}
            onChange={(e) => setQuizSettings({ ...quizSettings, timer_minutes: parseInt(e.target.value) })}
            placeholder="30"
          />
          <Input
            label="Passing Score (%)"
            type="number"
            value={quizSettings.passing_score}
            onChange={(e) => setQuizSettings({ ...quizSettings, passing_score: parseInt(e.target.value) })}
            placeholder="70"
          />
          <Input
            label="Max Attempts"
            type="number"
            value={quizSettings.max_attempts}
            onChange={(e) => setQuizSettings({ ...quizSettings, max_attempts: parseInt(e.target.value) })}
            placeholder="3"
          />
        </div>
        <div className="flex gap-4 mt-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={quizSettings.show_answers}
              onChange={(e) => setQuizSettings({ ...quizSettings, show_answers: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-slate-300">Show answers after submission</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={quizSettings.allow_retakes}
              onChange={(e) => setQuizSettings({ ...quizSettings, allow_retakes: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-slate-300">Allow retakes</span>
          </label>
        </div>
      </div>

      {/* Questions */}
      <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Questions</h2>
          <Badge variant="published">{questions.length} questions</Badge>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="questions">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {questions.map((question, index) => renderQuestionCard(question, index))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <button
          onClick={handleAddQuestion}
          className="w-full mt-4 py-3 border-2 border-dashed border-slate-600 rounded-lg text-slate-400 hover:border-slate-500 hover:text-slate-300 transition-colors"
        >
          + Add Question
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button onClick={onCancel} variant="secondary">
          Cancel
        </Button>
        <Button onClick={() => setShowPreview(true)} variant="secondary" icon={Eye}>
          Preview Quiz
        </Button>
        <Button onClick={handleSave} variant="primary" icon={Save} loading={saving}>
          Save Quiz
        </Button>
      </div>

      {/* Preview Modal */}
      <Modal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        title="Quiz Preview"
        size="lg"
      >
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">{quizSettings.title}</h3>
          <div className="flex gap-4 text-slate-400">
            <p>Time: {quizSettings.timer_minutes} min</p>
            <p>Passing: {quizSettings.passing_score}%</p>
            <p>Questions: {questions.length}</p>
          </div>
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={question.id} className="bg-slate-800 rounded-lg p-4">
                <p className="text-white font-medium mb-2">
                  {index + 1}. {question.question}
                </p>
                {question.type === 'mcq' && (
                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-2 rounded ${
                          question.correct_answer === optIndex
                            ? 'bg-green-500/20 border border-green-500'
                            : 'bg-slate-700'
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QuizBuilder;
