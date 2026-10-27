/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { useInView, animate } from 'motion/react';
import { about, intro } from '../data/content.ts';
import SmartImage from './SmartImage.tsx';
import Reveal from './Reveal.tsx';

export const About: React.FC = () => {
  const statRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statRef, { once: true, amount: 0.3 });
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, about.statNumber, {
        duration: 1.8,
        ease: [0.22, 1, 0.36, 1],
        onUpdate(value) {
          setDisplayCount(Math.floor(value));
        },
      });
      return () => controls.stop();
    }
  }, [isInView]);

  return (
    <section id="about" className="py-20 md:py-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Composition */}
          <div className="lg:col-span-5 relative">
            <Reveal delay={0.1}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Store Photo Card */}
                <div className="rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white border border-[#E7E0D7]/60 aspect-[4/5] sm:aspect-[3/4]">
                  <SmartImage
                    name="about-store.jpg"
                    alt="หน้าร้าน New Classic เสื้อโปโลบางใหญ่"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlapping Secondary Factory Photo */}
                <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-8 w-44 sm:w-56 aspect-[4/3] rounded-[22px] overflow-hidden shadow-2xl border-[6px] border-white bg-white">
                  <SmartImage
                    name="about-factory.jpg"
                    alt="โรงงานผลิตเสื้อโปโล New Classic"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Subtle decorative dot pattern */}
                <div
                  className="absolute -top-6 -left-6 w-24 h-24 bg-[radial-gradient(#F26B3A_1.5px,transparent_1.5px)] [background-size:12px_12px] opacity-25 -z-10"
                  aria-hidden="true"
                />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Copy & Animated Stat */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Reveal delay={0.2}>
              {/* Small Tangerine Label */}
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#F26B3A]" />
                <span className="text-sm font-semibold tracking-wide text-[#F26B3A] uppercase font-heading">
                  เกี่ยวกับเรา
                </span>
              </div>

              {/* Section H2 Headline */}
              <h2 className="font-heading font-extrabold text-[32px] sm:text-[42px] md:text-[48px] leading-[1.18] tracking-[-0.01em] text-[#1D1D1F] mb-6">
                {about.title}
              </h2>

              {/* Intro highlight paragraph */}
              <p className="font-body text-[#1D1D1F] text-lg sm:text-[19px] font-medium leading-[1.7] mb-5">
                {intro}
              </p>

              {/* Paragraph 1 */}
              <p className="font-body text-[#6E6E73] text-base sm:text-[17px] leading-[1.7] mb-4">
                {about.p1}
              </p>

              {/* Paragraph 2 */}
              <p className="font-body text-[#6E6E73] text-base sm:text-[17px] leading-[1.7] mb-8">
                {about.p2}
              </p>

              {/* Giant 30+ Stat Counter */}
              <div
                ref={statRef}
                className="pt-6 border-t border-[#E7E0D7] flex items-baseline gap-4 sm:gap-6"
              >
                <div className="flex items-baseline">
                  <span className="font-heading font-extrabold text-[80px] sm:text-[100px] md:text-[116px] text-[#F26B3A] leading-none tracking-tight">
                    {displayCount}
                  </span>
                  <span className="font-heading font-extrabold text-[50px] sm:text-[68px] md:text-[76px] text-[#F26B3A] leading-none">
                    {about.statSuffix}
                  </span>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-heading font-bold text-xl sm:text-2xl text-[#1D1D1F] leading-tight">
                    {about.statCaption}
                  </span>
                  <span className="font-body text-xs sm:text-sm text-[#6E6E73] mt-1">
                    ประสบการณ์และความเชี่ยวชาญที่คุณมั่นใจได้
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
