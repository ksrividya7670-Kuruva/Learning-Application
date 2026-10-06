import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Video, Play, Pause, Volume2, VolumeX, Maximize, CheckCircle, Sparkles,
  Clock, BookOpen, HelpCircle, ChevronDown, Code, Download, Award, Star,
  MessageSquare, FolderGit2, TrendingUp, Send, CheckCircle2, UserCheck, ShieldCheck, Flame, ThumbsUp, Lock
} from 'lucide-react';
import LiveEditor from './LiveEditorSimple';
import TaskLabModal from './TaskLabModal';
import { downloadCourseNotes, downloadCheatSheet } from '../../lib/api';
import { getLessonContent } from '../../data/contentRegistry';

const LessonContent = ({
  courseName,
  courseSummary,
  courseIntro,
  exercises = [],
  quizzes = [],
  faqs = [],
  lesson = {},
  editorStarter = {},
  modules = [],
  moduleIndex = 0,
  setSelectedModuleIndex,
  lessonIndex = 0,
  setLessonIndex,
  moduleCount = 2,
  activeTab = 'overview',
  setActiveTab,
  runCount,
  onPrevious,
  onNext,
  onOpenCertificate,
  user,
  courseProgress = 0,
}) => {
  const currentLesson = modules[moduleIndex]?.lessons?.[lessonIndex] || {};
  const markdownContent = getLessonContent(courseName, currentLesson.title || '');
  const practiceRef = useRef(null);
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const [completedTasks, setCompletedTasks] = useState({});
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [activeTaskModal, setActiveTaskModal] = useState(null);
  const [activeSampleOutput, setActiveSampleOutput] = useState(null);

  // Discussion forum comments state
  const [discussions, setDiscussions] = useState(() => {
    try {
      const saved = localStorage.getItem(`course_discussions_${courseName}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 1,
        author: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        time: '2 hours ago',
        text: `What is the best way to structure ${courseName} applications for scale? Should we use modular component architecture or single-file structures?`,
        likes: 14,
        replies: [
          { author: 'Alex Rivera (Instructor)', text: `Great question! We recommend modular component patterns with clear separation of concerns as covered in Module 2.`, time: '1 hour ago' }
        ]
      },
      {
        id: 2,
        author: 'David Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        time: '5 hours ago',
        text: `The interactive live code editor in this ${courseName} course is super helpful! Loved the real-time console log window.`,
        likes: 22,
        replies: []
      }
    ];
  });
  
  const [runCountLocal, setRunCountLocal] = useState(0);
  const [expandedModules, setExpandedModules] = useState({ 0: true });

  const toggleModule = (idx) => {
    setExpandedModules((s) => ({ ...s, [idx]: !s[idx] }));
  };
  
  const [newComment, setNewComment] = useState('');

  // Re-load discussions when courseName changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`course_discussions_${courseName}`);
      if (saved) {
        setDiscussions(JSON.parse(saved));
      } else {
        // Reset to defaults if no saved discussions for this course
        setDiscussions([
          {
            id: 1,
            author: 'Sarah Jenkins',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
            time: '2 hours ago',
            text: `What is the best way to structure ${courseName} applications for scale? Should we use modular component architecture or single-file structures?`,
            likes: 14,
            replies: [
              { author: 'Alex Rivera (Instructor)', text: `Great question! We recommend modular component patterns with clear separation of concerns as covered in Module 2.`, time: '1 hour ago' }
            ]
          },
          {
            id: 2,
            author: 'David Chen',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
            time: '5 hours ago',
            text: `The interactive live code editor in this ${courseName} course is super helpful! Loved the real-time console log window.`,
            likes: 22,
            replies: []
          }
        ]);
      }
    } catch (e) {}
  }, [courseName]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`completed_tasks_${courseName}`);
      if (saved) setCompletedTasks(JSON.parse(saved));
    } catch (e) {}
  }, [courseName]);

  const markTaskVerified = (index) => {
    const updated = { ...completedTasks, [index]: true };
    setCompletedTasks(updated);
    try {
      localStorage.setItem(`completed_tasks_${courseName}`, JSON.stringify(updated));
    } catch (e) {}
  };

  const handleOpenTaskLab = (index) => {
    setActiveTaskModal({
      index,
      title: exercises[index] || `Complete the ${courseName} task requirements.`,
    });
  };

  const [replyText, setReplyText] = useState({});
  const [activeReplyId, setActiveReplyId] = useState(null);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const item = {
      id: Date.now(),
      author: user?.fullName || user?.email || 'Anonymous Student',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      time: 'Just now',
      text: newComment,
      likes: 0,
      replies: [],
    };
    const updated = [item, ...discussions];
    setDiscussions(updated);
    try {
      localStorage.setItem(`course_discussions_${courseName}`, JSON.stringify(updated));
    } catch (e) {}
    setNewComment('');
  };

  const handleLikeComment = (id) => {
    const updated = discussions.map((d) =>
      d.id === id ? { ...d, likes: (d.likes || 0) + 1 } : d
    );
    setDiscussions(updated);
    try {
      localStorage.setItem(`course_discussions_${courseName}`, JSON.stringify(updated));
    } catch (e) {}
  };

  const handleReplySubmit = (e, id) => {
    e.preventDefault();
    const text = replyText[id];
    if (!text?.trim()) return;
    const newReply = {
      author: user?.fullName || user?.email || 'Anonymous Student',
      text: text.trim(),
    };
    const updated = discussions.map((d) =>
      d.id === id ? { ...d, replies: [...(d.replies || []), newReply] } : d
    );
    setDiscussions(updated);
    try {
      localStorage.setItem(`course_discussions_${courseName}`, JSON.stringify(updated));
    } catch (e) {}
    setReplyText({ ...replyText, [id]: '' });
    setActiveReplyId(null);
  };


  const defaultFaqs = [
    {
      q: `Is this ${courseName} course suitable for absolute beginners?`,
      a: `Yes! This course starts from absolute scratch, covering fundamental setup, syntax, and step-by-step principles before progressing to intermediate and advanced projects.`,
    },
    {
      q: `What prerequisites do I need before starting ${courseName}?`,
      a: `No prior experience is required. A modern web browser and a desire to build real projects are all you need to get started!`,
    },
    {
      q: `How long will it take to complete the ${courseName} course?`,
      a: `The course is self-paced and takes approximately 4-8 hours to complete, including hands-on live code exercises and practice challenges.`,
    },
    {
      q: `Will I receive an official certificate upon completing ${courseName}?`,
      a: `Yes! Upon completing 100% of the lessons and exercises, you can generate and download an official verified VeeruProAc Certificate of Completion.`,
    },
  ];

  const courseFaqs = faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <div>
      {/* Course Header Summary Card */}
      <div className="mb-4 rounded-none border border-black dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-none">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-orange-50 dark:bg-orange-950/40 text-[#FF9100] text-xs font-bold border border-black dark:border-slate-700 mb-3">
              <span>VeeruProAc Verified Course</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-black dark:text-white tracking-tight uppercase">{courseName} Masterclass</h1>
            <p className="mt-3 text-lg font-medium text-[#FF9100] dark:text-orange-400 max-w-3xl leading-relaxed">{courseSummary}</p>
          </div>
          <div className="rounded-none bg-slate-950 p-5 text-sm text-white space-y-1.5 border border-black">
            <div className="font-bold text-[#FF9100] uppercase tracking-wider text-xs">Current Lesson</div>
            <div className="font-bold text-base">{currentLesson.title || `Lesson ${lessonIndex + 1}`}</div>
            <div className="text-slate-300 font-mono text-xs">Module {moduleIndex + 1} of {moduleCount}</div>
          </div>
        </div>
      </div>

      {/* Dynamic Tab Content Display */}
      <div className="mt-6">
        {/* 1. OVERVIEW & CURRICULUM TABS */}
        {(activeTab === 'overview' || activeTab === 'curriculum') && (
          <div className="space-y-6">
            <section className="rounded-none border border-black dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-none space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-black dark:text-white">{currentLesson.title || `Lesson ${lessonIndex + 1}`}</h2>
                <p className="mt-2 text-base font-semibold text-[#FF9100] dark:text-orange-400">{currentLesson.summary || 'Explore course concepts and practical implementation.'}</p>
              </div>

              {/* YouTube Video Player */}
              {(() => {
                // Dedicated YouTube video ID for each course
                const COURSE_VIDEO_MAP = {
                  'html':       'kUMe1FH4CHE', // HTML Full Course - freeCodeCamp
                  'css':        'OXGznpKZ_sA', // CSS Full Course - freeCodeCamp
                  'sql':        'HXV3zeQKqGY', // SQL Full Course - freeCodeCamp
                  'mysql':      'ER8oKX5myE0', // MySQL Full Course - Programming with Mosh
                  'python':     'rfscVS0vtbw', // Python Full Course - freeCodeCamp
                  'java':       'A74TOX803D0', // Java Full Course - Amigoscode
                  'dbms':       'kBdlM6hNDAE', // DBMS Full Course - Neso Academy
                  'numpy':      'QUT1VHiLmmI', // NumPy Full Course - freeCodeCamp
                  'pandas':     'vmEHCJofslg', // Pandas Full Course - freeCodeCamp
                  'c':          'KJgsSFOSQv0', // C Programming Full Course - freeCodeCamp
                  'c++':        'vLnPwxZdW4Y', // C++ Full Course - freeCodeCamp
                  'c#':         'GhQdlIFylQ8', // C# Full Course - freeCodeCamp
                  'dsa':        'pkYVOmU3MgA', // DSA Full Course - freeCodeCamp
                  'react':      'bMknfKXIFA8', // React Full Course - freeCodeCamp
                  'express':    'SccSCuHhOw0', // Express.js Full Course - Dave Gray
                  'node.js':    'f2EqECiTBL8', // Node.js Full Course - freeCodeCamp
                  'javascript': 'W6NZfCO5SIk', // JavaScript Full Course - freeCodeCamp
                  'typescript': 'BwuLxPi-BtY', // TypeScript Full Course - freeCodeCamp
                  'mongodb':    'c2M-rlkkT5o', // MongoDB Full Course - freeCodeCamp
                  'postgresql': 'qw--VYLpxG4', // PostgreSQL Full Course - freeCodeCamp
                  'ms word':    'S-TNPB7Uxg0', // MS Word Full Tutorial - Technology for Teachers and Students
                  'ms excel':   'Vl0H-qTclOg', // MS Excel Full Course - freeCodeCamp
                  'powerpoint': 'QYnCtFBMCCw', // PowerPoint Full Course - Kevin Stratvert
                };
                const key = (courseName || '').toLowerCase();
                const videoId = COURSE_VIDEO_MAP[key]
                  || Object.entries(COURSE_VIDEO_MAP).find(([k]) => key.includes(k))?.[1]
                  || 'mU6anWqZJcc';
                return (
                  <div className="w-full aspect-video rounded-none relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)] border border-slate-200 dark:border-slate-700 bg-slate-900">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                      title={`${courseName} Video Lecture`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full rounded-none"
                    ></iframe>
                  </div>
                );
              })()}

              <div className="grid gap-6 lg:grid-cols-1">
                <div className="space-y-5">
                    <div className="rounded-none bg-slate-50 dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700/80">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                        <BookOpen className="h-5 w-5 text-[#FB6C00]" />
                        <span>Lesson Concept & Explanation</span>
                      </h3>
                      <div className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium space-y-4">
                        {markdownContent ? (
                          <ReactMarkdown
                            components={{
                              h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4" {...props} />,
                              h2: ({node, ...props}) => <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-3 border-b border-slate-200 dark:border-slate-700 pb-2" {...props} />,
                              h3: ({node, ...props}) => <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-6 mb-2" {...props} />,
                              p: ({node, ...props}) => <p className="mb-4 text-[#7C3AED]" {...props} />,
                              pre: ({node, ...props}) => <pre className="bg-slate-900 text-orange-300 p-4 rounded-none overflow-x-auto mb-6 mt-2 font-mono text-xs shadow-inner" {...props} />,
                              code: ({node, inline, ...props}) => inline ? <code className="bg-orange-100 text-[#FB6C00] hover:bg-blue-100 hover:text-[#7C3AED] cursor-pointer transition-colors px-1.5 py-0.5 rounded text-xs font-mono font-bold" {...props} /> : <code {...props} />
                            }}
                          >
                            {markdownContent}
                          </ReactMarkdown>
                        ) : (
                          <ReactMarkdown
                            components={{
                              a: ({node, ...props}) => <a className="text-[#FB6C00] hover:underline font-bold" target="_blank" rel="noopener noreferrer" {...props} />
                            }}
                          >
                            {currentLesson.details || courseIntro}
                          </ReactMarkdown>
                        )}
                      </div>
                    </div>
                </div>
              </div>

            </section>
          </div>
        )}

        {/* 3. PRACTICE EDITOR TAB */}
        {activeTab === 'editor' && (
          <LiveEditor
            courseName={courseName}
            initialHtml={editorStarter.html}
            initialCss={editorStarter.css}
            initialJs={editorStarter.js}
          />
        )}

        {/* 4. EXERCISES TAB */}
        {activeTab === 'exercises' && (
          <section ref={practiceRef} className="rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Hands-on Exercises & Code Labs</h2>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800 text-[#7C3AED] border border-slate-200 dark:border-slate-700">
                {Object.values(completedTasks).filter(Boolean).length} / {exercises.length} Tasks Completed
              </span>
            </div>
            <p className="text-sm text-[#7C3AED]">Click any task to open the code verification lab, run assertions, and mark completed.</p>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              {exercises.map((exercise, index) => {
                const isDone = !!completedTasks[index];
                return (
                  <div
                    key={index}
                    onClick={() => handleOpenTaskLab(index)}
                    className={`flex flex-col justify-between rounded-none border p-5 transition text-sm cursor-pointer group ${
                      isDone
                        ? 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)]'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:border-blue-500 hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)] hover:bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition ${
                              isDone ? 'bg-[#7C3AED] text-white' : 'bg-[#FB6C00] text-white group-hover:-translate-y-1 hover:-translate-x-1'
                            }`}
                          >
                            {isDone ? '✓' : index + 1}
                          </span>
                          <span>Task {index + 1}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenTaskLab(index);
                          }}
                          className={`text-xs px-3.5 py-1 rounded-full font-bold transition cursor-pointer ${
                            isDone
                              ? 'bg-slate-100 dark:bg-slate-800 text-[#7C3AED] border border-slate-300 dark:border-slate-600'
                              : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 group-hover:bg-[#FB6C00] group-hover:text-white group-hover:border-[#FB6C00]'
                          }`}
                        >
                          {isDone ? '✓ Completed' : 'Open Task & Code Lab →'}
                        </button>
                      </div>
                      <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{exercise}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 5. QUIZZES TAB */}
        {activeTab === 'quizzes' && (
          <section className="rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] space-y-4">
            <div className="flex items-center gap-2">
              
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{courseName} Knowledge Check & Quiz</h2>
            </div>
            <p className="text-sm text-[#7C3AED]">Test your understanding of the core concepts covered in this course.</p>

            <div className="space-y-4 pt-2">
              {(quizzes && quizzes.length > 0 ? quizzes : [
                {
                  id: 1,
                  q: `What is the primary role of ${courseName} in software development?`,
                  options: [
                    `A) Structure, logic & foundational implementation for ${courseName}`,
                    `B) Only for storing database backup files`,
                    `C) A hardware protocol for network routers`,
                    `D) An operating system utility`
                  ],
                  correct: 0
                },
                {
                  id: 2,
                  q: `What is a recommended best practice when writing ${courseName} code?`,
                  options: [
                    `A) Copy and paste code without testing`,
                    `B) Use clear syntax, modular functions, and step-by-step verification`,
                    `C) Avoid writing comments or docstrings`,
                    `D) Write all logic inside a single line`
                  ],
                  correct: 1
                }
              ]).map((quiz) => {
                const selectedOpt = quizAnswers[quiz.id];
                const isAnswered = selectedOpt !== undefined;
                const isCorrect = selectedOpt === quiz.correct;

                return (
                  <div key={quiz.id} className="rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-5 space-y-3">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      Q{quiz.id}: {quiz.q}
                    </h4>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {quiz.options.map((opt, optIdx) => {
                        const isThisSelected = selectedOpt === optIdx;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => setQuizAnswers({ ...quizAnswers, [quiz.id]: optIdx })}
                            className={`p-3 rounded-none text-xs text-left font-medium transition cursor-pointer border ${
                              isThisSelected
                                ? optIdx === quiz.correct
                                  ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow'
                                  : 'bg-rose-600 text-white font-bold border-rose-600 shadow'
                                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-[#FB6C00] hover:bg-orange-50'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div className={`text-xs font-bold px-3 py-1.5 rounded-none w-fit border ${
                        isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border-emerald-600' : 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 border-rose-600'
                      }`}>
                        {isCorrect ? '✓ Correct! Great job.' : '❌ Incorrect choice. Try another option!'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 6. PROJECTS TAB */}
        {activeTab === 'projects' && (
          <section className="rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FolderGit2 className="h-5 w-5 text-[#FB6C00]" />
              <span>Real-World {courseName} Portfolio Projects</span>
            </h2>
            <p className="text-sm text-[#7C3AED]">Solve these {courseName} problems to build your portfolio and prepare for technical interviews. Ranked from Easy to Hard.</p>

            <div className="pt-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                    <th className="py-3 px-4 font-bold text-[#7C3AED] text-xs uppercase tracking-wider w-16 text-center">Status</th>
                    <th className="py-3 px-4 font-bold text-[#7C3AED] text-xs uppercase tracking-wider">Title</th>
                    <th className="py-3 px-4 font-bold text-[#7C3AED] text-xs uppercase tracking-wider w-32">Difficulty</th>
                    <th className="py-3 px-4 font-bold text-[#7C3AED] text-xs uppercase tracking-wider w-32 text-center">Output</th>
                    <th className="py-3 px-4 font-bold text-[#7C3AED] text-xs uppercase tracking-wider w-32 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { id: 1, title: `${courseName} Basics: Two Sum Equivalent`, diff: 'Easy', status: 'done' },
                    { id: 2, title: `Responsive ${courseName} Profile Card`, diff: 'Easy', status: 'done' },
                    { id: 3, title: `Dynamic ${courseName} Shopping Cart`, diff: 'Medium', status: 'todo' },
                    { id: 4, title: `${courseName} Authentication & JWT Flow`, diff: 'Medium', status: 'todo' },
                    { id: 5, title: `Advanced ${courseName} Kanban Board`, diff: 'Hard', status: 'todo' },
                    { id: 6, title: `Full-Stack ${courseName} Enterprise Architecture`, diff: 'Hard', status: 'todo' },
                  ].map((proj) => (
                    <tr key={proj.id} className="hover:bg-slate-50 dark:bg-slate-800 transition group">
                      <td className="py-4 px-4 text-center">
                        {proj.status === 'done' ? (
                          <CheckCircle className="h-5 w-5 text-[#7C3AED] mx-auto" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-slate-300 dark:border-slate-600 mx-auto group-hover:border-[#FB6C00] transition" />
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-[#FB6C00] transition cursor-pointer">{proj.id}. {proj.title}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          proj.diff === 'Easy' ? 'bg-slate-100 dark:bg-slate-800 text-[#7C3AED]' :
                          proj.diff === 'Medium' ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200' :
                          'bg-orange-100 text-[#FB6C00]'
                        }`}>
                          {proj.diff}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => setActiveSampleOutput(proj.title)}
                          className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-[#FB6C00] underline transition cursor-pointer"
                        >
                          View Output
                        </button>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => setActiveTab('editor')}
                          className={`text-xs font-bold px-4 py-1.5 rounded-none transition cursor-pointer ${
                            proj.status === 'done' 
                              ? 'bg-slate-100 dark:bg-slate-800 text-[#7C3AED] hover:bg-slate-200 dark:bg-slate-700' 
                              : 'bg-orange-50 text-[#FB6C00] hover:bg-[#FB6C00] hover:text-white'
                          }`}
                        >
                          {proj.status === 'done' ? 'Review' : 'Solve'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 7. FAQS TAB */}
        {activeTab === 'faqs' && (
          <section className="rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-[#7C3AED]" />
                <span>Frequently Asked Questions</span>
              </h2>
              <p className="mt-2 text-sm text-[#7C3AED] font-medium">Everything you need to know about the {courseName} Masterclass.</p>
            </div>

            <div className="space-y-4 pt-2">
              {courseFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div 
                    key={index} 
                    className={`rounded-none border transition-all duration-300 overflow-hidden ${
                      isOpen 
                        ? 'border-[#7C3AED] bg-slate-50 dark:bg-slate-800/30 shadow-[0_4px_12px_rgba(124,58,237,0.1)]' 
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:border-slate-600 hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)]'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                    >
                      <span className="flex-1 font-bold text-slate-900 dark:text-white text-[15px] leading-snug">
                        {faq.q}
                      </span>
                      <div className={`mt-0.5 flex flex-shrink-0 items-center justify-center h-6 w-6 rounded-full transition-colors ${
                        isOpen ? 'bg-[#7C3AED]/10' : 'bg-slate-100 dark:bg-slate-800'
                      }`}>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-[#7C3AED]' : 'text-slate-500 dark:text-slate-400'
                        }`} />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-[14px] text-[#7C3AED] leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 rounded-none bg-slate-50 dark:bg-slate-800 p-5 text-center border border-slate-100 dark:border-slate-800">
              <p className="text-sm text-[#7C3AED] font-medium">
                Still have questions?{' '}
                <a href="mailto:support@veeruproac.com" className="text-[#7C3AED] font-bold hover:underline">
                  Contact our support team
                </a>
              </p>
            </div>
          </section>
        )}

        {/* 8. DOWNLOADS TAB */}
        {activeTab === 'downloads' && (
          <section className="rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Download className="h-5 w-5 text-[#FB6C00]" />
              <span>{courseName} Downloadable Resources & Notes</span>
            </h2>
            <p className="text-sm text-[#7C3AED]">Download offline study materials, code templates, and cheat sheets.</p>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Official {courseName} Study Notes (.txt)</h3>
                <p className="text-xs text-[#7C3AED]">Includes core syntax reference, code snippets, and exercise guides.</p>
                <button
                  onClick={() => downloadCourseNotes(courseName)}
                  className="rounded-none bg-[#FB6C00] px-4 py-2 text-xs font-bold text-white hover:bg-[#D97706] transition cursor-pointer"
                >
                  Download Study Notes ↓
                </button>
              </div>

              <div className="rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{courseName} Cheat Sheet (.txt)</h3>
                <p className="text-xs text-[#7C3AED]">A quick reference sheet with all essential keywords & methods.</p>
                <button
                  onClick={() => downloadCheatSheet(courseName)}
                  className="rounded-none bg-[#7C3AED] px-4 py-2 text-xs font-bold text-white hover:bg-slate-700 transition cursor-pointer"
                >
                  Download Cheat Sheet ↓
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 9. PROGRESS TAB */}
        {activeTab === 'progress' && (
          <section className="rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#FB6C00]" />
              <span>Your {courseName} Learning Progress</span>
            </h2>

            <div className="rounded-none bg-orange-50 border border-slate-200 dark:border-slate-700 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-[#FB6C00] uppercase">Overall Course Completion</div>
                <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                  {Math.max(0, Math.min(100, courseProgress))}% Complete
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[#7C3AED] text-xs font-bold">★ Active Streak: 3 Days</span>
              </div>
            </div>
            
            {/* Progress Bar Visual */}
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mt-4 overflow-hidden shadow-inner">
              <div 
                className="bg-[#FB6C00] h-3 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${Math.max(0, Math.min(100, courseProgress))}%` }}
              ></div>
            </div>
          </section>
        )}

        {/* 10. CERTIFICATE TAB */}
        {activeTab === 'certificate' && (
          <section className="rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] space-y-6 text-center">
            <div className="flex flex-col items-center justify-center">
              
              {courseProgress >= 100 && (exercises.length === 0 || Object.values(completedTasks).filter(Boolean).length >= exercises.length) ? (
                <>
                  <Award className="h-12 w-12 text-slate-500 dark:text-slate-400 mb-2" />
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Official {courseName} Certificate</h2>
                  <p className="text-sm text-[#7C3AED] max-w-md mt-1">Your official verified certificate is ready!</p>
                  
                  {/* Certificate Preview */}
                  <div className="mt-6 w-full max-w-2xl aspect-[1.4/1] bg-slate-50 dark:bg-slate-800 border-8 border-double border-slate-500/30 rounded-none p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-inner mx-auto opacity-90 hover:opacity-100 transition cursor-pointer" onClick={() => { if (onOpenCertificate) onOpenCertificate(); }}>
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] bg-primary/50 via-transparent to-transparent"></div>
                    <Award className="h-16 w-16 text-slate-400/50 absolute top-8 right-8" />
                    <h3 className="text-3xl font-serif text-slate-800 dark:text-slate-100 relative z-10">Certificate of Completion</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 relative z-10">This certifies that</p>
                    <h4 className="text-2xl font-bold text-[#FB6C00] mt-2 relative z-10 border-b-2 border-slate-300 dark:border-slate-600 min-w-[250px] pb-1">{user?.fullName || 'Student Name'}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 relative z-10">has successfully completed the</p>
                    <h5 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-2 relative z-10">{courseName} Masterclass</h5>
                    <div className="mt-8 flex items-center justify-between w-full px-12 relative z-10">
                      <div className="text-center">
                        <div className="border-b border-slate-400 w-32 mb-1"></div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Date</span>
                      </div>
                      <div className="text-center">
                        <div className="border-b border-slate-400 w-32 mb-1"></div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase">Signature</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (onOpenCertificate) onOpenCertificate();
                    }}
                    className="mt-6 rounded-none px-8 py-3.5 font-extrabold text-white shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)] transition cursor-pointer flex items-center gap-2 mx-auto bg-primary hover:bg-[#7C3AED]"
                  >
                    <Download className="h-5 w-5" />
                    <span>Claim & Download Certificate</span>
                  </button>

                  {/* Social Sharing Options - Only visible when complete */}
                  <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">Share your achievement with your network</p>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(`I just earned my ${courseName} Certificate of Completion from VeeruProAc! 🚀`)}`, '_blank')}
                        className="flex items-center gap-2 rounded-none bg-[#0077b5] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#005582] transition shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] cursor-pointer"
                      >
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        LinkedIn
                      </button>
                      <button
                        onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just earned my ${courseName} Certificate of Completion from VeeruProAc! 🚀`)}`, '_blank')}
                        className="flex items-center gap-2 rounded-none bg-[#1DA1F2] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0c85d0] transition shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] cursor-pointer"
                      >
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                        Twitter / X
                      </button>
                      <button
                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://veeruproac.learn')}&quote=${encodeURIComponent(`I just earned my ${courseName} Certificate of Completion from VeeruProAc! 🚀`)}`, '_blank')}
                        className="flex items-center gap-2 rounded-none bg-[#1877F2] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0d65d9] transition shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] cursor-pointer"
                      >
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                        Facebook
                      </button>
                      <button
                        onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`I just earned my ${courseName} Certificate of Completion from VeeruProAc! 🚀 Check it out: https://veeruproac.learn`)}`, '_blank')}
                        className="flex items-center gap-2 rounded-none bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#1ebd59] transition shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] cursor-pointer"
                      >
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                        WhatsApp
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Award className="h-12 w-12 text-slate-400 mb-2" />
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Certificate Locked</h2>
                  <p className="text-sm text-[#7C3AED] max-w-md mt-1 mb-4 mx-auto">
                    Complete all lessons and practical exercises to unlock your official verified certificate! Here is a preview of what you will earn:
                  </p>
                  
                  {/* Certificate Preview (Matching Reference Screenshot) */}
                  <div className="mt-4 w-full max-w-2xl bg-[#FFFDF7] p-8 sm:p-10 relative border-[8px] border-double border-[#D4A373] rounded-none shadow-xl mx-auto select-none overflow-hidden scale-90 sm:scale-100 transform origin-top text-slate-800">
                    
                    {/* Thin Inner Border & Corner Ornaments */}
                    <div className="absolute inset-2 border border-[#D4A373] pointer-events-none" />
                    <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#D4A373]" />
                    <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#D4A373]" />
                    <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#D4A373]" />
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#D4A373]" />

                    <div className="text-center space-y-4 relative z-10">

                      {/* Header SN Logo */}
                      <div className="flex justify-center items-center gap-2">
                        <div className="h-11 w-11 rounded-full bg-[#FF9100] flex items-center justify-center text-white font-bold text-base shadow-sm">
                          SN
                        </div>
                        <div className="text-left">
                          <h4 className="text-sm font-black tracking-widest text-slate-900 uppercase leading-none">VEERUPROAC</h4>
                          <p className="text-[9px] font-bold tracking-widest text-[#FF9100] uppercase">LEARNING ACADEMY</p>
                        </div>
                      </div>

                      {/* Title */}
                      <div className="space-y-1">
                        <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-wider uppercase">
                          CERTIFICATE OF COMPLETION
                        </h1>
                        <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">
                          THIS CERTIFICATE IS PROUDLY PRESENTED TO
                        </p>
                      </div>

                      {/* Student Name */}
                      <div className="py-2">
                        <div className="inline-block text-2xl sm:text-3xl font-serif font-bold text-[#8B0000] border-b-2 border-slate-400 px-8 py-1">
                          {user?.fullName || 'Learner'}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1 italic font-mono">(Click name to edit if needed)</p>
                      </div>

                      {/* Course Achievement Description */}
                      <div className="max-w-xl mx-auto text-slate-600 text-xs sm:text-sm leading-relaxed px-4 font-sans">
                        for successfully completing the comprehensive coursework and practical mastery evaluation for
                        <div className="my-1.5 text-lg sm:text-xl font-bold text-black uppercase tracking-wide">
                          {courseName}
                        </div>
                        demonstrating high proficiency, technical understanding, and practical execution.
                      </div>

                      {/* Seals & Signatures Row */}
                      <div className="pt-6 border-t border-slate-200 grid grid-cols-3 items-end gap-2 text-center mt-4">
                        <div className="text-left space-y-1">
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">DATE OF ISSUE</p>
                          <p className="text-xs font-bold text-slate-800 font-mono">
                            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>

                        <div className="flex flex-col items-center justify-center">
                          <div className="h-12 w-12 rounded-full bg-[#FF9100] flex items-center justify-center shadow-md ring-4 ring-[#FF9100]/20">
                            <ShieldCheck className="h-6 w-6 text-white" />
                          </div>
                          <span className="text-[8px] font-bold text-[#FF9100] uppercase tracking-widest mt-1.5">
                            VERIFIED AUTHENTIC
                          </span>
                        </div>

                        <div className="text-right space-y-1">
                          <div className="font-serif italic text-sm text-slate-900 font-bold tracking-wider">
                            VeeruProAc Board
                          </div>
                          <p className="text-[9px] text-slate-500 font-bold uppercase border-t border-slate-300 pt-0.5 inline-block">
                            AUTHORIZED INSTRUCTOR
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    disabled
                    className="mt-6 rounded-none px-8 py-3.5 font-extrabold text-slate-400 border border-slate-300 dark:border-slate-600 transition flex items-center gap-2 mx-auto bg-slate-100 dark:bg-slate-800 cursor-not-allowed"
                  >
                    <Lock className="h-5 w-5 text-slate-400" />
                    <span>Complete all tasks to unlock</span>
                  </button>
                </>
              )}
            </div>
          </section>
        )}

        {/* 11. REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <section className="rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Star className="h-5 w-5 fill-slate-400 text-slate-400" />
                <span>Student Reviews & Ratings (4.9 ★★★★★)</span>
              </h2>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { name: 'Michael Scott', rating: '5.0 ★★★★★', text: `Excellent course on ${courseName}! The live code editor and practice tasks made learning super easy.` },
                { name: 'Emily Watson', rating: '5.0 ★★★★★', text: `Best ${courseName} course I have taken. Clear explanations, practical examples, and great structure.` }
              ].map((rev, idx) => (
                <div key={idx} className="rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">{rev.name}</span>
                    <span className="font-bold text-slate-500 dark:text-slate-400">{rev.rating}</span>
                  </div>
                  <p className="text-xs text-[#7C3AED] leading-relaxed">{rev.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 12. DISCUSSION TAB */}
        {activeTab === 'discussion' && (
          <section className="rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#FB6C00]" />
                <span>{courseName} Community Discussion Forum</span>
              </h2>
            </div>

            {/* Post Comment Input */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={`Ask a question or share a tip about ${courseName}...`}
                className="flex-1 rounded-none border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-none bg-[#FB6C00] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#D97706] transition cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Post</span>
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {discussions.map((d) => (
                <div key={d.id} className="rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img src={d.avatar} alt={d.author} className="h-7 w-7 rounded-full object-cover" />
                      <span className="font-bold text-slate-900 dark:text-white">{d.author}</span>
                    </div>
                    <span className="text-slate-400">{d.time}</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{d.text}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700/60">
                    <button onClick={() => handleLikeComment(d.id)} className="flex items-center gap-1 hover:text-[#FB6C00] transition cursor-pointer">
                      <ThumbsUp className="h-3.5 w-3.5" />
                      <span>{d.likes || 0} Likes</span>
                    </button>
                    <button onClick={() => setActiveReplyId(activeReplyId === d.id ? null : d.id)} className="flex items-center gap-1 hover:text-[#FB6C00] transition cursor-pointer">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>Reply</span>
                    </button>
                  </div>

                  {activeReplyId === d.id && (
                    <form onSubmit={(e) => handleReplySubmit(e, d.id)} className="mt-2 flex gap-2">
                      <input
                        type="text"
                        value={replyText[d.id] || ''}
                        onChange={(e) => setReplyText({ ...replyText, [d.id]: e.target.value })}
                        placeholder="Write a reply..."
                        className="flex-1 rounded-none border border-slate-300 dark:border-slate-600 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="rounded-none bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition cursor-pointer"
                      >
                        Reply
                      </button>
                    </form>
                  )}

                  {d.replies?.map((r, rIdx) => (
                    <div key={rIdx} className="ml-6 rounded-none bg-white dark:bg-slate-900 p-3 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                      <div className="font-bold text-[#FB6C00]">{r.author}</div>
                      <p className="text-[#7C3AED]">{r.text}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Task Code Workspace Modal */}
      {activeTaskModal && (
        <TaskLabModal
          isOpen={!!activeTaskModal}
          onClose={() => setActiveTaskModal(null)}
          taskTitle={activeTaskModal.title}
          taskIndex={activeTaskModal.index}
          courseName={courseName}
          starterCode={editorStarter}
          isAlreadyCompleted={!!completedTasks[activeTaskModal.index]}
          onTaskVerified={(idx) => markTaskVerified(idx)}
        />
      )}

      {/* Sample Output Modal */}
      {activeSampleOutput && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-100 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] w-full max-w-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between border-b-2 border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white">Sample Output: {activeSampleOutput}</h3>
              <button
                onClick={() => setActiveSampleOutput(null)}
                className="text-slate-500 dark:text-slate-400 hover:text-rose-600 transition"
              >
                Close
              </button>
            </div>
            <div className="p-6 bg-slate-800 text-slate-300 font-mono text-sm leading-relaxed min-h-[250px] max-h-[60vh] overflow-auto custom-scrollbar">
              <h4 className="text-white font-bold mb-4 text-base border-b border-slate-700 pb-2">Problem Description: {activeSampleOutput}</h4>
              
              <div className="mb-6">
                <h4 className="text-white font-bold mb-2">Example 1:</h4>
                <div className="border-l-4 border-[#7C3AED] bg-slate-900/50 p-4 rounded-r">
                  <p><span className="font-bold text-slate-400">Input:</span> <span className="text-[#FB6C00]">nums = [2,7,11,15], target = 9</span></p>
                  <p><span className="font-bold text-slate-400">Output:</span> <span className="text-[#FB6C00]">[0,1]</span></p>
                  <p className="mt-2 text-slate-400 text-xs leading-5"><span className="font-bold">Explanation:</span> Because nums[0] + nums[1] == 9, we return [0, 1].</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-white font-bold mb-2">Example 2:</h4>
                <div className="border-l-4 border-[#7C3AED] bg-slate-900/50 p-4 rounded-r">
                  <p><span className="font-bold text-slate-400">Input:</span> <span className="text-[#FB6C00]">nums = [3,2,4], target = 6</span></p>
                  <p><span className="font-bold text-slate-400">Output:</span> <span className="text-[#FB6C00]">[1,2]</span></p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-white font-bold mb-2">Constraints:</h4>
                <ul className="list-disc list-inside text-slate-400 pl-2 text-xs space-y-1">
                  <li><code className="bg-slate-700 px-1 py-0.5 rounded text-slate-200">2 {'<='} nums.length {'<='} 10^4</code></li>
                  <li><code className="bg-slate-700 px-1 py-0.5 rounded text-slate-200">-10^9 {'<='} nums[i] {'<='} 10^9</code></li>
                  <li><code className="bg-slate-700 px-1 py-0.5 rounded text-slate-200">-10^9 {'<='} target {'<='} 10^9</code></li>
                  <li><strong className="text-slate-300">Only one valid answer exists.</strong></li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700">
                <p className="text-slate-500 dark:text-slate-400 text-xs italic">Note: This is a representative test case for your project. Your submitted code will be evaluated against these and hidden edge cases.</p>
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 border-t-2 border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => {
                  setActiveSampleOutput(null);
                  setActiveTab('editor');
                }}
                className="bg-[#7C3AED] text-white px-6 py-2 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-y-0.5 hover:shadow-none transition cursor-pointer"
              >
                Start Solving Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonContent;


