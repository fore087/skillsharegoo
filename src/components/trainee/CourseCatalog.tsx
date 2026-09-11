import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  Calendar, 
  Users, 
  Star, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Course } from '../../types';

interface CourseCatalogProps {
  onSelectCourse?: (course: Course) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({ onSelectCourse }) => {
  const { courses, enrollInCourse, viewCourseDetails } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = ['All', 'Governance', 'Technology & AI', 'Cybersecurity', 'Public Administration', 'Data Analytics', 'Project Leadership'];
    return cats;
  }, []);

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = 
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase()) ||
        course.instructorName.toLowerCase().includes(search.toLowerCase()) ||
        course.code.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = 
        selectedCategory === 'All' || course.category === selectedCategory;

      const matchesDifficulty = 
        selectedDifficulty === 'All' || course.level === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [courses, search, selectedCategory, selectedDifficulty]);

  const handleViewCourse = (course: Course) => {
    if (onSelectCourse) {
      onSelectCourse(course);
    } else {
      viewCourseDetails(course.id);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
              National Institutional Curriculum
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1.5">
              Capacity Building Course Catalog
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Accredited digital competencies, governance roadmaps, data analytics, and cybersecurity standards for public sector officers and continuous learners.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <div className="text-left">
              <p className="text-xs font-bold text-slate-900">{courses.length} Accredited Tracks</p>
              <p className="text-[11px] text-slate-500">Continuous Curriculum</p>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses, instructors, codes, or competencies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 text-xs bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Difficulty Filter Dropdown / Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Level:</span>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {difficulties.map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    selectedDifficulty === diff
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="text-base font-bold text-slate-800">No matching capacity tracks found</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your search query or reset your category and level filters.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
              setSelectedDifficulty('All');
            }}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((course) => {
            const isEnrolled = (course.progress || 0) > 0;

            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-blue-200 transition-all group"
              >
                <div>
                  {/* Thumbnail Banner */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {course.category}
                      </span>
                      <span className="bg-blue-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {course.level}
                      </span>
                    </div>

                    {/* Bottom Info on Image */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px]">
                      <span className="font-mono text-white/90 font-medium">{course.code}</span>
                      <span className="flex items-center gap-1 font-semibold text-amber-300">
                        <Star className="w-3 h-3 fill-amber-300" />
                        {course.rating}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Trainer & Metadata Info */}
                    <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-700 truncate">
                          Faculty: <strong>{course.instructorName}</strong>
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {course.durationWeeks} wks ({course.totalHours} hrs)
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          {course.enrolledCount} enrolled
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleViewCourse(course)}
                    className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1"
                  >
                    View Course
                  </button>

                  {isEnrolled ? (
                    <button
                      onClick={() => handleViewCourse(course)}
                      className="w-full py-2 px-3 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors flex items-center justify-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Enrolled ({course.progress || 0}%)
                    </button>
                  ) : (
                    <button
                      onClick={() => enrollInCourse(course.id)}
                      className="w-full py-2 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1"
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
