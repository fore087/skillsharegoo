import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  Video, 
  FileCheck, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Course, LiveSession, TraineeSubmission } from '../../types';
import { StatCard } from '../common/StatCard';
import { BarChart } from '../charts/BarChart';
import { DonutChart } from '../charts/DonutChart';
import { CreateCourseModal } from './CreateCourseModal';
import { CreateSessionModal } from './CreateSessionModal';
import { GradeSubmissionModal } from './GradeSubmissionModal';
import { CourseViewerModal } from '../trainee/CourseViewerModal';

export const TrainerDashboard: React.FC = () => {
  const { 
    currentUser, 
    courses, 
    liveSessions, 
    submissions, 
    activeTab, 
    setActiveTab, 
    searchQuery 
  } = useApp();

  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
  const [isCreateSessionOpen, setIsCreateSessionOpen] = useState(false);
  const [selectedSubmissionToGrade, setSelectedSubmissionToGrade] = useState<TraineeSubmission | null>(null);
  const [selectedCourseToView, setSelectedCourseToView] = useState<Course | null>(null);

  const myCourses = courses.filter(c => 
    c.instructorId === currentUser.id || c.instructorName.includes('Marcus') || c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingSubmissions = submissions.filter(s => s.status === 'Pending');
  const gradedSubmissions = submissions.filter(s => s.status === 'Graded');

  const cohortData = [
    { label: 'DPI Architecture', value: 88, highlight: true },
    { label: 'Cyber Defense', value: 74 },
    { label: 'Data Literacy', value: 96 },
    { label: 'AI Governance', value: 68 },
    { label: 'Agile Delivery', value: 82 },
  ];

  const distributionData = [
    { label: 'Governance', count: 1420, color: '#2563eb' },
    { label: 'Cybersecurity', count: 980, color: '#059669' },
    { label: 'Data Analytics', count: 2150, color: '#7c3aed' },
    { label: 'AI & Cloud', count: 2300, color: '#d97706' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-500/30 text-xs font-semibold text-emerald-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Senior Faculty & Trainer Portal • Academic Year 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Trainer Studio: {currentUser.name}
          </h1>
          <p className="mt-2 text-sm text-emerald-100/90 leading-relaxed">
            Managing <strong>3,420 civil service trainees</strong> across 4 accredited digital governance cohorts. 
            Monitor learner completion rates, review capstone submissions, and broadcast live workshops.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsCreateCourseOpen(true)}
              className="px-4 py-2 text-xs sm:text-sm font-semibold bg-white text-emerald-950 hover:bg-emerald-50 rounded-lg flex items-center gap-2 shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              Draft New Capacity Track
            </button>
            <button
              onClick={() => setIsCreateSessionOpen(true)}
              className="px-4 py-2 text-xs sm:text-sm font-semibold bg-emerald-700/60 hover:bg-emerald-700 text-white border border-emerald-500/40 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Video className="w-4 h-4" />
              Schedule Masterclass
            </button>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none">
          <BookOpen className="w-72 h-72 text-white" />
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Trainees"
          value="3,420"
          subtitle="Enrolled across active tracks"
          icon={Users}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          trend={{ value: '+14.2%', isPositive: true, label: 'this quarter' }}
        />
        <StatCard
          title="Pass Rate"
          value="94.2%"
          subtitle="Competency benchmark score"
          icon={TrendingUp}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          trend={{ value: '+3.1%', isPositive: true, label: 'vs national avg' }}
        />
        <StatCard
          title="Pending Reviews"
          value={pendingSubmissions.length}
          subtitle="Submissions awaiting evaluation"
          icon={FileCheck}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          trend={{ value: '2 urgent', isPositive: false, label: 'due in 48h' }}
          onClick={() => setActiveTab('grading')}
        />
        <StatCard
          title="Curriculum Tracks"
          value={courses.length}
          subtitle="Institutional syllabi"
          icon={BookOpen}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
          trend={{ value: '1 in review', isPositive: true, label: 'compliance' }}
        />
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart
          data={cohortData}
          title="Cohort Completion Rates by Domain"
          subtitle="Percentage of trainees passing competency assessments"
          unit="%"
        />
        <DonutChart
          data={distributionData}
          title="Trainee Distribution by Sector"
          subtitle="Active civil servants categorized by capacity track"
          centerText="6.8k"
          centerSub="Total Trainees"
        />
      </div>

      {/* Tabs / Sub-Sections */}
      <div className="space-y-6">
        {/* Course Management Section */}
        {(activeTab === 'overview' || activeTab === 'courses') && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Curriculum & Course Management
                </h3>
                <p className="text-xs text-slate-500">
                  Manage syllabus modules, lessons, and compliance approval status
                </p>
              </div>
              <button
                onClick={() => setIsCreateCourseOpen(true)}
                className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                Propose New Track
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/70">
                    <th className="py-3 px-4">Track Title</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Level</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4">Enrolled</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {myCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-xs">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={course.thumbnail}
                            alt=""
                            className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200 shrink-0"
                          />
                          <div>
                            <div className="truncate font-bold text-slate-900">{course.title}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{course.code}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{course.department}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          {course.level}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {course.durationWeeks} wks ({course.totalHours}h)
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {course.enrolledCount.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            course.status === 'Published'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {course.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedCourseToView(course)}
                          className="px-3 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
                        >
                          View Syllabus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Submissions & Grading Section */}
        {(activeTab === 'overview' || activeTab === 'grading') && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Trainee Capstone Submissions & Grading
                </h3>
                <p className="text-xs text-slate-500">
                  Assess practical policy frameworks and assign verified competency scores
                </p>
              </div>
              <span className="text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full">
                {pendingSubmissions.length} Submissions Pending
              </span>
            </div>

            <div className="space-y-3">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{sub.traineeName}</span>
                      <span className="text-xs text-slate-400 font-mono">({sub.traineeEmail})</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          sub.status === 'Graded'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-blue-900">{sub.assignmentTitle}</p>
                    <p className="text-xs text-slate-500">
                      Curriculum: {sub.courseTitle} • Submitted: {sub.submittedAt}
                    </p>
                    {sub.feedback && (
                      <p className="text-xs text-slate-600 italic bg-white p-2 rounded border border-slate-200 mt-2">
                        Trainer note: "{sub.feedback}" (Score: {sub.score}/100)
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {sub.score !== undefined && (
                      <span className="text-base font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                        {sub.score}%
                      </span>
                    )}
                    <button
                      onClick={() => setSelectedSubmissionToGrade(sub)}
                      className={`px-4 py-2 text-xs font-semibold rounded-lg shadow-xs transition-colors ${
                        sub.status === 'Pending'
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                      }`}
                    >
                      {sub.status === 'Pending' ? 'Evaluate & Grade' : 'Re-grade'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Masterclasses Scheduling Section */}
        {(activeTab === 'overview' || activeTab === 'sessions') && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Scheduled Live Masterclasses
                </h3>
                <p className="text-xs text-slate-500">
                  Interactive real-time cohorts and technical clinics
                </p>
              </div>
              <button
                onClick={() => setIsCreateSessionOpen(true)}
                className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                Schedule Session
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {liveSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded uppercase">
                      {session.locationType}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-2 line-clamp-2">
                      {session.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 font-medium truncate">
                      {session.courseTitle}
                    </p>
                    <p className="text-xs text-slate-600 mt-2 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {session.date}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">
                      {session.attendeesCount} Registered
                    </span>
                    <a
                      href={session.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                    >
                      Enter Room
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {isCreateCourseOpen && (
        <CreateCourseModal
          isOpen={isCreateCourseOpen}
          onClose={() => setIsCreateCourseOpen(false)}
        />
      )}

      {isCreateSessionOpen && (
        <CreateSessionModal
          isOpen={isCreateSessionOpen}
          onClose={() => setIsCreateSessionOpen(false)}
        />
      )}

      {selectedSubmissionToGrade && (
        <GradeSubmissionModal
          isOpen={Boolean(selectedSubmissionToGrade)}
          onClose={() => setSelectedSubmissionToGrade(null)}
          submission={selectedSubmissionToGrade}
        />
      )}

      {selectedCourseToView && (
        <CourseViewerModal
          isOpen={Boolean(selectedCourseToView)}
          onClose={() => setSelectedCourseToView(null)}
          course={selectedCourseToView}
        />
      )}
    </div>
  );
};
