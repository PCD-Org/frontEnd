import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../../utils/useTranslation";

export const Newsletter = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      console.log("Subscribed email:", email);
      setEmail("");
    }
  };

  return (
    <section className="w-full py-12 px-4 md:px-8 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-[#0D3B2E] text-white rounded-2xl md:rounded-3xl p-6 sm:p-10 md:p-12 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          {/* النصوص والعنوان (بداية الصف في الاتجاهين) */}
          <div className="text-center rtl:lg:text-right ltr:lg:text-left space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              {t("newsletter.title")}
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base font-light">
              {t("newsletter.subtitle")}
            </p>
          </div>

          {/* حقل الإدخال وزر الاشتراك (نهاية الصف) */}
          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("newsletter.placeholder")}
              required
              className="w-full sm:w-80 md:w-96 px-5 py-3.5 rounded-full bg-white text-gray-800 placeholder-gray-400 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#8C6239] transition-all rtl:text-right ltr:text-left"
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full sm:w-auto bg-[#8C6239] hover:bg-[#78522e] text-white font-medium px-8 py-3.5 rounded-full transition-colors duration-200 text-sm md:text-base whitespace-nowrap cursor-pointer shadow-sm"
            >
              {t("newsletter.button")}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;