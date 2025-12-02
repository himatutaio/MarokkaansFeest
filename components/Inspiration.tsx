import React from 'react';
import { Camera, Music, Sparkles, Heart, Clock, Users } from 'lucide-react';

const Inspiration = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16 animate-in slide-in-from-bottom-4 duration-700 fade-in">
        <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-slate-900 mb-6">
          Laat je <span className="text-emerald-600">inspireren</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Ontdek de laatste trends, tijdloze tradities en creatieve ideeën voor jouw onvergetelijke Marokkaanse bruiloft. Van Henna tot Walima.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
          <div className="relative h-64 overflow-hidden">
            <img 
                src="https://picsum.photos/seed/henna/600/400" 
                alt="Henna Night" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-emerald-800">
                Traditie
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-playfair font-bold text-2xl mb-3 text-slate-800 group-hover:text-emerald-700 transition-colors">De Henna Avond</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Van traditionele groene decoratie uit Fes tot moderne wit-goud thema's. De henna avond is het intieme en emotionele begin van je bruiloft.
            </p>
            <a href="#" className="text-emerald-600 font-medium text-sm hover:underline">Lees meer &rarr;</a>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
          <div className="relative h-64 overflow-hidden">
             <img 
                src="https://picsum.photos/seed/amaria/600/400" 
                alt="Amaria Intocht" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
             <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-emerald-800">
                Entree
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-playfair font-bold text-2xl mb-3 text-slate-800 group-hover:text-emerald-700 transition-colors">Amaria & 3emaria</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Maak een grandioze entree als een koning en koningin. Kies je voor klassiek goud of ga je voor een moderne kristallen koepel met bloemen?
            </p>
            <a href="#" className="text-emerald-600 font-medium text-sm hover:underline">Bekijk stijlen &rarr;</a>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
           <div className="relative h-64 overflow-hidden">
             <img 
                src="https://picsum.photos/seed/food/600/400" 
                alt="Catering" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
             <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-emerald-800">
                Catering
            </div>
           </div>
           <div className="p-6">
             <h3 className="font-playfair font-bold text-2xl mb-3 text-slate-800 group-hover:text-emerald-700 transition-colors">Culinaire Verwennerij</h3>
             <p className="text-slate-600 text-sm leading-relaxed mb-4">
               Kip bastilla, pruimen tajine of toch een modern 4-gangen diner? Ontdek hoe je de gasten culinair kunt verrassen.
             </p>
             <a href="#" className="text-emerald-600 font-medium text-sm hover:underline">Menu inspiratie &rarr;</a>
           </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
            <h2 className="text-3xl font-playfair font-bold mb-12 text-center">Essentiële Planning Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-white/10 group-hover:bg-emerald-600 transition-colors rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                <Clock size={32} className="text-white" />
                </div>
                <h4 className="font-bold text-xl mb-3">Begin op tijd</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Populaire ziana's en locaties zitten vaak al 12-18 maanden van tevoren vol. Zodra de datum bekend is, begin direct met boeken.
                </p>
            </div>
            <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-white/10 group-hover:bg-emerald-600 transition-colors rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                <Users size={32} className="text-white" />
                </div>
                <h4 className="font-bold text-xl mb-3">Gastenlijst beheer</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Wees realistisch met je gastenlijst. Een intiem feest met 100 gasten geeft een heel andere sfeer (en budget) dan een bruiloft met 400+ gasten.
                </p>
            </div>
            <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-white/10 group-hover:bg-emerald-600 transition-colors rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                <Sparkles size={32} className="text-white" />
                </div>
                <h4 className="font-bold text-xl mb-3">Geniet van het moment</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Het is jouw dag. Zorg voor een goede ceremoniemeester of weddingplanner zodat jij en je familie zorgeloos kunnen genieten.
                </p>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Inspiration;