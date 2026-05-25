import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Award, Clock, BookOpen, Download, Share, Zap, QrCode } from 'lucide-react';
import { StatCard, GlassCard, ProgressBar, Modal } from '../../components/dashboard/Common';
import { CERTIFICATES_DATA } from '../../data/student-dashboard-data';

const CertificatesPage = () => {
  const { user } = useSelector((s) => s.profile);

  // ── Robust name resolution (same pattern as Dashboard) ───────────────────
  // full_name → firstName → first_name → 'Student' (never email prefix)
  const fullName =
    user?.full_name?.trim() ||
    [user?.firstName?.trim(), user?.lastName?.trim()].filter(Boolean).join(' ') ||
    [user?.first_name?.trim(), user?.last_name?.trim()].filter(Boolean).join(' ') ||
    'Student';
  const fullNameUpper = fullName.toUpperCase();


  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  const openPreview = (cert) => { setSelectedCert(cert); setPreviewOpen(true); };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={Award} label="Earned" value="2" color="emerald" />
        <StatCard icon={Clock} label="In Progress" value="3" color="amber" />
        <StatCard icon={BookOpen} label="Total Courses" value="6" color="indigo" />
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white">Earned Certificates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CERTIFICATES_DATA.earned.map(cert => (
            <GlassCard key={cert.id} className="group !p-0 overflow-hidden border-0 relative hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1">
              <div className={`h-24 bg-gradient-to-r ${cert.color} p-6 flex items-center gap-4`}>
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30"><Award className="w-7 h-7 text-white" /></div>
                <div><p className="text-[10px] text-white/80 uppercase tracking-[0.3em] font-bold">Certificate of Completion</p><h4 className="text-white font-bold text-lg">{cert.course}</h4></div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-end">
                  <div><p className="text-xs text-gray-400">Awarded to</p><p className="text-lg font-bold text-white capitalize">{fullName}</p></div>
                  <div className="text-right"><p className="text-[10px] text-gray-600 font-bold uppercase">Issued on {cert.date}</p><p className="text-[10px] text-gray-600 font-bold">ID: {cert.certId}</p></div>
                </div>
                <div className="flex gap-2">{cert.skills.map(s => <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 font-bold">{s}</span>)}</div>
                <div className="flex gap-3 pt-4 border-t border-white/5">
                  <button onClick={() => openPreview(cert)} className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-700 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-2"><Download className="w-4 h-4" /> Download PDF</button>
                  <button className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all"><Share className="w-4 h-4" /></button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">In Progress</h3>
        <div className="space-y-3">
          {CERTIFICATES_DATA.inProgress.map(p => (
            <GlassCard key={p.id} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><BookOpen className="w-5 h-5 text-gray-500" /></div>
                <div className="flex-1 max-w-md"><h4 className="text-sm font-bold text-white mb-2">{p.course}</h4><ProgressBar pct={p.progress} size="h-1" /></div>
                <span className="text-xs font-bold text-indigo-400 ml-4">{p.progress}% complete</span>
              </div>
              <button className="text-xs font-bold text-white flex items-center gap-1 hover:text-indigo-400 transition-colors">Finish →</button>
            </GlassCard>
          ))}
        </div>
      </div>

      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)}>
        <div className="bg-white p-12 text-gray-900 text-center relative overflow-hidden">
          <div className="absolute inset-0 border-[20px] border-indigo-50/50" />
          <div className="absolute inset-4 border-2 border-indigo-600/20" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center mb-6 shadow-xl shadow-indigo-200"><Zap className="w-10 h-10 text-white fill-current" /></div>
            <p className="text-[12px] uppercase tracking-[0.5em] font-bold text-indigo-600 mb-2">Certificate of Completion</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-10">This is to certify that</p>
            <h1 className="text-4xl font-bold tracking-widest mb-2">{fullNameUpper}</h1>
            <div className="w-20 h-0.5 bg-indigo-600 mb-10" />
            <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Has successfully completed the course</p>
            <h3 className="text-2xl font-bold text-indigo-600 mb-12">{selectedCert?.course}</h3>
            <div className="grid grid-cols-2 gap-20 w-full px-10 mb-12">
              <div className="border-t border-gray-300 pt-2"><p className="text-[10px] font-bold">COURSE INSTRUCTOR</p><p className="text-xs italic text-gray-500 mt-1">Verma K.</p></div>
              <div className="border-t border-gray-300 pt-2"><p className="text-[10px] font-bold">ACADEMY DIRECTOR</p><p className="text-xs italic text-gray-500 mt-1">EduSpace Global</p></div>
            </div>
            <div className="flex justify-between items-end w-full px-10">
              <div className="text-left text-[10px] text-gray-400"><p>Date: {selectedCert?.date}</p><p>Credential ID: {selectedCert?.certId}</p></div>
              <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-lg border border-gray-200"><QrCode className="w-10 h-10 text-gray-300" /></div>
            </div>
          </div>
        </div>
        <div className="p-6 flex gap-4 bg-gray-900">
          <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-500/20">Download PDF</button>
          <button onClick={() => setPreviewOpen(false)} className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 font-bold">Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default CertificatesPage;
