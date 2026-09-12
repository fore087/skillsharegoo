import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  Percent, 
  Award, 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  FileQuestion,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Course } from '../../types';

interface MyCoursesProps {
  onOpenCreateCourse: () => void;
}

export const MyCourses: React.FC<MyCoursesProps> = ({ onOpenCreateCourse }) => {
  const { courses, traineePerformance, subjectAssessments, learningResources, manageCourse, setActiveTab } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Digital Infrastructure', 'Data Analytics', 'Cybersecurity', 'Artificial Intelligence', 'Leadership'];

  // Helper to compute trainees, completion, and avg score per course
  const getCourseMetrics = (courseId: string) => {
    const courseRecords = traineePerformance.filter(p => p.courseId === courseId);
    
    // Default synthetic numbers if fresh demo
    const trainees = courseRecords.length > 0 
      ? courseRecords.length * 75 + 140 
      : 280;

    const completion = courseRecords.length > 0
      ? Math.round(courseRecords.reduce((acc, curr) => acc + curr.completion, 0) / courseRecords.length)
      : 84;

    const avgScore = courseRecords.length > 0
      ? Math.round(courseRecords.reduce((acc, curr) => acc + curr.score, 0) / courseRecords.length)
      : 89;

    const questionnairesCount = subjectAssessments.filter(a => a.courseId === courseId).length;
    const resourcesCount = learningResources.filter(r => r.courseId === courseId).length;

    return { trainees, completion, avgScore, questionnairesCount, resourcesCount };
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header with Search and Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-700" />
            My Courses & Curriculum Tracks
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Faculty course cohorts, trainee completion analytics, and active syllabus controls.
          </p>
        </div>

        <button
          id="my-courses-create-btn"
          onClick={onOpenCreateCourse}
          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Course</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="my-courses-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, codes, or keywords..."
            className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
          />
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Tracks' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => {
          const { trainees, completion, avgScore, questionnairesCount, resourcesCount } = getCourseMetrics(course.id);

          return (
            <div
              key={course.id}
              id={`course-card-${course.id}`}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-500/60 hover:shadow-xs transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Course Header Thumbnail or Pattern */}
                <div className="h-32 relative overflow-hidden bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-4 flex flex-col justify-between text-white">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-800/80 border border-emerald-400/40 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-200">
                      {course.code}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/20 text-[10px] font-bold">
                      {course.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-white leading-snug line-clamp-2">
                      {course.title}
                    </h3>
                  </div>
                </div>

                {/* Course Core Stats (Required: Trainees, Completion %, Avg Score) */}
                <div className="p-4 space-y-4">
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 py-3 px-2 rounded-xl bg-slate-50 border border-slate-100 text-center">
                    {/* Number of trainees */}
                    <div>
                      <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500">
                        <Users className="w-3 h-3 text-blue-600" />
                        <span>Trainees</span>
                      </div>
                      <p className="text-base font-black text-slate-900 mt-0.5">
                        {trainees.toLocaleString()}
                      </p>
                    </div>

                    {/* Completion percentage */}
                    <div>
                      <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500">
                        <Percent className="w-3 h-3 text-emerald-600" />
                        <span>Completion</span>
                      </div>
                      <p className="text-base font-black text-emerald-700 mt-0.5">
                        {completion}%
                      </p>
                    </div>

                    {/* Average score */}
                    <div>
                      <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500">
                        <Award className="w-3 h-3 text-amber-600" />
                        <span>Avg Score</span>
                      </div>
                      <p className="text-base font-black text-slate-900 mt-0.5">
                        {avgScore}%
                      </p>
                    </div>
                  </div>

                  {/* Progress bar visual for completion */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-500 font-medium">Cohort Syllabus Progress</span>
                      <span className="font-bold text-slate-800">{completion}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full transition-all"
                        style={{ width: `${completion}%` }}
                      />
                    </div>
                  </div>

                  {/* Questionnaire & Resource Badges */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span className="inline-flex items-center gap-1">
                      <FileQuestion className="w-3.5 h-3.5 text-amber-600" />
                      <strong>{questionnairesCount}</strong> Assessments
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-purple-600" />
                      <strong>{resourcesCount}</strong> Resources
                    </span>
                  </div>
                </div>
              </div>

              {/* Manage Button Footer (Required) */}
              <div className="p-4 pt-0">
                <button
                  id={`course-manage-btn-${course.id}`}
                  onClick={() => manageCourse(course.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer group-hover:bg-emerald-800"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Manage Course</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No courses match your criteria</h3>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your search query or selected track filter.</p>
        </div>
      )}
    </div>
  );
};
