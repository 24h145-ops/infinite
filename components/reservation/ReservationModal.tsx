'use client';

import { useState } from 'react';
import { X, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface ReservationModalProps {
  onClose: () => void;
  product: any;
  size: number;
}

export function ReservationModal({ onClose, product, size }: ReservationModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const holdAmount = product.price * 0.5;
  const refundAmount = holdAmount * 0.75;
  const deductionAmount = holdAmount * 0.25;

  const handleReserve = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // Redirect to login or show error
        window.location.href = '/login?message=Please sign in to reserve products';
        return;
      }

      // 1. Create Order via Next.js API Route for Razorpay
      const res = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: holdAmount,
          productId: product.id,
          size: size,
          type: 'reservation'
        })
      });

      if (!res.ok) throw new Error('Failed to initialize payment');
      
      const { orderId, amount } = await res.json();

      // 2. Open Razorpay Checkout (mocked flow if razorpay not fully configured)
      // @ts-ignore - Razorpay is loaded via script tag in layout
      if (typeof window !== 'undefined' && window.Razorpay) {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: amount,
          currency: "INR",
          name: "SOLE",
          description: `Reservation for ${product.name}`,
          order_id: orderId,
          handler: async function (response: any) {
            // Payment success - verify signature internally via edge function webhook
            alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}. Your item holds for 48H.`);
            onClose();
          },
          prefill: {
            name: session.user.user_metadata.full_name,
            email: session.user.email,
          },
          theme: {
            color: "#E8001C"
          },
          method: {
            upi: true,
            card: false,
            netbanking: false,
            wallet: false,
          }
        };

        // @ts-ignore
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response: any){
          setError(response.error.description);
        });
        rzp.open();
        setIsLoading(false);
      } else {
         // Mock fallback for immediate visual completion
         setTimeout(() => {
           alert("Razorpay SDK not found or mocked checkout completed successfully.");
           setIsLoading(false);
           onClose();
         }, 1500);
      }

    } catch (err: any) {
      setError(err.message || "Failed to process reservation");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-sole-black/95 backdrop-blur-md flex items-end sm:items-center justify-center sm:p-4">
      <div className="w-full max-w-lg bg-sole-surface border border-sole-border flex flex-col relative animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-auto sm:fade-in duration-300 transform">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-sole-border">
          <h2 className="font-display font-black text-2xl uppercase tracking-tighter text-sole-white flex items-center gap-2">
            <Clock size={24} className="text-sole-red" /> Secure Reservation
          </h2>
          <button onClick={onClose} className="text-sole-grey hover:text-sole-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Product Summary */}
        <div className="p-6 border-b border-sole-border flex gap-4 bg-sole-black">
          <div className="w-20 h-20 bg-sole-surface border border-sole-border relative overflow-hidden flex-shrink-0">
             <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full mix-blend-luminosity" />
          </div>
          <div className="flex-1 min-w-0">
             <div className="flex justify-between items-start">
                <h3 className="font-bold text-sole-white truncate">{product.name}</h3>
                <span className="font-mono text-sole-white font-bold ml-2">₹{product.price}</span>
             </div>
             <p className="text-sole-grey text-xs uppercase font-mono tracking-widest mt-1">Size {size} UK</p>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="p-6 space-y-4">
           <div className="flex justify-between items-center text-sm font-light text-sole-grey">
             <span>Product Price</span>
             <span className="font-mono text-sole-white">₹{product.price}</span>
           </div>
           <div className="flex justify-between items-center text-sm font-light text-sole-grey">
             <span>Reservation Hold (50%)</span>
             <span className="font-mono text-sole-white">₹{holdAmount}</span>
           </div>

           <div className="my-4 h-px bg-sole-border w-full" />

           <div className="bg-sole-black border border-sole-border p-4 text-sm font-light text-sole-grey space-y-2">
             <p className="font-mono text-[10px] text-sole-white tracking-widest uppercase mb-3">Terms of 48H Hold</p>
             <div className="flex items-start gap-2">
               <ChevronRight size={16} className="text-sole-red shrink-0 mt-0.5" />
               <p>Item is removed from stock and held exclusively for you.</p>
             </div>
             <div className="flex items-start gap-2">
               <ChevronRight size={16} className="text-sole-red shrink-0 mt-0.5" />
               <p>Pay the remaining 50% (₹{product.price - holdAmount}) within 48 hours to complete purchase.</p>
             </div>
             <div className="flex items-start gap-2">
               <ChevronRight size={16} className="text-sole-red shrink-0 mt-0.5" />
               <p>If not purchased, 25% holding fee (₹{deductionAmount}) is deducted and ₹{refundAmount} will be refunded.</p>
             </div>
           </div>

           {error && (
             <p className="text-sole-red bg-sole-red/10 border border-sole-red/20 p-4 text-sm mt-4">
               {error}
             </p>
           )}
        </div>

        {/* Actions */}
        <div className="p-6 pt-0 border-none flex flex-col gap-3">
           <button 
             className="btn-primary w-full py-4 text-sm flex items-center justify-center gap-2 relative"
             onClick={handleReserve}
             disabled={isLoading}
           >
             {isLoading ? (
               <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-sole-white border-t-transparent rounded-full animate-spin" /> Processing...</span>
             ) : (
               <>Pay ₹{holdAmount} via UPI</>
             )}
           </button>
           <button 
             className="btn-ghost"
             onClick={onClose}
             disabled={isLoading}
           >
             Cancel
           </button>
           <div className="flex items-center justify-center gap-2 mt-4 text-sole-grey font-mono text-[10px] uppercase tracking-widest">
             <ShieldCheck size={14} /> 100% Secure via Razorpay
           </div>
        </div>
      </div>
    </div>
  );
}
