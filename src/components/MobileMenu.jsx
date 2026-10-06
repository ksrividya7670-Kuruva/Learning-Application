import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Courses', id: 'courses' },
  { label: 'Roadmaps', id: 'learning' },
  { label: 'Features', id: 'features' },
  { label: 'About', id: 'benefits' }
];

const MobileMenu = ({ isOpen, onClose, activePage, setActivePage, onOpenLogin, onOpenSignup, onOpenUpgrade }) => {
  const handleNavClick = (label, id) => {
    setActivePage(label);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="overflow-hidden rounded-none border border-slate-200 bg-white md:hidden backdrop-blur-sm"
        >
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-800">Explore</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="rounded-none p-2 text-[#FF9100] transition hover:bg-white border border-transparent hover:border-slate-200"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-3 py-3" aria-label="Mobile navigation">
            {navLinks.map(({ label, id }) => {
              const isActive = activePage === label;
              return (
                <button
                  key={id}
                  onClick={() => handleNavClick(label, id)}
                  className={`w-full text-left rounded-none px-3 py-3 text-sm font-medium transition cursor-pointer ${
                    isActive ? 'bg-[#FF9100] text-white border border-[#FF9100]' : 'text-slate-800 hover:bg-white border border-transparent hover:border-slate-200'
                  }`}
                >
                  {label}
                </button>
              );
            })}

            <button
              onClick={() => {
                onClose();
                window.history.pushState({}, '', '/playground');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="w-full text-left rounded-none px-3 py-3 text-sm font-semibold transition cursor-pointer text-[#FF9100] hover:bg-white border border-transparent hover:border-slate-200"
            >
              🚀 Playground
            </button>

            <button
              onClick={() => {
                onClose();
                window.history.pushState({}, '', '/dashboard');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="w-full text-left rounded-none px-3 py-3 text-sm font-medium transition cursor-pointer text-slate-800 hover:bg-white border border-transparent hover:border-slate-200"
            >
              Dashboard
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenUpgrade?.();
              }}
              className="flex items-center justify-center gap-2 rounded-none bg-[#FF9100] hover:bg-[#FF9100]/90 px-4 py-3 text-sm font-bold text-white transition my-1 border border-[#FF9100]"
            >
              <span>Upgrade to VeeruProAc PRO</span>
            </button>

            <div className="mt-2 flex flex-col gap-2 border-t border-slate-200 px-1 pt-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenLogin?.();
                }}
                className="rounded-none border border-[#FF9100] bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#FF9100] transition-all hover:bg-slate-100"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSignup?.();
                }}
                className="rounded-none bg-[#FF9100] px-4 py-2.5 text-center text-sm font-semibold text-white border border-[#FF9100] transition-all hover:bg-[#FF9100]/90"
              >
                Sign Up
              </button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
