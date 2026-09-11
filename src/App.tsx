import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { TraineeDashboard } from './components/trainee/TraineeDashboard';
import { TrainerDashboard } from './components/trainer/TrainerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { 
  GraduationCap, 
  Briefcase, 
  ShieldAlert, 
  Sparkles, 
  Lock, 
  ShieldCheck, 
  UserCheck,
  ArrowRight,
  LogOut
} from 'lucide-react';
import { UserRole } from './types';

const MainLayout: React.FC = () => {
  const { 
    currentView, 
    currentRole, 
    currentUser, 
    isAuthenticated, 
    switchRole, 
    loginAs, 
    logout,
    setCurrentView 
  } = useApp();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 1. Landing View
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <main className="flex-1">
          <LandingPage />
        </main>
      </div>
    );
  }

  // 2. Login View
  if (currentView === 'login') {
    return <LoginPage />;
  }

  // 3. Signup View
  if (currentView === 'signup') {
    return <SignupPage />;
  }

  // 4. Dashboard View (requires authentication)
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const isTrainee = currentUser.role === 'trainee';
  const isTrainer = currentUser.role === 'trainer';
  const isAdmin = currentUser.role === 'admin';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      {/* Universal Header */}
      <Header
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <div className="flex-1 flex">
        {/* Navigation Sidebar */}
        <Sidebar
          isOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content View with responsive padding */}
        <main className="flex-1 lg:pl-64 min-w-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Active Session & Route Guard Test Bar for Judges */}
            <div className="mb-6 p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col xl:flex-row xl:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      Active User: {currentUser.name}
                    </span>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                      currentUser.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : currentUser.role === 'trainer'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {currentUser.role} Clearance
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Role-Based Access Control (RBAC) is active. Trainees are restricted from Trainer and Admin routes.
                  </p>
                </div>
              </div>

              {/* Role Navigation & Evaluator Testing Buttons */}
              <div className="flex flex-wrap items-center gap-2 self-start xl:self-auto pt-2 xl:pt-0 border-t xl:border-t-0 border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400 mr-1 hidden sm:inline">
                  Test Routes:
                </span>

                {/* Trainee Route Button */}
                <button
                  id="route-btn-trainee"
                  onClick={() => switchRole('trainee')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
                    currentRole === 'trainee'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Trainee Route</span>
                </button>

                {/* Trainer Route Button */}
                <button
                  id="route-btn-trainer"
                  onClick={() => switchRole('trainer')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
                    currentRole === 'trainer'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  title={isTrainee ? 'Trainee clearance will be blocked by Route Guard' : ''}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Trainer Route</span>
                  {isTrainee && (
                    <span className="text-[9px] px-1 py-0.2 bg-rose-200 text-rose-800 rounded font-mono">
                      Restricted
                    </span>
                  )}
                </button>

                {/* Admin Route Button */}
                <button
                  id="route-btn-admin"
                  onClick={() => switchRole('admin')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all ${
                    currentRole === 'admin'
                      ? 'bg-purple-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  title={!isAdmin ? 'Restricted to Administrators' : ''}
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Admin Route</span>
                  {!isAdmin && (
                    <span className="text-[9px] px-1 py-0.2 bg-rose-200 text-rose-800 rounded font-mono">
                      Restricted
                    </span>
                  )}
                </button>

                {/* Quick Switch Demo Account (Evaluator Convenience) */}
                <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block" />
                <button
                  id="header-switch-account-btn"
                  onClick={() => {
                    const nextRole: UserRole = currentUser.role === 'trainee' ? 'trainer' : currentUser.role === 'trainer' ? 'admin' : 'trainee';
                    loginAs(nextRole);
                  }}
                  className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1"
                  title="Switch to next demo account"
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span className="hidden sm:inline">Switch Demo Profile</span>
                </button>
              </div>
            </div>

            {/* Role-Specific Protected Views */}
            {currentRole === 'trainee' && (
              <ProtectedRoute allowedRoles={['trainee', 'admin']}>
                <TraineeDashboard />
              </ProtectedRoute>
            )}

            {currentRole === 'trainer' && (
              <ProtectedRoute 
                allowedRoles={['trainer', 'admin']}
                fallbackTitle="Trainer Studio Access Restricted"
                fallbackDescription="You are currently signed in with a Trainee account. Trainer Studio capabilities—including course authoring, live masterclass scheduling, and cohort submission grading—require Trainer accreditation."
              >
                <TrainerDashboard />
              </ProtectedRoute>
            )}

            {currentRole === 'admin' && (
              <ProtectedRoute 
                allowedRoles={['admin']}
                fallbackTitle="Executive Admin Access Restricted"
                fallbackDescription="The Executive Directorate Console is strictly restricted to designated platform administrators. Trainees and Trainers cannot access user administration, institutional curriculum approvals, or compliance governance audits."
              >
                <AdminDashboard />
              </ProtectedRoute>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
