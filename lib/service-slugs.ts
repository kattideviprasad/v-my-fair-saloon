/*
  One source for service slugs, so the anchors on /services (id="svc-<slug>"), the home cards,
  the footer links and the "Book this service" links always agree.
  "Skin & Facials" -> "skin-facials", "Bridal & Event Makeup" -> "bridal-event-makeup".
*/
export function serviceSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const serviceAnchor = (title: string) => `/services#svc-${serviceSlug(title)}`;
export const serviceBookingHref = (title: string) => `/contact?service=${serviceSlug(title)}`;
