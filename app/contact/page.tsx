import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact & Book — V My Fair Unisex Salon & Academy",
  description:
    "Book an appointment or enquire about training. Visit us at Ashok Nagar Main Rd, Chanda Nagar, Hyderabad. Call +91 82474 58328.",
};

export default function ContactPage() {
  return <ContactContent />;
}
