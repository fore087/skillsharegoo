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
  Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Course, Certificate } from '../../types';
import { StatCard } from '../common/StatCard';
import { CourseViewerModal } from './CourseViewerModal';
import { AssessmentModal } from './AssessmentModal';
import { CertificateModal } from './CertificateModal';
import { BarChart } from '../charts/BarChart';

export const TraineeDashboard: React.FC = () => {
  const { 
    currentUser, 
    courses, 
    enrollInCourse, 
    certificates, 
    liveSessions,
    activeTab,
    setActiveTab,
    searchQuery 
  } = useApp();

  const [selectedCourseForViewer, setSelectedCourseForViewer] = useState<Course | null>(null);
  const [selectedCourseForAssessment, setSelectedCourseForAssessment] = useState<Course | null>(null);
  const [selectedCertForModal, setSelectedCertForModal] = useState<Certificate | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter courses
  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const enrolledCourses = filteredCourses.filter(c => (c.progress || 0) > 0);
  const completedCourses = filteredCourses.filter(c => (c.progress || 0) >= 100);
  const inProgressCourses = filteredCourses.filter(c => (c.progress || 0) > 0 && (c.progress || 0) < 100);

  // Skill competency distribution for chart
  const competencyData = [
    { label: 'Governance', value: 85, highlight: true },
    { label: 'Cybersecurity', value: 65 },
    { label: 'Data Analytics', value: 100 },
    { label: 'AI Ethics', value: 40 },
    { label: 'Agile Ops', value: 30 },
  ];

  const categories = ['All', 'Governance', 'Technology & AI', 'Cybersecurity', 'Data Analytics', 'Project Leadership'];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-700/60 border border-blue-500/30 text-xs font-semibold text-blue-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Institutional Capacity Pathway • 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {currentUser.name}
          </h1>
          <p className="mt-2 text-sm text-blue-100/90 leading-relaxed">
            You are enrolled in the <strong>{currentUser.department}</strong> continuous digital upskilling program. 
            Keep up the momentum to fulfill your agency's professional capacity benchmarks.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                const target = inProgressCourses[0] || courses[0];
                setSelectedCourseForViewer(target);
              }}
              className="px-4 py-2 text-xs sm:text-sm font-semibold bg-white text-blue-900 hover:bg-blue-50 rounded-lg flex items-center gap-2 shadow-xs transition-colors"
            >
              <Play className="w-4 h-4 fill-current" />
              Resume Active Learning Track
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold bg-blue-700/60 hover:bg-blue-700 text-white border border-blue-500/40 rounded-lg transition-colors"
            >
              Explore Full Catalog
            </button>
          </div>
        </div>

        {/* Ambient watermark shape */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none">
          <BookOpen className="w-72 h-72 text-white" />
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          id="stat-enrolled-tracks"
          title="Active Tracks"
          value={inProgressCourses.length}
          subtitle="Programs in progress"
          icon={BookOpen}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          trend={{ value: '2 active', isPositive: true, label: 'on track' }}
        />
        <StatCard
          id="stat-completed-certs"
          title="Credentials Earned"
          value={certificates.length}
          subtitle="Accredited certifications"
          icon={Award}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          trend={{ value: '+1 this month', isPositive: true, label: 'distinction' }}
        />
        <StatCard
          id="stat-live-workshops"
          title="Live Masterclasses"
          value={liveSessions.length}
          subtitle="Scheduled webinars"
          icon={Video}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
          trend={{ value: 'Tomorrow', isPositive: true, label: 'next session' }}
        />
        <StatCard
          id="stat-hours-invested"
          title="Learning Hours"
          value="48.5h"
          subtitle="Cumulative logged hours"
          icon={Clock}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          trend={{ value: '82% of benchmark', isPositive: true, label: 'achieved' }}
        />
      </div>

      {/* Main Content Areas based on Tab or Default Overview */}
      {(activeTab === 'overview' || activeTab === 'courses') && (
        <div className="space-y-6">
          {/* Active / Enrolled Section */}
          {activeTab === 'overview' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    My Enrolled Capacity Tracks
                  </h3>
                  <p className="text-xs text-slate-500">
                    Your ongoing courses and progress milestones
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('courses')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  View All ({courses.length})
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {enrolledCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
                  >
                    <div>
                      {/* Image Header */}
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                          {course.category}
                        </span>
                        <span className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          {course.level}
                        </span>
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[10px] opacity-80 font-mono">{course.code}</span>
                          <h4 className="text-sm font-bold leading-snug line-clamp-1">
                            {course.title}
                          </h4>
                        </div>
                      </div>

                      {/* Course Body */}
                      <div className="p-4 space-y-3">
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {course.description}
                        </p>

                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {course.durationWeeks} weeks ({course.totalHours} hrs)
                          </span>
                          <span className="font-semibold text-slate-700">
                            {course.modules.length} Modules
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-semibold text-slate-600">Completion</span>
                            <span className="font-bold text-blue-700">{course.progress || 0}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress || 0}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 pt-0 flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCourseForViewer(course)}
                        className="flex-1 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        {(course.progress || 0) >= 100 ? 'Review Syllabus' : 'Continue Study'}
                      </button>

                      <button
                        onClick={() => setSelectedCourseForAssessment(course)}
                        title="Take Knowledge Check"
                        className="p-2 text-xs font-semibold bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-lg transition-colors"
                      >
                        <Award className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Catalog / Explore Section */}
          <div className="pt-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {activeTab === 'courses' ? 'Capacity Building Curriculum Catalog' : 'Explore Additional Capacity Tracks'}
                </h3>
                <p className="text-xs text-slate-500">
                  Government & higher-education accredited professional modules
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-slate-900 text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCourses.map((course) => {
                const isEnrolled = (course.progress || 0) > 0;

                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="relative h-36 overflow-hidden">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <span className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          {course.category}
                        </span>
                        <span className="absolute bottom-2 left-2.5 text-[11px] font-mono text-white/90">
                          {course.code}
                        </span>
                      </div>

                      <div className="p-4 space-y-2">
                        <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                          {course.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2">
                          {course.description}
                        </p>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                          <span>By {course.instructorName}</span>
                          <span className="font-semibold text-blue-700">★ {course.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      {isEnrolled ? (
                        <button
                          onClick={() => setSelectedCourseForViewer(course)}
                          className="w-full py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Already Enrolled ({course.progress}%)
                        </button>
                      ) : (
                        <button
                          onClick={() => enrollInCourse(course.id)}
                          className="w-full py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                        >
                          Enroll in Capacity Track
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Live Masterclasses Tab or Section */}
      {(activeTab === 'overview' || activeTab === 'sessions') && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Live Capacity Masterclasses & Workshops
              </h3>
              <p className="text-xs text-slate-500">
                Interactive real-time cohorts with senior faculty and certified practitioners
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {liveSessions.map((session) => (
              <div
                key={session.id}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between hover:border-blue-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="inline-flex items-center gap-1 font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                      <Video className="w-3 h-3" />
                      {session.locationType}
                    </span>
                    <span className="text-slate-400 font-medium font-mono text-[11px]">
                      {session.durationMinutes}m
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 line-clamp-2">
                    {session.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 font-medium line-clamp-1">
                    Track: {session.courseTitle}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 font-medium">
                    Led by <strong>{session.trainerName}</strong>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                    {session.date}
                  </div>
                  <a
                    href={session.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    Join Cohort
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Credentials & Competency Chart Section */}
      {(activeTab === 'overview' || activeTab === 'certificates' || activeTab === 'assessment') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Competency Mastery Bar Chart */}
          <BarChart
            data={competencyData}
            title="Institutional Skill Mastery Index"
            subtitle="Competency benchmarks evaluated across administrative disciplines"
            unit="%"
          />

          {/* Certificates Earned */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Verified Digital Credentials
                  </h4>
                  <p className="text-xs text-slate-500">
                    Compliant with national civil service standards
                  </p>
                </div>
                <Award className="w-5 h-5 text-emerald-600" />
              </div>

              <div className="space-y-3">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3"
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
                      View & Print
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                Ledger Verification Active
              </span>
              <span>{certificates.length} Total Accreditations</span>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {selectedCourseForViewer && (
        <CourseViewerModal
          isOpen={Boolean(selectedCourseForViewer)}
          onClose={() => setSelectedCourseForViewer(null)}
          course={selectedCourseForViewer}
          onOpenAssessment={() => {
            setSelectedCourseForAssessment(selectedCourseForViewer);
            setSelectedCourseForViewer(null);
          }}
        />
      )}

      {selectedCourseForAssessment && (
        <AssessmentModal
          isOpen={Boolean(selectedCourseForAssessment)}
          onClose={() => setSelectedCourseForAssessment(null)}
          courseTitle={selectedCourseForAssessment.title}
          courseId={selectedCourseForAssessment.id}
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
