import React from 'react';
import Navbar from './components/Navbar';
import LiveStatsBanner from './components/LiveStatsBanner';
import Courses from './components/Courses';
import CoursePage from './pages/CoursePage';
import CourseSalesPage from './pages/CourseSalesPage';
import UpgradePage from './pages/UpgradePage';
import VerifyPage from './pages/VerifyPage';
import Hero from './components/Hero';
import FeatureCards from './components/FeatureCards';
import Benefits from './components/Benefits';
import AllCourses from './components/AllCourses';
import ExploreAllCourses from './components/ExploreAllCourses';
import CodeEditor from './components/CodeEditor';
import CTAWithFAQ from './components/CTAWithFAQ';
import Footer from './components/Footer';
import DashboardPage from './pages/DashboardPage';
import AIChatWidget from './components/AIChatWidget';
import UserProfileLayout from './components/profile/UserProfileLayout';
import InterviewPrepPage from './pages/InterviewPrepPage';
import RoadmapsPage from './pages/RoadmapsPage';
import AdminPanelPage from './pages/AdminPanelPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminCourseManagement from './components/admin/AdminCourseManagement';
import AdminUserManagement from './components/admin/AdminUserManagement';
import AdminRoadmapManagement from './components/admin/AdminRoadmapManagement';
import AdminProfile from './components/admin/AdminProfile';
import AdminAnalytics from './components/admin/AdminAnalytics';
import AdminCategoryManagement from './components/admin/AdminCategoryManagement';
import AdminLessonManagement from './components/admin/AdminLessonManagement';
import AdminQuizManagement from './components/admin/AdminQuizManagement';
import AdminPracticeManagement from './components/admin/AdminPracticeManagement';
import AdminInterviewPrep from './components/admin/AdminInterviewPrep';
import AdminInstructorManagement from './components/admin/AdminInstructorManagement';
import AdminFeedback from './components/admin/AdminFeedback';
import AdminAnnouncements from './components/admin/AdminAnnouncements';
import AdminSettings from './components/admin/AdminSettings';
import PaymentPage from './pages/PaymentPage';
import PlaygroundPage from './pages/PlaygroundPage';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import TopicNav from './components/TopicNav';

const App = () => {
  const getCourseFromPath = () => {
    const m = window.location.pathname.match(/^\/course\/(.+)/);
    if (!m) return null;
    try {
      return decodeURIComponent(m[1]);
    } catch (e) {
      return m[1];
    }
  };

  const isUpgradePath = () => window.location.pathname === '/upgrade';
  const isVerifyPath = () => window.location.pathname === '/verify';
  const isPaymentPath = () => window.location.pathname === '/payment';
  const isDashboardPath = () => window.location.pathname === '/dashboard';
  const isProfilePath = () => window.location.pathname === '/profile';
  const isPlaygroundPath = () => window.location.pathname === '/playground';
  const isInterviewPrepPath = () => window.location.pathname === '/interview-prep';
  const isRoadmapsPath = () => window.location.pathname === '/roadmaps';
  const isAdminPath = () => window.location.pathname === '/admin';

  const [activeCourse, setActiveCourse] = React.useState(getCourseFromPath());
  const [isUpgradeView, setIsUpgradeView] = React.useState(isUpgradePath());
  const [isVerifyView, setIsVerifyView] = React.useState(isVerifyPath());
  const [isPaymentView, setIsPaymentView] = React.useState(isPaymentPath());
  const [isDashboardView, setIsDashboardView] = React.useState(isDashboardPath());
  const [isProfileView, setIsProfileView] = React.useState(isProfilePath());
  const [isPlaygroundView, setIsPlaygroundView] = React.useState(isPlaygroundPath());
  const [isInterviewPrepView, setIsInterviewPrepView] = React.useState(isInterviewPrepPath());
  const [isRoadmapsView, setIsRoadmapsView] = React.useState(isRoadmapsPath());
  const [isAdminView, setIsAdminView] = React.useState(isAdminPath());
  const [activeAdminMenu, setActiveAdminMenu] = React.useState('dashboard');
  
  const [darkMode, setDarkMode] = React.useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const [user, setUser] = React.useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  React.useEffect(() => {
    const onPop = () => {
      setActiveCourse(getCourseFromPath());
      setIsUpgradeView(isUpgradePath());
      setIsVerifyView(isVerifyPath());
      setIsPaymentView(isPaymentPath());
      setIsDashboardView(isDashboardPath());
      setIsProfileView(isProfilePath());
      setIsPlaygroundView(isPlaygroundPath());
      setIsInterviewPrepView(isInterviewPrepPath());
      setIsRoadmapsView(isRoadmapsPath());
      setIsAdminView(isAdminPath());
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const handleSelectCourse = (c) => {
    setActiveCourse(c);
    setIsUpgradeView(false);
    setIsVerifyView(false);
    setIsPaymentView(false);
    setIsDashboardView(false);
    setIsProfileView(false);
    setIsPlaygroundView(false);
    setIsInterviewPrepView(false);
    setIsRoadmapsView(false);
    setIsAdminView(false);
  };

  const handleAuthSuccess = (userData, token) => {
    if (token) {
      localStorage.setItem('token', token);
    }
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleUpgrade = () => {
    const upgradedUser = user ? { ...user, isPro: true } : { name: 'Guest PRO', isPro: true };
    setUser(upgradedUser);
    localStorage.setItem('user', JSON.stringify(upgradedUser));
  };

  const handleBack = () => {
    window.history.pushState({}, '', '/');
    setActiveCourse(null);
    setIsUpgradeView(false);
    setIsVerifyView(false);
    setIsPaymentView(false);
    setIsDashboardView(false);
    setIsProfileView(false);
    setIsPlaygroundView(false);
    setIsInterviewPrepView(false);
    setIsRoadmapsView(false);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleLogoHome = () => {
    if (activeCourse || isUpgradeView || isVerifyView || isPaymentView || isDashboardView || isProfileView || isPlaygroundView || isInterviewPrepView || isRoadmapsView) {
      handleBack();
    } else {
      window.history.pushState({}, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const proCourses = ['Full-Stack-MERN-Python-Masterclass', 'Web-Engineering-Pro-Masterclass', 'AI-Data-Science-Specialist-Track'];
  const needsUpgradeToView = activeCourse && proCourses.includes(activeCourse) && !user?.isPro;

  if (isAdminView) {
    return (
      <AdminLayout 
        activeMenu={activeAdminMenu} 
        onNavigate={setActiveAdminMenu}
        onLogoClick={() => {
          setIsAdminView(false);
          window.history.pushState({}, '', '/');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }}
        onLogout={() => {
          setIsAdminView(false);
          window.history.pushState({}, '', '/');
          handleLogout();
        }}
      >
        {activeAdminMenu === 'dashboard' && <AdminDashboard />}
        {activeAdminMenu === 'analytics' && <AdminAnalytics />}
        {activeAdminMenu === 'courses' && <AdminCourseManagement isDarkMode={false} />}
        {activeAdminMenu === 'categories' && <AdminCategoryManagement />}
        {activeAdminMenu === 'lessons' && <AdminLessonManagement />}
        {activeAdminMenu === 'quizzes' && <AdminQuizManagement />}
        {activeAdminMenu === 'practice' && <AdminPracticeManagement />}
        {activeAdminMenu === 'roadmaps' && <AdminRoadmapManagement isDarkMode={false} />}
        {activeAdminMenu === 'interview-prep' && <AdminInterviewPrep />}
        {activeAdminMenu === 'students' && <AdminUserManagement isDarkMode={false} />}
        {activeAdminMenu === 'instructors' && <AdminInstructorManagement />}
        {activeAdminMenu === 'feedback' && <AdminFeedback />}
        {activeAdminMenu === 'announcements' && <AdminAnnouncements />}
        {activeAdminMenu === 'settings' && <AdminSettings />}
        {activeAdminMenu === 'profile' && <AdminProfile />}
      </AdminLayout>
    );
  }

  return (
    <PayPalScriptProvider options={{ "client-id": "test", currency: "USD" }}>
      <div className="min-h-screen bg-white dark:bg-[#121212] text-black dark:text-white flex flex-col overflow-x-hidden">
        <Navbar
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onLogoClick={handleLogoHome}
        onNavClick={(id) => {
          if (id === 'interview-prep') {
            window.history.pushState({}, '', '/interview-prep');
            setActiveCourse(null);
            setIsUpgradeView(false);
            setIsVerifyView(false);
            setIsPaymentView(false);
            setIsDashboardView(false);
            setIsProfileView(false);
            setIsPlaygroundView(false);
            setIsRoadmapsView(false);
            setIsInterviewPrepView(true);
            setIsAdminView(false);
            window.dispatchEvent(new PopStateEvent('popstate'));
            return;
          }
          if (id === 'roadmaps') {
            window.history.pushState({}, '', '/roadmaps');
            setActiveCourse(null);
            setIsUpgradeView(false);
            setIsVerifyView(false);
            setIsPaymentView(false);
            setIsDashboardView(false);
            setIsProfileView(false);
            setIsPlaygroundView(false);
            setIsInterviewPrepView(false);
            setIsRoadmapsView(true);
            window.dispatchEvent(new PopStateEvent('popstate'));
            return;
          }
          if (id === 'playground') {
            window.history.pushState({}, '', '/playground');
            setActiveCourse(null);
            setIsUpgradeView(false);
            setIsVerifyView(false);
            setIsPaymentView(false);
            setIsDashboardView(false);
            setIsProfileView(false);
            setIsPlaygroundView(true);
            setIsInterviewPrepView(false);
            setIsRoadmapsView(false);
            setIsAdminView(false);
            window.dispatchEvent(new PopStateEvent('popstate'));
            return;
          }
          if (activeCourse || isUpgradeView || isVerifyView || isPaymentView || isDashboardView || isProfileView || isPlaygroundView || isInterviewPrepView || isRoadmapsView) {
            window.history.pushState({}, '', '/');
            setActiveCourse(null);
            setIsUpgradeView(false);
            setIsVerifyView(false);
            setIsPaymentView(false);
            setIsDashboardView(false);
            setIsProfileView(false);
            setIsPlaygroundView(false);
            setIsInterviewPrepView(false);
            setIsRoadmapsView(false);
            window.dispatchEvent(new PopStateEvent('popstate'));
            setTimeout(() => {
              if (id === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }
            }, 100);
          } else {
            if (id === 'home') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }}
        user={user}
        onLoginSuccess={handleAuthSuccess}
        onSignupSuccess={handleAuthSuccess}
        onLogout={handleLogout}
      />
      {!isDashboardView && !isProfileView && !isInterviewPrepView && !isRoadmapsView && !activeCourse && <TopicNav />}

      {isRoadmapsView ? (
        <RoadmapsPage user={user} onBack={handleBack} />
      ) : isProfileView ? (
        <UserProfileLayout user={user} onLogout={handleLogout} />
      ) : isDashboardView ? (
        <DashboardPage user={user} onBack={handleBack} onSelectCourse={handleSelectCourse} />
      ) : isVerifyView ? (
        <VerifyPage onBack={handleBack} />
      ) : isPaymentView ? (
        <PaymentPage onBack={handleBack} user={user} />
      ) : isUpgradeView ? (
        <UpgradePage user={user} onBack={handleBack} onSelectCourse={handleSelectCourse} onUpgrade={handleUpgrade} />
      ) : isPlaygroundView ? (
        <PlaygroundPage onBack={handleBack} />
      ) : isInterviewPrepView ? (
        <InterviewPrepPage user={user} onLogoClick={handleLogoHome} onLogout={handleLogout} />
      ) : activeCourse ? (
        needsUpgradeToView ? (
          <CourseSalesPage courseName={activeCourse} onBack={handleBack} onUpgrade={handleUpgrade} />
        ) : (
          <CoursePage courseName={activeCourse} onBack={handleBack} user={user} />
        )
      ) : (
        <>
          <section id="home" className="scroll-mt-20">
            <Hero />
          </section>
          <section id="features" className="scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <FeatureCards />
            </div>
          </section>
          <section id="benefits" className="scroll-mt-20">
            <Benefits />
          </section>
          <section id="courses" className="scroll-mt-20">
            <AllCourses />
            <ExploreAllCourses />
          </section>
          <section id="learning" className="scroll-mt-20">
            <CodeEditor />
            <CTAWithFAQ />
          </section>
        </>
      )}

      <Footer />
      <AIChatWidget />
      </div>
    </PayPalScriptProvider>
  );
};

export default App;
