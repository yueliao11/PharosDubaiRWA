"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SharedNavbar } from '@/components/shared-navbar';

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "What is RWA tokenization?",
        answer: "RWA (Real World Asset) tokenization is the process of converting ownership rights of physical assets, like real estate, into digital tokens on a blockchain. Each token represents fractional ownership of the underlying property, allowing for smaller investment amounts and increased liquidity."
      },
      {
        question: "How do I start investing?",
        answer: "To start investing, first connect your wallet and complete our KYC verification process. Once approved, you can browse available properties and invest with as little as $500. Our platform guides you through each step of the investment process."
      },
      {
        question: "What documents do I need for KYC?",
        answer: "For KYC verification, you'll need: 1) A valid government-issued photo ID (passport or national ID), 2) Proof of address (utility bill or bank statement less than 3 months old), 3) A recent selfie for verification purposes."
      }
    ]
  },
  {
    category: "Investment Process",
    questions: [
      {
        question: "What is the minimum investment amount?",
        answer: "The minimum investment amount is $500 per property. This low entry point allows investors to start small and gradually build their portfolio while maintaining diversification across multiple properties."
      },
      {
        question: "How are returns distributed?",
        answer: "Rental income is collected monthly and distributed to token holders proportional to their ownership. Distributions are made in USDC directly to your connected wallet. Capital appreciation can be realized by selling tokens on our secondary market."
      },
      {
        question: "Can I sell my tokens before the investment term ends?",
        answer: "Yes, you can sell your tokens on our secondary market at any time. The platform provides a secure marketplace where you can list your tokens and set your desired price. Liquidity may vary based on market conditions."
      }
    ]
  },
  {
    category: "Property Management",
    questions: [
      {
        question: "Who manages the properties?",
        answer: "We partner with professional property management companies who handle tenant screening, maintenance, rent collection, and other operational aspects. All managers are carefully vetted and must meet our strict performance standards."
      },
      {
        question: "How are maintenance costs handled?",
        answer: "A portion of the rental income is set aside in a maintenance reserve fund to cover regular maintenance and unexpected repairs. This ensures the property's value is preserved and tenants receive quality service."
      },
      {
        question: "What happens if a property remains vacant?",
        answer: "Our property managers actively market vacant units to minimize vacancy periods. Additionally, we maintain a vacancy reserve fund to ensure consistent distributions even during temporary vacant periods."
      }
    ]
  },
  {
    category: "Legal & Security",
    questions: [
      {
        question: "How is my investment protected?",
        answer: "Your investment is secured by the underlying real estate asset. Each property is held in a separate legal entity, and ownership rights are recorded both on-chain and in traditional legal documentation. We also maintain comprehensive insurance coverage."
      },
      {
        question: "What regulations govern the platform?",
        answer: "Our platform operates under Dubai's Virtual Assets Regulatory Authority (VARA) guidelines and complies with DFSA regulations. All properties are fully compliant with UAE real estate laws and regulations."
      },
      {
        question: "How secure are the smart contracts?",
        answer: "All smart contracts undergo rigorous security audits by leading blockchain security firms. We implement multiple security measures, including multi-signature requirements for critical operations and regular security updates."
      }
    ]
  },
  {
    category: "Technical Support",
    questions: [
      {
        question: "What wallets are supported?",
        answer: "We support major Web3 wallets including MetaMask, WalletConnect, and Rainbow. For the best experience, we recommend using MetaMask or Rainbow wallet."
      },
      {
        question: "How do I connect my wallet?",
        answer: "Click the 'Connect Wallet' button in the top right corner of the page, select your preferred wallet, and follow the prompts to complete the connection process."
      },
      {
        question: "What should I do if I encounter technical issues?",
        answer: "If you experience technical issues, first try refreshing the page and ensuring your wallet is properly connected. If problems persist, contact our support team through the help center or email support@dubairwa.com."
      }
    ]
  }
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <>
      <SharedNavbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our real estate tokenization platform
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-8">
            {filteredFAQs.map((category, index) => (
              <div key={index}>
                <h2 className="text-2xl font-serif font-semibold mb-4">
                  {category.category}
                </h2>
                <Card>
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}