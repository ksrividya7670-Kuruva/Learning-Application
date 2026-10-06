import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, ShieldCheck, Printer, Linkedin, Twitter, Facebook } from 'lucide-react';
import { getCourseCertificate } from '../lib/api';

const CertificateModal = ({ isOpen, onClose, courseName, user }) => {
  const [certData, setCertData] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);

  const [bgTheme, setBgTheme] = useState('classic');

  useEffect(() => {
    if (isOpen && courseName) {
      getCourseCertificate(courseName).then((data) => {
        setCertData(data);
        const name = user?.fullName || user?.email || data.studentName || 'Learner';
        setStudentName(name);
      });
    }
  }, [isOpen, courseName, user]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const shareText = `I just earned my ${courseName} Certificate of Completion from VeeruProAc! 🚀`;
  const shareUrl = encodeURIComponent('https://veeruproac.learn');
  const encodedText = encodeURIComponent(shareText);

  const themes = {
    classic: 'bg-[#FFEDB9] border-black text-black',
    modern: 'bg-[#FFEDB9] border-black text-black',
    gold: 'bg-[#FFEDB9] border-black text-black',
    tech: 'bg-[#FFEDB9] border-black text-black'
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/80 p-4 backdrop-blur-sm print:p-0 print:bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl rounded-none bg-white overflow-hidden border border-slate-200 print:shadow-none print:border-none"
        >
          {/* Top Control Bar (Hidden in print) */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 print:hidden">
            <div className="flex items-center gap-2 text-slate-800 font-semibold">
              <Award className="h-5 w-5 text-slate-500" />
              <span>Official Course Certificate</span>
            </div>

            <div className="flex items-center gap-3">
              <select 
                value={bgTheme} 
                onChange={(e) => setBgTheme(e.target.value)}
                className="mr-4 rounded border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-800 outline-none hover:border-slate-300 cursor-pointer"
              >
                <option value="classic">Classic Theme</option>
                <option value="modern">Modern Theme</option>
                <option value="gold">Gold Theme</option>
                <option value="tech">Tech Theme</option>
              </select>

              <div className="flex items-center gap-2 mr-2">
                <button
                  onClick={() => window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodedText}`, '_blank')}
                  className="flex items-center justify-center rounded bg-[#0077b5] p-2 text-white hover:bg-[#005582] transition"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </button>
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank')}
                  className="flex items-center justify-center rounded bg-[#1DA1F2] p-2 text-white hover:bg-[#0c85d0] transition"
                  title="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </button>
                <button
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${encodedText}`, '_blank')}
                  className="flex items-center justify-center rounded bg-[#1877F2] p-2 text-white hover:bg-[#0d65d9] transition"
                  title="Share on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </button>
              </div>
              
              <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

              <button
                onClick={handlePrint}
                className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <Printer className="h-4 w-4" />
                <span className="hidden sm:inline">Print / Save PDF</span>
              </button>
              <button
                onClick={onClose}
                className="rounded p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Certificate Design View (Printable) */}
          <div className={`p-8 sm:p-12 relative border-[16px] border-double m-4 rounded-none ${themes[bgTheme]}`}>
            
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-3 left-3 w-12 h-12 border-t-4 border-l-4 border-slate-500/60" />
            <div className="absolute top-3 right-3 w-12 h-12 border-t-4 border-r-4 border-slate-500/60" />
            <div className="absolute bottom-3 left-3 w-12 h-12 border-b-4 border-l-4 border-slate-500/60" />
            <div className="absolute bottom-3 right-3 w-12 h-12 border-b-4 border-r-4 border-slate-500/60" />

            <div className="text-center space-y-6">

              {/* Academy Logo Header */}
              <div className="flex justify-center items-center gap-3">
                {/* SN Icon Block */}
                <div className="relative">
                  <div className="absolute top-1.5 left-1.5 h-10 w-10 bg-slate-800" />
                  <div className="relative flex h-10 w-10 items-center justify-center bg-[#FF9100]">
                    <span className="text-xl font-black text-white tracking-tighter">SN</span>
                  </div>
                </div>
                
                {/* Logo Text */}
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-2xl font-black tracking-widest text-slate-800">
                    VEERUPROAC
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.25em] text-[#FF9100]">
                    LEARNING ACADEMY
                  </span>
                </div>
              </div>

              {/* Certificate Title */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-wide uppercase">
                  Certificate of Completion
                </h1>
                <p className="text-sm font-medium text-slate-600 tracking-wider uppercase">
                  This certificate is proudly presented to
                </p>
              </div>

              {/* Recipient Name */}
              <div className="py-2">
                {isEditingName ? (
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    autoFocus
                    className="text-2xl sm:text-4xl font-bold text-slate-800 border-b-2 border-slate-500 text-center focus:outline-none bg-transparent"
                  />
                ) : (
                  <div
                    onClick={() => setIsEditingName(true)}
                    className="inline-block text-2xl sm:text-4xl font-bold text-slate-800 border-b-2 border-slate-500 px-6 py-1 cursor-pointer hover:bg-white rounded transition"
                    title="Click to edit name"
                  >
                    {studentName || 'Learner Name'}
                  </div>
                )}
                <p className="text-xs text-slate-500 mt-1 print:hidden">
                  (Click name to edit if needed)
                </p>
              </div>

              {/* Achievement Text */}
              <div className="max-w-2xl mx-auto text-[#FF9100] text-sm sm:text-base leading-relaxed">
                for successfully completing the comprehensive coursework and practical mastery evaluation for
                <div className="my-2 text-xl sm:text-2xl font-bold text-[#FF9100]">
                  {courseName}
                </div>
                demonstrating high proficiency, technical understanding, and practical execution.
              </div>

              {/* Seals & Signatures Row */}
              <div className="pt-8 border-t border-slate-200 grid grid-cols-3 items-end gap-4 text-center">

                {/* Left: Issue Date */}
                <div className="text-left space-y-1">
                  <p className="text-xs text-slate-500 font-semibold uppercase">Date of Issue</p>
                  <p className="text-sm font-medium text-slate-800">
                    {certData?.issueDate || new Date().toLocaleDateString()}
                  </p>
                </div>

                {/* Center: Gold Badge Seal */}
                <div className="flex flex-col items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-[#FF9100] flex items-center justify-center ring-4 ring-slate-200">
                    <ShieldCheck className="h-9 w-9 text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mt-2">
                    Verified Authentic
                  </span>
                </div>

                {/* Right: Signature */}
                <div className="text-right space-y-1">
                  <div className="italic text-lg text-slate-800 font-bold tracking-wider">
                    VeeruProAc Board
                  </div>
                  <div className="h-0.5 bg-slate-300 w-32 ml-auto" />
                  <p className="text-xs text-slate-500 font-semibold uppercase">Authorized Instructor</p>
                </div>

              </div>

              {/* Bottom Verification Footer */}
              <div className="pt-4 flex items-center justify-between text-[11px] text-slate-500 font-mono border-t border-slate-200">
                <div>ID: <span className="text-[#FF9100] font-semibold">{certData?.certificateId || 'CERT-VeeruProAc-0001'}</span></div>
                <div>Verify: VeeruProAc.learn/verify</div>
              </div>

            </div>
          </div>

          {/* Bottom Action Bar (Hidden in print) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 bg-white px-6 py-4 print:hidden rounded-b-2xl">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-none bg-[#FF9100] px-6 py-3 font-bold text-white transition hover:bg-[#FF9100]/90 hover:-translate-y-0.5"
            >
              <Printer className="h-5 w-5" />
              <span>Claim & Save Certificate</span>
            </button>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-500 hidden sm:block">Share:</span>
              <button
                onClick={() => window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodedText}`, '_blank')}
                className="flex items-center gap-2 rounded-none bg-[#0077b5] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#005582] transition hover:-translate-y-0.5"
              >
                <Linkedin className="h-4 w-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </button>
              <button
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank')}
                className="flex items-center gap-2 rounded-none bg-[#1DA1F2] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0c85d0] transition hover:-translate-y-0.5"
              >
                <Twitter className="h-4 w-4" />
                <span className="hidden sm:inline">Twitter</span>
              </button>
              <button
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${encodedText}`, '_blank')}
                className="flex items-center gap-2 rounded-none bg-[#1877F2] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0d65d9] transition hover:-translate-y-0.5"
              >
                <Facebook className="h-4 w-4" />
                <span className="hidden sm:inline">Facebook</span>
              </button>
            </div>
          </div>

        </motion.div>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .fixed, .fixed * {
            visibility: visible;
          }
          .fixed {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            background: white !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
};

export default CertificateModal;
