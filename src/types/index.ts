export type UserRole = 'trainee' | 'trainer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  organization: string;
  avatar: string;
  joinedDate: string;
  phone?: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

export interface AuthAccount extends User {
  password: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'interactive' | 'quiz';
  durationMinutes: number;
  completed?: boolean;
  summary?: string;
}

export interface Module {
  id: string;
  title: string;
  durationHours: number;
  lessons: Lesson[];
  isCompleted?: boolean;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  department: string;
  category: 'Governance' | 'Technology & AI' | 'Cybersecurity' | 'Public Administration' | 'Data Analytics' | 'Project Leadership';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationWeeks: number;
  totalHours: number;
  thumbnail: string;
  instructorId: string;
  instructorName: string;
  instructorRole: string;
  description: string;
  objectives: string[];
  enrolledCount: number;
  rating: number;
  status: 'Published' | 'Under Review' | 'Draft';
  progress?: number; // for trainee view
  modules: Module[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Assessment {
  id: string;
  courseId: string;
  title: string;
  questions: QuizQuestion[];
  passingScorePercent: number;
}

export interface LiveSession {
  id: string;
  title: string;
  courseTitle: string;
  courseId: string;
  trainerName: string;
  date: string;
  time: string;
  durationMinutes: number;
  attendeesCount: number;
  meetingLink: string;
  status: 'Upcoming' | 'Live' | 'Completed';
  locationType: 'Virtual (Webinar)' | 'Hybrid' | 'On-Premise Lab';
}

export interface Certificate {
  id: string;
  traineeId: string;
  traineeName: string;
  courseId: string;
  courseTitle: string;
  issueDate: string;
  certificateNumber: string;
  grade: string;
  accreditedBy: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'course' | 'session' | 'system' | 'certificate';
}

export interface TraineeSubmission {
  id: string;
  traineeName: string;
  traineeEmail: string;
  courseTitle: string;
  assignmentTitle: string;
  submittedAt: string;
  status: 'Pending' | 'Graded';
  score?: number;
  feedback?: string;
}
