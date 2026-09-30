import Link from "next/link";
import Image from "next/image";
import { PhoneIcon, ClockIcon, MapPinIcon, InstagramIcon } from "./Icons";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "Hair Care & Styling",
  "Skin & Facials",
  "Grooming & Waxing",
  "Nails",
  "Bridal & Event Makeup",
  "Spa & Wellness",
];

const footerLink =
  "text-small text-fg-muted hover:text-gold transition-colors duration-200";

export function Footer() {
  return (
    <footer className="surface-dark border-t border-[var(--line-on-dark)]" id="site-footer">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand */}
          <div>
            <div className="mb-6 inline-flex items-center justify-center rounded-lg bg-on-dark p-3">
              <Image
                src="/logo-trim.png"
                alt="V My Fair Unisex Salon & Academy"
                width={520}
                height={427}
                className="h-[64px] w-auto object-contain"
              />
            </div>
            <h3 className="mb-3">V My Fair</h3>
            <p className="text-small mb-5">
              Professional hair, beauty, and grooming services in a comfortable, modern space. Serving Hyderabad since 2016.
            </p>
            <p className="font-serif text-[1.0625rem] italic text-accent-text">
              More than a salon · it&apos;s a better you
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5">Quick links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-5">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link href="/services" className={footerLink}>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-5">Visit us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPinIcon size={18} className="mt-1 flex-shrink-0 text-accent-icon" />
                <p className="text-small">
                  1st Floor, Shoba Complex, 23-61/A,
                  <br />Ashok Nagar Main Rd, Chanda Nagar,
                  <br />Hyderabad, Telangana 502032
                </p>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon size={18} className="flex-shrink-0 text-accent-icon" />
                <a href="tel:+918247458328" className={footerLink}>
                  +91 82474 58328
                </a>
              </li>
              <li className="flex items-center gap-3">
                <ClockIcon size={18} className="flex-shrink-0 text-accent-icon" />
                <span className="text-small text-fg-muted">Open daily · 7:30 AM – 9:30 PM</span>
              </li>
              <li className="flex items-center gap-3">
                <InstagramIcon size={18} className="flex-shrink-0 text-accent-icon" />
                <a
                  href="https://instagram.com/vmyfairunisexsalonspa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLink}
                >
                  @vmyfairunisexsalonspa
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--line-on-dark)]">
        <div className="container flex flex-col-reverse items-start justify-between gap-5 py-7 md:flex-row md:items-center">
          <p className="text-small">
            © 2016–{new Date().getFullYear()} V My Fair Unisex Salon & Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <a
              href="https://instagram.com/vmyfairunisexsalonspa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full text-fg-muted transition-colors hover:text-gold"
              aria-label="Instagram"
            >
              <InstagramIcon size={20} />
            </a>
            <a
              href="tel:+918247458328"
              className="flex h-11 w-11 items-center justify-center rounded-full text-fg-muted transition-colors hover:text-gold"
              aria-label="Phone"
            >
              <PhoneIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
