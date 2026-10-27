/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BrandConfig {
  name: string;
  fullName: string;
  facebook: string;
  email: string;
  mainPhone: string;
  mainPhoneTel: string;
  LINE_OA_URL: string;
}

export interface HeroConfig {
  badge: string;
  titleLine1: string;
  titleLine2Prefix: string;
  titleLine2Highlight: string;
  subtitle: string;
  handwritten: string[];
  ctaPrimary: string;
  ctaSecondary: string;
  ctaMap: string;
}

export interface AboutConfig {
  title: string;
  p1: string;
  p2: string;
  statNumber: number;
  statSuffix: string;
  statCaption: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface ColorsConfig {
  title: string;
  caption: string;
  swatches: ColorSwatch[];
}

export interface MissionItem {
  title: string;
  desc: string;
}

export interface ServiceItem {
  title: string;
  image: string;
  desc: string;
  tags?: string[];
}

export interface WhyUsItem {
  title: string;
  desc: string;
  icon: string;
}

export interface PortfolioItem {
  id: number;
  image: string;
  title: string;
  category: string;
}

export interface PortfolioConfig {
  filters: string[];
  items: PortfolioItem[];
}

export interface ProcessItem {
  no: string;
  title: string;
  desc: string;
  icon: string;
}

export interface BranchItem {
  id: number;
  name: string;
  subName: string;
  province: string;
  address: string;
  hours: string[];
  phone: string;
  tel: string;
  lineLabel: string;
  lineUrl: string;
  mapUrl: string;
  mapQuery: string;
  image: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FinalCtaConfig {
  title: string;
  desc: string;
  button: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export const brand: BrandConfig = {
  name: "New Classic",
  fullName: "เสื้อโปโลบางใหญ่ บางบัวทอง (New Classic)",
  facebook: "https://www.facebook.com/share/1JLxErkMBr/?mibextid=wwXIfr",
  email: "classicblue55@gmail.com",
  mainPhone: "081-425-5552",
  mainPhoneTel: "0814255552",
  LINE_OA_URL: "",
};

export const hero: HeroConfig = {
  badge: "ประสบการณ์มากกว่า 30 ปี",
  titleLine1: "ผลิต ปัก สกรีน",
  titleLine2Prefix: "เสื้อโปโล ",
  titleLine2Highlight: "ครบในที่เดียว",
  subtitle:
    "New Classic รับผลิตและจำหน่ายเสื้อโปโล พร้อมบริการปัก–สกรีนครบในที่เดียว ให้คำแนะนำอย่างจริงใจ แจ้งราคาชัดเจน และช่วยเลือกเสื้อให้เหมาะกับทีมและงบประมาณของคุณ",
  handwritten: ["ใส่สบาย", "ดูดี มีทีมเวิร์ค", "ในทุกโอกาส"],
  ctaPrimary: "สอบถามราคาและสั่งผลิต",
  ctaSecondary: "ดูสินค้าและผลงาน",
  ctaMap: "แผนที่หน้าร้าน",
};

export const marquee: string[] = [
  "ติดต่อโรงงานโดยตรง",
  "ขายปลีกราคาส่ง",
  "ปัก–สกรีนครบ",
  "มีหน้าร้าน 4 สาขา",
  "ประสบการณ์ 30+ ปี",
];

export const intro: string =
  "ผลิตและจำหน่ายเสื้อโปโล ทั้งเสื้อเปล่าพร้อมจำหน่ายและงานสั่งผลิต พร้อมบริการปักโลโก้และสกรีนสำหรับเสื้อบริษัท เสื้อพนักงาน เสื้อยูนิฟอร์ม และเสื้อทีม ขายปลีกในราคาขายส่ง มีหน้าร้านให้เลือกชมสินค้าจริง ด้วยประสบการณ์ด้านงานเสื้อมากกว่า 30 ปี";

export const about: AboutConfig = {
  title: "เกี่ยวกับ New Classic",
  p1: "เสื้อโปโลบางใหญ่ บางบัวทอง (New Classic) เป็นโรงงานผลิตและจำหน่ายเสื้อโปโลโดยตรง ให้บริการทั้งลูกค้ารายย่อย ร้านค้า บริษัท หน่วยงานภาครัฐ และองค์กรเอกชน",
  p2: "เรามีเสื้อเปล่าพร้อมจำหน่าย รับงานสั่งผลิต และรับงานปัก–สกรีนจำนวนมาก เพื่อให้ลูกค้าจัดทำเสื้อสำหรับองค์กร ทีมงาน และกิจกรรมต่าง ๆ ได้ครบในที่เดียว พร้อมหน้าร้าน 4 สาขาให้เข้ามาชมสินค้า และแอดมินคอยให้ข้อมูลก่อนสั่งซื้อ",
  statNumber: 30,
  statSuffix: "+",
  statCaption: "ปี กับงานเสื้อที่ใส่ใจ",
};

export const colors: ColorsConfig = {
  title: "เลือกสีโปโลของทีมคุณ",
  caption: "มีหลายสี หลายไซซ์ พร้อมส่ง — สอบถามสีและสินค้าคงเหลือได้ที่ร้าน",
  swatches: [
    { name: "ส้ม", hex: "#F26B3A" },
    { name: "ฟ้า", hex: "#7CB7FF" },
    { name: "เขียวมิ้นต์", hex: "#5FCB9A" },
    { name: "เหลือง", hex: "#FFCE5C" },
    { name: "กรมท่า", hex: "#2F4B8F" },
    { name: "ชมพู", hex: "#F28DB2" },
    { name: "เทา", hex: "#9AA0A6" },
    { name: "ดำ", hex: "#1D1D1F" },
  ],
};

export const vision: string =
  "เป็นร้านเสื้อโปโลและผู้ผลิตที่ลูกค้าไว้วางใจ ด้วยการดำเนินธุรกิจอย่างซื่อสัตย์ บริการเป็นมิตร และส่งมอบเสื้อคุณภาพในราคาสมเหตุสมผล เพื่อเป็นส่วนหนึ่งในการสร้างภาพลักษณ์ที่ดีให้ทุกองค์กรและทุกทีม";

export const missions: MissionItem[] = [
  {
    title: "ซื่อสัตย์และโปร่งใส",
    desc: "ให้ข้อมูลสินค้า ราคา และเงื่อนไขอย่างตรงไปตรงมา พร้อมรับผิดชอบงานตามข้อตกลงกับลูกค้า",
  },
  {
    title: "บริการเป็นมิตรและใส่ใจ",
    desc: "รับฟังความต้องการ ให้คำแนะนำอย่างจริงใจ และดูแลลูกค้าทุกคนด้วยความสุภาพและเป็นกันเอง",
  },
  {
    title: "ตั้งราคาสมเหตุสมผล",
    desc: "เสนอราคาที่เป็นธรรม สอดคล้องกับคุณภาพสินค้าและรายละเอียดงาน พร้อมช่วยเลือกทางเลือกที่เหมาะกับงบประมาณ",
  },
  {
    title: "ใส่ใจคุณภาพและการส่งมอบ",
    desc: "ดูแลคุณภาพตั้งแต่การเลือกผ้า การผลิต ไปจนถึงงานปักและสกรีน พร้อมวางแผนส่งมอบตามเวลาที่ตกลง",
  },
  {
    title: "สร้างความสัมพันธ์ระยะยาว",
    desc: "รับฟังความคิดเห็นและดูแลหลังการขาย เพื่อนำมาพัฒนาสินค้าและบริการให้ตอบโจทย์ลูกค้าอย่างต่อเนื่อง",
  },
];

export const promise: string = "ซื่อสัตย์ทุกคำแนะนำ เป็นมิตรทุกการบริการ ราคาสมเหตุสมผล";

export const services: ServiceItem[] = [
  {
    title: "เสื้อโปโลและเสื้อเปล่า",
    image: "service-polo.jpg",
    desc: "จำหน่ายเสื้อโปโลและเสื้อเปล่าสำหรับนำไปใช้งานหรือเพิ่มเติมโลโก้ มีบริการขายปลีกในราคาขายส่ง สอบถามรุ่น สี ไซซ์ และสินค้าคงเหลือกับทางร้านได้โดยตรง",
  },
  {
    title: "เสื้อสั่งผลิตสำหรับองค์กรและทีม",
    image: "service-custom.jpg",
    desc: "รับผลิตเสื้อบริษัท เสื้อพนักงาน เสื้อยูนิฟอร์ม เสื้อโฆษณา เสื้อพละ เสื้อกลุ่ม และเสื้อทีม สำหรับหน่วยงานภาครัฐ เอกชน และธุรกิจองค์กรต่าง ๆ",
  },
  {
    title: "บริการปักโลโก้และข้อความ",
    image: "service-embroidery.jpg",
    desc: "รับงานปักสำหรับเสื้อองค์กรและเสื้อทีม ช่วยให้เสื้อมีเอกลักษณ์และสื่อถึงภาพลักษณ์ของหน่วยงาน พร้อมรองรับงานจำนวนมาก",
  },
  {
    title: "บริการสกรีนเสื้อ",
    image: "service-screen.jpg",
    desc: "รับสกรีนทุกประเภท สำหรับโลโก้ ข้อความ และลวดลายบนเสื้อ โดยสอบถามรูปแบบงานที่เหมาะสมกับแบบเสื้อและการใช้งานได้",
    tags: ["ซิลค์สกรีน", "DTF", "ซับลิเมชัน", "เฟล็กซ์"],
  },
];

export const whyUs: WhyUsItem[] = [
  {
    title: "ติดต่อโรงงานโดยตรง",
    desc: "สอบถามสินค้าและงานสั่งผลิตกับผู้ผลิตได้โดยตรง",
    icon: "Factory",
  },
  {
    title: "ขายปลีกในราคาขายส่ง",
    desc: "ให้บริการทั้งลูกค้าทั่วไปและลูกค้าองค์กร",
    icon: "BadgePercent",
  },
  {
    title: "ครบทั้งเสื้อ ปัก และสกรีน",
    desc: "จัดทำเสื้อพร้อมโลโก้และข้อความได้ในที่เดียว",
    icon: "Shirt",
  },
  {
    title: "มีหน้าร้าน 4 สาขา",
    desc: "เข้ามาดูเนื้อผ้า สี และรูปแบบเสื้อของจริงก่อนตัดสินใจได้",
    icon: "Store",
  },
  {
    title: "ประสบการณ์มากกว่า 30 ปี",
    desc: "มีประสบการณ์ด้านการผลิตและจำหน่ายเสื้อ พร้อมให้คำแนะนำเกี่ยวกับงานที่ต้องการ",
    icon: "Award",
  },
  {
    title: "มีแอดมินคอยดูแล",
    desc: "ช่วยตอบคำถามและประสานรายละเอียดการสั่งซื้อ",
    icon: "MessageCircleHeart",
  },
];

export const portfolio: PortfolioConfig = {
  filters: ["ทั้งหมด", "งานปัก", "งานสกรีน", "เสื้อเปล่า"],
  items: [
    { id: 1, image: "work-01.jpg", title: "เสื้อโปโลพนักงาน ปักโลโก้อกซ้าย", category: "งานปัก" },
    { id: 2, image: "work-02.jpg", title: "เสื้อทีมกีฬาสี สกรีนด้านหลัง", category: "งานสกรีน" },
    { id: 3, image: "work-03.jpg", title: "เสื้อยูนิฟอร์มหน่วยงาน ปักโลโก้และชื่อ", category: "งานปัก" },
    { id: 4, image: "work-04.jpg", title: "เสื้อกิจกรรมบริษัท สกรีน DTF", category: "งานสกรีน" },
    { id: 5, image: "work-05.jpg", title: "เสื้อโปโลเปล่า คอลเลกชันสีพื้น", category: "เสื้อเปล่า" },
    { id: 6, image: "work-06.jpg", title: "เสื้อโฆษณาร้านค้า ปักโลโก้", category: "งานปัก" },
    { id: 7, image: "work-07.jpg", title: "เสื้อพนักงานร้านอาหาร ปักโลโก้แขน", category: "งานปัก" },
    { id: 8, image: "work-08.jpg", title: "เสื้อชมรมมหาวิทยาลัย สกรีนซับลิเมชัน", category: "งานสกรีน" },
  ],
};

export const process: ProcessItem[] = [
  {
    no: "01",
    title: "แจ้งความต้องการ",
    desc: "ระบุประเภทเสื้อ จำนวน สี ไซซ์ และวันที่ต้องการใช้งาน หากมีโลโก้หรือแบบที่ชอบ สามารถส่งมาเพื่อประกอบการประเมินได้",
    icon: "ClipboardList",
  },
  {
    no: "02",
    title: "รับราคา",
    desc: "ทางร้านตรวจสอบสินค้าหรือประเมินงานสั่งผลิต พร้อมรายละเอียดงานปัก–สกรีนตามที่ต้องการ",
    icon: "Calculator",
  },
  {
    no: "03",
    title: "ยืนยันคำสั่งซื้อ",
    desc: "ตรวจสอบแบบ จำนวน ไซซ์ ราคา และกำหนดส่งให้ครบถ้วน ก่อนยืนยันตามเงื่อนไขของร้าน",
    icon: "FileCheck2",
  },
  {
    no: "04",
    title: "รับสินค้า",
    desc: "นัดหมายการรับสินค้า หรือสอบถามวิธีจัดส่งกับทางร้าน",
    icon: "PackageCheck",
  },
];

export const branches: BranchItem[] = [
  {
    id: 1,
    name: "สาขาบางใหญ่ บางบัวทอง",
    subName: "New Classic",
    province: "นนทบุรี",
    address: "35/4 ม.2 ต.บางเลน อ.บางใหญ่ จ.นนทบุรี 11140",
    hours: ["จันทร์–เสาร์ 9.00–18.00 น."],
    phone: "081-425-5552",
    tel: "0814255552",
    lineLabel: "LINE: 081-425-5552",
    lineUrl: "",
    mapUrl: "https://maps.app.goo.gl/dSmJ86i3w4aAU8GL7",
    mapQuery: "35/4 ม.2 ตำบลบางเลน อำเภอบางใหญ่ นนทบุรี 11140",
    image: "branch-01.jpg",
  },
  {
    id: 2,
    name: "สาขาราชพฤกษ์ พระราม 5",
    subName: "ร้าน 989 Factory",
    province: "นนทบุรี",
    address: "989 ม.1 ถ.ราชพฤกษ์ ต.บางขุนกอง อ.บางกรวย จ.นนทบุรี 11130",
    hours: ["จันทร์–ศุกร์ 10.00–16.30 น.", "เสาร์ 13.00–17.00 น."],
    phone: "085-366-5699",
    tel: "0853665699",
    lineLabel: "LINE ID: csbpolo",
    lineUrl: "https://line.me/ti/p/~csbpolo",
    mapUrl: "https://maps.app.goo.gl/xxXRsZzubqNxiWFS7",
    mapQuery: "989 ถนนราชพฤกษ์ ตำบลบางขุนกอง อำเภอบางกรวย นนทบุรี 11130",
    image: "branch-02.jpg",
  },
  {
    id: 3,
    name: "สาขาโบ๊เบ๊ รังสิต",
    subName: "เซียร์ รังสิต (คลาสสิค บลู)",
    province: "ปทุมธานี",
    address: "68/3 ถ.พหลโยธิน ต.คูคต อ.ลำลูกกา จ.ปทุมธานี 12130",
    hours: ["เปิดทุกวัน 10.30–18.00 น."],
    phone: "085-366-5699",
    tel: "0853665699",
    lineLabel: "LINE ID: csbpolo",
    lineUrl: "https://line.me/ti/p/~csbpolo",
    mapUrl: "https://maps.app.goo.gl/g3PGLSt1dCxmE3m1A",
    mapQuery: "โบ๊เบ๊ รังสิต เซียร์ รังสิต",
    image: "branch-03.jpg",
  },
  {
    id: 4,
    name: "สาขาโบ๊เบ๊ ทาวเวอร์",
    subName: "ชั้น 3 โซน 7B (Tembo)",
    province: "กรุงเทพฯ",
    address: "โบ๊เบ๊ทาวเวอร์ ชั้น 3 โซน 7B แขวงคลองมหานาค เขตป้อมปราบศัตรูพ่าย กรุงเทพมหานคร 10100",
    hours: ["เวลาเปิดไม่แน่นอน กรุณาโทรสอบถามก่อนเข้าร้าน"],
    phone: "081-802-6645",
    tel: "0818026645",
    lineLabel: "LINE: 081-425-5552",
    lineUrl: "",
    mapUrl: "https://maps.app.goo.gl/LwdTVBCkE5wPn75h7",
    mapQuery: "โบ๊เบ๊ทาวเวอร์",
    image: "branch-04.jpg",
  },
];

export const faq: FaqItem[] = [
  {
    q: "ซื้อเสื้อเปล่าโดยไม่ปักหรือสกรีนได้ไหม?",
    a: "ได้ ทางร้านมีเสื้อเปล่าพร้อมจำหน่าย สามารถสอบถามรุ่น สี และไซซ์ที่มีอยู่ได้",
  },
  {
    q: "รับทำเสื้อให้บริษัทและหน่วยงานหรือไม่?",
    a: "รับผลิตเสื้อบริษัท เสื้อพนักงาน เสื้อยูนิฟอร์ม และเสื้อทีม สำหรับทั้งภาครัฐและเอกชน",
  },
  {
    q: "มีบริการปักและสกรีนด้วยไหม?",
    a: "มีบริการปัก และสกรีนทุกประเภท (ซิลค์สกรีน DTF ซับลิเมชัน เฟล็กซ์) พร้อมรับงานจำนวนมาก",
  },
  {
    q: "มีหน้าร้านให้เข้าไปดูสินค้าไหม?",
    a: "มีหน้าร้านให้เข้าชมสินค้าจริง 4 สาขา กรุณาตรวจสอบที่ตั้งและเวลาเปิดทำการก่อนเดินทาง",
  },
  {
    q: "สั่งผลิตขั้นต่ำกี่ตัวและใช้เวลากี่วัน?",
    a: "กรุณาแจ้งรูปแบบงาน จำนวน และวันที่ต้องการใช้งาน เพื่อให้ทางร้านตรวจสอบขั้นต่ำและระยะเวลาที่เหมาะสมกับแต่ละงาน",
  },
];

export const finalCta: FinalCtaConfig = {
  title: "กำลังมองหาเสื้อสำหรับบริษัทหรือทีมของคุณ?",
  desc: "ส่งรายละเอียดเสื้อ จำนวน และโลโก้ที่ต้องการมาให้ New Classic ช่วยประเมินงาน ได้ทั้งเสื้อเปล่า งานสั่งผลิต และงานปัก–สกรีน",
  button: "สอบถามและขอใบเสนอราคา",
};

export const nav: NavItem[] = [
  { label: "บริการ", href: "#services" },
  { label: "ผลงาน", href: "#portfolio" },
  { label: "ขั้นตอน", href: "#process" },
  { label: "สาขา", href: "#branches" },
  { label: "คำถาม", href: "#faq" },
];
