"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

export function PropertyFilters() {
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [yieldRange, setYieldRange] = useState([0, 15]);
  const [propertyTypes, setPropertyTypes] = useState({
    apartment: false,
    villa: false,
    townhouse: false,
    penthouse: false
  });

  const handleReset = () => {
    setPriceRange([0, 10000000]);
    setYieldRange([0, 15]);
    setPropertyTypes({
      apartment: false,
      villa: false,
      townhouse: false,
      penthouse: false
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Price Range (USD)</Label>
          <Slider
            value={priceRange}
            min={0}
            max={10000000}
            step={100000}
            onValueChange={setPriceRange}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0].toLocaleString()}</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Rental Yield (%)</Label>
          <Slider
            value={yieldRange}
            min={0}
            max={15}
            step={0.5}
            onValueChange={setYieldRange}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{yieldRange[0]}%</span>
            <span>{yieldRange[1]}%</span>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Property Type</Label>
          <div className="space-y-2">
            {Object.entries(propertyTypes).map(([type, checked]) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={checked}
                  onCheckedChange={(checked) =>
                    setPropertyTypes(prev => ({ ...prev, [type]: checked }))
                  }
                />
                <label
                  htmlFor={type}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleReset} variant="outline" className="w-full">
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
}