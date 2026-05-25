import React, { useState } from 'react';
import { FileText, CheckCircle, AlertCircle, Upload, Clock, Star, MessageSquare } from 'lucide-react';
import { GlassCard, Badge, TabBar, EmptyState, Modal } from '../../components/dashboard/Common';

const ASSIGNMENTS_DATA = [
  { id: 1, course: 'React.js Mastery', title: 'Build a Todo App with Hooks', status: 'submitted', grade: 92, feedback: 'Excellent use of custom hooks!', dueDate: '2026-05-16', submittedDate: '2026-05-14' },
  { id: 2, course: 'UI/UX Design', title: 'Design a Landing Page', status: 'pending', grade: null, feedback: null, dueDate: '2026-05-18' },
  { id: 3, course: 'Python for Beginners', title: 'Data Analysis Project', status: 'late', grade: null, feedback: null, dueDate: '2026-05-10' },
  { id: 4, course: 'Node.js API Development', title: 'RESTful API Project', status: 'graded', grade: 88, feedback: 'Great work! Add error handling for edge cases.', dueDate: '2026-05-12', submittedDate: '2026-05-11' }
];

const AssignmentsPage = () => {
  const [filter, setFilter] = useState('All');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);

  const filtered = ASSIGNMENTS_DATA.filter(a => {
    if (filter === 'All') return true;
    return a.status === filter.toLowerCase();
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'blue';
      case 'submitted': return 'violet';
      case 'graded': return 'emerald';
      case 'late': return 'red';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return Clock;
      case 'submitted': return FileText;
      case 'graded': return CheckCircle;
      case 'late': return AlertCircle;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Assignments</h2>
          <p className="text-gray-400">Submit your assignments and track your grades</p>
        </div>
        <TabBar tabs={['All', 'Pending', 'Submitted', 'Graded', 'Late']} active={filter} onChange={setFilter} />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {filtered.map((assignment) => {
            const StatusIcon = getStatusIcon(assignment.status);
            return (
              <GlassCard key={assignment.id} className="p-6 hover:border-white/20 transition-all">
                <div className="flex flex-col lg:flex-row gap-6 justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge text={assignment.course} color="indigo" />
                      <Badge text={assignment.status.toUpperCase()} color={getStatusColor(assignment.status)} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{assignment.title}</h3>
                    <p className="text-gray-400 text-sm">Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    {assignment.submittedDate && (
                      <p className="text-gray-500 text-xs mt-1">Submitted: {new Date(assignment.submittedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    )}
                  </div>
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                    {assignment.status === 'graded' && (
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
                          <span className="text-2xl font-bold text-emerald-400">{assignment.grade}%</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">Grade</p>
                          <div className="flex items-center gap-1">
                            {[1,2,3,4,5].map(i => (
                              <Star key={i} className={`w-3 h-3 ${i <= Math.floor(assignment.grade/20) ? 'text-amber-400 fill-amber-400' : 'text-gray-700'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex gap-3">
                      {assignment.status === 'pending' || assignment.status === 'late' ? (
                        <button 
                          onClick={() => { setSelectedAssignment(assignment); setShowSubmissionModal(true); }}
                          className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold text-sm hover:opacity-90 transition-all flex items-center gap-2"
                        >
                          <Upload className="w-4 h-4" /> Submit Assignment
                        </button>
                      ) : (
                        <button 
                          onClick={() => setSelectedAssignment(assignment)}
                          className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all flex items-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4" /> View Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      ) : (
        <EmptyState icon={FileText} title="No assignments" subtitle="You don't have any assignments for the selected filter." />
      )}

      {showSubmissionModal && selectedAssignment && (
        <SubmissionModal assignment={selectedAssignment} onClose={() => setShowSubmissionModal(false)} />
      )}
    </div>
  );
};

const SubmissionModal = ({ assignment, onClose }) => {
  const [submissionText, setSubmissionText] = useState('');
  const [files, setFiles] = useState([]);

  const handleSubmit = () => {
    onClose();
  };

  return (
    <Modal onClose={onClose} title={`Submit: ${assignment.title}`}>
      <div className="space-y-6">
        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
          <p className="text-sm text-indigo-300 font-medium">Course: {assignment.course}</p>
          <p className="text-xs text-gray-500 mt-1">Due: {new Date(assignment.dueDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <div>
          <label className="block text-sm font-bold text-white mb-2">Write your answer (optional)</label>
          <textarea
            value={submissionText}
            onChange={(e) => setSubmissionText(e.target.value)}
            rows={6}
            placeholder="Explain your approach, challenges faced, and learnings..."
            className="w-full bg-gray-900 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-white mb-2">Upload files (optional)</label>
          <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:border-white/20 transition-all cursor-pointer">
            <Upload className="w-10 h-10 text-gray-500" />
            <p className="text-sm text-gray-400">Click or drag files here</p>
            <p className="text-xs text-gray-600">PDF, DOCX, ZIP, JPG, PNG up to 50MB</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all">Cancel</button>
          <button onClick={handleSubmit} className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold text-sm hover:opacity-90 transition-all">Submit Assignment</button>
        </div>
      </div>
    </Modal>
  );
};

export default AssignmentsPage;
