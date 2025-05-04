"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, MapPin, TrendingUp } from "lucide-react";

// Sample property data - in a real app this would come from an API
const featuredProperties = [
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

export const FeaturedProperties = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Function to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Featured <span className="text-primary">Properties</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore our handpicked selection of premium Dubai properties offering attractive rental yields and growth potential.
            </p>
          </div>
          <Button className="mt-4 md:mt-0" variant="outline" asChild>
            <Link href="/properties">View All Properties</Link>
          </Button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredProperties.map((property) => (
            <motion.div key={property.id} variants={itemVariants}>
              <Card className="overflow-hidden h-full border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-md group">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-primary text-primary-foreground">
                      {property.status === "FUNDING" ? "Funding" : "Upcoming"}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center text-white">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm mb-4">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{property.size} sqft</span>
                    </div>
                  </div>
                  <div className="flex justify-between mb-3">
                    <span className="text-muted-foreground text-sm">Property Value</span>
                    <span className="font-medium">{formatCurrency(property.price)}</span>
                  </div>
                  <div className="flex justify-between mb-3">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1 text-emerald-500" />
                      <span className="text-sm font-medium text-emerald-500">
                        {property.rentalYield}% yield
                      </span>
                    </div>
                    <span className="text-sm">${Math.floor(property.price * 0.001)} min. investment</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-3">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${property.fundingProgress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>{property.fundingProgress}% funded</span>
                    <span>Target: {formatCurrency(property.price)}</span>
                  </div>
                </CardContent>
                <CardFooter className="px-5 pb-5 pt-0">
                  <Button className="w-full" asChild>
                    <Link href={`/properties/${property.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};