/**
 * Supabase Realtime Service (formerly studentRealtime)
 * This service handles real-time updates for the EdTech platform using Supabase.
 */

import { supabase } from '../../config/supabaseClient';

// Helper to handle channel subscriptions
const channels = new Map();

/**
 * Listen for updates to the doubts/threads in the platform
 * @param {Function} callback - Function called with updated data
 */
export const listenDoubts = (callback) => {
  // Initial fetch
  const fetchDoubts = async () => {
    const { data, error } = await supabase
      .from('doubts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) {
      // Map Supabase fields to the component's expected structure
      const formattedData = (data || []).map(d => ({
        id: d.id,
        title: d.title,
        replies: d.replies_count || 0,
        userId: d.user_id,
        created_at: d.created_at
      }));
      callback(formattedData);
    }
  };

  fetchDoubts();

  // Realtime subscription
  const channel = supabase
    .channel('doubts_realtime')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'doubts' },
      (payload) => {
        console.log('Realtime change received:', payload);
        fetchDoubts(); // Refresh list on any change
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

/**
 * Post a new doubt to the forum
 * @param {Object} doubtData - The doubt to post
 */
export const postDoubt = async ({ title, userId }) => {
  try {
    const { data, error } = await supabase
      .from('doubts')
      .insert([{ title, user_id: userId, replies_count: 0 }])
      .select();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error posting doubt:', error.message);
    return null;
  }
};

/**
 * Listen for user-specific notifications
 * @param {string} userEmail - The email of the user to listen for
 * @param {Function} callback - Function called with updated notifications
 */
export const listenNotifications = (userEmail, callback) => {
  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_email', userEmail)
      .order('created_at', { ascending: false });
    
    if (!error) {
      // Map Supabase fields to component expectations
      const formattedData = (data || []).map(n => ({
        id: n.id,
        type: n.type || 'INFO',
        text: n.message,
        read: n.is_read || false,
        created_at: n.created_at
      }));
      callback(formattedData);
    }
  };

  fetchNotifications();

  const channel = supabase
    .channel(`notifications_${userEmail}`)
    .on(
      'postgres_changes',
      { 
        event: '*', 
        schema: 'public', 
        table: 'notifications',
        filter: `user_email=eq.${userEmail}`
      },
      () => fetchNotifications()
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
