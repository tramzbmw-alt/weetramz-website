'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import ShuttleFareCalc from '@/components/ui/ShuttleFareCalc';
import TimePicker from '@/components/ui/TimePicker';

// ── Pricing tier logic (mirrors ShuttleFareCalc.tsx — keep in sync) ──────────

type PricingTier = 'standard' | 'weekend' | 'peak';

function getThanksgiving(year: number): Date {
  let count = 0;
  const d = new Date(year, 10, 1);
  while (d.getMonth() === 10) {
    if (d.getDay() === 4) { count++; if (count === 4) return new Date(d); }
    d.setDate(d.getDate() + 1);
  }
  return new Date(year, 10, 28);
}

function getPricingTier(dateStr: string): PricingTier {
  const d     = new Date(dateStr + 'T12:00:00');
  const month = d.getMonth() + 1;
  const day   = d.getDate();
  const dow   = d.getDay();
  const year  = d.getFullYear();
  const turkey    = getThanksgiving(year);
  const thanksSun = new Date(turkey);
  thanksSun.setDate(turkey.getDate() - turkey.getDay());
  const thanksSat = new Date(thanksSun);
  thanksSat.setDate(thanksSun.getDate() + 6);
  const dNoon = d.getTime();
  const isPeak =
    (month === 7  && day >= 1  && day <= 7)  ||
    (dNoon >= thanksSun.getTime() && dNoon <= thanksSat.getTime()) ||
    (month === 12 && day >= 20) ||
    (month === 1  && day <= 2)  ||
    (month === 3  && day >= 15) ||
    (month === 4  && day <= 5);
  if (isPeak) return 'peak';
  if (dow === 5 || dow === 6 || dow === 0) return 'weekend';
  return 'standard';
}

const TIER_LABELS: Record<PricingTier, string> = {
  standard: 'Standard rate',
  weekend:  'Weekend rate applies (+10%)',
  peak:     'Peak holiday rate applies (+15%)',
};

const TIER_MULTIPLIERS: Record<PricingTier, number> = {
  standard: 1.00,
  weekend:  1.10,
  peak:     1.15,
};

// ── Styles ────────────────────────────────────────────────────────────────────

const inputCls = `w-full px-4 py-3 rounded-lg text-sm text-gray-800 outline-none transition-all bg-white`;
const inputStyle: React.CSSProperties = { border: '1.5px solid rgba(38,87,242,0.25)', fontFamily: 'inherit' };

// ── Stepper ───────────────────────────────────────────────────────────────────

function Stepper({
  icon, value, min, max, onChange,
}: { icon: React.ReactNode; value: number; min: number; max: number; onChange: (n: number) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ color: '#9ca3af', flexShrink: 0 }}>{icon}</span>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        style={{
          width: 36, height: 36, borderRadius: '50%', border: '1.5px solid rgba(38,87,242,0.25)',
          background: '#fff', fontSize: 20, lineHeight: 1, cursor: value <= min ? 'default' : 'pointer',
          color: value <= min ? '#d1d5db' : '#2657f2', fontFamily: 'inherit', display: 'flex',
          alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}
      >−</button>
      <span style={{ minWidth: 28, textAlign: 'center', fontSize: 18, fontWeight: 700, color: '#111' }}>
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        style={{
          width: 36, height: 36, borderRadius: '50%', border: '1.5px solid rgba(38,87,242,0.25)',
          background: '#fff', fontSize: 20, lineHeight: 1, cursor: value >= max ? 'default' : 'pointer',
          color: value >= max ? '#d1d5db' : '#2657f2', fontFamily: 'inherit', display: 'flex',
          alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}
      >+</button>
    </div>
  );
}

// ── Google Places ─────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let google: any;

function usePlacesAutocomplete(
  inputRef: React.RefObject<HTMLInputElement | null>,
  onSelect: (address: string) => void,
) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!key || typeof window === 'undefined') return;

    function init() {
      if (!inputRef.current) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ac = new google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'us' },
        types: ['geocode', 'establishment'],
        fields: ['formatted_address', 'name'],
      });
      ac.addListener('place_changed', () => {
        const place = ac.getPlace();
        onSelect(place.formatted_address ?? place.name ?? inputRef.current?.value ?? '');
      });
    }

    // Already loaded
    if (typeof google !== 'undefined' && google.maps?.places) { init(); return; }

    const scriptId = 'gplaces-js';
    if (document.getElementById(scriptId)) {
      // Already loading — poll
      const poll = setInterval(() => {
        if (typeof google !== 'undefined' && google.maps?.places) { clearInterval(poll); init(); }
      }, 100);
      return () => clearInterval(poll);
    }

    // Load fresh
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__gplacesReady = init;
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=__gplacesReady`;
    script.async = true;
    document.head.appendChild(script);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

type FareState = 'idle' | 'loading' | 'ok' | 'error';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ShuttleBookingPage() {
  const [direction, setDirection] = useState<'to' | 'from'>('to');
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    pickup: '', date: '', time: '',
    flightNumber: '', airline: '',
  });
  const [passengers,   setPassengers]   = useState(1);
  const [luggageCount, setLuggageCount] = useState(2);

  const [fareState,  setFareState]  = useState<FareState>('idle');
  const [fareAmount, setFareAmount] = useState<number | null>(null);
  const [fareTier,   setFareTier]   = useState<PricingTier>('standard');
  const [fareError,  setFareError]  = useState('');

  const [submitting,  setSubmitting]  = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [submitError, setSubmitError] = useState('');

  const today     = new Date().toISOString().split('T')[0];
  const pickupRef = useRef<HTMLInputElement>(null);

  function set(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));
  }

  // Places autocomplete — fires onSelect when a suggestion is chosen
  const onPickupSelect = useCallback((addr: string) => {
    setForm(prev => ({ ...prev, pickup: addr }));
  }, []);
  usePlacesAutocomplete(pickupRef, onPickupSelect);

  // Auto-fare: fire when pickup + date + time are all filled
  const shouldCalc = form.pickup.trim().length >= 10 && !!form.date && !!form.time;

  useEffect(() => {
    if (!shouldCalc) {
      setFareState('idle');
      setFareAmount(null);
      setFareError('');
      return;
    }
    setFareState('loading');
    setFareAmount(null);
    setFareError('');

    const timer = setTimeout(async () => {
      const selectedMs    = new Date(`${form.date}T${form.time}`).getTime();
      const departureTime = Math.floor(selectedMs / 1000).toString();
      const params        = new URLSearchParams({ origin: form.pickup.trim(), departureTime });

      try {
        const res  = await fetch(`/api/shuttle-fare?${params}`);
        const data = await res.json();
        if (!res.ok) {
          setFareState('error');
          setFareError(data.error || 'Could not calculate a fare for this address.');
        } else {
          const tier     = getPricingTier(form.date);
          const adjusted = Math.round(data.fare * TIER_MULTIPLIERS[tier]);
          setFareAmount(adjusted);
          setFareTier(tier);
          setFareState('ok');
        }
      } catch {
        setFareState('error');
        setFareError('Network error — please try again.');
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [form.pickup, form.date, form.time, shouldCalc]);

  const calcBlocked    = shouldCalc && (fareState === 'loading' || fareState === 'error');
  const submitDisabled = submitting || calcBlocked;
  const submitLabel    = submitting
    ? 'Submitting…'
    : (fareState === 'loading' && shouldCalc)
    ? 'Calculating fare…'
    : 'Submit Booking Request';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitDisabled) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/shuttle-booking', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          ...form,
          direction,
          passengers,
          luggageCount,
          estimatedFare: fareAmount,
        }),
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

  // ── Person icon SVG ──────────────────────────────────────────────────────
  const PersonIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  // ── Bag icon SVG ─────────────────────────────────────────────────────────
  const BagIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="15" rx="2"/>
      <polyline points="16 2 12 2 8 2"/>
      <line x1="8" y1="2" x2="8" y2="7"/>
      <line x1="16" y1="2" x2="16" y2="7"/>
    </svg>
  );

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
                  <h2 className="font-bold text-gray-900 text-lg mb-1" style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}>
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

                {/* Address with Places autocomplete */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                    {direction === 'to' ? 'Pickup Address *' : 'Drop-off Address *'}
                  </label>
                  <input
                    ref={pickupRef}
                    type="text"
                    required
                    value={form.pickup}
                    onChange={set('pickup')}
                    placeholder="Start typing your address…"
                    className={inputCls}
                    style={inputStyle}
                    autoComplete="off"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Enter a full street address for an accurate fare estimate.
                  </p>
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Date *</label>
                    <input
                      type="date" required min={today}
                      value={form.date}
                      onChange={set('date')}
                      className={inputCls} style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Time *</label>
                    <TimePicker
                      value={form.time}
                      onChange={t => setForm(prev => ({ ...prev, time: t }))}
                    />
                  </div>
                </div>

                {/* Fare widget */}
                {fareState === 'loading' && shouldCalc && (
                  <div className="flex items-center gap-3 rounded-xl px-5 py-4" style={{ background: '#f5f7ff', border: '1.5px solid rgba(38,87,242,0.2)' }}>
                    <svg className="animate-spin flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2657f2" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    <p className="text-sm text-[#2657f2] font-semibold">Calculating your fare…</p>
                  </div>
                )}
                {fareState === 'ok' && fareAmount !== null && (
                  <div className="rounded-xl px-5 py-4" style={{ background: '#f0fdf4', border: '1.5px solid #86efac' }}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <p className="text-2xl font-black text-gray-900">${fareAmount}</p>
                      <p className="text-xs font-semibold" style={{ color: fareTier === 'peak' ? '#b45309' : fareTier === 'weekend' ? '#1d4ed8' : '#16a34a' }}>
                        {TIER_LABELS[fareTier]}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Your estimated fare · Includes private van, door-to-door service, up to 14 passengers. Final price confirmed at booking.
                    </p>
                  </div>
                )}
                {fareState === 'error' && (
                  <div className="rounded-xl px-5 py-4" style={{ background: '#fef2f2', border: '1px solid #fca5a5' }}>
                    <p className="text-sm font-semibold text-red-700 mb-1">Couldn&apos;t calculate a fare</p>
                    <p className="text-xs text-red-600 leading-relaxed">
                      {fareError} Please double-check your address, or call us at{' '}
                      <a href="tel:+18669335938" className="font-semibold underline">(866) 933-5938</a>.
                    </p>
                  </div>
                )}

                {/* Passengers stepper */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Passengers</label>
                  <Stepper icon={PersonIcon} value={passengers} min={1} max={14} onChange={setPassengers} />
                  {passengers > 10 && (
                    <p className="text-xs text-amber-600 mt-2 font-medium">
                      Above 10 passengers — carry-on luggage only.
                    </p>
                  )}
                </div>

                {/* Luggage stepper */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Checked Bags</label>
                  <Stepper icon={BagIcon} value={luggageCount} min={0} max={20} onChange={setLuggageCount} />
                  <p className="text-xs text-gray-400 mt-2">
                    Full luggage space for up to 10 passengers. Carry-on only above 10.
                  </p>
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

                {submitError && (
                  <p className="text-sm text-red-600 rounded-lg px-4 py-3" style={{ background: '#fef2f2', border: '1px solid #fca5a5' }}>
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitDisabled}
                  className="w-full py-4 rounded-lg text-sm font-bold text-white transition-colors btn-blue"
                  style={submitDisabled ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                >
                  {submitLabel}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  {fareState === 'ok' && fareAmount !== null
                    ? `Estimated fare $${fareAmount} will be saved with your request. Final price confirmed at booking.`
                    : `We'll confirm availability and final fare within a few hours.`}
                </p>
              </form>
            )}
          </div>

          {/* Right — fare estimator + what's included */}
          <div className="space-y-6">
            <ShuttleFareCalc />
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
