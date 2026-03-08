'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Smartphone, Building2, CheckCircle, AlertCircle } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet';

export default function PaymentPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 5000 ? 0 : 299;
  const total = subtotal + shipping;

  const paymentMethods = [
    {
      id: 'card' as PaymentMethod,
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, RuPay'
    },
    {
      id: 'upi' as PaymentMethod,
      name: 'UPI',
      icon: Smartphone,
      description: 'Google Pay, PhonePe, Paytm'
    },
    {
      id: 'netbanking' as PaymentMethod,
      name: 'Net Banking',
      icon: Building2,
      description: 'All major banks'
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock payment success
      setPaymentSuccess(true);
      clearCart();

      // Redirect to success page after 3 seconds
      setTimeout(() => {
        window.location.href = '/order-success';
      }, 3000);

    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-sole-black pt-16 flex items-center justify-center">
        <div className="max-w-md mx-auto p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle size={64} className="text-green-500" />
          </div>
          <h1 className="font-display font-black text-3xl uppercase tracking-tighter text-sole-white mb-4">
            Payment Successful!
          </h1>
          <p className="text-sole-grey mb-6">
            Your order has been placed successfully. You will receive a confirmation email shortly.
          </p>
          <div className="bg-sole-surface border border-sole-border p-4 rounded mb-6">
            <p className="text-sole-white font-bold">Order Total: ₹{total}</p>
            <p className="text-sole-grey text-sm">Payment Method: {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}</p>
          </div>
          <Link href="/" className="btn-primary px-8 py-3">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-sole-black pt-16 flex items-center justify-center">
        <div className="max-w-md mx-auto p-8 text-center">
          <h1 className="font-display font-black text-2xl uppercase tracking-tighter text-sole-white mb-4">
            No Items to Checkout
          </h1>
          <p className="text-sole-grey mb-6">Your cart is empty. Add some items before proceeding to payment.</p>
          <Link href="/" className="btn-primary px-8 py-3">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sole-black pt-16">
      <header className="fixed top-0 left-0 right-0 z-50 bg-sole-black/95 backdrop-blur-md border-b border-sole-border h-16 flex items-center px-4">
        <div className="flex items-center gap-4 max-w-7xl mx-auto w-full">
          <Link href="/cart" className="text-sole-grey hover:text-sole-white transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="font-display font-black text-xl tracking-tighter uppercase flex-1">
            Payment
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 pt-8 pb-24">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-sole-surface border border-sole-border p-6">
              <h2 className="font-display font-black text-xl uppercase tracking-tighter text-sole-white mb-4">
                Order Summary
              </h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover bg-sole-black" />
                    <div className="flex-1">
                      <h3 className="font-bold text-sole-white text-sm">{item.name}</h3>
                      <p className="text-sole-grey text-xs">Size: {item.size} | Qty: {item.quantity}</p>
                      <p className="font-mono text-sole-red font-bold text-sm">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-sole-border mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-sole-grey">Subtotal</span>
                  <span className="text-sole-white font-mono">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-sole-grey">Shipping</span>
                  <span className="text-sole-white font-mono">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between font-bold border-t border-sole-border pt-2">
                  <span className="text-sole-white">Total</span>
                  <span className="text-sole-red font-mono">₹{total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-6">
            <div className="bg-sole-surface border border-sole-border p-6">
              <h2 className="font-display font-black text-xl uppercase tracking-tighter text-sole-white mb-4">
                Payment Method
              </h2>

              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`w-full p-4 border transition-colors flex items-center gap-4 ${
                        selectedPaymentMethod === method.id
                          ? 'border-sole-red bg-sole-red/10'
                          : 'border-sole-border hover:border-sole-light-grey'
                      }`}
                    >
                      <Icon size={24} className="text-sole-grey" />
                      <div className="text-left">
                        <p className="font-bold text-sole-white">{method.name}</p>
                        <p className="text-sole-grey text-sm">{method.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {error && (
                <div className="mt-4 p-4 bg-sole-red/10 border border-sole-red rounded flex items-center gap-3">
                  <AlertCircle size={20} className="text-sole-red" />
                  <p className="text-sole-red text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full btn-primary py-4 mt-6 text-lg"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-sole-white border-t-transparent rounded-full animate-spin" />
                    Processing Payment...
                  </span>
                ) : (
                  <>Pay ₹{total}</>
                )}
              </button>
            </div>

            <div className="bg-sole-surface border border-sole-border p-4">
              <div className="flex items-center gap-3 text-sole-grey text-sm">
                <CheckCircle size={16} className="text-green-500" />
                <span>100% Secure Payment</span>
              </div>
              <p className="text-sole-grey text-xs mt-2">
                Your payment information is encrypted and secure. We accept all major payment methods.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}