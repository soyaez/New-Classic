/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { colors } from '../data/content.ts';
import PoloShirt from './PoloShirt.tsx';
import Reveal from './Reveal.tsx';

export const ColorPicker: React.FC = () => {
  // Default selected color: ฟ้า
  const defaultIndex = colors.swatches.findIndex((s) => s.name === 'ฟ้า');
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex !== -1 ? defaultIndex : 1);
  const [bounceKey, setBounceKey] = useState(0);

  const selectedSwatch = colors.swatches[selectedIndex] || colors.swatches[0];

  const handleSelectColor = (index: number) => {
    if (index !== selectedIndex) {
      setSelectedIndex(index);
      setBounceKey((prev) => prev + 1);
    }
  };

  return (
    <section id="colors" className="py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          {/* Big Rounded Container in bgAlt (#F3EEE7) */}
          <div className="bg-[#F3EEE7] rounded-[28px] sm:rounded-[36px] p-6 sm:p-12 md:p-16 border border-[#E7E0D7] shadow-sm text-center relative overflow-hidden">
            {/* Soft background ambient gradient */}
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-white/60 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              {/* Tangerine Badge */}
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#F26B3A]" />
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#F26B3A] uppercase font-heading">
                  COLOR PALETTE
                </span>
              </div>

              {/* Centered H2 */}
              <h2 className="font-heading font-extrabold text-[30px] sm:text-[40px] md:text-[44px] leading-tight text-[#1D1D1F] tracking-tight mb-2">
                {colors.title}
              </h2>

              <p className="font-body text-[#6E6E73] text-sm sm:text-base mb-8 sm:mb-10">
                สัมผัสความหลากหลายของเฉดสีมาตรฐาน พร้อมบริการเทียบสีตามอัตลักษณ์องค์กรของคุณ
              </p>

              {/* Large Animated Polo Shirt Display */}
              <div className="relative my-2 sm:my-4 flex flex-col items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={bounceKey}
                    initial={{ scale: 0.96, rotate: -2 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                    className="w-[220px] sm:w-[280px] md:w-[320px] filter drop-shadow-2xl"
                  >
                    <PoloShirt color={selectedSwatch.hex} className="w-full h-auto" />
                  </motion.div>
                </AnimatePresence>

                {/* Soft Elliptical Ground Shadow */}
                <div
                  className="w-48 sm:w-64 h-5 -mt-3 bg-gradient-to-r from-transparent via-black/15 to-transparent rounded-[100%] blur-sm pointer-events-none"
                  aria-hidden="true"
                />

                {/* Selected Color Name Badge */}
                <motion.div
                  key={`name-${selectedSwatch.name}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-5 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white shadow-xs border border-[#E7E0D7]"
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: selectedSwatch.hex }}
                  />
                  <span className="font-heading font-medium text-sm sm:text-base text-[#1D1D1F]">
                    สี: {selectedSwatch.name}
                  </span>
                </motion.div>
              </div>

              {/* Row of 8 Round Color Swatches */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
                {colors.swatches.map((swatch, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={swatch.name}
                      type="button"
                      onClick={() => handleSelectColor(idx)}
                      className={`w-11 h-11 rounded-full transition-all duration-200 cursor-pointer shadow-sm relative flex items-center justify-center ${
                        isSelected
                          ? 'ring-3 ring-[#1D1D1F] ring-offset-3 ring-offset-[#F3EEE7] scale-110 z-10'
                          : 'hover:scale-110 active:scale-95 opacity-90 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: swatch.hex }}
                      aria-label={`เลือกสี ${swatch.name}`}
                      title={swatch.name}
                    >
                      {/* Inner border for very light colors so they stay visible */}
                      <span className="w-full h-full rounded-full border border-black/10 block" />
                    </button>
                  );
                })}
              </div>

              {/* Caption Below */}
              <p className="font-body text-[#6E6E73] text-xs sm:text-sm mt-8 max-w-lg leading-relaxed">
                {colors.caption}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ColorPicker;
