import React from 'react';
import { Megaphone, Calendar, Send, Edit, Trash2 } from 'lucide-react';

const AdminAnnouncements = () => {
  return (
    <div className="p-6 bg-[#FFFFFF] min-h-screen text-[#1F2937]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#FF9100]">Announcements</h1>
        <button className="bg-[#FF9100] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#E68200] transition-colors">
          <Megaphone size={20} /> New Announcement
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {[
            { id: 1, title: 'Platform Maintenance Scheduled', date: 'Oct 15, 2026', target: 'All Users', status: 'Scheduled' },
            { id: 2, title: 'New Course: Advanced System Design', date: 'Oct 10, 2026', target: 'Pro Subscribers', status: 'Published' }
          ].map(ann => (
            <div key={ann.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1">{ann.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {ann.date}</span>
                  <span>Target: {ann.target}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded font-medium ${ann.status === 'Published' ? 'bg-[#FFEDD5] text-[#FF9100]' : 'bg-[#FFFFFF] text-[#FF9100]'}`}>
                  {ann.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-[#FF9100]"><Edit size={18} /></button>
                <button className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-[#FFEDD5] h-fit">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Send size={20} className="text-[#FF9100]" /> Quick Publish
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9100]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea rows="4" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9100]"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Target Audience</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9100]">
                <option>All Users</option>
                <option>Instructors Only</option>
                <option>Students Only</option>
              </select>
            </div>
            <button className="w-full bg-[#FF9100] text-white py-2 rounded-lg font-medium hover:bg-[#E68200] transition-colors">
              Publish Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnnouncements;
