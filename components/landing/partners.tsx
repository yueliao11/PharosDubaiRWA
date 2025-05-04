"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Shield, Award, Landmark } from "lucide-react";

export function Partners() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const partners = [
    {
      name: "Dubai Land Department",
      description: "Official real estate regulatory authority",
      icon: <Building2 className="h-8 w-8" />,
    },
    {
      name: "DFSA",
      description: "Dubai Financial Services Authority",
      icon: <Shield className="h-8 w-8" />,
    },
    {
      name: "DIFC",
      description: "Dubai International Financial Centre",
      icon: <Landmark className="h-8 w-8" />,
    },
    {
      name: "Smart Dubai",
      description: "Government blockchain initiative",
      icon: <Award className="h-8 w-8" />,
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
            Trusted by Leading <span className="text-primary">Partners</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We work with regulatory authorities and industry leaders to ensure
            compliance and security in all our operations.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {partners.map((partner, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border border-border/50 hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary mb-4">
                    {partner.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{partner.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {partner.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}