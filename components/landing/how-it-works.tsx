"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Wallet, Building, LineChart, Coins } from "lucide-react";

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const steps = [
    {
      title: "Create an Account",
      description: "Sign up and complete our streamlined KYC process to verify your identity.",
      icon: <Wallet className="h-8 w-8" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Browse Properties",
      description: "Explore curated premium Dubai real estate with detailed analytics and projections.",
      icon: <Building className="h-8 w-8" />,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Invest Securely",
      description: "Purchase tokens representing fractional ownership in properties of your choice.",
      icon: <LineChart className="h-8 w-8" />,
      color: "from-amber-500 to-amber-600",
    },
    {
      title: "Earn Passive Income",
      description: "Receive regular rental income distributions and benefit from property appreciation.",
      icon: <Coins className="h-8 w-8" />,
      color: "from-rose-500 to-rose-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform makes investing in Dubai real estate simple, secure, and accessible through blockchain technology.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center"
            >
              <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${step.color} text-white mb-6`}>
                {step.icon}
              </div>
              <div className="relative pb-12 mb-6">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 text-5xl font-bold text-muted/20">
                  {index + 1}
                </span>
                {index < steps.length - 1 && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px w-24 bg-border" />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};