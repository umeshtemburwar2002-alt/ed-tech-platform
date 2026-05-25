import React from "react";

// Basic animated skeleton blocks for app-level suspense fallback
export default function AppSkeleton() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-start gap-8 pt-16 animate-pulse">
      <div className="h-10 w-60 rounded-md bg-richblack-700" />
      <div className="flex flex-col gap-4 w-11/12 max-w-[900px]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-6 w-full rounded bg-richblack-700" />
        ))}
      </div>
      <div className="flex gap-4 w-11/12 max-w-[900px]">
        <div className="h-40 flex-1 rounded bg-richblack-700" />
        <div className="h-40 flex-1 rounded bg-richblack-700" />
        <div className="h-40 flex-1 rounded bg-richblack-700" />
      </div>
    </div>
  );
}
