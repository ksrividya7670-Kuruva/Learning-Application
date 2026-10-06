import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';
import { loginUser } from '../lib/dataStore';

const LoginForm = ({ isOpen, onClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // Dynamic authentication with persistent dataStore
      const authenticatedUser = loginUser({
        email: formData.email,
        password: formData.password
      });

      onLoginSuccess?.(authenticatedUser, `token_${authenticatedUser.id}`);
      localStorage.setItem('hasSignedUpBefore', 'true');
      alert(`Welcome back, ${authenticatedUser.fullName}!`);
      setFormData({ email: '', password: '' });
      onClose();
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-md max-h-[90vh] overflow-auto rounded-none bg-white p-8 border border-slate-200"
          >
            <motion.button
              onClick={onClose}
              whileHover={{ y: -4, x: -4 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-4 top-4 rounded-full bg-white p-2 text-[#FF9100] border border-slate-200 transition hover:bg-slate-50"
              aria-label="Close login form"
            >
              <X size={20} />
            </motion.button>

            <div className="mb-8">
              <h2 className="text-3xl font-black tracking-tight text-slate-800">Welcome Back</h2>
              <p className="mt-2 text-sm text-slate-800">Log in to your account</p>
            </div>

            {errorMsg && (
              <div className="mb-4 rounded-none bg-white p-3 text-sm text-[#FF9100] border border-slate-200">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-800 mb-1.5">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="w-full rounded-none border border-slate-200 bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 transition focus:border-[#FF9100] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-800 mb-1.5">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  required
                  className="w-full rounded-none border border-slate-200 bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 transition focus:border-[#FF9100] focus:outline-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-none bg-[#FF9100] py-3 font-semibold text-white transition-all border border-[#FF9100]"
              >
                Log In
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginForm;
