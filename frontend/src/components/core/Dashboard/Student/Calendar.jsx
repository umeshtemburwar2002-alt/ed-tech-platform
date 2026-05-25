import React from "react";

const events = [
	{ date: "2025-08-26", label: "Live DSA Class", type: "live" },
	{ date: "2025-08-27", label: "Quiz: Graphs", type: "quiz" },
	{ date: "2025-08-29", label: "Mock Interview", type: "practice" },
];

export default function Calendar() {
	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold text-richblack-5">Upcoming Schedule</h2>
			<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{events.map((e, i) => (
					<div key={i} className="rounded-md border border-richblack-700 p-3 bg-richblack-800">
						<div className="text-xs text-richblack-400 mb-1">{e.date}</div>
						<div className="font-medium text-richblack-50 leading-snug">{e.label}</div>
						<div className="text-[10px] mt-2 inline-block px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
							{e.type}
						</div>
					</div>
				))}
			</div>
			<p className="text-xs text-richblack-400">Integrate a full calendar library later.</p>
		</div>
	);
}

