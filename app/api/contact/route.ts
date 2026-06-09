import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json({ error: "Email and message are required." }, { status: 400 });
    }

    await resend.emails.send({
      from: "WeeTramz Website <noreply@weetramz.com>",
      to: "info@weetramz.com",
      replyTo: email,
      subject: `New message from ${firstName} ${lastName} — WeeTramz Website`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0d1b2a; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0; font-size: 20px;">New Contact Form Submission</h2>
            <p style="color: #94a3b8; margin: 4px 0 0; font-size: 14px;">WeeTramz Website</p>
          </div>
          <div style="background: #f8fafc; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-size: 13px; color: #64748b; width: 120px;">Name</td><td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${firstName} ${lastName}</td></tr>
              <tr><td style="padding: 8px 0; font-size: 13px; color: #64748b;">Email</td><td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #0066CC;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-size: 13px; color: #64748b;">Phone</td><td style="padding: 8px 0; font-size: 14px; color: #0f172a;">${phone || "Not provided"}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <p style="font-size: 13px; color: #64748b; margin: 0 0 8px;">Message</p>
            <p style="font-size: 14px; color: #0f172a; background: white; padding: 16px; border-radius: 6px; border: 1px solid #e2e8f0; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
