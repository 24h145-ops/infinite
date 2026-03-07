'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, Ruler, Info, Share2, Heart, Search } from 'lucide-react';
import { TryOnModal } from '@/components/tryon/TryOnModal';
import { ReservationModal } from '@/components/reservation/ReservationModal';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [showTryOn, setShowTryOn] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const product = {
    id: params.id,
    name: 'PUMA RS-X 3D',
    brand: 'PUMA',
    price: 4999,
    category: "Men's Athletic",
    description: 'The RS-X is back. The future-retro silhouette of this sneaker returns with progressive aesthetic and angular details, complete with nubuck and suede overlays. The combo\'s all about a disruptive design to showcase your disruptive style.',
    colors: ['Red/Black', 'White/Blue', 'Triple Black'],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    stock: 14,
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620023671759-4592ce2b5167?q=80&w=800&auto=format&fit=crop'
    ]
  };

  return (
    <div className="min-h-screen bg-sole-black pt-16 animate-in fade-in duration-500">
      <header className="fixed top-0 left-0 right-0 z-50 bg-sole-black/95 backdrop-blur-md border-b border-sole-border h-16 flex items-center px-4">
        <div className="flex items-center gap-4 max-w-7xl mx-auto w-full">
          <Link href="/" className="text-sole-grey hover:text-sole-white transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="font-display font-black text-xl tracking-tighter uppercase truncate flex-1">
            {product.name}
          </h1>
          <button className="text-sole-grey hover:text-sole-white transition-colors">
            <Share2 size={20} />
          </button>
          <button className="text-sole-grey hover:text-sole-red transition-colors">
            <Heart size={20} />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto flex flex-col lg:flex-row pb-24 lg:pb-0">
        
        {/* Swipeable Gallery Area */}
        <div className="w-full lg:w-1/2 flex flex-col relative border-b lg:border-b-0 lg:border-r border-sole-border">
          <div className="aspect-square bg-sole-surface w-full relative overflow-hidden">
             <img src={product.images[activeImage]} alt={product.name} className="object-cover w-full h-full mix-blend-luminosity hover:mix-blend-normal transition-all" />
             {/* Virtual Try On Floating CTA */}
             <button 
               onClick={() => setShowTryOn(true)}
               className="absolute bottom-4 right-4 bg-sole-black/80 backdrop-blur border border-sole-border text-sole-white font-mono text-[10px] uppercase tracking-[2px] p-3 flex items-center gap-2 hover:border-sole-red hover:text-sole-red transition-colors"
             >
               <Search size={14} /> Virtual Try-On
             </button>
          </div>
          
          <div className="flex overflow-x-auto hide-scrollbar border-t border-sole-border bg-sole-black p-4 gap-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                className={`w-20 h-20 flex-shrink-0 border-2 transition-colors overflow-hidden bg-sole-surface ${activeImage === idx ? 'border-sole-red opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
              >
                 <img src={img} className="object-cover w-full h-full mix-blend-luminosity" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details Area */}
        <div className="w-full lg:w-1/2 p-4 lg:p-8 xl:p-12 flex flex-col">
           <div className="flex items-start justify-between">
             <div className="space-y-1">
               <h2 className="font-mono text-sole-grey text-xs tracking-widest uppercase">{product.brand} - {product.category}</h2>
               <h1 className="font-display font-black text-4xl lg:text-5xl tracking-tighter uppercase leading-none">{product.name}</h1>
             </div>
             <div className="text-right">
               <p className="font-mono text-xl lg:text-2xl font-bold text-sole-red">₹{product.price}</p>
             </div>
           </div>

           <div className="flex items-center gap-1 mt-4 text-sole-grey">
             <Star size={14} className="fill-sole-red text-sole-red" />
             <Star size={14} className="fill-sole-red text-sole-red" />
             <Star size={14} className="fill-sole-red text-sole-red" />
             <Star size={14} className="fill-sole-red text-sole-red" />
             <Star size={14} className="border-sole-grey" />
             <span className="font-mono text-[10px] ml-2 uppercase">(128 Reviews)</span>
           </div>

           <div className="my-8 h-px bg-sole-border w-full" />

           {/* Color Selection */}
           <div className="mb-8">
             <p className="font-mono text-xs uppercase tracking-[2px] text-sole-white mb-4">Select Color</p>
             <div className="flex gap-4">
               {product.colors.map((color, idx) => (
                 <button key={color} className={`px-4 py-2 border font-mono text-[10px] uppercase tracking-[1px] transition-colors ${idx === 0 ? 'border-sole-red text-sole-white bg-sole-red/10' : 'border-sole-border text-sole-grey hover:border-sole-light-grey'}`}>
                   {color}
                 </button>
               ))}
             </div>
           </div>

           {/* Size Selection */}
           <div className="mb-8">
             <div className="flex justify-between items-center mb-4">
               <p className="font-mono text-xs uppercase tracking-[2px] text-sole-white">Select Size (UK)</p>
               <button className="flex items-center gap-1 text-sole-grey hover:text-sole-white transition-colors font-mono text-[10px] uppercase tracking-widest">
                 <Ruler size={12} /> Size Guide
               </button>
             </div>
             <div className="grid grid-cols-4 gap-2">
                 {product.sizes.map((size) => (
                   <button 
                     key={size}
                     onClick={() => setSelectedSize(size)}
                     className={`py-3 flex items-center justify-center border font-mono text-base transition-colors ${selectedSize === size ? 'border-sole-red bg-sole-red text-sole-white font-bold' : 'border-sole-border bg-sole-surface text-sole-grey hover:border-sole-light-grey hover:text-sole-white'}`}
                   >
                     {size}
                   </button>
                 ))}
             </div>
             {product.stock < 15 && (
               <p className="mt-4 flex items-center gap-2 text-xs font-mono text-sole-red uppercase tracking-widest"><Info size={14}/> Only {product.stock} left in stock</p>
             )}
           </div>

           <div className="mb-8">
             <h3 className="font-mono text-xs uppercase tracking-[2px] text-sole-white mb-4">Product Story</h3>
             <p className="text-sole-grey font-light leading-relaxed">{product.description}</p>
           </div>

           {/* Sticky Bottom Actions */}
           <div className="fixed bottom-0 left-0 right-0 lg:static flex flex-col bg-sole-black/95 backdrop-blur-md border-t border-sole-border lg:border-none p-4 lg:p-0 gap-3 z-40">
              <button 
                className="btn-primary py-4 w-full text-sm"
                onClick={() => {
                  if(!selectedSize) alert("Please select a size first");
                  else alert("Added to cart!");
                }}
              >
                Add to Cart — ₹{product.price}
              </button>
              <button 
                className="btn-secondary py-4 w-full text-sm"
                onClick={() => {
                  if(!selectedSize) alert("Please select a size first");
                  else setShowReservation(true);
                }}
              >
                Reserve for 48H (Pay 50%)
              </button>
           </div>

        </div>
      </main>

      {showTryOn && <TryOnModal onClose={() => setShowTryOn(false)} productImage={product.images[0]} />}
      {showReservation && <ReservationModal onClose={() => setShowReservation(false)} product={product} size={selectedSize!} />}
    </div>
  );
}
