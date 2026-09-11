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
  BarChart3,
  Layers,
  CheckSquare,
  Award,
  UploadCloud,
  Settings,
  ArrowRight,
  UserCheck
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

// Sub-components for the 10 requested Trainer pages
import { TrainerProfileView } from './TrainerProfileView';
import { TrainerMyCoursesView } from './TrainerMyCoursesView';
import { CourseManagementView } from './CourseManagementView';
import { CreateQuestionnaireView } from './CreateQuestionnaireView';
import { ManageQuestionnairesView } from './ManageQuestionnairesView';
import { TrainerLibraryView } from './TrainerLibraryView';
import { UploadResourceView } from './UploadResourceView';
import { TraineePerformanceView } from './TraineePerformanceView';
import { AssessmentResultsView } from './AssessmentResultsView';

export const TrainerDashboard: React.FC = () => {
  const { 
    currentUser, 
    courses, 
    liveSessions, 
    submissions, 
    activeTab, 
    setActiveTab, 
    searchQuery,
    subjectAssessments,
    learningResources,
    traineePerformanceRecords,
    assessmentSubmissions,
    setSelectedManageCourseId
  } = useApp();

  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
  const [isCreateSessionOpen, setIsCreateSessionOpen] = useState(false);
  const [selectedSubmissionToGrade, setSelectedSubmissionToGrade] = useState<TraineeSubmission | null>(null);
  const [selectedCourseToView, setSelectedCourseToView] = useState<Course | null>(null);

  // Compute metrics specified in user request:
  // - Total courses
  // - Total trainees
  // - Active assessments
  // - Uploaded resources
  // - Average trainee performance
  // - Course completion rate
  const totalCourses = courses.length;
  const totalTrainees = 3420; // total accredited civil servants
  const activeAssessmentsCount = subjectAssessments.filter(a => a.status !== 'Closed').length;
  const uploadedResourcesCount = learningResources.length;

  const avgTraineePerformance = Math.round(
    traineePerformanceRecords.reduce((acc, cur) => acc + cur.score, 0) / (traineePerformanceRecords.length || 1)
  );

  const avgCourseCompletionRate = Math.round(
    traineePerformanceRecords.reduce((acc, cur) => acc + cur.completion, 0) / (traineePerformanceRecords.length || 1)
  );

  const pendingSubmissions = submissions.filter(s => s.status === 'Pending');

  const cohortData = [
    { label: 'DPI Architecture', value: 88, highlight: true },
    { label: 'Cyber Defense', value: 74 },
    { label: 'Data Literacy', value: 96 },
    { label: 'AI Governance', value: 68 },
    { label: 'Agile Delivery', value: 82 },
  ];

  const distributionData = [
    { label: 'Governance', count: 1420, color: '#059669' },
    { label: 'Cybersecurity', count: 980, color: '#0d9488' },
    { label: 'Data Analytics', count: 2150, color: '#0284c7' },
    { label: 'AI & Cloud', count: 2300, color: '#d97706' },
  ];

  // Route between Trainer Pages based on activeTab
  if (activeTab === 'profile') {
    return <TrainerProfileView />;
  }

  if (activeTab === 'my-courses' || activeTab === 'courses') {
    return <TrainerMyCoursesView />;
  }

  if (activeTab === 'course-management') {
    return <CourseManagementView />;
  }

  if (activeTab === 'create-questionnaire') {
    return <CreateQuestionnaireView />;
  }

  if (activeTab === 'manage-questionnaires') {
    return <ManageQuestionnairesView />;
  }

  if (activeTab === 'library') {
    return <TrainerLibraryView />;
  }

  if (activeTab === 'upload-resource') {
    return <UploadResourceView />;
  }

  if (activeTab === 'performance' || activeTab === 'analytics') {
    return <TraineePerformanceView />;
  }

  if (activeTab === 'assessment-results' || activeTab === 'grading') {
    return <AssessmentResultsView />;
  }

  // Default: Overview Trainer Dashboard
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-950 text-white p-6 sm:p-8 shadow-sm border border-emerald-800/40">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-emerald-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Senior Faculty & Trainer Portal • CAPACITY CONNECT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Trainer Dashboard: {currentUser.name}
          </h1>
          <p className="mt-2 text-sm text-emerald-100/90 leading-relaxed">
            Leading civil service capacity building across <strong>{totalCourses} accredited tracks</strong> and mentoring <strong>{totalTrainees.toLocaleString()} civil service officers</strong>. Author assessments, manage curricula, and audit real-time submissions.
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('my-courses')}
              className="px-4 py-2 text-xs sm:text-sm font-bold bg-white text-slate-900 hover:bg-emerald-50 rounded-xl flex items-center gap-2 shadow-xs transition-colors"
            >
              <BookOpen className="w-4 h-4 text-emerald-700" />
              My Courses
            </button>
            <button
              onClick={() => setActiveTab('create-questionnaire')}
              className="px-4 py-2 text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl flex items-center gap-2 transition-colors shadow-xs"
            >
              <CheckSquare className="w-4 h-4" />
              Create Questionnaire
            </button>
            <button
              onClick={() => setActiveTab('upload-resource')}
              className="px-4 py-2 text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-700 text-emerald-200 border border-emerald-500/30 rounded-xl flex items-center gap-2 transition-colors"
            >
              <UploadCloud className="w-4 h-4" />
              Upload Resource
            </button>
            <button
              onClick={() => setIsCreateSessionOpen(true)}
              className="px-4 py-2 text-xs sm:text-sm font-bold bg-teal-800/80 hover:bg-teal-700 text-white rounded-xl flex items-center gap-2 transition-colors"
            >
              <Video className="w-4 h-4" />
              Schedule Masterclass
            </button>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-10 pointer-events-none">
          <BookOpen className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* Metrics Row (Total courses, Total trainees, Active assessments, Uploaded resources, Average trainee performance, Course completion rate) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div 
          onClick={() => setActiveTab('my-courses')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-500/60 cursor-pointer transition-all space-y-1"
        >
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Total Courses</span>
          <p className="text-2xl font-black text-slate-900">{totalCourses}</p>
          <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            <span>Active Syllabi</span>
          </span>
        </div>

        <div 
          onClick={() => setActiveTab('performance')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-500/60 cursor-pointer transition-all space-y-1"
        >
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Total Trainees</span>
          <p className="text-2xl font-black text-slate-900">{totalTrainees.toLocaleString()}</p>
          <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>14 Ministries</span>
          </span>
        </div>

        <div 
          onClick={() => setActiveTab('manage-questionnaires')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-500/60 cursor-pointer transition-all space-y-1"
        >
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Active Assessments</span>
          <p className="text-2xl font-black text-emerald-700">{activeAssessmentsCount}</p>
          <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
            <CheckSquare className="w-3 h-3" />
            <span>Live MCQ Tests</span>
          </span>
        </div>

        <div 
          onClick={() => setActiveTab('library')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-500/60 cursor-pointer transition-all space-y-1"
        >
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Uploaded Resources</span>
          <p className="text-2xl font-black text-purple-700">{uploadedResourcesCount}</p>
          <span className="text-[10px] text-purple-700 font-bold flex items-center gap-1">
            <Layers className="w-3 h-3" />
            <span>Decks & Videos</span>
          </span>
        </div>

        <div 
          onClick={() => setActiveTab('performance')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-500/60 cursor-pointer transition-all space-y-1"
        >
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Avg Performance</span>
          <p className="text-2xl font-black text-blue-700">{avgTraineePerformance}%</p>
          <span className="text-[10px] text-blue-700 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Competency Score</span>
          </span>
        </div>

        <div 
          onClick={() => setActiveTab('performance')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-500/60 cursor-pointer transition-all space-y-1"
        >
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Completion Rate</span>
          <p className="text-2xl font-black text-teal-700">{avgCourseCompletionRate}%</p>
          <span className="text-[10px] text-teal-700 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Milestones Met</span>
          </span>
        </div>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart
          data={cohortData}
          title="Cohort Completion Rates by Domain"
          subtitle="Percentage of civil servants reaching accreditation threshold"
          unit="%"
        />
        <DonutChart
          data={distributionData}
          title="Trainee Distribution by Sector"
          subtitle="Active civil servants categorized by capacity track"
          centerText="6.8k"
          centerSub="Active Officers"
        />
      </div>

      {/* Courses Overview List with Manage Buttons */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Active Curriculum Tracks</h2>
            <p className="text-xs text-slate-500">Monitor course rosters and access curriculum settings</p>
          </div>
          <button
            onClick={() => setActiveTab('my-courses')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All Courses</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.slice(0, 4).map((course) => (
            <div
              key={course.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 flex items-center justify-between gap-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src={course.thumbnail}
                  alt=""
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">{course.title}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                    <span className="font-mono font-bold text-emerald-700">{course.code}</span>
                    <span>•</span>
                    <span>{course.enrolledCount} Trainees</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedManageCourseId(course.id);
                  setActiveTab('course-management');
                }}
                className="px-3 py-1.5 bg-slate-900 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shrink-0 flex items-center gap-1 transition-colors"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Manage</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Submissions & Assessment Feed */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Assessment Submissions</h2>
            <p className="text-xs text-slate-500">Live evaluation records from civil service officers</p>
          </div>
          <button
            onClick={() => setActiveTab('assessment-results')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>Open Submissions Registry</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/70">
                <th className="py-3 px-4">Trainee</th>
                <th className="py-3 px-4">Assessment Title</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {assessmentSubmissions.slice(0, 5).map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={sub.avatar}
                        alt=""
                        className="w-7 h-7 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <span className="font-bold text-slate-900 block">{sub.traineeName}</span>
                        <span className="text-[10px] text-slate-500">{sub.department}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">
                    {sub.assessmentTitle}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">
                    {sub.score}/{sub.totalQuestions} ({sub.percentage}%)
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        sub.passed
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {sub.passed ? 'Passed' : 'Failed'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                    {sub.submittedAt}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setActiveTab('assessment-results')}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
                    >
                      Scorecard →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Masterclasses Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Scheduled Live Masterclasses
            </h3>
            <p className="text-xs text-slate-500">
              Interactive real-time cohorts and technical clinics
            </p>
          </div>
          <button
            onClick={() => setIsCreateSessionOpen(true)}
            className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
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
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase">
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
                  className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
                >
                  Enter Room
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
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
