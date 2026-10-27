/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ToastProvider } from './context/ToastContext.tsx';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Marquee from './components/Marquee.tsx';
import About from './components/About.tsx';
import ColorPicker from './components/ColorPicker.tsx';
import ServicesSection from './components/ServicesSection.tsx';
import WhyUsSection from './components/WhyUsSection.tsx';
import VisionSection from './components/VisionSection.tsx';
import PortfolioSection from './components/PortfolioSection.tsx';
import ProcessSection from './components/ProcessSection.tsx';
import QuoteSection from './components/QuoteSection.tsx';
import BranchesSection from './components/BranchesSection.tsx';
import FaqSection from './components/FaqSection.tsx';
import FinalCtaSection from './components/FinalCtaSection.tsx';
import Footer from './components/Footer.tsx';
import MobileBottomBar from './components/MobileBottomBar.tsx';

export function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#FBF8F4] text-[#1D1D1F] flex flex-col font-body selection:bg-[#F26B3A]/20 selection:text-[#F26B3A] pb-16 md:pb-0">
        {/* Sticky Frosted Header */}
        <Header />

        {/* Main Page Flow */}
        <main className="flex-1 w-full">
          {/* Section 1: Hero */}
          <Hero />

          {/* Section 2: Rotated Marquee Banner */}
          <Marquee />

          {/* Section 3: About New Classic */}
          <About />

          {/* Section 4: Interactive Color Picker */}
          <ColorPicker />

          {/* Section 5: Services */}
          <ServicesSection />

          {/* Section 6: Why Us */}
          <WhyUsSection />

          {/* Section 7: Vision & Promise */}
          <VisionSection />

          {/* Section 8: Portfolio */}
          <PortfolioSection />

          {/* Section 9: 4-Step Process */}
          <ProcessSection />

          {/* Section 10: Quote Request Form */}
          <QuoteSection />

          {/* Section 11: 4 Branches with Interactive Map */}
          <BranchesSection />

          {/* Section 12: Frequently Asked Questions */}
          <FaqSection />

          {/* Section 13: Final Call to Action */}
          <FinalCtaSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Fixed Mobile Bottom Action Bar (<768px) */}
        <MobileBottomBar />
      </div>
    </ToastProvider>
  );
}

export default App;
