/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { marquee } from '../data/content.ts';

export const Marquee: React.FC = () => {
  // Multiply items for smooth infinite loop without blank gaps
  const displayItems = [...marquee, ...marquee, ...marquee, ...marquee];

  return (
    <div className="relative my-4 md:my-6 overflow-x-hidden select-none">
      {/* Rotated band container */}
      <div className="transform -rotate-2 -mx-4 sm:-mx-8">
        <div className="bg-[#F26B3A] text-white py-3.5 sm:py-4 shadow-md overflow-hidden flex items-center marquee-container">
          <div className="marquee-track flex items-center gap-6 sm:gap-10 shrink-0">
            {displayItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-6 sm:gap-10 shrink-0">
                <span className="font-heading font-semibold text-base sm:text-lg md:text-[20px] tracking-tight whitespace-nowrap">
                  {item}
                </span>
                <span className="text-white/60 text-xs sm:text-sm" aria-hidden="true">
                  ✦
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
