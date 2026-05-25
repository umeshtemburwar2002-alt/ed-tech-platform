import React, { useState } from "react";
import { FaTimes, FaPlus, FaTrash, FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

const CATEGORIES = [
  "Web Development", "Data Science", "Mobile Development",
  "UI/UX Design", "Cloud & DevOps", "Cybersecurity",
];

export default function CourseEditModal({ course, onClose, onSave }) {
  const [form, setForm] = useState({
    courseName:        course.courseName        ?? "",
    courseDescription: course.courseDescription ?? "",
    price:             course.price             ?? 0,
    level:             course.level             ?? "Beginner",
    language:          course.language          ?? "English",
    status:            course.status            ?? "Draft",
    category:          course.category?.name ?? course.category ?? "",
    thumbnail:         course.thumbnail         ?? "",
    sections:          course.sections?.length
      ? course.sections.map(s => ({
          sectionName: s.sectionName,
          subSection: (s.subSection ?? []).map(sub => ({
            title: sub.title,
            timeDuration: sub.timeDuration ?? "",
          })),
        }))
      : [{ sectionName: "Introduction", subSection: [{ title: "Welcome", timeDuration: "" }] }],
  });

  const [thumbPreview, setThumbPreview] = useState(course.thumbnail ?? "");
  const [saving, setSaving] = useState(false);

  // ── Helpers ────────────────────────────────────────────────
  const set = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const setSection = (si, key, val) =>
    setForm(f => ({
      ...f,
      sections: f.sections.map((s, i) => i === si ? { ...s, [key]: val } : s),
    }));

  const setLecture = (si, li, key, val) =>
    setForm(f => ({
      ...f,
      sections: f.sections.map((s, i) =>
        i === si
          ? { ...s, subSection: s.subSection.map((l, j) => j === li ? { ...l, [key]: val } : l) }
          : s
      ),
    }));

  const addSection = () =>
    setForm(f => ({ ...f, sections: [...f.sections, { sectionName: "New Section", subSection: [] }] }));

  const removeSection = (si) =>
    setForm(f => ({ ...f, sections: f.sections.filter((_, i) => i !== si) }));

  const addLecture = (si) =>
    setForm(f => ({
      ...f,
      sections: f.sections.map((s, i) =>
        i === si ? { ...s, subSection: [...s.subSection, { title: "New Lecture", timeDuration: "" }] } : s
      ),
    }));

  const removeLecture = (si, li) =>
    setForm(f => ({
      ...f,
      sections: f.sections.map((s, i) =>
        i === si ? { ...s, subSection: s.subSection.filter((_, j) => j !== li) } : s
      ),
    }));

  const handleThumb = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => { setThumbPreview(reader.result); set("thumbnail", reader.result); };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!form.courseName.trim()) return toast.error("Course title is required");
    setSaving(true);
    await new Promise(r => setTimeout(r, 700)); // mock save delay
    onSave({ ...course, ...form, category: { name: form.category } });
    toast.success("Course updated successfully!");
    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="bg-richblack-800 border border-richblack-700 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-richblack-800 border-b border-richblack-700 flex items-center justify-between px-6 py-4 z-10 rounded-t-2xl">
          <h2 className="text-lg font-black text-white">Edit Course</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-richblack-700 hover:bg-richblack-600 flex items-center justify-center text-slate-400 hover:text-white transition-all">
            <FaTimes />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Thumbnail */}
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Thumbnail</label>
            <div className="relative group h-36 rounded-xl overflow-hidden border-2 border-dashed border-richblack-600 bg-richblack-900 flex items-center justify-center cursor-pointer hover:border-yellow-50 transition-all">
              {thumbPreview
                ? <img src={thumbPreview} alt="thumb" className="w-full h-full object-cover" />
                : <div className="flex flex-col items-center gap-2 text-slate-500"><FaCloudUploadAlt className="text-3xl" /><span className="text-xs">Click to upload</span></div>
              }
              <input type="file" accept="image/*" onChange={handleThumb} className="absolute inset-0 opacity-0 cursor-pointer" />
              {thumbPreview && <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all"><span className="text-white text-xs font-bold">Change Image</span></div>}
            </div>
          </div>

          {/* Basic Fields */}
          <div className="space-y-4">
            {[
              { label: "Course Title *", field: "courseName", type: "text", placeholder: "e.g. Modern JavaScript Masterclass" },
              { label: "Price (₹)", field: "price", type: "number", placeholder: "0 = Free" },
            ].map(({ label, field, type, placeholder }) => (
              <div key={field}>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{label}</label>
                <input
                  type={type}
                  value={form[field]}
                  onChange={e => set(field, e.target.value)}
                  placeholder={placeholder}
                  className="w-full px-4 py-3 bg-richblack-900 border border-richblack-700 rounded-xl text-sm text-white focus:border-yellow-50 outline-none transition-all"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Description</label>
              <textarea
                rows={3}
                value={form.courseDescription}
                onChange={e => set("courseDescription", e.target.value)}
                placeholder="What will students learn?"
                className="w-full resize-none px-4 py-3 bg-richblack-900 border border-richblack-700 rounded-xl text-sm text-white focus:border-yellow-50 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Category", field: "category", options: CATEGORIES },
                { label: "Level", field: "level", options: ["Beginner", "Intermediate", "Advanced"] },
                { label: "Language", field: "language", options: ["English", "Hindi", "Spanish", "French"] },
                { label: "Status", field: "status", options: ["Draft", "Published"] },
              ].map(({ label, field, options }) => (
                <div key={field}>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{label}</label>
                  <select
                    value={form[field]}
                    onChange={e => set(field, e.target.value)}
                    className="w-full px-4 py-3 bg-richblack-900 border border-richblack-700 rounded-xl text-sm text-white focus:border-yellow-50 outline-none cursor-pointer"
                  >
                    {options.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Builder */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Curriculum</h3>
              <button onClick={addSection} className="flex items-center gap-1 text-xs font-bold text-yellow-50 hover:text-yellow-200 transition-colors">
                <FaPlus className="text-[10px]" /> Add Section
              </button>
            </div>

            <div className="space-y-3">
              {form.sections.map((sec, si) => (
                <div key={si} className="bg-richblack-900 border border-richblack-700 rounded-xl p-4 space-y-3">
                  {/* Section header */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-slate-600 w-5 shrink-0">{si + 1}.</span>
                    <input
                      value={sec.sectionName}
                      onChange={e => setSection(si, "sectionName", e.target.value)}
                      className="flex-1 bg-transparent border-b border-richblack-600 focus:border-yellow-50 outline-none text-white text-sm font-bold py-1 transition-all"
                    />
                    <button onClick={() => removeSection(si)} className="text-pink-400 hover:text-pink-300 transition-colors p-1">
                      <FaTrash className="text-[10px]" />
                    </button>
                  </div>

                  {/* Lectures */}
                  <div className="pl-7 space-y-2">
                    {sec.subSection.map((lec, li) => (
                      <div key={li} className="flex items-center gap-2 bg-richblack-800 rounded-lg px-3 py-2">
                        <input
                          value={lec.title}
                          onChange={e => setLecture(si, li, "title", e.target.value)}
                          className="flex-1 bg-transparent outline-none text-xs text-slate-300"
                          placeholder="Lecture title"
                        />
                        <input
                          type="number"
                          value={lec.timeDuration}
                          onChange={e => setLecture(si, li, "timeDuration", e.target.value)}
                          className="w-12 bg-richblack-700 rounded text-center text-[10px] text-slate-400 outline-none px-1 py-0.5"
                          placeholder="Min"
                        />
                        <span className="text-[9px] text-slate-600 font-bold">MIN</span>
                        <button onClick={() => removeLecture(si, li)} className="text-pink-500/60 hover:text-pink-400 transition-colors">
                          <FaTimes className="text-[10px]" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addLecture(si)}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 transition-colors mt-1"
                    >
                      <FaPlus className="text-[9px]" /> Add Lecture
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2 sticky bottom-0 bg-richblack-800 pb-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-richblack-700 hover:bg-richblack-600 text-white rounded-xl font-bold text-sm transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 bg-yellow-50 hover:bg-yellow-100 text-richblack-900 rounded-xl font-black text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
