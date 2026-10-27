/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, MessageCircle, CheckCircle2, Send, Loader2 } from 'lucide-react';
import { brand, branches } from '../data/content.ts';
import { useToast } from '../context/ToastContext.tsx';
import { submitQuoteRequest } from '../lib/firebase.ts';
import Reveal from './Reveal.tsx';

export const QuoteSection: React.FC = () => {
  const { handleLineAction, showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    quantity: '',
    notes: '',
    services: [] as string[],
  });

  const toggleService = (service: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      showToast('กรุณากรอกชื่อและเบอร์โทรศัพท์สำหรับติดต่อ');
      return;
    }

    setLoading(true);
    try {
      await submitQuoteRequest({
        customerName: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        quantity: formData.quantity ? parseInt(formData.quantity, 10) : undefined,
        serviceType: formData.services.length > 0 ? formData.services.join(', ') : 'ทั่วไป',
        notes: formData.notes.trim() || undefined,
      });

      setSubmitted(true);
      showToast('บันทึกข้อมูลเรียบร้อยแล้ว ทางร้านจะติดต่อกลับโดยเร็วที่สุดครับ');
    } catch (err) {
      console.error('Error submitting to Firebase:', err);
      showToast('เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้งหรือติดต่อทางโทรศัพท์');
    } finally {
      setLoading(false);
    }
  };

  const branch1 = branches[0];

  return (
    <section id="quote" className="py-16 md:py-24 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="bg-white rounded-[28px] sm:rounded-[36px] border border-[#E7E0D7] shadow-[0_12px_40px_rgba(0,0,0,0.04)] overflow-hidden p-6 sm:p-10 md:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column: Title & Quick Contact */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#F26B3A]" />
                    <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#F26B3A] uppercase font-heading">
                      GET A QUOTE
                    </span>
                  </div>

                  <h2 className="font-heading font-extrabold text-[32px] sm:text-[40px] md:text-[44px] text-[#1D1D1F] leading-[1.18] tracking-tight mb-4">
                    ขอใบเสนอราคา
                  </h2>

                  <p className="font-body text-[#6E6E73] text-base sm:text-[17px] leading-[1.7] mb-8">
                    ส่งรายละเอียดเสื้อ จำนวน และรูปแบบที่ต้องการมาให้ New Classic
                    ช่วยประเมินราคาได้ทันที มีทั้งเสื้อเปล่าพร้อมส่ง งานสั่งผลิต และบริการปัก–สกรีนครบวงจร
                  </p>

                  {/* Trust bullets */}
                  <div className="space-y-3 mb-10 text-sm text-[#1D1D1F] font-body">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#5FCB9A] shrink-0" />
                      <span>แจ้งราคาชัดเจน ซื่อสัตย์ โปร่งใส ไม่มีค่าใช้จ่ายแอบแฝง</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#5FCB9A] shrink-0" />
                      <span>ขายปลีกในราคาขายส่ง ประสบการณ์โรงงานมากกว่า 30 ปี</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#5FCB9A] shrink-0" />
                      <span>มีหน้าร้านจริง 4 สาขา เข้ามาจับเนื้อผ้าจริงได้ก่อนตัดสินใจ</span>
                    </div>
                  </div>
                </div>

                {/* Direct Contact Buttons */}
                <div className="pt-6 border-t border-[#E7E0D7] flex flex-wrap gap-3">
                  <a
                    href={`tel:${brand.mainPhoneTel}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#F26B3A] text-white font-medium text-sm shadow-xs hover:bg-[#FF8A5C] active:scale-95 transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{brand.mainPhone}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleLineAction(branch1?.phone, branch1?.lineUrl)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#06C755] text-white font-medium text-sm shadow-xs hover:opacity-90 active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>แอด LINE สอบถาม</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Quote Form (Synced with Firebase Firestore) */}
              <div className="lg:col-span-7 bg-[#FBF8F4] p-6 sm:p-8 rounded-[24px] border border-[#E7E0D7]">
                {submitted ? (
                  <div className="py-12 px-4 text-center flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-[#5FCB9A]/20 flex items-center justify-center text-[#5FCB9A] mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-[#1D1D1F] mb-2">
                      ส่งข้อมูลขอใบเสนอราคาสำเร็จ!
                    </h3>
                    <p className="font-body text-[#6E6E73] text-sm sm:text-base max-w-md mb-6 leading-relaxed">
                      ข้อมูลของคุณถูกบันทึกลงในระบบ New Classic เรียบร้อยแล้ว
                      เจ้าหน้าที่จะติดต่อกลับเพื่อให้ข้อมูลและเสนอราคาโดยเร็วที่สุด
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          quantity: '',
                          notes: '',
                          services: [],
                        });
                      }}
                      className="px-6 py-2.5 rounded-full bg-white border border-[#E7E0D7] text-sm font-medium text-[#1D1D1F] hover:border-[#F26B3A] transition-colors"
                    >
                      ส่งคำขอใบเสนอราคาอื่นเพิ่มเติม
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 font-heading">
                          ชื่อ-นามสกุล / บริษัท <span className="text-[#F26B3A]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="เช่น คุณสมชาย (บริษัท นิวคลาสสิค)"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-[#E7E0D7] focus:border-[#F26B3A] focus:outline-none focus:ring-2 focus:ring-[#F26B3A]/15 text-sm font-body transition-all"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 font-heading">
                          เบอร์โทรติดต่อ <span className="text-[#F26B3A]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="เช่น 081-425-5552"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-[#E7E0D7] focus:border-[#F26B3A] focus:outline-none focus:ring-2 focus:ring-[#F26B3A]/15 text-sm font-body transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 font-heading">
                          อีเมล (ถ้ามี)
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="example@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-[#E7E0D7] focus:border-[#F26B3A] focus:outline-none focus:ring-2 focus:ring-[#F26B3A]/15 text-sm font-body transition-all"
                        />
                      </div>

                      {/* Quantity */}
                      <div>
                        <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 font-heading">
                          จำนวนที่ต้องการประเมิน (ตัว)
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                          placeholder="เช่น 50, 100, 500"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-[#E7E0D7] focus:border-[#F26B3A] focus:outline-none focus:ring-2 focus:ring-[#F26B3A]/15 text-sm font-body transition-all"
                        />
                      </div>
                    </div>

                    {/* Service check options */}
                    <div>
                      <label className="block text-xs font-semibold text-[#1D1D1F] mb-2 font-heading">
                        ประเภทงานที่สนใจ (เลือกได้หลายข้อ)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['งานปักโลโก้', 'งานสกรีนเสื้อ', 'เสื้อเปล่าพร้อมส่ง', 'สั่งผลิตตามแบบองค์กร'].map(
                          (item) => {
                            const isChecked = formData.services.includes(item);
                            return (
                              <button
                                key={item}
                                type="button"
                                onClick={() => toggleService(item)}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                                  isChecked
                                    ? 'bg-[#F26B3A] text-white border-[#F26B3A]'
                                    : 'bg-white text-[#6E6E73] border-[#E7E0D7] hover:border-[#F26B3A]/40'
                                }`}
                              >
                                {isChecked ? '✓ ' : '+ '}
                                {item}
                              </button>
                            );
                          }
                        )}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5 font-heading">
                        รายละเอียดเพิ่มเติม / วันที่ต้องการใช้งาน
                      </label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="ระบุสีที่สนใจ โลโก้ที่ต้องการปัก/สกรีน หรือกำหนดวันที่ต้องใช้เสื้อ..."
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#E7E0D7] focus:border-[#F26B3A] focus:outline-none focus:ring-2 focus:ring-[#F26B3A]/15 text-sm font-body resize-none transition-all"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-shine-container w-full h-[52px] rounded-full bg-[#F26B3A] text-white font-heading font-semibold text-base shadow-[0_4px_16px_rgba(242,107,58,0.28)] hover:bg-[#FF8A5C] active:scale-[0.99] disabled:opacity-60 transition-all flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>กำลังบันทึกข้อมูล...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>ส่งข้อมูลเพื่อขอใบเสนอราคา</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-center text-[#6E6E73] font-body mt-2">
                      ข้อมูลจะถูกจัดเก็บในฐานข้อมูล New Classic อย่างปลอดภัย
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default QuoteSection;
