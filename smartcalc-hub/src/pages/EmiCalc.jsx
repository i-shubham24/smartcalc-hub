import { useState } from 'react';
import { PieChart, Calendar } from 'lucide-react';

// Helper for Indian Currency Formatting
const formatINR = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

export default function EmiCalc() {
  const [principal, setPrincipal] = useState('500000');
  const [rate, setRate] = useState('8.5');
  const [years, setYears] = useState('5');

  const p = parseFloat(principal) || 0;
  const rAnnual = parseFloat(rate) || 0;
  const y = parseFloat(years) || 0;

  const r = rAnnual / 12 / 100;
  const n = y * 12;

  let emi = 0, totalPayable = 0, totalInterest = 0;
  let principalPercent = 0, interestPercent = 0;

  if (p > 0 && r > 0 && n > 0) {
    emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    totalPayable = emi * n;
    totalInterest = totalPayable - p;
    principalPercent = (p / totalPayable) * 100;
    interestPercent = (totalInterest / totalPayable) * 100;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-xl text-indigo-600 dark:text-indigo-400">
          <PieChart size={24} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Advanced Loan Analyzer</h1>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Loan Amount (₹)</label>
            <input 
              type="number" min="0"
              className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-lg font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 transition-colors"
              value={principal} onChange={(e) => setPrincipal(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Interest Rate (%)</label>
              <input 
                type="number" min="0" step="0.1"
                className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-lg font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 transition-colors"
                value={rate} onChange={(e) => setRate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Tenure (Years)</label>
              <input 
                type="number" min="1"
                className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-lg font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 transition-colors"
                value={years} onChange={(e) => setYears(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Outputs & Visualization */}
        <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-6">
          <div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Monthly EMI</p>
            <p className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">{formatINR(emi)}</p>
          </div>
          
          <div className="space-y-4">
            {/* Visual Distribution Bar */}
            <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-200 dark:bg-slate-800">
              <div style={{ width: `${principalPercent}%` }} className="bg-emerald-500 transition-all duration-500"></div>
              <div style={{ width: `${interestPercent}%` }} className="bg-rose-500 transition-all duration-500"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="font-medium text-slate-600 dark:text-slate-400">Principal</span>
                </div>
                <p className="font-bold text-slate-900 dark:text-slate-100">{formatINR(p)}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <span className="font-medium text-slate-600 dark:text-slate-400">Total Interest</span>
                </div>
                <p className="font-bold text-slate-900 dark:text-slate-100">{formatINR(totalInterest)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}