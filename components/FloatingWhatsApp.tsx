import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { openWhatsApp } from '../services/whatsapp';
import { getAdAttribution } from '../services/analytics';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewBadge, setHasNewBadge] = useState(true);
  const [attribution, setAttribution] = useState<any>({});

  useEffect(() => {
    const attr = getAdAttribution();
    setAttribution(attr);
  }, []);

  const isFromAd = !!(attribution.gclid || attribution.fbclid || attribution.utm_source);

  const handleOpenChat = (serviceName?: string) => {
    openWhatsApp({
      source: 'floating_widget',
      serviceName,
    });
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-3 left-3 sm:bottom-6 sm:left-6 z-40 flex flex-col items-start font-sans">
      
      {/* Floating Expandable Popup Card */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-1.5rem)] max-w-[350px] max-h-[calc(100dvh-6rem)] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-100 animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4 relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-[#075E54] rounded-full" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">Eko Prints Masaka</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  <p className="text-[11px] text-white/80">Online | Fast Response</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close WhatsApp chat popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#ECE5DD]/40">
            {/* Ad Banner if user came from an ad */}
            {isFromAd && (
              <div className="mb-3 p-2.5 rounded-lg bg-pink-50 border border-pink-200 text-pink-900 text-xs flex items-center gap-2 font-medium">
                <Sparkles className="w-4 h-4 text-pink-600 flex-shrink-0" />
                <span>Special Ad Offer: Instant printing quote &amp; priority scheduling on WhatsApp!</span>
              </div>
            )}

            {/* Bubble Message */}
            <div className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 mb-3 text-xs text-gray-700 leading-relaxed">
              <p className="font-semibold text-gray-900 mb-1">
                Hello! 👋 Welcome to Eko Prints Masaka.
              </p>
              <p>
                How can we help you today? Send us a message on WhatsApp for instant pricing, sample photos, and fast turnaround orders.
              </p>
              <div className="mt-2 text-[10px] text-gray-400 text-right">
                Official Eko Prints Team • Masaka City
              </div>
            </div>

            {/* Quick Service Suggestions */}
            <div className="space-y-1.5 mb-3">
              <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Quick Inquiries:</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Large Format Banners',
                  'Branded T-Shirts',
                  'Business Cards',
                  'Custom Signage',
                  'Get Full Price List',
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOpenChat(item)}
                    className="text-[11px] bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 hover:border-[#25D366] px-2.5 py-1 rounded-full transition-all text-left shadow-2xs font-medium cursor-pointer"
                  >
                    + {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Action Button */}
            <button
              onClick={() => handleOpenChat()}
              className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all uppercase tracking-wider cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4" /> WhatsApp
            </button>
          </div>

          {/* Footer note */}
          <div className="py-2 px-4 bg-white border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#25D366]" /> Verified Business
            </span>
            <span>+256 703 580 516</span>
          </div>

        </div>
      )}

      {/* Trigger Button with Badge */}
      <div className="relative flex items-center gap-2 group">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setHasNewBadge(false);
          }}
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
          aria-label="Chat on WhatsApp"
        >
          {/* Animated ping ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
          
          <WhatsAppIcon className="w-7 h-7 relative z-10" />
        </button>

        {/* Floating pill badge beside button */}
        {!isOpen && (
          <button
            onClick={() => {
              setIsOpen(true);
              setHasNewBadge(false);
            }}
            className="hidden sm:inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm hover:bg-white text-gray-800 text-xs font-bold px-3.5 py-2 rounded-full shadow-lg border border-gray-100 hover:border-gray-200 transition-all cursor-pointer group-hover:translate-x-1"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            <span>{isFromAd ? 'Ad Offer: WhatsApp' : 'WhatsApp'}</span>
          </button>
        )}
      </div>

    </div>
  );
};
