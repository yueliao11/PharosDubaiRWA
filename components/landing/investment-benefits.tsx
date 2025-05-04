"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Percent, Shield, Globe, CoinsIcon, 
  TrendingUp, Banknote, BarChart, Link2
} from "lucide-react";

export const InvestmentBenefits = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const benefits = [
    {
      title: "High Rental Yields",
      description: "Dubai consistently offers 6-10% rental yields, significantly higher than global averages.",
      icon: <Percent className="h-10 w-10 p-2" />,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Asset-Backed Security",
      description: "Every token is backed by premium real estate in prime Dubai locations.",
      icon: <Shield className="h-10 w-10 p-2" />,
      color: "bg-emerald-500/10 text-emerald-500",
    },
    {
      title: "Global Accessibility",
      description: "Invest from anywhere in the world with no geographical restrictions.",
      icon: <Globe className="h-10 w-10 p-2" />,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "Low Minimum Investment",
      description: "Start with as little as $500, compared to traditional real estate investments.",
      icon: <CoinsIcon className="h-10 w-10 p-2" />,
      color: "bg-amber-500/10 text-amber-500",
    },
    {
      title: "Capital Appreciation",
      description: "Benefit from Dubai's strong property market growth and value appreciation.",
      icon: <TrendingUp className="h-10 w-10 p-2" />,
      color: "bg-red-500/10 text-red-500",
    },
    {
      title: "Regular Income",
      description: "Receive rental income distributions on a monthly or quarterly basis.",
      icon: <Banknote className="h-10 w-10 p-2" />,
      color: "bg-cyan-500/10 text-cyan-500",
    },
    {
      title: "Portfolio Diversification",
      description: "Add real estate to your investment portfolio with minimal capital.",
      icon: <BarChart className="h-10 w-10 p-2" />,
      color: "bg-indigo-500/10 text-indigo-500",
    },
    {
      title: "Liquidity Options",
      description: "Trade your tokens on our secondary market or through early redemption.",
      icon: <Link2 className="h-10 w-10 p-2" />,
      color: "bg-orange-500/10 text-orange-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Benefits of <span className="text-primary">RWA Investment</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover why tokenized real estate in Dubai offers unique advantages for modern investors.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-md">
                <CardContent className="p-6 flex flex-col items-start">
                  <div className={`rounded-lg ${benefit.color} mb-4`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};