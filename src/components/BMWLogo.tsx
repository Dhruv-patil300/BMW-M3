import React from "react";

export function BMWRoundel({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="BMW Logo"
    >
      {/* Outer chrome bezel */}
      <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2.5" className="text-white/40" />
      <circle cx="50" cy="50" r="46" fill="#050608" stroke="currentColor" strokeWidth="1" className="text-white/20" />
      
      {/* Inner quadrant border */}
      <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="1.5" className="text-white/60" />

      {/* Quadrants */}
      {/* Top Left: Blue */}
      <path
        d="M50 22 A28 28 0 0 0 22 50 L50 50 Z"
        fill="#0066b1"
      />
      {/* Top Right: White */}
      <path
        d="M50 22 A28 28 0 0 1 78 50 L50 50 Z"
        fill="#f0f2f5"
      />
      {/* Bottom Right: Blue */}
      <path
        d="M78 50 A28 28 0 0 1 50 78 L50 50 Z"
        fill="#0066b1"
      />
      {/* Bottom Left: White */}
      <path
        d="M50 78 A28 28 0 0 1 22 50 L50 50 Z"
        fill="#f0f2f5"
      />

      {/* Subtle chrome highlight ring */}
      <circle cx="50" cy="50" r="47" stroke="url(#roundelGlow)" strokeWidth="1" opacity="0.6" />
      <defs>
        <linearGradient id="roundelGlow" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="0.5" stopColor="#888888" stopOpacity="0.2" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function MBadge({ className = "h-4" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      {/* 3 M Stripes */}
      <div className="flex h-3.5 items-stretch -skew-x-12 gap-0.5">
        <span className="w-1.5 bg-[#0066b1] rounded-xs shadow-[0_0_8px_rgba(0,102,177,0.5)]" />
        <span className="w-1.5 bg-[#0c2340] rounded-xs" />
        <span className="w-1.5 bg-[#e7222e] rounded-xs shadow-[0_0_8px_rgba(231,34,46,0.5)]" />
      </div>
      {/* M Typography */}
      <span className="font-extrabold tracking-tighter text-sm text-white italic pl-0.5">M</span>
      <span className="text-[10px] tracking-widest uppercase font-semibold text-white/70 ml-0.5">3</span>
    </div>
  );
}
