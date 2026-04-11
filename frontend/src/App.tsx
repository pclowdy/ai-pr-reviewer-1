/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FeaturedVideoSection from './components/FeaturedVideoSection';
import PhilosophySection from './components/PhilosophySection';
import ServicesSection from './components/ServicesSection';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-white/30">
      <HeroSection />
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
      
      <footer className="bg-black py-12 px-4 border-t border-white/5 flex justify-center relative z-10">
        <div className="liquid-glass bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl md:rounded-full px-6 md:px-8 py-4 text-white/60 text-xs md:text-sm tracking-widest uppercase text-center flex flex-wrap justify-center items-center gap-2 max-w-full">
          <span>Developed by</span>
          <div className="flex flex-wrap justify-center items-center gap-2">
            <span className="text-white font-semibold">Sourish</span>
            <span className="text-white/40">,</span>
            <span className="text-white font-semibold">Rishika</span>
            <span className="text-white/40">,</span>
            <span className="text-white font-semibold">Harsha</span>
            <span className="text-white/40">&</span>
            <span className="text-white font-semibold">Abhiram</span>
          </div>
        </div>
      </footer>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 liquid-glass bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all shadow-2xl group animate-in fade-in slide-in-from-bottom-4 duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </div>
  );
}
