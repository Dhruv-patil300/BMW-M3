"use client";

import React, { useState } from "react";
import { soundEngine } from "./SoundEngine";
import { X, CheckCircle, ArrowRight, Calendar, MapPin, User, Mail, Phone } from "lucide-react";
import confetti from "canvas-confetti";

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INDIAN_METROS = [
  { city: "Mumbai", dealers: "Infinity Cars / Navnit Motors (Worli / Andheri)" },
  { city: "Delhi NCR", dealers: "Bird Automotive / Deutsche Motoren (Gurugram / Connaught Place)" },
  { city: "Bengaluru", dealers: "Navnit Motors / KUN Exclusive (Lavelle Road / Electronic City)" },
  { city: "Hyderabad", dealers: "KUN Exclusive (Jubilee Hills)" },
  { city: "Chennai", dealers: "KUN Exclusive (OMR / Mount Road)" },
  { city: "Pune", dealers: "Bavaria Motors (Camp / Baner)" },
  { city: "Kolkata", dealers: "OSL Exclusive (AJC Bose Road)" },
  { city: "Ahmedabad", dealers: "Parsoli Motor Works (S.G. Highway)" },
];

export function TestDriveModal({ isOpen, onClose }: TestDriveModalProps) {
  const [selectedCity, setSelectedCity] = useState(INDIAN_METROS[0].city);
  const [experienceType, setExperienceType] = useState<"road" | "track">("track");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick();
    setSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#0066b1", "#0c2340", "#e7222e"],
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl glass-panel-elevated p-8 sm:p-10 rounded-3xl border border-white/20 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <span className="font-telemetry text-xs uppercase tracking-[0.2em] text-[#0066b1] font-semibold block mb-1">
                BMW M Concierge
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                Book Your M3 Test Drive
              </h3>
              <p className="text-xs text-white/60 font-light mt-1">
                Experience the 510 HP S58 TwinPower Turbo engine through our specialized dealership network in India.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Experience Type Toggle */}
              <div>
                <label className="block text-[11px] font-telemetry uppercase text-white/50 mb-2">
                  Preferred Experience
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setExperienceType("track");
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      experienceType === "track"
                        ? "bg-white text-black font-bold"
                        : "bg-white/[0.04] text-white/60 hover:text-white border border-white/5"
                    }`}
                  >
                    Track Dynamic Circuit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundEngine.playClick();
                      setExperienceType("road");
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      experienceType === "road"
                        ? "bg-white text-black font-bold"
                        : "bg-white/[0.04] text-white/60 hover:text-white border border-white/5"
                    }`}
                  >
                    City & Highway Route
                  </button>
                </div>
              </div>

              {/* Metro Location */}
              <div>
                <label className="block text-[11px] font-telemetry uppercase text-white/50 mb-1.5">
                  Select Dealership Metro
                </label>
                <div className="relative">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-[#12141a] border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#0066b1] appearance-none"
                  >
                    {INDIAN_METROS.map((m) => (
                      <option key={m.city} value={m.city}>
                        {m.city} — {m.dealers}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Personal details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-telemetry uppercase text-white/50 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Malhotra"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#0066b1]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-telemetry uppercase text-white/50 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#0066b1]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-telemetry uppercase text-white/50 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#0066b1]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-telemetry uppercase text-white/50 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#0066b1]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-white/90 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Confirm VIP Concierge Reservation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h4 className="text-2xl font-black uppercase text-white mb-2">
              Reservation Transmitted
            </h4>
            <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed mb-6">
              Thank you, <span className="text-white font-semibold">{fullName}</span>. A senior BMW M Client Advisor from your chosen dealership in <span className="text-white font-semibold">{selectedCity}</span> will contact you at <span className="text-white font-semibold">{phone}</span> to schedule the vehicle handover.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://www.bmw.in/en/configurator.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-white/90"
              >
                Official BMW India Portal
              </a>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
