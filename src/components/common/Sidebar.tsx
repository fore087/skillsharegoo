import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Video, 
  Award, 
  CheckSquare, 
  Users, 
  FileCheck, 
  BarChart3, 
  ShieldCheck, 
  FolderPlus,
  HelpCircle,
  GraduationCap,
  Briefcase,
  Layers,
  ChevronRight,
  LogOut,
  ShieldAlert,
  MessageSquare,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onCloseMobile }) => {
  const { currentRole, activeTab, setActiveTab, currentUser, switchRole, logout, certificates } = useApp();

  interface NavItem {
    id: string;
    label: string;
    icon: React.ElementType;
    badge?: string | number;
  }

  const traineeNav: NavItem[] = [
    { id: 'overview', label: 'Trainee Dashboard', icon: LayoutDashboard },
    { id: 'my-courses', label: 'My Courses', icon: GraduationCap },
    { id: 'catalog', label: 'Course Catalog', icon: BookOpen },
    { id: 'resources', label: 'Learning Resources', icon: Layers, badge: '6' },
    { id: 'assessments', label: 'MCQ Assessments', icon: CheckSquare, badge: '4' },
    { id: 'certificates', label: 'Certificates', icon: Award, badge: certificates.length > 0 ? String(certificates.length) : undefined },
    { id: 'feedback', label: 'Course Feedback', icon: MessageSquare },
    { id: 'profile', label: 'My Profile', icon: UserCheck },
    { id: 'sessions', label: 'Live Masterclasses', icon: Video, badge: '3' },
  ];

  const trainerNav: NavItem[] = [
    { id: 'overview', label: 'Trainer Studio', icon: LayoutDashboard },
    { id: 'courses', label: 'Curriculum & Courses', icon: BookOpen },
    { id: 'sessions', label: 'Schedule Sessions', icon: Video },
    { id: 'grading', label: 'Submissions & Grades', icon: FileCheck, badge: '2' },
    { id: 'analytics', label: 'Cohort Insights', icon: BarChart3 },
  ];

  const adminNav: NavItem[] = [
    { id: 'overview', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'User Directory', icon: Users, badge: '7' },
    { id: 'approvals', label: 'Curriculum Approvals', icon: FolderPlus, badge: '1' },
    { id: 'analytics', label: 'Capacity Metrics', icon: BarChart3 },
    { id: 'compliance', label: 'Governance & Audits', icon: ShieldCheck },
  ];

  // Route protection: If logged-in user is a trainee, navigation is strictly trainee
  const effectiveRole = currentUser.role || currentRole;
  const navItems = effectiveRole === 'trainee' ? traineeNav : effectiveRole === 'trainer' ? trainerNav : adminNav;

  const handleSelect = (id: string) => {
    setActiveTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Navigation Items */}
        <div className="p-4 space-y-6 overflow-y-auto">
          {/* User Role Card */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-xs"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                <span className="inline-block px-2 py-0.5 mt-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-blue-100 text-blue-800">
                  {currentUser.role}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 truncate font-medium">
              {currentUser.organization}
            </p>
          </div>

          {/* Nav List */}
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Menu Navigation
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`sidebar-nav-${item.id}`}
                    onClick={() => handleSelect(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Demo Role Switcher */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between px-3 mb-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Active Role
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                effectiveRole === 'admin'
                  ? 'bg-purple-100 text-purple-800'
                  : effectiveRole === 'trainer'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {effectiveRole}
              </span>
            </div>

            <div className="space-y-1 px-1">
              {[
                { r: 'trainee' as UserRole, label: 'Trainee Hub', icon: GraduationCap },
                { r: 'trainer' as UserRole, label: 'Trainer Studio', icon: Briefcase },
                { r: 'admin' as UserRole, label: 'Admin Console', icon: Layers },
              ].map(({ r, label, icon: Icon }) => (
                <button
                  key={r}
                  onClick={() => {
                    switchRole(r);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors ${
                    currentRole === r
                      ? 'bg-slate-200/90 text-slate-900 font-bold'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{label}</span>
                  </div>
                  {currentRole === r && <ChevronRight className="w-3 h-3 text-blue-600" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info & Logout button */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60 space-y-2.5">
          <button
            id="sidebar-signout-btn"
            onClick={() => {
              onCloseMobile();
              logout();
            }}
            className="w-full py-2 px-3 text-xs font-semibold text-rose-600 hover:text-white hover:bg-rose-600 border border-rose-200 hover:border-rose-600 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Session</span>
          </button>

          <div className="flex items-center gap-2 text-slate-500 text-[11px] pt-1">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">RBAC Protected Prototype</span>
          </div>
          <p className="text-[10px] text-slate-400">
            CAPACITY CONNECT • Multi-Role Access Control
          </p>
        </div>
      </aside>
    </>
  );
};
