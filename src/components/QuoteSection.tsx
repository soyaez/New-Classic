/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  Paperclip,
  X,
  Copy,
  ChevronRight,
  Send,
  Calendar,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { brand, branches } from '../data/content.ts';
import { useToast } from '../context/ToastContext.tsx';
import { submitQuoteRequest } from '../lib/firebase.ts';
import Reveal from './Reveal.tsx';

// Helper to format date into Thai Buddhist format: e.g. "15 พฤศจิกายน 2569"
function formatThaiBuddhistDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  const thaiMonths = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ];

  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const buddhistYear = date.getFullYear() + 543;

  return `${day} ${month} ${buddhistYear}`;
}

export const QuoteSection: React.FC = () => {
  const { handleLineAction, showToast } = useToast();
  const branch1 = branches[0];

  // Form state
  const [name, setName] = useState('');
  const [org, setOrg] = useState('');
  const [phone, setPhone] = useState('');
  const [shirtType, setShirtType] = useState<'เสื้อเปล่า' | 'สั่งผลิต' | 'ยังไม่แน่ใจ'>('ยังไม่แน่ใจ');
  const [extras, setExtras] = useState<string[]>([]);
  const [qty, setQty] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [date, setDate] = useState('');
  const [branch, setBranch] = useState('ไม่ระบุ');
  const [notes, setNotes] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shakeFields, setShakeFields] = useState<Record<string, boolean>>({});

  // Summary modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState('');

  // Input refs for auto-focusing first error
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const qtyInputRef = useRef<HTMLInputElement>(null);

  // Extras toggles logic: choosing "ไม่ต้องการ" clears others, choosing any other removes "ไม่ต้องการ"
  const toggleExtra = (value: string) => {
    if (value === 'ไม่ต้องการ') {
      setExtras((prev) => (prev.includes('ไม่ต้องการ') ? [] : ['ไม่ต้องการ']));
    } else {
      setExtras((prev) => {
        const withoutNoExtra = prev.filter((item) => item !== 'ไม่ต้องการ');
        if (withoutNoExtra.includes(value)) {
          return withoutNoExtra.filter((item) => item !== value);
        } else {
          return [...withoutNoExtra, value];
        }
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const newShakes: Record<string, boolean> = {};

    if (!name.trim()) {
      newErrors.name = 'กรุณากรอกชื่อผู้ติดต่อ';
      newShakes.name = true;
    }

    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!/^[0-9]{9,10}$/.test(cleanPhone)) {
      newErrors.phone = 'กรุณากรอกเบอร์โทรให้ถูกต้อง (9–10 หลัก)';
      newShakes.phone = true;
    }

    if (!qty || parseInt(qty, 10) < 1) {
      newErrors.qty = 'กรุณาระบุจำนวน';
      newShakes.qty = true;
    }

    setErrors(newErrors);
    setShakeFields(newShakes);

    // Focus first invalid field
    if (newErrors.name) {
      nameInputRef.current?.focus();
    } else if (newErrors.phone) {
      phoneInputRef.current?.focus();
    } else if (newErrors.qty) {
      qtyInputRef.current?.focus();
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate formatted message omitting empty lines
    const lines: string[] = ['สวัสดีครับ/ค่ะ สนใจขอใบเสนอราคาเสื้อจาก New Classic'];
    if (name.trim()) lines.push(`• ชื่อผู้ติดต่อ: ${name.trim()}`);
    if (org.trim()) lines.push(`• องค์กร/ทีม: ${org.trim()}`);
    if (phone.trim()) lines.push(`• เบอร์โทร: ${phone.trim()}`);
    if (shirtType) lines.push(`• ประเภทเสื้อ: ${shirtType}`);
    if (extras.length > 0) lines.push(`• งานเพิ่มเติม: ${extras.join(', ')}`);
    if (qty.trim()) lines.push(`• จำนวน: ${qty.trim()} ตัว`);
    if (color.trim()) lines.push(`• สี: ${color.trim()}`);
    if (size.trim()) lines.push(`• ไซซ์: ${size.trim()}`);
    if (date) lines.push(`• วันที่ต้องการใช้งาน: ${formatThaiBuddhistDate(date)}`);
    if (branch && branch !== 'ไม่ระบุ') lines.push(`• สาขาที่สะดวก: ${branch}`);
    if (notes.trim()) lines.push(`• รายละเอียดเพิ่มเติม: ${notes.trim()}`);
    lines.push('(ไฟล์โลโก้/แบบเสื้อ จะส่งตามในแชตนี้)');

    const msg = lines.join('\n');
    setGeneratedMessage(msg);
    setIsModalOpen(true);

    // Persist to Firebase Firestore in the background
    submitQuoteRequest({
      customerName: name.trim(),
      phone: phone.trim(),
      quantity: parseInt(qty, 10),
      serviceType: [shirtType, ...extras].join(', '),
      notes: `${org ? `[องค์กร: ${org}] ` : ''}${notes}${date ? ` [ใช้งาน: ${date}]` : ''}${branch !== 'ไม่ระบุ' ? ` [สาขา: ${branch}]` : ''}`,
    }).catch((err) => {
      console.warn('Firebase sync warning:', err);
    });
  };

  // Actions in Summary Modal
  const handleSendLine = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(generatedMessage).catch(() => {});
    }

    showToast('คัดลอกข้อความแล้ว — เลือกแชตร้าน (081-425-5552) แล้วกดส่งได้เลย');

    setTimeout(() => {
      if (brand.LINE_OA_URL && brand.LINE_OA_URL.trim() !== '') {
        window.open(brand.LINE_OA_URL, '_blank', 'noopener,noreferrer');
      } else {
        const lineShareUrl = `https://line.me/R/share?text=${encodeURIComponent(generatedMessage)}`;
        window.open(lineShareUrl, '_blank', 'noopener,noreferrer');
      }
    }, 400);
  };

  const handleSendEmail = () => {
    const subject = `ขอใบเสนอราคาเสื้อ — ${name}`;
    const mailtoUrl = `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(generatedMessage)}`;
    window.location.href = mailtoUrl;
  };

  const handleCopyMessage = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(generatedMessage).catch(() => {});
    }
    showToast('คัดลอกข้อความแล้ว');
  };

  return (
    <section id="quote" className="py-20 md:py-32 bg-[#FBF8F4] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* LEFT COLUMN (5/12) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#F26B3A]" />
                  <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#F26B3A] uppercase font-heading">
                    ขอใบเสนอราคา
                  </span>
                </div>

                <h2 className="font-heading font-extrabold text-[32px] sm:text-[40px] md:text-[44px] text-[#1D1D1F] leading-[1.18] tracking-tight mb-4">
                  บอกเราว่าอยากได้เสื้อแบบไหน
                </h2>

                <p className="font-body text-[#6E6E73] text-base sm:text-[17px] leading-[1.7] mb-8">
                  กรอกรายละเอียดสั้น ๆ ระบบจะสรุปข้อความให้อัตโนมัติ แล้วส่งให้ร้านทาง LINE
                  หรืออีเมลได้ทันที ให้คำแนะนำจริงใจ แจ้งราคาชัดเจน
                </p>

                {/* 3 Contact Chips */}
                <div className="flex flex-col gap-3 mb-8">
                  {/* Phone */}
                  <a
                    href="tel:0814255552"
                    className="inline-flex items-center gap-3 px-5 py-3.5 rounded-full bg-white border border-[#E7E0D7] text-[#1D1D1F] hover:border-[#F26B3A] hover:text-[#F26B3A] shadow-2xs font-heading font-medium text-sm transition-all group"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#FDE6DC] text-[#F26B3A] flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span>โทร 081-425-5552</span>
                  </a>

                  {/* LINE */}
                  <button
                    type="button"
                    onClick={() => handleLineAction(branch1?.phone, branch1?.lineUrl)}
                    className="inline-flex items-center gap-3 px-5 py-3.5 rounded-full bg-white border border-[#E7E0D7] text-[#1D1D1F] hover:border-[#06C755] hover:text-[#06C755] shadow-2xs font-heading font-medium text-sm transition-all group text-left cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#DDF5EA] text-[#06C755] flex items-center justify-center shrink-0">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span>LINE 081-425-5552</span>
                  </button>

                  {/* Email */}
                  <a
                    href={`mailto:${brand.email}`}
                    className="inline-flex items-center gap-3 px-5 py-3.5 rounded-full bg-white border border-[#E7E0D7] text-[#1D1D1F] hover:border-[#F26B3A] hover:text-[#F26B3A] shadow-2xs font-heading font-medium text-sm transition-all group"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#E3F0FF] text-[#3B82D6] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="truncate">{brand.email}</span>
                  </a>
                </div>

                {/* Butter-tint note card */}
                <div className="bg-[#FFF4D6] border border-[#FFCE5C]/40 rounded-[22px] p-5 flex items-start gap-3.5 text-[#8A610A] text-sm font-body leading-relaxed">
                  <Paperclip className="w-5 h-5 shrink-0 text-[#C99212] mt-0.5" />
                  <span>
                    <strong>มีไฟล์โลโก้หรือแบบเสื้อ?</strong>{' '}
                    สามารถส่งไฟล์ภาพหรือแบบตามทาง LINE ได้เลยหลังส่งข้อความ
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (7/12) - THE FORM CARD */}
            <div className="lg:col-span-7 bg-white rounded-[28px] p-6 sm:p-10 border border-[#E7E0D7] shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 font-heading">
                      ชื่อผู้ติดต่อ <span className="text-[#F26B3A]">*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                      }}
                      placeholder="เช่น คุณสมชาย"
                      className={`w-full h-[52px] px-4 rounded-[14px] bg-[#FBF8F4] border font-body text-sm transition-all outline-none ${
                        errors.name
                          ? 'border-[#F26B3A] ring-2 ring-[#F26B3A]/20'
                          : 'border-[#E7E0D7] focus:border-[#F26B3A] focus:ring-2 focus:ring-[#F26B3A]/15'
                      } ${shakeFields.name ? 'animate-bounce' : ''}`}
                    />
                    {errors.name && (
                      <p className="text-xs text-[#F26B3A] font-body mt-1.5">{errors.name}</p>
                    )}
                  </div>

                  {/* Organization */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 font-heading">
                      ชื่อองค์กร / ทีม <span className="text-[#6E6E73] font-normal">(ถ้ามี)</span>
                    </label>
                    <input
                      type="text"
                      value={org}
                      onChange={(e) => setOrg(e.target.value)}
                      placeholder="เช่น บริษัท นิวคลาสสิค จำกัด"
                      className="w-full h-[52px] px-4 rounded-[14px] bg-[#FBF8F4] border border-[#E7E0D7] focus:border-[#F26B3A] focus:ring-2 focus:ring-[#F26B3A]/15 font-body text-sm transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 font-heading">
                      เบอร์โทรศัพท์ <span className="text-[#F26B3A]">*</span>
                    </label>
                    <input
                      ref={phoneInputRef}
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                      }}
                      placeholder="เช่น 081-425-5552"
                      className={`w-full h-[52px] px-4 rounded-[14px] bg-[#FBF8F4] border font-body text-sm transition-all outline-none ${
                        errors.phone
                          ? 'border-[#F26B3A] ring-2 ring-[#F26B3A]/20'
                          : 'border-[#E7E0D7] focus:border-[#F26B3A] focus:ring-2 focus:ring-[#F26B3A]/15'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-[#F26B3A] font-body mt-1.5">{errors.phone}</p>
                    )}
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 font-heading">
                      จำนวน (ตัว) <span className="text-[#F26B3A]">*</span>
                    </label>
                    <input
                      ref={qtyInputRef}
                      type="number"
                      min="1"
                      value={qty}
                      onChange={(e) => {
                        setQty(e.target.value);
                        if (errors.qty) setErrors((prev) => ({ ...prev, qty: '' }));
                      }}
                      placeholder="เช่น 50, 100, 300"
                      className={`w-full h-[52px] px-4 rounded-[14px] bg-[#FBF8F4] border font-body text-sm transition-all outline-none ${
                        errors.qty
                          ? 'border-[#F26B3A] ring-2 ring-[#F26B3A]/20'
                          : 'border-[#E7E0D7] focus:border-[#F26B3A] focus:ring-2 focus:ring-[#F26B3A]/15'
                      }`}
                    />
                    {errors.qty && (
                      <p className="text-xs text-[#F26B3A] font-body mt-1.5">{errors.qty}</p>
                    )}
                  </div>
                </div>

                {/* Shirt Type (Single Choice Pill Toggle) */}
                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-2 font-heading">
                    ประเภทเสื้อ
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {(['เสื้อเปล่า', 'สั่งผลิต', 'ยังไม่แน่ใจ'] as const).map((typeOption) => {
                      const isSelected = shirtType === typeOption;
                      return (
                        <button
                          key={typeOption}
                          type="button"
                          onClick={() => setShirtType(typeOption)}
                          className={`h-11 px-5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#F26B3A] text-white shadow-xs'
                              : 'bg-[#FBF8F4] text-[#1D1D1F] border border-[#E7E0D7] hover:border-[#F26B3A]'
                          }`}
                        >
                          {typeOption}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Extra Services (Multi Choice Pill Toggle) */}
                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-2 font-heading">
                    งานเพิ่มเติม
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {['ปักโลโก้', 'สกรีน', 'ไม่ต้องการ'].map((option) => {
                      const isSelected = extras.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleExtra(option)}
                          className={`h-11 px-5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#F26B3A] text-white shadow-xs'
                              : 'bg-[#FBF8F4] text-[#1D1D1F] border border-[#E7E0D7] hover:border-[#F26B3A]'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Desired Colors */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 font-heading">
                      สีที่ต้องการ
                    </label>
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      placeholder="เช่น กรมท่า, ฟ้า"
                      className="w-full h-[52px] px-4 rounded-[14px] bg-[#FBF8F4] border border-[#E7E0D7] focus:border-[#F26B3A] focus:ring-2 focus:ring-[#F26B3A]/15 font-body text-sm transition-all outline-none"
                    />
                  </div>

                  {/* Sizes */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 font-heading">
                      ไซซ์
                    </label>
                    <input
                      type="text"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      placeholder="เช่น S 5 / M 10 / L 10"
                      className="w-full h-[52px] px-4 rounded-[14px] bg-[#FBF8F4] border border-[#E7E0D7] focus:border-[#F26B3A] focus:ring-2 focus:ring-[#F26B3A]/15 font-body text-sm transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Desired Date */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 font-heading">
                      วันที่ต้องการใช้งาน
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full h-[52px] px-4 rounded-[14px] bg-[#FBF8F4] border border-[#E7E0D7] focus:border-[#F26B3A] focus:ring-2 focus:ring-[#F26B3A]/15 font-body text-sm transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Branch Select */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 font-heading">
                      สาขาที่สะดวกติดต่อ
                    </label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full h-[52px] px-4 rounded-[14px] bg-[#FBF8F4] border border-[#E7E0D7] focus:border-[#F26B3A] focus:ring-2 focus:ring-[#F26B3A]/15 font-body text-sm transition-all outline-none cursor-pointer"
                    >
                      <option value="ไม่ระบุ">ไม่ระบุ</option>
                      {branches.map((b) => (
                        <option key={b.id} value={b.name}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 font-heading">
                    รายละเอียดเพิ่มเติม
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="เช่น ตำแหน่งโลโก้ ขนาดงานปัก ชนิดผ้า งบประมาณ"
                    className="w-full px-4 py-3 rounded-[14px] bg-[#FBF8F4] border border-[#E7E0D7] focus:border-[#F26B3A] focus:ring-2 focus:ring-[#F26B3A]/15 font-body text-sm transition-all outline-none resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-shine-container w-full h-[52px] rounded-full bg-[#F26B3A] text-white font-heading font-semibold text-base shadow-[0_4px_16px_rgba(242,107,58,0.28)] hover:bg-[#FF8A5C] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>สรุปรายละเอียด</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </div>

      {/* SUMMARY MODAL (Centered card desktop, Bottom sheet mobile) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full sm:max-w-2xl rounded-t-[32px] sm:rounded-[28px] p-6 sm:p-8 shadow-2xl max-h-[92vh] flex flex-col relative"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E0D7] mb-4">
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#1D1D1F]">
                  สรุปรายละเอียดของคุณ
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-[#F3EEE7] text-[#1D1D1F] hover:bg-[#E7E0D7] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="ปิดหน้าต่างสรุป"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Read-only Preview Box */}
              <div className="flex-1 overflow-y-auto mb-6 pr-1">
                <div className="bg-[#FBF8F4] border border-[#E7E0D7] rounded-[18px] p-4 sm:p-5 font-body text-sm sm:text-base text-[#1D1D1F] leading-relaxed whitespace-pre-line select-all">
                  {generatedMessage}
                </div>
              </div>

              {/* Action Buttons (Stacked on mobile, 2x2 grid on desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                {/* 1. ส่งทาง LINE */}
                <button
                  type="button"
                  onClick={handleSendLine}
                  className="btn-shine-container h-[50px] px-5 rounded-full bg-[#06C755] text-white font-heading font-semibold text-sm flex items-center justify-center gap-2 shadow-xs hover:opacity-95 active:scale-98 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>ส่งทาง LINE</span>
                </button>

                {/* 2. ส่งทางอีเมล */}
                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="h-[50px] px-5 rounded-full bg-white text-[#1D1D1F] border border-[#E7E0D7] hover:border-[#F26B3A] hover:text-[#F26B3A] font-heading font-medium text-sm flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
                >
                  <Mail className="w-5 h-5 text-[#3B82D6]" />
                  <span>ส่งทางอีเมล</span>
                </button>

                {/* 3. คัดลอกข้อความ */}
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="h-[50px] px-5 rounded-full bg-white text-[#1D1D1F] border border-[#E7E0D7] hover:border-[#F26B3A] hover:text-[#F26B3A] font-heading font-medium text-sm flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
                >
                  <Copy className="w-5 h-5 text-[#C99212]" />
                  <span>คัดลอกข้อความ</span>
                </button>

                {/* 4. โทรคุยกับร้าน */}
                <a
                  href="tel:0814255552"
                  className="h-[50px] px-5 rounded-full bg-white text-[#1D1D1F] border border-[#E7E0D7] hover:border-[#F26B3A] hover:text-[#F26B3A] font-heading font-medium text-sm flex items-center justify-center gap-2 active:scale-98 transition-all"
                >
                  <Phone className="w-5 h-5 text-[#F26B3A]" />
                  <span>โทรคุยกับร้าน</span>
                </a>
              </div>

              {/* Note under buttons */}
              <p className="text-center text-xs text-[#6E6E73] font-body mt-1">
                ร้านจะติดต่อกลับพร้อมใบเสนอราคาโดยเร็วที่สุด
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default QuoteSection;
