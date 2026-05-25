import React from 'react';
import { Clock, Award, TrendingUp, Calendar, Activity } from 'lucide-react';
import { GlassCard, StatCard, TabBar } from '../../components/dashboard/Common';
import { BarChart, Bar, AreaChart, Area, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WATCH_TIME_DATA = [
  { day: 'Mon', hours: 1.5 },
  { day: 'Tue', hours: 2.8 },
  { day: 'Wed', hours: 1.2 },
  { day: 'Thu', hours: 3.5 },
  { day: 'Fri', hours: 2.0 },
  { day: 'Sat', hours: 4.2 },
  { day: 'Sun', hours: 3.0 }
];

const COMPLETION_DATA = [
  { name: 'Completed', value: 68 },
  { name: 'In Progress', value: 22 },
  { name: 'Not Started', value: 10 }
];

const QUIZ_SCORE_DATA = [
  { week: 'Week 1', score: 75 },
  { week: 'Week 2', score: 82 },
  { week: 'Week 3', score: 78 },
  { week: 'Week 4', score: 88 },
  { week: 'Week 5', score: 92 }
];

const TIME_OF_DAY_DATA = [
  { hour: '6AM', count: 10 },
  { hour: '9AM', count: 30 },
  { hour: '12PM', count: 45 },
  { hour: '3PM', count: 60 },
  { hour: '6PM', count: 80 },
  { hour: '9PM', count: 70 },
  { hour: '12AM', count: 25 }
];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899'];

const AnalyticsPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Learning Analytics</h2>
          <p className="text-gray-400">Track your progress, watch time, and quiz scores</p>
        </div>
        <TabBar tabs={['Weekly', 'Monthly', 'Yearly']} active="Weekly" onChange={() => {}} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Clock} label="Total Watch Time" value="47h 30m" trend="+8h this week" color="indigo" />
        <StatCard icon={Award} label="Courses Completed" value="2" trend="1 in progress" color="emerald" />
        <StatCard icon={TrendingUp} label="Avg Quiz Score" value="87%" trend="+5% this month" color="violet" />
        <StatCard icon={Calendar} label="Days Active" value="23" trend="28 day streak" color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard className="p-6">
          <h3 className="text-lg font-bold text-white mb-6">Total Watch Time (Weekly)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={WATCH_TIME_DATA}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{ color: '#fff' }} />
              <Area type="monotone" dataKey="hours" stroke="#6366f1" fillOpacity={1} fill="url(#colorHours)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-bold text-white mb-6">Course Completion</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={COMPLETION_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {COMPLETION_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{ color: '#fff' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-bold text-white mb-6">Quiz Score Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={QUIZ_SCORE_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{ color: '#fff' }} />
              <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-bold text-white mb-6">Most Active Learning Hours</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={TIME_OF_DAY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="hour" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{ color: '#fff' }} />
              <Bar dataKey="count" fill="#ec4899" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
};

export default AnalyticsPage;
