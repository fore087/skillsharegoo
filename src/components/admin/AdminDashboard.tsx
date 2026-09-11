import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  Building2, 
  ShieldCheck, 
  UserPlus, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  AlertCircle,
  Search,
  Filter,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../common/StatCard';
import { BarChart } from '../charts/BarChart';
import { TrendChart } from '../charts/TrendChart';
import { AddUserModal } from './AddUserModal';
import { CourseViewerModal } from '../trainee/CourseViewerModal';
import { Course, UserRole } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser, 
    systemUsers, 
    toggleUserStatus, 
    courses, 
    approveCourse, 
    activeTab, 
    setActiveTab, 
    searchQuery 
  } = useApp();

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedCourseToReview, setSelectedCourseToReview] = useState<Course | null>(null);

  // Filter users
  const filteredUsers = systemUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const pendingCourses = courses.filter(c => c.status === 'Under Review');

  const departmentCompletionData = [
    { label: 'Finance & Tax', value: 94, highlight: true },
    { label: 'Public Health', value: 88 },
    { label: 'Transport', value: 76 },
    { label: 'Digital Policy', value: 98 },
    { label: 'Justice & Law', value: 82 },
  ];

  const weeklyTrendData = [
    { day: 'Mon', hours: 420 },
    { day: 'Tue', hours: 680 },
    { day: 'Wed', hours: 910 },
    { day: 'Thu', hours: 850 },
    { day: 'Fri', hours: 1120 },
    { day: 'Sat', hours: 340 },
    { day: 'Sun', hours: 210 },
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-sm">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-800/60 border border-purple-500/30 text-xs font-semibold text-purple-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>Executive Capacity Oversight & Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Directorate Portal: {currentUser.name}
          </h1>
          <p className="mt-2 text-sm text-purple-100/90 leading-relaxed">
            Centralized governance of national administrative capacity building programs. Overseeing 
            <strong> 42 public agencies</strong>, credentialing standards, faculty compliance, and institutional learning progress.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAddUserOpen(true)}
              className="px-4 py-2 text-xs sm:text-sm font-semibold bg-white text-purple-950 hover:bg-purple-50 rounded-lg flex items-center gap-2 shadow-xs transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Provision Institutional User
            </button>
            <button
              onClick={() => setActiveTab('approvals')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold bg-purple-800/60 hover:bg-purple-800 text-white border border-purple-500/40 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FileCheck className="w-4 h-4" />
              Curriculum Review Queue ({pendingCourses.length})
            </button>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none">
          <ShieldCheck className="w-72 h-72 text-white" />
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Personnel Trained"
          value="14,890"
          subtitle="Civil servants upskilled"
          icon={Users}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
          trend={{ value: '+18.4%', isPositive: true, label: 'YoY Growth' }}
        />
        <StatCard
          title="Accredited Certs"
          value="8,430"
          subtitle="Verifiable credentials issued"
          icon={Award}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          trend={{ value: '91.8%', isPositive: true, label: 'completion rate' }}
        />
        <StatCard
          title="Active Agencies"
          value="42"
          subtitle="Ministries and departments"
          icon={Building2}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          trend={{ value: '100% engaged', isPositive: true, label: 'reporting' }}
        />
        <StatCard
          title="Statutory Compliance"
          value="99.4%"
          subtitle="Audit & security baseline"
          icon={ShieldCheck}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
          trend={{ value: 'ISO 27001', isPositive: true, label: 'certified' }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart
          data={departmentCompletionData}
          title="Agency Completion Benchmark"
          subtitle="Mandated capacity targets achieved by civil departments"
          unit="%"
        />
        <TrendChart
          data={weeklyTrendData}
          title="Weekly Learning Hours Delivered"
          subtitle="Aggregate training hours completed across all branches"
          badge="+24.6% this week"
        />
      </div>

      {/* Approvals Queue if any */}
      {(activeTab === 'overview' || activeTab === 'approvals') && pendingCourses.length > 0 && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-700" />
              <div>
                <h3 className="text-sm font-bold text-amber-950">
                  Curriculum Pending Administrative Accreditation ({pendingCourses.length})
                </h3>
                <p className="text-xs text-amber-800">
                  Verify course objectives and learning outcomes before publishing to the catalog
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {pendingCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-4 rounded-xl border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500">{course.code}</span>
                    <span className="text-sm font-bold text-slate-900">{course.title}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Submitted by: <strong>{course.instructorName}</strong> • {course.department} • {course.durationWeeks} Weeks
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedCourseToReview(course)}
                    className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                  >
                    Inspect Curriculum
                  </button>
                  <button
                    onClick={() => approveCourse(course.id)}
                    className="px-4 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Approve & Publish
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Directory Management */}
      {(activeTab === 'overview' || activeTab === 'users') && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Institutional User Directory
              </h3>
              <p className="text-xs text-slate-500">
                Manage roles, department affiliations, and account active statuses
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
                {(['all', 'trainee', 'trainer', 'admin'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRoleFilter(r)}
                    className={`px-2.5 py-1 rounded capitalize font-semibold transition-all ${
                      roleFilter === r
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsAddUserOpen(true)}
                className="px-3.5 py-1.5 text-xs font-semibold bg-purple-700 hover:bg-purple-800 text-white rounded-lg flex items-center gap-1.5 shadow-xs transition-colors whitespace-nowrap"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Add Officer
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/70">
                  <th className="py-3 px-4">User Details</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Department & Organization</th>
                  <th className="py-3 px-4">Joined</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{user.name}</p>
                          <p className="text-[11px] text-slate-400 font-mono">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          user.role === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : user.role === 'trainer'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <p className="font-medium text-slate-800">{user.department}</p>
                      <p className="text-[11px] text-slate-400">{user.organization}</p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{user.joinedDate}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          user.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors ${
                          user.status === 'Active'
                            ? 'border-slate-200 text-slate-600 hover:bg-slate-100'
                            : 'border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                        }`}
                      >
                        {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Governance & Compliance Section */}
      {(activeTab === 'overview' || activeTab === 'compliance') && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>National Security Audit Pass</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              All trainee records adhere to federal zero-trust authentication guidelines and data sovereignty protocols.
            </p>
            <div className="mt-3 text-[11px] text-slate-400 font-mono">
              Audit Hash: SHA256-CC-8942F-2026
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 text-blue-700 text-xs font-bold mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Interoperable Open Standards</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Curriculum syllabi align with Digital Public Goods (DPGs) specifications and open educational standards.
            </p>
            <div className="mt-3 text-[11px] text-slate-400 font-mono">
              Spec: ISO/IEC 19788 & WCAG 2.1 AA
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 text-purple-700 text-xs font-bold mb-2">
              <Award className="w-4 h-4" />
              <span>Accreditation Verification</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Digital credentials issued by CAPACITY CONNECT are officially recognized across civil service jurisdictions.
            </p>
            <div className="mt-3 text-[11px] text-slate-400 font-mono">
              Authority: NBDCA Registry v4.1
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {isAddUserOpen && (
        <AddUserModal
          isOpen={isAddUserOpen}
          onClose={() => setIsAddUserOpen(false)}
        />
      )}

      {selectedCourseToReview && (
        <CourseViewerModal
          isOpen={Boolean(selectedCourseToReview)}
          onClose={() => setSelectedCourseToReview(null)}
          course={selectedCourseToReview}
        />
      )}
    </div>
  );
};
