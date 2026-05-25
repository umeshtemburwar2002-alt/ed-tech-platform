import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Students = () => {
  const { user } = useSelector((state) => state.profile);
  const isLoggedIn = !!user;
  const userRole = user?.accountType?.toLowerCase() || 'guest';

  const stats = [
    { label: 'Total Students', value: '150K+', icon: 'fa-users', color: 'text-blue-600' },
    { label: 'Active Learners', value: '45K+', icon: 'fa-user-clock', color: 'text-green-600' },
    { label: 'Courses Completed', value: '85K+', icon: 'fa-check-double', color: 'text-indigo-600' },
    { label: 'Certificates Issued', value: '60K+', icon: 'fa-certificate', color: 'text-yellow-600' }
  ];

  const renderGuestStudents = () => (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto px-6 py-12">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-extrabold text-white">
          Our <span className="text-gradient">Amazing Students</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-slate-400">
          From beginners to industry experts, witness the incredible transformation of 150,000+ learners worldwide.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Link to="/signup" className="btn-primary py-4 px-10 text-lg">Start Your Journey</Link>
        </motion.div>
      </section>

      {/* Platform Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {stats.map((stat, idx) => (
          <motion.div key={idx} whileHover={{ y: -5 }} className="glass-dark p-8 rounded-[2rem] text-center space-y-3 border border-white/5">
            <div className={`text-3xl ${stat.color}`}>
              <i className={`fas ${stat.icon}`}></i>
            </div>
            <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
            <p className="text-slate-400 font-medium text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Student Categories */}
      <section className="space-y-12 px-6">
        <h2 className="text-3xl font-bold text-white text-center">Student Community Overview</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { category: 'New Learners', count: '5.2K', growth: '+12%', icon: 'fa-seedling' },
            { category: 'Active Students', count: '45K', growth: '+8%', icon: 'fa-fire' },
            { category: 'Top Performers', count: '1.5K', growth: '+5%', icon: 'fa-trophy' },
            { category: 'Certified', count: '60K', growth: '+15%', icon: 'fa-award' }
          ].map((cat, idx) => (
            <div key={idx} className="glass-dark p-6 rounded-3xl border-l-4 border-blue-600 border-white/5">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-white/5 text-blue-400 rounded-xl flex items-center justify-center">
                  <i className={`fas ${cat.icon}`}></i>
                </div>
                <span className="text-green-500 text-xs font-bold">{cat.growth}</span>
              </div>
              <h4 className="text-slate-500 text-xs font-bold uppercase tracking-widest">{cat.category}</h4>
              <p className="text-2xl font-bold text-white">{cat.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories */}
      <section className="space-y-12 px-6 bg-white/5 py-20 rounded-[4rem] border border-white/10">
        <h2 className="text-3xl font-bold text-white text-center">Inspirational Success Stories</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: 'Arjun Reddy', course: 'Web Development', role: 'SDE at Amazon', img: 'https://i.pravatar.cc/150?u=arjun', text: 'I never thought I could switch from Mechanical to IT. This platform made it possible.' },
            { name: 'Priya Das', course: 'Data Science', role: 'Data Analyst at Google', img: 'https://i.pravatar.cc/150?u=priya', text: 'The projects are identical to what I do now at my job. Truly practical learning.' },
            { name: 'Rahul Verma', course: 'Mobile Apps', role: 'Startup Founder', img: 'https://i.pravatar.cc/150?u=rahul', text: 'Built my own app during the course and launched it on Play Store!' }
          ].map((story, idx) => (
            <div key={idx} className="glass-dark p-8 rounded-[2.5rem] space-y-6 hover:shadow-2xl transition-all duration-500 group border border-white/5">
              <div className="flex items-center gap-4">
                <img src={story.img} alt={story.name} className="w-16 h-16 rounded-full border-2 border-white/10 group-hover:scale-110 transition-all" />
                <div>
                  <h4 className="font-bold text-white">{story.name}</h4>
                  <p className="text-xs text-blue-400 font-bold">{story.course}</p>
                </div>
              </div>
              <p className="text-slate-400 italic">"{story.text}"</p>
              <div className="pt-4 border-t border-white/5">
                <span className="text-xs font-bold text-slate-500 uppercase">Achievement</span>
                <p className="text-white font-bold">{story.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Learning Paths */}
      <section className="space-y-12 px-6">
        <h2 className="text-3xl font-bold text-white text-center">Popular Learning Paths</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Web Development', students: '45K+', level: 'Beginner', duration: '6 Months', skills: 'React, Node, SQL' },
            { title: 'Data Science', students: '32K+', level: 'Intermediate', duration: '8 Months', skills: 'Python, ML, AI' },
            { title: 'Mobile Dev', students: '28K+', level: 'Beginner', duration: '5 Months', skills: 'Flutter, Firebase' }
          ].map((path, idx) => (
            <div key={idx} className="glass-dark p-8 rounded-[2.5rem] space-y-6 hover:bg-blue-600 group transition-all duration-500 border border-white/5">
              <h3 className="text-2xl font-bold text-white group-hover:text-white transition-colors">{path.title}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-400 group-hover:text-blue-100 transition-colors">
                  <span>Students</span> <span className="font-bold text-white group-hover:text-white">{path.students}</span>
                </div>
                <div className="flex justify-between text-slate-400 group-hover:text-blue-100 transition-colors">
                  <span>Level</span> <span className="font-bold text-white group-hover:text-white">{path.level}</span>
                </div>
                <div className="flex justify-between text-slate-400 group-hover:text-blue-100 transition-colors">
                  <span>Duration</span> <span className="font-bold text-white group-hover:text-white">{path.duration}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-4">
                {path.skills.split(', ').map((skill, sIdx) => (
                  <span key={sIdx} className="bg-white/5 text-blue-400 text-[10px] font-bold px-3 py-1 rounded-full group-hover:bg-white/20 group-hover:text-white transition-all border border-white/10">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="glass-dark rounded-[3rem] p-12 md:p-20 text-center space-y-8 text-white border border-white/5">
        <h2 className="text-4xl font-bold">Join 150,000+ Learners Today</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">Master the skills that matter. Start your journey with the world's most advanced learning platform.</p>
        <div className="flex justify-center gap-4">
          <Link to="/signup" className="btn-primary">Start Learning Now</Link>
          <Link to="/all-courses" className="bg-white/5 hover:bg-white/10 text-white px-8 py-3 rounded-full font-bold transition-all border border-white/10">Browse All Courses</Link>
        </div>
      </section>
    </div>
  );

  const renderStudentView = () => (
    <div className="space-y-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-10 rounded-[3rem] flex flex-col md:flex-row justify-between items-center gap-8 bg-white">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-slate-900">Welcome back, {user?.firstName}! 👋</h1>
          <p className="text-slate-500">You're on a 5-day learning streak. Keep it up!</p>
          <div className="flex gap-4 pt-4 justify-center md:justify-start">
            <button className="btn-primary px-8">Resume Last Course</button>
            <Link to="/contact" className="btn-secondary">Get Support</Link>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-2xl border border-blue-100 min-w-[100px]">
            <p className="text-2xl font-bold text-blue-600">4</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Enrolled</p>
          </div>
          <div className="text-center p-4 bg-indigo-50 rounded-2xl border border-indigo-100 min-w-[100px]">
            <p className="text-2xl font-bold text-indigo-600">2</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Certificates</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-bold text-slate-900">Learning Dashboard</h2>
          <div className="space-y-6">
            {[
              { title: 'Full Stack Web Development', progress: 65, lastActive: '2 hours ago' },
              { title: 'Python for Data Science', progress: 30, lastActive: 'Yesterday' }
            ].map((course, idx) => (
              <div key={idx} className="glass p-8 rounded-[2rem] space-y-6 hover:shadow-xl transition-all">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-slate-900">{course.title}</h3>
                  <span className="text-xs font-bold text-blue-600">{course.progress}% Completed</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${course.progress}%` }} transition={{ duration: 1 }} className="bg-blue-600 h-full rounded-full"></motion.div>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Last active: {course.lastActive}</span>
                  <button className="text-blue-600 font-bold hover:underline">Continue Learning <i className="fas fa-arrow-right ml-1"></i></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-slate-900">Your Achievements</h2>
          <div className="glass p-8 rounded-[2.5rem] space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recent Badges</p>
              <div className="flex gap-3">
                <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xl shadow-sm" title="Top Performer">
                  <i className="fas fa-star"></i>
                </div>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl shadow-sm" title="Active Learner">
                  <i className="fas fa-bolt"></i>
                </div>
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl shadow-sm" title="Fast Learner">
                  <i className="fas fa-rocket"></i>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Performance</p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 font-medium">Quiz Scores</span>
                  <span className="font-bold text-slate-900">92%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 font-medium">Attendance</span>
                  <span className="font-bold text-slate-900">98%</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase mb-4">Recommended for you</p>
              <div className="p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-all cursor-pointer">
                <p className="text-xs font-bold text-blue-600 mb-1">Based on Activity</p>
                <h4 className="text-sm font-bold text-slate-900">Advanced React Design Patterns</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeacherView = () => (
    <div className="space-y-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-10 rounded-[3rem] flex flex-col md:flex-row justify-between items-center gap-8 bg-slate-900 text-white">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-4xl font-bold">Welcome, Instructor {user?.firstName}! 🎓</h1>
          <p className="text-slate-400">Your teaching impact is growing. 120 new students joined today.</p>
          <div className="flex gap-4 pt-4 justify-center md:justify-start">
            <button className="btn-primary">View Full Analytics</button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-bold transition-all">Manage Students</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-6 bg-white/5 rounded-[2rem] border border-white/10 min-w-[140px]">
            <p className="text-3xl font-bold text-blue-400">12.5K</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Students</p>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-[2rem] border border-white/10 min-w-[140px]">
            <p className="text-3xl font-bold text-green-400">82%</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Completion Rate</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-slate-900">Student Progress Overview</h2>
          <div className="space-y-6">
            {[
              { title: 'Mastering JavaScript ES6', students: 850, progress: 78 },
              { title: 'Node.js Backend Deep Dive', students: 420, progress: 62 }
            ].map((course, idx) => (
              <div key={idx} className="glass p-8 rounded-[2rem] space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-900">{course.title}</h3>
                  <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-bold">{course.students} Students</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Average Completion</span>
                    <span className="font-bold text-slate-900">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${course.progress}%` }} transition={{ duration: 1 }} className="bg-green-500 h-full rounded-full"></motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-slate-900">Top Performing Students</h2>
          <div className="glass p-8 rounded-[2.5rem] space-y-6">
            {[
              { name: 'Alice Johnson', score: '98%', courses: 5, img: 'https://i.pravatar.cc/150?u=alice' },
              { name: 'David Smith', score: '96%', courses: 4, img: 'https://i.pravatar.cc/150?u=david' },
              { name: 'Emma Wilson', score: '95%', courses: 6, img: 'https://i.pravatar.cc/150?u=emma' }
            ].map((student, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <img src={student.img} alt={student.name} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{student.name}</h4>
                    <p className="text-xs text-slate-400">{student.courses} Courses Completed</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-blue-600">{student.score}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Avg Score</p>
                </div>
              </div>
            ))}
            <button className="w-full py-3 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition-all mt-4">View All Students</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#000814] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {!isLoggedIn && renderGuestStudents()}
          {isLoggedIn && userRole === 'student' && renderStudentView()}
          {isLoggedIn && userRole === 'instructor' && renderTeacherView()}
        </motion.div>
      </div>
    </div>
  );
};

export default Students;
