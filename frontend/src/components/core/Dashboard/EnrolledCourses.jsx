import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";

export default function EnrolledCourses() {
	const { token } = useSelector((state) => state.auth);
	const [courses, setCourses] = useState(null);
	const [loading, setLoading] = useState(true);

	const getEnrolledCourses = async () => {
		try {
			const res = await getUserEnrolledCourses(token);
			setCourses(res);
		} catch (error) {
			console.log("Could not fetch enrolled courses.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getEnrolledCourses();
	}, []);

	if (loading) return <div className="grid h-screen place-items-center"><div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div></div>;
	if (!courses || courses.length === 0) return <div className="text-richblack-300 mt-10 text-center">You are not enrolled in any course yet.</div>;

	return (
		<div className="space-y-6">
			<h2 className="text-xl font-semibold text-richblack-5">Enrolled Courses</h2>
			<div className="space-y-4">
				{courses.map((c) => (
					<div key={c._id} className="rounded border border-richblack-700 bg-richblack-800 p-4 flex flex-col gap-3">
						<div className="flex items-start gap-4">
							<img src={c.thumbnail || "https://placehold.co/96x64"} alt="thumb" className="h-16 w-24 rounded object-cover border border-richblack-700" />
							<div className="flex-1 min-w-0">
								<h3 className="font-medium text-richblack-50 line-clamp-2" title={c.courseName || c.title}>{c.courseName || c.title}</h3>
								<p className="text-xs mt-1 text-richblack-300 line-clamp-2">{c.courseDescription || c.description}</p>
								<div className="mt-2 flex items-center gap-3">
									<div className="flex-1 h-2 rounded bg-richblack-700 overflow-hidden">
										<div className="h-full bg-indigo-500" style={{ width: `${c.progressPercentage || 0}%` }} />
									</div>
									<span className="text-[11px] text-richblack-300">{c.progressPercentage || 0}%</span>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<button className="text-[11px] px-3 py-1 rounded bg-yellow-50 text-richblack-900 font-semibold hover:opacity-90">Resume</button>
								<button className="text-[11px] px-3 py-1 rounded border border-richblack-600 text-richblack-200 hover:bg-richblack-700">Details</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
