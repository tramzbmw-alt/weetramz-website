import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CtaStrip from "@/components/ui/CtaStrip";

export const metadata: Metadata = {
  title: "Tracking App",
  description: "Manage, track, and ensure the safety of your child with our BusWhere smart technology tracking app.",
};

const reasons = [
  { n: 1, title: "Reduced wait time", body: "No more standing out in bad weather wondering 'where's my ride?' Bus tracking tells you exactly when your vehicle will arrive so you can reduce stress and make better use of your time." },
  { n: 2, title: "Safe waiting", body: "Group stops are generally near heavily trafficked areas. The major way to make the stop safer is by reducing the time your children wait for a vehicle." },
  { n: 3, title: "Notifications", body: "Schools have an easy way to notify parents of any changes or incidents such as delayed departure or a flat tire. One click allows the school to keep parents informed — even from cell phones." },
  { n: 4, title: "Real-time GPS", body: "BusWhere has a 5-second refresh for a true real-time experience. Know where your child's vehicle is at every moment." },
];

export default function TrackingAppPage() {
  return (
    <>
      <PageHero title="BusWhere Tracking App" subtitle="Safety is our number one priority — track your child's ride in real time." />

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 leading-relaxed max-w-2xl">
            WeeTramz is proud to partner with <strong>BusWhere</strong>, a well-known bus tracking application that
            provides our customers with instant information on the location of our vehicles as well as the ETA for
            every stop. You will know exactly when to expect your vehicle and your smartphone will receive updates if
            anything changes. Set up is easy with your confidential username and password.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="https://apps.apple.com/us/app/buswhere-school-bus-tracking/id894393289"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              App Store
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.buswhere.schools&hl=en_US"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M3.18 23.76c.3.17.64.24.99.2l12.6-7.27-2.77-2.77-10.82 9.84zM.47 1.4C.18 1.72 0 2.2 0 2.82v18.36c0 .62.18 1.1.47 1.42l.07.07 10.28-10.28v-.24L.54 1.33.47 1.4zm21.37 9.03l-2.92-1.68-3.08 3.08 3.08 3.08 2.94-1.7c.84-.48.84-1.27-.02-1.78zm-19.1 12.33l12.62-7.28-2.77-2.77L2.47 22.4l.27.36z"/></svg>
              Google Play
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-black text-gray-900 mb-8">Why Parents Love BusWhere</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((r) => (
              <div key={r.n} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <span className="text-3xl font-black text-yellow-400">{r.n}</span>
                <h3 className="mt-1 font-bold text-gray-900">{r.title}</h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
