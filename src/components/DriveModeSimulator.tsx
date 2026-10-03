"use client";

import React, { useState } from "react";
import { soundEngine } from "./SoundEngine";
import { Gauge, ShieldAlert, Cpu, Flame, Activity, Zap } from "lucide-react";

type DrivetrainMode = "4WD" | "4WD_SPORT" | "2WD";
type SettingLevel = "EFFICIENT" | "SPORT" | "SPORT_PLUS";
type SimpleSetting = "COMFORT" | "SPORT";

export function DriveModeSimulator() {
  const [drivetrain, setDrivetrain] = useState<DrivetrainMode>("4WD_SPORT");
  const [engine, setEngine] = useState<SettingLevel>("SPORT_PLUS");
  const [chassis, setChassis] = useState<SettingLevel>("SPORT");
  const [steering, setSteering] = useState<SimpleSetting>("SPORT");
  const [brakes, setBrakes] = useState<SimpleSetting>("SPORT");
  const [exhaustFlaps, setExhaustFlaps] = useState<boolean>(true);
  const [tractionStage, setTractionStage] = useState<number>(4);

  const getFrontRearSplit = () => {
    switch (drivetrain) {
      case "4WD":
        return { front: 40, rear: 60, label: "All-Weather Maximum Grip" };
      case "4WD_SPORT":
        return { front: 20, rear: 80, label: "Dynamic Rear-Biased Track Agility" };
      case "2WD":
        return { front: 0, rear: 100, label: "Pure Rear-Wheel Drift (DSC Disengaged)" };
    }
  };

  const split = getFrontRearSplit();

  return (
    <section id="performance" className="py-24 px-6 md:px-12 bg-[#050608] border-t border-white/10 relative">
      <div className="max-w-[1360px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#e7222e]" />
              <span className="font-telemetry text-xs uppercase tracking-[0.2em] text-[#e7222e] font-semibold">
                M Dynamic Setup
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Tailored Dynamics.
            </h2>
            <p className="text-sm text-white/50 max-w-xl mt-2 font-light">
              Experience the dual personality of the BMW M3 Competition. Configure engine aggression, active damping, steering response, brake feel, and the variable M xDrive torque distribution in real time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-telemetry uppercase text-white/40">Active Preset:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setDrivetrain("4WD_SPORT");
                  setEngine("SPORT_PLUS");
                  setChassis("SPORT");
                  setSteering("SPORT");
                  setBrakes("SPORT");
                  setExhaustFlaps(true);
                }}
                className="px-3 py-1 rounded bg-[#e7222e]/20 border border-[#e7222e]/40 text-[#e7222e] text-xs font-bold font-telemetry hover:bg-[#e7222e] hover:text-white transition-all cursor-pointer"
              >
                M1 / TRACK
              </button>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setDrivetrain("2WD");
                  setEngine("SPORT_PLUS");
                  setChassis("SPORT_PLUS");
                  setSteering("SPORT");
                  setBrakes("SPORT");
                  setExhaustFlaps(true);
                }}
                className="px-3 py-1 rounded bg-[#0066b1]/20 border border-[#0066b1]/40 text-[#0066b1] text-xs font-bold font-telemetry hover:bg-[#0066b1] hover:text-white transition-all cursor-pointer"
              >
                M2 / DRIFT
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Telemetry Visualizer Card */}
          <div className="lg:col-span-6 glass-panel-elevated p-8 rounded-2xl border border-white/10 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#0066b1]" />
                <span className="text-xs font-telemetry uppercase text-white/60 tracking-wider">
                  M xDrive Torque Vectoring
                </span>
              </div>
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-telemetry ${
                drivetrain === "2WD" ? "bg-[#e7222e]/20 text-[#e7222e]" : "bg-[#0066b1]/20 text-[#0066b1]"
              }`}>
                {drivetrain} ACTIVE
              </span>
            </div>

            {/* Axle Split Visualization */}
            <div className="my-8 py-6 relative">
              <div className="text-center mb-6">
                <span className="text-sm font-semibold text-white/90">{split.label}</span>
              </div>

              {/* Chassis Diagram Wireframe */}
              <div className="relative w-48 h-64 mx-auto border border-white/20 rounded-3xl p-4 flex flex-col justify-between items-center bg-black/40">
                {/* Front Axle */}
                <div className="w-full flex items-center justify-between">
                  <div className="w-6 h-12 bg-white/20 rounded-md flex items-center justify-center">
                    <span className="text-[8px] font-telemetry rotate-90 text-white/60">FL</span>
                  </div>
                  <div className="flex-1 mx-3 flex flex-col items-center">
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0066b1] transition-all duration-500"
                        style={{ width: `${split.front}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-telemetry text-white/70 mt-1">
                      FRONT: {split.front}%
                    </span>
                  </div>
                  <div className="w-6 h-12 bg-white/20 rounded-md flex items-center justify-center">
                    <span className="text-[8px] font-telemetry rotate-90 text-white/60">FR</span>
                  </div>
                </div>

                {/* Central Prop Shaft & Active M Differential */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-1.5 h-16 bg-white/15" />
                  <div className="px-2 py-0.5 rounded bg-white/10 border border-white/20 text-[9px] font-telemetry text-white/80">
                    Active M Diff
                  </div>
                  <div className="w-1.5 h-8 bg-white/15" />
                </div>

                {/* Rear Axle */}
                <div className="w-full flex items-center justify-between">
                  <div className="w-7 h-14 bg-white/30 rounded-md flex items-center justify-center border border-white/30">
                    <span className="text-[8px] font-telemetry rotate-90 text-white font-bold">RL</span>
                  </div>
                  <div className="flex-1 mx-3 flex flex-col items-center">
                    <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#e7222e] transition-all duration-500"
                        style={{ width: `${split.rear}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-telemetry text-white font-bold mt-1">
                      REAR: {split.rear}%
                    </span>
                  </div>
                  <div className="w-7 h-14 bg-white/30 rounded-md flex items-center justify-center border border-white/30">
                    <span className="text-[8px] font-telemetry rotate-90 text-white font-bold">RR</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 10-Stage M Traction Control when in 2WD */}
            {drivetrain === "2WD" && (
              <div className="p-4 rounded-xl bg-[#e7222e]/10 border border-[#e7222e]/25">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-[#e7222e]" />
                    <span className="text-xs font-bold text-white uppercase">
                      10-Stage M Traction Control
                    </span>
                  </div>
                  <span className="text-xs font-telemetry font-bold text-[#e7222e]">
                    STAGE {tractionStage} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={tractionStage}
                  onChange={(e) => {
                    soundEngine.playClick();
                    setTractionStage(Number(e.target.value));
                  }}
                  className="w-full accent-[#e7222e] cursor-pointer"
                />
                <span className="text-[10px] text-white/50 block mt-1">
                  Adjust slip threshold for precise oversteer slip-angle regulation.
                </span>
              </div>
            )}
          </div>

          {/* Configuration Selector Toggles */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            {/* 1. M xDrive Drivetrain */}
            <div className="glass-panel p-5 rounded-xl border border-white/10">
              <span className="block text-xs font-telemetry uppercase text-white/50 mb-3 tracking-wider">
                Drivetrain Architecture
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(["4WD", "4WD_SPORT", "2WD"] as DrivetrainMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      soundEngine.playClick();
                      setDrivetrain(mode);
                    }}
                    className={`py-3 px-2 rounded-lg text-center text-xs font-bold tracking-wider font-telemetry transition-all cursor-pointer ${
                      drivetrain === mode
                        ? mode === "2WD"
                          ? "bg-[#e7222e] text-white shadow-lg shadow-[#e7222e]/30"
                          : "bg-white text-black shadow-lg"
                        : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {mode.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Engine Response */}
            <div className="glass-panel p-5 rounded-xl border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-telemetry uppercase text-white/50 tracking-wider">
                  Engine Throttle Mapping (S58 3.0L)
                </span>
                <Flame className={`w-3.5 h-3.5 ${engine === "SPORT_PLUS" ? "text-[#e7222e]" : "text-white/40"}`} />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(["EFFICIENT", "SPORT", "SPORT_PLUS"] as SettingLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      soundEngine.playClick();
                      setEngine(lvl);
                    }}
                    className={`py-2.5 px-2 rounded-lg text-center text-xs font-semibold tracking-wider font-telemetry transition-all cursor-pointer ${
                      engine === lvl
                        ? "bg-white text-black font-bold"
                        : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {lvl.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Adaptive M Suspension */}
            <div className="glass-panel p-5 rounded-xl border border-white/10">
              <span className="block text-xs font-telemetry uppercase text-white/50 mb-3 tracking-wider">
                Chassis Damper Stiffness
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(["COMFORT", "SPORT", "SPORT_PLUS"] as SettingLevel[]).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      soundEngine.playClick();
                      setChassis(lvl);
                    }}
                    className={`py-2.5 px-2 rounded-lg text-center text-xs font-semibold tracking-wider font-telemetry transition-all cursor-pointer ${
                      chassis === lvl
                        ? "bg-white text-black font-bold"
                        : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {lvl.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Steering & Brakes Dual Column */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-4 rounded-xl border border-white/10">
                <span className="block text-[11px] font-telemetry uppercase text-white/50 mb-2">
                  M Servotronic Steering
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {(["COMFORT", "SPORT"] as SimpleSetting[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        soundEngine.playClick();
                        setSteering(s);
                      }}
                      className={`py-2 text-[10px] font-bold rounded ${
                        steering === s ? "bg-white text-black" : "bg-white/[0.04] text-white/60"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-panel p-4 rounded-xl border border-white/10">
                <span className="block text-[11px] font-telemetry uppercase text-white/50 mb-2">
                  Brake Pedal Feel
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {(["COMFORT", "SPORT"] as SimpleSetting[]).map((b) => (
                    <button
                      key={b}
                      onClick={() => {
                        soundEngine.playClick();
                        setBrakes(b);
                      }}
                      className={`py-2 text-[10px] font-bold rounded ${
                        brakes === b ? "bg-white text-black" : "bg-white/[0.04] text-white/60"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. Exhaust Flap Toggle */}
            <div className="glass-panel p-4 rounded-xl border border-white/10 flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-white">M Sport Exhaust System Sound</span>
                <span className="text-[11px] text-white/50">Electronically regulated dual acoustic flaps</span>
              </div>
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setExhaustFlaps(!exhaustFlaps);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold font-telemetry transition-all cursor-pointer ${
                  exhaustFlaps
                    ? "bg-[#e7222e] text-white shadow-md shadow-[#e7222e]/40"
                    : "bg-white/10 text-white/60"
                }`}
              >
                {exhaustFlaps ? "SOUND: OPEN" : "SOUND: QUIET"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
