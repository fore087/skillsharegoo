import React, { useState } from 'react';
import { CheckCircle, AlertCircle, HelpCircle, RotateCcw, Award } from 'lucide-react';
import { Modal } from '../common/Modal';
import { SAMPLE_ASSESSMENT } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
  courseId?: string;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  onClose,
  courseTitle = 'Public Sector Digital Transformation & Citizen Services',
  courseId = 'crs-101',
}) => {
  const { generateCertificate } = useApp();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = SAMPLE_ASSESSMENT.questions;

  const handleSelect = (questionIdx: number, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionIdx]: optionIdx }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const calculatedScore = Math.round((correctCount / questions.length) * 100);
    setScore(calculatedScore);
    setSubmitted(true);

    if (calculatedScore >= SAMPLE_ASSESSMENT.passingScorePercent) {
      generateCertificate(courseId);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const isAllAnswered = Object.keys(selectedAnswers).length === questions.length;
  const isPassed = score >= SAMPLE_ASSESSMENT.passingScorePercent;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={SAMPLE_ASSESSMENT.title}
      subtitle={`Formal Capacity Validation • Passing Threshold: ${SAMPLE_ASSESSMENT.passingScorePercent}%`}
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Banner */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-slate-800">Target Curriculum: </span>
            <span className="text-slate-600">{courseTitle}</span>
          </div>
          <span className="font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200">
            {questions.length} Practical Questions
          </span>
        </div>

        {/* Results Banner if submitted */}
        {submitted && (
          <div
            className={`p-5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in ${
              isPassed
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900'
                : 'bg-amber-50/80 border-amber-300 text-amber-900'
            }`}
          >
            <div className="flex items-center gap-3">
              {isPassed ? (
                <CheckCircle className="w-8 h-8 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-8 h-8 text-amber-600 shrink-0" />
              )}
              <div>
                <h4 className="text-base font-bold">
                  {isPassed ? 'Competency Assessment Passed!' : 'Review & Try Again'}
                </h4>
                <p className="text-xs mt-0.5 opacity-90">
                  {isPassed
                    ? `You scored ${score}%. Your institutional credential has been verified and registered.`
                    : `You scored ${score}%. A minimum of ${SAMPLE_ASSESSMENT.passingScorePercent}% is required for certification.`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-3.5 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake
              </button>
            </div>
          </div>
        )}

        {/* Questions list */}
        <div className="space-y-6">
          {questions.map((q, qIdx) => {
            const userAnswer = selectedAnswers[qIdx];
            const isCorrect = submitted && userAnswer === q.correctIndex;
            const isWrong = submitted && userAnswer !== undefined && userAnswer !== q.correctIndex;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-xl border transition-all ${
                  submitted
                    ? isCorrect
                      ? 'border-emerald-300 bg-emerald-50/20'
                      : isWrong
                      ? 'border-rose-300 bg-rose-50/20'
                      : 'border-slate-200'
                    : 'border-slate-200 bg-white shadow-2xs'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {qIdx + 1}
                  </span>
                  <div className="flex-1">
                    <h5 className="text-sm font-bold text-slate-900 leading-snug">
                      {q.question}
                    </h5>

                    {/* Options */}
                    <div className="mt-3 space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = userAnswer === optIdx;
                        let optionStyle = 'border-slate-200 hover:bg-slate-50 text-slate-700';

                        if (submitted) {
                          if (optIdx === q.correctIndex) {
                            optionStyle = 'border-emerald-500 bg-emerald-100/60 text-emerald-900 font-semibold';
                          } else if (isChosen && optIdx !== q.correctIndex) {
                            optionStyle = 'border-rose-500 bg-rose-100/60 text-rose-900 font-semibold';
                          } else {
                            optionStyle = 'border-slate-200 opacity-60 text-slate-500';
                          }
                        } else if (isChosen) {
                          optionStyle = 'border-blue-600 bg-blue-50/80 text-blue-900 font-semibold ring-1 ring-blue-600';
                        }

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleSelect(qIdx, optIdx)}
                            className={`p-3 rounded-lg border text-xs cursor-pointer flex items-center gap-3 transition-colors ${optionStyle}`}
                          >
                            <span
                              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                isChosen ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                              }`}
                            >
                              {isChosen && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </span>
                            <span>{opt}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {submitted && (
                      <div className="mt-3 p-3 rounded-lg bg-slate-100/80 text-xs text-slate-700 border border-slate-200">
                        <span className="font-bold text-slate-900 block mb-0.5">Explanation:</span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100"
          >
            Close Quiz
          </button>

          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={!isAllAnswered}
              className={`px-5 py-2 text-xs font-semibold rounded-lg shadow-xs transition-colors ${
                isAllAnswered
                  ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Submit Knowledge Check
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors"
            >
              Finish & Return to Hub
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};
