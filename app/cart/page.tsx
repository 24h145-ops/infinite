'use client';

import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 5000 ? 0 : 299;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-sole-black pt-16">
      <header className="fixed top-0 left-0 right-0 z-50 bg-sole-black/95 backdrop-blur-md border-b border-sole-border h-16 flex items-center px-4">
        <div className="flex items-center gap-4 max-w-7xl mx-auto w-full">
          <Link href="/" className="text-sole-grey hover:text-sole-white transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="font-display font-black text-xl tracking-tighter uppercase flex-1">
            Cart
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 pt-8 pb-24">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag size={64} className="text-sole-grey mx-auto mb-4" />
            <h2 className="font-display font-black text-2xl uppercase tracking-tighter mb-2">Your cart is empty</h2>
            <p className="text-sole-grey mb-8">Add some shoes to get started</p>
            <Link href="/" className="btn-primary px-8 py-4">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 p-4 bg-sole-surface border border-sole-border">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover bg-sole-black" />
                  <div className="flex-1">
                    <h3 className="font-bold text-sole-white">{item.name}</h3>
                    <p className="text-sole-grey text-sm">Size: {item.size}</p>
                    <p className="font-mono text-sole-red font-bold">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 border border-sole-border hover:border-sole-red transition-colors"
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3 py-1 border border-sole-border font-mono">{item.quantity}</span>
                    <button
                      className="p-2 border border-sole-border hover:border-sole-red transition-colors"
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      className="p-2 text-sole-grey hover:text-sole-red transition-colors ml-4"
                      onClick={() => removeFromCart(item.id, item.size)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-sole-surface border border-sole-border p-6 space-y-4">
              <h3 className="font-display font-black text-lg uppercase tracking-tighter">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="border-t border-sole-border pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
              <button className="btn-primary w-full py-4 mt-6">
                <Link href="/payment" className="block w-full h-full flex items-center justify-center">
                  Proceed to Payment
                </Link>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}