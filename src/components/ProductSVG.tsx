import React from 'react';

interface ProductSVGProps {
  type: string;
  className?: string;
}

export const ProductSVG: React.FC<ProductSVGProps> = ({ type, className = "w-full h-full object-contain" }) => {
  switch (type) {
    case 'gaming-laptop':
      return (
        <svg className={className} viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="laptopScreen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#080e15" />
              <stop offset="50%" stopColor="#0f192b" />
              <stop offset="100%" stopColor="#1e3a6a" />
            </linearGradient>
            <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Neon Grid Glow */}
          <rect x="25" y="15" width="150" height="90" rx="4" fill="url(#laptopScreen)" stroke="#0ea5e9" strokeWidth="2" />
          {/* Cyberpunk Grid Wallpaper */}
          <path d="M 50 15 L 100 105 M 150 15 L 100 105 M 25 50 L 175 50 M 25 80 L 175 80" stroke="#0284c7" strokeWidth="0.5" strokeOpacity="0.4" />
          {/* Predator Alien Emblem Logo */}
          <path d="M 100 40 L 95 48 L 100 56 L 105 48 Z M 95 48 L 92 56 L 98 56 Z M 105 48 L 108 56 L 102 56 Z" fill="#06b6d4" />
          <path d="M 97 59 L 103 59" stroke="#06b6d4" strokeWidth="1" />
          {/* Laptop Base */}
          <path d="M 12 105 L 188 105 L 198 120 L 2 120 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          {/* Trackpad */}
          <rect x="85" y="112" width="30" height="6" rx="1" fill="#0f172a" />
          {/* Keyboard RGB Glow */}
          <g opacity="0.8">
            <rect x="25" y="108" width="150" height="3" fill="#ef4444" />
            <rect x="45" y="108" width="110" height="3" fill="#06b6d4" />
          </g>
          {/* Base bottom pad lines */}
          <rect x="40" y="120" width="120" height="2" fill="#0f172a" />
        </svg>
      );

    case 'ps4-console':
      return (
        <svg className={className} viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="consoleGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="padGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>
          {/* Background Matrix lines & glow */}
          <circle cx="100" cy="75" r="50" fill="#3b82f6" fillOpacity="0.05" />
          {/* PS4 Console */}
          <g transform="translate(10, 15)">
            {/* Main parallelogram body of the console */}
            <path d="M 40 10 L 150 10 L 140 85 L 30 85 Z" fill="url(#consoleGrad)" stroke="#475569" strokeWidth="1.5" />
            {/* The signature diagonal groove line */}
            <path d="M 95 10 L 85 85" stroke="#000" strokeWidth="2" />
            {/* Glowing power LED strip (blue) */}
            <path d="M 96 10 L 91 50" stroke="#3b82f6" strokeWidth="1.5" />
            {/* Optical drive slot and USB slots */}
            <rect x="45" y="45" width="30" height="2" fill="#000" />
            <rect x="110" y="45" width="20" height="2" fill="#000" />
          </g>
          {/* Game Controller in the foreground */}
          <g transform="translate(90, 65)">
            {/* Controller Left and Right handles */}
            <path d="M 12 15 C 5 25 0 50 10 65 C 15 72 25 72 32 60 C 37 50 40 45 50 45 C 60 45 63 50 68 60 C 75 72 85 72 90 65 C 100 50 95 25 88 15 C 80 5 20 5 12 15 Z" fill="url(#padGrad)" stroke="#1e293b" strokeWidth="2" />
            {/* Touchpad */}
            <path d="M 35 12 L 65 12 C 65 24 35 24 35 12 Z" fill="#0f172a" stroke="#475569" strokeWidth="1" />
            {/* Light Bar glow (blue) */}
            <path d="M 40 12 L 60 12" stroke="#3b82f6" strokeWidth="2.5" />
            {/* D-Pad */}
            <path d="M 22 24 V 34 H 18 V 28 H 12 V 24 H 18 V 18 H 22 V 24 Z" fill="#0f172a" />
            {/* Action Buttons */}
            <g transform="translate(75, 23)">
              <circle cx="0" cy="0" r="3.5" fill="#0f172a" />
              <circle cx="-6" cy="-6" r="2.5" fill="#ef4444" /> {/* Circle */}
              <circle cx="6" cy="-6" r="2.5" fill="#3b82f6" /> {/* Cross */}
              <circle cx="0" cy="-12" r="2.5" fill="#10b981" /> {/* Triangle */}
            </g>
            {/* Analogue Sticks */}
            <circle cx="38" cy="40" r="10" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
            <circle cx="38" cy="40" r="7" fill="#334155" />
            <circle cx="62" cy="40" r="10" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
            <circle cx="62" cy="40" r="7" fill="#334155" />
          </g>
        </svg>
      );

    case 'baby-monitor':
      return (
        <svg className={className} viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="monitorScreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#bae6fd" />
            </linearGradient>
            <linearGradient id="casing" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f1f5f9" />
            </linearGradient>
          </defs>
          {/* Baby Monitor Receiver Screen Unit */}
          <g transform="translate(15, 25)">
            <rect width="90" height="90" rx="12" fill="url(#casing)" stroke="#cbd5e1" strokeWidth="2.5" />
            {/* Screen border */}
            <rect x="8" y="8" width="74" height="52" rx="4" fill="#64748b" />
            {/* Active Display */}
            <rect x="11" y="11" width="68" height="46" rx="2" fill="url(#monitorScreen)" />
            {/* Stylized vector representation of sleeping baby */}
            <path d="M 25 38 C 28 44, 45 44, 48 38" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" fill="none" /> {/* Baby body blanket curve */}
            <circle cx="37" cy="28" r="7" fill="#fbcfe8" /> {/* Baby head */}
            <path d="M 33 28 C 34 30, 36 30, 37 28" stroke="#db2777" strokeWidth="1" fill="none" /> {/* sleeping eyes */}
            <rect x="11" y="11" width="20" height="10" fill="#22c55e" opacity="0.3" rx="1" /> {/* Safe network grid overlay */}
            {/* Safe WiFi icon on screen */}
            <path d="M 14 18 C 14 15, 18 15, 18 18 M 12 16 C 12 12, 20 12, 20 16" stroke="#16a34a" strokeWidth="1" />
            {/* Speaker bar grills below screen */}
            <rect x="15" y="68" width="30" height="3" rx="1.5" fill="#cbd5e1" />
            <rect x="15" y="75" width="22" height="3" rx="1.5" fill="#cbd5e1" />
            {/* Buttons */}
            <circle cx="70" cy="73" r="6" fill="#38bdf8" />
            <circle cx="56" cy="73" r="4" fill="#94a3b8" />
            {/* Power LED Indicator */}
            <circle cx="80" cy="73" r="2.5" fill="#22c55e" />
          </g>

          {/* Baby Monitor Camera Unit */}
          <g transform="translate(125, 15)">
            {/* Antenna and bracket */}
            <rect x="12" y="0" width="4" height="25" rx="2" fill="#94a3b8" />
            <circle cx="14" cy="0" r="3.5" fill="#38bdf8" />
            {/* Stand */}
            <ellipse cx="30" cy="115" rx="25" ry="8" fill="url(#casing)" stroke="#cbd5e1" strokeWidth="2" />
            <rect x="26" y="80" width="8" height="35" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
            {/* Spherical Camera Body */}
            <circle cx="30" cy="55" r="30" fill="url(#casing)" stroke="#cbd5e1" strokeWidth="2.5" />
            <circle cx="30" cy="55" r="22" fill="#1e293b" />
            {/* Camera Glass Lens */}
            <circle cx="30" cy="55" r="10" fill="#020617" />
            <circle cx="27" cy="52" r="3" fill="#38bdf8" /> {/* light reflection */}
            {/* Infrared sensors (small dots) */}
            <circle cx="16" cy="55" r="1.5" fill="#ef4444" />
            <circle cx="44" cy="55" r="1.5" fill="#ef4444" />
            <circle cx="30" cy="73" r="2.5" fill="#22c55e" /> {/* Status power green */}
          </g>
        </svg>
      );

    case 'lol-toy':
      return (
        <svg className={className} viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="ballGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff77bb" />
              <stop offset="70%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#be185d" />
            </radialGradient>
            <linearGradient id="zipperGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
          {/* Glowing backdrop */}
          <circle cx="100" cy="75" r="60" fill="#f472b6" fillOpacity="0.15" />
          {/* Sparkles / Stars */}
          <path d="M 100 12 L 102 20 L 110 22 L 102 24 L 100 32 L 98 24 L 90 22 L 98 20 Z" fill="#facc15" />
          <path d="M 45 40 L 46 45 L 51 46 L 46 47 L 45 52 L 44 47 L 39 46 L 44 45 Z" fill="#93c5fd" />
          <path d="M 155 105 L 156 110 L 161 111 L 156 112 L 155 117 L 154 112 L 149 111 L 154 110 Z" fill="#c084fc" />
          
          <g transform="translate(45, 20)">
            {/* The signature LOL surprise spherical shell */}
            <circle cx="55" cy="55" r="50" fill="url(#ballGrad)" stroke="#f472b6" strokeWidth="2.5" />
            {/* Sparkly Glitter circles */}
            <circle cx="30" cy="30" r="3.5" fill="#fff" opacity="0.6" />
            <circle cx="80" cy="40" r="2.5" fill="#fff" opacity="0.8" />
            <circle cx="28" cy="75" r="2" fill="#fff" opacity="0.7" />
            <circle cx="75" cy="80" r="4" fill="#fff" opacity="0.5" />
            {/* Zipper mechanism wrapper (Signature LOL zipper mystery) */}
            <path d="M 5 55 Q 55 50, 105 55" stroke="url(#zipperGrad)" strokeWidth="6" strokeLinecap="round" />
            {/* Outer dotted zipper stitching */}
            <path d="M 5 45 Q 55 40, 105 45" stroke="#facc15" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M 5 65 Q 55 60, 105 65" stroke="#facc15" strokeWidth="1.5" strokeDasharray="4 4" />
            {/* Golden zipper puller tab */}
            <g transform="translate(55, 39)">
              <rect width="14" height="22" rx="3" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
              <rect x="4" y="12" width="6" height="6" rx="1" fill="#be185d" />
              {/* Star on ziploc */}
              <polygon points="7,4 8.5,8 11.5,8 9,10 10,13 7,11.5 4,13 5,10 2.5,8 5.5,8" fill="#ca8a04" />
            </g>
            {/* Glam Glitter typography stylized mockup */}
            <text x="55" y="88" fill="#ffffff" fontFamily="sans-serif" fontWeight="900" fontSize="12" textAnchor="middle" letterSpacing="1px">
              GLAM GLITTER
            </text>
            <text x="55" y="99" fill="#facc15" fontFamily="sans-serif" fontWeight="900" fontSize="10" textAnchor="middle">
              SURPRISE!
            </text>
          </g>
        </svg>
      );

    case 'gaming-headset':
      return (
        <svg className={className} viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="headBand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="pad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
          <g transform="translate(15, 10)">
            {/* Top thick headband steel curves */}
            <path d="M 35 110 C 25 35, 145 35, 135 110" fill="none" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
            <path d="M 37 108 C 29 40, 141 40, 133 108" fill="none" stroke="url(#headBand)" strokeWidth="6" strokeLinecap="round" />
            {/* Inside cushioning pad */}
            <path d="M 50 68 C 65 52, 105 52, 120 68" fill="none" stroke="#334155" strokeWidth="4" />
            {/* Audio drivers Left cup */}
            <g transform="translate(15, 80)">
              {/* Outer shell casing */}
              <rect width="32" height="50" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
              {/* Glowing ring */}
              <rect x="6" y="8" width="20" height="34" rx="6" fill="none" stroke="#06b6d4" strokeWidth="2" />
              <circle cx="16" cy="25" r="5" fill="#0891b2" />
              {/* Ear padded cushion */}
              <rect x="26" y="4" width="8" height="42" rx="4" fill="url(#pad)" />
            </g>
            {/* Audio drivers Right cup */}
            <g transform="translate(123, 80)">
              {/* Outer shell casing */}
              <rect width="32" height="50" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
              {/* Glowing ring */}
              <rect x="6" y="8" width="20" height="34" rx="6" fill="none" stroke="#06b6d4" strokeWidth="2" />
              <circle cx="16" cy="25" r="5" fill="#0891b2" />
              {/* Ear padded cushion */}
              <rect x="-2" y="4" width="8" height="42" rx="4" fill="url(#pad)" />
            </g>
            {/* Microphone Boom coming from Left cup */}
            <path d="M 35 115 C 35 135, 60 142, 80 138" fill="none" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
            <circle cx="82" cy="138" r="4.5" fill="#06b6d4" />
            <rect x="76" y="136" width="3" height="3" fill="#1e293b" />
          </g>
        </svg>
      );

    case 'gaming-keyboard':
      return (
        <svg className={className} viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="boardGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>
          {/* Main heavy metallic keyboard case */}
          <rect x="10" y="40" width="180" height="70" rx="6" fill="url(#boardGrad)" stroke="#1e293b" strokeWidth="3.5" />
          {/* Hand Wrist rest lip */}
          <path d="M 12 110 L 188 110 L 180 125 L 20 125 Z" fill="#0f172a" />
          <line x1="10" y1="40" x2="190" y2="40" stroke="#475569" strokeWidth="1" />
          {/* Keyrows RGB backlit grids */}
          <g transform="translate(18, 48)">
            {/* Row 1 RGB Red */}
            <g fill="#ef4444">
              <rect x="0" y="0" width="10" height="7" rx="1.5" />
              <rect x="13" y="0" width="10" height="7" rx="1.5" />
              <rect x="26" y="0" width="10" height="7" rx="1.5" />
              <rect x="39" y="0" width="10" height="7" rx="1.5" />
              <rect x="52" y="0" width="10" height="7" rx="1.5" />
              <rect x="65" y="0" width="10" height="7" rx="1.5" />
              <rect x="78" y="0" width="10" height="7" rx="1.5" />
              <rect x="91" y="0" width="10" height="7" rx="1.5" />
              <rect x="104" y="0" width="10" height="7" rx="1.5" />
              <rect x="117" y="0" width="10" height="7" rx="1.5" />
              <rect x="130" y="0" width="10" height="7" rx="1.5" />
              <rect x="143" y="0" width="21" height="7" rx="1.5" /> {/* Backspace */}
            </g>
            {/* Row 2 RGB Yellow */}
            <g fill="#f59e0b" transform="translate(0, 11)">
              <rect x="0" y="0" width="14" height="7" rx="1.5" /> {/* Tab */}
              <rect x="17" y="0" width="10" height="7" rx="1.5" />
              <rect x="30" y="0" width="10" height="7" rx="1.5" />
              <rect x="43" y="0" width="10" height="7" rx="1.5" />
              <rect x="56" y="0" width="10" height="7" rx="1.5" />
              <rect x="69" y="0" width="10" height="7" rx="1.5" />
              <rect x="82" y="0" width="10" height="7" rx="1.5" />
              <rect x="95" y="0" width="10" height="7" rx="1.5" />
              <rect x="108" y="0" width="10" height="7" rx="1.5" />
              <rect x="121" y="0" width="10" height="7" rx="1.5" />
              <rect x="134" y="0" width="10" height="7" rx="1.5" />
              <rect x="147" y="0" width="17" height="7" rx="1.5" />
            </g>
            {/* Row 3 RGB Green */}
            <g fill="#10b981" transform="translate(0, 22)">
              <rect x="0" y="0" width="18" height="7" rx="1.5" /> {/* Caps */}
              <rect x="21" y="0" width="10" height="7" rx="1.5" />
              {/* Highlight WASD keycaps differently with cyan borders */}
              <rect x="34" y="0" width="10" height="7" rx="1.5" fill="#3b82f6" stroke="#fff" strokeWidth="0.5" />
              <rect x="47" y="0" width="10" height="7" rx="1.5" fill="#3b82f6" stroke="#fff" strokeWidth="0.5" />
              <rect x="60" y="0" width="10" height="7" rx="1.5" fill="#3b82f6" stroke="#fff" strokeWidth="0.5" />
              <rect x="73" y="0" width="10" height="7" rx="1.5" />
              <rect x="86" y="0" width="10" height="7" rx="1.5" />
              <rect x="99" y="0" width="10" height="7" rx="1.5" />
              <rect x="112" y="0" width="10" height="7" rx="1.5" />
              <rect x="125" y="0" width="10" height="7" rx="1.5" />
              <rect x="138" y="0" width="26" height="7" rx="1.5" /> {/* Enter */}
            </g>
            {/* Row 4 RGB Blue */}
            <g fill="#3b82f6" transform="translate(0, 33)">
              <rect x="0" y="0" width="24" height="7" rx="1.5" /> {/* Shift */}
              <rect x="27" y="0" width="10" height="7" rx="1.5" />
              <rect x="40" y="0" width="10" height="7" rx="1.5" fill="#3b82f6" stroke="#fff" strokeWidth="0.5" /> {/* S of WASD */}
              <rect x="53" y="0" width="10" height="7" rx="1.5" />
              <rect x="66" y="0" width="10" height="7" rx="1.5" />
              <rect x="79" y="0" width="10" height="7" rx="1.5" />
              <rect x="92" y="0" width="10" height="7" rx="1.5" />
              <rect x="105" y="0" width="10" height="7" rx="1.5" />
              <rect x="118" y="0" width="10" height="7" rx="1.5" />
              <rect x="131" y="0" width="33" height="7" rx="1.5" />
            </g>
            {/* Row 5 RGB Purple (Bottom modifiers & spacebar) */}
            <g fill="#a855f7" transform="translate(0, 44)">
              <rect x="0" y="0" width="12" height="7" rx="1.5" /> {/* Ctrl */}
              <rect x="15" y="0" width="12" height="7" rx="1.5" /> {/* OS */}
              <rect x="30" y="0" width="12" height="7" rx="1.5" /> {/* Alt */}
              <rect x="45" y="0" width="75" height="7" rx="1.5" fill="#f43f5e" /> {/* Spacebar */}
              <rect x="123" y="0" width="12" height="7" rx="1.5" />
              <rect x="138" y="0" width="12" height="7" rx="1.5" />
              <rect x="152" y="0" width="12" height="7" rx="1.5" />
            </g>
          </g>
        </svg>
      );

    case 'gaming-mouse':
      return (
        <svg className={className} viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mouseBody" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>
          {/* Cyberpunk grid backdrop */}
          <circle cx="100" cy="75" r="45" fill="#14b8a6" fillOpacity="0.06" stroke="#14b8a6" strokeWidth="0.5" strokeDasharray="3 3" />
          <g transform="translate(65, 15)">
            {/* Symmetric Mouse Body */}
            <path d="M 35 5 C 15 5, 8 30, 8 60 C 8 95, 15 115, 35 115 C 55 115, 62 95, 62 60 C 62 30, 55 5, 35 5 Z" fill="url(#mouseBody)" stroke="#334155" strokeWidth="2.5" />
            {/* Grip side indentations */}
            <path d="M 8 50 Q 15 60, 8 70" stroke="#14b8a6" strokeWidth="2" fill="none" />
            <path d="M 62 50 Q 55 60, 62 70" stroke="#14b8a6" strokeWidth="2" fill="none" />
            {/* Split trigger clicks Left and Right */}
            <line x1="35" y1="5" x2="35" y2="52" stroke="#334155" strokeWidth="2" />
            {/* Diagonal split cuts for comfort style */}
            <path d="M 8 52 C 20 52, 35 52, 35 52" stroke="#334155" strokeWidth="2" />
            <path d="M 62 52 C 50 52, 35 52, 35 52" stroke="#334155" strokeWidth="2" />
            {/* Light up scroll wheel */}
            <rect x="32" y="16" width="6" height="18" rx="3" fill="#14b8a6" />
            <rect x="34" y="20" width="2" height="10" fill="#ccfbf1" />
            {/* DPI selection buttons */}
            <rect x="32" y="38" width="6" height="8" rx="1" fill="#475569" stroke="#334155" strokeWidth="1" />
            {/* Glowing neon side curves */}
            <path d="M 12 85 A 25 25 0 0 0 58 85" stroke="#14b8a6" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            {/* High end palm grip logo indicator */}
            <g transform="translate(31, 86)">
              <polygon points="4,0 7,6 1,6" fill="#14b8a6" />
              <polygon points="4,10 7,4 1,4" fill="#0f766e" />
            </g>
          </g>
        </svg>
      );

    case 'gaming-chair':
      return (
        <svg className={className} viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="chairLeather" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="60%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>
          <g transform="translate(55, 5)">
            {/* Base platform 5 star core legs and wheels */}
            <g transform="translate(15, 115)">
              <line x1="18" y1="5" x2="4" y2="15" stroke="#475569" strokeWidth="4" />
              <line x1="18" y1="5" x2="32" y2="15" stroke="#475569" strokeWidth="4" />
              <line x1="18" y1="5" x2="18" y2="22" stroke="#475569" strokeWidth="4" />
              <line x1="18" y1="5" x2="-2" y2="2" stroke="#475569" strokeWidth="4" />
              <line x1="18" y1="5" x2="38" y2="2" stroke="#475569" strokeWidth="4" />
              {/* Wheels */}
              <circle cx="4" cy="18" r="4.5" fill="#1e293b" />
              <circle cx="32" cy="18" r="4.5" fill="#1e293b" />
              <circle cx="18" cy="24" r="4.5" fill="#1e293b" />
              <circle cx="-2" cy="4" r="4.5" fill="#1e293b" />
              <circle cx="38" cy="4" r="4.5" fill="#1e293b" />
              {/* Hydraulics cylinder gas cylinder */}
              <rect x="15" y="-18" width="6" height="23" fill="#64748b" stroke="#334155" strokeWidth="1" />
            </g>

            {/* Armrests */}
            <path d="M 12 70 V 85 h 5" stroke="#475569" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <path d="M 78 70 V 85 h -5" stroke="#475569" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <rect x="8" y="65" width="12" height="5" rx="2" fill="#0f172a" />
            <rect x="70" y="65" width="12" height="5" rx="2" fill="#0f172a" />

            {/* Seat Cushion (Thick padded butt-rest) */}
            <path d="M 15 80 L 75 80 L 79 96 L 11 96 Z" fill="url(#chairLeather)" stroke="#3b82f6" strokeWidth="2" />
            {/* Seat bolster side cushions (glowing blue) */}
            <path d="M 15 80 L 9 94 L 14 96 Z" fill="#3b82f6" />
            <path d="M 75 80 L 81 94 L 76 96 Z" fill="#3b82f6" />

            {/* Huge Racer backrest with bucket bolsters */}
            <path d="M 22 25 L 68 25 L 75 42 L 72 80 L 18 80 L 15 42 Z" fill="url(#chairLeather)" stroke="#3b82f6" strokeWidth="2" />
            {/* Ergonomic Headrest cutouts */}
            <rect x="33" y="28" width="8" height="5" rx="2.5" fill="#0f172a" stroke="#334155" />
            <rect x="49" y="28" width="8" height="5" rx="2.5" fill="#0f172a" stroke="#334155" />
            
            {/* Headwear neck pillow */}
            <rect x="30" y="10" width="30" height="15" rx="5" fill="#1d4ed8" stroke="#3b82f6" strokeWidth="1.5" />
            {/* Lumbar cushion support pillow */}
            <rect x="25" y="62" width="40" height="16" rx="4" fill="#1d4ed8" stroke="#3b82f6" strokeWidth="1.5" />
            {/* Dynamic sporty embroidery stripes */}
            <path d="M 25 35 Q 45 45, 65 35 M 23 52 Q 45 62, 67 52" stroke="#3b82f6" strokeWidth="2" fill="none" />
          </g>
        </svg>
      );

    case 'stacked-penguins':
      return (
        <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="penguinBody" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4b5563" />
              <stop offset="85%" stopColor="#1f2937" />
              <stop offset="100%" stopColor="#111827" />
            </radialGradient>
          </defs>
          {/* Ambient floor shadow */}
          <ellipse cx="100" cy="184" rx="45" ry="9" fill="#000" fillOpacity="0.15" />

          {/* Bottom Penguin (No. 1, Large) */}
          <g transform="translate(60, 100)">
            {/* Dark plush body shape */}
            <circle cx="40" cy="45" r="40" fill="url(#penguinBody)" />
            {/* White soft belly plush */}
            <ellipse cx="40" cy="50" rx="28" ry="30" fill="#ffffff" />
            {/* Cute Yellow flat feet */}
            <ellipse cx="15" cy="80" rx="10" ry="4" fill="#f59e0b" />
            <ellipse cx="65" cy="80" rx="10" ry="4" fill="#f59e0b" />
            {/* Little stubby penguin flippers (left / right wings) */}
            <path d="M 3 35 C -5 45, -5 60, 5 62" stroke="#1f2937" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 77 35 C 85 45, 85 60, 75 62" stroke="#1f2937" strokeWidth="8" strokeLinecap="round" fill="none" />
            {/* Happy eyes embroidered */}
            <path d="M 28 25 Q 31 22, 34 25" stroke="#000" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 46 25 Q 49 22, 52 25" stroke="#000" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Chubby Orange Bill Beak */}
            <polygon points="34,29 46,29 40,38" fill="#f97316" stroke="#ea580c" strokeWidth="0.5" />
            {/* Soft pink cheeks */}
            <circle cx="23" cy="31" r="4px" fill="#fda4af" />
            <circle cx="57" cy="31" r="4px" fill="#fda4af" />
          </g>

          {/* Middle Penguin (No. 2, Medium, stacked safely) */}
          <g transform="translate(68, 50)">
            {/* Body */}
            <circle cx="32" cy="32" r="30" fill="url(#penguinBody)" />
            {/* Belly */}
            <ellipse cx="32" cy="36" rx="20" ry="22" fill="#ffffff" />
            {/* Wings */}
            <path d="M 4 25 C -2 32, -2 45, 5 47" stroke="#1f2937" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 60 25 C 66 32, 66 45, 59 47" stroke="#1f2937" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Eyes */}
            <circle cx="24" cy="20" r="2.5" fill="#000" />
            <circle cx="40" cy="20" r="2.5" fill="#000" />
            {/* Beak */}
            <polygon points="28,23 36,23 32,30" fill="#f97316" />
            <circle cx="18" cy="24" r="3px" fill="#fda4af" />
            <circle cx="46" cy="24" r="3px" fill="#fda4af" />
          </g>

          {/* Top Penguin (No. 3, Smallest baby penguin, balancing at top!) */}
          <g transform="translate(76, 12)">
            {/* Body */}
            <circle cx="24" cy="22" r="21" fill="url(#penguinBody)" />
            {/* Belly */}
            <ellipse cx="24" cy="24" rx="14" ry="16" fill="#ffffff" />
            {/* Cute sleeping eyes */}
            <path d="M 16 16 T 21 16" stroke="#000" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M 27 16 T 32 16" stroke="#000" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Tiny beak */}
            <polygon points="21,18 27,18 24,24" fill="#f97316" />
            {/* Tiny rosy cheeks */}
            <circle cx="13" cy="20" r="2px" fill="#fda4af" />
            <circle cx="35" cy="20" r="2px" fill="#fda4af" />
            {/* Red winter scarf around neck for extra cuteness */}
            <path d="M 15 36 Q 24 38, 33 36 L 31 46" stroke="#ef4444" strokeWidth="4px" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      );

    case 'grill-apron':
      return (
        <svg className={className} viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="apronCloth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#27272a" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>
            <linearGradient id="leatherStrap" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>
          <g transform="translate(45, 10)">
            {/* Neck Leather Strap */}
            <path d="M 35 15 C 35 -3, 75 -3, 75 15" fill="none" stroke="url(#leatherStrap)" strokeWidth="4.5" strokeLinecap="round" />

            {/* Apron Main body bib cut */}
            <path d="M 33 20 L 77 20 L 92 50 L 92 120 L 18 120 L 18 50 Z" fill="url(#apronCloth)" stroke="#3f3f46" strokeWidth="2" />
            {/* Orange heavy duty sewing line stitch around border */}
            <path d="M 35 24 L 75 24 L 88 51 L 88 116 L 22 116 L 22 51 Z" stroke="#ca8a04" strokeWidth="1" strokeDasharray="3 3.5" fill="none" />

            {/* Leather chest patch with "MASTER GRILL" brand engraving */}
            <rect x="42" y="32" width="26" height="15" rx="2" fill="url(#leatherStrap)" stroke="#92400e" strokeWidth="1" />
            <path d="M 46 39 L 55 35 V 44 L 64 39" stroke="#fef08a" strokeWidth="1" fill="none" /> {/* Fork & Spatula cross icon */}

            {/* Large center utility tool pockets (for dad's accessories) */}
            <rect x="25" y="70" width="60" height="38" rx="3" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
            <line x1="55" y1="70" x2="55" y2="108" stroke="#ca8a04" strokeWidth="1" strokeDasharray="2 2" /> {/* Divider line */}
            
            {/* Sticking out metal tongs handle inside pocket */}
            <path d="M 30 50 L 40 72 M 34 48 L 44 72" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="31" y="44" width="7" height="6" rx="1.5" fill="#e2e8f0" />

            {/* Brass side rivet rivets */}
            <circle cx="21" cy="51" r="2.5" fill="#facc15" />
            <circle cx="89" cy="51" r="2.5" fill="#facc15" />
            <circle cx="21" cy="116" r="2.5" fill="#facc15" />
            <circle cx="89" cy="116" r="2.5" fill="#facc15" />

            {/* Hanging side cloth ring */}
            <path d="M 92 78 C 96 78, 98 84, 92 88" stroke="url(#leatherStrap)" strokeWidth="3" fill="none" />
          </g>
        </svg>
      );

    case 'grill-pan':
      return (
        <svg className={className} viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="panCeramic" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="70%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <linearGradient id="handleWood" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="50%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>
          <g transform="translate(20, 20)">
            {/* Cast shadow */}
            <rect x="32" y="27" width="90" height="90" rx="12" fill="#000" fillOpacity="0.08" transform="rotate(-10 77 72)" />

            {/* Main square pan base, tilted nicely */}
            <rect x="25" y="10" width="105" height="105" rx="14" fill="url(#panCeramic)" stroke="#94a3b8" strokeWidth="4" />
            {/* Innermost base area */}
            <rect x="35" y="20" width="85" height="85" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
            
            {/* Heavy char raised grilling grates lines (The ribs!) */}
            <g stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" opacity="0.8">
              <line x1="45" y1="30" x2="45" y2="95" />
              <line x1="57" y1="30" x2="57" y2="95" />
              <line x1="69" y1="30" x2="69" y2="95" />
              <line x1="81" y1="30" x2="81" y2="95" />
              <line x1="93" y1="30" x2="93" y2="95" />
              <line x1="105" y1="30" x2="105" y2="95" />
              <line x1="117" y1="30" x2="117" y2="95" />
            </g>

            {/* Left/Right V-spouts to pour fat out */}
            <path d="M 22 55 L 26 50 L 26 62 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
            <path d="M 133 55 L 129 50 L 129 62 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />

            {/* Long premium wooden handle representing high-quality build */}
            <g transform="translate(77, 115)">
              {/* Metallic joint connector */}
              <rect x="-8" y="0" width="16" height="10" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
              {/* Wood grip shaft */}
              <path d="M -6 10 L 6 10 L 4 48 L -4 48 Z" fill="url(#handleWood)" stroke="#78350f" strokeWidth="1.5" />
              {/* Hanging hole */}
              <circle cx="0" cy="42" r="2.5" fill="#1e293b" />
            </g>
          </g>
        </svg>
      );

    case 'grill-gloves':
      return (
        <svg className={className} viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gloveCol" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
            <linearGradient id="siliconGrip" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
          </defs>
          <g transform="translate(15, 10)">
            {/* Left Glove (Tilted) */}
            <g transform="translate(30, 10) rotate(-12)">
              {/* Heavy cuff base */}
              <path d="M 10 90 L 50 90 L 46 115 L 14 115 Z" fill="#1f2937" stroke="#4b5563" strokeWidth="2" />
              {/* Glove core hand portion */}
              <path d="M 12 90 C 10 40, 18 20, 22 15 C 26 10, 32 10, 35 24 C 38 12, 44 12, 46 25 C 48 15, 53 15, 55 30 L 50 90 Z" fill="url(#gloveCol)" stroke="#374151" strokeWidth="2.5" />
              {/* Separate thumb pocket */}
              <path d="M 14 62 C 2 54, -2 40, 6 34 C 12 30, 16 42, 18 56 Z" fill="url(#gloveCol)" stroke="#374151" strokeWidth="2" />
              {/* Silicon red honey-comb grip vectors */}
              <path d="M 20 40 Q 35 44, 45 40 M 20 52 Q 35 56, 45 52 M 20 64 Q 35 68, 45 64" stroke="url(#siliconGrip)" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Orange double safety stitch at the sleeve */}
              <line x1="14" y1="94" x2="46" y2="94" stroke="#f97316" strokeWidth="1" strokeDasharray="3 2" />
            </g>

            {/* Right Glove (Overlapping symmetrically) */}
            <g transform="translate(100, 10) rotate(12)">
              {/* Heavy cuff base */}
              <path d="M 10 90 L 50 90 L 46 115 L 14 115 Z" fill="#1f2937" stroke="#4b5563" strokeWidth="2" />
              {/* Glove core hand portion */}
              <path d="M 12 90 C 10 40, 18 20, 22 15 C 26 10, 32 10, 35 24 C 38 12, 44 12, 46 25 C 48 15, 53 15, 55 30 L 50 90 Z" fill="url(#gloveCol)" stroke="#374151" strokeWidth="2.5" />
              {/* Separate thumb pocket */}
              <path d="M 48 62 C 60 54, 64 40, 56 34 C 50 30, 46 42, 44 56 Z" fill="url(#gloveCol)" stroke="#374151" strokeWidth="2" />
              {/* Silicon red honey-comb grip vectors */}
              <path d="M 15 40 Q 30 44, 42 40 M 15 52 Q 30 56, 42 52 M 15 64 Q 30 68, 42 64" stroke="url(#siliconGrip)" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Orange double safety stitch */}
              <line x1="14" y1="94" x2="46" y2="94" stroke="#f97316" strokeWidth="1" strokeDasharray="3 2" />
            </g>
          </g>
        </svg>
      );

    case 'grill-tools':
      return (
        <svg className={className} viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          <g transform="translate(10, 10)">
            {/* Elegant metal tools layout */}
            {/* Tool 1: Heavy Duty BBQ Spatula */}
            <g transform="translate(30, 10) rotate(-15)">
              {/* Steel Shaft */}
              <rect x="8" y="10" width="4" height="90" fill="url(#steel)" />
              {/* Air venting handle loops */}
              <rect x="6" y="100" width="8" height="20" rx="3.5" fill="#1e293b" />
              <circle cx="10" cy="116" r="2" fill="#94a3b8" />
              {/* Spatula head with meat ventilation slots */}
              <path d="M 10 10 L 0 10 L -4 40 L 24 40 L 20 10 Z" fill="url(#steel)" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="4" y1="16" x2="4" y2="34" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
              <line x1="10" y1="16" x2="10" y2="34" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
              <line x1="16" y1="16" x2="16" y2="34" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Tool 2: Professional Meat Grilling Fork */}
            <g transform="translate(95, 10) rotate(5)">
              {/* Steel Shaft */}
              <rect x="6" y="25" width="4" height="85" fill="url(#steel)" />
              {/* Handle */}
              <rect x="4" y="110" width="8" height="20" rx="3.5" fill="#1e293b" />
              <circle cx="8" cy="126" r="2" fill="#94a3b8" />
              {/* Fork Two Prongs */}
              <path d="M 8 26 C -2 15, -2 0, -2 0 L 2 5 C 4 10, 12 10, 14 5 L 18 0 C 18 0, 18 15, 8 26 Z" fill="url(#steel)" />
            </g>

            {/* Tool 3: Locking BBQ Tongs */}
            <g transform="translate(135, 10) rotate(20)">
              {/* Top locking ring */}
              <circle cx="12" cy="11" r="5" fill="url(#steel)" stroke="#475569" strokeWidth="1" />
              {/* Dual sprung tongs arms */}
              <path d="M 12 16 L 3 110 L 0 118" stroke="url(#steel)" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 12 16 L 21 110 L 24 118" stroke="url(#steel)" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Scalloped teeth grabbers on ends */}
              <path d="M -4 116 Q 0 125, 4 116 Z" fill="url(#steel)" />
              <path d="M 20 116 Q 24 125, 28 116 Z" fill="url(#steel)" />
              {/* Closing slider clip */}
              <rect x="7" y="30" width="10" height="8" rx="2" fill="#1e293b" />
            </g>
          </g>
        </svg>
      );

    case 'studio-headphone':
      return (
        <svg className={className} viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="goldPlate" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="bodyDark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3f3f46" />
              <stop offset="100%" stopColor="#18181b" />
            </linearGradient>
          </defs>
          <g transform="translate(15, 10)">
            {/* Sturdy steel spring headband */}
            <path d="M 40 105 C 20 30, 150 30, 130 105" fill="none" stroke="#27272a" strokeWidth="8" strokeLinecap="round" />
            <path d="M 42 103 C 24 35, 146 35, 128 103" fill="none" stroke="url(#goldPlate)" strokeWidth="3" strokeLinecap="round" />
            {/* Cushions */}
            <g transform="translate(15, 75)">
              <rect width="30" height="52" rx="10" fill="url(#bodyDark)" stroke="#27272a" strokeWidth="2.5" />
              <rect x="25" y="4" width="6" height="44" rx="3" fill="#09090b" />
              {/* Golden accent core emblem plates */}
              <circle cx="15" cy="26" r="6" fill="url(#goldPlate)" />
            </g>
            <g transform="translate(125, 75)">
              <rect width="30" height="52" rx="10" fill="url(#bodyDark)" stroke="#27272a" strokeWidth="2.5" />
              <rect x="-1" y="4" width="6" height="44" rx="3" fill="#09090b" />
              <circle cx="15" cy="26" r="6" fill="url(#goldPlate)" />
            </g>
            {/* Audio cord jack plug styling */}
            <path d="M 30 127 C 30 145, 65 140, 95 145" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'smart-watch':
      return (
        <svg className={className} viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="strap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
            <linearGradient id="bezel" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4b5563" />
              <stop offset="100%" stopColor="#1f2937" />
            </linearGradient>
          </defs>
          <g transform="translate(50, 10)">
            {/* Sport Silicon Straps (extended vertically) */}
            <rect x="35" y="0" width="30" height="130" rx="6" fill="url(#strap)" stroke="#1d4ed8" strokeWidth="1.5" />
            <circle cx="50" cy="18" r="2.5" fill="#1e3a8a" />
            <circle cx="50" cy="112" r="2.5" fill="#1e3a8a" />
            
            {/* Square Bezel Watch Body with rounded edges */}
            <rect x="23" y="32" width="54" height="64" rx="14" fill="url(#bezel)" stroke="#0f172a" strokeWidth="3" />
            {/* Interactive digital screen dial face */}
            <rect x="28" y="37" width="44" height="54" rx="9" fill="#020617" />
            
            {/* Dynamic visual health ring layout on watch face */}
            <circle cx="50" cy="62" r="16" fill="none" stroke="#374151" strokeWidth="3" />
            {/* Colorful progress rings */}
            <circle cx="50" cy="62" r="16" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="65 100" strokeLinecap="round" transform="rotate(-90 50 62)" />
            <circle cx="50" cy="62" r="11" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="40 100" strokeLinecap="round" transform="rotate(30 50 62)" />

            {/* Simulated Digital Clock Time digits */}
            <text x="50" y="49" fill="#ffffff" fontFamily="monospace" fontSize="8" fontWeight="bold" textAnchor="middle">
              10:24
            </text>
            <text x="50" y="87" fill="#60a5fa" fontFamily="sans-serif" fontSize="6" fontWeight="bold" textAnchor="middle">
              8,420 خطوة
            </text>

            {/* Rotative mechanical crown button on the right */}
            <rect x="76" y="52" width="3.5" height="12" rx="1" fill="#9ca3af" stroke="#4b5563" strokeWidth="1" />
          </g>
        </svg>
      );

    default:
      if (type && (type.startsWith('http') || type.startsWith('data:image/') || type.includes('.') || type.includes('/'))) {
        return (
          <img 
            src={type} 
            alt="صورة المنتج" 
            className={`${className} object-contain rounded`}
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        );
      }
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded">
          <span className="text-gray-400 text-xs text-center">عافية - Afia Store</span>
        </div>
      );
  }
};
