# WeeTramz Website — Claude Code Context

READ THIS before writing any code or making any changes.

## Project Overview
Migrating weetramz.com from WordPress (Bluehost) to Next.js on Vercel.
Preview URL: https://weetramz-website.vercel.app
Repo: github.com/tramzbmw-alt/weetramz-website
Stack: Next.js 16, TypeScript, Tailwind CSS v4, Vercel

## File Structure
app/page.tsx                     → / (homepage)
app/layout.tsx                   → root layout (Inter font, Header, Footer)
app/globals.css                  → global styles
app/about/page.tsx               → /about
app/about/testimonials/page.tsx  → /about/testimonials
app/about/policy/page.tsx        → /about/policy
app/about/safety-policy/page.tsx → /about/safety-policy
app/about/contact/page.tsx       → /about/contact
app/services/page.tsx            → /services
app/faqs/page.tsx                → /faqs
app/tracking-app/page.tsx        → /tracking-app
app/request-a-quote/page.tsx     → redirects to quote.weetramz.com
app/api/contact/route.ts         → Resend email API route
components/layout/Header.tsx     → sticky header, navy strip, click dropdown
components/layout/Footer.tsx     → dark footer, social icons, phone
components/ui/PageHero.tsx       → dark navy hero for all inner pages
components/ui/CtaStrip.tsx       → blue CTA strip at bottom of pages
components/ui/ContactForm.tsx    → client component, sends via /api/contact
lib/constants.ts                 → phone, email, quote URL, nav links
lib/metadata.ts                  → default SEO metadata
public/images/                   → logo.png, favicon.png, hero image

## Brand Colors
Primary Blue:   #0066CC
Blue Dark:      #0052a3 (hover)
Navy:           #0d1b2a (hero/dark sections)
White:          #ffffff
Light Blue BG:  #f5f7ff
Body text:      #111111
Gray text:      #4B5563 (text-gray-600)

## Typography — Inter font via next/font/google
Hero headline:    text-5xl md:text-6xl font-black (homepage only)
Page hero titles: text-4xl md:text-5xl font-black (PageHero component)
Section headings: text-2xl font-semibold
Card titles:      text-lg or text-xl font-bold
Body:             text-sm or text-base font-normal
Labels/eyebrows:  text-xs font-bold uppercase tracking-widest text-[#0066CC]

## Key Rules
1. ALL quote CTAs link to https://quote.weetramz.com — never build a quote form
2. Phone number in FOOTER ONLY — not in header
3. Social icons in FOOTER ONLY — not in header
4. Header must stay sticky — sticky top-0 z-50
5. PageHero background must stay #0d1b2a — not black
6. Service cards use group/group-hover for blue inversion on hover
7. Contact form sends from noreply@weetramz.com to info@weetramz.com via Resend
8. RESEND_API_KEY is set in Vercel env vars and .env.local

## Hover Card Pattern
<div className="group bg-white rounded-xl p-6 border border-gray-100 shadow-sm
  hover:bg-[#0066CC] hover:border-[#0066CC] hover:-translate-y-2
  transition-all duration-200 cursor-default">
  <h3 className="font-bold text-gray-900 group-hover:text-white transition-colors">Title</h3>
  <p className="text-sm text-gray-600 group-hover:text-white transition-colors">Description</p>
</div>

## Deployment
Push to master → Vercel auto-deploys
Always run npm run build locally before pushing
Vercel project: weetramz-website (wtz-projects team)

## What NOT to Touch
- quote.weetramz.com — separate Vercel deployment
- Bluehost DNS (MX, SPF, DKIM, DMARC, quote CNAME)
- WordPress at weetramz.com — still live until DNS cutover

## Pending
- DNS cutover to weetramz.com (not yet)
- Update tracking app store links when WTz K'nected launches
- Replace hero stock photo with real WeeTramz photo
- Adult Transportation page when service launches
