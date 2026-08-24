import React from 'react';
import { Phone, MapPin, MessageCircle, ExternalLink } from 'lucide-react';
import { openWhatsApp } from '../services/whatsapp';
import { trackPhoneCall } from '../services/analytics';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-[#030507]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          <div>
            <span className="text-eko-primary text-xs font-semibold uppercase tracking-widest">Contact</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white mb-5">Let's Work Together</h2>
            <p className="text-gray-400 leading-relaxed mb-10">
              Ready to start a project? Reach out via call, WhatsApp, or fill in the form and we'll get back to you within 2 hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 border border-white/10 mt-0.5">
                  <Phone className="w-4 h-4 text-eko-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Call or WhatsApp</p>
                  <a 
                    href="tel:+256703580516" 
                    onClick={() => trackPhoneCall('contact_section')}
                    className="block text-white font-semibold hover:text-eko-primary transition-colors"
                  >
                    +256 703 580 516
                  </a>
                  <button
                    onClick={() => openWhatsApp({ source: 'contact_section' })}
                    className="inline-flex items-center gap-2 mt-3 text-xs text-green-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> Chat on WhatsApp
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 border border-white/10 mt-0.5">
                  <MapPin className="w-4 h-4 text-eko-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Location</p>
                  <p className="text-white font-semibold mb-2">City View Complex, Masaka City, Room L3-194</p>
                  <a
                    href="https://maps.app.goo.gl/5DmrbjGLCrFT4aUG7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    Open in Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0A0F1A] border border-white/5 p-8">
            <h3 className="text-white font-semibold mb-6">Send a Brief</h3>
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-transparent border-b border-white/10 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-eko-primary transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-transparent border-b border-white/10 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-eko-primary transition-colors"
                />
              </div>

              <select className="w-full bg-[#0A0F1A] border-b border-white/10 py-3 text-gray-400 text-sm focus:outline-none focus:border-eko-primary transition-colors appearance-none cursor-pointer">
                <option value="" disabled>Select Service</option>
                <option>Large Format Printing</option>
                <option>DTF Printing</option>
                <option>Embroidery</option>
                <option>T-Shirt Printing</option>
                <option>Design &amp; Branding</option>
                <option>Supplies</option>
                <option>Other</option>
              </select>

              <textarea
                rows={4}
                placeholder="Project details..."
                className="w-full bg-transparent border-b border-white/10 py-3 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-eko-primary transition-colors resize-none"
              />

              <button
                type="button"
                className="w-full bg-eko-primary text-[#06090F] py-3.5 text-sm font-semibold hover:bg-white transition-colors"
              >
                Send Request
              </button>

              <p className="text-center text-xs text-gray-600">Response within 2 business hours</p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
