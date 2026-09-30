"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon, InstagramIcon } from "./Icons";

/*
  Media flags: only reels whose files actually exist in /public/reels get a poster or video.
  The rest render a fallback tile that still links to the reel. To restore media, re-run
  public/reels/download.ps1 with fresh Instagram URLs and flip the flags below.
*/
const reels = [
  { id: 1, videoSrc: "/reels/reel-1.mp4", poster: "/reels/reel-1-poster.jpg", hasPoster: false, hasVideo: false, url: "https://www.instagram.com/reel/DZpkVC3TfC4/" },
  { id: 2, videoSrc: "/reels/reel-2.mp4", poster: "/reels/reel-2-poster.jpg", hasPoster: false, hasVideo: false, url: "https://www.instagram.com/reel/DUf-K_5E3ZS/" },
  { id: 3, videoSrc: "/reels/reel-3.mp4", poster: "/reels/reel-3-poster.jpg", hasPoster: false, hasVideo: false, url: "https://www.instagram.com/reel/Dbsw3FKTiy8/" },
  { id: 4, videoSrc: "/reels/reel-4.mp4", poster: "/reels/reel-4-poster.jpg", hasPoster: false, hasVideo: false, url: "https://www.instagram.com/reel/DRKQsX-E2eW/" },
  { id: 5, videoSrc: "/reels/reel-5.mp4", poster: "/reels/reel-5-poster.jpg", hasPoster: false, hasVideo: false, url: "https://www.instagram.com/reel/DJtPBxHIblh/" },
  { id: 6, videoSrc: "/reels/reel-6.mp4", poster: "/reels/reel-6-poster.jpg", hasPoster: false, hasVideo: false, url: "https://www.instagram.com/reel/DH-b5tixQPc/" },
  // reel-7 removed — URL was from a different account; restore once a replacement is sourced
  { id: 8, videoSrc: "/reels/reel-8.mp4", poster: "/reels/reel-8-poster.jpg", hasPoster: true, hasVideo: false, url: "https://www.instagram.com/reel/DFPcVQERoMz/" },
];

const cardSize = "relative flex-none w-[56vw] sm:w-[34vw] lg:w-[15vw] aspect-[9/16] snap-start shrink-0 rounded-xl overflow-hidden";

/** Card with no local media: still a working link to the reel. */
function FallbackCard({ reel }: { reel: (typeof reels)[0] }) {
  return (
    <a
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cardSize} card p-0 flex flex-col items-center justify-center gap-4 text-center hover:bg-espresso-raised`}
      aria-label="Watch this reel on Instagram"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--line-on-dark)] text-accent-icon">
        <InstagramIcon size={26} strokeWidth={1.4} />
      </span>
      <span className="text-small font-medium text-fg">Watch on Instagram</span>
    </a>
  );
}

function VideoCard({ reel }: { reel: (typeof reels)[0] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(hover: none)").matches);
  }, []);

  const startPlayback = () => {
    const video = videoRef.current;
    if (!video || !reel.hasVideo) return;
    if (!video.getAttribute("src")) video.src = reel.videoSrc;
    video.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    setIsHovered(true);
    startPlayback();
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setIsHovered(false);
    const video = videoRef.current;
    if (video && reel.hasVideo) {
      video.pause();
      video.currentTime = 0;
      // Drop src so no stale frame shows through the poster overlay
      video.removeAttribute("src");
      video.load();
      setIsPlaying(false);
    }
  };

  const handleClick = () => {
    if (!isTouchDevice) return;
    const video = videoRef.current;
    if (!video || !reel.hasVideo) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      startPlayback();
    }
  };

  return (
    <div
      className={`${cardSize} group cursor-pointer bg-espresso`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Gold ring on hover / while playing */}
      <div
        className={`pointer-events-none absolute inset-0 z-[4] rounded-xl border-[3px] border-gold transition-opacity duration-300 ${
          isHovered || (isPlaying && isTouchDevice) ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={reel.poster}
        alt=""
        draggable={false}
        className={`pointer-events-none absolute inset-0 z-[2] h-full w-full object-cover transition-opacity duration-300 ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
      />

      {reel.hasVideo && (
        <video ref={videoRef} className="h-full w-full object-cover" muted loop playsInline preload="none" />
      )}

      <a
        href={reel.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-espresso/70 text-on-dark transition-colors hover:text-gold"
        onClick={(e) => e.stopPropagation()}
        aria-label="View on Instagram"
      >
        <InstagramIcon size={18} />
      </a>
    </div>
  );
}

export function InstagramCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = window.innerWidth > 1024 ? window.innerWidth * 0.5 : window.innerWidth * 0.8;
      scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  const arrow =
    "absolute top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ivory text-ink shadow-[0_2px_12px_color-mix(in_srgb,var(--espresso)_25%,transparent)] transition-colors hover:text-accent-text sm:flex";

  return (
    <div className="relative w-full max-w-full overflow-hidden py-4">
      <button onClick={() => scroll("left")} className={`${arrow} left-4`} aria-label="Scroll left">
        <ChevronLeftIcon size={24} />
      </button>

      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:px-[88px]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {[...reels]
          .sort((a, b) => Number(b.hasPoster || b.hasVideo) - Number(a.hasPoster || a.hasVideo))
          .map((reel) =>
          reel.hasPoster || reel.hasVideo ? (
            <VideoCard key={reel.id} reel={reel} />
          ) : (
            <FallbackCard key={reel.id} reel={reel} />
          )
        )}
      </div>

      <button onClick={() => scroll("right")} className={`${arrow} right-4`} aria-label="Scroll right">
        <ChevronRightIcon size={24} />
      </button>

      <style dangerouslySetInnerHTML={{ __html: `.snap-x::-webkit-scrollbar{display:none}` }} />
    </div>
  );
}
