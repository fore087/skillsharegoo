import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Sparkles, 
  Edit3, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  BookOpen, 
  ExternalLink,
  Plus,
  Trash2,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';

export const TraineeProfile: React.FC = () => {
  const { currentUser, updateUserProfile, certificates, courses, setActiveTab } = useApp();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Form states initialized from currentUser
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    phone: currentUser.phone || '+1 (555) 234-8901',
    department: currentUser.department || '',
    organization: currentUser.organization || '',
    bio: currentUser.bio || 'Senior policy and technology practitioner dedicated to modernizing civil service delivery through resilient digital public infrastructure, transparent data analytics, and ethical technology governance.',
    qualificationsText: (currentUser.qualifications || [
      'Master of Public Administration (MPA) - Harvard Kennedy School',
      'B.S. in Computer Science & Public Policy - Georgetown University',
      'Certified Digital Government Leader (CDGL) - NBDCA'
    ]).join('\n'),
    skillsText: (currentUser.skills || [
      'Digital Public Infrastructure (DPI)',
      'Data Analytics & KPI Modeling',
      'Cybersecurity & Zero-Trust',
      'Citizen Journey Mapping',
      'AI Ethics & Regulatory Compliance',
      'Agile Public Policy'
    ]).join(', '),
    interestsText: (currentUser.interests || [
      'National Citizen Identity Systems',
      'Open Source Digital Public Goods',
      'Algorithmic Welfare Fairness',
      'Continuous Civil Service Upskilling'
    ]).join(', ')
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleOpenEdit = () => {
    setFormData({
      name: currentUser.name || '',
      phone: currentUser.phone || '+1 (555) 234-8901',
      department: currentUser.department || '',
      organization: currentUser.organization || '',
      bio: currentUser.bio || '',
      qualificationsText: (currentUser.qualifications || []).join('\n'),
      skillsText: (currentUser.skills || []).join(', '),
      interestsText: (currentUser.interests || []).join(', ')
    });
    setIsEditModalOpen(true);
    setSaveSuccess(false);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedQualifications = formData.qualificationsText
      .split('\n')
      .map(q => q.trim())
      .filter(Boolean);

    const parsedSkills = formData.skillsText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const parsedInterests = formData.interestsText
      .split(',')
      .map(i => i.trim())
      .filter(Boolean);

    updateUserProfile({
      name: formData.name,
      phone: formData.phone,
      department: formData.department,
      organization: formData.organization,
      bio: formData.bio,
      qualifications: parsedQualifications,
      skills: parsedSkills,
      interests: parsedInterests
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setIsEditModalOpen(false);
      setSaveSuccess(false);
    }, 800);
  };

  const enrolledCount = courses.filter(c => (c.progress || 0) > 0).length;
  const completedCount = courses.filter(c => (c.progress || 0) === 100).length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-start sm:items-center gap-4">
          <div className="relative">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'}
              alt={currentUser.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-blue-500 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
              <ShieldCheck className="w-3 h-3 text-white" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {currentUser.name}
              </h2>
              <span className="px-2.5 py-0.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-full">
                Active Trainee
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-center gap-1.5 font-medium">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              {currentUser.department}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentUser.organization}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {currentUser.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {currentUser.phone || '+1 (555) 234-8901'}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Joined {currentUser.joinedDate || 'Jan 2026'}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleOpenEdit}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all shrink-0"
        >
          <Edit3 className="w-4 h-4" />
          Edit Institutional Profile
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Enrolled Tracks</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{enrolledCount}</p>
          <p className="text-[11px] text-blue-600 mt-0.5 font-medium">Active Capacity Syllabus</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Completed Tracks</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{completedCount}</p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Accreditation Ready</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Earned Credentials</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">{certificates.length}</p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Verified Certificates</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500">Competency Level</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">Senior</p>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">Level 4 Practitioner</p>
        </div>
      </div>

      {/* Two Column Layout: Qualifications & Experience / Skills & Interests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Bio, Experience, Qualifications */}
        <div className="lg:col-span-2 space-y-6">
          {/* Executive Bio */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Professional Mandate & Background
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {currentUser.bio || 'Senior policy and technology practitioner dedicated to modernizing civil service delivery through resilient digital public infrastructure, transparent data analytics, and ethical technology governance.'}
            </p>
          </div>

          {/* Work Experience */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-4">
              <Briefcase className="w-4 h-4 text-blue-600" />
              Civil Service & Institutional Experience
            </h3>

            <div className="space-y-4">
              {(currentUser.workExperience && currentUser.workExperience.length > 0 ? currentUser.workExperience : [
                {
                  id: 'exp-1',
                  role: 'Senior Digital Transformation Specialist',
                  organization: 'National Administrative Services',
                  period: '2023 – Present',
                  description: 'Directing cross-departmental data modernization, digital public infrastructure adoption, and cloud migration for 14 ministerial bodies.'
                },
                {
                  id: 'exp-2',
                  role: 'Policy & Analytics Officer',
                  organization: 'Ministry of Public Infrastructure',
                  period: '2021 – 2023',
                  description: 'Engineered evidence-based performance telemetry dashboards and citizen service response time benchmarking systems.'
                },
                {
                  id: 'exp-3',
                  role: 'Junior Technology Governance Analyst',
                  organization: 'Digital Governance Directorate',
                  period: '2019 – 2021',
                  description: 'Facilitated inter-ministerial data sharing protocol audits and open API interoperability standard evaluations.'
                }
              ]).map((exp, idx) => (
                <div key={exp.id || idx} className="relative pl-6 border-l-2 border-blue-200 pb-4 last:pb-0">
                  <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-blue-600 border-2 border-white" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-sm font-bold text-slate-900">{exp.role}</h4>
                    <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded w-fit">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">{exp.organization}</p>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Qualifications & Degrees */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-4">
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              Academic & Professional Qualifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(currentUser.qualifications && currentUser.qualifications.length > 0 ? currentUser.qualifications : [
                'Master of Public Administration (MPA) - Harvard Kennedy School',
                'B.S. in Computer Science & Public Policy - Georgetown University',
                'Certified Digital Government Leader (CDGL) - NBDCA'
              ]).map((qual, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-start gap-3"
                >
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 leading-snug">{qual}</p>
                    <p className="text-[11px] text-slate-500 mt-1 font-mono">Accredited Academic Record</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Skills, Interests, Certificates */}
        <div className="space-y-6">
          {/* Core Skills */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Core Competencies & Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {(currentUser.skills && currentUser.skills.length > 0 ? currentUser.skills : [
                'Digital Public Infrastructure (DPI)',
                'Data Analytics & KPI Modeling',
                'Cybersecurity & Zero-Trust',
                'Citizen Journey Mapping',
                'AI Ethics & Regulatory Compliance',
                'Agile Public Policy',
                'Interoperability Protocols'
              ]).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Institutional Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {(currentUser.interests && currentUser.interests.length > 0 ? currentUser.interests : [
                'National Citizen Identity Systems',
                'Open Source Digital Public Goods',
                'Algorithmic Welfare Fairness',
                'Continuous Civil Service Upskilling'
              ]).map((interest, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-50 text-blue-800 border border-blue-100"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Earned Certificates Mini-List */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                Verified Certificates
              </h3>
              <button
                onClick={() => setActiveTab('certificates')}
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                View All
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {certificates.map(cert => (
                <div
                  key={cert.id}
                  className="p-3 rounded-xl border border-amber-200 bg-amber-50/40 space-y-1"
                >
                  <p className="text-xs font-bold text-slate-900 line-clamp-1">{cert.courseTitle}</p>
                  <p className="text-[11px] font-mono text-slate-500">{cert.certificateNumber}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-amber-100">
                    <span>{cert.issueDate}</span>
                    <span className="font-semibold text-emerald-700">{cert.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Institutional Trainee Profile"
        subtitle="Update your civil service qualifications, skills, and background records"
        maxWidth="2xl"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          {saveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Profile changes saved successfully!
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Department / Division</label>
              <input
                type="text"
                required
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Organization / Agency</label>
              <input
                type="text"
                required
                value={formData.organization}
                onChange={e => setFormData({ ...formData, organization: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Professional Mandate / Bio</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Academic & Professional Qualifications (One per line)
            </label>
            <textarea
              rows={3}
              value={formData.qualificationsText}
              onChange={e => setFormData({ ...formData, qualificationsText: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Core Competencies / Skills (Comma-separated)
            </label>
            <input
              type="text"
              value={formData.skillsText}
              onChange={e => setFormData({ ...formData, skillsText: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Specialized Interests (Comma-separated)
            </label>
            <input
              type="text"
              value={formData.interestsText}
              onChange={e => setFormData({ ...formData, interestsText: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xs"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
