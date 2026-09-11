import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  Check, 
  HelpCircle,
  ExternalLink,
  Flame
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SubjectAssessment, AssessmentResultData } from '../../types';

interface AssessmentsHubProps {
  onViewCertificate?: (courseId: string) => void;
}

export const AssessmentsHub: React.FC<AssessmentsHubProps> = ({ onViewCertificate }) => {
  const { 
    subjectAssessments, 
    activeAssessmentId, 
    startAssessment, 
    cancelAssessment, 
    assessmentResult, 
    setAssessmentResult,
    submitAssessment, 
    retakeAssessment, 
    traineeAssessmentHistory,
    setActiveTab,
    generateCertificate
  } = useApp();

  // Active quiz session states
  const [currentAssessment, setCurrentAssessment] = useState<SubjectAssessment | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(900); // 15 mins default
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  // Sync active assessment if triggered globally (e.g. from course card)
  useEffect(() => {
    if (activeAssessmentId) {
      const found = subjectAssessments.find(a => a.id === activeAssessmentId);
      if (found) {
        setCurrentAssessment(found);
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setTimeRemainingSeconds(found.durationMinutes * 60);
      }
    } else {
      if (!assessmentResult) {
        setCurrentAssessment(null);
      }
    }
  }, [activeAssessmentId, subjectAssessments, assessmentResult]);

  // Timer simulation
  useEffect(() => {
    if (!currentAssessment || assessmentResult) return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentAssessment, assessmentResult]);

  const handleStart = (assessment: SubjectAssessment) => {
    startAssessment(assessment.id);
    setCurrentAssessment(assessment);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeRemainingSeconds(assessment.durationMinutes * 60);
  };

  const handleSelectAnswer = (qIndex: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qIndex]: optionIndex,
    }));
  };

  const handleFinalSubmit = () => {
    if (!currentAssessment) return;

    let score = 0;
    currentAssessment.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score += 1;
      }
    });

    const totalQuestions = currentAssessment.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= currentAssessment.passingScore;

    const performanceMessage = passed
      ? `Outstanding Competency! You have successfully cleared the official ${currentAssessment.subject} knowledge check with an accredited score of ${percentage}%. Your verified qualification record is updated.`
      : `Threshold Not Met. You scored ${percentage}%, while the institutional accreditation threshold requires at least ${currentAssessment.passingScore}%. We recommend reviewing the curriculum materials and retaking the assessment.`;

    const resultData: AssessmentResultData = {
      assessmentId: currentAssessment.id,
      assessmentTitle: currentAssessment.title,
      subject: currentAssessment.subject,
      courseId: currentAssessment.courseId,
      courseTitle: currentAssessment.courseTitle,
      score,
      totalQuestions,
      correctCount: score,
      wrongCount: totalQuestions - score,
      percentage,
      passed,
      performanceMessage,
      userAnswers: selectedAnswers,
      questions: currentAssessment.questions,
      completedAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    submitAssessment(resultData);
    setShowConfirmSubmit(false);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ==========================================
  // VIEW 1: ASSESSMENT RESULT SCREEN
  // ==========================================
  if (assessmentResult) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
        {/* Result Header Banner */}
        <div className={`p-6 sm:p-8 rounded-2xl border shadow-xs ${
          assessmentResult.passed
            ? 'bg-gradient-to-br from-emerald-50 via-teal-50 to-white border-emerald-200'
            : 'bg-gradient-to-br from-amber-50 via-orange-50 to-white border-amber-200'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${
                  assessmentResult.passed
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-600 text-white'
                }`}>
                  {assessmentResult.passed ? 'Assessment Passed' : 'Needs Review'}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Completed {assessmentResult.completedAt}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {assessmentResult.assessmentTitle}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                {assessmentResult.performanceMessage}
              </p>
            </div>

            {/* Scorecard Widget */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center shrink-0 min-w-[170px]">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Accredited Score</p>
              <div className="flex items-baseline justify-center gap-1 mt-1">
                <span className={`text-4xl font-extrabold ${
                  assessmentResult.passed ? 'text-emerald-600' : 'text-amber-600'
                }`}>
                  {assessmentResult.percentage}%
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {assessmentResult.correctCount} of {assessmentResult.totalQuestions} Correct
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-200/80 text-xs">
            <div className="bg-white/70 p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500">Passing Benchmark</span>
              <p className="font-bold text-slate-900 mt-0.5">70% Required</p>
            </div>
            <div className="bg-white/70 p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500">Correct Answers</span>
              <p className="font-bold text-emerald-600 mt-0.5">{assessmentResult.correctCount} Questions</p>
            </div>
            <div className="bg-white/70 p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500">Incorrect Answers</span>
              <p className="font-bold text-rose-600 mt-0.5">{assessmentResult.wrongCount} Questions</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <button
            onClick={() => {
              setAssessmentResult(null);
              cancelAssessment();
            }}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back to Assessments Hub
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => retakeAssessment(assessmentResult.assessmentId)}
              className="px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retake Assessment
            </button>

            {assessmentResult.passed && (
              <button
                onClick={() => {
                  if (onViewCertificate) {
                    onViewCertificate(assessmentResult.courseId);
                  } else {
                    setActiveTab('certificates');
                  }
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                View Official Certificate
              </button>
            )}
          </div>
        </div>

        {/* Detailed Question Review & Faculty Explanations */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Detailed Question Review & Faculty Rationale
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Analyze correct answers and official institutional explanations for each question.
              </p>
            </div>
            <span className="text-xs font-mono font-semibold bg-slate-100 px-2.5 py-1 rounded text-slate-600">
              {assessmentResult.questions.length} Questions Evaluated
            </span>
          </div>

          <div className="space-y-6">
            {assessmentResult.questions.map((q, qIndex) => {
              const userAnswer = assessmentResult.userAnswers[qIndex];
              const isCorrect = userAnswer === q.correctAnswer;

              return (
                <div
                  key={q.id || qIndex}
                  className={`p-5 rounded-2xl border transition-all ${
                    isCorrect
                      ? 'bg-emerald-50/30 border-emerald-200'
                      : 'bg-rose-50/30 border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}>
                        {qIndex + 1}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        Question {qIndex + 1} of {assessmentResult.questions.length}
                      </span>
                    </div>

                    <span className={`text-xs font-bold flex items-center gap-1 px-2 py-0.5 rounded ${
                      isCorrect
                        ? 'text-emerald-700 bg-emerald-100/70'
                        : 'text-rose-700 bg-rose-100/70'
                    }`}>
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" /> Incorrect
                        </>
                      )}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-slate-900 mt-2.5">
                    {q.question}
                  </p>

                  {/* Options List */}
                  <div className="mt-3 space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isUserChoice = userAnswer === optIdx;
                      const isCorrectChoice = q.correctAnswer === optIdx;

                      let optionClass = 'bg-white border-slate-200 text-slate-700';
                      if (isCorrectChoice) {
                        optionClass = 'bg-emerald-100/80 border-emerald-400 text-emerald-950 font-bold';
                      } else if (isUserChoice && !isCorrect) {
                        optionClass = 'bg-rose-100/80 border-rose-400 text-rose-950 font-bold';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-2 ${optionClass}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono font-bold text-[11px] w-5">
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            <span>{opt}</span>
                          </div>

                          {isCorrectChoice && (
                            <span className="text-[11px] text-emerald-800 font-bold flex items-center gap-1 shrink-0">
                              <Check className="w-3 h-3" /> Correct Answer
                            </span>
                          )}
                          {isUserChoice && !isCorrect && (
                            <span className="text-[11px] text-rose-800 font-bold shrink-0">
                              Your Answer
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Section */}
                  {q.explanation && (
                    <div className="mt-3 p-3.5 bg-white/80 rounded-xl border border-slate-200/80 text-xs text-slate-700 space-y-1">
                      <p className="font-bold text-slate-900 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-blue-600" />
                        Faculty Explanation:
                      </p>
                      <p className="leading-relaxed">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: ACTIVE ASSESSMENT / MCQ RUNNER
  // ==========================================
  if (currentAssessment) {
    const totalQ = currentAssessment.questions.length;
    const currentQ = currentAssessment.questions[currentQuestionIndex];
    const answeredCount = Object.keys(selectedAnswers).length;
    const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQ) * 100);

    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        {/* Top Sticky Test Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                {currentAssessment.subject}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                {currentAssessment.title}
              </h3>
            </div>

            {/* Simulated Countdown Timer */}
            <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs font-mono font-bold shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{formatTimer(timeRemainingSeconds)}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Question {currentQuestionIndex + 1} of {totalQ}</span>
              <span className="font-semibold text-blue-700">{answeredCount} of {totalQ} Answered</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
              Question #{currentQuestionIndex + 1}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Radio Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectAnswer(currentQuestionIndex, optIdx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs sm:text-sm ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-500 text-blue-950 font-semibold shadow-xs ring-1 ring-blue-500'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs font-mono ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                  }`}>
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Question Palette Navigation Dots */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Quick Question Jump
            </span>
            <div className="flex items-center gap-2">
              {currentAssessment.questions.map((_, idx) => {
                const isAnswered = selectedAnswers[idx] !== undefined;
                const isCurrent = idx === currentQuestionIndex;

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-blue-600 text-white ring-2 ring-blue-200'
                        : isAnswered
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(i => Math.max(0, i - 1))}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-40 transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Previous
            </button>

            {currentQuestionIndex < totalQ - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(i => Math.min(totalQ - 1, i + 1))}
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmSubmit(true)}
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
              >
                Submit Assessment
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Confirmation Modal before Final Submit */}
        {showConfirmSubmit && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl border border-slate-200 animate-in zoom-in-95">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-base font-bold text-slate-900">
                  Ready to Submit Your Assessment?
                </h3>
                <p className="text-xs text-slate-500">
                  You have answered <strong>{answeredCount}</strong> of <strong>{totalQ}</strong> questions.
                  {answeredCount < totalQ && (
                    <span className="text-rose-600 block mt-1 font-semibold">
                      Warning: You have {totalQ - answeredCount} unanswered questions!
                    </span>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  className="py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
                >
                  Return to Test
                </button>
                <button
                  onClick={handleFinalSubmit}
                  className="py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
                >
                  Confirm & Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // VIEW 3: ASSESSMENTS HUB / DIRECTORY
  // ==========================================
  const completedCount = Object.keys(traineeAssessmentHistory).length;
  const passedCount = (Object.values(traineeAssessmentHistory) as AssessmentResultData[]).filter(r => r.passed).length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-100">
              Competency Evaluation Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1.5">
              Accredited MCQ Skills Assessments
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Subject-wise timed knowledge assessments aligned with national civil service competency frameworks. Achieve 70%+ to unlock verified certificates.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <div className="text-left">
              <p className="text-xs font-bold text-slate-900">{passedCount} of {subjectAssessments.length} Passed</p>
              <p className="text-[11px] text-slate-500">Official Accreditations</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-medium">Total Subjects</span>
            <p className="text-xl font-bold text-slate-900 mt-0.5">{subjectAssessments.length}</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-medium">Passed Accreditations</span>
            <p className="text-xl font-bold text-emerald-600 mt-0.5">{passedCount}</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-medium">Passing Benchmark</span>
            <p className="text-xl font-bold text-blue-600 mt-0.5">70% Minimum</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-medium">Attempt Policy</span>
            <p className="text-xl font-bold text-purple-600 mt-0.5">Unlimited Retakes</p>
          </div>
        </div>
      </div>

      {/* Assessment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {subjectAssessments.map((assessment) => {
          const priorResult = traineeAssessmentHistory[assessment.id];

          return (
            <div
              key={assessment.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between hover:border-blue-200 hover:shadow-md transition-all group"
            >
              <div className="p-6 space-y-4">
                {/* Subject and Level Badges */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-purple-50 text-purple-700 border border-purple-100">
                    {assessment.subject}
                  </span>

                  {priorResult ? (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      priorResult.passed
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {priorResult.passed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <AlertCircle className="w-3.5 h-3.5 text-amber-600" />}
                      Score: {priorResult.percentage}%
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      Not Attempted
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {assessment.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {assessment.description}
                  </p>
                </div>

                {/* Metadata Pills */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
                  <div className="bg-slate-50 p-2 rounded-lg text-center">
                    <span className="text-slate-400 block text-[10px]">Questions</span>
                    <span className="font-bold text-slate-800">{assessment.questions.length} MCQs</span>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-lg text-center">
                    <span className="text-slate-400 block text-[10px]">Duration</span>
                    <span className="font-bold text-slate-800">{assessment.durationMinutes} Mins</span>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-lg text-center">
                    <span className="text-slate-400 block text-[10px]">Benchmark</span>
                    <span className="font-bold text-slate-800">{assessment.passingScore}% Pass</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center gap-2">
                {priorResult ? (
                  <>
                    <button
                      onClick={() => setAssessmentResult(priorResult)}
                      className="flex-1 py-2.5 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                    >
                      View Past Result
                    </button>
                    <button
                      onClick={() => handleStart(assessment)}
                      className="flex-1 py-2.5 px-3 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors flex items-center justify-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Retake Test
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleStart(assessment)}
                    className="w-full py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    Start Assessment
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
