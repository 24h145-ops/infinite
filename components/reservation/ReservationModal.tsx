'use client';

import { useState } from 'react';
import { X, Clock, ShieldCheck, ChevronRight, Copy, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface ReservationModalProps {
  onClose: () => void;
  product: any;
  size: number;
}

export function ReservationModal({ onClose, product, size }: ReservationModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [copiedUPI, setCopiedUPI] = useState(false);

  const holdAmount = product.price * 0.5;
  const refundAmount = holdAmount * 0.75;
  const deductionAmount = holdAmount * 0.25;
  const upiId = 'sole.shop@upi';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUPI(true);
    setTimeout(() => setCopiedUPI(false), 2000);
  };

  const handleReserve = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        window.location.href = '/login?message=Please sign in to reserve products';
        return;
      }

      // Create Order via Next.js API Route
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
      
      setShowPaymentMethod(true);
      setIsLoading(false);

    } catch (err: any) {
      setError(err.message || "Failed to process reservation");
      setIsLoading(false);
    }
  };

  const handlePaymentComplete = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="fixed inset-0 z-[100] bg-sole-black/95 backdrop-blur-md flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-sole-surface border border-sole-border p-8 text-center animate-in fade-in duration-300">
          <div className="flex justify-center mb-4">
            <CheckCircle size={56} className="text-sole-red animate-pulse" />
          </div>
          <h2 className="font-display font-black text-2xl uppercase tracking-tighter text-sole-white mb-2">Payment Successful!</h2>
          <p className="text-sole-grey text-sm mb-4">Your item is now reserved for 48 hours</p>
          <div className="bg-sole-black border border-sole-border p-4 rounded text-left text-sm">
            <p className="text-sole-grey mb-2"><span className="text-sole-white">Product:</span> {product.name}</p>
            <p className="text-sole-grey mb-2"><span className="text-sole-white">Hold Amount:</span> ₹{holdAmount}</p>
            <p className="text-sole-grey"><span className="text-sole-white">Valid Until:</span> 48 Hours</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-sole-black/95 backdrop-blur-md flex items-end sm:items-center justify-center sm:p-4">
      <div className="w-full max-w-lg bg-sole-surface border border-sole-border flex flex-col relative animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-auto sm:fade-in duration-300 transform">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-sole-border">
          <h2 className="font-display font-black text-2xl uppercase tracking-tighter text-sole-white flex items-center gap-2">
            <Clock size={24} className="text-sole-red" /> {showPaymentMethod ? 'Pay Now' : 'Secure Reservation'}
          </h2>
          <button onClick={onClose} className="text-sole-grey hover:text-sole-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {!showPaymentMethod ? (
          <>
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
                 <span className="font-mono text-sole-red font-bold">₹{holdAmount.toFixed(0)}</span>
               </div>

               <div className="my-4 h-px bg-sole-border w-full" />

               <div className="bg-sole-black border border-sole-border p-4 text-sm font-light text-sole-grey space-y-2">
                 <p className="font-mono text-[10px] text-sole-white tracking-widest uppercase mb-3">Valid for 48 Hours</p>
                 <div className="flex items-start gap-2">
                   <ChevronRight size={16} className="text-sole-red shrink-0 mt-0.5" />
                   <p>Item is removed from stock and held exclusively for you.</p>
                 </div>
                 <div className="flex items-start gap-2">
                   <ChevronRight size={16} className="text-sole-red shrink-0 mt-0.5" />
                   <p>Pay remaining 50% (₹{(product.price - holdAmount).toFixed(0)}) within 48 hours to complete purchase.</p>
                 </div>
                 <div className="flex items-start gap-2">
                   <ChevronRight size={16} className="text-sole-red shrink-0 mt-0.5" />
                   <p>If not purchased: 25% fee (₹{deductionAmount.toFixed(0)}) deducted, ₹{refundAmount.toFixed(0)} refunded.</p>
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
                 className="btn-primary w-full py-4 text-sm"
                 onClick={handleReserve}
                 disabled={isLoading}
               >
                 {isLoading ? (
                   <span className="flex items-center justify-center gap-2"><div className="w-4 h-4 border-2 border-sole-white border-t-transparent rounded-full animate-spin" /> Processing...</span>
                 ) : (
                   <>Proceed to Payment</>
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
                 <ShieldCheck size={14} /> Secure Payment
               </div>
            </div>
          </>
        ) : (
          <>
            {/* Payment Methods */}
            <div className="p-6 space-y-4">
              <div className="bg-sole-black border border-sole-border p-6">
                <p className="text-sole-white font-bold text-lg mb-4">Pay ₹{holdAmount.toFixed(0)} via UPI</p>
                <div className="space-y-4">
                  <div className="bg-sole-surface border border-sole-border rounded p-4 text-center">
                    {/* Simple UPI QR Code Placeholder */}
                    <div className="w-40 h-40 bg-sole-white mx-auto mb-4 flex items-center justify-center rounded">
                      <div className="text-sole-black text-center">
                        <p className="text-xs font-bold mb-2">Scan with UPI App</p>
                        <svg width="80" height="80" viewBox="0 0 80 80" className="mx-auto">
                          <rect width="80" height="80" fill="white" />
                          <rect x="10" y="10" width="10" height="10" fill="black" />
                          <rect x="20" y="10" width="10" height="10" fill="black" />
                          <rect x="30" y="10" width="10" height="10" fill="black" />
                          <rect x="10" y="20" width="10" height="10" fill="black" />
                          <rect x="30" y="20" width="10" height="10" fill="black" />
                          <rect x="10" y="30" width="10" height="10" fill="black" />
                          <rect x="60" y="10" width="10" height="10" fill="black" />
                          <rect x="60" y="20" width="10" height="10" fill="black" />
                          <rect x="60" y="30" width="10" height="10" fill="black" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sole-grey text-xs mt-4">Or enter UPI ID below</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sole-white text-sm font-mono">UPI ID / Mobile Number</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={upiId}
                        readOnly
                        className="flex-1 bg-sole-surface border border-sole-border text-sole-white px-4 py-3 text-sm font-mono rounded"
                      />
                      <button 
                        onClick={() => copyToClipboard(upiId)}
                        className="bg-sole-red text-sole-white px-4 py-3 hover:bg-sole-dark-red transition-colors rounded flex items-center gap-2"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                    {copiedUPI && <p className="text-sole-red text-xs">Copied!</p>}
                  </div>

                  <div className="bg-sole-red/10 border border-sole-red/30 p-4 text-sole-red text-xs rounded">
                    <p>✓ Use any UPI app (Google Pay, PhonePe, Paytm, WhatsApp Pay)</p>
                    <p className="mt-2">✓ Send ₹{holdAmount.toFixed(0)} to {upiId}</p>
                    <p className="mt-2">✓ Confirmation received instantly</p>
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-sole-red bg-sole-red/10 border border-sole-red/20 p-4 text-sm">
                  {error}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 flex flex-col gap-3">
               <button 
                 className="btn-primary w-full py-4 text-sm"
                 onClick={handlePaymentComplete}
               >
                 ✓ Payment Completed
               </button>
               <button 
                 className="btn-ghost"
                 onClick={() => setShowPaymentMethod(false)}
               >
                 Back
               </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
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
