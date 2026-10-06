import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Zap, ArrowRight } from 'lucide-react';

const CTAWithFAQ = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(0);

  const faqs = [
    {
      question: 'Is VeeruProAc suitable for beginners?',
      answer: 'Absolutely! VeeruProAc is designed for everyone, from absolute beginners to advanced developers. Our courses start with fundamentals and progress to advanced topics.',
    },
    {
      question: 'How much does it cost?',
      answer: 'VeeruProAc offers both free and premium courses. You can start learning for free, and access premium content with our affordable subscription plans.',
    },
    {
      question: 'Can I get a certificate after completing a course?',
      answer: 'Yes! Upon completing any course, you\'ll receive a verified certificate that you can add to your LinkedIn profile and resume.',
    },
    {
      question: 'Is there lifetime access to the courses?',
      answer: 'Yes, all courses you purchase have lifetime access. You can revisit the content anytime and download resources for offline learning.',
    },
    {
      question: 'How long do courses typically take?',
      answer: 'Course duration varies from 4 weeks to 12 weeks depending on complexity. You can learn at your own pace with flexibility to speed up or slow down.',
    },
    {
      question: 'Is there community support?',
      answer: 'Yes! Join our vibrant community forum where you can ask questions, share projects, and connect with thousands of learners worldwide.',
    },
  ];

  const handleStartCourse = () => {
    window.history.pushState({ course: 'HTML' }, '', '/course/HTML');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleViewPricing = () => {
    window.history.pushState({}, '', '/upgrade');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section className="bg-white dark:bg-[#121212] px-4 py-20 sm:px-6 lg:px-8 text-black dark:text-white">
      <div className="mx-auto max-w-6xl grid gap-16 lg:grid-cols-2 items-start">
        {/* Left Side - CTA */}
        <div className="flex flex-col">
          <div className="mb-6 inline-flex border border-black/15 dark:border-gray-700 bg-white dark:bg-[#1E1E1E] p-3 rounded-none w-fit shadow-sm">
            <Zap className="h-6 w-6 text-[#FF9100]" strokeWidth={2} />
          </div>

          <h2 className="mb-6 text-3xl lg:text-4xl font-bold tracking-tight text-black dark:text-white">
            Ready to Start Your{' '}
            <span className="text-[#FF9100]">
              Coding Journey?
            </span>
          </h2>

          <p className="mb-8 text-base leading-relaxed text-gray-700 dark:text-gray-300">
            Join thousands of students who've transformed their careers with VeeruProAc. Start learning today and unlock unlimited possibilities in tech.
          </p>

          <ul className="mb-10 space-y-3">
            <li className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-[#FF9100]" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Access 30+ in-depth courses</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-[#FF9100]" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Learn at your own pace</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-[#FF9100]" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Get certified upon completion</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-[#FF9100]" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Join a supportive community</span>
            </li>
          </ul>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              onClick={handleStartCourse}
              className="flex items-center justify-center gap-2 rounded-none bg-[#FF9100] px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={handleViewPricing}
              className="rounded-none bg-white dark:bg-[#1E1E1E] border border-black/30 dark:border-gray-700 px-6 py-3 text-sm font-bold text-black dark:text-white transition-colors hover:bg-gray-100 dark:hover:bg-[#262626]"
            >
              View Pricing
            </button>
          </div>
        </div>

        {/* Right Side - FAQ */}
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
            Frequently Asked Questions
          </h3>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const isActive = expandedFAQ === index;
              return (
                <div
                  key={index}
                  className={`rounded-none bg-white dark:bg-[#1E1E1E] border transition-colors shadow-sm ${isActive ? 'border-[#FF9100] bg-orange-50/20 dark:bg-orange-950/20' : 'border-black/15 dark:border-gray-700 hover:border-black/30 dark:hover:border-gray-500'}`}
                >
                  <button
                    onClick={() => setExpandedFAQ(isActive ? -1 : index)}
                    className="flex w-full items-center justify-between p-5 text-left focus:outline-none"
                  >
                    <p className={`font-bold text-sm pr-4 ${isActive ? 'text-[#FF9100]' : 'text-black dark:text-white'}`}>
                      {faq.question}
                    </p>
                    <ChevronDown className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${isActive ? 'rotate-180 text-[#FF9100]' : 'text-gray-400'}`} />
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-0">
                          <p className="leading-relaxed text-sm text-gray-600 dark:text-gray-300">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-none border border-black/15 dark:border-gray-700 bg-white dark:bg-[#1E1E1E] p-5 text-center shadow-sm">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Still have questions?{' '}
              <a href="mailto:support@veeruproac.com" className="font-bold text-[#FF9100] hover:underline transition-colors">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAWithFAQ;
