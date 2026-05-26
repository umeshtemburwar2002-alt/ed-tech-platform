/**
 * College LMS - Admin Controller
 * Handles platform stats, user management, course approvals, and CSV export
 */

import { supabase } from '../config/supabase.js';

/**
 * Get platform statistics
 * @route GET /api/admin/stats
 */
export const getPlatformStats = async (req, res) => {
  try {
    // Get total users
    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    // Get total courses
    const { count: totalCourses } = await supabase
      .from('courses')
      .select('*', { count: 'exact', head: true });

    // Get total enrollments
    const { count: totalEnrollments } = await supabase
      .from('enrollments')
      .select('*', { count: 'exact', head: true });

    // Get total revenue (from paid courses)
    const { data: paidEnrollments } = await supabase
      .from('enrollments')
      .select('courses (price, discount)')
      .not('courses.is_free', 'is', true);

    const totalRevenue = paidEnrollments.reduce((sum, e) => {
      const price = e.courses?.price || 0;
      const discount = e.courses?.discount || 0;
      return sum + (price - (price * discount / 100));
    }, 0);

    // Get pending courses
    const { count: pendingCourses } = await supabase
      .from('courses')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalCourses,
        totalEnrollments,
        totalRevenue,
        pendingCourses,
      },
    });
  } catch (error) {
    console.error('Get platform stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch platform stats',
    });
  }
};

/**
 * Get all users with filters
 * @route GET /api/admin/users
 */
export const getAllUsers = async (req, res) => {
  try {
    const { role, department_id, page = 1, limit = 20 } = req.query;

    let query = supabase
      .from('profiles')
      .select(`
        *,
        departments (name, code)
      `, { count: 'exact' });

    if (role) {
      query = query.eq('role', role);
    }

    if (department_id) {
      query = query.eq('department_id', department_id);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data: users, count, error } = await query
      .range(from, to)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json({
      success: true,
      data: { users, total: count, page, limit },
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
    });
  }
};

/**
 * Update user role
 * @route PUT /api/admin/users/:id/role
 */
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const { data: user, error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      data: { user },
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user role',
    });
  }
};

/**
 * Delete user
 * @route DELETE /api/admin/users/:id
 */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from('profiles').delete().eq('id', id);

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
    });
  }
};

/**
 * Get pending courses
 * @route GET /api/admin/courses/pending
 */
export const getPendingCourses = async (req, res) => {
  try {
    const { data: courses, error } = await supabase
      .from('courses')
      .select(`
        *,
        profiles:instructor_id (full_name, email),
        departments (name, code)
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json({
      success: true,
      data: { courses },
    });
  } catch (error) {
    console.error('Get pending courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch pending courses',
    });
  }
};

/**
 * Approve course
 * @route PUT /api/admin/courses/:id/approve
 */
export const approveCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: course, error } = await supabase
      .from('courses')
      .update({ status: 'published' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Course approved successfully',
      data: { course },
    });
  } catch (error) {
    console.error('Approve course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to approve course',
    });
  }
};

/**
 * Reject course
 * @route PUT /api/admin/courses/:id/reject
 */
export const rejectCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: course, error } = await supabase
      .from('courses')
      .update({ status: 'rejected' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Course rejected successfully',
      data: { course },
    });
  } catch (error) {
    console.error('Reject course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reject course',
    });
  }
};

/**
 * Export users to CSV
 * @route GET /api/admin/users/export
 */
export const exportUsersCSV = async (req, res) => {
  try {
    const { role, department_id } = req.query;

    let query = supabase
      .from('profiles')
      .select(`
        id,
        full_name,
        email,
        roll_number,
        role,
        department_id,
        semester,
        created_at
      `);

    if (role) {
      query = query.eq('role', role);
    }

    if (department_id) {
      query = query.eq('department_id', department_id);
    }

    const { data: users, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;

    // Generate CSV
    const headers = ['ID', 'Full Name', 'Email', 'Roll Number', 'Role', 'Department ID', 'Semester', 'Created At'];
    const csvRows = [
      headers.join(','),
      ...users.map((user) =>
        [
          user.id,
          user.full_name,
          user.email,
          user.roll_number || '',
          user.role,
          user.department_id || '',
          user.semester || '',
          user.created_at,
        ].join(',')
      ),
    ];

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
    res.send(csvRows.join('\n'));
  } catch (error) {
    console.error('Export users CSV error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export users',
    });
  }
};

export default {
  getPlatformStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getPendingCourses,
  approveCourse,
  rejectCourse,
  exportUsersCSV,
};
