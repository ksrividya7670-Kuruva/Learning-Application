import React from 'react';
import { Code, Database, Brain, Network, Plus, Search, Edit2, Trash2 } from 'lucide-react';

const AdminPracticeManagement = () => {
  return (
    <div className="p-6 bg-[#FFFFFF] min-h-screen text-[#1F2937]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#FF9100]">Practice Management</h1>
        <button className="bg-[#FF9100] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#E68200] transition-colors">
          <Plus size={20} /> Add Problem
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {['Coding', 'SQL', 'Aptitude', 'DSA'].map(category => (
          <div key={category} className="bg-white p-4 rounded-xl shadow-sm border border-[#FFEDD5] flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow">
            <span className="font-semibold">{category}</span>
            <div className="p-2 bg-[#FFFFFF] rounded-lg text-[#FF9100]">
              {category === 'Coding' && <Code size={24} />}
              {category === 'SQL' && <Database size={24} />}
              {category === 'Aptitude' && <Brain size={24} />}
              {category === 'DSA' && <Network size={24} />}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search problems..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FF9100] focus:ring-1 focus:ring-[#FF9100]" />
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-[#FFFFFF] text-[#1F2937]">
            <tr>
              <th className="px-6 py-3 font-semibold">Title</th>
              <th className="px-6 py-3 font-semibold">Category</th>
              <th className="px-6 py-3 font-semibold">Difficulty</th>
              <th className="px-6 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, title: 'Two Sum', cat: 'DSA', diff: 'Easy' },
              { id: 2, title: 'Find Nth Highest Salary', cat: 'SQL', diff: 'Medium' },
            ].map((prob) => (
              <tr key={prob.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-6 py-4">{prob.title}</td>
                <td className="px-6 py-4"><span className="bg-[#FFEDD5] text-[#FF9100] px-2 py-1 rounded-md text-sm">{prob.cat}</span></td>
                <td className="px-6 py-4">{prob.diff}</td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="p-1 text-[#FF9100] hover:bg-[#FFFFFF] rounded"><Edit2 size={18} /></button>
                  <button className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPracticeManagement;
