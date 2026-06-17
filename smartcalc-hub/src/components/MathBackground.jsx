import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function MathBackground() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const symbols = ['∑', 'π', '∫', '∞', '∆', 'Ω', 'θ', '√', '≈', '≠'];

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (windowSize.width === 0) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* FIXED: Deep dark mode background with a radial glow */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/40 via-slate-50 to-emerald-100/20 dark:from-indigo-900/10 dark:via-slate-950 dark:to-emerald-900/5"></div>
      </div>
      
      {/* Floating Math Symbols */}
      {[...Array(20)].map((_, i) => {
        const randomX = Math.random() * windowSize.width;
        const randomDelay = Math.random() * 10;
        const randomDuration = 15 + Math.random() * 20;
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];

        return (
          <motion.div
            key={i}
            initial={{ y: windowSize.height + 50, x: randomX, opacity: 0 }}
            animate={{ 
              y: -100, 
              opacity: [0, 0.15, 0.15, 0],
              rotate: 360 
            }}
            transition={{
              duration: randomDuration,
              repeat: Infinity,
              delay: randomDelay,
              ease: "linear"
            }}
            className="absolute text-3xl font-light text-indigo-900/10 dark:text-indigo-100/10 select-none"
          >
            {symbol}
          </motion.div>
        );
      })}
    </div>
  );
}