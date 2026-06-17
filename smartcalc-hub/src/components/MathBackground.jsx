import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function MathBackground() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const symbols = ['∑', 'π', '∫', '∞', '∆', 'Ω', 'θ', '√', '≈', '≠', '±', 'μ', 'λ'];

  useEffect(() => {
    // Only run on the client side
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (windowSize.width === 0) return null;

  return (
    // FIXED: Changed z-[-1] to z-0 so it doesn't hide behind the root document
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* Base Background Color */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 transition-colors duration-500"></div>
      
      {/* High-Visibility Modern Mesh Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-indigo-300/40 via-transparent to-transparent dark:from-indigo-900/40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-300/30 via-transparent to-transparent dark:from-emerald-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-rose-200/40 via-transparent to-transparent dark:from-rose-900/20"></div>
      
      {/* Floating Math Symbols (Larger and Higher Opacity) */}
      {[...Array(25)].map((_, i) => {
        const randomX = Math.random() * windowSize.width;
        const randomDelay = Math.random() * 10;
        const randomDuration = 15 + Math.random() * 20;
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Randomly assign sizes so it feels deep and layered
        const fontSize = Math.random() > 0.5 ? 'text-4xl' : 'text-6xl'; 

        return (
          <motion.div
            key={i}
            initial={{ y: windowSize.height + 100, x: randomX, opacity: 0 }}
            animate={{ 
              y: -150, 
              // INCREASED OPACITY: peaks at 30% instead of 10%
              opacity: [0, 0.3, 0.3, 0], 
              rotate: 360 
            }}
            transition={{
              duration: randomDuration,
              repeat: Infinity,
              delay: randomDelay,
              ease: "linear"
            }}
            className={`absolute ${fontSize} font-bold text-indigo-500/30 dark:text-indigo-400/20 select-none`}
          >
            {symbol}
          </motion.div>
        );
      })}
    </div>
  );
}