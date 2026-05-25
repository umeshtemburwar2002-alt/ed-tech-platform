import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { supabase } from '../../config/supabaseClient';
import { toast } from 'react-hot-toast';
import { FaPlus, FaTrash, FaPlay } from 'react-icons/fa';

const Quiz = () => {
  const { user } = useSelector((state) => state.profile);
  const role = user?.accountType?.toLowerCase();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuiz, setNewQuiz] = useState({ title: '', course_id: '' });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchQuizzes();
    if (role === 'instructor') {
      fetchInstructorCourses();
    }
  }, [role]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('quizzes')
        .select(`
          *,
          courses (title)
        `);
      if (error) throw error;
      setQuizzes(data || []);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchInstructorCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('id, title')
        .eq('created_by', user.id);
      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('quizzes')
        .insert([{ ...newQuiz }]);
      if (error) throw error;
      toast.success('Quiz created successfully');
      setShowAddModal(false);
      fetchQuizzes();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteQuiz = async (id) => {
    if (!window.confirm('Are you sure you want to delete this quiz?')) return;
    try {
      const { error } = await supabase.from('quizzes').delete().eq('id', id);
      if (error) throw error;
      toast.success('Quiz deleted');
      fetchQuizzes();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quizzes</h1>
        {role === 'instructor' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded-lg font-bold flex items-center space-x-2"
          >
            <FaPlus /> <span>Add Quiz</span>
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading quizzes...</p>
      ) : quizzes.length === 0 ? (
        <p>No quizzes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-richblack-800 p-6 rounded-xl border border-richblack-700 shadow-lg">
              <h2 className="text-xl font-bold mb-2">{quiz.title}</h2>
              <p className="text-richblack-300 mb-4">Course: {quiz.courses?.title || 'N/A'}</p>
              <div className="flex justify-between items-center">
                {role === 'student' ? (
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition">
                    <FaPlay /> <span>Start Quiz</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleDeleteQuiz(quiz.id)}
                    className="text-pink-200 hover:text-pink-500 transition"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-richblack-800 p-8 rounded-2xl w-full max-w-md border border-richblack-700">
            <h2 className="text-2xl font-bold mb-6">Add New Quiz</h2>
            <form onSubmit={handleCreateQuiz} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Quiz Title</label>
                <input
                  type="text"
                  required
                  className="w-full bg-richblack-700 p-2 rounded-lg border border-richblack-600 focus:outline-none focus:border-yellow-50"
                  value={newQuiz.title}
                  onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Course</label>
                <select
                  required
                  className="w-full bg-richblack-700 p-2 rounded-lg border border-richblack-600 focus:outline-none focus:border-yellow-50"
                  value={newQuiz.course_id}
                  onChange={(e) => setNewQuiz({ ...newQuiz, course_id: e.target.value })}
                >
                  <option value="">Select a course</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-richblack-700 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-yellow-50 text-richblack-900 font-bold py-2 rounded-lg"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
