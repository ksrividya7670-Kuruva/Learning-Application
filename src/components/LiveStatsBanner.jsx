import React, { useState, useEffect } from 'react';
import { Users, Award, ShieldCheck } from 'lucide-react';

const LiveStatsBanner = () => {
  const [activeUsers, setActiveUsers] = useState(1428);

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = Math.floor(Math.random() * 7) - 3;
      setActiveUsers((prev) => Math.max(1200, prev + delta));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white border-b border-[#134E4A] py-3 px-4 text-[#0F766E] text-sm font-medium">
      <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-[#F59E0B] opacity-75"></span>
              <span className="relative inline-flex rounded-none h-3 w-3 bg-[#F59E0B]"></span>
            </span>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#F59E0B]" />
              <span>{activeUsers.toLocaleString()} learners online right now</span>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-[#F59E0B]" />
            <span>42 New Certificates Today</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#F59E0B]" />
            <span>100% Platform Uptime</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStatsBanner;
