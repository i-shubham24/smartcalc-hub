import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function MathBackground() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const symbols = ['∑', 'π', '∫', '∞', '∆', 'Ω', 'θ', '√', '≈', '≠', '±', 'μ', 'λ'];

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (windowSize.width === 0) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base Background Color */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 transition-colors duration-500"></div>
      
      {/* High-Visibility Modern Mesh Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-indigo-300/40 via-transparent to-transparent dark:from-indigo-900/40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-300/30 via-transparent to-transparent dark:from-emerald-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-rose-200/40 via-transparent to-transparent dark:from-rose-900/20"></div>
      
      {/* Floating Math Symbols (Instantly all over the screen) */}
      {[...Array(35)].map((_, i) => {
        const randomX = Math.random() * windowSize.width;
        const randomY = Math.random() * windowSize.height; // Starts across the entire Y axis now!
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const fontSize = Math.random() > 0.5 ? 'text-4xl' : 'text-6xl'; 
        const duration = 10 + Math.random() * 20;

        return (
          <motion.div
            key={i}
            initial={{ x: randomX, y: randomY, opacity: 0 }}
            animate={{ 
              y: [randomY, randomY - 80, randomY], // Floats gently up and down
              x: [randomX, randomX + 40, randomX], // Floats gently left and right
              opacity: [0.1, 0.4, 0.1], // Pulses in and out
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "linear"
            }}
            className={`absolute ${fontSize} font-bold text-indigo-500/40 dark:text-indigo-400/20 select-none`}
          >
            {symbol}
          </motion.div>
        );
      })}
    </div>
  );
}