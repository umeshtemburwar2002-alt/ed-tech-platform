import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { supabase } from '../../config/supabaseClient';
import { toast } from 'react-hot-toast';
import { FaPlus, FaTrash, FaVideo, FaCalendarAlt } from 'react-icons/fa';

const LiveClasses = () => {
  const { user } = useSelector((state) => state.profile);
  const role = user?.accountType?.toLowerCase();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClass, setNewClass] = useState({ title: '', course_id: '', meeting_link: '', scheduled_at: '' });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchClasses();
    if (role === 'instructor') {
      fetchInstructorCourses();
    }
  }, [role]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('live_classes')
        .select(`
          *,
          courses (title)
        `)
        .order('scheduled_at', { ascending: true });
      if (error) throw error;
      setClasses(data || []);
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

  const handleCreateClass = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('live_classes')
        .insert([{ ...newClass }]);
      if (error) throw error;
      toast.success('Live class scheduled successfully');
      setShowAddModal(false);
      fetchClasses();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteClass = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const { error } = await supabase.from('live_classes').delete().eq('id', id);
      if (error) throw error;
      toast.success('Class deleted');
      fetchClasses();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Live Classes</h1>
        {role === 'instructor' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded-lg font-bold flex items-center space-x-2"
          >
            <FaPlus /> <span>Schedule Class</span>
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading live classes...</p>
      ) : classes.length === 0 ? (
        <p>No upcoming live classes.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div key={cls.id} className="bg-richblack-800 p-6 rounded-xl border border-richblack-700 shadow-lg">
              <h2 className="text-xl font-bold mb-2">{cls.title}</h2>
              <p className="text-richblack-300 mb-1">Course: {cls.courses?.title || 'N/A'}</p>
              <div className="flex items-center text-yellow-50 text-sm mb-4 space-x-2">
                <FaCalendarAlt />
                <span>{new Date(cls.scheduled_at).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <a
                  href={cls.meeting_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition"
                >
                  <FaVideo /> <span>Join Now</span>
                </a>
                {role === 'instructor' && (
                  <button
                    onClick={() => handleDeleteClass(cls.id)}
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
            <h2 className="text-2xl font-bold mb-6">Schedule Live Class</h2>
            <form onSubmit={handleCreateClass} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Title</label>
                <input
                  type="text"
                  required
                  className="w-full bg-richblack-700 p-2 rounded-lg border border-richblack-600 focus:outline-none focus:border-yellow-50"
                  value={newClass.title}
                  onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Course</label>
                <select
                  required
                  className="w-full bg-richblack-700 p-2 rounded-lg border border-richblack-600 focus:outline-none focus:border-yellow-50"
                  value={newClass.course_id}
                  onChange={(e) => setNewClass({ ...newClass, course_id: e.target.value })}
                >
                  <option value="">Select a course</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Meeting Link</label>
                <input
                  type="url"
                  required
                  placeholder="https://zoom.us/j/..."
                  className="w-full bg-richblack-700 p-2 rounded-lg border border-richblack-600 focus:outline-none focus:border-yellow-50"
                  value={newClass.meeting_link}
                  onChange={(e) => setNewClass({ ...newClass, meeting_link: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Scheduled At</label>
                <input
                  type="datetime-local"
                  required
                  className="w-full bg-richblack-700 p-2 rounded-lg border border-richblack-600 focus:outline-none focus:border-yellow-50"
                  value={newClass.scheduled_at}
                  onChange={(e) => setNewClass({ ...newClass, scheduled_at: e.target.value })}
                />
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
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveClasses;
