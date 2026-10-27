/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { whyUs } from '../data/content.ts';
import IconBadge from './IconBadge.tsx';
import Reveal from './Reveal.tsx';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlowCard: React.FC<GlowCardProps> = ({ children, className = '' }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative bg-[#2A2A2D] rounded-[28px] border border-white/[0.06] hover:border-[#F26B3A]/40 transition-colors duration-300 overflow-hidden ${className}`}
    >
      {/* Dynamic Radial Tangerine Glow following cursor on desktop */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 hidden md:block"
        style={{
          opacity: mousePos.active ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(242, 107, 58, 0.16), transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export const WhyUsSection: React.FC = () => {
  return (
    <section id="whyus" className="py-20 md:py-32 bg-[#1D1D1F] text-white scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#F26B3A]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#F26B3A] uppercase font-heading">
                ทำไมต้องเลือกเรา
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-[32px] sm:text-[42px] md:text-[48px] text-white leading-tight tracking-tight">
              ทำไมต้อง New Classic
            </h2>
          </div>
        </Reveal>

        {/* Apple-style Bento Grid (4 Columns Desktop, 2 Columns Tablet, 1 Column Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {/* Item 0: ติดต่อโรงงานโดยตรง (Spans 2 cols on desktop) */}
          <Reveal delay={0.05} className="lg:col-span-2">
            <GlowCard className="p-8 sm:p-10 flex flex-col justify-between h-full">
              <div>
                <IconBadge iconName={whyUs[0].icon} index={0} isDark={true} className="mb-6" />
                <h3 className="font-heading font-semibold text-2xl text-white mb-3">
                  {whyUs[0].title}
                </h3>
                <p className="font-body text-[#A1A1A6] text-base leading-[1.7] max-w-md">
                  {whyUs[0].desc}
                </p>
              </div>
            </GlowCard>
          </Reveal>

          {/* Item 1: ขายปลีกในราคาขายส่ง (1 col) */}
          <Reveal delay={0.1} className="lg:col-span-1">
            <GlowCard className="p-8 sm:p-10 flex flex-col justify-between h-full">
              <div>
                <IconBadge iconName={whyUs[1].icon} index={1} isDark={true} className="mb-6" />
                <h3 className="font-heading font-semibold text-xl text-white mb-3">
                  {whyUs[1].title}
                </h3>
                <p className="font-body text-[#A1A1A6] text-sm leading-[1.7]">
                  {whyUs[1].desc}
                </p>
              </div>
            </GlowCard>
          </Reveal>

          {/* Item 2: ครบทั้งเสื้อ ปัก และสกรีน (1 col) */}
          <Reveal delay={0.15} className="lg:col-span-1">
            <GlowCard className="p-8 sm:p-10 flex flex-col justify-between h-full">
              <div>
                <IconBadge iconName={whyUs[2].icon} index={2} isDark={true} className="mb-6" />
                <h3 className="font-heading font-semibold text-xl text-white mb-3">
                  {whyUs[2].title}
                </h3>
                <p className="font-body text-[#A1A1A6] text-sm leading-[1.7]">
                  {whyUs[2].desc}
                </p>
              </div>
            </GlowCard>
          </Reveal>

          {/* Item 3: มีหน้าร้าน 4 สาขา (1 col) */}
          <Reveal delay={0.2} className="lg:col-span-1">
            <GlowCard className="p-8 sm:p-10 flex flex-col justify-between h-full">
              <div>
                <IconBadge iconName={whyUs[3].icon} index={3} isDark={true} className="mb-6" />
                <h3 className="font-heading font-semibold text-xl text-white mb-3">
                  {whyUs[3].title}
                </h3>
                <p className="font-body text-[#A1A1A6] text-sm leading-[1.7]">
                  {whyUs[3].desc}
                </p>
              </div>
            </GlowCard>
          </Reveal>

          {/* Item 4: ประสบการณ์มากกว่า 30 ปี (Spans 2 cols with giant 30+) */}
          <Reveal delay={0.25} className="lg:col-span-2">
            <GlowCard className="p-8 sm:p-10 flex flex-col justify-between h-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex-1">
                  <IconBadge iconName={whyUs[4].icon} index={4} isDark={true} className="mb-6" />
                  <h3 className="font-heading font-semibold text-2xl text-white mb-3">
                    {whyUs[4].title}
                  </h3>
                  <p className="font-body text-[#A1A1A6] text-base leading-[1.7] max-w-sm">
                    {whyUs[4].desc}
                  </p>
                </div>
                {/* Giant 30+ Stat graphic */}
                <div className="sm:self-center flex items-baseline select-none">
                  <span className="font-heading font-extrabold text-[80px] sm:text-[96px] text-[#F26B3A] leading-none tracking-tight">
                    30
                  </span>
                  <span className="font-heading font-extrabold text-[50px] sm:text-[60px] text-[#F26B3A] leading-none">
                    +
                  </span>
                </div>
              </div>
            </GlowCard>
          </Reveal>

          {/* Item 5: มีแอดมินคอยดูแล (1 col) */}
          <Reveal delay={0.3} className="lg:col-span-1">
            <GlowCard className="p-8 sm:p-10 flex flex-col justify-between h-full">
              <div>
                <IconBadge iconName={whyUs[5].icon} index={0} isDark={true} className="mb-6" />
                <h3 className="font-heading font-semibold text-xl text-white mb-3">
                  {whyUs[5].title}
                </h3>
                <p className="font-body text-[#A1A1A6] text-sm leading-[1.7]">
                  {whyUs[5].desc}
                </p>
              </div>
            </GlowCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
