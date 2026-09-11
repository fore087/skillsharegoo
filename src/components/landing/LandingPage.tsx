import React from 'react';
import { 
  Building2, 
  GraduationCap, 
  Briefcase, 
  ShieldAlert, 
  Award, 
  BookOpen, 
  Video, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  BarChart3, 
  Layers,
  ChevronRight,
  Globe2,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const LandingPage: React.FC = () => {
  const { loginAs, setCurrentView, courses } = useApp();

  const handleRoleDemo = (role: UserRole) => {
    loginAs(role);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200/90 pt-12 pb-16 sm:pt-16 sm:pb-24">
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Digital Capacity Building & LMS Portal</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.1]">
              CAPACITY CONNECT
            </h1>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl font-medium text-blue-700 tracking-tight">
              “Build Skills. Build Capacity. Build the Future.”
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed pt-2">
              A unified, accessible continuous learning platform engineered for government agencies, 
              public institutions, and higher education. Upskill officers, manage curriculums, and verify professional credentials with cryptographic integrity.
            </p>

            {/* Quick Demo CTA Buttons */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                id="hero-demo-trainee-btn"
                onClick={() => handleRoleDemo('trainee')}
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
              >
                <GraduationCap className="w-4 h-4" />
                Demo as Trainee
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-demo-trainer-btn"
                onClick={() => handleRoleDemo('trainer')}
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
              >
                <Briefcase className="w-4 h-4" />
                Demo as Trainer
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-demo-admin-btn"
                onClick={() => handleRoleDemo('admin')}
                className="px-5 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
              >
                <ShieldAlert className="w-4 h-4" />
                Demo as Admin
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-2 text-xs text-slate-400">
              ⚡ Instant 1-click access with realistic mock civil service data. No sign-up required for testing!
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Trust Badges */}
      <section className="bg-slate-100/70 border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
            Trusted by Public Sector & Continuous Education Institutions
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all text-xs font-bold text-slate-700">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-700" />
              <span>Ministry of Digital Governance</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <span>National Cybersecurity Directorate</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-purple-700" />
              <span>Public Service Academy</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-700" />
              <span>NBDCA Accreditation Board</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Roles Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Architected for Three Dedicated Stakeholders
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Every role experiences tailored workflows, personalized dashboards, and relevant tooling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Trainee Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-blue-400 hover:shadow-md transition-all group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Role 01</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Trainee Portal</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Upskilling pathway for civil servants and learners. Track learning progress, complete self-paced modules, attend live workshops, take competency quizzes, and earn verifiable certificates.
                </p>

                <ul className="mt-4 space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Interactive syllabus & module checklist</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Instant-feedback knowledge quizzes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Official digital certificate generation</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleRoleDemo('trainee')}
                className="mt-6 w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                Launch Trainee Hub
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trainer Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-400 hover:shadow-md transition-all group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Role 02</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Trainer Studio</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Management suite for certified educators and mentors. Build capacity syllabi, schedule and broadcast live webinar clinics, and grade trainee capstone submissions.
                </p>

                <ul className="mt-4 space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Course curriculum builder & module designer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Live masterclass & workshop scheduler</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Trainee assignment grading & score validation</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleRoleDemo('trainer')}
                className="mt-6 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                Launch Trainer Studio
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Admin Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-purple-400 hover:shadow-md transition-all group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Role 03</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Admin Console</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Directorate dashboard providing institutional governance. Monitor departmental completion analytics, accredit new syllabi, and onboard public sector personnel.
                </p>

                <ul className="mt-4 space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>High-level capacity KPIs & department trends</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Institutional user directory & role provisioning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Curriculum accreditation & approval workflow</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleRoleDemo('admin')}
                className="mt-6 w-full py-2.5 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                Launch Admin Console
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Capacity Tracks Catalog Preview */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">National Catalog</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                Featured Capacity Building Tracks
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Rigorous syllabi tailored for modern public administration and institutional leadership
              </p>
            </div>

            <button
              onClick={() => handleRoleDemo('trainee')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              Browse All Programs ({courses.length})
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.slice(0, 3).map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-3 left-3 bg-white text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                      {course.category}
                    </span>
                    <span className="absolute bottom-2.5 left-3 text-white text-xs font-mono">
                      {course.code}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>{course.durationWeeks} Weeks • {course.totalHours} Hours</span>
                      <span className="font-semibold text-blue-700">★ {course.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleRoleDemo('trainee')}
                    className="w-full py-2 text-xs font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    View Curriculum
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Architectural Pillars */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mx-auto sm:mx-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Verifiable Credentials</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tamper-resistant digital certificates issued directly upon passing statutory knowledge evaluations.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto sm:mx-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Real-Time Telemetry</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Automated compliance monitoring across ministerial cohorts and departmental subdivisions.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mx-auto sm:mx-0">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Modular Framework</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Extensible architecture ready for database integration (PostgreSQL, Firestore, or RESTful API microservices).
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mx-auto sm:mx-0">
                <Globe2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Universal Access</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fully responsive layout designed to accommodate desktop, tablet, and mobile browsers seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-white tracking-tight">CAPACITY CONNECT</p>
              <p className="text-[11px] text-slate-500">“Build Skills. Build Capacity. Build the Future.”</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setCurrentView('login')} className="hover:text-white transition-colors">
              Sign In
            </button>
            <button onClick={() => setCurrentView('signup')} className="hover:text-white transition-colors">
              Register
            </button>
            <button onClick={() => handleRoleDemo('trainee')} className="text-blue-400 hover:text-blue-300 transition-colors">
              Trainee Demo
            </button>
            <button onClick={() => handleRoleDemo('trainer')} className="text-emerald-400 hover:text-emerald-300 transition-colors">
              Trainer Demo
            </button>
            <button onClick={() => handleRoleDemo('admin')} className="text-purple-400 hover:text-purple-300 transition-colors">
              Admin Demo
            </button>
          </div>

          <div className="text-[11px] text-slate-500">
            College & Hackathon Prototype • Production-Quality Architecture
          </div>
        </div>
      </footer>
    </div>
  );
};
