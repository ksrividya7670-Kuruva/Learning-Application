import React, { useState } from 'react';
import { User, Shield, Key, Mail, Phone, Activity, Clock, LogOut, CheckCircle2, MapPin, X } from 'lucide-react';

const AdminProfile = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('admin@veeruproac.com');
  const [phone, setPhone] = useState('+1 (555) 000-0000');

  const handleSaveDetails = (e) => {
    e.preventDefault();
    setShowEditModal(false);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    setShowPasswordModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-bg-primary duration-500 relative">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Admin Profile</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your administrator account settings and security</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - ID Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="h-28 w-28 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-4 border-white shadow-md ring-2 ring-slate-100">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=60" alt="Admin" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-1 right-1 h-5 w-5 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">John Admin</h2>
              <p className="text-sm font-medium text-[#7C3AED] mt-0.5 bg-[#7C3AED]/10 px-3 py-1 rounded-full">Super Administrator</p>
              
              <div className="w-full mt-6 space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Admin ID</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">ADM-001</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Status</span>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Joined</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">Jan 2024</span>
                </div>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setShowPasswordModal(true)}
            className="w-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-semibold px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Key className="w-4 h-4 text-slate-400" /> Change Password
          </button>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Contact Information */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
              <User className="w-5 h-5 text-[#7C3AED]" /> Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Email Address</label>
                <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-900 dark:text-white">{email}</span>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Phone Number</label>
                <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-900 dark:text-white">{phone}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setShowEditModal(true)}
                className="bg-[#7C3AED] text-white font-medium text-sm px-5 py-2.5 rounded-lg shadow-sm hover:bg-[#6D28D9] transition-colors cursor-pointer"
              >
                Edit Details
              </button>
            </div>
          </div>

          {/* Permissions */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#7C3AED]" /> System Permissions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Full System Access</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Manage Users & Instructors</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Financial Reports</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Course Approvals</span>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#7C3AED]" /> Recent Login Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-800">
                    <Clock className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">MacBook Pro - Safari</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> 192.168.1.1 (San Francisco, CA)
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">Current Session</span>
              </div>
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-800">
                    <Clock className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">iPhone 13 - Chrome Mobile</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> 104.28.1.2 (San Francisco, CA)
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">2 days ago</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Edit Details Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Edit Contact Details</h3>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-700 dark:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveDetails} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Phone Number</label>
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] outline-none transition-all"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl hover:bg-slate-50 dark:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-[#7C3AED] text-white font-semibold rounded-xl hover:bg-[#6D28D9] transition-colors shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Change Password</h3>
              <button onClick={() => setShowPasswordModal(false)} className="text-slate-400 hover:text-slate-700 dark:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSavePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Current Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">New Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Confirm New Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#7C3AED] focus:border-[#7C3AED] outline-none transition-all"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl hover:bg-slate-50 dark:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-[#7C3AED] text-white font-semibold rounded-xl hover:bg-[#6D28D9] transition-colors shadow-sm"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProfile;

