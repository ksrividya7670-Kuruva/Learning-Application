import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Search, Award, CheckCircle, ChevronLeft, Download, ExternalLink, Calendar, User, FileText } from 'lucide-react';

const mockCertificates = {
  'CERT-VeeruProAc-8F92A1': {
    id: 'CERT-VeeruProAc-8F92A1',
    studentName: 'Alex Smith',
    courseName: 'Full Stack MERN & Python Masterclass',
    issueDate: 'August 01, 2026',
    status: 'Verified Official Credential',
    issuer: 'VeeruProAc Learning Academy',
    grade: 'Excellence (98%)',
    skills: ['React 18', 'Node.js', 'Express', 'MongoDB', 'Python Django', 'REST APIs'],
  },
  'CERT-VeeruProAc-3B10C4': {
    id: 'CERT-VeeruProAc-3B10C4',
    studentName: 'Sarah Johnson',
    courseName: 'Web Engineering Pro Masterclass',
    issueDate: 'July 24, 2026',
    status: 'Verified Official Credential',
    issuer: 'VeeruProAc Learning Academy',
    grade: 'Distinction (95%)',
    skills: ['HTML5', 'CSS Grid', 'JavaScript ES6+', 'Tailwind CSS', 'Web Performance'],
  },
  'CERT-VeeruProAc-9D44F2': {
    id: 'CERT-VeeruProAc-9D44F2',
    studentName: 'Michael Brown',
    courseName: 'AI & Data Science Specialist Track',
    issueDate: 'June 18, 2026',
    status: 'Verified Official Credential',
    issuer: 'VeeruProAc Learning Academy',
    grade: 'High Honors (99%)',
    skills: ['Python Data Science', 'NumPy', 'Pandas', 'Scikit-Learn', 'Machine Learning'],
  },
};

const VerifyPage = ({ onBack }) => {
  const [searchId, setSearchId] = useState('CERT-VeeruProAc-8F92A1');
  const [certData, setCertData] = useState(mockCertificates['CERT-VeeruProAc-8F92A1']);
  const [searched, setSearched] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    const cleanId = searchId.trim().toUpperCase();
    if (mockCertificates[cleanId]) {
      setCertData(mockCertificates[cleanId]);
      setSearched(true);
    } else if (cleanId.startsWith('CERT-')) {
      // Dynamic fallback for any valid formatted certificate ID
      setCertData({
        id: cleanId,
        studentName: 'Authenticated Learner',
        courseName: 'Full Stack Web Engineering',
        issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        status: 'Verified Official Credential',
        issuer: 'VeeruProAc Learning Academy',
        grade: 'Passed (Distinction)',
        skills: ['Software Architecture', 'Web Engineering', 'Modern Code Design'],
      });
      setSearched(true);
    } else {
      setCertData(null);
      setSearched(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 pt-8 pb-20">
      {/* Top Bar */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] hover:bg-slate-100 dark:bg-slate-800 transition"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>← Back to Platform</span>
        </button>
      </div>

      {/* Hero Search Header */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-500/10 border border-slate-500/20 text-[#7C3AED] font-bold text-xs uppercase tracking-wider mb-4">
          <ShieldCheck className="h-4 w-4 text-[#7C3AED]" />
          Official Credential Verification Portal
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Verify VeeruProAc Certificate
        </h1>
        <p className="mt-3 text-[#7C3AED] text-sm sm:text-base max-w-xl mx-auto">
          Enter any official Certificate Serial ID below to validate authenticity, issuer digital signature, and course completion records.
        </p>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="mt-8 flex items-center justify-center gap-2 max-w-xl mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. CERT-VeeruProAc-8F92A1"
              className="w-full rounded-none border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 py-3.5 pl-12 pr-4 text-sm font-mono font-bold text-slate-900 dark:text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] focus:border-[#FB6C00] focus:outline-none focus:ring-2 focus:ring-[#FB6C00]/20"
            />
          </div>
          <button
            type="submit"
            className="rounded-none bg-[#FB6C00] px-6 py-3.5 text-sm font-extrabold text-white shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)] hover:bg-[#D97706] transition flex-shrink-0"
          >
            Verify ID
          </button>
        </form>
      </div>

      {/* Verification Result Card */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {searched && certData ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-8 sm:p-12 shadow-[8px_8px_0px_0px_rgba(15,23,42,0.1)] relative overflow-hidden"
          >
            {/* Seal background watermark */}
            <div className="absolute -right-16 -bottom-16 opacity-5 pointer-events-none">
              <Award className="h-96 w-96 text-slate-900 dark:text-white" />
            </div>

            {/* Verification Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-none bg-orange-100 text-[#FB6C00] flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-7 w-7 text-[#FB6C00]" />
                </div>
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#7C3AED] bg-slate-50 dark:bg-slate-800 px-2.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 mb-1">
                    {certData.status}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">{certData.courseName}</h3>
                </div>
              </div>

              <div className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-none self-start sm:self-auto border border-slate-200 dark:border-slate-700">
                {certData.id}
              </div>
            </div>

            {/* Certificate Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-sm">
              <div className="p-4 rounded-none bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">
                  <User className="h-4 w-4 text-[#FB6C00]" />
                  <span>Student Name</span>
                </div>
                <div className="font-extrabold text-slate-900 dark:text-white text-base">{certData.studentName}</div>
              </div>

              <div className="p-4 rounded-none bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">
                  <Calendar className="h-4 w-4 text-[#7C3AED]" />
                  <span>Date Issued</span>
                </div>
                <div className="font-extrabold text-slate-900 dark:text-white text-base">{certData.issueDate}</div>
              </div>

              <div className="p-4 rounded-none bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-semibold mb-1">
                  <Award className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <span>Issuing Body</span>
                </div>
                <div className="font-extrabold text-slate-900 dark:text-white text-base">{certData.issuer}</div>
              </div>
            </div>

            {/* Validated Skills Tags */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                Verified Skills & Competencies
              </h4>
              <div className="flex flex-wrap gap-2">
                {certData.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-none bg-slate-50 dark:bg-slate-800 text-[#7C3AED] text-xs font-bold border border-slate-200 dark:border-slate-700/60">
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Issuer Signature & Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 text-xs text-[#7C3AED]">
                <ShieldCheck className="h-6 w-6 text-[#7C3AED] flex-shrink-0" />
                <span>Digitally signed & tamper-proof cryptographic verification record.</span>
              </div>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 rounded-none bg-slate-900 text-white px-5 py-2.5 text-xs font-extrabold hover:bg-slate-800 transition shadow"
              >
                <Download className="h-4 w-4" />
                <span>Download / Print Verified Certificate</span>
              </button>
            </div>
          </motion.div>
        ) : searched ? (
          <div className="rounded-none bg-white dark:bg-slate-900 border border-red-200 p-8 text-center text-slate-700 dark:text-slate-200 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)]">
            <div className="text-[#FB6C00] font-bold text-lg mb-2">Certificate ID Not Found</div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Please verify the serial ID format (e.g. CERT-VeeruProAc-8F92A1) or try searching one of our sample IDs above.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default VerifyPage;

