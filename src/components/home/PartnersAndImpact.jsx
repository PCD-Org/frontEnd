import { useEffect, useRef } from "react";
import { Leaf, GraduationCap, Handshake } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Container } from "../ui/Container";
import { useTranslation } from "../../utils/useTranslation";

// --- مكون العداد المتحرك للأرقام ---
const AnimatedNumber = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 50,
    damping: 15,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, numericValue, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString("en-US") + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

// --- المكون الرئيسي ---
export const PartnersAndImpact = () => {
  const { t } = useTranslation();

  const partners = [
    { name: "Partner A" },
    { name: "Partner B" },
    { name: "Partner C" },
    { name: "Partner D" },
    { name: "Partner E" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <motion.section className="py-16 px-4 md:px-8 bg-gray-50 rounded-2xl mb-12">
      <Container className="space-y-12">
        
        {/* --- قسم شركاؤنا في النجاح --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl font-extrabold text-gray-950 tracking-tight">
            {t("partnersAndImpact.title")}
          </h2>
          
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-surface text-gray-500 font-semibold px-6 py-4 rounded-xl text-sm min-w-[120px] text-center border border-surface-card shadow-sm"
              >
                {partner.name}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- قسم الأثر والإحصائيات --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-5"
        >
          
          {/* الكارت الأيمن: النص الرئيسي */}
          <motion.div 
            variants={cardVariants}
            className="md:col-span-6 bg-primary text-white p-8 rounded-3xl flex flex-col justify-center space-y-3 shadow-md"
          >
            <h3 className="text-2xl md:text-3xl font-bold leading-snug">
              {t("partnersAndImpact.impactTitle")}
            </h3>
            <p className="text-emerald-100/90 text-sm md:text-base leading-relaxed font-light">
              {t("partnersAndImpact.impactDesc")}
            </p>
          </motion.div>

          {/* الكارت الأيسر العلوي: الإحصائيات (12k+ / 85%) */}
          <motion.div 
            variants={cardVariants}
            className="md:col-span-6 bg-surface border border-surface-card p-8 rounded-3xl flex items-center justify-around shadow-sm"
          >
            <div className="text-center space-y-1">
              <span className="text-3xl md:text-4xl font-extrabold text-primary block">
                <AnimatedNumber value="12" suffix="k+" />
              </span>
              <span className="text-gray-600 text-xs md:text-sm font-medium">
                {t("partnersAndImpact.beneficiaries")}
              </span>
            </div>

            <div className="h-12 w-[1px] bg-gray-200" />

            <div className="text-center space-y-1">
              <span className="text-3xl md:text-4xl font-extrabold text-primary block">
                <AnimatedNumber value="85" suffix="%" />
              </span>
              <span className="text-gray-600 text-xs md:text-sm font-medium">
                {t("partnersAndImpact.satisfaction")}
              </span>
            </div>
          </motion.div>

          {/* الكارت السفلي الأول: الأشجار */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="md:col-span-5 bg-[#E2EFE7] p-6 rounded-3xl flex flex-col items-center justify-center text-center space-y-2 border border-emerald-100"
          >
            <Leaf className="w-6 h-6 text-primary mb-1" />
            <span className="text-2xl font-extrabold text-primary">
              <AnimatedNumber value="5000" suffix="+" />
            </span>
            <span className="text-gray-700 text-xs md:text-sm font-medium">
              {t("partnersAndImpact.trees")}
            </span>
          </motion.div>

          {/* الكارت السفلي الثاني: الورش */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="md:col-span-4 bg-[#EBEBE8] p-6 rounded-3xl flex flex-col items-center justify-center text-center space-y-2 border border-gray-200"
          >
            <GraduationCap className="w-6 h-6 text-gray-800 mb-1" />
            <span className="text-2xl font-extrabold text-gray-900">
              <AnimatedNumber value="120" suffix="+" />
            </span>
            <span className="text-gray-700 text-xs md:text-sm font-medium">
              {t("partnersAndImpact.workshops")}
            </span>
          </motion.div>

          {/* الكارت السفلي الثالث: الشراكات */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="md:col-span-3 bg-primary-dark text-white p-6 rounded-3xl flex flex-col items-center justify-center text-center space-y-2 shadow-sm"
          >
            <Handshake className="w-6 h-6 text-white mb-1" />
            <span className="text-2xl font-extrabold">
              <AnimatedNumber value="15" suffix="+" />
            </span>
            <span className="text-emerald-100/80 text-xs md:text-sm font-medium">
              {t("partnersAndImpact.partnerships")}
            </span>
          </motion.div>

        </motion.div>

      </Container>
    </motion.section>
  );
};