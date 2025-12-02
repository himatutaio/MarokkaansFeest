import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Calculator, MessageSquare, CheckCircle, Store, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero */}
      <div className="bg-slate-900 text-white py-16 sm:py-24 text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-playfair font-bold mb-6">
          Hoe werkt <span className="text-emerald-400">MarokkaansFeest</span>?
        </h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          In 3 simpele stappen van inspiratie naar jouw droombruiloft.
        </p>
      </div>

      {/* User Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <Search size={32} />
                </div>
                <h3 className="font-playfair font-bold text-xl mb-3">1. Ontdek & Vergelijk</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                    Zoek door ons uitgebreide aanbod van Ziana's, catering, zalen en meer. Filter eenvoudig op locatie, prijs en categorie om precies te vinden wat je zoekt.
                </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center text-center relative z-10 hover:-translate-y-1 transition-transform duration-300">
                 <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <Calculator size={32} />
                </div>
                <h3 className="font-playfair font-bold text-xl mb-3">2. Plan & Budgetteer</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                    Gebruik de budgetplanner om grip te houden op je kosten. Voeg diensten toe aan je favorietenlijst met één klik en zie direct wat de geschatte kosten zijn.
                </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                 <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <MessageSquare size={32} />
                </div>
                <h3 className="font-playfair font-bold text-xl mb-3">3. Neem Contact Op</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                    Iets moois gevonden? Stuur direct een bericht naar de dienstverlener via het contactformulier. Simpel, snel en direct contact zonder tussenpersonen.
                </p>
            </div>
        </div>
      </div>

      {/* For Providers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-emerald-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <div className="flex-1 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 border border-emerald-600 text-emerald-300 text-xs font-medium mb-4">
                    <Store size={14} />
                    <span>Voor Ondernemers</span>
                </div>
                <h2 className="text-3xl font-playfair font-bold mb-4">Heb jij een dienst voor feesten?</h2>
                <p className="text-emerald-100 mb-8 leading-relaxed max-w-lg">
                    Sluit je aan bij MarokkaansFeest en bereik duizenden koppels die op zoek zijn naar jouw expertise. Het aanmaken van een profiel is eenvoudig en zorgt direct voor zichtbaarheid.
                </p>
                <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                        <CheckCircle className="text-emerald-400" size={20} />
                        <span className="text-emerald-50">Gratis bedrijfsprofiel aanmaken</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircle className="text-emerald-400" size={20} />
                        <span className="text-emerald-50">Beheer je eigen portfolio en prijzen</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircle className="text-emerald-400" size={20} />
                        <span className="text-emerald-50">Direct contact met potentiële klanten</span>
                    </li>
                </ul>
                <Link to="/add-service" className="inline-flex items-center gap-2 bg-white text-emerald-900 px-6 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors shadow-lg">
                    Dienst Toevoegen <ArrowRight size={18} />
                </Link>
            </div>
            
            <div className="flex-1 w-full max-w-md relative z-10">
                 <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20 shadow-2xl transform rotate-2">
                    {/* Mock simple form preview */}
                    <div className="space-y-4 opacity-80 pointer-events-none select-none">
                        <div className="h-4 bg-white/20 rounded w-1/3"></div>
                        <div className="h-10 bg-white/10 rounded w-full border border-white/20"></div>
                        <div className="h-4 bg-white/20 rounded w-1/4 mt-4"></div>
                        <div className="h-24 bg-white/10 rounded w-full border border-white/20"></div>
                        <div className="h-10 bg-emerald-500 rounded w-full mt-4 shadow-md"></div>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;