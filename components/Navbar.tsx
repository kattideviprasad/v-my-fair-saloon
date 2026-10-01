"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MenuIcon, CloseIcon } from "./Icons";
// Imported for its side effect: records the landing path as soon as the app loads in the browser
import "@/lib/session-entry";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const PHONE_DISPLAY = "+91 82474 58328";
const PHONE_HREF = "tel:+918247458328";

export function Navbar() {
  const pathname = usePathname();
  // The menu is "open" only for the route it was opened on, so navigating closes it with no effect needed
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;

  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const close = (returnFocus: boolean) => {
    setOpenAt(null);
    if (returnFocus) toggleRef.current?.focus();
  };

  // Lock body scroll while the menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Move focus into the menu on open; Esc closes it; Tab stays inside the menu and its toggle
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const toggle = toggleRef.current;
    if (!panel || !toggle) return;

    panel.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpenAt(null);
        toggle.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const stops = [toggle, ...Array.from(panel.querySelectorAll<HTMLElement>("a"))];
      const first = stops[0];
      const last = stops[stops.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`site-header${pathname === "/" ? " is-home" : ""}`} id="site-header">
        <div className="sh-bar">
          <Link href="/" className="sh-brand" id="nav-logo" aria-label="V My Fair Unisex Salon & Academy, home">
            <span className="sh-logo-plate">
              <Image
                src="/logo-trim.png"
                alt=""
                width={520}
                height={427}
                priority
                sizes="54px"
              />
            </span>
            <span className="sh-wordmark" aria-hidden="true">
              <b>V My Fair</b>
              <span>Unisex Salon &amp; Academy</span>
            </span>
          </Link>

          <nav className="sh-links" id="nav-desktop" aria-label="Main">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="sh-link"
                aria-current={pathname === link.href ? "page" : undefined}
                id={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="sh-end">
            <a href={PHONE_HREF} className="sh-phone" id="nav-phone">
              {PHONE_DISPLAY}
            </a>
            <Link href="/contact" className="hbtn hbtn-primary hbtn-sm" id="nav-book-btn">
              Book Appointment
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="sh-toggle"
              onClick={() => (open ? close(false) : setOpenAt(pathname))}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              id="nav-hamburger"
            >
              {open ? <CloseIcon size={26} /> : <MenuIcon size={26} />}
            </button>
          </div>
        </div>

        {/* The LED under the ceiling soffit. The hero intro grows it from the centre. */}
        <div className="site-led" data-site-led aria-hidden="true" />
      </header>

      {open && <div className="mobile-overlay" onClick={() => close(true)} aria-hidden="true" />}

      <nav
        ref={panelRef}
        className="mobile-panel"
        id="mobile-menu"
        aria-label="Mobile"
        data-open={open}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="mobile-link"
            aria-current={pathname === link.href ? "page" : undefined}
            tabIndex={open ? 0 : -1}
          >
            {link.label}
          </Link>
        ))}
        <a href={PHONE_HREF} className="mobile-phone" tabIndex={open ? 0 : -1}>
          {PHONE_DISPLAY}
        </a>
      </nav>
    </>
  );
}
