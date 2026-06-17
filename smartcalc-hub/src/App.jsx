import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MathBackground from './components/MathBackground';
import Dashboard from './pages/Dashboard';
import SplitBill from './pages/SplitBill';
import EmiCalc from './pages/EmiCalc';
import GstCalc from './pages/GstCalc';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans relative text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <MathBackground />
        <Navbar />
<main className="flex-grow container mx-auto px-4 pt-32 pb-16 max-w-6xl relative z-10">          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/split" element={<SplitBill />} />
            <Route path="/emi" element={<EmiCalc />} />
            <Route path="/gst" element={<GstCalc />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;