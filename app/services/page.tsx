import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services — V My Fair Unisex Salon & Academy",
  description:
    "Complete range of professional hair, beauty, grooming, bridal, and spa services. View our full service menu.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
