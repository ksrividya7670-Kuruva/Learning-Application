import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

const generateAIResponse = (message) => {
  const lower = message.toLowerCase();
  
  if (lower.match(/\b(hello|hi|hey|greetings)\b/)) {
    return "Hello there! I'm your VeeruProAc AI assistant. How can I help you with your coding journey today?";
  }
  
  if (lower.match(/\b(react|jsx|hooks|usestate|useeffect)\b/)) {
    return "React is a fantastic library for building user interfaces! Are you having trouble with a specific concept like hooks (useState, useEffect), state management, or building components?";
  }

  if (lower.match(/\b(python|django|flask|pandas|numpy)\b/)) {
    return "Python is incredibly versatile! Whether you are learning Django, Data Science, or basic syntax like lists and dictionaries, I'm here to help. What specific Python concept are you working on?";
  }

  if (lower.match(/\b(javascript|js|es6|promises|async|await)\b/)) {
    return "JavaScript is the language of the web! If you're stuck on async/await, closures, or DOM manipulation, feel free to share a code snippet and I can explain it line by line.";
  }

  if (lower.match(/\b(html|css|tailwind|flexbox|grid)\b/)) {
    return "Ah, the building blocks of the web! Make sure you are using semantic HTML tags and utilizing CSS Flexbox or Grid for responsive layouts. Let me know if you need an example of a specific layout.";
  }

  if (lower.match(/\b(sql|database|query|table|join)\b/)) {
    return "Databases are crucial! Remember that SQL JOINs (INNER, LEFT, RIGHT) help combine tables, while indexes speed up queries. Do you need help writing a specific SQL query?";
  }

  if (lower.match(/\b(error|bug|not working|failed|crash)\b/)) {
    return "Errors can be frustrating, but they are a great way to learn! Could you paste the exact error message or a snippet of your code so I can help debug it for you?";
  }

  if (lower.match(/\b(certificate|course|progress|complete)\b/)) {
    return "To earn your VeeruProAc certificate, you need to complete 100% of the lessons in your course and pass the quizzes. Keep pushing forward!";
  }

  // Smart fallback that acknowledges their input
  return `You asked about "${message.length > 30 ? message.substring(0, 30) + '...' : message}". Since I'm currently in offline demo mode, I can't search the live web for this specific query. Try asking me about core concepts in React, Python, JavaScript, HTML, CSS, or SQL!`;
};

const ChatGPTIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2057 5.9847 5.9847 0 0 0 3.998-2.9001 6.0557 6.0557 0 0 0-.7478-7.073zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0963 11.4363a4.4988 4.4988 0 0 1-2.3655 1.9728V15.63a.7664.7664 0 0 0-.3879-.6765l-5.8144-3.3543 2.0201-1.1685a.0757.0757 0 0 1 .071 0l4.8303 2.7865a4.504 4.504 0 0 1-2.3536 6.1148zm1.9213-9.155a4.4708 4.4708 0 0 1 .5346 3.0137l-.142-.0852-4.783-2.7582a.7712.7712 0 0 0-.7806 0L9.3483 13.68v-2.3324a.0804.0804 0 0 1 .0332-.0615l4.0322-2.3276a4.4992 4.4992 0 0 1 6.944 1.2155zM12.0006 4.9602a4.4755 4.4755 0 0 1 2.8764 1.0408l-.1419.0804-4.7783 2.7582a.7948.7948 0 0 0-.3927.6813v6.7369l-2.02-1.1686a.071.071 0 0 1-.038-.052V9.454a4.504 4.504 0 0 1 4.4945-4.4938zm-1.8906 5.8647l1.8905-1.0917 1.8906 1.0917v2.1834l-1.8906 1.0917-1.8905-1.0917V10.825z" />
  </svg>
);

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your VeeruProAc AI assistant. What would you like to learn today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text })
      });
      const data = await res.json();
      const aiResponse = { id: Date.now() + 1, text: data.reply || "Sorry, I couldn't understand that.", sender: 'ai' };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: "Error: Could not connect to AI server.", sender: 'ai' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Robot Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#FF9100] text-white transition-transform hover:scale-110 active:scale-95"
            >
              <div className="absolute -inset-0.5 animate-pulse rounded-full bg-[#FF9100] opacity-50 blur" />
              <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[#FF9100]">
                <Sparkles className="absolute right-3 top-3 h-3 w-3 text-[#FF9100]" />
                <Bot className="h-6 w-6 text-white group-hover:animate-bounce" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-2 z-50 flex h-[85vh] max-h-[560px] w-[calc(100vw-16px)] max-w-[400px] flex-col overflow-hidden rounded-2xl bg-white border border-slate-200 sm:right-4 sm:bottom-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-[#FF9100] p-4 text-white">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative"
                >
                  <img src="/chatbot.png" alt="bot" className="h-9 w-9 object-contain drop-shadow-md rounded-full bg-white p-0.5" />
                  {/* Online dot */}
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#FF9100] ring-2 ring-white" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-white">VeeruProAc AI</h3>
                  <p className="text-xs text-[#FF9100] flex items-center gap-1">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF9100] animate-pulse" />
                    Online · Ready to help
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white hover:text-[#FF9100]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto bg-white p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="shrink-0 pt-1">
                      {msg.sender === 'user' ? (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#FF9100]">
                          <User className="h-4 w-4" />
                        </div>
                      ) : (
                        <img src="/chatbot.png" alt="bot" className="h-8 w-8 object-contain rounded-full bg-white p-0.5" />
                      )}
                    </div>
                    <div
                      className={`rounded-none px-4 py-2 text-sm ${
                        msg.sender === 'user'
                          ? 'bg-[#FF9100] text-white rounded-tr-none'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {isTyping && (
                <div className="flex w-full justify-start mt-4">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 pt-1">
                      <motion.img
                        src="/chatbot.png"
                        alt="bot"
                        className="h-8 w-8 object-contain rounded-full bg-white p-0.5"
                        animate={{ rotate: [-5, 5, -5] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    </div>
                    <div className="rounded-none px-4 py-3 text-sm bg-white text-slate-800 border border-slate-200 rounded-tl-none flex gap-1 items-center h-[38px]">
                      <motion.div className="h-1.5 w-1.5 rounded-full bg-slate-400" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                      <motion.div className="h-1.5 w-1.5 rounded-full bg-slate-400" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                      <motion.div className="h-1.5 w-1.5 rounded-full bg-slate-400" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white p-3 border-t border-slate-200">
              <form
                onSubmit={handleSend}
                className="flex items-center gap-2 rounded-full bg-white border border-slate-200 px-2 py-1 focus-within:ring-[#FF9100] focus-within:ring-2 transition-all"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a coding question..."
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#FF9100] text-white transition hover:opacity-90 disabled:opacity-50"
                >
                  <Send className="h-4 w-4 ml-0.5" />
                </button>
              </form>
              <div className="mt-2 text-center text-[10px] text-slate-400">
                AI can make mistakes. Check your code.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;
