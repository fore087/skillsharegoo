import React, { useState } from 'react';
import { 
  FileQuestion, 
  Plus, 
  Trash2, 
  Save, 
  Check, 
  AlertCircle, 
  HelpCircle, 
  Clock, 
  Calendar, 
  BookOpen, 
  Award, 
  Sparkles, 
  ChevronRight,
  Play
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SubjectAssessment, QuizQuestion } from '../../types';

export const CreateQuestionnaire: React.FC = () => {
  const { courses, addSubjectAssessment, setActiveTab, startAssessment } = useApp();

  // Form Fields (as requested)
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState(courses[0]?.id || 'crs-101');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('2026-10-30');
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [passingScore, setPassingScore] = useState(70);

  // Questions array: each has question, 4 options, correctAnswer (0..3), and optional explanation
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: 1,
      question: 'Which of the following constitutes the primary foundation of Digital Public Infrastructure (DPI)?',
      options: [
        'Proprietary closed-source enterprise database silos',
        'Open, interoperable, minimal, and standardized building blocks',
        'Third-party commercial ad-tracking microservices',
        'Departmental spreadsheet exchanges over unencrypted email'
      ],
      correctAnswer: 1,
      explanation: 'DPI relies on interoperable, open standards and reusable building blocks (e.g. digital identity, verifiable registries) ensuring public sovereignty.'
    },
    {
      id: 2,
      question: 'In evidence-based policymaking, what is the primary risk of omitting disparate impact evaluations for algorithmic eligibility models?',
      options: [
        'Slightly higher server cache latency',
        'Systemic inadvertent marginalization of vulnerable citizen cohorts',
        'Exceeding maximum CSS layout limits',
        'Inability to run nightly batch exports'
      ],
      correctAnswer: 1,
      explanation: 'Algorithmic models that lack fairness audits can replicate or worsen historical inequalities in resource allocation.'
    }
  ]);

  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [createdAssessmentId, setCreatedAssessmentId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Add Question
  const handleAddQuestion = () => {
    const newQ: QuizQuestion = {
      id: questions.length + 1,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    };
    setQuestions([...questions, newQ]);
    setActiveQuestionIdx(questions.length);
  };

  // Remove Question
  const handleRemoveQuestion = (idx: number) => {
    if (questions.length <= 1) {
      setErrorMsg('A questionnaire must contain at least one question.');
      return;
    }
    const updated = questions.filter((_, i) => i !== idx).map((q, i) => ({ ...q, id: i + 1 }));
    setQuestions(updated);
    setActiveQuestionIdx(Math.max(0, idx - 1));
  };

  // Update Question Text
  const handleUpdateQuestionText = (idx: number, text: string) => {
    const updated = [...questions];
    updated[idx].question = text;
    setQuestions(updated);
  };

  // Update Option Text
  const handleUpdateOption = (qIdx: number, optIdx: number, text: string) => {
    const updated = [...questions];
    const newOpts = [...updated[qIdx].options];
    newOpts[optIdx] = text;
    updated[qIdx].options = newOpts;
    setQuestions(updated);
  };

  // Update Correct Answer
  const handleSetCorrectAnswer = (qIdx: number, optIdx: number) => {
    const updated = [...questions];
    updated[qIdx].correctAnswer = optIdx;
    setQuestions(updated);
  };

  // Update Explanation
  const handleUpdateExplanation = (qIdx: number, text: string) => {
    const updated = [...questions];
    updated[qIdx].explanation = text;
    setQuestions(updated);
  };

  // Template Loader for convenience
  const loadPresetTemplate = (preset: 'ai' | 'security' | 'dpi') => {
    if (preset === 'ai') {
      setTitle('Algorithmic Accountability & Public Sector AI Governance Examination');
      setCourseId('crs-104');
      setDescription('Mandatory institutional assessment evaluating ethical automated decision-making, disparate impact mitigation, and transparency audit requirements for civil servants.');
      setQuestions([
        {
          id: 1,
          question: 'What is the primary requirement for automated citizen-facing decision systems under ethical governance?',
          options: [
            'Instant unreviewable automated enforcement',
            'Full auditability, explainability, and human-in-the-loop escalation',
            'Storing all raw biometric data on public cloud buckets',
            'Bypassing institutional legal review'
          ],
          correctAnswer: 1,
          explanation: 'Ethical public AI mandates explainable logic and designated human oversight.'
        },
        {
          id: 2,
          question: 'When an algorithm produces disparate error rates across demographic cohorts, which action is mandatory?',
          options: [
            'Suppress the telemetry log and deploy anyway',
            'Halt deployment, conduct bias mitigation, and recalibrate training datasets',
            'Double the marketing expenditure',
            'Restrict citizen access to appeals'
          ],
          correctAnswer: 1,
          explanation: 'Disparate error rates require immediate remediation and recalibration before production release.'
        },
        {
          id: 3,
          question: 'What constitutes an Algorithmic Impact Assessment (AIA) in public administration?',
          options: [
            'A tool to measure GPU clock speeds',
            'A structured risk framework evaluating societal, legal, and rights impacts before rollout',
            'A marketing brochure for proprietary vendors',
            'An invoice verification script'
          ],
          correctAnswer: 1,
          explanation: 'AIAs evaluate societal, human rights, and privacy ramifications across the system lifecycle.'
        },
        {
          id: 4,
          question: 'What does "Human-in-the-Loop" (HITL) ensure in automated public services?',
          options: [
            'A human must manually re-type every input field',
            'A qualified human officer can review, override, and adjudicate algorithmic decisions',
            'No computers may be used in processing',
            'Trainees must physically visit the data center'
          ],
          correctAnswer: 1,
          explanation: 'HITL guarantees administrative discretion, accountability, and the right to meaningful appeal.'
        }
      ]);
    } else if (preset === 'security') {
      setTitle('Public Sector Zero-Trust Architecture & Data Defense Test');
      setCourseId('crs-103');
      setDescription('Comprehensive verification of Zero-Trust principles, cryptographic token lifetimes, and public citizen registry isolation.');
      setQuestions([
        {
          id: 1,
          question: 'What is the core philosophical tenet of Zero-Trust Architecture (ZTA)?',
          options: [
            'Trust everything inside the corporate firewall',
            'Never trust, always verify every access request continuously',
            'Rely exclusively on perimeter password protection',
            'Disable multi-factor authentication for administrators'
          ],
          correctAnswer: 1,
          explanation: 'Zero-Trust assumes breach and continuously validates context, identity, and authorization.'
        },
        {
          id: 2,
          question: 'Which mechanism prevents unauthorized lateral movement within government cloud enclaves?',
          options: [
            'Single flat IP subnet allocation',
            'Micro-segmentation with least-privilege service-to-service mutual TLS',
            'Sharing universal root credentials across ministries',
            'Turning off audit logs'
          ],
          correctAnswer: 1,
          explanation: 'Micro-segmentation and mTLS ensure compromised nodes cannot traverse into adjacent sensitive databases.'
        },
        {
          id: 3,
          question: 'What is the recommended cryptographic posture for sensitive citizen data at rest?',
          options: [
            'AES-256 with hardware security module (HSM) managed key rotation',
            'Base64 encoding without salt',
            'Plaintext storage with hidden filenames',
            'Rot13 character substitution'
          ],
          correctAnswer: 0,
          explanation: 'AES-256 backed by HSM key management is the federal standard for data-at-rest protection.'
        }
      ]);
    }
    setErrorMsg(null);
  };

  // Save Questionnaire
  const handleSaveQuestionnaire = () => {
    // Validation
    if (!title.trim()) {
      setErrorMsg('Please enter an assessment title.');
      return;
    }
    if (questions.length === 0) {
      setErrorMsg('Please add at least one question.');
      return;
    }
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].question.trim()) {
        setErrorMsg(`Question #${i + 1} text cannot be empty.`);
        return;
      }
      for (let j = 0; j < 4; j++) {
        if (!questions[i].options[j]?.trim()) {
          setErrorMsg(`Question #${i + 1}, Option ${String.fromCharCode(65 + j)} cannot be empty.`);
          return;
        }
      }
    }

    const selectedCourse = courses.find(c => c.id === courseId) || courses[0];
    const newId = `asm-${Date.now()}`;

    const newAssessment: SubjectAssessment = {
      id: newId,
      courseId: selectedCourse.id,
      courseTitle: selectedCourse.title,
      title: title.trim(),
      subject: selectedCourse.category || 'Digital Governance',
      description: description.trim() || `Official accredited questionnaire for ${selectedCourse.title}.`,
      durationMinutes: Number(durationMinutes) || 20,
      totalQuestions: questions.length,
      difficulty: difficulty,
      passingScore: Number(passingScore) || 70,
      deadline: deadline,
      createdAt: 'Today',
      status: 'Active',
      attemptsCount: 0,
      avgScore: 0,
      questions: questions.map((q, idx) => ({
        ...q,
        id: idx + 1,
        options: q.options.slice(0, 4)
      }))
    };

    addSubjectAssessment(newAssessment);
    setCreatedAssessmentId(newId);
    setSaveSuccess(true);
    setErrorMsg(null);
  };

  const handleTestNowAsTrainee = () => {
    if (createdAssessmentId) {
      startAssessment(createdAssessmentId);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Accredited Assessment Authoring Studio</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Create Graded Questionnaire
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Author 4-option multiple-choice examinations directly playable by enrolled civil service trainees.
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Quick Templates:</span>
            <button
              id="template-ai-btn"
              onClick={() => loadPresetTemplate('ai')}
              className="px-2.5 py-1.5 text-xs font-bold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              AI Governance Test
            </button>
            <button
              id="template-sec-btn"
              onClick={() => loadPresetTemplate('security')}
              className="px-2.5 py-1.5 text-xs font-bold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              Zero-Trust Test
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {saveSuccess && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs font-bold text-emerald-900">
              <Check className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                Questionnaire published successfully! It is now immediately available to trainees in their assessment hub.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                id="test-questionnaire-as-trainee-btn"
                onClick={handleTestNowAsTrainee}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Test & Take Assessment</span>
              </button>
              <button
                onClick={() => setActiveTab('manage-questionnaires')}
                className="px-3 py-1.5 bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 rounded-lg text-xs font-bold cursor-pointer"
              >
                Manage Questionnaires
              </button>
            </div>
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

      {/* Main Form: Metadata & Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Questionnaire Metadata (Title, Course, Description, Deadline) */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span>Assessment Metadata</span>
          </h2>

          {/* Title (Required) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Assessment Title <span className="text-rose-600">*</span>
            </label>
            <input
              id="questionnaire-title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Public Sector Digital Public Infrastructure Exam"
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {/* Course (Required) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Target Course <span className="text-rose-600">*</span>
            </label>
            <select
              id="questionnaire-course-select"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.code}: {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Description (Required) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Description <span className="text-rose-600">*</span>
            </label>
            <textarea
              id="questionnaire-desc-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Provide context and instructions for the examination..."
              className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {/* Deadline (Required) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Submission Deadline <span className="text-rose-600">*</span>
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="questionnaire-deadline-input"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          {/* Duration & Passing Score */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Duration</label>
              <div className="relative">
                <Clock className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full text-xs pl-8 pr-2 py-2 rounded-xl border border-slate-300"
                  placeholder="Minutes"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Pass Score (%)</label>
              <div className="relative">
                <Award className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  value={passingScore}
                  onChange={(e) => setPassingScore(Number(e.target.value))}
                  className="w-full text-xs pl-8 pr-2 py-2 rounded-xl border border-slate-300"
                  placeholder="70"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 bg-white"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Save Button */}
          <div className="pt-2">
            <button
              id="save-questionnaire-btn"
              onClick={handleSaveQuestionnaire}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-black rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Questionnaire</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Questions Builder */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileQuestion className="w-4 h-4 text-emerald-700" />
                <span>Questions & Options Builder</span>
              </h2>
              <p className="text-xs text-slate-500">
                {questions.length} Questions defined • 4 Options per question
              </p>
            </div>

            {/* Add Question Button (Required) */}
            <button
              id="add-question-btn"
              onClick={handleAddQuestion}
              className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Question</span>
            </button>
          </div>

          {/* Question Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {questions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setActiveQuestionIdx(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeQuestionIdx === idx
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>Q{idx + 1}</span>
                {q.question.trim().length > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                )}
              </button>
            ))}
          </div>

          {/* Active Question Editor */}
          {questions[activeQuestionIdx] && (
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-800">
                  Question #{activeQuestionIdx + 1}
                </span>
                <button
                  onClick={() => handleRemoveQuestion(activeQuestionIdx)}
                  className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Question</span>
                </button>
              </div>

              {/* Question Text */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Question Statement <span className="text-rose-600">*</span>
                </label>
                <textarea
                  id={`question-text-input-${activeQuestionIdx}`}
                  value={questions[activeQuestionIdx].question}
                  onChange={(e) => handleUpdateQuestionText(activeQuestionIdx, e.target.value)}
                  rows={2}
                  placeholder="Enter clear, verifiable assessment question..."
                  className="w-full text-xs p-3 rounded-xl bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              {/* Four options per question (Required) & Correct answer selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700">
                    Four Answer Choices (Select radio button for the Correct Answer) <span className="text-rose-600">*</span>
                  </label>
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    Current Correct: Option {String.fromCharCode(65 + questions[activeQuestionIdx].correctAnswer)}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {[0, 1, 2, 3].map((optIdx) => {
                    const isCorrect = questions[activeQuestionIdx].correctAnswer === optIdx;
                    const letter = String.fromCharCode(65 + optIdx);

                    return (
                      <div
                        key={optIdx}
                        className={`flex items-center gap-2.5 p-2 rounded-xl bg-white border transition-colors ${
                          isCorrect ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          id={`radio-q-${activeQuestionIdx}-opt-${optIdx}`}
                          name={`correct-radio-${activeQuestionIdx}`}
                          checked={isCorrect}
                          onChange={() => handleSetCorrectAnswer(activeQuestionIdx, optIdx)}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <span className={`w-6 h-6 rounded-md font-mono font-bold text-xs flex items-center justify-center ${
                          isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {letter}
                        </span>
                        <input
                          type="text"
                          id={`opt-input-${activeQuestionIdx}-${optIdx}`}
                          value={questions[activeQuestionIdx].options[optIdx] || ''}
                          onChange={(e) => handleUpdateOption(activeQuestionIdx, optIdx, e.target.value)}
                          placeholder={`Option ${letter} text...`}
                          className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border-none focus:outline-none"
                        />
                        {isCorrect && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Correct
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Explanation */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Answer Explanation & Remediation Note
                </label>
                <input
                  type="text"
                  value={questions[activeQuestionIdx].explanation || ''}
                  onChange={(e) => handleUpdateExplanation(activeQuestionIdx, e.target.value)}
                  placeholder="Explain why the selected option is correct for trainee review..."
                  className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-slate-300"
                />
              </div>
            </div>
          )}

          {/* Bottom Action bar */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleAddQuestion}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Another Question</span>
            </button>

            <button
              onClick={handleSaveQuestionnaire}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Questionnaire</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
