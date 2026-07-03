import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

function computeDeadline(): string {
  const now = new Date();
  const h = now.getHours();
  if (h >= 22 || h < 7) {
    const next = new Date(now);
    if (h >= 22) next.setDate(next.getDate() + 1);
    next.setHours(9, 0, 0, 0);
    return next.toISOString();
  }
  return new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName, lastName, email, phone,
      direction, pickup, date, time, passengers, notes,
      flightNumber, airline, estimatedFare,
    } = body;

    if (!email || !pickup || !date || !time) {
      return NextResponse.json({ error: 'Email, pickup location, date, and time are required.' }, { status: 400 });
    }

    const customerName = `${firstName} ${lastName}`.trim();
    const tripDirection = direction === 'from' ? 'from_rdu' : 'to_rdu';
    const dirLabel = direction === 'from' ? 'From RDU to your door' : 'To RDU from your door';
    const responseDeadline = computeDeadline();
    const fare = estimatedFare ? parseFloat(String(estimatedFare)) : null;

    // Save to Supabase
    const { data: booking, error: dbErr } = await supabase
      .from('shuttle_bookings')
      .insert({
        customer_name:    customerName,
        customer_email:   email,
        customer_phone:   phone || null,
        trip_direction:   tripDirection,
        pickup_date:      date,
        pickup_time:      time,
        pickup_address:   pickup,
        flight_number:    flightNumber || null,
        airline:          airline || null,
        passenger_count:  passengers ? parseInt(String(passengers)) : null,
        luggage_notes:    notes || null,
        estimated_fare:   fare,
        status:           'pending',
        response_deadline: responseDeadline,
      })
      .select('id')
      .single();

    if (dbErr) {
      console.error('Supabase insert error:', dbErr);
    }

    const bookingId = booking?.id;
    const deadlineStr = new Date(responseDeadline).toLocaleString('en-US', {
      timeZone: 'America/New_York', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
    });

    // Customer confirmation email
    await resend.emails.send({
      from:    'WeeTramz Shuttle <noreply@weetramz.com>',
      to:      email,
      subject: 'We received your RDU shuttle request',
      html: `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
  <div style="background:#0066B2;padding:24px;border-radius:8px 8px 0 0">
    <h2 style="color:#fff;margin:0;font-size:20px">Booking Request Received</h2>
    <p style="color:rgba(255,255,255,0.75);margin:6px 0 0;font-size:14px">WeeTramz RDU Airport Shuttle</p>
  </div>
  <div style="background:#f8fafc;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0">
    <p style="font-size:15px;color:#0f172a;margin:0 0 16px">Hi ${firstName || customerName},</p>
    <p style="font-size:15px;color:#0f172a;margin:0 0 20px">
      We received your shuttle request and will confirm availability by <strong>${deadlineStr} ET</strong>.
      You'll get a follow-up email at this address as soon as we review your trip details.
    </p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
      <tr><td style="padding:8px 0;font-size:13px;color:#64748b;width:140px">Direction</td><td style="padding:8px 0;font-size:14px;font-weight:600;color:#0066B2">${dirLabel}</td></tr>
      <tr><td style="padding:8px 0;font-size:13px;color:#64748b">Date</td><td style="padding:8px 0;font-size:14px;color:#0f172a">${date}</td></tr>
      <tr><td style="padding:8px 0;font-size:13px;color:#64748b">Time</td><td style="padding:8px 0;font-size:14px;color:#0f172a">${time}</td></tr>
      <tr><td style="padding:8px 0;font-size:13px;color:#64748b">Address</td><td style="padding:8px 0;font-size:14px;color:#0f172a">${pickup}</td></tr>
      ${passengers ? `<tr><td style="padding:8px 0;font-size:13px;color:#64748b">Passengers</td><td style="padding:8px 0;font-size:14px;color:#0f172a">${passengers}</td></tr>` : ''}
      ${fare ? `<tr><td style="padding:8px 0;font-size:13px;color:#64748b">Est. Fare</td><td style="padding:8px 0;font-size:14px;font-weight:700;color:#0f172a">$${fare.toFixed(0)}</td></tr>` : ''}
    </table>
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0">
    <p style="font-size:13px;color:#64748b;margin:0">
      Questions before then? Call us at <strong>(866) 933-5938</strong> or reply to this email.
    </p>
    <p style="font-size:12px;color:#94a3b8;margin:12px 0 0">WeeTramz Transportation · Raleigh-Durham-Cary, NC</p>
  </div>
</div>`,
    });

    // Admin notification email
    await resend.emails.send({
      from:    'WeeTramz Shuttle <noreply@weetramz.com>',
      to:      'info@weetramz.com',
      replyTo: email,
      subject: `New Shuttle Booking Request — ${customerName} · ${date}`,
      html: `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
  <div style="background:#0A1628;padding:24px;border-radius:8px 8px 0 0">
    <h2 style="color:#fff;margin:0;font-size:20px">New Shuttle Booking Request</h2>
    <p style="color:rgba(255,255,255,0.6);margin:6px 0 0;font-size:14px">Respond by ${deadlineStr} ET</p>
  </div>
  <div style="background:#f8fafc;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0">
    <table style="width:100%;border-collapse:collapse">
      <tr><td style="padding:8px 0;font-size:13px;color:#64748b;width:160px">Name</td><td style="padding:8px 0;font-size:14px;font-weight:600;color:#0f172a">${customerName}</td></tr>
      <tr><td style="padding:8px 0;font-size:13px;color:#64748b">Email</td><td style="padding:8px 0;font-size:14px"><a href="mailto:${email}" style="color:#0066B2">${email}</a></td></tr>
      <tr><td style="padding:8px 0;font-size:13px;color:#64748b">Phone</td><td style="padding:8px 0;font-size:14px;color:#0f172a">${phone || 'Not provided'}</td></tr>
      <tr><td style="padding:8px 0;font-size:13px;color:#64748b">Direction</td><td style="padding:8px 0;font-size:14px;font-weight:600;color:#0066B2">${dirLabel}</td></tr>
      <tr><td style="padding:8px 0;font-size:13px;color:#64748b">Address</td><td style="padding:8px 0;font-size:14px;color:#0f172a">${pickup}</td></tr>
      <tr><td style="padding:8px 0;font-size:13px;color:#64748b">Date</td><td style="padding:8px 0;font-size:14px;color:#0f172a">${date}</td></tr>
      <tr><td style="padding:8px 0;font-size:13px;color:#64748b">Time</td><td style="padding:8px 0;font-size:14px;color:#0f172a">${time}</td></tr>
      <tr><td style="padding:8px 0;font-size:13px;color:#64748b">Passengers</td><td style="padding:8px 0;font-size:14px;color:#0f172a">${passengers || 'Not specified'}</td></tr>
      ${flightNumber ? `<tr><td style="padding:8px 0;font-size:13px;color:#64748b">Flight</td><td style="padding:8px 0;font-size:14px;color:#0f172a">${airline ? airline + ' · ' : ''}${flightNumber}</td></tr>` : ''}
      ${fare ? `<tr><td style="padding:8px 0;font-size:13px;color:#64748b">Est. Fare</td><td style="padding:8px 0;font-size:14px;font-weight:700;color:#0f172a">$${fare.toFixed(0)}</td></tr>` : ''}
    </table>
    ${notes ? `<hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0"><p style="font-size:13px;color:#64748b;margin:0 0 8px">Notes</p><p style="font-size:14px;color:#0f172a;background:white;padding:16px;border-radius:6px;border:1px solid #e2e8f0;margin:0;white-space:pre-wrap">${notes}</p>` : ''}
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0">
    <p style="font-size:13px;color:#64748b;margin:0">
      <a href="https://wtzkn.vercel.app/" style="color:#0066B2;font-weight:600">Open Dashboard to confirm or decline →</a>
    </p>
    ${bookingId ? `<p style="font-size:12px;color:#94a3b8;margin:8px 0 0">Booking ID: ${bookingId}</p>` : ''}
  </div>
</div>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Shuttle booking error:', err);
    return NextResponse.json({ error: 'Failed to submit booking request.' }, { status: 500 });
  }
}
