import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const HeroBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className=\"inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2.5 shadow-[0_4px_12px_-3px_rgba(59,130,246,0.15)]\"
    >
      <span className=\"rounded-full bg-blue-600/10 p-1.5 text-blue-600\">
        
      </span>
      <span className=\"text-sm font-semibold text-blue-700\">🚀 AI-Powered Learning Platform</span>
    </motion.div>
  );
};

export default HeroBadge;
