import React, { useState } from 'react';
import { Star, History, CheckCircle } from 'lucide-react';
import { GlassCard, TabBar, Badge, EmptyState } from '../../components/dashboard/Common';
import { FEEDBACK_PENDING, FEEDBACK_HISTORY } from '../../data/student-dashboard-data';

const FeedbackPage = () => {
  const [tab, setTab] = useState('Pending');
  const [ratings, setRatings] = useState({});
  const [hoverStar, setHoverStar] = useState(0);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div><h2 className="text-2xl font-bold text-white">Course Feedback</h2><p className="text-gray-500 text-sm">Help us improve your experience</p></div>
        <TabBar tabs={['Pending', 'History']} active={tab} onChange={setTab} />
      </div>
      {tab === 'Pending' ? (
        <div className="space-y-6">
          {FEEDBACK_PENDING.length > 0 ? FEEDBACK_PENDING.map(course => (
            <GlassCard key={course.id} className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-48 h-28 rounded-2xl overflow-hidden shrink-0"><img src={course.thumbnail} alt="" className="w-full h-full object-cover" /></div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4"><div><h4 className="text-lg font-bold text-white">{course.title}</h4><p className="text-xs text-gray-500 mt-1 uppercase font-bold tracking-widest">Instructor: {course.instructor}</p></div><Badge text="Awaiting Review" color="amber" /></div>
                <div className="flex items-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map(s => (
                    <button key={s} onMouseEnter={() => setHoverStar(s)} onMouseLeave={() => setHoverStar(0)} onClick={() => setRatings({...ratings, [course.id]: {...ratings[course.id], stars: s}})}>
                      <Star className={`w-8 h-8 transition-all ${ (hoverStar || ratings[course.id]?.stars) >= s ? 'text-amber-400 fill-amber-400 scale-110' : 'text-gray-700'}`} />
                    </button>
                  ))}
                </div>
                {ratings[course.id]?.stars > 0 && (
                  <div className="space-y-4 animate-in slide-in-from-top-4">
                    <textarea placeholder="Share your thoughts..." className="w-full bg-gray-900 border border-white/10 rounded-2xl p-4 text-sm text-white focus:ring-2 focus:ring-indigo-500/50 outline-none h-32 resize-none" />
                    <div className="flex justify-end"><button className="bg-indigo-600 text-white font-bold px-8 py-2 rounded-xl active:scale-95 transition-all">Submit Feedback</button></div>
                  </div>
                )}
              </div>
            </GlassCard>
          )) : <EmptyState icon={CheckCircle} title="All caught up!" subtitle="You've reviewed all your courses." />}
        </div>
      ) : (
        <div className="space-y-4">
          {FEEDBACK_HISTORY.map((h, i) => (
            <GlassCard key={i} className="group">
              <div className="flex justify-between items-start mb-3"><div><h4 className="font-bold text-white group-hover:text-indigo-400 transition-colors">{h.course}</h4><p className="text-[10px] text-gray-600 font-bold uppercase mt-1">{h.date}</p></div><div className="flex gap-0.5">{[...Array(5)].map((_, j) => <Star key={j} className={`w-3 h-3 ${j < h.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-700'}`} />)}</div></div>
              <p className="text-sm text-gray-400 italic">"{h.review}"</p>
              <div className="mt-4 text-[10px] font-bold text-gray-500 flex items-center gap-2"><History className="w-3.5 h-3.5" /> {h.helpful} people found this helpful</div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;
