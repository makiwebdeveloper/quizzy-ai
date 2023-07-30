import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { cn } from "@/lib/cn";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quizzy AI",
  description: "Quiz yourself on anything!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "antialiased min-h-screen pt-20 text-zinc-900"
        )}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
