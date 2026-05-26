/**
 * College LMS - Department Manager Page (Admin)
 * Admin department and category management
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import Skeleton from '../components/ui/Skeleton';
import { Building2, Plus, Edit2, Trash2, FolderTree } from 'lucide-react';

const DepartmentManager = () => {
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [departmentForm, setDepartmentForm] = useState({ name: '', code: '' });
  const [categoryForm, setCategoryForm] = useState({ name: '', department_id: '' });

  useEffect(() => {
    fetchDepartments();
    fetchCategories();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .order('name');

      if (error) throw error;
      setDepartments(data || []);
    } catch (error) {
      console.error('Failed to fetch departments:', error);
      toast.error('Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select(`
          *,
          departments (name)
        `)
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error('Failed to load categories');
    }
  };

  const handleAddDepartment = async () => {
    try {
      const { error } = await supabase.from('departments').insert(departmentForm);
      if (error) throw error;

      toast.success('Department added successfully');
      setShowDepartmentModal(false);
      setDepartmentForm({ name: '', code: '' });
      fetchDepartments();
    } catch (error) {
      console.error('Failed to add department:', error);
      toast.error('Failed to add department');
    }
  };

  const handleUpdateDepartment = async () => {
    try {
      const { error } = await supabase
        .from('departments')
        .update(departmentForm)
        .eq('id', selectedDepartment.id);

      if (error) throw error;

      toast.success('Department updated successfully');
      setShowDepartmentModal(false);
      setSelectedDepartment(null);
      setDepartmentForm({ name: '', code: '' });
      fetchDepartments();
    } catch (error) {
      console.error('Failed to update department:', error);
      toast.error('Failed to update department');
    }
  };

  const handleDeleteDepartment = async (deptId) => {
    if (!confirm('Are you sure you want to delete this department?')) return;

    try {
      const { error } = await supabase.from('departments').delete().eq('id', deptId);
      if (error) throw error;

      toast.success('Department deleted successfully');
      fetchDepartments();
    } catch (error) {
      console.error('Failed to delete department:', error);
      toast.error('Failed to delete department');
    }
  };

  const handleAddCategory = async () => {
    try {
      const { error } = await supabase.from('categories').insert(categoryForm);
      if (error) throw error;

      toast.success('Category added successfully');
      setShowCategoryModal(false);
      setCategoryForm({ name: '', department_id: '' });
      fetchCategories();
    } catch (error) {
      console.error('Failed to add category:', error);
      toast.error('Failed to add category');
    }
  };

  const handleUpdateCategory = async () => {
    try {
      const { error } = await supabase
        .from('categories')
        .update(categoryForm)
        .eq('id', selectedCategory.id);

      if (error) throw error;

      toast.success('Category updated successfully');
      setShowCategoryModal(false);
      setSelectedCategory(null);
      setCategoryForm({ name: '', department_id: '' });
      fetchCategories();
    } catch (error) {
      console.error('Failed to update category:', error);
      toast.error('Failed to update category');
    }
  };

  const handleDeleteCategory = async (catId) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const { error } = await supabase.from('categories').delete().eq('id', catId);
      if (error) throw error;

      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      console.error('Failed to delete category:', error);
      toast.error('Failed to delete category');
    }
  };

  const openDepartmentModal = (dept = null) => {
    if (dept) {
      setSelectedDepartment(dept);
      setDepartmentForm({ name: dept.name, code: dept.code });
    } else {
      setSelectedDepartment(null);
      setDepartmentForm({ name: '', code: '' });
    }
    setShowDepartmentModal(true);
  };

  const openCategoryModal = (cat = null) => {
    if (cat) {
      setSelectedCategory(cat);
      setCategoryForm({ name: cat.name, department_id: cat.department_id });
    } else {
      setSelectedCategory(null);
      setCategoryForm({ name: '', department_id: '' });
    }
    setShowCategoryModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <Skeleton variant="card" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Skeleton key={i} variant="card" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Department Manager</h1>
          <p className="text-slate-400">Manage departments and course categories</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Departments */}
          <div className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Departments
              </h2>
              <Button onClick={() => openDepartmentModal()} variant="primary" size="sm" icon={Plus}>
                Add Department
              </Button>
            </div>
            <div className="space-y-3">
              {departments.map((dept) => (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-800 rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="text-white font-medium">{dept.name}</p>
                    <p className="text-slate-400 text-sm">Code: {dept.code}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => openDepartmentModal(dept)}
                      variant="secondary"
                      size="sm"
                      icon={Edit2}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteDepartment(dept.id)}
                      variant="secondary"
                      size="sm"
                      icon={Trash2}
                    >
                      Delete
                    </Button>
                  </div>
                </motion.div>
              ))}
              {departments.length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  No departments found
                </div>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-slate-900/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <FolderTree className="w-5 h-5" />
                Categories
              </h2>
              <Button onClick={() => openCategoryModal()} variant="primary" size="sm" icon={Plus}>
                Add Category
              </Button>
            </div>
            <div className="space-y-3">
              {categories.map((cat) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-800 rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="text-white font-medium">{cat.name}</p>
                    <p className="text-slate-400 text-sm">{cat.departments?.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => openCategoryModal(cat)}
                      variant="secondary"
                      size="sm"
                      icon={Edit2}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteCategory(cat.id)}
                      variant="secondary"
                      size="sm"
                      icon={Trash2}
                    >
                      Delete
                    </Button>
                  </div>
                </motion.div>
              ))}
              {categories.length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  No categories found
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Department Modal */}
        <Modal
          isOpen={showDepartmentModal}
          onClose={() => setShowDepartmentModal(false)}
          title={selectedDepartment ? 'Edit Department' : 'Add Department'}
          size="sm"
        >
          <div className="space-y-4">
            <Input
              label="Department Name"
              value={departmentForm.name}
              onChange={(e) => setDepartmentForm({ ...departmentForm, name: e.target.value })}
              placeholder="e.g., Computer Science"
            />
            <Input
              label="Department Code"
              value={departmentForm.code}
              onChange={(e) => setDepartmentForm({ ...departmentForm, code: e.target.value })}
              placeholder="e.g., CS"
            />
            <div className="flex gap-4 justify-end">
              <Button onClick={() => setShowDepartmentModal(false)} variant="secondary">
                Cancel
              </Button>
              <Button
                onClick={selectedDepartment ? handleUpdateDepartment : handleAddDepartment}
                variant="primary"
              >
                {selectedDepartment ? 'Update' : 'Add'}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Category Modal */}
        <Modal
          isOpen={showCategoryModal}
          onClose={() => setShowCategoryModal(false)}
          title={selectedCategory ? 'Edit Category' : 'Add Category'}
          size="sm"
        >
          <div className="space-y-4">
            <Input
              label="Category Name"
              value={categoryForm.name}
              onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
              placeholder="e.g., Web Development"
            />
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Department</label>
              <select
                value={categoryForm.department_id}
                onChange={(e) => setCategoryForm({ ...categoryForm, department_id: e.target.value })}
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
            <div className="flex gap-4 justify-end">
              <Button onClick={() => setShowCategoryModal(false)} variant="secondary">
                Cancel
              </Button>
              <Button
                onClick={selectedCategory ? handleUpdateCategory : handleAddCategory}
                variant="primary"
              >
                {selectedCategory ? 'Update' : 'Add'}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default DepartmentManager;
