import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About — V My Fair Unisex Salon & Academy",
  description:
    "Established in 2016, V My Fair is a trusted unisex salon and beauty academy in Ashok Nagar, Chanda Nagar, Hyderabad. 4.5★ rated with 500+ Google reviews.",
};

export default function AboutPage() {
  return <AboutContent />;
}
