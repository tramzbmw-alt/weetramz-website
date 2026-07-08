import type { Metadata } from "next";
import Link from "next/link";
import { PHONE_HREF, QUOTE_URL, SERVICE_AREAS } from "@/lib/constants";
import HeroCarousel from "@/components/ui/HeroCarousel";

export const metadata: Metadata = {
  title: "WeeTramz — Premium Transportation Services | Research Triangle & Surrounding Areas",
  description: "Safe, reliable door-to-door transportation for kids and RDU airport shuttle service serving the Research Triangle and surrounding areas including Cary, Apex, Holly Springs, Fuquay-Varina, Zebulon, and Hillsborough.",
  keywords: "RDU airport shuttle, RDU airport transportation, airport shuttle Raleigh, airport shuttle Durham, airport shuttle Cary, private van RDU, group airport transportation, family airport shuttle, affordable airport shuttle, door-to-door airport service, kids transportation Raleigh, student transportation Cary, children's transportation Triangle, RDU airport transfer, Research Triangle transportation",
  openGraph: {
    title: "WeeTramz — Premium Transportation Services | Research Triangle & Surrounding Areas",
    description: "Safe, reliable door-to-door transportation for kids and RDU airport shuttle service serving the Research Triangle and surrounding areas including Cary, Apex, Holly Springs, Fuquay-Varina, Zebulon, and Hillsborough.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.weetramz.com/#business",
      "name": "WeeTramz",
      "url": "https://www.weetramz.com",
      "telephone": "+18669335938",
      "priceRange": "$$",
      "description": "Safe, reliable door-to-door transportation for kids and RDU airport shuttle service serving the Research Triangle and surrounding areas.",
      "serviceType": ["Children's Transportation", "Airport Shuttle Service"],
      "areaServed": [
        { "@type": "City", "name": "Raleigh" },
        { "@type": "City", "name": "Durham" },
        { "@type": "City", "name": "Cary" },
        { "@type": "City", "name": "Apex" },
        { "@type": "City", "name": "Holly Springs" },
        { "@type": "City", "name": "Fuquay-Varina" },
        { "@type": "City", "name": "Morrisville" },
        { "@type": "Place", "name": "Research Triangle Park" },
        { "@type": "City", "name": "Zebulon" },
        { "@type": "City", "name": "Hillsborough" }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://www.weetramz.com/#rdu-shuttle",
      "name": "RDU Airport Shuttle",
      "provider": { "@id": "https://www.weetramz.com/#business" },
      "description": "Private 10-14 passenger van service to and from Raleigh-Durham International Airport with fares starting at $65, instant online booking, and live GPS tracking.",
      "url": "https://www.weetramz.com/shuttle-booking",
      "areaServed": [
        { "@type": "City", "name": "Raleigh" },
        { "@type": "City", "name": "Durham" },
        { "@type": "City", "name": "Cary" },
        { "@type": "City", "name": "Apex" },
        { "@type": "City", "name": "Holly Springs" },
        { "@type": "City", "name": "Fuquay-Varina" },
        { "@type": "City", "name": "Morrisville" },
        { "@type": "Place", "name": "Research Triangle Park" },
        { "@type": "City", "name": "Zebulon" },
        { "@type": "City", "name": "Hillsborough" }
      ]
    }
  ]
};

type ServiceCard = {
  label: string;
  tag: string;
  tagColor: string;
  description: string;
  items: string[];
  cta: { label: string; href: string; external: boolean };
  extraLink?: { label: string; href: string };
};

const services: ServiceCard[] = [
  {
    label: "Children's Transportation",
    tag: "Available Now",
    tagColor: "bg-[#2657f2] text-white",
    description: "Door-to-door rides for kids — before and after school, individual rides, and group trips. Every driver vetted, every ride tracked.",
    items: ["Before & After School Pickup", "Individual Rides", "Micro / Group Rides"],
    cta: { label: "Request a Quote", href: QUOTE_URL, external: true },
  },
  {
    label: "RDU Airport Shuttle",
    tag: "Now Available",
    tagColor: "bg-[#2657f2] text-white",
    description: "Private van service to and from Raleigh-Durham International Airport. Scheduled advance bookings only. Up to 14 passengers.",
    items: ["To RDU & From RDU", "Instant fare calculator — your price in seconds", "Door-to-Door Service"],
    cta: { label: "Book Your Ride", href: "/shuttle-booking", external: false },
    extraLink: { label: "See pricing & book", href: "#rdu-shuttle" },
  },
];

const stats = [
  { value: "20+", label: "Years\nExperience" },
  { value: "100%", label: "Vetted\nDrivers" },
  { value: "Live", label: "GPS\nTracking" },
  { value: "AI", label: "Parent\nAgent" },
];

const steps = [
  { n: "01", title: "Request A Quote", body: "Tell us your route and schedule through our AI-powered quote agent." },
  { n: "02", title: "Meet Your Team", body: "A WeeTramz specialist contacts you and schedules a consultation." },
  { n: "03", title: "Meet & Greet", body: "Your child meets the driver before the first ride — always." },
  { n: "04", title: "Ride Begins", body: "Sit back. We handle transportation. You track every move in real time." },
];

const testimonials = [
  {
    quote: "The initial meet and greet so my child knows the driver before services begin — that was awesome and something no other service was offering.",
    source: "Parent at Hill Learning Center",
  },
  {
    quote: "WeeTramz has made my life so much easier. I love the promptness, courtesy, and quality of service.",
    source: "Lacy Elementary School Parent",
  },
  {
    quote: "They've been able to accommodate my ever-changing schedule with such ease. I highly recommend for any busy parent.",
    source: "9th Grader, Apex Friendship High School",
  },
];

const guarantees = [
  {
    number: "01",
    title: "Every driver is background checked.",
    body: "Criminal background check, driver's license verification, and clean driving record — before they ever drive a WeeTramz route.",
  },
  {
    number: "02",
    title: "Every driver is drug tested.",
    body: "Pre-employment screening plus random ongoing tests throughout employment. No exceptions, ever.",
  },
  {
    number: "03",
    title: "Your child meets their driver first.",
    body: "Before ride one, we schedule an in-person meet & greet so your child knows exactly who is picking them up.",
  },
  {
    number: "04",
    title: "Every ride is tracked in real time.",
    body: "Live GPS with 5-second refresh. Ask the WTz AI Agent where the bus is — get an instant, accurate answer.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── HERO ── */}
      <section className="relative text-white overflow-hidden min-h-screen flex items-center" style={{ background: "#0A1628" }}>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Blue glow top-right */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20" style={{ background: "#2657f2", transform: "translate(30%, -30%)" }} />
        {/* Subtle blue glow bottom-left */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[140px] opacity-10" style={{ background: "#2657f2", transform: "translate(-30%, 30%)" }} />

        <div className="max-w-6xl mx-auto px-6 py-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-10"
              style={{ borderColor: "rgba(255,255,255,0.25)", color: "white", background: "rgba(255,255,255,0.08)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Serving {SERVICE_AREAS}
            </div>
            <p className="text-xs font-bold uppercase tracking-widest mb-5 text-white/50">Premium Transportation</p>
            <h1
              className="font-black leading-[1.05] tracking-tight"
              style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "clamp(3rem, 5vw, 4.5rem)" }}
            >
              Premium rides<br />for your<br />
              <em style={{ color: "#ffffff", fontStyle: "italic" }}>little ones.</em>
            </h1>
            <p className="mt-7 text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.65)", maxWidth: "480px" }}>
              Door-to-door transportation built for busy families. Safe, reliable, and tracked in real time with AI-powered parent updates.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={QUOTE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-on-dark px-8 py-4 font-bold rounded-lg text-sm tracking-wide"
              >
                Request a Quote
              </a>
              <a
                href={PHONE_HREF}
                className="px-8 py-4 font-semibold rounded-lg transition-all text-sm border text-white hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.25)" }}
              >
                Call (866) 933-5938
              </a>
            </div>


          </div>

          {/* Right: hero carousel */}
          <HeroCarousel />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, white, transparent)" }} />
        </div>
      </section>

      {/* ── AIRPORT SHUTTLE ── */}
      <section id="rdu-shuttle" className="py-24 px-6 bg-[#f5f7ff]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — headline, description, markets, CTA */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3 text-[#2657f2]">RDU Airport Shuttle</h2>
              <p
                className="font-black text-gray-900 mb-5"
                style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1 }}
              >
                Your Group. Your Bags.<br />One Van. <em>One Booking.</em>
              </p>
              <p className="text-gray-600 leading-relaxed mb-3">
                Skip the rideshare chaos. WeeTramz runs a <strong>private 10 to 14 passenger van</strong> directly to RDU or from RDU to your door — no splitting up the group, no juggling multiple cars, no surge pricing.
              </p>
              <p className="text-gray-600 leading-relaxed mb-2">
                Transparent pricing. Both directions. Door-to-door. <strong>Advance booking required.</strong>
              </p>
              <p className="text-xs text-gray-400 leading-relaxed mb-8">
                10 passengers with full luggage space · Up to 14 passengers with carry-on only
              </p>

              <p className="text-xs font-bold uppercase tracking-widest mb-4 text-gray-400">Perfect for</p>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {[
                  {
                    label: "Families",
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2657f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    ),
                  },
                  {
                    label: "Corporate Groups",
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2657f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                      </svg>
                    ),
                  },
                  {
                    label: "Senior Groups",
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2657f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="7" r="4"/><path d="M6 21v-2a6 6 0 0 1 6-6v0a6 6 0 0 1 6 6v2"/>
                      </svg>
                    ),
                  },
                  {
                    label: "Sports Teams",
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2657f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                      </svg>
                    ),
                  },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white shadow-sm"
                    style={{ border: "1px solid rgba(38,87,242,0.15)" }}
                  >
                    <span className="flex-shrink-0">{m.icon}</span>
                    <span className="text-sm font-semibold text-gray-700">{m.label}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Right — value proposition */}
            <div className="rounded-2xl overflow-hidden shadow-md" style={{ border: "1px solid rgba(38,87,242,0.18)" }}>
              <div className="px-6 py-5" style={{ background: "#2657f2" }}>
                <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-0.5">Why WeeTramz Shuttle</p>
                <h3 className="font-bold text-white text-lg leading-snug">
                  Your Group. Your Bags.<br />One Van. <em>One Booking.</em>
                </h3>
              </div>
              <div className="bg-white px-6 py-6 space-y-5">
                <ul className="space-y-4">
                  {[
                    {
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2657f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                      ),
                      text: "Private van — up to 14 passengers, your group only, no strangers",
                    },
                    {
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2657f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                      ),
                      text: "Door-to-door service — we pick you up and drop you off at the terminal",
                    },
                    {
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2657f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="16 2 12 2 8 2"/><line x1="8" y1="2" x2="8" y2="7"/><line x1="16" y1="2" x2="16" y2="7"/>
                        </svg>
                      ),
                      text: "All luggage fits — full trunk space for up to 10 passengers with bags",
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-0.5">{item.icon}</span>
                      <span className="text-sm text-gray-700 leading-relaxed">{item.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="rounded-xl px-4 py-3.5" style={{ background: "#f5f7ff", border: "1px solid rgba(38,87,242,0.15)" }}>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-bold text-gray-900">Fares start at $65</span> — your exact price is calculated instantly when you book based on your route, date and time.
                  </p>
                </div>

                <a
                  href="/shuttle-booking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-blue flex items-center justify-center gap-2 w-full py-4 font-bold rounded-lg text-sm text-white"
                >
                  Book Your Ride →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 px-6" style={{ background: "#0A1628" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="text-center"
                style={{
                  borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
                  padding: "0 2rem",
                }}
              >
                <div
                  className="font-black leading-none mb-3 text-white"
                  style={{
                    fontFamily: "var(--font-playfair, Georgia, serif)",
                    fontSize: "clamp(2.75rem, 4.5vw, 3.9rem)",
                  }}
                >
                  {s.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest whitespace-pre-line leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ height: "420px", background: "#2657f2" }}>
            {/* TODO: Replace with next/image once real WeeTramz photos are available */}
            <img
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80"
              alt="WeeTramz founders — parents who built the transportation service they always wished existed"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,22,40,0.7) 0%, transparent 60%)" }} />
            <div className="absolute bottom-6 left-6 text-white">
              <div
                className="font-black"
                style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "2rem", lineHeight: 1.15 }}
              >
                Founded by parents.
              </div>
              <div className="text-sm mt-1 text-white/60">Built for families.</div>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3 text-[#2657f2]">Who We Are</p>
            <h2
              className="font-black text-gray-900 mb-5"
              style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "2.5rem", lineHeight: 1.1 }}
            >
              We understand the juggle.
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>WeeTramz</strong> was founded by parents who know what it means to balance work, kids, and everything in between. We built the transportation service we always wished existed — safe, reliable, and genuinely caring.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              With over 20 years of experience in children&apos;s transportation, we concentrate on safety, exceptional customer service, and delivering a premium TramzPortation experience for every rider and their family.
            </p>
            <p className="font-bold text-gray-900 text-sm">Currently serving: {SERVICE_AREAS}.</p>
            <Link href="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-bold hover:gap-3 transition-all text-[#2657f2]">
              Learn more about us →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="our-services" className="py-24 px-6 bg-[#f5f7ff]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-2 text-[#2657f2]">Our Services</p>
            <h2
              className="font-black text-gray-900"
              style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "2.5rem", lineHeight: 1.1 }}
            >
              Transportation that fits <em>your life.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <div
                key={s.label}
                className={`rounded-2xl border p-8 flex flex-col gap-6 ${s.tag === "Coming Soon" ? "border-gray-200 bg-white/60" : "bg-white shadow-sm"}`}
                style={s.tag !== "Coming Soon" ? { borderColor: "rgba(38,87,242,0.25)" } : {}}
              >
                <div className="flex items-start justify-between">
                  <h3
                    className={`text-xl font-bold ${s.tag === "Coming Soon" ? "text-gray-400" : "text-gray-900"}`}
                    style={s.tag !== "Coming Soon" ? { fontFamily: "var(--font-playfair, Georgia, serif)" } : {}}
                  >
                    {s.label}
                  </h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${s.tagColor}`}>{s.tag}</span>
                </div>
                <p className={`text-sm leading-relaxed ${s.tag === "Coming Soon" ? "text-gray-400" : "text-gray-600"}`}>
                  {s.description}
                </p>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: s.tag === "Coming Soon" ? "#d1d5db" : "#2657f2" }}
                      />
                      <span className={s.tag === "Coming Soon" ? "text-gray-400" : "text-gray-700"}>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-2">
                  {s.cta.external ? (
                    <a
                      href={s.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold hover:gap-3 transition-all text-[#2657f2]"
                    >
                      {s.cta.label} →
                    </a>
                  ) : (
                    <Link href={s.cta.href} className="inline-flex items-center gap-2 text-sm font-bold hover:gap-3 transition-all text-[#2657f2]">
                      {s.cta.label} →
                    </Link>
                  )}
                  {s.extraLink && (
                    <a href={s.extraLink.href} className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-[#2657f2] transition-colors">
                      {s.extraLink.label} →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-2 text-[#2657f2]">How It Works</p>
            <h2
              className="font-black text-gray-900"
              style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "2.5rem", lineHeight: 1.1 }}
            >
              <em>Simple</em> from day one.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.n} className="relative group">
                <div
                  className="step-number font-black leading-none mb-4 select-none"
                  style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "5rem" }}
                >
                  {s.n}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.body}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-8 text-xl pl-2" style={{ color: "rgba(38,87,242,0.35)" }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAFETY GUARANTEES ── */}
      <section className="py-24 px-6" style={{ background: "#0A1628" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3 text-white/60">Our Promise</p>
            <h2
              className="font-black text-white"
              style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1 }}
            >
              We don&apos;t just say it.<br />
              <em style={{ color: "#ffffff", fontStyle: "italic" }}>We guarantee it.</em>
            </h2>
            <div className="mt-6 w-12 h-0.5 mx-auto bg-white/30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.1)", borderRadius: "16px", overflow: "hidden" }}>
            {guarantees.map((g) => (
              <div key={g.number} className="p-8 md:p-10" style={{ background: "#0A1628" }}>
                <div
                  className="font-black mb-4"
                  style={{
                    fontFamily: "var(--font-playfair, Georgia, serif)",
                    fontSize: "3rem",
                    lineHeight: 1,
                    color: "rgba(255,255,255,0.15)",
                  }}
                >
                  {g.number}
                </div>
                <h3
                  className="font-bold text-white mb-3 text-lg leading-snug"
                  style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
                >
                  {g.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50">{g.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/about/safety-policy" className="text-sm font-bold text-white/70 hover:text-white transition-colors">
              Read our full Passenger Safety Policy →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6" style={{ background: "#0A1628" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-2 text-white/60">What Parents Say</p>
            <h2
              className="font-black text-white"
              style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "2.5rem", lineHeight: 1.1 }}
            >
              Parents <em>trust</em> WeeTramz.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex flex-col p-8 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div
                  className="font-black leading-none mb-4 select-none"
                  style={{
                    fontFamily: "var(--font-playfair, Georgia, serif)",
                    fontSize: "5rem",
                    color: "rgba(255,255,255,0.2)",
                    lineHeight: 0.8,
                  }}
                >
                  &ldquo;
                </div>
                <p
                  className="flex-1 leading-relaxed italic text-white/85"
                  style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "1rem" }}
                >
                  {t.quote}
                </p>
                <div className="mt-6 pt-5 flex items-center gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
                  <div className="w-1 h-4 rounded-full flex-shrink-0 bg-white/40" />
                  <p className="text-xs font-bold uppercase tracking-wider text-white/40">{t.source}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/about/testimonials" className="text-sm font-bold text-white/60 hover:text-white transition-colors">
              Read all testimonials →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-6" style={{ background: "#0A1628" }}>
        <div className="max-w-3xl mx-auto text-center text-white">
          <div className="w-12 h-0.5 mx-auto mb-8 bg-white/30" />
          <h2
            className="font-black mb-5"
            style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "2.75rem", lineHeight: 1.1 }}
          >
            Ready to <em>get started?</em>
          </h2>
          <p className="text-lg mb-10 text-white/60">
            Join families across the RTP area who trust WeeTramz with their most important cargo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={QUOTE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-on-dark px-8 py-4 font-bold rounded-lg text-sm"
            >
              Request a Quote
            </a>
            <a
              href={PHONE_HREF}
              className="px-8 py-4 border-2 font-bold rounded-lg text-sm text-white hover:bg-white/10 transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.25)" }}
            >
              Call (866) 933-5938
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
