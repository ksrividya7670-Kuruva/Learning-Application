import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { BookOpen, Award, Clock, ArrowLeft, Trophy, Target, Zap, PlayCircle, Gift, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

import CertificateModal from '../components/CertificateModal';

const activityData = [
  { day: 'Mon', hours: 1.2 },
  { day: 'Tue', hours: 2.5 },
  { day: 'Wed', hours: 1.8 },
  { day: 'Thu', hours: 3.2 },
  { day: 'Fri', hours: 2.1 },
  { day: 'Sat', hours: 4.5 },
  { day: 'Sun', hours: 3.8 },
];

const progressData = [
  { course: 'Python Masterclass', progress: 85, color: 'bg-[#FF9100]' },
  { course: 'React Developer', progress: 45, color: 'bg-[#FF9100]' },
  { course: 'UI/UX Design', progress: 100, color: 'bg-[#FF9100]' },
  { course: 'Data Science', progress: 20, color: 'bg-[#FF9100]' },
];

const DashboardPage = ({ user, onBack, onSelectCourse }) => {
  const [showCertificates, setShowCertificates] = useState(false);
  const [viewCertificate, setViewCertificate] = useState(null);

  return (
    <div className="min-h-screen bg-[#FFFFFF] p-4 sm:p-6 lg:p-8 pt-24">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between bg-white p-4 sm:p-6 rounded-none border border-slate-200 shadow-none border border-slate-200 gap-3">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex h-10 w-10 items-center justify-center rounded-none bg-slate-100 text-[#FF9100] hover:bg-orange-50 hover:text-[#FF9100] transition"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Welcome back, {user?.fullName || user?.name || 'Student'}! 👋
              </h1>
              <p className="text-sm font-medium text-slate-500 mt-1">Here is your learning progress overview.</p>
            </div>
          </div>
          {user?.isPro && (
            <div className="hidden sm:flex items-center gap-2 from-[#FF9100] to-[#FF9100] px-4 py-2 rounded-none text-white shadow-none border border-slate-200 font-bold text-sm">
              <Trophy className="h-4 w-4" /> VeeruProAc PRO Member
            </div>
          )}
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div whileHover={{ y: -4 }} className="bg-white p-6 rounded-none border border-slate-200 shadow-none border border-slate-200 flex items-center gap-4 cursor-pointer">
            <div className="h-12 w-12 rounded-none bg-orange-100 flex items-center justify-center text-[#FF9100]">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500">Active Courses</p>
              <h3 className="text-2xl font-black text-slate-900">4</h3>
            </div>
          </motion.div>

          <motion.div onClick={() => setShowCertificates(true)} whileHover={{ y: -4 }} className="bg-white p-6 rounded-none border border-slate-200 shadow-none border border-slate-200 flex items-center gap-4 cursor-pointer">
            <div className="h-12 w-12 rounded-none bg-slate-100 flex items-center justify-center text-[#FF9100]">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500">Certificates Earned</p>
              <h3 className="text-2xl font-black text-slate-900">1</h3>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="bg-white p-6 rounded-none border border-slate-200 shadow-none border border-slate-200 flex items-center gap-4 cursor-pointer">
            <div className="h-12 w-12 rounded-none bg-orange-100 flex items-center justify-center text-[#FF9100]">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500">Hours Learned</p>
              <h3 className="text-2xl font-black text-slate-900">19.1</h3>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="bg-white p-6 rounded-none border border-slate-200 shadow-none border border-slate-200 flex items-center gap-4 cursor-pointer">
            <div className="h-12 w-12 rounded-none bg-slate-100 flex items-center justify-center text-[#FF9100]">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500">Current Streak</p>
              <h3 className="text-2xl font-black text-slate-900">5 Days</h3>
            </div>
          </motion.div>
        </div>

        {/* Charts and Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white rounded-none border border-slate-200 shadow-none border border-slate-200 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Target className="h-5 w-5 text-[#FF9100]"/> Learning Activity (This Week)</h2>
                <p className="text-xs text-slate-500 mt-1">Hours spent watching videos, coding, and taking quizzes.</p>
              </div>
            </div>
            <div className="h-48 sm:h-60 lg:h-72 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip 
                    cursor={{ fill: '#fff7ed' }}
                    contentStyle={{ borderRadius: '0px', border: '1px solid #FF9100', boxShadow: '4px 4px 0px 0px rgba(251,108,0,0.15)' }}
                  />
                  <Bar dataKey="hours" fill="#FF9100" radius={[6, 6, 6, 6]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Column Container */}
          <div className="space-y-6">
            {/* Progress List */}
            <div className="bg-white rounded-none border border-slate-200 shadow-none border border-slate-200 p-6 space-y-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2"><BookOpen className="h-5 w-5 text-[#FF9100]"/> Current Courses</h2>
              <div className="space-y-5">
                {progressData.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-800">{item.course}</span>
                      <span className="text-xs font-bold text-slate-500">{item.progress}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full ${item.color} rounded-full`}
                      />
                    </div>
                    {item.progress < 100 ? (
                      <button 
                        onClick={() => onSelectCourse(item.course.replace(/ /g, '-'))}
                        className="text-xs font-bold text-[#FF9100] hover:text-[#E68200] flex items-center gap-1 mt-1 transition"
                      >
                        <PlayCircle className="h-3.5 w-3.5" /> Resume Learning
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-[#FF9100] flex items-center gap-1 mt-1">
                        <Award className="h-3.5 w-3.5" /> Completed
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Referral Program Card */}
            <div className="bg-[#133458] dark:bg-[#133458] rounded-none shadow-none border border-black dark:border-gray-700 p-6 space-y-4 text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 opacity-10">
                <Gift className="h-40 w-40 text-[#FF9100]" />
              </div>
              <div className="relative z-10 space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-[#FF9100] px-3 py-1 rounded-none text-xs font-bold text-white border border-black mb-2">
                  <Gift className="h-3.5 w-3.5" /> Invite &amp; Earn
                </div>
                <h2 className="text-xl font-black text-white uppercase tracking-tight">Refer a Friend</h2>
                <p className="text-sm text-gray-200 leading-relaxed font-medium">
                  Get 1 month of <span className="font-bold text-[#FF9100]">VeeruProAc PRO</span> free for every friend that signs up using your unique link!
                </p>
                <div className="pt-2">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5 block">Your Referral Link</label>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 bg-white/10 border border-white/20 rounded-none px-3 py-2 text-xs font-mono font-bold truncate text-white select-all">
                      https://veeruproac.learn/ref/{user?.fullName?.replace(/\s+/g, '').toLowerCase() || 'student'}
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(`https://veeruproac.learn/ref/${user?.fullName?.replace(/\s+/g, '').toLowerCase() || 'student'}`);
                        alert('Referral link copied to clipboard!');
                      }}
                      className="bg-[#FF9100] text-white hover:bg-orange-600 p-2.5 rounded-none transition shadow-none border border-black cursor-pointer flex items-center justify-center font-bold"
                      title="Copy Link"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        const link = `https://veeruproac.learn/ref/${user?.fullName?.replace(/\s+/g, '').toLowerCase() || 'student'}`;
                        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`Hey! I'm learning on VeeruProAc. Sign up using my referral link and we both get a free month of PRO! 🚀 ${link}`)}`, '_blank');
                      }}
                      className="bg-[#25D366] text-white hover:bg-[#1ebd59] p-2.5 rounded-none transition shadow-none border border-black cursor-pointer flex items-center justify-center"
                      title="Share on WhatsApp"
                    >
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-3">
                    <div className="text-xs font-bold text-gray-300 uppercase tracking-wider">Friends Referred</div>
                    <div className="text-sm font-black text-[#FF9100]">0 / 5</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Certificates Modal */}
      {showCertificates && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-white rounded-none shadow-none border border-slate-200 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Award className="h-6 w-6 text-[#FF9100]" /> My Certificates
              </h2>
              <button 
                onClick={() => setShowCertificates(false)}
                className="text-slate-400 hover:text-[#FF9100] transition"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between bg-[#FFFFFF] border border-slate-100 p-4 rounded-none">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-slate-100 text-[#FF9100] rounded-none flex items-center justify-center">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">UI/UX Design Masterclass</h4>
                    <p className="text-xs font-semibold text-slate-500">Issued: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setViewCertificate('UI/UX Design Masterclass')}
                  className="text-sm font-bold text-[#FF9100] hover:text-[#E68200] transition bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-none cursor-pointer"
                >
                  View
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Actual Certificate Viewer Modal */}
      <CertificateModal
        isOpen={!!viewCertificate}
        onClose={() => setViewCertificate(null)}
        courseName={viewCertificate || 'UI/UX Design Masterclass'}
        user={user}
      />

    </div>
  );
};

export default DashboardPage;
