import { EMAIL_HREF, PHONE, PHONE_HREF, QUOTE_URL } from "@/lib/constants";

export default function CtaStrip() {
  return (
    <section className="bg-[#0066CC] py-12 px-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-white font-bold text-lg">Ready to get your kids moving?</p>
          <p className="text-blue-200 text-sm mt-1">
            Call <a href={PHONE_HREF} className="underline">{PHONE}</a> or{" "}
            <a href={EMAIL_HREF} className="underline">email us</a> anytime.
          </p>
        </div>
        <a
          href={QUOTE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 px-6 py-3 bg-white hover:bg-gray-100 text-[#0066CC] font-bold text-sm rounded-lg transition-colors"
        >
          Request a Quote
        </a>
      </div>
    </section>
  );
}
