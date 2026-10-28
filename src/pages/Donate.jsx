import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../utils/useTranslation";
import useLanguageStore from "../store/useLanguageStore";

const PHONE = "+972 599 444 371";
const PHONE_HREF = "tel:+972599444371";
const EMAIL = "info@pcedpal.org";

const HERO_IMAGE = "";

const accounts = [
  { id: "usd", currencyKey: "donate.currency.usd", code: "USD", symbol: "$", chip: "bg-[#E3F1E7] text-[#2E7D4F]", iban: "PS18PALS045441134730013000000" },
  { id: "eur", currencyKey: "donate.currency.eur", code: "EUR", symbol: "€", chip: "bg-[#E4EDF6] text-[#2F5D8A]", iban: "PS23PALS045441134730333000000" },
  { id: "ils", currencyKey: "donate.currency.ils", code: "ILS", symbol: "₪", chip: "bg-[#F8EDD2] text-[#9A6A12]", iban: "PS03PALS045441134730993000000" },
];

const font = "font-['Atkinson_Hyperlegible_Next']";

const BRANCH = { p0: [8, 196], p1: [96, 128], p2: [208, 26] };
const pointAt = (t) => {
  const u = 1 - t;
  return [
    u * u * BRANCH.p0[0] + 2 * u * t * BRANCH.p1[0] + t * t * BRANCH.p2[0],
    u * u * BRANCH.p0[1] + 2 * u * t * BRANCH.p1[1] + t * t * BRANCH.p2[1],
  ];
};
const angleAt = (t) => {
  const u = 1 - t;
  const dx = 2 * u * (BRANCH.p1[0] - BRANCH.p0[0]) + 2 * t * (BRANCH.p2[0] - BRANCH.p1[0]);
  const dy = 2 * u * (BRANCH.p1[1] - BRANCH.p0[1]) + 2 * t * (BRANCH.p2[1] - BRANCH.p1[1]);
  return (Math.atan2(dy, dx) * 180) / Math.PI;
};

const oliveLeaves = Array.from({ length: 9 }, (_, i) => {
  const t = 0.12 + i * 0.1;
  const [x, y] = pointAt(t);
  const a = angleAt(t);
  const s = 1.1 - t * 0.45;
  return [
    { x, y, a: a - 55, s },
    { x, y, a: a + 55, s },
  ];
}).flat();
oliveLeaves.push({ x: pointAt(1)[0], y: pointAt(1)[1], a: angleAt(1), s: 0.75 });

const oliveFruits = [0.3, 0.5, 0.7].map((t) => {
  const [x, y] = pointAt(t);
  return { x, y, fx: x - 4, fy: y + 22 };
});

const leafPath = "M0 0C8-11 26-11 36 0C26 11 8 11 0 0Z";

function OliveBranch() {
  return (
    <g>
      <path
        d={`M${BRANCH.p0} Q${BRANCH.p1} ${BRANCH.p2}`}
        fill="none"
        stroke="#6E9A7B"
        strokeOpacity="0.75"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {oliveFruits.map((f) => (
        <g key={`f${f.x}`}>
          <path d={`M${f.x} ${f.y}L${f.fx} ${f.fy - 6}`} stroke="#6E9A7B" strokeOpacity="0.75" strokeWidth="1.6" fill="none" />
          <ellipse cx={f.fx} cy={f.fy} rx="5.5" ry="8" fill="#7FA68B" fillOpacity="0.8" stroke="#9CC0A8" strokeOpacity="0.7" />
          <ellipse cx={f.fx - 1.8} cy={f.fy - 2.6} rx="1.4" ry="2.6" fill="#DCEBE0" fillOpacity="0.55" />
        </g>
      ))}
      {oliveLeaves.map((l) => (
        <g key={`${l.x}-${l.a}`} transform={`translate(${l.x} ${l.y}) rotate(${l.a}) scale(${l.s})`}>
          <path d={leafPath} fill="#2F5E3F" fillOpacity="0.75" stroke="#6E9A7B" strokeOpacity="0.65" strokeWidth="1" />
          <path d="M3 0H33" stroke="#6E9A7B" strokeOpacity="0.55" strokeWidth="0.9" />
        </g>
      ))}
    </g>
  );
}

function Watermelon({ className = "" }) {
  const seeds = [[60, 31], [44, 23], [76, 23], [31, 13], [89, 13]];
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 60"
      role="img"
      aria-label="Watermelon"
    >
      <path d="M10 6A50 50 0 0 0 110 6Z" fill="#2E7D4F" />
      <path d="M16 6A44 44 0 0 0 104 6Z" fill="#F8F9F8" />
      <path d="M20 6A40 40 0 0 0 100 6Z" fill="#E5484D" />
      {seeds.map(([x, y]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="2.4" ry="4.2" fill="#0B0B0B" />
      ))}
    </svg>
  );
}


const icons = {
  heart: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
  mail: (
    <>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </>
  ),
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />,
  bank: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V10m4 11V10m6 11V10m4 11V10" />
      <path d="m2 10 10-7 10 7Z" />
    </>
  ),
  copy: (
    <>
      <rect width="14" height="14" x="8" y="8" rx="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  arrow: (
    <>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </>
  ),
};

function Icon({ name, size = 18, className = "" }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

function CopyButton({ value, label, copiedLabel }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-lg px-4 py-2 ${font} text-sm font-bold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002417] ${
        copied
          ? "bg-[#2E7D4F] text-white"
          : "bg-[#002417] text-white hover:bg-[#0b4a31]"
      }`}
    >
      <Icon name={copied ? "check" : "copy"} size={16} />
      <span>{copied ? copiedLabel : label}</span>
    </button>
  );
}

function Donate() {
  const { t, language } = useTranslation();
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const toggleLanguage = () => setLanguage(language === "ar" ? "en" : "ar");

  const bankInfo = [
    { label: t("donate.bank.swift"), value: "PALSPS22", ltr: true },
    { label: t("donate.bank.bank"), value: t("donate.bank.bankName") },
    { label: t("donate.bank.accountNumber"), value: "4113473", ltr: true },
  ];

  return (
    <main className="w-full bg-[#F4F7F4]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#002417] pt-[75px]">
        {HERO_IMAGE && (
          <img src={HERO_IMAGE} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        )}

        {/* Olive branch pattern */}
        <svg className="absolute inset-0 h-full w-full opacity-90" aria-hidden="true">
          <defs>
            <pattern id="olive" width="240" height="240" patternUnits="userSpaceOnUse">
              <OliveBranch />
              <g transform="translate(236 140) scale(-0.45 0.45)">
                <OliveBranch />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#olive)" />
        </svg>
        <div className="absolute -top-24 end-0 h-72 w-72 rounded-full bg-[#2E7D4F]/30 blur-3xl" />
        <div className="absolute -bottom-24 start-0 h-64 w-64 rounded-full bg-[#D9A441]/15 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-36 pt-6 text-center sm:px-8 lg:px-20 lg:pb-44 lg:pt-8">
          {/* Top bar: back to home + language switch */}
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/"
              className={`inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 ${font} text-sm font-bold text-[#F8F9F8] transition-all duration-300 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A441]`}
            >
              <Icon name="arrow" size={16} className="rtl:rotate-180" />
              <span>{t("donate.back")}</span>
            </Link>

            <button
              type="button"
              onClick={toggleLanguage}
              className={`inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 ${font} text-sm font-bold text-[#F8F9F8] transition-all duration-300 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A441]`}
            >
              <Icon name="globe" size={16} />
              <span>{language === "ar" ? "English" : "العربية"}</span>
            </button>
          </div>

          <Watermelon className="mx-auto mt-10 h-16 w-auto drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)]" />
          <h1 className="mx-auto mt-6 max-w-[720px] font-['Noto_Serif'] text-4xl font-bold tracking-[-0.6px] text-[#F8F9F8] lg:text-5xl">
            {t("donate.title")}
          </h1>
          <p className={`mx-auto mt-5 max-w-[760px] whitespace-pre-line ${font} text-base leading-8 text-[#B9D0BF]`}>
          {t("donate.subtitle")}
          </p>
        </div>
      </section>

      {/* Cards (overlap the hero) */}
      <section className="relative mx-auto -mt-24 w-full max-w-[1280px] px-6 pb-20 sm:px-8 lg:-mt-32 lg:px-20 lg:pb-28">
        <div className="mx-auto grid max-w-[1040px] gap-6 lg:grid-cols-[1fr_340px]">
          {/* Bank details */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_-20px_rgba(0,36,23,0.35)]">
            <div className="h-1.5 w-full bg-[#D9A441]" />
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E3F1E7] text-[#002417]">
                  <Icon name="bank" size={22} />
                </span>
                <h2 className="font-['Noto_Serif'] text-2xl font-bold text-[#002417]">
                  {t("donate.bank.title")}
                </h2>
              </div>

              <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {bankInfo.map((d) => (
                  <div key={d.label} className="rounded-xl bg-[#F4F7F4] px-4 py-3">
                    <dt className={`${font} text-xs text-[#4f6f58]`}>{d.label}</dt>
                    <dd
                      dir={d.ltr ? "ltr" : undefined}
                      className={`mt-1 ${font} text-base font-bold text-[#002417] ${d.ltr ? "text-start" : ""}`}
                    >
                      {d.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <h3 className={`mt-8 ${font} text-base font-bold text-[#002417]`}>
                {t("donate.iban.title")}
              </h3>

              <ul className="mt-4 flex flex-col gap-3">
                {accounts.map((a) => (
                  <li
                    key={a.id}
                    className="flex flex-col gap-3 rounded-xl border border-[#002417]/10 p-4 sm:flex-row sm:items-center"
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-['Noto_Serif'] text-xl font-bold ${a.chip}`}
                    >
                      {a.symbol}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`${font} text-sm text-[#4f6f58]`}>
                        {t(a.currencyKey)} ({a.code})
                      </p>
                      <p
                        dir="ltr"
                        className={`mt-0.5 break-all text-start ${font} text-[15px] font-bold tracking-wide text-[#002417]`}
                      >
                        {a.iban}
                      </p>
                    </div>
                    <CopyButton value={a.iban} label={t("donate.copy")} copiedLabel={t("donate.copied")} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact + funding */}
          <aside className="h-fit rounded-2xl bg-[#002417] p-6 text-white shadow-[0_20px_50px_-20px_rgba(0,36,23,0.5)] sm:p-8">
            <h2 className="font-['Noto_Serif'] text-2xl font-bold text-[#F8F9F8]">
              {t("donate.contact.title")}
            </h2>
            <p className={`mt-3 ${font} text-sm leading-7 text-[#B9D0BF]`}>
              {t("donate.contact.text")}
            </p>

            <div className="mt-6 flex flex-col gap-4">
              <a href={PHONE_HREF} className={`flex items-center gap-3 ${font} text-sm text-[#F8F9F8] transition-all duration-300 hover:opacity-80`}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#D9A441]">
                  <Icon name="phone" size={17} />
                </span>
                <span dir="ltr">{PHONE}</span>
              </a>
              <a href={`mailto:${EMAIL}`} className={`flex items-center gap-3 ${font} text-sm text-[#F8F9F8] transition-all duration-300 hover:opacity-80`}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#D9A441]">
                  <Icon name="mail" size={17} />
                </span>
                <span dir="ltr">{EMAIL}</span>
              </a>
            </div>

            <div className="my-6 h-px w-full bg-white/15" />

            <p className={`${font} text-sm leading-7 text-[#F8F9F8]`}>
              {t("donate.contact.funding")}
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#D9A441] px-4 py-3 ${font} text-sm font-bold text-[#002417] transition-all duration-300 hover:bg-[#e6b658]`}
            >
              <Icon name="mail" size={17} />
              {t("donate.contact.emailCta")}
            </a>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default Donate;
