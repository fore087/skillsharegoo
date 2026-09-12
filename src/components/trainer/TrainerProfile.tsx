import React, { useState } from 'react';
import { 
  UserCheck, 
  GraduationCap, 
  Briefcase, 
  Sparkles, 
  Award, 
  BookOpen, 
  FileText, 
  Edit3, 
  Save, 
  X, 
  Check, 
  Plus, 
  Trash2, 
  Mail, 
  Phone, 
  Building, 
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TrainerProfile: React.FC = () => {
  const { currentUser, updateUserProfile } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Editable form state initialized from currentUser
  const [name, setName] = useState(currentUser.name || 'Dr. Marcus Vance');
  const [bio, setBio] = useState(
    currentUser.bio ||
    'Dr. Marcus Vance is a faculty chair, enterprise systems architect, and public sector educator with over 16 years of experience training senior civil servants and engineering mission-critical government software architectures. His work focuses on empowering public institutions with resilient open-source digital public goods, zero-trust cybersecurity, and transparent data-driven decision frameworks.'
  );
  const [department, setDepartment] = useState(currentUser.department || 'Technology & Continuous Education Faculty');
  const [organization, setOrganization] = useState(currentUser.organization || 'Institute of Public Capacity Building');
  const [email, setEmail] = useState(currentUser.email || 'trainer@capacityconnect.demo');
  const [phone, setPhone] = useState(currentUser.phone || '+1 (555) 876-5432');

  const [qualifications, setQualifications] = useState<string[]>(
    currentUser.qualifications && currentUser.qualifications.length > 0
      ? currentUser.qualifications
      : [
          'Ph.D. in Information Systems & Public Policy - Carnegie Mellon University (Heinz College)',
          'Master of Science in Cybersecurity & Distributed Systems - MIT',
          'Bachelor of Science in Software Engineering & Applied Mathematics - Stanford University',
          'Postdoctoral Fellowship in Digital Government Interoperability - Oxford Internet Institute'
        ]
  );

  const [expertise, setExpertise] = useState<string[]>(
    currentUser.expertise && currentUser.expertise.length > 0
      ? currentUser.expertise
      : [
          'Digital Public Infrastructure (DPI)',
          'Interoperable Microservices & OpenAPI Standards',
          'Public Sector Cybersecurity & Zero-Trust Architecture',
          'National AI Ethics & Regulatory Governance Sandboxes',
          'Citizen-Centric Service Delivery Systems',
          'Asynchronous Event-Driven Civil Registries'
        ]
  );

  const [skills, setSkills] = useState<string[]>(
    currentUser.skills && currentUser.skills.length > 0
      ? currentUser.skills
      : [
          'Curriculum & Assessment Engineering',
          'Enterprise Architecture (TOGAF / DPG Standards)',
          'Data Analytics & Causal Policy Inference',
          'Executive Leadership Mentorship',
          'Zero-Trust Threat Modeling',
          'Verifiable Credentials & Decentralized Identifiers (DIDs)',
          'Continuous Learning Telemetry Design'
        ]
  );

  const [certifications, setCertifications] = useState<string[]>(
    currentUser.certifications && currentUser.certifications.length > 0
      ? currentUser.certifications
      : [
          'Certified Master Government Educator (CMGE) - Global Public Service Alliance (2024)',
          'Senior Fellow in Public Digital Architecture (SFPDA) - UN e-Gov Taskforce (2023)',
          'Certified Information Systems Security Professional - Architecture (CISSP-ISSAP) (2022)',
          'TOGAF 9.2 Certified Enterprise Systems Architect (2021)',
          'National Board of Digital Capacity Accreditation (NBDCA) Level-V Master Assessor (2020)'
        ]
  );

  const [subjectsTaught, setSubjectsTaught] = useState<string[]>(
    currentUser.subjectsTaught && currentUser.subjectsTaught.length > 0
      ? currentUser.subjectsTaught
      : [
          'DPI-101: Digital Public Infrastructure & Sovereign Architecture',
          'DAT-202: Evidence-Based Data Analytics & Citizen Metrics',
          'CYB-303: Zero-Trust Defense & Public Sector Threat Mitigation',
          'AIG-404: Artificial Intelligence Ethics & Regulatory Compliance',
          'LDR-505: Agile Delivery & Change Leadership in Government'
        ]
  );

  const [workExperience, setWorkExperience] = useState(
    currentUser.workExperience && currentUser.workExperience.length > 0
      ? currentUser.workExperience
      : [
          {
            id: 'exp-tr-1',
            role: 'Distinguished Faculty Lead & Chair of Digital Public Systems',
            organization: 'Institute of Public Capacity Building & National Civil Service Academy',
            period: '2020 – Present',
            description: 'Overseeing national digital governance curriculum development, accreditation standards, and senior civil servant leadership cohorts across 24 ministries.'
          },
          {
            id: 'exp-tr-2',
            role: 'Principal Architect of Public Data Infrastructure',
            organization: 'Central Technology & Digital Governance Directorate',
            period: '2016 – 2020',
            description: 'Directed the design and deployment of sovereign interoperability API gateways, privacy-preserving citizen registries, and decentralized identity rails.'
          },
          {
            id: 'exp-tr-3',
            role: 'Senior Research Fellow in Algorithmic Governance',
            organization: 'Center for Technology in Government (CTG)',
            period: '2012 – 2016',
            description: 'Authored 16 peer-reviewed frameworks on civil servant AI literacy, automated administrative fairness, and public-sector data ethics.'
          }
        ]
  );

  // New item draft inputs for editing
  const [newQualification, setNewQualification] = useState('');
  const [newExpertise, setNewExpertise] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newCert, setNewCert] = useState('');
  const [newSubject, setNewSubject] = useState('');

  const handleSave = () => {
    updateUserProfile({
      name,
      bio,
      department,
      organization,
      email,
      phone,
      qualifications,
      expertise,
      skills,
      certifications,
      subjectsTaught,
      workExperience
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(currentUser.name || 'Dr. Marcus Vance');
    setBio(currentUser.bio || '');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-emerald-600/20 shadow-sm"
              />
              <div className="absolute -bottom-1.5 -right-1.5 bg-emerald-700 text-white p-1 rounded-lg shadow-2xs">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">{name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Lead Faculty
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{department}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>{organization}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {saveSuccess && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <Check className="w-3.5 h-3.5" />
                Saved to Profile
              </span>
            )}

            {isEditing ? (
              <div className="flex items-center gap-2">
                <button
                  id="trainer-profile-save-btn"
                  onClick={handleSave}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </button>
                <button
                  id="trainer-profile-cancel-btn"
                  onClick={handleCancel}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  Cancel
                </button>
              </div>
            ) : (
              <button
                id="trainer-profile-edit-btn"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Contact Strip */}
        <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-600" />
            <span className="font-mono text-slate-800">{email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600" />
            <span className="font-mono text-slate-800">{phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Faculty Member Since: <strong className="text-slate-800">{currentUser.joinedDate || 'Nov 2025'}</strong></span>
          </div>
        </div>
      </div>

      {/* Grid: Bio & Experience */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bio Section */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <FileText className="w-4 h-4 text-emerald-700" />
            <span>Executive Bio</span>
          </div>

          {isEditing ? (
            <textarea
              id="trainer-bio-input"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={8}
              className="w-full text-xs text-slate-800 p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
              placeholder="Enter comprehensive faculty bio..."
            />
          ) : (
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {bio}
            </p>
          )}

          {/* Subjects Taught Section */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                Subjects Taught
              </span>
              <span className="text-[10px] text-slate-400">{subjectsTaught.length} Tracks</span>
            </div>

            <div className="space-y-1.5">
              {subjectsTaught.map((subj, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-200/70 text-xs font-medium text-emerald-950 flex items-center justify-between">
                  <span className="truncate">{subj}</span>
                  {isEditing && (
                    <button
                      onClick={() => setSubjectsTaught(prev => prev.filter((_, i) => i !== idx))}
                      className="text-rose-500 hover:text-rose-700 p-0.5 cursor-pointer ml-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="mt-2 flex gap-1.5">
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. SEC-101: Cryptographic Rails"
                  className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-300"
                />
                <button
                  onClick={() => {
                    if (newSubject.trim()) {
                      setSubjectsTaught(prev => [...prev, newSubject.trim()]);
                      setNewSubject('');
                    }
                  }}
                  className="px-2.5 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Work Experience Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <Briefcase className="w-4 h-4 text-emerald-700" />
              <span>Work Experience & Public Service Appointments</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">16+ Years Cumulative</span>
          </div>

          <div className="relative border-l-2 border-emerald-600/30 ml-3 pl-5 space-y-6">
            {workExperience.map((exp, idx) => (
              <div key={exp.id || idx} className="relative group">
                <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-emerald-700 ring-4 ring-white" />
                
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{exp.role}</h4>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 self-start sm:self-auto">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-600 mt-0.5">{exp.organization}</p>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Qualifications, Expertise, Skills & Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Qualifications */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-3">
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              <span>Qualifications</span>
            </div>

            <div className="space-y-2">
              {qualifications.map((q, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-start justify-between gap-2">
                  <span className="leading-snug">{q}</span>
                  {isEditing && (
                    <button
                      onClick={() => setQualifications(prev => prev.filter((_, i) => i !== idx))}
                      className="text-rose-500 hover:text-rose-700 p-0.5 cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {isEditing && (
            <div className="mt-3 flex gap-1.5 pt-3 border-t border-slate-100">
              <input
                type="text"
                value={newQualification}
                onChange={(e) => setNewQualification(e.target.value)}
                placeholder="Add degree..."
                className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-300"
              />
              <button
                onClick={() => {
                  if (newQualification.trim()) {
                    setQualifications(prev => [...prev, newQualification.trim()]);
                    setNewQualification('');
                  }
                }}
                className="px-2.5 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Expertise */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-3">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Domain Expertise</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {expertise.map((expItem, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200/80 text-xs font-semibold text-teal-900 inline-flex items-center gap-1.5"
                >
                  <span>{expItem}</span>
                  {isEditing && (
                    <button
                      onClick={() => setExpertise(prev => prev.filter((_, i) => i !== idx))}
                      className="text-rose-500 hover:text-rose-700 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>

          {isEditing && (
            <div className="mt-3 flex gap-1.5 pt-3 border-t border-slate-100">
              <input
                type="text"
                value={newExpertise}
                onChange={(e) => setNewExpertise(e.target.value)}
                placeholder="Add area..."
                className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-300"
              />
              <button
                onClick={() => {
                  if (newExpertise.trim()) {
                    setExpertise(prev => [...prev, newExpertise.trim()]);
                    setNewExpertise('');
                  }
                }}
                className="px-2.5 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Pedagogical & Tech Skills</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {skills.map((skillItem, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 inline-flex items-center gap-1.5"
                >
                  <span>{skillItem}</span>
                  {isEditing && (
                    <button
                      onClick={() => setSkills(prev => prev.filter((_, i) => i !== idx))}
                      className="text-rose-500 hover:text-rose-700 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>

          {isEditing && (
            <div className="mt-3 flex gap-1.5 pt-3 border-t border-slate-100">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add skill..."
                className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-300"
              />
              <button
                onClick={() => {
                  if (newSkill.trim()) {
                    setSkills(prev => [...prev, newSkill.trim()]);
                    setNewSkill('');
                  }
                }}
                className="px-2.5 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-3">
              <Award className="w-4 h-4 text-emerald-700" />
              <span>Certifications & Accreditations</span>
            </div>

            <div className="space-y-2">
              {certifications.map((cert, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-amber-50/70 border border-amber-200/80 text-xs font-medium text-amber-950 flex items-start justify-between gap-1.5">
                  <span className="leading-snug">{cert}</span>
                  {isEditing && (
                    <button
                      onClick={() => setCertifications(prev => prev.filter((_, i) => i !== idx))}
                      className="text-rose-500 hover:text-rose-700 p-0.5 cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {isEditing && (
            <div className="mt-3 flex gap-1.5 pt-3 border-t border-slate-100">
              <input
                type="text"
                value={newCert}
                onChange={(e) => setNewCert(e.target.value)}
                placeholder="Add certification..."
                className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-300"
              />
              <button
                onClick={() => {
                  if (newCert.trim()) {
                    setCertifications(prev => [...prev, newCert.trim()]);
                    setNewCert('');
                  }
                }}
                className="px-2.5 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
