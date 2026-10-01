/*
  Captured once, when this module first loads in the browser. The Navbar (always mounted from the
  first document load) imports it, so this is the path the visitor landed on, not the current route.
  The hero intro only plays when that landing path is the home page, so clicking "Home" later
  never replays it.
*/
export const entryPath: string | null =
  typeof window === "undefined" ? null : window.location.pathname;
