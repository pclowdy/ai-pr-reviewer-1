import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="analysis" className="bg-black py-28 md:py-40 px-6 overflow-hidden relative flex justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none" />
      
      <div className="max-w-6xl w-full relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="flex justify-between items-end mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight">
            How we review
          </h2>
          <div className="hidden md:block text-white/40 text-sm uppercase tracking-widest">
            Analysis Vectors
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="liquid-glass bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden group flex flex-col"
          >
            <div className="relative aspect-video overflow-hidden">
              <video
                ref={(v) => { if(v) { v.defaultMuted = true; v.muted = true; v.playsInline = true; } }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
                muted
                autoPlay
                loop
                playsInline
                preload="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
            
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <span className="uppercase tracking-widest text-white/40 text-xs">
                  Code Quality
                </span>
                <div className="liquid-glass bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-2 transition-transform duration-300 group-hover:rotate-180">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight mt-auto">
                Readability & Maintainability
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                We dig deep into variable naming, complexity, and coding standards to surface optimizations that drive clean architecture.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="liquid-glass bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden group flex flex-col"
          >
            <div className="relative aspect-video overflow-hidden">
              <video
                ref={(v) => { if(v) { v.defaultMuted = true; v.muted = true; v.playsInline = true; } }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4"
                muted
                autoPlay
                loop
                playsInline
                preload="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
            
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <span className="uppercase tracking-widest text-white/40 text-xs">
                  Security Risk
                </span>
                <div className="liquid-glass bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-2 transition-transform duration-300 group-hover:rotate-180">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight mt-auto">
                Vulnerability Detection
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                We obsess over edge cases and data sanitization protocols to deliver code patches that are secure before they merge.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
