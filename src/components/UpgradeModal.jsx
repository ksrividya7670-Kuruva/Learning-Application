import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check, Clock, Video, Award, Zap, ShieldCheck } from 'lucide-react';

const upgradePlans = [
  {
    id: 'web-pro',
    title: 'Web Engineering Pro',
    category: 'Frontend & Full Stack',
    price: '$29',
    period: '/month',
    duration: '8 Weeks Duration',
    popular: false,
    badge: 'Popular for Beginners',
    description: 'Master HTML, CSS, JavaScript, React, and Tailwind CSS with video masterclasses and projects.',
    features: [
      '40+ HD Video Lectures',
      'Interactive Code Exercises',
      'Downloadable Study Notes & Cheat Sheets',
      'Verified Certificate of Completion',
      'Community Discord Access',
    ],
  },
  {
    id: 'fullstack-master',
    title: 'Full Stack Masterclass',
    category: 'MERN & Python Web',
    price: '$49',
    period: 'one-time',
    duration: '12 Weeks Duration',
    popular: true,
    badge: '★ Best Value',
    description: 'Complete full stack path covering Node.js, Express, MongoDB, Python Django, and REST APIs.',
    features: [
      '60+ HD Video Masterclasses',
      'Complete Project Source Code',
      'Backend & Database Deployment Labs',
      '1-on-1 Code Reviews from Instructors',
      'Official Certificate of Mastery',
    ],
  },
  {
    id: 'ai-data',
    title: 'AI & Data Science Specialist',
    category: 'Machine Learning & Python',
    price: '$79',
    period: 'one-time',
    duration: '16 Weeks Duration',
    popular: false,
    badge: 'Advanced Track',
    description: 'Learn NumPy, Pandas, Data Visualization, Scikit-Learn, and Neural Networks with video labs.',
    features: [
      '75+ HD Video Tutorials',
      'Real-world Datasets & Jupyter Notebooks',
      'GPU Lab Access & Model Training',
      'Career Guidance & Resume Reviews',
      'Professional AI Specialist Certificate',
    ],
  },
  {
    id: 'unlimited-pass',
    title: 'VeeruProAc Unlimited Pass',
    category: 'All-Access VIP Membership',
    price: '$99',
    period: '/year',
    duration: '1 Year Full Access',
    popular: false,
    badge: 'VIP Membership',
    description: 'Unlimited access to all 35+ courses, all video classes, new releases, and priority support.',
    features: [
      'Access to All 35+ Tech Courses',
      'All HD Video Masterclasses & Labs',
      'Instant Unlimited Certificates',
      'Priority Support & Live Q&A Sessions',
      'Offline Video Downloads',
    ],
  },
];

const UpgradeModal = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState('fullstack-master');

  if (!isOpen) return null;

  const handleEnroll = (plan) => {
    alert(`🎉 Thank you for upgrading to ${plan.title}! You now have full access to HD Video Classes and Pro Features.`);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/80 p-4 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-none bg-white p-6 sm:p-10 border border-slate-200"
        >
          <button
            onClick={onClose}
            className="absolute right-6 top-6 rounded-none bg-white p-2 text-slate-800 border border-slate-200 hover:bg-slate-50 transition"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-white border border-slate-200 text-slate-800 font-semibold text-xs uppercase tracking-wider mb-4">
              Upgrade to VeeruProAc PRO
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
              Unlock Video Classes & Pro Courses
            </h2>
            <p className="mt-3 text-slate-800 text-sm sm:text-base">
              Get unlimited access to HD video masterclasses, hands-on projects, verified certificates, and instructor support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {upgradePlans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative flex flex-col justify-between rounded-none p-6 transition-all cursor-pointer border ${
                    plan.popular
                      ? 'border-[#FF9100] bg-white ring-2 ring-[#FF9100]'
                      : isSelected
                      ? 'border-slate-400 bg-white'
                      : 'border-slate-200 bg-white hover:border-[#FF9100]'
                  }`}
                >
                  {plan.badge && (
                    <div
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-none text-[11px] font-bold tracking-wide border ${
                        plan.popular ? 'bg-[#FF9100] text-white border-[#FF9100]' : 'bg-white text-slate-800 border-slate-200'
                      }`}
                    >
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    <div className="text-xs font-semibold text-[#FF9100] uppercase tracking-wider mb-1">
                      {plan.category}
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{plan.title}</h3>

                    <div className="flex items-baseline gap-1 my-3">
                      <span className="text-3xl font-extrabold text-slate-800">{plan.price}</span>
                      <span className="text-xs font-medium text-slate-800">{plan.period}</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none border border-slate-200 bg-white text-slate-800 text-xs font-medium mb-4">
                      <Clock className="h-3.5 w-3.5 text-[#FF9100]" />
                      <span>{plan.duration}</span>
                    </div>

                    <p className="text-xs text-slate-800 mb-4 leading-relaxed">{plan.description}</p>

                    <div className="space-y-2 border-t border-slate-200 pt-4 mb-6">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-800">
                          <Check className="h-4 w-4 text-[#FF9100] flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnroll(plan);
                    }}
                    className={`w-full py-2.5 px-4 rounded-none text-xs font-bold transition border ${
                      plan.popular
                        ? 'bg-[#FF9100] text-white hover:bg-[#FF9100]/90 border-[#FF9100]'
                        : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Enroll Now →
                  </button>
                </div>
              );
            })}
          </div>

          <div className="rounded-none bg-white border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#FF9100]" />
              <span>30-Day Money-Back Guarantee • Cancel Anytime • Lifetime Certificate Verification</span>
            </div>
            <div className="flex items-center gap-3 font-semibold text-slate-800">
              <span className="flex items-center gap-1"><Video className="h-4 w-4 text-[#FF9100]" /> HD Video Classes</span>
              <span className="flex items-center gap-1"><Award className="h-4 w-4 text-[#FF9100]" /> Pro Certificate</span>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UpgradeModal;
