import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Category, Provider } from '../types';
import { CATEGORIES } from '../constants';
import { Store, MapPin, Euro, Image as ImageIcon, Phone, Mail, FileText, Check, Plus } from 'lucide-react';

interface AddServiceFormProps {
  onAddService: (provider: Provider) => void;
}

const AddServiceForm: React.FC<AddServiceFormProps> = ({ onAddService }) => {
  const navigate = useNavigate();
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: CATEGORIES[0] as string,
    customCategory: '',
    description: '',
    location: '',
    priceStart: '',
    imageUrl: '',
    phone: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalCategory = isCustomCategory ? formData.customCategory : formData.category;

    if (!finalCategory.trim()) {
      alert("Voer een geldige categorie in.");
      return;
    }

    const newProvider: Provider = {
      id: Date.now().toString(),
      name: formData.name,
      category: finalCategory,
      description: formData.description,
      location: formData.location,
      priceStart: parseFloat(formData.priceStart) || 0,
      imageUrl: formData.imageUrl || `https://picsum.photos/seed/${Date.now()}/400/300`,
      rating: 5.0, // New services start with 5 stars
      phone: formData.phone,
      email: formData.email,
      isOwner: true
    };

    onAddService(newProvider);
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 p-6 text-white">
          <h2 className="text-2xl font-playfair font-bold flex items-center gap-2">
            <Store className="text-emerald-400" />
            Nieuwe Dienst Plaatsen
          </h2>
          <p className="text-slate-400 mt-1">
            Voeg jouw bedrijf toe aan MarokkaansFeest en bereik duizenden klanten.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bedrijfsnaam */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Bedrijfsnaam</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="Bijv. Catering Zohra"
              />
            </div>

            {/* Categorie */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Categorie</label>
              <div className="relative">
                <select
                  value={isCustomCategory ? 'custom_option' : formData.category}
                  onChange={e => {
                    if (e.target.value === 'custom_option') {
                      setIsCustomCategory(true);
                    } else {
                      setIsCustomCategory(false);
                      setFormData({...formData, category: e.target.value});
                    }
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none appearance-none bg-white transition-all"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                  <option value="custom_option">+ Nieuwe categorie toevoegen...</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </div>
              </div>
              
              {isCustomCategory && (
                <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-xs text-slate-500 mb-1">Naam nieuwe categorie</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      required
                      value={formData.customCategory}
                      onChange={e => setFormData({...formData, customCategory: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-emerald-300 ring-1 ring-emerald-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      placeholder="Bijv. Henna Artiest"
                      autoFocus
                    />
                    <button 
                      type="button" 
                      onClick={() => setIsCustomCategory(false)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                      title="Annuleren"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Locatie */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-1">
                <MapPin size={16} className="text-slate-400" /> Locatie
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="Bijv. Rotterdam (en omgeving)"
              />
            </div>

            {/* Prijs */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-1">
                <Euro size={16} className="text-slate-400" /> Vanaf Prijs
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.priceStart}
                onChange={e => setFormData({...formData, priceStart: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="0.00"
              />
            </div>

            {/* Foto URL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-1">
                <ImageIcon size={16} className="text-slate-400" /> Foto URL (Optioneel)
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="https://..."
              />
            </div>

            {/* Contact Info */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-1">
                <Phone size={16} className="text-slate-400" /> Telefoon (Optioneel)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="06-12345678"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-1">
                <Mail size={16} className="text-slate-400" /> Email (Optioneel)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="info@bedrijf.nl"
              />
            </div>

            {/* Beschrijving */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-1">
                <FileText size={16} className="text-slate-400" /> Beschrijving
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none transition-all"
                placeholder="Vertel iets over je diensten, ervaring en wat jou uniek maakt..."
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
             <button
               type="button"
               onClick={() => navigate('/')}
               className="px-6 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium transition-colors"
             >
               Annuleren
             </button>
             <button
               type="submit"
               className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
             >
               <Check size={18} />
               Dienst Plaatsen
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceForm;