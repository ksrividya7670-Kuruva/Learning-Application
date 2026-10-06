import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Frontend Developer',
      company: 'Tech Startup',
      image: '👩‍💻',
      rating: 5,
      text: 'LearnHub transformed my coding journey. The courses are comprehensive and the community support is incredible!',
    },
    {
      name: 'Michael Chen',
      role: 'Full Stack Developer',
      company: 'Fortune 500 Company',
      image: '👨‍💼',
      rating: 5,
      text: 'I went from zero to job-ready in 6 months. The structured learning paths and real projects are game-changers.',
    },
    {
      name: 'Emma Rodriguez',
      role: 'Data Scientist',
      company: 'AI Research Lab',
      image: '👩‍🔬',
      rating: 5,
      text: 'The Python and data science courses are top-notch. Finally, a platform that covers both theory and practice.',
    },
    {
      name: 'James Wilson',
      role: 'DevOps Engineer',
      company: 'Cloud Solutions',
      image: '👨‍💻',
      rating: 5,
      text: 'The Docker and Kubernetes courses helped me land my dream job. Highly recommended for anyone serious about tech.',
    },
    {
      name: 'Lisa Park',
      role: 'Mobile Developer',
      company: 'App Development Agency',
      image: '👩‍💻',
      rating: 5,
      text: 'React Native and Flutter courses are excellent. The hands-on projects really prepared me for real-world work.',
    },
    {
      name: 'David Martinez',
      role: 'Backend Engineer',
      company: 'E-commerce Platform',
      image: '👨‍💼',
      rating: 5,
      text: 'Best investment I made for my career. The Node.js and database courses are incredibly detailed and practical.',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8 border-t border-[#134E4A]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-black tracking-tight text-[#134E4A] sm:text-5xl uppercase">
            What Our <span className="text-[#F59E0B]">Students Say</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#134E4A] font-medium">
            Join thousands of successful developers who started their journey with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col rounded-none bg-white p-8 border border-[#134E4A] transition-transform hover:-translate-y-1 shadow-sm"
            >
              {/* Rating */}
              <div className="mb-6 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-[#F59E0B] text-[#F59E0B]"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="mb-8 text-[#134E4A] flex-grow text-lg font-mono">
                "{testimonial.text}"
              </p>

              {/* User Info */}
              <div className="mt-auto flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-none bg-white border border-[#134E4A] text-2xl">
                  {testimonial.image}
                </div>
                <div>
                  <p className="font-black text-[#134E4A] uppercase">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-[#134E4A] font-mono">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 border border-[#134E4A] shadow-md">
          <div className="bg-white p-8 text-center border-b sm:border-b-0 sm:border-r border-[#134E4A]">
            <div className="text-4xl font-black text-[#134E4A] mb-2">
              50K+
            </div>
            <p className="text-[#134E4A] font-mono uppercase font-bold">Active Students</p>
          </div>
          <div className="bg-white p-8 text-center border-b sm:border-b-0 sm:border-r border-[#134E4A]">
            <div className="text-4xl font-black text-[#134E4A] mb-2">
              98%
            </div>
            <p className="text-[#134E4A] font-mono uppercase font-bold">Success Rate</p>
          </div>
          <div className="bg-white p-8 text-center">
            <div className="text-4xl font-black text-[#134E4A] mb-2">
              1000+
            </div>
            <p className="text-[#134E4A] font-mono uppercase font-bold">Hiring Partners</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
