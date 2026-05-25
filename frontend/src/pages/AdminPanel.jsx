import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaUsers,
  FaBook,
  FaChartLine,
  FaDollarSign,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCalendar,
  FaBell,
  FaCog,
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaFilter
} from 'react-icons/fa';
import { Card, Button, Badge } from '../components/ui';
import NotificationCenter from '../components/common/NotificationCenter';

const AdminPanel = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  // Check if user is admin
  useEffect(() => {
    if (!user || !token) {
      navigate('/login');
      return;
    }
    
    // For now, allow any authenticated user to access admin panel
    // In production, you'd check for admin role
    if (user.accountType !== 'Admin' && user.accountType !== 'Instructor') {
      // For demo purposes, allow instructors to access admin features
      console.warn('Non-admin user accessing admin panel');
    }
    
    setLoading(false);
  }, [user, token, navigate]);

  // Mock admin data
  const adminStats = {
    totalUsers: 15420,
    totalCourses: 156,
    totalRevenue: 2450000,
    activeStudents: 12340,
    activeInstructors: 89,
    monthlyGrowth: 12.5
  };

  const recentUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Student',
      joinDate: '2024-01-15',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Instructor',
      joinDate: '2024-01-14',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'Student',
      joinDate: '2024-01-13',
      status: 'Pending'
    }
  ];

  const recentCourses = [
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Dr. Sarah Wilson',
      students: 234,
      revenue: 45600,
      status: 'Published'
    },
    {
      id: 2,
      title: 'Python Machine Learning',
      instructor: 'Prof. David Chen',
      students: 189,
      revenue: 37800,
      status: 'Published'
    },
    {
      id: 3,
      title: 'Web Design Fundamentals',
      instructor: 'Emma Rodriguez',
      students: 156,
      revenue: 31200,
      status: 'Draft'
    }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-richblack-400">Total Users</p>
              <p className="text-2xl font-bold text-richblack-5">{adminStats.totalUsers.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-600 rounded-lg">
              <FaUsers className="text-white text-xl" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-richblack-400">Total Courses</p>
              <p className="text-2xl font-bold text-richblack-5">{adminStats.totalCourses}</p>
            </div>
            <div className="p-3 bg-green-600 rounded-lg">
              <FaBook className="text-white text-xl" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-richblack-400">Total Revenue</p>
              <p className="text-2xl font-bold text-richblack-5">₹{(adminStats.totalRevenue / 100000).toFixed(1)}L</p>
            </div>
            <div className="p-3 bg-purple-600 rounded-lg">
              <FaDollarSign className="text-white text-xl" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-richblack-400">Monthly Growth</p>
              <p className="text-2xl font-bold text-richblack-5">{adminStats.monthlyGrowth}%</p>
            </div>
            <div className="p-3 bg-orange-600 rounded-lg">
              <FaChartLine className="text-white text-xl" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-richblack-5">Recent Users</h3>
            <Button variant="outline" size="small">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-richblack-700 rounded-lg">
                <div>
                  <p className="font-medium text-richblack-5">{user.name}</p>
                  <p className="text-sm text-richblack-400">{user.email}</p>
                </div>
                <div className="text-right">
                  <Badge variant={user.role === 'Instructor' ? 'warning' : 'success'}>
                    {user.role}
                  </Badge>
                  <p className="text-xs text-richblack-500 mt-1">{user.joinDate}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Courses */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-richblack-5">Recent Courses</h3>
            <Button variant="outline" size="small">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-3 bg-richblack-700 rounded-lg">
                <div>
                  <p className="font-medium text-richblack-5">{course.title}</p>
                  <p className="text-sm text-richblack-400">{course.instructor}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-richblack-5">₹{course.revenue.toLocaleString()}</p>
                  <p className="text-xs text-richblack-500">{course.students} students</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-richblack-5">User Management</h2>
        <Button variant="primary" icon={FaPlus}>
          Add User
        </Button>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-richblack-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 bg-richblack-700 border border-richblack-600 rounded-lg text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-blue-500"
          />
        </div>
        <Button variant="outline" icon={FaFilter}>
          Filter
        </Button>
      </div>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-richblack-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblack-300 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblack-300 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblack-300 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblack-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblack-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-richblack-800 divide-y divide-richblack-700">
              {recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-richblack-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-richblack-5">{user.name}</div>
                      <div className="text-sm text-richblack-400">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={user.role === 'Instructor' ? 'warning' : 'success'}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-richblack-300">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={user.status === 'Active' ? 'success' : 'warning'}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <FaEye />
                      </button>
                      <button className="text-yellow-400 hover:text-yellow-300">
                        <FaEdit />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderCourseManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-richblack-5">Course Management</h2>
        <Button variant="primary" icon={FaPlus}>
          Add Course
        </Button>
      </div>
      
      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-richblack-400">Published Courses</p>
              <p className="text-2xl font-bold text-richblack-5">142</p>
            </div>
            <div className="p-3 bg-green-600 rounded-lg">
              <FaBook className="text-white text-xl" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-richblack-400">Draft Courses</p>
              <p className="text-2xl font-bold text-richblack-5">14</p>
            </div>
            <div className="p-3 bg-yellow-600 rounded-lg">
              <FaEdit className="text-white text-xl" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-richblack-400">Total Enrollments</p>
              <p className="text-2xl font-bold text-richblack-5">8,456</p>
            </div>
            <div className="p-3 bg-blue-600 rounded-lg">
              <FaUserGraduate className="text-white text-xl" />
            </div>
          </div>
        </Card>
      </div>

      {/* Courses Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-richblack-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblack-300 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblack-300 uppercase tracking-wider">Instructor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblack-300 uppercase tracking-wider">Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblack-300 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblack-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-richblack-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-richblack-800 divide-y divide-richblack-700">
              {recentCourses.map((course) => (
                <tr key={course.id} className="hover:bg-richblack-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-richblack-5">{course.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-richblack-300">
                    {course.instructor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-richblack-300">
                    {course.students}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-richblack-300">
                    ₹{course.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={course.status === 'Published' ? 'success' : 'warning'}>
                      {course.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300">
                        <FaEye />
                      </button>
                      <button className="text-yellow-400 hover:text-yellow-300">
                        <FaEdit />
                      </button>
                      <button className="text-red-400 hover:text-red-300">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-richblack-900 flex items-center justify-center">
        <div className="text-richblack-5">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-richblack-900">
      {/* Header */}
      <div className="bg-richblack-800 border-b border-richblack-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-richblack-5">Admin Panel</h1>
              <Badge variant="error">Admin</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationCenter />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.firstName?.[0] || user?.name?.[0] || 'A'}
                  </span>
                </div>
                <span className="text-richblack-5 text-sm">{user?.firstName || user?.name || 'Admin'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <Card className="p-4">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-blue-600 text-white'
                      : 'text-richblack-300 hover:bg-richblack-700 hover:text-richblack-5'
                  }`}
                >
                  <FaChartLine />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'users'
                      ? 'bg-blue-600 text-white'
                      : 'text-richblack-300 hover:bg-richblack-700 hover:text-richblack-5'
                  }`}
                >
                  <FaUsers />
                  <span>Users</span>
                </button>
                <button
                  onClick={() => setActiveTab('courses')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'courses'
                      ? 'bg-blue-600 text-white'
                      : 'text-richblack-300 hover:bg-richblack-700 hover:text-richblack-5'
                  }`}
                >
                  <FaBook />
                  <span>Courses</span>
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'analytics'
                      ? 'bg-blue-600 text-white'
                      : 'text-richblack-300 hover:bg-richblack-700 hover:text-richblack-5'
                  }`}
                >
                  <FaChartLine />
                  <span>Analytics</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-blue-600 text-white'
                      : 'text-richblack-300 hover:bg-richblack-700 hover:text-richblack-5'
                  }`}
                >
                  <FaCog />
                  <span>Settings</span>
                </button>
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'users' && renderUserManagement()}
              {activeTab === 'courses' && renderCourseManagement()}
              {activeTab === 'analytics' && (
                <div className="text-center py-12">
                  <FaChartLine className="text-6xl text-richblack-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-richblack-5 mb-2">Analytics Dashboard</h3>
                  <p className="text-richblack-400">Advanced analytics coming soon...</p>
                </div>
              )}
              {activeTab === 'settings' && (
                <div className="text-center py-12">
                  <FaCog className="text-6xl text-richblack-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-richblack-5 mb-2">System Settings</h3>
                  <p className="text-richblack-400">Settings panel coming soon...</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;