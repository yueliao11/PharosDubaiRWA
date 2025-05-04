"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface PropertyLocationProps {
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

export function PropertyLocation({ location }: PropertyLocationProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <MapPin className="h-5 w-5 mr-2 text-primary" />
          <h3 className="text-lg font-semibold">{location.address}</h3>
        </div>
        
        <div className="aspect-video rounded-lg overflow-hidden bg-muted">
          {/* Map implementation will be added here */}
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-muted-foreground">Map view coming soon</p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-sm text-muted-foreground">
            Coordinates: {location.coordinates.lat}, {location.coordinates.lng}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}