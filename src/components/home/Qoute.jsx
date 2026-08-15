import { Quote } from "lucide-react"
import { motion } from "motion/react";
import { useTranslation } from "../../utils/useTranslation";

export const Qoute = () => {
    const { t } = useTranslation();

    return (
        <motion.section className="py-16 px-4 -mt-5 md:px-8 bg-primary-dark  mb-12">
            <motion.div
                className="flex flex-col gap-3 justify-center items-center "
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <Quote className="w-10 h-10 text-primary" />
                <h2 className="text-white font-bold text-3xl text-center">{t("quote.text")}</h2>

                <p className="text-primary ">{t("quote.label")}</p>
            </motion.div>


        </motion.section>
    )
}
