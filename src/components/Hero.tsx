/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { hero } from '../data/content.ts';
import PoloShirt from './PoloShirt.tsx';

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const shirtConfigs = [
    { color: '#F26B3A', rotate: -10, scale: 0.94, delay: 0, zIndex: 10, duration: 4.8 },
    { color: '#7CB7FF', rotate: -5, scale: 0.97, delay: 0.3, zIndex: 20, duration: 5.2 },
    { color: '#5FCB9A', rotate: 0, scale: 1.08, delay: 0.6, zIndex: 30, duration: 4.5 },
    { color: '#FFCE5C', rotate: 5, scale: 0.97, delay: 0.9, zIndex: 20, duration: 5.0 },
    { color: '#2F4B8F', rotate: 10, scale: 0.94, delay: 1.2, zIndex: 10, duration: 4.6 },
  ];

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="top"
      className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden min-h-[92vh] flex flex-col justify-between"
    >
      {/* Background soft ambient warm glow */}
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[350px] bg-gradient-to-b from-[#F26B3A]/8 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex-1 flex flex-col items-center">
        {/* Tangerine outline badge */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F26B3A]/40 bg-[#F26B3A]/5 text-[#F26B3A] text-xs sm:text-sm font-semibold tracking-wide mb-6 shadow-xs select-none"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{hero.badge}</span>
        </motion.div>

        {/* Headline + Handwritten Sriracha Accent Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main H1 Headline */}
          <motion.h1
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading font-extrabold text-[36px] sm:text-[54px] md:text-[68px] lg:text-[76px] leading-[1.18] sm:leading-[1.14] tracking-[-0.015em] text-[#1D1D1F]"
          >
            <span className="block">{hero.titleLine1}</span>
            <span className="block mt-1 sm:mt-0">
              {hero.titleLine2Prefix}
              <span className="text-[#F26B3A] inline-block">{hero.titleLine2Highlight}</span>
            </span>
          </motion.h1>

          {/* Handwritten Sriracha accent note with self-drawing squiggle */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.85, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block absolute -top-4 -right-28 xl:-right-36 select-none text-left z-20 pointer-events-none"
          >
            <div className="font-accent text-[#6E6E73] text-[19px] xl:text-[21px] leading-tight flex flex-col gap-0.5">
              {hero.handwritten.map((line, idx) => (
                <span key={idx}>{line}</span>
              ))}
            </div>
            {/* Hand-drawn tangerine squiggle underline */}
            <svg
              className="w-28 h-6 mt-1 text-[#F26B3A]"
              viewBox="0 0 110 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M4 14C22 18 38 7 54 13C68 18 84 9 104 15"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: 'easeInOut' }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Mobile handwritten note display */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:hidden mt-3 mb-2 text-center"
        >
          <div className="font-accent text-[#6E6E73] text-[16px] leading-snug flex items-center justify-center gap-2">
            <span>{hero.handwritten.join(' · ')}</span>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-body text-[#6E6E73] text-base sm:text-[18px] md:text-[19px] leading-[1.7] max-w-[680px] mx-auto mt-4 sm:mt-6"
        >
          {hero.subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-lg"
        >
          {/* Primary Pill */}
          <a
            href="#quote"
            onClick={(e) => smoothScroll(e, '#quote')}
            className="btn-shine-container w-full sm:w-auto h-[52px] px-8 rounded-full bg-[#F26B3A] text-white font-heading font-semibold text-[16px] shadow-[0_4px_16px_rgba(242,107,58,0.28)] hover:bg-[#FF8A5C] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center"
          >
            {hero.ctaPrimary}
          </a>

          {/* Secondary Pill */}
          <a
            href="#portfolio"
            onClick={(e) => smoothScroll(e, '#portfolio')}
            className="w-full sm:w-auto h-[52px] px-7 rounded-full bg-white text-[#1D1D1F] border-[1.5px] border-[#E7E0D7] hover:border-[#F26B3A] hover:text-[#F26B3A] font-heading font-medium text-[16px] shadow-xs active:scale-[0.98] transition-all duration-200 flex items-center justify-center"
          >
            {hero.ctaSecondary}
          </a>

          {/* Text Link: Map */}
          <a
            href="#branches"
            onClick={(e) => smoothScroll(e, '#branches')}
            className="inline-flex items-center gap-1 text-[15px] font-medium text-[#1D1D1F] hover:text-[#F26B3A] transition-colors py-2 px-1 group"
          >
            <span>{hero.ctaMap}</span>
            <ChevronRight className="w-4 h-4 text-[#F26B3A] transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* 5 Polo Shirts Fanned Out in One Row (Matching Mockup) */}
        <div className="relative w-full max-w-4xl mt-12 sm:mt-16 pt-2 pb-8 flex flex-col items-center select-none overflow-visible">
          {/* Fan container: one row, overlapping each other by ~30%, scaled to fit screen width on mobile */}
          <div className="relative w-full flex items-center justify-center -space-x-[24%] xs:-space-x-[26%] sm:-space-x-[28%] md:-space-x-[30%] py-4">
            {shirtConfigs.map((config, index) => (
              <motion.div
                key={index}
                style={{
                  zIndex: config.zIndex,
                }}
                initial={
                  shouldReduceMotion
                    ? { rotate: config.rotate, scale: config.scale }
                    : { opacity: 0, scale: 0.4, y: 55, rotate: 0 }
                }
                animate={
                  shouldReduceMotion
                    ? { rotate: config.rotate, scale: config.scale }
                    : {
                        opacity: 1,
                        scale: config.scale,
                        rotate: config.rotate,
                        y: [0, -9, 0],
                      }
                }
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        scale: config.scale * 1.06,
                        zIndex: 40,
                        transition: { duration: 0.2 },
                      }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        opacity: { duration: 0.8, delay: 0.6 + index * 0.08 },
                        scale: { duration: 0.9, delay: 0.6 + index * 0.08, type: 'spring', stiffness: 120 },
                        rotate: { duration: 0.9, delay: 0.6 + index * 0.08, type: 'spring', stiffness: 100 },
                        y: {
                          duration: config.duration,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: config.delay,
                        },
                      }
                }
                className="w-[28%] xs:w-[26%] sm:w-[24%] md:w-[22%] max-w-[240px] shrink-0 cursor-pointer pointer-events-auto transition-transform"
              >
                <PoloShirt color={config.color} className="w-full h-auto" />
              </motion.div>
            ))}
          </div>

          {/* Soft Elliptical Shadow Underneath the Fanned Shirts */}
          <div
            className="w-[78%] max-w-[580px] h-7 -mt-1 bg-gradient-to-r from-transparent via-black/15 to-transparent rounded-[100%] blur-md pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
