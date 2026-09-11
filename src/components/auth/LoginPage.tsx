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
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { DEMO_USERS } from '../../data/mockData';

export const LoginPage: React.FC = () => {
  const { loginAs, customLogin, setCurrentView } = useApp();

  const [email, setEmail] = useState('priya.sharma@capacityconnect.gov');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState<UserRole>('trainee');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    customLogin(email, role);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <button
          onClick={() => setCurrentView('landing')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portal Home
        </button>

        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white mx-auto shadow-md">
          <Building2 className="w-6 h-6" />
        </div>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-900 tracking-tight">
          CAPACITY CONNECT
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Digital Capacity Building & Learning Management Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl border border-slate-200/90 rounded-2xl sm:px-10 space-y-6">
          {/* Quick Demo One-Click Logins */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 text-center">
              ⚡ Instant 1-Click Role Access (Recommended for Evaluation)
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                id="demo-login-trainee"
                onClick={() => loginAs('trainee')}
                className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100/70 text-center transition-all group"
              >
                <GraduationCap className="w-5 h-5 text-blue-700 mx-auto group-hover:scale-110 transition-transform" />
                <span className="block text-[11px] font-bold text-blue-900 mt-1">Trainee</span>
                <span className="block text-[9px] text-blue-600 truncate">Priya Sharma</span>
              </button>

              <button
                type="button"
                id="demo-login-trainer"
                onClick={() => loginAs('trainer')}
                className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/70 text-center transition-all group"
              >
                <Briefcase className="w-5 h-5 text-emerald-700 mx-auto group-hover:scale-110 transition-transform" />
                <span className="block text-[11px] font-bold text-emerald-900 mt-1">Trainer</span>
                <span className="block text-[9px] text-emerald-600 truncate">Dr. Vance</span>
              </button>

              <button
                type="button"
                id="demo-login-admin"
                onClick={() => loginAs('admin')}
                className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/70 hover:bg-purple-100/70 text-center transition-all group"
              >
                <ShieldAlert className="w-5 h-5 text-purple-700 mx-auto group-hover:scale-110 transition-transform" />
                <span className="block text-[11px] font-bold text-purple-900 mt-1">Admin</span>
                <span className="block text-[9px] text-purple-600 truncate">Elena Rostova</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 font-semibold text-[10px]">
                Or enter credentials
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleCustomSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Select Active Role</label>
              <div className="grid grid-cols-3 gap-2">
                {(['trainee', 'trainer', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setRole(r);
                      setEmail(DEMO_USERS[r].email);
                    }}
                    className={`py-1.5 text-xs font-semibold rounded-lg capitalize border transition-all ${
                      role === r
                        ? 'border-blue-600 bg-blue-50 text-blue-800'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Official Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Security Passphrase</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              Sign In to Portal
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
            Don't have an institutional profile?{' '}
            <button
              onClick={() => setCurrentView('signup')}
              className="font-bold text-blue-600 hover:text-blue-800 underline"
            >
              Register your agency
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
