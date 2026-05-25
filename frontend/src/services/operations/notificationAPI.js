// ============================================================
// MOCK-ONLY: No Supabase connected. Returns static dummy data.
// ============================================================

const MOCK_NOTIFICATIONS = [
  { id: 1, title: "New Enrollment", message: "Aarav Sharma enrolled in Modern JavaScript Masterclass", type: "enrollment", is_read: false, created_at: new Date(Date.now() - 5 * 60000).toISOString() },
  { id: 2, title: "New Review", message: "Priya Singh left a 5-star review on React Bootcamp", type: "review", is_read: false, created_at: new Date(Date.now() - 60 * 60000).toISOString() },
  { id: 3, title: "Course Completed", message: "Emma Wilson completed UI/UX Design Essentials", type: "completion", is_read: true, created_at: new Date(Date.now() - 3 * 60 * 60000).toISOString() },
  { id: 4, title: "Assignment Submitted", message: "Lucas Martin submitted the React project assignment", type: "assignment", is_read: true, created_at: new Date(Date.now() - 24 * 60 * 60000).toISOString() },
];

export const getUserNotifications = async (token, page = 1, limit = 20, type = "all") => {
  const filtered = type === "all" ? MOCK_NOTIFICATIONS : MOCK_NOTIFICATIONS.filter((n) => n.type === type);
  return {
    success: true,
    data: filtered,
    pagination: { total: filtered.length, page, limit },
  };
};

export const getUnreadNotificationCount = async (token) => {
  return MOCK_NOTIFICATIONS.filter((n) => !n.is_read).length;
};

export const markNotificationAsRead = async (token, notificationId) => {
  return { success: true };
};

export const markAllNotificationsAsRead = async (token) => {
  return { success: true };
};

export const deleteNotification = async (token, notificationId) => {
  return { success: true };
};

export const clearAllNotifications = async (token) => {
  return { success: true };
};

export const sendNotificationToUsers = async (token, data) => {
  return { success: true };
};

export const broadcastNotification = async (token, data) => {
  return { success: true };
};

export const startNotificationPolling = (token, callback, interval = 30000) => {
  // Immediately call once with mock data — no actual polling
  if (callback) {
    callback({
      unreadCount: MOCK_NOTIFICATIONS.filter((n) => !n.is_read).length,
      latestNotifications: MOCK_NOTIFICATIONS.slice(0, 5),
    });
  }
  // Return a no-op cleanup
  return () => {};
};