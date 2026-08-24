// WhatsApp Smart Action Handler with Ad Attribution & Google Conversion Tracking

import { getAdAttribution, trackWhatsAppClick } from './analytics';

export interface WhatsAppClickOptions {
  source: string; // e.g. 'hero_cta', 'floating_widget', 'header', 'quote_modal', 'service_card', 'contact_section', 'footer'
  serviceName?: string;
  customMessage?: string;
  quoteRef?: string;
  additionalParams?: Record<string, any>;
}

export const EKO_WHATSAPP_NUMBER = '256703580516'; // +256 703 580 516

/**
 * Generates an intelligent pre-filled WhatsApp message based on user intent and ad campaign context
 */
export const buildWhatsAppMessage = (options: Partial<WhatsAppClickOptions> = {}): string => {
  if (options.customMessage) {
    return options.customMessage;
  }

  const attribution = getAdAttribution();
  const isFromAd = !!(attribution.gclid || attribution.fbclid || attribution.utm_source);

  // If originating from Quote Submission or specific quote ref
  if (options.quoteRef) {
    const serviceText = options.serviceName ? ` for ${options.serviceName}` : '';
    return `Hi Eko Prints, I submitted a quote request (Ref: #${options.quoteRef.slice(0, 8)})${serviceText}. I would like to follow up on the pricing and turnaround time.`;
  }

  // If inquiring about a specific service
  if (options.serviceName) {
    if (isFromAd) {
      return `Hi Eko Prints! 👋 I saw your online ad and I'm interested in *${options.serviceName}* services. Could you share your pricing, options, and estimated turnaround time?`;
    }
    return `Hi Eko Prints! 👋 I would like to inquire about *${options.serviceName}* printing services. Please share pricing and options.`;
  }

  // If coming directly from an Ad campaign (Google Ads / Meta Ads)
  if (isFromAd) {
    const campaignMention = attribution.utm_campaign ? ` (${attribution.utm_campaign})` : '';
    return `Hi Eko Prints! 👋 I saw your online ad${campaignMention} for printing and branding services in Masaka. I would like to get a quick quote for my project.`;
  }

  // Default general inquiry
  return `Hi Eko Prints! 👋 I'm visiting your website and would like to get a quote and details for my printing project.`;
};

/**
 * Builds the full wa.me or api.whatsapp.com URL with pre-filled encoded text
 */
export const getWhatsAppUrl = (options: Partial<WhatsAppClickOptions> = {}): string => {
  const message = buildWhatsAppMessage(options);
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${EKO_WHATSAPP_NUMBER}?text=${encodedText}`;
};

/**
 * Fires the Google Tag / GTM conversion event and launches WhatsApp chat
 */
export const openWhatsApp = (options: WhatsAppClickOptions): void => {
  const { source, serviceName, customMessage, quoteRef, additionalParams } = options;

  // Track Google Tags / GTM conversion event
  trackWhatsAppClick(source, {
    service_name: serviceName || 'General Inquiry',
    has_quote_ref: !!quoteRef,
    custom_message_sent: !!customMessage,
    ...additionalParams,
  });

  const url = getWhatsAppUrl(options);

  // Open WhatsApp in new tab / app
  window.open(url, '_blank', 'noopener,noreferrer');
};
