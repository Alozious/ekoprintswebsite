import React from 'react';
import { Mail, Phone, MapPin, Send, ExternalLink, MessageCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 bg-[#05070A] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-eko-secondary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          <div className="flex flex-col justify-center">
            <span className="text-eko-primary font-black tracking-[0.5em] uppercase text-xs mb-6 block">Direct Line</span>
            <h3 className="text-5xl md:text-7xl font-black font-heading text-white mb-10 tracking-tighter leading-none">
              LET'S BUILD <br />
              <span className="text-eko-secondary">YOUR BRAND.</span>
            </h3>
            <p className="text-gray-400 mb-16 text-lg font-light leading-relaxed max-w-md">
              Whether it's a single DTF print or a city-wide large format campaign, we're ready to execute with precision.
            </p>

            <div className="space-y-10">
              <div className="flex items-start group gap-6">
                <div className="flex-shrink-0 bg-white/5 border border-white/10 p-5 rounded-xl group-hover:bg-eko-primary/20 group-hover:border-eko-primary transition-all">
                  <Phone className="w-6 h-6 text-eko-primary" />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase text-xs tracking-widest mb-2 opacity-50">Call or WhatsApp</h4>
                  <div className="flex flex-col gap-1">
                    <a href="tel:+256703580516" className="text-2xl font-black font-heading tracking-tight hover:text-eko-primary transition-colors text-white">0703 580 516</a>
                    <a href="tel:+256792832056" className="text-2xl font-black font-heading tracking-tight hover:text-eko-primary transition-colors text-white">0792 832 056</a>
                  </div>
                  <a 
                    href="https://wa.me/256703580516" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 mt-4 text-green-400 text-xs font-black uppercase tracking-widest hover:text-white transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Start WhatsApp Chat
                  </a>
                </div>
              </div>

              <div className="flex items-start group gap-6">
                 <div className="flex-shrink-0 bg-white/5 border border-white/10 p-5 rounded-xl group-hover:bg-eko-secondary/20 group-hover:border-eko-secondary transition-all">
                  <MapPin className="w-6 h-6 text-eko-secondary" />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase text-xs tracking-widest mb-2 opacity-50">Studio Headquarters</h4>
                  <p className="text-white font-black font-heading text-2xl tracking-tight mb-4">Level 3, Room L3-194</p>
                  <a 
                    href="https://maps.app.goo.gl/5DmrbjGLCrFT4aUG7" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-white hover:bg-white hover:text-eko-dark transition-all"
                  >
                    Open In Maps <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-eko-surface p-10 md:p-14 border border-white/5 rounded-sm relative shadow-2xl">
            <h4 className="text-2xl font-black font-heading text-white mb-8 uppercase tracking-tighter">Project Brief</h4>
            
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group relative">
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b-2 border-white/10 py-4 text-white focus:outline-none focus:border-eko-primary transition-colors placeholder:text-gray-600 font-medium"
                    placeholder="FULL NAME"
                  />
                </div>
                <div className="group relative">
                  <input 
                    type="email" 
                    className="w-full bg-transparent border-b-2 border-white/10 py-4 text-white focus:outline-none focus:border-eko-primary transition-colors placeholder:text-gray-600 font-medium"
                    placeholder="EMAIL ADDRESS"
                  />
                </div>
              </div>

              <div className="group relative">
                <select 
                  className="w-full bg-transparent border-b-2 border-white/10 py-4 text-white focus:outline-none focus:border-eko-primary transition-colors appearance-none cursor-pointer font-medium"
                >
                  <option className="bg-eko-dark" disabled selected>SELECT SERVICE</option>
                  <option className="bg-eko-dark">LARGE FORMAT PRINTING</option>
                  <option className="bg-eko-dark">DTF APPAREL PRINTING</option>
                  <option className="bg-eko-dark">BRAND IDENTITY DESIGN</option>
                  <option className="bg-eko-dark">DIGITAL & PROMOTIONAL</option>
                  <option className="bg-eko-dark">OTHER PRODUCTION</option>
                </select>
              </div>

              <div className="group relative">
                <textarea 
                  rows={4} 
                  className="w-full bg-transparent border-b-2 border-white/10 py-4 text-white focus:outline-none focus:border-eko-primary transition-colors placeholder:text-gray-600 font-medium resize-none"
                  placeholder="PROJECT DETAILS & SPECS"
                ></textarea>
              </div>

              <button 
                type="button" 
                className="w-full bg-white text-eko-dark font-black py-6 uppercase tracking-[0.3em] text-xs hover:bg-eko-primary transition-all flex items-center justify-center gap-4 group"
              >
                Launch Request <Send className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform" />
              </button>
              
              <p className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                Estimates typically sent within 2 business hours.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};