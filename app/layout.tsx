import Navbar from "@/components/user/nav/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/common/Footer";
import ToastProvider from "@/providers/ToastProvider";
import NextTopLoader from "nextjs-toploader";
import AuthProvider from "@/providers/AuthProvider";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://bbstutorial.com"),
  title: {
    template: "%s - BBSTutorial",
    default: "Home - BBSTutorial",
  },
  description:
    "bbs questions and answers of BBS 1st year, BBS 2nd Year, BBS 3rd Year, BBS 4th Year all subjects questions and answers. All subjects answers and questions.",
  applicationName: "bbstutorial",
  verification: {
    google: "CWbcX1UdDi-jHid4BVjxZxJdopH5HGYE6ttwsES45DU",
  },
  // keywords: [

  // ],
  authors: [{ name: "seb" }],
  creator: "Puru Shiw",
  publisher: "Puru Shiw",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title: "BBS Exam Q&A: 1st-4th Year Study Resources",
    description:
      "Explore BBS exam Q&A: 1st-4th year study resources to ace your Bachelors in Business Studies exams. Streamline your preparation and excel with ease.",
    url: "https://bbstutorial.com",
    siteName: "BBS Tutiorial",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "BBS Exam Q&A: 1st-4th Year Study Resources",
    description:
      "Explore BBS exam Q&A: 1st-4th year study resources to ace your Bachelors in Business Studies exams. Streamline your preparation and excel with ease.",
    site: "BBS Tutiorial",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <AuthProvider> */}
        <ThemeProvider
          attribute="class"
          // defaultTheme="system"
          forcedTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="#EE7A79" />
          <Navbar />
          {children}
          <Footer />
          <ToastProvider />
        </ThemeProvider>
        {/* </AuthProvider> */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2577496886069861"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
