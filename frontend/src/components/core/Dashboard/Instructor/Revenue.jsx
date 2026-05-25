import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DashboardRealTime } from "../../../../services/operations/dashboardAPI";
import { FaRupeeSign, FaChartLine, FaArrowUp, FaUsers, FaShoppingCart } from "react-icons/fa";

// Clean empty state for new instructors
const EMPTY_STATS = [
	{ label: "Total Revenue", value: "₹0", delta: "Start earning", icon: FaRupeeSign },
	{ label: "Total Sales", value: "0", delta: "No sales yet", icon: FaShoppingCart },
	{ label: "Avg Revenue", value: "₹0", delta: "Create courses", icon: FaChartLine },
	{ label: "Growth Rate", value: "0%", delta: "Track progress", icon: FaArrowUp },
];

const EMPTY_COURSES = [];

export default function Revenue() {
	const { user } = useSelector((state) => state.profile);
	const { token } = useSelector((state) => state.auth);
	const [stats, setStats] = useState(EMPTY_STATS);
	const [courses, setCourses] = useState(EMPTY_COURSES);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (user && token) {
			loadRevenueData();
		}
	}, [user, token]);

	const loadRevenueData = async () => {
		try {
			setLoading(true);
			const data = await DashboardRealTime.initialize(token, 'Instructor');
			
			if (data && data.realTimeStats) {
				const realStats = [
					{ 
						label: "Total Revenue", 
						value: data.realTimeStats.totalRevenue > 0 ? `₹${(data.realTimeStats.totalRevenue / 1000).toFixed(0)}K` : "₹0", 
						delta: data.realTimeStats.totalRevenue > 0 ? "Great progress!" : "Start earning",
						icon: FaRupeeSign
					},
					{ 
						label: "Total Students", 
						value: data.realTimeStats.totalStudents?.toString() || "0", 
						delta: data.realTimeStats.totalStudents > 0 ? "Enrolled students" : "No students yet",
						icon: FaUsers
					},
					{ 
						label: "Avg per Course", 
						value: data.realTimeStats.totalCourses > 0 ? `₹${Math.round(data.realTimeStats.totalRevenue / data.realTimeStats.totalCourses)}` : "₹0", 
						delta: data.realTimeStats.totalCourses > 0 ? "Per course" : "Create courses",
						icon: FaChartLine
					},
					{ 
						label: "Course Rating", 
						value: data.realTimeStats.averageRating > 0 ? data.realTimeStats.averageRating.toFixed(1) : "0.0", 
						delta: data.realTimeStats.averageRating > 0 ? "Average rating" : "Track progress",
						icon: FaArrowUp
					},
				];
				setStats(realStats);
				setCourses(data.courseMetrics || EMPTY_COURSES);
			} else {
				setStats(EMPTY_STATS);
				setCourses(EMPTY_COURSES);
			}
		} catch (error) {
			console.error('Failed to load revenue data:', error);
			setStats(EMPTY_STATS);
			setCourses(EMPTY_COURSES);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center space-x-3">
				<FaRupeeSign className="text-2xl text-yellow-50" />
				<div>
					<h2 className="text-xl font-semibold text-richblack-5">Revenue Dashboard</h2>
					<p className="text-xs text-richblack-300 mt-1">
						{stats.some(s => s.value !== "₹0" && s.value !== "0" && s.value !== "0.0") 
							? "Track earnings & monetization performance"
							: "Your revenue dashboard is ready! Start creating courses to track earnings"}
					</p>
				</div>
			</div>

			{loading ? (
				<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
					{[1,2,3,4].map((i) => (
						<div key={i} className="rounded-lg border border-richblack-700 bg-richblack-800 p-4 animate-pulse">
							<div className="h-3 bg-richblack-600 rounded mb-2"></div>
							<div className="h-6 bg-richblack-600 rounded mb-1"></div>
							<div className="h-3 bg-richblack-600 rounded w-2/3"></div>
						</div>
					))}
				</div>
			) : (
				<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
					{stats.map((s, index) => {
						const IconComponent = s.icon;
						return (
							<div key={s.label} className="rounded-lg border border-richblack-700 bg-richblack-800 p-4 hover:scale-105 transition-transform duration-300">
								<div className="flex items-center justify-between mb-2">
									<p className="text-[11px] uppercase tracking-wide text-richblack-400">{s.label}</p>
									<IconComponent className="text-yellow-50" />
								</div>
								<p className="text-lg font-semibold text-richblack-50">{s.value}</p>
								<p className="text-[11px] mt-1 text-richblack-300">{s.delta}</p>
							</div>
						);
					})}
				</div>
			)}

			<div className="rounded-lg border border-richblack-700 bg-richblack-800 p-5">
				<h3 className="font-semibold text-richblack-5 mb-3 text-sm">Monthly Revenue Trend</h3>
				<div className="h-56 flex items-center justify-center text-[11px] text-richblack-400 border border-dashed border-richblack-600 rounded-md">
					Chart placeholder (Area: Revenue / Bar: Sales)
				</div>
				<p className="mt-2 text-[10px] text-richblack-400">Planned: integrate chart library (Recharts / Chart.js) + backend aggregation endpoint.</p>
			</div>

			<div className="rounded-lg border border-richblack-700 bg-richblack-800 p-5">
				<div className="flex items-center justify-between mb-4">
					<h3 className="font-semibold text-richblack-5 text-sm">Top Performing Courses</h3>
					<button className="text-[10px] text-yellow-50 hover:underline">View all</button>
				</div>
				<div className="space-y-2">
					{courses.slice(0, 3).map((course, index) => (
						<div key={index} className="flex items-center justify-between rounded-md border border-richblack-700 bg-richblack-900/50 p-3 text-xs">
							<div className="flex-1 min-w-0">
								<p className="font-medium text-richblack-50 truncate">{course.courseName || course.title}</p>
								<p className="text-richblack-400 text-[10px]">{course.enrollments || 0} students</p>
							</div>
							<div className="text-right">
								<p className="font-semibold text-richblack-50">₹{(course.revenue || 0).toLocaleString()}</p>
								<p className="text-green-400 text-[10px]">⭐ {course.averageRating ? course.averageRating.toFixed(1) : '0.0'}</p>
							</div>
						</div>
					))}
				</div>
			</div>
			)}

			{/* Top Performing Courses */}
			<div className="rounded-lg border border-richblack-700 bg-richblack-800 p-5">
				<div className="flex items-center justify-between mb-4">
					<h3 className="font-semibold text-richblack-5 text-sm">Top Performing Courses</h3>
					<button className="text-[10px] text-yellow-50 hover:underline">View all</button>
				</div>
				
				{courses.length === 0 ? (
					<div className="text-center py-8">
						<FaChartLine className="text-4xl text-richblack-400 mx-auto mb-4" />
						<p className="text-richblack-300 text-sm">No course performance data yet</p>
						<p className="text-richblack-400 text-xs mt-2">Create and publish courses to see revenue analytics</p>
					</div>
				) : (
					<div className="space-y-2">
						{courses.slice(0, 3).map((course, index) => (
							<div key={index} className="flex items-center justify-between rounded-md border border-richblack-700 bg-richblack-900/50 p-3 text-xs">
								<div className="flex-1 min-w-0">
									<p className="font-medium text-richblack-50 truncate">{course.courseName || course.title}</p>
									<p className="text-richblack-400 text-[10px]">{course.enrollments || 0} students</p>
								</div>
								<div className="text-right">
									<p className="font-semibold text-richblack-50">₹{(course.revenue || 0).toLocaleString()}</p>
									<p className="text-green-400 text-[10px]">⭐ {course.averageRating ? course.averageRating.toFixed(1) : '0.0'}</p>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			<div className="rounded-lg border border-richblack-700 bg-richblack-800 p-5">
				<h3 className="font-semibold text-richblack-5 mb-4 text-sm">Revenue Insights</h3>
				{stats.some(s => s.value !== "₹0" && s.value !== "0" && s.value !== "0.0") ? (
					<div className="space-y-3 text-sm text-richblack-300">
						<p>📊 Your revenue is growing! Keep creating quality content to increase earnings.</p>
						<p>💡 <strong>Tip:</strong> Engage with students to improve course ratings and attract more enrollments.</p>
						<p>🎯 <strong>Next:</strong> Consider creating advanced courses for higher pricing.</p>
					</div>
				) : (
					<div className="space-y-3 text-sm text-richblack-300">
						<p>💰 Your revenue dashboard is ready! Start creating courses to track earnings.</p>
						<p>💡 <strong>Getting Started:</strong> Create high-quality courses that provide real value to students.</p>
						<p>🎯 <strong>Goal:</strong> Focus on student satisfaction to build a sustainable income stream.</p>
					</div>
				)}
			</div>
		</div>
	);
}

