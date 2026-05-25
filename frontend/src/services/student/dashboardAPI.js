import { apiConnector } from "../apiconnector";

// Endpoint expectation: GET /api/v1/profile/student-dashboard returns summary metrics
export async function fetchStudentDashboard(token) {
  const { data } = await apiConnector("GET", "/api/v1/profile/student-dashboard", null, {
    Authorization: `Bearer ${token}`,
  });
  // Provide sensible fallbacks if backend fields missing
  return {
    coursesEnrolled: data?.data?.coursesEnrolled ?? 0,
    coursesChange: data?.data?.coursesChange ?? "+0",
    lessonsCompleted: data?.data?.lessonsCompleted ?? 0,
    lessonProgress: data?.data?.lessonProgress ?? "--",
    activeStreak: data?.data?.activeStreak ?? 0,
    streakMessage: data?.data?.streakMessage ?? "Keep going",
    badges: data?.data?.badges ?? 0,
    badgesNew: data?.data?.badgesNew ?? "--",
  };
}
