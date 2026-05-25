import React from "react";

export default function FeatureSkeleton({ cards = 3 }) {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 w-48 bg-richblack-700 rounded" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: cards }).map((_, i) => (
          <div key={i} className="h-32 rounded border border-richblack-700 bg-richblack-800" />
        ))}
      </div>
      <div className="h-4 w-2/3 bg-richblack-700 rounded" />
    </div>
  );
}
