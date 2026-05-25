import React from 'react';
import { Trophy, Medal, Star } from 'lucide-react';
import { GlassCard, Badge } from '../../components/dashboard/Common';

const LEADERBOARD_DATA = [
  { rank: 1, name: 'Aarav Sharma', xp: 5250, courses: 8, avatar: 'https://api.dicebear.com/5.x/initials/svg?seed=AS' },
  { rank: 2, name: 'Riya Patel', xp: 4800, courses: 7, avatar: 'https://api.dicebear.com/5.x/initials/svg?seed=RP' },
  { rank: 3, name: 'Ibrahim Khan', xp: 4500, courses: 9, avatar: 'https://api.dicebear.com/5.x/initials/svg?seed=IK' },
  { rank: 4, name: 'Sophie Williams', xp: 3900, courses: 6, avatar: 'https://api.dicebear.com/5.x/initials/svg?seed=SW' },
  { rank: 5, name: 'Arjun Verma', xp: 3750, courses: 7, avatar: 'https://api.dicebear.com/5.x/initials/svg?seed=AV' },
  { rank: 6, name: 'You', xp: 1250, courses: 6, avatar: 'https://api.dicebear.com/5.x/initials/svg?seed=You', isYou: true }
];

const LeaderboardPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Leaderboard</h2>
          <p className="text-gray-400">Top learners this week based on XP points</p>
        </div>
        <Badge text="Weekly" color="indigo" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LEADERBOARD_DATA.slice(0, 3).map((user, i) => (
          <PodiumCard key={user.rank} user={user} index={i} />
        ))}
      </div>

      <GlassCard className="p-0 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-lg font-bold text-white">Full Rankings</h3>
        </div>
        <div className="divide-y divide-white/5">
          {LEADERBOARD_DATA.map((user) => (
            <div
              key={user.rank}
              className={`p-6 flex items-center gap-6 ${user.isYou ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10' : ''}`}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center">
                {user.rank === 1 ? (
                  <Trophy className="w-6 h-6 text-amber-400" />
                ) : user.rank === 2 ? (
                  <Medal className="w-6 h-6 text-gray-400" />
                ) : user.rank === 3 ? (
                  <Medal className="w-6 h-6 text-orange-600" />
                ) : (
                  <span className="text-xl font-bold text-gray-500">{user.rank}</span>
                )}
              </div>
              <div className="w-14 h-14 rounded-full overflow-hidden border border-white/10">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                  {user.name}
                  {user.isYou && <Badge text="You" color="indigo" />}
                </h4>
                <p className="text-sm text-gray-500">{user.courses} courses completed</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-yellow-400 flex items-center justify-end gap-2">
                  <Star className="w-5 h-5 fill-yellow-400" />
                  {user.xp.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">XP Points</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

const PodiumCard = ({ user, index }) => {
  const colors = ['from-amber-500 to-amber-700', 'from-gray-400 to-gray-600', 'from-orange-500 to-orange-700'];
  const heights = ['h-48', 'h-40', 'h-36'];
  const order = [2, 1, 3];

  return (
    <div className={`flex flex-col items-center order-${order[index]}`}>
      <div className="mb-4 text-center">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl mb-4">
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        </div>
        <h4 className="text-xl font-bold text-white mb-1">{user.name}</h4>
        <p className="text-yellow-400 font-bold text-2xl flex items-center justify-center gap-2">
          <Star className="w-5 h-5 fill-yellow-400" />
          {user.xp.toLocaleString()} XP
        </p>
      </div>
      <div className={`w-full ${heights[index]} rounded-t-3xl bg-gradient-to-t ${colors[index]} flex items-center justify-center`}>
        <div className="text-5xl font-black text-white/90">#{user.rank}</div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
