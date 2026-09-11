import React, { useState } from 'react';
import { 
  Building2, 
  GraduationCap, 
  Briefcase, 
  ShieldAlert, 
  ArrowRight, 
  Lock, 
  Mail, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Copy,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DEMO_CREDENTIALS } from '../../data/mockData';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { login, loginAs, setCurrentView, authMessage, setAuthMessage } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const validateForm = (): boolean => {
    setErrorMessage(null);

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setErrorMessage('Please enter your official email address.');
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address (e.g., name@capacityconnect.demo).');
      return false;
    }

    if (!password) {
      setErrorMessage('Please enter your account password.');
      return false;
    }

    if (password.length < 3) {
      setErrorMessage('Password is too short. Please enter a valid password.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrorMessage(null);

    // Simulate realistic institutional auth handshake
    setTimeout(() => {
      const result = login(email, password);
      setIsLoading(false);

      if (!result.success) {
        setErrorMessage(result.error || 'Authentication failed. Please verify your credentials or use a demo account.');
      }
    }, 350);
  };

  const handleFillCredentials = (role: 'trainee' | 'trainer' | 'admin') => {
    const creds = DEMO_CREDENTIALS[role];
    setEmail(creds.email);
    setPassword(creds.password);
    setErrorMessage(null);
    setCopiedKey(role);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const handleOneClickLogin = (role: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
      loginAs(role);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Bar with back link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <button
          onClick={() => {
            setAuthMessage(null);
            setCurrentView('landing');
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-5 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Public Portal
        </button>

        <div className="w-12 h-12 rounded-2xl bg-blue-700 flex items-center justify-center text-white mx-auto shadow-md ring-4 ring-blue-50">
          <Building2 className="w-6 h-6" />
        </div>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-900 tracking-tight">
          CAPACITY CONNECT
        </h2>
        <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
          Digital Capacity Building and Learning Management Portal
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Status or Logout banner if present */}
        {authMessage && (
          <div className="mb-4 p-3.5 bg-blue-50/90 border border-blue-200 rounded-xl flex items-center gap-2.5 text-xs text-blue-900 shadow-2xs animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="flex-1 font-medium">{authMessage}</span>
            <button
              onClick={() => setAuthMessage(null)}
              className="text-blue-500 hover:text-blue-800 text-[11px] font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="bg-white py-7 px-5 sm:px-8 shadow-xl border border-slate-200/90 rounded-2xl space-y-6">
          {/* Header inside card */}
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900">Sign in to your account</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter your institutional credentials or test using demo accounts below.
            </p>
          </div>

          {/* Validation Error Alert */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800 shadow-2xs">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">{errorMessage}</p>
                <p className="text-[11px] text-rose-600 mt-1">
                  Tip: Use the Demo Accounts section below to auto-fill verified credentials with 1 click.
                </p>
              </div>
            </div>
          )}

          {/* Credentials Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label htmlFor="login-email" className="font-bold text-slate-700 block mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="login-email"
                  type="email"
                  placeholder="e.g. trainee@capacityconnect.demo"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  autoComplete="email"
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all bg-slate-50/40 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="login-password" className="font-bold text-slate-700">
                  Password <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">
                  Demo password matches role
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  autoComplete="current-password"
                  className="w-full pl-9 pr-10 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all bg-slate-50/40 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-hidden"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 text-blue-600 rounded-sm border-slate-300 focus:ring-blue-500"
                />
                <span className="text-[11px] text-slate-600">Remember this workstation</span>
              </label>

              <span className="text-[11px] text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
                Accreditation Help
              </span>
            </div>

            <button
              type="submit"
              id="submit-login-btn"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* DEMO ACCOUNTS SECTION FOR JUDGES (Requested by user) */}
          <div className="pt-4 border-t border-slate-200/90">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Demo Accounts (Quick Test for Judges)</span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-md">
                Click to Auto-fill or Sign in
              </span>
            </div>

            <div className="space-y-2">
              {/* Trainee Demo Card */}
              <div className="p-2.5 rounded-xl border border-blue-200/80 bg-blue-50/50 hover:bg-blue-50 transition-colors flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">Trainee</span>
                      <span className="text-[10px] text-slate-500 font-normal truncate">({DEMO_CREDENTIALS.trainee.name})</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-mono truncate">
                      {DEMO_CREDENTIALS.trainee.email} <span className="text-slate-400 font-sans">|</span> {DEMO_CREDENTIALS.trainee.password}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleFillCredentials('trainee')}
                    className="px-2 py-1 text-[10px] font-semibold text-blue-700 hover:text-blue-900 bg-white hover:bg-blue-100/50 rounded-md border border-blue-200 transition-colors flex items-center gap-1"
                    title="Fill into form"
                  >
                    {copiedKey === 'trainee' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    Autofill
                  </button>
                  <button
                    type="button"
                    id="demo-login-trainee"
                    onClick={() => handleOneClickLogin('trainee')}
                    className="px-2.5 py-1 text-[10px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-2xs transition-colors"
                  >
                    Sign In
                  </button>
                </div>
              </div>

              {/* Trainer Demo Card */}
              <div className="p-2.5 rounded-xl border border-emerald-200/80 bg-emerald-50/50 hover:bg-emerald-50 transition-colors flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">Trainer</span>
                      <span className="text-[10px] text-slate-500 font-normal truncate">({DEMO_CREDENTIALS.trainer.name})</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-mono truncate">
                      {DEMO_CREDENTIALS.trainer.email} <span className="text-slate-400 font-sans">|</span> {DEMO_CREDENTIALS.trainer.password}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleFillCredentials('trainer')}
                    className="px-2 py-1 text-[10px] font-semibold text-emerald-700 hover:text-emerald-900 bg-white hover:bg-emerald-100/50 rounded-md border border-emerald-200 transition-colors flex items-center gap-1"
                    title="Fill into form"
                  >
                    {copiedKey === 'trainer' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    Autofill
                  </button>
                  <button
                    type="button"
                    id="demo-login-trainer"
                    onClick={() => handleOneClickLogin('trainer')}
                    className="px-2.5 py-1 text-[10px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-2xs transition-colors"
                  >
                    Sign In
                  </button>
                </div>
              </div>

              {/* Admin Demo Card */}
              <div className="p-2.5 rounded-xl border border-purple-200/80 bg-purple-50/50 hover:bg-purple-50 transition-colors flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-purple-700 text-white flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">Admin</span>
                      <span className="text-[10px] text-slate-500 font-normal truncate">({DEMO_CREDENTIALS.admin.name})</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-mono truncate">
                      {DEMO_CREDENTIALS.admin.email} <span className="text-slate-400 font-sans">|</span> {DEMO_CREDENTIALS.admin.password}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleFillCredentials('admin')}
                    className="px-2 py-1 text-[10px] font-semibold text-purple-700 hover:text-purple-900 bg-white hover:bg-purple-100/50 rounded-md border border-purple-200 transition-colors flex items-center gap-1"
                    title="Fill into form"
                  >
                    {copiedKey === 'admin' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    Autofill
                  </button>
                  <button
                    type="button"
                    id="demo-login-admin"
                    onClick={() => handleOneClickLogin('admin')}
                    className="px-2.5 py-1 text-[10px] font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-md shadow-2xs transition-colors"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Institutional Note & Signup Link */}
          <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100 space-y-2">
            <p>
              Don't have an institutional profile?{' '}
              <button
                type="button"
                id="login-to-signup-btn"
                onClick={() => {
                  setErrorMessage(null);
                  setCurrentView('signup');
                }}
                className="font-bold text-blue-600 hover:text-blue-800 underline transition-colors"
              >
                Sign up here
              </button>
            </p>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Role-governed RBAC prototype authentication</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
