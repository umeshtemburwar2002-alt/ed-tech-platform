import React from "react";

const gaps = [
	{ skill: "Graphs", mastery: 46, target: 70, action: "Complete Graph Module 2" },
	{ skill: "DP", mastery: 58, target: 75, action: "Practice 5 medium DP problems" },
	{ skill: "System Design", mastery: 20, target: 50, action: "Watch Intro SD playlist" },
];

export default function SkillGapAnalysis() {
	return (
		<div className="space-y-5">
			<h2 className="text-xl font-semibold text-richblack-5">Skill Gap Analysis</h2>
			<table className="w-full text-sm border-separate border-spacing-y-2">
				<thead>
					<tr className="text-left text-xs text-richblack-300">
						<th className="py-1">Skill</th>
						<th className="py-1">Mastery</th>
						<th className="py-1">Target</th>
						<th className="py-1">Recommended Action</th>
					</tr>
				</thead>
				<tbody>
					{gaps.map((g, i) => (
						<tr key={i} className="bg-richblack-800 rounded-md">
							<td className="py-2 px-2 font-medium text-richblack-50">{g.skill}</td>
							<td className="py-2 px-2 text-indigo-300">{g.mastery}%</td>
							<td className="py-2 px-2 text-emerald-300">{g.target}%</td>
							<td className="py-2 px-2 text-richblack-200">{g.action}</td>
						</tr>
					))}
				</tbody>
			</table>
			<p className="text-xs text-richblack-400">Mastery % heuristic; later derive from quiz + watch-time signals.</p>
		</div>
	);
}

