import type { Metadata } from "next";
import { SITE_NAME, SITE_TAGLINE } from "./constants";

export const defaultMetadata: Metadata = {
  title: {
    default: `${SITE_NAME} - ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "WeeTramz provides safe & reliable door-to-door transportation for kids in RTP, Raleigh, Durham, Cary, and surrounding cities. Before and after school pickup, individual rides, and group rides.",
  metadataBase: new URL("https://www.weetramz.com"),
  openGraph: {
    siteName: `${SITE_NAME} - ${SITE_TAGLINE}`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};
