/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shirt } from 'lucide-react';

export const IMG_BASE = '/public/';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  name: string;
  alt: string;
  className?: string;
  fallbackAspect?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  name,
  alt,
  className = '',
  fallbackAspect,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  // If the image fails to load or hasn't been uploaded yet, render a graceful fallback
  // with soft warm gradient (#F3EEE7 → #FBE3D6) and centered lucide Shirt icon in tangerine at 40% opacity
  if (hasError) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-[#F3EEE7] to-[#FBE3D6] flex flex-col items-center justify-center select-none text-center p-4 ${className}`}
        style={fallbackAspect ? { aspectRatio: fallbackAspect } : undefined}
        role="img"
        aria-label={alt}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <Shirt
            className="w-10 h-10 text-[#F26B3A] opacity-40 transition-transform duration-300 hover:scale-110"
            strokeWidth={1.75}
          />
          <span className="text-xs font-medium text-[#6E6E73]/70 font-body">
            {alt || 'New Classic Polo'}
          </span>
        </div>
      </div>
    );
  }

  // Support both direct public path and relative root path fallback
  const srcPath = name.startsWith('/') ? name : `${IMG_BASE}${name}`;

  return (
    <img
      src={srcPath}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
      className={`object-cover transition-opacity duration-300 ${className}`}
      {...props}
    />
  );
};

export default SmartImage;
