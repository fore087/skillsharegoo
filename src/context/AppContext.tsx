import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  UserRole, 
  Course, 
  LiveSession, 
  Certificate, 
  AppNotification, 
  TraineeSubmission,
} from '../types';
import { 
  DEMO_USERS, 
  INITIAL_COURSES, 
  INITIAL_LIVE_SESSIONS, 
  INITIAL_CERTIFICATES, 
  INITIAL_SUBMISSIONS, 
  INITIAL_NOTIFICATIONS, 
  ADMIN_SYSTEM_USERS 
} from '../data/mockData';

interface AppContextType {
  currentUser: User;
  currentRole: UserRole;
  currentView: 'landing' | 'login' | 'signup' | 'dashboard';
  activeTab: string;
  courses: Course[];
  liveSessions: LiveSession[];
  certificates: Certificate[];
  submissions: TraineeSubmission[];
  systemUsers: User[];
  notifications: AppNotification[];
  searchQuery: string;
  
  // Actions
  setCurrentView: (view: 'landing' | 'login' | 'signup' | 'dashboard') => void;
  setActiveTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
  switchRole: (role: UserRole) => void;
  loginAs: (role: UserRole) => void;
  customLogin: (email: string, role: UserRole) => void;
  signup: (userData: { name: string; email: string; role: UserRole; department: string; organization: string }) => void;
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
  const [currentRole, setCurrentRole] = useState<UserRole>('trainee');
  const [currentUser, setCurrentUser] = useState<User>(DEMO_USERS.trainee);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Domain States with localStorage sync
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('cc_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
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
    localStorage.setItem('cc_courses', JSON.stringify(courses));
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
  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentUser(DEMO_USERS[role] || DEMO_USERS.trainee);
    setActiveTab('overview');
  };

  const loginAs = (role: UserRole) => {
    switchRole(role);
    setCurrentView('dashboard');
  };

  const customLogin = (email: string, role: UserRole) => {
    const foundUser = systemUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      setCurrentUser(foundUser);
      setCurrentRole(foundUser.role);
    } else {
      const newUser: User = {
        ...DEMO_USERS[role],
        email,
        name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      };
      setCurrentUser(newUser);
      setCurrentRole(role);
    }
    setCurrentView('dashboard');
    setActiveTab('overview');
  };

  const signup = (userData: { name: string; email: string; role: UserRole; department: string; organization: string }) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      department: userData.department,
      organization: userData.organization,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      joinedDate: 'Just now',
      status: 'Active',
    };

    setSystemUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    setCurrentRole(userData.role);
    setCurrentView('dashboard');
    setActiveTab('overview');
  };

  const logout = () => {
    setCurrentView('landing');
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
