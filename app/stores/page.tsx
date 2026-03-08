'use client';

import Link from 'next/link';
import { ArrowLeft, MapPin, Phone, Clock } from 'lucide-react';

export default function StoresPage() {
  const stores = [
    {
      id: 1,
      name: 'SOLE Flagship Store',
      address: 'Connaught Place, New Delhi',
      phone: '+91 98765 43210',
      hours: '10 AM - 9 PM',
      distance: '2.3 km'
    },
    {
      id: 2,
      name: 'SOLE Mall Store',
      address: 'DLF Mall, Gurgaon',
      phone: '+91 98765 43211',
      hours: '11 AM - 10 PM',
      distance: '12.5 km'
    },
    {
      id: 3,
      name: 'SOLE Boutique',
      address: 'Khan Market, New Delhi',
      phone: '+91 98765 43212',
      hours: '10 AM - 8 PM',
      distance: '4.1 km'
    }
  ];

  return (
    <div className="min-h-screen bg-sole-black pt-16">
      <header className="fixed top-0 left-0 right-0 z-50 bg-sole-black/95 backdrop-blur-md border-b border-sole-border h-16 flex items-center px-4">
        <div className="flex items-center gap-4 max-w-7xl mx-auto w-full">
          <Link href="/" className="text-sole-grey hover:text-sole-white transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="font-display font-black text-xl tracking-tighter uppercase flex-1">
            Our Stores
          </h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 pt-8">
        <div className="space-y-4">
          {stores.map((store) => (
            <div key={store.id} className="bg-sole-surface border border-sole-border p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-display font-black text-lg uppercase tracking-tighter text-sole-white">
                  {store.name}
                </h3>
                <span className="text-sole-grey text-sm font-mono">{store.distance}</span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-sole-red shrink-0 mt-0.5" />
                  <span className="text-sole-grey">{store.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-sole-red shrink-0" />
                  <span className="text-sole-grey">{store.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-sole-red shrink-0" />
                  <span className="text-sole-grey">{store.hours}</span>
                </div>
              </div>

              <button className="btn-primary w-full mt-4 py-3">
                Get Directions
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}