"use client";

import { Users, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const SocialProof = () => {
  const stats = [
    {
      icon: <Users className="h-6 w-6" />,
      value: "50,000+",
      label: "Active users creating with AI daily",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      value: "1M+",
      label: "AI images generated this month",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      value: "100%",
      label: "Free tools, no hidden costs",
    },
  ];

  return (
    <section className="py-12 px-4 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
