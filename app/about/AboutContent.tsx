"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  StarIcon,
  StarHalfIcon,
  GoogleIcon,
  ScissorsIcon,
  AcademyIcon,
  BeautyCareIcon,
  ChevronRightIcon,
} from "@/components/Icons";

const values = [
  {
    icon: ScissorsIcon,
    title: "Expert Craft",
    desc: "Every cut, colour, and treatment is delivered by trained professionals who take their craft seriously.",
  },
  {
    icon: BeautyCareIcon,
    title: "Personal Touch",
    desc: "We listen first. Your look should reflect who you are, not a one-size-fits-all approach.",
  },
  {
    icon: AcademyIcon,
    title: "Growing Together",
    desc: "Our academy trains the next generation of stylists, keeping our team sharp and our skills current.",
  },
];

const milestones = [
  { year: "2016", event: "V My Fair opens its first branch in Chanda Nagar, Hyderabad" },
  { year: "2018", event: "Academy program launches — first batch of aspiring stylists begins training" },
  { year: "2020", event: "Flagship location opens at Ashok Nagar Main Road, Shoba Complex" },
  { year: "2023", event: "Reaches 500+ Google reviews with a 4.5-star rating" },
  { year: "Today", event: "Two branches, a thriving academy, and a growing community of happy clients" },
];

const stats = [
  { value: "8+", label: "Years" },
  { value: "2", label: "Branches" },
  { value: "500+", label: "Reviews" },
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

export function AboutContent() {
  return (
    <div className="pt-[72px]">
      {/* Header */}
      <section className="surface-sand py-16 lg:py-20" id="about-header">
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow">Our story</span>
            <h1 className="mb-4">About V My Fair</h1>
            <p className="lead">
              A neighborhood salon built on trust, craftsmanship, and the belief that everyone deserves to look and feel their best.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="section surface-ivory" id="about-story">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <ScrollReveal>
              <h2 className="mb-6">
                From a Small Salon to a
                <span className="block italic font-medium">Community Institution</span>
              </h2>
              <div className="max-w-[60ch] space-y-4">
                <p>
                  V My Fair started in 2016 with a straightforward idea: bring professional-grade salon services to the Chanda Nagar and Ashok Nagar neighborhoods without the pretense or premium pricing of high-end chains.
                </p>
                <p>
                  The name says it all — &quot;My Fair&quot; isn&apos;t just about appearances. It&apos;s about fairness in how we treat every client who walks through our doors, regardless of whether they&apos;re here for a quick trim or a complete bridal makeover.
                </p>
                <p>
                  Today, V My Fair operates from a flagship location at Shoba Complex on Ashok Nagar Main Road, with the original Chanda Nagar branch continuing to serve the neighborhood where it all began. The addition of a hands-on academy means we&apos;re not just serving clients — we&apos;re training the next generation of professionals.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                {/* Stats */}
                <div className="card">
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-8 text-center">
                    {stats.map((s, i) => (
                      <div key={s.label}>
                        <dd className={`font-serif text-[2.5rem] font-semibold leading-none ${i === 0 ? "text-accent-text" : "text-fg"}`}>
                          {s.value}
                        </dd>
                        <dt className="text-small mt-2 text-fg-muted">{s.label}</dt>
                      </div>
                    ))}
                    <div>
                      <dd className="flex justify-center text-accent-icon">
                        <Stars size={20} />
                      </dd>
                      <dt className="text-small mt-3 text-fg-muted">Rating</dt>
                    </div>
                  </dl>
                </div>

                {/* Google rating */}
                <div className="card-light flex items-center gap-4 p-6">
                  <GoogleIcon size={34} />
                  <div>
                    <Stars size={16} />
                    <p className="text-small mt-1">4.5 rating · 500+ reviews on Google</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section surface-sand" id="about-values">
        <div className="container">
          <ScrollReveal className="section-head text-center">
            <span className="eyebrow">What we stand for</span>
            <h2>Our Approach</h2>
          </ScrollReveal>

          <ScrollReveal stagger={0.12} staggerSelector=".value-card">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {values.map((val) => (
                <div key={val.title} className="value-card card text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--line-on-dark)] text-accent-icon">
                    <val.icon size={24} strokeWidth={1.4} />
                  </div>
                  <h3 className="mb-3">{val.title}</h3>
                  <p className="text-small">{val.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="section surface-ivory" id="about-timeline">
        <div className="container">
          <ScrollReveal className="section-head text-center">
            <span className="eyebrow">Our journey</span>
            <h2>Milestones</h2>
          </ScrollReveal>

          <div className="mx-auto max-w-2xl">
            <ScrollReveal stagger={0.1} staggerSelector=".timeline-item">
              {milestones.map((ms, i) => (
                <div key={ms.year} className="timeline-item relative flex gap-6 pb-10 last:pb-0">
                  {i < milestones.length - 1 && (
                    <div className="absolute left-[23px] top-6 bottom-0 w-px bg-rule" />
                  )}
                  <div className="flex w-[48px] flex-shrink-0 justify-center">
                    <div className={`mt-2 h-3 w-3 rounded-full ${ms.year === "Today" ? "bg-gold-deep" : "bg-ink"}`} />
                  </div>
                  <div>
                    <span className="mb-1 block font-serif text-[1.375rem] font-semibold leading-tight text-ink">
                      {ms.year}
                    </span>
                    <p>{ms.event}</p>
                  </div>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="surface-dark py-20" id="about-cta">
        <div className="container text-center">
          <ScrollReveal>
            <h2 className="mb-4">Come See Us</h2>
            <p className="mx-auto mb-9 max-w-md">
              Whether it&apos;s your first visit or your fiftieth — we&apos;re glad you&apos;re here.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn btn-gold" id="about-book-cta">
                Book Appointment
              </Link>
              <Link href="/services" className="btn btn-secondary">
                View Services
                <ChevronRightIcon size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
