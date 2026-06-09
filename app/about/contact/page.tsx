import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { EMAIL, EMAIL_HREF, PHONE, PHONE_HREF, QUOTE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact WeeTramz for more information about our child transportation services.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" subtitle="We'd love to hear from you." />
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h2 className="text-lg font-black text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Thank you for your interest in WeeTramz! For more information about our services, please feel free to
              contact us directly with any questions you may have.
            </p>
            <dl className="space-y-4">
              <div>
                <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone</dt>
                <dd className="mt-1">
                  <a href={PHONE_HREF} className="text-gray-900 font-semibold hover:text-yellow-600">{PHONE}</a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</dt>
                <dd className="mt-1">
                  <a href={EMAIL_HREF} className="text-gray-900 font-semibold hover:text-yellow-600">{EMAIL}</a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Hours</dt>
                <dd className="mt-1 text-gray-700">Monday–Friday, 6:00am–7:00pm</dd>
              </div>
            </dl>
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-semibold text-gray-900">Ready to get started?</p>
              <p className="text-sm text-gray-600 mt-1">Use our quote agent to request service — it takes just a few minutes.</p>
              <a href={QUOTE_URL} target="_blank" rel="noopener noreferrer"
                className="mt-3 inline-block px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold text-sm rounded-lg transition-colors">
                Request a Quote
              </a>
            </div>
          </div>

          {/* Contact form placeholder — to be wired with a form API */}
          <div>
            <h2 className="text-lg font-black text-gray-900 mb-4">Send a Message</h2>
            <p className="text-sm text-gray-500 mb-4">
              To request transportation service, please use the{" "}
              <a href={QUOTE_URL} target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline font-medium">
                Quote Agent
              </a>
              . For general questions, reach us by phone or email above.
            </p>
            {/* TODO: Wire up contact form with Resend/SendGrid API route */}
            <div className="rounded-xl border-2 border-dashed border-gray-200 p-8 text-center text-gray-400 text-sm">
              Contact form coming soon.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
