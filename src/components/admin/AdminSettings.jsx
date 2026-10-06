import React, { useState } from 'react';
import { Settings, Layout, Bell, Shield, Palette, Save } from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('Platform');

  const tabs = [
    { id: 'Platform', icon: Layout },
    { id: 'Course', icon: Settings },
    { id: 'Notification', icon: Bell },
    { id: 'Security', icon: Shield },
    { id: 'Appearance', icon: Palette }
  ];

  return (
    <div className="p-6 bg-[#FFFFFF] min-h-screen text-[#1F2937]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#FF9100]">Settings</h1>
        <p className="text-gray-600">Manage platform configurations</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id ? 'bg-[#FF9100] text-white' : 'hover:bg-white text-gray-600'}`}
            >
              <tab.icon size={20} />
              <span className="font-medium">{tab.id}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6 border-b border-gray-100 pb-4">{activeTab} Settings</h2>
          
          <div className="space-y-6 max-w-2xl">
            {activeTab === 'Platform' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Platform Name</label>
                  <input type="text" defaultValue="TechPrep Pro" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9100]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Contact Email</label>
                  <input type="email" defaultValue="support@techprep.com" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9100]" />
                </div>
                <div className="flex items-center justify-between p-4 bg-[#FFFFFF] rounded-lg border border-[#FFEDD5]">
                  <div>
                    <h4 className="font-semibold">Maintenance Mode</h4>
                    <p className="text-sm text-gray-600">Disable platform access for users</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF9100]"></div>
                  </label>
                </div>
              </>
            )}
            
            {activeTab !== 'Platform' && (
              <div className="p-8 text-center text-gray-500">
                <Settings size={48} className="mx-auto mb-4 opacity-20" />
                <p>Configuration options for {activeTab} will appear here.</p>
              </div>
            )}

            <div className="pt-6 border-t border-gray-100">
              <button className="bg-[#FF9100] text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-[#E68200] transition-colors">
                <Save size={20} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
