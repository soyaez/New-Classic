/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo.tsx';
import { nav } from '../data/content.ts';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Track scroll position for header glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to highlight current active nav item
  useEffect(() => {
    const sectionIds = nav.map((item) => item.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`#${id}`);
            }
          });
        },
        { rootMargin: '-20% 0px -70% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Smooth scroll handler with 80px top offset
  const scrollToAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === '#' || href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-md border-b border-[#E7E0D7]/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] py-3'
            : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => scrollToAnchor(e, '#top')}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F26B3A] rounded-xl"
            aria-label="New Classic Home"
          >
            <Logo variant="color" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            {nav.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToAnchor(e, item.href)}
                  className={`text-[15px] font-medium transition-colors relative py-1 ${
                    isActive ? 'text-[#F26B3A]' : 'text-[#1D1D1F] hover:text-[#F26B3A]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F26B3A] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Header Right CTA button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#quote"
              onClick={(e) => scrollToAnchor(e, '#quote')}
              className="btn-shine-container inline-flex items-center justify-center h-[46px] px-6 rounded-full bg-[#F26B3A] text-white font-medium text-[15px] shadow-sm hover:bg-[#FF8A5C] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              ขอใบเสนอราคา
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 rounded-full text-[#1D1D1F] hover:bg-black/5 active:scale-95 transition-transform"
              aria-label="เปิดเมนู"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#FBF8F4] flex flex-col p-6 sm:p-8"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[#E7E0D7]">
              <Logo variant="color" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-full bg-white border border-[#E7E0D7] text-[#1D1D1F] active:scale-95 transition-transform"
                aria-label="ปิดเมนู"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Nav Links Staggered */}
            <nav className="flex-1 flex flex-col justify-center gap-5 py-8">
              {nav.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToAnchor(e, item.href)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * (idx + 1), duration: 0.4 }}
                  className="font-heading font-bold text-2xl text-[#1D1D1F] hover:text-[#F26B3A] flex items-center justify-between py-2 transition-colors"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#6E6E73]" />
                </motion.a>
              ))}
            </nav>

            {/* Mobile Bottom CTA */}
            <div className="pt-4 border-t border-[#E7E0D7] flex flex-col gap-3">
              <a
                href="#quote"
                onClick={(e) => scrollToAnchor(e, '#quote')}
                className="w-full h-[52px] rounded-full bg-[#F26B3A] text-white flex items-center justify-center font-medium text-base shadow-md active:scale-98 transition-transform"
              >
                ขอใบเสนอราคา
              </a>
              <div className="text-center text-xs text-[#6E6E73] font-body mt-1">
                เสื้อโปโล New Classic · โทร 081-425-5552
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
