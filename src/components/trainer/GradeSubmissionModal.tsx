import React, { useState } from 'react';
import { CheckCircle2, FileText, Star } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { TraineeSubmission } from '../../types';

interface GradeSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: TraineeSubmission | null;
}

export const GradeSubmissionModal: React.FC<GradeSubmissionModalProps> = ({
  isOpen,
  onClose,
  submission,
}) => {
  const { gradeSubmission } = useApp();

  const [score, setScore] = useState<number>(submission?.score || 90);
  const [feedback, setFeedback] = useState(submission?.feedback || 'Well-researched strategy addressing institutional constraints.');

  if (!submission) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    gradeSubmission(submission.id, Number(score), feedback);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Evaluate Trainee Submission"
      subtitle={`Submitted by ${submission.traineeName} (${submission.traineeEmail})`}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800">{submission.assignmentTitle}</span>
            <span className="text-[11px] text-slate-400">{submission.submittedAt}</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">{submission.courseTitle}</p>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Score (0 – 100) *</label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={0}
              max={100}
              required
              value={score}
              onChange={e => setScore(Number(e.target.value))}
              className="w-32 px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
            />
            <span className="text-slate-500 font-medium">/ 100 Points</span>
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Trainer Feedback & Coaching Notes</label>
          <textarea
            rows={4}
            required
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            placeholder="Highlight strengths, policy compliance accuracy, and continuous development recommendations..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            Save & Publish Grade
          </button>
        </div>
      </form>
    </Modal>
  );
};
