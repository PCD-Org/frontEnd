import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {Search,Globe,ChevronDown,Menu,X,} from "lucide-react";

const navItems = [
    {
    label: "الرئيسية",
    path: "/",
  },
  {
    label: "من نحن",
    path: "/about",
  },
  
  {
    label: "الأنشطة",
    path: "/activities",
  },
  {
    label: "الأبحاث والدراسات",
    path: "/research",
  },
  {
    label: "الأخبار",
    path: "/news",
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileLanguageOpen, setIsMobileLanguageOpen] =
    useState(false);

  return (
    <header
      dir="rtl"
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
              {navItems.map((item) => (
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

                      <motion.span
                        whileHover={{
                          y: -1,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                        className={`
                          transition-colors
                          duration-300
                          ${
                            isActive
                              ? "text-[#001809]"
                              : "group-hover:text-[#001809]"
                          }
                        `}
                      >
                        {item.label}
                      </motion.span>

                      {/* Underline */}

                      <motion.span
                        className="
                          absolute
                          bottom-0
                          left-0
                          right-0
                          h-[2px]
                          origin-center
                          bg-[#001809]
                        "
                        initial={false}
                        animate={{
                          scaleX: isActive ? 1 : 0,
                          opacity: isActive ? 1 : 0,
                        }}
                        whileHover={{
                          scaleX: 1,
                          opacity: 1,
                        }}
                        transition={{
                          duration: 0.25,
                          ease: "easeOut",
                        }}
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

          <motion.button
            type="button"
            whileHover={{
              scale: 1.04,
              y: -2,
            }}
            whileTap={{
              scale: 0.96,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17,
            }}
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
              transition-shadow
              duration-300
              hover:shadow-[0_8px_20px_rgba(15,46,27,0.20)]
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
              تبرع الآن
            </span>
          </motion.button>

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
              placeholder="بحث..."
              className="
                min-w-0
                flex-1
                bg-transparent
                px-1
                text-right
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
                mr-2
                shrink-0
                text-[#727972]
                transition-all
                duration-300
                group-focus-within:scale-110
                group-focus-within:text-[#0F2E1B]
              "
            />
          </div>

          {/* =====================================================
              DESKTOP LANGUAGE
          ====================================================== */}

          <div className="relative hidden lg:block">
            <motion.button
              type="button"
              whileHover={{
                y: -1,
              }}
              whileTap={{
                scale: 0.97,
              }}
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
                transition-colors
                duration-200
                hover:bg-black/5
                hover:text-[#001809]
              "
            >
              <span>العربية</span>

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
            </motion.button>

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
                    left-0
                    top-[40px]
                    min-w-[120px]
                    origin-top-left
                    overflow-hidden
                    rounded-xl
                    border
                    border-[#C2C8C0]/30
                    bg-[#FAF9F8]
                    shadow-[0_10px_30px_rgba(0,0,0,0.10)]
                  "
                >
                  <button
                    type="button"
                    className="
                      block
                      w-full
                      px-4
                      py-2.5
                      text-right
                      font-['FreeSerif']
                      text-sm
                      text-[#424842]
                      transition-all
                      duration-200
                      hover:bg-[#F4F3F2]
                      hover:pr-5
                      hover:text-[#001809]
                    "
                  >
                    العربية
                  </button>

                  <button
                    type="button"
                    className="
                      block
                      w-full
                      px-4
                      py-2.5
                      text-right
                      font-['FreeSerif']
                      text-sm
                      text-[#424842]
                      transition-all
                      duration-200
                      hover:bg-[#F4F3F2]
                      hover:pr-5
                      hover:text-[#001809]
                    "
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

          <motion.button
            type="button"
            whileTap={{
              scale: 0.88,
            }}
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
              lg:hidden
            "
            aria-label="فتح القائمة"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{
                    rotate: -90,
                    opacity: 0,
                  }}
                  animate={{
                    rotate: 0,
                    opacity: 1,
                  }}
                  exit={{
                    rotate: 90,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{
                    rotate: 90,
                    opacity: 0,
                  }}
                  animate={{
                    rotate: 0,
                    opacity: 1,
                  }}
                  exit={{
                    rotate: -90,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
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

              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.25,
                  }}
                >
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
                      hover:pr-2
                      hover:text-[#001809]
                    "
                  >
                    {({ isActive }) => (
                      <>
                        <span>{item.label}</span>

                        {/* Mobile Underline */}

                        <span
                          className={`
                            absolute
                            bottom-0
                            right-0
                            h-[2px]
                            bg-[#001809]
                            transition-all
                            duration-300
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
                </motion.div>
              ))}

              {/* =================================================
                  MOBILE SEARCH
              ================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.3,
                }}
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
                  placeholder="بحث..."
                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    text-right
                    font-['Atkinson_Hyperlegible_Next']
                    text-sm
                    outline-none
                  "
                />

                <Search
                  size={18}
                  className="mr-2 text-[#727972]"
                />
              </motion.div>

              {/* =================================================
                  MOBILE LANGUAGE
              ================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.25,
                  duration: 0.3,
                }}
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

                    <span>اللغة</span>
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="text-[14px] font-normal text-[#6B7280]">
                      العربية
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
                      <div className="pb-2 pr-3">
                        <motion.button
                          type="button"
                          whileTap={{
                            scale: 0.98,
                          }}
                          className="
                            flex
                            min-h-[42px]
                            w-full
                            items-center
                            rounded-lg
                            px-3
                            text-right
                            font-['FreeSerif']
                            text-[16px]
                            text-[#001809]
                            transition-colors
                            duration-200
                            hover:bg-[#F4F3F2]
                          "
                        >
                          العربية
                        </motion.button>

                        <motion.button
                          type="button"
                          whileTap={{
                            scale: 0.98,
                          }}
                          className="
                            flex
                            min-h-[42px]
                            w-full
                            items-center
                            rounded-lg
                            px-3
                            text-right
                            font-['FreeSerif']
                            text-[16px]
                            text-[#424842]
                            transition-colors
                            duration-200
                            hover:bg-[#F4F3F2]
                            hover:text-[#001809]
                          "
                        >
                          English
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* =================================================
                  MOBILE ACTIONS
              ================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.3,
                  duration: 0.3,
                }}
                className="
                  flex
                  items-center
                  gap-3
                  pt-4
                "
              >
                {/* Mobile Donate */}

                <motion.button
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
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
                    transition-shadow
                    duration-300
                    hover:shadow-[0_8px_20px_rgba(15,46,27,0.20)]
                  "
                >
                  تبرع الآن
                </motion.button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}