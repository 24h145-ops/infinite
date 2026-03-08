'use client';

import Link from 'next/link';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-sole-black pt-16 flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle size={80} className="text-green-500" />
        </div>

        <h1 className="font-display font-black text-4xl uppercase tracking-tighter text-sole-white mb-4">
          Order Confirmed!
        </h1>

        <p className="text-sole-grey text-lg mb-8">
          Thank you for your purchase. Your order has been successfully placed and is being processed.
        </p>

        <div className="bg-sole-surface border border-sole-border p-6 rounded mb-8">
          <h2 className="font-display font-black text-xl uppercase tracking-tighter text-sole-white mb-4">
            What's Next?
          </h2>

          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <Package size={24} className="text-sole-red mt-1" />
              <div>
                <h3 className="font-bold text-sole-white">Order Processing</h3>
                <p className="text-sole-grey text-sm">We're preparing your shoes with care</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Truck size={24} className="text-sole-red mt-1" />
              <div>
                <h3 className="font-bold text-sole-white">Shipping</h3>
                <p className="text-sole-grey text-sm">Expected delivery within 3-5 business days</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Home size={24} className="text-sole-red mt-1" />
              <div>
                <h3 className="font-bold text-sole-white">Delivery</h3>
                <p className="text-sole-grey text-sm">Track your order in your account dashboard</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary px-8 py-3">
            Continue Shopping
          </Link>
          <Link href="/profile" className="btn-secondary px-8 py-3">
            View Orders
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sole-grey text-sm">
            Order confirmation has been sent to your email address.
          </p>
          <p className="text-sole-grey text-sm mt-2">
            Need help? Contact our support team at support@sole.com
          </p>
        </div>
      </div>
    </div>
  );
}