import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Maximize, CheckCircle, Video, BookOpen, Clock, Sparkles } from 'lucide-react';

const videoCourses = [
  {
    id: 'html-css',
    title: 'HTML5 & Modern CSS3 Masterclass',
    duration: '14m 20s',
    instructor: 'Alex Rivera • Principal Web Architect',
    chapters: [
      { 
        title: '01. HTML5 Semantic Boilerplate & Layout tags', 
        time: '04:15', 
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        poster: '/thumbnails/html_css.jpg'
      },
      { 
        title: '02. Modern CSS Flexbox & Alignment Rules', 
        time: '03:40', 
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        poster: '/thumbnails/html_css.jpg'
      },
      { 
        title: '03. Responsive CSS Grid Layout Design', 
        time: '08:15', 
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        poster: '/thumbnails/html_css.jpg'
      },
      { 
        title: '04. CSS Custom Variables & Mobile Breakpoints', 
        time: '11:50', 
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        poster: '/thumbnails/html_css.jpg'
      },
    ],
  },
  {
    id: 'javascript-es6',
    title: 'JavaScript ES6+ & Async Programming',
    duration: '18m 45s',
    instructor: 'Sarah Chen • Lead Frontend Engineer',
    chapters: [
      { 
        title: '01. Variables, Scope & Arrow Functions', 
        time: '04:10', 
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        poster: '/thumbnails/js.jpg'
      },
      { 
        title: '02. Array Transformation with Map, Filter', 
        time: '05:30', 
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        poster: '/thumbnails/js.jpg'
      },
      { 
        title: '03. DOM Selection & Event Delegation', 
        time: '04:45', 
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        poster: '/thumbnails/js.jpg'
      },
      { 
        title: '04. Async/Await & Fetching REST APIs', 
        time: '06:20', 
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        poster: '/thumbnails/js.jpg'
      },
    ],
  },
  {
    id: 'react-mastery',
    title: 'React 18 Architecture & Custom Hooks',
    duration: '22m 10s',
    instructor: 'David Miller • React Core Contributor',
    chapters: [
      { 
        title: '01. Virtual DOM & JSX Component Hierarchy', 
        time: '05:20', 
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        poster: '/thumbnails/react.jpg'
      },
      { 
        title: '02. State Management with useState', 
        time: '06:25', 
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        poster: '/thumbnails/react.jpg'
      },
      { 
        title: '03. Side Effects & Cleanup with useEffect', 
        time: '05:45', 
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        poster: '/thumbnails/react.jpg'
      },
      { 
        title: '04. Building Custom Reusable React Hooks', 
        time: '07:30', 
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        poster: '/thumbnails/react.jpg'
      },
    ],
  },
  {
    id: 'python-data',
    title: 'Python for Data Science & Machine Learning',
    duration: '25m 30s',
    instructor: 'Dr. Michael Vance • AI Research Scientist',
    chapters: [
      { 
        title: '01. Python Collections & Functional Logic', 
        time: '06:15', 
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        poster: '/thumbnails/python.jpg'
      },
      { 
        title: '02. NumPy Vectorized Computing & Arrays', 
        time: '07:25', 
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        poster: '/thumbnails/python.jpg'
      },
      { 
        title: '03. Pandas DataFrames & Exploratory Analysis', 
        time: '06:30', 
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        poster: '/thumbnails/python.jpg'
      },
      { 
        title: '04. Scikit-Learn Predictive Model Training', 
        time: '08:10', 
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        poster: '/thumbnails/python.jpg'
      },
    ],
  },
];

const VideoGalleryModal = ({ isOpen, onClose }) => {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef = useRef(null);

  if (!isOpen) return null;

  const currentCourse = videoCourses[selectedCourseIndex];
  const activeChapterData = currentCourse.chapters[activeChapter];

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleCourseChange = (index) => {
    setSelectedCourseIndex(index);
    setActiveChapter(0);
    setIsPlaying(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleChapterClick = (index) => {
    setActiveChapter(index);
    setIsPlaying(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
      }, 50);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/80 p-4 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-none bg-white text-slate-800 p-6 sm:p-8 border border-slate-200"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full bg-slate-200 p-2.5 text-slate-500 hover:bg-slate-300 hover:text-slate-800 transition z-10"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 pr-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF9100]/20 text-[#FF9100] text-xs font-bold uppercase tracking-wider mb-2 border border-[#FF9100]/30">
                <Video className="h-3.5 w-3.5 text-[#FF9100]" />
                VeeruProAc PRO HD Masterclasses
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Full HD Video Classes Gallery</h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#FF9100] bg-[#FF9100]/10 px-3 py-1.5 rounded-none border border-[#FF9100]/20 font-semibold self-start sm:self-auto">
              <CheckCircle className="h-4 w-4" />
              <span>Full Video Access Unlocked</span>
            </div>
          </div>

          {/* Course Selector Tabs */}
          <div className="flex flex-nowrap gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin">
            {videoCourses.map((course, idx) => (
              <button
                key={course.id}
                onClick={() => handleCourseChange(idx)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-none text-xs font-bold transition flex items-center gap-2 border ${
                  selectedCourseIndex === idx
                    ? 'bg-[#FF9100] text-white border-[#FF9100]'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <Video className="h-3.5 w-3.5" />
                <span>{course.title.split(' ')[0]} Masterclass</span>
              </button>
            ))}
          </div>

          {/* Main Video & Playlist Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Player Box */}
            <div className="lg:col-span-2 space-y-4">
              <div className="relative overflow-hidden rounded-none bg-black aspect-video border border-slate-200">
                <video
                  ref={videoRef}
                  src={activeChapterData.videoUrl}
                  poster={activeChapterData.poster}
                  className="w-full h-full object-cover"
                  onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                />

                {!isPlaying && (
                  <button
                    onClick={handleTogglePlay}
                    className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FF9100]/90 text-white transition-all hover:-translate-y-1 hover:-translate-x-1 hover:bg-[#FF9100] backdrop-blur-sm"
                    aria-label="Play Video"
                  >
                    <Play className="h-9 w-9 translate-x-0.5 fill-white" />
                  </button>
                )}

                {/* Controls Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-slate-900/70 p-4 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-3">
                    <button onClick={handleTogglePlay} className="hover:text-[#FF9100] transition">
                      {isPlaying ? <Pause className="h-5 w-5 fill-white" /> : <Play className="h-5 w-5 fill-white" />}
                    </button>
                    <button onClick={handleToggleMute} className="hover:text-[#FF9100] transition">
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                    <span className="font-mono text-slate-200">
                      {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')} / {activeChapterData.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#FF9100] font-extrabold text-[10px] text-white">1080p FULL HD</span>
                    <button onClick={() => videoRef.current?.requestFullscreen()} className="hover:text-[#FF9100]">
                      <Maximize className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800">{currentCourse.title}: {activeChapterData.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{currentCourse.instructor}</p>
              </div>
            </div>

            {/* Chapters & Timestamps */}
            <div className="rounded-none bg-white border border-slate-200 p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                  <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#FF9100]" />
                    Interactive Chapters
                  </h4>
                  <span className="text-xs text-slate-500">{currentCourse.chapters.length} Chapters</span>
                </div>

                <div className="space-y-2.5">
                  {currentCourse.chapters.map((ch, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChapterClick(idx)}
                      className={`w-full text-left p-3 rounded-none transition text-xs flex items-center justify-between border ${
                        activeChapter === idx
                          ? 'bg-[#FF9100] text-white font-bold border-[#FF9100]'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-800'
                      }`}
                    >
                      <span className="truncate pr-2">{ch.title}</span>
                      <span className="font-mono text-[11px] opacity-80 flex-shrink-0">{ch.time}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-none bg-slate-50 border border-slate-200 p-3.5 text-xs text-slate-600 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-slate-700">
                  Pro Video Feature
                </div>
                <p className="text-[11px] text-slate-500">Click any timestamp above to jump instantly to that chapter during the HD video lecture.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default VideoGalleryModal;
