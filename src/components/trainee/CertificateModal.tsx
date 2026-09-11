import React from 'react';
import { Award, Download, Printer, CheckCircle, ShieldCheck } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Certificate } from '../../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: Certificate | null;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  certificate,
}) => {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Verified Digital Certificate"
      subtitle="Cryptographically verified institutional capacity accreditation"
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Certificate Canvas */}
        <div 
          id="printable-certificate"
          className="relative bg-white border-8 border-double border-slate-700 p-8 sm:p-12 text-center rounded-lg shadow-sm"
        >
          {/* Corner ornaments */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-slate-500" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-slate-500" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-slate-500" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-slate-500" />

          {/* Seal / Emblem */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-600 flex items-center justify-center text-blue-700 shadow-xs">
              <Award className="w-9 h-9" />
            </div>
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500 mb-1">
            Official Certification of Competency
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight mb-2">
            CAPACITY CONNECT
          </h2>
          <p className="text-xs text-slate-500 italic mb-6">
            Digital Capacity Building and Professional Continuous Learning Program
          </p>

          <p className="text-sm text-slate-600 mb-2">This is to solemnly certify that</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-blue-900 underline decoration-slate-300 decoration-1 underline-offset-8 mb-4">
            {certificate.traineeName}
          </h3>

          <p className="text-sm text-slate-600 max-w-xl mx-auto mb-3">
            has successfully fulfilled all academic, practical, and assessment requirements for the advanced capacity building track:
          </p>

          <div className="inline-block bg-slate-50 px-6 py-2.5 rounded-lg border border-slate-200 mb-6 max-w-xl">
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              {certificate.courseTitle}
            </h4>
            <p className="text-xs font-semibold text-emerald-700 mt-0.5">
              Grade: {certificate.grade}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200 text-left text-xs max-w-xl mx-auto">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Date Issued</span>
              <span className="font-bold text-slate-800">{certificate.issueDate}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Verification ID</span>
              <span className="font-mono font-bold text-slate-800">{certificate.certificateNumber}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Accrediting Authority</span>
              <span className="font-bold text-slate-800">{certificate.accreditedBy}</span>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 py-2 px-4 rounded-full max-w-xs mx-auto border border-emerald-200">
            <ShieldCheck className="w-4 h-4" />
            <span>Digital Ledger Verified & Active</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print Certificate
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>
    </Modal>
  );
};
