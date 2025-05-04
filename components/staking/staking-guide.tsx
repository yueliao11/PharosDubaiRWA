"use client";

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { InfoIcon, Wallet, LockIcon, CoinsIcon, BarChart4 } from 'lucide-react';

export function StakingGuide() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const stakingSteps = [
    {
      title: "Connect Your Wallet",
      description: "First, connect your wallet to the DubaiFi DYT staking platform.",
      icon: <Wallet className="h-6 w-6" />,
    },
    {
      title: "Complete KYC Verification",
      description: "Verify your identity through our KYC process if you haven't already.",
      icon: <LockIcon className="h-6 w-6" />,
    },
    {
      title: "Enter Staking Amount",
      description: "Choose how many DYT tokens you want to stake and select a staking period.",
      icon: <CoinsIcon className="h-6 w-6" />,
    },
    {
      title: "Earn Staking Rewards",
      description: "Receive regular rewards based on your staked amount and chosen period.",
      icon: <BarChart4 className="h-6 w-6" />,
    },
  ];
  
  const faqItems = [
    {
      question: "What is DYT token staking?",
      answer: "DYT token staking allows you to lock your tokens in a smart contract to earn additional rewards beyond the regular rental income distribution. It's a way to maximize your returns while supporting the DYT ecosystem."
    },
    {
      question: "What APY can I expect?",
      answer: "Staking rewards start at 8.5% APY for 30-90 day staking periods, and increase to 10.5% APY for longer durations (180+ days). Enabling auto-compound can increase your effective APY by an additional 0.5%."
    },
    {
      question: "Can I unstake my tokens at any time?",
      answer: "Yes, you can unstake your tokens at any time, but to receive the full APY benefits, we recommend staying with your chosen staking period. Early unstaking doesn't incur penalties, but you might miss out on optimal returns."
    },
    {
      question: "Is KYC required for staking?",
      answer: "Yes, KYC verification is required for staking to ensure compliance with regulatory requirements. This helps maintain the security and integrity of our platform."
    },
    {
      question: "What is auto-compound?",
      answer: "Auto-compound automatically reinvests your earned rewards back into your staking position, allowing you to earn compound interest. This can significantly increase your total returns over time."
    },
  ];
  
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <InfoIcon className="h-4 w-4" />
            Staking Guide
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">How to Stake DYT Tokens</DialogTitle>
            <DialogDescription>
              Follow this guide to start earning rewards on your DYT tokens
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6">
            <div className="space-y-8">
              {/* Steps */}
              <div>
                <h3 className="text-lg font-medium mb-4">Staking Process</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {stakingSteps.map((step, index) => (
                    <div key={index} className="flex gap-4 p-4 border rounded-lg bg-background/50">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        {step.icon}
                      </div>
                      <div>
                        <h4 className="font-medium">Step {index + 1}: {step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* FAQ */}
              <div>
                <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              
              {/* Rewards calculation */}
              <div className="p-4 border rounded-lg bg-primary/5">
                <h3 className="text-lg font-medium mb-2">Rewards Calculation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your staking rewards are calculated using the following formula:
                </p>
                <div className="bg-background p-3 rounded-md font-mono text-sm">
                  Rewards = Staked Amount × APY × (Days Staked / 365)
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  For example, if you stake 1,000 DYT at 8.5% APY for 30 days, you would earn:
                  <br />
                  1,000 × 0.085 × (30 / 365) = <span className="font-medium">6.99 DYT</span>
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 