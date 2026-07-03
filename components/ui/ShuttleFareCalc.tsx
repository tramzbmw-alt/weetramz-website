'use client';

import { useState } from 'react';

// Pre-computed miles + minutes produce exact flat rates via:
// fare = $50 base + (miles × $3.00) + (minutes × $0.25)
const ZONES = [
  { label: 'RTP / Research Triangle Park', aliases: ['rtp', 'research triangle', '27709', '27703', '27560'], miles: 0,  minutes: 0,  price: 50  },
  { label: 'Durham',                        aliases: ['durham', '27701', '27702', '27704', '27705', '27707', '27712', '27713'], miles: 1,  minutes: 12, price: 56  },
  { label: 'Cary',                          aliases: ['cary', '27511', '27513', '27518', '27519'],            miles: 1,  minutes: 12, price: 56  },
  { label: 'Raleigh',                       aliases: ['raleigh', '27601', '27603', '27604', '27605', '27606', '27607', '27608', '27609', '27610', '27612', '27614', '27615', '27616'], miles: 5,  minutes: 24, price: 71  },
  { label: 'Apex',                          aliases: ['apex', '27502', '27523'],                               miles: 6,  minutes: 24, price: 74  },
  { label: 'Holly Springs',                 aliases: ['holly springs', 'holly', '27540'],                     miles: 10, minutes: 48, price: 92  },
  { label: 'Fuquay-Varina',               aliases: ['fuquay', 'fuquay-varina', 'fuquay varina', '27526'],   miles: 11, minutes: 48, price: 95  },
  { label: 'Hillsborough',                  aliases: ['hillsborough', '27278'],                                miles: 14, minutes: 48, price: 104 },
  { label: 'Zebulon',                       aliases: ['zebulon', '27597'],                                     miles: 20, minutes: 60, price: 125 },
];

function calcFare(miles: number, minutes: number) {
  return 50 + miles * 3 + minutes * 0.25;
}

function findZone(input: string) {
  const q = input.trim().toLowerCase();
  if (!q) return null;
  return ZONES.find(z =>
    z.aliases.some(a => a.includes(q) || q.includes(a))
  ) ?? null;
}

export default function ShuttleFareCalc() {
  const [query, setQuery]       = useState('');
  const [direction, setDirection] = useState<'to' | 'from'>('to');

  const zone   = findZone(query);
  const fare   = zone ? calcFare(zone.miles, zone.minutes) : null;
  const noMatch = query.trim().length >= 3 && !zone;

  return (
    <div className="rounded-2xl overflow-hidden shadow-md" style={{ border: '1px solid rgba(38,87,242,0.18)' }}>
      {/* Header */}
      <div className="px-6 py-4" style={{ background: '#2657f2' }}>
        <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-0.5">Fare Estimator</p>
        <h3 className="font-bold text-white text-base">Get an Instant Quote</h3>
      </div>

      <div className="bg-white p-6 space-y-5">

        {/* Direction toggle */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Direction</p>
          <div className="flex rounded-lg overflow-hidden" style={{ border: '1.5px solid rgba(38,87,242,0.25)' }}>
            <button
              onClick={() => setDirection('to')}
              className="flex-1 py-2.5 text-sm font-semibold transition-colors"
              style={direction === 'to'
                ? { background: '#2657f2', color: '#fff' }
                : { background: '#fff', color: '#6b7280' }}
            >
              To RDU
            </button>
            <button
              onClick={() => setDirection('from')}
              className="flex-1 py-2.5 text-sm font-semibold transition-colors"
              style={direction === 'from'
                ? { background: '#2657f2', color: '#fff' }
                : { background: '#fff', color: '#6b7280' }}
            >
              From RDU
            </button>
          </div>
        </div>

        {/* City / ZIP input */}
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
            {direction === 'to' ? 'Pickup Location' : 'Drop-off Location'}
          </label>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="City or ZIP — e.g. Cary, 27513"
            className="w-full px-4 py-3 rounded-lg text-sm text-gray-800 outline-none transition-all"
            style={{
              border: '1.5px solid rgba(38,87,242,0.25)',
              fontFamily: 'inherit',
            }}
            onFocus={e => (e.target.style.borderColor = '#2657f2')}
            onBlur={e  => (e.target.style.borderColor = 'rgba(38,87,242,0.25)')}
          />
        </div>

        {/* Result */}
        {fare !== null && zone && (
          <div
            className="rounded-xl px-5 py-4"
            style={{ background: '#f5f7ff', border: '1.5px solid rgba(38,87,242,0.2)' }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-[#2657f2] mb-1">{zone.label}</p>
            <p className="text-2xl font-black text-gray-900">${fare.toFixed(0)}</p>
            <p className="text-xs text-gray-500 mt-1">
              Estimated fare — final price confirmed at booking
            </p>
          </div>
        )}

        {noMatch && (
          <div
            className="rounded-xl px-5 py-4"
            style={{ background: '#fafafa', border: '1.5px solid #e5e7eb' }}
          >
            <p className="text-sm text-gray-500">
              We don&apos;t have an instant estimate for that location.{' '}
              <a href="/shuttle-booking" className="font-semibold text-[#2657f2] hover:underline">
                Book a custom quote →
              </a>
            </p>
          </div>
        )}

        {!query && (
          <p className="text-xs text-gray-400">
            Serving RTP, Durham, Cary, Raleigh, Apex, Holly Springs, Fuquay-Varina, Hillsborough, and Zebulon.
          </p>
        )}

        {/* Formula note */}
        <p className="text-xs text-gray-400 leading-relaxed pt-1" style={{ borderTop: '1px solid #f0f0f0' }}>
          Estimate based on $50 base + distance + travel time. Final price confirmed at booking.
        </p>
      </div>
    </div>
  );
}
