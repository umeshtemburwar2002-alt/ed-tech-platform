import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaGraduationCap, FaPlus, FaHome, FaUser, FaBook, FaQuestionCircle, FaStickyNote, FaVideo } from "react-icons/fa";
import { useSelector } from "react-redux";

const Sidebar = () => {
	const { user } = useSelector((state) => state.profile);
	const role = user?.accountType?.toLowerCase();

	const commonLinks = [
		{ to: "/dashboard/my-profile", label: "My Profile", icon: <FaUser /> },
	];

	const instructorLinks = [
		{ to: "/dashboard/instructor/my-courses", label: "My Courses", icon: <FaBook /> },
		{ to: "/dashboard/instructor/add-course", label: "Add Course", icon: <FaPlus /> },
		{ to: "/dashboard/instructor/quizzes", label: "Manage Quizzes", icon: <FaQuestionCircle /> },
		{ to: "/dashboard/instructor/notes", label: "Manage Notes", icon: <FaStickyNote /> },
		{ to: "/dashboard/instructor/live-classes", label: "Live Classes", icon: <FaVideo /> },
	];

	const studentLinks = [
		{ to: "/dashboard/enrolled-courses", label: "Enrolled Courses", icon: <FaBook /> },
		{ to: "/dashboard/quizzes", label: "Quizzes", icon: <FaQuestionCircle /> },
		{ to: "/dashboard/notes", label: "Notes", icon: <FaStickyNote /> },
		{ to: "/dashboard/live-classes", label: "Live Classes", icon: <FaVideo /> },
		{ to: "/dashboard/cart", label: "Cart", icon: <FaPlus /> },
	];

	const activeLinks = [...commonLinks, ...(role === 'instructor' ? instructorLinks : studentLinks)];

	return (
		<aside className="w-64 shrink-0 border-r border-richblack-700 bg-richblack-800 text-richblack-25 h-screen overflow-y-auto">
			{/* Logo Section */}
			<div className="p-4 border-b border-richblack-700">
				<Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
					<div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
						<FaGraduationCap className="text-richblack-900 text-xl" />
					</div>
					<div>
						<h1 className="font-bold text-yellow-50 text-lg leading-tight">Aslam Education</h1>
						<p className="text-[10px] text-richblack-400 uppercase tracking-wider">Platform</p>
					</div>
				</Link>
			</div>

			<nav className="flex flex-col py-4">
				{activeLinks.map((link) => (
					<NavLink
						key={link.to}
						to={link.to}
						className={({ isActive }) =>
							`px-6 py-3 text-sm font-medium transition-all duration-200 flex items-center space-x-3 ${
								isActive 
								? "bg-yellow-800/20 text-yellow-50 border-r-4 border-yellow-50" 
								: "text-richblack-300 hover:bg-richblack-700 hover:text-richblack-50"
							}`
						}
					>
						<span className="text-lg">{link.icon}</span>
						<span>{link.label}</span>
					</NavLink>
				))}
			</nav>
		</aside>
	);
};

export default Sidebar;
