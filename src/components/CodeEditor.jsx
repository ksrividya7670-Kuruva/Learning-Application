import { motion } from 'framer-motion';
import { useState } from 'react';
import { Code2, Play, Copy, Download, Terminal, CheckCircle2 } from 'lucide-react';

const CodeEditor = () => {
  const [code, setCode] = useState(`function greet(name) {\n  return "Hello, " + name + "!";\n}\n\nconsole.log(greet("LearnHub"));`);
  const [output, setOutput] = useState('Hello, LearnHub!');

  const handleRun = () => {
    try {
      let capturedOutput = [];
      const originalLog = console.log;
      console.log = (...args) => {
        capturedOutput.push(args.join(' '));
        originalLog(...args);
      };
      
      const fn = new Function(code);
      const result = fn();
      
      console.log = originalLog;
      
      if (capturedOutput.length > 0) {
        setOutput(capturedOutput.join('\n'));
      } else {
        setOutput(result !== undefined ? String(result) : 'Code executed successfully (no output)');
      }
    } catch (error) {
      setOutput('Error: ' + error.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(code)
    );
    element.setAttribute('download', 'code.js');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#121212] px-4 py-20 sm:px-6 lg:px-8 text-black dark:text-white">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl">
            Try It <span className="text-[#FF9100]">Yourself</span>
          </h2>
          <p className="max-w-2xl text-lg text-gray-700 dark:text-gray-300">
            Write and execute code directly in your browser. Practice coding concepts in real-time and see instant results. No setup required, just start coding!
          </p>
        </motion.div>

        {/* Editor Container */}
        <motion.div
          className="grid gap-6 lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {/* Left Side - Info */}
          <div className="lg:col-span-1 flex flex-col justify-between bg-white dark:bg-[#1E1E1E] border border-black/20 dark:border-gray-700 rounded-none p-6 shadow-sm">
            <div>
              <div className="mb-5 inline-flex bg-[#FF9100] p-3 rounded-none">
                <Code2 className="h-6 w-6 text-black" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-black dark:text-white">Interactive Learning</h3>
              <p className="mb-6 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Practice JavaScript concepts with VeeruProAc's live code editor. Modify the code, run it, and see the output instantly.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 dark:bg-[#262626] border border-black/10 dark:border-gray-700">
                  <span className="text-[#FF9100] text-xs font-bold">✓</span>
                  <p className="text-gray-900 dark:text-gray-100 text-xs font-bold">Instant Execution</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 dark:bg-[#262626] border border-black/10 dark:border-gray-700">
                  <span className="text-[#FF9100] text-xs font-bold">✓</span>
                  <p className="text-gray-900 dark:text-gray-100 text-xs font-bold">Real-time Output</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 dark:bg-[#262626] border border-black/10 dark:border-gray-700">
                  <span className="text-[#FF9100] text-xs font-bold">✓</span>
                  <p className="text-gray-900 dark:text-gray-100 text-xs font-bold">No Installation</p>
                </div>
              </div>
            </div>
            <div className="pt-6 flex flex-col gap-3">
              <button className="w-full bg-[#FF9100] px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white rounded-none">
                Learn JavaScript
              </button>
              <button className="w-full bg-white dark:bg-[#262626] border border-black/20 dark:border-gray-700 px-6 py-3 text-sm font-bold text-black dark:text-white transition-colors hover:bg-[#FF9100] hover:border-[#FF9100] rounded-none">
                View Course
              </button>
            </div>
          </div>

          {/* Right Side - Editor and Output */}
          <div className="lg:col-span-2 flex flex-col bg-[#1E1E1E] border border-black/20 dark:border-gray-700 rounded-none shadow-md">
            {/* Editor Header */}
            <div className="flex items-center justify-between border-b border-gray-800 bg-[#171717] px-4 py-3">
              <div className="flex items-center gap-2 w-20">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-300">CODE.JS</span>
              <div className="flex gap-3 w-20 justify-end">
                <button onClick={handleCopy} className="text-gray-400 hover:text-white transition-colors">
                  <Copy className="h-4 w-4" />
                </button>
                <button onClick={handleDownload} className="text-gray-400 hover:text-white transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Code Area */}
            <div className="flex flex-col relative bg-[#1E1E1E] flex-grow">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-48 resize-none bg-transparent p-6 font-mono text-sm text-green-400 focus:outline-none leading-relaxed"
                spellCheck="false"
              />
              <div className="px-6 py-4 border-t border-gray-800 flex justify-start bg-[#171717]">
                <button
                  onClick={handleRun}
                  className="flex items-center gap-2 rounded-none bg-[#FF9100] px-5 py-2 text-sm font-bold text-black transition-colors hover:bg-white"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Run Code
                </button>
              </div>
            </div>

            {/* Output Console */}
            <div className="flex flex-col bg-[#171717] border-t border-gray-800">
              <div className="border-b border-gray-800 px-6 py-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">OUTPUT CONSOLE</span>
              </div>
              <div className="p-6 h-28 overflow-auto font-mono text-sm text-amber-400 bg-[#0F0F0F]">
                <pre className="m-0 whitespace-pre-wrap">{output}</pre>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Buttons */}
        <motion.div 
          className="mt-10 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button className="rounded-none border border-black/20 dark:border-gray-700 bg-white dark:bg-[#1E1E1E] px-6 py-2.5 text-sm font-bold text-black dark:text-white hover:bg-[#FF9100] dark:hover:bg-[#FF9100] hover:text-black dark:hover:text-black transition-colors shadow-sm">
            Explore Challenges
          </button>
          <button className="rounded-none bg-[#FF9100] px-6 py-2.5 text-sm font-bold text-black hover:bg-black hover:text-white transition-colors">
            Start Learning Path
          </button>
          <button className="rounded-none border border-black/20 dark:border-gray-700 bg-white dark:bg-[#1E1E1E] px-6 py-2.5 text-sm font-bold text-black dark:text-white hover:bg-[#FF9100] dark:hover:bg-[#FF9100] hover:text-black dark:hover:text-black transition-colors shadow-sm">
            View Documentation
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CodeEditor;
