import { motion } from 'framer-motion';
import { Code2, Database, Terminal, FileCode, Server, Brain, Laptop, Palette, ChevronLeft, ChevronRight, FileText, Table, Presentation } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getCourses } from '../lib/dataStore';

const getCourseIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes('word')) return FileText;
  if (t.includes('excel')) return Table;
  if (t.includes('powerpoint') || t.includes('ppt')) return Presentation;
  if (t.includes('html')) return FileCode;
  if (t.includes('css')) return Palette;
  if (t.includes('sql') || t.includes('dbms')) return Database;
  if (t.includes('python') || t.includes('numpy') || t.includes('pandas')) return Terminal;
  if (t.includes('react') || t.includes('node') || t.includes('express')) return Server;
  if (t.includes('dsa') || t.includes('data')) return Brain;
  if (t.includes('c') || t.includes('java')) return Code2;
  return Laptop;
};

const Courses = ({ onSelectCourse }) => {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const localCourses = getCourses().map(c => c.title);
    setCourseList(localCourses);
    setLoading(false);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      if (direction === 'left') {
        scrollContainerRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollContainerRef.current.scrollLeft += scrollAmount;
      }
    }
  };
  return (
    <section className="sticky top-16 z-40 border-b-2 border-[#7C3AED]/10 bg-white dark:bg-slate-900/95 px-4 py-2 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex items-center gap-3">
          <motion.button
            whileHover={{ y: -4, x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scroll('left')}
            className="flex-shrink-0 rounded-full bg-orange-100 p-2 text-[#FB6C00] shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] transition-all hover:bg-orange-200"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <div ref={scrollContainerRef} className="flex flex-nowrap gap-2 overflow-x-auto pb-0.5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {courseList.map((course, index) => {
              const currentPathCourse = decodeURIComponent(window.location.pathname.replace('/course/', ''));
              const isActive = currentPathCourse.toLowerCase() === course.toLowerCase();
              const Icon = getCourseIcon(course);
              return (
                <motion.button
                  key={course}
                  onClick={() => {
                    const url = `/course/${encodeURIComponent(course)}`;
                    window.history.pushState({ course }, '', url);
                    onSelectCourse?.(course);
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group flex flex-shrink-0 items-center justify-center rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FB6C00] text-white border-[#FB6C00] shadow-[0_2px_8px_rgba(251,108,0,0.25)] ring-2 ring-[#FB6C00]/30'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-[#7C3AED] hover:bg-slate-50 dark:bg-slate-800 hover:text-[#7C3AED]'
                  }`}
                >
                  <div className="flex items-center gap-0 group-hover:gap-1.5 transition-all duration-300">
                    <div className="flex items-center overflow-hidden transition-all duration-300 w-0 group-hover:w-3.5 opacity-0 group-hover:opacity-100">
                      <Icon className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={2.5} />
                    </div>
                    <span className="whitespace-nowrap">{course}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.button
            whileHover={{ y: -4, x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scroll('right')}
            className="flex-shrink-0 rounded-full bg-orange-100 p-2 text-[#FB6C00] shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] transition-all hover:bg-orange-200"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>

      <style>{`
        div:has(> div::-webkit-scrollbar) {
          scrollbar-width: thin;
        }
      `}</style>
    </section>
  );
};

export default Courses;

