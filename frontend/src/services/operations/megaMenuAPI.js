// ============================================================
// MOCK-ONLY: No Supabase connected. Returns static dummy data.
// ============================================================

const MOCK_CATEGORIES = [
  { id: "cat1", name: "Web Development", courseCount: 24, description: "Full stack, frontend, backend", icon: "💻" },
  { id: "cat2", name: "Data Science", courseCount: 18, description: "ML, AI, Analytics", icon: "📊" },
  { id: "cat3", name: "Mobile Development", courseCount: 12, description: "iOS, Android, React Native", icon: "📱" },
  { id: "cat4", name: "UI/UX Design", courseCount: 9, description: "Figma, Adobe XD, Prototyping", icon: "🎨" },
  { id: "cat5", name: "Cloud & DevOps", courseCount: 15, description: "AWS, Docker, Kubernetes", icon: "☁️" },
  { id: "cat6", name: "Cybersecurity", courseCount: 8, description: "Ethical Hacking, Networking", icon: "🔒" },
];

const MOCK_TRENDING = [
  { _id: "c1", courseName: "Modern JavaScript Masterclass", courseDescription: "Complete JS from scratch", category: "Web Development", studentsCount: 4200, price: 999, thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300" },
  { _id: "c2", courseName: "React 19 Bootcamp", courseDescription: "Build modern UIs with React", category: "Web Development", studentsCount: 3800, price: 1299, thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300" },
  { _id: "c3", courseName: "Python for Data Science", courseDescription: "Data analysis with Python", category: "Data Science", studentsCount: 5100, price: 799, thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300" },
  { _id: "c4", courseName: "AWS Solutions Architect", courseDescription: "Cloud infrastructure mastery", category: "Cloud & DevOps", studentsCount: 2900, price: 1499, thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300" },
  { _id: "c5", courseName: "UI/UX Design with Figma", courseDescription: "Design modern interfaces", category: "UI/UX Design", studentsCount: 3200, price: 899, thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300" },
];

export const getCategories = async () => MOCK_CATEGORIES;

export const getTrendingCourses = async () => MOCK_TRENDING;

export const getRecentCourses = async (userId, token) => MOCK_TRENDING.slice(0, 3);

export const getFavoriteCourses = async (userId, token) => [];

export const getMyCourses = async (userId, token) => MOCK_TRENDING.slice(0, 2);

export const searchCourses = async (searchTerm) => {
  if (!searchTerm) return MOCK_TRENDING;
  return MOCK_TRENDING.filter(
    (c) =>
      c.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.courseDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const getCourseStats = async () => ({
  totalCourses: 86,
  totalCategories: MOCK_CATEGORIES.length,
  message: `86 courses across ${MOCK_CATEGORIES.length} categories`,
});