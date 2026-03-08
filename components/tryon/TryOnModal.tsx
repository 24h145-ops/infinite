'use client';

import { useState, useRef } from "react";
import { X, Upload, Camera, Loader2, Download, ShoppingBag, Clock, AlertCircle, CheckCircle2, ZoomIn, Info } from "lucide-react";
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
  const [zoomMode, setZoomMode] = useState(false);
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
      
      // Simulate AI processing time (3-5 seconds)
      // In production, this would be the actual API processing time
      const processingDelay = 3000 + Math.random() * 2000;
      setTimeout(() => {
         setResultImage(data.output_image || selectedImage);
         setIsLoading(false);
      }, processingDelay);

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
              <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-sole-surface to-sole-black animate-shimmer flex flex-col items-center justify-center p-8 text-center">
                 <div className="relative w-16 h-16 mb-6">
                   <Loader2 size={64} className="text-sole-red animate-spin" />
                   <div className="absolute inset-0 border-2 border-transparent border-t-sole-red rounded-full animate-pulse" />
                 </div>
                 <p className="font-display font-black text-sole-white text-xl uppercase tracking-tighter mb-2">AI Processing</p>
                 <p className="font-mono text-sole-grey text-[11px] uppercase tracking-widest">Analyzing your foot & applying shoe...</p>
                 <div className="mt-4 w-full max-w-xs bg-sole-surface border border-sole-border rounded overflow-hidden h-1">
                   <div className="h-full bg-gradient-to-r from-sole-red to-transparent animate-pulse" style={{width: '60%'}}></div>
                 </div>
              </div>
            ) : resultImage ? (
              <div className="w-full h-full relative group">
                <img src={resultImage} alt="Try On Result" className={`w-full h-full object-cover transition-transform ${zoomMode ? 'scale-150' : 'scale-100'}`} />
                {!zoomMode && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-sole-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <button 
                      onClick={() => setZoomMode(!zoomMode)}
                      className="absolute top-4 right-4 bg-sole-black/80 backdrop-blur border border-sole-border text-sole-white p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:border-sole-red hover:text-sole-red"
                    >
                      <ZoomIn size={20} />
                    </button>
                  </>
                )}
                {zoomMode && (
                  <button 
                    onClick={() => setZoomMode(false)}
                    className="absolute inset-0 flex items-center justify-center bg-sole-black/40 hover:bg-sole-black/50 transition-colors"
                  >
                    <span className="bg-sole-red text-sole-black px-4 py-2 rounded font-bold">Click to Zoom Out</span>
                  </button>
                )}
              </div>
            ) : selectedImage ? (
              <div className="w-full h-full border-2 border-dashed border-sole-border p-4 relative group bg-gradient-to-br from-sole-surface/20 to-sole-black/20">
                 <img src={selectedImage} alt="Selected" className="w-full h-full object-contain opacity-40" />
                 <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="text-center space-y-2 mb-4">
                      <CheckCircle2 size={48} className="text-sole-red mx-auto" />
                      <p className="font-display font-black text-sole-white text-xl uppercase tracking-tighter">Image Ready</p>
                      <p className="text-sole-grey text-sm">Let our AI apply the shoe to your feet</p>
                    </div>
                    <button onClick={handleTryOn} className="btn-primary text-base px-8 py-4 shadow-2xl hover:shadow-2xl">
                      ✨ Start Try-On Magic
                    </button>
                 </div>
              </div>
            ) : (
              <div 
                className="w-full max-w-sm aspect-square border-4 border-dashed border-sole-red/30 hover:border-sole-red flex flex-col items-center justify-center gap-6 hover:bg-sole-black/30 hover:text-sole-red transition-all cursor-pointer text-sole-grey p-8"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="relative">
                  <Upload size={64} className="animate-bounce" />
                  <Camera size={32} className="absolute -bottom-2 -right-2 bg-sole-black border border-sole-red p-1 rounded-full" />
                </div>
                <div className="text-center">
                  <p className="font-display font-black text-sole-white text-lg uppercase tracking-tighter mb-2">Upload Your Feet</p>
                  <p className="font-mono text-xs uppercase tracking-widest text-sole-grey">
                    JPEG, PNG, or HEIC (Max 10MB)
                  </p>
                </div>
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
          <div className="w-full lg:w-96 bg-sole-surface flex flex-col">
            {/* Product Info */}
            <div className="p-6 border-b border-sole-border flex items-center gap-4 bg-sole-black">
               <img src={productImage} className="w-20 h-20 object-cover bg-sole-surface border-2 border-sole-red rounded" />
               <div>
                 <p className="font-mono text-[10px] text-sole-red uppercase tracking-widest mb-1">Now Trying</p>
                 <p className="font-display font-black text-sole-white text-lg uppercase tracking-tighter">Selected Shoe</p>
               </div>
            </div>

            {/* Instructions & Tips */}
            <div className="p-6 flex-1 text-sm text-sole-grey font-light space-y-6 overflow-y-auto">
              
              <div className="space-y-3">
                <h3 className="font-display font-black text-sole-white uppercase text-sm tracking-tighter flex items-center gap-2">
                  <Info size={16} className="text-sole-red" /> Tips for Best Results
                </h3>
                <ul className="space-y-2 text-xs">
                  <li className="flex gap-2">
                    <span className="text-sole-red font-bold">✓</span>
                    <span>Show both feet clearly on a flat surface</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-sole-red font-bold">✓</span>
                    <span>Use good lighting, avoid shadows on feet</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-sole-red font-bold">✓</span>
                    <span>Bare feet or light socks work best</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-sole-red font-bold">✓</span>
                    <span>Neutral background helps accuracy</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-sole-red/10 border border-sole-red/30 rounded space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-widest text-sole-red font-bold mb-2">🔒 Privacy & Security</p>
                <p className="text-xs text-sole-grey leading-relaxed">
                  Your photos are processed instantly and never stored. We don't keep records of your images or personal data.
                </p>
              </div>

              {error && (
                <div className="p-4 bg-sole-red/20 border border-sole-red rounded space-y-2 flex gap-3">
                  <AlertCircle size={16} className="text-sole-red shrink-0 mt-0.5" />
                  <p className="text-sm text-sole-red">{error}</p>
                </div>
              )}
            </div>

            {resultImage && !isLoading && (
              <div className="p-6 border-t border-sole-border flex flex-col gap-3 bg-sole-black">
                 <p className="text-sole-white font-display font-black text-sm uppercase tracking-tighter mb-2">Ready to Buy?</p>
                 <button className="btn-primary w-full flex items-center justify-center gap-2 py-4">
                   <ShoppingBag size={18} /> Buy Now
                 </button>
                 <button className="btn-secondary w-full flex items-center justify-center gap-2 py-4">
                   <Clock size={18} /> Hold (48H)
                 </button>
                 <button 
                  onClick={() => { 
                    const link = document.createElement('a');
                    link.href = resultImage;
                    link.download = `sole-tryon-${Date.now()}.png`;
                    link.click();
                  }}
                  className="btn-ghost w-full flex items-center justify-center gap-2 mt-2"
                 >
                   <Download size={16} /> Save Result
                 </button>
                 <button 
                  onClick={() => { setSelectedImage(null); setResultImage(null); setZoomMode(false); }}
                  className="btn-ghost w-full text-sole-grey hover:text-sole-white mt-2"
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
