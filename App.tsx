import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AIConsultant } from './components/AIConsultant';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden selection:bg-eko-primary selection:text-eko-dark">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      <main className="flex-grow">
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Contact />
      </main>

      <Footer />
      
      {/* Floating AI Consultant */}
      <AIConsultant />

      {/* Global CSS for custom animations */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          background-color: #020408;
        }
      `}</style>
    </div>
  );
};

export default App;