import { useState } from 'react';
import { Plus, Trash2, Receipt } from 'lucide-react';

const formatINR = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

export default function GstCalc() {
  const [items, setItems] = useState([
    { id: 1, desc: 'Video Editing Service', amount: 15000, rate: 18 }
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now(), desc: '', amount: 0, rate: 18 }]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  // Calculate Totals
  const subTotal = items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  const totalGst = items.reduce((sum, item) => sum + ((parseFloat(item.amount) || 0) * (parseFloat(item.rate) || 0) / 100), 0);
  const grandTotal = subTotal + totalGst;

  return (
    <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 dark:bg-emerald-900/50 p-3 rounded-xl text-emerald-600 dark:text-emerald-400">
            <Receipt size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Smart Invoice & GST Builder</h1>
        </div>
        <button onClick={addItem} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
          <Plus size={16} /> Add Line Item
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Dynamic Items List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-12 gap-4 px-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <div className="col-span-5">Description</div>
            <div className="col-span-3">Amount (₹)</div>
            <div className="col-span-3">GST Rate</div>
            <div className="col-span-1 text-center">Act</div>
          </div>
          
          {items.map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-4 items-center bg-slate-50 dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
              <input 
                type="text" placeholder="Item Name"
                className="col-span-5 w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 text-sm"
                value={item.desc} onChange={(e) => updateItem(item.id, 'desc', e.target.value)}
              />
              <input 
                type="number" min="0" placeholder="0"
                className="col-span-3 w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 text-sm"
                value={item.amount || ''} onChange={(e) => updateItem(item.id, 'amount', e.target.value)}
              />
              <select 
                className="col-span-3 w-full p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 text-sm"
                value={item.rate} onChange={(e) => updateItem(item.id, 'rate', e.target.value)}
              >
                <option value="0">0%</option>
                <option value="5">5%</option>
                <option value="12">12%</option>
                <option value="18">18%</option>
                <option value="28">28%</option>
              </select>
              <button onClick={() => removeItem(item.id)} className="col-span-1 flex justify-center text-rose-500 hover:text-rose-700 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Invoice Summary */}
        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-100 dark:border-emerald-900/50 h-fit space-y-4">
          <h2 className="font-bold text-slate-900 dark:text-slate-100 border-b border-emerald-200 dark:border-emerald-800/50 pb-2 mb-4">Invoice Summary</h2>
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-slate-600 dark:text-slate-400">Total Base Amount</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">{formatINR(subTotal)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-slate-600 dark:text-slate-400">Total Tax (GST)</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">+{formatINR(totalGst)}</span>
          </div>
          <div className="pt-4 border-t border-emerald-200 dark:border-emerald-800/50 flex flex-col gap-1">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Grand Total</span>
            <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">{formatINR(grandTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}