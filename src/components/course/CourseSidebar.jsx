import { useState, useEffect } from 'react';
import { 
  ChevronDown, Lock, CheckCircle, Bookmark, 
  BookOpen, Clock, Code, Sparkles, FolderGit2, 
  HelpCircle, Download, TrendingUp, Award, Star, MessageSquare 
} from 'lucide-react';
import { isCourseBookmarked, toggleCourseBookmark } from '../../lib/api';

const CourseSidebar = ({ 
  courseName, 
  modules = [], 
  selectedModuleIndex, 
  setSelectedModuleIndex, 
  selectedLessonIndex, 
  setSelectedLessonIndex, 
  activeTab,
  setActiveTab, 
  progress = 0, 
  onDownloadNotes 
}) => {
  const [expanded, setExpanded] = useState({});
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (modules.length > 0) {
      setExpanded({ 0: true });
    }
  }, [modules]);

  useEffect(() => {
    if (courseName) {
      setBookmarked(isCourseBookmarked(courseName));
    }
    const handleUpdate = () => {
      if (courseName) setBookmarked(isCourseBookmarked(courseName));
    };
    window.addEventListener('bookmarks_updated', handleUpdate);
    return () => window.removeEventListener('bookmarks_updated', handleUpdate);
  }, [courseName]);

  const toggle = (idx) => {
    setExpanded((s) => ({ ...s, [idx]: !s[idx] }));
    setSelectedModuleIndex(idx);
    setSelectedLessonIndex(0);
  };

  const handleBookmarkClick = () => {
    if (!courseName) return;
    const isNowBookmarked = toggleCourseBookmark(courseName);
    setBookmarked(isNowBookmarked);
    alert(isNowBookmarked ? `★ ${courseName} added to your Bookmarks!` : `Removed ${courseName} from Bookmarks.`);
  };

  const tabsList = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'curriculum', label: 'Curriculum', icon: Clock },
    { id: 'editor', label: 'Practice Editor', icon: Code },
    { id: 'exercises', label: 'Exercises', icon: CheckCircle },
    { id: 'quizzes', label: 'Quizzes', icon: Sparkles },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'certificate', label: 'Certificate', icon: Award },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'discussion', label: 'Discussion', icon: MessageSquare },
  ];

  const handleDownloadSyllabus = () => {
    // Creating a sample syllabus text file to download
    const syllabusContent = "Course Syllabus\n\nModule 1: Introduction\nModule 2: Core Concepts\nModule 3: Advanced Topics\nModule 4: Final Project\n";
    const blob = new Blob([syllabusContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${courseName || 'course'}-syllabus.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="sticky top-[80px] rounded-none border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)]">
      {activeTab === 'curriculum' ? (
        <div>
          <button 
            onClick={() => setActiveTab('overview')} 
            className="mb-6 text-[#FB6C00] text-sm font-bold flex items-center gap-2 hover:text-[#D97706] transition"
          >
            ← Back to Course Options
          </button>
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">Course Modules</h3>
          <div className="space-y-3">
            {modules.map((module, idx) => {
              const lessonsList = module.lessons || [];
              return (
                <div key={idx} className="border border-slate-200 dark:border-slate-700 rounded-none overflow-hidden bg-slate-50 dark:bg-slate-800">
                  <button
                    onClick={() => toggle(idx)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left font-bold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:bg-slate-800 transition"
                  >
                    <div className="flex items-center gap-2">
                      <ChevronDown
                        className={`h-4 w-4 text-slate-500 dark:text-slate-400 transition-transform ${expanded[idx] ? 'rotate-180' : ''}`}
                      />
                      <span className="text-sm">{module.title}</span>
                    </div>
                  </button>

                  {expanded[idx] && (
                    <ul className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 divide-y divide-slate-100">
                      {lessonsList.map((lesson, j) => (
                        <li key={j}>
                          <button
                            onClick={() => {
                              if (!lesson?.locked) {
                                setSelectedModuleIndex(idx);
                                setSelectedLessonIndex(j);
                              }
                            }}
                            className={`flex w-full items-center justify-between px-4 py-2 transition hover:bg-slate-50 dark:bg-slate-800 ${
                              selectedModuleIndex === idx && selectedLessonIndex === j ? 'bg-orange-50 hover:bg-orange-50' : ''
                            } ${lesson?.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            <div className="flex items-center gap-2">
                              {lesson?.completed ? (
                                <CheckCircle className="h-4 w-4 text-[#FB6C00]" />
                              ) : lesson?.locked ? (
                                <Lock className="h-4 w-4 text-slate-400" />
                              ) : (
                                <div className="h-4 w-4 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                              )}
                              <span className={`text-xs ${selectedModuleIndex === idx && selectedLessonIndex === j ? 'font-bold text-[#FB6C00]' : 'font-medium text-slate-700 dark:text-slate-200'}`}>
                                {lesson?.title || `Lesson ${j + 1}`}
                              </span>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Course Progress</h3>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-3.5 w-full rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-3.5 rounded-full bg-[#FF9100]" style={{ width: `${Math.round(progress)}%` }} />
              </div>
              <div className="text-sm font-extrabold text-[#FF9100]">{Math.round(progress)}%</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-3">Course Options</h3>
            <div className="space-y-1.5">
              {tabsList.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center gap-3 rounded-none px-3.5 py-2.5 text-base font-bold transition border-l-4 ${
                      isActive
                        ? 'bg-orange-50 dark:bg-orange-950/40 text-[#FF9100] border-[#FF9100]'
                        : 'border-transparent text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-[#FF9100]'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-[#FF9100]' : 'text-gray-500 dark:text-gray-400'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <button
              type="button"
              onClick={handleDownloadSyllabus}
              className="w-full rounded-none bg-[#FF9100] px-3.5 py-2.5 text-base font-bold text-white transition hover:bg-orange-600 border border-black"
            >
              Download Syllabus
            </button>
            <button
              type="button"
              onClick={onDownloadNotes}
              className="w-full rounded-none bg-[#FF9100] px-3.5 py-2.5 text-base font-bold text-white transition hover:bg-orange-600 border border-black"
            >
              Download Notes
            </button>
            <button
              type="button"
              onClick={handleBookmarkClick}
              className={`flex w-full items-center justify-center gap-2 rounded-none border border-black px-3.5 py-2.5 text-base font-bold transition ${
                bookmarked
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Bookmark className={`h-5 w-5 ${bookmarked ? 'fill-[#FF9100] text-[#FF9100]' : ''}`} />
              <span>{bookmarked ? 'Bookmarked Course' : 'Bookmark Course'}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseSidebar;
