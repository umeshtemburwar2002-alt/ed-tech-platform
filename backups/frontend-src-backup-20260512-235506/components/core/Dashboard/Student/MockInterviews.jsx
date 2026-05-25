import React from "react";

const slots = [
	{ id: 1, mentor: "A. Sharma", time: "Tomorrow 6:00 PM", topic: "DSA" },
	{ id: 2, mentor: "R. Khan", time: "Thu 7:30 PM", topic: "System Design" },
];

export default function MockInterviews() {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-xl font-semibold text-richblack-5">Mock Interviews</h2>
				<p className="text-sm text-richblack-300">Sharpen performance with mentor & peer sessions.</p>
			</div>
			<div className="space-y-3">
				{slots.map((s) => (
					<div key={s.id} className="flex items-center gap-4 rounded border border-richblack-700 p-4 bg-richblack-800">
						<div className="flex-1">
							<div className="font-medium text-richblack-50">{s.topic}</div>
							<div className="text-xs text-richblack-300">Mentor: {s.mentor}</div>
							<div className="text-xs text-richblack-400 mt-1">{s.time}</div>
						</div>
						<button className="text-xs px-3 py-1 rounded bg-yellow-50 text-richblack-900 font-semibold">Book</button>
					</div>
				))}
				<button className="w-full text-xs py-2 rounded bg-richblack-700 hover:bg-richblack-600 text-richblack-25">View More Slots</button>
			</div>
		</div>
	);
}

