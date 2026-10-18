import { Link } from "react-router-dom";
import { Home as HomeIcon, Compass, ArrowRight, ArrowLeft } from "lucide-react";
import SEO from "../components/common/SEO";
import { useTranslation } from "../utils/useTranslation";

export default function NotFound() {
  const { t, dir } = useTranslation();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <>
      <SEO
        title={t("notFound.title") || "404 - الصفحة غير موجودة"}
        description={t("notFound.desc") || "الصفحة المطلوبة غير موجودة"}
        noindex={true}
      />

      <main className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-[#FAF9F8] px-5 py-20 text-[#001809]">
        {/* Soft background ambient glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-[#D8F2DC]/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-[#C8EBCE]/30 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0D3B2E]/15 bg-white/80 px-4 py-1.5 text-xs font-bold tracking-widest text-[#0D3B2E] shadow-sm backdrop-blur-sm sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>{t("notFound.badge")}</span>
          </div>

          {/* Large 404 Graphic */}
          <div className="relative mb-6 select-none">
            <div className="text-8xl font-black tracking-tight text-[#0D3B2E]/15 sm:text-9xl">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0D3B2E] text-white shadow-xl shadow-[#0D3B2E]/25">
                <Compass className="h-8 w-8 animate-spin" style={{ animationDuration: "12s" }} />
              </div>
            </div>
          </div>

          {/* Title & Description */}
          <h1 className="mb-3 text-2xl font-black text-[#0D3B2E] sm:text-3xl">
            {t("notFound.title")}
          </h1>
          <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-[#4A5568]">
            {t("notFound.desc")}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0D3B2E] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#155e46] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0D3B2E] focus:ring-offset-2"
            >
              <HomeIcon className="h-4 w-4" />
              <span>{t("notFound.backHome")}</span>
            </Link>

            <Link
              to="/activities"
              className="inline-flex items-center gap-2 rounded-xl border border-[#0D3B2E]/20 bg-white px-6 py-3 text-sm font-semibold text-[#0D3B2E] transition-all hover:bg-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#0D3B2E] focus:ring-offset-2"
            >
              <span>{t("notFound.exploreActivities")}</span>
              <Arrow className="h-4 w-4" />
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-12 border-t border-[#0D3B2E]/10 pt-6">
            <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-[#0D3B2E]/80">
              <Link to="/about" className="hover:text-[#0D3B2E] hover:underline">
                {t("nav.about")}
              </Link>
              <Link to="/research" className="hover:text-[#0D3B2E] hover:underline">
                {t("nav.research")}
              </Link>
              <Link to="/news" className="hover:text-[#0D3B2E] hover:underline">
                {t("nav.news")}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
