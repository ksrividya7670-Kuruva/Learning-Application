import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Menu, Sparkles, ChevronDown, User, LogOut, LayoutDashboard, UserCircle, Settings, Sun, Moon } from 'lucide-react';
import SearchBar from './SearchBar';
import MobileMenu from './MobileMenu';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import UpgradeModal from './UpgradeModal';
import Logo from './Logo';

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Courses', id: 'courses' },
  { label: 'Roadmaps', id: 'roadmaps' },
  { label: 'Interview Prep', id: 'interview-prep' },
  { label: 'More', id: 'more' }
];

const Navbar = ({ onLogoClick, onNavClick, user, onLoginSuccess, onSignupSuccess, onLogout, darkMode, onToggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('Home');
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleNavigateUpgrade = () => {
    window.history.pushState({}, '', '/upgrade');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="fixed top-0 left-0 w-full z-50 border-b-2 border-[#FF9100] bg-white dark:bg-[#171717] text-black dark:text-white transition-colors shadow-none"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <motion.a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onLogoClick?.();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActivePage('Home');
          }}
          className="flex items-center gap-2.5 flex-shrink-0 cursor-pointer mr-4 sm:mr-6"
          aria-label="VeeruProAc home"
        >
          <Logo isDark={darkMode} />
        </motion.a>

        <nav className="hidden items-center gap-8 xl:gap-10 lg:flex" aria-label="Primary navigation">
          {navLinks.map(({ label, id }) => {
            const isActive = activePage === label;
            
            if (label === 'Courses') {
              return (
                <div key={id} className="group relative">
                  <motion.a
                    href={`#${id}`}
                    whileHover={{ y: -1 }}
                    onClick={(e) => {
                      e.preventDefault();
                      setActivePage(label);
                      onNavClick?.(id);
                    }}
                    className={`relative flex items-center gap-1.5 text-base font-bold transition-colors duration-200 cursor-pointer hover:underline underline-offset-8 decoration-[#FF9100] decoration-2 ${isActive ? 'text-[#FF9100] underline' : 'text-gray-900 dark:text-gray-100 hover:text-[#FF9100]'}`}
                  >
                    {label}
                    <ChevronDown className="h-4.5 w-4.5 opacity-100 group-hover:rotate-180 transition-transform duration-200" />
                  </motion.a>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute left-0 top-full pt-5 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-none z-50">
                    <div className="rounded-none border border-black/20 dark:border-gray-700 bg-white dark:bg-[#1E1E1E] p-2 flex flex-col gap-1 shadow-xl">
                      <div className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">MS Office & Productivity</div>
                      <a href="/course/MS%20Excel" onClick={(e) => { e.preventDefault(); window.history.pushState({ course: 'MS Excel' }, '', '/course/MS%20Excel'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="flex items-center justify-between px-3 py-2 text-sm font-bold text-gray-900 dark:text-gray-100 hover:bg-[#FF9100] hover:text-black rounded-none transition-none"><span>MS Excel</span><span className="text-[10px] text-black border border-black/30 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 font-bold uppercase">Popular</span></a>
                      <a href="/course/MS%20Word" onClick={(e) => { e.preventDefault(); window.history.pushState({ course: 'MS Word' }, '', '/course/MS%20Word'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="px-3 py-2 text-sm font-bold text-gray-900 dark:text-gray-100 hover:bg-[#FF9100] hover:text-black rounded-none transition-none">MS Word</a>
                      <a href="/course/PowerPoint" onClick={(e) => { e.preventDefault(); window.history.pushState({ course: 'PowerPoint' }, '', '/course/PowerPoint'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="px-3 py-2 text-sm font-bold text-gray-900 dark:text-gray-100 hover:bg-[#FF9100] hover:text-black rounded-none transition-none">PowerPoint</a>
                      <div className="my-1 border-t border-black/10 dark:border-gray-700"></div>
                      <div className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Development & Tech</div>
                      <a href="/course/HTML" onClick={(e) => { e.preventDefault(); window.history.pushState({ course: 'HTML' }, '', '/course/HTML'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="px-3 py-2 text-sm font-bold text-gray-900 dark:text-gray-100 hover:bg-[#FF9100] hover:text-black rounded-none transition-none">Web Development</a>
                      <a href="/course/Python" onClick={(e) => { e.preventDefault(); window.history.pushState({ course: 'Python' }, '', '/course/Python'); window.dispatchEvent(new PopStateEvent('popstate')); }} className="px-3 py-2 text-sm font-bold text-gray-900 dark:text-gray-100 hover:bg-[#FF9100] hover:text-black rounded-none transition-none">Data Science & Python</a>
                    </div>
                  </div>
                </div>
              );
            }
            
            if (label === 'More') {
              const isMoreActive = activePage === 'Features' || activePage === 'About' || activePage === 'Playground';
              return (
                <div key={id} className="group relative">
                  <motion.a
                    href={`#`}
                    whileHover={{ y: -1 }}
                    onClick={(e) => e.preventDefault()}
                    className={`relative flex items-center gap-1.5 text-base font-bold transition-colors duration-200 cursor-pointer hover:underline underline-offset-8 decoration-[#FF9100] decoration-2 ${isMoreActive ? 'text-[#FF9100] underline' : 'text-gray-900 dark:text-gray-100 hover:text-[#FF9100]'}`}
                  >
                    More
                    <ChevronDown className="h-4.5 w-4.5 opacity-100 group-hover:rotate-180 transition-transform duration-200" />
                  </motion.a>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute left-0 top-full pt-5 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-none z-50">
                    <div className="rounded-none border border-black/20 dark:border-gray-700 bg-white dark:bg-[#1E1E1E] p-2 flex flex-col gap-1 shadow-xl">
                      <a href="#features" onClick={(e) => { e.preventDefault(); setActivePage('Features'); onNavClick?.('features'); }} className="px-3 py-2 text-sm font-bold text-gray-900 dark:text-gray-100 hover:bg-[#FF9100] hover:text-black rounded-none transition-none">Features</a>
                      <a href="#benefits" onClick={(e) => { e.preventDefault(); setActivePage('About'); onNavClick?.('benefits'); }} className="px-3 py-2 text-sm font-bold text-gray-900 dark:text-gray-100 hover:bg-[#FF9100] hover:text-black rounded-none transition-none">About</a>
                      <a href="/playground" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/playground'); window.dispatchEvent(new PopStateEvent('popstate')); setActivePage('Playground'); }} className="px-3 py-2 text-sm font-bold text-gray-900 dark:text-gray-100 hover:bg-[#FF9100] hover:text-black rounded-none transition-none">Playground</a>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <motion.a
                key={id}
                href={`#${id}`}
                whileHover={{ y: -1 }}
                onClick={(e) => {
                  e.preventDefault();
                  setActivePage(label);
                  onNavClick?.(id);
                }}
                className={`group relative text-base font-bold transition-colors duration-200 cursor-pointer hover:underline underline-offset-8 decoration-[#FF9100] decoration-2 ${isActive ? 'text-[#FF9100] underline' : 'text-gray-900 dark:text-gray-100 hover:text-[#FF9100]'}`}
              >
                {label}
              </motion.a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 sm:gap-6 md:flex">
          <SearchBar />

          {/* Dark/Light Mode Toggle Button */}
          <button
            onClick={onToggleDarkMode}
            className="flex h-9 w-9 items-center justify-center rounded-none border border-black/20 dark:border-gray-700 bg-white dark:bg-[#1E1E1E] text-black dark:text-amber-400 hover:bg-[#FF9100] dark:hover:bg-[#FF9100] dark:hover:text-black transition-colors shadow-sm cursor-pointer"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4 text-black" />}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-none bg-white border border-black/20 text-black hover:bg-[#FF9100] focus:outline-none transition-colors shadow-sm"
                aria-label="User account menu"
              >
                <User className="h-5 w-5 text-black" />
              </button>

              {isUserMenuOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 w-64 rounded-none bg-white border border-black/20 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-3 py-3 border-b border-black/10 mb-1 rounded-none bg-gray-100">
                    <p className="text-sm font-bold text-black tracking-tight truncate">{user.fullName || 'User'}</p>
                    <p className="text-xs text-gray-600 font-medium truncate mt-0.5">{user.email}</p>
                  </div>
                  
                  <div className="space-y-0.5 py-1">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        window.history.pushState({}, '', '/profile');
                        window.dispatchEvent(new PopStateEvent('popstate'));
                      }}
                      className="flex w-full items-center gap-3 rounded-none px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-[#FF9100] hover:text-black transition-colors"
                    >
                      <UserCircle className="h-4 w-4 text-gray-600" />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        window.history.pushState({}, '', '/dashboard');
                        window.dispatchEvent(new PopStateEvent('popstate'));
                      }}
                      className="flex w-full items-center gap-3 rounded-none px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-[#FF9100] hover:text-black transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4 text-gray-600" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        window.history.pushState({}, '', '/admin');
                        window.dispatchEvent(new PopStateEvent('popstate'));
                      }}
                      className="flex w-full items-center gap-3 rounded-none px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-[#FF9100] hover:text-black transition-colors"
                    >
                      <Settings className="h-4 w-4 text-gray-600" />
                      Admin Panel
                    </button>
                  </div>

                  <div className="mt-1 pt-1 border-t border-black/10">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onLogout();
                      }}
                      className="flex w-full items-center gap-3 rounded-none px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4 text-red-600" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <motion.button
                type="button"
                onClick={() => setIsSignupOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-none bg-[#FF9100] border border-[#FF9100] px-6 py-2 text-sm font-bold uppercase tracking-wider text-black transition-none hover:bg-black hover:text-white whitespace-nowrap"
              >
                Sign Up
              </motion.button>
              {localStorage.getItem('hasSignedUpBefore') === 'true' && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLoginOpen(true)}
                  className="rounded-none border border-black/30 bg-white px-5 py-2 text-sm font-bold uppercase tracking-wider text-black transition-none hover:bg-black hover:text-white"
                >
                  Login
                </motion.button>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <motion.button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="rounded-none border border-black bg-white p-2.5 text-black transition-none hover:bg-black hover:text-white"
          >
            <Menu size={20} />
          </motion.button>
        </div>
      </div>

      <div className="px-4 pb-3 sm:px-6 lg:hidden">
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          activePage={activePage}
          setActivePage={setActivePage}
          onOpenLogin={() => {
            setIsMenuOpen(false);
            setIsLoginOpen(true);
          }}
          onOpenSignup={() => {
            setIsMenuOpen(false);
            setIsSignupOpen(true);
          }}
          onOpenUpgrade={() => {
            setIsMenuOpen(false);
            handleNavigateUpgrade();
          }}
        />
      </div>

      <UpgradeModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
      />
      <SignupForm
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onSignupSuccess={onSignupSuccess}
      />
      <LoginForm
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={onLoginSuccess}
      />
      </motion.header>
      <div className="h-[65px] w-full shrink-0 bg-white"></div>
    </>
  );
};

export default Navbar;
