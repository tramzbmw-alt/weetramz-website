import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, MapPin, Bell, Map, Clock, Shield } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import CtaStrip from "@/components/ui/CtaStrip";

export const metadata: Metadata = {
  title: "WTz K'nected Tracking App",
  description: "WeeTramz introduces WTz K'nected — the first children's transportation service to use an AI-powered parent agent for real-time ride tracking and updates.",
};

const features = [
  { Icon: MessageCircle, title: "AI Parent Agent", body: "Ask anything — 'Where is the bus?' Accurate answers powered by Claude AI." },
  { Icon: MapPin, title: "Real-Time GPS", body: "Live vehicle location with dead-reckoning. Watch route progress step by step on an interactive map." },
  { Icon: Bell, title: "Smart Notifications", body: "Get push alerts when the route starts, when the bus is approaching your stop, and when your child arrives safely." },
  { Icon: Map, title: "Route Visibility", body: "See the full planned route, all stops, and live stop completions — before your child even boards." },
  { Icon: Clock, title: "ETA Updates", body: "Know exactly when to expect pickup or dropoff. Notifications adapt if anything changes on the route." },
  { Icon: Shield, title: "Secure Access", body: "Your account only shows your child's route. Private, secure, and accessible only to you." },
];

export default function TrackingAppPage() {
  return (
    <>
      <PageHero
        title="WTz K'nected"
        subtitle="The first children's transportation service with an AI-powered parent agent."
      />

      {/* ── AI AGENT HERO ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0066CC]/10 text-[#0066CC] text-xs font-bold mb-6">
              🏆 Industry First
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-5">
              Meet the WTz Agent —<br />
              <span className="text-[#0066CC]">AI for parents.</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              WeeTramz is the <strong>first children's transportation company</strong> to offer an AI-powered parent agent. Instead of wondering where your child is, just ask.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Powered by Claude AI, the WTz Agent knows your child's route in real time. It answers your questions conversationally — no app navigation, no refreshing, just answers.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                '"Where is the bus right now?"',
                '"When will it arrive at my stop?"',
                '"Is the route running late today?"',
                '"How long until pickup?"',
              ].map((q) => (
                <li key={q} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="text-[#0066CC] font-bold">→</span>
                  <span className="italic">{q}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://apps.apple.com/us/app/wtz-knected/id6744866998"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0d1b2a] hover:bg-[#0066CC] text-white text-sm font-bold rounded-lg transition-all"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                Download on App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.wtzknected"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0d1b2a] hover:bg-[#0066CC] text-white text-sm font-bold rounded-lg transition-all"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M3.18 23.76c.3.17.64.24.99.2l12.6-7.27-2.77-2.77-10.82 9.84zM.47 1.4C.18 1.72 0 2.2 0 2.82v18.36c0 .62.18 1.1.47 1.42l.07.07 10.28-10.28v-.24L.54 1.33.47 1.4zm21.37 9.03l-2.92-1.68-3.08 3.08 3.08 3.08 2.94-1.7c.84-.48.84-1.27-.02-1.78zm-19.1 12.33l12.62-7.28-2.77-2.77L2.47 22.4l.27.36z"/></svg>
                Get it on Google Play
              </a>
            </div>
          </div>
          {/* Right: mock chat UI */}
          <div className="bg-[#0d1b2a] rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
              <div className="w-8 h-8 rounded-full bg-[#0066CC] flex items-center justify-center text-white font-bold text-sm">W</div>
              <div>
                <div className="text-white text-sm font-bold">WTz Agent</div>
                <div className="flex items-center gap-1 text-xs text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Live — tracking active
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="bg-[#0066CC] text-white text-sm rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-xs">
                  Where is the bus right now?
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-[#0066CC]/20 flex items-center justify-center text-xs flex-shrink-0 mt-1">W</div>
                <div className="bg-white/10 text-gray-200 text-sm rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-xs">
                  The bus is currently on Alston Ave, about 3 stops away from your pickup. Expected arrival in <strong className="text-white">8 minutes</strong>.
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-[#0066CC] text-white text-sm rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-xs">
                  Is it running on time?
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-[#0066CC]/20 flex items-center justify-center text-xs flex-shrink-0 mt-1">W</div>
                <div className="bg-white/10 text-gray-200 text-sm rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-xs">
                  Yes — the route is running on schedule. All 3 previous stops completed ✓
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex gap-2">
              <div className="flex-1 bg-white/10 rounded-lg px-3 py-2 text-xs text-gray-500">Ask anything about your child's ride...</div>
              <button className="w-8 h-8 bg-[#0066CC] rounded-lg flex items-center justify-center text-white">→</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="py-20 px-6 bg-[#0A1628]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-bold text-[#0066CC] uppercase tracking-widest mb-2">APP FEATURES</p>
            <h2 className="text-2xl font-semibold text-white">Everything parents need. Nothing they don't.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ Icon, title, body }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#0066CC]" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold text-[#0066CC] uppercase tracking-widest mb-2">Getting Started</p>
            <h2 className="text-2xl font-semibold text-gray-900">Up and running in minutes.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: "01", title: "Receive your invite", body: "WeeTramz sends you a secure email invitation when your service begins." },
              { n: "02", title: "Set up your account", body: "Click the link, create your password, and you're in — no complicated setup." },
              { n: "03", title: "Download & track", body: "Download WTz K'nected, sign in, and start tracking your child's rides in real time." },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <div className="text-6xl font-black text-[#0066CC]/10 leading-none mb-3">{s.n}</div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
