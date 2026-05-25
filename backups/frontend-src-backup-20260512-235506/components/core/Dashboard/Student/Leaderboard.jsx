import React, { useState } from "react";
import { FaTrophy, FaMedal, FaFire, FaStar, FaChartLine, FaUsers, FaCrown } from "react-icons/fa";

const leaderboardData = [
	{
		id: 1,
		rank: 1,
		name: "Alex Chen",
		avatar: "/api/placeholder/40/40",
		xp: 15420,
		level: 28,
		streak: 45,
		badges: 12,
		coursesCompleted: 8,
		change: "+2",
		specialty: "Full Stack Development"
	},
	{
		id: 2,
		rank: 2,
		name: "Sarah Johnson",
		avatar: "/api/placeholder/40/40",
		xp: 14890,
		level: 27,
		streak: 32,
		badges: 10,
		coursesCompleted: 7,
		change: "-1",
		specialty: "Data Science"
	},
	{
		id: 3,
		rank: 3,
		name: "Mike Rodriguez",
		avatar: "/api/placeholder/40/40",
		xp: 14250,
		level: 26,
		streak: 28,
		badges: 9,
		coursesCompleted: 6,
		change: "+1",
		specialty: "Machine Learning"
	},
	{
		id: 4,
		rank: 4,
		name: "Emma Wilson",
		avatar: "/api/placeholder/40/40",
		xp: 13780,
		level: 25,
		streak: 21,
		badges: 8,
		coursesCompleted: 5,
		change: "0",
		specialty: "UI/UX Design"
	},
	{
		id: 5,
		rank: 5,
		name: "David Kim",
		avatar: "/api/placeholder/40/40",
		xp: 13200,
		level: 24,
		streak: 15,
		badges: 7,
		coursesCompleted: 5,
		change: "+3",
		specialty: "Backend Development"
	},
	{
		id: 6,
		rank: 6,
		name: "Lisa Zhang",
		avatar: "/api/placeholder/40/40",
		xp: 12850,
		level: 23,
		streak: 12,
		badges: 6,
		coursesCompleted: 4,
		change: "-2",
		specialty: "Mobile Development"
	},
	{
		id: 7,
		rank: 7,
		name: "You",
		avatar: "/api/placeholder/40/40",
		xp: 12450,
		level: 22,
		streak: 18,
		badges: 5,
		coursesCompleted: 4,
		change: "+1",
		specialty: "Web Development",
		isCurrentUser: true
	},
	{
		id: 8,
		rank: 8,
		name: "Tom Brown",
		avatar: "/api/placeholder/40/40",
		xp: 11980,
		level: 21,
		streak: 9,
		badges: 4,
		coursesCompleted: 3,
		change: "-1",
		specialty: "DevOps"
	},
	{
		id: 9,
		rank: 9,
		name: "Anna Davis",
		avatar: "/api/placeholder/40/40",
		xp: 11650,
		level: 20,
		streak: 7,
		badges: 4,
		coursesCompleted: 3,
		change: "0",
		specialty: "Cybersecurity"
	},
	{
		id: 10,
		rank: 10,
		name: "James Lee",
		avatar: "/api/placeholder/40/40",
		xp: 11200,
		level: 19,
		streak: 5,
		badges: 3,
		coursesCompleted: 2,
		change: "+2",
		specialty: "Cloud Computing"
	}
];

const achievements = [
	{
		id: 1,
		title: "First Steps",
		description: "Complete your first lesson",
		icon: "🎯",
		xp: 50,
		earned: true
	},
	{
		id: 2,
		title: "Week Warrior",
		description: "Maintain a 7-day learning streak",
		icon: "🔥",
		xp: 200,
		earned: true
	},
	{
		id: 3,
		title: "Quiz Master",
		description: "Score 90% or higher on 5 quizzes",
		icon: "🧠",
		xp: 300,
		earned: true
	},
	{
		id: 4,
		title: "Course Crusher",
		description: "Complete your first course",
		icon: "🎓",
		xp: 500,
		earned: true
	},
	{
		id: 5,
		title: "Speed Demon",
		description: "Complete 10 lessons in one day",
		icon: "⚡",
		xp: 250,
		earned: true
	},
	{
		id: 6,
		title: "Consistency King",
		description: "Maintain a 30-day learning streak",
		icon: "👑",
		xp: 1000,
		earned: false,
		progress: 60
	},
	{
		id: 7,
		title: "Knowledge Seeker",
		description: "Complete 5 different courses",
		icon: "📚",
		xp: 750,
		earned: false,
		progress: 80
	},
	{
		id: 8,
		title: "Perfect Score",
		description: "Get 100% on 3 assignments",
		icon: "💯",
		xp: 400,
		earned: false,
		progress: 33
	}
];

export default function Leaderboard() {
	const [activeTab, setActiveTab] = useState('leaderboard');
	const [timeFilter, setTimeFilter] = useState('all-time');

	const currentUser = leaderboardData.find(user => user.isCurrentUser);
	const earnedAchievements = achievements.filter(a => a.earned);
	const pendingAchievements = achievements.filter(a => !a.earned);

	const getRankIcon = (rank) => {
		switch (rank) {
			case 1: return <FaCrown className="text-yellow-400" />;
			case 2: return <FaMedal className="text-gray-400" />;
			case 3: return <FaMedal className="text-amber-600" />;
			default: return <span className="text-richblack-400 font-bold">#{rank}</span>;
		}
	};

	const getChangeColor = (change) => {
		if (change.startsWith('+')) return 'text-green-400';
		if (change.startsWith('-')) return 'text-red-400';
		return 'text-richblack-400';
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-bold text-richblack-5 flex items-center space-x-2">
						<FaTrophy className="text-yellow-50" />
						<span>Leaderboard & Achievements</span>
					</h2>
					<p className="text-richblack-300 mt-1">Compete with peers and track your achievements</p>
				</div>
				<div className="flex space-x-2">
					{['leaderboard', 'achievements', 'stats'].map((tab) => (
						<button
							key={tab}
							onClick={() => setActiveTab(tab)}
							className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
								activeTab === tab
									? 'bg-yellow-50 text-richblack-900'
									: 'bg-richblack-700 text-richblack-200 hover:bg-richblack-600'
							}`}
						>
							{tab.charAt(0).toUpperCase() + tab.slice(1)}
						</button>
					))}
				</div>
			</div>

			{/* Your Stats Card */}
			{currentUser && (
				<div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<div className="w-16 h-16 bg-richblack-700 rounded-full flex items-center justify-center">
								<FaUsers className="text-2xl text-richblack-400" />
							</div>
							<div>
								<h3 className="text-xl font-bold text-yellow-50">Your Rank: #{currentUser.rank}</h3>
								<p className="text-richblack-300">Level {currentUser.level} • {currentUser.xp.toLocaleString()} XP</p>
							</div>
						</div>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
							<div className="text-center">
								<div className="text-2xl font-bold text-richblack-5">{currentUser.streak}</div>
								<div className="text-xs text-richblack-400">Day Streak</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-richblack-5">{currentUser.badges}</div>
								<div className="text-xs text-richblack-400">Badges</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-richblack-5">{currentUser.coursesCompleted}</div>
								<div className="text-xs text-richblack-400">Courses</div>
							</div>
							<div className="text-center">
								<div className={`text-2xl font-bold ${getChangeColor(currentUser.change)}`}>
									{currentUser.change !== '0' ? currentUser.change : '—'}
								</div>
								<div className="text-xs text-richblack-400">This Week</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Tab Content */}
			{activeTab === 'leaderboard' && (
				<div className="bg-richblack-800 rounded-xl border border-richblack-700">
					{/* Filters */}
					<div className="p-6 border-b border-richblack-700">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-semibold text-richblack-5">Global Rankings</h3>
							<select
								value={timeFilter}
								onChange={(e) => setTimeFilter(e.target.value)}
								className="bg-richblack-700 text-richblack-200 px-3 py-2 rounded-lg text-sm border border-richblack-600 focus:border-yellow-50 outline-none"
							>
								<option value="all-time">All Time</option>
								<option value="this-month">This Month</option>
								<option value="this-week">This Week</option>
							</select>
						</div>
					</div>

					{/* Leaderboard List */}
					<div className="divide-y divide-richblack-700">
						{leaderboardData.map((user, index) => (
							<div
								key={user.id}
								className={`p-6 hover:bg-richblack-700 transition-colors ${
									user.isCurrentUser ? 'bg-yellow-500/5 border-l-4 border-yellow-500' : ''
								}`}
							>
								<div className="flex items-center space-x-4">
									{/* Rank */}
									<div className="w-12 flex justify-center">
										{getRankIcon(user.rank)}
									</div>

									{/* Avatar & Info */}
									<div className="flex items-center space-x-3 flex-1">
										<div className="w-12 h-12 bg-richblack-600 rounded-full flex items-center justify-center">
											<FaUsers className="text-richblack-400" />
										</div>
										<div>
											<h4 className={`font-semibold ${
												user.isCurrentUser ? 'text-yellow-50' : 'text-richblack-5'
											}`}>
												{user.name}
												{user.isCurrentUser && <span className="ml-2 text-xs bg-yellow-500 text-richblack-900 px-2 py-1 rounded-full">YOU</span>}
											</h4>
											<p className="text-sm text-richblack-400">{user.specialty}</p>
										</div>
									</div>

									{/* Stats */}
									<div className="hidden md:flex items-center space-x-8 text-sm">
										<div className="text-center">
											<div className="font-semibold text-richblack-5">Level {user.level}</div>
											<div className="text-richblack-400">{user.xp.toLocaleString()} XP</div>
										</div>
										<div className="text-center">
											<div className="flex items-center space-x-1">
												<FaFire className="text-orange-500" />
												<span className="font-semibold text-richblack-5">{user.streak}</span>
											</div>
											<div className="text-richblack-400">day streak</div>
										</div>
										<div className="text-center">
											<div className="flex items-center space-x-1">
												<FaTrophy className="text-yellow-500" />
												<span className="font-semibold text-richblack-5">{user.badges}</span>
											</div>
											<div className="text-richblack-400">badges</div>
										</div>
									</div>

									{/* Change */}
									<div className="text-right">
										<div className={`text-sm font-medium ${getChangeColor(user.change)}`}>
											{user.change !== '0' ? user.change : '—'}
										</div>
										<div className="text-xs text-richblack-400">vs last week</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{activeTab === 'achievements' && (
				<div className="space-y-6">
					{/* Earned Achievements */}
					<div className="bg-richblack-800 rounded-xl p-6 border border-richblack-700">
						<h3 className="text-lg font-semibold text-richblack-5 mb-4 flex items-center space-x-2">
							<FaTrophy className="text-yellow-500" />
							<span>Earned Achievements ({earnedAchievements.length})</span>
						</h3>
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							{earnedAchievements.map((achievement) => (
								<div key={achievement.id} className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-4">
									<div className="flex items-center space-x-3">
										<div className="text-3xl">{achievement.icon}</div>
										<div className="flex-1">
											<h4 className="font-semibold text-yellow-50">{achievement.title}</h4>
											<p className="text-sm text-richblack-300">{achievement.description}</p>
											<div className="flex items-center space-x-2 mt-2">
												<FaStar className="text-yellow-500 w-3 h-3" />
												<span className="text-xs text-yellow-400">{achievement.xp} XP</span>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Pending Achievements */}
					<div className="bg-richblack-800 rounded-xl p-6 border border-richblack-700">
						<h3 className="text-lg font-semibold text-richblack-5 mb-4 flex items-center space-x-2">
							<FaChartLine className="text-blue-500" />
							<span>In Progress ({pendingAchievements.length})</span>
						</h3>
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							{pendingAchievements.map((achievement) => (
								<div key={achievement.id} className="bg-richblack-700 border border-richblack-600 rounded-lg p-4">
									<div className="flex items-center space-x-3">
										<div className="text-3xl opacity-50">{achievement.icon}</div>
										<div className="flex-1">
											<h4 className="font-semibold text-richblack-5">{achievement.title}</h4>
											<p className="text-sm text-richblack-400">{achievement.description}</p>
											<div className="flex items-center space-x-2 mt-2">
												<FaStar className="text-richblack-500 w-3 h-3" />
												<span className="text-xs text-richblack-400">{achievement.xp} XP</span>
											</div>
											{achievement.progress && (
												<div className="mt-3">
													<div className="flex justify-between text-xs text-richblack-400 mb-1">
														<span>Progress</span>
														<span>{achievement.progress}%</span>
													</div>
													<div className="w-full bg-richblack-600 rounded-full h-2">
														<div
															className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-300"
															style={{ width: `${achievement.progress}%` }}
														></div>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			{activeTab === 'stats' && (
				<div className="grid gap-6 md:grid-cols-2">
					{/* XP Breakdown */}
					<div className="bg-richblack-800 rounded-xl p-6 border border-richblack-700">
						<h3 className="text-lg font-semibold text-richblack-5 mb-4">XP Breakdown</h3>
						<div className="space-y-4">
							<div className="flex justify-between items-center p-3 bg-richblack-700 rounded-lg">
								<span className="text-richblack-300">Lessons Completed</span>
								<span className="text-richblack-5 font-semibold">8,450 XP</span>
							</div>
							<div className="flex justify-between items-center p-3 bg-richblack-700 rounded-lg">
								<span className="text-richblack-300">Quizzes Passed</span>
								<span className="text-richblack-5 font-semibold">2,100 XP</span>
							</div>
							<div className="flex justify-between items-center p-3 bg-richblack-700 rounded-lg">
								<span className="text-richblack-300">Assignments</span>
								<span className="text-richblack-5 font-semibold">1,200 XP</span>
							</div>
							<div className="flex justify-between items-center p-3 bg-richblack-700 rounded-lg">
								<span className="text-richblack-300">Achievements</span>
								<span className="text-richblack-5 font-semibold">700 XP</span>
							</div>
							<div className="border-t border-richblack-600 pt-3">
								<div className="flex justify-between items-center">
									<span className="text-richblack-200 font-medium">Total XP</span>
									<span className="text-yellow-400 font-bold text-lg">12,450 XP</span>
								</div>
							</div>
						</div>
					</div>

					{/* Level Progress */}
					<div className="bg-richblack-800 rounded-xl p-6 border border-richblack-700">
						<h3 className="text-lg font-semibold text-richblack-5 mb-4">Level Progress</h3>
						<div className="text-center mb-6">
							<div className="text-4xl font-bold text-yellow-50 mb-2">Level 22</div>
							<div className="text-richblack-300">Web Development Specialist</div>
						</div>
						<div className="space-y-4">
							<div>
								<div className="flex justify-between text-sm text-richblack-300 mb-2">
									<span>Progress to Level 23</span>
									<span>12,450 / 13,000 XP</span>
								</div>
								<div className="w-full bg-richblack-700 rounded-full h-3">
									<div
										className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-1000"
										style={{ width: '95.8%' }}
									></div>
								</div>
								<div className="text-center text-sm text-richblack-400 mt-2">
									550 XP needed for next level
								</div>
							</div>
							<div className="bg-richblack-700 rounded-lg p-4">
								<h4 className="font-medium text-richblack-5 mb-2">Next Level Rewards</h4>
								<ul className="text-sm text-richblack-300 space-y-1">
									<li>• Unlock "Advanced Learner" badge</li>
									<li>• Access to exclusive content</li>
									<li>• Priority support</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

