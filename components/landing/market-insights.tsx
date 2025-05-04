"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

// Sample data - in a real app, this would come from an API
const rentalYieldData = [
  { year: '2018', dubai: 6.8, global: 3.2 },
  { year: '2019', dubai: 7.2, global: 3.4 },
  { year: '2020', dubai: 6.9, global: 3.0 },
  { year: '2021', dubai: 7.5, global: 3.5 },
  { year: '2022', dubai: 8.3, global: 3.7 },
  { year: '2023', dubai: 8.5, global: 3.9 },
  { year: '2024', dubai: 8.9, global: 4.1 },
];

const propertyValueData = [
  { year: '2018', value: 100 },
  { year: '2019', value: 102 },
  { year: '2020', value: 105 },
  { year: '2021', value: 115 },
  { year: '2022', value: 130 },
  { year: '2023', value: 145 },
  { year: '2024', value: 168 },
];

export const MarketInsights = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  // Market stats
  const marketStats = [
    { label: "Average Rental Yield", value: "8.5%", change: "+0.7%" },
    { label: "YoY Price Growth", value: "15.8%", change: "+3.2%" },
    { label: "Occupancy Rate", value: "93%", change: "+2%" },
    { label: "ROI (5-year avg)", value: "42%", change: "+5%" },
  ];

  return (
    <section className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Dubai Real Estate <span className="text-primary">Market Insights</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore data-driven insights on Dubai's thriving real estate market and investment trends.
            </p>
          </div>
          <Button className="mt-4 md:mt-0" variant="outline" asChild>
            <Link href="/market-insights">View Detailed Analysis</Link>
          </Button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Market Stats */}
            <div className="lg:col-span-1">
              <div className="grid grid-cols-2 gap-4">
                {marketStats.map((stat, index) => (
                  <Card key={index} className="border border-border/50">
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${stat.change.startsWith('+') ? 'text-emerald-500 bg-emerald-500/10' : 'text-red-500 bg-red-500/10'}`}>
                          {stat.change}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-4 border border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Market Highlights</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <p className="text-sm">Dubai rental yields consistently outperform global averages by 2-3x</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <p className="text-sm">Property prices have increased by 68% since 2018</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <p className="text-sm">Prime areas like Dubai Marina and Downtown show strongest growth</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <p className="text-sm">Foreign investment up 40% year-over-year</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="lg:col-span-2">
              <Card className="border border-border/50 h-full">
                <CardContent className="p-6">
                  <Tabs defaultValue="rental">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold">Performance Trends</h3>
                      <TabsList>
                        <TabsTrigger value="rental">Rental Yield</TabsTrigger>
                        <TabsTrigger value="value">Property Value</TabsTrigger>
                      </TabsList>
                    </div>
                    
                    <TabsContent value="rental" className="mt-0">
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={rentalYieldData}
                            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                            <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `${value}%`} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'hsl(var(--background))', 
                                borderColor: 'hsl(var(--border))' 
                              }}
                              formatter={(value) => [`${value}%`, '']}
                            />
                            <Line
                              type="monotone"
                              dataKey="dubai"
                              name="Dubai Yield"
                              stroke="hsl(var(--primary))"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="global"
                              name="Global Avg"
                              stroke="hsl(var(--muted-foreground))"
                              strokeWidth={2}
                              strokeDasharray="5 5"
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="text-sm text-muted-foreground mt-4 text-center">
                        Dubai rental yields consistently outperform global averages by a significant margin.
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="value" className="mt-0">
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={propertyValueData}
                            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                            <YAxis stroke="hsl(var(--muted-foreground))" />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'hsl(var(--background))', 
                                borderColor: 'hsl(var(--border))' 
                              }}
                              formatter={(value) => [`Index: ${value}`, '']}
                            />
                            <Line
                              type="monotone"
                              dataKey="value"
                              name="Property Value Index"
                              stroke="hsl(var(--chart-1))"
                              strokeWidth={2}
                              dot={{ r: 4 }}
                              activeDot={{ r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="text-sm text-muted-foreground mt-4 text-center">
                        Dubai property values have shown strong growth, increasing 68% since 2018 (indexed at 100).
                      </p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};