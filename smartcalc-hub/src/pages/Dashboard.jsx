import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Landmark, Receipt, ArrowRight, Zap, ShieldCheck, BarChart3, Lock } from 'lucide-react';

export default function Dashboard() {
  const tools = [
    { path: '/split', title: 'Smart Bill Splitter', desc: 'Dynamically allocate pre-tip tax and calculate exact per-person costs.', icon: Users, color: 'text-rose-500', bg: 'bg-rose-100/50 dark:bg-rose-500/10' },
    { path: '/emi', title: 'Algorithmic EMI Analyzer', desc: 'Visualize amortization schedules and total interest distribution over time.', icon: Landmark, color: 'text-indigo-500', bg: 'bg-indigo-100/50 dark:bg-indigo-500/10' },
    { path: '/gst', title: 'Dynamic GST Builder', desc: 'Compile multi-variable line items with individual tax brackets instantly.', icon: Receipt, color: 'text-emerald-500', bg: 'bg-emerald-100/50 dark:bg-emerald-500/10' }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-32">
      
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto mt-12">
        <motion.div 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.6, type: "spring" }} 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md text-slate-700 dark:text-slate-200 text-sm font-bold mb-8 border border-slate-200/50 dark:border-slate-700/50 shadow-sm"
        >
          <Zap size={16} className="text-amber-500" /> Powering everyday financial decisions.
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-100 dark:to-slate-300 pb-2 drop-shadow-sm">
          Finance, without the friction.
        </h1>
        
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
          A high-performance, client-side calculator suite designed to handle dynamic line-item structures, visual data modeling, and exact Indian currency (₹) formatting.
        </p>
      </section>

      {/* Services / Tools Grid */}
      <section className="grid md:grid-cols-3 gap-8 relative z-10">
        {tools.map((tool, i) => (
          <motion.div 
            key={tool.path} 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: [0, -10, 0] }}
            transition={{ 
              opacity: { duration: 0.5, delay: i * 0.1 },
              y: { repeat: Infinity, duration: 4 + i, ease: "easeInOut" }
            }} 
          >
            <Link to={tool.path} className="group block h-full bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-slate-200/50 dark:border-slate-700/50 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 transition-all">
              <div className={`${tool.bg} ${tool.color} w-16 h-16 flex items-center justify-center rounded-2xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm`}>
                <tool.icon size={32} />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white tracking-tight">{tool.title}</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed font-medium">{tool.desc}</p>
              <div className={`flex items-center font-bold ${tool.color} gap-2 group-hover:gap-4 transition-all`}>
                Launch Tool <ArrowRight size={20} />
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* Why Use Us (REMOVED outer box background, flows naturally over main bg) */}
      <section className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center py-10 relative z-10">
        <div className="space-y-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">Why we built SmartCalc.</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium text-lg">
              Standard calculators are static, generic, and hide data visualization behind paywalls. We engineered a purely client-side platform that respects your privacy—no databases, no tracking.
            </p>
          </div>
          <ul className="space-y-6">
            <li className="flex items-center gap-5 font-bold text-slate-800 dark:text-slate-100 text-lg">
              <div className="bg-emerald-100/50 dark:bg-emerald-900/30 p-3 rounded-xl border border-emerald-200/50 dark:border-emerald-800/50">
                <ShieldCheck className="text-emerald-500" size={24} />
              </div>
              100% Client-Side Processing
            </li>
            <li className="flex items-center gap-5 font-bold text-slate-800 dark:text-slate-100 text-lg">
              <div className="bg-indigo-100/50 dark:bg-indigo-900/30 p-3 rounded-xl border border-indigo-200/50 dark:border-indigo-800/50">
                <BarChart3 className="text-indigo-500" size={24} />
              </div>
              Interactive Data Visualization
            </li>
            <li className="flex items-center gap-5 font-bold text-slate-800 dark:text-slate-100 text-lg">
              <div className="bg-rose-100/50 dark:bg-rose-900/30 p-3 rounded-xl border border-rose-200/50 dark:border-rose-800/50">
                <Zap className="text-rose-500" size={24} />
              </div>
              Real-time State Management
            </li>
          </ul>
        </div>
        
        {/* Floating 100% Private Card */}
        <motion.div 
          animate={{ y: [0, -12, 0] }} 
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl p-10 md:p-12 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-700/50 shadow-2xl dark:shadow-none"
        >
          <h3 className="text-2xl font-black mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
            <Lock className="text-emerald-500" size={32} /> 100% Private
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed font-medium">
            Financial data is personal. Unlike other online calculators that track your inputs for targeted advertising, this entire application is engineered to run locally in your browser session.
          </p>
          <div className="flex items-center justify-center gap-3 text-sm font-black text-emerald-700 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-900/30 px-6 py-5 rounded-2xl border border-emerald-200/50 dark:border-emerald-800/50">
            <ShieldCheck size={22} /> Enterprise-Grade Privacy
          </div>
        </motion.div>
      </section>
      
    </motion.div>
  );
}