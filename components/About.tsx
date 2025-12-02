
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Users, Star, ArrowRight, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-slate-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/seed/moroccanpattern/1600/800"
            alt="Background Pattern"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 text-xs font-medium mb-6">
            <Sparkles size={14} />
            <span>Het verhaal achter het platform</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold text-white mb-6">
            Waar traditie en <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">innovatie samenkomen</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            MarokkaansFeest is opgericht met één doel: het organiseren van Marokkaanse bruiloften en evenementen eenvoudiger, transparanter en stressvrij maken.
          </p>
        </div>
      </div>

      {/* Values Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Shield size={28} />
            </div>
            <h3 className="font-playfair font-bold text-xl text-slate-900 mb-3">Betrouwbaarheid</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Wij screenen onze dienstverleners en bieden een reviewsysteem, zodat jij met een gerust hart kunt boeken. Geen verrassingen achteraf.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Heart size={28} />
            </div>
            <h3 className="font-playfair font-bold text-xl text-slate-900 mb-3">Liefde voor Cultuur</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We begrijpen de nuances van onze rijke cultuur. Van de henna-ceremonie tot de 3amaria, ons platform ademt traditie.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center hover:-translate-y-1 transition-transform duration-300">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Users size={28} />
            </div>
            <h3 className="font-playfair font-bold text-xl text-slate-900 mb-3">Gemeenschap</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We brengen bruidsparen en ondernemers samen. Een plek waar ervaringen worden gedeeld en dromen worden gerealiseerd.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-full bg-emerald-200 rounded-3xl transform -rotate-3 translate-x-3 translate-y-3"></div>
            <img 
              src="https://picsum.photos/seed/moroccancelebration/800/600" 
              alt="Vrolijke Marokkaanse feest sfeer" 
              className="relative rounded-3xl shadow-lg w-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-slate-900">
              Van frustratie naar <span className="text-emerald-600">oplossing</span>
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Het idee voor MarokkaansFeest ontstond tijdens het plannen van een eigen bruiloft. Het eindeloos bellen, onduidelijke prijzen en het zoeken via social media was tijdrovend en frustrerend.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Dat moest anders kunnen. Wij geloven dat de voorbereiding net zo leuk moet zijn als het feest zelf. Daarom hebben we een centraal platform gebouwd waar vraag en aanbod samenkomen, met transparantie als kernwaarde.
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-200">
              <div>
                <p className="text-4xl font-bold text-slate-900 mb-1">500+</p>
                <p className="text-sm text-slate-500 uppercase tracking-wide">Dienstverleners</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-slate-900 mb-1">2.5k</p>
                <p className="text-sm text-slate-500 uppercase tracking-wide">Geplande Feesten</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-emerald-50 border-y border-emerald-100 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-playfair font-bold text-slate-900 mb-6">
            Ben jij een dienstverlener?
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Sluit je aan bij het snelst groeiende platform voor Marokkaanse feesten in de Benelux. Vergroot je zichtbaarheid en beheer je boekingen eenvoudig.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/add-service" 
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              Dienst Toevoegen <ArrowRight size={18} />
            </Link>
            <Link 
              to="/" 
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-8 py-3 rounded-full font-medium transition-colors"
            >
              Bekijk Aanbod
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
