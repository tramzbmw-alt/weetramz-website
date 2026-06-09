import type { Metadata } from "next";
import Link from "next/link";
import { PHONE_HREF, QUOTE_URL, SERVICE_AREAS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "WeeTramz — Premium Kids Transportation in RTP, Raleigh, Durham & Cary",
  description: "Safe, reliable, door-to-door transportation for kids. Serving RTP, Raleigh, Durham, Cary, and surrounding cities.",
};

const services = [
  {
    label: "Children's Transportation",
    tag: "Available Now",
    tagColor: "bg-[#0066CC] text-white",
    description: "Door-to-door rides for kids — before and after school, individual rides, and group trips. Every driver vetted, every ride tracked.",
    items: ["Before & After School Pickup", "Individual Rides", "Micro / Group Rides"],
    cta: { label: "Request a Quote", href: QUOTE_URL, external: true },
  },
  {
    label: "Adult Transportation",
    tag: "Coming Soon",
    tagColor: "bg-gray-100 text-gray-500",
    description: "The same premium, reliable service — expanded for adult passengers. Medical appointments, commutes, and more.",
    items: ["Medical & Appointment Rides", "Commuter Service", "Corporate Accounts"],
    cta: { label: "Join the Waitlist", href: "/about/contact", external: false },
  },
];

const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "100%", label: "Vetted Drivers" },
  { value: "Live", label: "GPS Tracking" },
  { value: "AI", label: "Parent Agent" },
];

const steps = [
  { n: "01", title: "Request A Quote", body: "Tell us your route and schedule through our quick quote agent." },
  { n: "02", title: "Meet Your Team", body: "A WeeTramz specialist contacts you and schedules a consultation." },
  { n: "03", title: "Meet & Greet", body: "Your child meets the driver before the first ride — always." },
  { n: "04", title: "Ride Begins", body: "Sit back. We handle transportation. You track every move in real time." },
];

const testimonials = [
  { quote: "The initial meet and greet so my child knows the driver before services begin — that was awesome and something no other service was offering.", source: "Parent at Hill Learning Center" },
  { quote: "WeeTramz has made my life so much easier. I love the promptness, courtesy, and quality of service.", source: "Lacy Elementary School Parent" },
  { quote: "They've been able to accommodate my ever-changing schedule with such ease. I highly recommend for any busy parent.", source: "9th Grader, Apex Friendship High School" },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-[#0d1b2a] text-white overflow-hidden min-h-[92vh] flex items-center">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px"}} />
        {/* Blue glow */}
        <div className="absolute top-1/2 right-0 w-[700px] h-[700px] -translate-y-1/2 translate-x-1/3 rounded-full bg-[#0066CC] opacity-15 blur-[140px]" />

        <div className="max-w-6xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white font-bold mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066CC] animate-pulse" />
              Serving {SERVICE_AREAS}
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-[1.05] tracking-tight">
              Premium rides<br />for your<br />
              <span className="text-[#0066CC]">little ones.</span>
            </h1>
            <p className="mt-6 text-gray-300 text-lg leading-relaxed">
              Door-to-door transportation built for busy families. Safe, reliable, and tracked in real time with AI-powered parent updates.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href={QUOTE_URL} target="_blank" rel="noopener noreferrer"
                className="px-8 py-4 bg-[#0066CC] hover:bg-[#0052a3] text-white font-bold rounded-lg transition-all text-sm tracking-wide">
                Request a Quote
              </a>
              <a href={PHONE_HREF}
                className="px-8 py-4 border border-white/20 hover:border-white/50 text-white font-semibold rounded-lg transition-all text-sm">
                Call (866) 933-5938
              </a>
            </div>
          </div>
          {/* Right: hero image */}
          <div className="relative rounded-2xl overflow-hidden h-[480px] shadow-2xl">
            <img
              src="/images/pexels-norma-mortenson-8457621.jpg"
              alt="Happy kids heading to school"
              className="w-full h-full object-cover"
            />
            {/* Overlay badge */}
            <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur rounded-xl px-4 py-3 flex items-center gap-3 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <div>
                <div className="text-xs font-bold text-gray-900">Live Tracking Active</div>
                <div className="text-xs text-gray-500">WTz K'nected — AI Parent Agent</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#0066CC]">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center text-white">
              <div className="text-3xl font-black">{s.value}</div>
              <div className="text-xs text-blue-200 uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-2xl overflow-hidden h-[420px] shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80"
              alt="Kids ready for school"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="text-2xl font-black">Founded by parents.</div>
              <div className="text-sm text-gray-300">Built for families.</div>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-[#0066CC] uppercase tracking-widest mb-2">Who We Are</p>
            <h2 className="text-4xl font-black text-gray-900 mb-5">We understand the juggle.</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>WeeTramz</strong> was founded by parents who know what it means to balance work, kids, and everything in between. We built the transportation service we always wished existed — safe, reliable, and genuinely caring.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              With over 20 years of experience in children's transportation, we concentrate on safety, exceptional customer service, and delivering a premium TramzPortation experience for every rider and their family.
            </p>
            <p className="font-bold text-gray-900 text-sm">
              Currently serving: {SERVICE_AREAS}.
            </p>
            <Link href="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0066CC] hover:gap-3 transition-all">
              Learn more about us →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 px-6 bg-[#f5f7ff]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-bold text-[#0066CC] uppercase tracking-widest mb-2">What We Offer</p>
            <h2 className="text-4xl font-black text-gray-900">Transportation that fits your life.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <div key={s.label} className={`rounded-2xl border p-8 flex flex-col gap-6 ${s.tag === "Coming Soon" ? "border-gray-100 bg-white/60" : "border-[#0066CC]/20 bg-white shadow-sm"}`}>
                <div className="flex items-start justify-between">
                  <h3 className={`text-xl font-bold ${s.tag === "Coming Soon" ? "text-gray-400" : "text-gray-900"}`}>{s.label}</h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${s.tagColor}`}>{s.tag}</span>
                </div>
                <p className={`text-sm leading-relaxed ${s.tag === "Coming Soon" ? "text-gray-400" : "text-gray-600"}`}>{s.description}</p>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.tag === "Coming Soon" ? "bg-gray-300" : "bg-[#0066CC]"}`} />
                      <span className={s.tag === "Coming Soon" ? "text-gray-400" : "text-gray-700"}>{item}</span>
                    </li>
                  ))}
                </ul>
                {s.cta.external ? (
                  <a href={s.cta.href} target="_blank" rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-[#0066CC] hover:gap-3 transition-all">
                    {s.cta.label} →
                  </a>
                ) : (
                  <Link href={s.cta.href}
                    className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-600 transition-all">
                    {s.cta.label} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-bold text-[#0066CC] uppercase tracking-widest mb-2">The Process</p>
            <h2 className="text-4xl font-black text-gray-900">Simple from day one.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.n} className="relative">
                <div className="text-7xl font-black text-[#0066CC]/8 leading-none mb-3 select-none">{s.n}</div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.body}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-8 text-gray-200 text-xl pl-2">→</div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12">
            <a href={QUOTE_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0066CC] hover:bg-[#0052a3] text-white font-bold rounded-lg transition-all text-sm">
              Get Started Today →
            </a>
          </div>
        </div>
      </section>

      {/* ── SAFETY / DRIVERS ── */}
      <section className="py-24 px-6 bg-[#0d1b2a] text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-bold text-[#0066CC] uppercase tracking-widest mb-2">Safety First</p>
            <h2 className="text-4xl font-black mb-6">Every driver held to a higher standard.</h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Your child's safety isn't negotiable. Every WeeTramz driver goes through rigorous screening before they ever get behind the wheel.
            </p>
            <ul className="space-y-4">
              {[
                "Pre-employment criminal background check",
                "Pre-employment drug screening",
                "Random ongoing background & drug checks",
                "Clean driving record required",
                "In-person meet & greet before first ride",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#0066CC]/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-[#0066CC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </span>
                  <span className="text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-2xl overflow-hidden h-[460px] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80"
              alt="Professional driver"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a]/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "🛡️", title: "Background Checked" },
                  { icon: "📍", title: "Live GPS Tracking" },
                  { icon: "🚗", title: "Clean Record" },
                  { icon: "🤝", title: "Meet & Greet" },
                ].map((card) => (
                  <div key={card.title} className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-3 flex items-center gap-2">
                    <span className="text-lg">{card.icon}</span>
                    <span className="text-xs font-bold text-white">{card.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-bold text-[#0066CC] uppercase tracking-widest mb-2">Testimonials</p>
            <h2 className="text-4xl font-black text-gray-900">Parents trust WeeTramz.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[#f5f7ff] rounded-2xl p-8 flex flex-col gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-[#0066CC] fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">— {t.source}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/about/testimonials" className="text-sm font-bold text-[#0066CC] hover:underline">
              Read all testimonials →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-6 bg-[#0066CC]">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl font-black mb-4">Ready to get started?</h2>
          <p className="text-blue-200 text-lg mb-10">
            Join families across the RTP area who trust WeeTramz with their most important cargo.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={QUOTE_URL} target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 bg-white hover:bg-gray-100 text-[#0066CC] font-bold rounded-lg transition-all text-sm">
              Request a Quote
            </a>
            <a href={PHONE_HREF}
              className="px-8 py-4 border-2 border-white/40 hover:border-white text-white font-bold rounded-lg transition-all text-sm">
              Call (866) 933-5938
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
