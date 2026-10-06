import React from 'react';
import { Users, Star, Book, UserPlus, Search, Edit, Trash2 } from 'lucide-react';

const AdminInstructorManagement = () => {
  return (
    <div className="p-6 bg-[#FFFFFF] min-h-screen text-[#1F2937]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#FF9100]">Instructors</h1>
        <button className="bg-[#FF9100] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#d98b09] transition-colors">
          <UserPlus size={20} /> Add Instructor
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search instructors..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FF9100] focus:ring-1 focus:ring-[#FF9100]" />
          </div>
        </div>
        
        <table className="w-full text-left">
          <thead className="bg-[#FFFFFF] text-[#1F2937]">
            <tr>
              <th className="px-6 py-4 font-semibold">Instructor</th>
              <th className="px-6 py-4 font-semibold">Courses</th>
              <th className="px-6 py-4 font-semibold">Rating</th>
              <th className="px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, name: 'Sarah Jenkins', email: 'sarah@example.com', courses: 3, rating: 4.8 },
              { id: 2, name: 'Michael Chen', email: 'michael@example.com', courses: 2, rating: 4.5 },
            ].map(instructor => (
              <tr key={instructor.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold">{instructor.name}</p>
                    <p className="text-sm text-gray-500">{instructor.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Book size={16} className="text-[#FF9100]" />
                    <span>{instructor.courses} Assigned</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-[#FF9100]">
                    <Star size={16} fill="currentColor" />
                    <span className="text-[#1F2937]">{instructor.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <button className="text-[#FF9100] hover:text-[#E68200]"><Edit size={18} /></button>
                  <button className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInstructorManagement;
