import React, { useEffect, useState } from 'react';
import { ArrowLeft, ImagePlus, PackagePlus, Plus, Trash2 } from 'lucide-react';
import { ASSETS } from '../constants/images';
import { compressProductImage, deleteCloudProduct, deleteCustomProduct, getCategories, getCloudCategories, getCloudProducts, getCustomProducts, saveCategory, saveCloudCategory, saveCloudProduct, saveProduct, ShopProduct } from '../services/shopCatalog';
import { supabase } from '../services/supabase';

export const Admin: React.FC = () => {
  const [categories, setCategories] = useState(getCategories);
  const [products, setProducts] = useState(getCustomProducts);
  const [newCategory, setNewCategory] = useState('');
  const [image, setImage] = useState('');
  const [imageBusy, setImageBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [login, setLogin] = useState({ email: '', password: '' });
  const [form, setForm] = useState({ name: '', category: categories[0] || '', price: '', description: '' });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(Boolean(data.session));
      setAuthLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setIsAuthenticated(Boolean(session)));
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    Promise.all([getCloudProducts(), getCloudCategories()])
      .then(([cloudProducts, cloudCategories]) => {
        setProducts(cloudProducts);
        setCategories(Array.from(new Set([...getCategories(), ...cloudCategories])));
      })
      .catch(() => setMessage('Supabase is unavailable. Run the included schema setup in your Supabase project.'));
  }, [isAuthenticated]);

  const signIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    const { error } = await supabase.auth.signInWithPassword(login);
    setMessage(error ? error.message : 'Signed in successfully.');
    setSaving(false);
  };

  const addCategory = async (event: React.FormEvent) => {
    event.preventDefault();
    const value = newCategory.trim();
    if (!value) return;
    try {
      await saveCloudCategory(value);
      saveCategory(value);
      setMessage('Category saved to Supabase.');
    } catch {
      saveCategory(value);
      setMessage('Supabase unavailable. Category saved on this device.');
    }
    setCategories((current) => Array.from(new Set([...current, value])));
    setForm((current) => ({ ...current, category: value }));
    setNewCategory('');
  };

  const selectImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageBusy(true);
    setMessage('');
    try {
      setImage(await compressProductImage(file));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to process this image.');
    } finally {
      setImageBusy(false);
    }
  };

  const addProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!image) {
      setMessage('Please add a product image.');
      return;
    }
    const product: ShopProduct = {
      id: `custom-${Date.now()}`,
      ...form,
      price: form.price.toUpperCase().startsWith('UGX') ? form.price : `UGX ${form.price}`,
      image,
      custom: true,
    };
    setSaving(true);
    try {
      const savedProduct = await saveCloudProduct(product, image);
      saveProduct(savedProduct);
      setProducts((current) => [...current, savedProduct]);
      setMessage('Product and image uploaded to Supabase.');
    } catch {
      saveProduct(product);
      setProducts(getCustomProducts());
      setMessage('Supabase upload failed. Product saved on this device. Check the schema and storage policies.');
    } finally {
      setSaving(false);
    }
    setForm({ name: '', category: categories[0] || '', price: '', description: '' });
    setImage('');
  };

  const removeProduct = async (product: ShopProduct) => {
    try {
      await deleteCloudProduct(product);
      deleteCustomProduct(product.id);
      setProducts((current) => current.filter((item) => item.id !== product.id));
      setMessage('Product removed from Supabase.');
    } catch {
      deleteCustomProduct(product.id);
      setProducts(getCustomProducts());
      setMessage('Product removed from this device.');
    }
  };

  const fieldClass = 'w-full rounded-md border border-gray-300 bg-white px-3.5 py-3 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100';

  if (authLoading) return <div className="min-h-screen grid place-items-center text-sm text-gray-500">Loading admin...</div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 grid place-items-center px-4">
        <form onSubmit={signIn} className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <img src={ASSETS.logo} alt="Eko Prints" className="h-11 w-auto mx-auto mb-6" />
          <h1 className="text-2xl font-black">Admin sign in</h1>
          <p className="text-sm text-gray-500 mt-1 mb-5">Use the admin user created in Supabase Authentication.</p>
          {message && <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">{message}</p>}
          <div className="space-y-3">
            <input required type="email" value={login.email} onChange={(event) => setLogin({ ...login, email: event.target.value })} placeholder="Admin email" className={fieldClass} />
            <input required type="password" value={login.password} onChange={(event) => setLogin({ ...login, password: event.target.value })} placeholder="Password" className={fieldClass} />
            <button disabled={saving} className="w-full rounded-md bg-gray-900 py-3 text-xs font-bold text-white disabled:opacity-50">{saving ? 'Signing in...' : 'Sign in'}</button>
          </div>
          <a href="/" className="mt-5 block text-center text-xs font-bold text-pink-600">Back to website</a>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto h-[72px] px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-pink-600"><ArrowLeft className="w-4 h-4" /> Website</a>
          <img src={ASSETS.logo} alt="Eko Prints" className="h-10 w-auto" />
          <a href="/#shop" className="text-xs font-bold text-pink-600 hover:text-pink-700">View shop</a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-10">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-pink-600">Catalogue management</p>
          <div className="flex items-end justify-between gap-4"><h1 className="text-3xl sm:text-4xl font-black mt-1">Shop Admin</h1><button onClick={() => supabase.auth.signOut()} className="text-xs font-bold text-gray-500 hover:text-red-600">Sign out</button></div>
        </div>

        {message && <div className="mb-6 rounded-md border border-pink-200 bg-pink-50 px-4 py-3 text-sm font-medium text-pink-800">{message}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <section className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4"><Plus className="w-4 h-4 text-pink-600" /><h2 className="font-extrabold">Add category</h2></div>
            <form onSubmit={addCategory} className="space-y-3">
              <input value={newCategory} onChange={(event) => setNewCategory(event.target.value)} placeholder="Category name" className={fieldClass} />
              <button className="w-full rounded-md bg-gray-900 py-3 text-xs font-bold text-white">Add category</button>
            </form>
            <div className="mt-5 flex flex-wrap gap-2">
              {categories.map((category) => <span key={category} className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700">{category}</span>)}
            </div>
          </section>

          <section className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-5"><PackagePlus className="w-5 h-5 text-pink-600" /><h2 className="font-extrabold">Add product</h2></div>
            <form onSubmit={addProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Product name" className={fieldClass} />
              <select required value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className={fieldClass}>
                {categories.map((category) => <option key={category}>{category}</option>)}
              </select>
              <input required value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder="Price, e.g. 25,000" className={fieldClass} />
              <label className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-gray-400 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 hover:border-pink-500">
                <ImagePlus className="w-4 h-4" /> {imageBusy ? 'Optimizing image...' : image ? 'Change image' : 'Add product image'}
                <input type="file" accept="image/*" onChange={selectImage} className="sr-only" />
              </label>
              <textarea required value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Product description" rows={4} className={`${fieldClass} sm:col-span-2 resize-none`} />
              {image && <img src={image} alt="Product preview" className="sm:col-span-2 h-40 w-full rounded-md bg-gray-100 object-contain" />}
              <button disabled={imageBusy || saving} className="sm:col-span-2 rounded-md bg-gradient-to-r from-blue-700 via-indigo-600 to-pink-500 py-3.5 text-xs font-bold uppercase text-white disabled:opacity-50">{saving ? 'Uploading to Supabase...' : 'Add product to shop'}</button>
            </form>
          </section>
        </div>

        <section className="mt-8">
          <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-extrabold">Added products</h2><span className="text-xs text-gray-500">{products.length} custom products</span></div>
          {products.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white py-12 text-center text-sm text-gray-500">No custom products added yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <article key={product.id} className="flex gap-4 rounded-lg border border-gray-200 bg-white p-3">
                  <img src={product.image} alt="" loading="lazy" decoding="async" className="h-20 w-20 shrink-0 rounded-md bg-gray-100 object-cover" />
                  <div className="min-w-0 flex-1"><h3 className="font-bold truncate">{product.name}</h3><p className="text-xs text-gray-500">{product.category}</p><p className="text-sm font-extrabold text-pink-600 mt-1">{product.price}</p></div>
                  <button onClick={() => removeProduct(product)} aria-label={`Delete ${product.name}`} className="self-start p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
