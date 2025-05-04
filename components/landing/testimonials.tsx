"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Michael Chen",
    location: "Singapore",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    quote: "Dubai RWA made it possible for me to invest in Dubai real estate from Singapore with minimal hassle. The platform is intuitive and their properties consistently deliver strong returns.",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    location: "United Kingdom",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    quote: "As someone new to real estate investing, the transparency and ease of use of this platform has been incredible. I've been earning consistent 8% yields on my Dubai property investments.",
    rating: 5,
  },
  {
    name: "Raj Patel",
    location: "India",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    quote: "The tokenization approach makes investing so accessible. I started with just $1,000 and have gradually built a diverse portfolio of premium Dubai properties over the past year.",
    rating: 4,
  },
  {
    name: "Emma Schmidt",
    location: "Germany",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    quote: "What impressed me most was the thorough due diligence done on each property. The platform provides detailed analytics and projections that have proven accurate over time.",
    rating: 5,
  },
  {
    name: "Alex Thompson",
    location: "United States",
    image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg",
    quote: "The secondary market feature is a game-changer. I was able to liquidate part of my investment when I needed to without any penalties or waiting periods.",
    rating: 4,
  },
];

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            What Our <span className="text-primary">Investors Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied investors who have transformed their investment strategy
            with our tokenized real estate platform.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="border border-border/50 h-full">
                    <CardContent className="p-6">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating
                                ? "text-amber-500 fill-amber-500"
                                : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-6 italic">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.location}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 gap-2">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};