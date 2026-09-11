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
import { GraduationCap, Briefcase, ShieldAlert, Sparkles } from 'lucide-react';
import { UserRole } from './types';

const MainLayout: React.FC = () => {
  const { currentView, currentRole, switchRole } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  if (currentView === 'login') {
    return <LoginPage />;
  }

  if (currentView === 'signup') {
    return <SignupPage />;
  }

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
            {/* Quick Demo Role Switcher Bar on Top of Dashboard (ideal for Hackathon/College presentations) */}
            <div className="mb-6 p-3 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Presentation Mode: Instantly switch between all 3 user roles:</span>
              </div>

              <div className="flex items-center gap-1.5 self-start sm:self-auto">
                <button
                  onClick={() => switchRole('trainee')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
                    currentRole === 'trainee'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  Trainee
                </button>

                <button
                  onClick={() => switchRole('trainer')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
                    currentRole === 'trainer'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  Trainer
                </button>

                <button
                  onClick={() => switchRole('admin')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all ${
                    currentRole === 'admin'
                      ? 'bg-purple-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Admin
                </button>
              </div>
            </div>

            {/* Role-Specific View */}
            {currentRole === 'trainee' && <TraineeDashboard />}
            {currentRole === 'trainer' && <TrainerDashboard />}
            {currentRole === 'admin' && <AdminDashboard />}
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
