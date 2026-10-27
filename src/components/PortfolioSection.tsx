/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolio, PortfolioItem } from '../data/content.ts';
import SmartImage from './SmartImage.tsx';
import Reveal from './Reveal.tsx';

export const PortfolioSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('ทั้งหมด');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filtered items
  const filteredItems = selectedFilter === 'ทั้งหมด'
    ? portfolio.items
    : portfolio.items.filter((item) => item.category === selectedFilter);

  // Lightbox keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
      }
    },
    [lightboxIndex, filteredItems.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  // Touch swipe support for mobile lightbox
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;

    // Minimum swipe distance threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe right -> Prev
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else {
        // Swipe left -> Next
        setLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
      }
    }
    touchStartX.current = null;
  };

  const currentItem: PortfolioItem | undefined =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : undefined;

  const smoothScrollToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('quote');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-[#FBF8F4] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#F26B3A]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#F26B3A] uppercase font-heading">
                ผลงาน
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-[32px] sm:text-[42px] md:text-[48px] text-[#1D1D1F] leading-tight tracking-tight mb-3">
              ผลงานของเรา
            </h2>
            <p className="font-body text-base sm:text-lg text-[#6E6E73] leading-relaxed">
              ตัวอย่างงานเสื้อองค์กร ทีม และกิจกรรม ที่เราผลิตให้ลูกค้า
            </p>
          </div>
        </Reveal>

        {/* Filter Tabs with Sliding Active Pill */}
        <div className="flex items-center justify-center gap-2 mb-10 sm:mb-14 flex-wrap">
          {portfolio.filters.map((filter) => {
            const isActive = selectedFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer select-none ${
                  isActive ? 'text-white' : 'text-[#1D1D1F] hover:text-[#F26B3A] bg-white border border-[#E7E0D7]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="portfolioActiveFilter"
                    className="absolute inset-0 bg-[#F26B3A] rounded-full shadow-xs -z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            );
          })}
        </div>

        {/* Portfolio Responsive Grid (4 cols desktop, 3 cols tablet, 2 cols mobile) */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setLightboxIndex(index)}
                className="group relative aspect-square rounded-[24px] overflow-hidden bg-[#F3EEE7] border border-[#E7E0D7]/60 cursor-pointer shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image Cover */}
                <div className="w-full h-full overflow-hidden">
                  <SmartImage
                    name={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                  />
                </div>

                {/* Dark Gradient Overlay rising from bottom on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5 text-white">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium w-fit mb-2 text-white">
                    {item.category}
                  </span>
                  <h4 className="font-heading font-semibold text-sm sm:text-base leading-snug line-clamp-2">
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Action Button Below Grid */}
        <div className="mt-12 sm:mt-16 text-center">
          <a
            href="#quote"
            onClick={smoothScrollToQuote}
            className="inline-flex items-center justify-center h-[52px] px-8 rounded-full bg-white text-[#1D1D1F] border-[1.5px] border-[#E7E0D7] hover:border-[#F26B3A] hover:text-[#F26B3A] font-heading font-medium text-base shadow-xs active:scale-[0.98] transition-all duration-200"
          >
            สนใจทำเสื้อแบบนี้ ขอราคาเลย
          </a>
        </div>
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setLightboxIndex(null)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Modal Content Container */}
            <div
              className="relative max-w-3xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-12 right-0 sm:-right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="ปิดรูปภาพ"
              >
                <X className="w-7 h-7" />
              </button>

              {/* Prev Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
                  );
                }}
                className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                aria-label="รูปภาพก่อนหน้า"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) =>
                    prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
                  );
                }}
                className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                aria-label="รูปภาพถัดไป"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Main Lightbox Image Card */}
              <div className="w-full max-h-[75vh] sm:max-h-[82vh] rounded-[24px] overflow-hidden bg-black/40 flex items-center justify-center shadow-2xl">
                <SmartImage
                  name={currentItem.image}
                  alt={currentItem.title}
                  className="max-h-[75vh] sm:max-h-[82vh] w-auto max-w-full object-contain rounded-[24px]"
                />
              </div>

              {/* Image Title & Category */}
              <div className="mt-4 text-center text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-xs font-medium text-white mb-1.5 font-body">
                  {currentItem.category}
                </span>
                <h3 className="font-heading font-semibold text-lg sm:text-xl text-white">
                  {currentItem.title}
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
