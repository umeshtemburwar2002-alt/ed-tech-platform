/**
 * College LMS - Manage Faculty Page (Admin)
 * Admin faculty management with role assignment and CSV export
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import Skeleton from '../components/ui/Skeleton';
import { Search, Filter, Download, Edit2, Trash2, Shield, UserPlus } from 'lucide-react';

const ManageFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    roll_number: '',
    department_id: '',
    role: 'instructor',
  });

  useEffect(() => {
    fetchFaculty();
    fetchDepartments();
  }, []);

  const fetchFaculty = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('profiles')
        .select(`
          *,
          departments (name, code)
        `)
        .in('role', ['instructor', 'admin']);

      if (filterDepartment) {
        query = query.eq('department_id', filterDepartment);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setFaculty(data || []);
    } catch (error) {
      console.error('Failed to fetch faculty:', error);
      toast.error('Failed to load faculty');
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

  const handleAddFaculty = async () => {
    try {
      const { error } = await supabase.from('profiles').insert(formData);
      if (error) throw error;

      toast.success('Faculty added successfully');
      setShowAddModal(false);
      setFormData({ full_name: '', email: '', roll_number: '', department_id: '', role: 'instructor' });
      fetchFaculty();
    } catch (error) {
      console.error('Failed to add faculty:', error);
      toast.error('Failed to add faculty');
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      toast.success('Role updated successfully');
      fetchFaculty();
    } catch (error) {
      console.error('Failed to update role:', error);
      toast.error('Failed to update role');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const { error } = await supabase.from('profiles').delete().eq('id', userId);
      if (error) throw error;

      toast.success('User deleted successfully');
      fetchFaculty();
    } catch (error) {
      console.error('Failed to delete user:', error);
      toast.error('Failed to delete user');
    }
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Roll Number', 'Role', 'Department', 'Created At'];
    const rows = faculty.map((f) => [
      f.full_name,
      f.email,
      f.roll_number || '',
      f.role,
      f.departments?.name || '',
      new Date(f.created_at).toLocaleDateString(),
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'faculty.csv';
    a.click();
  };

  const filteredFaculty = faculty.filter((f) =>
    f.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Manage Faculty</h1>
            <p className="text-slate-400">View and manage instructors and admins</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={handleExportCSV} variant="secondary" icon={Download}>
              Export CSV
            </Button>
            <Button onClick={() => setShowAddModal(true)} variant="primary" icon={UserPlus}>
              Add Faculty
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
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
        </div>

        {/* Faculty Table */}
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
                  <th className="p-4">Faculty</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Roll Number</th>
                  <th className="p-4">Joined</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFaculty.map((f) => (
                  <tr key={f.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={f.avatar_url}
                          alt={f.full_name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-white font-medium">{f.full_name}</p>
                          <p className="text-slate-400 text-sm">{f.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={f.role === 'admin' ? 'published' : 'draft'}>
                        {f.role}
                      </Badge>
                    </td>
                    <td className="p-4 text-slate-400">{f.departments?.name || '-'}</td>
                    <td className="p-4 text-slate-400">{f.roll_number || '-'}</td>
                    <td className="p-4 text-slate-400">
                      {new Date(f.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <select
                          value={f.role}
                          onChange={(e) => handleUpdateRole(f.id, e.target.value)}
                          className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white text-sm focus:outline-none"
                        >
                          <option value="instructor">Instructor</option>
                          <option value="admin">Admin</option>
                        </select>
                        <Button
                          onClick={() => handleDeleteUser(f.id)}
                          variant="secondary"
                          size="sm"
                          icon={Trash2}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredFaculty.length === 0 && (
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No faculty found</p>
              </div>
            )}
          </div>
        )}

        {/* Add Faculty Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add Faculty"
          size="md"
        >
          <div className="space-y-4">
            <Input
              label="Full Name"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              placeholder="Enter full name"
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email"
            />
            <Input
              label="Roll Number"
              value={formData.roll_number}
              onChange={(e) => setFormData({ ...formData, roll_number: e.target.value })}
              placeholder="Enter roll number"
            />
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Department</label>
              <select
                value={formData.department_id}
                onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex gap-4 justify-end">
              <Button onClick={() => setShowAddModal(false)} variant="secondary">
                Cancel
              </Button>
              <Button onClick={handleAddFaculty} variant="primary">
                Add Faculty
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ManageFaculty;
