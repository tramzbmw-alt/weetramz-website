import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { EMAIL_HREF, PHONE, PHONE_HREF, QUOTE_URL, SERVICE_AREAS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "WeeTramz — Safe Kids Transportation in RTP, Raleigh, Durham & Cary",
  description:
    "WeeTramz provides safe & reliable door-to-door transportation for kids. Serving RTP, Raleigh, Durham, Cary, and surrounding cities.",
};

const steps = [
  { n: "01", title: "Request A Quote", body: "Complete the quote request form to confirm our ability to service your route." },
  { n: "02", title: "Speak with a Representative", body: "A WeeTramz representative will contact you with information about your request." },
  { n: "03", title: "Schedule a Consultation", body: "Schedule a one-on-one call and get the answers you need from a WeeTramz specialist." },
  { n: "04", title: "Schedule Transportation", body: "Your child's transportation is scheduled with one of our WeeTramz drivers." },
];

const testimonials = [
  { quote: "My son and I both felt very comfortable and have been delighted with the quality of service received so far.", source: "Kindergarten Parent, Apex Elementary" },
  { quote: "The initial meet and greet so my child knows the driver before services begin — that was awesome and something no other transportation service was offering.", source: "Parent at Hill Learning Center" },
  { quote: "WeeTramz has made my life so much easier. I love the promptness, courtesy, and quality of service.", source: "Lacy Elementary School Parent" },
  { quote: "They have been able to accommodate my ever-changing schedule with such ease. I highly recommend for any busy parent.", source: "9th Grader, Apex Friendship High School" },
];

const driverReqs = [
  "Pass a pre-employment criminal background check",
  "Pass a pre-employment drug screening check",
  "Submit to random background and drug screening checks",
  "Have a clean driver's record",
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-[#e8e0d0] overflow-hidden min-h-[560px] flex items-center">
        <div className="max-w-6xl mx-auto px-8 py-16 w-full flex items-center">
          {/* Left: text */}
          <div className="relative z-10 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-gray-900">
              Be TramzPorted by{" "}
              <span className="text-[#0066CC]">Wee</span>Tramz
            </h1>
            <p className="mt-4 text-gray-700 text-lg leading-relaxed">
              At WeeTramz we offer parents a safe, reliable and affordable
              alternative to providing tramzPortation for their kids.
            </p>
            <a
              href={QUOTE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block px-6 py-3 bg-[#0066CC] hover:bg-[#0052a3] text-white font-bold rounded-md transition-colors uppercase tracking-wide text-sm"
            >
              Click Here
            </a>
          </div>
        </div>
        {/* Right: hero kid image — replace with real image from WordPress */}
        <div className="absolute right-0 top-0 h-full w-1/2 flex items-end justify-end">
          <img
            src="https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=700&q=80"
            alt="Cool kid"
            className="h-full w-full object-cover object-top"
            style={{ objectPosition: "60% top" }}
          />
          {/* Fade left edge to blend with beige */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#e8e0d0] via-[#e8e0d0]/40 to-transparent" />
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="text-3xl font-black text-[#0066CC] mb-5" style={{fontFamily:"Georgia, serif"}}>Who We Are</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong className="text-[#0066CC]">Wee</strong><strong>Tramz</strong> is a Premier Transportation Service company whose goal is to provide a unique and extraordinary riding experience that caters to your kids' needs. At <strong className="text-[#0066CC]">Wee</strong><strong>Tramz</strong> we offer door-to-door service for your cherished cargo to and from designated locations to help ease the minds of busy parents. For our <strong className="text-[#0066CC]">Wee</strong><strong>Tramz</strong> family, we offer individual before and after school drop-offs and pickups, along with group rides.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded by parents that understand the stress of juggling work and kids and the importance of making sure your kids are in good hands. <strong className="text-[#0066CC]">Wee</strong><strong>Tramz</strong> founders have over 20 years of experience in operating successful children&apos;s transportation services.
            </p>
            <p className="font-bold text-gray-900">
              WeeTramz currently serves the following areas: {SERVICE_AREAS}.
            </p>
          </div>
          <div className="flex-shrink-0 w-full md:w-96">
            <img
              src="https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=600&q=80"
              alt="Happy kids"
              className="rounded-lg w-full object-cover h-72"
            />
          </div>
        </div>
      </section>

      {/* ── HOW TO GET STARTED ── */}
      <section className="py-16 px-4 bg-[#e8eaf6]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center text-[#0066CC] mb-12" style={{fontFamily:"Georgia, serif"}}>How To Get Started</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.n} className="relative">
                {/* Connector arrow — desktop only */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full z-10 -translate-x-3">
                    <div className="border-t-2 border-dashed border-gray-400 w-full" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▶</div>
                  </div>
                )}
                {/* Step number bubble */}
                <div className="flex justify-center mb-3">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shadow-md ${i % 2 === 0 ? "bg-white text-gray-800" : "bg-white/70 text-gray-600"}`}>
                    {s.n}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm text-center h-full">
                  <h3 className="font-bold text-gray-900 text-base mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <div className="w-12 h-1 bg-[#0066CC] mx-auto rounded-full" />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-center text-[#0066CC] mb-10" style={{fontFamily:"Georgia, serif"}}>What Our Customers Are Saying</h2>
          <div className="space-y-8">
            {testimonials.map((t, i) => (
              <blockquote key={i} className="text-center">
                <p className="text-gray-700 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-3 text-xs font-bold text-[#0066CC] uppercase tracking-widest">— {t.source}</footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/about/testimonials" className="text-sm font-semibold text-[#0066CC] hover:underline">
              Read all testimonials →
            </Link>
          </div>
        </div>
      </section>

      {/* ── DRIVER REQUIREMENTS ── */}
      <section className="bg-[#0066CC] py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-shrink-0 w-full md:w-96 rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80"
              alt="Driver"
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="flex-1 text-white">
            <h2 className="text-3xl font-black mb-6" style={{fontFamily:"Georgia, serif"}}>Our drivers are required to</h2>
            <ul className="space-y-3">
              {driverReqs.map((r) => (
                <li key={r} className="flex items-start gap-3 text-white/90">
                  <span className="mt-1 w-2 h-2 rounded-full bg-white flex-shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── SUBSCRIBE ── */}
      <section className="py-16 px-4 bg-[#e8e0d0]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-black text-[#0066CC] mb-8" style={{fontFamily:"Georgia, serif"}}>Subscribe with WeeTramz</h2>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="EMAIL"
              className="flex-1 px-4 py-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#0066CC]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#0066CC] hover:bg-[#0052a3] text-white font-bold text-sm rounded transition-colors uppercase"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
