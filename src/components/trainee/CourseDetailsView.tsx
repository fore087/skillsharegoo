import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Award, 
  Users, 
  Star, 
  BookOpen, 
  CheckCircle2, 
  Play, 
  FileText, 
  ShieldCheck, 
  Video, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Sparkles,
  Share2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Course, Lesson, Module } from '../../types';

interface CourseDetailsViewProps {
  courseId?: string;
  onBack?: () => void;
  onOpenViewer?: (course: Course) => void;
}

export const CourseDetailsView: React.FC<CourseDetailsViewProps> = ({
  courseId,
  onBack,
  onOpenViewer
}) => {
  const { 
    courses, 
    selectedCourseDetailsId, 
    enrollInCourse, 
    setActiveTab, 
    learningResources,
    startAssessment
  } = useApp();

  const activeId = courseId || selectedCourseDetailsId || 'crs-101';
  const course = courses.find(c => c.id === activeId) || courses[0];

  const [enrollSuccessMessage, setEnrollSuccessMessage] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [course?.modules?.[0]?.id || 'mod-1']: true,
    [course?.modules?.[1]?.id || 'mod-2']: true,
  });

  if (!course) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-slate-200">
        <p className="text-slate-600">Course details not found.</p>
        <button
          onClick={() => setActiveTab('catalog')}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const isEnrolled = (course.progress || 0) > 0;
  const isCompleted = (course.progress || 0) === 100;

  const toggleModule = (id: string) => {
    setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEnroll = () => {
    enrollInCourse(course.id);
    setEnrollSuccessMessage(true);
    setTimeout(() => {
      setEnrollSuccessMessage(false);
    }, 4000);
  };

  const courseResources = learningResources.filter(r => r.courseId === course.id);

  const getLessonIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'video': return <Video className="w-3.5 h-3.5 text-blue-500" />;
      case 'reading': return <BookOpen className="w-3.5 h-3.5 text-emerald-500" />;
      case 'interactive': return <Play className="w-3.5 h-3.5 text-amber-500" />;
      case 'quiz': return <Award className="w-3.5 h-3.5 text-purple-500" />;
      default: return <FileText className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Top Breadcrumb / Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack ? onBack : () => setActiveTab('catalog')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Course Catalog
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-mono">Code: {course.code}</span>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
            {course.category}
          </span>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left / Main Info */}
          <div className="lg:col-span-8 p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-slate-900 text-white rounded">
                {course.level} Level
              </span>
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                Accredited Syllabus
              </span>
              <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {course.rating} Rating
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              {course.title}
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed">
              {course.description}
            </p>

            {/* Quick Metadata Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div>
                <p className="text-slate-400 font-medium">Duration</p>
                <p className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  {course.durationWeeks} Weeks
                </p>
              </div>

              <div>
                <p className="text-slate-400 font-medium">Instruction Hours</p>
                <p className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  {course.totalHours} Total Hours
                </p>
              </div>

              <div>
                <p className="text-slate-400 font-medium">Enrolled Public Officers</p>
                <p className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  {course.enrolledCount} Active
                </p>
              </div>

              <div>
                <p className="text-slate-400 font-medium">Accreditation Authority</p>
                <p className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  NBDCA Certified
                </p>
              </div>
            </div>
          </div>

          {/* Right / Thumbnail & Action Card */}
          <div className="lg:col-span-4 bg-slate-50 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200">
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden shadow-xs h-44">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <span className="absolute bottom-2.5 left-3 text-white text-xs font-semibold flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Includes Interactive Labs
                </span>
              </div>

              {enrollSuccessMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-start gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Successfully Enrolled!</p>
                    <p className="font-normal mt-0.5">Track added to your "My Courses" hub.</p>
                  </div>
                </div>
              )}

              {isEnrolled ? (
                <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700">Your Course Progress</span>
                    <span className="text-blue-700 font-bold">{course.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${course.progress || 0}%` }}
                    />
                  </div>

                  <button
                    onClick={() => {
                      if (onOpenViewer) {
                        onOpenViewer(course);
                      } else {
                        setActiveTab('my-courses');
                      }
                    }}
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" />
                    {isCompleted ? 'Review Completed Syllabus' : 'Continue Learning Track'}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={handleEnroll}
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <BookOpen className="w-4 h-4" />
                    Enroll in Capacity Track
                  </button>
                  <p className="text-[11px] text-center text-slate-500 font-medium">
                    Fully sponsored for verified institutional civil servants
                  </p>
                </div>
              )}
            </div>

            {/* Trainer Avatar & Info */}
            <div className="pt-4 mt-4 border-t border-slate-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">
                {course.instructorName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">{course.instructorName}</p>
                <p className="text-[11px] text-slate-500 truncate">{course.instructorRole}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Syllabus & Objectives / Trainer Bio & Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Syllabus & Objectives */}
        <div className="lg:col-span-2 space-y-6">
          {/* Learning Objectives */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Core Competencies & Learning Objectives
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.objectives.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course Modules Syllabus */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Curriculum Modules & Lessons
                </h3>
                <p className="text-xs text-slate-500">
                  {course.modules.length} Modules • {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} Total Lessons
                </p>
              </div>

              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                Self-Paced with Faculty Hours
              </span>
            </div>

            <div className="space-y-3">
              {course.modules.map((mod, modIdx) => {
                const isOpen = expandedModules[mod.id];
                const completedCount = mod.lessons.filter(l => l.completed).length;

                return (
                  <div
                    key={mod.id}
                    className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50"
                  >
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="w-full p-4 text-left flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                          {modIdx + 1}
                        </span>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                            {mod.title}
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            {mod.durationHours} Hours • {mod.lessons.length} Lessons {isEnrolled && `• ${completedCount}/${mod.lessons.length} Completed`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="p-3 border-t border-slate-100 space-y-2 bg-slate-50">
                        {mod.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="p-2.5 rounded-lg bg-white border border-slate-200/80 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="shrink-0">{getLessonIcon(lesson.type)}</span>
                              <span className="font-medium text-slate-800 truncate">{lesson.title}</span>
                            </div>

                            <div className="flex items-center gap-3 text-[11px] text-slate-500 shrink-0">
                              <span>{lesson.durationMinutes} mins</span>
                              {lesson.completed && (
                                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Done
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Trainer & Learning Resources Preview */}
        <div className="space-y-6">
          {/* Trainer Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Faculty & Instructor
            </h3>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                {course.instructorName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{course.instructorName}</h4>
                <p className="text-xs text-slate-500">{course.instructorRole}</p>
                <p className="text-[11px] text-blue-600 font-medium mt-0.5">{course.department}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
              Senior faculty practitioner with extensive experience advising central public institutions and overseeing nationwide capacity initiatives.
            </p>
          </div>

          {/* Associated Learning Resources */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Included Learning Resources
              </h3>
              <button
                onClick={() => setActiveTab('resources')}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                All Resources
              </button>
            </div>

            {courseResources.length > 0 ? (
              <div className="space-y-2">
                {courseResources.map((res) => (
                  <div
                    key={res.id}
                    onClick={() => setActiveTab('resources')}
                    className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors flex items-start gap-2.5"
                  >
                    <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 line-clamp-1">{res.title}</p>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {res.type.toUpperCase()} • {res.durationOrPages}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                Syllabus readings, interactive lecture recordings, and slide decks included upon enrollment.
              </p>
            )}
          </div>

          {/* Assessment Shortcut */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50/50 p-5 rounded-2xl border border-purple-200/80 space-y-3">
            <div className="flex items-center gap-2 text-purple-800">
              <Award className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Subject Knowledge Check</h4>
            </div>
            <p className="text-xs text-purple-900">
              Test your competency with official MCQ questions to earn institutional certification.
            </p>
            <button
              onClick={() => {
                setActiveTab('assessments');
              }}
              className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors"
            >
              Take Course Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
