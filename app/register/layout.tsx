import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Dubai RWA Platform",
  description: "Create an account to start investing in premium Dubai real estate through blockchain technology.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 