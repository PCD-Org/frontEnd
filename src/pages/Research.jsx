import React from "react";
import { motion } from "motion/react";
import {
  Archive,
  BarChart3,
  UsersRound,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const Research = () => {
  return (
    <main
      dir="rtl"
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
              الرئيسية
            </Link>

            <span className="text-[#9CA3AF]">‹</span>

            <span className="text-[#001809]">
              الأبحاث والدراسات
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
              الأبحاث والدراسات
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
              نلتزم في المركز الفلسطيني للتنمية البيئية بتوفير قاعدة
              بيانات علمية رصينة تدعم جهود الحفاظ على التنوع البيئي
              والتنمية المستدامة في فلسطين. أبحاثنا تربط بين المعارف
              التقليدية الموروثة والتقنيات الحديثة.
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
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                }}
                className="text-center"
              >
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
                  تحديث قاعدة البيانات
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
                  نعمل حالياً على تحديث قاعدة بيانات الأبحاث والدراسات
                  العلمية لتوفير أفضل الموارد المعرفية. سيتم إطلاق
                  النسخة المحدثة قريباً لتضم تقارير ميدانية، دراسات
                  أكاديمية، وأوراق سياسات بيئية متخصصة.
                </p>
              </motion.div>

              {/* Divider */}
              <div className="my-12 h-px bg-[#E8EBE8]" />

              {/* =================================================
                  FEATURES
              ================================================== */}
              <div
                className="
                  grid
                  grid-cols-1
                  gap-10
                  md:grid-cols-3
                  md:gap-8
                "
              >

                {/* Feature 1 */}
                <ResearchFeature
                  icon={Archive}
                  title="أرشيف رقمي"
                  description="سهولة الوصول للمقالات العلمية والمواد البحثية."
                  delay={0}
                />

                {/* Feature 2 */}
                <ResearchFeature
                  icon={BarChart3}
                  title="تحليل البيانات"
                  description="تقارير إحصائية دقيقة تساعد على فهم البيانات والنتائج."
                  delay={0.1}
                />

                {/* Feature 3 */}
                <ResearchFeature
                  icon={UsersRound}
                  title="تعاون بحثي"
                  description="منصة للباحثين والمهتمين لتبادل المعرفة والخبرات."
                  delay={0.2}
                />

              </div>

              {/* =================================================
                  NEWSLETTER
              ================================================== */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                }}
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
                  اشترك لتصلك تنبيهات الإصدارات الجديدة
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
                      text-right
                    "
                  >
                    <Mail
                      size={18}
                      className="shrink-0 text-[#7A807A]"
                    />

                    <input
                      type="email"
                      placeholder="البريد الإلكتروني"
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
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className="
                      bg-[#0F2E1B]
                      px-7
                      py-3.5
                      text-sm
                      font-bold
                      text-white
                      transition-colors
                      duration-300
                      hover:bg-[#164325]
                      sm:shrink-0
                    "
                  >
                    اشترك الآن
                  </motion.button>

                </div>

              </motion.div>

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
              title="التنوع الحيوي"
              description="دراسة التنوع الحيوي والموارد الطبيعية في فلسطين."
            />

            <SmallResearchCard
              title="الأمن الغذائي"
              description="أبحاث حول استدامة الموارد والأمن الغذائي."
            />

            <SmallResearchCard
              title="سياسات البيئة"
              description="تحليل السياسات البيئية ودعم التنمية المستدامة."
            />

          </div>

          {/* Back */}
          <div className="mt-12 flex justify-center">

            <motion.div
              whileHover={{
                x: -4,
              }}
            >
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
                "
              >
                {/* <span>العودة للرئيسية</span> */}

                <ArrowLeft
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-x-1
                  "
                />
              </Link>
            </motion.div>

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
  delay,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
        delay,
      }}
      whileHover={{
        y: -5,
      }}
      className="
        group
        text-center
      "
    >

      <motion.div
        whileHover={{
          scale: 1.08,
          rotate: 3,
        }}
        transition={{
          duration: 0.25,
        }}
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
          transition-colors
          duration-300
          group-hover:bg-[#D8F2DC]
          group-hover:text-[#0F2E1B]
        "
      >
        <Icon
          size={26}
          strokeWidth={1.8}
        />
      </motion.div>

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

    </motion.div>
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
    <motion.div
      whileHover={{
        y: -5,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        rounded-2xl
        border
        border-[#E5E7E5]
        bg-white
        px-6
        py-6
        text-center
        transition-shadow
        duration-300
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
    </motion.div>
  );
};

export default Research;