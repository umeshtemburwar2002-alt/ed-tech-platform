import { 
  BookOpen, Brain, Award, Clock, MessageCircle, Trophy, Bell, AlertCircle 
} from 'lucide-react';

export const COURSES_DATA = [
  { id: 1, title: "React Masterclass: Advanced Patterns", instructor: "Mr. Verma", progress: 68, category: "Development", thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400", rating: 4.8, completed: false, lastAccessed: "2h ago" },
  { id: 2, title: "UI/UX Foundations & Case Studies", instructor: "Ms. Priya", progress: 45, category: "Design", thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=400", rating: 4.6, completed: false, lastAccessed: "1d ago" },
  { id: 3, title: "Node.js Backend Architecture", instructor: "Mr. Raj", progress: 22, category: "Development", thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400", rating: 4.7, completed: false, lastAccessed: "3d ago" },
  { id: 4, title: "DSA with JavaScript", instructor: "Mr. Kumar", progress: 100, category: "CS", thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400", rating: 4.9, completed: true, lastAccessed: "Jan 15" },
  { id: 5, title: "Tailwind CSS Mastery", instructor: "Ms. Anita", progress: 100, category: "Design", thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400", rating: 4.5, completed: true, lastAccessed: "Mar 3" },
  { id: 6, title: "MongoDB Complete Guide", instructor: "Mr. Singh", progress: 10, category: "Database", thumbnail: "https://images.unsplash.com/photo-1551288049-bbbda536639a?w=400", rating: 4.4, completed: false, lastAccessed: "5d ago" },
];

export const QUIZ_SCHEDULED = [
  { id: 1, title: "React Hooks Deep Dive", subject: "React", difficulty: "Medium", questionCount: 10, duration: 10, dueDate: "Tomorrow" },
  { id: 2, title: "CSS Grid & Flexbox", subject: "CSS", difficulty: "Easy", questionCount: 8, duration: 8, dueDate: "Fri" },
  { id: 3, title: "JS Closures & Scope", subject: "JavaScript", difficulty: "Hard", questionCount: 12, duration: 15, dueDate: "Sat" },
  { id: 4, title: "Node.js REST APIs", subject: "Node.js", difficulty: "Medium", questionCount: 10, duration: 12, dueDate: "Next Mon" },
];

export const QUIZ_COMPLETED = [
  { id: 1, title: "React Basics", subject: "React", score: 90, correct: 9, total: 10, timeTaken: "6:45", date: "Apr 20" },
  { id: 2, title: "CSS Selectors", subject: "CSS", score: 100, correct: 8, total: 8, timeTaken: "4:20", date: "Apr 18" },
  { id: 3, title: "ES6 Features", subject: "JavaScript", score: 75, correct: 9, total: 12, timeTaken: "10:15", date: "Apr 15" },
  { id: 4, title: "UI Typography", subject: "Design", score: 85, correct: 17, total: 20, timeTaken: "14:30", date: "Apr 10" },
  { id: 5, title: "Git Fundamentals", subject: "System", score: 95, correct: 19, total: 20, timeTaken: "12:10", date: "Apr 5" },
];

export const QUIZ_QUESTIONS = [
  { id: 1, q: "Which hook is used for side effects in React?", options: ["useState", "useEffect", "useMemo", "useCallback"], correct: 1 },
  { id: 2, q: "What does JSX stand for?", options: ["JavaScript XML", "JavaScript XSL", "Java Syntax Extension", "JSON XML"], correct: 0 },
  { id: 3, q: "How to pass data from parent to child?", options: ["State", "Hooks", "Props", "Context"], correct: 2 },
  { id: 4, q: "Virtual DOM is a representation of...", options: ["Browser DOM", "Real DOM in JS", "Testing DOM", "Shadow DOM"], correct: 1 },
  { id: 5, q: "Which hook manages complex state logic?", options: ["useState", "useContext", "useReducer", "useRef"], correct: 2 },
  { id: 6, q: "Default port for Create React App?", options: ["5000", "8080", "3000", "3306"], correct: 2 },
  { id: 7, q: "How to memoize a function?", options: ["useMemo", "useEffect", "useCallback", "useRef"], correct: 2 },
  { id: 8, q: "Trigger for component re-render?", options: ["Props change", "State change", "Parent re-render", "All of above"], correct: 3 },
  { id: 9, q: "Hook to access DOM directly?", options: ["useRef", "useState", "useId", "useLayoutEffect"], correct: 0 },
  { id: 10, q: "Avoid prop drilling using...", options: ["Props", "State", "Context API", "Redux"], correct: 2 },
];

export const MESSAGES_DATA = [
  { id: 1, teacher: "Mr. Verma", subject: "React Hooks", avatar: "MV", online: true, unread: 2, messages: [
    { type: 'received', text: "Hi Riya, how is the hooks assignment going?", time: "10:42 AM" },
    { type: 'sent', text: "Almost done! Handling cleanup in useEffect now.", time: "10:44 AM" },
    { type: 'received', text: "Great. Remember to use useCallback for stable functions.", time: "10:45 AM" }
  ]},
  { id: 2, teacher: "Ms. Priya", subject: "UI Design", avatar: "MP", online: true, unread: 1, messages: [] },
  { id: 3, teacher: "Mr. Raj", subject: "Node.js APIs", avatar: "MR", online: false, unread: 0, messages: [] },
  { id: 4, teacher: "Ms. Anita", subject: "Tailwind CSS", avatar: "MA", online: false, unread: 0, messages: [] },
  { id: 5, teacher: "Mr. Kumar", subject: "DSA Patterns", avatar: "MK", online: true, unread: 0, messages: [] },
];

export const NOTIFICATIONS_DATA = [
  { id: 1, type: "Courses", icon: BookOpen, title: "New lecture added", desc: "Advanced Redux Toolkit in React Course", time: "2h ago", read: false },
  { id: 2, type: "Quizzes", icon: Brain, title: "Quiz 88% scored", desc: "Well done on your JS Closures quiz!", time: "4h ago", read: false },
  { id: 3, type: "Courses", icon: Award, title: "Certificate ready", desc: "Download your Tailwind Mastery certificate", time: "1d ago", read: false },
  { id: 4, type: "System", icon: Clock, title: "Live class 30min", desc: "React session starts in 30 minutes", time: "2d ago", read: false },
  { id: 5, type: "System", icon: MessageCircle, title: "Teacher replied", desc: "Mr. Verma answered your question", time: "3d ago", read: false },
  { id: 6, type: "Courses", icon: Trophy, title: "50% milestone", desc: "You've reached half of Node.js course", time: "4d ago", read: true },
  { id: 7, type: "System", icon: Bell, title: "Platform update", desc: "New dashboard features released", time: "1w ago", read: true },
  { id: 8, type: "System", icon: AlertCircle, title: "Assignment due", desc: "Submit your UI design project by tomorrow", time: "1w ago", read: true },
];

export const CERTIFICATES_DATA = {
  earned: [
    { id: 1, course: "DSA with JavaScript", date: "Jan 15, 2025", certId: "EDU-2025-001X", color: "from-blue-600 to-indigo-700", skills: ["Logic", "Complexity", "Algorithms"] },
    { id: 2, course: "Tailwind CSS Mastery", date: "Mar 3, 2025", certId: "EDU-2025-042Y", color: "from-teal-500 to-emerald-600", skills: ["Utility-First", "Responsive", "UI/UX"] },
  ],
  inProgress: [
    { id: 1, course: "React Masterclass", progress: 68 },
    { id: 2, course: "UI/UX Foundations", progress: 45 },
    { id: 3, course: "Node.js Backend", progress: 22 },
  ]
};

export const LEARNING_MODULES = [
  { id: 1, num: 1, title: "HTML/CSS Mastery", desc: "Semantic markup and CSS architecture", status: "DONE", lessons: 12, duration: "8h" },
  { id: 2, num: 2, title: "JavaScript Basics", desc: "Fundamentals, types, and control flow", status: "DONE", lessons: 15, duration: "10h" },
  { id: 3, num: 3, title: "DOM Manipulation", desc: "Selecting, creating and modifying elements", status: "DONE", lessons: 8, duration: "5h" },
  { id: 4, num: 4, title: "React Fundamentals", desc: "Components, props, and basic state", status: "DONE", lessons: 14, duration: "12h" },
  { id: 5, num: 5, title: "React Hooks Deep Dive", desc: "Side effects and custom hooks", status: "DONE", lessons: 10, duration: "9h" },
  { id: 6, num: 6, title: "Node.js Architecture", desc: "Event loop, streams and buffer", status: "CURRENT", lessons: 18, duration: "15h" },
  { id: 7, num: 7, title: "MongoDB Guide", desc: "NoSQL patterns and aggregations", status: "LOCKED", lessons: 10, duration: "8h" },
  { id: 8, num: 8, title: "Capstone Project", desc: "Build a production EdTech platform", status: "LOCKED", lessons: 1, duration: "40h" },
];

export const FEEDBACK_PENDING = [
  { id: 1, title: "React Masterclass", instructor: "Mr. Verma", thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400" },
  { id: 2, title: "UI/UX Foundations", instructor: "Ms. Priya", thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=400" },
  { id: 3, title: "Node.js Backend", instructor: "Mr. Raj", thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400" },
];

export const FEEDBACK_HISTORY = [
  { course: "DSA with JavaScript", date: "Apr 12, 2025", rating: 5, review: "Deeply technical and well-structured. Highly recommended!", helpful: 12 },
  { course: "Tailwind CSS Mastery", date: "Apr 5, 2025", rating: 4, review: "Great practical examples, loved the grid section.", helpful: 8 },
  { course: "Git Fundamentals", date: "Mar 20, 2025", rating: 5, review: "Finally understood rebase vs merge. Excellent tutor.", helpful: 15 },
  { course: "Responsive Design", date: "Mar 10, 2025", rating: 4, review: "Good overview of mobile-first approach.", helpful: 5 },
  { course: "ES6 Deep Dive", date: "Feb 28, 2025", rating: 5, review: "Perfect pace for intermediate developers.", helpful: 9 },
];

export const FAQ_DATA = [
  { q: "How do I reset my account password?", a: "Go to Settings > Security and click 'Change Password'. You will receive a verification email to complete the process." },
  { q: "Where can I download my certificates?", a: "Once you complete a course with 100% progress, certificates appear in the 'Certificates' tab for instant PDF download." },
  { q: "Does the platform support offline learning?", a: "Yes, you can download lectures on our mobile app for offline access. Desktop offline mode is currently in development." },
  { q: "How do I join a live class?", a: "Upcoming live classes show up on your Dashboard. Click 'Set Reminder' to get notified, and 'Join Now' when the session starts." },
  { q: "What are the payment options available?", a: "We accept all major credit cards, PayPal, and regional UPI/Bank transfers for Pro subscriptions." },
  { q: "How can I message my course instructor?", a: "Use the 'Messages' tab to start a conversation with any teacher from your enrolled courses." },
  { q: "What is the refund policy for courses?", a: "We offer a 30-day no-questions-asked refund policy for all Pro memberships and individual course purchases." },
  { q: "How is my course progress tracked?", a: "Progress is automatically updated as you complete lessons and pass module quizzes. You can see detailed tracking in the 'Learning Path'." },
];
