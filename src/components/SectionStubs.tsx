/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  services,
  portfolio,
  process as processList,
  branches,
  faq,
  finalCta,
  whyUs,
  vision,
} from '../data/content.ts';
import QuoteSection from './QuoteSection.tsx';

/**
 * Temporary Section Stubs for Round 1:
 * Provides valid HTML anchor targets with accurate IDs and future heading text
 * ensuring navigation, smooth scroll, and links work properly.
 * These will be fully replaced with production cards and interactive components in Rounds 2 & 3.
 */
export const SectionStubs: React.FC = () => {
  return (
    <div className="space-y-16 py-12">
      {/* 1. SERVICES STUB */}
      <section
        id="services"
        className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20"
      >
        <div className="rounded-[28px] border border-dashed border-[#E7E0D7] p-8 text-center bg-white/50">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F26B3A] font-heading">
            SERVICES · รอบถัดไป
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1D1D1F] mt-1">
            สินค้าและบริการ
          </h2>
          <p className="font-body text-sm text-[#6E6E73] mt-2 max-w-md mx-auto">
            เสื้อโปโลและเสื้อเปล่า · เสื้อสั่งผลิตองค์กร · งานปักโลโก้ · งานสกรีนเสื้อ ({services.length} หมวดบริการ)
          </p>
        </div>
      </section>

      {/* 2. WHY US STUB */}
      <section
        id="whyus"
        className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20"
      >
        <div className="rounded-[28px] border border-dashed border-[#E7E0D7] p-8 text-center bg-white/50">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F26B3A] font-heading">
            WHY NEW CLASSIC · รอบถัดไป
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1D1D1F] mt-1">
            ทำไมต้อง New Classic
          </h2>
          <p className="font-body text-sm text-[#6E6E73] mt-2 max-w-md mx-auto">
            {whyUs.map((w) => w.title).join(' · ')}
          </p>
        </div>
      </section>

      {/* 3. VISION & PROMISE STUB */}
      <section
        id="vision"
        className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20"
      >
        <div className="rounded-[28px] border border-dashed border-[#E7E0D7] p-8 text-center bg-white/50">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F26B3A] font-heading">
            OUR PROMISE · รอบถัดไป
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1D1D1F] mt-1">
            วิสัยทัศน์และพันธกิจ
          </h2>
          <p className="font-body text-sm text-[#6E6E73] mt-2 max-w-lg mx-auto">
            {vision}
          </p>
        </div>
      </section>

      {/* 4. PORTFOLIO STUB */}
      <section
        id="portfolio"
        className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20"
      >
        <div className="rounded-[28px] border border-dashed border-[#E7E0D7] p-8 text-center bg-white/50">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F26B3A] font-heading">
            PORTFOLIO · รอบถัดไป
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1D1D1F] mt-1">
            ผลงานของเรา
          </h2>
          <p className="font-body text-sm text-[#6E6E73] mt-2 max-w-md mx-auto">
            คลังภาพตัวอย่างงานปัก งานสกรีน และเสื้อทีมกว่า {portfolio.items.length} รายการ
          </p>
        </div>
      </section>

      {/* 5. PROCESS STUB */}
      <section
        id="process"
        className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20"
      >
        <div className="rounded-[28px] border border-dashed border-[#E7E0D7] p-8 text-center bg-white/50">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F26B3A] font-heading">
            PROCESS · รอบถัดไป
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1D1D1F] mt-1">
            สั่งง่าย 4 ขั้นตอน
          </h2>
          <p className="font-body text-sm text-[#6E6E73] mt-2 max-w-md mx-auto">
            {processList.map((p) => `${p.no} ${p.title}`).join(' › ')}
          </p>
        </div>
      </section>

      {/* 6. QUOTE SECTION (Live Firestore integration) */}
      <QuoteSection />

      {/* 7. BRANCHES STUB */}
      <section
        id="branches"
        className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20"
      >
        <div className="rounded-[28px] border border-dashed border-[#E7E0D7] p-8 text-center bg-white/50">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F26B3A] font-heading">
            4 BRANCHES · รอบถัดไป
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1D1D1F] mt-1">
            แวะมาดูสินค้าจริงได้ 4 สาขา
          </h2>
          <p className="font-body text-sm text-[#6E6E73] mt-2 max-w-md mx-auto">
            {branches.map((b) => b.name).join(' · ')}
          </p>
        </div>
      </section>

      {/* 8. FAQ STUB */}
      <section
        id="faq"
        className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20"
      >
        <div className="rounded-[28px] border border-dashed border-[#E7E0D7] p-8 text-center bg-white/50">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F26B3A] font-heading">
            FAQ · รอบถัดไป
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1D1D1F] mt-1">
            คำถามที่พบบ่อย ({faq.length} ข้อ)
          </h2>
        </div>
      </section>

      {/* 9. FINAL CTA STUB */}
      <section
        id="finalcta"
        className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20"
      >
        <div className="rounded-[28px] border border-dashed border-[#E7E0D7] p-8 text-center bg-white/50">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#F26B3A] font-heading">
            FINAL CTA · รอบถัดไป
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1D1D1F] mt-1">
            {finalCta.title}
          </h2>
          <p className="font-body text-sm text-[#6E6E73] mt-2 max-w-md mx-auto">
            {finalCta.desc}
          </p>
        </div>
      </section>
    </div>
  );
};

export default SectionStubs;
