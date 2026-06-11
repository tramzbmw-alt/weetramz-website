import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CtaStrip from "@/components/ui/CtaStrip";
import FaqAccordion from "@/components/ui/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about WeeTramz child transportation services — service area, safety, billing, and more.",
};

const faqGroups = [
  {
    category: "Service Area",
    items: [
      {
        q: "What is your service area?",
        a: "We service RTP, Raleigh, Durham, Cary, and surrounding cities.",
      },
      {
        q: "What are your hours of operation?",
        a: "Our hours are Monday–Friday from 6:00am to 7:00pm. Upon request, weekend group trips are available.",
      },
    ],
  },
  {
    category: "Safety & Drivers",
    items: [
      {
        q: "How do you select your drivers?",
        a: "Your child's safety is our number one priority. All WeeTramz drivers are carefully selected and vetted.",
      },
      {
        q: "What type of security checks do your drivers go through?",
        a: "We conduct driver's license checks, criminal background checks, and drug tests on all of our drivers. Once hired, drivers are subject to random drug tests.",
      },
      {
        q: "Does WeeTramz have safety equipment on each vehicle?",
        a: "All WeeTramz vehicles are equipped with seat belts, cell phones, first aid kits, and fire extinguishers.",
      },
      {
        q: "Do all vehicles have real-time GPS tracking?",
        a: "Our vehicles are equipped with real-time GPS trackers with automatic replay. Our vehicles can be tracked at all times and are monitored during all pickups and drop-offs.",
      },
      {
        q: "How will my child know who is picking them up?",
        a: "Our vehicles will be identifiable, and our drivers will be wearing a WeeTramz shirt.",
      },
      {
        q: "What happens if my child isn't at the designated pickup location?",
        a: "The driver will first contact the office dispatcher who will then contact the student's school to ensure the student was present. If the student was present, the dispatcher will contact the parent. Should the parent be unreachable, the dispatcher contacts the secondary emergency contact. The driver will not leave until the whereabouts of the child are known.",
      },
    ],
  },
  {
    category: "Getting Started",
    items: [
      {
        q: "How do I request a pickup?",
        a: "Once you've contacted us via the contact form or by phone, a WeeTramz Representative will schedule an initial consultation. Once it's determined you're a good fit for the WeeTramz family, you'll be contacted to discuss customized rates. Once your request is scheduled, confirmed, and payment received, your child's journey can begin.",
      },
      {
        q: "Are your vehicles equipped to handle disabled children?",
        a: "At the present time, our vehicles are not equipped to handle disabled children. As we grow, consideration will be given to adding this type of vehicle to our fleet.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    items: [
      {
        q: "Do you accept cash?",
        a: "No, all payments are paid online via debit/credit card. However, drivers can receive tips if you feel your driver deserves one.",
      },
      {
        q: "How am I billed?",
        a: "All services are billed weekly or monthly via email depending on the type of services requested. The payment schedule will be discussed at the initial consultation. Payment must be received before transportation services are rendered.",
      },
    ],
  },
  {
    category: "Policies",
    items: [
      {
        q: "Will I be charged if I cancel?",
        a: "All cancellations require a 24-hour notice. If cancellation is not made and confirmed by WeeTramz, a no-show fee will be charged. Please see our policy page.",
      },
    ],
  },
];

export default function FaqsPage() {
  return (
    <>
      <PageHero title="Frequently Asked Questions" subtitle="Everything you need to know about WeeTramz." />

      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <FaqAccordion groups={faqGroups} />
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
