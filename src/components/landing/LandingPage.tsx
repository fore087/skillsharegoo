import React, { useState } from 'react';
import { 
  Building2, 
  GraduationCap, 
  Briefcase, 
  ShieldAlert, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  BarChart3, 
  ChevronRight, 
  Globe2, 
  Users,
  Compass,
  Zap,
  CheckSquare,
  Network,
  UserPlus,
  FileCheck,
  ClipboardCheck,
  Calendar,
  Download,
  Star,
  Clock,
  TrendingUp,
  FileText,
  X,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole, Course } from '../../types';
import { 
  LANDING_STATS, 
  WHY_CAPACITY_CONNECT, 
  HOW_IT_WORKS_STEPS, 
  LANDING_ANNOUNCEMENTS, 
  FEATURED_TRAINERS, 
  PORTAL_RESOURCES,
  AnnouncementItem
} from '../../data/mockData';
import { CourseViewerModal } from '../trainee/CourseViewerModal';
import { Modal } from '../common/Modal';

export const LandingPage: React.FC = () => {
  const { loginAs, setCurrentView, courses } = useApp();

  // State for Course modal
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  // State for Announcement modal
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementItem | null>(null);

  // State for Resource modal
  const [downloadSuccessModal, setDownloadSuccessModal] = useState<string | null>(null);

  // Filter course catalog to guarantee the 4 specified courses
  const featuredCourseTitles = [
    'Data Analytics',
    'Web Development',
    'Leadership & Management',
    'Artificial Intelligence Fundamentals'
  ];

  // Pick the 4 requested courses first, followed by any others
  const displayCourses = [
    ...courses.filter(c => featuredCourseTitles.some(title => c.title.toLowerCase().includes(title.toLowerCase()))),
    ...courses.filter(c => !featuredCourseTitles.some(title => c.title.toLowerCase().includes(title.toLowerCase())))
  ].slice(0, 4);

  const handleOpenCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsCourseModalOpen(true);
  };

  const handleEnrollAndLearn = (courseId: string) => {
    setIsCourseModalOpen(false);
    loginAs('trainee');
  };

  const handleScrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getDifficultyBadge = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Intermediate':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Advanced':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const renderWhyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass': return <Compass className="w-6 h-6 text-blue-600" />;
      case 'Award': return <Award className="w-6 h-6 text-emerald-600" />;
      case 'Zap': return <Zap className="w-6 h-6 text-amber-600" />;
      case 'CheckSquare': return <CheckSquare className="w-6 h-6 text-indigo-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-purple-600" />;
      case 'Network': return <Network className="w-6 h-6 text-cyan-600" />;
      default: return <Sparkles className="w-6 h-6 text-blue-600" />;
    }
  };

  const renderStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserPlus': return <UserPlus className="w-5 h-5 text-blue-600" />;
      case 'FileCheck': return <FileCheck className="w-5 h-5 text-indigo-600" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-emerald-600" />;
      case 'ClipboardCheck': return <ClipboardCheck className="w-5 h-5 text-amber-600" />;
      case 'Award': return <Award className="w-5 h-5 text-purple-600" />;
      default: return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* 1. HERO SECTION */}
      <section id="home" className="relative overflow-hidden bg-white border-b border-slate-200/90 pt-12 pb-16 sm:pt-20 sm:pb-24">
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f020_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f020_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>CAPACITY CONNECT – Digital Capacity Building and Learning Management Portal</span>
            </div>

            {/* Requested Hero Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12]">
              Build Skills. Build Capacity. Build the Future.
            </h1>

            {/* Requested Hero Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              A centralized digital platform for organizational learning, competency development, training and knowledge sharing.
            </p>

            {/* Requested Hero CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                id="hero-explore-courses-btn"
                onClick={() => handleScrollTo('courses')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all active:scale-[0.99]"
              >
                <BookOpen className="w-4 h-4" />
                Explore Courses
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                id="hero-join-capacity-connect-btn"
                onClick={() => setCurrentView('signup')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 text-sm font-bold flex items-center justify-center gap-2 shadow-2xs transition-all active:scale-[0.99]"
              >
                <UserPlus className="w-4 h-4 text-blue-700" />
                Join Capacity Connect
              </button>
            </div>

            {/* Quick Demo Mode Switcher Bar for Hackathon / Evaluation Review */}
            <div className="pt-6 sm:pt-8 border-t border-slate-100 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="text-left">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Interactive Evaluator Access:
                  </span>
                  <span className="text-xs text-slate-600 font-medium">
                    Test live role portals instantly without manual credentials
                  </span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    id="hero-demo-trainee"
                    onClick={() => loginAs('trainee')}
                    className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    Trainee
                  </button>
                  <button
                    id="hero-demo-trainer"
                    onClick={() => loginAs('trainer')}
                    className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    Trainer
                  </button>
                  <button
                    id="hero-demo-admin"
                    onClick={() => loginAs('admin')}
                    className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-bold rounded-lg bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Admin
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ACHIEVEMENTS / STATISTICS SECTION (Exact requested numbers) */}
      <section id="achievements" className="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              Institutional Impact & Metrics
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Trusted Public Sector Capacity Scale
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Measurable progress across participating directorates, ministries, and educational bodies
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {LANDING_STATS.map((stat, idx) => (
              <div
                key={stat.label}
                id={`stat-card-${stat.label.toLowerCase()}`}
                className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-5 sm:p-6 text-center flex flex-col justify-between hover:border-blue-500/60 transition-all group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-950/70 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
                    {idx === 0 && <Users className="w-5 h-5" />}
                    {idx === 1 && <Briefcase className="w-5 h-5" />}
                    {idx === 2 && <BookOpen className="w-5 h-5" />}
                    {idx === 3 && <Award className="w-5 h-5" />}
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {stat.count}
                  </div>
                  <div className="text-sm font-bold text-blue-400 mt-1">
                    {stat.label}
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] text-slate-500">
                  {stat.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED COURSES SECTION (Exact 4 requested realistic courses) */}
      <section id="courses" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                Featured Programs
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                High-Impact Competency Tracks
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                Rigorous curriculums designed to cultivate digital literacy, modernization, and institutional leadership.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="catalog-view-all-btn"
                onClick={() => loginAs('trainee')}
                className="px-4 py-2 rounded-lg bg-white border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
              >
                <span>Browse Full Catalog ({courses.length})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4 Realistic Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayCourses.map((course) => (
              <div
                key={course.id}
                id={`featured-course-card-${course.id}`}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail & Category Badge */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    
                    {/* Category */}
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                      {course.category}
                    </span>

                    {/* Difficulty Badge */}
                    <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded border ${getDifficultyBadge(course.level)} bg-white/95`}>
                      {course.level}
                    </span>

                    {/* Course Code & Enrolled Count on image */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="font-mono text-[11px] text-slate-200">{course.code}</span>
                      <span className="flex items-center gap-1 text-[11px] font-medium text-white/90">
                        <Users className="w-3 h-3" />
                        {course.enrolledCount.toLocaleString()} learners
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-900 line-clamp-2 group-hover:text-blue-700 transition-colors">
                      {course.title}
                    </h3>

                    {/* Trainer */}
                    <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">
                        {course.instructorName.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-slate-800 truncate">
                          {course.instructorName}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate">
                          {course.instructorRole}
                        </p>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Meta bar: Duration & Difficulty */}
                    <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                      <div className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{course.durationWeeks} wks ({course.totalHours} hrs)</span>
                      </div>
                      <div className="flex items-center gap-1 font-bold text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{course.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* View Course Action Button */}
                <div className="p-5 pt-0">
                  <button
                    id={`view-course-btn-${course.id}`}
                    onClick={() => handleOpenCourse(course)}
                    className="w-full py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                  >
                    <span>View Course</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CAPACITY CONNECT? SECTION (Exact requested 6 items) */}
      <section id="why-us" className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              Institutional Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Why Capacity Connect?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Designed from the ground up to solve public sector competency bottlenecks and foster continuous professional excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CAPACITY_CONNECT.map((item) => (
              <div
                key={item.id}
                id={`why-card-${item.id}`}
                className="bg-slate-50/70 rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between hover:bg-white hover:border-blue-400 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                      {renderWhyIcon(item.icon)}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200/80">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center text-xs font-semibold text-blue-700 group-hover:translate-x-0.5 transition-transform">
                  <span>Explore Feature</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS SECTION (Exact requested roadmap) */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              Simple 5-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              How It Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              From departmental registration to accredited credentials in a frictionless workflow.
            </p>
          </div>

          {/* Connected Step Progression */}
          <div className="relative">
            {/* Horizontal timeline bar for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-slate-200 -translate-y-6 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
              {HOW_IT_WORKS_STEPS.map((step, idx) => (
                <div
                  key={step.step}
                  id={`how-step-${step.step}`}
                  className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-blue-400 hover:shadow-md transition-all text-center sm:text-left group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-8 h-8 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center shadow-2xs">
                        {step.step}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                        {renderStepIcon(step.icon)}
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-blue-700">
                    {idx < HOW_IT_WORKS_STEPS.length - 1 ? '→ Next Step' : '★ Certification'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Start CTA */}
          <div className="mt-12 text-center">
            <button
              id="how-it-works-start-btn"
              onClick={() => setCurrentView('signup')}
              className="px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-xs transition-colors"
            >
              <span>Begin Your Capacity Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. LATEST ANNOUNCEMENTS SECTION */}
      <section id="announcements" className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
                Updates & Notifications
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Latest Announcements
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Important circulars, curriculum updates, and masterclass registration notices
              </p>
            </div>

            <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-600" />
              Academic Cycle 2026
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LANDING_ANNOUNCEMENTS.map((item) => (
              <div
                key={item.id}
                id={`announcement-item-${item.id}`}
                onClick={() => setSelectedAnnouncement(item)}
                className="bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 flex flex-col justify-between hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">{item.category}</span>
                  <span className="font-bold text-blue-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Bulletin
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. EXPERT TRAINERS SHOWCASE SECTION */}
      <section id="trainers" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
              Accredited Faculty
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Meet Our Expert Trainers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Industry architects, university faculty, and former public executives mentoring your staff.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_TRAINERS.map((trainer) => (
              <div
                key={trainer.id}
                id={`trainer-card-${trainer.id}`}
                className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md hover:border-blue-300 transition-all text-center group"
              >
                <div>
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <img
                      src={trainer.avatar}
                      alt={trainer.name}
                      className="w-full h-full rounded-full object-cover ring-2 ring-blue-100 group-hover:ring-blue-500 transition-all"
                    />
                    <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-white flex items-center justify-center text-white text-[10px]">
                      ✓
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">
                    {trainer.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-blue-700 mt-0.5">
                    {trainer.role}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                    {trainer.department}
                  </p>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed text-left">
                    {trainer.bio}
                  </p>

                  {/* Specialties Pills */}
                  <div className="mt-3 flex flex-wrap gap-1 justify-center">
                    {trainer.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{trainer.students}</span>
                  <span className="font-bold text-amber-600">★ {trainer.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. RESOURCES SECTION */}
      <section id="resources" className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
                Toolkits & Handbooks
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Institutional Learning Resources
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Official diagnostic rubrics, competency whitepapers, and implementation toolkits.
              </p>
            </div>

            <button
              onClick={() => setDownloadSuccessModal('National Competency Handbook Package')}
              className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-blue-700" />
              Download Full Toolkit (.ZIP)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PORTAL_RESOURCES.map((res) => (
              <div
                key={res.id}
                id={`resource-item-${res.id}`}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-blue-400 hover:bg-white hover:shadow-md transition-all group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {res.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                    {res.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {res.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-medium">{res.size}</span>
                  <button
                    onClick={() => setDownloadSuccessModal(res.title)}
                    className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                  >
                    <span>Access Asset</span>
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. ABOUT CAPACITY CONNECT SECTION */}
      <section id="about" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">
                Our Institutional Mandate
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                About Capacity Connect
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                CAPACITY CONNECT was established to bridge digital skills gaps across government agencies, statutory authorities, and professional faculties. By harmonizing asynchronous e-learning with live webinars, objective knowledge assessments, and verifiable credentials, we ensure every trainee attains verified competence.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our modular architecture adheres to ISO/IEC 19788 e-learning interoperability standards, ensuring that certifications earned on our platform carry weight across civil service promotion boards and national accreditation registers.
              </p>

              <div className="pt-3 grid grid-cols-2 gap-4 text-xs font-semibold text-slate-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>NBDCA Accredited Curriculums</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Tamper-Resistant Digital IDs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>WCAG 2.1 AA Accessibility</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cross-Ministerial Alignment</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Key Strategic Governance Partners
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">National Administrative Services Directorate</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Policy oversight, personnel qualification framework, and civil cohort coordination.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">National Board of Digital Capacity Accreditation (NBDCA)</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Independent syllabus auditing, psychometric review, and certificate integrity verification.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Institute of Public Capacity Building</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Continuous curriculum research, trainer fellowships, and capstone assessment benchmarks.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. COMPREHENSIVE FOOTER */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
            {/* Column 1: Brand & Tagline */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-700 flex items-center justify-center text-white shadow-xs">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-base font-extrabold tracking-tight text-white">
                    CAPACITY CONNECT
                  </span>
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Digital Capacity Building & LMS Portal
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                “Build Skills. Build Capacity. Build the Future.”
              </p>
              <p className="text-[11px] text-slate-500 max-w-sm leading-relaxed">
                A centralized digital learning ecosystem empowering trainees, trainers, and administrators across government and higher education institutions.
              </p>

              <div className="flex items-center gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  System Status: Operational
                </span>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Platform Navigation
              </h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => handleScrollTo('home')} className="hover:text-white transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollTo('courses')} className="hover:text-white transition-colors">
                    Courses
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollTo('trainers')} className="hover:text-white transition-colors">
                    Trainers
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollTo('resources')} className="hover:text-white transition-colors">
                    Resources
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollTo('about')} className="hover:text-white transition-colors">
                    About
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Featured Tracks */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Featured Tracks
              </h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => handleScrollTo('courses')} className="hover:text-white transition-colors text-left">
                    Data Analytics
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollTo('courses')} className="hover:text-white transition-colors text-left">
                    Web Development
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollTo('courses')} className="hover:text-white transition-colors text-left">
                    Leadership & Management
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollTo('courses')} className="hover:text-white transition-colors text-left">
                    Artificial Intelligence Fundamentals
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: User Portals & Access */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Portals & Auth
              </h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setCurrentView('login')} className="hover:text-white transition-colors text-left">
                    Portal Login
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView('signup')} className="hover:text-white transition-colors text-left">
                    Register New Account
                  </button>
                </li>
                <li>
                  <button onClick={() => loginAs('trainee')} className="text-blue-400 hover:text-blue-300 transition-colors text-left">
                    Trainee Studio Demo
                  </button>
                </li>
                <li>
                  <button onClick={() => loginAs('trainer')} className="text-emerald-400 hover:text-emerald-300 transition-colors text-left">
                    Trainer Studio Demo
                  </button>
                </li>
                <li>
                  <button onClick={() => loginAs('admin')} className="text-purple-400 hover:text-purple-300 transition-colors text-left">
                    Admin Directorate Demo
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>
              © {new Date().getFullYear()} CAPACITY CONNECT. All rights reserved. Compliant with ISO/IEC 19788 and WCAG 2.1 AA guidelines.
            </p>
            <div className="flex items-center gap-4">
              <span className="hover:text-slate-400 cursor-pointer">Privacy Notice</span>
              <span>•</span>
              <span className="hover:text-slate-400 cursor-pointer">Security Protocol</span>
              <span>•</span>
              <span className="hover:text-slate-400 cursor-pointer">Accessibility Policy</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Course Viewer Modal */}
      {selectedCourse && (
        <CourseViewerModal
          isOpen={isCourseModalOpen}
          onClose={() => setIsCourseModalOpen(false)}
          course={selectedCourse}
          onOpenAssessment={() => handleEnrollAndLearn(selectedCourse.id)}
        />
      )}

      {/* Announcement Detail Modal */}
      {selectedAnnouncement && (
        <Modal
          isOpen={Boolean(selectedAnnouncement)}
          onClose={() => setSelectedAnnouncement(null)}
          title={selectedAnnouncement.title}
          subtitle={`${selectedAnnouncement.category} • Published ${selectedAnnouncement.date}`}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${selectedAnnouncement.badgeColor}`}>
                {selectedAnnouncement.badge}
              </span>
              <span className="text-xs text-slate-500">Official Bulletin Circular</span>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {selectedAnnouncement.summary}
            </p>

            <div className="space-y-2 text-xs text-slate-600">
              <h4 className="font-bold text-slate-800">Action Required for Participating Departments:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Review syllabus competency alignments with departmental human resource leads.</li>
                <li>Designate eligible officers for enrolled cohorts before registration deadlines.</li>
                <li>Verify that all completion certificates are synchronized with central records.</li>
              </ul>
            </div>

            <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Close Bulletin
              </button>
              <button
                onClick={() => {
                  setSelectedAnnouncement(null);
                  setCurrentView('signup');
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
              >
                Enroll in Cohort
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Resource Download Simulated Confirmation Modal */}
      {downloadSuccessModal && (
        <Modal
          isOpen={Boolean(downloadSuccessModal)}
          onClose={() => setDownloadSuccessModal(null)}
          title="Institutional Resource Access"
          subtitle="Document package prepared for secure access"
          maxWidth="md"
        >
          <div className="space-y-4 text-center py-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Download className="w-6 h-6" />
            </div>

            <h3 className="text-sm font-bold text-slate-900">
              {downloadSuccessModal}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              This document package has been verified by the National Board of Digital Capacity Accreditation. In this hackathon prototype, full institutional access is unlocked.
            </p>

            <div className="pt-2 flex justify-center gap-2">
              <button
                onClick={() => setDownloadSuccessModal(null)}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
              >
                Acknowledge & Continue
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
