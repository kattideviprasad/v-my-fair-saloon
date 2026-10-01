import thumbs from "./reel-thumbs.json";

/*
  The Instagram reels shown on the home page, in tile order. Each links to its own reel.
  reel-7 is not listed: its original link belonged to a different account.

  Thumbnails come from lib/reel-thumbs.json, which scripts/make-reel-thumbs.mjs writes from covers in
  reference/reel-covers/ (reel-1.jpg, …) or videos in reference/reel-videos/ (reel-1.mp4, …).
  Only reels with a thumbnail get a tile; until any exist, the home page shows one
  "Follow @vmyfairunisexsalonspa on Instagram" card.
*/
export const reels = [
  { id: 1, url: "https://www.instagram.com/reel/DZpkVC3TfC4/" },
  { id: 2, url: "https://www.instagram.com/reel/DUf-K_5E3ZS/" },
  { id: 3, url: "https://www.instagram.com/reel/Dbsw3FKTiy8/" },
  { id: 4, url: "https://www.instagram.com/reel/DRKQsX-E2eW/" },
  { id: 5, url: "https://www.instagram.com/reel/DJtPBxHIblh/" },
  { id: 6, url: "https://www.instagram.com/reel/DH-b5tixQPc/" },
  { id: 8, url: "https://www.instagram.com/reel/DFPcVQERoMz/" },
];

export type ReelThumb = { src: string; width: number; height: number };

export const reelThumbs = thumbs as Record<string, ReelThumb | undefined>;
