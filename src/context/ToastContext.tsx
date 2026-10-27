/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { brand } from '../data/content.ts';

interface ToastContextType {
  showToast: (message: string) => void;
  handleLineAction: (phone?: string, lineUrl?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleLineAction = useCallback(
    (phone?: string, lineUrl?: string) => {
      // LINE Rule:
      const openUrlSafely = (url: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      // 1. If global brand.LINE_OA_URL is not empty, open it
      if (brand.LINE_OA_URL && brand.LINE_OA_URL.trim() !== '') {
        openUrlSafely(brand.LINE_OA_URL);
        return;
      }

      // 2. Otherwise if branch lineUrl exists and not empty, open it
      if (lineUrl && lineUrl.trim() !== '') {
        openUrlSafely(lineUrl);
        return;
      }

      // 3. If not, copy the phone number (or mainPhone) to clipboard and show toast
      const phoneToCopy = phone || brand.mainPhone;
      const cleanPhone = phoneToCopy.replace(/-/g, '');

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(cleanPhone).catch(() => {
          // Fallback if permission rejected
        });
      }

      showToast('คัดลอกเบอร์แล้ว — เพิ่มเพื่อนใน LINE ด้วยเบอร์นี้ได้เลย');
    },
    [showToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, handleLineAction }}>
      {children}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none px-4 w-full max-w-md flex justify-center"
          >
            <div className="bg-[#1D1D1F] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 text-sm font-medium border border-white/10 text-center font-body pointer-events-auto">
              <span className="w-2 h-2 rounded-full bg-[#5FCB9A] animate-pulse" />
              <span>{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
