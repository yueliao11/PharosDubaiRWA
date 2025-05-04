"use client";

import { useState } from 'react';
import { useUserStore } from '@/lib/store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Steps } from '@/components/steps';
import { useTranslation } from 'react-i18next';

const steps = [
  { id: 'personal', title: 'Personal Information' },
  { id: 'identity', title: 'Identity Verification' },
  { id: 'address', title: 'Address Proof' },
  { id: 'investor', title: 'Investor Profile' },
];

export function KYCModal() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { kycStatus, setKycStatus } = useUserStore();
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setKycStatus('PENDING_REVIEW');
      toast({
        title: t('auth.kycSubmitted'),
        description: t('auth.kycReviewMessage'),
      });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>
        {t(`auth.${kycStatus === 'NOT_STARTED' ? 'startKyc' : 'continueKyc'}`)}
      </Button>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>KYC Verification</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Steps steps={steps} currentStep={currentStep} />
          {/* Step content will be implemented based on the current step */}
          <div className="mt-8 flex justify-end">
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}