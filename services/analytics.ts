// Google Tags (gtag.js / GTM dataLayer) and Ads Attribution Service

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export interface AdAttribution {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
  gclid?: string | null; // Google Click ID
  fbclid?: string | null; // Meta / Facebook Click ID
  wbraid?: string | null; // Google Web to App iOS
  gbraid?: string | null; // Google App to Web iOS
  ad_id?: string | null;
  service?: string | null;
  referrer?: string;
  landingPage?: string;
  timestamp?: string;
}

const STORAGE_KEY = 'eko_ad_attribution';

/**
 * Parses query params from current URL and preserves ad attribution in sessionStorage
 */
export const initAnalytics = (): AdAttribution => {
  // Ensure dataLayer exists
  window.dataLayer = window.dataLayer || [];

  // Ensure gtag function exists
  if (!window.gtag) {
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const existingStr = sessionStorage.getItem(STORAGE_KEY);
    const existing: AdAttribution = existingStr ? JSON.parse(existingStr) : {};

    const utm_source = urlParams.get('utm_source') || existing.utm_source || null;
    const utm_medium = urlParams.get('utm_medium') || existing.utm_medium || null;
    const utm_campaign = urlParams.get('utm_campaign') || existing.utm_campaign || null;
    const utm_term = urlParams.get('utm_term') || existing.utm_term || null;
    const utm_content = urlParams.get('utm_content') || existing.utm_content || null;
    const gclid = urlParams.get('gclid') || existing.gclid || null;
    const fbclid = urlParams.get('fbclid') || existing.fbclid || null;
    const wbraid = urlParams.get('wbraid') || existing.wbraid || null;
    const gbraid = urlParams.get('gbraid') || existing.gbraid || null;
    const ad_id = urlParams.get('ad_id') || existing.ad_id || null;
    const service = urlParams.get('service') || existing.service || null;

    const attribution: AdAttribution = {
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      gclid,
      fbclid,
      wbraid,
      gbraid,
      ad_id,
      service,
      referrer: document.referrer || existing.referrer || '',
      landingPage: window.location.href,
      timestamp: existing.timestamp || new Date().toISOString(),
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));

    // Send page_view with ad context to Google dataLayer
    if (gclid || fbclid || utm_source) {
      pushDataLayer('ad_landing', {
        ad_source: utm_source || (gclid ? 'google_ads' : fbclid ? 'facebook_ads' : 'organic_ad'),
        utm_campaign: utm_campaign || 'unknown',
        gclid,
        fbclid,
      });
    }

    return attribution;
  } catch (e) {
    console.warn('Analytics init error:', e);
    return {};
  }
};

/**
 * Get current ad attribution data
 */
export const getAdAttribution = (): AdAttribution => {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return {};
};

/**
 * Push event to GTM dataLayer & gtag
 */
export const pushDataLayer = (eventName: string, eventData: Record<string, any> = {}) => {
  try {
    window.dataLayer = window.dataLayer || [];
    const attribution = getAdAttribution();

    const payload = {
      event: eventName,
      ...attribution,
      ...eventData,
      event_time: new Date().toISOString(),
    };

    window.dataLayer.push(payload);

    // Also trigger window.gtag if present
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, payload);
    }

    // Helpful console log in development/testing mode
    if (window.location.hostname === 'localhost' || window.location.search.includes('debug_gtm=1')) {
      console.log(`[Google Tag Event: ${eventName}]`, payload);
    }
  } catch (err) {
    console.warn(`Error tracking event ${eventName}:`, err);
  }
};

export const GOOGLE_ADS_ID = 'AW-17662736316';
export const WHATSAPP_CONVERSION_SEND_TO = 'AW-17662736316/oqr5CNzCp-IcELzvn-ZB';

/**
 * Track WhatsApp CTA Clicks (Conversion Action)
 */
export const trackWhatsAppClick = (source: string, details: Record<string, any> = {}) => {
  const attribution = getAdAttribution();
  const isFromAd = !!(attribution.gclid || attribution.fbclid || attribution.utm_source);

  pushDataLayer('whatsapp_click', {
    conversion_channel: 'whatsapp',
    click_source: source,
    is_from_ad: isFromAd,
    ad_platform: attribution.utm_source || (attribution.gclid ? 'google_ads' : attribution.fbclid ? 'meta_ads' : 'direct'),
    campaign: attribution.utm_campaign || 'general',
    ...details,
  });

  // Track Google Ads Lead Conversion event
  pushDataLayer('generate_lead', {
    lead_type: 'whatsapp_contact',
    method: 'whatsapp',
    source,
    value: details.value || 1.0,
    currency: 'UGX',
  });

  // Primary Google Ads conversion event with exact send_to label
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: WHATSAPP_CONVERSION_SEND_TO,
      value: details.value || 1.0,
      currency: 'UGX',
      event_callback: () => {},
    });
  }

  pushDataLayer('conversion', {
    send_to: WHATSAPP_CONVERSION_SEND_TO,
    conversion_type: 'whatsapp_from_ads',
    source,
  });
};

/**
 * Track Phone Call button clicks
 */
export const trackPhoneCall = (source: string, phone: string = '+256703580516') => {
  pushDataLayer('phone_call_click', {
    conversion_channel: 'phone_call',
    phone_number: phone,
    click_source: source,
  });

  pushDataLayer('contact', {
    method: 'phone',
    source,
  });

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_ID,
      event_category: 'Contact',
      event_label: 'phone_call',
    });
  }
};

/**
 * Track Quote Form Submissions
 */
export const trackQuoteSubmit = (quoteDetails: Record<string, any>) => {
  pushDataLayer('quote_submission', {
    conversion_channel: 'quote_form',
    service: quoteDetails.service,
    quantity: quoteDetails.quantity,
    customer_name: quoteDetails.name,
    customer_phone: quoteDetails.phone,
  });

  pushDataLayer('generate_lead', {
    lead_type: 'quote_request',
    method: 'website_form',
    service: quoteDetails.service,
    value: 5.0,
    currency: 'UGX',
  });

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_ID,
      event_category: 'Contact',
      event_label: 'quote_form_lead',
      value: 5.0,
      currency: 'UGX',
    });
  }

  pushDataLayer('conversion', {
    conversion_type: 'quote_form_lead',
    service: quoteDetails.service,
  });
};
