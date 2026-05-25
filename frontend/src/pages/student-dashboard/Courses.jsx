import React, { useState } from 'react';
import { Search, Bookmark, Star } from 'lucide-react';
import { GlassCard, TabBar, Badge, Avatar, ProgressBar, EmptyState } from '../../components/dashboard/Common';
import { COURSES_DATA } from '../../data/student-dashboard-data';

const CoursesPage = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [bookmarks, setBookmarks] = useState(new Set());

  const filtered = COURSES_DATA.filter(c => {
    const matchesFilter = filter === 'All' || 
      (filter === 'In Progress' && !c.completed) || 
      (filter === 'Completed' && c.completed) ||
      (filter === 'Bookmarked' && bookmarks.has(c.id));
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleBookmark = (id) => {
    const next = new Set(bookmarks);
    if (next.has(id)) next.delete(id); else next.add(id);
    setBookmarks(next);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
        <div className="relative w-full lg:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search your courses..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-white focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
          />
        </div>
        <TabBar tabs={['All', 'In Progress', 'Completed', 'Bookmarked']} active={filter} onChange={setFilter} />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filtered.map((course) => (
            <GlassCard key={course.id} className="!p-0 overflow-hidden group">
              <div className="h-40 relative overflow-hidden">
                <img src={course.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent" />
                <div className="absolute top-4 left-4"><Badge text={course.category} color={course.completed ? 'emerald' : 'indigo'} /></div>
                <button 
                  onClick={() => toggleBookmark(course.id)}
                  className={`absolute top-4 right-4 p-2 backdrop-blur-md rounded-lg border border-white/10 transition-colors ${bookmarks.has(course.id) ? 'bg-amber-500 text-white' : 'bg-black/20 text-white hover:text-amber-400'}`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < Math.floor(course.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} />)}
                  <span className="text-[10px] text-gray-500 font-bold ml-1">{course.rating}</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2 line-clamp-2 h-14 group-hover:text-indigo-400 transition-colors">{course.title}</h4>
                <div className="flex items-center gap-3 mb-6">
                  <Avatar initials={course.instructor.split('. ')[1][0]} size="w-8 h-8" />
                  <span className="text-xs text-gray-400 font-medium">{course.instructor}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    <span>{course.completed ? 'COURSE DONE' : 'PROGRESS'}</span>
                    <span className={course.completed ? 'text-emerald-400' : 'text-white'}>{course.progress}%</span>
                  </div>
                  <ProgressBar pct={course.progress} color={course.completed ? 'from-emerald-500 to-teal-600' : undefined} />
                </div>
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Last accessed: {course.lastAccessed}</span>
                  {course.completed ? (
                    <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 px-4 rounded-xl transition-all active:scale-95">View Certificate</button>
                  ) : (
                    <button className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-xs font-bold py-2 px-4 rounded-xl transition-all active:scale-95">Continue →</button>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <EmptyState icon={Search} title="No courses found" subtitle="We couldn't find any courses matching your search or filters." ctaText="Clear all filters" onCta={() => {setFilter('All'); setSearch('');}} />
      )}
    </div>
  );
};

export default CoursesPage;
