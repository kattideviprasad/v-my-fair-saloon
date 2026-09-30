import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "V My Fair Unisex Salon & Academy | Professional Hair, Beauty & Grooming — Hyderabad",
  description:
    "Professional hair, beauty, and grooming services in a comfortable, modern space. Located in Ashok Nagar, Chanda Nagar, Hyderabad. Rated 4.5★ with 500+ Google reviews. Est. 2016.",
  keywords: [
    "salon Hyderabad",
    "unisex salon Chanda Nagar",
    "hair salon Ashok Nagar",
    "bridal makeup Hyderabad",
    "beauty academy Hyderabad",
    "V My Fair Salon",
  ],
  openGraph: {
    title: "V My Fair Unisex Salon & Academy",
    description:
      "Professional hair, beauty, and grooming services. Rated 4.5★ with 500+ Google reviews.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
