"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { soundEngine } from "./SoundEngine";
import { Check, ArrowUpRight, Sparkles, Shield, Palette, Disc, Armchair } from "lucide-react";

interface ColorOption {
  id: string;
  name: string;
  code: string;
  hex: string;
  finish: "Metallic" | "Non-Metallic" | "Frozen Matte" | "BMW Individual";
  priceDiffINR: number;
}

const COLOR_OPTIONS: ColorOption[] = [
  { id: "iom-green", name: "Isle of Man Green", code: "C4G", hex: "#1e463a", finish: "Metallic", priceDiffINR: 0 },
  { id: "brooklyn-grey", name: "Brooklyn Grey", code: "C4P", hex: "#777c85", finish: "Metallic", priceDiffINR: 0 },
  { id: "toronto-red", name: "Toronto Red", code: "C3G", hex: "#a31c24", finish: "Metallic", priceDiffINR: 0 },
  { id: "sao-paulo-yellow", name: "Sao Paulo Yellow", code: "C4H", hex: "#d8e24c", finish: "Non-Metallic", priceDiffINR: 0 },
  { id: "dravit-grey", name: "Dravit Grey", code: "C36", hex: "#3a3c3e", finish: "BMW Individual", priceDiffINR: 240000 },
  { id: "black-sapphire", name: "Black Sapphire", code: "475", hex: "#111215", finish: "Metallic", priceDiffINR: 0 },
  { id: "frozen-white", name: "Frozen Brilliant White", code: "490", hex: "#e5e7eb", finish: "Frozen Matte", priceDiffINR: 390000 },
  { id: "tanzanite-blue", name: "Tanzanite Blue II", code: "C3Z", hex: "#152442", finish: "BMW Individual", priceDiffINR: 240000 },
];

interface WheelOption {
  id: string;
  name: string;
  size: string;
  priceDiffINR: number;
}

const WHEEL_OPTIONS: WheelOption[] = [
  { id: "826m-bicolour", name: "19\"/20\" M Forged Double-spoke 826 M Bicolour Black", size: "Front 275/35 R19 · Rear 285/30 R20", priceDiffINR: 0 },
  { id: "826m-black", name: "19\"/20\" M Forged Double-spoke 826 M Jet Black", size: "Front 275/35 R19 · Rear 285/30 R20", priceDiffINR: 35000 },
  { id: "825m-orbit", name: "19\"/20\" M Forged Double-spoke 825 M Orbit Grey", size: "Front 275/35 R19 · Rear 285/30 R20", priceDiffINR: 50000 },
];

interface UpholsteryOption {
  id: string;
  name: string;
  tone: string;
  priceDiffINR: number;
}

const UPHOLSTERY_OPTIONS: UpholsteryOption[] = [
  { id: "yas-marina", name: "Merino Leather Yas Marina Blue / Black with contrast stitching", tone: "#235b8c", priceDiffINR: 0 },
  { id: "kyalami-orange", name: "Merino Leather Kyalami Orange / Black", tone: "#bf5700", priceDiffINR: 0 },
  { id: "silverstone", name: "Merino Leather Silverstone / Black", tone: "#c8ccd0", priceDiffINR: 0 },
  { id: "black-merino", name: "Merino Leather Black", tone: "#1c1c1f", priceDiffINR: 0 },
];

export function InteractiveConfigurator() {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(COLOR_OPTIONS[0]);
  const [selectedWheel, setSelectedWheel] = useState<WheelOption>(WHEEL_OPTIONS[0]);
  const [selectedUpholstery, setSelectedUpholstery] = useState<UpholsteryOption>(UPHOLSTERY_OPTIONS[0]);

  // Option packages
  const [hasCarbonCeramic, setHasCarbonCeramic] = useState<boolean>(true);
  const [hasCarbonSeats, setHasCarbonSeats] = useState<boolean>(true);
  const [hasCarbonExterior, setHasCarbonExterior] = useState<boolean>(true);
  const [hasMDriversPkg, setHasMDriversPkg] = useState<boolean>(true);

  // Official BMW India base ex-showroom indicative price
  const basePriceINR = 15300000; // ₹1.53 Crore

  // Calculate total
  const optionsTotal =
    selectedColor.priceDiffINR +
    selectedWheel.priceDiffINR +
    selectedUpholstery.priceDiffINR +
    (hasCarbonCeramic ? 1450000 : 0) +
    (hasCarbonSeats ? 580000 : 0) +
    (hasCarbonExterior ? 720000 : 0) +
    (hasMDriversPkg ? 320000 : 0);

  const totalPrice = basePriceINR + optionsTotal;

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleSendToConfigurator = () => {
    soundEngine.playClick();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#0066b1", "#0c2340", "#e7222e", "#ffffff"],
    });

    window.open("https://www.bmw.in/en/configurator.html", "_blank", "noopener,noreferrer");
  };

  return (
    <section id="configurator" className="py-24 px-6 md:px-12 bg-[#08090d] border-t border-white/10 relative">
      <div className="max-w-[1360px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#0066b1]" />
              <span className="font-telemetry text-xs uppercase tracking-[0.2em] text-[#0066b1] font-semibold">
                Bespoke Tailoring
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Configure Your M3.
            </h2>
            <p className="text-sm text-white/50 max-w-xl mt-2 font-light">
              Customize your BMW M3 Competition with verified factory specifications, paint finishes, forged wheels, and track-engineered M performance equipment.
            </p>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-white/10 text-right">
            <span className="block text-[11px] font-telemetry uppercase text-white/40">
              Estimated Ex-Showroom (India)
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white font-telemetry">
              {formatINR(totalPrice)}
            </span>
            <span className="block text-[10px] text-white/40 mt-0.5">
              Subject to local taxes, RTO, and official BMW dealer quote
            </span>
          </div>
        </div>

        {/* Configuration Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* 1. Exterior Color */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#0066b1]" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                    Exterior Paint
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-white/90 font-medium">
                    {selectedColor.name} ({selectedColor.code})
                  </span>
                  <span className="text-[11px] text-white/40 ml-2">
                    {selectedColor.finish} · {selectedColor.priceDiffINR === 0 ? "Standard" : formatINR(selectedColor.priceDiffINR)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedColor(c);
                    }}
                    className={`relative p-1.5 rounded-xl flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      selectedColor.id === c.id
                        ? "bg-white/15 ring-2 ring-[#0066b1] scale-105"
                        : "bg-white/[0.02] hover:bg-white/[0.08]"
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-full border border-white/30 shadow-inner flex items-center justify-center"
                      style={{ backgroundColor: c.hex }}
                    >
                      {selectedColor.id === c.id && <Check className="w-4 h-4 text-white drop-shadow" />}
                    </div>
                    <span className="text-[9px] text-center font-medium text-white/70 line-clamp-1 w-full">
                      {c.name.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Forged Wheels */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <Disc className="w-4 h-4 text-[#0066b1]" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                    Wheels & Tyres
                  </h3>
                </div>
                <span className="text-xs text-white/60">Staggered 19" / 20" Setup</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {WHEEL_OPTIONS.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedWheel(w);
                    }}
                    className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                      selectedWheel.id === w.id
                        ? "border-[#0066b1] bg-[#0066b1]/10 shadow-[0_0_15px_rgba(0,102,177,0.2)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <span className="block text-xs font-bold text-white mb-1">{w.name}</span>
                    <span className="block text-[10px] text-white/50 mb-2">{w.size}</span>
                    <span className="text-[11px] font-telemetry font-semibold text-[#0066b1]">
                      {w.priceDiffINR === 0 ? "Included" : `+ ${formatINR(w.priceDiffINR)}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Interior Upholstery */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <Armchair className="w-4 h-4 text-[#0066b1]" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                    Upholstery & Leather
                  </h3>
                </div>
                <span className="text-xs text-white/80">{selectedUpholstery.name.split(" ")[2] || "Merino"}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {UPHOLSTERY_OPTIONS.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedUpholstery(u);
                    }}
                    className={`p-3.5 rounded-xl flex items-center gap-3.5 border transition-all text-left cursor-pointer ${
                      selectedUpholstery.id === u.id
                        ? "border-[#0066b1] bg-[#0066b1]/10"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full border border-white/30 shrink-0"
                      style={{ backgroundColor: u.tone }}
                    />
                    <div className="flex-1">
                      <span className="block text-xs font-semibold text-white leading-tight">
                        {u.name}
                      </span>
                      <span className="text-[10px] text-white/40 font-telemetry">Standard Equipment</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. M Performance Equipment & Packages */}
            <div className="space-y-4">
              <div className="border-b border-white/10 pb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                  M Track Packages & Upgrades
                </h3>
                <span className="text-xs text-white/40">Authentic BMW M Options</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Carbon Ceramic */}
                <div
                  onClick={() => {
                    soundEngine.playClick();
                    setHasCarbonCeramic(!hasCarbonCeramic);
                  }}
                  className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    hasCarbonCeramic
                      ? "border-[#e7222e]/60 bg-[#e7222e]/10 shadow-[0_0_15px_rgba(231,34,46,0.15)]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}
                >
                  <div className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center border ${
                    hasCarbonCeramic ? "bg-[#e7222e] border-[#e7222e]" : "border-white/40"
                  }`}>
                    {hasCarbonCeramic && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">M Carbon Ceramic Brakes</span>
                    <span className="block text-[11px] text-white/50 leading-tight mt-0.5">
                      400mm front ceramic discs with gold calipers. Weight reduced by 14 kg.
                    </span>
                    <span className="block text-[11px] font-telemetry text-white/80 font-bold mt-1.5">
                      + ₹14,50,000
                    </span>
                  </div>
                </div>

                {/* Carbon Seats */}
                <div
                  onClick={() => {
                    soundEngine.playClick();
                    setHasCarbonSeats(!hasCarbonSeats);
                  }}
                  className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    hasCarbonSeats
                      ? "border-[#0066b1]/60 bg-[#0066b1]/10 shadow-[0_0_15px_rgba(0,102,177,0.15)]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}
                >
                  <div className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center border ${
                    hasCarbonSeats ? "bg-[#0066b1] border-[#0066b1]" : "border-white/40"
                  }`}>
                    {hasCarbonSeats && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">M Carbon Bucket Seats</span>
                    <span className="block text-[11px] text-white/50 leading-tight mt-0.5">
                      CFRP composite shell with illuminated M3 badge. 9.6 kg weight reduction.
                    </span>
                    <span className="block text-[11px] font-telemetry text-white/80 font-bold mt-1.5">
                      + ₹5,80,000
                    </span>
                  </div>
                </div>

                {/* Carbon Exterior */}
                <div
                  onClick={() => {
                    soundEngine.playClick();
                    setHasCarbonExterior(!hasCarbonExterior);
                  }}
                  className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    hasCarbonExterior
                      ? "border-white/40 bg-white/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}
                >
                  <div className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center border ${
                    hasCarbonExterior ? "bg-white text-black border-white" : "border-white/40"
                  }`}>
                    {hasCarbonExterior && <Check className="w-3 h-3" />}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">M Carbon Exterior Package</span>
                    <span className="block text-[11px] text-white/50 leading-tight mt-0.5">
                      Carbon mirror caps, carbon rear diffuser insert & carbon aerodynamic spoiler.
                    </span>
                    <span className="block text-[11px] font-telemetry text-white/80 font-bold mt-1.5">
                      + ₹7,20,000
                    </span>
                  </div>
                </div>

                {/* M Driver's Package */}
                <div
                  onClick={() => {
                    soundEngine.playClick();
                    setHasMDriversPkg(!hasMDriversPkg);
                  }}
                  className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    hasMDriversPkg
                      ? "border-white/40 bg-white/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}
                >
                  <div className={`w-4 h-4 mt-0.5 rounded flex items-center justify-center border ${
                    hasMDriversPkg ? "bg-white text-black border-white" : "border-white/40"
                  }`}>
                    {hasMDriversPkg && <Check className="w-3 h-3" />}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-white">M Driver's Package</span>
                    <span className="block text-[11px] text-white/50 leading-tight mt-0.5">
                      Top speed raised to 290 km/h + BMW M Driving Experience track voucher.
                    </span>
                    <span className="block text-[11px] font-telemetry text-white/80 font-bold mt-1.5">
                      + ₹3,20,000
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Summary Card */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="glass-panel-elevated p-6 rounded-2xl border border-white/15 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h4 className="text-base font-bold text-white">M3 Competition</h4>
                  <span className="text-[11px] font-telemetry text-white/50">M xDrive · G80</span>
                </div>
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedColor.hex }} />
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/60">Base Vehicle (CBU India)</span>
                  <span className="font-telemetry text-white">{formatINR(basePriceINR)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/60">Paint ({selectedColor.name})</span>
                  <span className="font-telemetry text-white">{selectedColor.priceDiffINR === 0 ? "Included" : formatINR(selectedColor.priceDiffINR)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/60">Wheels ({selectedWheel.name.split(" ")[2]})</span>
                  <span className="font-telemetry text-white">{selectedWheel.priceDiffINR === 0 ? "Included" : formatINR(selectedWheel.priceDiffINR)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/60">Bespoke Options Total</span>
                  <span className="font-telemetry text-[#0066b1] font-semibold">{formatINR(optionsTotal)}</span>
                </div>
              </div>

              {/* Total Price Box */}
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <span className="block text-[10px] uppercase font-telemetry tracking-wider text-white/40">
                  Total Ex-Showroom Estimate
                </span>
                <span className="text-2xl font-black text-white font-telemetry">
                  {formatINR(totalPrice)}
                </span>
                <span className="block text-[10px] text-white/40 mt-1">
                  Includes 3-Year / 40,000 km BMW Service Inclusive eligibility
                </span>
              </div>

              {/* Primary Action Button */}
              <button
                onClick={handleSendToConfigurator}
                className="w-full py-4 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-white/90 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(255,255,255,0.2)] cursor-pointer"
              >
                <span>Transmit to Official BMW Configurator</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-white/40 text-center leading-relaxed">
                Links directly to the official BMW India Configurator portal (bmw.in/en/configurator.html) for formal dealer order placement and bespoke paint individualization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
