import { EMAIL_HREF, PHONE, PHONE_HREF, QUOTE_URL } from "@/lib/constants";

export default function CtaStrip() {
  return (
    <section className="py-14 px-6" style={{ background: "#0A1628" }}>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}>
            Ready to get your kids moving?
          </p>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
            Call{" "}
            <a href={PHONE_HREF} className="underline hover:text-white transition-colors" style={{ color: "#C4962A" }}>
              {PHONE}
            </a>{" "}
            or{" "}
            <a href={EMAIL_HREF} className="underline hover:text-white transition-colors" style={{ color: "#C4962A" }}>
              email us
            </a>{" "}
            anytime.
          </p>
        </div>
        <a
          href={QUOTE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold flex-shrink-0 px-6 py-3 font-bold text-sm rounded-lg"
        >
          Request a Quote
        </a>
      </div>
    </section>
  );
}
