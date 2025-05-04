"use client";

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface InvestmentCalculatorProps {
  property: {
    price: number;
    rentalYield: number;
    financials: {
      tokenPrice: number;
      minInvestment: number;
      expectedROI: number;
    };
  };
}

export function InvestmentCalculator({ property }: InvestmentCalculatorProps) {
  const [investment, setInvestment] = useState(property.financials.minInvestment);
  const tokens = investment / property.financials.tokenPrice;
  const ownership = (investment / property.price) * 100;
  const annualReturn = investment * (property.financials.expectedROI / 100);
  const monthlyReturn = annualReturn / 12;

  return (
    <div className="space-y-6">
      <div>
        <Label>Investment Amount (USD)</Label>
        <div className="flex items-center gap-4 mt-2">
          <Input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
            min={property.financials.minInvestment}
            max={property.price}
          />
        </div>
        <Slider
          value={[investment]}
          min={property.financials.minInvestment}
          max={property.price}
          step={property.financials.tokenPrice}
          onValueChange={([value]) => setInvestment(value)}
          className="mt-4"
        />
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Number of Tokens</p>
          <p className="text-lg font-semibold">{tokens.toFixed(2)} DYT</p>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">Ownership Percentage</p>
          <p className="text-lg font-semibold">{ownership.toFixed(4)}%</p>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">Expected Monthly Return</p>
          <p className="text-lg font-semibold text-emerald-500">
            ${monthlyReturn.toFixed(2)}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">Expected Annual Return</p>
          <p className="text-lg font-semibold text-emerald-500">
            ${annualReturn.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}