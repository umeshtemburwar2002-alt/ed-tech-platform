import React, { useState, useEffect } from "react";
import { supabase } from "../../../config/supabaseClient";
import { toast } from "react-hot-toast";
import { FaPlus, FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

export default function AdminPanel() {
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for forms
  const [newDept, setNewDept] = useState({ name: "", code: "", description: "" });
  const [newCat, setNewCat] = useState({ name: "", description: "" });
  const [editingDept, setEditingDept] = useState(null);
  const [editingCat, setEditingCat] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [deptsData, catsData, usersData, coursesData] = await Promise.all([
        supabase.from('departments').select('*').order('name'),
        supabase.from('categories').select('*').order('name'),
        supabase.from('profiles').select('*'),
        supabase.from('courses').select('*, instructor:profiles!instructor_id(full_name)'),
      ]);

      if (!deptsData.error) setDepartments(deptsData.data);
      if (!catsData.error) setCategories(catsData.data);
      if (!usersData.error) setUsers(usersData.data);
      if (!coursesData.error) setCourses(coursesData.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Department handlers
  const addDepartment = async () => {
    try {
      const { error } = await supabase.from('departments').insert([newDept]);
      if (error) throw error;
      toast.success("Department added!");
      setNewDept({ name: "", code: "", description: "" });
      fetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateDepartment = async () => {
    try {
      const { error } = await supabase
        .from('departments')
        .update(editingDept)
        .eq('id', editingDept.id);
      if (error) throw error;
      toast.success("Department updated!");
      setEditingDept(null);
      fetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteDepartment = async (id) => {
    if (!confirm("Are you sure you want to delete this department?")) return;
    try {
      const { error } = await supabase.from('departments').delete().eq('id', id);
      if (error) throw error;
      toast.success("Department deleted!");
      fetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Category handlers
  const addCategory = async () => {
    try {
      const { error } = await supabase.from('categories').insert([newCat]);
      if (error) throw error;
      toast.success("Category added!");
      setNewCat({ name: "", description: "" });
      fetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateCategory = async () => {
    try {
      const { error } = await supabase
        .from('categories')
        .update(editingCat)
        .eq('id', editingCat.id);
      if (error) throw error;
      toast.success("Category updated!");
      setEditingCat(null);
      fetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteCategory = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) throw error;
      toast.success("Category deleted!");
      fetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Course handlers
  const updateCourseStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
      toast.success(`Course ${status}!`);
      fetchData();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-yellow-50/30 border-t-yellow-50 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-xl">
        <h1 className="text-3xl font-bold text-richblack-5">Admin Panel</h1>
        <p className="text-sm text-richblack-300 mt-1">
          Manage departments, categories, users, and courses
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-xl">
          <div className="text-yellow-50 text-4xl mb-2">🏫</div>
          <p className="text-3xl font-black text-richblack-5">{departments.length}</p>
          <p className="text-xs text-richblack-400 font-medium uppercase">Departments</p>
        </div>
        <div className="bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-xl">
          <div className="text-blue-400 text-4xl mb-2">📂</div>
          <p className="text-3xl font-black text-richblack-5">{categories.length}</p>
          <p className="text-xs text-richblack-400 font-medium uppercase">Categories</p>
        </div>
        <div className="bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-xl">
          <div className="text-emerald-400 text-4xl mb-2">👥</div>
          <p className="text-3xl font-black text-richblack-5">{users.length}</p>
          <p className="text-xs text-richblack-400 font-medium uppercase">Users</p>
        </div>
        <div className="bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-xl">
          <div className="text-pink-400 text-4xl mb-2">📚</div>
          <p className="text-3xl font-black text-richblack-5">{courses.length}</p>
          <p className="text-xs text-richblack-400 font-medium uppercase">Courses</p>
        </div>
      </div>

      {/* Departments */}
      <div className="bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-richblack-5">Departments</h2>
        </div>
        
        {/* Add Department Form */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <input
            value={newDept.name}
            onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
            placeholder="Department Name"
            className="w-full px-4 py-3 text-sm rounded-lg bg-richblack-900 border border-richblack-700 focus:border-yellow-50 outline-none text-richblack-25"
          />
          <input
            value={newDept.code}
            onChange={(e) => setNewDept({ ...newDept, code: e.target.value })}
            placeholder="Code (e.g. CS)"
            className="w-full px-4 py-3 text-sm rounded-lg bg-richblack-900 border border-richblack-700 focus:border-yellow-50 outline-none text-richblack-25"
          />
          <input
            value={newDept.description}
            onChange={(e) => setNewDept({ ...newDept, description: e.target.value })}
            placeholder="Description"
            className="w-full px-4 py-3 text-sm rounded-lg bg-richblack-900 border border-richblack-700 focus:border-yellow-50 outline-none text-richblack-25"
          />
          <button
            onClick={addDepartment}
            className="px-4 py-3 text-sm font-bold rounded-lg bg-yellow-50 text-richblack-900 hover:bg-yellow-100 transition-all flex items-center justify-center gap-2"
          >
            <FaPlus /> Add
          </button>
        </div>

        {/* Departments List */}
        <div className="space-y-3">
          {departments.map((dept) => (
            <div key={dept.id} className="flex items-center gap-4 p-4 rounded-xl bg-richblack-900/50 border border-richblack-700">
              {editingDept?.id === dept.id ? (
                <>
                  <input
                    value={editingDept.name}
                    onChange={(e) => setEditingDept({ ...editingDept, name: e.target.value })}
                    className="flex-1 px-3 py-2 text-sm rounded-lg bg-richblack-800 border border-richblack-700 focus:border-yellow-50 outline-none text-richblack-25"
                  />
                  <input
                    value={editingDept.code}
                    onChange={(e) => setEditingDept({ ...editingDept, code: e.target.value })}
                    className="w-24 px-3 py-2 text-sm rounded-lg bg-richblack-800 border border-richblack-700 focus:border-yellow-50 outline-none text-richblack-25"
                  />
                  <button onClick={updateDepartment} className="p-2 text-emerald-400 hover:text-emerald-300">
                    <FaCheck />
                  </button>
                  <button onClick={() => setEditingDept(null)} className="p-2 text-rose-500 hover:text-rose-400">
                    <FaTimes />
                  </button>
                </>
              ) : (
                <>
                  <div className="bg-yellow-50/10 px-3 py-1 rounded-lg border border-yellow-50/20">
                    <span className="text-sm font-bold text-yellow-50">{dept.code}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-richblack-5">{dept.name}</p>
                    <p className="text-xs text-richblack-400">{dept.description}</p>
                  </div>
                  <button onClick={() => setEditingDept(dept)} className="p-2 text-blue-400 hover:text-blue-300">
                    <FaEdit />
                  </button>
                  <button onClick={() => deleteDepartment(dept.id)} className="p-2 text-rose-500 hover:text-rose-400">
                    <FaTrash />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-richblack-5">Categories</h2>
        </div>
        
        {/* Add Category Form */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <input
            value={newCat.name}
            onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
            placeholder="Category Name"
            className="w-full px-4 py-3 text-sm rounded-lg bg-richblack-900 border border-richblack-700 focus:border-yellow-50 outline-none text-richblack-25"
          />
          <input
            value={newCat.description}
            onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
            placeholder="Description"
            className="w-full px-4 py-3 text-sm rounded-lg bg-richblack-900 border border-richblack-700 focus:border-yellow-50 outline-none text-richblack-25"
          />
          <button
            onClick={addCategory}
            className="px-4 py-3 text-sm font-bold rounded-lg bg-yellow-50 text-richblack-900 hover:bg-yellow-100 transition-all flex items-center justify-center gap-2"
          >
            <FaPlus /> Add
          </button>
        </div>

        {/* Categories List */}
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-4 p-4 rounded-xl bg-richblack-900/50 border border-richblack-700">
              {editingCat?.id === cat.id ? (
                <>
                  <input
                    value={editingCat.name}
                    onChange={(e) => setEditingCat({ ...editingCat, name: e.target.value })}
                    className="flex-1 px-3 py-2 text-sm rounded-lg bg-richblack-800 border border-richblack-700 focus:border-yellow-50 outline-none text-richblack-25"
                  />
                  <input
                    value={editingCat.description}
                    onChange={(e) => setEditingCat({ ...editingCat, description: e.target.value })}
                    className="flex-1 px-3 py-2 text-sm rounded-lg bg-richblack-800 border border-richblack-700 focus:border-yellow-50 outline-none text-richblack-25"
                  />
                  <button onClick={updateCategory} className="p-2 text-emerald-400 hover:text-emerald-300">
                    <FaCheck />
                  </button>
                  <button onClick={() => setEditingCat(null)} className="p-2 text-rose-500 hover:text-rose-400">
                    <FaTimes />
                  </button>
                </>
              ) : (
                <>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-richblack-5">{cat.name}</p>
                    <p className="text-xs text-richblack-400">{cat.description}</p>
                  </div>
                  <button onClick={() => setEditingCat(cat)} className="p-2 text-blue-400 hover:text-blue-300">
                    <FaEdit />
                  </button>
                  <button onClick={() => deleteCategory(cat.id)} className="p-2 text-rose-500 hover:text-rose-400">
                    <FaTrash />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Courses Approval */}
      <div className="bg-richblack-800 p-6 rounded-2xl border border-richblack-700 shadow-xl">
        <h2 className="text-2xl font-bold text-richblack-5 mb-6">Courses Approval</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-richblack-700">
                <th className="text-left text-xs font-bold text-richblack-400 uppercase tracking-wider pb-4">
                  Course
                </th>
                <th className="text-left text-xs font-bold text-richblack-400 uppercase tracking-wider pb-4">
                  Instructor
                </th>
                <th className="text-left text-xs font-bold text-richblack-400 uppercase tracking-wider pb-4">
                  Status
                </th>
                <th className="text-left text-xs font-bold text-richblack-400 uppercase tracking-wider pb-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-richblack-700">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-richblack-900/30 transition-colors">
                  <td className="py-4 text-sm font-medium text-richblack-25">
                    {course.course_name || course.title}
                  </td>
                  <td className="py-4 text-sm text-richblack-400">
                    {course.instructor?.full_name || "-"}
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      course.status === "Published" ? "bg-emerald-500/20 text-emerald-400" :
                      course.status === "Pending" ? "bg-yellow-50/20 text-yellow-50" :
                      course.status === "Rejected" ? "bg-rose-500/20 text-rose-400" :
                      "bg-blue-500/20 text-blue-400"
                    }`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      {course.status !== "Published" && (
                        <button
                          onClick={() => updateCourseStatus(course.id, "Published")}
                          className="px-3 py-1 text-xs font-bold rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-all"
                        >
                          Approve
                        </button>
                      )}
                      {course.status !== "Rejected" && (
                        <button
                          onClick={() => updateCourseStatus(course.id, "Rejected")}
                          className="px-3 py-1 text-xs font-bold rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition-all"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
