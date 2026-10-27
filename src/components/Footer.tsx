/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Mail, Facebook, MapPin } from 'lucide-react';
import Logo from './Logo.tsx';
import { brand } from '../data/content.ts';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FBF8F4] border-t border-[#E7E0D7] pt-14 pb-20 md:pb-14">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-[#E7E0D7]">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-start gap-3 max-w-md">
            <Logo variant="color" size="footer" />
            <p className="font-body text-sm sm:text-base text-[#6E6E73] leading-relaxed">
              ผลิต ปัก สกรีน เสื้อโปโล ครบในที่เดียว
            </p>
          </div>

          {/* Contact Details & Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            {/* Phone */}
            <a
              href={`tel:${brand.mainPhoneTel}`}
              className="inline-flex items-center gap-2 text-sm sm:text-base text-[#1D1D1F] hover:text-[#F26B3A] transition-colors"
            >
              <span className="w-9 h-9 rounded-full bg-white border border-[#E7E0D7] flex items-center justify-center text-[#F26B3A] shadow-2xs">
                <Phone className="w-4 h-4" />
              </span>
              <span className="font-medium font-heading">{brand.mainPhone}</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${brand.email}`}
              className="inline-flex items-center gap-2 text-sm sm:text-base text-[#1D1D1F] hover:text-[#F26B3A] transition-colors"
            >
              <span className="w-9 h-9 rounded-full bg-white border border-[#E7E0D7] flex items-center justify-center text-[#F26B3A] shadow-2xs">
                <Mail className="w-4 h-4" />
              </span>
              <span className="font-medium font-body">{brand.email}</span>
            </a>

            {/* Facebook */}
            <a
              href={brand.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="New Classic Facebook Page"
              className="inline-flex items-center gap-2 text-sm sm:text-base text-[#1D1D1F] hover:text-[#F26B3A] transition-colors group"
            >
              <span className="w-9 h-9 rounded-full bg-white border border-[#E7E0D7] group-hover:border-[#1877F2] flex items-center justify-center text-[#1877F2] shadow-2xs transition-colors">
                <Facebook className="w-4 h-4" />
              </span>
              <span className="font-medium font-body hidden sm:inline">Facebook</span>
            </a>

            {/* Map Link */}
            <a
              href="#branches"
              className="inline-flex items-center gap-2 text-sm sm:text-base text-[#1D1D1F] hover:text-[#F26B3A] transition-colors"
            >
              <span className="w-9 h-9 rounded-full bg-white border border-[#E7E0D7] flex items-center justify-center text-[#F26B3A] shadow-2xs">
                <MapPin className="w-4 h-4" />
              </span>
              <span className="font-medium font-body hidden sm:inline">4 สาขา</span>
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#6E6E73] font-body text-center sm:text-left">
          <p>© {currentYear} New Classic. สงวนลิขสิทธิ์</p>
          <p className="text-xs text-[#6E6E73]/70">
            {brand.fullName}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
