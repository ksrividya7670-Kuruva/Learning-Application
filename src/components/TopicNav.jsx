import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Code2, Database, Terminal, FileCode, Server, Brain, Laptop, Palette, FileText, Table, Presentation } from 'lucide-react';

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

const TopicNav = ({ activeTopic = null }) => {
  const scrollContainerRef = useRef(null);

  const topics = [
    'HTML', 'CSS', 'SQL', 'MySQL', 'Python', 'Java', 'DBMS', 'NumPy', 'Pandas', 
    'C', 'C++', 'C#', 'DSA', 'React', 'Express', 'Node.js'
  ];

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
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="w-full border-b-2 border-[#FF9100] bg-white dark:bg-[#171717] py-2 px-4 sticky top-[65px] z-40 transition-colors shadow-none">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <button 
            onClick={() => scroll('left')}
            className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-none border border-black/20 dark:border-gray-700 bg-white dark:bg-[#262626] hover:bg-[#FF9100] hover:text-black text-gray-800 dark:text-gray-200 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>

          <div 
            ref={scrollContainerRef}
            className="flex flex-nowrap gap-2.5 overflow-x-auto scroll-smooth hide-scrollbar py-0.5"
          >
            {topics.map((topic, index) => {
              const Icon = getCourseIcon(topic);
              return (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    window.history.pushState({ course: topic }, '', `/course/${encodeURIComponent(topic)}`);
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  className={`group flex-shrink-0 px-4 h-8 font-bold text-sm border rounded-none transition-all cursor-pointer tracking-wide flex items-center justify-center chamfer-btn ${
                    activeTopic === topic 
                      ? 'bg-[#FF9100] text-black border-[#FF9100]' 
                      : 'bg-white dark:bg-[#262626] text-gray-900 dark:text-white border-black/20 dark:border-gray-700 hover:border-[#FF9100] hover:text-[#FF9100] hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Icon className={`h-4 w-4 flex-shrink-0 transition-all duration-200 ${
                      activeTopic === topic
                        ? 'inline-block opacity-100 scale-100'
                        : 'hidden group-hover:inline-block group-hover:opacity-100 group-hover:scale-100'
                    }`} strokeWidth={2.5} />
                    <span className="whitespace-nowrap">{topic}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-none border border-black/20 bg-white hover:bg-[#FF9100] hover:text-black text-gray-800 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </>
  );
};

export default TopicNav;
