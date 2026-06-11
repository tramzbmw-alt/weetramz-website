interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="text-white py-20 px-6 relative overflow-hidden" style={{ background: "#0A1628" }}>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-20" style={{ background: "#C4962A" }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[80px] opacity-10" style={{ background: "#0066CC" }} />
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <h1
          className="text-4xl md:text-5xl font-black tracking-tight"
          style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
            {subtitle}
          </p>
        )}
        <div className="mt-6 w-12 h-0.5 mx-auto" style={{ background: "#C4962A" }} />
      </div>
    </section>
  );
}
