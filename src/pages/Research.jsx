import { motion } from "motion/react";
import {
  Archive,
  BarChart3,
  UsersRound,
  Mail,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "../utils/useTranslation";

const Research = () => {
  const { t, dir } = useTranslation();
  return (
    <main
      className="min-h-screen bg-[#FAF9F8] text-[#001809]"
    >
      {/* =====================================================
          HERO
      ====================================================== */}
      <section
        className="
          relative
          overflow-hidden
          bg-[#FAF9F8]
          px-5
          pt-28
          pb-16
          sm:px-8
          lg:px-16
          lg:pt-32
        "
      >
        {/* Background decoration */}
        <div
          className="
            pointer-events-none
            absolute
            -right-32
            -top-32
            h-80
            w-80
            rounded-full
            bg-[#D8F2DC]/40
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -left-32
            bottom-0
            h-80
            w-80
            rounded-full
            bg-[#EEF6EF]/60
            blur-3xl
          "
        />

        <div className="relative mx-auto max-w-[1120px]">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="
              mb-8
              flex
              items-center
              justify-center
              gap-2
              text-sm
              font-bold
              text-[#6B7280]
              sm:justify-start
            "
          >
            <Link
              to="/"
              className="
                transition-colors
                duration-300
                hover:text-[#0F2E1B]
              "
            >
              {t("research.breadcrumbHome")}
            </Link>

            <span className="text-[#9CA3AF]">‹</span>

            <span className="text-[#001809]">
              {t("research.breadcrumbCurrent")}
            </span>
          </motion.div>
          {/* Hero title */}
          <div className="text-center">

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="
                font-serif
                text-4xl
                font-bold
                leading-tight
                tracking-tight
                text-[#001809]
                sm:text-5xl
                md:text-6xl
                lg:text-[64px]
              "
            >
              {t("research.heroTitle")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.15,
              }}
              className="
                mx-auto
                mt-7
                max-w-[900px]
                text-base
                font-medium
                leading-8
                text-[#424842]
                sm:text-lg
                md:text-xl
              "
            >
              {t("research.heroDesc")}
            </motion.p>

          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <section
        className="
          bg-[#FAF9F8]
          px-5
          pb-24
          sm:px-8
          lg:px-16
        "
      >
        <div className="mx-auto max-w-[1120px]">

          {/* =================================================
              DATABASE UPDATE CARD
          ================================================== */}
          <motion.section
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              relative
              overflow-hidden
              rounded-[24px]
              border
              border-[#E5E7E5]
              bg-white
              px-6
              py-12
              shadow-[0_8px_30px_rgba(0,24,9,0.05)]
              sm:px-10
              md:px-16
              md:py-16
            "
          >

            {/* Decorative circles */}
            <div
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-64
                w-64
                rounded-full
                bg-[#D8F2DC]/60
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -left-24
                -bottom-24
                h-64
                w-64
                rounded-full
                bg-[#EEF6EF]
              "
            />

            <div className="relative">

              {/* Title */}
              <div className="text-center">
                <h2
                  className="
                    font-serif
                    text-3xl
                    font-bold
                    text-[#001809]
                    sm:text-4xl
                    md:text-5xl
                  "
                >
                  {t("research.dbTitle")}
                </h2>

                <p
                  className="
                    mx-auto
                    mt-6
                    max-w-[820px]
                    text-base
                    leading-8
                    text-[#424842]
                    sm:text-lg
                  "
                >
                  {t("research.dbDesc")}
                </p>
              </div>

              {/* Divider */}
              <div className="my-12 h-px bg-[#E8EBE8]" />

              {/* =================================================
                  FEATURES
              ================================================== */}
              <motion.div
                className="
                  grid
                  grid-cols-1
                  gap-10
                  md:grid-cols-3
                  md:gap-8
                "
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6 }}
              >

                {/* Feature 1 */}
                <ResearchFeature
                  icon={Archive}
                  title={t("research.feature1.title")}
                  description={t("research.feature1.desc")}
                />

                {/* Feature 2 */}
                <ResearchFeature
                  icon={BarChart3}
                  title={t("research.feature2.title")}
                  description={t("research.feature2.desc")}
                />

                {/* Feature 3 */}
                <ResearchFeature
                  icon={UsersRound}
                  title={t("research.feature3.title")}
                  description={t("research.feature3.desc")}
                />

              </motion.div>

              {/* =================================================
                  NEWSLETTER
              ================================================== */}
              <div
                className="
                  mt-16
                  text-center
                "
              >

                <p
                  className="
                    mb-5
                    text-base
                    font-medium
                    text-[#424842]
                    sm:text-lg
                  "
                >
                  {t("research.newsletter")}
                </p>

                <div
                  className="
                    mx-auto
                    flex
                    w-full
                    max-w-[470px]
                    flex-col
                    overflow-hidden
                    rounded-xl
                    border
                    border-[#DDE3DE]
                    bg-white
                    sm:flex-row
                  "
                >

                  {/* Email */}
                  <div
                    className="
                      flex
                      flex-1
                      items-center
                      gap-3
                      px-5
                      py-3.5
                      text-start
                    "
                  >
                    <Mail
                      size={18}
                      className="shrink-0 text-[#7A807A]"
                    />

                    <input
                      type="email"
                      placeholder={t("research.emailPlaceholder")}
                      className="
                        w-full
                        bg-transparent
                        text-sm
                        text-[#001809]
                        outline-none
                        placeholder:text-[#8B918B]
                      "
                    />
                  </div>

                  {/* Subscribe */}
                  <button
                    className="
                      bg-[#0F2E1B]
                      px-7
                      py-3.5
                      text-sm
                      font-bold
                      text-white
                      transition-all
                      duration-200
                      ease-out
                      hover:-translate-y-0.5
                      hover:scale-[1.02]
                      hover:bg-[#164325]
                      active:scale-[0.97]
                      sm:shrink-0
                    "
                  >
                    {t("research.subscribe")}
                  </button>

                </div>

              </div>

            </div>
          </motion.section>

          {/* =================================================
              BOTTOM CARDS
          ================================================== */}
          <div
            className="
              mt-7
              grid
              grid-cols-1
              gap-5
              md:grid-cols-3
            "
          >

            <SmallResearchCard
              title={t("research.card1.title")}
              description={t("research.card1.desc")}
            />

            <SmallResearchCard
              title={t("research.card2.title")}
              description={t("research.card2.desc")}
            />

            <SmallResearchCard
              title={t("research.card3.title")}
              description={t("research.card3.desc")}
            />

          </div>

          {/* Back */}
          <div className="mt-12 flex justify-center">

            <Link
              to="/"
              className="
                group
                flex
                items-center
                gap-3
                rounded-full
                bg-[#0F2E1B]
                px-7
                py-3.5
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-[#0F2E1B]/10
                transition-all
                duration-300
                hover:bg-[#164325]
                rtl:hover:translate-x-1
                ltr:hover:-translate-x-1
              "
            >
              {/* <span>العودة للرئيسية</span> */}

              {dir === "rtl" ? (
                <ArrowRight
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              ) : (
                <ArrowLeft
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-x-1
                  "
                />
              )}
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
};

/* ============================================================
   RESEARCH FEATURE
============================================================ */

const ResearchFeature = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div
      className="
        group
        text-center
        transition-all
        duration-300
        hover:-translate-y-[5px]
      "
    >
      <div
        className="
          mx-auto
          mb-5
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-xl
          bg-[#F3E8D8]
          text-[#79552C]
          transition-all
          duration-300
          group-hover:rotate-3
          group-hover:scale-110
          group-hover:bg-[#D8F2DC]
          group-hover:text-[#0F2E1B]
        "
      >
        <Icon
          size={26}
          strokeWidth={1.8}
        />
      </div>

      <h3
        className="
          font-serif
          text-lg
          font-bold
          text-[#001809]
          sm:text-xl
        "
      >
        {title}
      </h3>

      <p
        className="
          mx-auto
          mt-3
          max-w-[250px]
          text-sm
          leading-7
          text-[#6B7280]
        "
      >
        {description}
      </p>

    </div>
  );
};

/* ============================================================
   SMALL CARD
============================================================ */

const SmallResearchCard = ({
  title,
  description,
}) => {
  return (
    <div
      className="
        rounded-2xl
        border
        border-[#E5E7E5]
        bg-white
        px-6
        py-6
        text-center
        transition-all
        duration-300
        hover:-translate-y-[5px]
        hover:shadow-[0_12px_30px_rgba(0,24,9,0.07)]
      "
    >
      <h3
        className="
          font-serif
          text-lg
          font-bold
          text-[#001809]
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-3
          text-sm
          leading-7
          text-[#6B7280]
        "
      >
        {description}
      </p>
    </div>
  );
};

export default Research;