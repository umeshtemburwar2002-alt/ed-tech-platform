/**
 * College LMS - Supabase Client Configuration
 * This file sets up the Supabase client with auth helpers
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
  db: {
    schema: 'public',
  },
});

/**
 * Auth Helper Functions
 */

/**
 * Sign up a new user
 * @param {Object} data - User data
 * @param {string} data.email - User email
 * @param {string} data.password - User password
 * @param {Object} data.metadata - Additional user metadata (full_name, role, etc.)
 * @returns {Promise<Object>} - User data or error
 */
export const signUp = async ({ email, password, metadata = {} }) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: metadata.full_name || '',
          role: metadata.role || 'student',
          roll_number: metadata.roll_number || '',
          department_id: metadata.department_id || null,
          semester: metadata.semester || 1,
        },
      },
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    return { data: null, error };
  }
};

/**
 * Sign in a user
 * @param {Object} data - Login data
 * @param {string} data.email - User email
 * @param {string} data.password - User password
 * @returns {Promise<Object>} - Session data or error
 */
export const signIn = async ({ email, password }) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return { data: null, error };
  }
};

/**
 * Sign out the current user
 * @returns {Promise<Object>} - Success or error
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Sign out error:', error);
    return { error };
  }
};

/**
 * Get the current session
 * @returns {Promise<Object>} - Session data or error
 */
export const getSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { session, error: null };
  } catch (error) {
    console.error('Get session error:', error);
    return { session: null, error };
  }
};

/**
 * Get the current user
 * @returns {Promise<Object>} - User data or error
 */
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { user, error: null };
  } catch (error) {
    console.error('Get user error:', error);
    return { user: null, error };
  }
};

/**
 * Update user profile
 * @param {Object} data - Profile data to update
 * @returns {Promise<Object>} - Updated profile or error
 */
export const updateProfile = async (data) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No user logged in');

    const { data: profile, error } = await supabase
      .from('profiles')
      .update(data)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    return { profile, error: null };
  } catch (error) {
    console.error('Update profile error:', error);
    return { profile: null, error };
  }
};

/**
 * Reset password
 * @param {string} email - User email
 * @returns {Promise<Object>} - Success or error
 */
export const resetPassword = async (email) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Reset password error:', error);
    return { error };
  }
};

/**
 * Update password
 * @param {string} newPassword - New password
 * @returns {Promise<Object>} - Success or error
 */
export const updatePassword = async (newPassword) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Update password error:', error);
    return { error };
  }
};

/**
 * Subscribe to auth state changes
 * @param {Function} callback - Callback function
 * @returns {Object} - Subscription object
 */
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange(callback);
};

/**
 * Realtime subscription helper
 * @param {string} table - Table name
 * @param {Object} filter - Filter object
 * @param {Function} callback - Callback function
 * @returns {Object} - Subscription object
 */
export const subscribeToTable = (table, filter = {}, callback) => {
  const channel = supabase
    .channel(`table-${table}-changes`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table,
        filter: filter.column ? `${filter.column}=eq.${filter.value}` : undefined,
      },
      callback
    )
    .subscribe();

  return channel;
};

export default supabase;
