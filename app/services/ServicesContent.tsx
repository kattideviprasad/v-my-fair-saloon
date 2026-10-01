"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  ScissorsIcon,
  BeautyCareIcon,
  GroomingIcon,
  NailsIcon,
  BridalIcon,
  SpaIcon,
  PiercingIcon,
  AcademyIcon,
  ChevronRightIcon,
} from "@/components/Icons";

const services = [
  {
    icon: ScissorsIcon,
    category: "Hair Care & Styling",
    items: [
      "Precision haircuts — layer cuts, soft layers, feather cuts",
      "Blow-dry & styling",
      "Permanent & temporary coloring",
      "Highlights & balayage",
      "Root touch-ups",
      "Keratin treatments",
      "Hair smoothening",
      "Hair spa & deep conditioning",
      "Split-end & damage repair",
    ],
  },
  {
    icon: BeautyCareIcon,
    category: "Skin & Facials",
    items: [
      "Cleanup",
      "Glow facials",
      "Anti-tan & de-tan treatments",
      "Skin-type-specific facial packs",
    ],
  },
  {
    icon: GroomingIcon,
    category: "Grooming & Waxing",
    items: [
      "Eyebrow threading & shaping",
      "Full body waxing",
      "Partial body waxing",
      "Beard grooming & styling",
      "Traditional shaves",
    ],
  },
  {
    icon: NailsIcon,
    category: "Nails",
    items: [
      "Manicures",
      "Pedicures",
      "Nail art",
      "Gel polish",
      "Nail extensions",
    ],
  },
  {
    icon: BridalIcon,
    category: "Bridal & Event Makeup",
    items: [
      "Pre-bridal packages",
      "Bridal makeovers",
      "Engagement & event makeup",
      "Saree draping",
      "Family makeover packages",
    ],
  },
  {
    icon: SpaIcon,
    category: "Spa & Wellness",
    items: [
      "Scalp & head massage",
      "Body massage",
      "Relaxation therapies",
    ],
  },
  {
    icon: PiercingIcon,
    category: "Extras",
    items: [
      "Ear piercing",
      "Threading",
    ],
  },
  {
    icon: AcademyIcon,
    category: "Academy & Training",
    items: [
      "Hands-on hairstyling training",
      "Beauty & skincare courses",
      "Bridal makeup training",
    ],
    note: "Interested in learning with us? Get in touch and we'll walk you through current availability.",
    ctaLabel: "Enquire About Training",
    ctaHref: "/contact?tab=training",
  },
];

export function ServicesContent() {
  return (
    <div className="pt-[72px]">
      {/* Page header */}
      <section className="surface-sand py-16 lg:py-20" id="services-header">
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow">What we offer</span>
            <h1 className="mb-4">Our Services</h1>
            <p className="lead">
              Professional hair, beauty, grooming, and wellness services — all in a comfortable, modern space. Book any service via WhatsApp.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Service categories */}
      <section className="section surface-ivory" id="services-list">
        <div className="container">
          <div className="space-y-16">
            {services.map((svc, index) => (
              <ScrollReveal
                key={svc.category}
                id={`svc-${svc.category.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              >
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                  {/* Category header */}
                  <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-[104px]">
                      <div className="surface-dark mb-4 flex h-12 w-12 items-center justify-center rounded-full text-accent-icon">
                        <svc.icon size={22} strokeWidth={1.4} />
                      </div>
                      <h2 className="mb-3 text-[clamp(1.5rem,1.2rem+1vw,2rem)]">{svc.category}</h2>
                      {svc.note && <p className="text-small mb-4 max-w-[34ch]">{svc.note}</p>}
                      {svc.ctaLabel && svc.ctaHref && (
                        <Link href={svc.ctaHref} className="btn btn-amber btn-sm">
                          {svc.ctaLabel}
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Items */}
                  <div className="lg:col-span-8">
                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {svc.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 rounded-[var(--radius)] border border-rule p-4 transition-colors duration-200 hover:border-amber-deep hover:bg-sand"
                        >
                          <span className="mt-[0.6rem] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-deep" />
                          <span className="text-small text-ink">{item}</span>
                        </li>
                      ))}
                    </ul>
                    {!svc.note && (
                      <div className="mt-5">
                        <Link
                          href="/contact"
                          className="text-small inline-flex items-center gap-1 font-semibold text-accent-text transition-colors hover:text-ink"
                        >
                          Book this service <ChevronRightIcon size={16} />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {index < services.length - 1 && <hr className="divider mt-16" />}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="surface-dark py-20" id="services-cta">
        <div className="container text-center">
          <ScrollReveal>
            <h2 className="mb-4">Not Sure What You Need?</h2>
            <p className="mx-auto mb-9 max-w-md">
              Send us a message and our team will recommend the right service for you.
            </p>
            <Link href="/contact" className="btn btn-amber" id="services-book-cta">
              Get in Touch
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
