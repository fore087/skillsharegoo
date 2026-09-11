import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Video, 
  Presentation, 
  BookMarked, 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  Play, 
  Pause, 
  Volume2, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Check, 
  Copy, 
  Sparkles, 
  Clock, 
  Share2, 
  CheckSquare, 
  ListOrdered,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LearningResource } from '../../types';
import { Modal } from '../common/Modal';

export const LearningResourcesView: React.FC = () => {
  const { learningResources, courses } = useApp();

  const [activeTypeFilter, setActiveTypeFilter] = useState<'all' | 'video' | 'pdf' | 'presentation' | 'study_material'>('all');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active resource for modal viewer
  const [activeResource, setActiveResource] = useState<LearningResource | null>(null);

  // Video player simulation state
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState('1x');
  const [activeTabInsidePlayer, setActiveTabInsidePlayer] = useState<'chapters' | 'notes' | 'transcript'>('chapters');

  // PDF viewer simulation state
  const [pdfPage, setPdfPage] = useState(1);
  const [pdfZoom, setPdfZoom] = useState(100);

  // Presentation viewer state
  const [currentSlide, setCurrentSlide] = useState(1);

  // Study material checklist state
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filteredResources = useMemo(() => {
    return learningResources.filter(res => {
      const matchesType = activeTypeFilter === 'all' || res.type === activeTypeFilter;
      const matchesCourse = selectedCourseFilter === 'all' || res.courseId === selectedCourseFilter;
      const matchesSearch = 
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesType && matchesCourse && matchesSearch;
    });
  }, [learningResources, activeTypeFilter, selectedCourseFilter, searchQuery]);

  const openViewer = (res: LearningResource) => {
    setActiveResource(res);
    setIsPlaying(false);
    setPdfPage(1);
    setPdfZoom(100);
    setCurrentSlide(1);
    setActiveTabInsidePlayer('chapters');
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getTypeIcon = (type: LearningResource['type']) => {
    switch (type) {
      case 'lecture': return <Video className="w-4 h-4 text-blue-600" />;
      case 'pdf': return <FileText className="w-4 h-4 text-rose-600" />;
      case 'presentation': return <Presentation className="w-4 h-4 text-amber-600" />;
      case 'study_material': return <BookMarked className="w-4 h-4 text-emerald-600" />;
    }
  };

  const getTypeBadge = (type: LearningResource['type']) => {
    switch (type) {
      case 'lecture': return <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded">Recorded Lecture</span>;
      case 'pdf': return <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded">Accredited PDF</span>;
      case 'presentation': return <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded">Slide Deck</span>;
      case 'study_material': return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded">Reference Toolkit</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
              Institutional Knowledge Base
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1.5">
              Curriculum Learning Resources
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Access masterclass recordings, policy whitepapers, lecture slide decks, and operational reference toolkits across your enrolled courses.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 shrink-0">
            <BookMarked className="w-4 h-4 text-blue-600" />
            <span>{learningResources.length} Reference Artifacts</span>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search resources by title, concept, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          {/* Course Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Course:</span>
            <select
              value={selectedCourseFilter}
              onChange={(e) => setSelectedCourseFilter(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white text-slate-700 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              <option value="all">All Associated Courses</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Type Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Resources' },
            { id: 'video', label: 'Recorded Lectures' },
            { id: 'pdf', label: 'Policy PDFs & Briefs' },
            { id: 'presentation', label: 'Slide Decks' },
            { id: 'study_material', label: 'Study & Reference Toolkits' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTypeFilter(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                activeTypeFilter === tab.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-3">
          <BookMarked className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No resources found</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try resetting your search query or selecting a different resource format filter.
          </p>
          <button
            onClick={() => {
              setActiveTypeFilter('all');
              setSelectedCourseFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between hover:border-blue-200 hover:shadow-md transition-all group"
            >
              <div className="p-5 space-y-3">
                {/* Header with Type Badge and Format Icon */}
                <div className="flex items-center justify-between">
                  {getTypeBadge(res.type)}
                  <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {res.durationOrPages}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                  {res.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {res.description}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="truncate font-medium text-slate-700">Course: {res.courseTitle}</span>
                  <span className="font-mono text-slate-400">{res.fileSize}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {res.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-50 text-[10px] font-semibold text-slate-600 border border-slate-200/80"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => openViewer(res)}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-2xs transition-colors"
                >
                  {res.type === 'video' ? (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      Watch Masterclass
                    </>
                  ) : res.type === 'pdf' ? (
                    <>
                      <FileText className="w-3.5 h-3.5" />
                      Read Document
                    </>
                  ) : res.type === 'presentation' ? (
                    <>
                      <Presentation className="w-3.5 h-3.5" />
                      Open Slide Deck
                    </>
                  ) : (
                    <>
                      <BookMarked className="w-3.5 h-3.5" />
                      Open Study Toolkit
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Modal Viewer for each resource type */}
      {activeResource && (
        <Modal
          isOpen={!!activeResource}
          onClose={() => setActiveResource(null)}
          title={activeResource.title}
          subtitle={`${activeResource.courseTitle} • ${activeResource.type.toUpperCase()} • ${activeResource.durationOrPages}`}
          maxWidth="4xl"
        >
          <div className="space-y-4">
            {/* 1. Video Player Simulation */}
            {activeResource.type === 'video' && (
              <div className="space-y-4">
                {/* Video Stage */}
                <div className="relative aspect-video bg-slate-950 rounded-2xl overflow-hidden flex flex-col justify-between p-4 shadow-md border border-slate-800">
                  <div className="flex items-center justify-between text-white text-xs z-10">
                    <span className="font-semibold bg-black/40 px-2 py-1 rounded backdrop-blur-xs">
                      {activeResource.instructorBio || 'Faculty Masterclass'}
                    </span>
                    <span className="text-white/70 font-mono">1080p HD • Institutional Feed</span>
                  </div>

                  {/* Center Play Button Graphic */}
                  <div className="flex flex-col items-center justify-center gap-2 my-auto z-10">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                    >
                      {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                    </button>
                    <p className="text-white/80 text-xs font-medium">
                      {isPlaying ? 'Streaming Institutional Lecture...' : 'Click to Play Masterclass Recording'}
                    </p>
                  </div>

                  {/* Player Controls Bar */}
                  <div className="bg-slate-900/80 backdrop-blur-md rounded-xl p-2.5 flex items-center justify-between gap-3 text-white text-xs z-10">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-blue-400">
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <Volume2 className="w-4 h-4 text-white/70" />
                      <span className="font-mono text-white/80 text-[11px]">
                        {isPlaying ? '14:25' : '00:00'} / {activeResource.durationOrPages}
                      </span>
                    </div>

                    {/* Scrubber bar */}
                    <div className="flex-1 max-w-md h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                      <div
                        className="bg-blue-500 h-full rounded-full transition-all"
                        style={{ width: isPlaying ? '35%' : '5%' }}
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={playbackSpeed}
                        onChange={e => setPlaybackSpeed(e.target.value)}
                        className="bg-slate-800 text-white text-[11px] rounded px-1.5 py-0.5 border border-slate-700"
                      >
                        <option value="1x">1.0x</option>
                        <option value="1.25x">1.25x</option>
                        <option value="1.5x">1.5x</option>
                        <option value="2x">2.0x</option>
                      </select>
                      <Maximize2 className="w-4 h-4 text-white/70 hover:text-white cursor-pointer" />
                    </div>
                  </div>
                </div>

                {/* Sub-tabs: Chapters, Faculty Notes, Transcript */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    {[
                      { id: 'chapters', label: 'Chapter Timestamps' },
                      { id: 'notes', label: 'Faculty Summary' },
                      { id: 'transcript', label: 'Lecture Transcript' }
                    ].map(t => (
                      <button
                        key={t.id}
                        onClick={() => setActiveTabInsidePlayer(t.id as any)}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                          activeTabInsidePlayer === t.id
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  {activeTabInsidePlayer === 'chapters' && (
                    <div className="space-y-2">
                      {(activeResource.chapters || [
                        { time: '00:00', title: 'Executive Introduction & Scope' },
                        { time: '12:30', title: 'Architecture Patterns & Protocol Standards' },
                        { time: '28:15', title: 'Regulatory Compliance & Cross-Border Frameworks' },
                        { time: '41:00', title: 'Case Studies: Aadhaar, Estonia X-Road, Brazil Pix' }
                      ]).map((ch, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs hover:bg-blue-50 cursor-pointer"
                        >
                          <span className="font-semibold text-slate-800">{ch.title}</span>
                          <span className="font-mono text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">
                            {ch.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTabInsidePlayer === 'notes' && (
                    <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-2">
                      <p className="font-bold text-slate-900">Key Takeaways from the Faculty:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Public infrastructure must be unbundled: identity, payments, and data exchange act as distinct modular layers.</li>
                        <li>Zero-Trust assumes internal perimeter compromise and enforces continuous mutual TLS authentication.</li>
                        <li>Citizen privacy should be protected by design through cryptographic verifiable credentials.</li>
                      </ul>
                    </div>
                  )}

                  {activeTabInsidePlayer === 'transcript' && (
                    <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-600 max-h-48 overflow-y-auto leading-relaxed space-y-2 font-serif">
                      <p><strong>[00:01] Prof. Vikram Nair:</strong> Welcome everyone to today&apos;s masterclass on Digital Public Infrastructure and modern e-Governance architectures.</p>
                      <p><strong>[00:45] Prof. Vikram Nair:</strong> When governments construct digital highways, they should not build monolithic walled gardens. Rather, we build open protocols that private and public entities can build on top of securely.</p>
                      <p><strong>[02:10] Prof. Vikram Nair:</strong> Notice how open APIs allow departmental registries to federate query responses without exposing raw relational citizen stores.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. PDF Document Viewer Simulation */}
            {activeResource.type === 'pdf' && (
              <div className="space-y-4">
                {/* PDF Viewer Header Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-100 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      disabled={pdfPage <= 1}
                      onClick={() => setPdfPage(p => Math.max(1, p - 1))}
                      className="p-1.5 rounded bg-white hover:bg-slate-50 border border-slate-300 disabled:opacity-40"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-semibold text-slate-700">
                      Page {pdfPage} of 18
                    </span>
                    <button
                      disabled={pdfPage >= 18}
                      onClick={() => setPdfPage(p => Math.min(18, p + 1))}
                      className="p-1.5 rounded bg-white hover:bg-slate-50 border border-slate-300 disabled:opacity-40"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPdfZoom(z => Math.max(75, z - 15))}
                      className="p-1.5 rounded bg-white hover:bg-slate-50 border border-slate-300"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-slate-700">{pdfZoom}%</span>
                    <button
                      onClick={() => setPdfZoom(z => Math.min(150, z + 15))}
                      className="p-1.5 rounded bg-white hover:bg-slate-50 border border-slate-300"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>

                  <a
                    href="#download"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Downloading official institutional document: "${activeResource.title}" (PDF, ${activeResource.fileSize})`);
                    }}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-1.5 shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PDF
                  </a>
                </div>

                {/* Simulated Document Canvas */}
                <div className="bg-slate-200/70 p-6 rounded-2xl flex justify-center overflow-x-auto min-h-[360px]">
                  <div
                    className="bg-white shadow-xl rounded-lg p-8 sm:p-12 border border-slate-300 max-w-2xl w-full text-slate-800 space-y-6 transition-all"
                    style={{ transform: `scale(${pdfZoom / 100})`, transformOrigin: 'top center' }}
                  >
                    <div className="border-b border-slate-200 pb-4 text-center">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                        NATIONAL DIGITAL CAPACITY INITIATIVE • OFFICIAL PUBLICATION
                      </span>
                      <h2 className="text-lg font-bold text-slate-900 mt-2">{activeResource.title}</h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Author: Directorate of Public Systems Architecture • Document Series {activeResource.id}
                      </p>
                    </div>

                    <div className="space-y-4 text-xs leading-relaxed text-slate-700 font-serif">
                      <p className="font-sans font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                        1. Executive Summary & Regulatory Rationale
                      </p>
                      <p>
                        This operational blueprint outlines the mandatory interoperability standards for all tier-1 and tier-2 ministerial software services. In accordance with Executive Directive 402, digital services must conform to standardized RESTful OpenAPIs, secure OAuth 2.0 mutual attestation, and data sanitization guidelines.
                      </p>
                      <div className="p-3 bg-amber-50 rounded border border-amber-200 font-sans text-[11px] text-amber-900">
                        <strong>Compliance Notice:</strong> Failure to align with data minimization principles may result in audit non-conformance during biennial capacity review cycles.
                      </div>
                      <p>
                        Furthermore, departments are required to decommission proprietary RPC mechanisms by Q4 2026 in favor of standardized event streams utilizing Apache Kafka or Cloud Pub/Sub with schema registries.
                      </p>
                    </div>

                    <div className="pt-8 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>CAPACITY CONNECT DOCUMENT REPOSITORY</span>
                      <span>PAGE {pdfPage} OF 18</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Presentation / Slide Deck Viewer */}
            {activeResource.type === 'presentation' && (
              <div className="space-y-4">
                {/* Slide Stage */}
                <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-8 sm:p-12 text-white flex flex-col justify-between shadow-lg border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span className="uppercase tracking-widest font-mono text-[10px]">
                      {activeResource.courseTitle}
                    </span>
                    <span className="font-semibold bg-white/10 px-2 py-0.5 rounded">
                      Slide {currentSlide} of 24
                    </span>
                  </div>

                  {/* Slide Main Content */}
                  <div className="space-y-4 max-w-xl my-auto">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                      Module Key Framework
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      {currentSlide === 1
                        ? activeResource.title
                        : currentSlide === 2
                        ? 'Architecture Paradigm: The 3 Layers of Modern DPI'
                        : currentSlide === 3
                        ? 'Zero-Trust Verification Pillars & Least Privilege'
                        : 'Citizen Data Minimization & Consent Management'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentSlide === 1
                        ? 'Comprehensive masterclass slides provided by the national faculty for civil service competency training.'
                        : currentSlide === 2
                        ? '1. Identity verification layer (verifiable credentials)\n2. Seamless rails payment layer\n3. Consent-driven data exchange protocol'
                        : currentSlide === 3
                        ? 'Continuous posture evaluation, fine-grained RBAC tokens, and encrypted transport tunnels across public cloud nodes.'
                        : 'Enforce purpose-bound telemetry and automated cryptographic expiration after transaction finality.'}
                    </p>
                  </div>

                  {/* Slide Navigation Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
                    <span className="text-white/60">Faculty: Capacity Connect Masterclasses</span>
                    <div className="flex items-center gap-2">
                      <button
                        disabled={currentSlide <= 1}
                        onClick={() => setCurrentSlide(s => Math.max(1, s - 1))}
                        className="px-3 py-1 rounded bg-white/20 hover:bg-white/30 text-white disabled:opacity-40"
                      >
                        Previous
                      </button>
                      <button
                        disabled={currentSlide >= 24}
                        onClick={() => setCurrentSlide(s => Math.min(24, s + 1))}
                        className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 font-semibold"
                      >
                        Next Slide
                      </button>
                    </div>
                  </div>
                </div>

                {/* Speaker Notes */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                  <p className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    Faculty Speaker Notes & Guidance:
                  </p>
                  <p className="leading-relaxed">
                    Emphasize to departmental trainees that digital transformation is not merely re-platforming legacy databases into cloud instances. It requires rethinking the citizen touchpoint and eliminating manual administrative friction.
                  </p>
                </div>
              </div>
            )}

            {/* 4. Study Material & Toolkits */}
            {activeResource.type === 'study_material' && (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                  <p className="font-bold">Operational Implementation Checklist</p>
                  <p>Check off items as you verify compliance across your departmental systems:</p>
                </div>

                {/* Interactive Checklist */}
                <div className="space-y-2">
                  {[
                    { id: 'chk-1', text: 'All public endpoints require TLS 1.3 encryption with verified certs' },
                    { id: 'chk-2', text: 'Multi-factor authentication (MFA) enabled for all administrative accounts' },
                    { id: 'chk-3', text: 'Data classification schema completed for all citizen PII datasets' },
                    { id: 'chk-4', text: 'Audit logging enabled and streaming to immutable centralized SIEM' },
                    { id: 'chk-5', text: 'Automated disaster recovery drill executed within the last 90 days' },
                  ].map(item => (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-colors flex items-center justify-between text-xs ${
                        checkedItems[item.id]
                          ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                          : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <span className={checkedItems[item.id] ? 'line-through font-medium' : 'font-medium'}>
                        {item.text}
                      </span>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                        checkedItems[item.id] ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
                      }`}>
                        {checkedItems[item.id] && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Useful Formula / CLI Cheat Sheet */}
                <div className="p-4 bg-slate-900 text-slate-200 rounded-xl space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Sample Automated Policy Audit Command</span>
                    <button
                      onClick={() => handleCopy('auditctl -w /etc/security/dpi-policy.conf -p wa -k dpi_rules', 'cmd1')}
                      className="hover:text-white flex items-center gap-1"
                    >
                      {copiedKey === 'cmd1' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      {copiedKey === 'cmd1' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-2 bg-slate-950 rounded text-emerald-400">
                    auditctl -w /etc/security/dpi-policy.conf -p wa -k dpi_rules
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
