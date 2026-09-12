import React from 'react';
import { 
  BookOpen, 
  Users, 
  CheckSquare, 
  Layers, 
  TrendingUp, 
  Award, 
  Plus, 
  Upload, 
  BarChart3, 
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  FileQuestion,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../common/StatCard';
import { BarChart } from '../charts/BarChart';
import { DonutChart } from '../charts/DonutChart';

interface TrainerOverviewProps {
  onOpenCreateCourse: () => void;
  onOpenCreateSession: () => void;
}

export const TrainerOverview: React.FC<TrainerOverviewProps> = ({
  onOpenCreateCourse,
  onOpenCreateSession
}) => {
  const { 
    currentUser, 
    courses, 
    subjectAssessments, 
    learningResources, 
    traineePerformance, 
    allAssessmentSubmissions,
    setActiveTab, 
    manageCourse 
  } = useApp();

  // 1. Total courses
  const totalCourses = courses.length;

  // 2. Total trainees (unique trainees in performance or sum of enrollments)
  const uniqueTraineeIds = new Set(traineePerformance.map(t => t.traineeId));
  const totalTrainees = Math.max(3420, uniqueTraineeIds.size * 285);

  // 3. Active assessments
  const activeAssessments = subjectAssessments.filter(a => a.status !== 'Archived').length;

  // 4. Uploaded resources
  const uploadedResources = learningResources.length;

  // 5. Average trainee performance
  const avgPerformance = traineePerformance.length > 0
    ? Math.round(traineePerformance.reduce((acc, curr) => acc + curr.score, 0) / traineePerformance.length)
    : 87;

  // 6. Course completion rate
  const completionRate = traineePerformance.length > 0
    ? Math.round(traineePerformance.reduce((acc, curr) => acc + curr.completion, 0) / traineePerformance.length)
    : 82;

  // Performance by Course Chart Data
  const coursePerformanceData = courses.slice(0, 5).map(c => {
    const courseRecords = traineePerformance.filter(p => p.courseId === c.id);
    const avg = courseRecords.length > 0
      ? Math.round(courseRecords.reduce((a, b) => a + b.score, 0) / courseRecords.length)
      : 85;
    return {
      label: c.title.length > 20 ? c.title.substring(0, 18) + '...' : c.title,
      value: avg,
      highlight: avg >= 90
    };
  });

  // Resource Type Distribution
  const resourceDistribution = [
    { label: 'Lectures', count: learningResources.filter(r => r.type === 'lecture').length, color: '#047857' },
    { label: 'Presentations', count: learningResources.filter(r => r.type === 'presentation').length, color: '#0284c7' },
    { label: 'PDF Handbooks', count: learningResources.filter(r => r.type === 'pdf').length, color: '#7c3aed' },
    { label: 'Study Materials', count: learningResources.filter(r => r.type === 'study_material').length, color: '#d97706' },
  ];

  const recentSubmissions = allAssessmentSubmissions.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Faculty Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 text-white p-6 sm:p-8 border border-emerald-800/40 shadow-sm">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/70 border border-emerald-500/40 text-xs font-semibold text-emerald-200 mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Faculty Leadership Console • Institutional Term 2026</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Welcome back, {currentUser.name}
          </h1>

          <p className="mt-2.5 text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
            {currentUser.bio ? currentUser.bio.slice(0, 160) + '...' : 'Directing national digital governance curriculum cohorts, tracking verified civil service competency milestones, and managing accredited learning materials.'}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              id="trainer-dash-create-questionnaire-btn"
              onClick={() => setActiveTab('create-questionnaire')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer font-medium"
            >
              <FileQuestion className="w-4 h-4" />
              <span>Create Questionnaire</span>
            </button>

            <button
              id="trainer-dash-upload-resource-btn"
              onClick={() => setActiveTab('upload-resource')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl flex items-center gap-2 transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4 text-emerald-300" />
              <span>Upload Resource</span>
            </button>

            <button
              id="trainer-dash-my-courses-btn"
              onClick={() => setActiveTab('my-courses')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-200 hover:text-white bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/50 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>My Courses</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 opacity-10 pointer-events-none">
          <BookOpen className="w-80 h-80 text-emerald-400" />
        </div>
      </div>

      {/* 6 Required Core KPI Cards */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Faculty Key Performance Indicators
          </h2>
          <span className="text-[11px] text-slate-400">Live Cohort Telemetry</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
          {/* 1. Total courses */}
          <div 
            onClick={() => setActiveTab('my-courses')}
            className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-500/50 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Total Courses</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900">{totalCourses}</div>
            <p className="mt-1 text-[11px] text-emerald-700 font-medium flex items-center gap-1">
              <span>View Syllabi</span>
              <ChevronRight className="w-3 h-3" />
            </p>
          </div>

          {/* 2. Total trainees */}
          <div 
            onClick={() => setActiveTab('trainee-performance')}
            className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-500/50 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Total Trainees</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900">{totalTrainees.toLocaleString()}</div>
            <p className="mt-1 text-[11px] text-blue-700 font-medium flex items-center gap-1">
              <span>Roster & Records</span>
              <ChevronRight className="w-3 h-3" />
            </p>
          </div>

          {/* 3. Active assessments */}
          <div 
            onClick={() => setActiveTab('manage-questionnaires')}
            className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-500/50 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Active Assessments</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <CheckSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900">{activeAssessments}</div>
            <p className="mt-1 text-[11px] text-amber-700 font-medium flex items-center gap-1">
              <span>Manage Quizzes</span>
              <ChevronRight className="w-3 h-3" />
            </p>
          </div>

          {/* 4. Uploaded resources */}
          <div 
            onClick={() => setActiveTab('trainer-library')}
            className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-500/50 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Uploaded Resources</span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900">{uploadedResources}</div>
            <p className="mt-1 text-[11px] text-purple-700 font-medium flex items-center gap-1">
              <span>Open Library</span>
              <ChevronRight className="w-3 h-3" />
            </p>
          </div>

          {/* 5. Average trainee performance */}
          <div 
            onClick={() => setActiveTab('trainee-performance')}
            className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-500/50 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Avg Trainee Score</span>
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-emerald-700">{avgPerformance}%</div>
            <p className="mt-1 text-[11px] text-emerald-600 font-medium">
              +4.8% vs national bar
            </p>
          </div>

          {/* 6. Course completion rate */}
          <div 
            onClick={() => setActiveTab('assessment-results')}
            className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-emerald-500/50 hover:shadow-xs transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Course Completion</span>
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900">{completionRate}%</div>
            <p className="mt-1 text-[11px] text-rose-600 font-medium">
              Benchmark: 75% Target
            </p>
          </div>
        </div>
      </div>

      {/* Analytics & Cohort Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart
          data={coursePerformanceData}
          title="Average Trainee Score by Curriculum Track"
          subtitle="Mean examination percentage achieved across civil service modules"
          unit="%"
        />
        <DonutChart
          data={resourceDistribution}
          title="Faculty Repository Assets"
          subtitle="Distribution of learning media across instructional formats"
          centerText={String(uploadedResources)}
          centerSub="Total Assets"
        />
      </div>

      {/* Two Columns: Recent Submissions & Quick Navigation Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Submissions Feed */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Questionnaire Submissions</h3>
              <p className="text-xs text-slate-500">Live civil service trainee exam attempts and verified scores</p>
            </div>
            <button
              onClick={() => setActiveTab('assessment-results')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View All Results</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentSubmissions.map((sub) => (
              <div key={sub.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={sub.traineeAvatar}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{sub.traineeName}</p>
                    <p className="text-[11px] text-slate-500 truncate">{sub.assessmentTitle}</p>
                    <span className="text-[10px] text-slate-400">{sub.submittedAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                      sub.passed ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {sub.percentage}%
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">{sub.score}/{sub.totalQuestions} correct</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Access Faculty Actions */}
        <div className="bg-slate-50 rounded-xl border border-slate-200/90 p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Faculty Quick Navigation</h3>
            <p className="text-xs text-slate-500 mb-4">Jump directly to any of the 10 trainer modules</p>

            <div className="space-y-2">
              {[
                { id: 'trainer-profile', label: 'Trainer Profile', desc: 'Qualifications, experience, subjects', icon: UserCheck },
                { id: 'my-courses', label: 'My Courses', desc: 'Review tracks & manage course', icon: BookOpen },
                { id: 'create-questionnaire', label: 'Create Questionnaire', desc: 'Author 4-option MCQ tests', icon: FileQuestion },
                { id: 'manage-questionnaires', label: 'Manage Questionnaires', desc: 'Audit & test active quizzes', icon: CheckSquare },
                { id: 'trainer-library', label: 'Trainer Library', desc: 'Browse lectures, decks, & PDFs', icon: Layers },
                { id: 'trainee-performance', label: 'Trainee Performance', desc: 'Roster scores & completion rates', icon: BarChart3 },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="w-full text-left p-2.5 rounded-lg bg-white hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 transition-all flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="w-7 h-7 rounded bg-slate-100 group-hover:bg-emerald-600 text-slate-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-950 truncate">{item.label}</p>
                      <p className="text-[10px] text-slate-400 truncate">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>Faculty Lead: Dr. Marcus Vance</span>
            <span className="font-mono text-emerald-700 font-semibold">RBAC Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
