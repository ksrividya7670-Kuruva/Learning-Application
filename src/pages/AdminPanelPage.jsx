import React, { useState } from 'react';
import { Users, BookOpen, BarChart3, Settings, Edit, Trash2, Plus } from 'lucide-react';

const AdminPanelPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Total Users', value: '14,205', icon: Users, color: 'text-[#FB6C00]' },
    { label: 'Active Courses', value: '34', icon: BookOpen, color: 'text-slate-500 dark:text-slate-400' },
    { label: 'Revenue (MTD)', value: '$45,230', icon: BarChart3, color: 'text-[#7C3AED]' },
  ];

  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', role: 'Pro Member', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Student', status: 'Inactive' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Admin', status: 'Active' },
  ];

  const mockCourses = [
    { id: 1, title: 'Full-Stack Web Development', students: 3420, rating: 4.8 },
    { id: 2, title: 'Python for Data Science', students: 2150, rating: 4.9 },
    { id: 3, title: 'UI/UX Design Masterclass', students: 1890, rating: 4.7 },
  ];

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would validate credentials via an API
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-800 flex items-center justify-center font-sans p-6">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-slate-100 shadow-[8px_8px_0px_0px_#0F172A] p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Admin Access</h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">
              {authMode === 'login' ? 'Secure Login to Dashboard' : 'Register New Admin Account'}
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-6">
            {authMode === 'signup' && (
              <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. John Admin"
                  className="w-full px-4 py-3 border-2 border-slate-900 dark:border-slate-100 focus:outline-none focus:ring-0 focus:border-[#7C3AED] transition-colors bg-slate-50 dark:bg-slate-800 focus:bg-white dark:bg-slate-900"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide mb-2">Admin Email</label>
              <input 
                type="email" 
                required
                placeholder="admin@veeruproac.com"
                className="w-full px-4 py-3 border-2 border-slate-900 dark:border-slate-100 focus:outline-none focus:ring-0 focus:border-[#7C3AED] transition-colors bg-slate-50 dark:bg-slate-800 focus:bg-white dark:bg-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide mb-2">Secret Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-slate-900 dark:border-slate-100 focus:outline-none focus:ring-0 focus:border-[#7C3AED] transition-colors bg-slate-50 dark:bg-slate-800 focus:bg-white dark:bg-slate-900"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[#7C3AED] text-white font-black uppercase tracking-widest px-6 py-4 border-2 border-slate-900 dark:border-slate-100 shadow-[4px_4px_0px_0px_#0F172A] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_#0F172A] transition-all cursor-pointer"
            >
              {authMode === 'login' ? 'Authenticate' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center border-t-2 border-slate-100 dark:border-slate-800 pt-6">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
              {authMode === 'login' ? "Don't have an admin account?" : "Already have an admin account?"}
              <button 
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                className="ml-2 text-[#7C3AED] hover:underline cursor-pointer uppercase tracking-wider"
              >
                {authMode === 'login' ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r-2 border-slate-900 dark:border-slate-100 md:min-h-screen flex flex-col">
        <div className="p-6 border-b-2 border-slate-900 dark:border-slate-100 bg-slate-900">
          <h2 className="text-xl font-black text-white uppercase tracking-tight">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 font-bold uppercase tracking-wide text-sm transition-all border-2 border-transparent hover:border-slate-900 dark:border-slate-100 hover:bg-slate-50 dark:bg-slate-800 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#0F172A] ${
              activeTab === 'dashboard' ? 'bg-[#7C3AED] text-white border-slate-900 dark:border-slate-100 shadow-[4px_4px_0px_0px_#0F172A]' : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            <BarChart3 className="w-5 h-5" /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 font-bold uppercase tracking-wide text-sm transition-all border-2 border-transparent hover:border-slate-900 dark:border-slate-100 hover:bg-slate-50 dark:bg-slate-800 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#0F172A] ${
              activeTab === 'users' ? 'bg-[#7C3AED] text-white border-slate-900 dark:border-slate-100 shadow-[4px_4px_0px_0px_#0F172A]' : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            <Users className="w-5 h-5" /> Users
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`w-full flex items-center gap-3 px-4 py-3 font-bold uppercase tracking-wide text-sm transition-all border-2 border-transparent hover:border-slate-900 dark:border-slate-100 hover:bg-slate-50 dark:bg-slate-800 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#0F172A] ${
              activeTab === 'courses' ? 'bg-[#7C3AED] text-white border-slate-900 dark:border-slate-100 shadow-[4px_4px_0px_0px_#0F172A]' : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            <BookOpen className="w-5 h-5" /> Courses
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 font-bold uppercase tracking-wide text-sm transition-all border-2 border-transparent hover:border-slate-900 dark:border-slate-100 hover:bg-slate-50 dark:bg-slate-800 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#0F172A] ${
              activeTab === 'settings' ? 'bg-[#7C3AED] text-white border-slate-900 dark:border-slate-100 shadow-[4px_4px_0px_0px_#0F172A]' : 'text-slate-700 dark:text-slate-200'
            }`}
          >
            <Settings className="w-5 h-5" /> Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10">
        
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in slide-in-bg-primary duration-500">
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Overview</h1>
              <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-sm mt-1">Platform metrics at a glance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-100 p-6 shadow-[6px_6px_0px_0px_#0F172A] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_#7C3AED] transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className={`p-4 border-2 border-slate-900 dark:border-slate-100 ${stat.color} bg-slate-50 dark:bg-slate-800`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</p>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">{stat.value}</h3>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-100 p-6 shadow-[6px_6px_0px_0px_#0F172A]">
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b-2 border-slate-100 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border-2 border-slate-900 dark:border-slate-100 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-[#7C3AED]" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">New User Registered</p>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Alex joined the platform</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-slate-400">2 mins ago</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-8 animate-in fade-in slide-in-bg-primary duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Manage Users</h1>
                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-sm mt-1">View and edit user accounts</p>
              </div>
              <button className="flex items-center gap-2 bg-[#7C3AED] text-white font-black uppercase tracking-widest px-6 py-3 border-2 border-slate-900 dark:border-slate-100 shadow-[4px_4px_0px_0px_#0F172A] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_#0F172A] transition-all cursor-pointer">
                <Plus className="w-5 h-5" /> Add User
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-100 shadow-[6px_6px_0px_0px_#0F172A] overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white uppercase tracking-wider text-sm font-black">
                    <th className="p-4 border-b-2 border-slate-900 dark:border-slate-100">Name</th>
                    <th className="p-4 border-b-2 border-slate-900 dark:border-slate-100">Email</th>
                    <th className="p-4 border-b-2 border-slate-900 dark:border-slate-100">Role</th>
                    <th className="p-4 border-b-2 border-slate-900 dark:border-slate-100">Status</th>
                    <th className="p-4 border-b-2 border-slate-900 dark:border-slate-100 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((u) => (
                    <tr key={u.id} className="border-b-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:bg-slate-800 transition-colors">
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{u.name}</td>
                      <td className="p-4 font-medium text-[#7C3AED]">{u.email}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-xs font-black uppercase tracking-wider border-2 border-slate-900 dark:border-slate-100 ${
                          u.role === 'Admin' ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200' : u.role === 'Pro Member' ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`flex items-center gap-2 font-bold text-sm ${u.status === 'Active' ? 'text-[#7C3AED]' : 'text-slate-400'}`}>
                          <div className={`w-2.5 h-2.5 rounded-full border-2 border-slate-900 dark:border-slate-100 ${u.status === 'Active' ? 'bg-[#7C3AED]' : 'bg-slate-300'}`}></div>
                          {u.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button className="p-2 border-2 border-slate-900 dark:border-slate-100 text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-colors cursor-pointer" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 border-2 border-slate-900 dark:border-slate-100 text-[#7C3AED] hover:bg-orange-100 hover:text-white transition-colors cursor-pointer" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-8 animate-in fade-in slide-in-bg-primary duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Manage Courses</h1>
                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-sm mt-1">Create and update content</p>
              </div>
              <button className="flex items-center gap-2 bg-[#7C3AED] text-white font-black uppercase tracking-widest px-6 py-3 border-2 border-slate-900 dark:border-slate-100 shadow-[4px_4px_0px_0px_#0F172A] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_#0F172A] transition-all cursor-pointer">
                <Plus className="w-5 h-5" /> New Course
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-100 shadow-[6px_6px_0px_0px_#0F172A] overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white uppercase tracking-wider text-sm font-black">
                    <th className="p-4 border-b-2 border-slate-900 dark:border-slate-100">Course Title</th>
                    <th className="p-4 border-b-2 border-slate-900 dark:border-slate-100">Enrolled</th>
                    <th className="p-4 border-b-2 border-slate-900 dark:border-slate-100">Rating</th>
                    <th className="p-4 border-b-2 border-slate-900 dark:border-slate-100 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCourses.map((c) => (
                    <tr key={c.id} className="border-b-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:bg-slate-800 transition-colors">
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{c.title}</td>
                      <td className="p-4 font-medium text-[#7C3AED]">{c.students.toLocaleString()} students</td>
                      <td className="p-4 font-bold text-slate-500 dark:text-slate-400">{c.rating} ★</td>
                      <td className="p-4 text-right space-x-2">
                        <button className="p-2 border-2 border-slate-900 dark:border-slate-100 text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-colors cursor-pointer" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 border-2 border-slate-900 dark:border-slate-100 text-[#7C3AED] hover:bg-orange-100 hover:text-white transition-colors cursor-pointer" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-8 animate-in fade-in slide-in-bg-primary duration-500">
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Platform Settings</h1>
              <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-sm mt-1">Configure global preferences</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-100 shadow-[6px_6px_0px_0px_#0F172A] p-6 max-w-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b-2 border-slate-100 dark:border-slate-800 pb-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Allow New Registrations</h3>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Enable or disable new user signups.</p>
                </div>
                <button className="w-14 h-8 bg-[#7C3AED] border-2 border-slate-900 dark:border-slate-100 rounded-full relative transition-colors cursor-pointer">
                  <div className="w-6 h-6 bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-100 rounded-full absolute right-0.5 top-0.5"></div>
                </button>
              </div>

              <div className="flex items-center justify-between border-b-2 border-slate-100 dark:border-slate-800 pb-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Maintenance Mode</h3>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Show maintenance page to all non-admin users.</p>
                </div>
                <button className="w-14 h-8 bg-slate-300 border-2 border-slate-900 dark:border-slate-100 rounded-full relative transition-colors cursor-pointer">
                  <div className="w-6 h-6 bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-100 rounded-full absolute left-0.5 top-0.5"></div>
                </button>
              </div>

              <div className="pt-2">
                <button className="w-full sm:w-auto bg-slate-900 text-white font-black uppercase tracking-widest px-8 py-3 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#7C3AED] transition-all cursor-pointer">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminPanelPage;

