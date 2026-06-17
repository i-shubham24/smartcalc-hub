import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, TrendingDown } from 'lucide-react';

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

  const chartData = useMemo(() => {
    if (p <= 0 || r <= 0 || n <= 0) return [];
    let balance = p;
    let data = [];
    for (let month = 1; month <= n; month++) {
      let interestForMonth = balance * r;
      let principalForMonth = emi - interestForMonth;
      balance -= principalForMonth;
      
      if (month % 12 === 0 || month === n) {
        data.push({
          year: `Year ${Math.ceil(month / 12)}`,
          RemainingBalance: Math.round(balance < 0 ? 0 : balance),
          InterestPaid: Math.round(interestForMonth * 12)
        });
      }
    }
    return data;
  }, [p, r, n, emi]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-2xl text-indigo-600 dark:text-indigo-400">
          <TrendingDown size={28} />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">Algorithmic Loan Analyzer</h1>
      </div>
      
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl p-6 rounded-3xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 transition-colors">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Loan Amount (₹)</label>
                <input type="number" min="0" className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-lg font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Rate (%)</label>
                  <input type="number" min="0" step="0.1" className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-lg font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none" value={rate} onChange={(e) => setRate(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Years</label>
                  <input type="number" min="1" className="w-full p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-lg font-bold focus:ring-2 focus:ring-indigo-500 transition-all outline-none" value={years} onChange={(e) => setYears(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 dark:bg-indigo-900 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10"><PieChart size={100} /></div>
            <div className="relative z-10">
              <p className="text-indigo-100 font-medium uppercase tracking-wider text-sm mb-1">Monthly EMI</p>
              <p className="text-4xl font-black mb-6">{formatINR(emi)}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-indigo-500/50 pb-2">
                  <span className="text-indigo-100">Principal</span>
                  <span className="font-bold">{formatINR(p)}</span>
                </div>
                <div className="flex justify-between border-b border-indigo-500/50 pb-2">
                  <span className="text-indigo-100">Total Interest</span>
                  <span className="font-bold">{formatINR(totalInterest)}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-indigo-100">Total Payable</span>
                  <span className="font-bold">{formatINR(totalPayable)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-white/80 dark:bg-slate-800/90 backdrop-blur-xl p-6 rounded-3xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 flex flex-col transition-colors">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-slate-200">
            <TrendingDown size={20} className="text-indigo-500" /> Amortization & Balance Decay
          </h2>
          
          <div className="flex-grow w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis tickFormatter={(value) => `₹${value / 100000}L`} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <Tooltip 
                  formatter={(value) => formatINR(value)}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="RemainingBalance" name="Balance Left" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          {/* CRASH FIXED BELOW: Removed curly braces from the math formula text */}
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
            Calculated using standard mathematical amortization: E = P × r(1+r)ⁿ / ((1+r)ⁿ - 1)
          </p>
        </div>
      </div>
    </motion.div>
  );
}