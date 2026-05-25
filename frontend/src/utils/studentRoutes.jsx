// Student Dashboard Routes Configuration
// This file contains routing setup for Quiz and Feedback pages

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentQuiz from '../pages/StudentQuiz';
import StudentFeedback from '../pages/StudentFeedback';

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/quiz" element={<StudentQuiz />} />
      <Route path="/feedback" element={<StudentFeedback />} />
    </Routes>
  );
};

export default StudentRoutes;
