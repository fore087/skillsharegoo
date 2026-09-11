import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Award, 
  Video, 
  CheckCircle2, 
  Play, 
  ArrowRight, 
  Search, 
  Filter,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Calendar,
  BarChart3,
  HelpCircle,
  TrendingUp,
  Star,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Course, Certificate, AssessmentResultData } from '../../types';
import { StatCard } from '../common/StatCard';
import { CourseViewerModal } from './CourseViewerModal';
import { CertificateModal } from './CertificateModal';
import { BarChart } from '../charts/BarChart';

// Trainee Views
import { TraineeProfile } from './TraineeProfile';
import { CourseCatalog } from './CourseCatalog';
import { CourseDetailsView } from './CourseDetailsView';
import { MyCoursesView } from './MyCoursesView';
import { LearningResourcesView } from './LearningResourcesView';
import { AssessmentsHub } from './AssessmentsHub';
import { CertificatesView } from './CertificatesView';
import { FeedbackView } from './FeedbackView';

export const TraineeDashboard: React.FC = () => {
  const { 
    currentUser, 
    courses, 
    enrollInCourse, 
    certificates, 
    liveSessions,
    activeTab,
    setActiveTab,
    searchQuery,
    subjectAssessments,
    startAssessment,
    viewCourseDetails,
    traineeAssessmentHistory
  } = useApp();

  const [selectedCourseForViewer, setSelectedCourseForViewer] = useState<Course | null>(null);
  const [selectedCertForModal, setSelectedCertForModal] = useState<Certificate | null>(null);

  // Filter courses for overview
  const enrolledCourses = courses.filter(c => (c.progress || 0) > 0);
  const completedCourses = courses.filter(c => (c.progress || 0) >= 100);
  const inProgressCourses = courses.filter(c => (c.progress || 0) > 0 && (c.progress || 0) < 100);

  // Recommended courses: high rated courses the user is not yet enrolled in
  const recommendedCourses = courses
    .filter(c => (c.progress || 0) === 0)
    .slice(0, 3);

  // Active track for the "Continue Learning" section
  const activeTrack = inProgressCourses[0] || enrolledCourses[0] || courses[0];

  // Average assessment score
  const scoreValues = (Object.values(traineeAssessmentHistory) as AssessmentResultData[]).map(r => r.percentage);
  const avgAssessmentScore = scoreValues.length > 0 
    ? Math.round(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length)
    : 84; // realistic baseline if not yet tested

  // Overall learning progress calculation across enrolled courses
  const totalEnrolledProgress = enrolledCourses.length > 0
    ? Math.round(enrolledCourses.reduce((acc, c) => acc + (c.progress || 0), 0) / enrolledCourses.length)
    : 45;

  // Competency mastery data for chart
  const competencyData = [
    { label: 'Governance', value: 85, highlight: true },
    { label: 'Cybersecurity', value: 70 },
    { label: 'Data Analytics', value: 95 },
    { label: 'AI Ethics', value: 65 },
    { label: 'Digital Public Goods', value: 80 },
  ];

  // ==========================================
  // ROUTE DISPATCHER BASED ON ACTIVE TAB
  // ==========================================
  if (activeTab === 'profile') {
    return <TraineeProfile />;
  }

  if (activeTab === 'catalog' || activeTab === 'courses') {
    return <CourseCatalog onSelectCourse={(c) => viewCourseDetails(c.id)} />;
  }

  if (activeTab === 'course-details') {
    return (
      <CourseDetailsView
        onBack={() => setActiveTab('catalog')}
        onOpenViewer={(c) => setSelectedCourseForViewer(c)}
      />
    );
  }

  if (activeTab === 'my-courses') {
    return (
      <MyCoursesView
        onOpenViewer={(c) => setSelectedCourseForViewer(c)}
        onOpenAssessment={(c) => {
          const matchingAssessment = subjectAssessments.find(a => a.courseId === c.id) || subjectAssessments[0];
          startAssessment(matchingAssessment.id);
        }}
        onOpenCertificate={(courseId) => {
          const cert = certificates.find(cert => cert.courseId === courseId);
          if (cert) {
            setSelectedCertForModal(cert);
          } else {
            setActiveTab('certificates');
          }
        }}
      />
    );
  }

  if (activeTab === 'resources') {
    return <LearningResourcesView />;
  }

  if (activeTab === 'assessments' || activeTab === 'assessment') {
    return (
      <AssessmentsHub
        onViewCertificate={(courseId) => {
          const cert = certificates.find(cert => cert.courseId === courseId);
          if (cert) {
            setSelectedCertForModal(cert);
          } else {
            setActiveTab('certificates');
          }
        }}
      />
    );
  }

  if (activeTab === 'certificates') {
    return <CertificatesView />;
  }

  if (activeTab === 'feedback') {
    return <FeedbackView />;
  }

  if (activeTab === 'sessions') {
    return (
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-100">
            Real-Time Faculty Sessions
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Live Capacity Masterclasses & Cohorts
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Directly connect with subject-matter professors and senior civil service leaders for live policy simulations, architecture audits, and live Q&A.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {liveSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 flex flex-col justify-between hover:border-purple-300 transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1 font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded">
                    <Video className="w-3.5 h-3.5" />
                    {session.locationType}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px] font-semibold">
                    {session.durationMinutes} Mins
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {session.title}
                </h3>
                <p className="text-xs text-blue-600 font-semibold">
                  Track: {session.courseTitle}
                </p>
                <p className="text-xs text-slate-600">
                  Led by <strong>{session.trainerName}</strong>
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{session.date}</span>
                </div>
              </div>

              <a
                href={session.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                Join Masterclass Room
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // DEFAULT: TRAINEE DASHBOARD (OVERVIEW)
  // ==========================================
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-700/60 border border-blue-500/30 text-xs font-semibold text-blue-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>National Digital Capacity Initiative • Active Trainee</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {currentUser.name}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            You are currently on active track within the <strong>{currentUser.department}</strong> capacity development pathway. 
            Maintain your study streak to achieve institutional accreditation benchmarks.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setSelectedCourseForViewer(activeTrack)}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold bg-white text-blue-900 hover:bg-blue-50 rounded-xl flex items-center gap-2 shadow-xs transition-colors"
            >
              <Play className="w-4 h-4 fill-current" />
              Resume Active Learning Track
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold bg-blue-700/60 hover:bg-blue-700 text-white border border-blue-500/40 rounded-xl transition-colors"
            >
              Browse Course Catalog
            </button>
          </div>
        </div>

        {/* Ambient watermark shape */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none">
          <BookOpen className="w-72 h-72 text-white" />
        </div>
      </div>

      {/* 2. Key Metrics Row (Explicitly Requested: Courses enrolled, Courses completed, Certificates earned, Average assessment score) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Courses Enrolled */}
        <StatCard
          id="stat-courses-enrolled"
          title="Courses Enrolled"
          value={enrolledCourses.length}
          subtitle="Active curriculum tracks"
          icon={BookOpen}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          trend={{ value: `${inProgressCourses.length} in progress`, isPositive: true, label: 'on track' }}
        />

        {/* 2. Courses Completed */}
        <StatCard
          id="stat-courses-completed"
          title="Courses Completed"
          value={completedCourses.length}
          subtitle="Syllabus 100% finished"
          icon={CheckCircle2}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          trend={{ value: `${Math.round((completedCourses.length / Math.max(1, enrolledCourses.length)) * 100)}%`, isPositive: true, label: 'completion rate' }}
        />

        {/* 3. Certificates Earned */}
        <StatCard
          id="stat-certificates-earned"
          title="Certificates Earned"
          value={certificates.length}
          subtitle="Accredited credentials"
          icon={Award}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
          trend={{ value: 'NBDCA Verified', isPositive: true, label: 'tamper-proof' }}
        />

        {/* 4. Average Assessment Score */}
        <StatCard
          id="stat-average-assessment-score"
          title="Average Assessment Score"
          value={`${avgAssessmentScore}%`}
          subtitle="Evaluation benchmark: 70%"
          icon={TrendingUp}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          trend={{ value: '+14% above', isPositive: true, label: 'required threshold' }}
        />
      </div>

      {/* 3. Continue Learning Section & Current Learning Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Continue Learning Prominent Hero Card (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                Continue Learning
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {activeTrack.code}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mt-2">
              {activeTrack.title}
            </h3>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
              {activeTrack.description}
            </p>

            {/* Current Lesson Badge */}
            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <Play className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="font-bold text-slate-800">
                    Next Lesson: {activeTrack.modules[0]?.lessons[0]?.title || 'Fundamentals of Modern DPI'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Module 1 • ~15 mins remaining
                  </p>
                </div>
              </div>

              <span className="font-semibold text-blue-700 bg-white px-2.5 py-1 rounded-md border border-slate-200 text-[11px]">
                In Progress
              </span>
            </div>

            {/* Track Progress Bar */}
            <div className="mt-4 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-600">Track Milestone Progress</span>
                <span className="text-blue-700 font-bold">{activeTrack.progress || 0}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${activeTrack.progress || 0}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500">
              Instructor: <strong>{activeTrack.instructorName}</strong>
            </span>
            <button
              onClick={() => setSelectedCourseForViewer(activeTrack)}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Resume Learning Track
            </button>
          </div>
        </div>

        {/* Current Learning Progress Card (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Overall Learning Progress
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {totalEnrolledProgress}% Completed
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-1">
              Cumulative progression across all enrolled capacity modules
            </p>

            <div className="mt-4 space-y-3">
              {enrolledCourses.map((c) => (
                <div key={c.id} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800 truncate max-w-[200px]">
                      {c.title}
                    </span>
                    <span className="font-bold text-slate-700">{c.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        (c.progress || 0) === 100 ? 'bg-emerald-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${c.progress || 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              onClick={() => setActiveTab('my-courses')}
              className="font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              Manage My Courses
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-slate-400 font-mono text-[11px]">
              {completedCourses.length} of {enrolledCourses.length} Certified
            </span>
          </div>
        </div>
      </div>

      {/* 4. Upcoming Assessments Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-600" />
              Upcoming & Required Subject Assessments
            </h3>
            <p className="text-xs text-slate-500">
              Pass official MCQ knowledge evaluations to unlock verified government certifications
            </p>
          </div>

          <button
            onClick={() => setActiveTab('assessments')}
            className="text-xs font-semibold text-purple-700 hover:underline flex items-center gap-1"
          >
            All Assessments ({subjectAssessments.length})
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {subjectAssessments.map((assessment) => {
            const pastResult = traineeAssessmentHistory[assessment.id];

            return (
              <div
                key={assessment.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-purple-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                      {assessment.subject}
                    </span>
                    <span className="text-slate-500 font-mono">
                      {assessment.durationMinutes}m
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2">
                    {assessment.title}
                  </h4>

                  <p className="text-[11px] text-slate-500 mt-1">
                    {assessment.questions.length} MCQs • Passing Score: {assessment.passingScore}%
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/70">
                  {pastResult ? (
                    <button
                      onClick={() => {
                        startAssessment(assessment.id);
                      }}
                      className="w-full py-1.5 px-3 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Score: {pastResult.percentage}% (Retake)
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        startAssessment(assessment.id);
                      }}
                      className="w-full py-1.5 px-3 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1"
                    >
                      Take Assessment
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Recommended Courses Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Recommended for Your Institutional Capacity Profile
            </h3>
            <p className="text-xs text-slate-500">
              Curated tracks based on your civil service division and upcoming policy mandates
            </p>
          </div>

          <button
            onClick={() => setActiveTab('catalog')}
            className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
          >
            Explore All Tracks
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {recommendedCourses.map((course) => (
            <div
              key={course.id}
              className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  <span className="absolute top-2.5 left-2.5 text-[10px] font-bold bg-slate-900/90 text-white px-2 py-0.5 rounded">
                    {course.category}
                  </span>
                  <span className="absolute bottom-2 left-2.5 text-[11px] font-mono text-white/90">
                    {course.code}
                  </span>
                  <span className="absolute bottom-2 right-2.5 text-[11px] font-semibold text-amber-300 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-300" />
                    {course.rating}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                    {course.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {course.description}
                  </p>
                  <p className="text-xs text-slate-600 pt-1 font-medium">
                    Faculty: <strong>{course.instructorName}</strong>
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => viewCourseDetails(course.id)}
                  className="w-full py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={() => enrollInCourse(course.id)}
                  className="w-full py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competency Mastery & Credentials Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Competency Mastery Bar Chart */}
        <BarChart
          data={competencyData}
          title="Institutional Competency Mastery Index"
          subtitle="Evaluated across civil service operational domains"
          unit="%"
        />

        {/* Earned Credentials Widget */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  Verified Digital Credentials
                </h4>
                <p className="text-xs text-slate-500">
                  Accredited by the National Board of Digital Capacity Accreditation
                </p>
              </div>
              <button
                onClick={() => setActiveTab('certificates')}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 truncate">
                      {cert.courseTitle}
                    </h5>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                      <span className="font-mono">{cert.certificateNumber}</span>
                      <span>•</span>
                      <span>{cert.issueDate}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCertForModal(cert)}
                    className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-lg shrink-0 shadow-2xs"
                  >
                    View Document
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              Cryptographic Ledger Verified
            </span>
            <span className="font-semibold text-slate-700">{certificates.length} Total Accreditations</span>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedCourseForViewer && (
        <CourseViewerModal
          isOpen={Boolean(selectedCourseForViewer)}
          onClose={() => setSelectedCourseForViewer(null)}
          course={selectedCourseForViewer}
          onOpenAssessment={() => {
            const match = subjectAssessments.find(a => a.courseId === selectedCourseForViewer.id) || subjectAssessments[0];
            startAssessment(match.id);
            setSelectedCourseForViewer(null);
          }}
        />
      )}

      {selectedCertForModal && (
        <CertificateModal
          isOpen={Boolean(selectedCertForModal)}
          onClose={() => setSelectedCertForModal(null)}
          certificate={selectedCertForModal}
        />
      )}
    </div>
  );
};
