import React, { useState } from 'react';
import { 
  Building2, 
  ArrowLeft, 
  UserCheck, 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  GraduationCap, 
  Briefcase, 
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SignupPage: React.FC = () => {
  const { signup, setCurrentView } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'trainee' | 'trainer'>('trainee');
  const [department, setDepartment] = useState('Digital Governance & Skills');
  const [organization, setOrganization] = useState('Institutional Capacity Network');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    setErrorMessage(null);

    const cleanName = fullName.trim();
    if (!cleanName) {
      setErrorMessage('Please enter your full legal name.');
      return false;
    }
    if (cleanName.length < 2) {
      setErrorMessage('Full name must be at least 2 characters.');
      return false;
    }

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setErrorMessage('Please enter an official or personal email address.');
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(cleanEmail)) {
      setErrorMessage('Please enter a valid email address (e.g. name@organization.org).');
      return false;
    }

    if (role !== 'trainee' && role !== 'trainer') {
      setErrorMessage('Please select either Trainee or Trainer role.');
      return false;
    }

    if (!password) {
      setErrorMessage('Please enter a password.');
      return false;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return false;
    }

    if (!confirmPassword) {
      setErrorMessage('Please confirm your password.');
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your passwords match.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      const result = signup({
        name: fullName,
        email,
        password,
        role,
        department,
        organization,
      });

      setIsLoading(false);

      if (!result.success) {
        setErrorMessage(result.error || 'Failed to complete registration. Please check the details and try again.');
      }
      // On success, AppContext handles setting user, role, and navigating to dashboard
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center">
        <button
          onClick={() => setCurrentView('landing')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-5 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Public Portal
        </button>

        <div className="w-12 h-12 rounded-2xl bg-blue-700 flex items-center justify-center text-white mx-auto shadow-md ring-4 ring-blue-50">
          <Building2 className="w-6 h-6" />
        </div>
        <h2 className="mt-3 text-2xl font-extrabold text-slate-900 tracking-tight">
          Create Capacity Account
        </h2>
        <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
          Register for the institutional continuous professional learning portal
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-7 px-5 sm:px-8 shadow-xl border border-slate-200/90 rounded-2xl space-y-6">
          {/* Header */}
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Institutional Registration</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select your role and provide account credentials to initialize your learning space.
            </p>
          </div>

          {/* Validation Error Alert */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800 shadow-2xs">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* ROLE SELECTION: STRICTLY TRAINEE OR TRAINER. ADMIN IS FORBIDDEN */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold text-slate-700">
                  Select Your Account Role <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] text-slate-400">
                  (Admin clearance is provisioned via Directorate)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Trainee Option */}
                <button
                  type="button"
                  id="signup-role-trainee"
                  onClick={() => {
                    setRole('trainee');
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                    role === 'trainee'
                      ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-600/30 text-blue-950 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        role === 'trainee' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-xs">Trainee</span>
                    </div>
                    {role === 'trainee' && (
                      <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight mt-1">
                    Learn, submit assignments, track competency progress & earn certificates.
                  </p>
                </button>

                {/* Trainer Option */}
                <button
                  type="button"
                  id="signup-role-trainer"
                  onClick={() => {
                    setRole('trainer');
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                    role === 'trainer'
                      ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-600/30 text-emerald-950 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        role === 'trainer' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-xs">Trainer</span>
                    </div>
                    {role === 'trainer' && (
                      <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight mt-1">
                    Author courses, schedule live masterclasses & grade trainee cohorts.
                  </p>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="signup-name" className="font-bold text-slate-700 block mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="signup-name"
                  type="text"
                  placeholder="e.g. Alexis Vance"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all bg-slate-50/40 focus:bg-white"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="signup-email" className="font-bold text-slate-700 block mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="signup-email"
                  type="email"
                  placeholder="e.g. alexis.vance@agency.org"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all bg-slate-50/40 focus:bg-white"
                />
              </div>
            </div>

            {/* Department & Organization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="signup-department" className="font-bold text-slate-700 block mb-1">
                  Department / Branch
                </label>
                <input
                  id="signup-department"
                  type="text"
                  placeholder="e.g. Innovation Unit"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all bg-slate-50/40 focus:bg-white"
                />
              </div>

              <div>
                <label htmlFor="signup-org" className="font-bold text-slate-700 block mb-1">
                  Organization / Entity
                </label>
                <input
                  id="signup-org"
                  type="text"
                  placeholder="e.g. Ministry of Public Works"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all bg-slate-50/40 focus:bg-white"
                />
              </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="signup-password" className="font-bold text-slate-700 block mb-1">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 6 chars"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    className="w-full pl-9 pr-9 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all bg-slate-50/40 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-hidden"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="signup-confirm-password" className="font-bold text-slate-700 block mb-1">
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="signup-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    className="w-full pl-9 pr-9 py-2.5 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:outline-hidden transition-all bg-slate-50/40 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-hidden"
                  >
                    {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Compliance notice */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5 text-[11px] text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                By completing registration, your profile will be provisioned with instant access to your {role.toUpperCase()} workspace, courses, and accredited learning transcripts.
              </span>
            </div>

            <button
              type="submit"
              id="submit-signup-btn"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Provisioning Account & Routing to Dashboard...</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>Register & Enter {role === 'trainer' ? 'Trainer Studio' : 'Trainee Hub'}</span>
                </>
              )}
            </button>
          </form>

          {/* Sign in redirect */}
          <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
            Already have an active account?{' '}
            <button
              type="button"
              id="signup-to-login-btn"
              onClick={() => setCurrentView('login')}
              className="font-bold text-blue-600 hover:text-blue-800 underline transition-colors"
            >
              Sign in to Portal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
