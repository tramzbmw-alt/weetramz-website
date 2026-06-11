import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ChatTriggerButton from "@/components/ui/ChatTriggerButton";
import { EMAIL, EMAIL_HREF, PHONE, PHONE_HREF } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact WeeTramz for more information about our child transportation services.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" subtitle="We're here to help." />

      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-3 text-[#2657f2]">Get in Touch</p>
          <h2
            className="font-black text-gray-900 mb-4"
            style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "2rem", lineHeight: 1.15 }}
          >
            Three ways to reach us.
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-12">
            Have a question? We&apos;d love to hear from you. Reach out by phone, email, or chat directly with our AI assistant for instant answers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Call */}
            <a
              href={PHONE_HREF}
              className="group flex flex-col gap-4 p-7 rounded-2xl border border-gray-100 shadow-sm hover:border-[#2657f2] hover:shadow-md transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#f5f7ff] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2657f2] transition-colors">
                <svg className="w-5 h-5 text-[#2657f2] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Call Us</p>
                <p className="font-bold text-gray-900 text-sm">{PHONE}</p>
                <p className="text-xs text-gray-400 mt-1">Mon–Fri, 6:00am–7:00pm</p>
              </div>
              <span className="text-xs font-bold text-[#2657f2] mt-auto">Tap to call →</span>
            </a>

            {/* Email */}
            <a
              href={EMAIL_HREF}
              className="group flex flex-col gap-4 p-7 rounded-2xl border border-gray-100 shadow-sm hover:border-[#2657f2] hover:shadow-md transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-[#f5f7ff] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2657f2] transition-colors">
                <svg className="w-5 h-5 text-[#2657f2] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Email Us</p>
                <p className="font-bold text-gray-900 text-sm">{EMAIL}</p>
                <p className="text-xs text-gray-400 mt-1">We reply within 1 business day</p>
              </div>
              <span className="text-xs font-bold text-[#2657f2] mt-auto">Send an email →</span>
            </a>

            {/* Chat */}
            <ChatTriggerButton className="group flex flex-col gap-4 p-7 rounded-2xl border border-gray-100 shadow-sm hover:border-[#2657f2] hover:shadow-md transition-all duration-200 text-left w-full cursor-pointer">
              <div className="w-11 h-11 rounded-xl bg-[#f5f7ff] flex items-center justify-center flex-shrink-0 group-hover:bg-[#2657f2] transition-colors">
                <svg className="w-5 h-5 text-[#2657f2] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Chat with Us</p>
                <p className="font-bold text-gray-900 text-sm">WTz Agent</p>
                <p className="text-xs text-gray-400 mt-1">Instant answers, powered by AI</p>
              </div>
              <span className="text-xs font-bold text-[#2657f2] mt-auto">Start a chat →</span>
            </ChatTriggerButton>
          </div>
        </div>
      </section>
    </>
  );
}
