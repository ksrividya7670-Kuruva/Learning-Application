import { motion } from 'framer-motion';
import { ArrowRight, Code } from 'lucide-react';

const HeroButtons = () => {
  const handleStartLearning = (e) => {
    e.preventDefault();
    window.history.pushState({ course: 'HTML' }, '', '/course/HTML');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleExplorePaths = (e) => {
    e.preventDefault();
    window.history.pushState({}, '', '/upgrade');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
      <motion.button
        onClick={handleStartLearning}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="group inline-flex items-center justify-center gap-3 bg-[#FF9100] text-white px-8 py-4 text-sm font-bold tracking-wide uppercase cursor-pointer transition-colors hover:bg-orange-600 whitespace-nowrap flex-1 sm:flex-none rounded-none border border-black chamfer-btn shadow-md hover:shadow-lg hover:shadow-[#FF9100]/20"
      >
        <Code size={18} strokeWidth={2.5} className="transition-transform group-hover:rotate-12" />
        START CODING NOW
      </motion.button>

      <motion.button
        onClick={handleExplorePaths}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="group inline-flex items-center justify-center gap-2 border border-black/30 dark:border-gray-700 bg-white dark:bg-[#262626] px-8 py-4 text-sm font-bold tracking-wide uppercase text-black dark:text-gray-200 cursor-pointer transition-colors hover:bg-black hover:text-white dark:hover:bg-gray-800 whitespace-nowrap flex-1 sm:flex-none rounded-none chamfer-btn shadow-sm hover:shadow-md"
      >
        EXPLORE COURSES
        <ArrowRight size={18} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1.5" />
      </motion.button>
    </div>
  );
};

export default HeroButtons;
