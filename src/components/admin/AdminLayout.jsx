import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, UserCog, GraduationCap, BookOpen, 
  Layers, Map, FileText, CheckSquare, Code2, ClipboardList, 
  Award, CreditCard, Star, Bell, MessageSquare, BarChart, 
  HelpCircle, Download, Image, PenTool, Ticket, LifeBuoy, 
  Shield, Activity, Settings, User, LogOut, Menu, X, Search
} from 'lucide-react';
import Logo from '../Logo';

const MENU_ITEMS = [
  { group: 'Overview', items: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Progress & Analytics', icon: BarChart },
  ]},
  { group: 'Content', items: [
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'lessons', label: 'Lessons', icon: FileText },
    { id: 'quizzes', label: 'Quizzes', icon: CheckSquare },
    { id: 'practice', label: 'Practice', icon: Code2 },
    { id: 'roadmaps', label: 'Roadmaps', icon: Map },
    { id: 'interview-prep', label: 'Interview Preparation', icon: ClipboardList },
  ]},
  { group: 'Users', items: [
    { id: 'students', label: 'Students', icon: GraduationCap },
    { id: 'instructors', label: 'Instructors', icon: UserCog },
  ]},
  { group: 'Communication', items: [
    { id: 'feedback', label: 'Feedback', icon: Star },
    { id: 'announcements', label: 'Announcements', icon: MessageSquare },
  ]},
  { group: 'System', items: [
    { id: 'settings', label: 'Settings', icon: Settings },
  ]}
];

const AdminLayout = ({ children, activeMenu, onNavigate, onLogout, onLogoClick }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans p-6 bg-orange-50">
        <div className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Access</h1>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              {authMode === 'login' ? 'Secure Login to Dashboard' : 'Register New Admin Account'}
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-6">
            {authMode === 'signup' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. John Admin"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Email</label>
              <input 
                type="email" 
                required
                placeholder="admin@coursehub.com"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Secret Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-white font-bold px-6 py-4 rounded-xl hover:bg-primary-600 transition-all shadow-md hover:shadow-lg"
            >
              {authMode === 'login' ? 'Authenticate' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-gray-100 pt-6">
            <p className="text-sm font-medium text-gray-500">
              {authMode === 'login' ? "Don't have an admin account?" : "Already have an admin account?"}
              <button 
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                className="ml-2 text-primary hover:underline font-semibold"
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
    <div className="flex h-screen overflow-hidden bg-orange-50 text-gray-800 font-sans">
      
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full shrink-0 border-r bg-white border-gray-200 z-20"
          >
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
              <button onClick={onLogoClick} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg">C</div>
                <span className="font-bold text-xl text-gray-900 tracking-tight">CourseHub</span>
              </button>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
              {MENU_ITEMS.map((group, gIdx) => (
                <div key={gIdx} className="mb-6">
                  <h3 className="px-6 mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                    {group.group}
                  </h3>
                  <div className="space-y-1 px-3">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeMenu === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => onNavigate(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                            isActive 
                              ? 'bg-primary/10 text-primary' 
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center border border-orange-200 shrink-0">
                  <span className="text-orange-700 font-bold">A</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">Admin</p>
                  <p className="text-xs text-gray-500 truncate">Administrator</p>
                </div>
              </div>
              <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2 mt-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b shrink-0 bg-white border-gray-200 z-10">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors">
                <Menu className="w-5 h-5" />
              </button>
            )}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-transparent border-none outline-none text-sm w-64 text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-9 w-9 rounded-full bg-orange-100 flex items-center justify-center cursor-pointer border border-orange-200 overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all">
              <span className="text-orange-700 font-bold text-sm">A</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
