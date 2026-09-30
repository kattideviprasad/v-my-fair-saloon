"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, CloseIcon } from "./Icons";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Solid ivory bar: the logo artwork is dark, so it always needs a light ground */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-ivory transition-shadow duration-200 ${
          scrolled ? "shadow-[0_1px_0_var(--line)]" : ""
        }`}
        id="site-header"
      >
        <div className="container flex items-center justify-between h-[72px]">
          <Link href="/" className="relative z-10 flex-shrink-0 flex items-center h-full" id="nav-logo">
            <Image
              src="/logo-trim.png"
              alt="V My Fair Unisex Salon & Academy"
              width={520}
              height={427}
              className="h-[56px] w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" id="nav-desktop" aria-label="Main">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-small font-medium py-2 border-b-2 transition-colors duration-200 ${
                    active
                      ? "text-accent-text border-gold-deep"
                      : "text-ink border-transparent hover:text-accent-text"
                  }`}
                  id={`nav-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex btn btn-primary btn-sm"
            id="nav-book-btn"
          >
            Book Appointment
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-10 p-2 -mr-2 text-ink"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            id="nav-hamburger"
          >
            {isOpen ? <CloseIcon size={26} /> : <MenuIcon size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-espresso/60 md:hidden"
            onClick={() => setIsOpen(false)}
            id="mobile-overlay"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[45] w-[300px] max-w-[86vw] bg-ivory shadow-[-8px_0_32px_color-mix(in_srgb,var(--espresso)_25%,transparent)] md:hidden flex flex-col"
            id="mobile-menu"
            aria-label="Mobile"
          >
            <div className="h-[72px] flex items-center px-6" />

            <div className="flex-1 flex flex-col px-6 pt-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className={`block py-3.5 text-[1.125rem] font-medium border-b border-rule ${
                      pathname === link.href ? "text-accent-text" : "text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="p-6">
              <Link href="/contact" className="btn btn-primary w-full">
                Book Appointment
              </Link>
              <div className="mt-4 text-center">
                <a href="tel:+918247458328" className="text-small text-muted hover:text-accent-text transition-colors">
                  +91 82474 58328
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
