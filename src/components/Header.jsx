import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {Search,Globe,ChevronDown,Menu,X,} from "lucide-react";
import { useTranslation } from "../utils/useTranslation";
import useLanguageStore from "../store/useLanguageStore";

const navKeys = [
  { key: "nav.home", path: "/" },
  { key: "nav.about", path: "/about" },
  { key: "nav.activities", path: "/activities" },
  { key: "nav.research", path: "/research" },
  { key: "nav.news", path: "/news" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileLanguageOpen, setIsMobileLanguageOpen] =
    useState(false);

  const { t, language } = useTranslation();
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsLanguageOpen(false);
    setIsMobileLanguageOpen(false);
  };

  return (
    <header
      className="
        fixed
        left-0
        right-0
        top-0
        z-50
        h-[75px]
        w-full
        border-b
        border-[rgba(194,200,192,0.15)]
        bg-[rgba(250,249,248,0.9)]
        shadow-[0_1px_2px_rgba(0,0,0,0.05)]
        backdrop-blur-[6px]
      "
    >
      {/* =====================================================
          HEADER CONTAINER
      ====================================================== */}

      <div
        className="
          mx-auto
          flex
          h-[74px]
          w-full
          max-w-[1280px]
          items-center
          justify-between
          gap-6
          px-5
          sm:px-8
          lg:px-12
          xl:px-20
        "
      >
        {/* =====================================================
            RIGHT SIDE
            LOGO + NAVIGATION
        ====================================================== */}

        <div
          className="
            flex
            min-w-0
            items-center
            gap-6
            xl:gap-10
          "
        >
          {/* =========================
              PCED LOGO
              بدون underline
          ========================== */}

          <Link
            to="/"
            onClick={() => {
              setIsMenuOpen(false);
              setIsLanguageOpen(false);
              setIsMobileLanguageOpen(false);
            }}
            className="
              shrink-0
              font-['Noto_Serif']
              text-[24px]
              font-bold
              leading-[32px]
              tracking-[-0.6px]
              text-[#001809]
              transition-all
              duration-300
              ease-out
              hover:-translate-y-[1px]
              hover:opacity-80
            "
          >
            PCED
          </Link>

          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== */}

          <nav className="hidden lg:block">
            <div className="flex items-center gap-6 xl:gap-10">
              {navKeys.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="
                    group
                    relative
                    flex
                    h-[32px]
                    items-center
                    whitespace-nowrap
                    font-['FreeSerif']
                    text-[16px]
                    font-bold
                    leading-[26px]
                    tracking-[-0.4px]
                    text-[#424842]
                  "
                >
                  {({ isActive }) => (
                    <>
                      {/* Text */}

                      <span
                        className={`
                          transition-all
                          duration-300
                          ease-out
                          group-hover:-translate-y-[1px]
                          ${
                            isActive
                              ? "text-[#001809]"
                              : "group-hover:text-[#001809]"
                          }
                        `}
                      >
                        {t(item.key)}
                      </span>

                      {/* Underline */}

                      <span
                        className={`
                          absolute
                          bottom-0
                          left-0
                          right-0
                          h-[2px]
                          origin-center
                          bg-[#001809]
                          transition-transform
                          duration-300
                          ease-out
                          ${
                            isActive
                              ? "scale-x-100 opacity-100"
                              : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                          }
                        `}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>

        {/* =====================================================
            LEFT SIDE
            DONATE + SEARCH + LANGUAGE + MOBILE MENU
        ====================================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-3
            sm:gap-4
          "
        >
          {/* =====================================================
              DONATE BUTTON
          ====================================================== */}

          <button
            type="button"
            className="
              group
              relative
              flex
              h-[42px]
              min-w-[100px]
              items-center
              justify-center
              overflow-hidden
              rounded-full
              bg-[#0F2E1B]
              px-5
              sm:px-6
              font-['FreeSerif']
              text-[16px]
              font-bold
              leading-[26px]
              tracking-[-0.4px]
              text-[#76977E]
              transition-all
              duration-200
              ease-out
              hover:-translate-y-0.5
              hover:scale-[1.04]
              hover:shadow-[0_8px_20px_rgba(15,46,27,0.20)]
              active:scale-95
            "
          >
            {/* Shine Effect */}

            <span
              className="
                absolute
                -left-[50px]
                top-0
                h-full
                w-[30px]
                rotate-[20deg]
                bg-white/10
                blur-[2px]
                transition-all
                duration-700
                group-hover:left-[120%]
              "
            />

            <span className="relative z-10">
              {t("header.donate")}
            </span>
          </button>

          {/* =====================================================
              DESKTOP SEARCH
          ====================================================== */}

          <div
            className="
              group
              hidden
              h-[38px]
              w-[180px]
              items-center
              rounded-full
              border
              border-[rgba(194,200,192,0.3)]
              bg-[#F4F3F2]
              px-3
              transition-all
              duration-300
              focus-within:border-[#0F2E1B]/40
              focus-within:bg-white
              focus-within:shadow-[0_4px_15px_rgba(0,0,0,0.06)]
              lg:flex
              xl:w-[215px]
            "
          >
            <input
              type="text"
              placeholder={t("header.search")}
              className="
                min-w-0
                flex-1
                bg-transparent
                px-1
                font-['Atkinson_Hyperlegible_Next']
                text-[14px]
                font-bold
                leading-[18px]
                tracking-[-0.4px]
                text-[#424842]
                outline-none
                placeholder:text-[#6B7280]
              "
            />

            <Search
              size={18}
              strokeWidth={2}
              className="
                shrink-0
                text-[#727972]
                transition-all
                duration-300
                group-focus-within:scale-110
                group-focus-within:text-[#0F2E1B]
                ltr:ml-2
                rtl:mr-2
              "
            />
          </div>

          {/* =====================================================
              DESKTOP LANGUAGE
          ====================================================== */}

          <div className="relative hidden lg:block">
            <button
              type="button"
              onClick={() =>
                setIsLanguageOpen((prev) => !prev)
              }
              className="
                group
                flex
                h-[32px]
                items-center
                gap-1
                rounded-md
                px-2
                font-['Atkinson_Hyperlegible_Next']
                text-[16px]
                font-bold
                leading-[26px]
                tracking-[-0.4px]
                text-[#424842]
                transition-all
                duration-200
                ease-out
                hover:-translate-y-[1px]
                hover:bg-black/5
                hover:text-[#001809]
                active:scale-95
              "
            >
              <span>{t("header.currentLang")}</span>

              <Globe
                size={16.67}
                strokeWidth={2}
                className="
                  transition-transform
                  duration-300
                  group-hover:rotate-12
                "
              />

              <ChevronDown
                size={14}
                className={`
                  transition-transform
                  duration-300
                  ${
                    isLanguageOpen
                      ? "rotate-180"
                      : "rotate-0"
                  }
                `}
              />
            </button>

            {/* Desktop Language Dropdown */}

            <AnimatePresence>
              {isLanguageOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -8,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                    scale: 0.95,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                  className="
                    absolute
                    top-[40px]
                    min-w-[120px]
                    overflow-hidden
                    rounded-xl
                    border
                    border-[#C2C8C0]/30
                    bg-[#FAF9F8]
                    shadow-[0_10px_30px_rgba(0,0,0,0.10)]
                    ltr:left-0
                    ltr:origin-top-left
                    rtl:right-0
                    rtl:origin-top-right
                  "
                >
                  <button
                    type="button"
                    onClick={() => handleLanguageChange("ar")}
                    className={`
                      block
                      w-full
                      px-4
                      py-2.5
                      text-start
                      font-['FreeSerif']
                      text-sm
                      transition-all
                      duration-200
                      hover:bg-[#F4F3F2]
                      hover:text-[#001809]
                      ${
                        language === "ar"
                          ? "text-[#001809] font-bold"
                          : "text-[#424842]"
                      }
                    `}
                  >
                    العربية
                  </button>

                  <button
                    type="button"
                    onClick={() => handleLanguageChange("en")}
                    className={`
                      block
                      w-full
                      px-4
                      py-2.5
                      text-start
                      font-['FreeSerif']
                      text-sm
                      transition-all
                      duration-200
                      hover:bg-[#F4F3F2]
                      hover:text-[#001809]
                      ${
                        language === "en"
                          ? "text-[#001809] font-bold"
                          : "text-[#424842]"
                      }
                    `}
                  >
                    English
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* =====================================================
              MOBILE MENU BUTTON
          ====================================================== */}

          <button
            type="button"
            onClick={() =>
              setIsMenuOpen((prev) => !prev)
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              text-[#001809]
              transition-colors
              duration-200
              hover:bg-[#F4F3F2]
              active:scale-90
              lg:hidden
            "
            aria-label={t("header.openMenu")}
          >
            <span className="relative block h-6 w-6">
              <Menu
                size={24}
                className={`
                  absolute
                  inset-0
                  transition-all
                  duration-200
                  ease-out
                  ${
                    isMenuOpen
                      ? "rotate-90 scale-50 opacity-0"
                      : "rotate-0 scale-100 opacity-100"
                  }
                `}
              />
              <X
                size={24}
                className={`
                  absolute
                  inset-0
                  transition-all
                  duration-200
                  ease-out
                  ${
                    isMenuOpen
                      ? "rotate-0 scale-100 opacity-100"
                      : "-rotate-90 scale-50 opacity-0"
                  }
                `}
              />
            </span>
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="
              overflow-hidden
              border-t
              border-[#C2C8C0]/15
              bg-[#FAF9F8]/95
              shadow-[0_8px_25px_rgba(0,0,0,0.08)]
              backdrop-blur-[8px]
              lg:hidden
            "
          >
            <nav
              className="
                mx-auto
                flex
                w-full
                max-w-[1280px]
                flex-col
                px-5
                py-4
                sm:px-8
              "
            >
              {/* =========================
                  MOBILE NAV LINKS
              ========================== */}

              {navKeys.map((item) => (
                <div key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsMobileLanguageOpen(false);
                    }}
                    className="
                      group
                      relative
                      flex
                      min-h-[48px]
                      items-center
                      border-b
                      border-[#C2C8C0]/15
                      font-['FreeSerif']
                      text-[17px]
                      font-bold
                      text-[#424842]
                      transition-all
                      duration-300
                      hover:text-[#001809]
                    "
                  >
                    {({ isActive }) => (
                      <>
                        <span>{t(item.key)}</span>

                        {/* Mobile Underline */}

                        <span
                          className={`
                            absolute
                            bottom-0
                            h-[2px]
                            bg-[#001809]
                            transition-all
                            duration-300
                            rtl:right-0
                            ltr:left-0
                            ${
                              isActive
                                ? "w-10 opacity-100"
                                : "w-0 opacity-0 group-hover:w-8 group-hover:opacity-100"
                            }
                          `}
                        />
                      </>
                    )}
                  </NavLink>
                </div>
              ))}

              {/* =================================================
                  MOBILE SEARCH
              ================================================== */}

              <div
                className="
                  mt-4
                  flex
                  h-[42px]
                  items-center
                  rounded-full
                  border
                  border-[#C2C8C0]/30
                  bg-[#F4F3F2]
                  px-4
                "
              >
                <input
                  type="text"
                  placeholder={t("header.search")}
                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    font-['Atkinson_Hyperlegible_Next']
                    text-sm
                    outline-none
                  "
                />

                <Search
                  size={18}
                  className="text-[#727972] ltr:ml-2 rtl:mr-2"
                />
              </div>

              {/* =================================================
                  MOBILE LANGUAGE
              ================================================== */}

              <div
                className="
                  mt-3
                  border-b
                  border-[#C2C8C0]/15
                "
              >
                {/* Language Button */}

                <button
                  type="button"
                  onClick={() =>
                    setIsMobileLanguageOpen(
                      (prev) => !prev
                    )
                  }
                  className="
                    group
                    flex
                    min-h-[48px]
                    w-full
                    items-center
                    justify-between
                    px-1
                    font-['Atkinson_Hyperlegible_Next']
                    text-[16px]
                    font-bold
                    text-[#424842]
                    transition-all
                    duration-300
                    hover:px-2
                    hover:text-[#001809]
                  "
                >
                  <span className="flex items-center gap-2">
                    <Globe
                      size={18}
                      className="
                        transition-transform
                        duration-300
                        group-hover:rotate-12
                      "
                    />

                    <span>{t("header.language")}</span>
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="text-[14px] font-normal text-[#6B7280]">
                      {t("header.currentLang")}
                    </span>

                    <ChevronDown
                      size={17}
                      className={`
                        transition-transform
                        duration-300
                        ${
                          isMobileLanguageOpen
                            ? "rotate-180"
                            : ""
                        }
                      `}
                    />
                  </span>
                </button>

                {/* Mobile Language Options */}

                <AnimatePresence>
                  {isMobileLanguageOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-2 rtl:pr-3 ltr:pl-3">
                        <button
                          type="button"
                          onClick={() => handleLanguageChange("ar")}
                          className={`
                            flex
                            min-h-[42px]
                            w-full
                            items-center
                            rounded-lg
                            px-3
                            font-['FreeSerif']
                            text-[16px]
                            transition-colors
                            duration-200
                            hover:bg-[#F4F3F2]
                            active:scale-[0.98]
                            ${
                              language === "ar"
                                ? "text-[#001809] font-bold"
                                : "text-[#424842]"
                            }
                          `}
                        >
                          العربية
                        </button>

                        <button
                          type="button"
                          onClick={() => handleLanguageChange("en")}
                          className={`
                            flex
                            min-h-[42px]
                            w-full
                            items-center
                            rounded-lg
                            px-3
                            font-['FreeSerif']
                            text-[16px]
                            transition-colors
                            duration-200
                            hover:bg-[#F4F3F2]
                            active:scale-[0.98]
                            ${
                              language === "en"
                                ? "text-[#001809] font-bold"
                                : "text-[#424842] hover:text-[#001809]"
                            }
                          `}
                        >
                          English
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* =================================================
                  MOBILE ACTIONS
              ================================================== */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  pt-4
                "
              >
                {/* Mobile Donate */}

                <button
                  className="
                    flex
                    flex-1
                    items-center
                    justify-center
                    rounded-full
                    bg-[#0F2E1B]
                    px-5
                    py-3
                    font-['FreeSerif']
                    text-[16px]
                    font-bold
                    text-[#76977E]
                    transition-all
                    duration-200
                    ease-out
                    hover:-translate-y-0.5
                    hover:shadow-[0_8px_20px_rgba(15,46,27,0.20)]
                    active:scale-95
                  "
                >
                  {t("header.donate")}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}