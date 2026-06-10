import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CtaStrip from "@/components/ui/CtaStrip";

export const metadata: Metadata = {
  title: "Passenger Safety & Behavior Policy",
  description: "WeeTramz passenger safety and behavior policy for all riders.",
};

const rules = [
  "Seat belts are to be worn at all times.",
  "While the vehicle is moving, passengers must remain seated.",
  "Passengers shall not board or depart the vehicle until it has come to a complete stop and the driver has opened the door.",
  "During pick up, transport, and delivery, passengers must obey the driver. In some instances, assigned seats may be noted.",
  "Throwing objects inside and outside the vehicle is prohibited and may result in suspension or termination of services.",
  "Head, hands, and arms must remain in the vehicle at all times.",
  "Destroying company property or personal property of others is strictly prohibited. Parents/Guardians are financially liable for any damages caused by their child(ren).",
  "Passengers and parents must be respectful and courteous to others. Inappropriate behavior including vulgar or profane language is prohibited and may result in suspension or termination of services.",
  "No bullying will be tolerated and will result in termination of services — no exception.",
  "No horseplay or any misbehavior that could cause injury to another person or to self will be tolerated and may result in suspension or termination of services.",
  "No gum, eating, or drinking in the vehicle.",
  "No medicines will be dispensed on the vehicle by any driver.",
  "Smoking is strictly prohibited on, near, or around the vehicles.",
  "WeeTramz is not liable for any missing or damaged items left on a WeeTramz vehicle.",
];

export default function SafetyPolicyPage() {
  return (
    <>
      <PageHero title="Passenger Safety & Behavior Policy" subtitle="Rules all riders and families are expected to follow." />
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <ul className="space-y-4">
            {rules.map((rule, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#0066CC] flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                </span>
                <span className="text-gray-700 leading-relaxed">{rule}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm font-bold text-red-800">NO REFUNDS WILL BE ISSUED FOR SUSPENSION OR TERMINATION OF SERVICES FOR ANY OF THE VIOLATIONS ABOVE.</p>
          </div>
        </div>
      </section>
      <CtaStrip />
    </>
  );
}
