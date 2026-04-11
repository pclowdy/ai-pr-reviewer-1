import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function FeaturedVideoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cli" className="bg-black pt-6 md:pt-10 pb-20 md:pb-32 px-6 overflow-hidden flex justify-center">
      <div className="max-w-6xl w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.9 }}
          className="rounded-3xl overflow-hidden relative min-h-[400px] md:min-h-0 md:aspect-video flex flex-col justify-end"
        >
            <video
              ref={(v) => { if(v) { v.defaultMuted = true; v.muted = true; v.playsInline = true; } }}
              className="absolute inset-0 w-full h-full object-cover"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            
            <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row justify-between items-end gap-6 w-full">
            <div className="liquid-glass bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 max-w-md w-full md:w-auto">
              <div className="text-white/50 text-xs tracking-widest uppercase mb-3">
                CLI-First Design
              </div>
              <p className="text-white text-sm md:text-base leading-relaxed">
                We believe in an unobtrusive developer experience. Your CLI tool triggers background AI evaluations seamlessly without ever leaving your IDE environment.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
