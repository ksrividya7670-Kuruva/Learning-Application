import React, { useState, useEffect } from 'react';
import { getUsers, saveUser, deleteUser } from '../../lib/dataStore';
import { Plus, Edit, Trash2, Search, X, Mail, Eye, Activity, ShieldAlert, CheckCircle2, User as UserIcon } from 'lucide-react';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'Active'
  });

  const loadUsers = () => {
    const allUsers = getUsers();
    const formatted = allUsers.map(u => ({
      ...u,
      name: u.fullName || u.name || u.email.split('@')[0],
      joinedDate: u.joinedDate || '2026-01-10',
      enrolledCourses: u.enrolledCourses ? (Array.isArray(u.enrolledCourses) ? u.enrolledCourses.length : u.enrolledCourses) : 1,
      completionPercentage: u.completionPercentage !== undefined ? u.completionPercentage : 25,
      lastActive: u.lastActive || 'Active today'
    }));
    setUsers(formatted);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredUsers = users.filter(u => 
    (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', status: 'Active' });
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({ 
      name: user.name || user.fullName, 
      email: user.email, 
      status: user.status || 'Active' 
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student account? This cannot be undone.')) {
      deleteUser(id);
      loadUsers();
    }
  };

  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    const targetUser = users.find(u => u.id === id);
    if (targetUser) {
      saveUser({ ...targetUser, status: newStatus });
      loadUsers();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userToSave = editingUser 
      ? { ...editingUser, fullName: formData.name, name: formData.name, email: formData.email, status: formData.status }
      : { 
          id: Date.now().toString(), 
          fullName: formData.name,
          name: formData.name,
          email: formData.email,
          status: formData.status,
          role: 'Student', 
          joinedDate: new Date().toISOString().split('T')[0], 
          enrolledCourses: 0, 
          completionPercentage: 0, 
          lastActive: 'Just now' 
        };
    
    saveUser(userToSave);
    loadUsers();
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Student Management</h1>
          <p className="text-gray-500 mt-1 font-medium">Manage student accounts, progress, and activity.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-primary hover:bg-primary-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
        >
          <Plus className="w-5 h-5" /> Add Student
        </button>
      </div>

      {/* Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all w-full sm:w-96">
          <Search className="w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search students by name or email..." 
            value={searchTerm}
            onChange={handleSearch}
            className="bg-transparent border-none outline-none text-sm w-full text-gray-900 placeholder-gray-400"
          />
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <select className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-primary/20">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Suspended</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                <th className="p-4 font-bold">Student Details</th>
                <th className="p-4 font-bold">Activity Metrics</th>
                <th className="p-4 font-bold">Progress</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? filteredUsers.map((u) => (
                <tr key={u.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold border border-primary/20">
                      {u.name.substring(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{u.name}</p>
                      <p className="text-xs flex items-center gap-1 mt-1 text-gray-500 font-medium">
                        <Mail className="w-3 h-3" /> {u.email}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">Joined: {u.joinedDate}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-900 font-bold text-sm">{u.enrolledCourses} <span className="text-gray-500 font-medium text-xs">courses enrolled</span></span>
                      <span className="text-gray-500 font-medium text-xs flex items-center gap-1">
                        <Activity className="w-3 h-3" /> Last active: {u.lastActive}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="w-full max-w-[150px]">
                      <div className="flex justify-between text-xs font-bold mb-1 text-gray-700">
                        <span>Completion</span>
                        <span>{u.completionPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full" 
                          style={{ width: `${u.completionPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
                      u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors" title="View Profile">
                        <UserIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg text-gray-400 hover:text-orange-600 hover:bg-orange-50 transition-colors" title="View Progress">
                        <Activity className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openEditModal(u)}
                        className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" 
                        title="Edit Student"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => toggleStatus(u.id, u.status)}
                        className="p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors" 
                        title={u.status === 'Active' ? 'Suspend Student' : 'Activate Student'}
                      >
                        {u.status === 'Active' ? <ShieldAlert className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => handleDelete(u.id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" 
                        title="Delete Student"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-sm text-gray-400">
                    No students found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl relative my-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-primary" />
                {editingUser ? 'Edit Student Details' : 'Add New Student'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900"
                  placeholder="e.g. Jane Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Account Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900"
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3 justify-end border-t border-gray-100 mt-6">
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
                  {editingUser ? 'Save Changes' : 'Create Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;
