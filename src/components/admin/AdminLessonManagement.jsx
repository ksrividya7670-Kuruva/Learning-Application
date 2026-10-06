import React, { useState } from 'react';
import { Video, FileText, Link as LinkIcon, HelpCircle, Upload, Save, Plus } from 'lucide-react';

const AdminLessonManagement = () => {
  return (
    <div className="p-6 bg-[#FFFFFF] min-h-screen text-[#1F2937] font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#FF9100]">Lesson Management</h1>
          <p className="text-[#1F2937] opacity-70">Create and organize lesson content</p>
        </div>
        <button className="bg-[#FF9100] text-[#FFFFFF] px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-opacity-90 transition-colors shadow-sm">
          <Save size={18} />
          Save Lesson
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#FFFFFF] p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-[#FF9100] mb-4">Lesson Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Lesson Title</label>
                <input type="text" placeholder="e.g., Introduction to React Hooks" className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#FF9100]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Course Assignment</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#FF9100] bg-white">
                  <option>Advanced Web Development</option>
                  <option>React for Beginners</option>
                  <option>Fullstack JavaScript</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Lesson Notes</label>
                <textarea rows="4" placeholder="Enter detailed lesson notes or transcript..." className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#FF9100] resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-[#FF9100] mb-4 flex items-center gap-2">
              <Video size={20} />
              Video Content
            </h2>
            <div className="border-2 border-dashed border-[#FFEDD5] bg-[#FFFFFF] rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-opacity-50 transition-colors">
              <div className="bg-[#FF9100] p-3 rounded-full text-[#FFFFFF] mb-3 shadow-md">
                <Upload size={24} />
              </div>
              <p className="font-medium text-[#FF9100]">Click to upload or drag and drop</p>
              <p className="text-sm text-[#1F2937] opacity-60 mt-1">MP4, WebM, or OGG (Max. 500MB)</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#FFFFFF] p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-[#FF9100] flex items-center gap-2">
                <FileText size={20} />
                Resources
              </h2>
              <button className="text-[#FF9100] hover:bg-[#FFEDD5] p-1 rounded transition-colors">
                <Plus size={18} />
              </button>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:border-[#FFEDD5] transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="text-[#FF9100]">
                    <FileText size={18} />
                  </div>
                  <span className="text-sm font-medium text-[#1F2937]">cheat-sheet.pdf</span>
                </div>
              </li>
              <li className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:border-[#FFEDD5] transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="text-[#FF9100]">
                    <LinkIcon size={18} />
                  </div>
                  <span className="text-sm font-medium text-[#1F2937]">Documentation Link</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-xl border border-gray-100 shadow-sm">
             <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-[#FF9100] flex items-center gap-2">
                <HelpCircle size={20} />
                Attached Quiz
              </h2>
            </div>
            <div className="p-4 bg-[#FFFFFF] rounded-lg border border-[#FFEDD5] flex items-center justify-between">
              <div>
                <p className="font-medium text-[#FF9100]">Module 1 Assessment</p>
                <p className="text-xs text-[#1F2937] opacity-70">5 Questions • 10 Mins</p>
              </div>
              <button className="text-[#FF9100] text-sm font-medium hover:underline">Change</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLessonManagement;
