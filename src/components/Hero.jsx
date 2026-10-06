import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroButtons from './HeroButtons';
import HeroIllustration from './HeroIllustration';
import { Terminal, CheckCircle2 } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#121212] px-4 sm:px-6 lg:px-8 h-[calc(100vh-104px)] min-h-[400px] flex items-center justify-center transition-colors">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none bg-white dark:bg-[#121212]"></div>

      <div className="relative mx-auto max-w-7xl w-full">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight uppercase text-black dark:text-white font-sans"
            >
              MASTER <span className="text-[#FF9100]">ENGINEERING</span> WITH PRECISION.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-gray-700 dark:text-gray-300 font-normal border-l-4 border-[#FF9100] pl-4"
            >
              Learn software architecture through intensive, hands-on enterprise-grade challenges. Skip the generic tutorials and start building production-ready systems today.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10"
            >
              <HeroButtons />
            </motion.div>
          </motion.div>

          {/* Right Hero Illustration — hidden on mobile */}
          <div className="relative z-10 w-full hidden md:block">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
