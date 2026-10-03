"use client";

import React from "react";
import { soundEngine } from "./SoundEngine";
import { BMWRoundel, MBadge } from "./BMWLogo";
import {
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  PhoneCall,
  MapPin,
  Clock,
  Sparkles,
  Compass,
} from "lucide-react";

interface OwnershipSectionProps {
  onOpenTestDrive: () => void;
}

export function OwnershipSection({ onOpenTestDrive }: OwnershipSectionProps) {
  return (
    <footer id="ownership" className="py-24 px-6 md:px-12 bg-[#050608] border-t border-white/10 relative">
      <div className="max-w-[1360px] mx-auto">
        {/* Hero CTA Box */}
        <div className="glass-panel-elevated p-8 sm:p-14 rounded-3xl border border-white/15 relative overflow-hidden mb-16 text-center">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#0066b1]/15 blur-3xl pointer-events-none rounded-full" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-4">
              <MBadge className="h-4" />
              <span className="font-telemetry text-xs uppercase tracking-[0.25em] text-white/50">
                Exclusive Allocation
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-4">
              Make it yours.
            </h2>

            <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed mb-8">
              Experience the pinnacle of high-performance driving. Begin your customized build with the official BMW India configurator, request a private track test drive, or consult with a certified BMW M Client Advisor.
            </p>

            {/* Three Major Required Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* 1. Official Configurator */}
              <a
                href="https://www.bmw.in/en/configurator.html"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playClick()}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-white/90 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
              >
                <span>Configure Your M3</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </a>

              {/* 2. Book a Test Drive */}
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenTestDrive();
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/20 font-bold text-xs uppercase tracking-widest active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#0066b1]" />
                <span>Book a Test Drive</span>
              </button>

              {/* 3. Contact BMW */}
              <a
                href="tel:18001022269"
                onClick={() => soundEngine.playClick()}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent hover:bg-white/[0.05] text-white/80 hover:text-white border border-white/10 font-medium text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-white/60" />
                <span>Contact BMW</span>
              </a>
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-[11px] text-white/40">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                BMW India CBU Warranty & Roadside Assistance
              </span>
              <span>·</span>
              <span className="font-telemetry">Toll Free: 1800 102 2269</span>
            </div>
          </div>
        </div>

        {/* Ownership Guarantees & Warranty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <ShieldCheck className="w-6 h-6 text-[#0066b1] mb-3" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
              BMW Warranty Package
            </h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Standard 2-year unlimited mileage manufacturer warranty, extendable up to 5 years via BMW Extended Warranty. 12-year anti-corrosion body guarantee.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <Sparkles className="w-6 h-6 text-[#0066b1] mb-3" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
              BMW Service Inclusive
            </h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Customizable service plans starting from 3-year / 40,000 km covering scheduled maintenance, original BMW M synthetic fluids, spark plugs, and brake fluid.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <Compass className="w-6 h-6 text-[#0066b1] mb-3" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
              24/7 M Roadside Assistance
            </h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Dedicated nationwide concierge assistance across India, specialized towing for ultra-low M ground clearance, and replacement mobility solutions.
            </p>
          </div>
        </div>

        {/* Bottom Legal & Navigation Row */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/40">
          <div className="flex items-center gap-3">
            <BMWRoundel className="w-5 h-5" />
            <span className="font-telemetry uppercase tracking-wider text-white/60">
              BMW Group India · M High Performance Division
            </span>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p>
              Official Configurator:{" "}
              <a
                href="https://www.bmw.in/en/configurator.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white underline underline-offset-4"
              >
                bmw.in/en/configurator.html
              </a>
            </p>
            <p className="text-[10px] text-white/30">
              Indicative ex-showroom pricing starts at ₹1,53,00,000 for BMW M Competition line in India (CBU). Specifications subject to change without prior notice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
