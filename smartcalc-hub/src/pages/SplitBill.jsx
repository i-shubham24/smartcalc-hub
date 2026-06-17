import { useState } from 'react';
import { Users } from 'lucide-react';

const formatINR = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

export default function SplitBill() {
  const [subtotal, setSubtotal] = useState('2500');
  const [taxPercent, setTaxPercent] = useState('5');
  const [tipPercent, setTipPercent] = useState('10');
  const [people, setPeople] = useState('4');

  const numSubtotal = parseFloat(subtotal) || 0;
  const numTax = parseFloat(taxPercent) || 0;
  const numTip = parseFloat(tipPercent) || 0;
  const numPeople = parseInt(people) || 1;

  const taxAmount = (numSubtotal * numTax) / 100;
  // Standard restaurant math: Tip is often calculated on the subtotal + tax
  const amountWithTax = numSubtotal + taxAmount; 
  const tipAmount = (amountWithTax * numTip) / 100;
  
  const grandTotal = amountWithTax + tipAmount;
  const perPerson = grandTotal / numPeople;

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-rose-100 dark:bg-rose-900/50 p-3 rounded-xl text-rose-600 dark:text-rose-400">
          <Users size={24} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Smart Bill Splitter</h1>
      </div>
      
      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Receipt Subtotal (₹)</label>
            <input 
              type="number" min="0" placeholder="0.00"
              className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-rose-500 transition-colors"
              value={subtotal} onChange={(e) => setSubtotal(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Service/Tax (%)</label>
              <input 
                type="number" min="0"
                className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-rose-500 transition-colors"
                value={taxPercent} onChange={(e) => setTaxPercent(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Tip (%)</label>
              <input 
                type="number" min="0"
                className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-rose-500 transition-colors"
                value={tipPercent} onChange={(e) => setTipPercent(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Number of People</label>
            <div className="flex items-center gap-4">
              <input 
                type="range" min="1" max="20" 
                className="w-full accent-rose-500"
                value={people} onChange={(e) => setPeople(e.target.value)}
              />
              <span className="font-bold text-xl text-slate-900 dark:text-slate-100 w-8 text-center">{people}</span>
            </div>
          </div>
        </div>

        <div className="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-xl border border-rose-100 dark:border-rose-900/50 flex flex-col justify-between space-y-6">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600 dark:text-slate-400">Subtotal</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{formatINR(numSubtotal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600 dark:text-slate-400">Tax/Service</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">+{formatINR(taxAmount)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600 dark:text-slate-400">Tip</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">+{formatINR(tipAmount)}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-rose-200 dark:border-rose-800/50">
              <span className="font-bold text-rose-600 dark:text-rose-400">Grand Total</span>
              <span className="font-bold text-rose-600 dark:text-rose-400">{formatINR(grandTotal)}</span>
            </div>
          </div>

          <div className="pt-6 border-t-2 border-dashed border-rose-200 dark:border-rose-800/50 text-center">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Each Person Pays</p>
            <p className="text-5xl font-extrabold text-slate-900 dark:text-slate-100">{formatINR(perPerson)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}