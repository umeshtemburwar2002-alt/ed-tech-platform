import React from "react";

export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all duration-200 ${className}`}
      {...props}
    />
  );
}
