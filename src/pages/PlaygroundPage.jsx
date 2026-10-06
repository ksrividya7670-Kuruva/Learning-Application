import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, Play, RefreshCw, Save, Share2, Maximize2, Minimize2,
  Sun, Moon, Type, Layers, Bot, Sparkles, CheckCircle2, AlertCircle,
  Clock, Cpu, Trash2, FileCode, Plus, X, Search, Replace, Copy,
  Check, Download, Upload, History, CopyCheck, BookOpen, HelpCircle,
  Terminal, Sliders, Trophy, Flame, Zap, Award, Star, MessageSquare,
  ChevronRight, ChevronDown, Lightbulb, Shield, Code, ArrowRight, CornerDownLeft
} from 'lucide-react';
import {
  SUPPORTED_LANGUAGES,
  PRACTICE_PROBLEMS,
  SYNTAX_CHEATSHEETS,
  TIME_COMPLEXITY_GUIDE,
  INTERVIEW_TIPS
} from '../data/playgroundData';

const PlaygroundPage = ({ onBack }) => {
  // Theme & Layout States
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'
  const [editorTheme, setEditorTheme] = useState('vscode-dark');
  const [selectedLanguage, setSelectedLanguage] = useState(SUPPORTED_LANGUAGES[0]);
  const [activeSidePanel, setActiveSidePanel] = useState('problems');
  const [showLeftDrawer, setShowLeftDrawer] = useState(false); // Closed by default for maximum editor space!
  const [showOutputPanel, setShowOutputPanel] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Editor Settings & Code Tabs
  const [fontSize, setFontSize] = useState(13);
  const [tabSize, setTabSize] = useState(2);
  const [wordWrap, setWordWrap] = useState(false); // False by default so lines flow naturally without squishing
  const [autoSave, setAutoSave] = useState(true);
  const [autoSaveStatus, setAutoSaveStatus] = useState('Saved');

  const [files, setFiles] = useState([
    { id: '1', name: 'main.js', language: 'javascript', code: SUPPORTED_LANGUAGES[0].defaultCode }
  ]);
  const [activeFileId, setActiveFileId] = useState('1');
  const [code, setCode] = useState(SUPPORTED_LANGUAGES[0].defaultCode);

  // Output & Execution States
  const [customInput, setCustomInput] = useState('// Enter custom test input STDIN here...\n2 7 11 15\n9');
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionMetrics, setExecutionMetrics] = useState({
    time: '0 ms',
    memory: '0 MB',
    status: 'Ready',
    success: true
  });
  const [activeOutputTab, setActiveOutputTab] = useState('console'); // 'console', 'testcases', 'preview'

  // Problems & Selection States
  const [problemFilter, setProblemFilter] = useState('All'); // 'All', 'Easy', 'Medium', 'Hard', 'Favorites'
  const [selectedProblem, setSelectedProblem] = useState(PRACTICE_PROBLEMS[0]);
  const [problemTab, setProblemTab] = useState('description'); // 'description', 'editorial', 'solution', 'discussion'
  const [openHintIndex, setOpenHintIndex] = useState(null);

  // AI & Chat States
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your VeeruProAc AI Coding Assistant. How can I help you write, debug, or optimize your code today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Find & Replace Modal State
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');

  // Share & Notes States
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [scratchNotes, setScratchNotes] = useState(() => localStorage.getItem('playground_notes') || '');

  // Code History / Snapshots
  const [snapshots, setSnapshots] = useState([
    { id: 1, timestamp: '10 mins ago', code: SUPPORTED_LANGUAGES[0].defaultCode, label: 'Initial Code' }
  ]);

  // Sync active file code with code editor
  useEffect(() => {
    const currentFile = files.find(f => f.id === activeFileId);
    if (currentFile) {
      setCode(currentFile.code);
    }
  }, [activeFileId, files]);

  // Auto save simulator
  useEffect(() => {
    if (!autoSave) return;
    setAutoSaveStatus('Saving...');
    const timer = setTimeout(() => {
      setAutoSaveStatus('Saved ✓');
      setFiles(prev => prev.map(f => f.id === activeFileId ? { ...f, code } : f));
    }, 1000);
    return () => clearTimeout(timer);
  }, [code, activeFileId, autoSave]);

  // Save notes locally
  useEffect(() => {
    localStorage.setItem('playground_notes', scratchNotes);
  }, [scratchNotes]);

  // Change Language Handler
  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setCode(lang.defaultCode);
    setFiles(prev => prev.map(f => f.id === activeFileId ? { ...f, language: lang.id, name: `main.${lang.extension}`, code: lang.defaultCode } : f));
    setOutput('');
    setExecutionMetrics({ time: '0 ms', memory: '0 MB', status: 'Ready', success: true });
    if (lang.id === 'html') {
      setActiveOutputTab('preview');
    }
  };

  // Run Code Simulation Engine
  const handleRunCode = () => {
    setIsExecuting(true);
    setExecutionMetrics({ time: '...', memory: '...', status: 'Running...', success: true });
    setOutput('Compiling and executing code against test environment...\n');

    setTimeout(() => {
      setIsExecuting(false);
      const executionTime = `${Math.floor(Math.random() * 45) + 12} ms`;
      const memoryUsage = `${(Math.random() * 4 + 11).toFixed(1)} MB`;

      if (selectedLanguage.id === 'javascript') {
        try {
          let logs = [];
          const customConsole = {
            log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : a).join(' ')),
            error: (...args) => logs.push('[ERROR] ' + args.join(' ')),
            warn: (...args) => logs.push('[WARN] ' + args.join(' '))
          };
          // Execute safely with custom console capture
          const runFn = new Function('console', code);
          runFn(customConsole);
          setOutput(logs.join('\n') || 'Program executed successfully with no output.');
          setExecutionMetrics({ time: executionTime, memory: memoryUsage, status: 'Success (200 OK)', success: true });
        } catch (err) {
          setOutput(`[Runtime Error] ${err.name}: ${err.message}\n  at Line 12:4`);
          setExecutionMetrics({ time: executionTime, memory: memoryUsage, status: 'Runtime Error', success: false });
        }
      } else if (selectedLanguage.id === 'python') {
        setOutput(`=== Python 3.12 Execution Output ===\nTarget: 9\nIndices of numbers that sum to target: [0, 1]\nValues: 2 + 7 = 9\n\n✓ Process finished with exit code 0`);
        setExecutionMetrics({ time: executionTime, memory: memoryUsage, status: 'Success (200 OK)', success: true });
      } else if (selectedLanguage.id === 'cpp' || selectedLanguage.id === 'c') {
        setOutput(`=== C/C++ Execution Output ===\nChecking string: 'racecar'\nResult: Correct! String is a Palindrome.\n\n✓ Execution completed in ${executionTime}`);
        setExecutionMetrics({ time: executionTime, memory: memoryUsage, status: 'Success (200 OK)', success: true });
      } else if (selectedLanguage.id === 'java') {
        setOutput(`=== Java 21 Execution Output ===\nOriginal Array: [64, 34, 25, 12, 22, 11, 90]\nSorted Array: [11, 12, 22, 25, 34, 64, 90]\nElement 22 found at index: 2\n\n✓ Task finished successfully`);
        setExecutionMetrics({ time: executionTime, memory: memoryUsage, status: 'Success (200 OK)', success: true });
      } else if (selectedLanguage.id === 'sql') {
        setOutput(`+------------+---------------+-----------------------+-------+--------+\n| student_id | name          | course                | score | status |\n+------------+---------------+-----------------------+-------+--------+\n| 104        | Ananya Roy    | C++ Data Structures   | 96    | Passed |\n| 101        | Rahul Sharma  | JavaScript Masterclass| 94    | Passed |\n| 103        | Amit Verma    | Full-Stack Web        | 91    | Passed |\n+------------+---------------+-----------------------+-------+--------+\n3 rows returned in set.`);
        setExecutionMetrics({ time: executionTime, memory: memoryUsage, status: 'Query Executed', success: true });
      } else if (selectedLanguage.id === 'html') {
        setOutput('HTML/CSS Live rendering updated in Preview Tab ✓');
        setActiveOutputTab('preview');
        setExecutionMetrics({ time: '12 ms', memory: '8.4 MB', status: 'Rendered Live', success: true });
      }
    }, 800);
  };

  const handleSideNavClick = (panelName) => {
    if (activeSidePanel === panelName && showLeftDrawer) {
      setShowLeftDrawer(false);
    } else {
      setActiveSidePanel(panelName);
      setShowLeftDrawer(true);
    }
  };

  // AI Feature Handlers
  const triggerAiFeature = (type) => {
    setAiLoading(true);
    setActiveSidePanel('ai');
    setShowLeftDrawer(true);
    setTimeout(() => {
      setAiLoading(false);
      if (type === 'explain') {
        setAiAnalysis({
          title: '💡 AI Code Explanation',
          badge: 'Logic Breakdown',
          content: `1. **Initialization**: The code sets up tracking variables (\`seen\`, \`maxSoFar\`, or pointers).\n2. **Iteration**: Iterates through the collection in O(N) linear time.\n3. **Optimal Condition Check**: Uses Hash Map lookup or comparison to evaluate optimal state.\n4. **Return Result**: Returns calculated result or indices.`
        });
      } else if (type === 'debug') {
        setAiAnalysis({
          title: '🐛 AI Debug Analysis',
          badge: 'No Bugs Detected',
          content: `✓ Syntax check passed.\n✓ Boundary conditions validated.\n✓ No memory leaks or unhandled null dereferences detected.\n\n**Tip**: Ensure target integers stay within 32-bit signed integer range.`
        });
      } else if (type === 'optimize') {
        setAiAnalysis({
          title: '⚡ AI Optimization Advisor',
          badge: 'Complexity O(N)',
          content: `• **Current Time Complexity**: O(N)\n• **Space Complexity**: O(N)\n\n**Suggested Optimization**: Your current algorithm is optimal for time efficiency! You can further save memory by using two-pointer in-place traversal where applicable.`
        });
      } else if (type === 'testcases') {
        setAiAnalysis({
          title: '🧪 AI Edge Case Generator',
          badge: '4 Cases Generated',
          content: `1. **Empty Input**: \`nums = []\` → Expected Output: \`[]\`\n2. **Negative Numbers**: \`nums = [-5, -2, -8], target = -10\`\n3. **Duplicate Values**: \`nums = [3, 3], target = 6\`\n4. **Large Integers**: \`nums = [10^9, 10^9], target = 2*10^9\``
        });
      } else if (type === 'convert') {
        setAiAnalysis({
          title: '🌐 AI Code Transpiler',
          badge: 'Language Conversion',
          content: `\`\`\`python\n# Transpiled to Python 3\ndef algorithm(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen:\n            return [seen[target - n], i]\n        seen[n] = i\n    return []\n\`\`\``
        });
      }
    }, 600);
  };

  // AI Chat Handler
  const handleSendChatMessage = (e) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      let reply = "Great question! Based on your code snippet, this approach achieves O(N) time complexity. You can test edge cases using the custom STDIN input panel below.";
      if (userMsg.toLowerCase().includes('time') || userMsg.toLowerCase().includes('complexity')) {
        reply = "The time complexity is **O(N)** because we traverse the array in a single loop. Space complexity is **O(N)** for the Hash Map storage.";
      } else if (userMsg.toLowerCase().includes('debug') || userMsg.toLowerCase().includes('error')) {
        reply = "To debug runtime errors, check array bounds and verify that objects exist before accessing properties.";
      }
      setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 700);
  };

  // New File Tab Creation
  const handleAddNewFile = () => {
    const newId = String(files.length + 1);
    const newFile = {
      id: newId,
      name: `snippet_${newId}.${selectedLanguage.extension}`,
      language: selectedLanguage.id,
      code: `// New Code Snippet #${newId}\nconsole.log("Hello from new file!");`
    };
    setFiles(prev => [...prev, newFile]);
    setActiveFileId(newId);
  };

  const handleCloseFile = (id, e) => {
    e.stopPropagation();
    if (files.length <= 1) return;
    const filtered = files.filter(f => f.id !== id);
    setFiles(filtered);
    if (activeFileId === id) {
      setActiveFileId(filtered[0].id);
    }
  };

  // Code Formatting
  const handleFormatCode = () => {
    try {
      const formatted = code
        .split('\n')
        .map(line => line.trim())
        .join('\n')
        .replace(/\{/g, ' {\n  ')
        .replace(/;/g, ';\n');
      setCode(formatted);
    } catch (e) {
      // fallback
    }
  };

  // Snapshot Saver
  const handleSaveSnapshot = () => {
    const newSnap = {
      id: snapshots.length + 1,
      timestamp: new Date().toLocaleTimeString(),
      code: code,
      label: `Snapshot #${snapshots.length + 1}`
    };
    setSnapshots(prev => [newSnap, ...prev]);
    alert('Code Snapshot Saved to Version History!');
  };

  // Filtered Problems
  const filteredProblems = PRACTICE_PROBLEMS.filter(p => {
    if (problemFilter === 'Easy') return p.difficulty === 'Easy';
    if (problemFilter === 'Medium') return p.difficulty === 'Medium';
    if (problemFilter === 'Hard') return p.difficulty === 'Hard';
    if (problemFilter === 'Favorites') return p.favorite;
    return true;
  });

  return (
    <div className={`h-screen flex flex-col overflow-hidden ${theme === 'dark' ? 'bg-[#FFFFFF] text-gray-800' : 'bg-[#FFFFFF] text-slate-900'} transition-colors duration-300 font-sans`}>
      
      {/* 1. STICKY TOP HEADER */}
      <header className="shrink-0 z-40 border-b border-black dark:border-gray-800 bg-white dark:bg-[#171717] px-4 py-2.5 shadow-none transition-colors">
        <div className="mx-auto flex flex-wrap items-center justify-between gap-3 max-w-[1700px]">
          
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 rounded-none border border-black dark:border-gray-700 bg-white dark:bg-[#262626] px-3 py-1.5 text-xs font-bold text-black dark:text-gray-200 transition hover:bg-[#FF9100] hover:text-black"
            >
              ← Back
            </button>

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-none bg-[#FF9100] text-white font-bold border border-black">
                <Code2 className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight leading-none flex items-center gap-2 text-black dark:text-white uppercase">
                  VeeruProAc Playground
                  <span className="rounded-none bg-[#FF9100] px-2 py-0.5 text-[10px] font-extrabold text-white border border-black">
                    PRO v2.4
                  </span>
                </h1>
                <span className="text-[11px] text-gray-600 dark:text-gray-400 font-medium">Interactive Multi-Language Code Lab</span>
              </div>
            </div>
          </div>

          {/* Language Selector Dropdown & Quick Badges */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <div className="flex items-center rounded-none bg-gray-100 dark:bg-[#262626] p-1 border border-black dark:border-gray-700">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => handleLanguageChange(lang)}
                  className={`flex items-center gap-1.5 rounded-none px-2.5 py-1 text-xs font-bold transition-all ${
                    selectedLanguage.id === lang.id
                      ? 'bg-[#FF9100] text-white border border-black'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <span>{lang.icon}</span>
                  <span className="hidden sm:inline">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            
            {/* Auto Save Status */}
            <span className="hidden md:flex items-center gap-1.5 text-[11px] font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#262626] px-2.5 py-1 rounded-none border border-black dark:border-gray-700">
              <span className={`h-2 w-2 rounded-full ${autoSaveStatus.includes('Saved') ? 'bg-emerald-500' : 'bg-[#FF9100] animate-pulse'}`} />
              {autoSaveStatus}
            </span>

            {/* Font Size Adjusters */}
            <div className="flex items-center rounded-none border border-black dark:border-gray-700 bg-white dark:bg-[#262626] p-0.5">
              <button
                onClick={() => setFontSize(s => Math.max(10, s - 1))}
                className="px-2 py-1 text-xs font-bold text-black dark:text-gray-200 hover:bg-[#FF9100] hover:text-black transition-none"
                title="Decrease Font Size"
              >
                A-
              </button>
              <span className="px-1 text-[11px] font-mono font-bold text-black dark:text-gray-200">{fontSize}px</span>
              <button
                onClick={() => setFontSize(s => Math.min(24, s + 1))}
                className="px-2 py-1 text-xs font-bold text-black dark:text-gray-200 hover:bg-[#FF9100] hover:text-black transition-none"
                title="Increase Font Size"
              >
                A+
              </button>
            </div>

            {/* Focus Mode & Panel Toggles */}
            <button
              onClick={() => setFocusMode(!focusMode)}
              className={`flex items-center gap-1 rounded-none border border-black dark:border-gray-700 px-2.5 py-1.5 text-xs font-bold transition-none ${
                focusMode
                  ? 'bg-[#FF9100] text-white'
                  : 'bg-white dark:bg-[#262626] text-black dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title="Toggle Full Editor Focus Mode"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>{focusMode ? 'Exit Focus' : 'Focus Mode'}</span>
            </button>

            <button
              onClick={() => setShowOutputPanel(!showOutputPanel)}
              className={`hidden sm:flex items-center gap-1 rounded-none border border-black dark:border-gray-700 px-2.5 py-1.5 text-xs font-bold transition-none ${
                showOutputPanel
                  ? 'bg-white dark:bg-[#262626] text-black dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-500'
              }`}
              title="Toggle Output Console Panel"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Console</span>
            </button>

            {/* Format Code */}
            <button
              onClick={handleFormatCode}
              className="hidden lg:flex items-center gap-1 rounded-none border border-black dark:border-gray-700 bg-white dark:bg-[#262626] px-2.5 py-1.5 text-xs font-bold text-black dark:text-gray-200 hover:bg-[#FF9100] hover:text-black transition-none"
              title="Format Code"
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Format</span>
            </button>

            {/* Run Button */}
            <button
              onClick={handleRunCode}
              disabled={isExecuting}
              className="flex items-center gap-2 rounded-none bg-[#FF9100] border border-black px-4 py-1.5 text-xs font-black text-white hover:bg-orange-600 transition-none disabled:opacity-50 cursor-pointer"
            >
              <Play className={`h-3.5 w-3.5 fill-white ${isExecuting ? 'animate-spin' : ''}`} />
              <span>{isExecuting ? 'Running...' : 'Run Code'}</span>
              <span className="hidden xl:inline text-[10px] opacity-90 font-bold bg-black/20 px-1.5 py-0.5 rounded-none">Ctrl+Enter</span>
            </button>

            {/* Save Button */}
            <button
              onClick={handleSaveSnapshot}
              className="flex items-center gap-1.5 rounded-none border border-black dark:border-gray-700 bg-black text-white px-3 py-1.5 text-xs font-bold hover:bg-gray-800 transition-none"
            >
              <Save className="h-3.5 w-3.5 text-[#FF9100]" />
              <span className="hidden sm:inline">Save</span>
            </button>

            {/* Share Button */}
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-1.5 rounded-none border border-black dark:border-gray-700 bg-white dark:bg-[#262626] px-3 py-1.5 text-xs font-bold text-black dark:text-gray-200 hover:bg-[#FF9100] hover:text-black transition-none"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN WORKSPACE SPLIT LAYOUT */}
      <div className="w-full flex flex-1 overflow-hidden">
        
        {/* COLLAPSIBLE SIDE NAV (FEATURE PANELS SWITCHER) */}
        {!focusMode && (
          <aside className={`w-14 shrink-0 border-r ${theme === 'dark' ? 'border-slate-200 bg-[#FFFFFF]' : 'border-slate-200 bg-white'} flex flex-col items-center py-4 gap-4 z-20`}>
            <button
              onClick={() => handleSideNavClick('problems')}
              className={`p-2.5 rounded-xl transition relative group ${activeSidePanel === 'problems' && showLeftDrawer ? 'bg-[#FF9100] text-white shadow-lg shadow-[#FF9100]/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
              title="Practice Problems"
            >
              <Trophy className="h-5 w-5" />
              <span className="absolute left-16 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition whitespace-nowrap z-50">
                Problems Lab
              </span>
            </button>

            <button
              onClick={() => handleSideNavClick('ai')}
              className={`p-2.5 rounded-xl transition relative group ${activeSidePanel === 'ai' && showLeftDrawer ? 'bg-[#FF9100] text-white shadow-lg shadow-slate-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
              title="AI Code Assistant"
            >
              <Bot className="h-5 w-5" />
              <span className="absolute left-16 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition whitespace-nowrap z-50">
                AI Assistant
              </span>
            </button>

            <button
              onClick={() => handleSideNavClick('progress')}
              className={`p-2.5 rounded-xl transition relative group ${activeSidePanel === 'progress' && showLeftDrawer ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
              title="Progress & Statistics"
            >
              <Zap className="h-5 w-5" />
              <span className="absolute left-16 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition whitespace-nowrap z-50">
                Coding Stats
              </span>
            </button>

            <button
              onClick={() => handleSideNavClick('learning')}
              className={`p-2.5 rounded-xl transition relative group ${activeSidePanel === 'learning' && showLeftDrawer ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
              title="Learning & Cheat Sheets"
            >
              <BookOpen className="h-5 w-5" />
              <span className="absolute left-16 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition whitespace-nowrap z-50">
                Cheat Sheets
              </span>
            </button>

            <button
              onClick={() => handleSideNavClick('management')}
              className={`p-2.5 rounded-xl transition relative group ${activeSidePanel === 'management' && showLeftDrawer ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
              title="Code & Files Management"
            >
              <FileCode className="h-5 w-5" />
              <span className="absolute left-16 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition whitespace-nowrap z-50">
                Files & Snapshots
              </span>
            </button>

            <button
              onClick={() => handleSideNavClick('settings')}
              className={`p-2.5 rounded-xl transition relative group ${activeSidePanel === 'settings' && showLeftDrawer ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
              title="Editor Settings"
            >
              <Sliders className="h-5 w-5" />
              <span className="absolute left-16 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition whitespace-nowrap z-50">
                Settings
              </span>
            </button>
          </aside>
        )}

        {/* SIDE FEATURE DRAWER / PANEL */}
        {showLeftDrawer && !focusMode && (
          <div className="w-80 lg:w-96 shrink-0 border-r border-slate-200 bg-[#FFFFFF] overflow-y-auto p-4 flex flex-col gap-4 z-10 transition-all">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {activeSidePanel === 'problems' ? 'Problems Lab' :
                 activeSidePanel === 'ai' ? 'AI Assistant' :
                 activeSidePanel === 'progress' ? 'Coding Stats' :
                 activeSidePanel === 'learning' ? 'Cheat Sheets' :
                 activeSidePanel === 'management' ? 'Files & Snapshots' : 'Settings'}
              </span>
              <button
                onClick={() => setShowLeftDrawer(false)}
                className="text-xs font-bold text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded transition"
              >
                Close ←
              </button>
            </div>
            
            {/* PANEL 1: PRACTICE PROBLEMS */}
            {activeSidePanel === 'problems' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-[#FF9100]" /> Practice Problems
                </h2>
                <span className="text-[11px] font-bold bg-[#FF9100]/10 text-[#FF9100] px-2 py-0.5 rounded-full border border-[#FF9100]/20">
                  {PRACTICE_PROBLEMS.length} Available
                </span>
              </div>

              {/* Difficulty Filters */}
              <div className="flex flex-wrap gap-1 bg-slate-800/40 p-1 rounded-lg border border-slate-700/50">
                {['All', 'Easy', 'Medium', 'Hard', 'Favorites'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setProblemFilter(filter)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition ${
                      problemFilter === filter
                        ? 'bg-[#FF9100] text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Problems List */}
              <div className="space-y-2">
                {filteredProblems.map(problem => (
                  <div
                    key={problem.id}
                    onClick={() => setSelectedProblem(problem)}
                    className={`p-3 rounded-xl border transition cursor-pointer ${
                      selectedProblem.id === problem.id
                        ? 'border-[#FF9100] bg-[#FF9100]/10 shadow-sm'
                        : 'border-slate-200/80 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        problem.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        problem.difficulty === 'Medium' ? 'bg-[#FF9100]/20 text-orange-400 border border-[#FF9100]/30' :
                        'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {problem.difficulty}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {problem.solved && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                        {problem.favorite && <Star className="h-3.5 w-3.5 text-orange-400 fill-orange-400" />}
                      </div>
                    </div>

                    <h3 className="text-xs font-bold text-slate-200 line-clamp-1">{problem.title}</h3>
                    <p className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                      <span>{problem.category}</span>
                      <span className="font-mono text-[10px] text-slate-500">{problem.language}</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Problem Viewer Modal Details inside Drawer */}
              {selectedProblem && (
                <div className="mt-6 pt-4 border-t border-slate-200 space-y-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setProblemTab('description')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg ${problemTab === 'description' ? 'bg-[#FF9100] text-white' : 'text-slate-400 bg-slate-800/50'}`}
                    >
                      Details
                    </button>
                    <button
                      onClick={() => setProblemTab('editorial')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg ${problemTab === 'editorial' ? 'bg-[#FF9100] text-white' : 'text-slate-400 bg-slate-800/50'}`}
                    >
                      Editorial
                    </button>
                    <button
                      onClick={() => setProblemTab('solution')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg ${problemTab === 'solution' ? 'bg-[#FF9100] text-white' : 'text-slate-400 bg-slate-800/50'}`}
                    >
                      Solution
                    </button>
                  </div>

                  {problemTab === 'description' && (
                    <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                      <h4 className="font-bold text-sm text-white">{selectedProblem.title}</h4>
                      <p>{selectedProblem.description}</p>
                      
                      <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-200 font-mono text-[11px]">
                        <span className="text-slate-400 font-bold block mb-1">Constraints:</span>
                        <pre className="whitespace-pre-wrap text-orange-300">{selectedProblem.constraints}</pre>
                      </div>

                      <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-200 font-mono text-[11px]">
                        <span className="text-slate-400 font-bold block mb-1">Sample Input:</span>
                        <code className="text-emerald-400">{selectedProblem.sampleInput}</code>
                        <span className="text-slate-400 font-bold block mt-2 mb-1">Sample Output:</span>
                        <code className="text-slate-300">{selectedProblem.sampleOutput}</code>
                      </div>

                      {/* Hints Collapsible */}
                      <div className="space-y-2">
                        <span className="font-bold text-slate-400 flex items-center gap-1 text-xs">
                          <Lightbulb className="h-3.5 w-3.5 text-orange-400" /> Hints:
                        </span>
                        {selectedProblem.hints.map((hint, idx) => (
                          <div key={idx} className="bg-slate-900/60 rounded-lg p-2 border border-slate-200">
                            <button
                              onClick={() => setOpenHintIndex(openHintIndex === idx ? null : idx)}
                              className="flex w-full items-center justify-between text-[11px] font-bold text-orange-400"
                            >
                              <span>Hint #{idx + 1}</span>
                              <span>{openHintIndex === idx ? '▲' : '▼'}</span>
                            </button>
                            {openHintIndex === idx && (
                              <p className="mt-1.5 text-[11px] text-slate-300 border-t border-slate-200 pt-1.5">{hint}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {problemTab === 'editorial' && (
                    <div className="space-y-2 text-xs leading-relaxed text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-200">
                      <h4 className="font-bold text-white text-xs">Approach & Strategy</h4>
                      <p>{selectedProblem.editorial}</p>
                    </div>
                  )}

                  {problemTab === 'solution' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400">Solution Code:</span>
                        <button
                          onClick={() => setCode(selectedProblem.solutionCode)}
                          className="text-[10px] bg-[#FF9100] text-white px-2 py-0.5 rounded font-bold hover:bg-orange-600 transition"
                        >
                          Load into Editor →
                        </button>
                      </div>
                      <pre className="bg-slate-900 p-3 rounded-lg border border-slate-200 font-mono text-[11px] text-emerald-400 overflow-x-auto">
                        {selectedProblem.solutionCode}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* PANEL 2: AI ASSISTANT & ONE-CLICK AI TOOLS */}
          {activeSidePanel === 'ai' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Bot className="h-4 w-4 text-[#FF9100]" /> AI Code Assistant
                </h2>
                <span className="text-[10px] bg-[#FFFFFF]0/10 text-slate-400 px-2 py-0.5 rounded-full font-bold border border-slate-500/20">
                  GPT-4o Powered
                </span>
              </div>

              {/* 5 One-Click AI Action Buttons */}
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => triggerAiFeature('explain')}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-slate-900/60 hover:bg-slate-900/20 hover:border-slate-500/40 transition text-left text-xs font-bold text-slate-200"
                >
                  <Lightbulb className="h-4 w-4 text-orange-400 shrink-0" />
                  <div>
                    <div>Explain Code</div>
                    <div className="text-[10px] text-slate-400 font-normal">Line-by-line breakdown</div>
                  </div>
                </button>

                <button
                  onClick={() => triggerAiFeature('debug')}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-slate-900/60 hover:bg-rose-900/20 hover:border-rose-500/40 transition text-left text-xs font-bold text-slate-200"
                >
                  <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
                  <div>
                    <div>Debug Code & Find Errors</div>
                    <div className="text-[10px] text-slate-400 font-normal">Auto syntax & logic diagnosis</div>
                  </div>
                </button>

                <button
                  onClick={() => triggerAiFeature('optimize')}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-slate-900/60 hover:bg-emerald-900/20 hover:border-emerald-500/40 transition text-left text-xs font-bold text-slate-200"
                >
                  <Zap className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div>
                    <div>Optimize Code</div>
                    <div className="text-[10px] text-slate-400 font-normal">Improve Time & Space complexity</div>
                  </div>
                </button>

                <button
                  onClick={() => triggerAiFeature('testcases')}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-slate-900/60 hover:bg-blue-900/20 hover:border-blue-500/40 transition text-left text-xs font-bold text-slate-200"
                >
                  <Sparkles className="h-4 w-4 text-blue-400 shrink-0" />
                  <div>
                    <div>Generate Test Cases</div>
                    <div className="text-[10px] text-slate-400 font-normal">Create edge case inputs</div>
                  </div>
                </button>

                <button
                  onClick={() => triggerAiFeature('convert')}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 bg-slate-900/60 hover:bg-orange-900/20 hover:border-[#FF9100]/40 transition text-left text-xs font-bold text-slate-200"
                >
                  <RefreshCw className="h-4 w-4 text-[#FF9100] shrink-0" />
                  <div>
                    <div>Convert Language</div>
                    <div className="text-[10px] text-slate-400 font-normal">Transpile to Python, JS, C++</div>
                  </div>
                </button>
              </div>

              {/* AI Result Card */}
              {aiLoading && (
                <div className="p-4 rounded-xl border border-slate-500/30 bg-slate-950/20 text-center space-y-2">
                  <Bot className="h-6 w-6 text-slate-400 animate-spin mx-auto" />
                  <p className="text-xs text-slate-300 font-bold">Analyzing code structure...</p>
                </div>
              )}

              {aiAnalysis && !aiLoading && (
                <div className="p-3.5 rounded-xl border border-slate-500/40 bg-slate-900/90 space-y-2 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">{aiAnalysis.title}</span>
                    <span className="text-[10px] font-bold bg-[#FFFFFF]0/20 text-slate-300 px-2 py-0.5 rounded-full">
                      {aiAnalysis.badge}
                    </span>
                  </div>
                  <pre className="whitespace-pre-wrap text-[11px] text-slate-300 font-sans leading-relaxed border-t border-slate-200 pt-2">
                    {aiAnalysis.content}
                  </pre>
                </div>
              )}

              {/* AI Chat Window */}
              <div className="pt-2 border-t border-slate-200">
                <h3 className="text-xs font-bold text-slate-400 mb-2">Interactive AI Chat Assistant</h3>
                <div className="h-48 overflow-y-auto space-y-2 p-2 rounded-xl bg-slate-900/80 border border-slate-200">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-xl p-2 text-[11px] leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#FF9100] text-white rounded-br-none'
                          : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChatMessage} className="mt-2 flex gap-1.5">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask AI anything about your code..."
                    className="flex-1 rounded-lg bg-slate-900 px-3 py-1.5 text-xs text-white border border-slate-700 focus:outline-none focus:border-slate-500"
                  />
                  <button type="submit" className="bg-[#FF9100] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-700 transition">
                    Send
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* PANEL 3: PROGRESS & CODING STATISTICS */}
          {activeSidePanel === 'progress' && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Zap className="h-4 w-4 text-emerald-400" /> Coding Dashboard & Stats
              </h2>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Problems Solved</span>
                  <div className="text-xl font-black text-emerald-400 mt-1">48 / 150</div>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Accuracy Rate</span>
                  <div className="text-xl font-black text-[#FF9100] mt-1">94.2%</div>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Current Streak</span>
                  <div className="text-xl font-black text-orange-400 mt-1 flex items-center justify-center gap-1">
                    <Flame className="h-5 w-5 text-[#FF9100] fill-[#FF9100]" /> 7 Days
                  </div>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Total Coding XP</span>
                  <div className="text-xl font-black text-slate-400 mt-1">1,450 XP</div>
                </div>
              </div>

              {/* Language Breakdown */}
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-300 block">Language Mastery</span>
                <div className="space-y-1.5 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                      <span>JavaScript</span>
                      <span className="font-bold text-orange-400">45%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-400 w-[45%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                      <span>Python</span>
                      <span className="font-bold text-blue-400">35%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-400 w-[35%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                      <span>C++ & SQL</span>
                      <span className="font-bold text-slate-400">20%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-400 w-[20%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges Earned */}
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-300 block">Badges & Accomplishments</span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/60">
                    <Trophy className="h-5 w-5 text-orange-400 mx-auto mb-1" />
                    <span className="text-[10px] font-bold text-slate-300 block">Code Ninja</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/60">
                    <Zap className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
                    <span className="text-[10px] font-bold text-slate-300 block">Speed Demon</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/60">
                    <Bot className="h-5 w-5 text-slate-400 mx-auto mb-1" />
                    <span className="text-[10px] font-bold text-slate-300 block">AI Master</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PANEL 4: LEARNING & CHEAT SHEETS */}
          {activeSidePanel === 'learning' && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-400" /> Cheat Sheets & References
              </h2>

              {/* Scratchpad Notes */}
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-200 space-y-1.5">
                <span className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>Quick Scratchpad Notes</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Auto-saved</span>
                </span>
                <textarea
                  value={scratchNotes}
                  onChange={(e) => setScratchNotes(e.target.value)}
                  placeholder="Write your notes, algorithm steps, or formulas here..."
                  className="w-full h-24 bg-slate-950 p-2 text-xs text-slate-200 font-mono rounded-lg border border-slate-200 focus:outline-none"
                />
              </div>

              {/* Syntax Cheat Sheet */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 block">
                  {selectedLanguage.name} Syntax Cheat Sheet
                </span>
                {(SYNTAX_CHEATSHEETS[selectedLanguage.id] || SYNTAX_CHEATSHEETS.python).map((item, idx) => (
                  <div key={idx} className="bg-slate-900 p-2.5 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-orange-400">{item.title}</span>
                    <pre className="text-[11px] font-mono text-slate-300 bg-slate-950 p-1.5 rounded overflow-x-auto">
                      {item.code}
                    </pre>
                  </div>
                ))}
              </div>

              {/* Time Complexity Matrix */}
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-300 block">Big-O Time Complexity Guide</span>
                <div className="space-y-1 text-[11px]">
                  {TIME_COMPLEXITY_GUIDE.map((guide, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-200/60 last:border-none">
                      <span className="font-mono font-bold text-orange-400">{guide.notation}</span>
                      <span className="text-slate-300 text-[10px]">{guide.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PANEL 5: CODE & SNAPSHOT MANAGEMENT */}
          {activeSidePanel === 'management' && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <FileCode className="h-4 w-4 text-slate-300" /> Files & Version History
              </h2>

              <div className="flex gap-2">
                <button
                  onClick={handleAddNewFile}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-[#FF9100] text-white py-2 rounded-xl text-xs font-bold hover:bg-orange-600 transition"
                >
                  <Plus className="h-4 w-4" /> New File Tab
                </button>
              </div>

              {/* Snapshots Timeline */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 block">Saved Version Snapshots</span>
                {snapshots.map(snap => (
                  <div key={snap.id} className="bg-slate-900 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-200">{snap.label}</div>
                      <div className="text-[10px] text-slate-500">{snap.timestamp}</div>
                    </div>
                    <button
                      onClick={() => {
                        setCode(snap.code);
                        alert(`Restored ${snap.label}!`);
                      }}
                      className="px-2 py-1 text-[10px] font-bold bg-[#FFFFFF]0/20 text-slate-300 rounded border border-slate-500/30 hover:bg-[#FFFFFF]0/40 transition"
                    >
                      Restore
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PANEL 6: SETTINGS */}
          {activeSidePanel === 'settings' && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Sliders className="h-4 w-4 text-slate-300" /> Playground Customization
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Editor Theme</label>
                  <select
                    value={editorTheme}
                    onChange={(e) => setEditorTheme(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 focus:outline-none"
                  >
                    <option value="vscode-dark">VS Code Dark</option>
                    <option value="monokai">Monokai Dark</option>
                    <option value="cyberpunk">Cyberpunk Neon</option>
                    <option value="light">Elegant Light</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 font-bold block mb-1">Tab Size</label>
                  <div className="flex gap-2">
                    {[2, 4].map(size => (
                      <button
                        key={size}
                        onClick={() => setTabSize(size)}
                        className={`flex-1 py-1.5 rounded-lg border font-bold ${tabSize === size ? 'bg-[#FF9100] border-[#FF9100] text-white' : 'border-slate-200 text-slate-400'}`}
                      >
                        {size} Spaces
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-300">Word Wrap</span>
                  <input
                    type="checkbox"
                    checked={wordWrap}
                    onChange={(e) => setWordWrap(e.target.checked)}
                    className="h-4 w-4 rounded accent-[#FF9100]"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-300">Auto Save Code</span>
                  <input
                    type="checkbox"
                    checked={autoSave}
                    onChange={(e) => setAutoSave(e.target.checked)}
                    className="h-4 w-4 rounded accent-[#FF9100]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        )}

        {/* CENTER PANEL: CODE EDITOR WITH FILE TABS */}
        <main className="flex-1 flex flex-col min-w-0 border-r border-slate-200/80 bg-[#0A0F1D] overflow-hidden">
          
          {/* File Tabs Bar */}
          <div className="flex items-center justify-between border-b border-slate-200/80 bg-[#080D1A] px-2 py-1.5">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {files.map(file => (
                <div
                  key={file.id}
                  onClick={() => setActiveFileId(file.id)}
                  className={`flex items-center gap-2 rounded-t-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer border-t-2 ${
                    activeFileId === file.id
                      ? 'bg-[#0A0F1D] text-white border-[#FF9100]'
                      : 'text-slate-400 hover:bg-slate-800/40 border-transparent'
                  }`}
                >
                  <FileCode className="h-3.5 w-3.5 text-[#FF9100]" />
                  <span>{file.name}</span>
                  {files.length > 1 && (
                    <X
                      onClick={(e) => handleCloseFile(file.id, e)}
                      className="h-3 w-3 text-slate-500 hover:text-white rounded transition"
                    />
                  )}
                </div>
              ))}
              <button
                onClick={handleAddNewFile}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
                title="New Tab"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Quick Editor Helpers */}
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setWordWrap(!wordWrap)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                  wordWrap ? 'bg-[#FF9100]/20 text-[#FF9100] font-bold border border-[#FF9100]/30' : 'text-slate-400 hover:text-white bg-slate-800/40'
                }`}
                title="Toggle Word Wrap"
              >
                Wrap: {wordWrap ? 'On' : 'Off'}
              </button>
              <button
                onClick={() => setShowFindReplace(!showFindReplace)}
                className="text-slate-400 hover:text-white p-1 rounded"
                title="Find & Replace"
              >
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Find & Replace Search Bar */}
          {showFindReplace && (
            <div className="p-2 bg-slate-900 border-b border-slate-200 flex flex-wrap items-center gap-2 text-xs">
              <input
                type="text"
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                placeholder="Find text..."
                className="bg-slate-950 px-2.5 py-1 text-white rounded border border-slate-700 focus:outline-none"
              />
              <input
                type="text"
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                placeholder="Replace with..."
                className="bg-slate-950 px-2.5 py-1 text-white rounded border border-slate-700 focus:outline-none"
              />
              <button
                onClick={() => {
                  if (!findText) return;
                  setCode(prev => prev.replaceAll(findText, replaceText));
                }}
                className="bg-[#FF9100] text-white px-2.5 py-1 rounded font-bold hover:bg-slate-700 transition"
              >
                Replace All
              </button>
            </div>
          )}

          {/* Interactive Code Editor Area */}
          <div className="flex-1 flex overflow-hidden font-mono text-sm relative bg-[#0D1117]">
            
            {/* Line Numbers Column */}
            <div className="w-12 shrink-0 py-4 bg-[#161B22] text-[#F59E0B] text-right pr-3 select-none text-xs leading-6 border-r border-gray-800 font-mono font-bold">
              {code.split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Code Textarea Input */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{ fontSize: `${fontSize}px` }}
              wrap={wordWrap ? 'soft' : 'off'}
              spellCheck="false"
              className="flex-1 bg-[#0D1117] text-white p-4 leading-6 border-none resize-none focus:outline-none font-mono selection:bg-[#FF9100] selection:text-black font-semibold tracking-wide"
            />
          </div>

          {/* Editor Status Bar Footer */}
          <div className="border-t border-slate-200/80 bg-[#080D1A] px-4 py-1 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <div className="flex items-center gap-4">
              <span>UTF-8</span>
              <span>Tab Size: {tabSize}</span>
              <span>{selectedLanguage.name} ({selectedLanguage.version})</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Lines: {code.split('\n').length}</span>
              <span>Chars: {code.length}</span>
            </div>
          </div>
        </main>

        {/* RIGHT PANEL: OUTPUT CONSOLE, TEST CASES & LIVE HTML PREVIEW */}
        {!focusMode && showOutputPanel && (
          <section className={`w-80 lg:w-[380px] xl:w-[420px] shrink-0 border-l ${theme === 'dark' ? 'border-slate-200 bg-[#0B1224]' : 'border-slate-200 bg-white'} flex flex-col overflow-hidden`}>
            
            {/* Output Panel Header Tabs */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-[#080D1A] px-3 py-2">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveOutputTab('console')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                  activeOutputTab === 'console'
                    ? 'bg-[#FF9100] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Console Output
              </button>
              <button
                onClick={() => setActiveOutputTab('testcases')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                  activeOutputTab === 'testcases'
                    ? 'bg-[#FF9100] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Test Cases
              </button>
              {selectedLanguage.id === 'html' && (
                <button
                  onClick={() => setActiveOutputTab('preview')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                    activeOutputTab === 'preview'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Live Preview 🌐
                </button>
              )}
            </div>

            <button
              onClick={() => setOutput('')}
              className="text-slate-400 hover:text-rose-400 p-1 rounded transition"
              title="Clear Console"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Execution Metrics Bar */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900/60 px-4 py-2 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="h-3.5 w-3.5 text-blue-400" /> {executionMetrics.time}
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Cpu className="h-3.5 w-3.5 text-slate-400" /> {executionMetrics.memory}
              </span>
            </div>
            <span className={`font-bold px-2 py-0.5 rounded ${
              executionMetrics.success ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
            }`}>
              {executionMetrics.status}
            </span>
          </div>

          {/* TAB CONTENT 1: CONSOLE OUTPUT */}
          {activeOutputTab === 'console' && (
            <div className="flex-1 flex flex-col p-4 overflow-y-auto bg-slate-950 font-mono text-xs text-slate-200 leading-relaxed">
              {output ? (
                <pre className="whitespace-pre-wrap text-emerald-400 font-mono">{output}</pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-[#FF9100] gap-2">
                  <Terminal className="h-8 w-8 text-slate-700" />
                  <p>Click "Run Code" above to execute program output.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT 2: TEST CASES & CUSTOM STDIN */}
          {activeOutputTab === 'testcases' && (
            <div className="flex-1 flex flex-col p-4 overflow-y-auto space-y-4 bg-slate-950 text-xs">
              
              {/* Custom STDIN Textarea */}
              <div className="space-y-1">
                <span className="font-bold text-slate-300 block">Custom Input (STDIN)</span>
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="w-full h-24 bg-slate-900 p-2.5 rounded-lg border border-slate-200 text-slate-200 font-mono focus:outline-none"
                />
              </div>

              {/* Preconfigured Test Cases */}
              <div className="space-y-2">
                <span className="font-bold text-slate-300 block">Problem Test Cases Status</span>
                {selectedProblem?.testCases.map((tc) => (
                  <div key={tc.id} className="p-3 rounded-lg bg-slate-900 border border-slate-200 space-y-1">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-slate-300">Test Case #{tc.id}</span>
                      <span className="text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded text-[10px]">
                        ✓ {tc.status}
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-slate-400">
                      Input: <code className="text-orange-300">{tc.input}</code>
                    </div>
                    <div className="font-mono text-[11px] text-slate-400">
                      Expected Output: <code className="text-emerald-300">{tc.expected}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB CONTENT 3: LIVE HTML PREVIEW IFRAME */}
          {activeOutputTab === 'preview' && selectedLanguage.id === 'html' && (
            <div className="flex-1 bg-white">
              <iframe
                title="Live Output Preview"
                srcDoc={code}
                className="w-full h-full border-none"
              />
            </div>
          )}

          </section>
        )}

      </div>

      {/* SHARE MODAL */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-200 p-6 rounded-2xl shadow-2xl text-white space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Share2 className="h-5 w-5 text-[#FF9100]" /> Share Playground Session
              </h3>
              <button onClick={() => setShowShareModal(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-xs text-slate-400">
              Share your live playground code snippet with peers or instructors instantly.
            </p>

            <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-200">
              <input
                type="text"
                readOnly
                value={window.location.href}
                className="flex-1 bg-transparent text-xs text-orange-400 font-mono focus:outline-none"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="bg-[#FF9100] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-700 transition"
              >
                {copiedLink ? 'Copied ✓' : 'Copy Link'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PlaygroundPage;
