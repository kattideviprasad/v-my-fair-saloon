"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  staggerSelector?: string;
  id?: string;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  y = 30,
  stagger,
  staggerSelector,
  id,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No hidden start state for people who asked for less motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // The context reverts every tween and ScrollTrigger on cleanup and restores inline styles,
    // so nothing can be left stuck at opacity 0 (React strict mode mounts effects twice in dev)
    const ctx = gsap.context(() => {
      const targets = stagger && staggerSelector ? el.querySelectorAll(staggerSelector) : el;
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger: stagger && staggerSelector ? stagger : 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, duration, y, stagger, staggerSelector]);

  return (
    <div ref={ref} className={className} id={id}>
      {children}
    </div>
  );
}
