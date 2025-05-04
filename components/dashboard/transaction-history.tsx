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

const transactions = [
  {
    id: "1",
    date: "2024-03-15",
    type: "BUY",
    property: "Marina Heights Residence",
    amount: 5000,
    tokens: 50,
    status: "COMPLETED",
  },
  {
    id: "2",
    date: "2024-03-10",
    type: "DIVIDEND",
    property: "Palm Jumeirah Villa",
    amount: 250,
    tokens: null,
    status: "COMPLETED",
  },
];

export function TransactionHistory() {
  return (
    <Card>
      <CardContent className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Tokens</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={tx.type === "DIVIDEND" ? "outline" : "default"}
                  >
                    {tx.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{tx.property}</TableCell>
                <TableCell>${tx.amount}</TableCell>
                <TableCell>{tx.tokens ? `${tx.tokens} DYT` : "-"}</TableCell>
                <TableCell>
                  <Badge variant="outline">{tx.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}