'use client';

import { useState } from 'react';
import ShuttleFareCalc from '@/components/ui/ShuttleFareCalc';

const inputCls = `w-full px-4 py-3 rounded-lg text-sm text-gray-800 outline-none transition-all bg-white`;
const inputStyle: React.CSSProperties = {
  border: '1.5px solid rgba(38,87,242,0.25)',
  fontFamily: 'inherit',
};

export default function ShuttleBookingPage() {
  const [direction, setDirection] = useState<'to' | 'from'>('to');
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    pickup: '', date: '', time: '', passengers: '', notes: '',
    flightNumber: '', airline: '',
  });
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [submitError, setSubmitError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  function set(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/shuttle-booking', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, direction, estimatedFare }),
      });
      if (!res.ok) {
        const d = await res.json();
        setSubmitError(d.error || 'Submission failed. Please try again.');
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitError('Network error — please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="py-20 px-6" style={{ background: '#0A1628' }}>
        <div className="max-w-3xl mx-auto text-center text-white">
          <p className="text-xs font-bold uppercase tracking-widest mb-3 text-white/50">RDU Airport Shuttle</p>
          <h1
            className="font-black mb-5"
            style={{ fontFamily: 'var(--font-playfair, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Book Your Ride
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            Private 10 to 14 passenger van. To RDU or from RDU. Flat-rate pricing, door-to-door service. Advance booking required.
          </p>
          <p className="text-xs text-white/35 mt-3">
            10 passengers with full luggage space · Up to 14 passengers with carry-on only
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="py-16 px-6 bg-[#f5f7ff]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — booking form */}
          <div className="bg-white rounded-2xl shadow-sm p-8" style={{ border: '1px solid rgba(38,87,242,0.15)' }}>
            {submitted ? (
              <div className="text-center py-8">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: '#f0fdf4', border: '2px solid #86efac' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="font-bold text-gray-900 text-xl mb-2" style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}>
                  Request Received
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  We&apos;ll review your booking request and follow up at {form.email} within a few hours to confirm your ride and final fare.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2
                    className="font-bold text-gray-900 text-lg mb-1"
                    style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}
                  >
                    Your Booking Request
                  </h2>
                  <p className="text-xs text-gray-400">All fields marked * are required.</p>
                </div>

                {/* Direction */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Direction *</label>
                  <div className="flex rounded-lg overflow-hidden" style={{ border: '1.5px solid rgba(38,87,242,0.25)' }}>
                    {(['to', 'from'] as const).map(d => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDirection(d)}
                        className="flex-1 py-2.5 text-sm font-semibold transition-colors"
                        style={direction === d
                          ? { background: '#2657f2', color: '#fff' }
                          : { background: '#fff', color: '#6b7280' }}
                      >
                        {d === 'to' ? 'To RDU' : 'From RDU'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">First Name *</label>
                    <input type="text" required value={form.firstName} onChange={set('firstName')} className={inputCls} style={inputStyle} />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Last Name *</label>
                    <input type="text" required value={form.lastName} onChange={set('lastName')} className={inputCls} style={inputStyle} />
                  </div>
                </div>

                {/* Contact */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Email *</label>
                    <input type="email" required value={form.email} onChange={set('email')} className={inputCls} style={inputStyle} />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Phone</label>
                    <input type="tel" value={form.phone} onChange={set('phone')} className={inputCls} style={inputStyle} />
                  </div>
                </div>

                {/* Pickup */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                    {direction === 'to' ? 'Pickup Address *' : 'Drop-off Address *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.pickup}
                    onChange={set('pickup')}
                    placeholder="Street address, city, ZIP"
                    className={inputCls}
                    style={inputStyle}
                  />
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Date *</label>
                    <input type="date" required min={today} value={form.date} onChange={set('date')} className={inputCls} style={inputStyle} />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Time *</label>
                    <input type="time" required value={form.time} onChange={set('time')} className={inputCls} style={inputStyle} />
                  </div>
                </div>

                {/* Passengers */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Passengers</label>
                  <select value={form.passengers} onChange={set('passengers')} className={inputCls} style={inputStyle}>
                    <option value="">Select…</option>
                    {Array.from({ length: 14 }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{n} passenger{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                {/* Flight info */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Airline</label>
                    <input type="text" value={form.airline} onChange={set('airline')} placeholder="e.g. American" className={inputCls} style={inputStyle} />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Flight Number</label>
                    <input type="text" value={form.flightNumber} onChange={set('flightNumber')} placeholder="e.g. AA1234" className={inputCls} style={inputStyle} />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Additional Notes</label>
                  <textarea
                    value={form.notes}
                    onChange={set('notes')}
                    rows={3}
                    placeholder="Special requirements, luggage details…"
                    className={inputCls}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                {submitError && (
                  <p className="text-sm text-red-600 rounded-lg px-4 py-3" style={{ background: '#fef2f2', border: '1px solid #fca5a5' }}>
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-lg text-sm font-bold text-white transition-colors btn-blue"
                >
                  {submitting ? 'Submitting…' : 'Submit Booking Request'}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  We&apos;ll confirm availability and final fare within a few hours.
                </p>
              </form>
            )}
          </div>

          {/* Right — fare calculator */}
          <div className="space-y-6">
            <ShuttleFareCalc onFareResult={setEstimatedFare} />
            <div className="rounded-xl p-5 bg-white shadow-sm" style={{ border: '1px solid rgba(38,87,242,0.12)' }}>
              <p className="text-xs font-bold uppercase tracking-widest text-[#2657f2] mb-3">What&apos;s Included</p>
              <ul className="space-y-2">
                {[
                  'Private 10 to 14 passenger van — your group only',
                  'Door-to-door pickup and drop-off',
                  'To RDU or from RDU, same flat rate',
                  'Driver monitors flight status',
                  'Luggage assistance included',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2657f2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
