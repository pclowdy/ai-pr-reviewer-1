import React, { useRef, useEffect, useState } from 'react';
import { Globe, ArrowRight, Loader, X, Menu } from 'lucide-react';
import { marked } from 'marked';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeAnimationRef = useRef<number | null>(null);
  const [prUrl, setPrUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ 'Code Quality'?: string; 'Security'?: string; 'Codebase Integration'?: string } | null>(null);
  const [error, setError] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAnalyze = async () => {
    if (!prUrl) return;
    setLoading(true);
    setError('');
    setResults(null);
    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${backendUrl}/api/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pr_url: prUrl })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Failed to review.');
      setResults(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPrUrl('');
    setResults(null);
    setError('');
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Fix for in-app browsers and iOS Safari autoplay blocking
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const animateOpacity = (start: number, end: number, duration: number, callback?: () => void) => {
      if (fadeAnimationRef.current) cancelAnimationFrame(fadeAnimationRef.current);
      
      const startTime = performance.now();
      
      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        video.style.opacity = (start + (end - start) * progress).toString();
        
        if (progress < 1) {
          fadeAnimationRef.current = requestAnimationFrame(step);
        } else if (callback) {
          callback();
        }
      };
      
      fadeAnimationRef.current = requestAnimationFrame(step);
    };

    let hasFadedIn = false;
    const handleCanPlay = () => {
      video.play().catch(() => {}); // catch autoplay blocks silently
      if (hasFadedIn) return; // Prevent blinking from multiple canplay events
      hasFadedIn = true;
      animateOpacity(0, 1, 500);
    };

    const handleTimeUpdate = () => {
      // Safely check duration
      if (video.duration > 0 && video.duration - video.currentTime <= 0.55 && video.style.opacity === '1') {
        animateOpacity(1, 0, 500);
      }
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      hasFadedIn = false; // allow fade in again
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
        handleCanPlay();
      }, 100);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // If the video is already loaded (e.g. cached), the canplay event won't fire again.
    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      if (fadeAnimationRef.current) cancelAnimationFrame(fadeAnimationRef.current);
    };
  }, []);

  return (
    <section className="min-h-screen overflow-hidden relative flex flex-col bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-bottom"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
        muted
        autoPlay
        playsInline
        preload="auto"
        style={{ opacity: 0 }}
      />

      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 md:py-6">
        <div className="liquid-glass bg-black/40 backdrop-blur-md border border-white/10 rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between shadow-lg relative">
          <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Globe className="w-6 h-6 text-white mr-2 flex-shrink-0" />
            <span className="text-white font-semibold text-lg">AI Reviewer</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#mission" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Mission</a>
            <a href="#cli" className="text-white/80 hover:text-white text-sm font-medium transition-colors">CLI Details</a>
            <a href="#security" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Security</a>
            <a href="#analysis" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Analysis Vectors</a>
          </div>

          <button 
            className="md:hidden text-white/80 hover:text-white p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-4 right-4 mt-2 liquid-glass bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col gap-4 shadow-xl md:hidden animate-in fade-in slide-in-from-top-2">
            <a href="#mission" onClick={() => setIsMobileMenuOpen(false)} className="text-white/80 hover:text-white text-base font-medium transition-colors">Mission</a>
            <a href="#cli" onClick={() => setIsMobileMenuOpen(false)} className="text-white/80 hover:text-white text-base font-medium transition-colors">CLI Details</a>
            <a href="#security" onClick={() => setIsMobileMenuOpen(false)} className="text-white/80 hover:text-white text-base font-medium transition-colors">Security</a>
            <a href="#analysis" onClick={() => setIsMobileMenuOpen(false)} className="text-white/80 hover:text-white text-base font-medium transition-colors">Analysis Vectors</a>
          </div>
        )}
      </nav>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16 text-center mt-12 md:mt-16">
        <h1 className="text-7xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap font-serif mb-8" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Review it <em className="italic">all</em>.
        </h1>
        
        <div className="max-w-xl w-full mb-6">
          <div className="liquid-glass bg-black/40 backdrop-blur-md border border-white/10 rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
            <input 
              type="url" 
              placeholder="Enter GitHub PR URL" 
              value={prUrl}
              onChange={(e) => setPrUrl(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/40 text-base"
            />
            {results && (
              <button onClick={handleClear} className="text-white/40 hover:text-white transition-colors p-1 flex-shrink-0" title="Clear review">
                <X className="w-5 h-5" />
              </button>
            )}
            <button onClick={handleAnalyze} disabled={loading} className="bg-white rounded-full p-3 text-black hover:bg-white/90 transition-colors flex-shrink-0 disabled:opacity-50">
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
          {error && <div className="text-red-400 mt-2 text-sm">{error}</div>}
        </div>
        
        {!results && (
          <div className="text-white text-sm leading-relaxed px-4 max-w-2xl mb-8 opacity-80 text-left">
            <p className="mb-2"><strong>The Problem:</strong> Manual code reviews are time-consuming and often miss critical security or optimization flaws. Furthermore, existing AI tools rely heavily on rigid GitHub App integrations.</p>
            <p><strong>Our Solution:</strong> A modular tool built for your local terminal that instantly analyzes Pull Requests for Code Quality, Security Risks, and Codebase Integration.</p>
          </div>
        )}

        {results && (
          <div className="w-full max-w-5xl text-left grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-20 overflow-y-auto">
            <div className="liquid-glass rounded-2xl p-6 bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
              <h3 className="text-white text-3xl mb-4 border-b border-white/10 pb-3 tracking-wide" style={{ fontFamily: "'Instrument Serif', serif" }}><em className="italic">Code Quality</em></h3>
              <div className="text-sm opacity-90 leading-relaxed overflow-y-auto max-h-64 my-custom-markdown" dangerouslySetInnerHTML={{ __html: marked(results['Code Quality'] || '') }}></div>
            </div>
            <div className="liquid-glass rounded-2xl p-6 bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
              <h3 className="text-white text-3xl mb-4 border-b border-white/10 pb-3 tracking-wide" style={{ fontFamily: "'Instrument Serif', serif" }}><em className="italic">Security Risk</em></h3>
              <div className="text-sm opacity-90 leading-relaxed overflow-y-auto max-h-64 my-custom-markdown" dangerouslySetInnerHTML={{ __html: marked(results['Security'] || '') }}></div>
            </div>
            <div className="liquid-glass rounded-2xl p-6 bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl">
              <h3 className="text-white text-3xl mb-4 border-b border-white/10 pb-3 tracking-wide" style={{ fontFamily: "'Instrument Serif', serif" }}><em className="italic">Codebase Integration</em></h3>
              <div className="text-sm opacity-90 leading-relaxed overflow-y-auto max-h-64 my-custom-markdown" dangerouslySetInnerHTML={{ __html: marked(results['Codebase Integration'] || '') }}></div>
            </div>
          </div>
        )}
      </div>

    </section>
  );
}
