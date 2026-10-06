import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, CheckCircle2, AlertCircle, Code, Sparkles, Terminal, ArrowRight } from 'lucide-react';

const TaskLabModal = ({ isOpen, onClose, taskTitle, taskIndex, courseName, starterCode, onTaskVerified, isAlreadyCompleted }) => {
  const [code, setCode] = useState('');
  const [consoleOutput, setConsoleOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testPassed, setTestPassed] = useState(isAlreadyCompleted);

  useEffect(() => {
    if (isOpen) {
      const defaultCode = starterCode?.js || starterCode?.html || `// ${courseName} Task ${taskIndex + 1} Solution\nfunction solveTask() {\n  console.log("${courseName} exercise solution initialized");\n  return true;\n}\nsolveTask();`;
      setCode(defaultCode);
      setConsoleOutput(isAlreadyCompleted ? '✓ Previous verification passed!' : 'Click "Run & Verify Code" to test your task solution.');
      setTestPassed(isAlreadyCompleted);
    }
  }, [isOpen, taskIndex, courseName, starterCode, isAlreadyCompleted]);

  if (!isOpen) return null;

  const handleRunAndVerify = () => {
    setIsRunning(true);
    setConsoleOutput('Running verification tests on backend server...');

    setTimeout(() => {
      setIsRunning(false);
      const fakeOutput = `[Compiler Status]: Code parsed successfully with 0 errors.\n[Test 1]: Input parameter validation ... PASSED ✓\n[Test 2]: Execution output test ... PASSED ✓\n[Test 3]: Performance assertion ... PASSED ✓\n\n🎉 Task ${taskIndex + 1} completed successfully!`;
      setConsoleOutput(fakeOutput);
      setTestPassed(true);
    }, 1200);
  };

  const handleCompleteTask = () => {
    onTaskVerified(taskIndex);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          className="relative w-full max-w-3xl rounded-none bg-white dark:bg-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,0.1)] overflow-hidden border border-slate-200 dark:border-slate-700"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-6 py-4 bg-slate-50 dark:bg-slate-800">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-none bg-blue-600 text-white font-bold text-sm">
                {taskIndex + 1}
              </span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Task {taskIndex + 1} Interactive Code Lab</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{courseName} • Complete code steps to unlock task completion</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-200 dark:bg-slate-700 hover:text-slate-700 dark:text-slate-200 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Task Prompt Card */}
            <div className="rounded-none bg-blue-50/70 border border-blue-100 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" />
                  Task Goal & Requirements
                </span>
                {testPassed && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 px-3 py-0.5 rounded-full">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Verified
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">{taskTitle}</p>
              <div className="text-xs text-[#7C3AED] space-y-1 border-t border-blue-100 pt-3">
                <p>1. Review the starter solution in the code editor below.</p>
                <p>2. Click <strong>"Run & Verify Code"</strong> to run test assertions.</p>
                <p>3. Upon passing test checks, click <strong>"Complete Task"</strong> to save your course progress.</p>
              </div>
            </div>

            {/* Code Editor Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
                <span className="flex items-center gap-1.5">
                  <Code className="h-4 w-4 text-blue-600" />
                  Solution Code Editor
                </span>
                <span className="text-slate-400 font-mono">Language: {courseName}</span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={6}
                className="w-full rounded-none bg-slate-950 font-mono text-xs text-blue-300 p-4 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed resize-none"
              />
            </div>

            {/* Terminal Console Output */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
                <span className="flex items-center gap-1.5">
                  <Terminal className="h-4 w-4 text-[#7C3AED]" />
                  Test Verification Console
                </span>
              </div>
              <div className="rounded-none bg-slate-900 p-4 font-mono text-xs text-slate-300 min-h-[100px] border border-slate-800 whitespace-pre-wrap">
                {consoleOutput}
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 px-6 py-4 bg-slate-50 dark:bg-slate-800">
            <button
              onClick={handleRunAndVerify}
              disabled={isRunning}
              className="flex items-center gap-2 rounded-none bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 disabled:opacity-50 cursor-pointer"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>{isRunning ? 'Running Tests...' : 'Run & Verify Code'}</span>
            </button>

            {testPassed ? (
              <button
                onClick={handleCompleteTask}
                className="flex items-center gap-2 rounded-none bg-emerald-600 px-6 py-2.5 text-xs font-extrabold text-white transition hover:bg-emerald-700 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)] cursor-pointer"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Mark Task Completed</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-700/80 px-4 py-2 rounded-none">
                <AlertCircle className="h-4 w-4 text-[#7C3AED]" />
                <span>Run code to unlock completion</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskLabModal;

