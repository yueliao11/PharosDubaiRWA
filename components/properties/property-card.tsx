"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Square, MapPin, TrendingUp } from "lucide-react";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    rentalYield: number;
    fundingProgress: number;
    image: string;
    bedrooms: number;
    bathrooms: number;
    size: number;
    status: string;
  };
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
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
  );
}