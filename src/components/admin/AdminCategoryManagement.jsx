import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Folder } from 'lucide-react';

const AdminCategoryManagement = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Web Development', count: 12, status: 'Active' },
    { id: 2, name: 'Data Science', count: 8, status: 'Active' },
    { id: 3, name: 'UI/UX Design', count: 5, status: 'Draft' },
    { id: 4, name: 'Mobile Apps', count: 7, status: 'Active' },
  ]);

  return (
    <div className="p-6 bg-[#FFFFFF] min-h-screen text-[#1F2937] font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#FF9100]">Category Management</h1>
          <p className="text-[#1F2937] opacity-70">Organize and manage course categories</p>
        </div>
        <button className="bg-[#FF9100] text-[#FFFFFF] px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-opacity-90 transition-colors shadow-sm">
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <div className="bg-[#FFFFFF] rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 bg-opacity-50">
          <div className="relative w-64">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search categories..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#FF9100] text-sm"
            />
          </div>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FFEDD5] bg-opacity-30 text-[#FF9100] text-sm">
              <th className="py-3 px-6 font-semibold">Category Name</th>
              <th className="py-3 px-6 font-semibold">Courses</th>
              <th className="py-3 px-6 font-semibold">Status</th>
              <th className="py-3 px-6 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b border-gray-50 hover:bg-[#FFFFFF] hover:bg-opacity-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#FFEDD5] rounded-md text-[#FF9100]">
                      <Folder size={18} />
                    </div>
                    <span className="font-medium text-[#1F2937]">{category.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-[#1F2937] opacity-80">{category.count} courses</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    category.status === 'Active' 
                      ? 'bg-[#FFEDD5] text-[#FF9100]' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {category.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-3">
                    <button className="text-[#FF9100] hover:text-opacity-80 p-1">
                      <Edit2 size={18} />
                    </button>
                    <button className="text-red-500 hover:text-opacity-80 p-1">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCategoryManagement;
