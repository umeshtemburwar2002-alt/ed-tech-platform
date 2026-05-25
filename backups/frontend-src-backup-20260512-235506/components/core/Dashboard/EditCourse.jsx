import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Corrected path: go up three levels (Dashboard -> core -> components -> src) to reach services
import { getFullDetailsOfCourse, editCourseDetails, deleteCourse } from "../../../services/operations/courseDetailsAPI";

export default function EditCourse() {
	const { courseId } = useParams();
	const navigate = useNavigate();
	const { token } = useSelector(state => state.auth);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [error, setError] = useState(null);
	const [course, setCourse] = useState(null);

	// Local editable fields
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [status, setStatus] = useState("Draft");
	const [thumbnail, setThumbnail] = useState(null);

	useEffect(()=>{
		let active = true;
		(async ()=>{
			try {
				setLoading(true);
				const data = await getFullDetailsOfCourse(courseId, token);
				if (!active) return;
				if (!data) throw new Error("Course not found");
				setCourse(data);
				setTitle(data.courseName || "");
				setDescription(data.courseDescription || "");
				setPrice(data.price || "");
				setStatus(data.status || "Draft");
			} catch(e){
				if (active) setError(e.message || "Failed to load course");
			} finally {
				if (active) setLoading(false);
			}
		})();
		return ()=>{ active = false; };
	}, [courseId, token]);

	async function handleSave() {
		setSaving(true);
		setError(null);
		try {
			const formData = new FormData();
			formData.append("courseId", courseId);
			formData.append("courseName", title);
			formData.append("courseDescription", description);
			formData.append("price", price);
			formData.append("status", status);
			if (thumbnail) formData.append("thumbnail", thumbnail);
			const updated = await editCourseDetails(formData, token);
			if (updated) {
				setCourse(updated);
			}
		} catch(e){
			setError(e.message || "Update failed");
		} finally {
			setSaving(false);
		}
	}

	async function handleDelete() {
		if (!window.confirm("Delete this course permanently?")) return;
		setDeleting(true);
		setError(null);
		try {
			await deleteCourse({ courseId }, token);
			navigate("/instructor/my-courses");
		} catch(e){
			setError(e.message || "Delete failed");
		} finally {
			setDeleting(false);
		}
	}

	const stats = useMemo(()=>{
		if (!course) return [];
		return [
			{ label: "Sections", value: course.courseContent?.length || 0 },
			{ label: "Lectures", value: course.totalLectures || "—" },
			{ label: "Students", value: (course.studentsEnrolled?.length || 0) },
			{ label: "Ratings", value: (course.ratingAndReviews?.length || 0) },
		];
	}, [course]);

	if (loading) return <div className="p-6 text-sm text-richblack-300">Loading course...</div>;
	if (error) return <div className="p-6 text-sm text-rose-300">{error}</div>;
	if (!course) return <div className="p-6 text-sm text-richblack-300">Course not found.</div>;

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between flex-wrap gap-4">
				<div>
					<h1 className="text-2xl font-bold text-richblack-5">Edit Course</h1>
					<p className="text-xs text-richblack-300 mt-1">ID: {courseId}</p>
				</div>
				<div className="flex gap-2">
					<button onClick={handleSave} disabled={saving} className="px-4 py-2 text-xs font-semibold rounded-md bg-yellow-50 text-richblack-900 disabled:opacity-50">{saving?"Saving...":"Save Changes"}</button>
					<button onClick={handleDelete} disabled={deleting} className="px-4 py-2 text-xs rounded-md bg-rose-600/80 hover:bg-rose-600 text-richblack-25 disabled:opacity-50">{deleting?"Deleting...":"Delete"}</button>
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				<div className="space-y-5 lg:col-span-2">
					<div>
						<label className="block text-[11px] uppercase tracking-wide text-richblack-400 mb-1">Title</label>
						<input value={title} onChange={e=>setTitle(e.target.value)} className="w-full px-3 py-2 text-sm rounded-md bg-richblack-900 border border-richblack-700 focus:border-yellow-50 outline-none text-richblack-25" />
					</div>
					<div>
						<label className="block text-[11px] uppercase tracking-wide text-richblack-400 mb-1">Description</label>
						<textarea rows={6} value={description} onChange={e=>setDescription(e.target.value)} className="w-full resize-none px-3 py-2 text-sm rounded-md bg-richblack-900 border border-richblack-700 focus:border-yellow-50 outline-none text-richblack-25" />
					</div>
					<div className="grid gap-4 sm:grid-cols-2">
						<div>
							<label className="block text-[11px] uppercase tracking-wide text-richblack-400 mb-1">Price (₹)</label>
							<input type="number" value={price} onChange={e=>setPrice(e.target.value)} className="w-full px-3 py-2 text-sm rounded-md bg-richblack-900 border border-richblack-700 focus:border-yellow-50 outline-none text-richblack-25" />
						</div>
						<div>
							<label className="block text-[11px] uppercase tracking-wide text-richblack-400 mb-1">Status</label>
							<select value={status} onChange={e=>setStatus(e.target.value)} className="w-full px-3 py-2 text-sm rounded-md bg-richblack-900 border border-richblack-700 focus:border-yellow-50 outline-none text-richblack-25">
								<option>Draft</option>
								<option>Published</option>
							</select>
						</div>
					</div>
					<div>
						<label className="block text-[11px] uppercase tracking-wide text-richblack-400 mb-1">Thumbnail</label>
						<input type="file" accept="image/*" onChange={e=>setThumbnail(e.target.files?.[0] || null)} className="text-xs text-richblack-300" />
						{course.thumbnail && !thumbnail && <p className="mt-1 text-[10px] text-richblack-400">Current: {course.thumbnail.split('/').slice(-1)[0]}</p>}
						{thumbnail && <p className="mt-1 text-[10px] text-emerald-300">New: {thumbnail.name}</p>}
					</div>
					<div className="rounded-lg border border-richblack-700 bg-richblack-800 p-4 text-[11px] text-richblack-300">
						<p>Curriculum editing (sections / lectures) will be added as a dedicated builder soon.</p>
					</div>
				</div>
				<div className="space-y-5">
					<div className="rounded-lg border border-richblack-700 bg-richblack-800 p-4">
						<p className="font-semibold text-sm text-richblack-50 mb-3">Course Stats</p>
						<div className="grid gap-3 sm:grid-cols-2">
							{stats.map(s => (
								<div key={s.label} className="rounded-md border border-richblack-700 bg-richblack-900/40 p-3 text-center">
									<p className="text-[11px] text-richblack-400 uppercase tracking-wide mb-1">{s.label}</p>
									<p className="text-sm font-semibold text-richblack-25">{s.value}</p>
								</div>
							))}
						</div>
					</div>
					<div className="rounded-lg border border-richblack-700 bg-richblack-800 p-4 text-[11px] text-richblack-300">
						<p>Last updated: {course.updatedAt ? new Date(course.updatedAt).toLocaleString() : '—'}</p>
						<p className="mt-2">Created: {course.createdAt ? new Date(course.createdAt).toLocaleDateString() : '—'}</p>
						<p className="mt-2">ID: <span className="select-all">{course._id}</span></p>
					</div>
				</div>
			</div>
			{error && <div className="px-4 py-2 rounded-md bg-rose-600/20 border border-rose-500 text-rose-100 text-xs">{error}</div>}
		</div>
	);
}

