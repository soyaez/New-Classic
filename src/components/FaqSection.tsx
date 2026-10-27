/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { faq } from '../data/content.ts';
import Reveal from './Reveal.tsx';

export const FaqSection: React.FC = () => {
  // First item open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const smoothScrollToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('quote');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-[#FBF8F4] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: Sticky Title & CTA (5/12) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#F26B3A]" />
                  <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#F26B3A] uppercase font-heading">
                    คำถาม
                  </span>
                </div>

                <h2 className="font-heading font-extrabold text-[32px] sm:text-[40px] md:text-[44px] text-[#1D1D1F] leading-tight tracking-tight mb-4">
                  คำถามที่พบบ่อย
                </h2>

                <p className="font-body text-base sm:text-lg text-[#6E6E73] leading-relaxed mb-8">
                  ไม่เจอคำตอบที่ต้องการ? ทักมาคุยกับแอดมินได้เลย
                  เราพร้อมให้คำแนะนำและประเมินงานอย่างตรงไปตรงมา
                </p>

                <a
                  href="#quote"
                  onClick={smoothScrollToQuote}
                  className="btn-shine-container inline-flex items-center justify-center h-[52px] px-8 rounded-full bg-[#F26B3A] text-white font-heading font-semibold text-base shadow-[0_4px_16px_rgba(242,107,58,0.28)] hover:bg-[#FF8A5C] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  สอบถามเพิ่มเติม
                </a>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN: Accordion Rows (7/12) */}
          <div className="lg:col-span-7 flex flex-col gap-3 sm:gap-3.5">
            {faq.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  className="bg-white rounded-[20px] border border-[#E7E0D7]/70 shadow-xs overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F26B3A] rounded-[20px]"
                  >
                    <span className="font-heading font-semibold text-base sm:text-lg text-[#1D1D1F] leading-snug">
                      {item.q}
                    </span>

                    {/* Rotating Plus Icon in Tangerine-tint Circle */}
                    <div
                      className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#F26B3A] text-white rotate-45 shadow-2xs'
                          : 'bg-[#FDE6DC] text-[#F26B3A] rotate-0'
                      }`}
                    >
                      <Plus className="w-5 h-5 stroke-[2.2]" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-[#6E6E73] font-body text-sm sm:text-base leading-relaxed border-t border-[#E7E0D7]/40">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
