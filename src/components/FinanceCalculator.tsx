"use client";

import React, { useState } from "react";
import { soundEngine } from "./SoundEngine";
import { Calculator, ShieldCheck, ArrowRight, HelpCircle, Sparkles } from "lucide-react";

export function FinanceCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState<number>(15300000); // ₹1.53 Crore ex-showroom
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(25); // 25% default
  const [tenureMonths, setTenureMonths] = useState<number>(48); // 48 months default
  const [interestRate, setInterestRate] = useState<number>(8.75); // 8.75% p.a.
  const [planType, setPlanType] = useState<"BMW_360" | "STANDARD">("BMW_360");

  const downPaymentAmount = Math.round((vehiclePrice * downPaymentPercent) / 100);
  const loanPrincipal = vehiclePrice - downPaymentAmount;

  // Monthly interest rate
  const monthlyRate = interestRate / 12 / 100;

  // BMW 360 balloon payment is 35% residual value at end of tenure
  const balloonAmount = planType === "BMW_360" ? Math.round(vehiclePrice * 0.35) : 0;
  const amortizedPrincipal = loanPrincipal - balloonAmount;

  // Standard EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyEMI = Math.round(
    (amortizedPrincipal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1) +
      (balloonAmount * monthlyRate)
  );

  const totalPayment = monthlyEMI * tenureMonths + downPaymentAmount + balloonAmount;
  const totalInterest = totalPayment - vehiclePrice;

  const formatINR = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="finance" className="py-24 px-6 md:px-12 bg-[#050608] border-t border-white/10 relative">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#0066b1]" />
              <span className="font-telemetry text-xs uppercase tracking-[0.2em] text-[#0066b1] font-semibold">
                BMW Financial Services India
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              EMI & Ownership Calculator.
            </h2>
            <p className="text-sm text-white/50 max-w-xl mt-2 font-light">
              Tailor a bespoke financing structure for your BMW M3 Competition. Compare standard loan amortization against the flexible BMW 360° Plan with guaranteed buyback value.
            </p>
          </div>

          {/* Plan Switcher */}
          <div className="flex items-center gap-2 glass-panel p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => {
                soundEngine.playClick();
                setPlanType("BMW_360");
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold font-telemetry uppercase tracking-wider transition-all cursor-pointer ${
                planType === "BMW_360"
                  ? "bg-white text-black shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              BMW 360° Plan
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setPlanType("STANDARD");
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold font-telemetry uppercase tracking-wider transition-all cursor-pointer ${
                planType === "STANDARD"
                  ? "bg-white text-black shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Standard Loan
            </button>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sliders Column */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-white/10 space-y-8">
            {/* 1. Down Payment */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-white">
                  Down Payment ({downPaymentPercent}%)
                </label>
                <span className="font-telemetry text-sm font-bold text-white">
                  {formatINR(downPaymentAmount)}
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="50"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-[#0066b1] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-telemetry text-white/40 mt-1">
                <span>Min: 15% ({formatINR(vehiclePrice * 0.15)})</span>
                <span>Max: 50% ({formatINR(vehiclePrice * 0.5)})</span>
              </div>
            </div>

            {/* 2. Tenure Months */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-white mb-3">
                Loan Tenure
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[36, 48, 60].map((months) => (
                  <button
                    key={months}
                    onClick={() => {
                      soundEngine.playClick();
                      setTenureMonths(months);
                    }}
                    className={`py-3 rounded-xl text-xs font-bold font-telemetry tracking-wider transition-all cursor-pointer ${
                      tenureMonths === months
                        ? "bg-[#0066b1] text-white shadow-lg shadow-[#0066b1]/30"
                        : "bg-white/[0.03] text-white/60 hover:text-white border border-white/5"
                    }`}
                  >
                    {months} Months ({months / 12} Yrs)
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-white">
                  Interest Rate (% p.a.)
                </label>
                <span className="font-telemetry text-sm font-bold text-white">
                  {interestRate}% p.a.
                </span>
              </div>
              <input
                type="range"
                min="7.5"
                max="12.0"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-[#0066b1] cursor-pointer"
              />
              <span className="text-[10px] text-white/40 block mt-1">
                Standard BMW Financial Services India indicative interest rate.
              </span>
            </div>

            {/* Plan Note */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/60 leading-relaxed">
              {planType === "BMW_360" ? (
                <span>
                  <strong>BMW 360° Advantage:</strong> Low monthly repayments with an assured buyback value of 35% ({formatINR(balloonAmount)}) at the end of {tenureMonths} months. Option to trade in, refinance, or retain.
                </span>
              ) : (
                <span>
                  <strong>Standard Amortization:</strong> Full ownership loan with equal monthly installments repaying 100% of the vehicle balance with zero residual balloon payment.
                </span>
              )}
            </div>
          </div>

          {/* Breakdown Card */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="glass-panel-elevated p-8 rounded-3xl border border-white/15 space-y-6">
              <div>
                <span className="text-[10px] font-telemetry uppercase tracking-wider text-white/40 block mb-1">
                  Estimated Repayment
                </span>
                <span className="text-3xl sm:text-4xl font-black font-telemetry text-white">
                  {formatINR(monthlyEMI)}
                  <span className="text-sm font-normal text-white/50"> / month</span>
                </span>
              </div>

              <div className="space-y-3 text-xs border-y border-white/10 py-4">
                <div className="flex justify-between">
                  <span className="text-white/60">Ex-Showroom Price</span>
                  <span className="font-telemetry text-white">{formatINR(vehiclePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Down Payment ({downPaymentPercent}%)</span>
                  <span className="font-telemetry text-white">{formatINR(downPaymentAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Loan Principal</span>
                  <span className="font-telemetry text-white">{formatINR(loanPrincipal)}</span>
                </div>
                {planType === "BMW_360" && (
                  <div className="flex justify-between text-[#0066b1]">
                    <span>Assured Buyback (Balloon)</span>
                    <span className="font-telemetry font-bold">{formatINR(balloonAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-white/60">Estimated Total Interest</span>
                  <span className="font-telemetry text-white/80">{formatINR(totalInterest)}</span>
                </div>
              </div>

              <a
                href="https://www.bmw.in/en/configurator.html"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playClick()}
                className="w-full py-4 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-white/90 transition-all flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(255,255,255,0.15)]"
              >
                <span>Apply via BMW India Financing</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-[10px] text-white/40 text-center leading-relaxed">
                Calculations are indicative. Road tax, insurance, registration charges, and official BMW dealer delivery costs apply additionally as per state jurisdiction in India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
