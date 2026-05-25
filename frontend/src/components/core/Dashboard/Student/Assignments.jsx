import React, { useState } from "react";
import { FaCalendarAlt, FaClock, FaCheckCircle, FaExclamationTriangle, FaPlay, FaFileAlt, FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";

const assignments = [
	{
		id: 1,
		title: "JavaScript Fundamentals Quiz",
		type: "quiz",
		course: "Web Development Bootcamp",
		dueDate: "2024-01-15",
		dueTime: "14:00",
		status: "pending",
		points: 100,
		duration: "30 minutes",
		attempts: 0,
		maxAttempts: 3,
		difficulty: "Medium",
		topics: ["Variables", "Functions", "Arrays", "Objects"]
	},
	{
		id: 2,
		title: "Portfolio Website Project",
		type: "assignment",
		course: "Web Development Bootcamp",
		dueDate: "2024-01-20",
		dueTime: "23:59",
		status: "in_progress",
		points: 200,
		submitted: false,
		progress: 65,
		difficulty: "Hard",
		requirements: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
	},
	{
		id: 3,
		title: "React Components Quiz",
		type: "quiz",
		course: "React Complete Guide",
		dueDate: "2024-01-18",
		dueTime: "16:00",
		status: "completed",
		points: 80,
		score: 72,
		duration: "25 minutes",
		attempts: 1,
		maxAttempts: 2,
		difficulty: "Medium",
		completedAt: "2024-01-16"
	},
	{
		id: 4,
		title: "Database Design Assignment",
		type: "assignment",
		course: "Backend Development",
		dueDate: "2024-01-25",
		dueTime: "18:00",
		status: "overdue",
		points: 150,
		submitted: false,
		difficulty: "Hard",
		requirements: ["SQL", "ERD", "Normalization"]
	},
	{
		id: 5,
		title: "CSS Flexbox Practice",
		type: "quiz",
		course: "Web Development Bootcamp",
		dueDate: "2024-01-22",
		dueTime: "12:00",
		status: "pending",
		points: 60,
		duration: "20 minutes",
		attempts: 0,
		maxAttempts: 3,
		difficulty: "Easy"
	}
];

export default function Assignments() {
	const [filter, setFilter] = useState('all');
	const [sortBy, setSortBy] = useState('dueDate');

	const getStatusColor = (status) => {
		switch (status) {
			case 'completed': return 'text-green-400 bg-green-400/10 border-green-400/20';
			case 'in_progress': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
			case 'overdue': return 'text-red-400 bg-red-400/10 border-red-400/20';
			default: return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
		}
	};

	const getDifficultyColor = (difficulty) => {
		switch (difficulty) {
			case 'Easy': return 'text-green-400';
			case 'Medium': return 'text-yellow-400';
			case 'Hard': return 'text-red-400';
			default: return 'text-gray-400';
		}
	};

	const getTimeRemaining = (dueDate, dueTime) => {
		const now = new Date();
		const due = new Date(`${dueDate}T${dueTime}`);
		const diff = due - now;
		
		if (diff < 0) return 'Overdue';
		
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		
		if (days > 0) return `${days}d ${hours}h remaining`;
		if (hours > 0) return `${hours}h remaining`;
		return 'Due soon';
	};

	const filteredAssignments = assignments
		.filter(assignment => filter === 'all' || assignment.status === filter)
		.sort((a, b) => {
			if (sortBy === 'dueDate') {
				return new Date(`${a.dueDate}T${a.dueTime}`) - new Date(`${b.dueDate}T${b.dueTime}`);
			}
			return a[sortBy] - b[sortBy];
		});

	const stats = {
		total: assignments.length,
		completed: assignments.filter(a => a.status === 'completed').length,
		pending: assignments.filter(a => a.status === 'pending').length,
		overdue: assignments.filter(a => a.status === 'overdue').length,
		avgScore: Math.round(assignments.filter(a => a.score).reduce((acc, a) => acc + a.score, 0) / assignments.filter(a => a.score).length) || 0
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-bold text-richblack-5 flex items-center space-x-2">
						<FaFileAlt className="text-yellow-50" />
						<span>Assignments & Quizzes</span>
					</h2>
					<p className="text-richblack-300 mt-1">Track your assignments, quizzes, and deadlines</p>
				</div>
				<Link
					to="/dashboard/calendar"
					className="flex items-center space-x-2 bg-yellow-50 text-richblack-900 px-4 py-2 rounded-lg hover:bg-yellow-100 transition-colors"
				>
					<FaCalendarAlt className="w-4 h-4" />
					<span>View Calendar</span>
				</Link>
			</div>

			{/* Stats Overview */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
				<div className="bg-richblack-800 rounded-lg p-4 border border-richblack-700">
					<div className="text-2xl font-bold text-richblack-5">{stats.total}</div>
					<div className="text-sm text-richblack-300">Total Tasks</div>
				</div>
				<div className="bg-richblack-800 rounded-lg p-4 border border-green-500/20">
					<div className="text-2xl font-bold text-green-400">{stats.completed}</div>
					<div className="text-sm text-richblack-300">Completed</div>
				</div>
				<div className="bg-richblack-800 rounded-lg p-4 border border-blue-500/20">
					<div className="text-2xl font-bold text-blue-400">{stats.pending}</div>
					<div className="text-sm text-richblack-300">Pending</div>
				</div>
				<div className="bg-richblack-800 rounded-lg p-4 border border-red-500/20">
					<div className="text-2xl font-bold text-red-400">{stats.overdue}</div>
					<div className="text-sm text-richblack-300">Overdue</div>
				</div>
				<div className="bg-richblack-800 rounded-lg p-4 border border-yellow-500/20">
					<div className="text-2xl font-bold text-yellow-400">{stats.avgScore}%</div>
					<div className="text-sm text-richblack-300">Avg Score</div>
				</div>
			</div>

			{/* Filters and Sort */}
			<div className="flex flex-wrap gap-4 items-center justify-between bg-richblack-800 p-4 rounded-lg border border-richblack-700">
				<div className="flex flex-wrap gap-2">
					{['all', 'pending', 'in_progress', 'completed', 'overdue'].map((status) => (
						<button
							key={status}
							onClick={() => setFilter(status)}
							className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
								filter === status
									? 'bg-yellow-50 text-richblack-900'
									: 'bg-richblack-700 text-richblack-200 hover:bg-richblack-600'
							}`}
						>
							{status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
						</button>
					))}
				</div>
				<select
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
					className="bg-richblack-700 text-richblack-200 px-3 py-2 rounded-lg text-sm border border-richblack-600 focus:border-yellow-50 outline-none"
				>
					<option value="dueDate">Sort by Due Date</option>
					<option value="points">Sort by Points</option>
					<option value="difficulty">Sort by Difficulty</option>
				</select>
			</div>

			{/* Assignments List */}
			<div className="space-y-4">
				{filteredAssignments.map((assignment) => (
					<div key={assignment.id} className="bg-richblack-800 rounded-xl p-6 border border-richblack-700 hover:border-richblack-600 transition-all duration-300">
						<div className="flex items-start justify-between">
							<div className="flex-1">
								<div className="flex items-center space-x-3 mb-2">
									<div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(assignment.status)}`}>
										{assignment.status.replace('_', ' ').toUpperCase()}
									</div>
									<span className="text-xs text-richblack-400">{assignment.type.toUpperCase()}</span>
									<span className={`text-xs font-medium ${getDifficultyColor(assignment.difficulty)}`}>
										{assignment.difficulty}
									</span>
								</div>
								<h3 className="text-lg font-semibold text-richblack-5 mb-1">{assignment.title}</h3>
								<p className="text-sm text-richblack-300 mb-3">{assignment.course}</p>
								
								<div className="flex flex-wrap gap-4 text-sm text-richblack-400">
									<div className="flex items-center space-x-1">
										<FaCalendarAlt className="w-3 h-3" />
										<span>Due: {new Date(`${assignment.dueDate}T${assignment.dueTime}`).toLocaleDateString()} at {assignment.dueTime}</span>
									</div>
									<div className="flex items-center space-x-1">
										<FaClock className="w-3 h-3" />
										<span>{getTimeRemaining(assignment.dueDate, assignment.dueTime)}</span>
									</div>
									<div className="flex items-center space-x-1">
										<FaChartBar className="w-3 h-3" />
										<span>{assignment.points} points</span>
									</div>
									{assignment.duration && (
										<div className="flex items-center space-x-1">
											<FaClock className="w-3 h-3" />
											<span>{assignment.duration}</span>
										</div>
									)}
								</div>

								{/* Progress Bar for Assignments */}
								{assignment.type === 'assignment' && assignment.progress && (
									<div className="mt-4">
										<div className="flex justify-between text-xs text-richblack-300 mb-1">
											<span>Progress</span>
											<span>{assignment.progress}%</span>
										</div>
										<div className="w-full bg-richblack-700 rounded-full h-2">
											<div
												className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-300"
												style={{ width: `${assignment.progress}%` }}
											></div>
										</div>
									</div>
								)}

								{/* Score Display for Completed */}
								{assignment.status === 'completed' && assignment.score && (
									<div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
										<div className="flex items-center justify-between">
											<span className="text-sm text-green-400 font-medium">Score: {assignment.score}/{assignment.points}</span>
											<span className="text-sm text-green-400">{Math.round((assignment.score / assignment.points) * 100)}%</span>
										</div>
										<div className="text-xs text-richblack-400 mt-1">Completed on {new Date(assignment.completedAt).toLocaleDateString()}</div>
									</div>
								)}
							</div>

							{/* Action Buttons */}
							<div className="flex flex-col space-y-2">
								{assignment.status === 'pending' && (
									<button className="flex items-center justify-center space-x-2 bg-yellow-50 text-richblack-900 px-4 py-2 rounded-lg hover:bg-yellow-100 transition-colors font-medium">
										<FaPlay className="w-4 h-4" />
										<span>{assignment.type === 'quiz' ? 'Start Quiz' : 'Start Assignment'}</span>
									</button>
								)}
								{assignment.status === 'in_progress' && (
									<button className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
										<FaPlay className="w-4 h-4" />
										<span>Continue</span>
									</button>
								)}
								{assignment.status === 'completed' && (
									<button className="flex items-center justify-center space-x-2 bg-richblack-700 text-richblack-200 px-4 py-2 rounded-lg hover:bg-richblack-600 transition-colors font-medium">
										<FaCheckCircle className="w-4 h-4" />
										<span>View Results</span>
									</button>
								)}
								{assignment.status === 'overdue' && (
									<button className="flex items-center justify-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">
										<FaExclamationTriangle className="w-4 h-4" />
										<span>Submit Late</span>
									</button>
								)}
								
								{/* Attempts Info for Quizzes */}
								{assignment.type === 'quiz' && assignment.maxAttempts && (
									<div className="text-xs text-richblack-400 text-center">
										Attempts: {assignment.attempts}/{assignment.maxAttempts}
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{filteredAssignments.length === 0 && (
				<div className="text-center py-12">
					<div className="text-6xl mb-4">📝</div>
					<h3 className="text-lg font-semibold text-richblack-5 mb-2">No assignments found</h3>
					<p className="text-richblack-300">Try adjusting your filters or check back later for new assignments.</p>
				</div>
			)}
		</div>
	);
}
