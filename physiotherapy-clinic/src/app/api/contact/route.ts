import { NextResponse } from "next/server";
import { Resend } from "resend";

const NOTIFICATION_EMAIL = "prabodhamtech369@gmail.com";

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is not defined in the environment variables.");
      return NextResponse.json(
        { error: "Server misconfiguration. Email service is currently unavailable." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const body = await request.json();
    const { firstName, lastName, email, countryCode, phone, service, message } = body;

    if (!firstName || !lastName || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const htmlContent = `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px;">
        <h2 style="color: #1a5653; margin-bottom: 24px; text-align: center;">New Contact Request</h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tbody>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eaeaea; font-weight: bold; width: 140px; color: #666;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eaeaea;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eaeaea; font-weight: bold; color: #666;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eaeaea;">
                <a href="mailto:${email}" style="color: #0b9e86; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eaeaea; font-weight: bold; color: #666;">Phone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eaeaea;">${countryCode} ${phone}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eaeaea; font-weight: bold; color: #666;">Service Needed</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eaeaea;"><span style="background: #f0fdf4; padding: 4px 10px; border-radius: 99px; text-transform: capitalize; font-size: 14px; border: 1px solid #bbf7d0; color: #166534;">${service}</span></td>
            </tr>
          </tbody>
        </table>
        
        <div style="margin-top: 24px;">
          <p style="font-weight: bold; color: #666; margin-bottom: 8px;">Message:</p>
          <div style="background-color: #f9f9f9; padding: 16px; border-radius: 6px; border: 1px solid #eaeaea; white-space: pre-wrap;">${message}</div>
        </div>
        
        <div style="margin-top: 32px; font-size: 12px; color: #999; text-align: center;">
          <p>This message was sent from your Physiotherapy Clinic website contact form.</p>
        </div>
      </div>
    `;

    const data = await resend.emails.send({
      from: "Clinic Contact Form <onboarding@resend.dev>", // Change if using verified domain
      to: [NOTIFICATION_EMAIL],
      subject: `New Contact Request from ${firstName} ${lastName} - ${service}`,
      html: htmlContent,
      replyTo: email,
    });

    if (data.error) {
      console.error("Resend error:", data.error);
      return NextResponse.json(
        { error: `Failed to send email: ${data.error.message || JSON.stringify(data.error)}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Internal API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
