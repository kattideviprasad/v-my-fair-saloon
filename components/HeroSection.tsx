import Link from "next/link";
import Image from "next/image";
import {
  ScissorsIcon,
  HairTreatmentIcon,
  GroomingIcon,
  BeautyCareIcon,
  PlayIcon,
} from "./Icons";

const heroIcons = [
  { Icon: ScissorsIcon, label: "Haircuts" },
  { Icon: HairTreatmentIcon, label: "Hair Treatments" },
  { Icon: GroomingIcon, label: "Grooming" },
  { Icon: BeautyCareIcon, label: "Beauty Care" },
];

export function HeroSection() {
  return (
    <section className="surface-dark pt-[72px]" id="hero">
      {/* Photo + copy */}
      <div className="relative isolate overflow-hidden">
        {/* Photo: bottom band on phones, right ~64% on desktop */}
        <div className="absolute inset-x-0 bottom-0 h-[260px] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-auto lg:w-[64%] -z-20">
          <Image
            src="/hero-salon.jpg"
            alt="Styling stations with black chairs and mirrors against a blue wall at V My Fair salon"
            fill
            priority
            sizes="(min-width: 1024px) 64vw, 100vw"
            className="object-cover object-[50%_60%] lg:object-[60%_55%]"
          />
        </div>
        <div className="hero-scrim absolute inset-0 -z-10" aria-hidden="true" />

        <div className="container flex items-start lg:min-h-[640px] lg:items-center">
          <div className="max-w-[36rem] pt-14 pb-[300px] lg:py-24">
            <p className="eyebrow">Look good · Feel great</p>

            <h1 className="hero-title mb-6">
              Your Style
              <span className="block italic font-medium">Our Expertise</span>
            </h1>

            <p className="lead mb-10">
              Professional hair, beauty and grooming services in a comfortable, modern space.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/contact" className="btn btn-gold btn-lg" id="hero-book-btn">
                Book Appointment
              </Link>
              <Link href="/gallery" className="btn btn-secondary btn-lg" id="hero-tour-btn">
                <PlayIcon size={14} />
                Take a Tour
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Service bar: sits below the photo, never on top of it */}
      <div className="surface-raised border-t border-[var(--line-on-dark)]">
        <div className="container flex flex-col gap-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:py-7">
          <p className="font-serif text-[1.125rem] italic">
            More than a salon · it&apos;s a better you
          </p>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4 lg:gap-x-12">
            {heroIcons.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-[var(--line-on-dark)] text-accent-icon">
                  <Icon size={20} strokeWidth={1.4} />
                </span>
                <span className="text-small font-medium text-fg">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
