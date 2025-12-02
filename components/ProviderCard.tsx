import React, { useState } from 'react';
import { Provider } from '../types';
import { MapPin, Star, Phone, Plus, Mail, X, Send, Check, Loader2, Trash2, Share2, Copy, Heart } from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
  onAddToBudget: (provider: Provider) => void;
  onDelete?: (id: string) => void;
  isAdded?: boolean;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider, onAddToBudget, onDelete, isAdded = false }) => {
  const [showContact, setShowContact] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  // Favorite State
  const [isFavorite, setIsFavorite] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('favoriteProviders');
        const favorites = stored ? JSON.parse(stored) : [];
        return favorites.includes(provider.id);
      } catch (e) {
        return false;
      }
    }
    return false;
  });

  // Rating State
  const [rating, setRating] = useState(provider.rating);
  const [userRating, setUserRating] = useState(() => {
     if (typeof window !== 'undefined') {
         const saved = localStorage.getItem(`rating_${provider.id}`);
         return saved ? parseInt(saved) : 0;
     }
     return 0;
  });
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    try {
      const stored = localStorage.getItem('favoriteProviders');
      let favorites: string[] = stored ? JSON.parse(stored) : [];

      if (isFavorite) {
        favorites = favorites.filter(id => id !== provider.id);
      } else {
        favorites.push(provider.id);
      }

      localStorage.setItem('favoriteProviders', JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const handleRate = (score: number) => {
    if (userRating > 0) return;
    
    // Update local state
    setUserRating(score);
    localStorage.setItem(`rating_${provider.id}`, score.toString());
    
    // Update average visual (mock calculation: (current * 20 + new) / 21)
    // We assume roughly 20 existing ratings to weight the new one realistically
    const newAvg = ((rating * 20) + score) / 21;
    setRating(Number(newAvg.toFixed(1)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setShowContact(false);
        setFormState({ name: '', email: '', message: '' });
      }, 2000);
    }, 1500);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Weet je zeker dat je deze dienst wilt verwijderen?')) {
        if (onDelete) onDelete(provider.id);
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}#/?id=${provider.id}`;
    const shareData = {
      title: `${provider.name} op MarokkaansFeest`,
      text: `Ik heb ${provider.name} gevonden op MarokkaansFeest! Bekijk het hier:`,
      url: url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
        setShowShareTooltip(true);
        setTimeout(() => setShowShareTooltip(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="relative bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full group/card">
      
      {/* Contact Form Overlay */}
      {showContact && (
        <div className="absolute inset-0 bg-white z-20 p-5 flex flex-col">
           {/* Header */}
           <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-2">
             <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
               <Mail size={18} className="text-emerald-600"/>
               Contact
             </h3>
             <button 
               onClick={() => setShowContact(false)} 
               className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-full transition-colors"
             >
               <X size={20} />
             </button>
           </div>
           
           {isSent ? (
             <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3">
               <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
                 <Check size={32} />
               </div>
               <h4 className="font-bold text-xl text-slate-800">Bericht verzonden!</h4>
               <p className="text-sm text-slate-500 max-w-[200px]">
                 Bedankt voor je interesse in {provider.name}. Ze nemen spoedig contact met je op.
               </p>
             </div>
           ) : (
             <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-3 overflow-y-auto">
               <div>
                 <label className="block text-xs font-medium text-slate-700 mb-1">Naam</label>
                 <input 
                   required
                   type="text" 
                   value={formState.name}
                   onChange={e => setFormState({...formState, name: e.target.value})}
                   className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm transition-all"
                   placeholder="Je volledige naam"
                 />
               </div>
               <div>
                 <label className="block text-xs font-medium text-slate-700 mb-1">Email</label>
                 <input 
                   required
                   type="email" 
                   value={formState.email}
                   onChange={e => setFormState({...formState, email: e.target.value})}
                   className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm transition-all"
                   placeholder="naam@email.nl"
                 />
               </div>
               <div className="flex-1 min-h-[100px]">
                 <label className="block text-xs font-medium text-slate-700 mb-1">Bericht</label>
                 <textarea 
                   required
                   value={formState.message}
                   onChange={e => setFormState({...formState, message: e.target.value})}
                   className="w-full h-full min-h-[80px] px-3 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm resize-none transition-all"
                   placeholder={`Beste ${provider.name.split(' ')[0]}, ik ben geïnteresseerd in...`}
                 />
               </div>
               <button 
                 type="submit"
                 disabled={isSubmitting}
                 className="w-full bg-slate-900 hover:bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
               >
                 {isSubmitting ? (
                   <>
                    <Loader2 size={16} className="animate-spin" />
                    Verzenden...
                   </>
                 ) : (
                   <>
                    <Send size={16} /> 
                    Verstuur Bericht
                   </>
                 )}
               </button>
             </form>
           )}
        </div>
      )}

      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img 
          src={provider.imageUrl} 
          alt={provider.name} 
          loading="lazy"
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        
        {/* Favorite Button */}
        <button 
          onClick={toggleFavorite}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white p-1.5 rounded-full shadow-sm text-slate-400 hover:text-red-500 transition-colors z-10"
          title={isFavorite ? "Verwijder uit favorieten" : "Opslaan als favoriet"}
        >
          <Heart size={18} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
        </button>

        {/* Rating Badge */}
        <div className="absolute top-3 right-14 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-slate-800 flex items-center gap-1 shadow-sm">
          <Star size={12} className="text-yellow-500 fill-yellow-500" />
          {rating}
        </div>
        
        {/* Delete Button - Only visible if owner */}
        {provider.isOwner && (
          <button
            type="button"
            onClick={handleDelete}
            className="absolute top-3 left-3 bg-red-500/90 hover:bg-red-600 text-white p-1.5 rounded-full shadow-sm backdrop-blur-sm transition-colors z-20"
            title="Verwijder mijn dienst"
          >
            <Trash2 size={16} />
          </button>
        )}

        <div className="absolute bottom-3 left-3 bg-emerald-600 px-3 py-1 rounded-full text-xs font-medium text-white shadow-sm">
          {provider.category}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-playfair text-xl font-bold text-slate-900 line-clamp-1" title={provider.name}>{provider.name}</h3>
          
          <div className="relative">
            <button 
              onClick={handleShare}
              className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all"
              title="Delen"
            >
              <Share2 size={18} />
            </button>
            {showShareTooltip && (
              <div className="absolute right-0 bottom-full mb-2 bg-slate-800 text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-bottom-1">
                Link gekopieerd!
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center text-slate-500 text-sm mb-1">
          <MapPin size={14} className="mr-1" />
          {provider.location}
        </div>

        {/* Interactive Rating Section */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex" onMouseLeave={() => setHoveredStar(null)}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRate(star)}
                onMouseEnter={() => !userRating && setHoveredStar(star)}
                disabled={userRating > 0}
                className={`transition-all duration-200 ${userRating === 0 ? 'hover:scale-110 cursor-pointer' : 'cursor-default'}`}
              >
                <Star 
                  size={16} 
                  className={`${
                    (userRating === 0 && hoveredStar !== null 
                      ? star <= hoveredStar 
                      : star <= Math.round(rating)) 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "text-slate-300 fill-slate-100"
                  }`} 
                />
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-500 ml-2">
             {rating} <span className="text-slate-300 mx-1">•</span> 
             {userRating > 0 ? (
                 <span className="text-emerald-600 font-medium">Bedankt!</span>
             ) : (
                 <span className="text-slate-400">Beoordeel</span>
             )}
          </span>
        </div>
        
        <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1">
          {provider.description}
        </p>
        
        <div className="pt-4 border-t border-slate-100 mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Vanaf prijs</p>
              <p className="font-bold text-lg text-emerald-700">€{provider.priceStart.toLocaleString('nl-NL')}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => setShowContact(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Mail size={16} />
              <span>Contact</span>
            </button>
            
            {isAdded ? (
              <button 
                disabled
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-2 rounded-lg text-sm font-medium cursor-default"
              >
                <Check size={16} />
                <span>Toegevoegd</span>
              </button>
            ) : (
              <button 
                onClick={() => onAddToBudget(provider)}
                className="flex-1 group flex items-center justify-center gap-2 bg-slate-900 hover:bg-emerald-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                <span>Budget</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;