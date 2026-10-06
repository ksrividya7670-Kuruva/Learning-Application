import React from 'react';

const BottomStickyBar = ({ onPrevious, onPractice, onRun, onNext }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 my-6">
      <div className="rounded-full border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900/95 px-6 py-3 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)] backdrop-blur-md transition-all">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onPrevious}
              className="rounded-none border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-slate-50 dark:bg-slate-800 hover:border-slate-300 dark:border-slate-600"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={onPractice}
              className="rounded-none bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 transition hover:bg-slate-200 dark:bg-slate-700"
            >
              Practice
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onRun}
              className="rounded-none bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)] transition hover:bg-blue-700 hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)]"
            >
              Run Code
            </button>
            <button
              type="button"
              onClick={onNext}
              className="rounded-none bg-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)] transition hover:bg-blue-600 hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)]"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomStickyBar;
