/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

export const IMG_BASE = '/public/';

interface MonogramProps {
  size?: 'header' | 'footer';
  variant?: 'color' | 'mono';
  className?: string;
}

export const MonogramFallbackSvg: React.FC<{
  size?: 'header' | 'footer';
  variant?: 'color' | 'mono';
  className?: string;
}> = ({ size = 'header', variant = 'color', className = '' }) => {
  const isColor = variant === 'color';
  const orange = '#F26B3A';
  const strokeColor = isColor ? orange : 'currentColor';
  const dotColor = isColor ? orange : 'currentColor';
  const heightClass = size === 'footer' ? 'h-[56px]' : 'h-[44px]';

  return (
    <svg
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 w-auto object-contain transition-transform duration-300 group-hover:scale-105 select-none ${heightClass} ${className}`}
      aria-hidden="true"
    >
      {/* 
        Bare orange #F26B3A monogram on transparent background (no rounded-square tile)
        Left: 'N' stem & diagonal collar fold
        Right: 'C' open curve collar fold
        Center: placket with 2 buttons
      */}
      <path
        d="M13 14v24M13 16l13 16V14"
        stroke={strokeColor}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39 16c-2.5-2-6-2.5-9.5-1-4.2 1.8-6.5 6.2-6.5 11s2.3 9.2 6.5 11c3.5 1.5 7 1 9.5-1"
        stroke={strokeColor}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="26" cy="22" r="2.2" fill={dotColor} />
      <circle cx="26" cy="30" r="2.2" fill={dotColor} />
    </svg>
  );
};

export const Monogram: React.FC<MonogramProps> = ({
  size = 'header',
  variant = 'color',
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);
  const heightClass = size === 'footer' ? 'h-[56px]' : 'h-[44px]';

  if (hasError) {
    return <MonogramFallbackSvg size={size} variant={variant} className={className} />;
  }

  return (
    <img
      src={IMG_BASE + 'logo-mark.png'}
      alt="New Classic"
      onError={() => setHasError(true)}
      onLoad={(e) => {
        if (e.currentTarget.naturalWidth === 0) {
          setHasError(true);
        }
      }}
      className={`shrink-0 w-auto object-contain select-none transition-transform duration-300 group-hover:scale-105 ${heightClass} ${className}`}
    />
  );
};

export interface LogoProps {
  size?: 'header' | 'footer';
  variant?: 'color' | 'mono';
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'header',
  variant = 'color',
  showSubtitle = true,
  className = '',
}) => {
  const isColor = variant === 'color';
  const textColor = isColor ? 'text-[#1D1D1F]' : 'text-white';
  const subTextColor = isColor ? 'text-[#6E6E73]' : 'text-white/70';

  const headingSizeClass =
    size === 'footer'
      ? 'text-[21px] md:text-[23px]'
      : 'text-[19px] md:text-[21px]';

  const subtitleSizeClass =
    size === 'footer'
      ? 'text-[12px] md:text-[13px]'
      : 'text-[11px] md:text-[12px]';

  return (
    <div className={`inline-flex items-center gap-[12px] group select-none ${className}`}>
      <Monogram size={size} variant={variant} />
      <div className="flex flex-col justify-center">
        <span
          className={`font-heading font-extrabold tracking-tight leading-tight ${headingSizeClass} ${textColor}`}
        >
          NEW CLASSIC
        </span>
        {showSubtitle && (
          <span
            className={`font-body font-normal tracking-normal leading-none mt-0.5 ${subtitleSizeClass} ${subTextColor}`}
          >
            เสื้อโปโล บางใหญ่ · บางบัวทอง
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
