import Link from "next/link";
import { Building2 } from "lucide-react";

export const LandingFooter = () => {
  return (
    <footer className="bg-muted py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="font-serif text-xl font-semibold">Dubai RWA</span>
            </div>
            <p className="text-muted-foreground mb-6 text-sm">
              Transforming Dubai real estate investment through blockchain
              technology, making premium properties accessible to investors worldwide.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/how-it-works"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/market-insights"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Market Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/secondary-market"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Secondary Market
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/kyc-aml"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  KYC & AML Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/risk-disclosure"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Risk Disclosure
                </Link>
              </li>
              <li>
                <Link
                  href="/regulatory"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Regulatory Information
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                Dubai International Financial Centre (DIFC)
              </li>
              <li className="text-muted-foreground">
                <a href="mailto:info@dubairwa.com" className="hover:text-primary transition-colors">
                  info@dubairwa.com
                </a>
              </li>
              <li className="text-muted-foreground">
                <a href="tel:+97144567890" className="hover:text-primary transition-colors">
                  +971 4 456 7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Dubai RWA Platform. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Powered by Pharos Blockchain Technology
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};