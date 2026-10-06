import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, ChevronDown, Building2, Briefcase, Code2, Search, Loader2 } from 'lucide-react';
import axios from 'axios';

const InterviewPrepPage = ({ user }) => {
  const [companies, setCompanies] = useState([]);
  const [activeCompanyId, setActiveCompanyId] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [practicingFaq, setPracticingFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Fetch data using Axios
    axios.get('/interview-questions.json')
      .then(response => {
        setCompanies(response.data);
        if (response.data.length > 0) {
          setActiveCompanyId(response.data[0].id);
        }
      })
      .catch(err => console.error("Failed to fetch interview questions:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const activeCompany = companies.find(c => c.id === activeCompanyId) || companies[0];

  const filteredFaqs = useMemo(() => {
    if (!activeCompany) return [];
    if (!searchQuery.trim()) return activeCompany.faqs;
    const query = searchQuery.toLowerCase();
    return activeCompany.faqs.filter(faq => 
      faq.question.toLowerCase().includes(query) || 
      faq.category.toLowerCase().includes(query)
    );
  }, [activeCompany, searchQuery]);

  const toggleCompletion = (companyId, faqId, e) => {
    e.stopPropagation();
    setCompanies(prev => prev.map(c => {
      if (c.id === companyId) {
        return {
          ...c,
          faqs: c.faqs.map(f => f.id === faqId ? { ...f, completed: !f.completed } : f)
        };
      }
      return c;
    }));
  };

  const handleReviewCode = (e) => {
    e.stopPropagation();
    alert("Code review environment is currently locked for this demo. This will open the user's previously submitted code in the interactive sandbox.");
  };

  const togglePractice = (faqId, e) => {
    e.stopPropagation();
    setPracticingFaq(prev => prev === faqId ? null : faqId);
  };

  if (isLoading || !activeCompany) {
    return (
      <div className="font-sans flex flex-col min-h-screen bg-slate-50 dark:bg-slate-800 items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#7C3AED]" />
        <p className="mt-4 font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-sm">Loading Interview Data...</p>
      </div>
    );
  }

  return (
    <div className="font-sans selection:bg-[#7C3AED] selection:text-white flex flex-col">
      <main className="flex-grow pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-12 border-b-2 border-slate-900 dark:border-slate-100 pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white font-bold text-[10px] tracking-widest uppercase mb-4 shadow-[2px_2px_0px_0px_rgba(15,23,42,0.05)] border-l-2 border-[#7C3AED]">
              <Briefcase size={12} className="text-[#7C3AED]" />
              <span>Career Acceleration</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              Interview <span className="text-[#7C3AED]">Preparation</span>
            </h1>
            <p className="mt-4 text-[#7C3AED] font-medium max-w-2xl text-lg">
              Master the interview processes for top-tier tech companies. Review your previously completed FAQs, algorithms, and system design challenges below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
            
            {/* Sidebar: Companies List */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Target Companies</h2>
              {companies.map((company) => {
                const isActive = activeCompany.id === company.id;
                return (
                  <button
                    key={company.id}
                    onClick={() => {
                      setActiveCompanyId(company.id);
                      document.getElementById('faq-content-area')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`w-full flex items-center justify-between p-4 text-left border-2 transition-colors cursor-pointer ${
                      isActive 
                        ? 'border-slate-900 dark:border-slate-100 bg-white dark:bg-slate-900 shadow-[4px_4px_0px_0px_#7C3AED]' 
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-400 hover:shadow-[4px_4px_0px_0px_#0F172A]'
                    }`}
                  >
                    <div>
                      <h3 className={`font-bold text-lg ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-200'}`}>{company.name}</h3>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">{company.role}</p>
                    </div>
                    <img 
                      src={`https://cdn.simpleicons.org/${company.name.toLowerCase()}`} 
                      alt={`${company.name} logo`} 
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                      className={`w-6 h-6 object-contain transition-all ${isActive ? 'opacity-100' : 'opacity-30 grayscale'}`} 
                    />
                    <Building2 size={20} className={isActive ? 'text-[#7C3AED]' : 'text-slate-400'} style={{ display: 'none' }} />
                  </button>
                );
              })}
            </div>

            {/* Main Content: FAQs */}
            <div id="faq-content-area" className="scroll-mt-24">
              <div className="bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-100 p-6 sm:p-8 mb-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-slate-100 dark:border-slate-800 pb-6 mb-6">
                  <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white">{activeCompany.name}</h2>
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest">{activeCompany.role} Prep</p>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder={`Search ${activeCompany.name} interview questions or categories...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-none border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-0 focus:border-[#7C3AED] focus:bg-white dark:bg-slate-900 transition-colors"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Interview FAQs ({filteredFaqs.length})</h3>
                  
                  {filteredFaqs.length === 0 && (
                    <div className="p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      No questions found matching "{searchQuery}".
                    </div>
                  )}

                  {filteredFaqs.map((faq) => {
                    const isExpanded = expandedFaq === faq.id;
                    const isPracticing = practicingFaq === faq.id;
                    
                    return (
                      <div key={faq.id} className="border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-colors hover:border-slate-300 dark:border-slate-600 overflow-hidden">
                        <button
                          onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                          className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 flex-grow pr-4">
                            <button
                              onClick={(e) => toggleCompletion(activeCompany.id, faq.id, e)}
                              className={`flex-shrink-0 flex items-center gap-1.5 px-2 py-1 border text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                                faq.completed 
                                  ? 'text-[#7C3AED] bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:bg-slate-800' 
                                  : 'text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:bg-slate-800'
                              }`}
                            >
                              <CheckCircle2 size={12} className={faq.completed ? 'text-[#7C3AED]' : 'text-slate-400'} />
                              {faq.completed ? 'Completed' : 'Mark Done'}
                            </button>
                            <div className={`font-bold text-sm sm:text-base transition-colors ${faq.completed ? 'text-slate-500 dark:text-slate-400 line-through' : 'text-slate-800 dark:text-slate-100'}`}>
                              {faq.question}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 flex-shrink-0">
                            <span className="hidden sm:inline-block text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-1 uppercase tracking-wider border border-slate-200 dark:border-slate-700">
                              {faq.category}
                            </span>
                            <ChevronDown 
                              size={18} 
                              className={`text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                            />
                          </div>
                        </button>
                        
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-3 uppercase text-xs tracking-widest flex items-center gap-2">
                                  <Code2 size={16} className="text-[#7C3AED]" />
                                  <span>Answer / Details</span>
                                </h4>
                                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                  {faq.details}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewPrepPage;

