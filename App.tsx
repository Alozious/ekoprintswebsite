import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Portfolio } from './components/Portfolio';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { AIConsultant } from './components/AIConsultant';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-pink-500 selection:text-white">
      <Header 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        onOpenQuote={() => setIsQuoteOpen(true)}
      />
      <main className="flex-grow">
        <Hero onOpenQuote={() => setIsQuoteOpen(true)} />
        <Services onOpenQuote={() => setIsQuoteOpen(true)} />
        <WhyChooseUs />
        <Portfolio />
      </main>
      <Footer onOpenQuote={() => setIsQuoteOpen(true)} />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      <AIConsultant />
      <style>{`html { scroll-behavior: smooth; }`}</style>
    </div>
  );
};

export default App;
