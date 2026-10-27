/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { process as processItems, branches } from '../data/content.ts';
import IconBadge, { TINT_COLORS } from './IconBadge.tsx';
import Reveal from './Reveal.tsx';
import { useToast } from '../context/ToastContext.tsx';

export const ProcessSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { handleLineAction } = useToast();
  const branch1 = branches[0];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 50%'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="process"
      ref={containerRef}
      className="py-20 md:py-32 bg-[#F3EEE7] scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#F26B3A]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#F26B3A] uppercase font-heading">
                ขั้นตอน
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-[32px] sm:text-[42px] md:text-[48px] text-[#1D1D1F] leading-tight tracking-tight">
              สั่งง่าย 4 ขั้นตอน
            </h2>
          </div>
        </Reveal>

        {/* 1. DESKTOP TIMELINE (4 Columns in a Row with Horizontal Animated Connecting Dashed Line) */}
        <div className="relative hidden lg:block mb-16">
          {/* Animated Connecting Dashed Line Behind Cards */}
          <div className="absolute top-28 left-[12%] right-[12%] h-2 z-0 pointer-events-none">
            <svg className="w-full h-4 overflow-visible" preserveAspectRatio="none">
              <motion.line
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="#F26B3A"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                style={{
                  pathLength: shouldReduceMotion ? 1 : pathLength,
                }}
              />
            </svg>
          </div>

          <div className="grid grid-cols-4 gap-6 relative z-10">
            {processItems.map((item, idx) => {
              const tint = TINT_COLORS[idx % TINT_COLORS.length];

              return (
                <motion.div
                  key={item.no}
                  initial={
                    shouldReduceMotion
                      ? {}
                      : { opacity: 0, scale: 0.95, y: 24 }
                  }
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="bg-white rounded-[28px] p-8 border border-[#E7E0D7]/70 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Top row: Big Number + IconBadge */}
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className="font-heading font-extrabold text-5xl leading-none"
                        style={{ color: tint.icon }}
                      >
                        {item.no}
                      </span>
                      <IconBadge iconName={item.icon} index={idx} />
                    </div>

                    <h3 className="font-heading font-bold text-xl text-[#1D1D1F] mb-3">
                      {item.title}
                    </h3>
                    <p className="font-body text-[#6E6E73] text-sm leading-[1.7]">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 2. MOBILE / TABLET TIMELINE (Vertical timeline with connecting dashed line down the left side) */}
        <div className="relative lg:hidden mb-14 max-w-lg mx-auto">
          {/* Vertical dashed line */}
          <div className="absolute top-10 bottom-10 left-7 w-0.5 border-l-2 border-dashed border-[#F26B3A]/60 z-0 pointer-events-none" />

          <div className="space-y-6 relative z-10">
            {processItems.map((item, idx) => {
              const tint = TINT_COLORS[idx % TINT_COLORS.length];

              return (
                <motion.div
                  key={item.no}
                  initial={
                    shouldReduceMotion
                      ? {}
                      : { opacity: 0, scale: 0.96, y: 20 }
                  }
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#E7E0D7]/70 shadow-xs flex items-start gap-5 hover:shadow-md transition-shadow"
                >
                  <div className="shrink-0 flex flex-col items-center">
                    <IconBadge iconName={item.icon} index={idx} className="w-12 h-12 mb-2" />
                    <span
                      className="font-heading font-extrabold text-2xl leading-none"
                      style={{ color: tint.icon }}
                    >
                      {item.no}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-[#1D1D1F] mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-body text-[#6E6E73] text-sm leading-[1.6]">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Helper Note with LINE button */}
        <Reveal delay={0.2}>
          <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-sm font-body text-[#6E6E73]">
            <span>มีโลโก้หรือแบบที่ชอบ?</span>
            <button
              type="button"
              onClick={() => handleLineAction(branch1?.phone, branch1?.lineUrl)}
              className="inline-flex items-center gap-1.5 font-heading font-semibold text-[#06C755] hover:underline cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#06C755]" />
              <span>ส่งมาทาง LINE เพื่อประเมินได้เลย</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ProcessSection;
