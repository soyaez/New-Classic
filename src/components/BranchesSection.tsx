/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Navigation,
  Info,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { branches, BranchItem } from '../data/content.ts';
import { useToast } from '../context/ToastContext.tsx';
import SmartImage from './SmartImage.tsx';
import Reveal from './Reveal.tsx';

const PROVINCE_TINTS = [
  'bg-[#FDE6DC] text-[#F26B3A]',
  'bg-[#E3F0FF] text-[#3B82D6]',
  'bg-[#DDF5EA] text-[#2E9E6A]',
  'bg-[#FFF4D6] text-[#C99212]',
];

export const BranchesSection: React.FC = () => {
  const [activeBranchId, setActiveBranchId] = useState<number>(1);
  const [carouselActiveIndex, setCarouselActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { handleLineAction } = useToast();

  const activeBranch: BranchItem =
    branches.find((b) => b.id === activeBranchId) || branches[0];

  // Mobile Carousel scroll listener to update dot indicators
  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    const newIndex = Math.round(scrollLeft / (clientWidth * 0.85));
    if (newIndex >= 0 && newIndex < branches.length) {
      setCarouselActiveIndex(newIndex);
    }
  };

  const scrollToIndex = (idx: number) => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.clientWidth * 0.85 + 16;
    carouselRef.current.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth',
    });
    setCarouselActiveIndex(idx);
    setActiveBranchId(branches[idx].id);
  };

  return (
    <section id="branches" className="py-20 md:py-32 bg-[#F3EEE7] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#F26B3A]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#F26B3A] uppercase font-heading">
                สาขา
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-[32px] sm:text-[42px] md:text-[48px] text-[#1D1D1F] leading-tight tracking-tight mb-3">
              แวะมาดูสินค้าจริงได้ 4 สาขา
            </h2>
            <p className="font-body text-base sm:text-lg text-[#6E6E73] leading-relaxed">
              เลือกสาขาที่ใกล้คุณ ดูเวลาเปิด โทร หรือกดนำทางได้ทันที
            </p>
          </div>
        </Reveal>

        {/* Desktop 2-Column (Left: 2x2 cards, Right: Sticky Map) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: 2x2 Grid of Branch Cards (7/12) */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-5">
            {branches.map((b, idx) => {
              const isActive = b.id === activeBranchId;
              const provinceTint = PROVINCE_TINTS[idx % PROVINCE_TINTS.length];

              return (
                <div
                  key={b.id}
                  onClick={() => setActiveBranchId(b.id)}
                  className={`bg-white rounded-[24px] overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'border-2 border-[#F26B3A] shadow-xl -translate-y-1'
                      : 'border border-[#E7E0D7] shadow-xs hover:border-[#F26B3A]/40 hover:-translate-y-0.5'
                  }`}
                >
                  {/* Branch Photo */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F3EEE7]">
                    <SmartImage
                      name={b.image}
                      alt={b.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Province Badge */}
                    <div
                      className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold font-heading shadow-xs ${provinceTint}`}
                    >
                      {b.province}
                    </div>
                  </div>

                  {/* Branch Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-lg text-[#1D1D1F] leading-snug">
                        {b.name}
                      </h3>
                      <p className="font-body text-xs text-[#6E6E73] mt-0.5 mb-3">
                        {b.subName}
                      </p>

                      {/* Address */}
                      <div className="flex items-start gap-2 text-xs text-[#6E6E73] font-body mb-2.5">
                        <MapPin className="w-4 h-4 text-[#F26B3A] shrink-0 mt-0.5" />
                        <span className="line-clamp-2 leading-relaxed">{b.address}</span>
                      </div>

                      {/* Hours */}
                      <div className="flex items-start gap-2 text-xs font-body mb-3">
                        <Clock className="w-4 h-4 text-[#6E6E73] shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-1">
                          {b.hours.map((h, hIdx) => {
                            if (h.includes('ไม่แน่นอน')) {
                              return (
                                <span
                                  key={hIdx}
                                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#FFF4D6] text-[#8A610A] text-[11px] font-medium"
                                >
                                  <Info className="w-3 h-3 text-[#C99212]" />
                                  <span>{h}</span>
                                </span>
                              );
                            }
                            return (
                              <span key={hIdx} className="text-[#6E6E73]">
                                {h}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center gap-2 text-xs text-[#1D1D1F] font-body mb-4">
                        <Phone className="w-3.5 h-3.5 text-[#5FCB9A] shrink-0" />
                        <span className="font-medium font-heading">{b.phone}</span>
                      </div>
                    </div>

                    {/* Bottom 3 Action Buttons */}
                    <div
                      className="pt-3 border-t border-[#E7E0D7] grid grid-cols-3 gap-1.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* นำทาง */}
                      <a
                        href={b.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-8 px-2 rounded-full bg-[#F26B3A] text-white font-heading font-medium text-xs flex items-center justify-center gap-1 shadow-2xs hover:bg-[#FF8A5C] transition-colors"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>นำทาง</span>
                      </a>

                      {/* โทร */}
                      <a
                        href={`tel:${b.tel}`}
                        className="h-8 px-2 rounded-full bg-[#FBF8F4] text-[#1D1D1F] border border-[#E7E0D7] hover:border-[#F26B3A] font-heading font-medium text-xs flex items-center justify-center gap-1 transition-colors"
                      >
                        <Phone className="w-3 h-3 text-[#5FCB9A]" />
                        <span>โทร</span>
                      </a>

                      {/* LINE */}
                      <button
                        type="button"
                        onClick={() => handleLineAction(b.phone, b.lineUrl)}
                        title={b.lineLabel}
                        aria-label={b.lineLabel}
                        className="h-8 px-2 rounded-full bg-[#FBF8F4] text-[#1D1D1F] border border-[#E7E0D7] hover:border-[#06C755] hover:text-[#06C755] font-heading font-medium text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3 h-3 text-[#06C755]" />
                        <span>LINE</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Sticky Map Card (5/12) */}
          <div className="lg:col-span-5 sticky top-28 h-[600px] rounded-[28px] overflow-hidden border border-[#E7E0D7] shadow-md bg-white flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBranch.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="relative w-full h-full flex flex-col"
              >
                {/* Floating Top Header Info Badge */}
                <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full border border-[#E7E0D7] shadow-sm pointer-events-auto">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F26B3A] shrink-0" />
                    <span className="font-heading font-bold text-xs sm:text-sm text-[#1D1D1F] truncate">
                      {activeBranch.name}
                    </span>
                  </div>
                  <a
                    href={activeBranch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#F26B3A] hover:underline shrink-0 font-heading"
                  >
                    <span>เปิดใน Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Google Maps Embed iframe */}
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(activeBranch.mapQuery)}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={activeBranch.name}
                  className="w-full h-full border-0"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile & Tablet Version */}
        <div className="lg:hidden flex flex-col gap-6">
          {/* Mobile Swipe Carousel with scroll snap */}
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4 -mx-4 px-4"
          >
            {branches.map((b, idx) => {
              const isActive = b.id === activeBranchId;
              const provinceTint = PROVINCE_TINTS[idx % PROVINCE_TINTS.length];

              return (
                <div
                  key={b.id}
                  onClick={() => setActiveBranchId(b.id)}
                  className={`w-[85vw] max-w-[340px] shrink-0 snap-center bg-white rounded-[24px] overflow-hidden flex flex-col justify-between transition-all ${
                    isActive
                      ? 'border-2 border-[#F26B3A] shadow-md'
                      : 'border border-[#E7E0D7] shadow-xs'
                  }`}
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F3EEE7]">
                    <SmartImage
                      name={b.image}
                      alt={b.name}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold font-heading shadow-xs ${provinceTint}`}
                    >
                      {b.province}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-lg text-[#1D1D1F]">
                        {b.name}
                      </h3>
                      <p className="font-body text-xs text-[#6E6E73] mt-0.5 mb-2.5">
                        {b.subName}
                      </p>

                      <div className="flex items-start gap-2 text-xs text-[#6E6E73] font-body mb-2">
                        <MapPin className="w-3.5 h-3.5 text-[#F26B3A] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{b.address}</span>
                      </div>

                      <div className="flex items-start gap-2 text-xs font-body mb-2.5">
                        <Clock className="w-3.5 h-3.5 text-[#6E6E73] shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-0.5">
                          {b.hours.map((h, hIdx) => (
                            <span
                              key={hIdx}
                              className={
                                h.includes('ไม่แน่นอน')
                                  ? 'text-[#8A610A] bg-[#FFF4D6] px-1.5 py-0.5 rounded text-[11px]'
                                  : 'text-[#6E6E73]'
                              }
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#1D1D1F] font-body mb-3">
                        <Phone className="w-3.5 h-3.5 text-[#5FCB9A] shrink-0" />
                        <span className="font-medium font-heading">{b.phone}</span>
                      </div>
                    </div>

                    <div
                      className="pt-3 border-t border-[#E7E0D7] grid grid-cols-3 gap-1.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a
                        href={b.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-8 px-2 rounded-full bg-[#F26B3A] text-white font-heading font-medium text-xs flex items-center justify-center gap-1 shadow-2xs"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>นำทาง</span>
                      </a>
                      <a
                        href={`tel:${b.tel}`}
                        className="h-8 px-2 rounded-full bg-[#FBF8F4] text-[#1D1D1F] border border-[#E7E0D7] font-heading font-medium text-xs flex items-center justify-center gap-1"
                      >
                        <Phone className="w-3 h-3 text-[#5FCB9A]" />
                        <span>โทร</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => handleLineAction(b.phone, b.lineUrl)}
                        className="h-8 px-2 rounded-full bg-[#FBF8F4] text-[#1D1D1F] border border-[#E7E0D7] font-heading font-medium text-xs flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <MessageCircle className="w-3 h-3 text-[#06C755]" />
                        <span>LINE</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Dot Indicators */}
          <div className="flex items-center justify-center gap-2 pb-2">
            {branches.map((b, idx) => (
              <button
                key={b.id}
                type="button"
                onClick={() => scrollToIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  carouselActiveIndex === idx
                    ? 'w-6 bg-[#F26B3A]'
                    : 'w-2 bg-[#E7E0D7] hover:bg-[#6E6E73]'
                }`}
                aria-label={`เลื่อนไปสาขา ${b.name}`}
              />
            ))}
          </div>

          {/* Map Below Cards on Mobile/Tablet */}
          <div className="h-[380px] rounded-[24px] overflow-hidden border border-[#E7E0D7] shadow-sm bg-white relative">
            <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-[#E7E0D7] shadow-xs">
              <span className="font-heading font-bold text-xs text-[#1D1D1F] truncate">
                {activeBranch.name}
              </span>
              <a
                href={activeBranch.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#F26B3A] font-heading"
              >
                <span>เปิดในแผนที่</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(activeBranch.mapQuery)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={activeBranch.name}
              className="w-full h-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchesSection;
