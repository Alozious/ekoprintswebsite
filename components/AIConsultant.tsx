import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, Target, Printer } from 'lucide-react';
import { ChatMessage } from '../types';
import { generatePrintAdvice } from '../services/geminiService';

export const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to the Eko Prints Studio. I'm EkoBot, your technical print consultant. Tell me about your project, and I'll recommend the best production method—be it Large Format, DTF, or Branding." }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generatePrintAdvice(input);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Connection error. Our servers are currently busy producing high-quality prints. Please try again in a moment.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 bg-white text-eko-dark w-16 h-16 rounded-full shadow-[0_0_50px_rgba(0,209,255,0.3)] hover:bg-eko-primary transition-all duration-500 transform hover:scale-110 flex items-center justify-center group ${isOpen ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100'}`}
        aria-label="Open AI Consultant"
      >
        <Sparkles className="w-7 h-7 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-eko-primary opacity-75"></span>
           <span className="relative inline-flex rounded-full h-4 w-4 bg-eko-primary"></span>
        </span>
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-8 right-8 z-50 w-[90vw] max-w-[400px] bg-eko-dark border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[70vh] md:max-h-[600px] overflow-hidden transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-20 pointer-events-none'}`}
      >
        
        {/* Header */}
        <div className="bg-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-eko-dark flex items-center justify-center rounded-lg">
              <Printer className="w-5 h-5 text-eko-primary" />
            </div>
            <div>
              <h3 className="font-black text-eko-dark text-xs uppercase tracking-widest leading-none">EkoBot Pro</h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight mt-1">AI Print Consultant</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full text-eko-dark hover:bg-eko-secondary hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#080B12] min-h-[300px]">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] px-5 py-4 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-eko-primary text-eko-dark font-bold rounded-2xl rounded-tr-none' 
                    : 'bg-white/5 text-gray-300 border border-white/10 rounded-2xl rounded-tl-none'
                } ${msg.isError ? 'border-red-500 text-red-200 bg-red-500/10' : ''}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none px-5 py-4">
                <Loader2 className="w-5 h-5 animate-spin text-eko-primary" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-eko-dark border-t border-white/5">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="How can I help with your print today?"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-5 pr-14 py-4 text-white focus:outline-none focus:border-eko-primary transition-all text-sm placeholder:text-gray-600"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 bg-white text-eko-dark p-3 rounded-lg hover:bg-eko-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between px-1">
             <div className="flex gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Systems Online</span>
             </div>
             <p className="text-[10px] text-gray-700 font-bold uppercase tracking-[0.1em]">Engineered by Gemini 3</p>
          </div>
        </div>

      </div>
    </>
  );
};