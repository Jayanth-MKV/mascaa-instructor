import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/sessionprovider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as T } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MASCAA Instructor",
  description: "The MASCAA instructor dashboard for creating tests and analyzing learner confidence. The user-friendly interface, customizable test options, and in-depth confidence analysis tools. Learn how MASCAA empowers instructors to tailor assessments and boost learner confidence for greater success.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`}>
        <Providers>
          {children}
          <Toaster />
          <T />
        </Providers>
      </body>
    </html>
  );
}
