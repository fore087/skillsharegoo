import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  UserCheck, 
  BookOpen, 
  Settings, 
  PlusCircle, 
  FileQuestion, 
  Layers, 
  Upload, 
  BarChart3, 
  Award,
  Sparkles,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TrainerOverview } from './TrainerOverview';
import { TrainerProfile } from './TrainerProfile';
import { MyCourses } from './MyCourses';
import { CourseManagement } from './CourseManagement';
import { CreateQuestionnaire } from './CreateQuestionnaire';
import { ManageQuestionnaires } from './ManageQuestionnaires';
import { TrainerLibrary } from './TrainerLibrary';
import { UploadResource } from './UploadResource';
import { TraineePerformance } from './TraineePerformance';
import { AssessmentResults } from './AssessmentResults';

export const TrainerDashboard: React.FC = () => {
  const { activeTab, setActiveTab, currentUser, subjectAssessments, learningResources } = useApp();

  // The 10 official pages for the Trainer Module
  const trainerPages = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'trainer-profile', label: 'Trainer Profile', icon: UserCheck },
    { id: 'my-courses', label: 'My Courses', icon: BookOpen },
    { id: 'course-management', label: 'Course Management', icon: Settings },
    { id: 'create-questionnaire', label: 'Create Questionnaire', icon: PlusCircle },
    { id: 'manage-questionnaires', label: 'Manage Questionnaires', icon: FileQuestion, count: subjectAssessments.length },
    { id: 'trainer-library', label: 'Trainer Library', icon: Layers, count: learningResources.length },
    { id: 'upload-resource', label: 'Upload Resource', icon: Upload },
    { id: 'trainee-performance', label: 'Trainee Performance', icon: BarChart3 },
    { id: 'assessment-results', label: 'Assessment Results', icon: Award },
  ];

  // Render the corresponding active page
  const renderActivePage = () => {
    switch (activeTab) {
      case 'trainer-profile':
        return <TrainerProfile />;
      case 'my-courses':
        return <MyCourses />;
      case 'course-management':
        return <CourseManagement />;
      case 'create-questionnaire':
        return <CreateQuestionnaire />;
      case 'manage-questionnaires':
        return <ManageQuestionnaires />;
      case 'trainer-library':
        return <TrainerLibrary />;
      case 'upload-resource':
        return <UploadResource />;
      case 'trainee-performance':
        return <TraineePerformance />;
      case 'assessment-results':
        return <AssessmentResults />;
      case 'overview':
      default:
        return <TrainerOverview />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Faculty Quick Navigation Bar (Horizontal Tab Strip) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2.5 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {trainerPages.map((page) => {
            const Icon = page.icon;
            const isActive = activeTab === page.id;

            return (
              <button
                key={page.id}
                id={`trainer-top-tab-${page.id}`}
                onClick={() => setActiveTab(page.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{page.label}</span>
                {page.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {page.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Render the Active Page Component */}
      <div className="min-w-0">
        {renderActivePage()}
      </div>
    </div>
  );
};
