import { motion } from 'framer-motion';
import { useState } from 'react';

const AllCourses = () => {
  const [activeCategory, setActiveCategory] = useState('Web');

  const categories = [
    { name: 'Web' },
    { name: 'Mobile' },
    { name: 'Data Science' },
    { name: 'AI/ML' },
    { name: 'Cloud' },
    { name: 'Game Dev' },
  ];

  const coursesByCategory = {
    Web: [
      { title: 'HTML & CSS Basics', level: 'Beginner', duration: '4 weeks' },
      { title: 'JavaScript Fundamentals', level: 'Beginner', duration: '6 weeks' },
      { title: 'React.js Mastery', level: 'Intermediate', duration: '8 weeks' },
      { title: 'Vue.js Complete Guide', level: 'Intermediate', duration: '7 weeks' },
      { title: 'Node.js & Express', level: 'Intermediate', duration: '8 weeks' },
      { title: 'Full Stack Web Dev', level: 'Advanced', duration: '12 weeks' },
    ],
    Mobile: [
      { title: 'React Native Basics', level: 'Beginner', duration: '6 weeks' },
      { title: 'Flutter Development', level: 'Beginner', duration: '8 weeks' },
      { title: 'iOS Swift Development', level: 'Intermediate', duration: '10 weeks' },
      { title: 'Android with Kotlin', level: 'Intermediate', duration: '10 weeks' },
      { title: 'Cross-Platform Apps', level: 'Advanced', duration: '12 weeks' },
      { title: 'Mobile UI/UX Design', level: 'Intermediate', duration: '6 weeks' },
    ],
    'Data Science': [
      { title: 'Python for Data', level: 'Beginner', duration: '6 weeks' },
      { title: 'NumPy & Pandas', level: 'Beginner', duration: '5 weeks' },
      { title: 'Data Visualization', level: 'Intermediate', duration: '4 weeks' },
      { title: 'Statistical Analysis', level: 'Intermediate', duration: '7 weeks' },
      { title: 'Data Analytics', level: 'Intermediate', duration: '8 weeks' },
      { title: 'Big Data with Spark', level: 'Advanced', duration: '10 weeks' },
    ],
    'AI/ML': [
      { title: 'Machine Learning Basics', level: 'Intermediate', duration: '8 weeks' },
      { title: 'Deep Learning', level: 'Advanced', duration: '10 weeks' },
      { title: 'NLP Fundamentals', level: 'Advanced', duration: '9 weeks' },
      { title: 'Computer Vision', level: 'Advanced', duration: '10 weeks' },
      { title: 'Generative AI', level: 'Advanced', duration: '8 weeks' },
      { title: 'LLM Fine-tuning', level: 'Advanced', duration: '6 weeks' },
    ],
    Cloud: [
      { title: 'AWS Fundamentals', level: 'Beginner', duration: '6 weeks' },
      { title: 'Google Cloud Basics', level: 'Beginner', duration: '6 weeks' },
      { title: 'Azure Essentials', level: 'Beginner', duration: '5 weeks' },
      { title: 'Docker & Kubernetes', level: 'Intermediate', duration: '8 weeks' },
      { title: 'DevOps Mastery', level: 'Advanced', duration: '10 weeks' },
      { title: 'Cloud Architecture', level: 'Advanced', duration: '9 weeks' },
    ],
    'Game Dev': [
      { title: 'Unity Basics', level: 'Beginner', duration: '8 weeks' },
      { title: 'Unreal Engine 5', level: 'Intermediate', duration: '10 weeks' },
      { title: '2D Game Development', level: 'Beginner', duration: '6 weeks' },
      { title: 'Game Physics', level: 'Intermediate', duration: '7 weeks' },
      { title: 'Game AI', level: 'Advanced', duration: '8 weeks' },
      { title: 'Multiplayer Game Dev', level: 'Advanced', duration: '10 weeks' },
    ],
  };

  const getLevelColor = (level) => {
    return 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-black/20 dark:border-gray-600';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="relative bg-white dark:bg-[#121212] px-4 py-16 sm:px-6 lg:px-8 transition-colors">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
            30+ Recommended <span className="text-[#FF9100]">Courses</span>
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="mb-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => {
            const isActive = activeCategory === category.name;
            return (
              <motion.button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`rounded-none border border-black/20 dark:border-gray-700 px-6 py-2.5 text-sm font-bold uppercase transition-all shadow-none hover:shadow-md chamfer-btn ${
                  isActive
                    ? 'bg-[#FF9100] text-black border-[#FF9100]'
                    : 'bg-white dark:bg-[#1E1E1E] text-black dark:text-white hover:border-[#FF9100] hover:text-[#FF9100] hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                [ {category.name} ]
              </motion.button>
            );
          })}
        </motion.div>

        {/* Course Grid */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          key={activeCategory}
        >
          {coursesByCategory[activeCategory]?.map((course, index) => {
            const handleCardClick = () => {
              const url = `/course/${encodeURIComponent(course.title)}`;
              window.history.pushState({ course: course.title }, '', url);
              window.dispatchEvent(new PopStateEvent('popstate'));
            };

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                onClick={handleCardClick}
                whileHover={{ y: -8 }}
                className="group rounded-none border border-black/15 dark:border-gray-700 bg-white dark:bg-[#1E1E1E] p-7 min-h-[220px] shadow-sm transition-all duration-300 hover:border-[#FF9100] hover:shadow-md cursor-pointer flex flex-col justify-between chamfer-card"
              >
                <div>
                  <div className="mb-4 flex items-start justify-between">
                    <h3 className="text-xl font-black text-black dark:text-white group-hover:text-[#FF9100] transition-colors leading-snug">
                      {course.title}
                    </h3>
                  </div>

                  <div className="mb-6 flex flex-wrap gap-2">
                    <span
                      className={`inline-flex items-center rounded-none px-3 py-1 text-xs font-bold uppercase ${getLevelColor(
                        course.level
                      )}`}
                    >
                      {course.level}
                    </span>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-black/10 dark:border-gray-700 pt-4">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    {course.duration}
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-[#FF9100]">
                    Explore <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AllCourses;
