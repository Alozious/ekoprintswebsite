import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Machines } from './components/Machines';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AIConsultant } from './components/AIConsultant';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Portfolio />
        <Machines />
        <About />
        <Contact />
      </main>
      <Footer />
      <AIConsultant />
      <style>{`html { scroll-behavior: smooth; }`}</style>
    </div>
  );
};

export default App;
