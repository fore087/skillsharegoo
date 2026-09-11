import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  Bell, 
  UserCircle2, 
  LogOut, 
  CheckCircle2, 
  Menu, 
  X,
  ExternalLink,
  GraduationCap,
  Briefcase,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

interface HeaderProps {
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  onToggleMobileMenu, 
  isMobileMenuOpen 
}) => {
  const { 
    currentUser, 
    currentRole, 
    switchRole, 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead,
    searchQuery, 
    setSearchQuery, 
    logout,
    currentView,
    setCurrentView
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roleStyles: Record<UserRole, { badgeBg: string; text: string; label: string; icon: any }> = {
    trainee: {
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/10',
      text: 'text-blue-700',
      label: 'Trainee Portal',
      icon: GraduationCap,
    },
    trainer: {
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/10',
      text: 'text-emerald-700',
      label: 'Trainer Studio',
      icon: Briefcase,
    },
    admin: {
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200 ring-purple-500/10',
      text: 'text-purple-700',
      label: 'Admin Control',
      icon: ShieldAlert,
    },
  };

  const currentRoleConfig = roleStyles[currentRole];
  const CurrentRoleIcon = currentRoleConfig.icon;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Left Section */}
          <div className="flex items-center gap-3 sm:gap-5">
            {currentView === 'dashboard' && onToggleMobileMenu && (
              <button
                id="mobile-menu-toggle-btn"
                onClick={onToggleMobileMenu}
                className="lg:hidden p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation drawer"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            <button
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
              title="Return to Landing Page"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-800 transition-colors">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
                  CAPACITY CONNECT
                </span>
                <span className="hidden sm:block text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Digital Capacity & LMS
                </span>
              </div>
            </button>

            {/* Current Active Role Badge */}
            {currentView === 'dashboard' && (
              <div className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ring-1 ${currentRoleConfig.badgeBg}`}>
                <CurrentRoleIcon className="w-3.5 h-3.5" />
                <span>{currentRoleConfig.label}</span>
              </div>
            )}
          </div>

          {/* Center: Live Role Demo Switcher */}
          {currentView === 'dashboard' && (
            <div className="hidden xl:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase px-2">Demo Role:</span>
              <button
                id="header-role-trainee"
                onClick={() => switchRole('trainee')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  currentRole === 'trainee'
                    ? 'bg-white text-blue-700 shadow-xs ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Trainee
              </button>
              <button
                id="header-role-trainer"
                onClick={() => switchRole('trainer')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  currentRole === 'trainer'
                    ? 'bg-white text-emerald-700 shadow-xs ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Trainer
              </button>
              <button
                id="header-role-admin"
                onClick={() => switchRole('admin')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  currentRole === 'admin'
                    ? 'bg-white text-purple-700 shadow-xs ring-1 ring-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Admin
              </button>
            </div>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {currentView === 'dashboard' && (
              <>
                {/* Search Bar (Desktop) */}
                <div className="relative hidden md:block w-48 lg:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search courses, skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  />
                </div>

                {/* Notifications Popover */}
                <div className="relative" ref={notifRef}>
                  <button
                    id="notifications-bell-btn"
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors focus:outline-hidden"
                    aria-label="View notifications"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">Notifications</span>
                          {unreadCount > 0 && (
                            <span className="text-[11px] font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                              {unreadCount} new
                            </span>
                          )}
                        </div>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllNotificationsRead}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>

                      <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => markNotificationRead(notif.id)}
                            className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 items-start ${
                              !notif.read ? 'bg-blue-50/40' : ''
                            }`}
                          >
                            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!notif.read ? 'bg-blue-600' : 'bg-transparent'}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-slate-900">{notif.title}</p>
                              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{notif.message}</p>
                              <span className="text-[10px] text-slate-400 mt-1 block">{notif.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    id="profile-dropdown-btn"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors focus:outline-hidden"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div className="hidden lg:block text-left leading-tight">
                      <div className="text-xs font-bold text-slate-800 truncate max-w-[120px]">
                        {currentUser.name}
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">
                        {currentUser.role}
                      </div>
                    </div>
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                        <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                        <p className="text-[11px] text-slate-600 mt-1 font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {currentUser.department}
                        </p>
                      </div>

                      {/* Mobile Role Switcher within dropdown */}
                      <div className="px-3 py-2 border-b border-slate-100 xl:hidden">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1 mb-1">
                          Switch Demo Role
                        </span>
                        <div className="grid grid-cols-3 gap-1">
                          {(['trainee', 'trainer', 'admin'] as UserRole[]).map((r) => (
                            <button
                              key={r}
                              onClick={() => {
                                switchRole(r);
                                setShowProfileMenu(false);
                              }}
                              className={`py-1 text-[11px] font-semibold rounded capitalize ${
                                currentRole === r
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            setCurrentView('landing');
                            setShowProfileMenu(false);
                          }}
                          className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                        >
                          <ExternalLink className="w-4 h-4 text-slate-400" />
                          Public Portal Home
                        </button>
                        <button
                          id="header-logout-btn"
                          onClick={() => {
                            logout();
                            setShowProfileMenu(false);
                          }}
                          className="w-full px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {currentView !== 'dashboard' && (
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  id="landing-login-btn"
                  onClick={() => setCurrentView('login')}
                  className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Sign In
                </button>
                <button
                  id="landing-signup-btn"
                  onClick={() => setCurrentView('signup')}
                  className="px-4 py-1.5 text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xs transition-colors"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
