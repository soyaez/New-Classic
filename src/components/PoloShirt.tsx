/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const IMG_BASE = '/public/';

interface PoloShirtProps {
  color?: string;
  className?: string;
}

// Module-level preloader state to avoid redundant network attempts
let baseImgStatus: 'loading' | 'loaded' | 'error' = 'loading';
const listeners = new Set<(status: 'loaded' | 'error') => void>();

function initPreload(src: string) {
  if (typeof window === 'undefined') return;
  if (baseImgStatus === 'loaded' || baseImgStatus === 'error') return;

  const img = new Image();
  img.src = src;
  img.onload = () => {
    baseImgStatus = 'loaded';
    listeners.forEach((cb) => cb('loaded'));
  };
  img.onerror = () => {
    baseImgStatus = 'error';
    listeners.forEach((cb) => cb('error'));
  };
}

/**
 * Fallback SVG Polo (used when polo-base.png fails to load)
 * - Notice: Grey half-circle behind the collar has been removed.
 */
const FallbackPoloSvg: React.FC<{ color: string; className?: string }> = ({
  color,
  className = '',
}) => {
  const transition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full select-none ${className}`}
      aria-label="New Classic Polo Shirt"
      role="img"
    >
      <defs>
        <linearGradient id="poloSideShadowLeft" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="poloSideShadowRight" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="poloTopHighlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="poloCollarShadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="placketInnerDepth" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.08" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Left Sleeve */}
      <motion.path
        d="M68 44 L24 64 C20 66 16 71 14 76 L11 106 C10 110 13 113 17 114 L49 122 C52 123 56 120 57 117 L66 84 Z"
        animate={{ fill: color }}
        transition={transition}
      />
      <path
        d="M68 44 L24 64 C20 66 16 71 14 76 L11 106 C10 110 13 113 17 114 L49 122 C52 123 56 120 57 117 L66 84 Z"
        fill="url(#poloSideShadowLeft)"
      />
      <path d="M11 104 L17 114 L49 122 L46 112 Z" fill="#000000" fillOpacity="0.09" />
      <line x1="16" y1="113" x2="48" y2="121" stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="1" />

      {/* Right Sleeve */}
      <motion.path
        d="M172 44 L216 64 C220 66 224 71 226 76 L229 106 C230 110 227 113 223 114 L191 122 C188 123 184 120 183 117 L174 84 Z"
        animate={{ fill: color }}
        transition={transition}
      />
      <path
        d="M172 44 L216 64 C220 66 224 71 226 76 L229 106 C230 110 227 113 223 114 L191 122 C188 123 184 120 183 117 L174 84 Z"
        fill="url(#poloSideShadowRight)"
      />
      <path d="M229 104 L223 114 L191 122 L194 112 Z" fill="#000000" fillOpacity="0.09" />
      <line x1="224" y1="113" x2="192" y2="121" stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="1" />

      {/* Torso Body */}
      <motion.path
        d="M68 44 C84 41 98 40 120 40 C142 40 156 41 172 44 L174 84 C173 115 178 160 178 206 C178 211 174 215 169 215 C139 217 101 217 71 215 C66 215 62 211 62 206 C62 160 67 115 66 84 Z"
        animate={{ fill: color }}
        transition={transition}
      />

      <path
        d="M68 44 L66 84 C67 115 62 160 62 206 C62 211 66 215 71 215 L86 215 C80 160 82 100 84 50 Z"
        fill="url(#poloSideShadowLeft)"
      />
      <path
        d="M172 44 L174 84 C173 115 178 160 178 206 C178 211 174 215 169 215 L154 215 C160 160 158 100 156 50 Z"
        fill="url(#poloSideShadowRight)"
      />
      <path
        d="M68 44 C84 41 98 40 120 40 C142 40 156 41 172 44 L172 65 C142 60 98 60 68 65 Z"
        fill="url(#poloTopHighlight)"
      />
      <path
        d="M63 203 C96 205 144 205 177 203"
        stroke="#000000"
        strokeOpacity="0.08"
        strokeWidth="1.5"
        strokeDasharray="3 2"
      />

      {/* Chest Mark on wearer's left chest */}
      <g transform="translate(144, 92)" className="opacity-90">
        <circle cx="9" cy="9" r="8" stroke="#FFFFFF" strokeWidth="1.2" fill="none" opacity="0.85" />
        <path
          d="M6 12V6L10 11V6"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 7C13 6.2 11.8 6.5 11.5 7.5C11.2 8.5 11.2 9.5 11.5 10.5C11.8 11.5 13 11.8 14 11"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>

      {/* Collar Drop Shadow */}
      <path
        d="M84 48 C100 68 120 74 120 74 C120 74 140 68 156 48 L152 78 C135 90 120 92 120 92 C120 92 105 90 88 78 Z"
        fill="url(#poloCollarShadow)"
      />

      {/* Button Placket */}
      <g>
        <motion.path
          d="M109 46 L131 46 C132 46 133 47 133 48 L133 112 C133 115 131 117 128 117 L112 117 C109 117 107 115 107 112 L107 48 C107 47 108 46 109 46 Z"
          animate={{ fill: color }}
          transition={transition}
        />
        <path
          d="M107 46 L133 46 L133 112 C133 115 131 117 128 117 L112 117 C109 117 107 115 107 112 Z"
          fill="url(#placketInnerDepth)"
        />
        <rect
          x="108"
          y="46"
          width="24"
          height="70"
          rx="1"
          stroke="#000000"
          strokeOpacity="0.08"
          strokeWidth="1"
          fill="none"
        />

        {/* Buttons */}
        <circle cx="120" cy="58" r="3.2" fill="#FFFFFF" />
        <circle cx="120" cy="58" r="3.2" stroke="#D1D5DB" strokeWidth="0.8" fill="none" />
        <circle cx="120" cy="78" r="3.2" fill="#FFFFFF" />
        <circle cx="120" cy="78" r="3.2" stroke="#D1D5DB" strokeWidth="0.8" fill="none" />
        <circle cx="120" cy="98" r="3.2" fill="#FFFFFF" />
        <circle cx="120" cy="98" r="3.2" stroke="#D1D5DB" strokeWidth="0.8" fill="none" />
      </g>

      {/* Ribbed Collar Flaps (Inner grey back collar removed as requested) */}
      <motion.path
        d="M94 38 C91 38 88 40 85 43 L72 65 C70 69 72 74 76 75 L116 86 C119 87 121 85 121 82 L118 46 C112 43 103 40 94 38 Z"
        animate={{ fill: color }}
        transition={transition}
      />
      <path
        d="M94 38 C91 38 88 40 85 43 L72 65 C70 69 72 74 76 75 L116 86 C119 87 121 85 121 82 L118 46 C112 43 103 40 94 38 Z"
        fill="#FFFFFF"
        fillOpacity="0.1"
      />
      <path d="M74 67 L114 85" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="1" />
      <path d="M73 66 L115 85" stroke="#000000" strokeOpacity="0.12" strokeWidth="0.8" strokeDasharray="2 2" />

      <motion.path
        d="M146 38 C149 38 152 40 155 43 L168 65 C170 69 168 74 164 75 L124 86 C121 87 119 85 119 82 L122 46 C128 43 137 40 146 38 Z"
        animate={{ fill: color }}
        transition={transition}
      />
      <path
        d="M146 38 C149 38 152 40 155 43 L168 65 C170 69 168 74 164 75 L124 86 C121 87 119 85 119 82 L122 46 C128 43 137 40 146 38 Z"
        fill="#FFFFFF"
        fillOpacity="0.1"
      />
      <path d="M166 67 L126 85" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="1" />
      <path d="M167 66 L125 85" stroke="#000000" strokeOpacity="0.12" strokeWidth="0.8" strokeDasharray="2 2" />
    </svg>
  );
};

export const PoloShirt: React.FC<PoloShirtProps> = ({
  color = '#7CB7FF',
  className = 'w-full h-auto',
}) => {
  const baseImgSrc = IMG_BASE + 'polo-base.png';
  const logoMarkSrc = IMG_BASE + 'logo-mark.png';

  const [imgState, setImgState] = useState<'loading' | 'loaded' | 'error'>(baseImgStatus);
  const [chestMarkError, setChestMarkError] = useState(false);

  // Black swatch tint: tint with #2B2B2E (not pure black) so fabric shading remains visible
  const isBlackSwatch =
    color.toLowerCase() === '#1d1d1f' ||
    color.toLowerCase() === '#000000' ||
    color.toLowerCase() === 'black';
  const effectiveColor = isBlackSwatch ? '#2B2B2E' : color;

  useEffect(() => {
    if (baseImgStatus === 'loaded' || baseImgStatus === 'error') {
      setImgState(baseImgStatus);
      return;
    }

    const listener = (status: 'loaded' | 'error') => {
      setImgState(status);
    };

    listeners.add(listener);
    initPreload(baseImgSrc);

    return () => {
      listeners.delete(listener);
    };
  }, [baseImgSrc]);

  // If polo-base.png failed to load, fall back to the clean SVG polo without collar back band
  if (imgState === 'error') {
    return (
      <div
        className={`relative aspect-square select-none ${className}`}
        style={{
          filter: 'drop-shadow(0 24px 30px rgba(0,0,0,0.12))',
        }}
      >
        <FallbackPoloSvg color={effectiveColor} />
      </div>
    );
  }

  // Realistic Image-Based Polo (3 stacked absolute layers)
  return (
    <div
      className={`relative aspect-square select-none ${className}`}
      style={{
        isolation: 'isolate',
        filter: 'drop-shadow(0 24px 30px rgba(0,0,0,0.12))',
      }}
      role="img"
      aria-label="New Classic Polo Shirt"
    >
      {/* 1) COLOR LAYER: masked to the shirt shape using polo-base.png */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: effectiveColor,
          WebkitMaskImage: `url("${baseImgSrc}")`,
          maskImage: `url("${baseImgSrc}")`,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          transition: 'background-color 0.45s ease',
        }}
      />

      {/* 2) SHADING LAYER: polo-base.png with mix-blend-mode: multiply */}
      <img
        src={baseImgSrc}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        style={{
          mixBlendMode: 'multiply',
        }}
      />

      {/* 3) CHEST MARK: logo-mark.png made white, width 11%, top 30%, right 31% */}
      {!chestMarkError && (
        <img
          src={logoMarkSrc}
          alt=""
          aria-hidden="true"
          onError={() => setChestMarkError(true)}
          className="absolute pointer-events-none select-none object-contain"
          style={{
            width: '11%',
            top: '30%',
            right: '31%',
            opacity: 0.9,
            filter: 'brightness(0) invert(1)',
          }}
        />
      )}
    </div>
  );
};

export default PoloShirt;
