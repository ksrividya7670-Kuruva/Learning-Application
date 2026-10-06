import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, Shield, Zap, Code2 } from 'lucide-react';

const HeroIllustration = () => {
  const [activeTab, setActiveTab] = useState('architecture');
  const [typedCode, setTypedCode] = useState('');
  
  const codeSamples = {
    architecture: `// Enterprise Microservices Architecture
import { Gateway, Auth, Database } from '@veeruproac/core';

export class MainSystem {
  constructor() {
    this.gateway = new Gateway({ port: 8080 });
    this.auth = new Auth({ strategy: 'JWT' });
    this.db = new Database('postgres://core');
  }

  async initialize() {
    await this.db.connect();
    this.gateway.use(this.auth.middleware);
    console.log('[System] Architecture Initialized.');
  }
}
`,
    security: `// Zero-Trust Security Implementation
import { SecurityContext, Encryption } from '@veeruproac/sec';

const enforceSecurityPolicy = (req, res, next) => {
  const token = req.headers.authorization;
  if (!SecurityContext.validate(token)) {
    throw new Error('Unauthorized Access Attempt');
  }
  
  req.payload = Encryption.decrypt(req.payload);
  next();
};
`,
    performance: `// High-Performance Data Pipeline
import { StreamProcessor, Cache } from '@veeruproac/data';

const processStream = async (dataStream) => {
  const processor = new StreamProcessor({ threads: 8 });
  const redisCache = new Cache({ url: 'redis://cache' });

  for await (const chunk of dataStream) {
    const optimized = await processor.compute(chunk);
    await redisCache.set(optimized.id, optimized);
  }
};
`
  };

  useEffect(() => {
    setTypedCode('');
    let i = 0;
    const sample = codeSamples[activeTab];
    const interval = setInterval(() => {
      setTypedCode(sample.substring(0, i));
      i += 3;
      if (i > sample.length) clearInterval(interval);
    }, 10);
    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      className="relative w-full max-w-[500px] mx-auto md:ml-auto"
    >
      <div className="relative z-10 border border-gray-200 bg-white rounded-md shadow-xl overflow-hidden">
        {/* Editor Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="h-3 w-3 bg-red-400 rounded-full"></div>
              <div className="h-3 w-3 bg-yellow-400 rounded-full"></div>
              <div className="h-3 w-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-800 font-bold tracking-widest uppercase">
              <Terminal size={14} className="text-gray-600" />
              system-architecture.ts
            </div>
          </div>
          <div className="text-[10px] font-mono text-gray-500 font-bold uppercase border border-gray-300 px-1">
            UTF-8
          </div>
        </div>

        <div className="flex flex-col sm:flex-row h-[220px] overflow-hidden bg-white">
          {/* Sidebar */}
          <div className="w-full sm:w-48 border-b sm:border-b-0 sm:border-r border-gray-200 bg-gray-50 p-0 flex flex-col">
            <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider p-3">
              Explorer
            </div>
            
            <button 
              onClick={() => setActiveTab('architecture')}
              className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === 'architecture' ? 'bg-orange-50 text-[#FF9100] border-l-2 border-[#FF9100]' : 'bg-transparent text-gray-600 border-l-2 border-transparent hover:bg-gray-100'}`}
            >
              <Database size={16} className={activeTab === 'architecture' ? 'text-[#FF9100]' : 'text-gray-400'} />
              Architecture
            </button>
            
            <button 
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-orange-50 text-[#FF9100] border-l-2 border-[#FF9100]' : 'bg-transparent text-gray-600 border-l-2 border-transparent hover:bg-gray-100'}`}
            >
              <Shield size={16} className={activeTab === 'security' ? 'text-[#FF9100]' : 'text-gray-400'} />
              Security
            </button>
            
            <button 
              onClick={() => setActiveTab('performance')}
              className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === 'performance' ? 'bg-orange-50 text-[#FF9100] border-l-2 border-[#FF9100]' : 'bg-transparent text-gray-600 border-l-2 border-transparent hover:bg-gray-100'}`}
            >
              <Zap size={16} className={activeTab === 'performance' ? 'text-[#FF9100]' : 'text-gray-400'} />
              Performance
            </button>
          </div>

          {/* Main Editor */}
          <div className="flex-1 p-6 overflow-hidden relative bg-white">
            <pre className="font-mono text-sm leading-relaxed text-gray-800">
              <code>
                {typedCode}
                <span className="inline-block w-2 h-4 bg-[#FF9100] ml-1 animate-pulse"></span>
              </code>
            </pre>
            
            <div className="absolute bottom-0 right-0 border-t border-l border-gray-200 bg-gray-50 p-2 flex items-center gap-2 rounded-tl-md">
              <Code2 size={14} className="text-gray-500" />
              <span className="text-[10px] font-mono text-gray-500 font-medium tracking-wide">Live Environment Active</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroIllustration;
