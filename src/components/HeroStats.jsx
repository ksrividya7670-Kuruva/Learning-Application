import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: 15, suffix: 'K+', label: 'Students' },
  { value: 120, suffix: '+', label: 'Courses' },
  { value: 500, suffix: '+', label: 'Coding Challenges' },
  { value: 8, suffix: 'K+', label: 'Certificates' },
];

const AnimatedCounter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frameId;
    const duration = 1400;
    const startTime = performance.now();

    const tick = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target]);

  return (
    <span className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
      {count}
      {suffix}
    </span>
  );
};

const HeroStats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-10 grid gap-4 rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/80 p-5 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.18)] backdrop-blur sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-none bg-slate-50 dark:bg-slate-800/80 px-4 py-4 text-center">
          <AnimatedCounter target={stat.value} suffix={stat.suffix} />
          <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
        </div>
      ))}
    </motion.div>
  );
};

export default HeroStats;
