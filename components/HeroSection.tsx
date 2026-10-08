"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { entryPath } from "@/lib/session-entry";

// Registered once, at module level
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const INTRO_KEY = "vmf-hero-intro-played";

/** Play only when the visitor landed on "/", and only once per browser session. */
function shouldPlayIntro(): boolean {
  if (entryPath !== "/") return false; // arrived on another page and clicked Home: no intro
  try {
    if (sessionStorage.getItem(INTRO_KEY)) return false;
  } catch {
    /* storage blocked: fall through and play */
  }
  return true;
}

function markIntroPlayed() {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function HeroSection() {
  const root = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const el = root.current;
      const title = titleRef.current;
      if (!el || !title || !contextSafe) return;

      const q = gsap.utils.selector(el);
      const led = document.querySelector<HTMLElement>("[data-site-led]");
      const mm = gsap.matchMedia();

      // Positions depend on fonts and images: re-measure once they are in
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh);

      /* ── Everything that moves, only when motion is welcome ── */
      mm.add("(prefers-reduced-motion: no-preference)", (_ctx, safe) => {
        if (!safe) return; // contextSafe is always passed by matchMedia; narrows the type
        let cancelled = false; // set on cleanup so a late font promise cannot start the split

        // Gentle scroll drift: the mirrors move at different speeds as the hero scrolls away
        const drift = { trigger: el, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q(".layer-a"), { y: -32, ease: "none", scrollTrigger: drift });
        gsap.to(q(".layer-b"), { y: -80, ease: "none", scrollTrigger: drift });

        // Glint: a soft highlight sweeping across the glass
        const sweep = (mirror: Element) => {
          const glint = mirror.querySelector(".hero-glint");
          if (!glint || gsap.getTweensOf(glint).some((t) => t.isActive())) return;
          gsap.fromTo(
            glint,
            { xPercent: 0 },
            { xPercent: 380, duration: 1.5, ease: "power2.inOut" }
          );
        };

        const mirrors = q(".hero-mirror");
        const onEnter = safe((e: Event) => sweep(e.currentTarget as Element)) as EventListener;
        mirrors.forEach((m) => m.addEventListener("pointerenter", onEnter));

        /* ── The lights-on intro ── */
        if (shouldPlayIntro()) {
          const dim = q(".hero-dim");
          const spill = q(".hero-spill");
          const copy = q(".hero-eyebrow, .hero-tag, .hero-lede");
          const buttons = q(".hero-cta .hbtn");
          const facts = q(".hero-facts > div");
          const frames = q(".hero-mirror");
          const photos = q(".hero-glass img");
          const glints = q(".hero-glint");

          gsap.set(dim, { autoAlpha: 0.94 });
          gsap.set(spill, { autoAlpha: 0 });
          if (led) gsap.set(led, { scaleX: 0, transformOrigin: "50% 50%" });
          gsap.set([...copy, ...buttons, ...facts], { autoAlpha: 0, y: 16 });
          gsap.set(frames, { autoAlpha: 0, y: 56 });
          gsap.set(photos, { scale: 1.12 });
          gsap.set(glints, { skewX: -16 });
          gsap.set(title, { autoAlpha: 0 }); // revealed by the split below

          // Headline: each line rises out of its own mask. The first split waits for the fonts
          // (the title stays hidden until then, so wrong line breaks are never seen); autoSplit
          // re-splits on resize or a late font swap, and returning the tween keeps it in sync.
          const splitTitle = safe(() => {
            if (cancelled) return;
            SplitText.create(title, {
              type: "lines",
              mask: "lines",
              linesClass: "hero-line",
              autoSplit: true,
              onSplit(self) {
                gsap.set(title, { autoAlpha: 1 });
                return gsap.from(self.lines, {
                  yPercent: 115,
                  duration: 0.95,
                  stagger: 0.09,
                  ease: "power3.out",
                  delay: 0.5,
                });
              },
            });
          }) as () => void;

          if (document.fonts) {
            // Ask for exactly the faces the headline uses (Medium, plus the italic accent), then
            // wait for every pending font
            const family = getComputedStyle(title).fontFamily;
            Promise.all([
              document.fonts.load(`500 1em ${family}`),
              document.fonts.load(`italic 400 1em ${family}`),
              document.fonts.ready,
            ]).then(splitTitle, splitTitle);
          } else {
            splitTitle();
          }

          const settle = () => {
            gsap.set([title, ...copy, ...buttons, ...facts, ...frames, ...spill, ...dim], {
              clearProps: "opacity,visibility,transform",
            });
            gsap.set(photos, { clearProps: "transform" });
            if (led) gsap.set(led, { clearProps: "transform" });
            markIntroPlayed();
          };

          // Failsafe: whatever happens, the finished state is on screen after 5s
          const failsafe = gsap.delayedCall(5, settle);

          gsap
            .timeline({
              defaults: { ease: "power3.out" },
              onComplete: () => {
                failsafe.kill();
                settle();
              },
            })
            .to(led ?? {}, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, 0)
            .to(spill, { autoAlpha: 1, duration: 0.9, ease: "power1.out" }, 0.3)
            .to(dim, { autoAlpha: 0, duration: 1, ease: "power1.inOut" }, 0.1)
            .to(copy, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.95)
            .to(buttons, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07 }, 1.15)
            .to(facts, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07 }, 1.3)
            // The mirrors hold the page's largest image, so they start rising early (under the
            // dimmed overlay) to keep Largest Contentful Paint fast
            .to(frames, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.14 }, 0.15)
            .to(photos, { scale: 1, duration: 1.8, ease: "power2.out", stagger: 0.14 }, 0.15)
            .add(() => mirrors.forEach((m, i) => gsap.delayedCall(i * 0.3, () => sweep(m))), 1.7);
        }

        return () => {
          cancelled = true;
          mirrors.forEach((m) => m.removeEventListener("pointerenter", onEnter));
        };
      });

      /* ── Pointer parallax: mouse and trackpad only ── */
      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        (_ctx, safe) => {
          if (!safe) return;
          const opts = { duration: 0.9, ease: "power3.out" };
          const a = q(".pw-a")[0];
          const b = q(".pw-b")[0];
          const ax = gsap.quickTo(a, "x", opts);
          const ay = gsap.quickTo(a, "y", opts);
          const bx = gsap.quickTo(b, "x", opts);
          const by = gsap.quickTo(b, "y", opts);

          const onMove = safe((e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const nx = (e.clientX - r.left) / r.width - 0.5;
            const ny = (e.clientY - r.top) / r.height - 0.5;
            ax(nx * -14);
            ay(ny * -10);
            bx(nx * -26);
            by(ny * -18);
          }) as (e: PointerEvent) => void;
          const onLeave = safe(() => {
            ax(0);
            ay(0);
            bx(0);
            by(0);
          }) as () => void;

          el.addEventListener("pointermove", onMove, { passive: true });
          el.addEventListener("pointerleave", onLeave);
          return () => {
            el.removeEventListener("pointermove", onMove);
            el.removeEventListener("pointerleave", onLeave);
          };
        }
      );

      return () => {
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} className="hero-v2" id="hero" aria-labelledby="hero-title">
      <div className="hero-spill" aria-hidden="true" />

      <div className="hero-wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow">V My Fair · Unisex Salon &amp; Academy</p>
          <h1 ref={titleRef} id="hero-title" className="hero-title-v2">
            {/* nowrap keeps "&" at the end of line two (SplitText breaks on a non-breaking space) */}
            Chanda Nagar&rsquo;s unisex <span className="whitespace-nowrap">salon &amp;</span>{" "}
            <em className="hero-accent">academy.</em>
          </h1>
          <p className="hero-tag">It&apos;s a better you.</p>
          <p className="hero-lede">
            Haircuts, color, skin, grooming, nails and bridal makeup under one roof, plus hands-on
            training for new stylists on request.
          </p>

          <div className="hero-cta">
            <Link href="/contact" className="hbtn hbtn-primary" id="hero-book-btn">
              Book appointment
            </Link>
            <Link href="/services" className="hbtn hbtn-ghost" id="hero-services-btn">
              View services
            </Link>
          </div>

          <dl className="hero-facts">
            <div>
              <dt>
                4.5
                <svg className="hero-star" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
                  <path
                    d="M10 1.5l2.5 5.6 6.1.6-4.6 4.1 1.3 6L10 14.8l-5.3 3 1.3-6L1.4 7.7l6.1-.6z"
                    fill="currentColor"
                  />
                </svg>
                <span className="sr-only"> stars</span>
              </dt>
              <dd>500+ Google reviews</dd>
            </div>
            <div>
              <dt>Since 2016</dt>
              <dd>Chanda Nagar, Hyderabad</dd>
            </div>
            <div>
              <dt>Open daily</dt>
              <dd>7:30 am to 9:30 pm</dd>
            </div>
          </dl>
        </div>

        <div className="hero-stage">
          <div className="hero-layer layer-a">
            <div className="pw-a">
              <figure className="hero-mirror hero-mirror-a">
                <div className="hero-glass">
                  <Image
                    src="/images/hero/mirror-a.jpg"
                    width={816}
                    height={1020}
                    loading="eager"
                    fetchPriority="high"
                    sizes="(min-width: 980px) 22vw, (min-width: 640px) 330px, 56vw"
                    alt="Two styling stations with black chairs and wall mirrors at V My Fair, with a client in a pink cape"
                  />
                  <span className="hero-gloss" aria-hidden="true">
                    <span className="hero-glint" />
                  </span>
                </div>
              </figure>
            </div>
          </div>

          <div className="hero-layer layer-b">
            <div className="pw-b">
              <figure className="hero-mirror hero-mirror-b">
                <div className="hero-glass">
                  <Image
                    src="/images/hero/mirror-b.jpg"
                    width={1180}
                    height={886}
                    loading="eager"
                    sizes="(min-width: 980px) 24vw, (min-width: 640px) 340px, 58vw"
                    alt="Styling stations under warm ceiling lights with blue and teal walls at V My Fair"
                  />
                  <span className="hero-gloss" aria-hidden="true">
                    <span className="hero-glint" />
                  </span>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-dim" aria-hidden="true" />
    </section>
  );
}
