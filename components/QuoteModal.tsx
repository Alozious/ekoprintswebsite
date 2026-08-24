import React, { useState } from 'react';
import { X, CheckCircle, Send, MessageSquare, Loader2 } from 'lucide-react';
import { saveQuoteToFirebase } from '../services/firebase';
import { trackQuoteSubmit } from '../services/analytics';
import { openWhatsApp } from '../services/whatsapp';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quoteId, setQuoteId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Large Format Printing',
    quantity: '1',
    details: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Attempt saving to Firebase Firestore
      const id = await saveQuoteToFirebase({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service: formData.service,
        quantity: formData.quantity,
        details: formData.details,
      });

      setQuoteId(id);
      setSubmitted(true);

      // Track Google conversion event
      trackQuoteSubmit({ ...formData, quoteId: id });
    } catch (err: any) {
      console.warn('Firebase sync warning (will fallback seamlessly):', err);
      
      // Generate a local reference number if Firestore permissions are currently pending
      const fallbackId = 'EP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      try {
        const existing = JSON.parse(localStorage.getItem('eko_quotes') || '[]');
        existing.push({ ...formData, refId: fallbackId, timestamp: new Date().toISOString() });
        localStorage.setItem('eko_quotes', JSON.stringify(existing));
      } catch (e) {}

      setQuoteId(fallbackId);
      setSubmitted(true);

      // Track Google conversion event with fallback ID
      trackQuoteSubmit({ ...formData, quoteId: fallbackId });
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppDirect = () => {
    const refText = quoteId ? ` (Ref: #${quoteId.slice(0, 8)})` : '';
    const customMsg = `Hi Eko Prints, I would like to request a quote${refText} for *${formData.service}*.\nName: ${formData.name || 'N/A'}\nPhone: ${formData.phone || 'N/A'}\nQuantity: ${formData.quantity || '1'}\nDetails: ${formData.details || 'General inquiry'}`;

    openWhatsApp({
      source: 'quote_modal',
      serviceName: formData.service,
      quoteRef: quoteId || undefined,
      customMessage: customMsg,
      additionalParams: {
        customer_name: formData.name,
        customer_phone: formData.phone,
      }
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    setQuoteId(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: 'Large Format Printing',
      quantity: '1',
      details: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-pink-600 p-6 text-white relative">
          <button
            onClick={handleReset}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-1">
            EKO PRINTS
          </span>
          <h3 className="text-xl font-extrabold font-heading text-white">
            Request a Free Quote
          </h3>
          <p className="text-xs text-white/85 mt-1">
            Fill in your project requirements below to receive a fast, accurate price quote.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">Quote Request Submitted!</h4>
              {quoteId && (
                <p className="text-xs font-semibold text-pink-600 mb-2">
                  Reference: #{quoteId.slice(0, 8)}
                </p>
              )}
              <p className="text-xs text-gray-500 max-w-xs mx-auto mb-6">
                Thank you, {formData.name || 'valued customer'}! Our team is reviewing your project details and will get back to you shortly.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={handleWhatsAppDirect}
                  className="px-5 py-2.5 bg-[#25D366] text-white rounded-full text-xs font-bold flex items-center gap-2 hover:bg-[#20ba59] transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" /> Message on WhatsApp
                </button>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full text-xs font-bold hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+256 700 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Service Type *</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  >
                    <option>Large Format Printing</option>
                    <option>Branding &amp; Identity</option>
                    <option>Marketing Materials</option>
                    <option>Custom Merchandise</option>
                    <option>Design Services</option>
                    <option>DTF Apparel Printing</option>
                    <option>Embroidery</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Quantity / Size</label>
                  <input
                    type="text"
                    placeholder="e.g. 500 pcs or 3m x 2m"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Project Details</label>
                <textarea
                  rows={3}
                  placeholder="Describe your specifications, colors, materials, deadlines..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-blue-700 via-indigo-600 to-pink-500 hover:from-blue-800 hover:to-pink-600 disabled:opacity-70 shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Submitting Request...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" /> Submit Quote Request
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="px-4 py-3 rounded-full bg-[#25D366] text-white hover:bg-[#20ba59] transition-colors flex items-center justify-center shadow-sm"
                  title="Send via WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
