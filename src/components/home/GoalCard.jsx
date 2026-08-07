
import { motion } from "motion/react";

export const GoalCard = ({ icon: Icon, name, description, index }) => {
  return (
    <motion.div
      className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start text-right transition-all duration-300 hover:shadow-md hover:-translate-y-2"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }}
    >
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
        {Icon && <Icon className="w-6 h-6 stroke-[1.75]" />}
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-snug">
        {name}
      </h3>

      <p className="text-gray-600 text-base leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};
