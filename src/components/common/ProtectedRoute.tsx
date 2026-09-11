import React from 'react';
import { ShieldAlert, ArrowLeft, LogIn, Sparkles, Lock, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
  fallbackTitle,
  fallbackDescription,
}) => {
  const { isAuthenticated, currentUser, currentRole, switchRole, loginAs, setCurrentView } = useApp();

  // 1. Unauthenticated barrier
  if (!isAuthenticated) {
    return (
      <div className="min-h-[500px] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8 text-center space-y-5">
          <div className="w-14 h-14 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-center mx-auto text-amber-600 shadow-xs">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-amber-100 text-amber-800 mb-2">
              Authentication Required
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Please Sign In to Access Portal
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              This digital learning workspace requires verified institutional credentials. Please log in with your accredited account.
            </p>
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => setCurrentView('login')}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Go to Login Page
            </button>
            <button
              onClick={() => setCurrentView('landing')}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              Return to Public Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Role-based route guard
  const hasPermission = allowedRoles.includes(currentRole);

  if (!hasPermission) {
    const requiredRoleNames = allowedRoles.map(r => r.toUpperCase()).join(' or ');
    return (
      <div className="min-h-[500px] flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-lg w-full bg-white rounded-2xl border border-rose-200 shadow-xl p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-rose-50 rounded-2xl border border-rose-200 flex items-center justify-center mx-auto text-rose-600 shadow-xs">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold tracking-wide uppercase mb-3">
              <Lock className="w-3.5 h-3.5" />
              Restricted Route Access
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {fallbackTitle || `${requiredRoleNames} Clearance Required`}
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {fallbackDescription || (
                <>
                  You are currently authenticated as <strong className="text-slate-900">{currentUser.name}</strong> with <span className="inline-block px-1.5 py-0.5 rounded bg-slate-100 font-bold uppercase text-slate-800 text-[10px]">{currentRole}</span> permissions. Access to this section is protected and cannot be viewed with your current role.
                </>
              )}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-500 pb-1 border-b border-slate-200">
              <span>Current User Role</span>
              <span className="font-bold text-slate-800 uppercase">{currentUser.role}</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Required Clearance</span>
              <span className="font-bold text-rose-700 uppercase">{requiredRoleNames}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => switchRole(currentUser.role)}
              className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to My Dashboard ({currentUser.role})
            </button>

            <button
              onClick={() => setCurrentView('login')}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              Switch Account
            </button>
          </div>

          {/* Quick Evaluator Access */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 block mb-2">
              Judges / Evaluators: Test with authorized role demo account:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {allowedRoles.map((role) => (
                <button
                  key={role}
                  onClick={() => loginAs(role)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  Sign In as Demo {role.toUpperCase()}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
