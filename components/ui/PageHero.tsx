interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-[#0a0a0a] text-white py-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px"}} />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066CC] opacity-10 blur-[100px] rounded-full" />
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-3xl md:text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="mt-3 text-gray-400 text-lg max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
