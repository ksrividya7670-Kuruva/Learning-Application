import { motion } from 'framer-motion';

const Benefits = () => {
  const benefits = [
    {
      title: 'Learn by Coding',
      description: 'Write real code from day one with hands-on projects and challenges.',
    },
    {
      title: 'Community Support',
      description: 'Connect with thousands of learners and get help from mentors.',
    },
    {
      title: 'Fast Track Learning',
      description: 'Structured paths designed to get you job-ready in months.',
    },
    {
      title: 'Quality Content',
      description: 'Expert-crafted courses with up-to-date industry best practices.',
    },
    {
      title: 'Goal Tracking',
      description: 'Monitor your progress and achieve milestones with visual dashboards.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative bg-white dark:bg-[#121212] px-4 py-16 sm:px-6 lg:px-8 transition-colors">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
            Why Choose <span className="text-[#FF9100]">VeeruProAc?</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => {
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group flex flex-col aspect-square rounded-none border border-black/15 dark:border-gray-700 bg-white dark:bg-[#1E1E1E] p-6 shadow-sm transition-all duration-300 hover:border-[#FF9100] hover:shadow-md hover:-translate-y-2 cursor-pointer chamfer-card"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-none bg-[#FF9100] text-lg font-bold text-black transition-transform duration-300 group-hover:scale-110">
                  {index + 1}
                </div>
                <div className="mt-auto">
                  <h3 className="mb-2 text-lg font-bold text-black dark:text-white group-hover:text-[#FF9100] transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
