import React from 'react';
import { Lock, Star, ChevronLeft, ArrowRight, ShieldCheck, Video, Clock } from 'lucide-react';
import { getCourseData } from '../data/courseData';
import { PayPalButtons } from '@paypal/react-paypal-js';

const CourseSalesPage = ({ courseName, onBack, onUpgrade }) => {
  const courseData = getCourseData(courseName) || getCourseData('JavaScript');

  const handleNavigateUpgrade = () => {
    window.history.pushState({}, '', '/upgrade');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-gray-800 pb-20">
      {/* Navigation */}
      <div className="border-b border-slate-800 bg-[#FFFFFF]/50 p-4">
        <div className="mx-auto max-w-7xl flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-none border border-black dark:border-gray-700 bg-white dark:bg-[#1E1E1E] px-5 py-2 text-sm font-bold uppercase tracking-wider text-black dark:text-white hover:bg-[#FF9100] hover:text-black transition-colors chamfer-btn cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#FFFFFF] border-b border-slate-800">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-primary/30 to-[#FF9100]/30 blur-3xl mix-blend-screen" />
        </div>
        <div className="mx-auto max-w-5xl px-4 py-20 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-500/10 border border-slate-500/20 text-gray-600 dark:text-gray-600 font-bold text-xs uppercase tracking-wider mb-6">
            <Lock className="h-4 w-4" />
            PRO Masterclass - Enrolled Members Only
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-800 tracking-tight mb-6">
            {courseData.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            {courseData.intro}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 w-full max-w-sm mx-auto">
            <PayPalButtons
              style={{ layout: "horizontal", color: "blue", shape: "rect", height: 45, tagline: false }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      description: courseData.title,
                      amount: {
                        value: "6.00"
                      }
                    }
                  ]
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  alert(`🎉 Congratulations! You have successfully unlocked "${courseData.title}".`);
                  if (onUpgrade) onUpgrade();
                });
              }}
            />
          </div>
          <div className="mt-6 flex items-center justify-center gap-4 text-xs font-semibold text-gray-600 dark:text-gray-600">
            <span className="flex items-center gap-1"><Star className="h-4 w-4 text-gray-600 fill-slate-400" /> 4.9 Average Rating</span>
            <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-[#FF9100]" /> 30-Day Guarantee</span>
          </div>
        </div>
      </div>

      {/* Curriculum Preview */}
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Course Curriculum Preview</h2>
        
        <div className="space-y-6">
          {courseData.modules?.map((mod, idx) => (
            <div key={idx} className="bg-[#FFFFFF] rounded-none border border-slate-800 p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Lock className="h-24 w-24" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 relative z-10">{mod.title}</h3>
              <p className="text-gray-600 text-sm mb-6 relative z-10">{mod.summary}</p>

              <div className="space-y-3 relative z-10">
                {mod.lessons?.map((les, lIdx) => (
                  <div key={lIdx} className="flex items-center justify-between p-4 bg-[#FFFFFF]/50 rounded-none border border-slate-800/50 opacity-75">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center">
                        <Lock className="h-4 w-4 text-gray-600 dark:text-gray-600" />
                      </div>
                      <span className="font-semibold text-gray-800">{les.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-600 dark:text-gray-600">
                      <Clock className="h-3.5 w-3.5" />
                      {les.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 w-full bg-[#FFFFFF] border-t border-slate-800 p-4 z-50">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-gray-800">Unlock Full Course</div>
            <div className="text-xs text-gray-600">Get instant access to all videos and labs.</div>
          </div>
          <button
            onClick={handleNavigateUpgrade}
            className="px-6 py-2.5 bg-[#FF9100] hover:bg-[#E68200] text-gray-800 font-bold text-sm rounded-none transition"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseSalesPage;


