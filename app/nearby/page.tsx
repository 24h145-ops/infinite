'use client';

import Link from 'next/link';
import { ArrowLeft, MapPin, Navigation, Store } from 'lucide-react';

export default function NearbyPage() {
  const nearbyStores = [
    {
      id: 1,
      name: 'SOLE Flagship Store',
      address: 'Connaught Place, New Delhi',
      distance: '2.3 km',
      status: 'Open',
      hours: 'Until 9 PM'
    },
    {
      id: 2,
      name: 'SOLE Boutique',
      address: 'Khan Market, New Delhi',
      distance: '4.1 km',
      status: 'Open',
      hours: 'Until 8 PM'
    },
    {
      id: 3,
      name: 'SOLE Express',
      address: 'Karol Bagh, New Delhi',
      distance: '6.8 km',
      status: 'Closed',
      hours: 'Opens at 10 AM'
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
            Nearby Stores
          </h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 pt-8">
        <div className="mb-6">
          <div className="bg-sole-surface border border-sole-border p-4 flex items-center gap-3">
            <MapPin size={20} className="text-sole-red" />
            <div>
              <p className="text-sole-white font-mono text-sm">Current Location</p>
              <p className="text-sole-grey text-xs">New Delhi, India</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {nearbyStores.map((store) => (
            <div key={store.id} className="bg-sole-surface border border-sole-border p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-display font-black text-lg uppercase tracking-tighter text-sole-white mb-1">
                    {store.name}
                  </h3>
                  <p className="text-sole-grey text-sm">{store.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-sole-red font-bold font-mono">{store.distance}</p>
                  <p className={`text-xs font-mono ${store.status === 'Open' ? 'text-green-400' : 'text-sole-grey'}`}>
                    {store.status}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sole-grey text-sm">{store.hours}</span>
                <div className="flex gap-2">
                  <button className="btn-secondary px-4 py-2 text-xs">
                    <Navigation size={14} className="inline mr-1" />
                    Directions
                  </button>
                  <button className="btn-primary px-4 py-2 text-xs">
                    <Store size={14} className="inline mr-1" />
                    Visit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/stores" className="btn-ghost">
            View All Stores
          </Link>
        </div>
      </main>
    </div>
  );
}