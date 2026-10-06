import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CourseSidebar from '../components/course/CourseSidebar';
import LessonContent from '../components/course/LessonContent';
import TopBarCourse from '../components/course/TopBarCourse';
import BottomStickyBar from '../components/course/BottomStickyBar';
import CertificateModal from '../components/CertificateModal';
import { getCourseData } from '../data/courseData';
import { getCourseDetail, downloadCourseNotes, saveCourseProgress, getCourseProgress } from '../lib/api';

const CoursePage = ({ courseName, onBack, user }) => {
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [runCount, setRunCount] = useState(0);
  const [courseData, setCourseData] = useState(getCourseData(courseName));
  const [courseProgress, setCourseProgress] = useState(0);
  const [lastSavedProgress, setLastSavedProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const effectiveCourseName = courseName ? decodeURIComponent(courseName) : 'JavaScript';

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedModuleIndex(0);
    setSelectedLessonIndex(0);
    setActiveTab('overview');
    setRunCount((count) => count + 1);
    setLoading(true);
    setError(null);

    const localData = getCourseData(effectiveCourseName);

    getCourseDetail(effectiveCourseName)
      .then((result) => {
        if (result?.course) {
          setCourseData({
            ...localData,
            ...result.course,
            editorStarter: result.course.editorStarter || localData.editorStarter,
            exercises: result.course.exercises?.length ? result.course.exercises : localData.exercises,
            quizzes: result.course.quizzes?.length ? result.course.quizzes : localData.quizzes,
            modules: result.course.modules?.length ? result.course.modules : localData.modules,
          });
        } else {
          setCourseData(localData);
        }
      })
      .catch((err) => {
        console.error('Failed to load course detail from backend:', err);
        setCourseData(localData);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [courseName, effectiveCourseName]);

  useEffect(() => {
    if (!user) {
      setCourseProgress(0);
      setLastSavedProgress(0);
      return;
    }

    getCourseProgress(courseName)
      .then((result) => {
        const progress = result?.progress ?? 0;
        setCourseProgress(progress);
        setLastSavedProgress(progress);
      })
      .catch((err) => {
        console.warn('Could not load course progress:', err);
      });
  }, [courseName, user]);

  useEffect(() => {
    if (!courseData.modules?.length) {
      return;
    }

    const totalLessons = courseData.modules.reduce((sum, module) => sum + (module.lessons?.length || 0), 0);
    const completedLessons = courseData.modules
      .slice(0, selectedModuleIndex)
      .reduce((sum, module) => sum + (module.lessons?.length || 0), 0) +
      selectedLessonIndex + 1;

    const currentProgress = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;
    const effectiveProgress = Math.max(currentProgress, lastSavedProgress);

    setCourseProgress(effectiveProgress);

    if (user && effectiveProgress !== lastSavedProgress) {
      saveCourseProgress(courseName, effectiveProgress)
        .then(() => {
          setLastSavedProgress(effectiveProgress);
        })
        .catch((err) => {
          console.warn('Could not save course progress:', err);
        });
    }
  }, [selectedModuleIndex, selectedLessonIndex, courseData, courseName, lastSavedProgress, user]);

  const safeModules = courseData?.modules?.length ? courseData.modules : [
    {
      title: `${courseData?.title || courseName} Module 1: Fundamentals`,
      lessons: [
        {
          title: `Lesson 1: Intro to ${courseData?.title || courseName}`,
          summary: `Learn fundamental syntax and principles of ${courseData?.title || courseName}.`,
          details: `Master essential architecture and building blocks for ${courseData?.title || courseName}.`,
          duration: '12m',
          codeExample: `// ${courseData?.title || courseName} Code Example\nconsole.log("Welcome to ${courseData?.title || courseName} Studio!");`,
          exercisePrompt: `Write your first ${courseData?.title || courseName} example code in the editor.`
        }
      ]
    }
  ];

  const currentModule = safeModules[selectedModuleIndex] || safeModules[0] || { lessons: [] };
  const currentLesson = currentModule.lessons?.[selectedLessonIndex] || currentModule.lessons?.[0] || {
    title: `${courseData?.title || courseName} Lesson 1`,
    summary: `Learn core concepts and hands-on principles for ${courseData?.title || courseName}.`,
    details: `Follow along with the ${courseData?.title || courseName} masterclass guide.`,
    duration: '12m',
    codeExample: `// ${courseData?.title || courseName} Code\nconsole.log("Learning ${courseData?.title || courseName}");`,
    exercisePrompt: `Complete the practice challenge.`
  };

  const handleDownloadNotes = async () => {
    try {
      await downloadCourseNotes(courseData.title || courseName);
    } catch (err) {
      console.error('Download notes failed:', err);
      alert(err.message || 'Failed to download notes');
    }
  };

  const handlePreviousLesson = () => {
    if (selectedLessonIndex > 0) {
      setSelectedLessonIndex((index) => index - 1);
      return;
    }

    if (selectedModuleIndex > 0) {
      const previousModuleIndex = selectedModuleIndex - 1;
      const previousLessonCount = courseData.modules[previousModuleIndex]?.lessons.length || 1;
      setSelectedModuleIndex(previousModuleIndex);
      setSelectedLessonIndex(previousLessonCount - 1);
    }
  };

  const handleNextLesson = () => {
    const currentModule = courseData.modules[selectedModuleIndex];
    if (!currentModule) {
      return;
    }

    if (selectedLessonIndex + 1 < currentModule.lessons.length) {
      setSelectedLessonIndex((index) => index + 1);
      return;
    }

    if (selectedModuleIndex + 1 < courseData.modules.length) {
      setSelectedModuleIndex((index) => index + 1);
      setSelectedLessonIndex(0);
    }
  };

  const handlePractice = () => {
    setActiveTab('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRun = () => {
    setActiveTab('editor');
    setRunCount((count) => count + 1);
  };

  return (
    <div className="min-h-screen bg-white">
      <TopBarCourse
        courseName={courseData.title || courseName}
        progress={courseProgress}
        onBack={onBack}
        onOpenCertificate={() => setActiveTab('certificate')}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 rounded-none border border-slate-200 bg-[#FFFFFF] px-4 py-3 text-sm text-gray-800">
            {error}
          </div>
        )}
        {!user && (
          <div className="mb-6 rounded-none border border-slate-200 bg-[#FFFFFF] px-4 py-3 text-sm text-gray-800">
            Log in to save your course progress automatically and keep it synced across devices.
          </div>
        )}
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileSidebarOpen(prev => !prev)}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 shadow-sm hover:bg-[#FFFFFF] transition w-full justify-between"
          >
            <span>☰ Course Menu</span>
            <span className="text-slate-400 text-xs">{mobileSidebarOpen ? '▲ Hide' : '▼ Show'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Sidebar — always visible on lg, togglable on mobile */}
          <aside className={`lg:col-span-1 ${mobileSidebarOpen ? 'block' : 'hidden'} lg:block`}>
            <CourseSidebar
              courseName={courseData.title || courseName}
              modules={courseData.modules}
              selectedModuleIndex={selectedModuleIndex}
              setSelectedModuleIndex={setSelectedModuleIndex}
              selectedLessonIndex={selectedLessonIndex}
              setSelectedLessonIndex={setSelectedLessonIndex}
              activeTab={activeTab}
              setActiveTab={(tab) => { setActiveTab(tab); setMobileSidebarOpen(false); }}
              progress={courseProgress}
              onDownloadNotes={handleDownloadNotes}
            />
          </aside>
          <main className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedModuleIndex}-${selectedLessonIndex}-${activeTab}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <LessonContent
                  courseName={courseData.title || courseName}
                  courseSummary={courseData.summary}
                  courseIntro={courseData.intro}
                  exercises={courseData.exercises}
                  quizzes={courseData.quizzes}
                  faqs={courseData.faqs}
                  lesson={currentLesson}
                  editorStarter={courseData.editorStarter}
                  modules={courseData.modules}
                  moduleIndex={selectedModuleIndex}
                  setSelectedModuleIndex={setSelectedModuleIndex}
                  lessonIndex={selectedLessonIndex}
                  setLessonIndex={setSelectedLessonIndex}
                  moduleCount={courseData.modules.length}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  runCount={runCount}
                  onPrevious={handlePreviousLesson}
                  onNext={handleNextLesson}
                  onOpenCertificate={() => setShowCertificateModal(true)}
                  user={user}
                  courseProgress={courseProgress}
                />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      <CertificateModal
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        courseName={courseData.title || courseName}
        user={user}
      />
    </div>
  );
};

export default CoursePage;

