/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { services } from '../data/content.ts';
import SmartImage from './SmartImage.tsx';
import Reveal from './Reveal.tsx';

const TAG_TINTS = [
  'bg-[#E3F0FF] text-[#3B82D6]', // sky
  'bg-[#DDF5EA] text-[#2E9E6A]', // mint
  'bg-[#FFF4D6] text-[#C99212]', // butter
  'bg-[#FDE6DC] text-[#F26B3A]', // tangerine
];

export const ServicesSection: React.FC = () => {
  const smoothScrollToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('quote');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const featureService = services[0];
  const otherServices = services.slice(1);

  return (
    <section id="services" className="py-20 md:py-32 bg-[#F3EEE7] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#F26B3A]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#F26B3A] uppercase font-heading">
                บริการ
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-[32px] sm:text-[42px] md:text-[48px] text-[#1D1D1F] leading-tight tracking-tight mb-3">
              สินค้าและบริการของเรา
            </h2>
            <p className="font-body text-base sm:text-lg text-[#6E6E73] leading-relaxed">
              ครบทั้งเสื้อเปล่า งานสั่งผลิต ปัก และสกรีน ในที่เดียว
            </p>
          </div>
        </Reveal>

        {/* Bento Grid */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* 1. Wide Feature Card: First service */}
          {featureService && (
            <Reveal delay={0.1}>
              <div className="group bg-white rounded-[28px] overflow-hidden border border-[#E7E0D7]/70 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  {/* Text Left */}
                  <div className="p-8 sm:p-10 lg:p-12 lg:col-span-7 flex flex-col justify-between h-full">
                    <div>
                      <div className="inline-block px-3 py-1 rounded-full bg-[#FDE6DC] text-[#F26B3A] text-xs font-semibold uppercase tracking-wider mb-4 font-heading">
                        พร้อมส่ง & ขายส่ง
                      </div>
                      <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#1D1D1F] mb-4 leading-snug">
                        {featureService.title}
                      </h3>
                      <p className="font-body text-[#6E6E73] text-base sm:text-[17px] leading-[1.7] mb-6 max-w-xl">
                        {featureService.desc}
                      </p>
                    </div>

                    <div>
                      <a
                        href="#quote"
                        onClick={smoothScrollToQuote}
                        className="inline-flex items-center gap-1.5 font-heading font-semibold text-sm text-[#F26B3A] hover:text-[#FF8A5C] transition-colors group/link"
                      >
                        <span>สอบถามบริการนี้</span>
                        <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </a>
                    </div>
                  </div>

                  {/* Image Right */}
                  <div className="lg:col-span-5 h-full overflow-hidden aspect-[16/10] lg:aspect-auto min-h-[260px] lg:min-h-[340px]">
                    <div className="w-full h-full overflow-hidden">
                      <SmartImage
                        name={featureService.image}
                        alt={featureService.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* 2. Three Column Row: Other 3 services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {otherServices.map((service, idx) => (
              <Reveal key={service.title} delay={0.15 * (idx + 1)}>
                <div className="group bg-white rounded-[28px] overflow-hidden border border-[#E7E0D7]/70 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  {/* Image on top (aspect 4/3) with slow hover zoom */}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#F3EEE7]">
                    <SmartImage
                      name={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#1D1D1F] mb-3 leading-snug">
                        {service.title}
                      </h3>
                      <p className="font-body text-[#6E6E73] text-sm sm:text-base leading-[1.7] mb-4">
                        {service.desc}
                      </p>

                      {/* Tags for Screen Printing (cyclical pastel tints) */}
                      {service.tags && service.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {service.tags.map((tag, tagIdx) => {
                            const tintClass = TAG_TINTS[tagIdx % TAG_TINTS.length];
                            return (
                              <span
                                key={tag}
                                className={`px-2.5 py-1 rounded-full text-xs font-medium font-body ${tintClass}`}
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div className="pt-2">
                      <a
                        href="#quote"
                        onClick={smoothScrollToQuote}
                        className="inline-flex items-center gap-1 font-heading font-semibold text-sm text-[#F26B3A] hover:text-[#FF8A5C] transition-colors group/link"
                      >
                        <span>สอบถามบริการนี้</span>
                        <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
