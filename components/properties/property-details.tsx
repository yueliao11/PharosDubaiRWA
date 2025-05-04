"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, Check } from "lucide-react";

interface PropertyDetailsProps {
  property: {
    bedrooms: number;
    bathrooms: number;
    size: number;
    features: string[];
  };
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <div className="space-y-6 mt-8">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Bed className="h-8 w-8 mr-4 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Bedrooms</p>
              <p className="text-2xl font-semibold">{property.bedrooms}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <Bath className="h-8 w-8 mr-4 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Bathrooms</p>
              <p className="text-2xl font-semibold">{property.bathrooms}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <Square className="h-8 w-8 mr-4 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Size</p>
              <p className="text-2xl font-semibold">{property.size} sqft</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Features & Amenities</h3>
          <div className="grid grid-cols-2 gap-4">
            {property.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}