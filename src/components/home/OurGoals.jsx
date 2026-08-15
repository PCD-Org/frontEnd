import { Globe, Rocket, Users, Accessibility, HandHeart } from 'lucide-react';
import { motion } from "motion/react";
import { Container } from "../ui/Container";
import { GoalCard } from "./GoalCard";
import { useTranslation } from "../../utils/useTranslation";

export const OurGoals = () => {
    const { t } = useTranslation();

    const goalsData = [
        {
            id: 1,
            icon: Globe,
            name: t("goals.1.name"),
            description: t("goals.1.desc"),
        },
        {
            id: 2,
            icon: Rocket,
            name: t("goals.2.name"),
            description: t("goals.2.desc"),
        },
        {
            id: 3,
            icon: Users,
            name: t("goals.3.name"),
            description: t("goals.3.desc"),
        },
        {
            id: 4,
            icon: Accessibility,
            name: t("goals.4.name"),
            description: t("goals.4.desc"),
        },
        {
            id: 5,
            icon: Globe,
            name: t("goals.5.name"),
            description: t("goals.5.desc"),
        },
        {
            id: 6,
            icon: HandHeart,
            name: t("goals.6.name"),
            description: t("goals.6.desc"),
        },
    ];

    return (
        <motion.section className="py-16 bg-surface-card mb-12">
            <Container className="flex flex-col gap-12">

                <motion.div
                    className="flex flex-col justify-center items-center gap-3 text-center max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-950">
                        {t("goals.title")}
                    </h2>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        {t("goals.subtitle")}
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={{
                      hidden: {},
                      show: { transition: { staggerChildren: 0.08 } },
                    }}
                >
                    {goalsData.map((item) => (
                        <GoalCard
                            key={item.id}
                            icon={item.icon}
                            name={item.name}
                            description={item.description}
                        />
                    ))}
                </motion.div>

            </Container>
        </motion.section>
    );
};
