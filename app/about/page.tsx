import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CtaStrip from "@/components/ui/CtaStrip";

export const metadata: Metadata = {
  title: "About WeeTramz",
  description: "WeeTramz offers child transportation services in RTP, NC, and surrounding areas. With over 20 years of experience in operating successful children transportation services.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero title="About WeeTramz" subtitle="Founded by parents, built on 20+ years of experience." />

      {/* Who We Are */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 mb-8">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            <strong>WeeTramz</strong> is a Premier Transportation Service company whose goal is to provide a unique and
            extraordinary riding experience that caters to your kids&apos; needs. At WeeTramz we offer door-to-door service
            for your cherished cargo to and from designated locations to help ease the minds of busy parents. We offer
            individual before and after school drop-offs and pickups, along with group rides.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg">
            Founded by parents who understand the stress of juggling work and kids and the importance of making sure your
            kids are in good hands. WeeTramz founders have over 20 years of experience in operating successful
            children&apos;s transportation services. At WeeTramz we concentrate on safety, good customer service, and
            delivering a pleasant TramzPortation experience to all of our riders and their parents.
          </p>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
