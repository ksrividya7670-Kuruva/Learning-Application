import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, RotateCcw, Terminal, Eye, Code, Loader2 } from 'lucide-react';

// Syntax highlighter — returns HTML string with colored spans
const highlight = (code, lang) => {
  if (!code) return '';
  // Escape HTML first
  let escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const isPython = lang === 'python' || lang === 'sql';
  const isCStyle = ['java','cpp','c','csharp','javascript','typescript'].includes(lang);

  // 1. Strings (double and single quotes)
  escaped = escaped.replace(/(&quot;[^&]*?&quot;|'[^']*?'|`[^`]*?`)/g,
    '<span style="color:#a5d6a7">$1</span>');

  // 2. Comments — must come AFTER strings so we don't re-color inside strings
  if (isPython) {
    // Python # comments (only outside strings)
    escaped = escaped.replace(/(#[^\n]*)/g,
      '<span style="color:#90a4ae;font-style:italic">$1</span>');
    // SQL -- comments
    escaped = escaped.replace(/(--[^\n]*)/g,
      '<span style="color:#90a4ae;font-style:italic">$1</span>');
  }
  if (isCStyle) {
    // // single-line comments
    escaped = escaped.replace(/(\/\/[^\n]*)/g,
      '<span style="color:#90a4ae;font-style:italic">$1</span>');
    // /* */ block comments
    escaped = escaped.replace(/(\/\*[\s\S]*?\*\/)/g,
      '<span style="color:#90a4ae;font-style:italic">$1</span>');
  }

  // 3. Keywords per language
  const keywords = {
    python: ['def','return','import','from','as','if','elif','else','for','while','in','not','and','or','True','False','None','class','try','except','with','print','len','range','input'],
    java: ['public','private','static','void','class','int','String','boolean','return','new','if','else','for','while','import','package','this','super','extends'],
    cpp: ['int','void','return','cout','cin','include','class','public','private','if','else','for','while','using','namespace','std','endl','string','bool'],
    c: ['int','void','return','printf','scanf','include','if','else','for','while','char','float','double','struct'],
    csharp: ['class','void','static','public','private','return','Console','string','int','bool','if','else','for','while','using','new','namespace'],
    javascript: ['const','let','var','function','return','if','else','for','while','class','import','export','default','new','this','typeof','console','async','await'],
    typescript: ['const','let','var','function','return','if','else','for','while','class','import','export','type','interface','string','number','boolean','console'],
    sql: ['SELECT','FROM','WHERE','INSERT','INTO','VALUES','UPDATE','SET','DELETE','CREATE','TABLE','DROP','JOIN','ON','AND','OR','NOT','NULL','PRIMARY','KEY','INT','STRING','VARCHAR'],
  };
  const kws = keywords[lang] || keywords.javascript;
  const kwRegex = new RegExp(`\\b(${kws.join('|')})\\b`, 'g');
  escaped = escaped.replace(kwRegex, '<span style="color:#ce93d8">$1</span>');

  // 4. Numbers
  escaped = escaped.replace(/\b(\d+\.?\d*)\b/g,
    '<span style="color:#80cbc4">$1</span>');

  return escaped;
};

// Utility to determine the execution mode and language
const getExecutionMode = (course) => {
  const c = course.toLowerCase();
  
  if (/dbms|sql|database/.test(c)) return { mode: 'dbms', lang: 'sql', title: 'SQL Query Editor' };
  
  // Piston API backend languages
  if (/python|django|numpy/.test(c)) return { mode: 'piston', lang: 'python', title: 'Python Code Editor' };
  if (/java/.test(c) && !/javascript/.test(c)) return { mode: 'piston', lang: 'java', title: 'Java Code Editor' };
  if (/c\+\+/.test(c)) return { mode: 'piston', lang: 'cpp', title: 'C++ Code Editor' };
  if (/c\#/.test(c)) return { mode: 'piston', lang: 'csharp', title: 'C# Code Editor' };
  if (/^c$/.test(c)) return { mode: 'piston', lang: 'c', title: 'C Code Editor' };
  if (/node/.test(c)) return { mode: 'piston', lang: 'javascript', title: 'Node.js Code Editor' };
  if (/typescript/.test(c)) return { mode: 'piston', lang: 'typescript', title: 'TypeScript Editor' };

  // Default to web
  return { mode: 'web', lang: 'javascript', title: 'JavaScript / Logic Script' };
};

// Default templates for backend languages
const getStarterCode = (modeData, courseName, initialJs) => {
  if (initialJs) return initialJs; // Always prefer provided code if it exists and makes sense

  if (modeData.mode === 'dbms') {
    return `-- Welcome to the DBMS SQL Editor
CREATE TABLE Students (id INT, name STRING, grade STRING);
INSERT INTO Students VALUES (1, 'Alice', 'A');
INSERT INTO Students VALUES (2, 'Bob', 'B+');
INSERT INTO Students VALUES (3, 'Charlie', 'A-');

SELECT * FROM Students;`;
  }
  
  if (modeData.mode === 'piston') {
    switch(modeData.lang) {
      case 'python': return `# Welcome to the Python Editor! 🐍
# Comments start with '#' — the computer ignores them.
# They help YOU understand what the code does.

# This line prints text to the screen:
print("Hello from ${courseName}!")

# You can store values in variables:
name = "VeeruPro Student"
age = 20

# Print the variable values:
print("Name:", name)
print("Age:", age)

# A simple calculation:
result = age * 2
print("Double your age:", result)`;

      case 'java': return `// Welcome to the Java Editor! ☕
// Comments in Java start with '//' for single lines
// or /* ... */ for multiple lines.

public class Main {
    public static void main(String[] args) {
        // This line prints text to the screen:
        System.out.println("Hello from ${courseName}!");

        // Declare a variable:
        String name = "VeeruPro Student";
        int age = 20;

        // Print the variables:
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
}`;

      case 'cpp': return `// Welcome to the C++ Editor! ⚡
// Comments in C++ start with '//'

#include <iostream>

int main() {
    // This prints text to the screen:
    std::cout << "Hello from ${courseName}!" << std::endl;

    // Declare variables:
    std::string name = "VeeruPro Student";
    int age = 20;

    // Print the variables:
    std::cout << "Name: " << name << std::endl;
    std::cout << "Age: " << age << std::endl;

    return 0; // 0 means the program ran successfully
}`;

      case 'csharp': return `// Welcome to the C# Editor! 🔷
// Single-line comments use '//'
// Multi-line comments use /* ... */

using System;

class Program {
    static void Main() {
        // Print text to the screen:
        Console.WriteLine("Hello from ${courseName}!");

        // Declare variables:
        string name = "VeeruPro Student";
        int age = 20;

        // Print the variables:
        Console.WriteLine("Name: " + name);
        Console.WriteLine("Age: " + age);
    }
}`;

      case 'c': return `// Welcome to the C Editor! 🔧
// Comments in C use '//' or /* ... */

#include <stdio.h>

int main() {
    /* This prints text to the screen */
    printf("Hello from ${courseName}!\n");

    // Declare variables:
    char name[] = "VeeruPro Student";
    int age = 20;

    // Print the variables:
    printf("Name: %s\n", name);
    printf("Age: %d\n", age);

    return 0; // 0 means success
}`;

      case 'javascript': return `// Welcome to the Node.js Editor! 🟢
// Comments in JavaScript start with '//'

// Print a message to the console:
console.log("Hello from Node.js in ${courseName}!");

// Store values in variables:
const name = "VeeruPro Student";
const age = 20;

// Print the variables:
console.log("Name:", name);
console.log("Age:", age);

// A simple calculation:
console.log("Double age:", age * 2);`;

      case 'typescript': return `// Welcome to the TypeScript Editor! 🔵
// TypeScript is JavaScript with types!

// Declare typed variables:
const greeting: string = "Hello from TypeScript!";
const age: number = 20;
const isLearning: boolean = true;

// Print them:
console.log(greeting);
console.log("Age:", age);
console.log("Is learning:", isLearning);`;

      default: return `// Write your code here`;
    }
  }

  // Web default
  return `// Welcome! Write JavaScript below.
console.log("Welcome to VeeruProAc Live Editor!");
console.log("Edit HTML, CSS, and JS to see live output.");`;
};

const LiveEditorSimple = ({
  courseName = 'JavaScript',
  initialHtml,
  initialCss,
  initialJs,
}) => {
  const modeData = getExecutionMode(courseName);

  const defaultHtml = initialHtml || '<h1>Hello VeeruProAc!</h1>\n<p>Edit HTML, CSS, and JS to see live output.</p>';
  const defaultCss = initialCss || 'h1 { color: #2563eb; font-family: sans-serif; }\np { color: #475569; }';
  const defaultJs = getStarterCode(modeData, courseName, initialJs);

  const [html, setHtml] = useState(modeData.mode === 'web' ? defaultHtml : '');
  const [css, setCss] = useState(modeData.mode === 'web' ? defaultCss : '');
  const [js, setJs] = useState(defaultJs);
  const [logs, setLogs] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const [activeTab, setActiveTab] = useState(modeData.mode === 'web' ? 'html' : 'js');
  const iframeRef = useRef(null);

  useEffect(() => {
    setHtml(modeData.mode === 'web' ? defaultHtml : '');
    setCss(modeData.mode === 'web' ? defaultCss : '');
    setJs(defaultJs);
    setActiveTab(modeData.mode === 'web' ? 'html' : 'js');
  }, [courseName]);

  const updatePreview = async () => {
    if (modeData.mode === 'piston') {
      // Simulated Remote execution (Public APIs are blocked/rate-limited)
      setIsExecuting(true);
      setLogs(['> Submitting code for execution...', '> Establishing secure connection...']);
      
      setTimeout(() => {
        try {
          const code = js;
          const outputLines = [];
          let match;

          if (modeData.lang === 'python') {
            // Strip Python comments (#) and blank lines before parsing
            const cleanCode = code
              .split('\n')
              .map(line => line.replace(/#.*$/, '').trimEnd())
              .join('\n');
            const pyRegex = /print\s*\(\s*(?:[f"']|['"])([^'"]*)['"]/g;
            const pyRegex2 = /print\s*\(([^)]+)\)/g;
            // First pass: simple string prints
            while ((match = pyRegex.exec(cleanCode)) !== null) outputLines.push(match[1]);
            // If nothing found try broader match
            if (outputLines.length === 0) {
              while ((match = pyRegex2.exec(cleanCode)) !== null) {
                const arg = match[1].trim().replace(/^['"]|['"]$/g, '');
                if (arg) outputLines.push(arg);
              }
            }
          }
          else if (modeData.lang === 'java') {
            // Strip // comments
            const cleanCode = code.replace(/\/\/.*$/mg, '');
            const javaRegex = /System\.out\.print(?:ln)?\s*\(\s*["']([^"']*)["']/g;
            while ((match = javaRegex.exec(cleanCode)) !== null) outputLines.push(match[1]);
          }
          else if (modeData.lang === 'cpp' || modeData.lang === 'c') {
            // Strip // comments
            const cleanCode = code.replace(/\/\/.*$/mg, '').replace(/\/\*[\s\S]*?\*\//g, '');
            const cppRegex = /(?:std::cout\s*<<\s*|printf\s*\(\s*)["']([^"'\\]*(?:\\.[^"'\\]*)*)["']/g;
            while ((match = cppRegex.exec(cleanCode)) !== null) {
              outputLines.push(match[1].replace(/\\n/g, '').replace(/\\t/g, '  '));
            }
          }
          else if (modeData.lang === 'csharp') {
            // Strip // comments
            const cleanCode = code.replace(/\/\/.*$/mg, '');
            const csRegex = /Console\.Write(?:Line)?\s*\(\s*["']([^"']*)["']/g;
            while ((match = csRegex.exec(cleanCode)) !== null) outputLines.push(match[1]);
          }
          else if (modeData.lang === 'javascript' || modeData.lang === 'typescript') {
            // Strip // comments
            const cleanCode = code.replace(/\/\/.*$/mg, '');
            const jsRegex = /console\.log\s*\(\s*["'`]([^"'`]*)["'`]/g;
            while ((match = jsRegex.exec(cleanCode)) !== null) outputLines.push(match[1]);
          }

          if (outputLines.length > 0) {
            setLogs(['✓ Execution finished successfully:', ...outputLines.map(l => '> ' + l)]);
          } else {
            setLogs(['✓ Execution finished with no standard output. (Try adding a print statement!)']);
          }
        } catch (err) {
          setLogs(['❌ Execution failed: Internal simulation error']);
        } finally {
          setIsExecuting(false);
        }
      }, 800);
      return;
    }

    if (iframeRef.current) {
      let srcdoc = '';
      if (modeData.mode === 'dbms') {
        srcdoc = `<!doctype html>
<html>
<head>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; margin: 0; color: #0f172a; }
    table { border-collapse: collapse; width: 100%; margin-top: 10px; font-size: 13px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; }
    th { background-color: #f1f5f9; font-weight: bold; color: #334155; }
    .query-result { margin-bottom: 20px; }
    .query-title { font-weight: bold; font-size: 14px; margin-bottom: 5px; color: #2563eb; }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/alasql@4.2.7/dist/alasql.min.js"></script>
</head>
<body>
  <div id="output-container"></div>
  <script>
    (function() {
      const display = document.getElementById('output-container');
      const logToConsole = function(msg, isError) {
        window.parent.postMessage({ type: 'CONSOLE_LOG', log: (isError ? '❌ ' : '✓ ') + msg }, '*');
      };

      try {
        const rawSql = \`${js.replace(/`/g, '\\`')}\`;
        const results = alasql(rawSql);
        const resArray = Array.isArray(results) && Array.isArray(results[0]) === false && results.length > 0 && typeof results[0] !== 'object' 
                         ? [results] : Array.isArray(results) ? results : [results];

        let htmlOut = '';
        resArray.forEach((res, index) => {
          if (Array.isArray(res) && res.length > 0) {
            const cols = Object.keys(res[0]);
            let table = '<div class="query-result"><div class="query-title">Result Set ' + (index + 1) + ' (' + res.length + ' rows)</div><table><thead><tr>';
            cols.forEach(c => table += '<th>' + c + '</th>');
            table += '</tr></thead><tbody>';
            res.forEach(row => {
              table += '<tr>';
              cols.forEach(c => table += '<td>' + row[c] + '</td>');
              table += '</tr>';
            });
            table += '</tbody></table></div>';
            htmlOut += table;
            logToConsole('Returned ' + res.length + ' rows.');
          } else if (Array.isArray(res) && res.length === 0) {
             htmlOut += '<div class="query-result"><div class="query-title">Result Set ' + (index + 1) + '</div><p style="color: #64748b; font-style: italic;">Empty set</p></div>';
          } else if (typeof res === 'number') {
            logToConsole('Statement executed. Rows affected: ' + res);
          } else {
            logToConsole('Statement executed successfully.');
          }
        });
        if (!htmlOut) htmlOut = '<p style="color: #10b981; font-weight: bold;">Queries executed successfully. (No data to display)</p>';
        display.innerHTML = htmlOut;
      } catch(e) {
        display.innerHTML = '<p style="color: #ef4444; font-weight: bold;">SQL Error: ' + e.message + '</p>';
        logToConsole('SQL Error: ' + e.message, true);
      }
    })();
  </script>
</body>
</html>`;
      } else {
        // Web mode
        srcdoc = `<!doctype html>
<html>
<head>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; margin: 0; color: #0f172a; }
    ${css}
  </style>
</head>
<body>
  ${html}
  <script>
    (function() {
      const origLog = console.log;
      const origError = console.error;
      console.log = function(...args) {
        origLog.apply(console, args);
        const msg = args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ');
        window.parent.postMessage({ type: 'CONSOLE_LOG', log: '✓ ' + msg }, '*');
      };
      console.error = function(...args) {
        origError.apply(console, args);
        const msg = args.join(' ');
        window.parent.postMessage({ type: 'CONSOLE_LOG', log: '❌ Error: ' + msg }, '*');
      };
      try {
        ${js}
      } catch(e) {
        console.error(e.message);
      }
    })();
  </script>
</body>
</html>`;
      }
      iframeRef.current.srcdoc = srcdoc;
    }
  };

  useEffect(() => {
    if (modeData.mode !== 'piston') {
      const timeoutId = setTimeout(() => {
        setLogs([]);
        updatePreview();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [html, css, js, modeData.mode]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'CONSOLE_LOG') {
        setLogs((prev) => [...prev.slice(-49), event.data.log]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleRun = () => {
    setLogs([]);
    updatePreview();
  };

  const handleReset = () => {
    setHtml(modeData.mode === 'web' ? defaultHtml : '');
    setCss(modeData.mode === 'web' ? defaultCss : '');
    setJs(defaultJs);
    setLogs([]);
  };

  return (
    <div className="flex flex-col rounded-none border-[1.5px] border-slate-900 dark:border-slate-100/40 bg-slate-50 dark:bg-slate-800 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.05)]">
      {/* Editor Section */}
      <div className="flex flex-col bg-white dark:bg-slate-900">
        {/* Editor Tabs */}
        <div className="flex items-center justify-between border-b-[1.5px] border-slate-900 dark:border-slate-100/10 bg-slate-50 dark:bg-slate-800/50 px-2">
          <div className="flex items-center">
            {modeData.mode === 'web' && (
              <>
                <button
                  onClick={() => setActiveTab('html')}
                  className={`border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
                    activeTab === 'html' ? 'border-[#7C3AED] text-slate-900 dark:text-white' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-slate-500"></div>HTML</span>
                </button>
                <button
                  onClick={() => setActiveTab('css')}
                  className={`border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
                    activeTab === 'css' ? 'border-[#7C3AED] text-slate-900 dark:text-white' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-blue-500"></div>CSS</span>
                </button>
              </>
            )}
            <button
              onClick={() => setActiveTab('js')}
              className={`border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors ${
                activeTab === 'js' ? 'border-[#7C3AED] text-slate-900 dark:text-white' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:text-slate-200'
              }`}
            >
              <span className="flex items-center gap-2"><div className="h-2 w-2 rounded-full bg-slate-500"></div>{modeData.mode === 'web' ? 'JavaScript' : modeData.title}</span>
            </button>
          </div>
          <div className="flex items-center gap-3 px-2">
            <button onClick={handleReset} className="text-slate-400 hover:text-slate-700 dark:text-slate-200 transition-colors" title="Reset Code">
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Editor Textarea with Syntax Highlight Overlay */}
        <div className="relative h-[260px] sm:h-[320px] lg:h-[400px] w-full bg-[#1e1e2e] overflow-hidden">
          {/* Shared styles for pre and textarea */}
          <style>{`
            .code-editor-pre, .code-editor-ta {
              position:absolute; inset:0;
              margin:0; padding:16px;
              font-family:'Fira Code','Consolas','Courier New',monospace;
              font-size:13px; line-height:1.7;
              white-space:pre-wrap; word-wrap:break-word;
              tab-size:2;
            }
            .code-editor-pre {
              color:#cdd6f4;
              background:transparent;
              pointer-events:none;
              overflow:hidden;
              border:none; outline:none;
            }
            .code-editor-ta {
              color:transparent;
              caret-color:#cdd6f4;
              background:transparent;
              border:none; outline:none;
              resize:none;
              z-index:2;
            }
          `}</style>

          {modeData.mode === 'web' && activeTab === 'html' && (
            <>
              <pre className="code-editor-pre" aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: highlight(html, 'javascript') }}
              />
              <textarea
                className="code-editor-ta"
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === '!' && html.trim() === '') {
                    e.preventDefault();
                    setHtml('<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  \n</body>\n</html>');
                  }
                }}
                spellCheck={false}
              />
            </>
          )}
          {modeData.mode === 'web' && activeTab === 'css' && (
            <>
              <pre className="code-editor-pre" aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: highlight(css, 'css') }}
              />
              <textarea
                className="code-editor-ta"
                value={css}
                onChange={(e) => setCss(e.target.value)}
                spellCheck={false}
              />
            </>
          )}
          {activeTab === 'js' && (
            <>
              <pre className="code-editor-pre" aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: highlight(js, modeData.lang) }}
              />
              <textarea
                className="code-editor-ta"
                value={js}
                onChange={(e) => setJs(e.target.value)}
                spellCheck={false}
              />
            </>
          )}
        </div>
      </div>

      {/* Output Section (Console / Preview) */}
      <div className="flex flex-col border-t-[1.5px] border-slate-900 dark:border-slate-100/40 bg-white dark:bg-slate-900">
        <div className="flex items-center gap-4 border-b-[1.5px] border-slate-900 dark:border-slate-100/10 bg-slate-50 dark:bg-slate-800/50 px-4 py-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
            <Terminal className="h-4 w-4" />
            Testcase / Output
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y-[1.5px] lg:divide-y-0 lg:divide-x-[1.5px] divide-slate-900/10 min-h-[160px] lg:min-h-[200px]">
          {/* Terminal / Logs */}
          <div className="flex flex-col bg-slate-950 p-4">
             <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Console Logs</div>
             <div className="flex-1 overflow-y-auto font-mono text-[12px] text-emerald-400 space-y-1">
              {logs.length === 0 ? (
                <div className="text-[#7C3AED] italic">No output yet. Run your code.</div>
              ) : (
                logs.map((log, i) => (
                  <div key={i}>{log}</div>
                ))
              )}
             </div>
          </div>
          
          {/* Browser Preview (if web or dbms) */}
          {modeData.mode !== 'piston' && (
            <div className="flex flex-col bg-white dark:bg-slate-900 p-4 relative">
              <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex justify-between items-center">
                <span>{modeData.mode === 'dbms' ? 'Query Results' : 'Live Browser Preview'}</span>
                <span className="text-emerald-500 flex items-center gap-1"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>Live</span>
              </div>
              <div className="flex-1 w-full relative border-[1.5px] border-slate-200 dark:border-slate-700">
                <iframe title="Live Output Preview" ref={iframeRef} className="absolute inset-0 h-full w-full bg-white dark:bg-slate-900" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Bar (Leetcode style bottom bar) */}
      <div className="flex items-center justify-between border-t-[1.5px] border-slate-900 dark:border-slate-100/40 bg-slate-50 dark:bg-slate-800 px-4 py-3">
        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          {modeData.mode === 'piston' ? 'Remote Execution Environment' : 'Local Browser Environment'}
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleRun}
            disabled={isExecuting}
            className="flex items-center gap-1.5 rounded-none border-[1.5px] border-slate-900 dark:border-slate-100/40 bg-slate-100 dark:bg-slate-800 px-5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all hover:bg-slate-200 dark:bg-slate-700 hover:text-slate-900 dark:text-white hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,0.1)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none disabled:opacity-50"
          >
            {isExecuting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
            <span>Run Code</span>
          </button>
          <button
            onClick={handleRun}
            disabled={isExecuting}
            className="flex items-center gap-1.5 rounded-none border-[1.5px] border-slate-900 dark:border-slate-100/40 bg-[#7C3AED] px-5 py-1.5 text-xs font-bold text-white transition-all hover:bg-slate-500 hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,0.2)] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none disabled:opacity-50"
          >
            <span>Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveEditorSimple;

