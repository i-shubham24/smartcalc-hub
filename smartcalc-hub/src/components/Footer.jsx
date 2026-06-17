import { Calculator, Globe, Mail } from 'lucide-react';

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative z-20 w-full mt-20">
      {/* Glassmorphic Background for the Footer */}
      <div className="bg-white/80 dark:bg-slate-900/90 backdrop-blur-2xl border-t border-slate-200/50 dark:border-slate-800/50 pt-16 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-10">

          {/* Left: Brand & Contact Info */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2 font-bold text-2xl tracking-tight text-indigo-600 dark:text-indigo-400 mb-1">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-xl">
                <Calculator size={24} />
              </div>
              <span>SmartCalc Hub</span>
            </div>
            <p className="font-bold text-slate-900 dark:text-slate-100">Shubhampreet Singh</p>
            <a 
              href="mailto:shubhamkaler24@gmail.com" 
              className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 transition-colors"
            >
              <Mail size={16} /> shubhamkaler24@gmail.com
            </a>
          </div>

          {/* Center: Social Links */}
          <div className="flex items-center gap-4">
            <a href="https://github.com/i-shubham24" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl transition-all shadow-sm hover:shadow-md" aria-label="GitHub">
              <GithubIcon size={22} />
            </a>
            <a href="https://www.linkedin.com/in/shubhampreet-singh-12584824a" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl transition-all shadow-sm hover:shadow-md" aria-label="LinkedIn">
              <LinkedinIcon size={22} />
            </a>
            <a href="https://portfolio-umber-eight-x9rmssh1y5.vercel.app/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-2xl transition-all shadow-sm hover:shadow-md" aria-label="Portfolio">
              <Globe size={22} />
            </a>
          </div>

          {/* Right: Mandatory Digital Heroes Button */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200"
            >
              Built for Digital Heroes
            </a>
          </div>

        </div>

        {/* Bottom Copyright Divider */}
        <div className="container mx-auto px-4 max-w-6xl mt-12 pt-8 border-t border-slate-200/50 dark:border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} SmartCalc Hub. All rights reserved.</p>
          <p>Designed & Developed by Shubhampreet Singh</p>
        </div>
      </div>
    </footer>
  );
}