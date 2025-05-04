"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Building, LineChart, Wallet } from "lucide-react";
import { motion } from "framer-motion";

export const LandingHero = () => {
  return (
    <section className="relative pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg"
          alt="Dubai Skyline"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 dark:from-black/90 dark:via-black/80 dark:to-black/70" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-32 sm:py-40 md:py-48 lg:py-52">
        <div className="flex flex-col items-start max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
              <span className="block">Invest in Premium</span>
              <span className="block">Dubai Real Estate</span>
              <span className="block">
                Through <span className="text-primary-foreground bg-primary px-2 rounded">Tokenization</span>
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl"
          >
            Access exclusive Dubai property investments with as little as $500. 
            Earn passive rental income and benefit from property appreciation 
            through blockchain-powered fractional ownership.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" asChild>
              <Link href="/register">
                Start Investing <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white" asChild>
              <Link href="/properties">Browse Properties</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-8 mt-16"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-full">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-white/90 font-medium">40+ Properties</p>
                <p className="text-white/60 text-sm">Premium locations</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-full">
                <LineChart className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-white/90 font-medium">8-12% ROI</p>
                <p className="text-white/60 text-sm">Annual returns</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-full">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-white/90 font-medium">5,000+ Investors</p>
                <p className="text-white/60 text-sm">Global community</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};