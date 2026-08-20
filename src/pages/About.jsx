import { PageHeader } from "../components/ui/PageHeader";
import { SectionTitle } from "../components/ui/SectionTitle";
import { Container } from "../components/ui/Container";

import aboutHeroImg from "../assets/79a6c5cb8ad4f873287640653a8177127eca0c9b.jpg";

import {
  Users,
  ShieldCheck,
  Leaf,
  Scale,
  Recycle,
  Eye,
  HandHeart,
} from "lucide-react";

import { useTranslation } from "../utils/useTranslation";

function About() {
  const { t } = useTranslation();

  const missionVision = [
    {
      icon: Users,
      title: t("about.empowermentTitle"),
      description: t("about.empowermentDesc"),
    },
    {
      icon: ShieldCheck,
      title: t("about.policiesTitle"),
      description: t("about.policiesDesc"),
    },
    {
      icon: Leaf,
      title: t("about.environmentTitle"),
      description: t("about.environmentDesc"),
    },
  ];

  const values = [
    {
      icon: Eye,
      title: t("about.valueTransparencyTitle"),
      description: t("about.valueTransparencyDesc"),
    },
    {
      icon: Scale,
      title: t("about.valueJusticeTitle"),
      description: t("about.valueJusticeDesc"),
    },
    {
      icon: Recycle,
      title: t("about.valueSustainabilityTitle"),
      description: t("about.valueSustainabilityDesc"),
    },
    {
      icon: HandHeart,
      title: t("about.valuePartnershipTitle"),
      description: t("about.valuePartnershipDesc"),
    },
    {
      icon: Users,
      title: t("about.valueEmpowermentTitle"),
      description: t("about.valueEmpowermentDesc"),
    },
  ];

  return (
    <main dir="rtl" className="w-full overflow-hidden">
      {/* =====================================================
          PAGE TITLE / BREADCRUMB
      ===================================================== */}
      <SectionTitle
        title={t("about.sectionTitle")}
        breadcrumbs={[{ label: t("about.breadcrumb") }]}
        align="right"
      />

      {/* =====================================================
          HERO
      ===================================================== */}
      <Container>
        <PageHeader
          variant="light"
          title={
            <>
              {t("about.heroTitle1")}
              <br />
              {t("about.heroTitle2")}
            </>
          }
          description={t("about.heroDesc")}
          image={aboutHeroImg}
          imageBadge={t("about.imageBadge")}
        />
      </Container>

      {/* =====================================================
          STORY SECTION
      ===================================================== */}
      <section className="mt-16 w-full bg-[#F4F3F2] px-6 py-16 md:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[896px] flex-col items-center text-center">
          {/* Small label */}
          <span className="mb-4 rounded-full bg-[#0F2E1B]/10 px-4 py-1 font-serif text-sm font-semibold text-[#001809]">
            {t("about.storyLabel")}
          </span>

          {/* Title */}
          <h2 className="font-serif text-3xl font-semibold leading-tight text-[#001809] md:text-[32px]">
            {t("about.storyTitle")}
          </h2>

          {/* Text */}
          <div className="mt-6 flex flex-col gap-4">
            <p className="font-serif text-base leading-8 text-[#424842] md:text-lg">
              {t("about.storyDesc1")}
            </p>

            <p className="font-serif text-base leading-8 text-[#424842] md:text-lg">
              {t("about.storyDesc2")}
            </p>
          </div>
        </div>
      </section>

     {/* =====================================================
    MISSION / VISION / EMPOWERMENT
===================================================== */}
        <section className="w-full px-5 py-10 md:px-10 lg:px-20">
        <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-6 md:grid-cols-3">
            {missionVision.map((item, index) => {
            const Icon = item.icon;

            return (
                <div
                key={index}
                // تم تغيير items-end إلى items-start لتصبح على اليمين في نظام RTL
                className="group flex min-h-[280px] flex-col items-start rounded-xl border border-[#C2C8C0]/20 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-10"
                >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#C8EBCE] transition-transform duration-300 group-hover:scale-105">
                    <Icon
                    size={24}
                    strokeWidth={1.8}
                    className="text-[#001809]"
                    />
                </div>

                {/* Title */}
                {/* أضفنا text-right و w-full لضمان المحاذاة */}
                <h3 className="mt-5 w-full text-right font-serif text-2xl font-semibold text-[#001809]">
                    {item.title}
                </h3>

                {/* Description */}
                {/* أضفنا text-right و w-full */}
                <p className="mt-4 w-full text-right font-serif text-base leading-[26px] text-[#424842]">
                    {item.description}
                </p>
                </div>
            );
            })}
        </div>
        </section>

      {/* =====================================================
          VALUES SECTION
      ===================================================== */}
      <section className="w-full bg-[#0F2E1B] px-5 py-[72px] md:px-10 lg:py-[88px]">
        <div className="mx-auto flex max-w-[1120px] flex-col">
          {/* Section title */}
          <div className="flex flex-col items-center">
            <h2 className="font-serif text-3xl font-semibold text-[#76977E]">
              {t("about.valuesTitle")}
            </h2>

            {/* Underline */}
            <div className="mt-4 h-1 w-20 rounded-full bg-[#76977E]/30" />
          </div>

          {/* Values */}
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center px-4 text-center"
                >
                  {/* Icon */}
                  <div className="mb-4">
                    <Icon
                      size={28}
                      strokeWidth={1.7}
                      className="text-[#76977E]"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 font-serif text-2xl font-semibold text-[#76977E]">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="font-serif text-base leading-6 text-[#76977E]/80">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA SECTION
      ===================================================== */}
      <section className="w-full px-5 py-10 md:px-10 lg:px-20 lg:py-16">
        <div className="mx-auto flex min-h-[268px] max-w-[1120px] flex-col items-center justify-center rounded-xl bg-[#C8EBCE] px-6 py-16 text-center md:px-16">
          {/* CTA title */}
          <h2 className="font-serif text-2xl font-semibold text-[#02210F] md:text-[32px]">
            {t("about.ctaTitle")}
          </h2>

          {/* Buttons */}
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Secondary button */}
            <button
              type="button"
              className="rounded-full border-2 border-[#001809] px-8 py-3 font-serif text-sm font-bold text-[#001809] transition-all duration-300 hover:bg-[#001809] hover:text-white"
            >
              {t("about.contactButton")}
            </button>

            {/* Primary button */}
            <button
              type="button"
              className="rounded-full bg-[#0F2E1B] px-8 py-3 font-serif text-sm font-bold text-[#76977E] shadow-md transition-all duration-300 hover:bg-[#164324] hover:shadow-lg"
            >
              {t("about.joinButton")}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;