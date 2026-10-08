"use client";

import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  ScissorsIcon,
  BeautyCareIcon,
  GroomingIcon,
  NailsIcon,
  SpaIcon,
  BridalIcon,
  AcademyIcon,
  StarIcon,
  StarHalfIcon,
  GoogleIcon,
  ChevronRightIcon,
  InstagramIcon,
  PhoneIcon,
} from "@/components/Icons";
import { HeroSection } from "@/components/HeroSection";
import { InstagramCarousel } from "@/components/InstagramCarousel";
import { serviceAnchor, serviceSlug } from "@/lib/service-slugs";

/* ═══ Service teaser data ═══ */
const serviceCategories = [
  {
    icon: ScissorsIcon,
    title: "Hair Care & Styling",
    desc: "Precision haircuts, coloring, highlights, keratin treatments, smoothening, and damage repair.",
  },
  {
    icon: BeautyCareIcon,
    title: "Skin & Facials",
    desc: "Cleanups, glow facials, anti-tan treatments, and skin-type-specific facial packs.",
  },
  {
    icon: GroomingIcon,
    title: "Grooming & Waxing",
    desc: "Eyebrow threading, body waxing, beard grooming, and traditional shaves.",
  },
  {
    icon: NailsIcon,
    title: "Nails",
    desc: "Manicures, pedicures, nail art, gel polish, and extensions.",
  },
  {
    icon: BridalIcon,
    title: "Bridal & Event Makeup",
    desc: "Pre-bridal packages, bridal makeovers, engagement makeup, and saree draping.",
  },
  {
    icon: SpaIcon,
    title: "Spa & Wellness",
    desc: "Scalp massage, body massage, and relaxation therapies to recharge.",
  },
];

function Stars({ size }: { size: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-accent-icon" role="img" aria-label="4.5 out of 5 stars">
      {[...Array(4)].map((_, i) => (
        <StarIcon key={i} size={size} />
      ))}
      <StarHalfIcon size={size} />
    </span>
  );
}

/* ═══ Rating Component ═══ */
function RatingBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} id="rating-badge">
      <GoogleIcon size={26} />
      <div>
        <div className="flex items-center gap-2">
          <span className="font-serif text-[1.375rem] font-semibold leading-none text-ink">4.5</span>
          <Stars size={16} />
        </div>
        <span className="text-small text-muted">500+ Google reviews</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <HeroSection />

      {/* ═══ SERVICES TEASER ═══ */}
      <section className="section surface-ivory" id="services-section">
        <div className="container">
          <ScrollReveal className="section-head">
            <span className="eyebrow">What we offer</span>
            <h2 className="mb-4">Our Services</h2>
            <p className="lead">
              From expert haircuts to complete bridal makeovers — everything you need under one roof.
            </p>
          </ScrollReveal>

          <ScrollReveal stagger={0.1} staggerSelector=".service-card">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {serviceCategories.map((svc) => (
                <Link
                  href={serviceAnchor(svc.title)}
                  key={svc.title}
                  className="service-card card card-link group flex flex-col"
                  id={`service-card-${serviceSlug(svc.title)}`}
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line-on-dark)] text-accent-icon">
                    <svc.icon size={24} strokeWidth={1.4} />
                  </div>
                  <h3 className="mb-2">{svc.title}</h3>
                  <p className="text-small mb-5">{svc.desc}</p>
                  <span className="text-small mt-auto inline-flex items-center gap-1 font-semibold text-accent-text">
                    Learn more <ChevronRightIcon size={16} />
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-12 text-center">
              <Link href="/services" className="btn btn-secondary" id="services-view-all">
                View All Services
                <ChevronRightIcon size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ ABOUT TEASER ═══ */}
      <section className="section surface-sand" id="about-section">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Photo */}
            <ScrollReveal className="lg:col-span-5">
              <div className="relative mx-auto max-w-[420px] lg:max-w-none">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)]">
                  <Image
                    src="/story-salon.jpg"
                    alt="Two styling stations with mirrors and black chairs in the V My Fair salon"
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <div className="surface-dark absolute -bottom-5 right-4 rounded-[var(--radius)] px-6 py-4 sm:right-[-1rem]">
                  <span className="block font-serif text-[2.5rem] font-semibold leading-none text-accent-text">8+</span>
                  <span className="text-small text-fg-muted">Years of trust</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Text */}
            <ScrollReveal className="lg:col-span-7" delay={0.2}>
              <span className="eyebrow">Our story</span>
              <h2 className="mb-6">
                A Neighborhood Institution
                <span className="accent block">Since 2016</span>
              </h2>
              <div className="mb-8 max-w-[60ch] space-y-4">
                <p>
                  What started as a small salon in Chanda Nagar has grown into a trusted name across Ashok Nagar and beyond. V My Fair brings together professional styling, beauty treatments, and hands-on training under one roof — built on a simple belief that everyone deserves to look and feel their best.
                </p>
                <p>
                  With over 500 happy clients leaving 4.5-star reviews and a growing academy training the next generation of stylists, we&apos;re more than just a salon — we&apos;re part of the community.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
                <Link href="/about" className="btn btn-primary" id="about-learn-more">
                  Learn More
                  <ChevronRightIcon size={18} />
                </Link>
                <RatingBadge />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS HIGHLIGHT ═══ */}
      <section className="section surface-ivory" id="reviews-section">
        <div className="container text-center">
          <ScrollReveal className="section-head mb-0">
            <span className="eyebrow">What our clients say</span>
            <h2 className="mb-4">Rated by Real People</h2>
            <p className="mx-auto mb-10 max-w-[32rem]">
              Our clients speak for us. Check out our reviews on Google.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mx-auto max-w-lg">
              <div className="card-light rounded-[var(--radius-lg)] p-8 text-center sm:p-10" id="reviews-badge">
                <GoogleIcon size={40} className="mx-auto mb-4" />
                <p className="mb-2 font-serif text-[3.5rem] font-semibold leading-none text-ink">4.5</p>
                <div className="mb-3 flex justify-center">
                  <Stars size={26} />
                </div>
                <p className="mb-7">Based on 500+ Google reviews</p>
                <a
                  href="https://www.google.com/maps/search/V+My+Fair+Unisex+Salon+Chanda+Nagar+Hyderabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  id="reviews-google-link"
                >
                  Read Reviews on Google
                  <ChevronRightIcon size={18} />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ INSTAGRAM SECTION ═══ */}
      <section className="section surface-sand overflow-hidden" id="instagram-section">
        <div className="container">
          <ScrollReveal className="section-head text-center">
            <span className="eyebrow">Follow us on Instagram</span>
            <h2 className="mb-4">Real Results, Real Clients</h2>
            <a
              href="https://instagram.com/vmyfairunisexsalonspa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[1.0625rem] font-medium text-ink link"
            >
              <InstagramIcon size={20} />
              @vmyfairunisexsalonspa
            </a>
          </ScrollReveal>
        </div>

        <div className="w-full">
          <InstagramCarousel />
        </div>
      </section>

      {/* ═══ ACADEMY TEASER ═══ */}
      <section className="section surface-dark" id="academy-section">
        <div className="container">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--line-on-dark)] text-accent-icon">
              <AcademyIcon size={26} strokeWidth={1.4} />
            </div>
            <span className="eyebrow">Learn with us</span>
            <h2 className="mb-6">Academy &amp; Training</h2>
            <p className="mx-auto mb-9 max-w-[52ch]">
              V My Fair also runs hands-on training for aspiring hairstylists and beauticians. Interested in learning with us? Get in touch and we&apos;ll walk you through current availability.
            </p>
            <Link href="/contact?tab=training" className="btn btn-amber" id="academy-enquire-btn">
              Enquire About Training
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="surface-dark surface-raised py-20 border-t border-[var(--line-on-dark)]" id="cta-section">
        <div className="container text-center">
          <ScrollReveal>
            <h2 className="mb-4">Ready to Look Your Best?</h2>
            <p className="mx-auto mb-9 max-w-md text-balance">
              Book your appointment today and experience the V My Fair difference.
            </p>
            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <Link href="/contact" className="btn btn-amber" id="cta-book-btn">
                Book Appointment
              </Link>
              <a
                href="tel:+918247458328"
                className="inline-flex items-center gap-2 text-[1.0625rem] font-medium text-fg link"
                id="cta-call-btn"
              >
                <PhoneIcon size={20} /> Call +91 82474 58328
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
