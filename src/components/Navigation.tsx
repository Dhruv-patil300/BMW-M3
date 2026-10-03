"use client";

import React, { useState, useEffect } from "react";
import { BMWRoundel, MBadge } from "./BMWLogo";
import { soundEngine } from "./SoundEngine";
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from "lucide-react";

interface NavigationProps {
  onOpenTestDrive: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export function Navigation({ onOpenTestDrive, onNavigateSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const active = soundEngine.toggleSound();
    setIsMuted(!active);
  };

  const navLinks = [
    { name: "Overview", id: "overview" },
    { name: "Launch", id: "launch-control" },
    { name: "Dynamics", id: "performance" },
    { name: "Acoustics", id: "acoustic" },
    { name: "Specs", id: "specifications" },
    { name: "Heritage", id: "heritage" },
  ];

  const handleLinkClick = (id: string) => {
    soundEngine.playClick();
    setMobileMenuOpen(false);
    onNavigateSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 select-none ${
        isScrolled
          ? "bg-[#050608]/75 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Left: BMW M3 Competition branding */}
        <div
          onClick={() => handleLinkClick("overview")}
          className="flex items-center gap-3 shrink-0 mr-4 sm:mr-8 cursor-pointer group"
        >
          <BMWRoundel className="w-6 h-6 transition-transform duration-500 group-hover:rotate-45 shrink-0" />
          <div className="flex items-center gap-2">
            <span className="text-[13px] tracking-[0.18em] uppercase font-bold text-white transition-colors duration-300">
              BMW
            </span>
            <span className="text-white/20 text-xs">|</span>
            <div className="flex items-center gap-1.5">
              <MBadge className="h-3.5" />
              <span className="hidden sm:inline text-[12px] tracking-[0.18em] font-light uppercase text-white/90">
                Competition
              </span>
            </div>
          </div>
        </div>

        {/* Center: Minimal Section Links */}
        <nav className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="text-[10px] xl:text-[11px] uppercase tracking-[0.14em] xl:tracking-[0.16em] font-medium text-white/60 hover:text-white transition-colors duration-300 relative py-1 group cursor-pointer"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#0066b1] transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_8px_#0066b1]" />
            </button>
          ))}
        </nav>

        {/* Right: Sound Toggle + Configure + Test Drive */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* M Sound Experience Toggle */}
          <button
            onClick={handleSoundToggle}
            title={isMuted ? "Activate S58 TwinPower M Sound" : "Mute Sound"}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-full border border-white/10 hover:border-white/25 bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-300 group cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-white/50 group-hover:text-white" />
            ) : (
              <div className="flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-[#0066b1]" />
                <span className="flex gap-0.5 items-end h-2.5">
                  <span className="w-0.5 bg-[#0066b1] h-1.5 animate-pulse" />
                  <span className="w-0.5 bg-[#0066b1] h-2.5 animate-pulse delay-75" />
                  <span className="w-0.5 bg-[#0066b1] h-1 animate-pulse delay-150" />
                </span>
              </div>
            )}
            <span className="hidden sm:inline text-[9px] uppercase tracking-[0.15em] text-white/60 group-hover:text-white">
              {isMuted ? "Sound Off" : "M Audio"}
            </span>
          </button>

          {/* Official BMW India Configurator */}
          <a
            href="https://www.bmw.in/en/configurator.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playClick()}
            className="hidden sm:inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-white/80 hover:text-white px-3.5 py-1.5 rounded-full border border-white/15 hover:border-white/40 hover:bg-white/[0.06] transition-all duration-300"
          >
            <span>Configure</span>
            <ArrowUpRight className="w-3 h-3 text-white/40" />
          </a>

          {/* Book a Test Drive CTA */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenTestDrive();
            }}
            className="relative group overflow-hidden px-4 py-1.5 rounded-full bg-white text-black text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95 cursor-pointer"
          >
            <span className="relative z-10">Book a Test Drive</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0066b1] via-[#0c2340] to-[#e7222e] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute inset-0 flex items-center justify-center text-white text-[11px] font-semibold uppercase tracking-[0.15em] opacity-0 group-hover:opacity-100 z-10 transition-opacity duration-300">
              Book a Test Drive
            </span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/70 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[100%] bg-[#050608]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-8 flex flex-col gap-5 animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="text-left text-sm tracking-[0.2em] uppercase text-white/80 hover:text-white py-1 cursor-pointer"
            >
              {link.name}
            </button>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href="https://www.bmw.in/en/configurator.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-xs tracking-widest uppercase text-white/90 py-2"
            >
              <span>Official Configurator</span>
              <ArrowUpRight className="w-4 h-4 text-white/50" />
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTestDrive();
              }}
              className="w-full py-3 rounded-full bg-white text-black font-semibold text-xs tracking-widest uppercase text-center"
            >
              Book a Test Drive
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
