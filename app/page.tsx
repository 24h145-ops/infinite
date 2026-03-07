'use client';

import { ShoppingBag, User, Menu } from "lucide-react";
import { SearchBar } from "@/components/search/SearchBar";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [gender, setGender] = useState<'men' | 'women'>('men');

  const categories = {
    men: ['Formal', 'Casual', 'Athletic/Sports', 'Boots', 'Open Shoes', 'Ethnic Wear'],
    women: ['Heels', 'Flats', 'Sandals', 'Boots', 'Sneakers', 'Ethnic']
  };

  return (
    <div className="min-h-screen flex flex-col pt-16">
      <header className="fixed top-0 left-0 right-0 z-50 bg-sole-black/95 backdrop-blur-md border-b border-sole-border h-16 flex items-center">
        <div className="flex items-center justify-between px-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-sole-grey hover:text-sole-white transition-colors">
              <Menu size={24} />
            </button>
            <h1 className="font-display font-black text-2xl tracking-tighter">
              SOLE
            </h1>
          </div>
          
          <div className="hidden lg:block flex-1 max-w-xl mx-8">
            <SearchBar />
          </div>

          <div className="flex items-center gap-4">
            <Link href="/profile" className="text-sole-grey hover:text-sole-white transition-colors">
              <User size={20} />
            </Link>
            <Link href="/cart" className="text-sole-grey hover:text-sole-white transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-sole-red rounded-full text-[9px] flex justify-center items-center font-bold">
                0
              </span>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Mobile Search Bar (shows below header on small screens) */}
      <div className="lg:hidden p-4 border-b border-sole-border sticky top-16 z-40 bg-sole-black/95 backdrop-blur-md">
        <SearchBar />
      </div>

      {/* Gender Toggle Tab Bar */}
      <div className="sticky top-[128px] lg:top-16 z-40 bg-sole-black/95 backdrop-blur-md border-b border-sole-border">
        <div className="max-w-7xl mx-auto flex w-full">
          <button 
            onClick={() => setGender('men')}
            className={`flex-1 py-4 font-display font-black text-xl tracking-widest uppercase transition-colors border-b-2 ${gender === 'men' ? 'text-sole-white border-sole-red bg-[#111]' : 'text-sole-grey border-transparent hover:text-sole-light-grey bg-sole-black'}`}
          >
            Men
          </button>
          <button 
            onClick={() => setGender('women')}
            className={`flex-1 py-4 font-display font-black text-xl tracking-widest uppercase transition-colors border-b-2 ${gender === 'women' ? 'text-sole-white border-sole-red bg-[#111]' : 'text-sole-grey border-transparent hover:text-sole-light-grey bg-sole-black'}`}
          >
            Women
          </button>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        
        {/* Categories Horizontal Scroll */}
        <div className="flex overflow-x-auto hide-scrollbar gap-4 mb-8 pb-2">
          {categories[gender].map(cat => (
            <button key={cat} className="whitespace-nowrap px-6 py-2 border border-sole-border text-sole-grey font-mono text-[11px] uppercase tracking-[2px] transition-colors hover:border-sole-red hover:text-sole-white rounded-full">
              {cat}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display font-black text-3xl uppercase tracking-tighter">
            {gender}'s Collection
          </h2>
          <div className="flex gap-4">
            <select className="bg-transparent border border-sole-border text-sole-white font-mono text-[11px] uppercase tracking-[1px] px-3 py-2 outline-none focus:border-sole-red cursor-pointer">
              <option className="bg-sole-black">Sort: Newest</option>
              <option className="bg-sole-black">Price: Low-High</option>
              <option className="bg-sole-black">Price: High-Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in duration-500" key={gender}>
          {/* Skeleton cards for mockup */}
          {[1,2,3,4,5,6,7,8].map((i) => (
            <Link href={`/product/${i}`} key={i} className="card p-0 flex flex-col group cursor-pointer bg-sole-surface border-sole-border block">
              <div className="aspect-[4/5] bg-sole-black w-full relative overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity mix-blend-luminosity hover:mix-blend-normal" />
              </div>
              <div className="p-4 flex flex-col gap-2 relative z-10 bg-sole-surface">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sole-white text-lg">NIKE AIR MAX {i}</h3>
                  <span className="font-mono font-bold text-sole-white">₹12,999</span>
                </div>
                <p className="text-sole-grey text-xs uppercase font-mono tracking-widest">{categories[gender][i % 6]}</p>
                <div className="flex gap-1 mt-1">
                  <div className="w-3 h-3 rounded-full bg-red-600 border border-sole-border"></div>
                  <div className="w-3 h-3 rounded-full bg-black border border-sole-border"></div>
                  <div className="w-3 h-3 rounded-full bg-white border border-sole-border"></div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="btn-primary flex-1 py-3 text-[10px]" onClick={(e) => e.preventDefault()}>Add to Cart</button>
                  <button className="btn-secondary w-1/3 py-3 text-[10px]" onClick={(e) => e.preventDefault()}>Reserve</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
