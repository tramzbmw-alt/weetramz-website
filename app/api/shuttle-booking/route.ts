import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName, lastName, email, phone,
      direction, pickup, date, time, passengers, notes, estimatedFare,
    } = body;

    if (!email || !pickup || !date || !time) {
      return NextResponse.json({ error: 'Email, pickup location, date, and time are required.' }, { status: 400 });
    }

    const dirLabel = direction === 'from' ? 'From RDU to your door' : 'To RDU from your door';

    await resend.emails.send({
      from:    'WeeTramz Shuttle <noreply@weetramz.com>',
      to:      'info@weetramz.com',
      replyTo: email,
      subject: `RDU Shuttle Booking Request — ${firstName} ${lastName} · ${date}`,
      html: `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
  <div style="background:#0066B2;padding:24px;border-radius:8px 8px 0 0">
    <h2 style="color:#fff;margin:0;font-size:20px">RDU Airport Shuttle Booking Request</h2>
    <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:14px">WeeTramz Transportation</p>
  </div>
  <div style="background:#f8fafc;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e2e8f0">
    <table style="width:100%;border-collapse:collapse">
      <tr><td style="padding:8px 0;font-size:13px;color:#64748b;width:160px">Name</td><td style="padding:8px 0;font-size:14px;font-weight:600;color:#0f172a">${firstName} ${lastName}</td></tr>
      <tr><td style="padding:8px 0;font-size:13px;color:#64748b">Email</td><td style="padding:8px 0;font-size:14px"><a href="mailto:${email}" style="color:#0066B2">${email}</a></td></tr>
      <tr><td style="padding:8px 0;font-size:13px;color:#64748b">Phone</td><td style="padding:8px 0;font-size:14px;color:#0f172a">${phone || 'Not provided'}</td></tr>
      <tr><td style="padding:8px 0;font-size:13px;color:#64748b">Direction</td><td style="padding:8px 0;font-size:14px;font-weight:600;color:#0066B2">${dirLabel}</td></tr>
      <tr><td style="padding:8px 0;font-size:13px;color:#64748b">Pickup / Drop-off</td><td style="padding:8px 0;font-size:14px;color:#0f172a">${pickup}</td></tr>
      <tr><td style="padding:8px 0;font-size:13px;color:#64748b">Date</td><td style="padding:8px 0;font-size:14px;color:#0f172a">${date}</td></tr>
      <tr><td style="padding:8px 0;font-size:13px;color:#64748b">Time</td><td style="padding:8px 0;font-size:14px;color:#0f172a">${time}</td></tr>
      <tr><td style="padding:8px 0;font-size:13px;color:#64748b">Passengers</td><td style="padding:8px 0;font-size:14px;color:#0f172a">${passengers || 'Not specified'}</td></tr>
      ${estimatedFare ? `<tr><td style="padding:8px 0;font-size:13px;color:#64748b">Estimated Fare</td><td style="padding:8px 0;font-size:14px;font-weight:700;color:#0f172a">$${estimatedFare}</td></tr>` : ''}
    </table>
    ${notes ? `
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0">
    <p style="font-size:13px;color:#64748b;margin:0 0 8px">Notes</p>
    <p style="font-size:14px;color:#0f172a;background:white;padding:16px;border-radius:6px;border:1px solid #e2e8f0;margin:0;white-space:pre-wrap">${notes}</p>` : ''}
  </div>
</div>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Shuttle booking error:', err);
    return NextResponse.json({ error: 'Failed to submit booking request.' }, { status: 500 });
  }
}
