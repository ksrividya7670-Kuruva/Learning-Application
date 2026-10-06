import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getCourses } from '../lib/dataStore';

const ExploreAllCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(getCourses());
  }, []);

  return (
    <section className="relative bg-white dark:bg-[#121212] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
            Explore All <span className="text-[#FF9100]">Courses</span>
          </h2>
        </motion.div>

        {/* Scrollable Container */}
        <div className="scrollbar-hide overflow-x-auto pb-4">
          <div className="flex gap-4">
            {courses.map((course, index) => {
              const handleCourseClick = (e) => {
                e.preventDefault();
                const url = `/course/${encodeURIComponent(course.title)}`;
                window.history.pushState({ course: course.title }, '', url);
                window.dispatchEvent(new PopStateEvent('popstate'));
              };

              return (
                <motion.div
                  key={course.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0"
                >
                  <motion.button
                    onClick={handleCourseClick}
                    className="block rounded-none border border-black/20 dark:border-gray-700 bg-white dark:bg-[#1E1E1E] px-6 py-3 font-bold text-black dark:text-white uppercase transition-all hover:bg-[#FF9100] dark:hover:bg-[#FF9100] hover:text-black dark:hover:text-black hover:border-[#FF9100] whitespace-nowrap cursor-pointer shadow-sm hover:shadow-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    [ {course.title} ]
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ExploreAllCourses;
