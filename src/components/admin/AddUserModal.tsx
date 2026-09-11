import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose }) => {
  const { addNewUser } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('trainee');
  const [department, setDepartment] = useState('Digital Governance');
  const [organization, setOrganization] = useState('Central Ministry Directorate');
  const [phone, setPhone] = useState('+1 (555) 300-4567');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    addNewUser({
      name,
      email,
      role,
      department,
      organization,
      phone,
    });

    setName('');
    setEmail('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Provision Institutional User"
      subtitle="Onboard a trainee, certified trainer, or institutional administrator"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="font-bold text-slate-700 block mb-1">Full Legal Name *</label>
          <input
            type="text"
            required
            placeholder="e.g. Officer Daniel Thorne"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Official Email *</label>
            <input
              type="email"
              required
              placeholder="e.g. d.thorne@agency.gov"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Access Role *</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value as any)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            >
              <option value="trainee">Trainee (Learner)</option>
              <option value="trainer">Trainer (Instructor)</option>
              <option value="admin">Administrator (Oversight)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Department / Branch</label>
            <input
              type="text"
              placeholder="e.g. Public Health Information Systems"
              value={department}
              onChange={e => setDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Parent Organization</label>
            <input
              type="text"
              placeholder="e.g. National Healthcare Service"
              value={organization}
              onChange={e => setOrganization(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Contact Phone</label>
          <input
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
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
            className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Provision Account
          </button>
        </div>
      </form>
    </Modal>
  );
};
