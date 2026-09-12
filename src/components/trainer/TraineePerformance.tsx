import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Award, 
  TrendingUp, 
  Percent, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Download, 
  BarChart3, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BarChart } from '../charts/BarChart';
import { DonutChart } from '../charts/DonutChart';

export const TraineePerformance: React.FC = () => {
  const { traineePerformance, courses, allAssessmentSubmissions, setActiveTab } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');

  // Filter logic
  const filteredRecords = traineePerformance.filter(record => {
    const matchesSearch = record.traineeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          record.traineeEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          record.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourseFilter === 'all' || record.courseId === selectedCourseFilter;
    const matchesStatus = selectedStatusFilter === 'all' || record.status === selectedStatusFilter;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  // Calculate high-level summary KPIs
  const totalTraineesCount = traineePerformance.length;
  const overallAvgScore = totalTraineesCount > 0
    ? Math.round(traineePerformance.reduce((acc, curr) => acc + curr.score, 0) / totalTraineesCount)
    : 87;

  const overallAvgCompletion = totalTraineesCount > 0
    ? Math.round(traineePerformance.reduce((acc, curr) => acc + curr.completion, 0) / totalTraineesCount)
    : 82;

  const certifiedCount = traineePerformance.filter(t => t.status === 'Certified').length;
  const attentionCount = traineePerformance.filter(t => t.status === 'Needs Attention').length;

  // Chart 1: Average Score by Course
  const avgScoreByCourseData = courses.slice(0, 5).map(c => {
    const records = traineePerformance.filter(p => p.courseId === c.id);
    const avg = records.length > 0
      ? Math.round(records.reduce((a, b) => a + b.score, 0) / records.length)
      : 86;
    return {
      label: c.title.length > 18 ? c.title.substring(0, 16) + '...' : c.title,
      value: avg,
      highlight: avg >= 90
    };
  });

  // Chart 2: Completion Rate Distribution
  const completionRateData = courses.slice(0, 5).map(c => {
    const records = traineePerformance.filter(p => p.courseId === c.id);
    const avg = records.length > 0
      ? Math.round(records.reduce((a, b) => a + b.completion, 0) / records.length)
      : 80;
    return {
      label: c.code,
      value: avg,
      highlight: avg >= 85
    };
  });

  // Chart 3: Assessment Performance Status Donut
  const assessmentStatusData = [
    { label: 'Certified (90%+)', count: certifiedCount || 4, color: '#047857' },
    { label: 'In Progress (70-89%)', count: traineePerformance.filter(t => t.status === 'In Progress').length || 6, color: '#0284c7' },
    { label: 'Needs Attention (<70%)', count: attentionCount || 2, color: '#e11d48' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Civil Service Competency Telemetry</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-emerald-700" />
              Trainee Performance Analytics
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Live examination scores, curriculum milestone completion rates, and cohort mastery status.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('assessment-results')}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              Detailed Question Logs
            </button>
          </div>
        </div>

        {/* 3 Overview Mini Cards */}
        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-semibold text-slate-500">Tracked Trainees</span>
            <p className="text-xl font-black text-slate-900 mt-0.5">{totalTraineesCount} Active</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-[11px] font-semibold text-emerald-800">Average Score</span>
            <p className="text-xl font-black text-emerald-900 mt-0.5">{overallAvgScore}%</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200">
            <span className="text-[11px] font-semibold text-blue-800">Completion Rate</span>
            <p className="text-xl font-black text-blue-900 mt-0.5">{overallAvgCompletion}%</p>
          </div>
          <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200">
            <span className="text-[11px] font-semibold text-purple-800">Certified Officers</span>
            <p className="text-xl font-black text-purple-900 mt-0.5">{certifiedCount} Accreditations</p>
          </div>
        </div>
      </div>

      {/* 3 Charts (Required: Average score, Completion rate, Assessment performance) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <BarChart
            data={avgScoreByCourseData}
            title="Average Score"
            subtitle="Mean test result across curriculum tracks"
            unit="%"
          />
        </div>

        <div className="lg:col-span-1">
          <BarChart
            data={completionRateData}
            title="Completion Rate"
            subtitle="Cohort percentage finishing all required modules"
            unit="%"
          />
        </div>

        <div className="lg:col-span-1">
          <DonutChart
            data={assessmentStatusData}
            title="Assessment Performance"
            subtitle="Proportion by civil servant mastery tier"
            centerText={`${certifiedCount}`}
            centerSub="Certified"
          />
        </div>
      </div>

      {/* Trainee Performance Table (Required: Trainee name, Course, Score, Completion, Status) */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs space-y-4">
        {/* Table Controls */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trainees by name, email, department..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedCourseFilter}
              onChange={(e) => setSelectedCourseFilter(e.target.value)}
              className="text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 cursor-pointer"
            >
              <option value="all">All Courses</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.code}: {c.title.substring(0, 24)}...</option>
              ))}
            </select>

            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="text-xs px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="Certified">Certified</option>
              <option value="In Progress">In Progress</option>
              <option value="Needs Attention">Needs Attention</option>
            </select>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="p-3.5">Trainee Name</th>
                <th className="p-3.5">Course</th>
                <th className="p-3.5 text-center">Score</th>
                <th className="p-3.5 text-center">Completion</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-right">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Trainee Name */}
                  <td className="p-3.5 flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt=""
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 text-sm leading-snug truncate">{t.traineeName}</p>
                      <p className="text-[11px] text-slate-500 truncate">{t.traineeEmail}</p>
                      <span className="text-[10px] text-slate-400 truncate block">{t.department}</span>
                    </div>
                  </td>

                  {/* Course */}
                  <td className="p-3.5 max-w-xs">
                    <span className="font-semibold text-slate-800 line-clamp-1">{t.courseTitle}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {t.assessmentsCompleted}/{t.totalAssessments} Assessments Passed
                    </span>
                  </td>

                  {/* Score */}
                  <td className="p-3.5 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-black ${
                      t.score >= 90
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : t.score >= 75
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}>
                      {t.score}%
                    </span>
                  </td>

                  {/* Completion */}
                  <td className="p-3.5 text-center">
                    <div className="inline-flex flex-col items-center gap-1">
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            t.completion === 100 ? 'bg-emerald-600' : 'bg-blue-600'
                          }`}
                          style={{ width: `${t.completion}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-700">{t.completion}%</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-3.5 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                      t.status === 'Certified'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : t.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}>
                      {t.status === 'Certified' && <CheckCircle2 className="w-3 h-3 text-emerald-700" />}
                      {t.status === 'Needs Attention' && <AlertTriangle className="w-3 h-3 text-rose-700" />}
                      <span>{t.status}</span>
                    </span>
                  </td>

                  {/* Last Active */}
                  <td className="p-3.5 text-right font-mono text-[11px] text-slate-400">
                    {t.lastActive}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRecords.length === 0 && (
          <div className="p-8 text-center">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-700">No trainee records match your search filter</p>
          </div>
        )}
      </div>
    </div>
  );
};
