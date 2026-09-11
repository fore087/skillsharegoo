import React, { useState } from 'react';
import { BookPlus } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Course } from '../../types';

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateCourseModal: React.FC<CreateCourseModalProps> = ({ isOpen, onClose }) => {
  const { createNewCourse } = useApp();

  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState<Course['category']>('Governance');
  const [level, setLevel] = useState<Course['level']>('Intermediate');
  const [durationWeeks, setDurationWeeks] = useState(6);
  const [totalHours, setTotalHours] = useState(24);
  const [description, setDescription] = useState('');
  const [objectives, setObjectives] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const objectiveList = objectives
      .split('\n')
      .map(o => o.trim())
      .filter(Boolean);

    createNewCourse({
      title,
      code: code || `CAP-${Math.floor(100 + Math.random() * 900)}`,
      category,
      level,
      durationWeeks: Number(durationWeeks),
      totalHours: Number(totalHours),
      description,
      objectives: objectiveList.length ? objectiveList : ['Develop foundational capacity in this domain'],
    });

    // Reset & Close
    setTitle('');
    setCode('');
    setDescription('');
    setObjectives('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Capacity Building Course"
      subtitle="Design an institutional continuous learning track for trainees"
      maxWidth="3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">Course Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Modern Sovereign Cloud & Interoperability"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Course Code</label>
            <input
              type="text"
              placeholder="e.g. CLD-502"
              value={code}
              onChange={e => setCode(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Domain Track</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            >
              <option value="Governance">Governance</option>
              <option value="Technology & AI">Technology & AI</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Project Leadership">Project Leadership</option>
              <option value="Public Administration">Public Administration</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Target Level</label>
            <select
              value={level}
              onChange={e => setLevel(e.target.value as any)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Duration (Weeks)</label>
            <input
              type="number"
              min={1}
              max={52}
              value={durationWeeks}
              onChange={e => setDurationWeeks(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Total Hours</label>
            <input
              type="number"
              min={1}
              max={200}
              value={totalHours}
              onChange={e => setTotalHours(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Course Description *</label>
          <textarea
            required
            rows={3}
            placeholder="Outline the institutional motivation, regulatory context, and practical outcomes..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">
            Learning Objectives (one per line)
          </label>
          <textarea
            rows={3}
            placeholder="Assess architectural trade-offs in cloud migration&#10;Implement compliance guardrails for institutional data&#10;Draft service-level benchmarks for agency partners"
            value={objectives}
            onChange={e => setObjectives(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
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
            <BookPlus className="w-4 h-4" />
            Submit for Approval
          </button>
        </div>
      </form>
    </Modal>
  );
};
