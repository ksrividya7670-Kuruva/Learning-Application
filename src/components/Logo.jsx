import React from 'react';
import { GraduationCap } from 'lucide-react';

const Logo = ({ className = '', isDark = false }) => {
  return (
    <div className={`flex items-center gap-2.5 flex-shrink-0 select-none ${className}`}>
      {/* Crisp, sharp-edged orange square icon with V and Graduation Cap */}
      <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center bg-[#FF9100] text-white border border-black shadow-sm chamfer-btn">
        <GraduationCap size={18} strokeWidth={2.5} className="absolute top-1" />
        <span className="text-[20px] font-black leading-none tracking-tighter mt-3.5 font-sans">V</span>
      </div>
      
      {/* Brand Typography: VEERUPRO in white on dark bg or dark navy on light bg */}
      <div className="flex items-baseline tracking-tight font-black uppercase text-xl font-sans leading-none">
        <span className={isDark ? 'text-white' : 'text-[#0F172A] dark:text-white'}>VEERUPRO</span>
        <span className="text-[#FF9100] ml-0.5">AC</span>
      </div>
    </div>
  );
};

export default Logo;
