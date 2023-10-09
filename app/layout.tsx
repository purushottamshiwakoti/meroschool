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
    template: "%s | BBS Exam Q&A: 1st-4th Year Study Resources",
    default: "BBS Exam Q&A: 1st-4th Year Study Resources",
  },
  description:
    "Explore BBS exam Q&A: 1st-4th year study resources to ace your Bachelors in Business Studies exams. Streamline your preparation and excel with ease.",
  applicationName: "BBS Tutorial Application",
  verification: {
    google: "CWbcX1UdDi-jHid4BVjxZxJdopH5HGYE6ttwsES45DU",
  },
  keywords: [
    "BBS Tutorial Application",
    "bbs 1st year",
    "bbs 2nd year",
    "bbs 3rd year",
    "bbs 4th year",
    "bbs question answers",
    "BBS exam",
    "Business Studies exams",
    "BBS study resources",
    "BBS classes",
    "BBS notes",
    "BBS exam",
    "Business Studies exams",
    "BBS study resources",
    "BBS classes",
    "BBS syllabus",
    "Bachelors in Business Studies",
    "BBS educational hub",
    "BBS exam preparation",
    "BBS learning materials",
    "BBS course insights",
    "BBS study guides",
    "BBS academic journey",
    "BBS platform",
    "BBS website suggestions",
    "BBS student success",
    "BBS educational resources",
    "BBS exam trends",
    "BBS academic excellence",
    "BBS exam tips",
    "BBS education enhancements",
    "bbs 1st year",
    "bbs 2nd year",
    "bbs 3rd year",
    "bbs 4th year",
    "bbs 1st year notes",
    "bbs 2nd year notes",
    "bbs 3rd year notes",
    "bbs 4th year notes",
    "bbs 1st year important questions",
    "bbs 2nd year important questions",
    "bbs 3rd year important questions",
    "bbs 4th year important questions",
  ],
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
