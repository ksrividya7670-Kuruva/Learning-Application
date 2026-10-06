import React from 'react';
import { Briefcase, BookOpen, MessageSquare, Plus, Search } from 'lucide-react';

const AdminInterviewPrep = () => {
  return (
    <div className="p-6 bg-[#FFFFFF] min-h-screen text-[#1F2937]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#FF9100]">Interview Prep</h1>
        <button className="bg-[#FF9100] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#E68200] transition-colors">
          <Plus size={20} /> Add Question
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[
          { title: 'Technical', icon: BookOpen, count: 120 },
          { title: 'HR', icon: MessageSquare, count: 45 },
          { title: 'Aptitude', icon: Briefcase, count: 80 }
        ].map(stat => (
          <div key={stat.title} className="bg-white p-6 rounded-xl shadow-sm border border-[#FFEDD5] flex items-center gap-4">
            <div className="p-3 bg-[#FFFFFF] text-[#FF9100] rounded-lg">
              <stat.icon size={28} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-gray-500">{stat.count} questions</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search by company or topic..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FF9100] focus:ring-1 focus:ring-[#FF9100]" />
          </div>
          <select className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#FF9100]">
            <option>All Companies</option>
            <option>Google</option>
            <option>Microsoft</option>
          </select>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-4 border border-gray-100 rounded-lg hover:border-[#FFEDD5] transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">Describe a time you solved a complex problem.</h4>
                <span className="bg-[#FFFFFF] text-[#FF9100] px-2 py-1 rounded text-xs font-medium">HR</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Often asked at: Google, Meta</p>
              <div className="flex gap-2">
                <button className="text-sm text-[#FF9100] hover:underline">Edit</button>
                <button className="text-sm text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminInterviewPrep;
