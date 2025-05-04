"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp, TrendingDown, Search } from "lucide-react";
import { SharedNavbar } from '@/components/shared-navbar';

// Sample data - in a real app, this would come from an API
const listings = [
  {
    id: "1",
    property: "Marina Heights Residence",
    tokenSymbol: "MHR",
    quantity: 100,
    pricePerToken: 105,
    totalValue: 10500,
    change: 5.2,
    seller: "0x1234...5678",
  },
  {
    id: "2",
    property: "Palm Jumeirah Villa",
    tokenSymbol: "PJV",
    quantity: 50,
    pricePerToken: 210,
    totalValue: 10500,
    change: -2.1,
    seller: "0x8765...4321",
  },
  {
    id: "3",
    property: "Downtown Skyline Apartment",
    tokenSymbol: "DSA",
    quantity: 75,
    pricePerToken: 150,
    totalValue: 11250,
    change: 3.8,
    seller: "0x2468...1357",
  },
];

export default function SecondaryMarketPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  return (
    <>
      <SharedNavbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-4xl font-serif font-bold mb-2">
                Secondary Market
              </h1>
              <p className="text-muted-foreground">
                Trade property tokens with other investors on our secure marketplace
              </p>
            </div>
            <Button className="mt-4 md:mt-0">Create Listing</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>24h Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$125,750</div>
                <p className="text-sm text-emerald-500">+12.5% from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47</div>
                <p className="text-sm text-muted-foreground">Across 12 properties</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avg. Token Price</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$155</div>
                <p className="text-sm text-emerald-500">+3.2% this week</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by property or token symbol"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="volume">Trading Volume</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Token</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Price/Token</TableHead>
                    <TableHead className="text-right">Total Value</TableHead>
                    <TableHead className="text-right">24h Change</TableHead>
                    <TableHead className="text-right">Seller</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell className="font-medium">
                        {listing.property}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{listing.tokenSymbol}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {listing.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        ${listing.pricePerToken}
                      </TableCell>
                      <TableCell className="text-right">
                        ${listing.totalValue.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div
                          className={`flex items-center justify-end ${
                            listing.change >= 0
                              ? "text-emerald-500"
                              : "text-red-500"
                          }`}
                        >
                          {listing.change >= 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          {Math.abs(listing.change)}%
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {listing.seller}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Buy
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}