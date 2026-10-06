import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, GraduationCap, Briefcase, 
  ShieldCheck, Award, Link, FileText, Bell, Activity, 
  Settings, Camera, Edit2, LogOut, ChevronRight
} from 'lucide-react';
import { getProfile, updateProfile } from '../../lib/api';
import ProfileDashboard from './ProfileDashboard';
import PersonalInfoForm from './PersonalInfoForm';
import ContactInfoForm from './ContactInfoForm';
import AcademicInfoForm from './AcademicInfoForm';
import SecuritySettings from './SecuritySettings';
import DocumentsManager from './DocumentsManager';

const TABS = [
  { id: 'dashboard', label: 'Activity Dashboard', icon: Activity },
  { id: 'personal', label: 'Personal Information', icon: User },
  { id: 'contact', label: 'Contact Details', icon: Phone },
  { id: 'academic', label: 'Academic/Professional', icon: GraduationCap },
  { id: 'security', label: 'Account & Security', icon: ShieldCheck },
  { id: 'documents', label: 'My Documents', icon: FileText },
  { id: 'preferences', label: 'Preferences', icon: Bell },
];

const UserProfileLayout = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64String = reader.result;
        setProfileData((prev) => ({ ...prev, avatarUrl: base64String }));
        await updateProfile({ ...profileData, avatarUrl: base64String });
      } catch (err) {
        console.error('Failed to update avatar:', err);
        alert('Failed to save profile picture.');
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Mock fetching profile data
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await getProfile();
        setProfileData(data);
      } catch (err) {
        setProfileData({ ...user, role: 'Student', status: 'Active' });
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchProfile();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg font-medium text-gray-600">Please log in to view your profile.</p>
      </div>
    );
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <ProfileDashboard profile={profileData} />;
      case 'personal':
        return <PersonalInfoForm profile={profileData} />;
      case 'contact':
        return <ContactInfoForm profile={profileData} />;
      case 'academic':
        return <AcademicInfoForm profile={profileData} />;
      case 'security':
        return <SecuritySettings profile={profileData} />;
      case 'documents':
        return <DocumentsManager profile={profileData} />;
      default:
        return (
          <div className="rounded-none border border-slate-200 bg-white dark:bg-slate-900 p-8 text-center shadow-none border border-slate-200">
            <h2 className="text-xl font-bold text-gray-800">Coming Soon</h2>
            <p className="mt-2 text-gray-600">This section is currently under construction.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Profile Header Card */}
        <div className="mb-8 rounded-none border border-slate-200 bg-white dark:bg-slate-900 p-6 shadow-none border border-slate-200 sm:p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            
            {/* Avatar Section */}
            <div className="relative group">
              <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-none border border-slate-200 bg-[#FFFFFF] dark:bg-slate-800 flex items-center justify-center relative">
                {isUploading && (
                   <div className="absolute inset-0 bg-white flex items-center justify-center z-10 backdrop-blur-sm">
                     <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                   </div>
                )}
                {profileData?.avatarUrl ? (
                  <img src={profileData.avatarUrl} alt={profileData.fullName} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-4xl font-bold text-slate-400">
                    {profileData?.fullName?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
              />
              <button 
                onClick={handleAvatarClick}
                disabled={isUploading}
                title="Change Profile Picture"
                className="absolute bottom-0 right-0 rounded-full bg-slate-900 p-2.5 text-white shadow-none border border-slate-200 transition hover:bg-primary group-hover:-translate-y-1 hover:-translate-x-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>

            {/* User Info Section */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-gray-800 tracking-tight">
                    {profileData?.fullName || 'User Profile'}
                  </h1>
                  <p className="text-lg font-medium text-gray-600">{user?.email}</p>
                </div>
                <div className="flex gap-3 justify-center sm:justify-start">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {profileData?.role || 'Student'}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                    {profileData?.status || 'Active'}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-y-3 gap-x-8 text-sm text-[#FF9100]">
                <div className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-slate-400" />
                  {profileData?.personalEmail || user?.email}
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="h-4 w-4 text-slate-400" />
                  {profileData?.mobileNumber || 'Add Phone Number'}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  {profileData?.city || 'Location not set'}
                </div>
              </div>
            </div>
            
            {/* Quick Action */}
            <div className="hidden lg:block">
              {activeTab === 'personal' ? (
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="flex items-center gap-2 rounded-none bg-[#FFFFFF] dark:bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-none border border-slate-200 border border-slate-300 transition hover:bg-slate-200 cursor-pointer"
                >
                  <Activity className="h-4 w-4" />
                  View Dashboard
                </button>
              ) : (
                <button 
                  onClick={() => setActiveTab('personal')}
                  className="flex items-center gap-2 rounded-none bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-none border border-slate-200 transition hover:bg-[#FF9100] cursor-pointer"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="flex flex-col gap-8 lg:flex-row">
          
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-24 overflow-hidden rounded-none border border-slate-200 bg-white dark:bg-slate-900 shadow-none border border-slate-200">
              <div className="hidden lg:block p-4 border-b border-slate-100 bg-[#FFFFFF]">
                <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Profile Navigation</h3>
              </div>
              <nav className="flex overflow-x-auto lg:block p-2 gap-2 lg:space-y-1 lg:gap-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 lg:w-full flex items-center lg:justify-between rounded-none px-4 py-2.5 lg:py-3 text-sm font-semibold transition-all ${
                        isActive 
                          ? 'bg-primary text-white shadow-none border border-slate-200' 
                          : 'text-[#FF9100] bg-[#FFFFFF] dark:bg-slate-800 lg:bg-transparent border border-slate-200 lg:border-transparent hover:bg-[#FFFFFF] dark:bg-slate-800 hover:text-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 lg:gap-3">
                        <Icon className={`h-4 w-4 lg:h-5 lg:w-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span className="whitespace-nowrap">{tab.label}</span>
                      </div>
                      {isActive && <ChevronRight className="hidden lg:block h-4 w-4 opacity-70" />}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Dynamic Content Area */}
          <div className="flex-1 min-w-0">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileLayout;

