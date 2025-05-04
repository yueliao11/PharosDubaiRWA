"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Building2, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const SharedNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled || true // Always show background on inner pages
          ? "bg-background/95 backdrop-blur-sm border-b shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          <Link href="/" className="font-serif text-xl font-semibold">
            Dubai RWA
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Properties</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] grid-cols-2">
                    <li className="col-span-2">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/properties"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Browse All Properties
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Explore our curated selection of premium Dubai real estate investment opportunities.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link
                        href="/properties?type=APARTMENT"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Apartments</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Luxury apartments in prime locations
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/properties?type=VILLA"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Villas</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Exclusive villas with premium amenities
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/staking" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Staking
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/defi" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    DeFi
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/how-it-works" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    How It Works
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/market-insights" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Market Insights
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <ModeToggle />
          
          <ConnectButton />
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b shadow-md p-4 md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link href="/properties" className="px-4 py-2 hover:bg-muted rounded-md">
              Properties
            </Link>
            <Link href="/staking" className="px-4 py-2 hover:bg-muted rounded-md">
              Staking
            </Link>
            <Link href="/defi" className="px-4 py-2 hover:bg-muted rounded-md">
              DeFi
            </Link>
            <Link href="/how-it-works" className="px-4 py-2 hover:bg-muted rounded-md">
              How It Works
            </Link>
            <Link href="/market-insights" className="px-4 py-2 hover:bg-muted rounded-md">
              Market Insights
            </Link>
            <hr className="my-2" />
            <div className="px-4">
              <ConnectButton />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}; 