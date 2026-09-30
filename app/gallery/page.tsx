import type { Metadata } from "next";
import { GalleryContent } from "./GalleryContent";

export const metadata: Metadata = {
  title: "Gallery — V My Fair Unisex Salon & Academy",
  description:
    "Browse photos of our salon, team, and work. V My Fair — professional hair, beauty & grooming in Hyderabad.",
};

export default function GalleryPage() {
  return <GalleryContent />;
}
