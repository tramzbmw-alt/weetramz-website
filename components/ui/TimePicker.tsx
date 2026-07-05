'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

const ITEM_H = 48;
const HOURS   = ['12','1','2','3','4','5','6','7','8','9','10','11'];
const MINUTES = ['00','15','30','45'];
const PERIODS = ['AM','PM'];

function to24h(hourIdx: number, minuteIdx: number, periodIdx: number): string {
  const mins = minuteIdx * 15;
  let h = periodIdx === 0
    ? (hourIdx === 0 ? 0 : hourIdx)          // AM: 12→0, 1-11→1-11
    : (hourIdx === 0 ? 12 : hourIdx + 12);   // PM: 12→12, 1-11→13-23
  return `${String(h).padStart(2,'0')}:${String(mins).padStart(2,'0')}`;
}

function from24h(v: string): [number, number, number] {
  if (!v) return [8, 0, 0]; // default 8:00 AM
  const [h, m] = v.split(':').map(Number);
  const periodIdx = h >= 12 ? 1 : 0;
  const hourIdx   = h === 0 ? 0 : h > 12 ? h - 12 : h === 12 ? 0 : h;
  const minuteIdx = Math.min(3, Math.round(m / 15));
  return [hourIdx, minuteIdx, periodIdx];
}

function fmt12(v: string): string {
  if (!v) return '— : —';
  const [h24, m] = v.split(':').map(Number);
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h12    = h24 === 0 ? 12 : h24 > 12 ? h24 - 12 : h24;
  return `${h12}:${String(m).padStart(2,'0')} ${period}`;
}

interface ColProps {
  items: string[];
  selected: number;
  onChange: (i: number) => void;
  wide?: boolean;
}

function ScrollCol({ items, selected, onChange, wide }: ColProps) {
  const ref        = useRef<HTMLDivElement>(null);
  const scrolling  = useRef(false);
  const timer      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCommit = useRef(selected);

  // Scroll to match selected when it changes externally
  useEffect(() => {
    if (!scrolling.current && ref.current) {
      ref.current.scrollTo({ top: selected * ITEM_H, behavior: 'auto' });
    }
    lastCommit.current = selected;
  }, [selected]);

  const onScroll = useCallback(() => {
    scrolling.current = true;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      scrolling.current = false;
      if (!ref.current) return;
      const i = Math.max(0, Math.min(items.length - 1, Math.round(ref.current.scrollTop / ITEM_H)));
      if (i !== lastCommit.current) { lastCommit.current = i; onChange(i); }
    }, 120);
  }, [items.length, onChange]);

  return (
    <div style={{ position: 'relative', flex: wide ? '0 0 72px' : '0 0 56px' }}>
      {/* Selection highlight band */}
      <div style={{
        position: 'absolute', top: ITEM_H, left: 4, right: 4, height: ITEM_H,
        background: 'rgba(38,87,242,0.08)', borderRadius: 8, pointerEvents: 'none', zIndex: 1,
      }} />
      <div
        ref={ref}
        onScroll={onScroll}
        style={{
          height: ITEM_H * 3, overflowY: 'scroll', scrollSnapType: 'y mandatory',
          paddingTop: ITEM_H, paddingBottom: ITEM_H,
          scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' as never,
          position: 'relative',
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => {
              onChange(i);
              ref.current?.scrollTo({ top: i * ITEM_H, behavior: 'smooth' });
            }}
            style={{
              height: ITEM_H, scrollSnapAlign: 'center',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: i === selected ? '20px' : '16px',
              fontWeight: i === selected ? 700 : 400,
              color: i === selected ? '#2657f2' : '#9ca3af',
              cursor: 'pointer', userSelect: 'none', transition: 'all 0.1s',
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

interface TimePickerProps {
  value: string;              // 24h HH:MM
  onChange: (v: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function TimePicker({ value, onChange, className, style }: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const [h, setH]       = useState(0);
  const [m, setM]       = useState(0);
  const [p, setP]       = useState(0);
  const panelRef        = useRef<HTMLDivElement>(null);

  // Initialise internal state from value when opening
  function openPicker() {
    const [hi, mi, pi] = from24h(value);
    setH(hi); setM(mi); setP(pi);
    setOpen(true);
  }

  function confirm() {
    onChange(to24h(h, m, p));
    setOpen(false);
  }

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={openPicker}
        className={className}
        style={{
          width: '100%', textAlign: 'left', background: '#fff',
          border: '1.5px solid rgba(38,87,242,0.25)', borderRadius: 8,
          padding: '12px 14px', fontSize: 14, color: value ? '#111' : '#9ca3af',
          fontFamily: 'inherit', cursor: 'pointer', ...style,
        }}
      >
        {value ? fmt12(value) : 'Select time…'}
      </button>

      {open && (
        <div
          ref={panelRef}
          style={{
            position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 50,
            background: '#fff', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
            border: '1px solid rgba(38,87,242,0.15)', padding: '12px 8px 12px',
            minWidth: 220,
          }}
        >
          {/* Separator lines around middle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, position: 'relative' }}>
            {/* Top / bottom dividers */}
            <div style={{
              position: 'absolute', top: ITEM_H, left: 0, right: 0,
              borderTop: '1px solid rgba(38,87,242,0.12)',
            }} />
            <div style={{
              position: 'absolute', top: ITEM_H * 2, left: 0, right: 0,
              borderTop: '1px solid rgba(38,87,242,0.12)',
            }} />

            <ScrollCol items={HOURS}   selected={h} onChange={setH} />
            <div style={{ color: '#d1d5db', fontSize: 20, fontWeight: 700, paddingBottom: 2 }}>:</div>
            <ScrollCol items={MINUTES} selected={m} onChange={setM} />
            <ScrollCol items={PERIODS} selected={p} onChange={setP} wide />
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 10, padding: '0 4px' }}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                flex: 1, padding: '8px 0', borderRadius: 8, border: '1px solid #e5e7eb',
                background: '#fff', fontSize: 13, fontWeight: 600, color: '#6b7280', cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirm}
              style={{
                flex: 1, padding: '8px 0', borderRadius: 8, border: 'none',
                background: '#2657f2', fontSize: 13, fontWeight: 700, color: '#fff', cursor: 'pointer',
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
