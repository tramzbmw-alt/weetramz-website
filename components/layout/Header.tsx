"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { NAV_LINKS, PHONE_HREF, QUOTE_URL } from "@/lib/constants";

const ChevronDown = ({ open }: { open?: boolean }) => (
  <svg
    className={`w-3 h-3 flex-shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  // Tracks which nav item's children are expanded in the mobile menu
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);

  function closeMobile() {
    setMenuOpen(false);
    setMobileOpen(null);
  }

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Accent bar */}
      <div className="h-1 w-full bg-[#2657f2]" />

      {/* Main nav */}
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

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) =>
              link.children ? (
                // Dropdown — opens on hover via CSS group-hover, no JS state needed
                <div key={link.label} className="relative group">
                  <button
                    className="text-sm font-medium text-gray-700 group-hover:text-[#2657f2] flex items-center gap-1 py-2 transition-colors"
                    // Keep click handler so keyboard/touch users can open it too
                    tabIndex={0}
                  >
                    {link.label}
                    <ChevronDown />
                  </button>

                  {/* Dropdown panel — hidden by default, shown on group hover */}
                  <div className="absolute top-full left-0 pt-1 hidden group-hover:block">
                    <div className="w-64 bg-white border border-gray-100 rounded-xl shadow-xl py-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-2.5 px-5 py-3 text-sm text-gray-700 hover:bg-[#f5f7ff] hover:text-[#2657f2] transition-colors"
                        >
                          {child.label === "RDU Airport Shuttle" && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-[#2657f2]">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/>
                            </svg>
                          )}
                          {child.label === "Children's Transportation" && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-[#2657f2]">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                              <circle cx="9" cy="7" r="4"/>
                              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                          )}
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
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

          {/* Desktop CTA */}
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
            onClick={() => { setMenuOpen(!menuOpen); setMobileOpen(null); }}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label}>
                  {/* Tappable section header — toggles children */}
                  <button
                    className="w-full flex items-center justify-between pt-3 pb-2 text-sm font-semibold text-gray-700 border-b border-gray-50"
                    onClick={() => setMobileOpen(mobileOpen === link.label ? null : link.label)}
                  >
                    {link.label}
                    <ChevronDown open={mobileOpen === link.label} />
                  </button>
                  {mobileOpen === link.label && (
                    <div className="pl-3 pb-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2.5 text-sm text-[#2657f2] font-medium border-b border-gray-50"
                          onClick={closeMobile}
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
                  className="block py-3 text-sm font-medium text-gray-700 hover:text-[#2657f2] border-b border-gray-50"
                  onClick={closeMobile}
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
