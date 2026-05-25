import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../../../config/supabaseClient";
import { toast } from "react-hot-toast";
import { FaPlus, FaTrash, FaVideo, FaLink, FaCalendarAlt } from "react-icons/fa";

export default function LiveClasses() {
  const { user } = useSelector((state) => state.profile);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedRole] = useState("");
  const [liveClasses, setLiveClasses] = useState([]);
  const [showAddClass, setShowAddClass] = useState(false);
  const [newClass, setNewClass] = useState({ title: "", link: "", scheduledAt: "" });

  useEffect(() => {
    fetchInstructorCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchInstructorCourses = async () => {
    const { data } = await supabase
      .from("courses")
      .select("id, courseName")
      .eq("instructor_id", user.id);
    if (data) setCourses(data);
  };

  const fetchLiveClasses = async (courseId) => {
    const { data } = await supabase
      .from("live_classes")
      .select("*")
      .eq("course_id", courseId)
      .order('scheduled_at', { ascending: true });
    if (data) setLiveClasses(data);
  };

  const handleSaveClass = async () => {
    if (!selectedCourse || !newClass.title || !newClass.link || !newClass.scheduledAt) {
      toast.error("Please fill all details");
      return;
    }

    try {
      const { error } = await supabase
        .from("live_classes")
        .insert([{
          course_id: selectedCourse,
          title: newClass.title,
          meeting_link: newClass.link,
          scheduled_at: newClass.scheduledAt,
          created_by: user.id
        }]);

      if (error) throw error;
      toast.success("Live class scheduled successfully");
      setShowAddClass(false);
      fetchLiveClasses(selectedCourse);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Live Classes</h1>
        <button
          onClick={() => setShowAddClass(true)}
          className="btn-primary px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus /> Schedule Class
        </button>
      </div>

      <select
        onChange={(e) => {
          setSelectedRole(e.target.value);
          fetchLiveClasses(e.target.value);
        }}
        className="w-full p-3 bg-richblack-800 text-white rounded-lg border border-richblack-700"
      >
        <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c.id} value={c.id}>{c.courseName}</option>
        ))}
      </select>

      {showAddClass && (
        <div className="bg-richblack-800 p-6 rounded-xl border border-richblack-700 space-y-4">
          <input
            type="text"
            placeholder="Class Title"
            value={newClass.title}
            onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
            className="w-full p-3 bg-richblack-900 text-white rounded-lg border border-richblack-700"
          />
          <input
            type="url"
            placeholder="Meeting Link (Zoom/Meet)"
            value={newClass.link}
            onChange={(e) => setNewClass({ ...newClass, link: e.target.value })}
            className="w-full p-3 bg-richblack-900 text-white rounded-lg border border-richblack-700"
          />
          <input
            type="datetime-local"
            value={newClass.scheduledAt}
            onChange={(e) => setNewClass({ ...newClass, scheduledAt: e.target.value })}
            className="w-full p-3 bg-richblack-900 text-white rounded-lg border border-richblack-700"
          />
          <button onClick={handleSaveClass} className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded font-bold w-full">
            Schedule
          </button>
        </div>
      )}

      <div className="grid gap-4">
        {liveClasses.map((lc) => (
          <div key={lc.id} className="bg-richblack-800 p-5 rounded-lg border border-richblack-700 flex justify-between items-center group">
            <div className="space-y-1">
              <h3 className="font-bold text-white">{lc.title}</h3>
              <div className="flex items-center gap-4 text-[11px] text-richblack-300 uppercase tracking-widest">
                <span className="flex items-center gap-1"><FaCalendarAlt /> {new Date(lc.scheduled_at).toLocaleString()}</span>
                <span className="flex items-center gap-1"><FaVideo /> Live</span>
              </div>
            </div>
            <div className="flex gap-3">
              <a href={lc.meeting_link} target="_blank" rel="noreferrer" className="p-2 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20 flex items-center gap-2 text-xs font-bold px-4">
                <FaLink /> Join Link
              </a>
              <button className="text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
