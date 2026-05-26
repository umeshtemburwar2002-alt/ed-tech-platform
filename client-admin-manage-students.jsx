/**
 * College LMS - Manage Students Page (Admin)
 * Admin student management with filters and CSV export
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Skeleton from '../components/ui/Skeleton';
import { Search, Filter, Download, Trash2, Users, GraduationCap } from 'lucide-react';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterSemester, setFilterSemester] = useState('');

  useEffect(() => {
    fetchStudents();
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [filterDepartment, filterSemester]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('profiles')
        .select(`
          *,
          departments (name, code),
          enrollments (count)
        `)
        .eq('role', 'student');

      if (filterDepartment) {
        query = query.eq('department_id', filterDepartment);
      }

      if (filterSemester) {
        query = query.eq('semester', parseInt(filterSemester));
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setStudents(data || []);
    } catch (error) {
      console.error('Failed to fetch students:', error);
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .order('name');

      if (error) throw error;
      setDepartments(data || []);
    } catch (error) {
      console.error('Failed to fetch departments:', error);
    }
  };

  const handleDeleteStudent = async (userId) => {
    if (!confirm('Are you sure you want to delete this student?')) return;

    try {
      const { error } = await supabase.from('profiles').delete().eq('id', userId);
      if (error) throw error;

      toast.success('Student deleted successfully');
      fetchStudents();
    } catch (error) {
      console.error('Failed to delete student:', error);
      toast.error('Failed to delete student');
    }
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Roll Number', 'Department', 'Semester', 'Enrollments', 'Joined'];
    const rows = students.map((s) => [
      s.full_name,
      s.email,
      s.roll_number || '',
      s.departments?.name || '',
      s.semester || '',
      s.enrollments?.[0]?.count || 0,
      new Date(s.created_at).toLocaleDateString(),
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
  };

  const filteredStudents = students.filter((s) =>
    s.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.roll_number?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Manage Students</h1>
            <p className="text-slate-400">View and manage all students</p>
          </div>
          <Button onClick={handleExportCSV} variant="secondary" icon={Download}>
            Export CSV
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700"
          >
            <div className="flex items-center gap-4">
              <Users className="w-10 h-10 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-white">{students.length}</p>
                <p className="text-slate-400 text-sm">Total Students</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700"
          >
            <div className="flex items-center gap-4">
              <GraduationCap className="w-10 h-10 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-white">
                  {students.reduce((sum, s) => sum + (s.enrollments?.[0]?.count || 0), 0)}
                </p>
                <p className="text-slate-400 text-sm">Total Enrollments</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700"
          >
            <div className="flex items-center gap-4">
              <Filter className="w-10 h-10 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-white">{departments.length}</p>
                <p className="text-slate-400 text-sm">Departments</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
          <select
            value={filterSemester}
            onChange={(e) => setFilterSemester(e.target.value)}
            className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Semesters</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>

        {/* Students Table */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} variant="card" />
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/50 backdrop-blur-lg rounded-2xl border border-slate-700 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-400 text-sm border-b border-slate-700">
                  <th className="p-4">Student</th>
                  <th className="p-4">Roll Number</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Semester</th>
                  <th className="p-4">Enrollments</th>
                  <th className="p-4">Joined</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={s.avatar_url}
                          alt={s.full_name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-white font-medium">{s.full_name}</p>
                          <p className="text-slate-400 text-sm">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-400">{s.roll_number || '-'}</td>
                    <td className="p-4 text-slate-400">{s.departments?.name || '-'}</td>
                    <td className="p-4 text-slate-400">{s.semester ? `Semester ${s.semester}` : '-'}</td>
                    <td className="p-4">
                      <Badge variant="published">{s.enrollments?.[0]?.count || 0}</Badge>
                    </td>
                    <td className="p-4 text-slate-400">
                      {new Date(s.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <Button
                        onClick={() => handleDeleteStudent(s.id)}
                        variant="secondary"
                        size="sm"
                        icon={Trash2}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No students found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageStudents;
