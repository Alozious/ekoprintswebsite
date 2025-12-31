import React from 'react';
import { Mail, Phone, MapPin, Send, ExternalLink } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div>
            <h2 className="text-eko-primary font-bold tracking-widest uppercase mb-2">Get In Touch</h2>
            <h3 className="text-4xl font-extrabold text-white mb-8">Let's Start Your Project</h3>
            <p className="text-gray-400 mb-12 text-lg">
              Ready to print? Fill out the form or drop by our studio. We're excited to collaborate with you.
            </p>

            <div className="space-y-8">
              <div className="flex items-start group">
                <div className="flex-shrink-0 bg-white/5 p-4 rounded-lg group-hover:bg-eko-primary/10 transition-colors">
                  <Phone className="w-6 h-6 text-eko-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-bold text-lg">Phone & WhatsApp</h4>
                  <div className="flex flex-col gap-1 mt-1">
                    <a href="tel:+256703580516" className="text-gray-400 font-mono text-lg tracking-wide hover:text-white transition-colors">0703 580 516</a>
                    <a href="tel:+256792832056" className="text-gray-400 font-mono text-lg tracking-wide hover:text-white transition-colors">0792 832 056</a>
                  </div>
                  <a 
                    href="https://wa.me/256703580516" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 rounded bg-green-500/10 text-green-400 text-sm font-bold border border-green-500/20 hover:bg-green-500/20 transition-all transform hover:translate-x-1"
                  >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex items-start group">
                 <div className="flex-shrink-0 bg-white/5 p-4 rounded-lg group-hover:bg-eko-primary/10 transition-colors">
                  <Mail className="w-6 h-6 text-eko-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-bold text-lg">Email</h4>
                  <a href="mailto:sales@ekoprintsug.com" className="text-gray-400 hover:text-white transition-colors">sales@ekoprintsug.com</a>
                </div>
              </div>

              <div className="flex items-start group">
                 <div className="flex-shrink-0 bg-white/5 p-4 rounded-lg group-hover:bg-eko-primary/10 transition-colors">
                  <MapPin className="w-6 h-6 text-eko-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-bold text-lg">Location</h4>
                  <p className="text-gray-400">Level 3, Room L3-194</p>
                  <a 
                    href="https://maps.app.goo.gl/5DmrbjGLCrFT4aUG7" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-sm text-eko-dark bg-eko-primary px-4 py-2 rounded-full font-bold hover:bg-white transition-all transform hover:scale-105"
                  >
                    View on Google Maps <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-eko-dark p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
            {/* Background decoration for form */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-eko-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-eko-primary focus:ring-1 focus:ring-eko-primary transition-colors placeholder:text-gray-600"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-eko-primary focus:ring-1 focus:ring-eko-primary transition-colors placeholder:text-gray-600"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-400 mb-2">Interested Service</label>
                <select 
                  id="service" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-eko-primary focus:ring-1 focus:ring-eko-primary transition-colors"
                >
                  <option className="bg-eko-dark">Large Format Printing</option>
                  <option className="bg-eko-dark">DTF Printing</option>
                  <option className="bg-eko-dark">T-Shirt Customization</option>
                  <option className="bg-eko-dark">Digital Printing</option>
                  <option className="bg-eko-dark">Branding & Design</option>
                  <option className="bg-eko-dark">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Project Details</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-eko-primary focus:ring-1 focus:ring-eko-primary transition-colors placeholder:text-gray-600"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <button 
                type="button" 
                className="w-full bg-gradient-to-r from-eko-primary to-eko-secondary text-white font-bold py-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group"
              >
                Send Message <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};