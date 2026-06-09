import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // WordPress slug → new Next.js routes
      { source: "/about-wee-tramz", destination: "/about", permanent: true },
      { source: "/about-wee-tramz/", destination: "/about", permanent: true },
      { source: "/client-testimonials", destination: "/about/testimonials", permanent: true },
      { source: "/client-testimonials/", destination: "/about/testimonials", permanent: true },
      { source: "/policy", destination: "/about/policy", permanent: true },
      { source: "/policy/", destination: "/about/policy", permanent: true },
      { source: "/passenger-safety-behavior-policy", destination: "/about/safety-policy", permanent: true },
      { source: "/passenger-safety-behavior-policy/", destination: "/about/safety-policy", permanent: true },
      { source: "/contact-us", destination: "/about/contact", permanent: true },
      { source: "/contact-us/", destination: "/about/contact", permanent: true },
      { source: "/our-tracking-app", destination: "/tracking-app", permanent: true },
      { source: "/our-tracking-app/", destination: "/tracking-app", permanent: true },
      // request-a-quote → external quote agent
      { source: "/request-a-quote", destination: "https://quote.weetramz.com", permanent: false },
      { source: "/request-a-quote/", destination: "https://quote.weetramz.com", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.weetramz.com",
      },
    ],
  },
};

export default nextConfig;
