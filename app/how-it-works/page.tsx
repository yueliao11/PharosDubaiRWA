"use client";

import { HowItWorks } from "@/components/landing/how-it-works";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Wallet, Building2, LineChart } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { SharedNavbar } from '@/components/shared-navbar';

export default function HowItWorksPage() {
  const { t } = useTranslation();

  const faqs = [
    {
      question: "What is RWA tokenization?",
      answer: "RWA (Real World Asset) tokenization is the process of converting ownership rights of a physical asset, like real estate, into digital tokens on a blockchain. Each token represents a fractional ownership of the underlying property."
    },
    {
      question: "How do I start investing?",
      answer: "To start investing, first connect your wallet and complete the KYC verification process. Once approved, you can browse available properties and invest with as little as $500."
    },
    {
      question: "How are returns distributed?",
      answer: "Rental income is collected monthly and distributed to token holders proportional to their ownership. Distributions are made in USDC directly to your connected wallet."
    },
    {
      question: "What are the risks?",
      answer: "Like any investment, real estate tokenization carries risks including market volatility, regulatory changes, and property-specific risks. We recommend reading our risk disclosure document carefully."
    },
    {
      question: "How is the property managed?",
      answer: "We partner with professional property management companies who handle tenant screening, maintenance, rent collection, and other operational aspects."
    }
  ];

  const benefits = [
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Regulatory Compliance",
      description: "All properties are fully compliant with UAE and international regulations, with proper licensing and documentation."
    },
    {
      icon: <Wallet className="h-12 w-12 text-primary" />,
      title: "Secure Transactions",
      description: "Smart contracts ensure transparent and secure transactions, with multi-signature requirements for enhanced security."
    },
    {
      icon: <Building2 className="h-12 w-12 text-primary" />,
      title: "Premium Properties",
      description: "Carefully selected properties in prime Dubai locations with strong rental demand and appreciation potential."
    },
    {
      icon: <LineChart className="h-12 w-12 text-primary" />,
      title: "Performance Tracking",
      description: "Real-time monitoring of your investments, including rental yields, property value, and token performance."
    }
  ];

  return (
    <>
      <SharedNavbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              How Dubai RWA Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform makes investing in Dubai real estate simple, secure, and accessible
              through blockchain technology and regulatory-compliant tokenization.
            </p>
          </div>

          <HowItWorks />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-20">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="my-20">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center mt-20">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Ready to Start Investing?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of investors already benefiting from Dubai's thriving real estate market.
            </p>
            <Button size="lg" asChild>
              <Link href="/properties">
                Browse Properties <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}