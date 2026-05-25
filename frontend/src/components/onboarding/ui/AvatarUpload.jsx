import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Upload, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AvatarUpload({ value, onChange }) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(value || null);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(file);
    toast.success('Image selected!');
  };

  const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); };

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative w-32 h-32 rounded-full cursor-pointer overflow-hidden border-2 
          ${isDragging ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/20 bg-white/5'}
          flex items-center justify-center transition-all`}
      >
        {preview ? (
          <>
            <img src={preview} alt="Avatar preview" className="w-full h-full object-cover" />
            <button
              onClick={(e) => { e.stopPropagation(); setPreview(null); onChange(null); }}
              className="absolute top-1 right-1 p-1.5 bg-black/70 rounded-full text-white hover:bg-black/90 transition-colors"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <User className="w-10 h-10 text-white/40" />
            <Upload className="w-4 h-4 text-white/30" />
          </div>
        )}
      </motion.div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
      <p className="text-xs text-white/50 text-center">Click or drag to upload</p>
    </div>
  );
}
