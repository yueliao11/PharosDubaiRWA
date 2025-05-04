"use client";

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PropertyCard } from '@/components/properties/property-card';
import { PropertyFilters } from '@/components/properties/property-filters';
import { PropertySort } from '@/components/properties/property-sort';
import { useTranslation } from 'react-i18next';
import { SharedNavbar } from '@/components/shared-navbar';

// Sample data - in a real app, this would come from an API
const properties = [
  {
    id: "1",
    title: "Marina Heights Residence",
    location: "Dubai Marina",
    price: 2500000,
    rentalYield: 7.8,
    fundingProgress: 65,
    image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    bedrooms: 2,
    bathrooms: 2,
    size: 1250,
    status: "FUNDING",
  },
  {
    id: "2",
    title: "Palm Jumeirah Villa",
    location: "Palm Jumeirah",
    price: 8500000,
    rentalYield: 6.5,
    fundingProgress: 42,
    image: "https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg",
    bedrooms: 4,
    bathrooms: 5,
    size: 3600,
    status: "FUNDING",
  },
  {
    id: "3",
    title: "Downtown Skyline Apartment",
    location: "Downtown Dubai",
    price: 3200000,
    rentalYield: 8.2,
    fundingProgress: 78,
    image: "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
    bedrooms: 3,
    bathrooms: 3,
    size: 1800,
    status: "FUNDING",
  },
];

export default function PropertiesPage() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState(properties);
  
  return (
    <>
     <SharedNavbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-4xl font-serif font-bold mb-2">
                Available Properties
              </h1>
              <p className="text-muted-foreground">
                Explore our curated selection of premium Dubai properties
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <PropertySort />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <PropertyFilters />
            </aside>
            
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}