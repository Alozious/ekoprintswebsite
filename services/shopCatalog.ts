import { ASSETS } from '../constants/images';
import { supabase } from './supabase';

export interface ShopProduct {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  price: string;
  custom?: boolean;
  storagePath?: string;
}

const PRODUCTS_KEY = 'eko_shop_products';
const CATEGORIES_KEY = 'eko_shop_categories';

export const defaultProducts: ShopProduct[] = [
  { id: 'branding-pack', name: 'Branding & Identity Pack', category: 'Branding', image: ASSETS.services.branding, description: 'Logo design, business cards and essential branded stationery.', price: 'UGX 50,000' },
  { id: 'large-format', name: 'Large Format Printing', category: 'Large Format', image: ASSETS.services.largeFormat, description: 'Banners, posters, roll-ups and outdoor advertising materials.', price: 'UGX 25,000' },
  { id: 'flyers-brochures', name: 'Flyers & Brochures', category: 'Digital Print', image: ASSETS.services.marketing, description: 'Sharp, full-colour promotional printing for any campaign.', price: 'UGX 500' },
  { id: 'branded-shirts', name: 'Branded T-Shirts', category: 'Merchandise', image: ASSETS.services.merchandise, description: 'Custom DTF printed shirts for teams, events and businesses.', price: 'UGX 20,000' },
  { id: 'design-artwork', name: 'Design & Artwork', category: 'Creative', image: ASSETS.services.design, description: 'Professional artwork prepared for print and digital use.', price: 'UGX 30,000' },
];

export const defaultCategories = Array.from(new Set(defaultProducts.map((product) => product.category)));

const readJson = <T,>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) as T : fallback;
  } catch {
    return fallback;
  }
};

export const getCustomProducts = () => readJson<ShopProduct[]>(PRODUCTS_KEY, []);
export const getProducts = () => [...defaultProducts, ...getCustomProducts()];
export const getCategories = () => Array.from(new Set([...defaultCategories, ...readJson<string[]>(CATEGORIES_KEY, [])]));

export const saveCategory = (category: string) => {
  const value = category.trim();
  if (!value) return;
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(Array.from(new Set([...getCategories(), value]))));
};

export const saveProduct = (product: ShopProduct) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify([...getCustomProducts(), product]));
};

export const deleteCustomProduct = (id: string) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(getCustomProducts().filter((product) => product.id !== id)));
};

export const getCloudProducts = async () => {
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map((product) => ({
    id: String(product.id), name: product.name, category: product.category,
    description: product.description, price: product.price, image: product.image,
    storagePath: product.storage_path || undefined, custom: true,
  } as ShopProduct));
};

export const getCloudCategories = async () => {
  const { data, error } = await supabase.from('categories').select('name').order('name');
  if (error) throw error;
  return (data || []).map((category) => String(category.name)).filter(Boolean);
};

export const saveCloudCategory = async (name: string) => {
  const { error } = await supabase.from('categories').insert({ name: name.trim() });
  if (error) throw error;
};

export const saveCloudProduct = async (product: ShopProduct, imageDataUrl: string) => {
  const imageBlob = await fetch(imageDataUrl).then((response) => response.blob());
  const safeName = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const storagePath = `${Date.now()}-${safeName || 'product'}.webp`;
  const { error: uploadError } = await supabase.storage.from('product-images').upload(storagePath, imageBlob, { contentType: 'image/webp', cacheControl: '31536000' });
  if (uploadError) throw uploadError;
  const { data: publicImage } = supabase.storage.from('product-images').getPublicUrl(storagePath);
  const image = publicImage.publicUrl;
  const { data, error } = await supabase.from('products').insert({
    name: product.name,
    category: product.category,
    description: product.description,
    price: product.price,
    image,
    storage_path: storagePath,
  }).select().single();
  if (error) {
    await supabase.storage.from('product-images').remove([storagePath]);
    throw error;
  }
  return { ...product, id: String(data.id), image, storagePath };
};

export const deleteCloudProduct = async (product: ShopProduct) => {
  const { error } = await supabase.from('products').delete().eq('id', product.id);
  if (error) throw error;
  if (product.storagePath) {
    const { error: storageError } = await supabase.storage.from('product-images').remove([product.storagePath]);
    if (storageError) throw storageError;
  }
};

export const compressProductImage = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = () => reject(new Error('Unable to read this image.'));
  reader.onload = () => {
    const image = new Image();
    image.onerror = () => reject(new Error('Unsupported image format.'));
    image.onload = () => {
      const maxSize = 1000;
      const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      canvas.getContext('2d')?.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/webp', 0.78));
    };
    image.src = String(reader.result);
  };
  reader.readAsDataURL(file);
});
