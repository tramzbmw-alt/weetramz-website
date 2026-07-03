import { NextRequest, NextResponse } from 'next/server';

const RDU = '2400 John Brantley Blvd, Morrisville, NC 27560';
const BASE_RATE = 50;
const RATE_PER_MILE = 3.0;
const RATE_PER_MINUTE = 0.25;

interface DMElement {
  status: string;
  distance: { value: number; text: string };
  duration: { value: number; text: string };
  duration_in_traffic?: { value: number; text: string };
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const origin        = searchParams.get('origin')?.trim();
  const departureTime = searchParams.get('departureTime'); // unix seconds as string

  if (!origin || !departureTime) {
    return NextResponse.json({ error: 'origin and departureTime are required' }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Maps API not configured' }, { status: 503 });
  }

  const params = new URLSearchParams({
    origins:        origin,
    destinations:   RDU,
    departure_time: departureTime,
    traffic_model:  'best_guess',
    units:          'imperial',
    key:            apiKey,
  });

  const mapsUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?${params}`;

  let data: { status: string; rows?: { elements: DMElement[] }[] };
  try {
    const r = await fetch(mapsUrl, { cache: 'no-store' });
    data = await r.json();
  } catch {
    return NextResponse.json({ error: 'Maps API request failed' }, { status: 502 });
  }

  if (data.status !== 'OK') {
    return NextResponse.json({ error: `Maps API error: ${data.status}` }, { status: 422 });
  }

  const element = data.rows?.[0]?.elements?.[0];
  if (!element || element.status !== 'OK') {
    return NextResponse.json(
      { error: 'Could not find a route from that location. Try a nearby city name.' },
      { status: 422 }
    );
  }

  const meters  = element.distance.value;
  // Prefer traffic-aware duration; fall back to baseline if not available
  const seconds = (element.duration_in_traffic ?? element.duration).value;
  const miles   = meters / 1609.344;
  const minutes = seconds / 60;
  const fare    = BASE_RATE + miles * RATE_PER_MILE + minutes * RATE_PER_MINUTE;

  return NextResponse.json({
    miles:   Math.round(miles * 10) / 10,
    minutes: Math.round(minutes),
    fare:    Math.round(fare),
    usedTraffic: !!element.duration_in_traffic,
  });
}
