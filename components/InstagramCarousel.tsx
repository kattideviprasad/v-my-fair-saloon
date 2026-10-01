"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, InstagramIcon } from "./Icons";
import { reels, reelThumbs } from "@/lib/reels";

const PROFILE_URL = "https://instagram.com/vmyfairunisexsalonspa";
const PROFILE_HANDLE = "@vmyfairunisexsalonspa";

const tileSize =
  "relative flex-none w-[56vw] sm:w-[34vw] lg:w-[15vw] aspect-[9/16] snap-start shrink-0 overflow-hidden rounded-xl";

/** A reel tile: one link to its own reel, shown only when a real thumbnail exists for it. */
function ReelTile({ reel, thumb }: { reel: (typeof reels)[number]; thumb: { src: string; width: number; height: number } }) {
  return (
    <a
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch reel ${reel.id} on Instagram, opens in new tab`}
      className={`${tileSize} group card p-0 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-16px_color-mix(in_srgb,var(--navy)_60%,transparent)] active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-deep`}
    >
      <Image
        src={thumb.src}
        width={thumb.width}
        height={thumb.height}
        alt={`Cover image for Instagram reel ${reel.id}`}
        loading="lazy"
        sizes="(min-width: 1024px) 15vw, (min-width: 640px) 34vw, 56vw"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      {/* Play badge */}
      <span
        aria-hidden="true"
        className="absolute right-3 bottom-3 flex h-11 w-11 items-center justify-center rounded-full bg-navy/75 text-on-dark transition-colors group-hover:bg-amber group-hover:text-navy"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M8 5.5v13l11-6.5z" />
        </svg>
      </span>
    </a>
  );
}

/** Link to the salon's Instagram profile. Shown on its own until real reel thumbnails exist. */
function FollowCard({ tile = false }: { tile?: boolean }) {
  return (
    <a
      href={PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      id="instagram-follow-card"
      className={`card card-link group flex flex-col items-center justify-center gap-5 text-center ${
        tile ? `${tileSize} p-6` : "mx-auto w-full max-w-xl px-8 py-12"
      }`}
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--line-on-dark)] text-accent-icon transition-colors group-hover:border-amber">
        <InstagramIcon size={30} strokeWidth={1.4} />
      </span>
      <span className="font-serif text-[clamp(1.375rem,1.1rem+1vw,1.75rem)] leading-snug font-semibold text-fg">
        Follow {PROFILE_HANDLE} on Instagram
      </span>
      <span className="text-small inline-flex items-center gap-1 font-semibold text-accent-text">
        Open Instagram <ChevronRightIcon size={16} />
        <span className="sr-only"> (opens in new tab)</span>
      </span>
    </a>
  );
}

export function InstagramCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reels that have a real thumbnail (lib/reel-thumbs.json, written by scripts/make-reel-thumbs.mjs)
  const withThumbs = reels.flatMap((reel) => {
    const thumb = reelThumbs[String(reel.id)];
    return thumb ? [{ reel, thumb }] : [];
  });

  // No thumbnails yet: one clean follow card instead of a row of empty tiles
  if (withThumbs.length === 0) {
    return (
      <div className="container">
        <FollowCard />
      </div>
    );
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = window.innerWidth > 1024 ? window.innerWidth * 0.5 : window.innerWidth * 0.8;
      scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  const arrow =
    "absolute top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ivory text-ink shadow-[0_2px_12px_color-mix(in_srgb,var(--navy)_25%,transparent)] transition-[color,background-color,transform] hover:bg-navy hover:text-amber active:scale-95 sm:flex";

  return (
    <div className="relative w-full max-w-full overflow-hidden py-4">
      <button onClick={() => scroll("left")} className={`${arrow} left-4`} aria-label="Scroll reels left">
        <ChevronLeftIcon size={24} />
      </button>

      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 sm:scroll-px-[88px] sm:px-[88px]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {withThumbs.map(({ reel, thumb }) => (
          <ReelTile key={reel.id} reel={reel} thumb={thumb} />
        ))}
        <FollowCard tile />
      </div>

      <button onClick={() => scroll("right")} className={`${arrow} right-4`} aria-label="Scroll reels right">
        <ChevronRightIcon size={24} />
      </button>

      <style dangerouslySetInnerHTML={{ __html: `.snap-x::-webkit-scrollbar{display:none}` }} />
    </div>
  );
}
