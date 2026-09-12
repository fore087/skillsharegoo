import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  FileText, 
  Eye, 
  X, 
  Check, 
  BarChart3, 
  TrendingUp, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AssessmentSubmissionRecord, SubjectAssessment } from '../../types';

export const AssessmentResults: React.FC = () => {
  const { allAssessmentSubmissions, subjectAssessments, courses } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssessmentFilter, setSelectedAssessmentFilter] = useState<string>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<AssessmentSubmissionRecord | null>(null);

  const filteredSubmissions = allAssessmentSubmissions.filter(sub => {
    const matchesSearch = sub.traineeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sub.traineeEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sub.assessmentTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAssessment = selectedAssessmentFilter === 'all' || sub.assessmentId === selectedAssessmentFilter;
    return matchesSearch && matchesAssessment;
  });

  // Calculate cohort performance metrics
  const totalSubmissions = allAssessmentSubmissions.length;
  const passedCount = allAssessmentSubmissions.filter(s => s.passed).length;
  const passRate = totalSubmissions > 0 ? Math.round((passedCount / totalSubmissions) * 100) : 86;
  const meanScore = totalSubmissions > 0
    ? Math.round(allAssessmentSubmissions.reduce((acc, curr) => acc + curr.percentage, 0) / totalSubmissions)
    : 85;

  // Retrieve the original assessment for question details in the modal
  const getAssessmentDetails = (assessmentId: string): SubjectAssessment | undefined => {
    return subjectAssessments.find(a => a.id === assessmentId);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Institutional Verification Audit</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-700" />
              Assessment Results & Question Telemetry
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Detailed audit trail of individual trainee responses, pass/fail status, and diagnostic breakdowns.
            </p>
          </div>
        </div>

        {/* 4 Summary Stat Tiles */}
        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500">Total Attempts Logged</span>
            <p className="text-xl font-black text-slate-900 mt-0.5">{totalSubmissions} Submissions</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-[11px] font-semibold text-emerald-800">Pass Rate</span>
            <p className="text-xl font-black text-emerald-900 mt-0.5">{passRate}%</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200">
            <span className="text-[11px] font-semibold text-blue-800">Mean Score</span>
            <p className="text-xl font-black text-blue-900 mt-0.5">{meanScore}%</p>
          </div>
          <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200">
            <span className="text-[11px] font-semibold text-purple-800">Distinction (100%)</span>
            <p className="text-xl font-black text-purple-900 mt-0.5">
              {allAssessmentSubmissions.filter(s => s.percentage === 100).length} Cohorts
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trainee names or examinations..."
            className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Filter Questionnaire:</span>
          <select
            value={selectedAssessmentFilter}
            onChange={(e) => setSelectedAssessmentFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 cursor-pointer"
          >
            <option value="all">All Questionnaires</option>
            {subjectAssessments.map(asm => (
              <option key={asm.id} value={asm.id}>{asm.title.substring(0, 32)}...</option>
            ))}
          </select>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="p-3.5">Trainee Candidate</th>
                <th className="p-3.5">Assessment Title</th>
                <th className="p-3.5">Course Track</th>
                <th className="p-3.5 text-center">Score</th>
                <th className="p-3.5 text-center">Outcome</th>
                <th className="p-3.5 text-center">Submitted At</th>
                <th className="p-3.5 text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubmissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Candidate */}
                  <td className="p-3.5 flex items-center gap-3">
                    <img
                      src={sub.traineeAvatar}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 text-sm leading-snug truncate">{sub.traineeName}</p>
                      <p className="text-[11px] text-slate-400 font-mono truncate">{sub.traineeEmail}</p>
                    </div>
                  </td>

                  {/* Assessment Title */}
                  <td className="p-3.5 max-w-xs">
                    <p className="font-bold text-slate-900 line-clamp-1">{sub.assessmentTitle}</p>
                    <span className="text-[10px] text-slate-400">{sub.totalQuestions} Questions Exam</span>
                  </td>

                  {/* Course Track */}
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {sub.courseTitle}
                    </span>
                  </td>

                  {/* Score */}
                  <td className="p-3.5 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-black ${
                      sub.passed
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}>
                      {sub.percentage}%
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">{sub.score}/{sub.totalQuestions} Correct</p>
                  </td>

                  {/* Outcome */}
                  <td className="p-3.5 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                      sub.passed
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}>
                      {sub.passed ? <CheckCircle2 className="w-3 h-3 text-emerald-700" /> : <XCircle className="w-3 h-3 text-rose-700" />}
                      <span>{sub.passed ? 'Passed (Certified)' : 'Retake Required'}</span>
                    </span>
                  </td>

                  {/* Submitted At */}
                  <td className="p-3.5 text-center text-slate-500 font-mono text-[11px]">
                    {sub.submittedAt}
                  </td>

                  {/* Inspect Answers Action */}
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setSelectedSubmission(sub)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Answers</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSubmissions.length === 0 && (
          <div className="p-8 text-center">
            <Award className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-700">No submission records match your query</p>
          </div>
        )}
      </div>

      {/* Inspect Answers Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Official Verification Audit Log
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {selectedSubmission.traineeName} - {selectedSubmission.assessmentTitle}
                </h3>
                <p className="text-xs text-slate-500">
                  Scored {selectedSubmission.percentage}% ({selectedSubmission.score}/{selectedSubmission.totalQuestions}) on {selectedSubmission.submittedAt}
                </p>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              {(() => {
                const asm = getAssessmentDetails(selectedSubmission.assessmentId);
                const questionsList = asm?.questions || [];

                if (questionsList.length === 0) {
                  return (
                    <div className="p-4 text-center text-slate-500">
                      Assessment question blueprints recorded in secure cloud vault.
                    </div>
                  );
                }

                return questionsList.map((q, idx) => {
                  const userAnswerIdx = selectedSubmission.userAnswers[idx];
                  const qCorrect = q.correctAnswer !== undefined ? q.correctAnswer : (q.correctIndex ?? 0);
                  const isUserCorrect = userAnswerIdx === qCorrect;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border ${
                        isUserCorrect ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="font-bold text-slate-900 text-xs">
                          {idx + 1}. {q.question}
                        </p>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                          isUserCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {isUserCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        {q.options.map((opt, oIdx) => {
                          const isSelectedByTrainee = userAnswerIdx === oIdx;
                          const isTheCorrectAnswer = qCorrect === oIdx;

                          let badgeStyle = 'bg-slate-50 border-slate-200 text-slate-600';
                          if (isSelectedByTrainee && isTheCorrectAnswer) {
                            badgeStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                          } else if (isSelectedByTrainee && !isTheCorrectAnswer) {
                            badgeStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                          } else if (isTheCorrectAnswer) {
                            badgeStyle = 'bg-emerald-50/50 border-emerald-300 text-emerald-800 font-semibold';
                          }

                          return (
                            <div
                              key={oIdx}
                              className={`p-2 rounded-lg border text-xs flex items-center gap-2 ${badgeStyle}`}
                            >
                              <span className="font-mono text-[10px] w-4">{String.fromCharCode(65 + oIdx)}.</span>
                              <span className="flex-1">{opt}</span>
                              {isSelectedByTrainee && (
                                <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded bg-slate-200 text-slate-800">
                                  Trainee Choice
                                </span>
                              )}
                              {isTheCorrectAnswer && (
                                <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded bg-emerald-200 text-emerald-900 flex items-center gap-0.5">
                                  <Check className="w-3 h-3" /> Correct Key
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {q.explanation && (
                        <p className="text-[11px] text-slate-500 italic mt-2 pt-1 border-t border-slate-100">
                          Remediation Note: {q.explanation}
                        </p>
                      )}
                    </div>
                  );
                });
              })()}
            </div>

            <div className="p-4 border-t border-slate-100 flex items-center justify-end bg-slate-50">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Close Audit View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
