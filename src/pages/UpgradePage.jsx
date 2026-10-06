import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, Code2, Database, Brain, Terminal, ShieldCheck, PenTool, TrendingUp, MonitorPlay, Cloud, X, Clock, IndianRupee, FileText, Table, Presentation } from 'lucide-react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { generateReferralCode } from '../lib/referralSystem';

const categories = [
  'All',
  'MS Office & Productivity',
  'Data Science & Analytics',
  'AI & ML',
  'DSA',
  'Design',
  'Finance',
  'Video Editing',
  'Cyber Security',
  'Software Development',
  'Marketing',
  'DevOps & Cloud'
];

const allCourses = [
  { id: 'ms-excel', title: 'MS Excel', category: 'MS Office & Productivity', icon: Table, duration: '6 Weeks', iconColor: 'text-emerald-500' },
  { id: 'ms-word', title: 'MS Word', category: 'MS Office & Productivity', icon: FileText, duration: '4 Weeks', iconColor: 'text-blue-500' },
  { id: 'powerpoint', title: 'PowerPoint', category: 'MS Office & Productivity', icon: Presentation, duration: '4 Weeks', iconColor: 'text-[#FB6C00]' },
  { id: 'web-mern', title: 'Web Development MERN Stack', category: 'Software Development', icon: Code2, duration: '12 Weeks', iconColor: 'text-emerald-400' },
  { id: 'python', title: 'Python', category: 'Software Development', icon: Terminal, duration: '8 Weeks', iconColor: 'text-yellow-400' },
  { id: 'data-science', title: 'Data Science', category: 'Data Science & Analytics', icon: Database, duration: '16 Weeks', iconColor: 'text-blue-400' },
  { id: 'data-analytics', title: 'Data Analytics', category: 'Data Science & Analytics', icon: TrendingUp, duration: '10 Weeks', iconColor: 'text-slate-400' },
  { id: 'machine-learning', title: 'Machine Learning', category: 'AI & ML', icon: Brain, duration: '14 Weeks', iconColor: 'text-slate-400' },
  { id: 'dsa-cpp', title: 'Data Structures & Algorithms (C++)', category: 'DSA', icon: Code2, duration: '12 Weeks', iconColor: 'text-blue-500' },
  { id: 'ui-ux-design', title: 'UI/UX Design Masterclass', category: 'Design', icon: PenTool, duration: '6 Weeks', iconColor: 'text-pink-400' },
  { id: 'video-editing', title: 'Video Editing Pro', category: 'Video Editing', icon: MonitorPlay, duration: '8 Weeks', iconColor: 'text-rose-500' },
  { id: 'cyber-security', title: 'Cyber Security Basics', category: 'Cyber Security', icon: ShieldCheck, duration: '10 Weeks', iconColor: 'text-red-500' },
  { id: 'aws-cloud', title: 'AWS Cloud Architecture', category: 'DevOps & Cloud', icon: Cloud, duration: '12 Weeks', iconColor: 'text-slate-500 dark:text-slate-400' },
];

const UpgradePage = ({ user, onBack, onSelectCourse, onUpgrade }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPayPal, setShowPayPal] = useState(false);

  const filteredCourses = allCourses.filter(course => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEnroll = (course) => {
    alert('🎉 Congratulations! You have successfully unlocked "' + course.title + '".');
    onUpgrade?.();
    setSelectedCourse(null);
    const url = '/course/' + encodeURIComponent(course.title);
    window.history.pushState({ course: course.title }, '', url);
    onSelectCourse?.(course.title);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] pt-6 pb-20 relative transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-none border border-black dark:border-gray-700 bg-white dark:bg-[#1E1E1E] px-5 py-2 text-sm font-bold uppercase tracking-wider text-black dark:text-white hover:bg-[#FF9100] hover:text-black transition-colors chamfer-btn cursor-pointer shadow-sm"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Machine Learning"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-6 pr-16 rounded-none border-2 border-black dark:border-gray-700 bg-white dark:bg-[#1E1E1E] text-lg font-medium text-black dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#FF9100] transition-colors"
            />
            <div className="absolute right-2 top-2 bottom-2 aspect-square bg-[#FF9100] border border-black flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors">
              <Search className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-none text-xs font-bold uppercase tracking-wide transition-all border cursor-pointer ${
                activeCategory === cat 
                  ? 'border-[#FF9100] bg-[#FF9100] text-white shadow-sm' 
                  : 'border-black/25 dark:border-gray-700 bg-white dark:bg-[#1E1E1E] text-gray-800 dark:text-gray-200 hover:border-[#FF9100] hover:text-[#FF9100]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {filteredCourses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <button
                onClick={() => setSelectedCourse(course)}
                className="w-full group flex flex-col items-center p-7 bg-white dark:bg-[#1E1E1E] rounded-none border-2 border-black dark:border-gray-700 hover:border-[#FF9100] transition-all cursor-pointer hover:shadow-xl hover:shadow-[#FF9100]/10 chamfer-card"
              >
                <div className="w-20 h-20 rounded-none bg-black flex flex-col items-center justify-center mb-5 border border-black group-hover:scale-105 transition-transform duration-300">
                  <course.icon className={'h-9 w-9 ' + course.iconColor} strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-black text-black dark:text-white text-center leading-tight">
                  {course.title}
                </h3>
              </button>
            </motion.div>
          ))}
          {filteredCourses.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500 font-bold uppercase">
              No courses found for your search.
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => { setSelectedCourse(null); setShowPayPal(false); }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white dark:bg-[#1E1E1E] rounded-none border-2 border-black dark:border-gray-700 shadow-2xl overflow-hidden z-10 p-6 sm:p-8"
            >
              <div className="absolute top-4 right-4 z-20">
                <button
                  onClick={() => { setSelectedCourse(null); setShowPayPal(false); }}
                  className="p-2 rounded-none bg-white dark:bg-[#262626] border border-black text-black dark:text-white hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-2 sm:p-4 text-left">
                <div className="inline-block border border-black dark:border-gray-700 rounded-none px-3 py-1 mb-6 bg-gray-50 dark:bg-gray-800">
                  <span className="text-black dark:text-white font-bold text-xs uppercase tracking-wider">VeeruProAc Initiative</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-black text-black dark:text-white leading-tight uppercase tracking-tight mb-4">
                  90 Days Challenge to become <span className="text-[#FF9100]">{selectedCourse.title}</span> Expert
                </h2>
                
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-lg sm:text-xl font-bold text-gray-400 line-through">₹1,199</span>
                  <span className="text-3xl sm:text-4xl font-black text-black dark:text-white tracking-tight">₹499</span>
                  <span className="bg-[#FF9100] text-white font-bold px-3 py-1 rounded-none border border-black text-sm">58% OFF</span>
                </div>

                <p className="text-gray-700 dark:text-gray-300 font-medium text-sm mb-8">
                  (Get Your <span className="font-bold text-black dark:text-white">100% Fees Back</span> As A Reward If You Complete This 90-Days Challenge)
                </p>

                <button 
                  onClick={() => {
                    if (user?.email) {
                      generateReferralCode(user.email, selectedCourse.title);
                    }
                    window.history.pushState({ course: selectedCourse.title }, '', '/payment');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  className="w-full bg-[#FF9100] hover:bg-orange-600 text-white font-bold text-lg py-3.5 rounded-none border border-black transition-colors cursor-pointer uppercase tracking-wider chamfer-btn shadow-md"
                >
                  Join 90 Days Challenge
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UpgradePage;

