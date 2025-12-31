/**
 * Eko Prints Image Configuration
 * 
 * To use your own images:
 * 1. Place your image files in the 'assets/' folder.
 * 2. Update the paths below (e.g., 'assets/your-image.jpg').
 */

export const ASSETS = {
  // Hero Section
  hero: {
    background: 'assets/largeformathomeimage.jpg',
  },
  
  // Services Section
  services: {
    largeFormat: "https://images.unsplash.com/photo-1517315003714-a07399613c7c?q=80&w=800&auto=format&fit=crop",
    dtf: "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=800&auto=format&fit=crop",
    apparel: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop",
    digital: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
    branding: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=800&auto=format&fit=crop",
  },

  // Portfolio Section
  portfolio: [
    { id: '1', category: 'Branding', url: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800', title: 'Coffee Shop Identity' },
    { id: '2', category: 'Apparel', url: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=800', title: 'Urban Streetwear Collection' },
    { id: '3', category: 'Large Format', url: 'https://images.unsplash.com/photo-1585644198332-68bdd7459146?auto=format&fit=crop&q=80&w=1200', title: 'Metro Station Signage' },
    { id: '4', category: 'Digital', url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800', title: 'Premium Business Cards' },
    { id: '5', category: 'Vehicle', url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800', title: 'Commercial Van Wrap' },
    { id: '6', category: 'Merchandise', url: 'https://images.unsplash.com/photo-1614850523296-6313d5d064fd?auto=format&fit=crop&q=80&w=800', title: 'Tote Bag Customization' },
  ],

  // About Section
  about: {
    main: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
  },
  
  // Global
  logo: "assets/logo.png",
};
