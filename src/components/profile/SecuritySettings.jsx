import React, { useState } from 'react';
import { Shield, Key, Smartphone, Laptop, AlertTriangle } from 'lucide-react';

const SecuritySettings = ({ profile }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    alert('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const loginHistory = [
    { id: 1, device: 'Windows 11, Chrome', location: 'Hyderabad, India', time: 'Active now', isCurrent: true, icon: Laptop },
    { id: 2, device: 'iPhone 14, Safari', location: 'Hyderabad, India', time: '2 days ago', isCurrent: false, icon: Smartphone },
  ];

  return (
    <div className="space-y-8">
      
      {/* Password Change */}
      <div className="rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)]">
        <div className="mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            Change Password
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Ensure your account is using a long, random password to stay secure.</p>
        </div>

        <form onSubmit={handlePasswordUpdate} className="space-y-6 max-w-lg">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Current Password</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-none border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-sm focus:border-primary focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition"
            />
          </div>
          <button
            type="submit"
            className="rounded-none bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] transition hover:bg-primary"
          >
            Update Password
          </button>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)]">
        <div className="mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-500" />
            Two-Factor Authentication (2FA)
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Add additional security to your account using two-factor authentication.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-none border border-emerald-100 bg-emerald-50/50">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Authenticator App</h3>
            <p className="text-sm text-[#7C3AED] mt-1">Use an app like Google Authenticator to get 2FA codes.</p>
          </div>
          <button className="whitespace-nowrap rounded-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] transition hover:bg-slate-50 dark:bg-slate-800 hover:text-primary">
            Enable 2FA
          </button>
        </div>
      </div>

      {/* Login History */}
      <div className="rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)]">
        <div className="mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Login History</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Recent devices that have logged into your account.</p>
        </div>

        <div className="space-y-4">
          {loginHistory.map(session => (
            <div key={session.id} className="flex items-center justify-between gap-4 p-4 rounded-none border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:bg-slate-800 transition">
              <div className="flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${session.isCurrent ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                  <session.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                    {session.device} {session.isCurrent && <span className="ml-2 inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">Current</span>}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{session.location} • {session.time}</p>
                </div>
              </div>
              {!session.isCurrent && (
                <button className="text-sm font-semibold text-red-600 hover:text-red-700">
                  Log out
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-none border border-red-200 bg-red-50/30 p-6 sm:p-8 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)]">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-red-700 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </h2>
          <p className="mt-1 text-sm text-red-600/80">Once you delete your account, there is no going back. Please be certain.</p>
        </div>
        <button className="rounded-none border border-red-200 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-red-600 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] transition hover:bg-red-50 hover:border-red-300">
          Delete Account
        </button>
      </div>

    </div>
  );
};

export default SecuritySettings;
