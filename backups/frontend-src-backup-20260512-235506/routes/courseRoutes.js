// Course Routes Configuration
// This file contains all course page routes with authentication protection

import React from 'react';
import PrivateRoute from '../components/core/auth/PrivateRoute';
import RoleRoute from '../components/core/auth/RoleRoute';

// Lazy load course pages
const PythonBeginners = React.lazy(() => import('../pages/courses/PythonBeginnersCourse'));
const JavaProgramming = React.lazy(() => import('../pages/courses/JavaProgrammingCourse'));

// Course route configuration
export const courseRoutes = [
  // Programming & Development
  {
    path: 'courses/python-beginners',
    element: (
      <PrivateRoute>
        <RoleRoute allow={['Student', 'Instructor', 'Admin']}>
          <PythonBeginners />
        </RoleRoute>
      </PrivateRoute>
    ),
    category: 'Programming & Development',
    title: 'Python for Beginners'
  },
  {
    path: 'courses/java-programming',
    element: (
      <PrivateRoute>
        <RoleRoute allow={['Student', 'Instructor', 'Admin']}>
          <JavaProgramming />
        </RoleRoute>
      </PrivateRoute>
    ),
    category: 'Programming & Development',
    title: 'Java Programming'
  },
  
  // Additional course routes will be added here
  // Each course requires authentication and appropriate role access
];

// Course categories with their respective courses
export const courseCategories = {
  'Programming & Development': [
    { path: '/courses/python-beginners', title: 'Python for Beginners', level: 'Beginner' },
    { path: '/courses/advanced-python', title: 'Advanced Python (Django/Flask)', level: 'Advanced' },
    { path: '/courses/java-programming', title: 'Java Programming', level: 'Intermediate' },
    { path: '/courses/cpp-fundamentals', title: 'C & C++ Fundamentals', level: 'Beginner' },
    { path: '/courses/csharp-dotnet', title: 'C# with .NET', level: 'Intermediate' },
    { path: '/courses/javascript-es6', title: 'JavaScript & ES6+', level: 'Beginner' },
    { path: '/courses/react-development', title: 'React.js Development', level: 'Intermediate' },
    { path: '/courses/nodejs-express', title: 'Node.js & Express.js', level: 'Intermediate' },
    { path: '/courses/mern-stack', title: 'Full Stack Web Development (MERN)', level: 'Advanced' }
  ],
  
  'Data & AI': [
    { path: '/courses/data-structures', title: 'Data Structures & Algorithms', level: 'Intermediate' },
    { path: '/courses/sql-database', title: 'SQL & Database Management', level: 'Beginner' },
    { path: '/courses/mongodb-beginners', title: 'MongoDB for Beginners', level: 'Beginner' },
    { path: '/courses/data-science-python', title: 'Data Science with Python', level: 'Intermediate' },
    { path: '/courses/machine-learning', title: 'Machine Learning Basics', level: 'Intermediate' },
    { path: '/courses/deep-learning', title: 'Deep Learning & Neural Networks', level: 'Advanced' },
    { path: '/courses/ai-tools', title: 'AI Tools & Prompt Engineering', level: 'Beginner' }
  ],
  
  'Cybersecurity': [
    { path: '/courses/ethical-hacking', title: 'Ethical Hacking Fundamentals', level: 'Intermediate' },
    { path: '/courses/cybersecurity-basics', title: 'Cybersecurity Basics', level: 'Beginner' },
    { path: '/courses/network-security', title: 'Network Security', level: 'Intermediate' },
    { path: '/courses/web-security', title: 'Web Application Security', level: 'Intermediate' },
    { path: '/courses/penetration-testing', title: 'Penetration Testing (Kali Linux)', level: 'Advanced' }
  ],
  
  'Cloud & DevOps': [
    { path: '/courses/aws-cloud', title: 'AWS Cloud Practitioner', level: 'Beginner' },
    { path: '/courses/azure-fundamentals', title: 'Microsoft Azure Fundamentals', level: 'Beginner' },
    { path: '/courses/google-cloud', title: 'Google Cloud Basics', level: 'Beginner' },
    { path: '/courses/docker-kubernetes', title: 'Docker & Kubernetes', level: 'Intermediate' },
    { path: '/courses/cicd-jenkins', title: 'CI/CD with Jenkins', level: 'Intermediate' }
  ],
  
  'Mobile App Development': [
    { path: '/courses/android-development', title: 'Android Development (Java/Kotlin)', level: 'Intermediate' },
    { path: '/courses/ios-development', title: 'iOS Development (Swift)', level: 'Intermediate' },
    { path: '/courses/flutter-beginners', title: 'Flutter for Beginners', level: 'Beginner' },
    { path: '/courses/react-native', title: 'React Native Mobile Apps', level: 'Intermediate' }
  ],
  
  'High Demand Skills': [
    { path: '/courses/ui-ux-figma', title: 'UI/UX Design with Figma', level: 'Beginner' },
    { path: '/courses/git-github', title: 'Git & GitHub Version Control', level: 'Beginner' },
    { path: '/courses/blockchain-basics', title: 'Blockchain Basics', level: 'Intermediate' },
    { path: '/courses/chatbot-development', title: 'Chatbot Development', level: 'Intermediate' },
    { path: '/courses/iot-basics', title: 'Internet of Things (IoT) Basics', level: 'Beginner' }
  ]
};

// Helper function to get all courses
export const getAllCourses = () => {
  const allCourses = [];
  Object.entries(courseCategories).forEach(([category, courses]) => {
    courses.forEach(course => {
      allCourses.push({ ...course, category });
    });
  });
  return allCourses;
};

// Helper function to get courses by category
export const getCoursesByCategory = (category) => {
  return courseCategories[category] || [];
};

// Helper function to check if user has access to course
export const hasAccessToCourse = (user, courseId) => {
  // Basic access control - can be extended based on enrollment, subscription, etc.
  return user && user.accountType && ['Student', 'Instructor', 'Admin'].includes(user.accountType);
};
