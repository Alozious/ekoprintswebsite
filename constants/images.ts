/**
 * Eko Prints — Image Configuration
 *
 * HOW TO USE YOUR OWN IMAGES:
 * 1. Drop your photos into the correct folder inside assets/
 *    - Hero background  → assets/hero/
 *    - Work/portfolio   → assets/work/
 *    - Machines         → assets/machines/
 *    - Service samples  → assets/services/
 * 2. Replace the placeholder URLs below with the local path, e.g.:
 *      url: 'assets/work/work-1.jpg'
 * 3. Save and refresh — done.
 *
 * See assets/README.md for the full folder guide.
 */

export const ASSETS = {
  hero: {
    // Replace with: 'assets/hero/hero-bg.jpg' once you add your hero photo
    background: 'assets/largeformathomeimage.jpg',
  },

  services: {
    // Replace each with: 'assets/services/large-format.jpg' etc.
    largeFormat: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
    dtf:         'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800&auto=format&fit=crop',
    embroidery:  'https://images.unsplash.com/photo-1604644401890-0bd678c83788?q=80&w=800&auto=format&fit=crop',
    tshirt:      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
    branding:    'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=800&auto=format&fit=crop',
  },

  // Machines / Studio — add your own in assets/machines/
  machines: [
    {
      id: 'm1',
      title: 'Large Format Plotter',
      description: 'Wide-format inkjet printer for banners, signs, and architectural prints.',
      // Replace with: 'assets/machines/machine-1.jpg'
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: 'm2',
      title: 'DTF Transfer Printer',
      description: 'Direct-to-Film system for vibrant, wash-resistant apparel transfers.',
      // Replace with: 'assets/machines/machine-2.jpg'
      url: 'https://images.unsplash.com/photo-1589952283406-b53a7d1347e8?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: 'm3',
      title: 'Embroidery Machine',
      description: 'Multi-head commercial embroidery for uniforms, caps, and branded merchandise.',
      // Replace with: 'assets/machines/machine-3.jpg'
      url: 'https://images.unsplash.com/photo-1604644401890-0bd678c83788?q=80&w=1000&auto=format&fit=crop',
    },
    {
      id: 'm4',
      title: 'Heat Press Station',
      description: 'Professional heat press for t-shirts, mugs, and promotional items.',
      // Replace with: 'assets/machines/machine-4.jpg'
      url: 'https://images.unsplash.com/photo-1517315003714-a07399613c7c?q=80&w=1000&auto=format&fit=crop',
    },
  ],

  // Portfolio / Work — add your own in assets/work/
  portfolio: [
    {
      id: 'w1',
      category: 'Large Format',
      title: 'Billboard Campaign',
      // Replace with: 'assets/work/work-1.jpg'
      url: 'https://images.unsplash.com/photo-1585644198332-68bdd7459146?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'w2',
      category: 'DTF Apparel',
      title: 'Custom Jersey Set',
      // Replace with: 'assets/work/work-2.jpg'
      url: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'w3',
      category: 'Branding',
      title: 'Brand Identity System',
      // Replace with: 'assets/work/work-3.jpg'
      url: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'w4',
      category: 'Embroidery',
      title: 'Corporate Uniform Set',
      // Replace with: 'assets/work/work-4.jpg'
      url: 'https://images.unsplash.com/photo-1604644401890-0bd678c83788?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'w5',
      category: 'Vehicle Wrap',
      title: 'Delivery Fleet Branding',
      // Replace with: 'assets/work/work-5.jpg'
      url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 'w6',
      category: 'T-Shirt Printing',
      title: 'Event Merchandise',
      // Replace with: 'assets/work/work-6.jpg'
      url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
    },
  ],

  about: {
    // Replace with: 'assets/machines/machine-1.jpg' or a studio photo
    main: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop',
  },

  logo: 'assets/logo.png',
};
