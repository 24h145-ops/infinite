'use client';

import { useState, useEffect } from 'react';
import { Search, Mic, Camera, Upload, X, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useDebounce } from '@/lib/hooks/use-debounce';
import Image from 'next/image';
import Link from 'next/link';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Modals state
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const debouncedQuery = useDebounce(query, 300);
  const supabase = createClient();

  // Text Search Effect
  useEffect(() => {
    async function searchProducts() {
      if (!debouncedQuery.trim()) {
        setResults([]);
        setShowDropdown(false);
        return;
      }

      setIsSearching(true);
      setShowDropdown(true);

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .textSearch('fts', debouncedQuery, { type: 'websearch', config: 'english' })
        .limit(6);

      if (!error && data) {
        setResults(data);
      }
      setIsSearching(false);
    }

    searchProducts();
  }, [debouncedQuery]);

  // Voice Search (Web Speech API)
  const startVoiceSearch = () => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto z-50">
      <div className="flex items-center w-full bg-sole-surface border border-sole-border focus-within:border-sole-red transition-colors relative">
        <div className="pl-4 pr-2 text-sole-grey">
          <Search size={18} />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search men's, women's, sports..."
          className="flex-1 bg-transparent py-3 text-sm text-sole-white placeholder-sole-grey outline-none font-light"
          onFocus={() => query && setShowDropdown(true)}
        />
        
        {query && (
          <button 
            onClick={() => { setQuery(''); setResults([]); setShowDropdown(false); }}
            className="p-2 text-sole-grey hover:text-sole-white"
          >
            <X size={16} />
          </button>
        )}

        <div className="flex items-center border-l border-sole-border pl-2 pr-2 gap-1">
          <button 
            onClick={startVoiceSearch}
            className={`p-2 transition-colors ${isListening ? 'text-sole-red animate-pulse' : 'text-sole-grey hover:text-sole-white'}`}
            title="Voice Search"
          >
            <Mic size={18} />
          </button>
          <button 
            onClick={() => setShowCameraModal(true)}
            className="p-2 text-sole-grey hover:text-sole-white transition-colors"
            title="Camera Search"
          >
            <Camera size={18} />
          </button>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="p-2 text-sole-grey hover:text-sole-white transition-colors"
            title="Image Upload"
          >
            <Upload size={18} />
          </button>
        </div>
      </div>

      {/* Live Suggestions Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-sole-surface border border-sole-border shadow-2xl max-h-96 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 flex justify-center items-center text-sole-grey">
              <Loader2 className="animate-spin mr-2" size={18} />
              <span className="font-mono text-[11px] uppercase tracking-[2px]">Searching...</span>
            </div>
          ) : results.length > 0 ? (
            <div className="flex flex-col">
              {results.map((product) => (
                <Link 
                  href={`/product/${product.id}`} 
                  key={product.id}
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-4 p-3 hover:bg-[#1f1f1f] transition-colors border-b border-sole-border last:border-0"
                >
                  <div className="w-12 h-12 bg-sole-black flex-shrink-0 relative">
                    {/* Placeholder for real images */}
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full" />
                    ) : (
                      <div className="w-full h-full bg-sole-black" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sole-white font-bold truncate">{product.name}</p>
                    <p className="text-sole-grey text-xs uppercase font-mono tracking-widest">{product.brand} - {product.category}</p>
                  </div>
                  <div className="text-sole-white font-mono font-bold">
                    ₹{product.price}
                  </div>
                </Link>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="p-6 text-center text-sole-grey font-mono text-[11px] uppercase tracking-[2px]">
              No results found for "{query}"
            </div>
          ) : null}
        </div>
      )}

      {/* Modals placeholders */}
      {showCameraModal && (
        <div className="fixed inset-0 z-[100] bg-sole-black/95 backdrop-blur-sm flex items-center justify-center p-4">
           {/* Mockup for Camera Search */}
           <div className="w-full max-w-md bg-sole-surface border border-sole-border p-6 relative">
             <button onClick={() => setShowCameraModal(false)} className="absolute top-4 right-4 text-sole-white"><X size={24} /></button>
             <h3 className="font-display text-2xl uppercase font-black text-sole-white text-center mb-6 tracking-tighter">Camera Search</h3>
             <div className="w-full aspect-[3/4] bg-sole-black border border-sole-border flex flex-col items-center justify-center text-sole-grey gap-4 relative overflow-hidden">
                <Camera size={48} className="opacity-50" />
                <p className="font-mono text-[11px] uppercase tracking-[2px]">Camera Preview</p>
                <div className="absolute inset-0 border-2 border-sole-red rounded-xl opacity-50 scale-90" />
             </div>
             <button onClick={() => { alert('Mock API Call to Nana Banana Vision API...'); setShowCameraModal(false); }} className="w-full btn-primary mt-6">Capture & Search</button>
           </div>
        </div>
      )}

      {showUploadModal && (
        <div className="fixed inset-0 z-[100] bg-sole-black/95 backdrop-blur-sm flex items-center justify-center p-4">
           {/* Mockup for Image Upload Search */}
           <div className="w-full max-w-md bg-sole-surface border border-sole-border p-6 relative">
             <button onClick={() => setShowUploadModal(false)} className="absolute top-4 right-4 text-sole-white"><X size={24} /></button>
             <h3 className="font-display text-2xl uppercase font-black text-sole-white text-center mb-6 tracking-tighter">Visual Search</h3>
             <div className="w-full aspect-square bg-sole-black/50 border-2 border-dashed border-sole-border flex flex-col items-center justify-center text-sole-grey gap-4 hover:border-sole-red hover:text-sole-white transition-colors cursor-pointer">
                <Upload size={48} />
                <p className="font-mono text-[11px] uppercase tracking-[2px]">Drag or tap to upload</p>
             </div>
             <p className="text-center text-sole-grey text-xs mt-4">JPG, PNG, WebP (Max 5MB)</p>
           </div>
        </div>
      )}
    </div>
  );
}
