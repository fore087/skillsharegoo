import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Play, 
  CheckCircle2, 
  Clock, 
  Award, 
  Calendar, 
  ArrowRight, 
  Sparkles,
  HelpCircle,
  BarChart2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Course } from '../../types';

interface MyCoursesViewProps {
  onOpenViewer: (course: Course) => void;
  onOpenAssessment: (course: Course) => void;
  onOpenCertificate: (courseId: string) => void;
}

export const MyCoursesView: React.FC<MyCoursesViewProps> = ({
  onOpenViewer,
  onOpenAssessment,
  onOpenCertificate
}) => {
  const { courses, setActiveTab, certificates, viewCourseDetails } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'in_progress' | 'completed'>('all');

  const enrolledCourses = useMemo(() => {
    return courses.filter(c => (c.progress || 0) > 0);
  }, [courses]);

  const filteredCourses = useMemo(() => {
    if (activeFilter === 'in_progress') {
      return enrolledCourses.filter(c => (c.progress || 0) < 100);
    }
    if (activeFilter === 'completed') {
      return enrolledCourses.filter(c => (c.progress || 0) === 100);
    }
    return enrolledCourses;
  }, [enrolledCourses, activeFilter]);

  const completedCount = enrolledCourses.filter(c => (c.progress || 0) === 100).length;
  const inProgressCount = enrolledCourses.filter(c => (c.progress || 0) < 100).length;
  const totalHours = enrolledCourses.reduce((acc, c) => acc + c.totalHours, 0);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Banner & Stats */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
              Personalized Capacity Pipeline
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1.5">
              My Enrolled Learning Tracks
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Track module progression, launch self-paced video sessions, take subject knowledge checks, and claim verified digital credentials.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('catalog')}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors shrink-0"
          >
            <BookOpen className="w-4 h-4" />
            Explore Catalog
          </button>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <p className="text-[11px] font-semibold text-slate-500">Enrolled Tracks</p>
            <p className="text-xl font-bold text-slate-900 mt-0.5">{enrolledCourses.length}</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <p className="text-[11px] font-semibold text-slate-500">In Progress</p>
            <p className="text-xl font-bold text-blue-600 mt-0.5">{inProgressCount}</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <p className="text-[11px] font-semibold text-slate-500">Completed Tracks</p>
            <p className="text-xl font-bold text-emerald-600 mt-0.5">{completedCount}</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <p className="text-[11px] font-semibold text-slate-500">Total Learning Commitment</p>
            <p className="text-xl font-bold text-purple-600 mt-0.5">{totalHours} Hours</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Tracks ({enrolledCourses.length})
          </button>

          <button
            onClick={() => setActiveFilter('in_progress')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeFilter === 'in_progress'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            In Progress ({inProgressCount})
          </button>

          <button
            onClick={() => setActiveFilter('completed')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeFilter === 'completed'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>
      </div>

      {/* Course List */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">
            {activeFilter === 'completed'
              ? 'No completed courses yet'
              : 'You have not enrolled in any courses in this view'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Explore our curriculum catalog to enroll in accredited digital public goods, data analytics, or cybersecurity courses.
          </p>
          <button
            onClick={() => setActiveTab('catalog')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl"
          >
            Browse Course Catalog
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCourses.map((course) => {
            const isFinished = (course.progress || 0) === 100;
            const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
            const completedLessons = course.modules.reduce(
              (acc, m) => acc + m.lessons.filter(l => l.completed).length,
              0
            );
            const hasCertificate = certificates.some(cert => cert.courseId === course.id);

            return (
              <div
                key={course.id}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-200 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
              >
                {/* Left: Thumbnail & Course Info */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 shadow-2xs">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute bottom-1.5 left-1.5 text-[10px] font-bold text-white bg-slate-900/80 px-1.5 py-0.5 rounded">
                      {course.level}
                    </span>
                  </div>

                  <div className="space-y-2 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                        {course.category}
                      </span>
                      <span className="font-mono text-slate-400 text-[11px]">{course.code}</span>
                      {isFinished && (
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Complete
                        </span>
                      )}
                    </div>

                    <h3 
                      onClick={() => viewCourseDetails(course.id)}
                      className="text-base font-bold text-slate-900 leading-snug hover:text-blue-600 cursor-pointer transition-colors"
                    >
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-1">
                      Faculty: <strong>{course.instructorName}</strong> ({course.instructorRole})
                    </p>

                    {/* Progress Bar & Sub-metrics */}
                    <div className="pt-2 max-w-md space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-600">
                          {completedLessons} of {totalLessons} Lessons Finished
                        </span>
                        <span className="font-bold text-blue-700">{course.progress || 0}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isFinished ? 'bg-emerald-500' : 'bg-blue-600'
                          }`}
                          style={{ width: `${course.progress || 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full md:w-auto shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <button
                    onClick={() => viewCourseDetails(course.id)}
                    className="flex-1 md:flex-initial px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => onOpenAssessment(course)}
                    className="flex-1 md:flex-initial px-3.5 py-2 text-xs font-semibold text-purple-800 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    Assessments
                  </button>

                  {hasCertificate && (
                    <button
                      onClick={() => onOpenCertificate(course.id)}
                      className="flex-1 md:flex-initial px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      Certificate
                    </button>
                  )}

                  <button
                    onClick={() => onOpenViewer(course)}
                    className="flex-1 md:flex-initial px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" />
                    {isFinished ? 'Review Track' : 'Continue Learning'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
