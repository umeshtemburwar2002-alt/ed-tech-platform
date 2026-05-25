import React, { useState, useEffect } from "react";
import FeatureSkeleton from "../../../core/Loaders/FeatureSkeleton";
import { listenDoubts, postDoubt } from "../../../../services/realtime/studentRealtime";
import { useSelector } from "react-redux";

export default function DoubtForum() {
	const { user } = useSelector((s) => s.profile);
	const [threads, setThreads] = useState([]);
	const [text, setText] = useState("");
	const [loading, setLoading] = useState(true);
	const addThread = async () => {
		if (!text.trim()) return;
		await postDoubt({ title: text.trim(), userId: user?.email || "anon" });
		setText("");
	};
	useEffect(() => {
		const unsub = listenDoubts((docs) => {
			setThreads(docs);
			setLoading(false);
		});
		return () => unsub && unsub();
	}, []);
	if (loading) return <FeatureSkeleton cards={3} />;
	return (
		<div className="space-y-5">
			<h2 className="text-xl font-semibold text-richblack-5">Doubt Forum</h2>
			<div className="flex gap-2">
				<input
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Ask your question..."
					className="flex-1 rounded border border-richblack-600 bg-richblack-800 px-3 py-2 text-sm text-richblack-50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
				/>
				<button onClick={addThread} className="px-4 rounded bg-yellow-50 text-richblack-900 text-sm font-semibold">
					Post
				</button>
			</div>
			<ul className="space-y-3">
				{threads.map((t) => (
					<li key={t.id} className="rounded border border-richblack-700 p-4 bg-richblack-800 hover:border-indigo-500/40 transition-colors">
						<div className="font-medium text-richblack-50">{t.title}</div>
						<div className="text-[10px] text-richblack-400 mt-1">{t.replies} replies • mark solved later</div>
					</li>
				))}
			</ul>
			<p className="text-xs text-richblack-400">Add real-time via Firestore or WebSocket later.</p>
		</div>
	);
}

