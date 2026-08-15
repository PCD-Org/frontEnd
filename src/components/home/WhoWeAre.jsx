import { Leaf } from 'lucide-react'; 
import { motion } from "motion/react";
import { Container } from '../ui/Container';
import whoWeAreImg from "../../assets/79a6c5cb8ad4f873287640653a8177127eca0c9b.jpg";
import { useTranslation } from "../../utils/useTranslation";


export const WhoWeAre = () => {
  const { t } = useTranslation();

  return (
    <motion.section className="py-16 px-4 md:px-8 bg-gray-50 rounded-2xl mb-12">
        
        <Container className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">        
        <motion.div
          className="space-y-8 text-start"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          
          <div className="flex items-center gap-2 rounded-2xl p-2 bg-primary w-fit">
            <Leaf className="w-5 h-5 text-white" /> 
            <h2 className=" font-extrabold text-white tracking-tight">
              {t("whoWeAre.badge")}
            </h2>
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-950">
              {t("whoWeAre.title")} <span className="text-primary">{t("whoWeAre.titleHighlight")}</span>
            </h1>
            
            <p className="text-lg text-gray-700 leading-relaxed font-light">
              {t("whoWeAre.p1")}
            </p>

            <p className="text-lg text-gray-700 leading-relaxed font-light">
              {t("whoWeAre.p2")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-8">
            {/* بطاقة سنة التأسيس */}
            <div className="bg-surface p-6 rounded-xl border border-surface-card flex flex-col items-center flex-1 shadow-sm transition-transform duration-300 hover:scale-105">
              <span className="text-5xl font-extrabold text-primary">2023</span>
              <span className="text-xl font-semibold text-gray-900 mt-2">{t("whoWeAre.founded")}</span>
            </div>

            <div className="bg-surface p-6 rounded-xl border border-surface-card flex flex-col items-center flex-1 shadow-sm transition-transform duration-300 hover:scale-105">
              <span className="text-5xl font-extrabold text-primary">+50</span>
              <span className="text-xl font-semibold text-gray-900 mt-2">{t("whoWeAre.projects")}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className='relative'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        >
            <div className="relative group overflow-hidden rounded-3xl shadow-lg transition-all duration-300 hover:shadow-primary/30">
          <img 
            src={whoWeAreImg}
            alt="Who We Are - PCED Palestine" 
            className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

          
        </div>

        <div className='bg-primary-dark absolute w-fit p-4 -bottom-4 drop-shadow-lg rounded-2xl rtl:-right-2 ltr:-left-2'>
            <h3 className='text-white'>{t("whoWeAre.motto")}</h3>
          </div>
        </motion.div>
      </Container>
    </motion.section>
  );
};
