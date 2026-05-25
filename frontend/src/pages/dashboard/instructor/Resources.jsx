import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { FolderOpen, Upload, Download, File, FileText, Archive, Code, Trash2, Search } from "lucide-react";
import toast from "react-hot-toast";

const INITIAL_RESOURCES = [
  { id: 1, name: "React Cheatsheet.pdf",          type: "pdf",  size: "2.4 MB", downloads: 142, course: "React.js Masterclass",      uploaded: "May 10, 2026" },
  { id: 2, name: "Python Starter Kit.zip",         type: "zip",  size: "8.1 MB", downloads: 98,  course: "Python for Data Science",   uploaded: "May 8, 2026"  },
  { id: 3, name: "Node.js API Boilerplate.zip",    type: "zip",  size: "5.3 MB", downloads: 76,  course: "Node.js & Express API",     uploaded: "May 6, 2026"  },
  { id: 4, name: "UI Design Templates.zip",        type: "zip",  size: "12.7 MB",downloads: 65,  course: "UI/UX Design",              uploaded: "May 4, 2026"  },
  { id: 5, name: "ML Notebook Template.ipynb",     type: "code", size: "1.1 MB", downloads: 53,  course: "Machine Learning A-Z",      uploaded: "May 2, 2026"  },
  { id: 6, name: "CSS Flexbox & Grid Guide.pdf",   type: "pdf",  size: "3.2 MB", downloads: 121, course: "React.js Masterclass",      uploaded: "Apr 28, 2026" },
];

const TYPE_ICON = {
  pdf:  { icon: FileText, color: "text-red-400",    bg: "bg-red-500/10" },
  zip:  { icon: Archive,  color: "text-amber-400",  bg: "bg-amber-500/10" },
  code: { icon: Code,     color: "text-cyan-400",   bg: "bg-cyan-500/10" },
};

export default function Resources() {
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [search, setSearch]       = useState("");
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((accepted) => {
    setUploading(true);
    setTimeout(() => {
      const newRes = accepted.map((f, i) => ({
        id: Date.now() + i,
        name: f.name,
        type: f.name.endsWith(".pdf") ? "pdf" : f.name.endsWith(".zip") ? "zip" : "code",
        size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
        downloads: 0,
        course: "Unassigned",
        uploaded: "Just now",
      }));
      setResources((prev) => [...newRes, ...prev]);
      setUploading(false);
      toast.success(`${accepted.length} file${accepted.length > 1 ? "s" : ""} uploaded!`);
    }, 1500);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });

  const filtered = resources.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()) || r.course.toLowerCase().includes(search.toLowerCase()));
  const totalDownloads = resources.reduce((a, r) => a + r.downloads, 0);

  const deleteRes = (id) => { setResources((prev) => prev.filter((r) => r.id !== id)); toast.success("Resource deleted"); };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Resource Library</h1>
          <p className="text-sm text-slate-500 mt-0.5">Upload PDFs, ZIPs, code templates and course materials</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-xs text-emerald-400 font-semibold">{totalDownloads} total downloads</p>
          </div>
        </div>
      </motion.div>

      {/* Dropzone */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${isDragActive ? "border-violet-500 bg-violet-500/10" : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"}`}>
          <input {...getInputProps()} />
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center animate-pulse">
                <Upload className="w-6 h-6 text-violet-400" />
              </div>
              <p className="text-sm font-semibold text-violet-300">Uploading…</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isDragActive ? "bg-violet-500 shadow-lg shadow-violet-500/30" : "bg-white/[0.05]"}`}>
                <Upload className={`w-7 h-7 ${isDragActive ? "text-white" : "text-slate-500"}`} />
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-1">{isDragActive ? "Drop files here!" : "Drag & drop files, or click to browse"}</p>
                <p className="text-xs text-slate-500">Supports PDF, ZIP, code files, templates · Max 50 MB each</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Search + List */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search resources…"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-all" />
          </div>
          <span className="text-xs text-slate-500">{filtered.length} files</span>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <FolderOpen className="w-12 h-12 text-slate-700 mx-auto mb-3" />
            <p className="text-slate-400">No resources found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((r, i) => {
              const meta = TYPE_ICON[r.type] || TYPE_ICON.code;
              return (
                <motion.div key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 p-3.5 rounded-xl hover:bg-white/[0.03] transition-all group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${meta.bg} shrink-0`}>
                    <meta.icon className={`w-5 h-5 ${meta.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{r.name}</p>
                    <p className="text-[10px] text-slate-500">{r.course} · {r.size} · {r.uploaded}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Download className="w-3 h-3" /> {r.downloads}
                    </div>
                    <button onClick={() => toast.success("Download started!")} className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-violet-500/20 text-slate-500 hover:text-violet-400 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => deleteRes(r.id)} className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-red-500/20 text-slate-500 hover:text-red-400 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
