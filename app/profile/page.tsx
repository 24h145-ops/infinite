'use client';

import Link from 'next/link';
import { ArrowLeft, User, ShoppingBag, Heart, MapPin, CreditCard, Settings } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-sole-black pt-16">
      <header className="fixed top-0 left-0 right-0 z-50 bg-sole-black/95 backdrop-blur-md border-b border-sole-border h-16 flex items-center px-4">
        <div className="flex items-center gap-4 max-w-7xl mx-auto w-full">
          <Link href="/" className="text-sole-grey hover:text-sole-white transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="font-display font-black text-xl tracking-tighter uppercase flex-1">
            Profile
          </h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 pt-8">
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-sole-red rounded-full mx-auto flex items-center justify-center">
              <User size={32} className="text-sole-black" />
            </div>
            <div>
              <h2 className="font-display font-black text-2xl uppercase tracking-tighter">John Doe</h2>
              <p className="text-sole-grey font-mono text-sm">john.doe@example.com</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            <Link href="/cart" className="flex items-center gap-4 p-4 bg-sole-surface border border-sole-border hover:border-sole-red transition-colors">
              <ShoppingBag size={20} className="text-sole-grey" />
              <span className="font-mono text-sm uppercase tracking-widest">My Cart</span>
            </Link>

            <button className="flex items-center gap-4 p-4 bg-sole-surface border border-sole-border hover:border-sole-red transition-colors w-full text-left">
              <Heart size={20} className="text-sole-grey" />
              <span className="font-mono text-sm uppercase tracking-widest">Favorites</span>
            </button>

            <button className="flex items-center gap-4 p-4 bg-sole-surface border border-sole-border hover:border-sole-red transition-colors w-full text-left">
              <MapPin size={20} className="text-sole-grey" />
              <span className="font-mono text-sm uppercase tracking-widest">Addresses</span>
            </button>

            <button className="flex items-center gap-4 p-4 bg-sole-surface border border-sole-border hover:border-sole-red transition-colors w-full text-left">
              <CreditCard size={20} className="text-sole-grey" />
              <span className="font-mono text-sm uppercase tracking-widest">Payment Methods</span>
            </button>

            <button className="flex items-center gap-4 p-4 bg-sole-surface border border-sole-border hover:border-sole-red transition-colors w-full text-left">
              <Settings size={20} className="text-sole-grey" />
              <span className="font-mono text-sm uppercase tracking-widest">Settings</span>
            </button>
          </div>

          {/* Sign Out */}
          <div className="pt-8 border-t border-sole-border">
            <button className="w-full btn-secondary py-4">
              Sign Out
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}