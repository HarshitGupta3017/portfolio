import { NextResponse } from "next/server";

const rateLimit = new Map<string, { count: number; timestamp: number }>();

export async function POST(req: Request) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip =
      forwardedFor?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const now = Date.now();
    const windowMs = 60 * 1000;

    // Clean old entries (basic cleanup)
    for (const [key, value] of rateLimit.entries()) {
      if (now - value.timestamp > windowMs) {
        rateLimit.delete(key);
      }
    }

    const rateData = rateLimit.get(ip);

    if (rateData) {
      if (now - rateData.timestamp < windowMs) {
        if (rateData.count >= 5) {
          return NextResponse.json(
            { error: "Too many requests. Please try again later." },
            { status: 429 }
          );
        }
        rateData.count += 1;
      } else {
        rateLimit.set(ip, { count: 1, timestamp: now });
      }
    } else {
      rateLimit.set(ip, { count: 1, timestamp: now });
    }

    let body;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { name, email, message } = body;

    // 1. Validate required fields and types
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid input types. Expected strings." },
        { status: 400 }
      );
    }

    // 2. Validate bounds, constraints, and length
    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    if (name.length > 100 || email.length > 320 || message.length > 5000) {
      return NextResponse.json(
        { error: "Input exceeds maximum allowed length." },
        { status: 400 }
      );
    }

    // 3. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    const { RESEND_API_KEY, CONTACT_EMAIL } = process.env;

    if (!RESEND_API_KEY || !CONTACT_EMAIL) {
      // Don't expose this misconfiguration to the frontend
      console.error("Server misconfiguration: missing RESEND_API_KEY or CONTACT_EMAIL");
      return NextResponse.json(
        { error: "Internal server error." },
        { status: 500 }
      );
    }

    // 4. Sanitize user input to prevent HTML injection in emails
    const sanitize = (str: string) =>
      str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const cleanMessage = sanitize(message);
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);

    // 5. Send email via Resend API (Zero dependencies fetch)
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Harshit Portfolio <onboarding@resend.dev>", // Resend's default unverified domain sender
        to: CONTACT_EMAIL,
        reply_to: email, // Extremely important so you can reply directly
        subject: `New Contact Request | ${cleanName}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; border: 1px solid #eaeaea;">
            <h1 style="color: #111827; font-size: 24px; font-weight: 600; margin-top: 0; margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #eaeaea;">New Contact Request</h1>
            
            <div style="margin-bottom: 24px;">
              <p style="margin: 0 0 8px 0; color: #4b5563; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">Sender Details</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #111827; font-size: 16px; width: 80px;"><strong>Name</strong></td>
                  <td style="padding: 8px 0; color: #4b5563; font-size: 16px;">${cleanName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #111827; font-size: 16px;"><strong>Email</strong></td>
                  <td style="padding: 8px 0; color: #2563eb; font-size: 16px;"><a href="mailto:${cleanEmail}" style="color: #2563eb; text-decoration: none;">${cleanEmail}</a></td>
                </tr>
              </table>
            </div>

            <div style="margin-bottom: 32px;">
              <p style="margin: 0 0 12px 0; color: #4b5563; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; border: 1px solid #e5e7eb;">
                <p style="margin: 0; color: #1f2937; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${cleanMessage}</p>
              </div>
            </div>

            <div style="text-align: center; margin-top: 40px; padding-top: 32px; border-top: 1px solid #eaeaea;">
              <a href="mailto:${cleanEmail}" style="display: inline-block; background-color: #111827; color: #ffffff; font-size: 16px; font-weight: 500; text-decoration: none; padding: 12px 24px; border-radius: 6px;">Reply to ${cleanName}</a>
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Resend API Error:", errorData);
      return NextResponse.json(
        { error: "Failed to send transmission. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API Route Error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
