'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import TimePicker from '@/components/ui/TimePicker';

// ── Pricing tier logic ────────────────────────────────────────────────────────

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

function fmt12(hhmm: string): string {
  const [h24, m] = hhmm.split(':').map(Number);
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 === 0 ? 12 : h24 > 12 ? h24 - 12 : h24;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

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

    if (typeof google !== 'undefined' && google.maps?.places) { init(); return; }

    const scriptId = 'gplaces-js';
    if (document.getElementById(scriptId)) {
      const poll = setInterval(() => {
        if (typeof google !== 'undefined' && google.maps?.places) { clearInterval(poll); init(); }
      }, 100);
      return () => clearInterval(poll);
    }

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

interface SlotData {
  available: boolean;
  bookings:  number;
  max:       number;
  blocked:   boolean;
}
interface DateAvail {
  date:         string;
  morning:      SlotData;
  afternoon:    SlotData;
  fully_booked: boolean;
}

const RDU_LABEL = 'RDU — Raleigh-Durham International Airport';

const INCLUDED_ITEMS = [
  'Private 10 to 14 passenger van — your group only',
  'Door-to-door pickup and drop-off',
  'To RDU or from RDU — same price either direction',
  'Driver monitors flight status',
  'Luggage assistance included',
];

const CheckIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2657f2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

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

  const [availRange,     setAvailRange]     = useState<Record<string, DateAvail>>({});
  const [selectedBlock,  setSelectedBlock]  = useState<'morning' | 'afternoon' | null>(null);

  const [fareState,  setFareState]  = useState<FareState>('idle');
  const [fareAmount, setFareAmount] = useState<number | null>(null);
  const [fareTier,   setFareTier]   = useState<PricingTier>('standard');
  const [fareError,  setFareError]  = useState('');

  const [submitting,  setSubmitting]  = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [submitError, setSubmitError] = useState('');

  const today     = new Date().toISOString().split('T')[0];
  const pickupRef = useRef<HTMLInputElement>(null);

  // Fetch 60-day availability on mount
  useEffect(() => {
    fetch('https://agent.weetramz.com/api/shuttle/availability-range?days=60')
      .then(r => r.json())
      .then((json: { dates: DateAvail[] }) => {
        const map: Record<string, DateAvail> = {};
        for (const d of json.dates) map[d.date] = d;
        setAvailRange(map);
      })
      .catch(() => {});
  }, []);

  function set(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));
  }

  const onPickupSelect = useCallback((addr: string) => {
    setForm(prev => ({ ...prev, pickup: addr }));
  }, []);
  usePlacesAutocomplete(pickupRef, onPickupSelect);

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, date: e.target.value, time: '' }));
    setSelectedBlock(null);
  }

  function selectBlock(block: 'morning' | 'afternoon') {
    setSelectedBlock(block);
    if (!form.time) {
      setForm(prev => ({ ...prev, time: block === 'morning' ? '08:00' : '14:00' }));
    }
  }

  // Availability derived state
  const dateAvail       = form.date ? (availRange[form.date] ?? null) : null;
  const dateFullyBooked = dateAvail?.fully_booked ?? false;

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
  const noBlockChosen  = !!form.date && !dateFullyBooked && !selectedBlock;
  const submitDisabled = submitting || calcBlocked || noBlockChosen;
  const submitLabel    = submitting
    ? 'Submitting…'
    : noBlockChosen
    ? 'Select a time block above'
    : (fareState === 'loading' && shouldCalc)
    ? 'Calculating fare…'
    : 'Book Now';

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
          timeBlock: selectedBlock,
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

  const PersonIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  const BagIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="15" rx="2"/>
      <polyline points="16 2 12 2 8 2"/>
      <line x1="8" y1="2" x2="8" y2="7"/>
      <line x1="16" y1="2" x2="16" y2="7"/>
    </svg>
  );

  const fromAddr = direction === 'to' ? form.pickup : RDU_LABEL;
  const toAddr   = direction === 'to' ? RDU_LABEL   : form.pickup;
  const deposit  = fareAmount !== null ? Math.round(fareAmount * 0.30) : null;
  const balance  = fareAmount !== null && deposit !== null ? fareAmount - deposit : null;

  const tripDateStr = form.date && form.time
    ? (() => {
        const d = new Date(form.date + 'T12:00:00');
        return `${d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at ${fmt12(form.time)}`;
      })()
    : null;

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
            Private 10 to 14 passenger van. To RDU or from RDU. Transparent pricing, door-to-door service. Advance booking required.
          </p>
          <p className="text-xs text-white/35 mt-3">
            10 passengers with full luggage space · Up to 14 passengers with carry-on only
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="py-16 px-6 bg-[#f5f7ff]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── Left — booking form ── */}
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
              <form id="shuttle-booking-form" onSubmit={handleSubmit} className="space-y-5">
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

                {/* Address */}
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
                    placeholder="Start typing your address, airport, or business…"
                    className={inputCls}
                    style={inputStyle}
                    autoComplete="off"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Enter a full address or business name for an accurate fare estimate.
                  </p>
                </div>

                {/* Date */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Date *</label>
                  <input
                    type="date" required min={today}
                    value={form.date}
                    onChange={handleDateChange}
                    className={inputCls} style={inputStyle}
                  />
                  {dateFullyBooked && (
                    <p className="text-xs text-red-600 mt-1.5 font-semibold">
                      This date is fully booked — please select a different date.
                    </p>
                  )}
                </div>

                {/* Time block selector */}
                {form.date && !dateFullyBooked && (() => {
                  const blocks = [
                    { id: 'morning'   as const, label: 'Morning',   range: '5:00 AM – 12:00 PM' },
                    { id: 'afternoon' as const, label: 'Afternoon',  range: '12:00 PM – 8:00 PM'  },
                  ];
                  return (
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Time Block *</label>
                      <div className="grid grid-cols-2 gap-2">
                        {blocks.map(({ id, label, range }) => {
                          const sd = dateAvail ? dateAvail[id] : null;
                          const unavail  = sd ? (!sd.available || sd.blocked) : false;
                          const dotColor = !sd      ? '#9ca3af'
                                         : sd.blocked    ? '#6b7280'
                                         : !sd.available ? '#ef4444'
                                         : sd.bookings > 0 ? '#f59e0b'
                                         : '#10b981';
                          const countLabel = sd && !sd.blocked
                            ? `${sd.bookings}/${sd.max} booked`
                            : sd?.blocked ? 'Blocked' : '';
                          const isSelected = selectedBlock === id;
                          return (
                            <button
                              key={id}
                              type="button"
                              disabled={unavail}
                              onClick={() => selectBlock(id)}
                              style={{
                                padding: '10px 12px',
                                borderRadius: 8,
                                border: isSelected
                                  ? '2px solid #2657f2'
                                  : '1.5px solid rgba(38,87,242,0.25)',
                                background: isSelected ? '#eff3ff' : unavail ? '#f9fafb' : '#fff',
                                cursor: unavail ? 'not-allowed' : 'pointer',
                                opacity: unavail ? 0.55 : 1,
                                textAlign: 'left' as const,
                                fontFamily: 'inherit',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                                <span style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor, flexShrink: 0, display: 'inline-block' }} />
                                <span style={{ fontSize: 13, fontWeight: 700, color: isSelected ? '#2657f2' : '#111' }}>{label}</span>
                              </div>
                              <div style={{ fontSize: 11, color: '#6b7280', marginLeft: 14 }}>{range}</div>
                              {countLabel && (
                                <div style={{ fontSize: 10, color: dotColor, fontWeight: 600, marginLeft: 14, marginTop: 1 }}>{countLabel}</div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* Time picker — shown after block selected */}
                {selectedBlock && !dateFullyBooked && (
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                      Pickup Time *{' '}
                      <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: '#9ca3af' }}>
                        ({selectedBlock === 'morning' ? '5:00 AM – 12:00 PM' : '12:00 PM – 8:00 PM'})
                      </span>
                    </label>
                    <TimePicker
                      value={form.time}
                      onChange={t => setForm(prev => ({ ...prev, time: t }))}
                    />
                  </div>
                )}

                {/* Passengers */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 block">Passengers</label>
                  <Stepper icon={PersonIcon} value={passengers} min={1} max={14} onChange={setPassengers} />
                  {passengers > 10 && (
                    <p className="text-xs text-amber-600 mt-2 font-medium">
                      Above 10 passengers — carry-on luggage only.
                    </p>
                  )}
                </div>

                {/* Luggage */}
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
              </form>
            )}
          </div>

          {/* ── Right — Trip Summary ── */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border: '1px solid rgba(38,87,242,0.15)' }}>

              {/* Header */}
              <div className="px-6 pt-6 pb-4" style={{ borderBottom: '1px solid rgba(38,87,242,0.1)' }}>
                <h2 className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'var(--font-playfair, Georgia, serif)' }}>
                  Your Trip Summary
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">Updates as you fill in your details</p>
              </div>

              <div className="px-6 py-5 space-y-5">

                {/* Route */}
                {form.pickup.trim() ? (
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center pt-1 flex-shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#2657f2]" />
                      <div className="w-px h-8 bg-gray-200 my-1" />
                      <svg width="10" height="14" viewBox="0 0 10 14" fill="#2657f2">
                        <path d="M5 0C2.24 0 0 2.24 0 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.5C4.17 6.5 3.5 5.83 3.5 5S4.17 3.5 5 3.5 6.5 4.17 6.5 5 5.83 6.5 5 6.5z"/>
                      </svg>
                    </div>
                    <div className="space-y-3 flex-1 min-w-0">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">
                          {direction === 'to' ? 'Pickup' : 'From'}
                        </p>
                        <p className="text-sm font-semibold text-gray-900 leading-snug break-words">{fromAddr}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">
                          {direction === 'to' ? 'Drop-off' : 'To'}
                        </p>
                        <p className="text-sm font-semibold text-gray-900 leading-snug break-words">{toAddr}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg px-4 py-5 text-center" style={{ background: '#f5f7ff', border: '1.5px dashed rgba(38,87,242,0.2)' }}>
                    <p className="text-sm text-gray-400">Enter your address to see route</p>
                  </div>
                )}

                {/* Trip details */}
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5 text-sm">
                    <svg className="flex-shrink-0 mt-0.5 text-gray-400" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {tripDateStr
                      ? <span className="text-gray-700">{tripDateStr}</span>
                      : <span className="text-gray-400">Date and time not set</span>
                    }
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-700">
                    <span className="text-gray-400 flex-shrink-0">{PersonIcon}</span>
                    {passengers} passenger{passengers !== 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-700">
                    <span className="text-gray-400 flex-shrink-0">{BagIcon}</span>
                    {luggageCount} checked bag{luggageCount !== 1 ? 's' : ''}
                  </div>
                </div>

                {/* Fare */}
                {fareState === 'loading' && shouldCalc && (
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: '#f5f7ff', border: '1.5px solid rgba(38,87,242,0.2)' }}>
                    <svg className="animate-spin flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2657f2" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    <p className="text-sm text-[#2657f2] font-semibold">Calculating your fare…</p>
                  </div>
                )}
                {fareState === 'ok' && fareAmount !== null && deposit !== null && balance !== null && (
                  <div className="rounded-xl px-5 py-4" style={{ background: '#f0f4ff', border: '1.5px solid rgba(38,87,242,0.2)' }}>
                    <div className="flex items-baseline gap-2 mb-3">
                      <p className="text-3xl font-black" style={{ color: '#2657f2' }}>${fareAmount}</p>
                      <p className="text-xs font-semibold" style={{ color: fareTier === 'peak' ? '#b45309' : fareTier === 'weekend' ? '#1d4ed8' : '#16a34a' }}>
                        {TIER_LABELS[fareTier]}
                      </p>
                    </div>
                    <div className="space-y-1.5 pt-3" style={{ borderTop: '1px solid rgba(38,87,242,0.12)' }}>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">30% deposit due today</span>
                        <span className="font-bold text-gray-900">${deposit}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">70% balance due 24h before pickup</span>
                        <span className="font-bold text-gray-900">${balance}</span>
                      </div>
                    </div>
                  </div>
                )}
                {fareState === 'error' && (
                  <div className="rounded-xl px-4 py-3" style={{ background: '#fef2f2', border: '1px solid #fca5a5' }}>
                    <p className="text-xs text-red-700 font-semibold mb-1">Couldn&apos;t calculate a fare</p>
                    <p className="text-xs text-red-600 leading-relaxed">
                      {fareError} Call{' '}
                      <a href="tel:+18669335938" className="font-semibold underline">(866) 933-5938</a>.
                    </p>
                  </div>
                )}

                {/* What's included */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#2657f2] mb-2.5">What&apos;s Included</p>
                  <ul className="space-y-2">
                    {INCLUDED_ITEMS.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="flex-shrink-0 mt-0.5">{CheckIcon}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Book Now / submitted footer */}
              {submitted ? (
                <div className="px-6 pb-6 text-center">
                  <p className="text-sm font-semibold text-green-700">Booking request submitted!</p>
                  <p className="text-xs text-gray-400 mt-1">Check {form.email} for confirmation.</p>
                </div>
              ) : (
                <div className="px-6 pb-6" style={{ borderTop: '1px solid rgba(38,87,242,0.08)', paddingTop: 16 }}>
                  {submitError && (
                    <p className="text-xs text-red-600 rounded-lg px-4 py-3 mb-3" style={{ background: '#fef2f2', border: '1px solid #fca5a5' }}>
                      {submitError}
                    </p>
                  )}
                  <button
                    type="submit"
                    form="shuttle-booking-form"
                    disabled={submitDisabled}
                    className="w-full py-4 rounded-lg text-sm font-bold text-white transition-colors btn-blue"
                    style={submitDisabled ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                  >
                    {submitLabel}
                  </button>
                  <p className="text-xs text-gray-400 text-center mt-3">
                    {fareState === 'ok' && fareAmount !== null
                      ? `Estimated fare $${fareAmount} · Final price confirmed at booking`
                      : `We'll confirm availability and fare within a few hours.`}
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>
    </>
  );
}
