interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-gray-900 text-white py-14 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">{title}</h1>
        {subtitle && (
          <p className="mt-3 text-gray-400 text-lg max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
