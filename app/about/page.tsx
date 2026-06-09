import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CtaStrip from "@/components/ui/CtaStrip";
import { EMAIL_HREF, PHONE, PHONE_HREF, QUOTE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About WeeTramz",
  description: "WeeTramz offers child transportation services in RTP, NC, and surrounding areas. With over 20 years of experience in operating successful children transportation services.",
};

const services = [
  { title: "Individual Rides", description: "Daily transportation for one child with one-way or roundtrip rides to and from school or a specific location." },
  { title: "Before & After School", description: "Daily transportation for one child to a designated before or after school facility." },
  { title: "Micro Rides", description: "A set number of kids with one-way or roundtrip rides to a single destination." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="About WeeTramz" subtitle="Founded by parents, built on 20+ years of experience." />

      {/* Who We Are */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-5">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>WeeTramz</strong> is a Premier Transportation Service company whose goal is to provide a unique and
            extraordinary riding experience that caters to your kids' needs. At WeeTramz we offer door-to-door service
            for your cherished cargo to and from designated locations to help ease the minds of busy parents. We offer
            individual before and after school drop-offs and pickups, along with group rides.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Founded by parents who understand the stress of juggling work and kids and the importance of making sure your
            kids are in good hands. WeeTramz founders have over 20 years of experience in operating successful
            children&apos;s transportation services. At WeeTramz we concentrate on safety, good customer service, and
            delivering a pleasant TramzPortation experience to all of our riders and their parents.
          </p>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="group bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:bg-[#0066CC] hover:border-[#0066CC] hover:-translate-y-2 transition-all duration-200 cursor-default"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-white transition-colors">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-600 group-hover:text-white leading-relaxed transition-colors">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-10 px-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div>
            <p className="font-semibold text-gray-900">
              Call us at{" "}
              <a href={PHONE_HREF} className="text-[#0066CC] hover:underline">{PHONE}</a>
              {" "}or email{" "}
              <a href={EMAIL_HREF} className="text-[#0066CC] hover:underline">info@WeeTramz.com</a>
            </p>
            <p className="text-sm text-gray-500 mt-1">Looking for safe and reliable transportation for your kids? WeeTramz is here.</p>
          </div>
          <a href={QUOTE_URL} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 px-5 py-2.5 bg-[#0066CC] hover:bg-[#0052a3] text-white font-semibold text-sm rounded-lg transition-colors">
            Get Started
          </a>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
