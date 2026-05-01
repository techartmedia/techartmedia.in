'use client';
import { useEffect, useState } from 'react';
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
        alert("Access Denied: Admins Only");
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

    if (error) alert(error.message);
    else {
      alert('Product added successfully!');
      setName(''); setPrice(''); setDesc('');
    }
  };

  if (loading) return <div className="bg-black min-h-screen text-white p-10">Verifying Admin Access...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-8 uppercase tracking-widest text-purple-500">Admin Dashboard</h1>
      <div className="bg-zinc-900 p-8 rounded-2xl border border-white/10 max-w-lg">
        <h2 className="text-xl font-bold mb-6">Add New Product</h2>
        <form onSubmit={handleAddProduct} className="space-y-4">
          <input placeholder="Product Name" className="w-full p-3 bg-black border border-white/10 rounded focus:border-purple-600 outline-none" 
                 value={name} onChange={(e) => setName(e.target.value)} required />
          <input placeholder="Price (₹)" type="number" className="w-full p-3 bg-black border border-white/10 rounded focus:border-purple-600 outline-none" 
                 value={price} onChange={(e) => setPrice(e.target.value)} required />
          <textarea placeholder="Technical Specifications / Description" className="w-full p-3 bg-black border border-white/10 rounded h-32 focus:border-purple-600 outline-none" 
                    value={desc} onChange={(e) => setDesc(e.target.value)} required />
          <button className="w-full bg-purple-600 p-4 rounded-xl font-bold hover:bg-purple-700 transition-all">
            Publish to Store
          </button>
        </form>
      </div>
    </div>
  );
}