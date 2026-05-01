'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('*');
      if (data) setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Techartmedia Inventory</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border border-white/10 p-6 rounded-xl bg-zinc-900">
            <h2 className="text-xl font-semibold text-purple-400">{product.name}</h2>
            <p className="text-gray-400 mt-2">{product.description}</p>
            <p className="text-white font-bold mt-4">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}