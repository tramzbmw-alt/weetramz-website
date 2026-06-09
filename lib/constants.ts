export const SITE_NAME = "WeeTramz";
export const SITE_TAGLINE = "Be TramzPorted by WeeTramz";
export const PHONE = "(866) 933-5938";
export const PHONE_HREF = "tel:+18669335938";
export const EMAIL = "info@WeeTramz.com";
export const EMAIL_HREF = "mailto:info@WeeTramz.com";
export const QUOTE_URL = "https://quote.weetramz.com";
export const SERVICE_AREAS = "RTP, Raleigh, Durham, Cary, and surrounding cities";

export const SOCIAL = {
  twitter: "https://twitter.com/weetramz",
  instagram: "https://www.instagram.com/weetramz/",
  facebook: "https://www.facebook.com/WeeTramz/",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "About WeeTramz",
    href: "/about",
    children: [
      { label: "About WeeTramz", href: "/about" },
      { label: "Client Testimonials", href: "/about/testimonials" },
      { label: "Policy", href: "/about/policy" },
      { label: "Passenger Safety & Behavior Policy", href: "/about/safety-policy" },
      { label: "Contact Us", href: "/about/contact" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "FAQs", href: "/faqs" },
  { label: "Tracking App", href: "/tracking-app" },
];
