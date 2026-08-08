import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-[#002417] text-white">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 sm:px-8 lg:px-20 lg:py-20">
        {/* Main Footer Content */}
        <div
          className="
            grid
            grid-cols-1
            gap-12
            text-center
            sm:grid-cols-2
            sm:text-right
            lg:grid-cols-4
            lg:gap-10
          "
        >
          {/* About / Logo */}
          <div className="flex flex-col items-center sm:items-start lg:items-start">
            <Link
              to="/"
              className="
                mb-5
                font-['Noto_Serif']
                text-3xl
                font-bold
                tracking-[-0.6px]
                text-[#F8F9F8]
                transition-all
                duration-300
                hover:opacity-80
              "
            >
              PCED
            </Link>

            <p
              dir="rtl"
              className="
                max-w-[280px]
                font-['Atkinson_Hyperlegible_Next']
                text-sm
                leading-7
                text-[#76977E]
              "
            >
              الهيئة الأهلية الفلسطينية للبيئة والتنمية والتطوير (PCED)
            </p>

            {/* Social / Contact Icons */}
            <div className="mt-5 flex items-center gap-4">
              {/* Email */}
              <a
                href="mailto:admin@pced.io"
                aria-label="Email"
                className="
                  text-[#76977E]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:text-white
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>

              {/* Share */}
              <button
                type="button"
                aria-label="Share"
                className="
                  text-[#76977E]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:text-white
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                  <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                </svg>
              </button>

              {/* QR */}
              <button
                type="button"
                aria-label="QR Code"
                className="
                  text-[#76977E]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:text-white
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="5" height="5" x="3" y="3" rx="1" />
                  <rect width="5" height="5" x="16" y="3" rx="1" />
                  <rect width="5" height="5" x="3" y="16" rx="1" />
                  <path d="M16 16h2v2h-2z" />
                  <path d="M21 16v5h-5" />
                  <path d="M21 12h-3" />
                  <path d="M12 3v3" />
                  <path d="M12 16v5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div dir="rtl">
            <h3
              className="
                mb-5
                font-['Atkinson_Hyperlegible_Next']
                text-base
                font-bold
                text-[#F8F9F8]
              "
            >
              روابط سريعة
            </h3>

            <nav className="flex flex-col gap-3">
              <Link
                to="/about"
                className="
                  font-['Atkinson_Hyperlegible_Next']
                  text-sm
                  text-[#76977E]
                  transition-all
                  duration-300
                  hover:translate-x-[-3px]
                  hover:text-white
                "
              >
                من نحن
              </Link>

              <Link
                to="/activities"
                className="
                  font-['Atkinson_Hyperlegible_Next']
                  text-sm
                  text-[#76977E]
                  transition-all
                  duration-300
                  hover:translate-x-[-3px]
                  hover:text-white
                "
              >
                مشاريعنا
              </Link>

              <Link
                to="/research"
                className="
                  font-['Atkinson_Hyperlegible_Next']
                  text-sm
                  text-[#76977E]
                  transition-all
                  duration-300
                  hover:translate-x-[-3px]
                  hover:text-white
                "
              >
                الأبحاث والدراسات
              </Link>

              <Link
                to="/contact"
                className="
                  font-['Atkinson_Hyperlegible_Next']
                  text-sm
                  text-[#76977E]
                  transition-all
                  duration-300
                  hover:translate-x-[-3px]
                  hover:text-white
                "
              >
                اتصل بنا
              </Link>
            </nav>
          </div>

          {/* Programs */}
          <div dir="rtl">
            <h3
              className="
                mb-5
                font-['Atkinson_Hyperlegible_Next']
                text-base
                font-bold
                text-[#F8F9F8]
              "
            >
              البرامج
            </h3>

            <nav className="flex flex-col gap-3">
              <Link
                to="/activities"
                className="
                  font-['Atkinson_Hyperlegible_Next']
                  text-sm
                  text-[#76977E]
                  transition-all
                  duration-300
                  hover:translate-x-[-3px]
                  hover:text-white
                "
              >
                توعية بيئية
              </Link>

              <Link
                to="/activities"
                className="
                  font-['Atkinson_Hyperlegible_Next']
                  text-sm
                  text-[#76977E]
                  transition-all
                  duration-300
                  hover:translate-x-[-3px]
                  hover:text-white
                "
              >
                دعم مجتمعي
              </Link>

              <Link
                to="/activities"
                className="
                  font-['Atkinson_Hyperlegible_Next']
                  text-sm
                  text-[#76977E]
                  transition-all
                  duration-300
                  hover:translate-x-[-3px]
                  hover:text-white
                "
              >
                تمكين الشباب
              </Link>

              <Link
                to="/activities"
                className="
                  font-['Atkinson_Hyperlegible_Next']
                  text-sm
                  text-[#76977E]
                  transition-all
                  duration-300
                  hover:translate-x-[-3px]
                  hover:text-white
                "
              >
                مشاريع إغاثية
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div dir="rtl">
            <h3
              className="
                mb-5
                font-['Atkinson_Hyperlegible_Next']
                text-base
                font-bold
                text-[#F8F9F8]
              "
            >
              تواصل معنا
            </h3>

            <div className="flex flex-col gap-4">
              {/* Email */}
              <a
                href="mailto:admin@pced.io"
                className="
                  flex
                  items-center
                  justify-center
                  gap-1
                  font-['Atkinson_Hyperlegible_Next']
                  text-sm
                  text-[#76977E]
                  transition-all
                  duration-300
                  hover:text-white
                  sm:justify-start
                "
              >
                <span>admin@pced.io</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>

              {/* Phone */}
              <a
                href="tel:+970598880877"
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  font-['Atkinson_Hyperlegible_Next']
                  text-sm
                  text-[#76977E]
                  transition-all
                  duration-300
                  hover:text-white
                  sm:justify-start
                "
              >
                <span>+970 598 880 877</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>

              {/* Location */}
              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  font-['Atkinson_Hyperlegible_Next']
                  text-sm
                  text-[#76977E]
                  sm:justify-start
                "
              >
                <span>Palestine - Gaza - Alremal</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px w-full bg-[#76977E]/15 lg:my-14" />

        {/* Copyright */}
        <div
          className="
            text-center
            font-['Atkinson_Hyperlegible_Next']
            text-xs
            leading-6
            text-[#76977E]
          "
        >
          © 2024 Palestinian Organization for Environment & Development.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;