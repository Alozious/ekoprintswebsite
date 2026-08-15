import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Printer } from 'lucide-react';
import { ChatMessage } from '../types';
import { generatePrintAdvice } from '../services/geminiService';

export const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm EkoBot. Tell me about your project and I'll recommend the best printing method for you." }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    try {
      const text = await generatePrintAdvice(input);
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch {
      setMessages(prev => [...prev, { role: 'model', text: 'Connection error. Please try again.', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-12 h-12 bg-eko-primary text-[#06090F] flex items-center justify-center shadow-lg hover:bg-white transition-colors ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="Open chat"
      >
        <MessageSquare className="w-5 h-5" />
      </button>

      <div className={`fixed bottom-6 right-6 z-50 w-[90vw] max-w-sm bg-[#06090F] border border-white/10 flex flex-col max-h-[70vh] md:max-h-[560px] shadow-2xl transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>

        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-eko-primary/10 border border-eko-primary/20 flex items-center justify-center">
              <Printer className="w-4 h-4 text-eko-primary" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold leading-none">EkoBot</p>
              <p className="text-gray-500 text-[10px] mt-0.5">Print Consultant</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-eko-primary text-[#06090F] font-medium'
                  : msg.isError
                    ? 'bg-red-500/10 text-red-300 border border-red-500/20'
                    : 'bg-white/5 text-gray-300 border border-white/5'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/5 px-4 py-2.5">
                <Loader2 className="w-4 h-4 animate-spin text-eko-primary" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="p-4 border-t border-white/5">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about your print project..."
              className="flex-1 bg-white/5 border border-white/10 px-4 py-2.5 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-eko-primary transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-eko-primary text-[#06090F] px-3 py-2.5 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
