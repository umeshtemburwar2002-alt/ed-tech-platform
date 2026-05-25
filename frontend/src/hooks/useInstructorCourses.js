import { useState, useEffect } from "react";
import { getInstructorCourses } from "../services/courseService";
import { toast } from "react-hot-toast";

export function useInstructorCourses(instructorId) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!instructorId) {
      setLoading(false);
      return;
    }

    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error: fetchError } = await getInstructorCourses(instructorId);
        
        if (fetchError) throw fetchError;
        
        setCourses(data || []);
      } catch (err) {
        console.error("[useInstructorCourses] Error:", err);
        let msg = "Failed to load courses";
        
        if (err.code === "42P01") {
          msg = "Database table missing. Run final-migration.sql in Supabase SQL Editor!";
        } else if (err.message?.includes("RLS") || err.code === "PGRST116") {
          msg = "Access denied. Check RLS policies in Supabase!";
        } else if (err.message) {
          msg = err.message;
        }
        
        setError(msg);
        toast.error(msg, { duration: 6000 });
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [instructorId]);

  return { courses, loading, error, setError, setCourses };
}
