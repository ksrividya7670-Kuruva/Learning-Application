import React from 'react';
import { MessageCircle, CheckCircle, AlertCircle, CornerDownRight } from 'lucide-react';

const AdminFeedback = () => {
  return (
    <div className="p-6 bg-[#FFFFFF] min-h-screen text-[#1F2937]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#FF9100]">Platform Feedback</h1>
        <p className="text-gray-600">Review and moderate user feedback</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#FFEDD5] flex-1 flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FFFFFF] rounded-lg text-[#FF9100]">
              <AlertCircle size={20} />
            </div>
            <span className="font-medium">Pending Review</span>
          </div>
          <span className="text-xl font-bold">12</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1 flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FFFFFF] rounded-lg text-[#FF9100]">
              <CheckCircle size={20} />
            </div>
            <span className="font-medium">Resolved</span>
          </div>
          <span className="text-xl font-bold">145</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        {[
          { id: 1, user: 'Alex D.', type: 'Course', text: 'The React module could use more examples on hooks.', status: 'Pending' },
          { id: 2, user: 'Maria S.', type: 'Platform', text: 'Dark mode is missing from the dashboard!', status: 'Pending' }
        ].map(item => (
          <div key={item.id} className="p-4 border border-gray-100 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold">{item.user}</h4>
                <span className="text-xs bg-[#FFFFFF] text-[#FF9100] px-2 py-1 rounded mt-1 inline-block">{item.type} Feedback</span>
              </div>
              <span className="text-sm font-medium text-[#FF9100]">{item.status}</span>
            </div>
            <p className="text-gray-700 mb-4">{item.text}</p>
            <div className="flex gap-3">
              <button className="text-sm bg-[#FFFFFF] text-[#FF9100] px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-[#FFEDD5] transition-colors">
                <CornerDownRight size={16} /> Reply
              </button>
              <button className="text-sm text-gray-500 hover:text-[#FF9100] px-3 py-1.5">Mark Resolved</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFeedback;
