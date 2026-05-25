import { supabase } from "../../config/supabaseClient";

/**
 * Fetch all courses from the "courses" table
 * @returns {Promise<{data: any, error: any}>}
 */
export const fetchCoursesFromSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching courses:', error.message);
    return { data: null, error };
  }
};

/**
 * Insert a new course into the "courses" table
 * @param {Object} courseData - The course object to insert
 * @returns {Promise<{data: any, error: any}>}
 */
export const insertCourseToSupabase = async (courseData) => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .insert([courseData])
      .select();
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error inserting course:', error.message);
    return { data: null, error };
  }
};
