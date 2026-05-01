'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const router = useRouter();

  // SECURITY CHECK: Only let Admins stay on this page
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      if (!profile?.is_admin) {
        alert("Access Denied: You are not an Admin.");
        router.push('/');
      } else {
        setLoading(false);
      }
    };
    checkAdmin();
  }, [router]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('products')
      .insert([{ name, price: parseFloat(price), description: desc }]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert('Product published to store successfully!');
      setName(''); setPrice(''); setDesc('');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p className="animate-pulse">Verifying Admin Credentials...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-500 mb-8 tracking-tighter">TECHARTMEDIA ADMIN</h1>
        
        <div className="bg-zinc-900 border border-white/10 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-xl mb-6 font-semibold">Upload New Inventory</h2>
          
          <form onSubmit={handleAddProduct} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Product Name</label>
              <input 
                className="w-full bg-black border border-white/10 p-3 rounded-lg focus:border-purple-500 outline-none transition"
                placeholder="e.g. 12V 300RPM DC Motor"
                value={name} onChange={(e) => setName(e.target.value)} required 
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Price (INR)</label>
              <input 
                type="number"
                className="w-full bg-black border border-white/10 p-3 rounded-lg focus:border-purple-500 outline-none transition"
                placeholder="0.00"
                value={price} onChange={(e) => setPrice(e.target.value)} required 
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Details / Specs</label>
              <textarea 
                className="w-full bg-black border border-white/10 p-3 rounded-lg h-32 focus:border-purple-500 outline-none transition"
                placeholder="Enter technical specifications or product description..."
                value={desc} onChange={(e) => setDesc(e.target.value)} required 
              />
            </div>

            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-500/20">
              Add Product to Live Site
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}