import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../../../config/supabaseClient";
import { toast } from "react-hot-toast";
import { FaPlus, FaTrash, FaVideo, FaLink, FaCalendarAlt, FaSpinner } from "react-icons/fa";

export default function LiveClasses() {
  const { user } = useSelector((state) => state.profile);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [liveClasses, setLiveClasses] = useState([]);
  const [showAddClass, setShowAddClass] = useState(false);
  const [newClass, setNewClass] = useState({ title: "", link: "", scheduledAt: "" });
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingLiveClasses, setLoadingLiveClasses] = useState(false);
  const [deletingClassId, setDeletingClassId] = useState(null);

  useEffect(() => {
    fetchInstructorCourses();
    
    // Set up realtime subscription
    const channel = supabase
      .channel("live_classes_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "live_classes",
        },
        (payload) => {
          console.log("[LiveClasses] Realtime update:", payload);
          // Refresh live classes for selected course if any
          if (selectedCourse) {
            fetchLiveClasses(selectedCourse);
          }
        }
      )
      .subscribe();

    return () => {
      // Clean up subscription on unmount
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchInstructorCourses = async () => {
    console.log("[LiveClasses] Fetching instructor courses...");
    setLoadingCourses(true);
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("id, course_name")
        .eq("instructor_id", user.id);
      
      if (error) {
        console.error("[LiveClasses] Error fetching courses:", error);
        toast.error("Failed to load courses");
        return;
      }

      console.log("[LiveClasses] Courses loaded:", data);
      setCourses(data || []);
    } catch (error) {
      console.error("[LiveClasses] Unexpected error fetching courses:", error);
      toast.error("Failed to load courses");
    } finally {
      setLoadingCourses(false);
    }
  };

  const fetchLiveClasses = async (courseId) => {
    if (!courseId) {
      setLiveClasses([]);
      return;
    }

    console.log("[LiveClasses] Fetching live classes for course:", courseId);
    setLoadingLiveClasses(true);
    try {
      const { data, error } = await supabase
        .from("live_classes")
        .select("*")
        .eq("course_id", courseId)
        .order('scheduled_at', { ascending: true });

      if (error) {
        console.error("[LiveClasses] Error fetching live classes:", error);
        toast.error("Failed to load live classes");
        return;
      }

      console.log("[LiveClasses] Live classes loaded:", data);
      setLiveClasses(data || []);
    } catch (error) {
      console.error("[LiveClasses] Unexpected error fetching live classes:", error);
      toast.error("Failed to load live classes");
    } finally {
      setLoadingLiveClasses(false);
    }
  };

  const validateNewClass = () => {
    if (!selectedCourse) {
      toast.error("Please select a course");
      return false;
    }
    if (!newClass.title.trim()) {
      toast.error("Please enter a class title");
      return false;
    }
    if (!newClass.link.trim()) {
      toast.error("Please enter a meeting link");
      return false;
    }
    try {
      new URL(newClass.link);
    } catch {
      toast.error("Please enter a valid URL for the meeting link");
      return false;
    }
    if (!newClass.scheduledAt) {
      toast.error("Please select a date and time");
      return false;
    }
    return true;
  };

  const handleSaveClass = async () => {
    if (!validateNewClass()) return;

    try {
      console.log("[LiveClasses] Saving new live class...");
      const { error } = await supabase
        .from("live_classes")
        .insert([{
          course_id: selectedCourse,
          title: newClass.title.trim(),
          meeting_link: newClass.link.trim(),
          scheduled_at: newClass.scheduledAt,
          created_by: user.id
        }]);

      if (error) {
        console.error("[LiveClasses] Error saving live class:", error);
        throw error;
      }

      console.log("[LiveClasses] Live class saved successfully");
      toast.success("Live class scheduled successfully");
      setShowAddClass(false);
      setNewClass({ title: "", link: "", scheduledAt: "" });
      fetchLiveClasses(selectedCourse);
    } catch (error) {
      toast.error(error.message || "Failed to schedule live class");
    }
  };

  const handleDeleteClass = async (classId) => {
    setDeletingClassId(classId);
    try {
      console.log("[LiveClasses] Deleting live class:", classId);
      const { error } = await supabase
        .from("live_classes")
        .delete()
        .eq("id", classId);

      if (error) {
        console.error("[LiveClasses] Error deleting live class:", error);
        throw error;
      }

      console.log("[LiveClasses] Live class deleted successfully");
      toast.success("Live class deleted");
      fetchLiveClasses(selectedCourse);
    } catch (error) {
      toast.error(error.message || "Failed to delete live class");
    } finally {
      setDeletingClassId(null);
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
          setSelectedCourse(e.target.value);
          fetchLiveClasses(e.target.value);
        }}
        value={selectedCourse}
        className="w-full p-3 bg-richblack-800 text-white rounded-lg border border-richblack-700"
        disabled={loadingCourses}
      >
        <option value="">Select Course</option>
        {loadingCourses ? (
          <option value="" disabled>Loading courses...</option>
        ) : (
          courses.map((c) => (
            <option key={c.id} value={c.id}>{c.course_name}</option>
          ))
        )}
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
          <div className="flex gap-3">
            <button 
              onClick={() => setShowAddClass(false)} 
              className="px-4 py-2 rounded-lg border border-richblack-700 text-richblack-300 flex-1"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveClass} 
              className="bg-yellow-50 text-richblack-900 px-4 py-2 rounded font-bold flex-1"
            >
              Schedule
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {loadingLiveClasses ? (
          <div className="flex items-center justify-center py-12">
            <FaSpinner className="animate-spin text-yellow-50 text-2xl" />
          </div>
        ) : liveClasses.length === 0 ? (
          selectedCourse && (
            <div className="text-center py-12 text-richblack-400">
              No live classes scheduled for this course yet.
            </div>
          )
        ) : (
          liveClasses.map((lc) => (
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
                <button 
                  onClick={() => handleDeleteClass(lc.id)}
                  disabled={deletingClassId === lc.id}
                  className="text-pink-400 hover:text-pink-300 transition-colors disabled:opacity-50"
                >
                  {deletingClassId === lc.id ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
