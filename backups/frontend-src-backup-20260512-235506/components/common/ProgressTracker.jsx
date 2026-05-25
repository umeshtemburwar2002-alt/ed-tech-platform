import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  FaChartLine,
  FaTrophy,
  FaClock,
  FaFire,
  FaTarget,
  FaBook,
  FaPlay,
  FaCheckCircle,
  FaStar,
  FaCalendarAlt,
  FaBrain,
  FaRocket
} from 'react-icons/fa';
import { Card } from '../ui';

const ProgressTracker = () => {
  const { user } = useSelector((state) => state.profile);
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Mock progress data
      const mockData = {
        overallProgress: 68,
        totalCourses: 5,
        completedCourses: 2,
        inProgressCourses: 3,
        totalHours: 156,
        studyStreak: 12,
        weeklyGoal: 20,
        weeklyProgress: 14,
        skillPoints: 2450,
        level: 8,
        nextLevelPoints: 550,
        badges: [
          { id: 1, name: 'First Course', icon: '🎓', earned: true, date: '2024-01-15' },
          { id: 2, name: 'Week Warrior', icon: '⚡', earned: true, date: '2024-01-20' },
          { id: 3, name: 'Code Master', icon: '💻', earned: true, date: '2024-01-25' },
          { id: 4, name: 'Quiz Champion', icon: '🏆', earned: false, progress: 75 },
          { id: 5, name: 'Project Pro', icon: '🚀', earned: false, progress: 40 }
        ],
        recentActivity: [
          { id: 1, type: 'completed', course: 'React Basics', lesson: 'State Management', time: '2 hours ago' },
          { id: 2, type: 'started', course: 'Node.js', lesson: 'Express Setup', time: '1 day ago' },
          { id: 3, type: 'quiz', course: 'JavaScript', lesson: 'ES6 Features Quiz', score: 85, time: '2 days ago' },
          { id: 4, type: 'project', course: 'React Basics', lesson: 'Todo App Project', time: '3 days ago' }
        ],
        weeklyStats: [
          { day: 'Mon', hours: 2.5, completed: 3 },
          { day: 'Tue', hours: 1.8, completed: 2 },
          { day: 'Wed', hours: 3.2, completed: 4 },
          { day: 'Thu', hours: 2.1, completed: 2 },
          { day: 'Fri', hours: 2.8, completed: 3 },
          { day: 'Sat', hours: 1.6, completed: 1 },
          { day: 'Sun', hours: 0, completed: 0 }
        ],
        courseProgress: [
          { id: 1, name: 'React Development', progress: 85, totalLessons: 45, completedLessons: 38, timeSpent: 42 },
          { id: 2, name: 'JavaScript ES6+', progress: 100, totalLessons: 30, completedLessons: 30, timeSpent: 35 },
          { id: 3, name: 'Node.js Backend', progress: 45, totalLessons: 40, completedLessons: 18, timeSpent: 28 },
          { id: 4, name: 'Python Basics', progress: 30, totalLessons: 35, completedLessons: 10, timeSpent: 15 },
          { id: 5, name: 'Database Design', progress: 15, totalLessons: 25, completedLessons: 4, timeSpent: 8 }
        ]
      };
      
      setProgressData(mockData);
      setLoading(false);
    }
  }, [user]);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'completed': return <FaCheckCircle className="text-green-500" />;
      case 'started': return <FaPlay className="text-blue-500" />;
      case 'quiz': return <FaBrain className="text-purple-500" />;
      case 'project': return <FaRocket className="text-orange-500" />;
      default: return <FaBook className="text-gray-500" />;
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (!user || loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-richblack-700 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-richblack-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-richblack-5 mb-2">
            Learning Progress
          </h1>
          <p className="text-richblack-300">
            Track your learning journey and achievements
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <p className="text-sm text-richblack-400">Level</p>
            <p className="text-2xl font-bold text-yellow-400">{progressData.level}</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <FaTrophy className="text-white text-xl" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Overall Progress */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-richblack-400">Overall Progress</p>
              <p className="text-2xl font-bold text-richblack-5">{progressData.overallProgress}%</p>
            </div>
            <div className="p-3 bg-blue-600 rounded-lg">
              <FaChartLine className="text-white text-xl" />
            </div>
          </div>
          <div className="w-full bg-richblack-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressData.overallProgress}%` }}
            ></div>
          </div>
        </Card>

        {/* Study Streak */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-richblack-400">Study Streak</p>
              <p className="text-2xl font-bold text-richblack-5">{progressData.studyStreak} days</p>
            </div>
            <div className="p-3 bg-orange-600 rounded-lg">
              <FaFire className="text-white text-xl" />
            </div>
          </div>
          <p className="text-xs text-richblack-500">Keep it up! 🔥</p>
        </Card>

        {/* Weekly Goal */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-richblack-400">Weekly Goal</p>
              <p className="text-2xl font-bold text-richblack-5">{progressData.weeklyProgress}/{progressData.weeklyGoal}h</p>
            </div>
            <div className="p-3 bg-green-600 rounded-lg">
              <FaTarget className="text-white text-xl" />
            </div>
          </div>
          <div className="w-full bg-richblack-700 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(progressData.weeklyProgress / progressData.weeklyGoal) * 100}%` }}
            ></div>
          </div>
        </Card>

        {/* Skill Points */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-richblack-400">Skill Points</p>
              <p className="text-2xl font-bold text-richblack-5">{progressData.skillPoints.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-600 rounded-lg">
              <FaStar className="text-white text-xl" />
            </div>
          </div>
          <p className="text-xs text-richblack-500">{progressData.nextLevelPoints} to next level</p>
        </Card>
      </div>

      {/* Course Progress */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-richblack-5 mb-4">Course Progress</h2>
        <div className="space-y-4">
          {progressData.courseProgress.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 bg-richblack-700 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-richblack-5">{course.name}</h3>
                  <span className="text-sm font-medium text-richblack-300">{course.progress}%</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-richblack-400 mb-2">
                  <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                  <span>{course.timeSpent}h spent</span>
                </div>
                <div className="w-full bg-richblack-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(course.progress)}`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Weekly Activity & Badges */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-richblack-5 mb-4">Weekly Activity</h2>
          <div className="flex items-end justify-between h-32 space-x-2">
            {progressData.weeklyStats.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="flex-1 flex items-end">
                  <div 
                    className="w-full bg-blue-500 rounded-t transition-all duration-500 hover:bg-blue-400"
                    style={{ height: `${(day.hours / 4) * 100}%` }}
                    title={`${day.hours}h, ${day.completed} lessons`}
                  ></div>
                </div>
                <p className="text-xs text-richblack-400 mt-2">{day.day}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-xs text-richblack-500">
            <span>0h</span>
            <span>2h</span>
            <span>4h</span>
          </div>
        </Card>

        {/* Badges */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-richblack-5 mb-4">Achievements</h2>
          <div className="grid grid-cols-3 gap-4">
            {progressData.badges.map((badge) => (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-lg text-center transition-all duration-300 ${
                  badge.earned 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' 
                    : 'bg-richblack-700 text-richblack-400'
                }`}
              >
                <div className="text-2xl mb-2">{badge.icon}</div>
                <p className="text-xs font-medium">{badge.name}</p>
                {badge.earned ? (
                  <p className="text-xs opacity-75 mt-1">{badge.date}</p>
                ) : (
                  <div className="mt-2">
                    <div className="w-full bg-richblack-600 rounded-full h-1">
                      <div 
                        className="bg-yellow-500 h-1 rounded-full transition-all duration-500"
                        style={{ width: `${badge.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs mt-1">{badge.progress}%</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-richblack-5 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {progressData.recentActivity.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4 p-3 bg-richblack-700 rounded-lg"
            >
              <div className="flex-shrink-0">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-richblack-5">
                  {activity.type === 'completed' && `Completed ${activity.lesson}`}
                  {activity.type === 'started' && `Started ${activity.lesson}`}
                  {activity.type === 'quiz' && `Scored ${activity.score}% in ${activity.lesson}`}
                  {activity.type === 'project' && `Submitted ${activity.lesson}`}
                </p>
                <p className="text-xs text-richblack-400">{activity.course} • {activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProgressTracker;