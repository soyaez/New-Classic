/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { finalCta, branches } from '../data/content.ts';
import { useToast } from '../context/ToastContext.tsx';
import PoloShirt from './PoloShirt.tsx';
import Reveal from './Reveal.tsx';

export const FinalCtaSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { handleLineAction } = useToast();

  const primaryBranch = branches[0];

  const smoothScrollToQuote = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById('quote');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleLineClick = () => {
    handleLineAction(primaryBranch.lineUrl, primaryBranch.name);
  };

  // 3 fanned shirts: tangerine, sky, butter
  const ctaShirts = [
    {
      color: '#F26B3A', // tangerine
      rotate: -8,
      scale: 0.95,
      zIndex: 10,
      xOffset: '-18%',
      duration: 4.8,
      delay: 0,
    },
    {
      color: '#7CB7FF', // sky
      rotate: 0,
      scale: 1.05,
      zIndex: 20,
      xOffset: '0%',
      duration: 4.2,
      delay: 0.4,
    },
    {
      color: '#FFCE5C', // butter
      rotate: 8,
      scale: 0.95,
      zIndex: 10,
      xOffset: '18%',
      duration: 5.0,
      delay: 0.8,
    },
  ];

  return (
    <section id="finalcta" className="py-20 md:py-32 bg-[#FBF8F4] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative rounded-[32px] md:rounded-[40px] bg-[#1D1D1F] text-white p-8 sm:p-12 md:p-16 lg:p-[72px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
            {/* Background Radial Tangerine Glow */}
            <div
              className="absolute top-0 right-0 w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-[radial-gradient(ellipse_at_top_right,rgba(242,107,58,0.22),transparent_70%)] pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_bottom_left,rgba(242,107,58,0.08),transparent_70%)] pointer-events-none"
              aria-hidden="true"
            />

            {/* Content Grid: Desktop 2-column (text left, shirts right) / Mobile stacked (shirts top, text bottom) */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* SHIRTS CONTAINER: on mobile shows first, on desktop shows right (col 7-12) */}
              <div className="lg:order-2 lg:col-span-5 flex justify-center items-center py-4 select-none">
                <div className="relative w-full max-w-[320px] sm:max-w-[380px] aspect-[4/3] flex items-center justify-center">
                  {ctaShirts.map((shirt, idx) => (
                    <motion.div
                      key={idx}
                      className="absolute top-1/2 left-1/2 w-[72%] sm:w-[75%]"
                      style={{
                        zIndex: shirt.zIndex,
                        transformOrigin: '50% 80%',
                      }}
                      initial={
                        shouldReduceMotion
                          ? {
                              x: shirt.xOffset,
                              y: '-50%',
                              rotate: shirt.rotate,
                              scale: shirt.scale,
                            }
                          : {
                              opacity: 0,
                              scale: 0.5,
                              x: shirt.xOffset,
                              y: '-20%',
                              rotate: 0,
                            }
                      }
                      animate={
                        shouldReduceMotion
                          ? {
                              x: shirt.xOffset,
                              y: '-50%',
                              rotate: shirt.rotate,
                              scale: shirt.scale,
                            }
                          : {
                              opacity: 1,
                              x: shirt.xOffset,
                              scale: shirt.scale,
                              rotate: shirt.rotate,
                              y: ['-50%', '-56%', '-50%'],
                            }
                      }
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : {
                              opacity: { duration: 0.6, delay: 0.2 + idx * 0.1 },
                              scale: {
                                duration: 0.8,
                                delay: 0.2 + idx * 0.1,
                                type: 'spring',
                                stiffness: 120,
                              },
                              rotate: {
                                duration: 0.8,
                                delay: 0.2 + idx * 0.1,
                                type: 'spring',
                                stiffness: 100,
                              },
                              y: {
                                duration: shirt.duration,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: shirt.delay,
                              },
                            }
                      }
                    >
                      <PoloShirt color={shirt.color} />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* TEXT CONTENT: on desktop col 1-7 */}
              <div className="lg:order-1 lg:col-span-7 flex flex-col items-start text-left">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F26B3A]/20 text-[#FF8A5C] text-xs font-semibold tracking-wider font-heading uppercase mb-4">
                  พร้อมดูแลทุกคำสั่งซื้อ
                </span>

                <h2 className="font-heading font-extrabold text-[28px] sm:text-[38px] md:text-[44px] text-white leading-[1.2] tracking-tight mb-4">
                  {finalCta.title}
                </h2>

                <p className="font-body text-base sm:text-lg text-[#A1A1A6] leading-relaxed max-w-xl mb-8">
                  {finalCta.desc}
                </p>

                <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                  {/* Primary CTA Button */}
                  <a
                    href="#quote"
                    onClick={smoothScrollToQuote}
                    className="btn-shine-container w-full sm:w-auto inline-flex items-center justify-center gap-2 h-[54px] px-8 rounded-full bg-[#F26B3A] text-white font-heading font-semibold text-base shadow-[0_6px_20px_rgba(242,107,58,0.35)] hover:bg-[#FF8A5C] hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <span>{finalCta.button}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  {/* LINE Button */}
                  <button
                    type="button"
                    onClick={handleLineClick}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-[54px] px-7 rounded-full border border-white/30 text-white font-heading font-semibold text-base hover:bg-white/10 hover:border-white/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 text-[#5FCB9A]" />
                    <span>ทัก LINE</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FinalCtaSection;
