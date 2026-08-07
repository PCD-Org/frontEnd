import { Globe, Rocket, Users, Accessibility, HandHeart } from 'lucide-react';
import { motion } from "motion/react";
import { Container } from "../ui/Container";
import { GoalCard } from "./GoalCard";

const goalsData = [
    {
        id: 1,
        icon: Globe,
        name: "تعزيز الوعي البيئي والمناخي",
        description: "نشر ثقافة الحفاظ على البيئة ومواجهة التحديات المناخية عبر برامج توعوية شاملة تستهدف مختلف فئات المجتمع",
    },
    {
        id: 2,
        icon: Rocket,
        name: "تطوير برامج مستدامة",
        description: "العمل على مبادرات عملية تحسن جودة البيئة وتدعم الاستدامة، بالشراكة مع مؤسسات حكومية وأهلية.",
    },
    {
        id: 3,
        icon: Users,
        name: "التنمية المجتمعية",
        description: "تنفيذ مشاريع تنموية تُراعي الأبعاد البيئية والاقتصادية والاجتماعية لضمان التوازن والعدالة.",
    },
    {
        id: 4,
        icon: Accessibility,
        name: "تمكين الشباب",
        description: "تنمية مهارات الجيل الجديد وتزويده بالإمكانات اللازمة ليكون جزءاً فاعلاً في عمليات التنمية والبناء.",
    },
    {
        id: 5,
        icon: Globe,
        name: "التعاون الدولي",
        description: "إقامة علاقات وشراكات استراتيجية مع منظمات دولية بيئية وتنموية، وتبادل الخبرات العالمية.",
    },
    {
        id: 6,
        icon: HandHeart,
        name: "دعم المشاركة المجتمعية",
        description: "إشراك المجتمع المدني والفئات الهشة في جهود الحماية البيئية لضمان الأثر الإيجابي طويل المدى.",
    },
];

export const OurGoals = () => {
    return (
        <motion.section className="py-16 bg-surface-card mb-12" dir="rtl">
            <Container className="flex flex-col gap-12">

                <motion.div
                    className="flex flex-col justify-center items-center gap-3 text-center max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-950">
                        أهدافنا الاستراتيجية
                    </h2>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        نعمل وفق رؤية واضحة تهدف إلى النهوض بالواقع البيئي والتنموي في المجتمع الفلسطيني عبر محاور عمل متكاملة
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {goalsData.map((item, index) => (
                        <GoalCard
                            key={item.id}
                            icon={item.icon}
                            name={item.name}
                            description={item.description}
                            index={index}
                        />
                    ))}
                </div>

            </Container>
        </motion.section>
    );
};
