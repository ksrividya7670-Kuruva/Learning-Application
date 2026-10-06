import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, BookOpen, Code, Github, Server, Briefcase, Zap, Search, Layout, Database, Smartphone, BrainCircuit, Map } from 'lucide-react';
import { getRoadmaps } from '../lib/dataStore';

const RoadmapsPage = ({ onBack }) => {
  const [roadmapsData, setRoadmapsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoadmapId, setSelectedRoadmapId] = useState('frontend');

  useEffect(() => {
    setRoadmapsData(getRoadmaps());
  }, []);

  const filteredRoadmaps = useMemo(() => {
    if (!searchQuery.trim()) return roadmapsData;
    const query = searchQuery.toLowerCase();
    return roadmapsData.filter(r => 
      r.title.toLowerCase().includes(query) || 
      r.description.toLowerCase().includes(query) ||
      r.steps.some(s => s.title.toLowerCase().includes(query))
    );
  }, [searchQuery, roadmapsData]);

  // If the user searches and their selected roadmap is hidden, maybe auto-select the first match
  React.useEffect(() => {
    if (searchQuery.trim() && filteredRoadmaps.length > 0) {
      if (!filteredRoadmaps.find(r => r.id === selectedRoadmapId)) {
        setSelectedRoadmapId(filteredRoadmaps[0].id);
      }
    }
  }, [searchQuery, filteredRoadmaps, selectedRoadmapId]);

  const activeRoadmap = roadmapsData.find(r => r.id === selectedRoadmapId) || roadmapsData[0];

  const handleViewResource = (link) => {
    window.history.pushState({}, '', link);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-[#7C3AED] hover:text-[#7C3AED] transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

        {/* Header & Search */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-left flex-1">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
              Developer Roadmaps
            </h1>
            <p className="text-[#7C3AED] max-w-xl">
              Step-by-step paths to go from zero to job-ready. Choose your career path below or search for specific skills.
            </p>
          </div>
          
          <div className="w-full md:w-80 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search roadmaps (e.g., React, AI, Python)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Roadmap Selection Pills */}
        <div className="mb-12 flex flex-wrap gap-3">
          {filteredRoadmaps.length > 0 ? (
            filteredRoadmaps.map((roadmap) => {
              const isSelected = selectedRoadmapId === roadmap.id;
              return (
                <button
                  key={roadmap.id}
                  onClick={() => setSelectedRoadmapId(roadmap.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-none font-bold text-sm border-2 transition-all duration-300 ${
                    isSelected 
                      ? 'bg-[#7C3AED] text-slate-900 dark:text-white border-[#7C3AED] shadow-[4px_4px_0px_0px_rgba(15,23,42,0.6)] -translate-y-1 -translate-x-1' 
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-900 dark:border-slate-100/40 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] hover:bg-[#7C3AED] hover:text-slate-900 dark:text-white hover:border-[#7C3AED] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_0px_#0F172A]'
                  }`}
                >
                  <Map className={`h-4 w-4 ${isSelected ? 'text-slate-900 dark:text-white' : ''}`} />
                  {roadmap.title}
                </button>
              )
            })
          ) : (
            <div className="text-slate-500 dark:text-slate-400 py-4">No roadmaps found for "{searchQuery}".</div>
          )}
        </div>

        {/* Roadmap Content */}
        <AnimatePresence mode="wait">
          {filteredRoadmaps.length > 0 && activeRoadmap && (
            <motion.div 
              key={activeRoadmap.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              {/* Progress Header */}
              {activeRoadmap.steps && activeRoadmap.steps.length > 0 && (
                <div className="mb-10 bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-100/20 p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.05)]">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">Your Progress</h3>
                    <span className="font-bold text-[#7C3AED]">
                      {Math.round((activeRoadmap.steps.filter(s => s.isCompleted).length / activeRoadmap.steps.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(activeRoadmap.steps.filter(s => s.isCompleted).length / activeRoadmap.steps.length) * 100}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-[#7C3AED]"
                    />
                  </div>
                </div>
              )}

              {/* Vertical Line */}
              <div className="absolute left-8 sm:left-12 top-[120px] bottom-0 w-1 bg-slate-200 dark:bg-slate-700 rounded-full" />

              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-10"
              >
                {activeRoadmap.steps?.map((step, index) => {
                  return (
                    <motion.div key={index} variants={itemVariants} className="relative flex items-start gap-6 sm:gap-10 group">
                      
                      {/* Timeline Node */}
                      <div className={`relative z-10 flex h-16 w-16 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-none border-2 border-slate-900 dark:border-slate-100/40 ${step.color || 'bg-[#7C3AED] text-[#FB6C00]'} shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)] transition-all group-hover:border-[#7C3AED] group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:shadow-[8px_8px_0px_0px_#0F172A]`}>
                        <BookOpen className="h-6 w-6 sm:h-10 sm:w-10" />
                        {step.isCompleted && (
                          <div className="absolute -right-3 -top-3 rounded-none border-2 border-slate-900 dark:border-slate-100/40 bg-[#7C3AED] p-0.5 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.1)] transition-all group-hover:border-[#7C3AED] group-hover:shadow-[4px_4px_0px_0px_#0F172A]">
                            <CheckCircle2 className="h-5 w-5 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Content Card */}
                      <div className={`flex-1 rounded-none border-2 p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)] transition-all duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:shadow-[8px_8px_0px_0px_#0F172A] ${step.isMilestone ? 'border-slate-400 bg-slate-50 dark:bg-slate-800/50 group-hover:border-slate-500' : 'border-slate-900 dark:border-slate-100/40 bg-white dark:bg-slate-900 group-hover:border-[#7C3AED]'}`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-[#7C3AED] transition-colors flex items-center flex-wrap gap-2">
                            {step.title}
                            {step.isMilestone && <span className="inline-flex items-center text-[10px] sm:text-xs font-bold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 px-2 py-1 rounded-none border border-slate-300 dark:border-slate-600 tracking-wider">MILESTONE</span>}
                          </h3>
                          {step.estimatedTime && (
                            <span className="text-sm font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 border border-slate-200 dark:border-slate-700 inline-block w-max">
                              ⏱ {step.estimatedTime}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-700 dark:text-slate-200 font-medium leading-relaxed text-sm sm:text-base">
                          {step.desc}
                        </p>
                        
                        <div className="mt-6 flex flex-wrap gap-3">
                          <button 
                            onClick={() => handleViewResource(step.resourceLink)}
                            className="rounded-none bg-[#7C3AED]/10 text-[#7C3AED] px-5 py-2.5 text-sm font-bold border-2 border-slate-900 dark:border-slate-100/40 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.1)] transition-all hover:border-[#7C3AED] hover:bg-[#7C3AED]/20 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4px_4px_0px_0px_#0F172A]"
                          >
                            View Resources
                          </button>
                          {!step.isCompleted && (
                            <button className="rounded-none bg-[#7C3AED] px-5 py-2.5 text-sm font-bold text-slate-900 dark:text-white border-2 border-slate-900 dark:border-slate-100/40 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.1)] transition-all hover:border-[#7C3AED] hover:bg-slate-400 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4px_4px_0px_0px_#0F172A]">
                              Start Module
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default RoadmapsPage;

