import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import CtaStrip from "@/components/ui/CtaStrip";
import { QUOTE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description: "WeeTramz offers Individual Rides, Before and After School pickup, and Micro Rides for kids in the RTP area.",
};

const services = [
  {
    title: "Individual Rides",
    description: "Daily transportation for one child with one-way or roundtrip rides to and from school or a specific location.",
  },
  {
    title: "Before & After School",
    description: "Daily transportation for one child to a designated before or after school facility.",
  },
  {
    title: "Micro Rides",
    description: "A set number of kids traveling one-way or roundtrip to a single destination — great for groups.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero title="Services" subtitle="Door-to-door transportation options built around your family's schedule." />

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="group rounded-xl border border-gray-100 shadow-sm p-6 hover:bg-[#0066CC] hover:border-[#0066CC] hover:-translate-y-2 transition-all duration-200 cursor-default">
              <h2 className="font-black text-gray-900 text-lg group-hover:text-white transition-colors">{s.title}</h2>
              <p className="mt-2 text-sm text-gray-600 group-hover:text-white leading-relaxed transition-colors">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tracking App callout */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-black text-gray-900">Safety is our number one priority</h2>
            <p className="mt-2 text-gray-600">
              Manage, track, and ensure the safety of your child with our smart technology tracking app.
            </p>
            <Link href="/tracking-app" className="mt-4 inline-block text-sm font-semibold text-[#0066CC] hover:underline">
              Learn about the WTz K'nected App →
            </Link>
          </div>
          <a
            href={QUOTE_URL}
            target="_blank"
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
