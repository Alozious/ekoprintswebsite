import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, MessageCircle, Search, ShoppingBag, X } from 'lucide-react';
import { ASSETS } from '../constants/images';
import { openWhatsApp } from '../services/whatsapp';
import { defaultCategories, defaultProducts, getCategories, getCloudCategories, getCloudProducts, getProducts, ShopProduct } from '../services/shopCatalog';

interface ShopProps {
  onOpenQuote: () => void;
}

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const editDistance = (left: string, right: string) => {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let i = 1; i <= left.length; i += 1) {
    let diagonal = previous[0];
    previous[0] = i;
    for (let j = 1; j <= right.length; j += 1) {
      const above = previous[j];
      previous[j] = Math.min(
        previous[j] + 1,
        previous[j - 1] + 1,
        diagonal + (left[i - 1] === right[j - 1] ? 0 : 1),
      );
      diagonal = above;
    }
  }
  return previous[right.length];
};

const fuzzyMatch = (query: string, product: ShopProduct) => {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return true;

  const searchable = normalize(`${product.name} ${product.category} ${product.description}`);
  if (searchable.includes(normalizedQuery)) return true;

  const words = searchable.split(' ');
  return normalizedQuery.split(' ').every((queryWord) =>
    words.some((word) => {
      if (word.includes(queryWord) || queryWord.includes(word)) return true;
      if (queryWord.length >= 5 && word.startsWith(queryWord.slice(0, 5))) return true;
      const allowedErrors = queryWord.length >= 5 ? 2 : queryWord.length >= 4 ? 1 : 0;
      return allowedErrors > 0 && editDistance(queryWord, word) <= allowedErrors;
    }),
  );
};

export const Shop: React.FC<ShopProps> = ({ onOpenQuote }) => {
  const [products] = useState(getProducts);
  const [catalogue, setCatalogue] = useState(products);
  const [cloudCategories, setCloudCategories] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set([...getCategories(), ...cloudCategories]))];

  useEffect(() => {
    Promise.all([getCloudProducts(), getCloudCategories()])
      .then(([cloudProducts, savedCategories]) => {
        setCatalogue([...defaultProducts, ...cloudProducts]);
        setCloudCategories(savedCategories);
      })
      .catch(() => {
        setCatalogue(products);
        setCloudCategories(defaultCategories);
      });
  }, [products]);

  const filteredProducts = useMemo(
    () => catalogue.filter((product) =>
      (category === 'All' || product.category === category) && fuzzyMatch(query, product),
    ),
    [catalogue, category, query],
  );

  const resetFilters = () => {
    setQuery('');
    setCategory('All');
  };

  return (
  <div className="min-h-screen bg-gray-50 text-gray-900">
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-18 sm:h-20 flex items-center justify-between gap-4">
        <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-pink-600 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to website</span>
          <span className="sm:hidden">Back</span>
        </a>
        <img src={ASSETS.logo} alt="Eko Prints" className="h-9 sm:h-11 w-auto object-contain" />
        <button onClick={onOpenQuote} className="px-4 sm:px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-bold text-white uppercase bg-gradient-to-r from-blue-700 via-indigo-600 to-pink-500 shadow-md">
          Get a quote
        </button>
      </div>
    </header>

    <main>
      <section className="bg-[#070B19] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
          <div className="flex items-center gap-2 text-pink-400 text-xs font-bold uppercase tracking-widest mb-3">
            <ShoppingBag className="w-4 h-4" /> Eko Prints Shop
          </div>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight">Shop Print Products</h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-gray-300 leading-relaxed">
            Choose a product to start your order. Prices shown are starting prices and may vary by size, material and quantity.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:justify-between">
            <label className="relative block w-full lg:max-w-md">
              <span className="sr-only">Search products</span>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products, e.g. brochures or t-shirts"
                className="w-full h-12 rounded-lg border border-gray-300 bg-white pl-11 pr-11 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear product search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-800"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </label>

            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Filter products by category">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-bold transition-colors ${
                    category === item
                      ? 'bg-gray-900 text-white'
                      : 'border border-gray-300 bg-white text-gray-700 hover:border-pink-500 hover:text-pink-600'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProducts.map((product) => (
            <article key={product.name} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col">
              <div className="aspect-[4/3] bg-gray-100 p-4 overflow-hidden">
                <img src={product.image} alt={product.name} loading="lazy" decoding="async" className="w-full h-full object-contain" />
              </div>
              <div className="p-5 flex flex-1 flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-pink-600">{product.category}</span>
                <h2 className="text-lg font-extrabold mt-1">{product.name}</h2>
                <p className="text-sm text-gray-500 leading-relaxed mt-2 flex-1">{product.description}</p>
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-end justify-between gap-3">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">From</span>
                    <span className="text-xl font-black text-pink-600">{product.price}</span>
                  </div>
                  <button
                    onClick={() => openWhatsApp({ source: 'shop_product', serviceName: product.name })}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Order
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-16 text-center border border-dashed border-gray-300 rounded-lg bg-white">
            <Search className="w-8 h-8 text-gray-300 mx-auto mb-3" />
            <h2 className="text-lg font-extrabold">No matching products</h2>
            <p className="text-sm text-gray-500 mt-1">Try a similar word or clear your filters.</p>
            <button onClick={resetFilters} className="mt-5 px-5 py-2.5 rounded-full bg-gray-900 text-white text-xs font-bold">
              Show all products
            </button>
          </div>
        )}
      </section>
    </main>
  </div>
  );
};
