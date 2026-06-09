import type { Metadata } from "next";
import Link from "next/link";
import { EMAIL_HREF, PHONE_HREF, QUOTE_URL, SERVICE_AREAS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "WeeTramz — Safe Kids Transportation in RTP, Raleigh, Durham & Cary",
  description:
    "WeeTramz provides safe & reliable door-to-door transportation for kids. Serving RTP, Raleigh, Durham, Cary, and surrounding cities.",
};

const steps = [
  { n: "01", title: "Request A Quote", body: "Complete the quote request to confirm our ability to service your route." },
  { n: "02", title: "Speak with a Representative", body: "A WeeTramz representative will contact you with information about your request." },
  { n: "03", title: "Schedule a Consultation", body: "Schedule a one-on-one call and get the answers you need from a WeeTramz specialist." },
  { n: "04", title: "Schedule Transportation", body: "Your child's transportation is scheduled with one of our WeeTramz drivers." },
];

const testimonials = [
  { quote: "My son and I both felt very comfortable and have been delighted with the quality of service received so far.", source: "Kindergarten Parent, Apex Elementary" },
  { quote: "The initial meet and greet so my child knows the driver before services begin — that was awesome and something no other service was offering.", source: "Parent at Hill Learning Center" },
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
      {/* Hero */}
      <section className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#0066CC] text-sm font-semibold uppercase tracking-widest mb-3">Premier Kids Transportation</p>
          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">
            Safe rides for your<br />
            <span className="text-[#0066CC]">cherished cargo.</span>
          </h1>
          <p className="mt-5 text-gray-300 text-lg max-w-2xl leading-relaxed">
            Door-to-door transportation for kids — before and after school, individual rides, and group rides.
            Serving {SERVICE_AREAS}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={QUOTE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#0066CC] hover:bg-[#0052a3] text-white font-bold rounded-lg transition-colors"
            >
              Request a Quote
            </a>
            <Link
              href="/services"
              className="px-6 py-3 border border-gray-600 hover:border-gray-400 text-white font-semibold rounded-lg transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>WeeTramz</strong> is a Premier Transportation Service company whose goal is to provide a unique and
            extraordinary riding experience that caters to your kids' needs. We offer door-to-door service for your
            cherished cargo to and from designated locations to help ease the minds of busy parents. We offer individual
            before and after school drop-offs and pickups, along with group rides.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Founded by parents who understand the stress of juggling work and kids. WeeTramz founders have over 20 years
            of experience in operating successful children's transportation services. We concentrate on safety, good
            customer service, and delivering a pleasant TramzPortation experience to all of our riders and their parents.
          </p>
          <p className="font-semibold text-gray-900">
            Currently serving: {SERVICE_AREAS}.
          </p>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-10">How To Get Started</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <span className="text-4xl font-black text-[#0066CC]">{s.n}</span>
                <h3 className="mt-2 font-bold text-gray-900">{s.title}</h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href={QUOTE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#0066CC] hover:bg-[#0052a3] text-white font-bold rounded-lg transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-gray-900 mb-10">What Our Customers Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <blockquote key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <p className="text-gray-700 leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-3 text-sm font-semibold text-gray-500">— {t.source}</footer>
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

      {/* Driver Requirements */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black mb-2">Our Drivers Are Required To</h2>
          <p className="text-gray-400 mb-6">Your child&apos;s safety is our number one priority.</p>
          <ul className="space-y-3">
            {driverReqs.map((r) => (
              <li key={r} className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#0066CC] flex items-center justify-center">
                  <svg className="w-3 h-3 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                </span>
                <span className="text-gray-300">{r}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={QUOTE_URL} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#0066CC] hover:bg-[#0052a3] text-white font-semibold text-sm rounded-lg transition-colors">
              Request a Quote
            </a>
            <a href={`tel:${PHONE_HREF}`} className="px-5 py-2.5 border border-gray-600 hover:border-gray-400 text-white font-semibold text-sm rounded-lg transition-colors">
              Call Us
            </a>
            <a href={EMAIL_HREF} className="px-5 py-2.5 border border-gray-600 hover:border-gray-400 text-white font-semibold text-sm rounded-lg transition-colors">
              Email Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
