import { Link } from "react-router-dom";
import { motion } from "motion/react";
import heroBackground from "../../assets/79a6c5cb8ad4f873287640653a8177127eca0c9b.jpg";

export const HeroSection = () => {
  return (
    <motion.header 
      className="relative w-full h-[85vh] min-h-[500px] bg-cover bg-center flex items-center justify-start px-6 md:px-16"
      style={{
        backgroundImage: `url(${heroBackground})`
      }}
    >
      <div className="absolute inset-0 bg-black/20" />

      <motion.div
        className="relative z-10 w-full max-w-xl p-8 md:p-12 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 text-white text-right space-y-6 mr-0 md:mr-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide leading-tight">
          يد تبني، يد تعمر
        </h1>

        <p className="text-lg md:text-xl text-primary font-medium leading-relaxed">
          الهيئة الأهلية الفلسطينية للبيئة والتنمية والتطوير <br className="hidden md:block" />
          <span className="text-base font-normal text-gray-200">(PCED)</span>
        </p>

        <div className="flex flex-wrap items-center justify-start gap-4 pt-4">
          <Link
            to="#projects"
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-full transition-all duration-500 shadow-md text-base"
          >
            تعرف على مشاريعنا
          </Link>

          <Link
            to="#about"
            className="px-8 py-3 bg-transparent hover:bg-primary hover:border-transparent text-white font-semibold rounded-full border-2 border-white transition-all duration-300 text-base"
          >
            من نحن
          </Link>
        </div>

      </motion.div>
    </motion.header>
  );
};
