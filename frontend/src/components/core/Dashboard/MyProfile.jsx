import React from "react";
import { useSelector } from "react-redux";

export default function MyProfile() {
	const { user } = useSelector((s) => s.profile);
	if (!user) return null;
	const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
	return (
		<div className="space-y-8">
			<div className="flex items-center gap-4">
				<img
					src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName || user.email)}&background=111827&color=FACC15`}
					alt="avatar"
					className="h-20 w-20 rounded-full object-cover ring-2 ring-richblack-700"
				/>
				<div>
					<h1 className="text-2xl font-semibold text-richblack-5">{fullName || user.email}</h1>
					<p className="text-sm text-richblack-300">{user.email}</p>
					<span className="mt-1 inline-block rounded bg-richblack-700 px-2 py-0.5 text-[11px] tracking-wide text-richblack-200">
						{user.accountType}
					</span>
				</div>
			</div>
			<section className="space-y-3">
				<h2 className="text-lg font-semibold text-richblack-5">Profile Details</h2>
				<div className="grid gap-5 sm:grid-cols-2">
					<div>
						<label className="text-xs uppercase tracking-wide text-richblack-400">First Name</label>
						<div className="mt-1 rounded border border-richblack-700 bg-richblack-800 px-3 py-2 text-sm text-richblack-200">
							{user.firstName || <span className="italic text-richblack-500">Not set</span>}
						</div>
					</div>
					<div>
						<label className="text-xs uppercase tracking-wide text-richblack-400">Last Name</label>
						<div className="mt-1 rounded border border-richblack-700 bg-richblack-800 px-3 py-2 text-sm text-richblack-200">
							{user.lastName || <span className="italic text-richblack-500">Not set</span>}
						</div>
					</div>
					<div>
						<label className="text-xs uppercase tracking-wide text-richblack-400">Account Type</label>
						<div className="mt-1 rounded border border-richblack-700 bg-richblack-800 px-3 py-2 text-sm capitalize text-richblack-200">
							{user.accountType}
						</div>
					</div>
					<div>
						<label className="text-xs uppercase tracking-wide text-richblack-400">Joined</label>
						<div className="mt-1 rounded border border-richblack-700 bg-richblack-800 px-3 py-2 text-sm text-richblack-200">
							{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "--"}
						</div>
					</div>
				</div>
				<p className="text-xs text-richblack-500">Editing coming soon. Contact support to update critical info.</p>
			</section>
		</div>
	);
}
