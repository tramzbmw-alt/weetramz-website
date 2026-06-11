"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { NAV_LINKS, PHONE_HREF, QUOTE_URL } from "@/lib/constants";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Blue accent bar */}
      <div className="h-1 w-full bg-[#2657f2]" />

      {/* Main nav — white */}
      <nav className="bg-white shadow-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="WeeTramz"
              width={160}
              height={50}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav — centered */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="text-sm font-medium text-gray-700 hover:text-[#2657f2] flex items-center gap-1 py-2 transition-colors"
                  >
                    {link.label}
                    <svg
                      className={`w-3 h-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setDropdownOpen(false)}
                          className="block px-5 py-3 text-sm text-gray-700 hover:bg-[#f5f7ff] hover:text-[#2657f2] transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-[#2657f2] transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <a
            href={QUOTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center px-5 py-2.5 font-semibold text-sm rounded-lg btn-gold"
          >
            Request a Quote
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <p className="pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">{link.label}</p>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block py-3 pl-3 text-sm text-gray-700 hover:text-[#2657f2] border-b border-gray-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3 text-sm font-medium text-gray-700 hover:text-[#2657f2] border-b border-gray-50"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <a
              href={PHONE_HREF}
              className="mt-3 block text-center py-3 text-sm font-semibold text-[#2657f2]"
            >
              (866) 933-5938
            </a>
            <a
              href={QUOTE_URL}
              className="mt-2 block text-center px-4 py-3 btn-gold font-semibold text-sm rounded-lg"
            >
              Request a Quote
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
