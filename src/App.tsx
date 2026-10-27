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
import SectionStubs from './components/SectionStubs.tsx';
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

          {/* Temporary Anchors and Stubs for Sections to be built in Rounds 2 & 3 */}
          <SectionStubs />
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
