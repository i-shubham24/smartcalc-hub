import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { Landmark, TrendingDown, Receipt, PieChart as PieIcon, Calculator } from 'lucide-react';

const formatINR = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

const formatCompact = (val) => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  return formatINR(val);
};

export default function EmiCalc() {
  const [principal, setPrincipal] = useState(1500000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [tenureType, setTenureType] = useState('years'); // 'years' or 'months'

  // Mathematical Engine
  const p = Number(principal) || 0;
  const rAnnual = Number(rate) || 0;
  const t = Number(tenure) || 0;
  
  const r = rAnnual / 12 / 100;
  const n = tenureType === 'years' ? t * 12 : t;

  let emi = 0, totalPayable = 0, totalInterest = 0;
  let principalPercent = 0, interestPercent = 0;

  if (p > 0 && r > 0 && n > 0) {
    emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    totalPayable = emi * n;
    totalInterest = totalPayable - p;
    principalPercent = (p / totalPayable) * 100;
    interestPercent = (totalInterest / totalPayable) * 100;
  }

  // Financial Accuracy: Processing Fee (1%) & Taxes (18% GST -> 9% CGST + 9% SGST)
  const processingFee = p * 0.01;
  const cgst = processingFee * 0.09;
  const sgst = processingFee * 0.09;
  const totalTaxAndFees = processingFee + cgst + sgst;

  const chartData = [
    { name: 'Principal', value: p, color: '#10b981' }, // Emerald
    { name: 'Interest', value: totalInterest, color: '#6366f1' } // Indigo
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-2xl text-indigo-600 dark:text-indigo-400">
          <Landmark size={28} />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">Algorithmic Loan Dashboard</h1>
      </div>

      {/* SECTION 1: Hero Metrics Bar (Full Width) */}
      <div className="bg-slate-900 dark:bg-slate-950 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 w-full md:w-auto text-center md:text-left">
          <p className="text-indigo-300 font-bold uppercase tracking-widest text-xs mb-2">Monthly EMI Calculation</p>
          <p className="text-5xl lg:text-6xl font-black text-white drop-shadow-sm">{formatINR(emi)}</p>
          <p className="text-slate-400 text-sm mt-2 font-medium">Payable over {n} months</p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-6 md:gap-12 w-full md:w-auto">
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 flex-1">
            <p className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-1">Total Principal</p>
            <p className="font-bold text-2xl">{formatINR(p)}</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 flex-1">
            <p className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-1">Total Interest</p>
            <p className="font-bold text-2xl text-indigo-300">{formatINR(totalInterest)}</p>
          </div>
        </div>
      </div>

      {/* SECTION 2: Interactive Control Grid (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Loan Amount Control */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm flex flex-col justify-between">
          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">Loan Amount</label>
            <div className="text-3xl font-black text-slate-900 dark:text-white mb-6">{formatCompact(p)}</div>
          </div>
          <div>
            <input 
              type="range" min="0" max="10000000" step="50000"
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 mb-2"
              value={principal} onChange={(e) => setPrincipal(e.target.value)}
            />
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-4">
              <span>₹0</span><span>₹1Cr</span>
            </div>
            <input 
              type="number" className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-center font-bold focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white"
              value={principal} onChange={(e) => setPrincipal(e.target.value)}
            />
          </div>
        </div>

        {/* Interest Rate Control */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm flex flex-col justify-between">
          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">Interest Rate (P.A.)</label>
            <div className="text-3xl font-black text-slate-900 dark:text-white mb-6">{rate}%</div>
          </div>
          <div>
            <input 
              type="range" min="1" max="24" step="0.1"
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 mb-4"
              value={rate} onChange={(e) => setRate(e.target.value)}
            />
            <div className="flex flex-wrap gap-2 justify-center">
              {[6.5, 8.5, 10, 12, 14].map((rVal) => (
                <button 
                  key={rVal} onClick={() => setRate(rVal)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${rate == rVal ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-400'}`}
                >
                  {rVal}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tenure Control */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm flex flex-col justify-between">
          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">Loan Tenure</label>
            <div className="text-3xl font-black text-slate-900 dark:text-white mb-6">
              {tenure} <span className="text-base font-medium text-slate-500">{tenureType}</span>
            </div>
          </div>
          <div>
            <input 
              type="range" min="1" max={tenureType === 'years' ? 30 : 360} step="1"
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500 mb-6"
              value={tenure} onChange={(e) => setTenure(e.target.value)}
            />
            <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl w-full">
              <button 
                onClick={() => { setTenureType('years'); setTenure(Math.ceil(tenure / 12) || 1); }}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${tenureType === 'years' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
              >
                Years
              </button>
              <button 
                onClick={() => { setTenureType('months'); setTenure(tenure * 12 || 12); }}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${tenureType === 'months' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
              >
                Months
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Deep Analytics & Tax Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Donut Chart & Ratio */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
            <PieIcon size={18} className="text-emerald-500" /> Amount Distribution
          </h3>
          
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="h-48 w-48 relative shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} innerRadius={65} outerRadius={85} paddingAngle={5} dataKey="value" stroke="none">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value) => formatINR(value)} contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#0f172a', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total</span>
                <span className="text-sm font-black text-slate-900 dark:text-white">{formatCompact(totalPayable)}</span>
              </div>
            </div>

            <div className="w-full space-y-4">
              <div className="flex justify-between items-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Principal</span>
                </div>
                <span className="font-black text-emerald-600 dark:text-emerald-400">{principalPercent.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Interest</span>
                </div>
                <span className="font-black text-indigo-600 dark:text-indigo-400">{interestPercent.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Tax & GST Breakdown */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm flex flex-col justify-center">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Receipt size={18} className="text-rose-500" /> Processing Fees & GST Breakdown
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-700">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Standard Processing Fee (1%)</span>
              <span className="font-bold text-slate-900 dark:text-white">{formatINR(processingFee)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-500">CGST (9%)</span>
              <span className="font-bold text-rose-500">+ {formatINR(cgst)}</span>
            </div>
            
            <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-700">
              <span className="text-sm font-bold text-slate-500">SGST (9%)</span>
              <span className="font-bold text-rose-500">+ {formatINR(sgst)}</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">Total Upfront Cost</span>
              <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">{formatINR(totalTaxAndFees)}</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl text-xs font-medium text-slate-500 flex items-start gap-2 border border-slate-200 dark:border-slate-800">
            <TrendingDown size={16} className="shrink-0 mt-0.5" />
            <p>In India, GST is not applicable on the loan principal or the EMI interest. However, an 18% GST (9% CGST + 9% SGST) is mandatory on the bank's processing fees and documentation charges.</p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}