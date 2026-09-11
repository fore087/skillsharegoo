import React, { useState } from 'react';
import { Video, Calendar, Clock, Link as LinkIcon } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { LiveSession } from '../../types';

interface CreateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateSessionModal: React.FC<CreateSessionModalProps> = ({ isOpen, onClose }) => {
  const { createLiveSession, courses } = useApp();

  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState(courses[0]?.id || 'crs-101');
  const [date, setDate] = useState('Friday, 2:00 PM');
  const [time, setTime] = useState('2:00 PM – 3:30 PM EST');
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [locationType, setLocationType] = useState<LiveSession['locationType']>('Virtual (Webinar)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const selectedCourse = courses.find(c => c.id === courseId);

    createLiveSession({
      title,
      courseId,
      courseTitle: selectedCourse ? selectedCourse.title : 'Capacity Track Workshop',
      date,
      time,
      durationMinutes: Number(durationMinutes),
      locationType,
    });

    setTitle('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Live Capacity Workshop"
      subtitle="Broadcast a real-time webinar, masterclass, or technical clinic"
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="font-bold text-slate-700 block mb-1">Session Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. Hands-on Security Architecture Tabletop Drill"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Associated Course Track</label>
          <select
            value={courseId}
            onChange={e => setCourseId(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
          >
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Schedule Date / Label</label>
            <input
              type="text"
              placeholder="e.g. Next Tuesday, 10:00 AM"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Time Slot</label>
            <input
              type="text"
              placeholder="e.g. 10:00 AM – 11:30 AM EST"
              value={time}
              onChange={e => setTime(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Duration (Minutes)</label>
            <input
              type="number"
              value={durationMinutes}
              onChange={e => setDurationMinutes(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Delivery Format</label>
            <select
              value={locationType}
              onChange={e => setLocationType(e.target.value as any)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            >
              <option value="Virtual (Webinar)">Virtual (Webinar)</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-Premise Lab">On-Premise Lab</option>
            </select>
          </div>
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
            <Video className="w-4 h-4" />
            Schedule Workshop
          </button>
        </div>
      </form>
    </Modal>
  );
};
