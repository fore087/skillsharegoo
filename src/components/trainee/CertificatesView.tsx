import React, { useState } from 'react';
import { 
  Award, 
  Download, 
  Printer, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  Calendar, 
  QrCode, 
  Lock,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Certificate } from '../../types';
import { CertificateModal } from './CertificateModal';

export const CertificatesView: React.FC = () => {
  const { certificates, currentUser, courses, setActiveTab } = useApp();

  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-100">
              Verified Civil Service Credentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1.5">
              Accredited Certificates & Credentials
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Cryptographically verified credentials issued under the National Board of Digital Capacity Accreditation (NBDCA).
            </p>
          </div>

          <div className="flex items-center gap-3 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <div className="text-left">
              <p className="text-xs font-bold text-emerald-950">{certificates.length} Active Certificates</p>
              <p className="text-[11px] text-emerald-700">Tamper-Proof Verification</p>
            </div>
          </div>
        </div>

        {/* Verification guarantee */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <Lock className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              All certificates feature unique cryptographic serials and QR-verifiable ledger IDs for public audits.
            </span>
          </div>
          <span className="font-mono text-slate-500 shrink-0">Official Registry v2.4</span>
        </div>
      </div>

      {/* Certificate Cards Grid */}
      {certificates.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-3">
          <Award className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No certificates earned yet</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Complete your enrolled course modules and pass the subject MCQ assessment with 70%+ to unlock official accreditation certificates.
          </p>
          <button
            onClick={() => setActiveTab('assessments')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
          >
            Take an Assessment
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl border-2 border-slate-200 hover:border-amber-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Certificate Card Header Graphic */}
              <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-5 text-white relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <Award className="w-32 h-32" />
                </div>

                <div className="flex items-center justify-between relative z-10 text-[10px] text-white/70 font-mono">
                  <span>NBDCA ACCREDITED</span>
                  <span className="bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                    Grade {cert.grade}
                  </span>
                </div>

                <div className="my-3 relative z-10">
                  <p className="text-[11px] font-mono text-white/80">{cert.certificateNumber}</p>
                  <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 mt-1">
                    {cert.courseTitle}
                  </h3>
                </div>

                <div className="flex items-center justify-between text-[11px] text-white/70 pt-2 border-t border-white/10 relative z-10">
                  <span>Recipient: {cert.traineeName}</span>
                  <span>Issued: {cert.issueDate}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Issuing Director</span>
                    <span className="font-semibold text-slate-800">{cert.issuingAuthority}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Evaluation Grade</span>
                    <span className="font-bold text-emerald-600">{cert.grade} (Distinction)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Cryptographic Hash</span>
                    <span className="font-mono text-[10px] text-slate-500">SHA-256 Verified</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Valid & Active
                  </span>
                  <span>Permanent Record</span>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => setSelectedCertificate(cert)}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-2xs transition-colors"
                >
                  <Award className="w-4 h-4 text-amber-400" />
                  View Official Document
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certificate Modal Viewer */}
      <CertificateModal
        isOpen={!!selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
        certificate={selectedCertificate}
      />
    </div>
  );
};
