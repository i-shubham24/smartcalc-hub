import { Link } from 'react-router-dom';
import { Users, Landmark, Receipt, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const tools = [
    {
      path: '/split',
      title: 'Split-the-Bill',
      desc: 'Instantly calculate tips and divide the dinner bill fairly among your group.',
      icon: Users,
      color: 'text-rose-600 dark:text-rose-400',
      bg: 'bg-rose-100 dark:bg-rose-900/50',
      border: 'hover:border-rose-300 dark:hover:border-rose-500'
    },
    {
      path: '/emi',
      title: 'EMI & Loan Calculator',
      desc: 'Plan your finances. Visualize monthly payments, total interest, and tenure.',
      icon: Landmark,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-100 dark:bg-indigo-900/50',
      border: 'hover:border-indigo-300 dark:hover:border-indigo-500'
    },
    {
      path: '/gst',
      title: 'GST / Invoice Math',
      desc: 'Quickly add or reverse-calculate GST percentages for fast, accurate invoicing.',
      icon: Receipt,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-100 dark:bg-emerald-900/50',
      border: 'hover:border-emerald-300 dark:hover:border-emerald-500'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto mt-8 transition-colors">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
          Everyday Math, Simplified.
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          A collection of highly practical calculators for daily financial decisions.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link key={tool.path} to={tool.path} className={`group bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all ${tool.border}`}>
            <div className={`${tool.bg} w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${tool.color} group-hover:scale-110 transition-transform`}>
              <tool.icon size={24} />
            </div>
            <h2 className="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100">{tool.title}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">{tool.desc}</p>
            <div className={`flex items-center ${tool.color} font-medium text-sm gap-1 group-hover:gap-2 transition-all`}>
              Open Tool <ArrowRight size={16} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}