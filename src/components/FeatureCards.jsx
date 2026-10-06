import { motion } from 'framer-motion';
import { Brain, Code2, Trophy, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Code2,
    title: 'Interactive Coding',
    description: 'Practice coding directly in your browser with instant output.',
  },
  {
    icon: Brain,
    title: 'AI Learning Assistant',
    description: 'Receive intelligent hints and personalized explanations.',
  },
  {
    icon: TrendingUp,
    title: 'Personalized Progress',
    description: 'Track lessons, quizzes, and achievements with clarity.',
  },
  {
    icon: Trophy,
    title: 'Verified Certificates',
    description: 'Earn certificates after completing courses with confidence.',
  },
];

const FeatureCards = () => {
  return (
    <div className="w-full bg-white dark:bg-[#121212] px-4 py-16 sm:px-6 lg:px-8 transition-colors">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
            Core Platform <span className="text-[#FF9100]">Features</span>
          </h2>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Everything you need to accelerate your career</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group rounded-none border border-black/15 dark:border-gray-700 bg-white dark:bg-[#1E1E1E] p-6 shadow-sm transition-all duration-300 hover:border-[#FF9100] hover:shadow-md cursor-pointer chamfer-card"
              >
                <div className="mb-6 inline-flex rounded-none bg-[#FF9100] p-2.5 text-black transition-transform duration-300 group-hover:scale-110">
                  <Icon size={24} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-black dark:text-white group-hover:text-[#FF9100] transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
