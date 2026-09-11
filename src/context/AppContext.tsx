import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  AuthAccount,
  UserRole, 
  Course, 
  LiveSession, 
  Certificate, 
  AppNotification, 
  TraineeSubmission,
} from '../types';
import { 
  DEMO_USERS, 
  DEMO_CREDENTIALS,
  DEFAULT_AUTH_ACCOUNTS,
  INITIAL_COURSES, 
  INITIAL_LIVE_SESSIONS, 
  INITIAL_CERTIFICATES, 
  INITIAL_SUBMISSIONS, 
  INITIAL_NOTIFICATIONS, 
  ADMIN_SYSTEM_USERS 
} from '../data/mockData';

interface LoginResult {
  success: boolean;
  error?: string;
  role?: UserRole;
}

interface SignupResult {
  success: boolean;
  error?: string;
}

interface AppContextType {
  currentUser: User;
  currentRole: UserRole;
  isAuthenticated: boolean;
  currentView: 'landing' | 'login' | 'signup' | 'dashboard';
  authMessage: string | null;
  authAccounts: AuthAccount[];
  activeTab: string;
  courses: Course[];
  liveSessions: LiveSession[];
  certificates: Certificate[];
  submissions: TraineeSubmission[];
  systemUsers: User[];
  notifications: AppNotification[];
  searchQuery: string;
  
  // Actions
  setAuthMessage: (msg: string | null) => void;
  setCurrentView: (view: 'landing' | 'login' | 'signup' | 'dashboard') => void;
  setActiveTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
  switchRole: (role: UserRole) => void;
  login: (email: string, password: string) => LoginResult;
  loginAs: (role: UserRole) => void;
  customLogin: (email: string, role: UserRole) => void;
  signup: (userData: { 
    name: string; 
    email: string; 
    password: string; 
    role: 'trainee' | 'trainer'; 
    department?: string; 
    organization?: string 
  }) => SignupResult;
  logout: () => void;
  
  // Course actions
  enrollInCourse: (courseId: string) => void;
  toggleLessonComplete: (courseId: string, moduleId: string, lessonId: string) => void;
  createNewCourse: (newCourse: Partial<Course>) => void;
  approveCourse: (courseId: string) => void;
  
  // Sessions & Certificates
  createLiveSession: (newSession: Partial<LiveSession>) => void;
  generateCertificate: (courseId: string) => void;
  
  // Grading & Submissions
  gradeSubmission: (id: string, score: number, feedback: string) => void;
  
  // Admin User Actions
  addNewUser: (user: Partial<User>) => void;
  toggleUserStatus: (userId: string) => void;
  
  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'signup' | 'dashboard'>('landing');
  const [authMessage, setAuthMessage] = useState<string | null>(null);

  // Authentication State with localStorage persistence
  const [authAccounts, setAuthAccounts] = useState<AuthAccount[]>(() => {
    const saved = localStorage.getItem('cc_auth_accounts_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Ensure all required demo accounts are present
          const hasTrainee = parsed.some(a => a.email.toLowerCase() === DEMO_CREDENTIALS.trainee.email.toLowerCase());
          const hasTrainer = parsed.some(a => a.email.toLowerCase() === DEMO_CREDENTIALS.trainer.email.toLowerCase());
          const hasAdmin = parsed.some(a => a.email.toLowerCase() === DEMO_CREDENTIALS.admin.email.toLowerCase());
          if (hasTrainee && hasTrainer && hasAdmin) {
            return parsed;
          }
        }
      } catch (e) {
        // fallback
      }
    }
    return DEFAULT_AUTH_ACCOUNTS;
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('cc_auth_user_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return DEMO_USERS.trainee;
  });

  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    return currentUser.role || 'trainee';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('cc_auth_authenticated_v3');
    return saved === 'true';
  });

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Domain States with localStorage sync
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('cc_courses_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].title === 'Data Analytics') {
          return parsed;
        }
      } catch (e) {
        // fallback
      }
    }
    return INITIAL_COURSES;
  });

  const [liveSessions, setLiveSessions] = useState<LiveSession[]>(() => {
    const saved = localStorage.getItem('cc_sessions');
    return saved ? JSON.parse(saved) : INITIAL_LIVE_SESSIONS;
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem('cc_certificates');
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  const [submissions, setSubmissions] = useState<TraineeSubmission[]>(() => {
    const saved = localStorage.getItem('cc_submissions');
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  const [systemUsers, setSystemUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('cc_system_users');
    return saved ? JSON.parse(saved) : ADMIN_SYSTEM_USERS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('cc_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('cc_auth_accounts_v3', JSON.stringify(authAccounts));
  }, [authAccounts]);

  useEffect(() => {
    localStorage.setItem('cc_auth_user_v3', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('cc_auth_authenticated_v3', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('cc_courses_v2', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('cc_sessions', JSON.stringify(liveSessions));
  }, [liveSessions]);

  useEffect(() => {
    localStorage.setItem('cc_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('cc_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('cc_system_users', JSON.stringify(systemUsers));
  }, [systemUsers]);

  useEffect(() => {
    localStorage.setItem('cc_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Auth Methods
  const login = (email: string, password: string): LoginResult => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail) {
      return { success: false, error: 'Please enter your institutional or personal email address.' };
    }
    if (!cleanPassword) {
      return { success: false, error: 'Please enter your password.' };
    }

    // Check against registered accounts (case-insensitive email matching)
    let account = authAccounts.find(
      a => a.email.toLowerCase() === cleanEmail && a.password === cleanPassword
    );

    // Also check DEMO_CREDENTIALS fallback
    if (!account) {
      if (cleanEmail === DEMO_CREDENTIALS.trainee.email && cleanPassword === DEMO_CREDENTIALS.trainee.password) {
        account = { ...DEMO_USERS.trainee, password: DEMO_CREDENTIALS.trainee.password };
      } else if (cleanEmail === DEMO_CREDENTIALS.trainer.email && cleanPassword === DEMO_CREDENTIALS.trainer.password) {
        account = { ...DEMO_USERS.trainer, password: DEMO_CREDENTIALS.trainer.password };
      } else if (cleanEmail === DEMO_CREDENTIALS.admin.email && cleanPassword === DEMO_CREDENTIALS.admin.password) {
        account = { ...DEMO_USERS.admin, password: DEMO_CREDENTIALS.admin.password };
      } else if (cleanEmail === 'priya.sharma@capacityconnect.gov' && cleanPassword === DEMO_CREDENTIALS.trainee.password) {
        account = { ...DEMO_USERS.trainee, password: DEMO_CREDENTIALS.trainee.password };
      }
    }

    if (!account) {
      return {
        success: false,
        error: 'Invalid email or password. Please verify your credentials or click a demo account below.',
      };
    }

    const userObj: User = {
      id: account.id,
      name: account.name,
      email: account.email,
      role: account.role,
      department: account.department,
      organization: account.organization,
      avatar: account.avatar,
      joinedDate: account.joinedDate,
      phone: account.phone,
      status: account.status,
    };

    setCurrentUser(userObj);
    setCurrentRole(account.role);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
    setActiveTab('overview');
    setAuthMessage(`Welcome back, ${account.name}! Signed in as ${account.role.toUpperCase()}.`);

    return { success: true, role: account.role };
  };

  const signup = (userData: { 
    name: string; 
    email: string; 
    password: string; 
    role: 'trainee' | 'trainer'; 
    department?: string; 
    organization?: string 
  }): SignupResult => {
    const cleanName = userData.name.trim();
    const cleanEmail = userData.email.trim().toLowerCase();
    const cleanPassword = userData.password;

    if (!cleanName || cleanName.length < 2) {
      return { success: false, error: 'Full Name is required (minimum 2 characters).' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!cleanPassword || cleanPassword.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }
    if (userData.role !== 'trainee' && userData.role !== 'trainer') {
      return { success: false, error: 'Registration is restricted to Trainee and Trainer roles.' };
    }

    // Check if email is already taken
    const exists = authAccounts.some(a => a.email.toLowerCase() === cleanEmail);
    if (exists) {
      return { success: false, error: 'An account with this email address already exists. Please sign in.' };
    }

    const newAccount: AuthAccount = {
      id: `usr-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      password: cleanPassword,
      role: userData.role,
      department: userData.department?.trim() || (userData.role === 'trainer' ? 'Training Faculty' : 'General Trainee Cohort'),
      organization: userData.organization?.trim() || 'Institutional Capacity Network',
      avatar: userData.role === 'trainer'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      joinedDate: 'Just now',
      status: 'Active',
    };

    setAuthAccounts(prev => [newAccount, ...prev]);

    // Create user profile (without password)
    const userObj: User = {
      id: newAccount.id,
      name: newAccount.name,
      email: newAccount.email,
      role: newAccount.role,
      department: newAccount.department,
      organization: newAccount.organization,
      avatar: newAccount.avatar,
      joinedDate: newAccount.joinedDate,
      status: newAccount.status,
    };

    setSystemUsers(prev => [userObj, ...prev]);
    setCurrentUser(userObj);
    setCurrentRole(newAccount.role);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
    setActiveTab('overview');
    setAuthMessage(`Account registered successfully! Welcome to your ${newAccount.role.toUpperCase()} Hub, ${newAccount.name}.`);

    // Add welcome notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Account Activated',
        message: `Welcome to CAPACITY CONNECT! Your ${newAccount.role.toUpperCase()} profile is fully established.`,
        time: 'Just now',
        read: false,
        type: 'system',
      },
      ...prev,
    ]);

    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('cc_auth_authenticated_v3');
    localStorage.removeItem('cc_auth_user_v3');
    setCurrentView('login');
    setActiveTab('overview');
    setAuthMessage('You have been logged out successfully.');
  };

  const loginAs = (role: UserRole) => {
    const demo = DEMO_CREDENTIALS[role];
    if (demo) {
      login(demo.email, demo.password);
    } else {
      switchRole(role);
      setIsAuthenticated(true);
      setCurrentView('dashboard');
    }
  };

  const switchRole = (role: UserRole) => {
    const demo = DEMO_USERS[role] || DEMO_USERS.trainee;
    setCurrentRole(role);
    setCurrentUser(demo);
    setActiveTab('overview');
  };

  const customLogin = (email: string, role: UserRole) => {
    const found = authAccounts.find(a => a.email.toLowerCase() === email.toLowerCase());
    if (found) {
      login(found.email, found.password);
      return;
    }
    const newUser: User = {
      ...DEMO_USERS[role],
      email,
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
    };
    setCurrentUser(newUser);
    setCurrentRole(role);
    setIsAuthenticated(true);
    setCurrentView('dashboard');
    setActiveTab('overview');
  };

  // Course actions
  const enrollInCourse = (courseId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return {
          ...c,
          progress: c.progress !== undefined ? c.progress : 5,
          enrolledCount: c.enrolledCount + 1,
        };
      }
      return c;
    }));

    // Add alert notification
    const targetCourse = courses.find(c => c.id === courseId);
    if (targetCourse) {
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          title: 'Enrollment Confirmed',
          message: `You are now actively enrolled in "${targetCourse.title}". Your learning track is unlocked.`,
          time: 'Just now',
          read: false,
          type: 'course',
        },
        ...prev
      ]);
    }
  };

  const toggleLessonComplete = (courseId: string, moduleId: string, lessonId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;

      const updatedModules = c.modules.map(m => {
        if (m.id !== moduleId) return m;

        const updatedLessons = m.lessons.map(l => {
          if (l.id === lessonId) {
            return { ...l, completed: !l.completed };
          }
          return l;
        });

        const allDone = updatedLessons.every(l => l.completed);
        return { ...m, lessons: updatedLessons, isCompleted: allDone };
      });

      // Calculate total progress percentage
      const totalLessons = updatedModules.reduce((acc, m) => acc + m.lessons.length, 0);
      const completedLessons = updatedModules.reduce(
        (acc, m) => acc + m.lessons.filter(l => l.completed).length, 
        0
      );
      const calcProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

      // Check if newly reached 100%
      if (calcProgress === 100 && (c.progress || 0) < 100) {
        generateCertificate(c.id);
      }

      return {
        ...c,
        modules: updatedModules,
        progress: calcProgress,
      };
    }));
  };

  const createNewCourse = (newCourseData: Partial<Course>) => {
    const newCourse: Course = {
      id: `crs-${Date.now()}`,
      title: newCourseData.title || 'Untitled Capacity Building Course',
      code: newCourseData.code || `CAP-${Math.floor(100 + Math.random() * 900)}`,
      department: newCourseData.department || currentUser.department,
      category: (newCourseData.category as any) || 'Governance',
      level: newCourseData.level || 'Intermediate',
      durationWeeks: newCourseData.durationWeeks || 4,
      totalHours: newCourseData.totalHours || 16,
      thumbnail: newCourseData.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
      instructorId: currentUser.id,
      instructorName: currentUser.name,
      instructorRole: 'Course Faculty Lead',
      description: newCourseData.description || 'Comprehensive digital capacity syllabus for organizational leaders.',
      objectives: newCourseData.objectives?.length ? newCourseData.objectives : ['Develop core competency frameworks', 'Apply institutional standards'],
      enrolledCount: 0,
      rating: 5.0,
      status: 'Under Review',
      modules: newCourseData.modules || [
        {
          id: `mod-${Date.now()}-1`,
          title: 'Module 1: Orientation & Strategic Principles',
          durationHours: 4,
          isCompleted: false,
          lessons: [
            { id: `les-${Date.now()}-1`, title: '1.1 Introduction and Strategic Roadmap', type: 'reading', durationMinutes: 20, completed: false }
          ]
        }
      ]
    };

    setCourses(prev => [newCourse, ...prev]);

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Curriculum Submitted',
        message: `Course "${newCourse.title}" has been submitted for administrative compliance review.`,
        time: 'Just now',
        read: false,
        type: 'course'
      },
      ...prev
    ]);
  };

  const approveCourse = (courseId: string) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, status: 'Published' } : c));
  };

  const createLiveSession = (sessionData: Partial<LiveSession>) => {
    const newSession: LiveSession = {
      id: `ses-${Date.now()}`,
      title: sessionData.title || 'Interactive Capacity Workshop',
      courseTitle: sessionData.courseTitle || 'Executive Capacity Building Program',
      courseId: sessionData.courseId || 'crs-101',
      trainerName: currentUser.name,
      date: sessionData.date || 'Upcoming Friday, 11:00 AM',
      time: sessionData.time || '11:00 AM – 12:30 PM EST',
      durationMinutes: sessionData.durationMinutes || 90,
      attendeesCount: 1,
      meetingLink: 'https://meet.capacityconnect.gov/room/live-' + Math.floor(1000 + Math.random() * 9000),
      status: 'Upcoming',
      locationType: sessionData.locationType || 'Virtual (Webinar)',
    };

    setLiveSessions(prev => [newSession, ...prev]);
  };

  const generateCertificate = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    // Check if already exists
    if (certificates.some(cert => cert.courseId === courseId && cert.traineeId === currentUser.id)) {
      return;
    }

    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      traineeId: currentUser.id,
      traineeName: currentUser.name,
      courseId: course.id,
      courseTitle: course.title,
      issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      certificateNumber: `CC-CAP-${Math.floor(10000 + Math.random() * 90000)}`,
      grade: 'Distinction (Honor Roll)',
      accreditedBy: 'National Board of Digital Capacity Accreditation (NBDCA)',
    };

    setCertificates(prev => [newCert, ...prev]);

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'New Credential Awarded!',
        message: `Congratulations ${currentUser.name}! You have earned your certificate in ${course.title}.`,
        time: 'Just now',
        read: false,
        type: 'certificate'
      },
      ...prev
    ]);
  };

  const gradeSubmission = (id: string, score: number, feedback: string) => {
    setSubmissions(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: 'Graded',
          score,
          feedback,
        };
      }
      return s;
    }));
  };

  const addNewUser = (user: Partial<User>) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: user.name || 'New Officer',
      email: user.email || 'officer@gov.org',
      role: user.role || 'trainee',
      department: user.department || 'General Administration',
      organization: user.organization || 'Public Sector Body',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      joinedDate: 'Today',
      status: 'Active',
      phone: user.phone || '+1 (555) 000-1122',
    };

    setSystemUsers(prev => [newUser, ...prev]);
  };

  const toggleUserStatus = (userId: string) => {
    setSystemUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          status: u.status === 'Active' ? 'Inactive' : 'Active',
        };
      }
      return u;
    }));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        currentView,
        activeTab,
        courses,
        liveSessions,
        certificates,
        submissions,
        systemUsers,
        notifications,
        searchQuery,
        setCurrentView,
        setActiveTab,
        setSearchQuery,
        switchRole,
        loginAs,
        customLogin,
        signup,
        logout,
        enrollInCourse,
        toggleLessonComplete,
        createNewCourse,
        approveCourse,
        createLiveSession,
        generateCertificate,
        gradeSubmission,
        addNewUser,
        toggleUserStatus,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
