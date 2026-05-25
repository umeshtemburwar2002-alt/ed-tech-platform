import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { supabase } from '../../config/supabaseClient';
import { toast } from 'react-hot-toast';
import { FaPlus, FaTrash, FaDownload, FaFileUpload } from 'react-icons/fa';

const Notes = () => {
  const { user } = useSelector((state) => state.profile);
  const role = user?.accountType?.toLowerCase();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', course_id: '', file: null });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchNotes();
    if (role === 'instructor') {
      fetchInstructorCourses();
    }
  }, [role]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notes')
        .select(`
          *,
          courses (title)
        `);
      if (error) throw error;
      setNotes(data || []);
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

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!newNote.file) return toast.error('Please select a file');

    try {
      setUploading(true);
      const file = newNote.file;
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('course-notes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('course-notes')
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from('notes')
        .insert([{
          title: newNote.title,
          course_id: newNote.course_id,
          file_url: publicUrl,
          uploaded_by: user.id
        }]);

      if (dbError) throw dbError;

      toast.success('Note uploaded successfully');
      setShowAddModal(false);
      setNewNote({ title: '', course_id: '', file: null });
      fetchNotes();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteNote = async (id, fileUrl) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const { error } = await supabase.from('notes').delete().eq('id', id);
      if (error) throw error;
      toast.success('Note deleted');
      fetchNotes();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Notes</h1>
        {role === 'instructor' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded-lg font-bold flex items-center space-x-2"
          >
            <FaPlus /> <span>Upload Note</span>
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div key={note.id} className="bg-richblack-800 p-6 rounded-xl border border-richblack-700 shadow-lg">
              <h2 className="text-xl font-bold mb-2">{note.title}</h2>
              <p className="text-richblack-300 mb-4">Course: {note.courses?.title || 'N/A'}</p>
              <div className="flex justify-between items-center">
                <a
                  href={note.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition"
                >
                  <FaDownload /> <span>Download</span>
                </a>
                {role === 'instructor' && (
                  <button
                    onClick={() => handleDeleteNote(note.id, note.file_url)}
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
            <h2 className="text-2xl font-bold mb-6">Upload New Note</h2>
            <form onSubmit={handleFileUpload} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Title</label>
                <input
                  type="text"
                  required
                  className="w-full bg-richblack-700 p-2 rounded-lg border border-richblack-600 focus:outline-none focus:border-yellow-50"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Course</label>
                <select
                  required
                  className="w-full bg-richblack-700 p-2 rounded-lg border border-richblack-600 focus:outline-none focus:border-yellow-50"
                  value={newNote.course_id}
                  onChange={(e) => setNewNote({ ...newNote, course_id: e.target.value })}
                >
                  <option value="">Select a course</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">File (PDF/DOC)</label>
                <div className="relative border-2 border-dashed border-richblack-600 rounded-lg p-4 text-center hover:border-yellow-50 transition cursor-pointer">
                  <input
                    type="file"
                    required
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => setNewNote({ ...newNote, file: e.target.files[0] })}
                  />
                  <div className="flex flex-col items-center">
                    <FaFileUpload className="text-3xl text-richblack-400 mb-2" />
                    <span className="text-sm text-richblack-300">
                      {newNote.file ? newNote.file.name : 'Click to select or drag and drop'}
                    </span>
                  </div>
                </div>
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
                  disabled={uploading}
                  className={`flex-1 bg-yellow-50 text-richblack-900 font-bold py-2 rounded-lg ${uploading ? 'opacity-50' : ''}`}
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
