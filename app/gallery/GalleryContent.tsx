"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { InstagramIcon } from "@/components/Icons";

const placeholderSlots = [
  { span: "col-span-2 row-span-2", label: "Salon Interior" },
  { span: "col-span-1 row-span-1", label: "Hair Styling" },
  { span: "col-span-1 row-span-1", label: "Bridal Work" },
  { span: "col-span-1 row-span-2", label: "Transformations" },
  { span: "col-span-1 row-span-1", label: "Team" },
  { span: "col-span-1 row-span-1", label: "Nail Art" },
  { span: "col-span-2 row-span-1", label: "Academy Training" },
  { span: "col-span-1 row-span-1", label: "Spa & Wellness" },
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
              A glimpse into our salon, our work, and the community we&apos;ve built. Real photos coming soon.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section surface-ivory" id="gallery-grid">
        <div className="container">
          <ScrollReveal stagger={0.08} staggerSelector=".gallery-slot">
            <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {placeholderSlots.map((slot) => (
                <div
                  key={slot.label}
                  className={`gallery-slot ${slot.span} flex flex-col items-center justify-center rounded-[var(--radius)] border border-rule bg-sand p-6 text-center`}
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-muted text-muted">
                    <span className="text-[1.25rem] leading-none">+</span>
                  </div>
                  <span className="text-small font-medium text-ink">{slot.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mx-auto mt-12 max-w-xl text-center">
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
            <Link href="/contact" className="btn btn-gold" id="gallery-book-cta">
              Book Appointment
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
