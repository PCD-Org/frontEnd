import { motion, useReducedMotion } from "motion/react";
import { useTranslation } from "../../utils/useTranslation";

import unicef from "../../assets/partners/unicef.png";
import anera from "../../assets/partners/anera.png";
import wac from "../../assets/partners/wac.png";
import wfp from "../../assets/partners/wfp.png";
import pif from "../../assets/partners/pif.png";
import afsc from "../../assets/partners/afsc.png";
import nrc from "../../assets/partners/nrc.png";


const PARTNERS = [
  { id: "unicef", logo: unicef, ar: "اليونيسف", en: "UNICEF" },
  { id: "anera", logo: anera, ar: "أنيرا", en: "Anera" },
  { id: "wac", logo: wac, ar: "مركز شؤون المرأة", en: "Women's Affairs Center" },
  { id: "wfp", logo: wfp, ar: "برنامج الغذاء العالمي", en: "World Food Programme" },
  { id: "pif", logo: pif, ar: "الصندوق الفلسطيني للاستثمار", en: "Palestine Investment Fund" },
  { id: "afsc", logo: afsc, ar: "خدمات الأصدقاء الأمريكيين (الكويكرز)", en: "American Friends Service Committee" },
  { id: "nrc", logo: nrc, ar: "المجلس النرويجي للاجئين", en: "Norwegian Refugee Council" },
];

const MARQUEE_CSS = `
@keyframes partners-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.partners-track {
  display: flex;
  width: max-content;
  animation: partners-scroll 45s linear infinite;
  will-change: transform;
}
.partners-rtl .partners-track { animation-direction: reverse; }
.partners-marquee:hover .partners-track,
.partners-marquee:focus-within .partners-track { animation-play-state: paused; }

@media (prefers-reduced-motion: reduce) {
  .partners-track {
    animation: none;
    width: auto;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 1rem;
  }
  .partners-dup { display: none; }
}
`;

const FADE_MASK =
  "linear-gradient(to right, transparent, #000 9%, #000 91%, transparent)";

function LogoTile({ partner, label, decorative = false }) {
  return (
    <div
      className="group mr-5 flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-white p-5 shadow-xs transition duration-500 hover:-translate-y-1 hover:border-[#006c48]/30 hover:shadow-lg sm:mr-6 sm:h-28 sm:w-52"
      title={decorative ? undefined : label}
    >
      <img
        src={partner.logo}
        alt={decorative ? "" : label}
        loading="lazy"
        draggable="false"
className="h-full w-full object-contain transition duration-500 group-hover:scale-105"      />
    </div>
  );
}

export default function Partners() {
  const { t, dir, language } = useTranslation();
  const reduceMotion = useReducedMotion();

  const tr = (key, ar, en) => {
    const v = t(key);
    return v && v !== key ? v : language === "ar" ? ar : en;
  };

  const title = tr("partners.title", "شركاؤنا وداعمونا", "Partners & Donors");
  const subtitle = tr(
    "partners.subtitle",
    "مؤسسات تشاركنا الإيمان بأثر العمل المجتمعي في فلسطين",
    "Organizations that share our belief in community impact across Palestine"
  );

  const labelOf = (p) => (language === "ar" ? p.ar : p.en);
  const lineTransition = { duration: 0.9, ease: [0.22, 1, 0.36, 1] };

  return (
    <section
      aria-labelledby="partners-heading"
      className="overflow-hidden bg-[#F6F8F6] py-20"
    >
      <style>{MARQUEE_CSS}</style>

      {/* Heading */}
      <div className="mx-auto max-w-3xl px-5 text-center">
        <motion.h2
          id="partners-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-3xl font-bold leading-tight text-[#0D3B2E] sm:text-[40px]"
        >
          {title}
        </motion.h2>

        <div
          className="mx-auto mt-5 flex items-center justify-center gap-2"
          aria-hidden="true"
          dir="ltr"
        >
          <motion.span
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ ...lineTransition, delay: 0.25 }}
            className="h-[3px] w-14 origin-right rounded-full bg-[#006c48]"
          />
          <motion.span
            initial={reduceMotion ? false : { scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 380, damping: 14, delay: 0.15 }}
            className="h-2.5 w-2.5 rounded-full bg-[#006c48]"
          />
          <motion.span
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ ...lineTransition, delay: 0.25 }}
            className="h-[3px] w-14 origin-left rounded-full bg-[#006c48]"
          />
        </div>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-600"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Marquee */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        dir="ltr"
        className={`partners-marquee mt-14 ${dir === "rtl" ? "partners-rtl" : ""}`}
        style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
      >
        <ul className="partners-track" aria-label={title}>
          {PARTNERS.map((p) => (
            <li key={p.id} className="flex">
              <LogoTile partner={p} label={labelOf(p)} />
            </li>
          ))}
          {PARTNERS.map((p) => (
            <li key={`${p.id}-dup`} className="partners-dup flex" aria-hidden="true">
              <LogoTile partner={p} label={labelOf(p)} decorative />
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
