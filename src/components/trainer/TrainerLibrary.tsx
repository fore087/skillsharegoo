import React, { useState } from 'react';
import { 
  Layers, 
  Video, 
  Presentation, 
  FileText, 
  BookOpen, 
  Upload, 
  Search, 
  Filter, 
  Trash2, 
  Download, 
  Eye, 
  X, 
  Calendar, 
  Clock, 
  HardDrive, 
  Tag, 
  Check, 
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LearningResource } from '../../types';

export const TrainerLibrary: React.FC = () => {
  const { learningResources, deleteLearningResource, courses, setActiveTab } = useApp();

  const [activeTypeFilter, setActiveTypeFilter] = useState<'all' | 'lecture' | 'presentation' | 'pdf' | 'study_material'>('all');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewResource, setPreviewResource] = useState<LearningResource | null>(null);

  const resourceTypes: { id: 'all' | 'lecture' | 'presentation' | 'pdf' | 'study_material'; label: string; icon: any }[] = [
    { id: 'all', label: 'All Resources', icon: Layers },
    { id: 'lecture', label: 'Recorded Lectures', icon: Video },
    { id: 'presentation', label: 'Presentations', icon: Presentation },
    { id: 'pdf', label: 'PDF Documents', icon: FileText },
    { id: 'study_material', label: 'Study Materials', icon: BookOpen },
  ];

  const filteredResources = learningResources.filter(res => {
    const matchesType = activeTypeFilter === 'all' || res.type === activeTypeFilter;
    const matchesCourse = selectedCourseFilter === 'all' || res.courseId === selectedCourseFilter;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesCourse && matchesSearch;
  });

  const getIconForType = (type: string) => {
    switch (type) {
      case 'lecture': return <Video className="w-4 h-4 text-emerald-600" />;
      case 'presentation': return <Presentation className="w-4 h-4 text-sky-600" />;
      case 'pdf': return <FileText className="w-4 h-4 text-purple-600" />;
      default: return <BookOpen className="w-4 h-4 text-amber-600" />;
    }
  };

  const getBadgeColorForType = (type: string) => {
    switch (type) {
      case 'lecture': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'presentation': return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'pdf': return 'bg-purple-50 text-purple-800 border-purple-200';
      default: return 'bg-amber-50 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Digital Repository • Faculty Knowledge Core</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Layers className="w-6 h-6 text-emerald-700" />
            Trainer Library & Media Repository
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage official video masterclasses, technical slides, policy PDFs, and syllabus materials accessible to trainees.
          </p>
        </div>

        <button
          id="library-upload-resource-btn"
          onClick={() => setActiveTab('upload-resource')}
          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Learning Resource</span>
        </button>
      </div>

      {/* Type Filter Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {resourceTypes.map(rt => {
          const Icon = rt.icon;
          const isActive = activeTypeFilter === rt.id;
          const count = rt.id === 'all' 
            ? learningResources.length 
            : learningResources.filter(r => r.type === rt.id).length;

          return (
            <button
              key={rt.id}
              onClick={() => setActiveTypeFilter(rt.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{rt.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Course Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources by title, topic, or tag..."
            className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Filter Course:</span>
          <select
            value={selectedCourseFilter}
            onChange={(e) => setSelectedCourseFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
          >
            <option value="all">All Courses</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.code}: {c.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:border-emerald-500/50 hover:shadow-xs transition-all flex flex-col justify-between p-5 space-y-4 group"
          >
            <div>
              {/* Type Badge & Metric */}
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold border capitalize ${getBadgeColorForType(res.type)}`}>
                  {getIconForType(res.type)}
                  <span>{res.type.replace('_', ' ')}</span>
                </span>

                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  {res.duration && <><Clock className="w-3 h-3" />{res.duration}</>}
                  {res.pages && <><FileText className="w-3 h-3" />{res.pages}</>}
                  {res.fileSize && <span className="ml-1.5">({res.fileSize})</span>}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-sm font-bold text-slate-900 mt-2.5 line-clamp-2 leading-snug group-hover:text-emerald-950">
                {res.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {res.description}
              </p>

              {/* Snippet / Key Takeaway */}
              {res.contentSnippet && (
                <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 italic">
                  "{res.contentSnippet}"
                </div>
              )}

              {/* Course Title Badge */}
              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-600">
                <BookOpen className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="truncate">{res.courseTitle}</span>
              </div>

              {/* Tags */}
              {res.tags && res.tags.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1">
                  {res.tags.slice(0, 3).map((tag, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[10px]">{res.uploadDate}</span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPreviewResource(res)}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => deleteLearningResource(res.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Remove Resource"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No resources found in this category</h3>
          <p className="text-xs text-slate-500 mt-1">Upload a new document or modify your active search filters.</p>
          <button
            onClick={() => setActiveTab('upload-resource')}
            className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 cursor-pointer"
          >
            Upload Resource
          </button>
        </div>
      )}

      {/* Preview Modal */}
      {previewResource && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getBadgeColorForType(previewResource.type)}`}>
                  {previewResource.type}
                </span>
                <h3 className="text-sm font-bold text-slate-900 truncate max-w-md">{previewResource.title}</h3>
              </div>
              <button
                onClick={() => setPreviewResource(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Simulation Player / Viewer */}
            <div className="p-6 space-y-4">
              <div className="w-full h-48 rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                <div className="relative z-10 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                    {getIconForType(previewResource.type)}
                  </div>
                  <h4 className="text-sm font-bold text-white">{previewResource.title}</h4>
                  <p className="text-xs text-emerald-200">
                    {previewResource.duration || previewResource.pages || previewResource.fileSize || 'Standard Asset Format'}
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[10px] text-slate-300 font-mono">
                    Accredited Institutional Repository Asset
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Target Course: <strong>{previewResource.courseTitle}</strong></span>
                  <span>Uploaded: <strong>{previewResource.uploadDate}</strong></span>
                </div>
                <p className="text-slate-700 leading-relaxed">{previewResource.description}</p>
                {previewResource.contentSnippet && (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-medium">
                    <span className="font-bold block text-[11px] uppercase tracking-wider text-emerald-800 mb-1">Key Syllabus Abstract</span>
                    {previewResource.contentSnippet}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50 text-xs">
              <span className="text-slate-500">Author: {previewResource.author}</span>
              <button
                onClick={() => setPreviewResource(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
