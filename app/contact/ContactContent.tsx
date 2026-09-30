"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ContactForm } from "@/components/ContactForm";
import {
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  InstagramIcon,
} from "@/components/Icons";

function ContactTabs() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "training" ? "training" : "booking";
  const [activeTab, setActiveTab] = useState<"booking" | "training">(initialTab);

  const tabClass = (active: boolean) =>
    `flex-1 min-h-[46px] rounded-[var(--radius-pill)] px-4 py-2.5 text-small font-semibold transition-colors duration-200 ${
      active ? "bg-espresso text-on-dark" : "text-muted hover:text-ink"
    }`;

  return (
    <>
      {/* Tab switcher */}
      <div className="mb-8 flex gap-1 rounded-[var(--radius-pill)] bg-sand p-1" id="contact-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === "booking"}
          onClick={() => setActiveTab("booking")}
          className={tabClass(activeTab === "booking")}
          id="tab-booking"
        >
          Book Appointment
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "training"}
          onClick={() => setActiveTab("training")}
          className={tabClass(activeTab === "training")}
          id="tab-training"
        >
          Training Enquiry
        </button>
      </div>

      {/* Form */}
      {activeTab === "booking" ? (
        <ContactForm variant="booking" />
      ) : (
        <ContactForm variant="training" />
      )}
    </>
  );
}

const infoIcon =
  "surface-dark flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-accent-icon";

export function ContactContent() {
  return (
    <div className="pt-[72px]">
      {/* Header */}
      <section className="surface-sand py-16 lg:py-20" id="contact-header">
        <div className="container">
          <ScrollReveal>
            <span className="eyebrow">Get in touch</span>
            <h1 className="mb-4">Contact &amp; Book</h1>
            <p className="lead">
              Book an appointment, enquire about training, or just drop by. We&apos;d love to hear from you.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main content */}
      <section className="section surface-ivory" id="contact-main">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Form - 3 cols */}
            <ScrollReveal className="lg:col-span-3">
              <Suspense
                fallback={
                  <div className="animate-pulse">
                    <div className="mb-8 h-12 rounded-[var(--radius-pill)] bg-sand" />
                    <div className="space-y-4">
                      <div className="h-12 rounded-[var(--radius)] bg-sand" />
                      <div className="h-12 rounded-[var(--radius)] bg-sand" />
                    </div>
                  </div>
                }
              >
                <ContactTabs />
              </Suspense>
            </ScrollReveal>

            {/* Info - 2 cols */}
            <ScrollReveal className="lg:col-span-2" delay={0.2}>
              <div className="space-y-8">
                <div className="flex gap-4" id="contact-address">
                  <div className={infoIcon}>
                    <MapPinIcon size={20} />
                  </div>
                  <div>
                    <h3 className="mb-1 text-[1.25rem]">Flagship Location</h3>
                    <p className="text-small">
                      1st Floor, Shoba Complex, 23-61/A,
                      <br />Ashok Nagar Main Rd, near Bus Stop,
                      <br />opp. Vijetha Super Market,
                      <br />Ashok Nagar, Chanda Nagar,
                      <br />Ramachandrapuram, Hyderabad,
                      <br />Telangana 502032
                    </p>
                  </div>
                </div>

                <div className="flex gap-4" id="contact-phone">
                  <div className={infoIcon}>
                    <PhoneIcon size={20} />
                  </div>
                  <div>
                    <h3 className="mb-1 text-[1.25rem]">Phone</h3>
                    <a
                      href="tel:+918247458328"
                      className="text-small text-muted underline decoration-[var(--line)] underline-offset-4 transition-colors hover:text-accent-text"
                    >
                      +91 82474 58328
                    </a>
                  </div>
                </div>

                <div className="flex gap-4" id="contact-hours">
                  <div className={infoIcon}>
                    <ClockIcon size={20} />
                  </div>
                  <div>
                    <h3 className="mb-1 text-[1.25rem]">Hours</h3>
                    <p className="text-small">
                      Open daily<br />7:30 AM – 9:30 PM
                    </p>
                  </div>
                </div>

                <div className="flex gap-4" id="contact-instagram">
                  <div className={infoIcon}>
                    <InstagramIcon size={20} />
                  </div>
                  <div>
                    <h3 className="mb-1 text-[1.25rem]">Instagram</h3>
                    <a
                      href="https://instagram.com/vmyfairunisexsalonspa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-small text-muted underline decoration-[var(--line)] underline-offset-4 transition-colors hover:text-accent-text"
                    >
                      @vmyfairunisexsalonspa
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="surface-sand" id="contact-map">
        <div className="container py-16">
          <ScrollReveal>
            <h2 className="mb-6">Find Us</h2>
            <div className="h-[400px] overflow-hidden rounded-[var(--radius-lg)] border border-rule">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.7!2d78.3189!3d17.4924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e0!2sV+My+Fair+Unisex+Salon!5e0!3m2!1sen!2sin!4v1694000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="V My Fair Salon Location"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
