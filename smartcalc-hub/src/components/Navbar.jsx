// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Home, Users, Landmark, Receipt, Sun, Moon } from 'lucide-react';

// export default function Navbar() {
//   const location = useLocation();
  
//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     if (typeof window !== 'undefined') {
//       return localStorage.getItem('theme') === 'dark';
//     }
//     return false;
//   });

//   useEffect(() => {
//     const root = window.document.documentElement;
//     if (isDarkMode) {
//       root.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       root.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [isDarkMode]);

//   const navItems = [
//     { path: '/', label: 'Home', icon: Home },
//     { path: '/split', label: 'Split Bill', icon: Users },
//     { path: '/emi', label: 'EMI Calc', icon: Landmark },
//     { path: '/gst', label: 'GST / Tax', icon: Receipt },
//   ];

//   return (
//     <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 transition-colors">
//       <div className="container mx-auto px-4 max-w-5xl h-16 flex items-center justify-between">
//         <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-indigo-600 dark:text-indigo-400">
//           <span>SmartCalc Hub</span>
//         </div>

//         <div className="flex items-center gap-4">
//           <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg transition-colors">
//             {navItems.map(({ path, label, icon: Icon }) => {
//               const isActive = location.pathname === path;
//               return (
//                 <Link
//                   key={path}
//                   to={path}
//                   className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
//                     isActive 
//                       ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' 
//                       : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
//                   }`}
//                 >
//                   <Icon size={16} />
//                   <span className="hidden sm:inline">{label}</span>
//                 </Link>
//               );
//             })}
//           </div>

//           <button
//             onClick={() => setIsDarkMode(!isDarkMode)}
//             className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors focus:outline-none"
//           >
//             {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Landmark, Receipt, Sun, Moon, Calculator, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/split', label: 'Split', icon: Users },
    { path: '/emi', label: 'EMI', icon: Landmark },
    { path: '/gst', label: 'GST', icon: Receipt },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="fixed top-6 left-1/2 z-50 flex items-center justify-between gap-2 sm:gap-4 px-4 py-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-full w-[92%] max-w-3xl transition-colors duration-500"
    >
      {/* Brand Logo */}
      <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-indigo-600 dark:text-indigo-400 pl-2">
        <Calculator size={20} />
        <span className="hidden md:inline">SmartCalc</span>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-1 sm:gap-2 bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-full">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                isActive 
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm transform scale-105' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          );
        })}
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="p-2.5 rounded-full bg-slate-100/50 dark:bg-slate-800/50 text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </motion.nav>
  );
}