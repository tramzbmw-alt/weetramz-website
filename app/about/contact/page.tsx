import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/ui/ContactForm";
import { EMAIL, EMAIL_HREF, PHONE, PHONE_HREF, QUOTE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact WeeTramz for more information about our child transportation services.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" subtitle="We'd love to hear from you." />
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h2 className="text-xl font-black text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              Have a question about our services? We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.
            </p>
            <dl className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#f5f7ff] flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#0066CC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Phone</dt>
                  <dd className="mt-0.5"><a href={PHONE_HREF} className="text-gray-900 font-semibold hover:text-[#0066CC] transition-colors">{PHONE}</a></dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#f5f7ff] flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#0066CC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</dt>
                  <dd className="mt-0.5"><a href={EMAIL_HREF} className="text-gray-900 font-semibold hover:text-[#0066CC] transition-colors">{EMAIL}</a></dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#f5f7ff] flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#0066CC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Hours</dt>
                  <dd className="mt-0.5 text-gray-900 font-semibold">Monday–Friday, 6:00am–7:00pm</dd>
                </div>
              </div>
            </dl>
            <div className="mt-8 p-5 bg-[#f5f7ff] border border-[#0066CC]/20 rounded-xl">
              <p className="text-sm font-bold text-gray-900">Ready to get started?</p>
              <p className="text-sm text-gray-600 mt-1">Use our AI-powered quote agent — it takes just a few minutes.</p>
              <a href={QUOTE_URL} target="_blank" rel="noopener noreferrer"
                className="mt-3 inline-block px-4 py-2 bg-[#0066CC] hover:bg-[#0052a3] text-white font-semibold text-sm rounded-lg transition-colors">
                Request a Quote →
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="text-xl font-black text-gray-900 mb-6">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
