/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Factory,
  BadgePercent,
  Shirt,
  Store,
  Award,
  MessageCircleHeart,
  ClipboardList,
  Calculator,
  FileCheck2,
  PackageCheck,
  Sparkles,
  Palette,
  CheckCircle2,
  LucideIcon,
} from 'lucide-react';

export const TINT_COLORS = [
  { name: 'tangerine', bg: '#FDE6DC', icon: '#F26B3A', darkBg: 'rgba(242, 107, 58, 0.15)' },
  { name: 'sky', bg: '#E3F0FF', icon: '#3B82D6', darkBg: 'rgba(59, 130, 214, 0.15)' },
  { name: 'mint', bg: '#DDF5EA', icon: '#2E9E6A', darkBg: 'rgba(46, 158, 106, 0.15)' },
  { name: 'butter', bg: '#FFF4D6', icon: '#C99212', darkBg: 'rgba(201, 146, 18, 0.15)' },
  { name: 'navy', bg: '#E2E8F5', icon: '#2F4B8F', darkBg: 'rgba(47, 75, 143, 0.15)' },
];

const ICON_MAP: Record<string, LucideIcon> = {
  Factory,
  BadgePercent,
  Shirt,
  Store,
  Award,
  MessageCircleHeart,
  ClipboardList,
  Calculator,
  FileCheck2,
  PackageCheck,
  Sparkles,
  Palette,
  CheckCircle2,
};

interface IconBadgeProps {
  iconName: string;
  index?: number;
  isDark?: boolean;
  className?: string;
}

export const IconBadge: React.FC<IconBadgeProps> = ({
  iconName,
  index = 0,
  isDark = false,
  className = '',
}) => {
  const tint = TINT_COLORS[index % TINT_COLORS.length];
  const IconComponent = ICON_MAP[iconName] || Shirt;

  const bgStyle = isDark ? tint.darkBg : tint.bg;
  const iconColor = tint.icon;

  return (
    <div
      className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${className}`}
      style={{ backgroundColor: bgStyle }}
    >
      <IconComponent
        className="w-7 h-7"
        strokeWidth={1.75}
        style={{ color: iconColor }}
      />
    </div>
  );
};

export default IconBadge;
