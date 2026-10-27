/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import { brand, branches } from '../data/content.ts';
import { useToast } from '../context/ToastContext.tsx';

export const MobileBottomBar: React.FC = () => {
  const { handleLineAction } = useToast();
  const branch1 = branches[0];

  const handleScrollToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('quote');
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Mobile Action Bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E7E0D7] shadow-[0_-4px_24px_rgba(0,0,0,0.07)] px-4 py-2"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto items-center">
        {/* 1. โทร (Call main phone) */}
        <a
          href={`tel:${brand.mainPhoneTel}`}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-[#1D1D1F] hover:text-[#F26B3A] active:bg-black/5 active:scale-95 transition-all text-center select-none"
        >
          <Phone className="w-5 h-5 text-[#F26B3A] mb-0.5" />
          <span className="font-heading font-medium text-[13px] leading-tight">โทร</span>
        </a>

        {/* 2. LINE (Apply branch 1 LINE rule with toast) */}
        <button
          type="button"
          onClick={() => handleLineAction(branch1?.phone, branch1?.lineUrl)}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-[#1D1D1F] hover:text-[#5FCB9A] active:bg-black/5 active:scale-95 transition-all text-center select-none"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-[#25D366] mb-0.5" />
          </div>
          <span className="font-heading font-medium text-[13px] leading-tight">LINE</span>
        </button>

        {/* 3. ขอราคา (Tangerine filled pill → #quote) */}
        <a
          href="#quote"
          onClick={handleScrollToQuote}
          className="btn-shine-container flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#F26B3A] text-white shadow-sm hover:bg-[#FF8A5C] active:scale-95 transition-all text-center select-none"
        >
          <FileText className="w-4 h-4" />
          <span className="font-heading font-semibold text-[13px] leading-tight whitespace-nowrap">
            ขอราคา
          </span>
        </a>
      </div>
    </aside>
  );
};

export default MobileBottomBar;
