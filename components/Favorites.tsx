import React, { useState, useEffect } from 'react';
import { Provider } from '../types';
import ProviderCard from './ProviderCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FavoritesProps {
  providers: Provider[];
  onAddToBudget: (provider: Provider) => void;
  onRemoveProvider: (id: string) => void;
  budgetItems: any[];
}

const Favorites: React.FC<FavoritesProps> = ({ providers, onAddToBudget, onRemoveProvider, budgetItems }) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const loadFavorites = () => {
        try {
            const stored = localStorage.getItem('favoriteProviders');
            if (stored) {
                setFavoriteIds(JSON.parse(stored));
            }
        } catch (e) {
            console.error("Failed to load favorites", e);
        }
    };
    loadFavorites();
  }, []);

  const handleToggle = (id: string, isFav: boolean) => {
      if (!isFav) {
          setFavoriteIds(prev => prev.filter(favId => favId !== id));
      } else {
          setFavoriteIds(prev => [...prev, id]);
      }
  };

  const favoriteProviders = providers.filter(p => favoriteIds.includes(p.id));

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
          <div className="flex items-center gap-3 mb-8 animate-in slide-in-from-bottom-2 duration-500">
              <div className="bg-red-100 p-3 rounded-full">
                  <Heart className="text-red-500 fill-red-500" size={24} />
              </div>
              <h1 className="text-3xl font-playfair font-bold text-slate-900">Mijn Favorieten</h1>
          </div>

          {favoriteProviders.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProviders.map(provider => {
                    const isAdded = budgetItems.some(item => item.providerId === provider.id);
                    return (
                        <ProviderCard 
                            key={provider.id} 
                            provider={provider} 
                            onAddToBudget={onAddToBudget}
                            onDelete={onRemoveProvider}
                            isAdded={isAdded}
                            onToggleFavorite={handleToggle}
                        />
                    );
                })}
              </div>
          ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200 animate-in fade-in duration-700">
                  <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart size={32} className="text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Nog geen favorieten</h3>
                  <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    Bewaar diensten die je leuk vindt door op het hartje te klikken. Ze verschijnen dan direct in dit overzicht.
                  </p>
                  <Link to="/" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-medium transition-colors">
                      Bekijk diensten &rarr;
                  </Link>
              </div>
          )}
      </div>
  );
};

export default Favorites;