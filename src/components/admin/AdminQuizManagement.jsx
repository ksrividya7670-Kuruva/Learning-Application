import React, { useState } from 'react';
import { Plus, Save, Trash2, GripVertical, CheckCircle2, Circle, Code, CheckSquare } from 'lucide-react';

const AdminQuizManagement = () => {
  const [questions, setQuestions] = useState([
    { id: 1, type: 'multiple-choice', text: 'What is the virtual DOM in React?', options: ['A direct copy of the actual DOM', 'A lightweight JavaScript representation of the DOM', 'A browser extension', 'A new HTML standard'] },
    { id: 2, type: 'coding', text: 'Write a function that reverses a string.', options: [] },
  ]);

  return (
    <div className="p-6 bg-[#FFFFFF] min-h-screen text-[#1F2937] font-sans pb-24">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#FF9100]">Quiz Builder</h1>
          <p className="text-[#1F2937] opacity-70">Design interactive assessments and coding challenges</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white text-[#FF9100] border border-[#FF9100] px-4 py-2 rounded-lg font-medium hover:bg-[#FFEDD5] hover:bg-opacity-30 transition-colors shadow-sm">
            Preview
          </button>
          <button className="bg-[#FF9100] text-[#FFFFFF] px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-opacity-90 transition-colors shadow-sm">
            <Save size={18} />
            Save Quiz
          </button>
        </div>
      </div>

      <div className="bg-[#FFFFFF] p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-1">Quiz Title</label>
            <input type="text" placeholder="e.g., React Fundamentals Quiz" className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#FF9100]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-1">Passing Score (%)</label>
            <input type="number" defaultValue={80} className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#FF9100]" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-[#FFFFFF] rounded-xl border border-gray-100 shadow-sm overflow-hidden flex">
            <div className="bg-[#FFEDD5] bg-opacity-30 p-3 flex flex-col items-center justify-center border-r border-gray-100 cursor-move text-[#FF9100]">
              <GripVertical size={20} />
              <span className="font-bold mt-2 text-sm">{idx + 1}</span>
            </div>
            <div className="p-5 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 mr-4">
                  <input 
                    type="text" 
                    defaultValue={q.text} 
                    className="w-full text-lg font-medium text-[#1F2937] border-b border-transparent hover:border-gray-200 focus:border-[#FF9100] outline-none bg-transparent transition-colors pb-1"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <select 
                    className="px-3 py-1.5 border border-gray-200 rounded-md text-sm outline-none focus:border-[#FF9100] bg-white text-[#FF9100] font-medium"
                    defaultValue={q.type}
                  >
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="multi-select">Multi-Select</option>
                    <option value="true-false">True/False</option>
                    <option value="coding">Coding Challenge</option>
                  </select>
                  <button className="text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {q.type === 'multiple-choice' && (
                <div className="space-y-2 pl-2">
                  {q.options.map((opt, oIdx) => (
                    <div key={oIdx} className="flex items-center gap-3">
                      <button className={oIdx === 1 ? 'text-[#FF9100]' : 'text-gray-300 hover:text-[#FFEDD5]'}>
                        {oIdx === 1 ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                      </button>
                      <input 
                        type="text" 
                        defaultValue={opt} 
                        className="flex-1 px-3 py-1.5 border border-transparent hover:border-gray-200 focus:border-[#FF9100] outline-none rounded-md text-sm text-[#1F2937]"
                      />
                    </div>
                  ))}
                  <button className="text-[#FF9100] text-sm font-medium flex items-center gap-1 mt-2 hover:underline">
                    <Plus size={16} /> Add Option
                  </button>
                </div>
              )}

              {q.type === 'coding' && (
                <div className="mt-4 bg-[#1F2937] rounded-lg p-4 border-l-4 border-[#FF9100]">
                  <div className="flex items-center justify-between text-[#FFEDD5] mb-2 text-sm font-mono">
                    <div className="flex items-center gap-2">
                      <Code size={16} />
                      <span>Expected Solution</span>
                    </div>
                    <select className="bg-transparent outline-none border-none text-[#FFEDD5]">
                      <option>JavaScript</option>
                      <option>Python</option>
                    </select>
                  </div>
                  <textarea 
                    className="w-full bg-transparent text-gray-300 font-mono text-sm outline-none resize-none" 
                    rows="3"
                    defaultValue={`function reverseString(str) {\n  return str.split('').reverse().join('');\n}`}
                  ></textarea>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="bg-[#FFFFFF] p-2 rounded-xl shadow-md border border-gray-100 flex gap-2">
          <button className="flex flex-col items-center justify-center p-3 w-24 rounded-lg hover:bg-[#FFFFFF] text-[#FF9100] transition-colors group">
            <CheckCircle2 size={24} className="mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium">Choice</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 w-24 rounded-lg hover:bg-[#FFFFFF] text-[#FF9100] transition-colors group">
            <CheckSquare size={24} className="mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium">Select</span>
          </button>
          <button className="flex flex-col items-center justify-center p-3 w-24 rounded-lg hover:bg-[#FFFFFF] text-[#FF9100] transition-colors group">
            <Code size={24} className="mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium">Code</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminQuizManagement;
