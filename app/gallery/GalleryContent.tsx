"use client";

import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import { InstagramIcon } from "@/components/Icons";

/*
  Only real photos belong here. To add one, drop the file in public/images/ and add an entry;
  the grid lays out whatever is listed (no empty placeholder tiles).
*/
const photos = [
  {
    src: "/images/hero/mirror-a.jpg",
    width: 816,
    height: 1020,
    alt: "Two styling stations with black chairs and wall mirrors at V My Fair, with a client in a pink cape",
  },
  {
    src: "/images/hero/mirror-b.jpg",
    width: 1180,
    height: 886,
    alt: "Styling stations under warm ceiling lights with blue and teal walls at V My Fair",
  },
];

export function GalleryContent() {
  return (
    <div className="pt-[72px]">
      {/* Header */}
      <section className="surface-sand py-16 lg:py-20" id="gallery-header">
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow">Our work</span>
            <h1 className="mb-4">Gallery</h1>
            <p className="lead">
              A glimpse into our salon and the community we&apos;ve built. More photos are on the way.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Photos */}
      <section className="section surface-ivory" id="gallery-grid">
        <div className="container">
          <ScrollReveal stagger={0.1} staggerSelector=".gallery-photo">
            <ul className="grid list-none grid-cols-1 items-start gap-6 p-0 sm:grid-cols-2 lg:gap-8">
              {photos.map((photo) => (
                <li key={photo.src} className="gallery-photo">
                  <figure className="m-0 overflow-hidden rounded-[var(--radius-lg)] bg-sand">
                    <Image
                      src={photo.src}
                      width={photo.width}
                      height={photo.height}
                      alt={photo.alt}
                      sizes="(min-width: 1200px) 560px, (min-width: 640px) 46vw, 92vw"
                      className="h-auto w-full"
                    />
                  </figure>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mx-auto mt-14 max-w-xl text-center">
              <p className="mb-6">
                We&apos;re updating our gallery with fresh photos. In the meantime, check out our latest work on Instagram.
              </p>
              <a
                href="https://instagram.com/vmyfairunisexsalonspa"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                id="gallery-instagram"
              >
                <InstagramIcon size={20} />
                Follow Us on Instagram
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="surface-dark py-20" id="gallery-cta">
        <div className="container text-center">
          <ScrollReveal>
            <h2 className="mb-4">Like What You See?</h2>
            <p className="mx-auto mb-9 max-w-md">
              Book your appointment and let us create your next look.
            </p>
            <Link href="/contact" className="btn btn-amber" id="gallery-book-cta">
              Book Appointment
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
