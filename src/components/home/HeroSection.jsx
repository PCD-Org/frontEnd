import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { Leaf } from "lucide-react";
import heroBackground from "../../assets/79a6c5cb8ad4f873287640653a8177127eca0c9b.jpg";
import { useTranslation } from "../../utils/useTranslation";

export const HeroSection = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-[#081c15]">
      {/* Background image */}
      <img
        src={heroBackground}
        alt=""
        loading="eager"
        fetchPriority="high"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* Direction-aware overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/45 ltr:bg-gradient-to-r ltr:from-black/80 ltr:via-black/55 ltr:to-black/20 rtl:bg-gradient-to-l rtl:from-black/80 rtl:via-black/55 rtl:to-black/20" />

      <div className="relative mx-auto flex min-h-[72vh] w-full max-w-[1280px] items-center px-5 py-20 sm:min-h-[80vh] sm:px-8 lg:min-h-[85vh] lg:px-12 xl:px-20">
        <div className="flex w-full items-center justify-between gap-12">
          {/* Content */}
          <motion.div
            className="flex w-full max-w-2xl flex-col items-start gap-7 text-white"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
              <Leaf size={14} className="text-mint" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-white/90">
                PCED
              </span>
            </span>

            {/* Headline */}
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[64px]">
              {t("hero.title")}
            </h1>

            {/* Accent bar */}
            <span className="h-1 w-16 rounded-full bg-primary" />

            {/* Subtitle */}
            <p className="max-w-xl text-lg font-medium leading-relaxed text-white/85 sm:text-xl">
              {t("hero.subtitle")}
              <span className="mt-1 block text-base font-normal text-white/60">
                (PCED)
              </span>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="#projects"
                className="inline-flex items-center rounded-full bg-primary px-7 py-3.5 text-base font-bold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#0F2E1B] hover:shadow-[0_10px_25px_rgba(0,108,72,0.35)] active:scale-95"
              >
                {t("hero.projects")}
              </Link>

              <Link
                to="#about"
                className="inline-flex items-center rounded-full border-2 border-white/70 px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[#001809] active:scale-95"
              >
                {t("hero.aboutUs")}
              </Link>
            </div>
          </motion.div>

          {/* Stat card (desktop) */}
          <motion.div
            className="hidden shrink-0 lg:block"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full max-w-[280px] rounded-2xl border border-white/15 bg-white/10 p-7 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-md">
              <div className="flex items-center gap-4 border-b border-white/15 pb-6">
                <span className="text-4xl font-extrabold text-mint">2023</span>
                <span className="text-sm font-semibold leading-snug text-white/85">
                  {t("whoWeAre.founded")}
                </span>
              </div>
              <div className="flex items-center gap-4 pt-6">
                <span className="text-4xl font-extrabold text-mint">+50</span>
                <span className="text-sm font-semibold leading-snug text-white/85">
                  {t("whoWeAre.projects")}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
