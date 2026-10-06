import React from 'react';
import { 
  Users, GraduationCap, BookOpen, Activity, 
  TrendingUp, TrendingDown, ChevronRight, CheckSquare, FileText, BarChart2
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

import { getUsers, getCourses, getRoadmaps } from '../../lib/dataStore';

const AdminDashboard = () => {
  const users = getUsers();
  const courses = getCourses();

  const totalStudents = users.filter(u => u.role === 'Student').length;
  const activeStudents = users.filter(u => u.status === 'Active').length;
  const totalInstructors = users.filter(u => u.role === 'Instructor' || u.role === 'Admin' || u.role === 'Pro Member').length;
  const totalCourses = courses.length;
  const totalLessons = courses.reduce((acc, course) => acc + (course.lessons || 12), 0);
  const totalQuizzes = courses.reduce((acc, course) => acc + (course.quizzes || 5), 0);
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#1F2937'
        }
      }
    },
    scales: {
      x: {
        grid: { color: '#f3f4f6' },
        ticks: { color: '#6b7280' }
      },
      y: {
        grid: { color: '#f3f4f6' },
        ticks: { color: '#6b7280' }
      }
    }
  };

  const doughnutOptions = {
    ...chartOptions,
    scales: undefined
  };

  const enrollmentData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Student Enrollments',
        data: [120, 190, 300, 500, 480, 600, totalStudents],
        borderColor: '#FF9100',
        backgroundColor: 'rgba(255, 145, 0, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const activeLearnersData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Active Learners',
        data: [450, 520, 480, 610, 590, 750, activeStudents],
        backgroundColor: '#FF9100',
        borderRadius: 4
      }
    ]
  };

  const courseCompletionData = {
    labels: ['Web Dev', 'Data Science', 'Mobile App', 'Cloud Computing', 'UI/UX Design'],
    datasets: [
      {
        label: 'Completion Rate (%)',
        data: [75, 60, 85, 45, 90],
        backgroundColor: [
          '#FF9100', '#FF9100', '#FF9100', '#FF9100', '#FF9100'
        ],
        borderWidth: 0
      }
    ]
  };

  const stats = [
    { label: 'Total Students', value: totalStudents, trend: '+12%', isPositive: true, icon: Users, color: 'bg-primary/10 text-primary' },
    { label: 'Total Courses', value: totalCourses, trend: '+5%', isPositive: true, icon: BookOpen, color: 'bg-orange-100 text-orange-600' },
    { label: 'Total Instructors', value: totalInstructors, trend: '0%', isPositive: true, icon: GraduationCap, color: 'bg-mint/30 text-primary' },
    { label: 'Total Lessons', value: totalLessons, trend: '+18%', isPositive: true, icon: FileText, color: 'bg-primary/10 text-primary' },
    { label: 'Total Quizzes', value: totalQuizzes, trend: '+8%', isPositive: true, icon: CheckSquare, color: 'bg-orange-100 text-orange-600' },
    { label: 'Active Learners', value: activeStudents, trend: '-2%', isPositive: false, icon: Activity, color: 'bg-gray-100 text-gray-600' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Good Morning, Admin 👋</h1>
        <p className="text-gray-500 mt-1 font-medium">Here's what's happening on your learning platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-500 tracking-wide uppercase">{stat.label}</p>
                  <h3 className="text-3xl font-black mt-2 text-gray-900">{stat.value}</h3>
                </div>
                <div className={`p-4 rounded-xl ${stat.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
              </div>
              <div className="mt-5 flex items-center text-sm font-medium">
                {stat.isPositive ? (
                  <TrendingUp className="w-4 h-4 text-emerald-500 mr-1.5" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1.5" />
                )}
                <span className={stat.isPositive ? "text-emerald-500" : "text-red-500"}>{stat.trend}</span>
                <span className="ml-2 text-gray-400">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrollment Line Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6 text-gray-900">Student Enrollment</h3>
          <div className="h-[320px]">
            <Line data={enrollmentData} options={chartOptions} />
          </div>
        </div>

        {/* Course Completion Doughnut */}
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6 text-gray-900">Course Completion Rate</h3>
          <div className="h-[320px] flex items-center justify-center">
            <Doughnut data={courseCompletionData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Secondary Charts & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Learners Bar Chart */}
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6 text-gray-900">Daily Active Learners</h3>
          <div className="h-[300px]">
            <Bar data={activeLearnersData} options={chartOptions} />
          </div>
        </div>

        {/* Recent Student Activity Table */}
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Student Activity</h3>
            <button className="text-sm text-primary hover:text-primary-600 flex items-center font-bold">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 uppercase text-xs tracking-wider">
                  <th className="pb-3 font-bold">Student</th>
                  <th className="pb-3 font-bold">Activity</th>
                  <th className="pb-3 font-bold text-right">Time</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { student: 'Alex Johnson', activity: 'Completed Lesson 3 in React', time: '2 mins ago' },
                  { student: 'Maria Garcia', activity: 'Enrolled in Python Masterclass', time: '15 mins ago' },
                  { student: 'James Smith', activity: 'Scored 90% in JavaScript Quiz', time: '1 hour ago' },
                  { student: 'Linda Williams', activity: 'Asked a question in UI/UX Design', time: '3 hours ago' },
                  { student: 'David Brown', activity: 'Downloaded Certificate', time: '5 hours ago' },
                ].map((item, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 text-sm font-bold text-gray-900">{item.student}</td>
                    <td className="py-4 text-sm text-gray-600 font-medium">{item.activity}</td>
                    <td className="py-4 text-sm text-right text-gray-400 font-medium">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AdminDashboard;
