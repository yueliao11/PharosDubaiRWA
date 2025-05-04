"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail("");
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block p-3 rounded-full bg-primary/10 mb-6">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Stay Updated with Dubai Real Estate Insights
          </h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to our newsletter for market updates, investment opportunities,
            and expert insights delivered straight to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
          <p className="text-sm text-muted-foreground mt-4">
            By subscribing, you agree to receive marketing communications from us.
            You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}