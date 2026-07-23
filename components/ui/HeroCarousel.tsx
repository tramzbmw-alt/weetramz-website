"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const slides = [
  {
    src: "https://images.pexels.com/photos/8457621/pexels-photo-8457621.jpeg",
    alt: "Happy kids heading to school — WeeTramz premium kids transportation",
  },
  {
    src: "/images/van-hero-front_hero.png",
    alt: "WeeTramz private van at Raleigh-Durham International Airport departures area.",
    objectFit: "contain" as const,
    background: "#0A1628",
  },
  {
    src: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800",
    alt: "Professional driver providing safe transportation",
  },
  {
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
    alt: "Parent using phone to track their child's ride",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, next]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-2xl"
      style={{ height: "clamp(280px, 80vw, 520px)", background: "#2657f2" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, background: slide.background }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full"
            style={{ objectFit: slide.objectFit ?? "cover" }}
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(10,22,40,0.5) 0%, transparent 60%)" }}
      />
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)" }}
      />

      {/* Prev arrow */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-100 opacity-60"
        style={{ background: "rgba(10,22,40,0.75)", border: "1px solid rgba(255,255,255,0.2)" }}
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-100 opacity-60"
        style={{ background: "rgba(10,22,40,0.75)", border: "1px solid rgba(255,255,255,0.2)" }}
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? "20px" : "6px",
              height: "6px",
              background: i === current ? "white" : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
