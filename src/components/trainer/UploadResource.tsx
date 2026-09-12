import React, { useState } from 'react';
import { 
  Upload, 
  Video, 
  Presentation, 
  FileText, 
  BookOpen, 
  Check, 
  Save, 
  AlertCircle, 
  Layers, 
  Tag, 
  HardDrive, 
  Clock, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LearningResource } from '../../types';

export const UploadResource: React.FC = () => {
  const { courses, addLearningResource, setActiveTab, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState(courses[0]?.id || 'crs-101');
  const [resourceType, setResourceType] = useState<'lecture' | 'presentation' | 'pdf' | 'study_material'>('lecture');
  const [description, setDescription] = useState('');
  const [metricValue, setMetricValue] = useState('45 mins'); // e.g. "45 mins" or "28 slides" or "18 pages"
  const [fileSize, setFileSize] = useState('14.2 MB');
  const [contentSnippet, setContentSnippet] = useState('');
  const [tagsInput, setTagsInput] = useState('Architecture, Governance, Public Goods');
  const [fileName, setFileName] = useState<string | null>('lecture_dpi_foundations_2026.mp4');

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Template Quick Loader
  const loadPreset = (type: 'lecture' | 'presentation' | 'pdf' | 'study_material') => {
    setResourceType(type);
    if (type === 'lecture') {
      setTitle('Masterclass: Sovereign Digital Architecture & Interoperability Rails');
      setCourseId('crs-101');
      setDescription('Comprehensive lecture breaking down open protocols, cryptographic signing at scale, and citizen consent gateways.');
      setMetricValue('52 mins');
      setFileSize('340 MB');
      setContentSnippet('Covers API federation standards, decoupled identity modules, and zero-downtime civil service registry upgrades.');
      setTagsInput('DPI, Microservices, Public Goods, API Gateway');
      setFileName('sovereign_dpi_lecture_v2.mp4');
    } else if (type === 'presentation') {
      setTitle('Executive Deck: Ethical AI Governance & Algorithmic Impact Sandboxes');
      setCourseId('crs-104');
      setDescription('32-slide faculty deck designed for senior policy directors assessing automated decision-making risks.');
      setMetricValue('32 slides');
      setFileSize('18.5 MB');
      setContentSnippet('Structured visual breakdown of the Algorithmic Impact Assessment (AIA) 5-stage lifecycle.');
      setTagsInput('AI Ethics, Algorithmic Risk, Policy Deck, Governance');
      setFileName('ai_governance_executive_deck.pptx');
    } else if (type === 'pdf') {
      setTitle('Technical Policy Whitepaper: Public Sector Zero-Trust Implementation Guide');
      setCourseId('crs-103');
      setDescription('Official 42-page handbook specifying mutual TLS configurations, credential expiration policies, and network isolation standards.');
      setMetricValue('42 pages');
      setFileSize('8.4 MB');
      setContentSnippet('Mandatory hardening benchmarks for national infrastructure databases and citizen records.');
      setTagsInput('Cybersecurity, Zero-Trust, Whitepaper, Federal Standard');
      setFileName('zero_trust_gov_handbook_2026.pdf');
    } else {
      setTitle('Civil Service Case Study & Interactive Workbook: Agile Public Service Delivery');
      setCourseId('crs-105');
      setDescription('Practical exercise workbook with simulated ministerial citizen grievance workflows and iterative user journeys.');
      setMetricValue('24 pages');
      setFileSize('4.6 MB');
      setContentSnippet('Includes step-by-step user-journey mapping exercises and grievance SLA calculation spreadsheets.');
      setTagsInput('Agile Delivery, Case Study, Workbook, Citizen Services');
      setFileName('agile_citizen_journey_workbook.pdf');
    }
    setErrorMsg(null);
  };

  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMsg('Please specify a resource title.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Please provide a brief description.');
      return;
    }

    const selectedCourse = courses.find(c => c.id === courseId) || courses[0];
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    const newResource: LearningResource = {
      id: `res-${Date.now()}`,
      courseId: selectedCourse.id,
      courseTitle: selectedCourse.title,
      title: title.trim(),
      type: resourceType,
      description: description.trim(),
      duration: resourceType === 'lecture' ? metricValue : undefined,
      pages: (resourceType === 'pdf' || resourceType === 'study_material' || resourceType === 'presentation') ? metricValue : undefined,
      fileSize: fileSize.trim() || '12.5 MB',
      uploadDate: 'Today',
      author: currentUser.name || 'Dr. Marcus Vance',
      downloadUrl: '#',
      contentSnippet: contentSnippet.trim() || undefined,
      tags: tags.length > 0 ? tags : ['General']
    };

    addLearningResource(newResource);
    setSaveSuccess(true);
    setErrorMsg(null);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Institutional Knowledge Ingestion</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Upload Learning Resource
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Publish recorded lectures, presentations, policy PDFs, and study materials into the curriculum repository.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold text-slate-400">Quick Fill:</span>
            <button
              onClick={() => loadPreset('lecture')}
              className="px-2 py-1 rounded-lg text-xs font-bold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 border border-slate-200 cursor-pointer"
            >
              Lecture
            </button>
            <button
              onClick={() => loadPreset('presentation')}
              className="px-2 py-1 rounded-lg text-xs font-bold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 border border-slate-200 cursor-pointer"
            >
              Deck
            </button>
            <button
              onClick={() => loadPreset('pdf')}
              className="px-2 py-1 rounded-lg text-xs font-bold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 border border-slate-200 cursor-pointer"
            >
              PDF
            </button>
            <button
              onClick={() => loadPreset('study_material')}
              className="px-2 py-1 rounded-lg text-xs font-bold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 border border-slate-200 cursor-pointer"
            >
              Study Material
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {saveSuccess && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs font-bold text-emerald-900">
              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Resource metadata saved locally! This item is now visible in the Trainer and Trainee Library.</span>
            </div>
            <button
              id="view-in-library-btn"
              onClick={() => setActiveTab('trainer-library')}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer self-start sm:self-auto"
            >
              <span>View in Library</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-300 flex items-center gap-2 text-xs font-bold text-rose-800">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Main Upload Form */}
      <form onSubmit={handleSaveResource} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
        {/* Resource Type Selection (Required 4 Categories) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            Resource Category <span className="text-rose-600">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'lecture', label: 'Recorded Lecture', icon: Video, metricHint: 'Duration (e.g. 45 mins)' },
              { id: 'presentation', label: 'Presentation', icon: Presentation, metricHint: 'Slides (e.g. 32 slides)' },
              { id: 'pdf', label: 'PDF Handbook', icon: FileText, metricHint: 'Pages (e.g. 18 pages)' },
              { id: 'study_material', label: 'Study Material', icon: BookOpen, metricHint: 'Scope (e.g. 12 pages)' },
            ].map((cat) => {
              const Icon = cat.icon;
              const isSelected = resourceType === cat.id;

              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => {
                    setResourceType(cat.id as any);
                    if (cat.id === 'lecture') setMetricValue('45 mins');
                    else if (cat.id === 'presentation') setMetricValue('30 slides');
                    else setMetricValue('20 pages');
                  }}
                  className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-600 ring-2 ring-emerald-600/20 text-emerald-950 font-bold'
                      : 'bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-emerald-700' : 'text-slate-500'}`} />
                  <div>
                    <p className="text-xs font-bold">{cat.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{cat.metricHint}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Title & Target Course */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Resource Title <span className="text-rose-600">*</span>
            </label>
            <input
              id="resource-title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Architectural Blueprint for Civil Service Registry"
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Target Course Syllabus <span className="text-rose-600">*</span>
            </label>
            <select
              id="resource-course-select"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
            >
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.code}: {c.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Description & Pedagogical Context <span className="text-rose-600">*</span>
          </label>
          <textarea
            id="resource-desc-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Detailed overview of what the trainee will learn from this resource..."
            className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        {/* Metric (Duration/Pages), File Size & Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {resourceType === 'lecture' ? 'Duration' : resourceType === 'presentation' ? 'Slide Count' : 'Page Count'}
            </label>
            <div className="relative">
              <Clock className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={metricValue}
                onChange={(e) => setMetricValue(e.target.value)}
                placeholder="e.g. 45 mins / 28 pages"
                className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Estimated File Size
            </label>
            <div className="relative">
              <HardDrive className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="e.g. 14.5 MB"
                className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Categorization Tags
            </label>
            <div className="relative">
              <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Comma-separated tags"
                className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>
        </div>

        {/* Content Snippet / Abstract */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Key Takeaways & Core Takeaways Snippet
          </label>
          <input
            type="text"
            value={contentSnippet}
            onChange={(e) => setContentSnippet(e.target.value)}
            placeholder="e.g. Essential guidelines for securing interoperability endpoints against automated DDoS attacks."
            className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300"
          />
        </div>

        {/* Interactive Drag & Drop File Upload Simulator */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Attach Media File or Document
          </label>
          <div
            onClick={() => {
              const names = [
                'digital_infrastructure_standard_2026.pdf',
                'zero_trust_lecture_part1.mp4',
                'executive_algorithmic_brief.pptx',
                'data_analytics_handbook.pdf'
              ];
              setFileName(names[Math.floor(Math.random() * names.length)]);
            }}
            className="border-2 border-dashed border-slate-300 hover:border-emerald-600 rounded-2xl p-6 text-center bg-slate-50/50 hover:bg-emerald-50/30 transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-emerald-600 text-slate-600 group-hover:text-white flex items-center justify-center mx-auto transition-colors">
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-800 mt-2">
              {fileName ? (
                <span className="text-emerald-800 font-mono flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Attached: {fileName}
                </span>
              ) : (
                'Drag and drop your file here, or click to browse'
              )}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Supports MP4, MOV, PDF, PPTX, DOCX up to 500 MB
            </p>
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('trainer-library')}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            id="save-resource-btn"
            type="submit"
            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Resource to Library</span>
          </button>
        </div>
      </form>
    </div>
  );
};
