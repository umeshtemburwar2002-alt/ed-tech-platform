/**
 * College LMS - Quiz Controller
 * Handles quiz builder CRUD, submit attempt with auto-grading, and analytics
 */

import { supabase } from '../config/supabase.js';

/**
 * Get quiz by ID
 * @route GET /api/quizzes/:id
 */
export const getQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: quiz, error } = await supabase
      .from('quizzes')
      .select(`
        *,
        quiz_questions (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      data: { quiz },
    });
  } catch (error) {
    console.error('Get quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quiz',
    });
  }
};

/**
 * Create quiz
 * @route POST /api/quizzes
 */
export const createQuiz = async (req, res) => {
  try {
    const { title, lesson_id, course_id, timer_minutes, passing_score, is_published, show_answers, allow_retakes, max_attempts, questions } = req.body;

    // Create quiz
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        title,
        lesson_id,
        course_id,
        timer_minutes,
        passing_score,
        is_published,
        show_answers,
        allow_retakes,
        max_attempts,
      })
      .select()
      .single();

    if (quizError) throw quizError;

    // Create questions
    if (questions && questions.length > 0) {
      const questionData = questions.map((q, index) => ({
        quiz_id: quiz.id,
        question: q.question,
        type: q.type,
        options: q.options,
        correct_answer: q.correct_answer,
        explanation: q.explanation,
        order_index: index,
      }));

      const { error: questionsError } = await supabase
        .from('quiz_questions')
        .insert(questionData);

      if (questionsError) throw questionsError;
    }

    res.status(201).json({
      success: true,
      message: 'Quiz created successfully',
      data: { quiz },
    });
  } catch (error) {
    console.error('Create quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create quiz',
    });
  }
};

/**
 * Update quiz
 * @route PUT /api/quizzes/:id
 */
export const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, timer_minutes, passing_score, is_published, show_answers, allow_retakes, max_attempts, questions } = req.body;

    // Update quiz
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .update({
        title,
        timer_minutes,
        passing_score,
        is_published,
        show_answers,
        allow_retakes,
        max_attempts,
      })
      .eq('id', id)
      .select()
      .single();

    if (quizError) throw quizError;

    // Delete existing questions
    await supabase.from('quiz_questions').delete().eq('quiz_id', id);

    // Create new questions
    if (questions && questions.length > 0) {
      const questionData = questions.map((q, index) => ({
        quiz_id: id,
        question: q.question,
        type: q.type,
        options: q.options,
        correct_answer: q.correct_answer,
        explanation: q.explanation,
        order_index: index,
      }));

      const { error: questionsError } = await supabase
        .from('quiz_questions')
        .insert(questionData);

      if (questionsError) throw questionsError;
    }

    res.status(200).json({
      success: true,
      message: 'Quiz updated successfully',
      data: { quiz },
    });
  } catch (error) {
    console.error('Update quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update quiz',
    });
  }
};

/**
 * Delete quiz
 * @route DELETE /api/quizzes/:id
 */
export const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from('quizzes').delete().eq('id', id);

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Quiz deleted successfully',
    });
  } catch (error) {
    console.error('Delete quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete quiz',
    });
  }
};

/**
 * Submit quiz attempt with auto-grading
 * @route POST /api/quizzes/attempt
 */
export const submitAttempt = async (req, res) => {
  try {
    const { quiz_id, student_id, answers } = req.body;

    // Get quiz questions
    const { data: questions, error: questionsError } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('quiz_id', quiz_id);

    if (questionsError) throw questionsError;

    // Get quiz passing score
    const { data: quiz } = await supabase
      .from('quizzes')
      .select('passing_score')
      .eq('id', quiz_id)
      .single();

    // Auto-grade MCQ and True/False questions
    let correctCount = 0;
    const gradedAnswers = {};

    questions.forEach((question) => {
      const studentAnswer = answers[question.id];
      let isCorrect = false;

      if (question.type === 'mcq' || question.type === 'true_false') {
        isCorrect = studentAnswer === question.correct_answer;
        if (isCorrect) correctCount++;
      }

      gradedAnswers[question.id] = {
        answer: studentAnswer,
        is_correct: isCorrect,
      };
    });

    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= quiz.passing_score;

    // Save attempt
    const { data: attempt, error: attemptError } = await supabase
      .from('quiz_attempts')
      .insert({
        quiz_id,
        student_id,
        score,
        passed,
        answers: gradedAnswers,
        started_at: new Date().toISOString(),
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (attemptError) throw attemptError;

    res.status(201).json({
      success: true,
      message: 'Quiz submitted successfully',
      data: { attempt },
    });
  } catch (error) {
    console.error('Submit attempt error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit quiz attempt',
    });
  }
};

/**
 * Get quiz attempts
 * @route GET /api/quizzes/:quizId/attempts/:studentId
 */
export const getAttempts = async (req, res) => {
  try {
    const { quizId, studentId } = req.params;

    const { data: attempts, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('quiz_id', quizId)
      .eq('student_id', studentId)
      .order('started_at', { ascending: false });

    if (error) throw error;

    res.status(200).json({
      success: true,
      data: { attempts },
    });
  } catch (error) {
    console.error('Get attempts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch attempts',
    });
  }
};

/**
 * Get quiz analytics
 * @route GET /api/quizzes/:id/analytics
 */
export const getQuizAnalytics = async (req, res) => {
  try {
    const { id } = req.params;

    // Get all attempts for this quiz
    const { data: attempts, error: attemptsError } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('quiz_id', id);

    if (attemptsError) throw attemptsError;

    // Calculate analytics
    const totalAttempts = attempts.length;
    const passedAttempts = attempts.filter((a) => a.passed).length;
    const failedAttempts = totalAttempts - passedAttempts;
    const averageScore = totalAttempts > 0 
      ? Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / totalAttempts)
      : 0;

    res.status(200).json({
      success: true,
      data: {
        totalAttempts,
        passedAttempts,
        failedAttempts,
        averageScore,
      },
    });
  } catch (error) {
    console.error('Get quiz analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quiz analytics',
    });
  }
};

export default {
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitAttempt,
  getAttempts,
  getQuizAnalytics,
};
