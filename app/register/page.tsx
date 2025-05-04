"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from "wagmi";
import { KYCModal } from "@/components/kyc/kyc-modal";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Steps } from "@/components/steps";
import { useToast } from "@/hooks/use-toast";
import { LandingNavbar } from "@/components/landing/navbar";
import { LandingFooter } from "@/components/landing/footer";
import { ArrowRight, Wallet, LockKeyhole, Check, ExternalLink } from "lucide-react";

const registrationSteps = [
  { id: "connect", title: "Connect Wallet" },
  { id: "register", title: "Register" },
  { id: "kyc", title: "KYC Verification" },
  { id: "invest", title: "Start Investing" },
];

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { address, isConnected } = useAccount();
  const { kycStatus } = useUserStore();
  
  const [activeTab, setActiveTab] = useState("individual");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(isConnected ? 1 : 0);
  
  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreed) {
      toast({
        title: "Agreement Required",
        description: "You must agree to the terms and privacy policy to continue",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would call an API to register the user
    // For demo purposes, we'll just simulate success
    toast({
      title: "Registration Successful",
      description: "Your account has been created successfully",
    });
    
    setRegistrationStep(2); // Move to KYC step
  };
  
  const proceedToInvesting = () => {
    router.push("/properties");
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LandingNavbar />
      <main className="flex-1 container max-w-6xl mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-center">
            Join Dubai RWA Platform
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-10">
            Start your journey to investing in premium Dubai real estate through blockchain technology
          </p>
          
          <div className="mb-10">
            <Steps steps={registrationSteps} currentStep={registrationStep} />
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {registrationStep === 0 && "Connect Your Wallet"}
                {registrationStep === 1 && "Create Your Account"}
                {registrationStep === 2 && "Complete KYC Verification"}
                {registrationStep === 3 && "Ready to Invest"}
              </CardTitle>
              <CardDescription>
                {registrationStep === 0 && "First, connect your wallet to continue"}
                {registrationStep === 1 && "Please provide your information to register"}
                {registrationStep === 2 && "KYC verification is required before investing"}
                {registrationStep === 3 && "You're all set to start investing in premium properties"}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {registrationStep === 0 && (
                <div className="flex flex-col items-center p-6">
                  <Wallet className="h-16 w-16 text-muted-foreground mb-6" />
                  <p className="text-center mb-6">
                    Connect your wallet to create an account. This will be used to verify your identity and secure your investments.
                  </p>
                  <div className="mb-6">
                    <ConnectButton />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Don't have a wallet?{" "}
                    <Link href="https://metamask.io/download/" className="text-primary hover:underline" target="_blank">
                      Create one now <ExternalLink className="h-3 w-3 inline" />
                    </Link>
                  </p>
                </div>
              )}
              
              {registrationStep === 1 && (
                <form onSubmit={handleRegistration}>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="individual">Individual</TabsTrigger>
                      <TabsTrigger value="company">Company</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="individual" className="space-y-4 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="wallet">Connected Wallet</Label>
                        <div className="flex items-center border rounded-md px-3 py-2 bg-muted/20">
                          <LockKeyhole className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm font-mono truncate">{address}</span>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="company" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input id="company-name" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="registration-number">Registration Number</Label>
                        <Input id="registration-number" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="business-email">Business Email</Label>
                        <Input 
                          id="business-email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company-wallet">Connected Wallet</Label>
                        <div className="flex items-center border rounded-md px-3 py-2 bg-muted/20">
                          <LockKeyhole className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-sm font-mono truncate">{address}</span>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex items-start space-x-2 mb-6">
                    <Checkbox 
                      id="terms" 
                      checked={agreed} 
                      onCheckedChange={(checked) => setAgreed(checked as boolean)} 
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the terms of service and privacy policy
                      </label>
                      <p className="text-sm text-muted-foreground">
                        By creating an account, you agree to our{" "}
                        <Link href="#" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </p>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full">Register</Button>
                </form>
              )}
              
              {registrationStep === 2 && (
                <div className="flex flex-col items-center p-6">
                  {kycStatus !== 'APPROVED' ? (
                    <>
                      <LockKeyhole className="h-16 w-16 text-muted-foreground mb-6" />
                      <p className="text-center mb-6">
                        Complete the KYC verification process to start investing in Dubai real estate. This is required by regulations to ensure the security and integrity of our platform.
                      </p>
                      <div className="mb-6">
                        <KYCModal />
                      </div>
                      <p className="text-sm text-muted-foreground text-center">
                        Your information is securely encrypted and protected according to international standards.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-full mb-6">
                        <Check className="h-16 w-16 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-medium mb-2 text-center">KYC Verification Complete</h3>
                      <p className="text-center mb-6">
                        Congratulations! Your KYC verification has been approved. You can now start investing in premium Dubai real estate.
                      </p>
                      <Button onClick={() => setRegistrationStep(3)}>
                        Continue to Investing
                      </Button>
                    </>
                  )}
                </div>
              )}
              
              {registrationStep === 3 && (
                <div className="flex flex-col items-center p-6">
                  <div className="bg-primary/10 p-4 rounded-full mb-6">
                    <Check className="h-16 w-16 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-center">You're Ready to Invest!</h3>
                  <p className="text-center mb-6">
                    Your account is fully set up and verified. Start browsing our premium properties and make your first investment.
                  </p>
                  <Button onClick={proceedToInvesting}>
                    Browse Properties <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
            
            {registrationStep > 0 && registrationStep < 3 && (
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setRegistrationStep(registrationStep - 1)}
                >
                  Back
                </Button>
                
                {registrationStep === 1 && (
                  <Button onClick={handleRegistration}>
                    Continue
                  </Button>
                )}
                
                {registrationStep === 2 && kycStatus === 'APPROVED' && (
                  <Button onClick={() => setRegistrationStep(3)}>
                    Continue
                  </Button>
                )}
              </CardFooter>
            )}
          </Card>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Button variant="link" className="p-0" onClick={() => router.push("/dashboard")}>
                Go to Dashboard
              </Button>
            </p>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
} 