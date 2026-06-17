import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import SplitBill from './pages/SplitBill';
import EmiCalc from './pages/EmiCalc';
import GstCalc from './pages/GstCalc';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-200">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
          <Routes>
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