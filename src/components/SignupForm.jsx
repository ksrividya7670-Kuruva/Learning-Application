import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';
import { registerUser } from '../lib/dataStore';

const SignupForm = ({ isOpen, onClose, onOpenLogin, onSignupSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (!formData.agreeToTerms) {
      setErrorMsg('You must agree to the Terms of Service to create an account.');
      return;
    }

    setLoading(true);

    try {
      // Register dynamic user into persistent data store
      const registeredUser = registerUser({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      });

      onSignupSuccess?.(registeredUser, `token_${registeredUser.id}`);
      localStorage.setItem('hasSignedUpBefore', 'true');
      alert(`Welcome ${registeredUser.fullName}! Account created successfully.`);
      setFormData({ fullName: '', email: '', password: '', confirmPassword: '', agreeToTerms: false });
      onClose();
    } catch (err) {
      console.error('Registration error:', err);
      setErrorMsg(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Form Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-md max-h-[90vh] overflow-auto rounded-none bg-white p-8 border border-slate-200"
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              whileHover={{ y: -4, x: -4 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-4 top-4 rounded-full bg-white p-2 text-[#FF9100] border border-slate-200 transition hover:bg-slate-50"
              aria-label="Close signup form"
            >
              <X size={20} />
            </motion.button>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-black tracking-tight text-slate-800">
                Create Your Account
              </h2>
              <p className="mt-2 text-sm text-slate-800">
                Join VeeruProAc and start learning today
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 rounded-none bg-white p-3 text-sm text-[#FF9100] border border-slate-200">
                {errorMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-800 mb-1.5">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className="w-full rounded-none border border-slate-200 bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 transition focus:border-[#FF9100] focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-800 mb-1.5">
                  Email Address
                </label>
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

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-800 mb-1.5">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                  className="w-full rounded-none border border-slate-200 bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 transition focus:border-[#FF9100] focus:outline-none"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-800 mb-1.5">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className="w-full rounded-none border border-slate-200 bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 transition focus:border-[#FF9100] focus:outline-none"
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  id="agreeToTerms"
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                  className="mt-1 rounded-none border border-slate-200 bg-white text-[#FF9100] focus:ring-0 focus:outline-none"
                />
                <label htmlFor="agreeToTerms" className="text-xs text-slate-800">
                  I agree to the{' '}
                  <a href="#" className="font-medium text-[#FF9100] hover:text-[#FF9100]">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-medium text-[#FF9100] hover:text-[#FF9100]">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-none bg-[#FF9100] py-3 font-semibold text-white transition-all border border-[#FF9100]"
              >
                Create Account
              </motion.button>

              {/* Login Link */}
              <p className="text-center text-sm text-slate-800 pt-2">
                Already have an account?{' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    onOpenLogin?.();
                  }}
                  className="font-medium text-[#FF9100] hover:text-[#FF9100]"
                >
                  Log in
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SignupForm;
