import React, { useState } from 'react';
import { 
  BookOpen, 
  Settings, 
  Layers, 
  FileQuestion, 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Save, 
  Video, 
  BookMarked, 
  Sparkles, 
  Upload, 
  Clock, 
  Award,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Course, Module, Lesson } from '../../types';

export const CourseManagement: React.FC = () => {
  const { 
    courses, 
    selectedManageCourseId, 
    setSelectedManageCourseId, 
    subjectAssessments, 
    learningResources, 
    traineePerformance,
    setActiveTab 
  } = useApp();

  const currentCourse = courses.find(c => c.id === selectedManageCourseId) || courses[0];

  const [activeSubTab, setActiveSubTab] = useState<'syllabus' | 'assessments' | 'resources' | 'roster' | 'settings'>('syllabus');

  // Module & Lesson addition state
  const [modules, setModules] = useState<Module[]>(currentCourse?.modules || []);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [isAddingModule, setIsAddingModule] = useState(false);

  // Lesson state for adding
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonType, setLessonType] = useState<'video' | 'reading' | 'interactive' | 'quiz'>('video');
  const [lessonDuration, setLessonDuration] = useState(25);
  const [lessonSummary, setLessonSummary] = useState('');

  // Course settings state
  const [courseTitle, setCourseTitle] = useState(currentCourse?.title || '');
  const [courseDesc, setCourseDesc] = useState(currentCourse?.description || '');
  const [courseCategory, setCourseCategory] = useState(currentCourse?.category || '');
  const [courseLevel, setCourseLevel] = useState(currentCourse?.level || 'Intermediate');
  const [isSaved, setIsSaved] = useState(false);

  // Synchronize when selectedManageCourseId changes
  React.useEffect(() => {
    if (currentCourse) {
      setModules(currentCourse.modules || []);
      setCourseTitle(currentCourse.title);
      setCourseDesc(currentCourse.description);
      setCourseCategory(currentCourse.category);
      setCourseLevel(currentCourse.level);
    }
  }, [selectedManageCourseId, currentCourse]);

  const handleAddModule = () => {
    if (!newModuleTitle.trim()) return;
    const newMod: Module = {
      id: `mod-${Date.now()}`,
      title: newModuleTitle.trim(),
      durationHours: 2,
      order: modules.length + 1,
      lessons: [
        {
          id: `lsn-${Date.now()}-1`,
          title: 'Introduction & Core Foundations',
          type: 'reading',
          durationMinutes: 15,
          completed: false,
          summary: 'Orientation to national governance standards and architectural frameworks.'
        }
      ]
    };
    setModules([...modules, newMod]);
    setNewModuleTitle('');
    setIsAddingModule(false);
  };

  const handleAddLesson = (moduleId: string) => {
    if (!lessonTitle.trim()) return;
    const newLesson: Lesson = {
      id: `lsn-${Date.now()}`,
      title: lessonTitle.trim(),
      type: lessonType,
      durationMinutes: Number(lessonDuration) || 20,
      completed: false,
      summary: lessonSummary.trim() || 'Instructional syllabus item for civil servant learning cohort.'
    };

    setModules(prev => prev.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: [...m.lessons, newLesson]
        };
      }
      return m;
    }));

    setLessonTitle('');
    setLessonSummary('');
    setSelectedModuleId(null);
  };

  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    setModules(prev => prev.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: m.lessons.filter(l => l.id !== lessonId)
        };
      }
      return m;
    }));
  };

  const handleSaveSettings = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  // Linked assessments and resources for this specific course
  const linkedAssessments = subjectAssessments.filter(a => a.courseId === currentCourse?.id);
  const linkedResources = learningResources.filter(r => r.courseId === currentCourse?.id);
  const courseRoster = traineePerformance.filter(p => p.courseId === currentCourse?.id);

  return (
    <div className="space-y-6">
      {/* Course Switcher & Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Curriculum Control Engine</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Course Management: {currentCourse?.title}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage syllabus hierarchy, attached questionnaires, learning files, and trainee rosters.
            </p>
          </div>

          {/* Quick Dropdown to switch courses */}
          <div className="flex items-center gap-2 self-start lg:self-auto">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Switch Course:</span>
            <select
              id="course-management-select"
              value={currentCourse?.id}
              onChange={(e) => setSelectedManageCourseId(e.target.value)}
              className="text-xs font-bold text-slate-800 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
            >
              {courses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.code}: {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Course Sub Tabs */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'syllabus', label: 'Modules & Lessons', icon: BookOpen, count: modules.length },
            { id: 'assessments', label: 'Linked Questionnaires', icon: FileQuestion, count: linkedAssessments.length },
            { id: 'resources', label: 'Linked Resources', icon: Layers, count: linkedResources.length },
            { id: 'roster', label: 'Enrolled Trainees', icon: Users, count: courseRoster.length },
            { id: 'settings', label: 'Course Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* SubTab 1: Syllabus (Modules & Lessons) */}
      {activeSubTab === 'syllabus' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">
              Course Structure ({modules.length} Modules, {modules.reduce((acc, m) => acc + m.lessons.length, 0)} Lessons)
            </h2>

            <button
              id="course-add-module-toggle-btn"
              onClick={() => setIsAddingModule(true)}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Module</span>
            </button>
          </div>

          {/* Add Module Input Drawer */}
          {isAddingModule && (
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-300 flex items-center gap-3">
              <input
                id="new-module-title-input"
                type="text"
                value={newModuleTitle}
                onChange={(e) => setNewModuleTitle(e.target.value)}
                placeholder="Enter new module title (e.g., Module 4: Incident Response & Digital Forensics)"
                className="flex-1 text-xs px-3 py-2 bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <button
                id="save-new-module-btn"
                onClick={handleAddModule}
                className="px-3 py-2 bg-emerald-700 text-white text-xs font-bold rounded-lg hover:bg-emerald-800 cursor-pointer"
              >
                Create Module
              </button>
              <button
                onClick={() => setIsAddingModule(false)}
                className="px-3 py-2 bg-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-300 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Modules List */}
          <div className="space-y-4">
            {modules.map((mod, modIdx) => (
              <div key={mod.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">
                      {modIdx + 1}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">{mod.title}</h3>
                    <span className="text-[11px] text-slate-400">({mod.lessons.length} lessons)</span>
                  </div>

                  <button
                    onClick={() => setSelectedModuleId(selectedModuleId === mod.id ? null : mod.id)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Lesson</span>
                  </button>
                </div>

                {/* Add Lesson Form */}
                {selectedModuleId === mod.id && (
                  <div className="p-4 bg-slate-100/70 border-b border-slate-200 space-y-3">
                    <h4 className="text-xs font-bold text-slate-800">Add Lesson to {mod.title}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={lessonTitle}
                        onChange={(e) => setLessonTitle(e.target.value)}
                        placeholder="Lesson title..."
                        className="sm:col-span-2 text-xs px-3 py-1.5 bg-white rounded-lg border border-slate-300"
                      />
                      <div className="flex gap-2">
                        <select
                          value={lessonType}
                          onChange={(e) => setLessonType(e.target.value as any)}
                          className="text-xs px-2 py-1.5 bg-white rounded-lg border border-slate-300 flex-1"
                        >
                          <option value="video">Video Lecture</option>
                          <option value="reading">Policy Reading</option>
                          <option value="interactive">Interactive Sandbox</option>
                          <option value="quiz">Formative Quiz</option>
                        </select>
                        <input
                          type="number"
                          value={lessonDuration}
                          onChange={(e) => setLessonDuration(Number(e.target.value))}
                          placeholder="Mins"
                          className="w-16 text-xs px-2 py-1.5 bg-white rounded-lg border border-slate-300"
                        />
                      </div>
                    </div>
                    <textarea
                      value={lessonSummary}
                      onChange={(e) => setLessonSummary(e.target.value)}
                      placeholder="Brief lesson pedagogical objectives or summary..."
                      rows={2}
                      className="w-full text-xs p-2 bg-white rounded-lg border border-slate-300"
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setSelectedModuleId(null)}
                        className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-xs font-bold"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleAddLesson(mod.id)}
                        className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold"
                      >
                        Save Lesson
                      </button>
                    </div>
                  </div>
                )}

                {/* Lessons Table */}
                <div className="divide-y divide-slate-100">
                  {mod.lessons.map((lesson, lsnIdx) => (
                    <div key={lesson.id} className="p-3.5 hover:bg-slate-50/60 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xs font-mono text-slate-400 w-5">
                          {modIdx + 1}.{lsnIdx + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">{lesson.title}</p>
                          <p className="text-[11px] text-slate-500 truncate">{lesson.summary}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                          {lesson.type}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {lesson.durationMinutes}m
                        </span>
                        <button
                          onClick={() => handleDeleteLesson(mod.id, lesson.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 2: Linked Questionnaires */}
      {activeSubTab === 'assessments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-800">
                Course Questionnaires ({linkedAssessments.length})
              </h2>
              <p className="text-xs text-slate-500">Official graded exams and questionnaires assigned to this syllabus track</p>
            </div>

            <button
              onClick={() => setActiveTab('create-questionnaire')}
              className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Questionnaire for this Course</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {linkedAssessments.map((asm) => (
              <div key={asm.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {asm.difficulty}
                    </span>
                    <span className="text-xs text-slate-400">{asm.totalQuestions} Questions</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{asm.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{asm.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Passing: <strong>{asm.passingScore}%</strong></span>
                  <button
                    onClick={() => setActiveTab('manage-questionnaires')}
                    className="text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Manage in Hub</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}

            {linkedAssessments.length === 0 && (
              <div className="col-span-2 p-8 text-center bg-white rounded-xl border border-slate-200">
                <FileQuestion className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700">No questionnaires currently linked to {currentCourse?.title}</p>
                <button
                  onClick={() => setActiveTab('create-questionnaire')}
                  className="mt-3 px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold"
                >
                  Create Assessment Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SubTab 3: Linked Resources */}
      {activeSubTab === 'resources' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-800">
                Attached Learning Resources ({linkedResources.length})
              </h2>
              <p className="text-xs text-slate-500">Recorded lectures, presentations, PDFs, and study materials</p>
            </div>

            <button
              onClick={() => setActiveTab('upload-resource')}
              className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Resource for this Course</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {linkedResources.map((res) => (
              <div key={res.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                      {res.type}
                    </span>
                    <span className="text-[11px] text-slate-400">{res.duration || res.pages || res.fileSize}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{res.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{res.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">{res.uploadDate}</span>
                  <button
                    onClick={() => setActiveTab('trainer-library')}
                    className="text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect in Library</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}

            {linkedResources.length === 0 && (
              <div className="col-span-2 p-8 text-center bg-white rounded-xl border border-slate-200">
                <Layers className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700">No resources linked to this course</p>
                <button
                  onClick={() => setActiveTab('upload-resource')}
                  className="mt-3 px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold"
                >
                  Upload Learning Resource
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SubTab 4: Enrolled Trainees Roster */}
      {activeSubTab === 'roster' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Enrolled Trainee Roster</h2>
              <p className="text-xs text-slate-500">Public servants actively enrolled in this curriculum track</p>
            </div>
            <button
              onClick={() => setActiveTab('trainee-performance')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
            >
              Full Performance Matrix &rarr;
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <tr>
                  <th className="p-3">Trainee</th>
                  <th className="p-3">Department</th>
                  <th className="p-3 text-center">Score</th>
                  <th className="p-3 text-center">Completion</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courseRoster.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/70">
                    <td className="p-3 flex items-center gap-2.5">
                      <img src={t.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-slate-900">{t.traineeName}</p>
                        <p className="text-[10px] text-slate-400">{t.traineeEmail}</p>
                      </div>
                    </td>
                    <td className="p-3 text-slate-600">{t.department}</td>
                    <td className="p-3 text-center font-bold text-slate-900">{t.score}%</td>
                    <td className="p-3 text-center">
                      <div className="inline-flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${t.completion}%` }} />
                        </div>
                        <span className="font-semibold">{t.completion}%</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        t.status === 'Certified' ? 'bg-emerald-100 text-emerald-800' :
                        t.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SubTab 5: Settings */}
      {activeSubTab === 'settings' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4 max-w-2xl">
          <h2 className="text-sm font-bold text-slate-900">Course Metadata & Parameters</h2>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Course Title</label>
              <input
                type="text"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
              <textarea
                value={courseDesc}
                onChange={(e) => setCourseDesc(e.target.value)}
                rows={3}
                className="w-full text-xs p-3 rounded-xl border border-slate-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Track Category</label>
                <input
                  type="text"
                  value={courseCategory}
                  onChange={(e) => setCourseCategory(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Difficulty Level</label>
                <select
                  value={courseLevel}
                  onChange={(e) => setCourseLevel(e.target.value as any)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="pt-3 flex items-center gap-3">
              <button
                id="course-settings-save-btn"
                onClick={handleSaveSettings}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Course Parameters</span>
              </button>
              {isSaved && (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Parameters saved successfully
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
