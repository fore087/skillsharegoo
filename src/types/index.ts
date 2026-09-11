export type UserRole = 'trainee' | 'trainer' | 'admin';

export interface WorkExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
}

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
  bio?: string;
  qualifications?: string[];
  workExperience?: WorkExperienceItem[];
  skills?: string[];
  interests?: string[];
  expertise?: string[];
  certifications?: string[];
  subjectsTaught?: string[];
}

export interface AuthAccount extends User {
  password: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'interactive' | 'quiz';
  durationMinutes: number;
  duration?: string;
  completed?: boolean;
  summary?: string;
}

export interface Module {
  id: string;
  title: string;
  durationHours?: number;
  lessons: Lesson[];
  isCompleted?: boolean;
}

export type CourseModule = Module;

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
  correctAnswer?: number;
  explanation?: string;
}

export interface Assessment {
  id: string;
  courseId: string;
  title: string;
  questions: QuizQuestion[];
  passingScorePercent?: number;
  passingScore?: number;
  deadline?: string;
  courseTitle?: string;
  createdAt?: string;
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

export type ResourceType = 'lecture' | 'pdf' | 'presentation' | 'study_material' | 'recorded_lecture' | 'pdf_document';
export type LearningResourceType = ResourceType;

export interface LearningResource {
  id: string;
  courseId: string;
  courseTitle: string;
  title: string;
  type: ResourceType;
  description: string;
  fileSize?: string;
  durationOrPages: string;
  author: string;
  dateAdded: string;
  downloadUrl?: string;
  videoUrl?: string;
  contentSnippet?: string;
  tags: string[];
}

export interface SubjectAssessment extends Assessment {
  subject: string;
  durationMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  totalQuestions: number;
  passingPercentage?: number;
  status?: 'Active' | 'Draft' | 'Closed';
}

export interface AssessmentResultData {
  assessmentId: string;
  assessmentTitle: string;
  subject: string;
  courseId: string;
  courseTitle: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  percentage: number;
  passed: boolean;
  performanceMessage: string;
  userAnswers: Record<number, number>;
  questions: QuizQuestion[];
  completedAt: string;
}

export interface FeedbackCriteriaRatings {
  contentQuality: number;
  instructorClarity: number;
  practicalValue: number;
  platformEase: number;
}

export interface FeedbackSubmission {
  id: string;
  traineeId: string;
  traineeName: string;
  traineeDepartment?: string;
  courseId: string;
  courseTitle: string;
  overallRating: number;
  criteriaRatings: FeedbackCriteriaRatings;
  comment: string;
  recommend: boolean;
  createdAt: string;
}

export interface TraineePerformanceRecord {
  id: string;
  traineeId: string;
  traineeName: string;
  traineeEmail: string;
  avatar: string;
  department: string;
  courseId: string;
  courseTitle: string;
  score: number;
  completion: number;
  status: 'Completed' | 'On Track' | 'Needs Support';
  lastActive: string;
  assessmentsCompleted: number;
}

export interface AssessmentSubmissionRecord {
  id: string;
  traineeId: string;
  traineeName: string;
  traineeEmail: string;
  avatar: string;
  department: string;
  assessmentId: string;
  assessmentTitle: string;
  courseId: string;
  courseTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  submittedAt: string;
  userAnswers: Record<number, number>;
  questions: QuizQuestion[];
}

