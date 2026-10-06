import React from 'react';
import { BookOpen, Award, Clock, CheckCircle2, LogIn, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileDashboard = ({ profile }) => {
  // Mock data for the dashboard
  const completionPercentage = 65;
  
  const stats = [
    { label: 'Courses Enrolled', value: '4', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Completed', value: '2', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Certificates', value: '1', icon: Award, color: 'text-slate-500 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-slate-800' },
    { label: 'Learning Hours', value: '32h', icon: Clock, color: 'text-slate-500 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-slate-800' },
  ];

  const recentActivity = [
    { id: 1, action: 'Logged in from Windows (Chrome)', time: '2 hours ago', icon: LogIn },
    { id: 2, action: 'Completed module: Advanced React Patterns', time: '1 day ago', icon: TrendingUp },
    { id: 3, action: 'Updated Personal Information', time: '3 days ago', icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-8">
      
      {/* Profile Completion Card */}
      <div className="rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Profile Completion</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Complete your profile to unlock all features.</p>
          </div>
          <span className="text-2xl font-black text-primary">{completionPercentage}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full bg-primary"
          />
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
            ✓ Basic Info
          </span>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
            ✓ Email Verified
          </span>
          <span className="inline-flex items-center rounded-full bg-slate-50 dark:bg-slate-800 px-2.5 py-1 text-xs font-medium text-[#7C3AED] ring-1 ring-inset ring-slate-500/10">
            Pending: Academic Info
          </span>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] flex flex-col items-center justify-center text-center">
            <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <span className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</span>
            <span className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] overflow-hidden">
        <div className="border-b border-slate-100 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-800/50">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {recentActivity.map((activity, idx) => (
              <div key={activity.id} className="relative flex gap-4">
                {/* Timeline line */}
                {idx !== recentActivity.length - 1 && (
                  <span className="absolute left-5 top-10 -ml-px h-full w-0.5 bg-slate-200 dark:bg-slate-700" aria-hidden="true"></span>
                )}
                
                <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 ring-8 ring-white">
                  <activity.icon className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                </div>
                
                <div className="flex min-w-0 flex-1 justify-between gap-4 pt-1.5">
                  <div>
                    <p className="text-sm text-slate-900 dark:text-white font-medium">{activity.action}</p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-slate-500 dark:text-slate-400">
                    <time>{activity.time}</time>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ProfileDashboard;

