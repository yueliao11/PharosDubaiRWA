"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const properties = [
  {
    id: "1",
    title: "Marina Heights Residence",
    tokens: 150,
    value: 15000,
    yield: 8.2,
    appreciation: 12.5,
    status: "ACTIVE",
  },
  {
    id: "2",
    title: "Palm Jumeirah Villa",
    tokens: 75,
    value: 7500,
    yield: 7.8,
    appreciation: 15.2,
    status: "ACTIVE",
  },
];

export function PropertyList() {
  return (
    <Card>
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Tokens</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Yield</TableHead>
              <TableHead>Appreciation</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.title}</TableCell>
                <TableCell>{property.tokens} DYT</TableCell>
                <TableCell>${property.value}</TableCell>
                <TableCell className="text-emerald-500">
                  {property.yield}%
                </TableCell>
                <TableCell className="text-emerald-500">
                  +{property.appreciation}%
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{property.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}