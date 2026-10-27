/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { vision, missions } from '../data/content.ts';
import Reveal from './Reveal.tsx';

const MISSION_TINT_COLORS = [
  '#F26B3A', // tangerine
  '#3B82D6', // sky
  '#2E9E6A', // mint
  '#C99212', // butter
  '#2F4B8F', // navy
];

export const VisionSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="vision" className="py-20 md:py-32 bg-[#FBF8F4] scroll-mt-20 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. VISION BLOCK */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#F26B3A]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#F26B3A] uppercase font-heading">
                วิสัยทัศน์
              </span>
            </div>
            <p className="font-body text-lg sm:text-[21px] text-[#1D1D1F] leading-[1.8] font-medium max-w-[760px] mx-auto">
              "{vision}"
            </p>
          </div>
        </Reveal>

        {/* 2. THE PROMISE QUOTE WITH DRAWN HIGHLIGHTER */}
        <Reveal delay={0.1}>
          <div className="relative max-w-4xl mx-auto my-12 sm:my-20 p-8 sm:p-14 text-center rounded-[32px] bg-white border border-[#E7E0D7]/60 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            {/* Soft decorative quotation marks */}
            <div
              className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#FDE6DC] flex items-center justify-center text-[#F26B3A] font-heading font-extrabold text-3xl shadow-xs"
              aria-hidden="true"
            >
              “
            </div>

            <div className="pt-2">
              <h3 className="font-heading font-bold text-[26px] sm:text-[38px] md:text-[44px] text-[#1D1D1F] leading-[1.3] tracking-tight">
                <span>ซื่อสัตย์ทุกคำแนะนำ </span>
                <span className="text-[#F26B3A]">เป็นมิตรทุกการบริการ </span>
                <span className="relative inline-block whitespace-nowrap">
                  <span className="relative z-10">ราคาสมเหตุสมผล</span>
                  {/* Butter-yellow highlighter stroke that draws in from left */}
                  <motion.span
                    initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -bottom-1 left-0 right-0 h-[40%] bg-[#FFCE5C]/45 rounded-sm -z-0 origin-left"
                    style={{ transformOrigin: 'left' }}
                  />
                </span>
              </h3>
            </div>
          </div>
        </Reveal>

        {/* 3. MISSIONS (Horizontal swipe on mobile, 5 columns on desktop) */}
        <div className="mt-16 sm:mt-24">
          <Reveal delay={0.15}>
            <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#F26B3A]" />
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#F26B3A] uppercase font-heading">
                  พันธกิจของเรา
                </span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1D1D1F]">
                ความมุ่งมั่น 5 ด้านที่ New Classic ยึดถือ
              </h3>
            </div>
          </Reveal>

          {/* Cards container: horizontal snap on mobile, 5 columns on desktop */}
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-5 overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 sm:gap-5 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
            {missions.map((mission, idx) => {
              const tintColor = MISSION_TINT_COLORS[idx % MISSION_TINT_COLORS.length];
              const numStr = `0${idx + 1}`;

              return (
                <div
                  key={mission.title}
                  className="w-[85vw] max-w-[280px] shrink-0 snap-center md:w-auto md:max-w-none bg-white rounded-[24px] p-6 sm:p-7 border border-[#E7E0D7]/70 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Big colored number */}
                    <span
                      className="font-heading font-extrabold text-4xl sm:text-[44px] leading-none block mb-4"
                      style={{ color: tintColor }}
                    >
                      {numStr}
                    </span>
                    <h4 className="font-heading font-semibold text-lg text-[#1D1D1F] mb-3 leading-snug">
                      {mission.title}
                    </h4>
                    <p className="font-body text-sm text-[#6E6E73] leading-[1.7]">
                      {mission.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
