import React, { useState } from 'react';
import { Users, BookOpen, Award, TrendingUp, Calendar } from 'lucide-react';

const AdminAnalytics = () => {
  const [dateRange, setDateRange] = useState('7days');

  const stats = [
    { label: 'Total Enrollments', value: '1,248', icon: Users, change: '+12%' },
    { label: 'Completion Rate', value: '68%', icon: BookOpen, change: '+5%' },
    { label: 'Avg. Quiz Score', value: '82%', icon: Award, change: '+2%' },
    { label: 'Active Learners', value: '892', icon: TrendingUp, change: '+8%' },
  ];

  const chartData = [
    { day: 'Mon', enrollments: 45, completions: 20 },
    { day: 'Tue', enrollments: 52, completions: 25 },
    { day: 'Wed', enrollments: 38, completions: 18 },
    { day: 'Thu', enrollments: 65, completions: 30 },
    { day: 'Fri', enrollments: 48, completions: 22 },
    { day: 'Sat', enrollments: 85, completions: 45 },
    { day: 'Sun', enrollments: 72, completions: 38 },
  ];

  return (
    <div className="p-6 bg-[#FFFFFF] min-h-screen text-[#1F2937] font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#FF9100]">Analytics Overview</h1>
          <p className="text-[#1F2937] opacity-70">Monitor platform performance and learner engagement</p>
        </div>
        <div className="flex items-center gap-2 bg-[#FFFFFF] p-2 rounded-lg border border-gray-200 shadow-sm">
          <Calendar size={18} className="text-[#FF9100]" />
          <select 
            className="bg-transparent border-none outline-none text-sm font-medium text-[#1F2937]"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-[#FFFFFF] p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-[#F9FAFB] rounded-lg">
                  <Icon size={24} className="text-[#000000]" />
                </div>
                <span className="text-sm font-bold text-[#000000] bg-[#F9FAFB] px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-[#1F2937] opacity-70 text-sm font-medium mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold text-[#000000]">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-[#FFFFFF] p-6 rounded-xl border border-gray-100 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-[#000000] mb-6">Enrollments vs Completions</h2>
        <div className="h-64 flex items-end gap-4">
          {chartData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col justify-end items-center gap-2 group relative">
              <div className="w-full flex justify-center gap-1 items-end h-48">
                <div 
                  className="w-1/2 bg-[#000000] rounded-t-sm transition-all duration-300 group-hover:opacity-80" 
                  style={{ height: `${(data.enrollments / 100) * 100}%` }}
                ></div>
                <div 
                  className="w-1/2 bg-[#FF9100] rounded-t-sm transition-all duration-300 group-hover:opacity-80" 
                  style={{ height: `${(data.completions / 100) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm text-[#1F2937] font-medium">{data.day}</span>
              
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-[#1F2937] text-[#FFFFFF] text-xs py-1 px-3 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                <p>Enrollments: {data.enrollments}</p>
                <p>Completions: {data.completions}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#000000]"></div>
            <span className="text-sm text-[#1F2937]">Enrollments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF9100]"></div>
            <span className="text-sm text-[#1F2937]">Completions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
