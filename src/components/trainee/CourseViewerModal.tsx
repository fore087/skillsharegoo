import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  BookOpen, 
  Video, 
  FileText, 
  HelpCircle, 
  Award,
  ChevronDown,
  ChevronUp,
  Play
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Course, Lesson } from '../../types';
import { useApp } from '../../context/AppContext';

interface CourseViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
  onOpenAssessment?: () => void;
}

export const CourseViewerModal: React.FC<CourseViewerModalProps> = ({
  isOpen,
  onClose,
  course,
  onOpenAssessment,
}) => {
  const { toggleLessonComplete, generateCertificate } = useApp();
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'mod-1': true,
    'mod-2': true,
    'mod-3': true,
    'sec-mod-1': true,
    'sec-mod-2': true,
  });

  if (!course) return null;

  const toggleModule = (id: string) => {
    setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getLessonIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4 text-blue-500" />;
      case 'reading': return <BookOpen className="w-4 h-4 text-emerald-500" />;
      case 'interactive': return <Play className="w-4 h-4 text-amber-500" />;
      case 'quiz': return <HelpCircle className="w-4 h-4 text-purple-500" />;
      default: return <FileText className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={course.title}
      subtitle={`${course.code} • ${course.department} • ${course.durationWeeks} Weeks (${course.totalHours} Hours)`}
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Progress & Instructor bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Instructor:</span>
              <span className="text-xs font-bold text-slate-800">{course.instructorName}</span>
              <span className="text-[11px] text-slate-400">({course.instructorRole})</span>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-xl line-clamp-2">
              {course.description}
            </p>
          </div>

          <div className="w-full sm:w-48 shrink-0">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-700">Course Progress</span>
              <span className="font-bold text-blue-700">{course.progress || 0}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${course.progress || 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Selected Lesson Viewer Callout if active */}
        {activeLesson && (
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getLessonIcon(activeLesson.type)}
                <span className="text-xs font-bold uppercase text-blue-900 tracking-wide">
                  Active Study Session
                </span>
              </div>
              <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeLesson.durationMinutes} mins
              </span>
            </div>
            <h4 className="text-base font-bold text-slate-900 mt-1">
              {activeLesson.title}
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {activeLesson.summary || 'Follow along with the capacity building syllabus. Complete all practical reflections to validate your competency.'}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => {
                  // Find module for this lesson
                  const targetModule = course.modules.find(m => m.lessons.some(l => l.id === activeLesson.id));
                  if (targetModule) {
                    toggleLessonComplete(course.id, targetModule.id, activeLesson.id);
                    setActiveLesson({ ...activeLesson, completed: !activeLesson.completed });
                  }
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  activeLesson.completed
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {activeLesson.completed ? 'Completed (Click to Undo)' : 'Mark Lesson as Completed'}
              </button>
            </div>
          </div>
        )}

        {/* Modules & Syllabus */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900">Curriculum Syllabus</h4>
            <span className="text-xs text-slate-500">
              {course.modules.length} Modules • Click any lesson to launch
            </span>
          </div>

          {course.modules.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs">
              Curriculum modules are currently being provisioned by the faculty trainer.
            </div>
          ) : (
            course.modules.map((mod, mIdx) => {
              const isExpanded = expandedModules[mod.id] !== false;
              const completedCount = mod.lessons.filter(l => l.completed).length;

              return (
                <div key={mod.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                  {/* Module Header */}
                  <div
                    onClick={() => toggleModule(mod.id)}
                    className="flex items-center justify-between p-3.5 bg-slate-50/70 hover:bg-slate-100/70 cursor-pointer border-b border-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      {completedCount === mod.lessons.length && mod.lessons.length > 0 ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-400" />
                      )}
                      <span className="text-xs font-bold text-slate-900">
                        {mod.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-medium text-slate-500">
                        {completedCount}/{mod.lessons.length} done
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Lessons list */}
                  {isExpanded && (
                    <div className="divide-y divide-slate-100">
                      {mod.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          onClick={() => setActiveLesson(lesson)}
                          className={`flex items-center justify-between p-3 px-4 hover:bg-slate-50/80 cursor-pointer transition-colors ${
                            activeLesson?.id === lesson.id ? 'bg-blue-50/50' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLessonComplete(course.id, mod.id, lesson.id);
                              }}
                              className="focus:outline-hidden text-slate-400 hover:text-blue-600"
                            >
                              {lesson.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Circle className="w-4 h-4" />
                              )}
                            </button>

                            <div className="flex items-center gap-2">
                              {getLessonIcon(lesson.type)}
                              <span
                                className={`text-xs font-medium ${
                                  lesson.completed ? 'line-through text-slate-400' : 'text-slate-800'
                                }`}
                              >
                                {lesson.title}
                              </span>
                            </div>
                          </div>

                          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3" />
                            {lesson.durationMinutes}m
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Action footer */}
        <div className="flex flex-wrap items-center justify-between pt-4 border-t border-slate-100 gap-3">
          <div className="flex items-center gap-2">
            {onOpenAssessment && (
              <button
                onClick={onOpenAssessment}
                className="px-4 py-2 text-xs font-semibold bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 rounded-lg flex items-center gap-2 transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                Launch Competency Quiz
              </button>
            )}
            {(course.progress || 0) >= 100 && (
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <Award className="w-4 h-4" />
                Completed! Certificate Issued
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </Modal>
  );
};
