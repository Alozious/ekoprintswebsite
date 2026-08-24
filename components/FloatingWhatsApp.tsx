import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
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
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start font-sans">
      
      {/* Floating Expandable Popup Card */}
      {isOpen && (
        <div className="mb-3 w-[320px] sm:w-[350px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4 relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <MessageCircle className="w-6 h-6 text-[#25D366]" />
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
              <Send className="w-3.5 h-3.5" /> Start WhatsApp Chat
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
          
          <svg className="w-7 h-7 fill-current relative z-10" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
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
            <span>{isFromAd ? '💬 Ad Offer: Chat on WhatsApp' : '💬 Chat on WhatsApp'}</span>
          </button>
        )}
      </div>

    </div>
  );
};
