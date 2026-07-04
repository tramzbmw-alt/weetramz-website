'use client';

import { useState } from 'react';

type Direction = 'to' | 'from';
type PricingTier = 'standard' | 'weekend' | 'peak';

interface FareResult {
  fare: number;
  miles: number;
  minutes: number;
  usedTraffic: boolean;
}

const inputStyle: React.CSSProperties = {
  border: '1.5px solid rgba(38,87,242,0.25)',
  fontFamily: 'inherit',
  borderRadius: '8px',
  padding: '10px 14px',
  fontSize: '14px',
  color: '#111',
  width: '100%',
  outline: 'none',
  background: '#fff',
  boxSizing: 'border-box',
};

function getThanksgiving(year: number): Date {
  let count = 0;
  const d = new Date(year, 10, 1);
  while (d.getMonth() === 10) {
    if (d.getDay() === 4) {
      count++;
      if (count === 4) return new Date(d);
    }
    d.setDate(d.getDate() + 1);
  }
  return new Date(year, 10, 28);
}

function getPricingTier(dateStr: string): PricingTier {
  // Parse at noon local time to avoid any DST edge cases
  const d = new Date(dateStr + 'T12:00:00');
  const month = d.getMonth() + 1;
  const day   = d.getDate();
  const dow   = d.getDay(); // 0=Sun … 6=Sat
  const year  = d.getFullYear();

  // Thanksgiving week bounds (Sun–Sat)
  const turkey     = getThanksgiving(year);
  const thanksSun  = new Date(turkey);
  thanksSun.setDate(turkey.getDate() - turkey.getDay());
  const thanksSat  = new Date(thanksSun);
  thanksSat.setDate(thanksSun.getDate() + 6);
  const dNoon = d.getTime();

  const isPeak =
    // July 4th week: Jul 1–7
    (month === 7 && day >= 1 && day <= 7) ||
    // Thanksgiving week
    (dNoon >= thanksSun.getTime() && dNoon <= thanksSat.getTime()) ||
    // Winter holidays: Dec 20 – Jan 2
    (month === 12 && day >= 20) ||
    (month === 1  && day <= 2)  ||
    // Spring Break: Mar 15 – Apr 5
    (month === 3 && day >= 15)  ||
    (month === 4 && day <= 5);

  if (isPeak) return 'peak';
  if (dow === 5 || dow === 6 || dow === 0) return 'weekend'; // Fri, Sat, Sun
  return 'standard';
}

const TIER_LABELS: Record<PricingTier, string> = {
  standard: 'Standard rate',
  weekend:  'Weekend rate applies',
  peak:     'Peak holiday rate applies',
};

const TIER_MULTIPLIERS: Record<PricingTier, number> = {
  standard: 1.00,
  weekend:  1.10,
  peak:     1.15,
};

interface ShuttleFareCalcProps {
  onFareResult?: (fare: number | null) => void;
}

export default function ShuttleFareCalc({ onFareResult }: ShuttleFareCalcProps = {}) {
  const [direction, setDirection] = useState<Direction>('to');
  const [origin, setOrigin]       = useState('');
  const [date, setDate]           = useState('');
  const [time, setTime]           = useState('');
  const [loading, setLoading]     = useState(false);
  const [result, setResult]       = useState<FareResult | null>(null);
  const [tier, setTier]           = useState<PricingTier>('standard');
  const [error, setError]         = useState('');

  const today = new Date().toISOString().split('T')[0];

  const canEstimate = origin.trim().length >= 2 && date && time;

  function clearResult() {
    setResult(null);
    setError('');
    onFareResult?.(null);
  }

  async function getEstimate() {
    if (!canEstimate) return;

    const selectedMs = new Date(`${date}T${time}`).getTime();
    if (selectedMs <= Date.now()) {
      setError('Please select a future date and time.');
      setResult(null);
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    onFareResult?.(null);

    const departureTime = Math.floor(selectedMs / 1000).toString();
    const params = new URLSearchParams({ origin: origin.trim(), departureTime });

    try {
      const res  = await fetch(`/api/shuttle-fare?${params}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not calculate fare. Try a nearby city name.');
      } else {
        const fareData  = data as FareResult;
        const priceTier = getPricingTier(date);
        const adjusted  = Math.round(fareData.fare * TIER_MULTIPLIERS[priceTier]);
        const withFare  = { ...fareData, fare: adjusted };
        setResult(withFare);
        setTier(priceTier);
        onFareResult?.(adjusted);
      }
    } catch {
      setError('Network error — please try again.');
    } finally {
      setLoading(false);
    }
  }

  const locationLabel = direction === 'to' ? 'Pickup Location' : 'Drop-off Location';

  return (
    <div className="rounded-2xl overflow-hidden shadow-md" style={{ border: '1px solid rgba(38,87,242,0.18)' }}>
      {/* Header */}
      <div className="px-6 py-4" style={{ background: '#2657f2' }}>
        <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-0.5">Fare Estimator</p>
        <h3 className="font-bold text-white text-base">Get an Instant Estimate</h3>
      </div>

      <div className="bg-white p-6 space-y-5">

        {/* Direction toggle */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Direction</p>
          <div className="flex rounded-lg overflow-hidden" style={{ border: '1.5px solid rgba(38,87,242,0.25)' }}>
            {(['to', 'from'] as Direction[]).map(d => (
              <button
                key={d}
                onClick={() => { setDirection(d); clearResult(); }}
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

        {/* City / ZIP */}
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
            {locationLabel}
          </label>
          <input
            type="text"
            value={origin}
            onChange={e => { setOrigin(e.target.value); clearResult(); }}
            placeholder="City or ZIP — e.g. Cary, 27513"
            style={inputStyle}
          />
        </div>

        {/* Date + Time */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Date</label>
            <input
              type="date"
              value={date}
              min={today}
              onChange={e => { setDate(e.target.value); clearResult(); }}
              style={inputStyle}
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Time</label>
            <input
              type="time"
              value={time}
              onChange={e => { setTime(e.target.value); clearResult(); }}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Estimate button */}
        <button
          onClick={getEstimate}
          disabled={!canEstimate || loading}
          className="w-full py-3 rounded-lg text-sm font-bold transition-colors"
          style={{
            background: canEstimate && !loading ? '#2657f2' : '#e5e7eb',
            color:      canEstimate && !loading ? '#fff'    : '#9ca3af',
            cursor:     canEstimate && !loading ? 'pointer' : 'default',
          }}
        >
          {loading ? 'Calculating…' : 'Get Estimate'}
        </button>

        {/* Result */}
        {result && (
          <div
            className="rounded-xl px-5 py-4"
            style={{ background: '#f5f7ff', border: '1.5px solid rgba(38,87,242,0.2)' }}
          >
            <p className="text-2xl font-black text-gray-900 mb-1">${result.fare}</p>
            <p className="text-xs font-semibold mb-2" style={{
              color: tier === 'peak' ? '#b45309' : tier === 'weekend' ? '#1d4ed8' : '#6b7280',
            }}>
              {TIER_LABELS[tier]}
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Includes private van, door to door service, up to 14 passengers. Final price confirmed at booking.
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-xl px-5 py-3" style={{ background: '#fef2f2', border: '1px solid #fca5a5' }}>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

      </div>
    </div>
  );
}
