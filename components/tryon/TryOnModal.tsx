'use client';

import { useState, useRef } from "react";
import { X, Upload, Camera, Loader2, Download, ShoppingBag, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface TryOnModalProps {
  onClose: () => void;
  productImage: string;
}

export function TryOnModal({ onClose, productImage }: TryOnModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Image must be less than 10MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!selectedImage) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      // Ensure API route proxy call
      const res = await fetch('/api/tryon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.access_token && { Authorization: `Bearer ${session.access_token}` }),
        },
        body: JSON.stringify({
          user_image: selectedImage,
          garment_image: productImage,
          garment_type: 'footwear'
        })
      });

      if (!res.ok) throw new Error('Failed to process image');

      const data = await res.json();
      
      // Artificial delay for UI polish
      setTimeout(() => {
         setResultImage(data.output_image || 'https://images.unsplash.com/photo-1620023671759-4592ce2b5167?q=80&w=800&auto=format&fit=crop'); // Using a dummy image if mock returns string
         setIsLoading(false);
      }, 3000);

    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-sole-black/95 backdrop-blur-md flex items-center justify-center p-4 lg:p-12 animate-in fade-in zoom-in-95 duration-300">
      <div className="w-full max-w-4xl bg-sole-surface border border-sole-border h-full max-h-[90vh] flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-sole-border">
          <h2 className="font-display font-black text-2xl uppercase tracking-tighter text-sole-white">
            Virtual Try-On
          </h2>
          <button onClick={onClose} className="text-sole-grey hover:text-sole-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row">
          {/* Main View Area */}
          <div className="flex-1 bg-sole-black border-b lg:border-b-0 lg:border-r border-sole-border p-8 flex items-center justify-center relative min-h-[400px]">
            {isLoading ? (
              <div className="w-full h-full absolute inset-0 bg-sole-surface animate-shimmer flex flex-col items-center justify-center p-8 text-center border-2 border-sole-border border-dashed">
                 <Loader2 size={48} className="text-sole-grey animate-spin mb-4" />
                 <p className="font-mono text-sole-white text-xs uppercase tracking-widest">Applying Nana Banana AI</p>
                 <p className="font-light text-sole-grey text-sm mt-2">This usually takes 3-8 seconds...</p>
              </div>
            ) : resultImage ? (
              <div className="w-full h-full relative group">
                <img src={resultImage} alt="Try On Result" className="w-full h-full object-contain" />
              </div>
            ) : selectedImage ? (
              <div className="w-full h-full border-2 border-dashed border-sole-border p-4 relative group">
                 <img src={selectedImage} alt="Selected" className="w-full h-full object-contain opacity-50" />
                 <div className="absolute inset-0 flex items-center justify-center gap-4">
                    <button onClick={handleTryOn} className="btn-primary shadow-2xl">Start Try-On Magic</button>
                 </div>
              </div>
            ) : (
              <div 
                className="w-full max-w-sm aspect-square border-2 border-dashed border-sole-border flex flex-col items-center justify-center gap-4 hover:border-sole-red hover:text-sole-red transition-colors cursor-pointer text-sole-grey"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={48} />
                <p className="font-mono text-xs uppercase tracking-widest text-center px-4">
                  Tap to upload a photo of your feet
                </p>
                <input 
                  type="file" 
                  accept="image/jpeg, image/png, image/heic"
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>

          {/* Side Panel Area */}
          <div className="w-full lg:w-80 bg-sole-surface flex flex-col">
            <div className="p-6 border-b border-sole-border flex items-center gap-4">
               <img src={productImage} className="w-16 h-16 object-cover bg-sole-black border border-sole-border" />
               <div>
                 <p className="font-mono text-[10px] text-sole-red uppercase tracking-widest mb-1">Applying</p>
                 <p className="font-bold text-sole-white text-sm">Selected Shoe</p>
               </div>
            </div>

            <div className="p-6 flex-1 text-sm text-sole-grey font-light space-y-4">
              <p>For best results, photograph both feet on a flat surface with good lighting.</p>
              <div className="p-4 bg-sole-black border border-sole-border">
                <p className="font-mono text-[10px] uppercase tracking-widest text-sole-white mb-2">Privacy Note</p>
                <p className="text-xs">Your photo is processed in real-time and not stored on our servers. Processing powered by Nana Banana API.</p>
              </div>
              {error && (
                <p className="text-sole-red bg-sole-red/10 p-4 border border-sole-red/20">{error}</p>
              )}
            </div>

            {resultImage && !isLoading && (
              <div className="p-6 border-t border-sole-border flex flex-col gap-3">
                 <button className="btn-primary w-full flex items-center justify-center gap-2">
                   <ShoppingBag size={16} /> Buy Now
                 </button>
                 <button className="btn-secondary w-full flex items-center justify-center gap-2">
                   <Clock size={16} /> Reserve (48H)
                 </button>
                 <button 
                  onClick={() => { setSelectedImage(null); setResultImage(null); }}
                  className="btn-ghost w-full mt-4"
                 >
                   Try Another Photo
                 </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
