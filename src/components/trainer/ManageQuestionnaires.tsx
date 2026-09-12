import React, { useState } from 'react';
import { 
  FileQuestion, 
  Plus, 
  Trash2, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award, 
  Calendar, 
  Search, 
  Filter, 
  BookOpen, 
  ChevronRight, 
  Eye, 
  X, 
  BarChart2, 
  Check,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SubjectAssessment } from '../../types';

export const ManageQuestionnaires: React.FC = () => {
  const { 
    subjectAssessments, 
    courses, 
    deleteSubjectAssessment, 
    updateSubjectAssessment, 
    setActiveTab, 
    startAssessment,
    allAssessmentSubmissions 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');
  const [previewAssessment, setPreviewAssessment] = useState<SubjectAssessment | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filteredAssessments = subjectAssessments.filter(asm => {
    const matchesSearch = asm.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asm.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          asm.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourseFilter === 'all' || asm.courseId === selectedCourseFilter;
    return matchesSearch && matchesCourse;
  });

  const handleToggleStatus = (asm: SubjectAssessment) => {
    const newStatus = asm.status === 'Active' ? 'Archived' : 'Active';
    updateSubjectAssessment({
      ...asm,
      status: newStatus
    });
  };

  const handleDelete = (id: string) => {
    deleteSubjectAssessment(id);
    setConfirmDeleteId(null);
  };

  // Compute live submissions stats for each questionnaire
  const getStats = (assessmentId: string) => {
    const subs = allAssessmentSubmissions.filter(s => s.assessmentId === assessmentId);
    const count = subs.length;
    const avg = count > 0 
      ? Math.round(subs.reduce((a, b) => a + b.percentage, 0) / count)
      : 84;
    return { count, avg };
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <FileQuestion className="w-6 h-6 text-emerald-700" />
            Manage Questionnaires & Examinations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Oversee active evaluation modules, test trainee examination workflows, and monitor cohort attempts.
          </p>
        </div>

        <button
          id="manage-create-questionnaire-btn"
          onClick={() => setActiveTab('create-questionnaire')}
          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Questionnaire</span>
        </button>
      </div>

      {/* Filters Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questionnaire titles, courses..."
            className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Course:</span>
          <select
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
          >
            <option value="all">All Courses</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.code}: {c.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Questionnaires Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="p-3.5">Assessment Details</th>
                <th className="p-3.5">Course Track</th>
                <th className="p-3.5 text-center">Questions / Duration</th>
                <th className="p-3.5 text-center">Passing Mark</th>
                <th className="p-3.5 text-center">Trainee Attempts</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAssessments.map((asm) => {
                const { count, avg } = getStats(asm.id);
                const isActive = asm.status !== 'Archived';

                return (
                  <tr key={asm.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Title & Description */}
                    <td className="p-3.5 max-w-xs">
                      <p className="font-bold text-slate-900 text-sm leading-snug">{asm.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{asm.description}</p>
                      {asm.deadline && (
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          Deadline: {asm.deadline}
                        </span>
                      )}
                    </td>

                    {/* Course Track */}
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {asm.courseTitle}
                      </span>
                    </td>

                    {/* Questions & Duration */}
                    <td className="p-3.5 text-center">
                      <p className="font-bold text-slate-900">{asm.totalQuestions} Questions</p>
                      <span className="text-[11px] text-slate-500">{asm.durationMinutes} mins</span>
                    </td>

                    {/* Passing Score */}
                    <td className="p-3.5 text-center">
                      <span className="font-bold text-slate-900">{asm.passingScore}%</span>
                    </td>

                    {/* Trainee Attempts & Avg */}
                    <td className="p-3.5 text-center">
                      <p className="font-bold text-slate-900">{count} submissions</p>
                      <span className="text-[11px] text-emerald-700 font-semibold">{avg}% avg score</span>
                    </td>

                    {/* Status */}
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => handleToggleStatus(asm)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                          isActive
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        title="Click to toggle status"
                      >
                        {isActive ? 'Active' : 'Archived'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Preview / Test Quiz */}
                        <button
                          onClick={() => setPreviewAssessment(asm)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 cursor-pointer"
                          title="Preview Questions"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Test Run in Trainee Mode */}
                        <button
                          onClick={() => startAssessment(asm.id)}
                          className="p-1.5 rounded-lg text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50 cursor-pointer"
                          title="Take / Test Questionnaire"
                        >
                          <Play className="w-4 h-4" />
                        </button>

                        {/* View Assessment Results */}
                        <button
                          onClick={() => setActiveTab('assessment-results')}
                          className="p-1.5 rounded-lg text-blue-600 hover:text-blue-800 hover:bg-blue-50 cursor-pointer"
                          title="View Cohort Results"
                        >
                          <BarChart2 className="w-4 h-4" />
                        </button>

                        {/* Delete Questionnaire */}
                        <button
                          onClick={() => setConfirmDeleteId(asm.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                          title="Delete Assessment"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredAssessments.length === 0 && (
          <div className="p-8 text-center">
            <FileQuestion className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-700">No questionnaires match your search filter</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
              <AlertCircle className="w-5 h-5" />
              <span>Confirm Deletion</span>
            </div>
            <p className="text-xs text-slate-600">
              Are you sure you want to delete this questionnaire? Trainees will no longer be able to submit responses.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700 cursor-pointer"
              >
                Delete Questionnaire
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Questions Modal */}
      {previewAssessment && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-slate-200 shadow-xl">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Faculty Preview Mode
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">{previewAssessment.title}</h3>
              </div>
              <button
                onClick={() => setPreviewAssessment(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl text-center">
                <div>
                  <span className="text-slate-400 text-[10px]">Questions</span>
                  <p className="font-bold text-slate-800">{previewAssessment.totalQuestions}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px]">Duration</span>
                  <p className="font-bold text-slate-800">{previewAssessment.durationMinutes} mins</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px]">Passing Score</span>
                  <p className="font-bold text-slate-800">{previewAssessment.passingScore}%</p>
                </div>
              </div>

              <div className="space-y-4">
                {previewAssessment.questions.map((q, idx) => (
                  <div key={q.id} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                    <p className="font-bold text-slate-900">
                      {idx + 1}. {q.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, oIdx) => {
                        const isCorrect = q.correctAnswer === oIdx;
                        return (
                          <div
                            key={oIdx}
                            className={`p-2 rounded-lg border text-xs flex items-center gap-2 ${
                              isCorrect
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                                : 'bg-slate-50 border-slate-200 text-slate-600'
                            }`}
                          >
                            <span className="font-mono text-[10px] w-4">{String.fromCharCode(65 + oIdx)}.</span>
                            <span className="flex-1">{opt}</span>
                            {isCorrect && <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />}
                          </div>
                        );
                      })}
                    </div>
                    {q.explanation && (
                      <p className="text-[11px] text-slate-500 italic pt-1">
                        Explanation: {q.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Live test verifies scoring & certificate grant logic</span>
              <button
                onClick={() => {
                  const id = previewAssessment.id;
                  setPreviewAssessment(null);
                  startAssessment(id);
                }}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Launch Quiz in Trainee Mode</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
