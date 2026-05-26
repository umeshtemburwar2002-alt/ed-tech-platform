/**
 * College LMS - Supabase Server Configuration
 * This file sets up the Supabase client with service role key for server-side operations
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
  db: {
    schema: 'public',
  },
});

/**
 * Server-side Auth Helper Functions
 */

/**
 * Verify JWT token from Supabase
 * @param {string} token - JWT token
 * @returns {Promise<Object>} - User data or error
 */
export const verifyToken = async (token) => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error) throw error;
    return { user, error: null };
  } catch (error) {
    console.error('Verify token error:', error);
    return { user: null, error };
  }
};

/**
 * Get user profile by ID
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - Profile data or error
 */
export const getUserProfile = async (userId) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return { profile, error: null };
  } catch (error) {
    console.error('Get user profile error:', error);
    return { profile: null, error };
  }
};

/**
 * Check if user has specific role
 * @param {string} userId - User ID
 * @param {string[]} roles - Array of allowed roles
 * @returns {Promise<boolean>} - True if user has role
 */
export const hasRole = async (userId, roles) => {
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    return profile ? roles.includes(profile.role) : false;
  } catch (error) {
    console.error('Check role error:', error);
    return false;
  }
};

/**
 * Upload file to Supabase Storage
 * @param {string} bucket - Bucket name
 * @param {string} path - File path
 * @param {File|Buffer} file - File to upload
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} - Upload data or error
 */
export const uploadFile = async (bucket, path, file, options = {}) => {
  try {
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .upload(path, file, {
        upsert: options.upsert || false,
        contentType: options.contentType,
      });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Upload file error:', error);
    return { data: null, error };
  }
};

/**
 * Get public URL for a file
 * @param {string} bucket - Bucket name
 * @param {string} path - File path
 * @returns {string} - Public URL
 */
export const getPublicUrl = (bucket, path) => {
  const { data } = supabase
    .storage
    .from(bucket)
    .getPublicUrl(path);

  return data.publicUrl;
};

/**
 * Delete file from Supabase Storage
 * @param {string} bucket - Bucket name
 * @param {string[]} paths - Array of file paths
 * @returns {Promise<Object>} - Success or error
 */
export const deleteFiles = async (bucket, paths) => {
  try {
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .remove(paths);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Delete files error:', error);
    return { data: null, error };
  }
};

/**
 * Create admin user (service role only)
 * @param {Object} data - User data
 * @returns {Promise<Object>} - User data or error
 */
export const createAdminUser = async (data) => {
  try {
    const { data: { user }, error } = await supabase.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: {
        full_name: data.full_name,
        role: 'admin',
      },
    });

    if (error) throw error;
    return { user, error: null };
  } catch (error) {
    console.error('Create admin user error:', error);
    return { user: null, error };
  }
};

/**
 * Get all users (admin only)
 * @param {Object} filters - Filter options
 * @returns {Promise<Object>} - Users data or error
 */
export const getAllUsers = async (filters = {}) => {
  try {
    let query = supabase
      .from('profiles')
      .select('*');

    if (filters.role) {
      query = query.eq('role', filters.role);
    }

    if (filters.department_id) {
      query = query.eq('department_id', filters.department_id);
    }

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    if (filters.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data: profiles, error } = await query;

    if (error) throw error;
    return { profiles, error: null };
  } catch (error) {
    console.error('Get all users error:', error);
    return { profiles: null, error };
  }
};

/**
 * Execute raw SQL query (admin only)
 * @param {string} sql - SQL query
 * @param {Array} params - Query parameters
 * @returns {Promise<Object>} - Query result or error
 */
export const executeSQL = async (sql, params = []) => {
  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql, params });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Execute SQL error:', error);
    return { data: null, error };
  }
};

export default supabase;
