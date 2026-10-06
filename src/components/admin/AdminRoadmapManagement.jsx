import React, { useState, useEffect } from 'react';
import { getRoadmaps, saveRoadmap, deleteRoadmap } from '../../lib/dataStore';
import { Plus, Edit, Trash2, Search, X, Map, GitMerge, FileText, CheckCircle } from 'lucide-react';

const AdminRoadmapManagement = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoadmap, setEditingRoadmap] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    steps: [],
    status: 'Draft'
  });

  const loadRoadmaps = () => {
    const stored = getRoadmaps().map(r => ({
      ...r,
      status: r.status || 'Published',
      enrolled: r.enrolled || Math.floor(Math.random() * 500) + 50
    }));
    setRoadmaps(stored);
  };

  useEffect(() => {
    loadRoadmaps();
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredRoadmaps = roadmaps.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setEditingRoadmap(null);
    setFormData({ title: '', description: '', steps: [], status: 'Draft' });
    setIsModalOpen(true);
  };

  const openEditModal = (roadmap) => {
    setEditingRoadmap(roadmap);
    setFormData({ 
      title: roadmap.title, 
      description: roadmap.description,
      steps: roadmap.steps || [],
      status: roadmap.status || 'Published'
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this roadmap?')) {
      deleteRoadmap(id);
      loadRoadmaps();
    }
  };

  const handleAddStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, { title: '', desc: '', estimatedTime: '', isMilestone: false, isCompleted: false }]
    });
  };

  const handleStepChange = (index, field, value) => {
    const newSteps = [...formData.steps];
    newSteps[index][field] = value;
    setFormData({ ...formData, steps: newSteps });
  };

  const handleRemoveStep = (index) => {
    const newSteps = formData.steps.filter((_, i) => i !== index);
    setFormData({ ...formData, steps: newSteps });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const roadmapToSave = editingRoadmap 
      ? { ...editingRoadmap, ...formData }
      : { id: `roadmap-${Date.now()}`, ...formData, enrolled: 0 };
    
    saveRoadmap(roadmapToSave);
    loadRoadmaps();
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Roadmap Management</h1>
          <p className="text-gray-500 mt-1 font-medium">Design and manage structured learning paths.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-primary hover:bg-primary-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
        >
          <Plus className="w-5 h-5" /> Create Roadmap
        </button>
      </div>

      {/* Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all w-full sm:w-96">
          <Search className="w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search roadmaps..." 
            value={searchTerm}
            onChange={handleSearch}
            className="bg-transparent border-none outline-none text-sm w-full text-gray-900 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
                <th className="p-4 font-bold">Roadmap</th>
                <th className="p-4 font-bold">Steps & Content</th>
                <th className="p-4 font-bold">Enrollment</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoadmaps.length > 0 ? filteredRoadmaps.map((r) => (
                <tr key={r.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-sm">
                        <Map className="w-6 h-6" />
                      </div>
                      <div className="max-w-[250px]">
                        <p className="text-sm font-bold text-gray-900">{r.title}</p>
                        <p className="text-xs text-gray-500 truncate mt-1">{r.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg bg-mint/30 text-primary border border-mint/50">
                        <GitMerge className="w-3.5 h-3.5" />
                        {r.steps?.length || 0} Steps
                      </span>
                      <span className="text-xs text-gray-500 font-medium">{r.steps?.filter(s => s.isMilestone).length || 0} Milestones</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-bold text-gray-900">{r.enrolled} <span className="text-xs font-medium text-gray-500">students</span></p>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${
                      r.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openEditModal(r)}
                        className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" 
                        title="Edit Roadmap"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(r.id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" 
                        title="Delete Roadmap"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-sm text-gray-400">
                    <div className="flex flex-col items-center justify-center">
                      <Map className="w-12 h-12 mb-3 opacity-20 text-gray-400" />
                      <p className="text-lg font-medium text-gray-500">No roadmaps found</p>
                      <p className="text-sm mt-1">Create a new roadmap to guide students.</p>
                    </div>
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
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl relative my-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                <Map className="w-5 h-5 text-primary" />
                {editingRoadmap ? 'Edit Roadmap' : 'Create New Roadmap'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Roadmap Title</label>
                    <input 
                      type="text" 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900"
                      placeholder="e.g. Fullstack Developer Track"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Description</label>
                    <textarea 
                      required
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900"
                      placeholder="Describe what students will achieve in this path..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Visibility Status</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-900"
                    >
                      <option>Draft</option>
                      <option>Published</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-bold text-gray-700">Roadmap Steps ({formData.steps.length})</label>
                    <button type="button" onClick={handleAddStep} className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 hover:bg-primary/20 transition-colors">
                      <Plus className="w-3.5 h-3.5"/> Add Step
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {formData.steps.map((step, index) => (
                      <div key={index} className="p-4 rounded-xl border border-gray-200 bg-gray-50 relative">
                        <div className="absolute -left-2.5 -top-2.5 bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white shadow-sm">
                          {index + 1}
                        </div>
                        <div className="flex justify-between mb-3 ml-2">
                          <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            {step.isMilestone && <CheckCircle className="w-4 h-4 text-orange-500" />}
                            Step Details
                          </span>
                          <button type="button" onClick={() => handleRemoveStep(index)} className="text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="space-y-3">
                          <input 
                            type="text" placeholder="Step Title (e.g. HTML & CSS Basics)" value={step.title} onChange={e => handleStepChange(index, 'title', e.target.value)}
                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white text-gray-900" required
                          />
                          <input 
                            type="text" placeholder="Short description..." value={step.desc} onChange={e => handleStepChange(index, 'desc', e.target.value)}
                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white text-gray-900" required
                          />
                          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                            <div className="flex-1 w-full">
                              <input 
                                type="text" placeholder="Est. Time (e.g. 2 Weeks)" value={step.estimatedTime || ''} onChange={e => handleStepChange(index, 'estimatedTime', e.target.value)}
                                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white text-gray-900"
                              />
                            </div>
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-white px-3 py-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                              <input type="checkbox" checked={step.isMilestone || false} onChange={e => handleStepChange(index, 'isMilestone', e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                              Mark as Milestone
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                    {formData.steps.length === 0 && (
                      <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                        <FileText className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                        <p className="text-sm font-medium text-gray-500">No steps added yet.</p>
                        <p className="text-xs text-gray-400 mt-1">Click "Add Step" to begin building your roadmap.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              <div className="pt-6 mt-6 flex gap-3 justify-end border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-primary hover:bg-primary-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center transition-colors shadow-sm hover:shadow-md"
                >
                  {editingRoadmap ? 'Save Changes' : 'Create Roadmap'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRoadmapManagement;
