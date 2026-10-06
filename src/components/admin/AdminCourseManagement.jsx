import React, { useState, useEffect } from 'react';
import { getCourses, saveCourse, deleteCourse } from '../../lib/dataStore';
import { Plus, Edit, Trash2, Search, X, Copy, Eye, Globe, Lock } from 'lucide-react';

const AdminCourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  
  const initialFormState = {
    title: '',
    description: '',
    thumbnail: '',
    category: 'Web Development',
    instructor: 'Alex Developer',
    difficulty: 'Beginner',
    duration: '10 Weeks',
    objectives: '',
    prerequisites: '',
    status: 'Draft',
    color: 'bg-primary/10 text-primary'
  };

  const [formData, setFormData] = useState(initialFormState);

  const loadCourses = () => {
    const stored = getCourses().map(c => ({
      ...c,
      category: c.category || 'Web Development',
      instructor: c.instructor || 'Alex Developer',
      lessons: c.lessons || 12,
      status: c.status || 'Published',
      lastUpdated: c.lastUpdated || '2 days ago'
    }));
    setCourses(stored);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (c.category && c.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openAddModal = () => {
    setEditingCourse(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setFormData({ ...initialFormState, ...course });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourse(id);
      loadCourses();
    }
  };

  const handleDuplicate = (course) => {
    const newCourse = { ...course, id: Date.now().toString(), title: `${course.title} (Copy)`, status: 'Draft' };
    saveCourse(newCourse);
    loadCourses();
  };

  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'Published' ? 'Draft' : 'Published';
    const target = courses.find(c => c.id === id);
    if (target) {
      saveCourse({ ...target, status: newStatus });
      loadCourses();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseToSave = editingCourse 
      ? { ...editingCourse, ...formData }
      : { id: Date.now().toString(), ...formData, students: 0, rating: 5.0, lastUpdated: 'Just now' };
    
    saveCourse(courseToSave);
    loadCourses();
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Course Management</h1>
          <p className="text-gray-500 mt-1 font-medium">Create, edit, and organize all courses.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-primary hover:bg-primary-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
        >
          <Plus className="w-5 h-5" /> Add New Course
        </button>
      </div>

      {/* Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all w-full sm:w-96">
          <Search className="w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by course name or category..." 
            value={searchTerm}
            onChange={handleSearch}
            className="bg-transparent border-none outline-none text-sm w-full text-gray-900 placeholder-gray-400"
          />
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <select className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-primary/20">
            <option>All Categories</option>
            <option>Web Development</option>
            <option>Data Science</option>
            <option>Design</option>
          </select>
          <select className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-primary/20">
            <option>All Statuses</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                <th className="p-4 font-bold">Course</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Instructor</th>
                <th className="p-4 font-bold">Metrics</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold">Last Updated</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.length > 0 ? filteredCourses.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold shadow-sm">
                        {c.title.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{c.title}</p>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">{c.difficulty || 'Beginner'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600 font-medium">{c.category}</td>
                  <td className="p-4 text-sm text-gray-600 font-medium">{c.instructor}</td>
                  <td className="p-4 text-sm">
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-900 font-bold">{(c.students || 0).toLocaleString()} <span className="text-gray-500 font-medium text-xs">students</span></span>
                      <span className="text-gray-900 font-bold">{c.lessons || 0} <span className="text-gray-500 font-medium text-xs">lessons</span></span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
                      c.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500 font-medium">{c.lastUpdated}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openEditModal(c)}
                        className="p-2 rounded-lg text-gray-400 hover:text-orange-600 hover:bg-orange-50 transition-colors" 
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDuplicate(c)}
                        className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" 
                        title="Duplicate"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => toggleStatus(c.id, c.status)}
                        className="p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors" 
                        title={c.status === 'Published' ? 'Unpublish' : 'Publish'}
                      >
                        {c.status === 'Published' ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => handleDelete(c.id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" 
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <BookOpen className="w-12 h-12 mb-3 opacity-20" />
                      <p className="text-lg font-medium text-gray-500">No courses found</p>
                      <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full Screen Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl relative my-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {editingCourse ? 'Edit Course' : 'Create New Course'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                
                <div className="space-y-5 md:col-span-2">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Course Title</label>
                    <input 
                      type="text" 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900"
                      placeholder="e.g. Full-Stack Web Development Masterclass"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Short Description</label>
                    <textarea 
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900"
                      placeholder="Brief overview of what students will learn..."
                    />
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900"
                    >
                      <option>Web Development</option>
                      <option>Data Science</option>
                      <option>Mobile App</option>
                      <option>Design</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Instructor</label>
                    <select 
                      value={formData.instructor}
                      onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900"
                    >
                      <option>Alex Developer</option>
                      <option>Sarah Designer</option>
                      <option>Mike Data</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Difficulty Level</label>
                    <select 
                      value={formData.difficulty}
                      onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                      <option>All Levels</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Thumbnail URL</label>
                    <input 
                      type="text" 
                      value={formData.thumbnail}
                      onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Duration</label>
                    <input 
                      type="text" 
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900"
                      placeholder="e.g. 40 Hours or 12 Weeks"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Status</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900"
                    >
                      <option>Draft</option>
                      <option>Published</option>
                      <option>Archived</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-5 md:col-span-2">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Learning Objectives (One per line)</label>
                    <textarea 
                      rows={4}
                      value={formData.objectives}
                      onChange={(e) => setFormData({...formData, objectives: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900"
                      placeholder="Understand React Hooks&#10;Build full-stack applications&#10;Deploy to Vercel"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Prerequisites</label>
                    <textarea 
                      rows={2}
                      value={formData.prerequisites}
                      onChange={(e) => setFormData({...formData, prerequisites: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900"
                      placeholder="Basic HTML, CSS, and JavaScript knowledge."
                    />
                  </div>
                </div>

              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex gap-3 justify-end">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-primary hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-sm hover:shadow-md"
                >
                  {editingCourse ? 'Save Changes' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourseManagement;
