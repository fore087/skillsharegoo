import React, { useState } from 'react';
import { Building2, ArrowLeft, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const SignupPage: React.FC = () => {
  const { signup, setCurrentView } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('trainee');
  const [department, setDepartment] = useState('Ministry of Infrastructure');
  const [organization, setOrganization] = useState('Civil Service Authority');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    signup({
      name,
      email,
      role,
      department,
      organization,
    });
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
          Create Capacity Account
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Join the national continuous professional capacity network
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl border border-slate-200/90 rounded-2xl sm:px-10 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Primary Role *</label>
              <div className="grid grid-cols-3 gap-2">
                {(['trainee', 'trainer', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 text-xs font-semibold rounded-lg capitalize border transition-all ${
                      role === r
                        ? 'border-blue-600 bg-blue-50 text-blue-800 ring-1 ring-blue-600'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Full Legal Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Officer Alexis Vance"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Official Institutional Email *</label>
              <input
                type="email"
                required
                placeholder="e.g. alexis.vance@agency.gov"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Department / Branch</label>
                <input
                  type="text"
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Organization</label>
                <input
                  type="text"
                  value={organization}
                  onChange={e => setOrganization(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2 text-[11px] text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                By registering, your account will adhere to civil service continuous accreditation standards.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" />
              Complete Registration & Enter Hub
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
            Already have an active account?{' '}
            <button
              onClick={() => setCurrentView('login')}
              className="font-bold text-blue-600 hover:text-blue-800 underline"
            >
              Sign in here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
