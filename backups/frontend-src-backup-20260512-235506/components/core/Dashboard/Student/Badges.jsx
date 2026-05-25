import React from "react";

const badges = [
	{ name: "Consistency 7D", desc: "Studied 7 days in a row", tier: "bronze" },
	{ name: "Quiz Streak 5", desc: "5 quizzes above 80%", tier: "silver" },
	{ name: "Helper", desc: "Answered 3 peer doubts", tier: "gold" },
];

const tierColor = {
	bronze: "bg-amber-800/40 border-amber-600/40 text-amber-300",
	silver: "bg-slate-400/30 border-slate-200/40 text-slate-50",
	gold: "bg-yellow-500/20 border-yellow-400/40 text-yellow-200",
};

export default function Badges() {
	return (
		<div className="space-y-4">
			<h2 className="text-xl font-semibold text-richblack-5">Badges</h2>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{badges.map((b, i) => (
					<div key={i} className={`rounded border p-4 ${tierColor[b.tier]} backdrop-blur-sm`}>
						<div className="font-semibold">{b.name}</div>
						<div className="text-xs mt-1">{b.desc}</div>
					</div>
				))}
			</div>
			<p className="text-xs text-richblack-400">Gamification encourages steady study habits. More tiers coming.</p>
		</div>
	);
}

