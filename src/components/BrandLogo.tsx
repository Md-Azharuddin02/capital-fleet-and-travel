import React from 'react';

export type BrandLogoVariant = 'horizontal' | 'emblem' | 'icon-only';

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  theme?: 'dark' | 'light';
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Official Brand Logo Component for CAPITAL FLEET & TRAVELS
 * Faithfully renders the two official assets:
 * 1. Horizontal Brandmark: [ CAPITAL ] [ Red Squircle "Fleet" + Plane ] [ & TRAVELS ]
 * 2. Circular Emblem: Red Ring + Navy Vignette Disc + [ CAPITAL ] [ Fleet ] [ & TRAVELS ] + [ — YOUR JOURNEY   OUR COMMITMENT — ]
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  theme = 'dark',
  className = '',
  size = 'md',
}) => {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#071A2F';

  // Sizing tokens for horizontal
  const horizontalHeightClasses = {
    xs: 'h-6 sm:h-7',
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-20 sm:h-24',
  }[size];

  // Sizing tokens for emblem
  const emblemSizeClasses = {
    xs: 'w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15',
    sm: 'w-18 h-18 sm:w-20 sm:h-20',
    md: 'w-28 h-28 sm:w-32 sm:h-32',
    lg: 'w-40 h-40 sm:w-48 h-48',
    xl: 'w-56 h-56 sm:w-64 h-64',
  }[size];

  // 1. CIRCULAR EMBLEM (ChatGPT Image Sep 12, 2026, 02_34_52 PM.png)
  if (variant === 'emblem') {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}>
        <svg
          viewBox="0 0 340 340"
          className={`${emblemSizeClasses} drop-shadow-xl`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Navy Radial Glow */}
            <radialGradient id="emblemNavyDisc" cx="50%" cy="46%" r="52%">
              <stop offset="0%" stopColor="#0E3364" />
              <stop offset="60%" stopColor="#061B36" />
              <stop offset="92%" stopColor="#020914" />
              <stop offset="100%" stopColor="#01060D" />
            </radialGradient>

            {/* Red Squircle 3D Gradient */}
            <linearGradient id="emblemRedSquircle" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF2A40" />
              <stop offset="35%" stopColor="#E61528" />
              <stop offset="100%" stopColor="#A80716" />
            </linearGradient>

            {/* Red Outer Ring Gradient */}
            <linearGradient id="emblemRingGrad" x1="0" y1="0" x2="340" y2="340" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF2A40" />
              <stop offset="50%" stopColor="#D91427" />
              <stop offset="100%" stopColor="#B30C1D" />
            </linearGradient>

            {/* Subtle Drop Shadow for Squircle */}
            <filter id="emblemSquircleShadow" x="-10%" y="-10%" width="125%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.55" />
            </filter>
          </defs>

          {/* Outer Red Ring Border */}
          <circle cx="170" cy="170" r="163" stroke="url(#emblemRingGrad)" strokeWidth="10" />

          {/* Deep Navy Radial Disk with Vignette */}
          <circle cx="170" cy="170" r="158" fill="url(#emblemNavyDisc)" />

          {/* Subtle Inner Rim Highlight */}
          <circle cx="170" cy="170" r="157" stroke="#1E477A" strokeWidth="1" opacity="0.4" />

          {/* ============ CENTER ROW (Y ~ 168) ============ */}

          {/* 1. Left Text: "CAPITAL" */}
          <text
            x="76"
            y="170"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="'Manrope', 'Inter', -apple-system, sans-serif"
            fontSize="23"
            fontWeight="800"
            letterSpacing="1"
          >
            CAPITAL
          </text>

          {/* 2. Center: Red Rounded Squircle (x: 128, y: 126, w: 84, h: 80, rx: 20) */}
          <g filter="url(#emblemSquircleShadow)">
            <rect
              x="128"
              y="126"
              width="84"
              height="80"
              rx="20"
              fill="url(#emblemRedSquircle)"
            />
            {/* Top Gloss Highlight on Squircle */}
            <path
              d="M132 142 C132 133 139 128 148 128 L192 128 C201 128 208 133 208 142 C186 145 154 145 132 142 Z"
              fill="#FFFFFF"
              opacity="0.18"
            />

            {/* White Flight Arc Swoosh */}
            <path
              d="M 136 177 C 148 152, 172 144, 198 136"
              stroke="#FFFFFF"
              strokeWidth="2.6"
              strokeLinecap="round"
              fill="none"
              opacity="0.95"
            />

            {/* White Ascending Airplane (pointed ~42 deg up-right) */}
            <path
              d="M 194 135 L 204 131 L 198 138 L 205 141 L 203 143 L 197 141 L 193 146 L 191 144 L 194 140 L 189 138 Z"
              fill="#FFFFFF"
            />

            {/* Script Text "Fleet" */}
            <text
              x="170"
              y="179"
              textAnchor="middle"
              fill="#FFFFFF"
              fontFamily="'Dancing Script', 'Caveat', 'Segoe Script', 'Brush Script MT', cursive"
              fontSize="38"
              fontWeight="bold"
              fontStyle="italic"
            >
              Fleet
            </text>
          </g>

          {/* 3. Right Text: "& TRAVELS" */}
          <text
            x="264"
            y="170"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="'Manrope', 'Inter', -apple-system, sans-serif"
            fontSize="22"
            fontWeight="800"
            letterSpacing="0.8"
          >
            &amp; TRAVELS
          </text>

          {/* ============ BOTTOM MOTTO BANNER ============ */}

          {/* Left Red Dash */}
          <line x1="38" y1="242" x2="68" y2="242" stroke="#E61528" strokeWidth="3.5" strokeLinecap="round" />

          {/* Official Slogan: "YOUR JOURNEY   OUR COMMITMENT" */}
          <text
            x="170"
            y="246"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="'Manrope', 'Inter', sans-serif"
            fontSize="10.8"
            fontWeight="700"
            letterSpacing="2.8"
          >
            YOUR JOURNEY   OUR COMMITMENT
          </text>

          {/* Right Red Dash */}
          <line x1="272" y1="242" x2="302" y2="242" stroke="#E61528" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // 2. ICON-ONLY (Red Squircle with Script 'Fleet' & Airplane)
  if (variant === 'icon-only') {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}>
        <svg viewBox="0 0 84 80" className="w-10 h-10" fill="none">
          <defs>
            <linearGradient id="iconRedSquircle" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF2A40" />
              <stop offset="40%" stopColor="#E61528" />
              <stop offset="100%" stopColor="#A80716" />
            </linearGradient>
          </defs>
          <rect width="84" height="80" rx="20" fill="url(#iconRedSquircle)" />
          <path
            d="M 8 51 C 20 26, 44 18, 70 10"
            stroke="#FFFFFF"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.95"
          />
          <path
            d="M 66 9 L 76 5 L 70 12 L 77 15 L 75 17 L 69 15 L 65 20 L 63 18 L 66 14 L 61 12 Z"
            fill="#FFFFFF"
          />
          <text
            x="42"
            y="53"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="'Dancing Script', 'Caveat', 'Segoe Script', cursive"
            fontSize="38"
            fontWeight="bold"
            fontStyle="italic"
          >
            Fleet
          </text>
        </svg>
      </div>
    );
  }

  // 3. HORIZONTAL BRANDMARK (ChatGPT Image Sep 12, 2026, 02_32_45 PM.png)
  // Lockup: [ CAPITAL ]  [ Red Squircle "Fleet" + Plane ]  [ & TRAVELS ]
  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 460 84"
        className={`${horizontalHeightClasses} w-auto max-w-full`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="CAPITAL FLEET & TRAVELS"
      >
        <defs>
          {/* Red Squircle Gradient */}
          <linearGradient id="horizRedSquircle" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF2A40" />
            <stop offset="35%" stopColor="#E61528" />
            <stop offset="100%" stopColor="#A80716" />
          </linearGradient>

          {/* Soft Shadow for Squircle */}
          <filter id="horizShadow" x="-10%" y="-10%" width="125%" height="130%">
            <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* 1. Left Text: "CAPITAL" */}
        <text
          x="88"
          y="54"
          textAnchor="middle"
          fill={textColor}
          fontFamily="'Manrope', 'Inter', -apple-system, sans-serif"
          fontSize="34"
          fontWeight="800"
          letterSpacing="1.2"
        >
          CAPITAL
        </text>

        {/* 2. Center: Signature Red Squircle (x: 186, y: 2, w: 84, h: 80, rx: 20) */}
        <g filter="url(#horizShadow)">
          <rect
            x="186"
            y="2"
            width="84"
            height="80"
            rx="20"
            fill="url(#horizRedSquircle)"
          />
          {/* Top Gloss Highlight */}
          <path
            d="M190 18 C190 9 197 4 206 4 L250 4 C259 4 266 9 266 18 C244 21 212 21 190 18 Z"
            fill="#FFFFFF"
            opacity="0.18"
          />

          {/* White Flight Arc Swoosh */}
          <path
            d="M 194 53 C 206 28, 230 20, 256 12"
            stroke="#FFFFFF"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.95"
          />

          {/* White Ascending Airplane */}
          <path
            d="M 252 11 L 262 7 L 256 14 L 263 17 L 261 19 L 255 17 L 251 22 L 249 20 L 252 16 L 247 14 Z"
            fill="#FFFFFF"
          />

          {/* Script Text "Fleet" */}
          <text
            x="228"
            y="55"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="'Dancing Script', 'Caveat', 'Segoe Script', 'Brush Script MT', cursive"
            fontSize="38"
            fontWeight="bold"
            fontStyle="italic"
          >
            Fleet
          </text>
        </g>

        {/* 3. Right Text: "& TRAVELS" */}
        <text
          x="368"
          y="54"
          textAnchor="middle"
          fill={textColor}
          fontFamily="'Manrope', 'Inter', -apple-system, sans-serif"
          fontSize="33"
          fontWeight="800"
          letterSpacing="1"
        >
          &amp; TRAVELS
        </text>
      </svg>
    </div>
  );
};
