import React, { useState } from 'react';
import { BudgetItem } from '../types';
import { Trash2, Plus, Calculator, FileDown } from 'lucide-react';

interface BudgetPlannerProps {
  items: BudgetItem[];
  setItems: React.Dispatch<React.SetStateAction<BudgetItem[]>>;
}

const BudgetPlanner: React.FC<BudgetPlannerProps> = ({ items, setItems }) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemCost, setNewItemCost] = useState('');

  const totalCost = items.reduce((acc, item) => acc + item.estimatedCost, 0);

  const addItem = () => {
    if (!newItemName || !newItemCost) return;
    const cost = parseFloat(newItemCost);
    if (isNaN(cost)) return;

    const newItem: BudgetItem = {
      id: Date.now().toString(),
      name: newItemName,
      estimatedCost: cost,
    };

    setItems([...items, newItem]);
    setNewItemName('');
    setNewItemCost('');
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const exportBudget = () => {
    const text = `Mijn MarokkaansFeest Budget:\n\n` + 
      items.map(item => `- ${item.name}: €${item.estimatedCost}`).join('\n') +
      `\n\nTotaal: €${totalCost}`;
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mijn-budget.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="bg-emerald-700 p-6 sm:p-8 text-white flex justify-between items-center flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-playfair font-bold">Mijn Budget</h2>
            <p className="text-emerald-100 mt-1">Houd controle over je feestkosten</p>
          </div>
          <div className="text-right bg-emerald-800/50 p-4 rounded-xl backdrop-blur-sm border border-emerald-600/30">
            <p className="text-sm text-emerald-200 uppercase tracking-wider font-medium">Totaal Geschat</p>
            <p className="text-3xl font-bold font-mono">€{totalCost.toLocaleString('nl-NL')}</p>
          </div>
        </div>

        <div className="p-6">
          {/* Add Custom Item */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-8">
            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Plus size={16} /> Handmatig Item Toevoegen
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Bijv. Uitnodigingen"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-500">€</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={newItemCost}
                  onChange={(e) => setNewItemCost(e.target.value)}
                  className="w-full sm:w-32 pl-7 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
              <button
                onClick={addItem}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Toevoegen
              </button>
            </div>
          </div>

          {/* List */}
          <div className="space-y-3">
            {items.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Calculator size={48} className="mx-auto mb-4 opacity-50" />
                <p>Nog geen items in je budget.</p>
                <p className="text-sm">Voeg items toe via de lijst of handmatig hierboven.</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-emerald-200 hover:shadow-sm transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-10 bg-emerald-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-slate-800">{item.name}</p>
                      {item.providerId && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">Via Listing</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-medium text-slate-700">€{item.estimatedCost.toLocaleString('nl-NL')}</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-slate-300 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                      title="Verwijderen"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
              <button
                onClick={exportBudget}
                className="flex items-center gap-2 text-slate-600 hover:text-emerald-700 font-medium px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                <FileDown size={18} />
                Lijst Exporteren
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanner;