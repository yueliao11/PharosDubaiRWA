"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

interface PropertyDocumentsProps {
  documents: Array<{
    name: string;
    type: string;
    size: string;
  }>;
}

export function PropertyDocuments({ documents }: PropertyDocumentsProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Documents</h3>
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border"
            >
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {doc.type} • {doc.size}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}