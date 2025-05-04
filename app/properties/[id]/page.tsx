"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertyGallery } from '@/components/properties/property-gallery';
import { PropertyDetails } from '@/components/properties/property-details';
import { PropertyLocation } from '@/components/properties/property-location';
import { PropertyFinancials } from '@/components/properties/property-financials';
import { PropertyDocuments } from '@/components/properties/property-documents';
import { InvestmentCalculator } from '@/components/properties/investment-calculator';
import { InvestModal } from '@/components/properties/invest-modal';
import { useAccount } from 'wagmi';
import { useUserStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { SharedNavbar } from '@/components/shared-navbar';

// Sample data - in a real app, this would come from an API
const property = {
  id: "1",
  title: "Marina Heights Residence",
  description: "Luxury apartment with stunning marina views, featuring high-end finishes and premium amenities. Perfect for investors seeking strong rental yields in Dubai's most sought-after waterfront community.",
  location: {
    address: "Dubai Marina",
    coordinates: {
      lat: 25.092,
      lng: 55.148
    }
  },
  price: 2500000,
  rentalYield: 7.8,
  fundingProgress: 65,
  images: [
    "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    "https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg",
    "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg"
  ],
  bedrooms: 2,
  bathrooms: 2,
  size: 1250,
  status: "FUNDING",
  features: [
    "Floor-to-ceiling windows",
    "Smart home technology",
    "Private balcony",
    "Fully fitted kitchen",
    "Walk-in closet",
    "Parking space"
  ],
  financials: {
    tokenPrice: 100,
    minInvestment: 1000,
    expectedROI: 12.5,
    rentalIncome: 180000,
    propertyAppreciation: 5.2
  },
  documents: [
    {
      name: "Property Title Deed",
      type: "PDF",
      size: "2.4 MB"
    },
    {
      name: "Rental History Report",
      type: "PDF",
      size: "1.8 MB"
    },
    {
      name: "Investment Prospectus",
      type: "PDF",
      size: "3.2 MB"
    }
  ]
};

export default function PropertyPage() {
  const { t } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { isConnected } = useAccount();
  const { kycStatus } = useUserStore();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);
  
  const handleInvestClick = () => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to continue with the investment",
        variant: "destructive",
      });
      router.push('/register');
      return;
    }
    
    if (kycStatus !== 'APPROVED') {
      toast({
        title: "KYC required",
        description: "Please complete KYC verification to invest",
        variant: "destructive",
      });
      router.push('/register');
      return;
    }
    
    setIsInvestModalOpen(true);
  };

  return (
    <>
      <SharedNavbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-serif font-bold mb-4">{property.title}</h1>
              <p className="text-muted-foreground mb-8">{property.description}</p>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="financials">Financials</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <PropertyGallery images={property.images} />
                  <PropertyDetails property={property} />
                </TabsContent>

                <TabsContent value="location">
                  <PropertyLocation location={property.location} />
                </TabsContent>

                <TabsContent value="financials">
                  <PropertyFinancials financials={property.financials} />
                </TabsContent>

                <TabsContent value="documents">
                  <PropertyDocuments documents={property.documents} />
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <InvestmentCalculator property={property} />
                  <Button 
                    className="w-full mt-6" 
                    size="lg"
                    onClick={handleInvestClick}
                  >
                    Invest Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        <InvestModal 
          isOpen={isInvestModalOpen} 
          onClose={() => setIsInvestModalOpen(false)} 
          property={{
            id: property.id,
            title: property.title,
            location: property.location.address,
            price: property.price,
            rentalYield: property.rentalYield,
            fundingProgress: property.fundingProgress,
            financials: property.financials,
            image: property.images[0]
          }}
        />
      </main>
    </>
  );
}