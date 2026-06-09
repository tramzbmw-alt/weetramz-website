import { EMAIL, EMAIL_HREF, PHONE, PHONE_HREF, QUOTE_URL } from "@/lib/constants";

export default function CtaStrip() {
  return (
    <section className="bg-[#0066CC] py-10 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gray-900 font-semibold text-lg">
          Call us at{" "}
          <a href={PHONE_HREF} className="underline underline-offset-2">{PHONE}</a>
          {" "}or email{" "}
          <a href={EMAIL_HREF} className="underline underline-offset-2">{EMAIL}</a>
        </p>
        <p className="mt-1 text-gray-800 text-sm">
          Looking for safe and reliable transportation for your kids? WeeTramz is here.
        </p>
        <a
          href={QUOTE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm rounded-lg transition-colors"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
