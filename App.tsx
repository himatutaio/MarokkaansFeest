import React, { useState, useMemo, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useSearchParams } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal, LayoutGrid, Calculator, Heart, Menu, X, PlusCircle, Check, ArrowLeft } from 'lucide-react';
import ProviderCard from './components/ProviderCard';
import BudgetPlanner from './components/BudgetPlanner';
import Chatbot from './components/Chatbot';
import AddServiceForm from './components/AddServiceForm';
import Inspiration from './components/Inspiration';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import { MOCK_PROVIDERS, CATEGORIES } from './constants';
import { Provider, Category, BudgetItem } from './types';

// Toast Component
const Toast = ({ message, show, onClose }: { message: string, show: boolean, onClose: () => void }) => {
  return (
    <div className={`fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 transition-all duration-300 z-50 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
      <div className="bg-emerald-500 rounded-full p-1">
        <Check size={14} className="text-white" />
      </div>
      <span className="font-medium text-sm">{message}</span>
    </div>
  );
};

// Simple Navigation Component
const Navbar = ({ budgetItems }: { budgetItems: BudgetItem[] }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const totalCost = budgetItems.reduce((acc, item) => acc + item.estimatedCost, 0);
  const itemCount = budgetItems.length;

  const isActive = (path: string) => location.pathname === path ? 'text-emerald-600 font-semibold' : 'text-slate-600 hover:text-emerald-600';

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg rotate-45 flex items-center justify-center">
                <div className="w-4 h-4 bg-white -rotate-45"></div>
              </div>
              <span className="font-playfair font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                Marokkaans<span className="text-emerald-600">Feest</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={isActive('/')}>Diensten</Link>
            <Link to="/budget" className={`flex items-center gap-2 ${isActive('/budget')}`}>
              <span>Budget Planner</span>
              {itemCount > 0 && (
                 <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                   €{totalCost.toLocaleString('nl-NL')}
                 </span>
              )}
            </Link>
            <Link to="/inspiration" className={isActive('/inspiration')}>Inspiratie</Link>
            <Link 
              to="/add-service" 
              className="bg-slate-900 text-white px-5 py-2 rounded-full font-medium hover:bg-emerald-700 transition-colors text-sm flex items-center gap-2"
            >
              <PlusCircle size={16} />
              Dienst Plaatsen
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100">
          <div className="px-4 py-3 space-y-3">
             <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-600">Diensten</Link>
             <Link to="/budget" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-600 flex justify-between items-center">
                <span>Budget Planner</span>
                {itemCount > 0 && <span className="text-emerald-600 font-bold">€{totalCost.toLocaleString()}</span>}
             </Link>
             <Link to="/inspiration" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-600">Inspiratie</Link>
             <Link 
               to="/add-service" 
               onClick={() => setIsMobileMenuOpen(false)} 
               className="block py-2 text-emerald-600 font-medium"
             >
               + Dienst Plaatsen
             </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

// Home Page Component
const Home = ({ 
  providers, 
  budgetItems, 
  onAddToBudget,
  onRemoveProvider 
}: { 
  providers: Provider[], 
  budgetItems: BudgetItem[], 
  onAddToBudget: (provider: Provider) => void,
  onRemoveProvider: (id: string) => void
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [searchParams, setSearchParams] = useSearchParams();

  const sharedId = searchParams.get('id');

  // Dynamically calculate unique categories from available providers + standard categories
  const availableCategories = useMemo(() => {
    const providerCategories = providers.map(p => p.category);
    return Array.from(new Set([...CATEGORIES, ...providerCategories]));
  }, [providers]);

  const filteredProviders = providers.filter(provider => {
    // If a shared ID is present in URL, strictly filter for that ID
    if (sharedId) {
      return provider.id === sharedId;
    }
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          provider.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || provider.category === selectedCategory;
    const matchesPrice = provider.priceStart <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const clearFilters = () => {
    setSelectedCategory('All'); 
    setMaxPrice(5000); 
    setSearchTerm('');
    setSearchParams({}); // Clear URL params
  };

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white py-16 sm:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://picsum.photos/seed/moroccanwedding/1600/600" 
            alt="Moroccan Wedding" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold mb-6">
            Plan je droom <span className="text-emerald-400">feest</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Vind de beste Ziana's, Cateraars, DJ's en Zalen voor jouw perfecte Marokkaanse feest.
          </p>
          
          {/* Search Bar in Hero */}
          <div className="max-w-3xl mx-auto bg-white rounded-full p-2 flex flex-col sm:flex-row shadow-lg">
            <div className="flex-1 flex items-center px-4 py-2 border-b sm:border-b-0 sm:border-r border-slate-200">
              <Search className="text-slate-400 mr-2" size={20} />
              <input 
                type="text" 
                placeholder="Wat zoek je? (bv. Ziana, Zaal)" 
                className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (sharedId) setSearchParams({}); // Clear ID filter on typing
                }}
              />
            </div>
            <div className="flex-1 flex items-center px-4 py-2">
              <MapPin className="text-slate-400 mr-2" size={20} />
              <input 
                type="text" 
                placeholder="Locatie" 
                className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 sm:py-0 rounded-full font-medium transition-colors mt-2 sm:mt-0">
              Zoeken
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Only show if not in shared view or allow user to go back */}
          <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
            {sharedId && (
              <button 
                onClick={clearFilters}
                className="flex items-center gap-2 text-emerald-600 font-medium hover:underline mb-4"
              >
                <ArrowLeft size={16} /> Toon alle diensten
              </button>
            )}

            <div>
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <LayoutGrid size={18} /> Categorieën
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="category" 
                    checked={selectedCategory === 'All' && !sharedId} 
                    onChange={() => {
                        setSelectedCategory('All');
                        setSearchParams({});
                    }}
                    className="accent-emerald-600"
                  />
                  <span className={`text-sm ${(selectedCategory === 'All' && !sharedId) ? 'text-emerald-700 font-medium' : 'text-slate-600 group-hover:text-slate-900'}`}>Alles</span>
                </label>
                {availableCategories.map(cat => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="category" 
                      checked={selectedCategory === cat && !sharedId}
                      onChange={() => {
                          setSelectedCategory(cat);
                          setSearchParams({});
                      }}
                      className="accent-emerald-600"
                    />
                    <span className={`text-sm ${(selectedCategory === cat && !sharedId) ? 'text-emerald-700 font-medium' : 'text-slate-600 group-hover:text-slate-900'}`}>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {!sharedId && (
              <div>
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <SlidersHorizontal size={18} /> Max Prijs: €{maxPrice}
                </h3>
                <input 
                  type="range" 
                  min="0" 
                  max="5000" 
                  step="100" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>€0</span>
                  <span>€5000+</span>
                </div>
              </div>
            )}
          </div>

          {/* Listings Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-playfair font-bold text-slate-900">
                {sharedId ? 'Gedeelde Dienst' : (selectedCategory === 'All' ? 'Alle Diensten' : selectedCategory)}
              </h2>
              <span className="text-sm text-slate-500">{filteredProviders.length} resultaten</span>
            </div>

            {filteredProviders.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProviders.map(provider => {
                  const isAdded = budgetItems.some(item => item.providerId === provider.id);
                  return (
                    <ProviderCard 
                      key={provider.id} 
                      provider={provider} 
                      onAddToBudget={onAddToBudget}
                      onDelete={onRemoveProvider}
                      isAdded={isAdded}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-500 text-lg">Geen diensten gevonden.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 text-emerald-600 font-medium hover:underline"
                >
                  Filters wissen
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Layout
function App() {
  const [providers, setProviders] = useState<Provider[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('marokkaans_feest_providers_v1');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to load providers from storage", e);
        }
      }
    }
    return MOCK_PROVIDERS;
  });

  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(() => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('marokkaans_feest_budget');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to load budget from storage", e);
            }
        }
    }
    return [];
  });
  
  const [toast, setToast] = useState({ message: '', show: false });

  // Persist providers
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('marokkaans_feest_providers_v1', JSON.stringify(providers));
    }
  }, [providers]);

  // Persist budget
  useEffect(() => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('marokkaans_feest_budget', JSON.stringify(budgetItems));
    }
  }, [budgetItems]);

  const showToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const handleAddProvider = (newProvider: Provider) => {
    setProviders(prev => [newProvider, ...prev]);
  };

  const handleRemoveProvider = (id: string) => {
    setProviders(prev => prev.filter(p => p.id !== id));
    setBudgetItems(prev => prev.filter(item => item.providerId !== id)); // Also remove from budget
    showToast('Dienst verwijderd');
  };

  const handleAddToBudget = (provider: Provider) => {
    const isAlreadyAdded = budgetItems.some(item => item.providerId === provider.id);
    if (isAlreadyAdded) return;

    const newItem: BudgetItem = {
      id: Date.now().toString(),
      name: provider.name,
      estimatedCost: provider.priceStart,
      providerId: provider.id
    };
    setBudgetItems(prev => [...prev, newItem]);
    showToast(`${provider.name} toegevoegd aan budget!`);
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar budgetItems={budgetItems} />
        
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  providers={providers}
                  budgetItems={budgetItems}
                  onAddToBudget={handleAddToBudget}
                  onRemoveProvider={handleRemoveProvider}
                />
              } 
            />
            <Route 
              path="/budget" 
              element={<BudgetPlanner items={budgetItems} setItems={setBudgetItems} />} 
            />
            <Route 
              path="/inspiration" 
              element={<Inspiration />} 
            />
             <Route 
              path="/about" 
              element={<About />} 
            />
            <Route
              path="/add-service"
              element={<AddServiceForm onAddService={handleAddProvider} />}
            />
            <Route
              path="/how-it-works"
              element={<HowItWorks />}
            />
          </Routes>
        </main>

        <footer className="bg-slate-900 text-slate-300 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <span className="font-playfair font-bold text-2xl text-white tracking-tight">
                  Marokkaans<span className="text-emerald-500">Feest</span>
                </span>
                <p className="mt-4 text-sm text-slate-400">
                  Het nummer 1 platform voor het vinden en plannen van jouw perfecte Marokkaanse evenement.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Platform</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/about" className="hover:text-emerald-400">Over Ons</Link></li>
                  <li><Link to="/how-it-works" className="hover:text-emerald-400">Hoe het werkt</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Diensten</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/" className="hover:text-emerald-400">Ziana</Link></li>
                  <li><Link to="/" className="hover:text-emerald-400">Catering</Link></li>
                  <li><Link to="/" className="hover:text-emerald-400">Locaties</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Contact</h4>
                <ul className="space-y-2 text-sm">
                  <li>info@marokkaansfeest.nl</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-500">
              © 2024 MarokkaansFeest. Alle rechten voorbehouden.
            </div>
          </div>
        </footer>

        {/* AI Chatbot */}
        <Chatbot />

        {/* Global Toast */}
        <Toast message={toast.message} show={toast.show} onClose={() => setToast(prev => ({...prev, show: false}))} />
      </div>
    </Router>
  );
}

export default App;