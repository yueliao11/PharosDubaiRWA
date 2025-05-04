"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, DollarSign, LineChart, PiggyBank } from "lucide-react";

interface PropertyFinancialsProps {
  financials: {
    tokenPrice: number;
    minInvestment: number;
    expectedROI: number;
    rentalIncome: number;
    propertyAppreciation: number;
  };
}

export function PropertyFinancials({ financials }: PropertyFinancialsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <DollarSign className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-semibold">Token Price</h3>
            </div>
            <p className="text-2xl font-bold">${financials.tokenPrice}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <PiggyBank className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-semibold">Min Investment</h3>
            </div>
            <p className="text-2xl font-bold">${financials.minInvestment}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Financial Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-emerald-500" />
                <span>Expected ROI</span>
              </div>
              <span className="font-semibold text-emerald-500">
                {financials.expectedROI}%
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                <span>Annual Rental Income</span>
              </div>
              <span className="font-semibold">
                ${financials.rentalIncome.toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <LineChart className="h-4 w-4 mr-2" />
                <span>Property Appreciation</span>
              </div>
              <span className="font-semibold">
                {financials.propertyAppreciation}% per year
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}