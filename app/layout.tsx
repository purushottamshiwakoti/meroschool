

import Navbar from "@/components/user/nav/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/common/Footer";
import ToastProvider from "@/providers/ToastProvider";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BBS Tutorial",
  description: "Ps",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon/favicon-32x32.png" />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="#EE7A79" />
          <Navbar />
          {children}
          <Footer />
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>

  );
}
